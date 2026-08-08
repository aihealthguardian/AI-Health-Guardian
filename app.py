from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from db import get_connection
from email_service import send_email
import requests
import os
import uuid
import re

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


# System-style instruction used ONLY for report analysis calls (kept
# separate from the normal chat flow so it doesn't interfere with the
# emergency/off-topic guards or the ongoing chat_history context).
REPORT_ANALYSIS_INSTRUCTION = (
    "You are analyzing a medical/health report for a patient. "
    "The following is text extracted from their report. "
    "Summarize it in simple, calm language a non-medical elderly person "
    "can understand. Point out anything that looks abnormal or worth "
    "discussing with a doctor, but NEVER name a specific medicine or "
    "dosage -- always say 'consult a doctor or pharmacist' for that. "
    "Keep it short (4-6 sentences).\n\n"
    "Report text:\n"
)

# ============================================================
# AI CHAT CONFIG
# ============================================================

# Keywords that must NEVER be answered by the model directly.
# If any of these appear, we short-circuit and tell the user to
# activate SOS / seek emergency help immediately, per the model's
# own SYSTEM rule #2 -- but enforced here in code so it can never
# be skipped or answered incorrectly by the (small) model.
EMERGENCY_KEYWORDS = [
    "chest pain", "cant breathe", "can't breathe", "difficulty breathing",
    "breathing trouble", "shortness of breath",
    "heavy bleeding", "severe bleeding", "bleeding a lot",
    "unconscious", "unresponsive", "fainted", "passed out",
    "stroke", "face drooping", "slurred speech",
    "severe bite", "snake bite", "dog bite deep",
    "seizure", "convulsion",
    "heart attack", "cardiac arrest",
    "suicide", "self harm", "overdose"
]

EMERGENCY_REPLY = (
    "This sounds like it could be a medical emergency. "
    "Please activate SOS now and seek immediate emergency medical help. "
    "If someone is with you, ask them to call for help right away."
)

# Very small keyword guard to stop the 1B model wandering into
# completely unrelated topics (movies, general chit-chat trivia, etc).
# This is intentionally loose -- greetings and short messages are
# always allowed through so normal conversation still works.
HEALTH_TOPIC_KEYWORDS = [
    "pain", "fever", "cold", "cough", "flu", "headache", "vomit", "nausea",
    "diet", "food", "nutrition", "veg", "nonveg", "non-veg", "meal", "water",
    "medicine", "doctor", "hospital", "symptom", "sick", "ill", "health",
    "bp", "blood pressure", "sugar", "diabetes", "weight", "appointment",
    "injury", "wound", "cut", "burn", "allergy", "infection", "rash",
    "sleep", "stress", "exercise", "tired", "fatigue"
]

GREETING_WORDS = ["hi", "hii", "hello", "hey", "good morning", "good evening",
                   "good afternoon", "who are you", "what can you do"]

# Short stand-alone replies that only make sense as an answer to a
# question the bot just asked (e.g. "veg or non-veg?" -> "veg").
# Deliberately a fixed list, NOT "any short message", so random
# off-topic phrases like "Rajasthani picture" don't slip through.
SHORT_REPLY_WORDS = [
    "ok", "okay", "yes", "no", "sure", "fine", "thanks", "thank you",
    "veg", "nonveg", "non-veg", "non veg", "vegetarian", "non vegetarian"
]

OFF_TOPIC_REPLY = (
    "I can only help with health symptoms, emergencies, and diet/nutrition "
    "guidance. Could you ask something related to those?"
)

MAX_HISTORY_MESSAGES = 12  # keep session small: ~6 user/assistant turns


def is_emergency(message):
    lower = message.lower()
    return any(k in lower for k in EMERGENCY_KEYWORDS)


def is_on_topic(message):
    lower = message.lower().strip()
    if any(g in lower for g in GREETING_WORDS):
        # greetings are handled naturally by the model itself
        # (see SYSTEM prompt rule 7), not hardcoded here
        return True
    if lower in SHORT_REPLY_WORDS:
        # exact short reply (e.g. "veg", "ok") -- treat as continuing
        # an on-topic conversation, not a fresh off-topic question
        return True
    return any(k in lower for k in HEALTH_TOPIC_KEYWORDS)


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
            "stream": False
        },
        timeout=120
    )

    if response.status_code == 200:
        return response.json().get("message", {}).get("content", "").strip()

    print("Ollama Error:", response.text)

    return "Sorry, I could not connect to the AI model."


# ============================================================
# DIET PLAN FLOW
# ============================================================
# Design goals (per requirement):
#  1. Every diet question must ask veg/nonveg first if not already
#     stated -- enforced in backend, not left to the model.
#  2. Any number of days (1, 30, 120, 135...) must work reliably.
#     Instead of asking the small model to hallucinate a huge unique
#     plan in one go (unreliable / truncates), we ask it for ONE
#     7-day pattern, then deterministically repeat/cycle that
#     pattern in Python to cover however many days were requested.

DIET_KEYWORDS = ["diet", "meal plan", "food plan", "nutrition",
                  "breakfast", "lunch", "dinner", "meal"]

NON_VEG_WORDS = [
    "chicken", "mutton", "fish", "egg", "eggs", "meat", "prawn",
    "beef", "pork", "non veg", "nonveg", "non-veg", "keema", "kebab",
    "tuna", "salmon", "shrimp", "crab", "lobster", "bacon", "sausage",
    "ham", "turkey", "duck", "anchovy", "sardine", "squid", "octopus"
]

MAX_DIET_DAYS = 180
DEFAULT_DIET_DAYS = 7


def is_diet_question(message):
    lower = message.lower()
    return any(k in lower for k in DIET_KEYWORDS)


def extract_diet_type(message):
    lower = message.lower()
    if re.search(r'\bnon[\s-]?veg(etarian)?\b', lower):
        return "nonveg"
    if re.search(r'\bveg(etarian)?\b', lower):
        return "veg"
    return None


def extract_day_count(message):
    lower = message.lower()

    m = re.search(r'(\d+)\s*day', lower)
    if m:
        return int(m.group(1))

    m = re.search(r'(\d+)?\s*week', lower)
    if m:
        n = int(m.group(1)) if m.group(1) else 1
        return n * 7

    m = re.search(r'(\d+)?\s*month', lower)
    if m:
        n = int(m.group(1)) if m.group(1) else 1
        return n * 30

    return None


def week_diet_prompt(diet_type):
    diet_label = "vegetarian (veg)" if diet_type == "veg" else "non-vegetarian (includes meat/fish/eggs)"
    return (
        f"Create a 10-day {diet_label} Indian diet plan for a general adult, with a DIFFERENT main dish each day (no repeats). "
        "Strictly follow this exact format, with nothing else before or after it:\n\n"
        "Day 1:\nBreakfast: ...\nLunch: ...\nDinner: ...\n\n"
        "Day 2:\nBreakfast: ...\nLunch: ...\nDinner: ...\n\n"
        "(continue through Day 7 in the exact same format)\n\n"
        "Keep each meal on one short line. Vary the meals across the 7 days. "
        "Do not add any introduction, notes, or explanation outside this format."
    )

def is_valid_day_block(block, diet_type):
    lower = block.lower()
    if "breakfast" not in lower or "lunch" not in lower or "dinner" not in lower:
        return False
    if "consult a doctor" in lower or "medical consultation" in lower:
        return False
    if diet_type == "veg" and any(w in lower for w in NON_VEG_WORDS):
        return False
    return True


def parse_week_plan(raw_text, diet_type):
    parts = re.split(r'Day\s*\d+\s*:?', raw_text, flags=re.IGNORECASE)
    blocks = [p.strip() for p in parts if p.strip()]
    valid_blocks = [b for b in blocks if is_valid_day_block(b, diet_type)]
    return valid_blocks[:10]


def build_full_diet_plan(diet_type, total_days):
    """
    Returns (plan_text, error_message). Exactly one of the two is None.
    """
    if total_days > MAX_DIET_DAYS:
        return None, f"Please request {MAX_DIET_DAYS} days or fewer for a diet plan."

    raw = ask_ollama([
        {"role": "user", "content": week_diet_prompt(diet_type)}
    ])

    day_blocks = parse_week_plan(raw, diet_type)

    if not day_blocks:
        return None, "Sorry, I could not generate a diet plan right now. Please try again."

    pattern_len = len(day_blocks)

    def format_block(block):
        block = re.sub(r'breakfast\s*:', '🍳 Breakfast:', block, flags=re.IGNORECASE)
        block = re.sub(r'lunch\s*:', '🍛 Lunch:', block, flags=re.IGNORECASE)
        block = re.sub(r'dinner\s*:', '🌙 Dinner:', block, flags=re.IGNORECASE)
        return block

    lines = []
    for day_num in range(1, total_days + 1):
        block = day_blocks[(day_num - 1) % pattern_len]
        lines.append(f"📅 Day {day_num}\n{format_block(block)}")

    plan_text = "\n\n".join(lines)

    if total_days > pattern_len:
        plan_text += (
            f"\n\n(Note: This is a {pattern_len}-day meal pattern repeated to "
            f"cover all {total_days} days, so the plan stays consistent.)"
        )

    return plan_text, None


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

        # ---- 1. Emergency guard (checked BEFORE calling the model) ----
        if is_emergency(user_message):
            reply = EMERGENCY_REPLY
            print("EMERGENCY KEYWORD MATCHED -- skipping model call")

        # ---- 2. Off-topic guard (checked BEFORE calling the model) ----
        # Greetings pass this check (see is_on_topic) and go to the
        # model, which now has explicit greeting-handling instructions
        # in its SYSTEM prompt.
        elif not is_on_topic(user_message):
            reply = OFF_TOPIC_REPLY
            print("OFF-TOPIC -- skipping model call")

        # ---- 3. Diet flow (checked BEFORE the general model call) ----
        # Always asks veg/nonveg in the backend if not already stated,
        # and builds any requested number of days deterministically
        # from a single 7-day pattern (see build_full_diet_plan).
        elif is_diet_question(user_message) or session.get("awaiting_diet_type"):

            diet_type = extract_diet_type(user_message)
            days_in_message = extract_day_count(user_message)
            total_days = days_in_message or session.get("pending_diet_days")

            if not diet_type:
                # don't know veg/nonveg yet -- ask, and remember any
                # day count they already mentioned for next turn
                session["awaiting_diet_type"] = True
                if total_days:
                    session["pending_diet_days"] = total_days
                session.modified = True

                reply = "Veg (vegetarian) or Non-veg diet plan? Please reply 'veg' or 'nonveg'."
                print("DIET FLOW -- asking veg/nonveg")

            else:
                # we now know veg/nonveg -- clear pending state and build the plan
                session.pop("awaiting_diet_type", None)
                session.pop("pending_diet_days", None)
                session.modified = True

                plan_text, error = build_full_diet_plan(diet_type, total_days or DEFAULT_DIET_DAYS)
                reply = error if error else plan_text
                print("DIET FLOW -- generated plan:", diet_type, total_days or DEFAULT_DIET_DAYS, "days")

        # ---- 4. Normal case: call the model with conversation history ----
        else:
            if "chat_history" not in session:
                session["chat_history"] = []

            session["chat_history"].append({
                "role": "user",
                "content": user_message
            })
            # keep only the most recent N messages so the session
            # cookie / context doesn't grow without bound
            session["chat_history"] = session["chat_history"][-MAX_HISTORY_MESSAGES:]

            reply = ask_ollama(session["chat_history"])

            session["chat_history"].append({
                "role": "assistant",
                "content": reply
            })
            session["chat_history"] = session["chat_history"][-MAX_HISTORY_MESSAGES:]
            session.modified = True

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

    # basic size check (in addition to any Flask MAX_CONTENT_LENGTH config)
    file.seek(0, os.SEEK_END)
    size_mb = file.tell() / (1024 * 1024)
    file.seek(0)
    if size_mb > MAX_FILE_SIZE_MB:
        return jsonify({
            "success": False,
            "message": f"File too large. Max {MAX_FILE_SIZE_MB} MB allowed"
        }), 400

    user_id = session["user_id"]

    # unique, safe filename -- never trust the original filename directly
    ext = file.filename.rsplit(".", 1)[1].lower()
    safe_filename = f"{uuid.uuid4().hex}.{ext}"

    user_folder = os.path.join(UPLOAD_FOLDER, str(user_id))
    os.makedirs(user_folder, exist_ok=True)

    filepath = os.path.join(user_folder, safe_filename)
    file.save(filepath)

    original_name = file.filename
    report_type = ext  # e.g. "png", "jpg", "pdf" -- simple category for now

    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO reports
            (
                user_id,
                report_name,
                report_type,
                file_path,
                uploaded_at
            )
            VALUES (%s, %s, %s, %s, CURRENT_TIMESTAMP)
            RETURNING report_id
        """, (
            user_id,
            original_name,
            report_type,
            filepath
        ))

        report_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()

    except Exception as e:
        print("REPORT DB SAVE ERROR:", e)
        return jsonify({
            "success": False,
            "message": "File saved but could not record it in the database",
            "error": str(e)
        }), 500

    return jsonify({
        "success": True,
        "message": "Report uploaded successfully",
        "report_id": report_id,
        "filename": original_name
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
    Runs AI analysis on a report's extracted text and saves the result.

    TEMPORARY: for now this expects the extracted text to be sent in
    the request body as {"text": "..."}. Once OCR is wired in, OCR
    will extract this text automatically from the uploaded file and
    this same function can be called internally instead of needing
    the text passed in manually.
    """

    if "user_id" not in session:
        return jsonify({"success": False, "message": "Login Required"}), 401

    data = request.get_json(force=True)
    report_text = (data or {}).get("text", "").strip()

    if not report_text:
        return jsonify({
            "success": False,
            "message": "No report text provided"
        }), 400

    user_id = session["user_id"]

    # confirm this report belongs to the logged-in user before touching it
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT report_id FROM reports
        WHERE report_id=%s AND user_id=%s
    """, (report_id, user_id))

    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        return jsonify({"success": False, "message": "Report not found"}), 404

    # ask the model to analyze the report text (separate one-off prompt,
    # not part of the ongoing chat_history conversation)
    analysis_prompt = REPORT_ANALYSIS_INSTRUCTION + report_text

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
            blood_group
        )
        VALUES (%s,%s,%s,%s,%s)
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
    rows = rows[-6:]

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
    app.run(debug=True)