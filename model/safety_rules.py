"""
AI Health Guardian - Safety Rule Engine (v2)
Adds: (1) accurate multi-day diet plan generation without asking the AI to do math,
      (2) a guard against medicine-name hallucination for "what is X" queries.
Use these BEFORE / AFTER calling the AI model in your Flask backend.
"""

import re

# ============================================================
# 1. EMERGENCY KEYWORD DETECTION (check FIRST, before calling AI)
# ============================================================
EMERGENCY_KEYWORDS = [
    "chest pain", "difficulty breathing", "can't breathe", "cannot breathe",
    "unconscious", "not responding", "severe bleeding", "bleeding heavily",
    "slurred speech", "one side weak", "one side of my body",
    "snake bite", "snake bit", "scorpion", "seizure", "convulsion",
    "suicidal", "want to die", "faint", "fainting", "anaphylaxis",
    "severe allergic reaction", "face swelling", "choking",
    "baby not moving", "baby is not moving",
]

EMERGENCY_RESPONSE = (
    "This may be a medical emergency. Please activate SOS / emergency alert now "
    "and seek immediate medical help. If you are with the person, do not leave them alone."
)

def is_emergency(text: str) -> bool:
    text = text.lower()
    return any(k in text for k in EMERGENCY_KEYWORDS)


# ============================================================
# 2. BLOOD PRESSURE / HbA1c CLASSIFICATION (hardcoded)
# ============================================================
def classify_bp(systolic: int, diastolic: int):
    if systolic >= 180 or diastolic >= 120:
        return "Hypertensive Crisis", "This is a medical emergency. Activate SOS and seek immediate medical care."
    elif systolic >= 140 or diastolic >= 90:
        return "Stage 2 Hypertension", "This is high. Please consult a doctor soon and monitor regularly."
    elif systolic >= 130 or diastolic >= 80:
        return "Stage 1 Hypertension", "This is elevated. Monitor regularly and consult a doctor."
    elif systolic >= 120:
        return "Elevated", "Slightly above normal. Maintain a healthy lifestyle and monitor."
    else:
        return "Normal", "Your blood pressure is in the normal range. Keep monitoring regularly."

def classify_hba1c(hba1c: float):
    if hba1c >= 6.5:
        return "Diabetic", "Please consult a doctor for a diabetes management plan."
    elif hba1c >= 5.7:
        return "Pre-diabetic", "Please consult a doctor; lifestyle changes are recommended."
    else:
        return "Normal", "Your HbA1c is in the normal range."


# ============================================================
# 3. MEDICINE NAME FILTER — for AI OUTPUT (known drug names)
# ============================================================
BLOCKED_MEDS = [
    "paracetamol", "aspirin", "ibuprofen", "crocin", "dolo", "combiflam",
    "amoxicillin", "azithromycin", "metformin", "insulin", "disprin",
]

SAFE_MED_REPLY = (
    "I can't provide information on specific medicines. Please consult a doctor "
    "or pharmacist for accurate information about this medication."
)

def filter_medicine_names(ai_response: str) -> str:
    lower = ai_response.lower()
    if any(med in lower for med in BLOCKED_MEDS):
        return SAFE_MED_REPLY
    return ai_response


# ============================================================
# 4. MEDICINE-LOOKUP QUERY GUARD — for USER INPUT (prevents hallucination)
# Catches "what is X" style questions BEFORE calling the AI. A small model
# will confidently invent wrong facts (e.g. calling Dolo "anti-nausea", or
# "painkiller" a cocktail) instead of admitting it doesn't know — so these
# lookup-style questions are never sent to the AI at all.
# ============================================================
MED_LOOKUP_PATTERNS = [
    r"^what is\s+\w+\??$",
    r"^what('s| is) \w+ (used for|for)\??$",
    r"^tell me about\s+\w+\s*(medicine|tablet|drug)?\??$",
    r"\b(medicine|tablet|drug|pill|syrup|capsule)\b.*\b(is|called)\b\s+\w+",
]

def looks_like_medicine_lookup(text: str) -> bool:
    t = text.strip().lower()
    return any(re.search(p, t) for p in MED_LOOKUP_PATTERNS)

MED_LOOKUP_SAFE_REPLY = (
    "I'm not able to provide reliable information about specific medicines or drugs — "
    "please check with a doctor, pharmacist, or a verified source (like a medicine strip/leaflet) instead."
)


# ============================================================
# 5. MULTI-DAY DIET PLAN GENERATOR — accurate day/week math, no AI needed
# The AI should NEVER be asked to compute "120 days = how many weeks" or write
# out dozens of unique days — it gets the math wrong and trails off (seen:
# 120 days incorrectly became 40 weeks, with lunch/dinner missing for most
# weeks). Instead: build one solid 7-day template and repeat it in code.
# ============================================================
def diet_plan_duration_summary(num_days: int) -> str:
    weeks = num_days // 7
    remaining_days = num_days % 7
    if remaining_days:
        return f"{num_days} days = {weeks} weeks and {remaining_days} day(s)"
    return f"{num_days} days = {weeks} weeks"

def generate_multi_day_plan(num_days: int, seven_day_template: list):
    """
    seven_day_template: list of 7 dicts, each like
        {"breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..."}
    Returns a list of length num_days, cycling through the 7-day template,
    with correct day numbering — no AI math involved.
    """
    plan = []
    for day_index in range(num_days):
        template_day = seven_day_template[day_index % 7]
        plan.append({"day": day_index + 1, **template_day})
    return plan

def extract_requested_days(text: str):
    """Pull a requested number of days out of user text, e.g. '120 days diet plan' -> 120."""
    match = re.search(r"(\d+)\s*day", text.lower())
    if match:
        return int(match.group(1))
    return None


# ============================================================
# 6. MAIN PIPELINE — call this from your Flask route
# ============================================================
def get_safe_response(user_text: str, call_ai_model_fn, seven_day_template=None):
    """
    call_ai_model_fn: function(user_text) -> raw AI response string.
    seven_day_template: optional 7-day diet template (list of 7 dicts) used
                         when the user asks for a multi-day plan longer than 7 days.
    """
    if is_emergency(user_text):
        return EMERGENCY_RESPONSE

    if looks_like_medicine_lookup(user_text):
        return MED_LOOKUP_SAFE_REPLY

    requested_days = extract_requested_days(user_text)
    if requested_days and requested_days > 7 and seven_day_template:
        plan = generate_multi_day_plan(requested_days, seven_day_template)
        summary = diet_plan_duration_summary(requested_days)
        lines = [f"{summary}. Showing a repeating 7-day cycle:\n"]
        for d in plan[:7]:  # first cycle shown; full 'plan' list can be sent to frontend/DB
            lines.append(f"Day {d['day']}: Breakfast - {d['breakfast']}, Lunch - {d['lunch']}, "
                          f"Dinner - {d['dinner']}, Snack - {d['snack']}")
        lines.append(f"\n(This 7-day cycle repeats for all {requested_days} days.)")
        return "\n".join(lines)

    ai_response = call_ai_model_fn(user_text)
    return filter_medicine_names(ai_response)


# Example Flask usage:
#
# from safety_rules import get_safe_response
#
# SEVEN_DAY_VEG_TEMPLATE = [
#     {"breakfast": "Poha", "lunch": "Dal-rice with veg curry", "dinner": "Roti with paneer sabzi", "snack": "Fruit"},
#     ... (6 more days)
# ]
#
# @app.route("/chat", methods=["POST"])
# def chat():
#     user_text = request.json["message"]
#     reply = get_safe_response(user_text, call_ollama_model, seven_day_template=SEVEN_DAY_VEG_TEMPLATE)
#     return jsonify({"reply": reply})
