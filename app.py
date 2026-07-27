from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from db import get_connection

app = Flask(__name__)
app.secret_key = "health_guardian"

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


@app.route("/get_logged_user")
def get_logged_user():

    print("Session =", dict(session))

    return jsonify({
        "username": session.get("username", "User")
    })

# Main page
@app.route("/main")
def main():

    print("========== MAIN PAGE ==========")
    print("Session User ID =", session.get("user_id"))
    print("Session Username =", session.get("username"))

    user_id = session.get("user_id")

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
        return jsonify({"error": "Login Required"}), 401

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            family_contact1,
            family_contact2,
            family_contact3,
            doctor_contact,
            ambulance_contact,
            fire_brigade_contact
        FROM users
        WHERE user_id=%s
    """, (session["user_id"],))

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return jsonify({"error": "User Not Found"}), 404

    return jsonify({
        "family_contact1": row[0],
        "family_contact2": row[1],
        "family_contact3": row[2],
        "doctor_contact": row[3],
        "ambulance_contact": row[4],
        "fire_brigade_contact": row[5]
    })

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

    conn.commit()

    cur.close()
    conn.close()

    return redirect(url_for("main"))


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

    return "success"


if __name__ == "__main__":
    app.run(debug=True)