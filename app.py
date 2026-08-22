from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from db import get_connection
from email_service import send_email
from safety_rules import handle_chat_message, REPORT_ANALYSIS_INSTRUCTION
from ocr_module import extract_text_and_vitals
import requests
import os
import uuid
import re
import json  # वरच्या इतर imports सोबत हे पण असू द्या

def json_to_plain_text(model_output: str) -> str:
    """Model चा output JSON असेल तर plain text मध्ये बदलतो, आधीच plain text असेल तर तसंच परत करतो."""
    try:
        data = json.loads(model_output)
    except (json.JSONDecodeError, TypeError):
        return model_output.strip()

    parts = []
    summary = data.get("summary") or data.get("सारांश")
    if summary:
        parts.append(summary)

    if "parameters" in data and isinstance(data["parameters"], list):
        parts.append("")
        for p in data["parameters"]:
            name = p.get("name", "")
            value = p.get("value", "")
            status = p.get("status") or p.get("स्थिती", "")
            parts.append(f"• {name}: {value} — {status}")

    answer = data.get("answer") or data.get("उत्तर")
    if answer:
        parts.append("")
        parts.append(answer)

    recs = data.get("recommendations") or data.get("शिफारसी")
    if recs:
        parts.append("")
        parts.append("Recommendations:")
        for r in recs:
            parts.append(f"• {r}")

    diet = data.get("diet_plan")
    if diet:
        parts.append("")
        parts.append("Diet Plan:")
        for d in diet:
            parts.append(f"• {d}")

    workout = data.get("workout_plan")
    if workout:
        parts.append("")
        parts.append("Workout Plan:")
        for w in workout:
            parts.append(f"• {w}")

    see_doctor = data.get("see_doctor_if") or data.get("डॉक्टरकडे कधी जावं")
    if see_doctor and str(see_doctor).lower() not in ("not applicable", "none implied.", "none mentioned, stay healthy!"):
        parts.append("")
        parts.append(f"See a doctor if: {see_doctor}")

    return "\n".join(parts).strip()

app = Flask(__name__)
app.secret_key = "health_guardian"

# ============================================================
# REPORT UPLOAD CONFIG
# ============================================================
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads", "reports")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}
MAX_FILE_SIZE_MB = 10

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def is_allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def ask_ollama(messages):
    """
    messages: list of {"role": "user"|"assistant", "content": "..."}
    Uses Ollama's /api/chat endpoint so the model gets full conversation
    context instead of just the latest message.
    """
    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "health-guardian",
            "messages": messages,
            "stream": False,
            "keep_alive": "30m",
            "options": {
                "num_predict": 700,
                "num_ctx": 1024
            }
        },
        timeout=120
    )

    if response.status_code == 200:
        raw_content = response.json().get("message", {}).get("content", "").strip()
        return json_to_plain_text(raw_content)   # 👈 फक्त हीच ओळ बदलली

    print("Ollama Error:", response.text)
    return "Sorry, I could not connect to the AI model."

@app.route("/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json(force=True)

        user_message = (data or {}).get("message", "").strip()

        if not user_message:
            return jsonify({
                "reply": "Please type a message."
            }), 400

        print("========== AI CHAT ==========")
        print("User Message:", user_message)

        reply = handle_chat_message(user_message, session, ask_ollama)

        print("AI Reply:", reply)

        # Save chat to PostgreSQL
        if "user_id" in session:

            conn = get_connection()
            cur = conn.cursor()

            cur.execute("""
                INSERT INTO ai_chat
                (
                    user_id,
                    question,
                    response
                )
                VALUES (%s, %s, %s)
            """, (
                session["user_id"],
                user_message,
                reply
            ))

            conn.commit()

            cur.close()
            conn.close()

            print("Chat saved to PostgreSQL")

        return jsonify({
            "success": True,
            "reply": reply
        })

    except Exception as e:

        print("AI CHAT ERROR:", e)

        return jsonify({
            "success": False,
            "reply": "Sorry, I could not process your request.",
            "error": str(e)
        }), 500


# ============================================================
# AUTO-CREATE medicines/medicine_reminders and appointments rows
# from what the OCR/Gemini step found in an uploaded report.
# Kept as small standalone helpers so /upload_report stays readable.
# ============================================================
def _save_extracted_medicines(cur, user_id, medicines):
    """
    Inserts one row per detected medicine into `medicines`, then a
    matching row into `medicine_reminders` linked via the new
    medicine_id -- same two-table pattern /save_medicine already uses
    for manually-added medicines. medicine_time / reminder_time are left
    NULL if Gemini didn't find a time (so nothing gets a made-up
    reminder time). Returns how many were actually saved.
    """
    saved = 0
    for med in medicines:
        name = med.get("medicine_name")
        if not name:
            continue
        dosage = med.get("dosage") or ""
        med_time = med.get("medicine_time")  # "HH:MM" or None

        cur.execute("""
            INSERT INTO medicines
            (
                user_id,
                medicine_name,
                dosage,
                medicine_time,
                medicine_status
            )
            VALUES (%s, %s, %s, %s, %s)
            RETURNING medicine_id
        """, (
            user_id,
            name,
            dosage,
            med_time,
            "Pending"
        ))

        medicine_id = cur.fetchone()[0]

        cur.execute("""
            INSERT INTO medicine_reminders
            (
                medicine_id,
                reminder_time,
                reminder_text,
                reminder_status
            )
            VALUES (%s, %s, %s, %s)
        """, (
            medicine_id,
            med_time,
            f"Take {name}" + (f" ({dosage})" if dosage else ""),
            "Pending"
        ))

        saved += 1
    return saved


def _save_extracted_appointments(cur, user_id, appointments):
    """
    Inserts one row per detected appointment into `appointments`.
    appointment_date / appointment_time are left NULL if Gemini didn't
    find them -- the row is still saved (doctor/hospital name alone is
    useful) but won't show up as a scheduled reminder until the user
    fills the date/time in themselves. Returns how many were saved.
    """
    saved = 0
    for appt in appointments:
        doctor_name = appt.get("doctor_name") or ""
        hospital_name = appt.get("hospital_name") or ""
        appt_date = appt.get("appointment_date")   # "YYYY-MM-DD" or None
        appt_time = appt.get("appointment_time")   # "HH:MM" or None

        cur.execute("""
            INSERT INTO appointments
            (
                user_id,
                doctor_name,
                hospital_name,
                appointment_date,
                appointment_time,
                appointment_status,
                notes
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            user_id,
            doctor_name,
            hospital_name,
            appt_date,
            appt_time,
            "Upcoming",
            "Auto-added from uploaded report"
        ))

        saved += 1
    return saved


@app.route("/upload_report", methods=["POST"])
def upload_report():

    if "user_id" not in session:
        return jsonify({"success": False, "message": "Login Required"}), 401

    if "file" not in request.files:
        return jsonify({"success": False, "message": "No file part in request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"success": False, "message": "No file selected"}), 400

    if not is_allowed_file(file.filename):
        return jsonify({
            "success": False,
            "message": "Only png, jpg, jpeg, pdf files are allowed"
        }), 400

    file.seek(0, os.SEEK_END)
    size_mb = file.tell() / (1024 * 1024)
    file.seek(0)
    if size_mb > MAX_FILE_SIZE_MB:
        return jsonify({
            "success": False,
            "message": f"File too large. Max {MAX_FILE_SIZE_MB} MB allowed"
        }), 400

    user_id = session["user_id"]

    ext = file.filename.rsplit(".", 1)[1].lower()
    safe_filename = f"{uuid.uuid4().hex}.{ext}"

    user_folder = os.path.join(UPLOAD_FOLDER, str(user_id))
    os.makedirs(user_folder, exist_ok=True)

    filepath = os.path.join(user_folder, safe_filename)
    file.save(filepath)

    file.seek(0)
    file_bytes = file.read()

    original_name = file.filename
    report_type = ext

    # ---- OCR (images go through the normal pipeline, PDFs get rasterized
    # page-by-page first -- both paths land in the same OCR sweep).
    # Also returns any medicines/appointments Gemini found in the image,
    # ready to insert straight into their respective tables. ----
    ocr_text = ""
    vitals = {}
    medicines = []
    appointments = []
    try:
        if ext in ("png", "jpg", "jpeg"):
            ocr_text, vitals, medicines, appointments = extract_text_and_vitals(file_bytes)
        elif ext == "pdf":
            ocr_text, vitals, medicines, appointments = extract_text_and_vitals(file_bytes, is_pdf=True)
        print("OCR TEXT LENGTH:", len(ocr_text))
        print("OCR TEXT PREVIEW:", repr(ocr_text[:200]))
        print("MEDICINES DETECTED:", medicines)
        print("APPOINTMENTS DETECTED:", appointments)
    except Exception as e:
        print("OCR ERROR:", e)

    # ---- AI analysis via Ollama ----
    ai_analysis = None
    if ocr_text.strip():
        try:
            ai_analysis = ask_ollama([
                {"role": "user", "content": REPORT_ANALYSIS_INSTRUCTION + ocr_text}
            ])
            print("REPORT ANALYSIS:", ai_analysis)
        except Exception as e:
            print("REPORT ANALYSIS ERROR:", e)
            ai_analysis = "Sorry, I could not analyse this report right now."

    medicines_saved = 0
    appointments_saved = 0
    saved_medicines_out = []
    saved_appointments_out = []

    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO reports
            (user_id, report_name, report_type, file_path, uploaded_at, ai_analysis)
            VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP, %s)
            RETURNING report_id
        """, (user_id, original_name, report_type, filepath, ai_analysis))

        report_id = cur.fetchone()[0]

        # ---- Auto-create medicine + appointment reminders from what
        # Gemini found in this report. Any failure here is caught on its
        # own so a bad medicine/appointment row never loses the report
        # that was already saved above. ----
        try:
            if medicines:
                medicines_saved = _save_extracted_medicines(cur, user_id, medicines)
                # Same shape the frontend's own addMedicineEntry() uses,
                # so processReportFile() can push these straight into
                # localStorage and re-render the Medicine list exactly
                # like a manually-added medicine would.
                saved_medicines_out = [
                    {
                        "name": m.get("medicine_name"),
                        "time": m.get("medicine_time"),
                        "duration_days": m.get("duration_days"),
                    }
                    for m in medicines if m.get("medicine_name")
                ]
            if appointments:
                appointments_saved = _save_extracted_appointments(cur, user_id, appointments)
                saved_appointments_out = [
                    {
                        "doctor": a.get("doctor_name") or "",
                        "hospital": a.get("hospital_name") or "",
                        "date": a.get("appointment_date"),
                        "time": a.get("appointment_time"),
                    }
                    for a in appointments
                ]
            conn.commit()
        except Exception as e:
            conn.rollback()
            print("MEDICINE/APPOINTMENT AUTO-SAVE ERROR:", e)
            medicines_saved = 0
            appointments_saved = 0
            saved_medicines_out = []
            saved_appointments_out = []

        cur.close()
        conn.close()

    except Exception as e:
        print("REPORT DB SAVE ERROR:", e)
        return jsonify({
            "success": False,
            "message": "File saved but could not record it in the database",
            "error": str(e)
        }), 500

    reply = ai_analysis or "Report saved. No readable text found for analysis."
    if medicines_saved or appointments_saved:
        extra_bits = []
        if medicines_saved:
            extra_bits.append(f"{medicines_saved} medicine reminder(s)")
        if appointments_saved:
            extra_bits.append(f"{appointments_saved} appointment(s)")
        reply += f"\n\nAlso auto-added: {' and '.join(extra_bits)} from this report."

    # Only pass along vitals that were actually detected -- "NOT DETECTED"
    # placeholders should never reach the frontend or overwrite what's
    # already showing in Health Monitoring.
    detected_vitals = {
        k: v for k, v in (vitals or {}).items()
        if v and "NOT DETECTED" not in v
    }

    return jsonify({
        "success": True,
        "message": "Report uploaded successfully",
        "report_id": report_id,
        "filename": original_name,
        "medicines_saved": medicines_saved,
        "appointments_saved": appointments_saved,
        "medicines": saved_medicines_out,
        "appointments": saved_appointments_out,
        "vitals": detected_vitals,
        "reply": reply
    })


@app.route("/get_reports")
def get_reports():

    if "user_id" not in session:
        return jsonify([])

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            report_id,
            report_name,
            uploaded_at
        FROM reports
        WHERE user_id=%s
        ORDER BY uploaded_at DESC
    """, (session["user_id"],))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    reports = []
    for row in rows:
        reports.append({
            "report_id": row[0],
            "filename": row[1],
            "uploaded_at": str(row[2])
        })

    return jsonify(reports)


@app.route("/analyze_report/<int:report_id>", methods=["POST"])
def analyze_report(report_id):
    """
    Re-runs AI analysis for an already-uploaded report and saves the
    result. This re-reads the file straight from disk (report_type +
    file_path from the DB) and OCRs it again itself -- callers don't need
    to pass any extracted text in the request body anymore.

    NOTE: this does NOT re-run the medicine/appointment auto-save --
    those are only created once, at initial upload time, so re-analyzing
    a report never creates duplicate medicines/appointments.
    """

    if "user_id" not in session:
        return jsonify({"success": False, "message": "Login Required"}), 401

    user_id = session["user_id"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT report_id, report_type, file_path FROM reports
        WHERE report_id=%s AND user_id=%s
    """, (report_id, user_id))

    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        return jsonify({"success": False, "message": "Report not found"}), 404

    _, report_type, file_path = row

    if not file_path or not os.path.exists(file_path):
        cur.close()
        conn.close()
        return jsonify({
            "success": False,
            "message": "Original report file could not be found on disk"
        }), 404

    ocr_text = ""
    try:
        with open(file_path, "rb") as f:
            file_bytes = f.read()

        if report_type in ("png", "jpg", "jpeg"):
            ocr_text, _vitals, _medicines, _appointments = extract_text_and_vitals(
                file_bytes, use_gemini_fallback=False
            )
        elif report_type == "pdf":
            ocr_text, _vitals, _medicines, _appointments = extract_text_and_vitals(
                file_bytes, is_pdf=True, use_gemini_fallback=False
            )
        else:
            cur.close()
            conn.close()
            return jsonify({
                "success": False,
                "message": f"Unsupported report type: {report_type}"
            }), 400

    except Exception as e:
        print("ANALYZE_REPORT OCR ERROR:", e)
        cur.close()
        conn.close()
        return jsonify({
            "success": False,
            "message": "Could not read/OCR the report file",
            "error": str(e)
        }), 500

    if not ocr_text.strip():
        cur.close()
        conn.close()
        return jsonify({
            "success": False,
            "message": "No readable text found in this report"
        }), 422

    analysis_prompt = REPORT_ANALYSIS_INSTRUCTION + ocr_text

    analysis = ask_ollama([
        {"role": "user", "content": analysis_prompt}
    ])

    print("REPORT ANALYSIS:", analysis)

    cur.execute("""
        UPDATE reports
        SET ai_analysis=%s
        WHERE report_id=%s
    """, (analysis, report_id))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({
        "success": True,
        "report_id": report_id,
        "ai_analysis": analysis
    })


# Language Selection Page
@app.route("/")
def home():

    user = None

    if "user_id" in session:

        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT * FROM users WHERE user_id=%s",
            (session["user_id"],)
        )

        user = cur.fetchone()

        cur.close()
        conn.close()

    return render_template("lang.html", user=user)

# Login Form Submit (POST)
@app.route("/login", methods=["POST"])
def login():

    username = request.form["username"].strip()
    password = request.form["password"].strip()

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE username=%s",
        (username,)
    )

    user = cur.fetchone()

    if user:
        if user[2] != password:
            cur.close()
            conn.close()
            return "Invalid Username or Password"
    else:
        cur.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s)",
            (username, password)
        )
        conn.commit()

        cur.execute(
            "SELECT * FROM users WHERE username=%s",
            (username,)
        )
        user = cur.fetchone()

    session["user_id"] = user[0]
    session["username"] = user[1]

    cur.execute("""
        UPDATE users
        SET status='Active',
            last_login=CURRENT_TIMESTAMP
        WHERE user_id=%s
    """, (user[0],))

    conn.commit()

    cur.close()
    conn.close()

    return "success"

@app.route("/update_password", methods=["POST"])
def update_password():

    data = request.get_json()

    username = data["username"]
    new_password = data["new_password"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE users
        SET password=%s
        WHERE username=%s
    """, (new_password, username))

    conn.commit()

    if cur.rowcount == 0:
        return jsonify({
            "success": False,
            "message": "Username not found"
        })

    cur.close()
    conn.close()

    return jsonify({
        "success": True
    })

@app.route("/admin_login", methods=["POST"])
def admin_login():

    username = request.form["username"].strip()
    email = request.form["email"].strip()
    mobile = request.form["mobile"].strip()
    password = request.form["password"].strip()

    conn = get_connection()
    cur = conn.cursor()

    print("Username :", username)
    print("Email :", email)
    print("Mobile :", mobile)
    print("Password :", password)

    cur.execute("""
        SELECT * FROM admin
        WHERE username=%s
        AND email=%s
        AND mobile_no=%s
        AND password=%s
    """, (
        username,
        email,
        mobile,
        password
    ))

    admin = cur.fetchone()

    print(admin)

    cur.close()
    conn.close()

    if admin:
        session["admin_id"] = admin[0]
        session["admin_username"] = admin[1]
        return "success"

    return "Invalid Admin Details"

@app.route("/get_users")
def get_users():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
    SELECT
        username,
        email,
        status,
        last_login
    FROM users
    ORDER BY user_id
    """)


    rows = cur.fetchall()

    cur.close()
    conn.close()

    users = []

    for row in rows:
        users.append({
            "username": row[0],
            "email": row[1],
            "status": row[2],
            "last_login": str(row[3])
        })

    return jsonify(users)

# Permission Page
@app.route("/permission")
def permission():

    if "user_id" not in session:
        return redirect(url_for("home"))

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE user_id=%s",
        (session["user_id"],)
    )

    user = cur.fetchone()

    cur.close()
    conn.close()

    return render_template("permission.html", user=user)


@app.route("/edit_profile")
def edit_profile():

    if "user_id" not in session:
        return redirect(url_for("home"))

    user_id = session["user_id"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            username,
            email,
            age,
            gender,
            dob,
            state,
            city,
            address,
            family_contact1,
            family_contact2,
            family_contact3,
            doctor_contact,
            family_email_1,
            family_email_2,
            family_email_3
        FROM users
        WHERE user_id=%s
    """, (user_id,))

    user = cur.fetchone()

    cur.close()
    conn.close()

    return render_template("edit_profile.html", user=user)


@app.route("/get_logged_user")
def get_logged_user():

    print("Session =", dict(session))

    return jsonify({
        "username": session.get("username", "User")
    })

# Main page
@app.route("/main")
def main():

    if "user_id" not in session:
        return redirect(url_for("home"))

    print("========== MAIN PAGE ==========")
    print("Session User ID =", session.get("user_id"))
    print("Session Username =", session.get("username"))

    user_id = session["user_id"]

    conn = get_connection()
    cur = conn.cursor()


    cur.execute("""
  SELECT
    username,
    email,
    age,
    gender,
    dob,
    state,
    city,
    address,
    family_contact1,
    family_contact2,
    family_contact3,
    doctor_contact,
    ambulance_contact,
    fire_brigade_contact
   FROM users
  WHERE user_id=%s
  """, (user_id,))


    user = cur.fetchone()

    print("User Data =", user)

    cur.close()
    conn.close()

    return render_template("main.html", user=user)

@app.route("/get_contacts")
def get_contacts():

    if "user_id" not in session:
        return jsonify({
            "success": False,
            "message": "Login Required"
        }), 401

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            email,
            family_contact1,
            family_contact2,
            family_contact3,
            doctor_contact,
            ambulance_contact,
            fire_brigade_contact,
            family_email_1,
            family_email_2,
            family_email_3
        FROM users
        WHERE user_id=%s
    """, (session["user_id"],))

    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user:
        return jsonify({
            "success": False,
            "message": "User Not Found"
        }), 404

    return jsonify({
        "success": True,
        "email": user[0] or "",
        "family_contact1": user[1] or "",
        "family_contact2": user[2] or "",
        "family_contact3": user[3] or "",
        "doctor_contact": user[4] or "",
        "ambulance_contact": user[5] or "",
        "fire_brigade_contact": user[6] or "",
        "family_email1": user[7] or "",
        "family_email2": user[8] or "",
        "family_email3": user[9] or ""
    })

@app.route("/save_permissions", methods=["POST"])
def save_permissions():

    if "user_id" not in session:
        return jsonify({"success": False, "message": "Login Required"}), 401

    data = request.get_json()

    location = data.get("location", False)
    microphone = data.get("microphone", False)
    notification = data.get("notification", False)
    speaker = data.get("speaker", False)

    conn = get_connection()
    cur = conn.cursor()

    # आधी record आहे का ते check करा
    cur.execute(
        "SELECT id FROM permissions WHERE user_id=%s",
        (session["user_id"],)
    )

    record = cur.fetchone()

    if record:
        cur.execute("""
            UPDATE permissions
            SET
                location=%s,
                microphone=%s,
                notification=%s,
                speaker=%s
            WHERE user_id=%s
        """, (
            location,
            microphone,
            notification,
            speaker,
            session["user_id"]
        ))
    else:
        cur.execute("""
            INSERT INTO permissions
            (user_id, location, microphone, notification, speaker)
            VALUES (%s,%s,%s,%s,%s)
        """, (
            session["user_id"],
            location,
            microphone,
            notification,
            speaker
        ))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"success": True})

@app.route("/save_profile", methods=["POST"])
def save_profile():

    if "user_id" not in session:
        return "Login Required", 401

    user_id = session["user_id"]

    email = request.form["email"]
    age = request.form["age"]
    gender = request.form["gender"]
    dob = request.form["dob"]
    state = request.form["state"]
    city = request.form["city"]
    address = request.form["address"]
    family_contact1 = request.form["family_contact1"]
    family_contact2 = request.form["family_contact2"]
    family_contact3 = request.form["family_contact3"]
    ambulance_contact = "108"
    fire_brigade_contact = "101"
    doctor_contact = request.form["doctor_contact"]
    family_email_1 = request.form.get("family_email_1")
    family_email_2 = request.form.get("family_email_2")
    family_email_3 = request.form.get("family_email_3")
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
    UPDATE users
    SET
        email=%s,
        age=%s,
        gender=%s,
        dob=%s,
        state=%s,
        city=%s,
        address=%s,
        family_contact1=%s,
        family_contact2=%s,
        family_contact3=%s,
        ambulance_contact=%s,
        fire_brigade_contact=%s,
        doctor_contact=%s,
        family_email_1=%s,
        family_email_2=%s,
        family_email_3=%s
    WHERE user_id=%s
""", (
    email,
    age,
    gender,
    dob,
    state,
    city,
    address,
    family_contact1,
    family_contact2,
    family_contact3,
    ambulance_contact,
    fire_brigade_contact,
    doctor_contact,
    family_email_1,
    family_email_2,
    family_email_3,
    user_id
))

    conn.commit()
    cur.close()
    conn.close()

    return "success"

@app.route("/save_health", methods=["POST"])
def save_health():

    if "user_id" not in session:
        return "Login Required", 401

    user_id = session["user_id"]

    bp = request.form.get("bp")
    sugar = request.form.get("sugar")
    weight = request.form.get("weight")
    blood_group = request.form.get("blood_group")

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO health_records
        (
            user_id,
            bp,
            sugar,
            weight,
            blood_group,
            created_at
        )
        VALUES (%s,%s,%s,%s,%s, CURRENT_TIMESTAMP)
    """,
    (
        user_id,
        bp,
        sugar,
        weight,
        blood_group
    ))

    # Keep only this user's most recent 6 CALENDAR MONTHS of health
    # records (based on created_at). As soon as a 7th distinct month
    # shows up, the oldest month's records are deleted automatically.
    cur.execute("""
        DELETE FROM health_records
        WHERE user_id = %s
        AND to_char(created_at, 'YYYY-MM') NOT IN (
            SELECT month FROM (
                SELECT DISTINCT to_char(created_at, 'YYYY-MM') AS month
                FROM health_records
                WHERE user_id = %s
                ORDER BY month DESC
                LIMIT 6
            ) AS recent_months
        )
    """, (user_id, user_id))

    conn.commit()

    cur.close()
    conn.close()

    return "success"

@app.route("/get_health_history", methods=["GET"])
def get_health_history():

    if "user_id" not in session:
        return jsonify({"months": [], "bp": [], "sugar": [], "weight": []})

    user_id = session["user_id"]

    conn = get_connection()
    cur = conn.cursor()

    # One row per calendar month (the latest reading in that month),
    # for this user's most recent 6 distinct months.
    cur.execute("""
        SELECT DISTINCT ON (to_char(created_at, 'YYYY-MM'))
            to_char(created_at, 'YYYY-MM') AS month,
            bp,
            sugar,
            weight
        FROM health_records
        WHERE user_id = %s
        ORDER BY to_char(created_at, 'YYYY-MM'), created_at DESC
    """, (user_id,))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    # rows come back sorted by month ascending already because of the
    # DISTINCT ON + ORDER BY above; keep only the most recent 6 months.
    rows = rows[-12:]

    months = [r[0] for r in rows]
    bp_vals = []
    for r in rows:
        bp_str = r[1]
        systolic = None
        if bp_str and "/" in bp_str:
            try:
                systolic = float(bp_str.split("/")[0])
            except ValueError:
                systolic = None
        bp_vals.append(systolic)

    sugar_vals = [float(r[2]) if r[2] is not None else None for r in rows]
    weight_vals = [float(r[3]) if r[3] is not None else None for r in rows]

    return jsonify({
        "months": months,
        "bp": bp_vals,
        "sugar": sugar_vals,
        "weight": weight_vals
    })


@app.route("/save_medicine", methods=["POST"])
def save_medicine():

    if "user_id" not in session:
        return "Login Required", 401

    user_id = session["user_id"]

    medicine_name = request.form["medicine_name"]
    reminder_time = request.form["reminder_time"]

    conn = get_connection()
    cur = conn.cursor()

    # medicines table
    cur.execute("""
        INSERT INTO medicines
        (
            user_id,
            medicine_name,
            dosage,
            medicine_time,
            medicine_status
        )
        VALUES (%s,%s,%s,%s,%s)
        RETURNING medicine_id
    """, (
        user_id,
        medicine_name,
        "",
        reminder_time,
        "Pending"
    ))

    medicine_id = cur.fetchone()[0]

    # medicine_reminders table
    cur.execute("""
        INSERT INTO medicine_reminders
        (
            medicine_id,
            reminder_time,
            reminder_text,
            reminder_status
        )
        VALUES (%s,%s,%s,%s)
    """, (
        medicine_id,
        reminder_time,
        f"Take {medicine_name}",
        "Pending"
    ))

    conn.commit()

    cur.close()
    conn.close()

    return "success"

@app.route("/save_appointment", methods=["POST"])
def save_appointment():

    if "user_id" not in session:
        return "Login Required", 401

    user_id = session["user_id"]

    doctor_name = request.form["doctor_name"]
    hospital_name = request.form["hospital_name"]
    appointment_date = request.form["appointment_date"]
    appointment_time = request.form["appointment_time"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO appointments
        (
            user_id,
            doctor_name,
            hospital_name,
            appointment_date,
            appointment_time,
            appointment_status,
            notes
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (
        user_id,
        doctor_name,
        hospital_name,
        appointment_date,
        appointment_time,
        "Upcoming",
        ""           # notes
    ))

    conn.commit()

    cur.close()
    conn.close()

    return "success"

@app.route("/save_chat", methods=["POST"])
def save_chat():

    if "user_id" not in session:
        return "Login Required", 401

    user_id = session["user_id"]

    question = request.form["question"]
    response = request.form["response"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO ai_chat
        (
            user_id,
            question,
            response
        )
        VALUES (%s,%s,%s)
    """, (
        user_id,
        question,
        response
    ))

    conn.commit()

    cur.close()
    conn.close()

    return "success"

@app.route("/save_diet", methods=["POST"])
def save_diet():

    if "user_id" not in session:
        return "Login Required", 401

    user_id = session["user_id"]

    breakfast = request.form["breakfast"]
    lunch = request.form["lunch"]
    dinner = request.form["dinner"]
    water_intake = request.form["water_intake"]

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO diet_log
        (
            user_id,
            breakfast,
            lunch,
            dinner,
            water_intake
        )
        VALUES (%s,%s,%s,%s,%s)
    """, (
        user_id,
        breakfast,
        lunch,
        dinner,
        water_intake
    ))

    conn.commit()
    cur.close()
    conn.close()

    return "success"

@app.route("/emergency", methods=["POST"])
def emergency():
    print("******** EMERGENCY ROUTE CALLED ********")
    if "user_id" not in session:
        return jsonify({"message": "Login Required"}), 401

    data = request.get_json()
    print(data)

    latitude = data.get("latitude")
    longitude = data.get("longitude")

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            username,
            family_email_1,
            family_email_2,
            family_email_3
        FROM users
        WHERE user_id=%s
    """, (session["user_id"],))

    user = cur.fetchone()

    cur.close()
    conn.close()

    if not user:
        return jsonify({"message": "User Not Found"})

    username = user[0]

    subject = "🚨 Health Guardian Emergency Alert"

    body = f"""
Emergency Alert!

{username} has pressed the Emergency Button.

Current Location:
https://www.google.com/maps?q={latitude},{longitude}

Please contact immediately.
"""

    emails = [user[1], user[2], user[3]]

    for email in emails:
        if email:
            send_email(email, subject, body)

    return jsonify({"message": "Emergency Alert Sent Successfully"})

@app.route("/get_chat_history")
def get_chat_history():

    if "user_id" not in session:
        return jsonify([])

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            chat_id,
            question
        FROM ai_chat
        WHERE user_id=%s
        ORDER BY created_at DESC
    """, (session["user_id"],))

    rows = cur.fetchall()

    cur.close()
    conn.close()

    history = []

    for row in rows:
        history.append({
            "chat_id": row[0],
            "question": row[1]
        })

    return jsonify(history)

@app.route("/get_chat/<int:chat_id>")
def get_chat(chat_id):

    if "user_id" not in session:
        return jsonify({})

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            question,
            response
        FROM ai_chat
        WHERE
            chat_id=%s
            AND user_id=%s
    """, (
        chat_id,
        session["user_id"]
    ))

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return jsonify({})

    return jsonify({
        "question": row[0],
        "response": row[1]
    })


@app.route("/logout")
def logout():

    if "user_id" in session:

        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            UPDATE users
            SET status='Inactive'
            WHERE user_id=%s
        """, (session["user_id"],))

        conn.commit()
        cur.close()
        conn.close()

    session.clear()

    # clear AI conversation context on logout too
    session.pop("chat_history", None)

    return "success"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)