from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "health-guardian"

DIET_KEYWORDS = [
    "diet", "diet plan", "meal plan", "food plan", "what should i eat",
    "what to eat", "diet chart", "healthy food", "meal", "nutrition",
]
VEG_NONVEG_WORDS = ["veg", "vegetarian", "non veg", "non-veg", "nonveg", "vegan"]

def is_diet_question(text):
    t = text.lower(); return any(k in t for k in DIET_KEYWORDS)

def has_veg_preference(text):
    t = text.lower(); return any(w in t for w in VEG_NONVEG_WORDS)

EMERGENCY_KEYWORDS = [
    "chest pain", "heart attack", "cannot breathe", "can't breathe",
    "difficulty breathing", "shortness of breath", "stroke",
    "slurred speech", "one side weak", "baby not moving", "unconscious",
    "collapse", "seizure", "choking", "suicide", "kill myself", "want to die",
]
BLEEDING_WORDS = ["bleeding", "blood loss"]
BLEEDING_SEVERITY_WORDS = ["heavy", "heavily", "severe", "severely", "a lot", "lot of", "won't stop", "wont stop", "non stop", "profuse"]

def is_emergency(text):
    t = text.lower()
    if any(k in t for k in EMERGENCY_KEYWORDS):
        return True
    if any(b in t for b in BLEEDING_WORDS) and any(s in t for s in BLEEDING_SEVERITY_WORDS):
        return True
    return False

EMERGENCY_REPLY = (
    "This sounds like a medical emergency. Please act now:\n"
    "- Activate SOS / call an ambulance or go to the nearest emergency room immediately\n"
    "- Do not wait to see if it improves on its own\n"
    "- Stay with the person and keep them safe until help arrives\n\n"
    "India Ambulance: 108\nNational Emergency: 112"
)

pending_diet_request = {"text": None}

def call_model(prompt):
    payload = {"model": MODEL_NAME, "prompt": prompt, "stream": False}
    try:
        r = requests.post(OLLAMA_URL, json=payload, timeout=120)
        r.raise_for_status()
        return r.json().get("response", "").strip()
    except Exception as e:
        return f"Sorry, I couldn't reach the model right now. ({e})"

# FIX: explicitly spell out Day 1, Day 2 ... Day 7 (not "Day X") so the
# model fills in real numbers instead of copying "X" literally, and always
# produces all 7 days instead of stopping after 1.
def call_model_for_diet(prompt):
    strict_prompt = (
        prompt + "\n\nGive a 7-day meal plan. Write out all 7 days one after "
        "another, labeled exactly: Day 1, Day 2, Day 3, Day 4, Day 5, Day 6, Day 7. "
        "For each day give real food items in this format:\n"
        "Day 1:\nBreakfast: ...\nLunch: ...\nEvening Snack: ...\nDinner: ...\n"
        "Day 2:\nBreakfast: ...\nLunch: ...\nEvening Snack: ...\nDinner: ...\n"
        "(continue the same way through Day 7). Do not write 'Day X', use the actual day number."
    )
    return call_model(strict_prompt)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)
    user_message = (data or {}).get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Please type a message."})

    if is_emergency(user_message):
        pending_diet_request["text"] = None
        return jsonify({"reply": EMERGENCY_REPLY})

    if pending_diet_request["text"] and has_veg_preference(user_message) and not is_diet_question(user_message):
        combined = pending_diet_request["text"] + " " + user_message
        pending_diet_request["text"] = None
        return jsonify({"reply": call_model_for_diet(combined)})

    if is_diet_question(user_message) and not has_veg_preference(user_message):
        pending_diet_request["text"] = user_message
        return jsonify({"reply": "Veg or Non-Veg?"})

    if is_diet_question(user_message) and has_veg_preference(user_message):
        pending_diet_request["text"] = None
        return jsonify({"reply": call_model_for_diet(user_message)})

    return jsonify({"reply": call_model(user_message)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
