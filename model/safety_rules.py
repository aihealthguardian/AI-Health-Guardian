"""
AI Health Guardian - Safety & Rule Engine (v3)
All keyword lists, guards, diet-flow logic, and the full /chat decision
pipeline now live here. app.py just calls handle_chat_message() and
passes it ask_ollama (or any other model-calling function).
"""

import re

# ============================================================
# 1. EMERGENCY KEYWORD DETECTION
# ============================================================
EMERGENCY_KEYWORDS = [
    "chest pain", "cant breathe", "can't breathe", "cannot breathe",
    "difficulty breathing", "breathing trouble", "shortness of breath",
    "heavy bleeding", "severe bleeding", "bleeding a lot", "bleeding heavily",
    "unconscious", "unresponsive", "not responding", "fainted", "passed out",
    "faint", "fainting",
    "stroke", "face drooping", "slurred speech", "one side weak", "one side of my body",
    "severe bite", "snake bite", "snake bit", "dog bite deep", "scorpion",
    "seizure", "convulsion",
    "heart attack", "cardiac arrest",
    "suicide", "suicidal", "want to die", "self harm", "overdose",
    "anaphylaxis", "severe allergic reaction", "face swelling", "choking",
    "baby not moving", "baby is not moving",
]

EMERGENCY_REPLY = (
    "This sounds like it could be a medical emergency. "
    "Please activate SOS now and seek immediate emergency medical help. "
    "If someone is with you, ask them to call for help right away."
)

def is_emergency(text: str) -> bool:
    lower = text.lower()
    return any(k in lower for k in EMERGENCY_KEYWORDS)


# ============================================================
# 2. OFF-TOPIC GUARD
# ============================================================
HEALTH_TOPIC_KEYWORDS = [
    "pain", "fever", "cold", "cough", "flu", "headache", "vomit", "nausea",
    "diet", "food", "nutrition", "veg", "nonveg", "non-veg", "meal", "water",
    "medicine", "doctor", "hospital", "symptom", "sick", "ill", "health",
    "bp", "blood pressure", "sugar", "diabetes", "weight", "appointment",
    "injury", "wound", "cut", "burn", "allergy", "infection", "rash",
    "sleep", "stress", "exercise", "tired", "fatigue"
]

GREETING_WORDS = [
    "hi", "hii", "hello", "hey", "good morning", "good evening",
    "good afternoon", "who are you", "what can you do"
]

SHORT_REPLY_WORDS = [
    "ok", "okay", "yes", "no", "sure", "fine", "thanks", "thank you",
    "veg", "nonveg", "non-veg", "non veg", "vegetarian", "non vegetarian"
]

OFF_TOPIC_REPLY = (
    "I can only help with health symptoms, emergencies, and diet/nutrition "
    "guidance. Could you ask something related to those?"
)

def is_on_topic(message: str) -> bool:
    lower = message.lower().strip()
    if any(g in lower for g in GREETING_WORDS):
        return True
    if lower in SHORT_REPLY_WORDS:
        return True
    return any(k in lower for k in HEALTH_TOPIC_KEYWORDS)


# ============================================================
# 3. MEDICINE NAME FILTER (AI OUTPUT side)
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
# 4. MEDICINE-LOOKUP QUERY GUARD (USER INPUT side)
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
# 5. BP / HbA1c CLASSIFICATION (hardcoded, no AI)
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
# 6. DIET FLOW
# ============================================================
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

def is_diet_question(message: str) -> bool:
    lower = message.lower()
    return any(k in lower for k in DIET_KEYWORDS)

def extract_diet_type(message: str):
    lower = message.lower()
    if re.search(r'\bnon[\s-]?veg(etarian)?\b', lower):
        return "nonveg"
    if re.search(r'\bveg(etarian)?\b', lower):
        return "veg"
    return None

def extract_day_count(message: str):
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

def week_diet_prompt(diet_type: str) -> str:
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

def is_valid_day_block(block: str, diet_type: str) -> bool:
    lower = block.lower()
    if "breakfast" not in lower or "lunch" not in lower or "dinner" not in lower:
        return False
    if "consult a doctor" in lower or "medical consultation" in lower:
        return False
    if diet_type == "veg" and any(w in lower for w in NON_VEG_WORDS):
        return False
    return True

def parse_week_plan(raw_text: str, diet_type: str):
    parts = re.split(r'Day\s*\d+\s*:?', raw_text, flags=re.IGNORECASE)
    blocks = [p.strip() for p in parts if p.strip()]
    valid_blocks = [b for b in blocks if is_valid_day_block(b, diet_type)]
    return valid_blocks[:10]

def build_full_diet_plan(diet_type: str, total_days: int, call_ai_model_fn):
    """
    call_ai_model_fn: function(messages_list) -> raw AI response string
                       (pass app.py's ask_ollama here).
    Returns (plan_text, error_message). Exactly one of the two is None.
    """
    if total_days > MAX_DIET_DAYS:
        return None, f"Please request {MAX_DIET_DAYS} days or fewer for a diet plan."

    raw = call_ai_model_fn([
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


# ============================================================
# 7. REPORT ANALYSIS INSTRUCTION (used by /upload_report for OCR'd text)
# ============================================================
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
# 8. FULL /chat PIPELINE — app.py just calls this
# ============================================================
MAX_HISTORY_MESSAGES = 12

def handle_chat_message(user_message: str, session, call_ai_model_fn):
    """
    session: Flask session dict (get/pop/__setitem__ + session.modified = True).
    call_ai_model_fn: function(messages_list) -> raw AI response string
                       (pass app.py's ask_ollama here).
    Returns the final reply string. Mutates `session` for chat_history /
    diet-flow state, same as the original app.py logic did.
    """

    # 1. Emergency guard
    if is_emergency(user_message):
        return EMERGENCY_REPLY

    # 2. Off-topic guard
    if not is_on_topic(user_message):
        return OFF_TOPIC_REPLY

    # 3. Medicine-lookup guard (never hand these to the AI)
    if looks_like_medicine_lookup(user_message):
        return MED_LOOKUP_SAFE_REPLY

    # 4. Diet flow
    if is_diet_question(user_message) or session.get("awaiting_diet_type"):
        diet_type = extract_diet_type(user_message)
        days_in_message = extract_day_count(user_message)
        total_days = days_in_message or session.get("pending_diet_days")

        if not diet_type:
            session["awaiting_diet_type"] = True
            if total_days:
                session["pending_diet_days"] = total_days
            session.modified = True
            return "Veg (vegetarian) or Non-veg diet plan? Please reply 'veg' or 'nonveg'."

        session.pop("awaiting_diet_type", None)
        session.pop("pending_diet_days", None)
        session.modified = True

        plan_text, error = build_full_diet_plan(diet_type, total_days or DEFAULT_DIET_DAYS, call_ai_model_fn)
        return error if error else plan_text

    # 5. Normal case: call the model with conversation history
    if "chat_history" not in session:
        session["chat_history"] = []

    session["chat_history"].append({"role": "user", "content": user_message})
    session["chat_history"] = session["chat_history"][-MAX_HISTORY_MESSAGES:]

    raw_reply = call_ai_model_fn(session["chat_history"])
    reply = filter_medicine_names(raw_reply)

    session["chat_history"].append({"role": "assistant", "content": reply})
    session["chat_history"] = session["chat_history"][-MAX_HISTORY_MESSAGES:]
    session.modified = True

    return reply