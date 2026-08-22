"""
AI Health Guardian - OCR Module (v9, DUAL-ENGINE + GEMINI FALLBACK)
====================================================
Uses BOTH Tesseract and EasyOCR and keeps whichever attempt scores
highest confidence -- printed/digital reports (BP machines, thermometer
screens) are usually read best by Tesseract, while handwritten notes and
messy/angled photos are usually read best by EasyOCR. Running both and
letting confidence decide covers both cases, at the cost of being slower
than either engine alone (this trade-off was chosen deliberately: for
this app, correct vitals matter more than a few extra seconds).

Accuracy on the Tesseract side is pushed higher via:
  - Preprocessing includes adaptive thresholding + unsharp-mask sharpening
    on top of CLAHE/denoise, which helps small vital numbers (like
    "140/90" or "98.6") stay crisp after upscaling.
  - A DIGIT-ONLY Tesseract pass (character whitelist restricted to digits
    + punctuation used in vitals) runs alongside the normal passes.
    Restricting the whitelist stops Tesseract from mis-reading digits as
    letters (e.g. "8" -> "B", "0" -> "O"), which was the main source of
    bad vitals extraction.
  - Several PSM modes tried (6, 4, 11, 7, 3) since different photos
    crop/lay out text differently.

extract_vitals() searches the COMBINED text from every attempt that ran
(both engines, all passes), not just the single "best" one -- so if the
digit-only Tesseract pass catches the BP but EasyOCR catches a
handwritten sugar reading, both still get picked up.

There is still a FAST PATH: Tesseract alone is tried first on the raw
image. If its confidence clears FAST_PATH_CONFIDENCE_THRESHOLD, we skip
EasyOCR and the rest of the sweep entirely -- this keeps clean, well-lit
photos fast, while harder images still get the full accuracy-first sweep.

NEW IN v9 -- GEMINI FALLBACK (opt-in, only runs when needed):
    After the Tesseract+EasyOCR sweep finishes, if the regex-based
    extract_vitals() still has NOT DETECTED fields, we make ONE call to
    the Gemini API (gemini-1.5-flash or newer) with the ORIGINAL image
    and ask it to return the vitals directly as JSON. Gemini is good at:
      - Reading handwriting/messy photos regex+OCR both failed on
      - Understanding context (e.g. knowing "98.6" next to a thermometer
        icon is a temperature even without an explicit unit)
    This is deliberately a LAST-RESORT fallback, not a replacement for
    the free OCR engines above, to keep API usage (and cost) low:
      - It is skipped entirely if Tesseract/EasyOCR already found every
        field.
      - It only ever makes ONE call per image/page, not a sweep.
      - It never overwrites a field the OCR sweep already found -- it
        only fills in fields that are still "NOT DETECTED".
    Requires: pip install google-generativeai
    Requires: GEMINI_API_KEY environment variable set (get one at
        https://aistudio.google.com/apikey -- note that Google's FREE
        tier is rate-limited and meant for testing/low volume; for
        production traffic you will need to enable billing on the
        Google Cloud project tied to the key).
    If the package isn't installed or the key isn't set, this fallback
    is silently skipped and the module behaves exactly like v8.

PDF SUPPORT:
    PDFs are rasterized page-by-page into images (via pdf2image, which
    wraps the poppler `pdftoppm` binary) and then each page image is run
    through the exact same dual-engine sweep as a normal photo upload.
    Per-page best text is joined together for the final text, and vitals
    are searched across every attempt from every page (same "search
    everything, keep whichever field is found" approach used for images).
    The Gemini fallback (if triggered) runs once on the FIRST page only,
    since vitals reports are almost always single-page and this avoids
    one API call per page.

REQUIREMENTS:
    pip install easyocr opencv-python-headless pillow numpy pytesseract pdf2image
    pip install google-generativeai   # optional, for the Gemini fallback

    Tesseract ALSO needs its separate program installed (pytesseract is just
    a Python wrapper around it, not the OCR engine itself):
      Windows: download & install from
        https://github.com/UB-Mannheim/tesseract/wiki
      Linux: sudo apt install tesseract-ocr
      Mac:   brew install tesseract

    PDF support ALSO needs poppler installed (pdf2image is just a wrapper
    around the poppler `pdftoppm`/`pdftocairo` binaries, not a PDF renderer
    itself):
      Windows: download poppler binaries and add the `bin/` folder to PATH
        https://github.com/oschwartz10612/poppler-windows/releases/
      Linux: sudo apt install poppler-utils
      Mac:   brew install poppler

USAGE (standalone test):
    python ocr_module.py path/to/image.jpg
    python ocr_module.py path/to/report.pdf

USAGE (inside Flask):
    from ocr_module import extract_text_and_vitals
"""

import easyocr
import pytesseract
import numpy as np
import cv2
import re
import sys
import io
import os
import json
import shutil
from PIL import Image

try:
    from pdf2image import convert_from_bytes, convert_from_path
    from pdf2image.exceptions import PDFInfoNotInstalledError
    PDF_SUPPORT_AVAILABLE = True
except ImportError:
    PDF_SUPPORT_AVAILABLE = False

# ------------------------------------------------------------------
# Gemini fallback: optional. Only enabled if the package is installed
# AND an API key is present in the environment. Missing either one just
# disables the fallback -- it never crashes the rest of the OCR pipeline.
# ------------------------------------------------------------------
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_MODEL_NAME = os.environ.get("GEMINI_MODEL", "gemini-3.6-flash")

try:
    import google.generativeai as genai
    if GEMINI_API_KEY:
        genai.configure(api_key=GEMINI_API_KEY)
        GEMINI_AVAILABLE = True
    else:
        GEMINI_AVAILABLE = False
        print(
            "NOTE: google-generativeai is installed but GEMINI_API_KEY is "
            "not set -- Gemini fallback is disabled. Set the GEMINI_API_KEY "
            "environment variable to enable it (see module docstring)."
        )
except ImportError:
    GEMINI_AVAILABLE = False
    # Not printing a warning here on purpose: Gemini is optional, unlike
    # Tesseract/poppler which the OCR pipeline actually depends on. Silently
    # skipping keeps the console clean for people who don't want this feature.

# ------------------------------------------------------------------
# Tesseract path: only hardcode it if tesseract isn't already found
# on PATH (Linux/Mac servers usually have it on PATH after apt/brew
# install -- forcing a Windows-only path there would crash immediately
# with TesseractNotFoundError). On Windows, fall back to the common
# default install location if PATH lookup fails.
# ------------------------------------------------------------------
if shutil.which("tesseract") is None:
    _default_win_path = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    if os.path.exists(_default_win_path):
        pytesseract.pytesseract.tesseract_cmd = _default_win_path
    else:
        print(
            "WARNING: tesseract binary not found on PATH and not found at "
            f"'{_default_win_path}'. Install Tesseract OCR separately (see "
            "module docstring) or OCR calls will fail with "
            "TesseractNotFoundError."
        )

if not PDF_SUPPORT_AVAILABLE:
    print(
        "WARNING: pdf2image is not installed. PDF report uploads will not "
        "be OCR'd. Run `pip install pdf2image` and install poppler (see "
        "module docstring) to enable PDF support."
    )
elif shutil.which("pdftoppm") is None and shutil.which("pdftocairo") is None:
    print(
        "WARNING: poppler (pdftoppm/pdftocairo) not found on PATH. "
        "pdf2image needs the poppler binaries separately from the "
        "pdf2image python package -- see module docstring for install "
        "instructions. PDF OCR calls will fail until this is installed."
    )

reader = easyocr.Reader(['en'], gpu=False)

# Confidence above this on the fast path means we skip the slow passes
FAST_PATH_CONFIDENCE_THRESHOLD = 0.6

# Fast-path text also needs at least this many words, otherwise a couple
# of confidently-read stray characters (e.g. a table border read as "|")
# can produce a high average confidence on almost no real text, causing
# us to wrongly skip the slower/more accurate passes.
FAST_PATH_MIN_WORDS = 8

# Fast-path text also needs at least this many multi-digit number tokens
# (e.g. "36", "120", "100") -- vitals are almost always 2-3 digit numbers.
# Counting raw digit CHARACTERS was fooled by list numbering like "1."
# and "2." in front of each line, which are single digits that added up
# to "enough" digits without any real vitals ever being read. Counting
# multi-digit tokens instead means list markers don't count, so a pass
# that only captured labels ("Temperature", "Pulse rate") and lost every
# actual number correctly fails this check and falls through to the
# slower/more accurate passes.
FAST_PATH_MIN_NUMBER_TOKENS = 2

# Used when picking the "best" attempt out of a full sweep. Below this
# word count, an attempt's confidence is scaled down proportionally --
# e.g. a lone "|" read with 95% confidence should never outrank a real
# paragraph read with 75% confidence, but raw confidence alone can't tell
# the difference since it's just an average over however few characters
# were found.
MIN_WORDS_FOR_FULL_CONFIDENCE = 8

# Rasterization DPI for PDF pages before OCR. Higher = sharper small
# vitals numbers but slower and more memory; 300 is the usual sweet spot
# for OCR on scanned/printed documents.
PDF_RENDER_DPI = 300


def _ranking_score(text, conf):
    """Confidence, penalized when very little text was actually found."""
    word_count = len(text.split())
    if word_count >= MIN_WORDS_FOR_FULL_CONFIDENCE:
        return conf
    return conf * (word_count / MIN_WORDS_FOR_FULL_CONFIDENCE)

# Characters Tesseract is allowed to output during the digit-only pass.
# Restricting this stops letter/digit confusion (8<->B, 0<->O, 5<->S, etc.)
VITALS_CHAR_WHITELIST = "0123456789./,bpmkgCF°%- "


def to_cv_image(image_bytes_or_path):
    if isinstance(image_bytes_or_path, (bytes, bytearray)):
        pil_img = Image.open(io.BytesIO(image_bytes_or_path)).convert("RGB")
        return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
    return cv2.imread(image_bytes_or_path)


def light_preprocess(img, scale=3):
    """Original light pipeline: grayscale -> upscale -> denoise -> CLAHE."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    denoised = cv2.fastNlMeansDenoising(gray, h=8)
    clahe = cv2.createCLAHE(clipLimit=1.5, tileGridSize=(8, 8))
    return clahe.apply(denoised)


def strong_preprocess(img, scale=3):
    """
    Heavier pipeline aimed specifically at Tesseract accuracy on small
    printed/handwritten numbers:
      1. CLAHE contrast boost (same as light_preprocess)
      2. Unsharp-mask sharpening -- makes thin digit strokes stand out
         instead of blurring into the background after upscaling
      3. Adaptive threshold (Gaussian) -- turns the image into clean
         black-on-white text, which Tesseract's LSTM engine handles far
         more reliably than a busy grayscale photo (shadows, glare, faint
         ink all confuse it otherwise)
    """
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    denoised = cv2.fastNlMeansDenoising(gray, h=8)

    clahe = cv2.createCLAHE(clipLimit=1.5, tileGridSize=(8, 8))
    contrasted = clahe.apply(denoised)

    # Unsharp mask: blur the image, then push the original AWAY from the
    # blur to exaggerate edges (digit strokes) without amplifying noise.
    blurred = cv2.GaussianBlur(contrasted, (0, 0), sigmaX=3)
    sharpened = cv2.addWeighted(contrasted, 1.5, blurred, -0.5, 0)

    binary = cv2.adaptiveThreshold(
        sharpened, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,
        blockSize=31, C=15,
    )
    return binary


# ============================================================
# ENGINE 1: EasyOCR
# ============================================================
def run_easyocr(image):
    results = reader.readtext(image, detail=1, paragraph=False)
    if not results:
        return "", 0
    text = "\n".join(t for _, t, c in results)
    avg_conf = sum(c for _, t, c in results) / len(results)
    return text, avg_conf


# ============================================================
# ENGINE 2: Tesseract
# ============================================================
def run_tesseract(image, psm=6, whitelist=None):
    pil_img = Image.fromarray(image) if isinstance(image, np.ndarray) else image
    config = f"--oem 1 --psm {psm}"  # oem 1 = LSTM-only engine, generally more accurate
    if whitelist:
        config += f" -c tessedit_char_whitelist={whitelist}"
    data = pytesseract.image_to_data(pil_img, config=config, output_type=pytesseract.Output.DICT)
    words, confs = [], []
    for i, word in enumerate(data["text"]):
        if word.strip():
            words.append(word)
            conf = int(data["conf"][i]) if str(data["conf"][i]).lstrip("-").isdigit() else 0
            if conf >= 0:
                confs.append(conf)
    text = " ".join(words)
    avg_conf = (sum(confs) / len(confs) / 100) if confs else 0
    return text, avg_conf


def run_tesseract_best_psm(image, whitelist=None):
    """Try several page-segmentation modes and keep whichever gives the
    highest confidence -- small numbers next to labels (like '140/90') are
    sometimes only picked up correctly under a specific PSM."""
    best = ("", 0)
    # 6=uniform block, 4=column, 11=sparse text, 7=single line, 3=full auto
    for psm in (6, 4, 11, 7, 3):
        text, conf = run_tesseract(image, psm=psm, whitelist=whitelist)
        if conf > best[1]:
            best = (text, conf)
    return best


def run_tesseract_digits_only(image):
    """
    Dedicated pass restricted to digits + the punctuation vitals actually
    use (., /, °, %, etc). This is the single biggest accuracy win for
    Tesseract on vitals -- without a whitelist it regularly swaps digits
    for look-alike letters (8<->B, 0<->O, 1<->I/l, 5<->S), which silently
    breaks the regex matching in extract_vitals(). With the whitelist
    those letters simply can't be output, so Tesseract is forced to pick
    the closest DIGIT instead.
    """
    return run_tesseract_best_psm(image, whitelist=VITALS_CHAR_WHITELIST)


def run_tesseract_line_by_line(img):
    """
    Splits the image into individual text lines (using a horizontal
    projection of dark pixels to find line boundaries), upscales EACH line
    separately to a large fixed height, and OCRs each line on its own with
    PSM 7 (single-line mode). Small numbers that get lost when the whole
    page is read at once often become readable this way, because a single
    line stretched to fill the frame is much easier for the OCR model than
    a full page shrunk down.
    """
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) if len(img.shape) == 3 else img.copy()

    # Binarize (text = white, background = black) for finding line rows
    _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Sum dark pixels per row -> rows with text have high sums, gaps have ~0
    row_sums = np.sum(binary, axis=1)
    threshold = row_sums.max() * 0.03 if row_sums.max() > 0 else 0

    lines = []
    in_line = False
    start = 0
    for y, val in enumerate(row_sums):
        if val > threshold and not in_line:
            in_line = True
            start = y
        elif val <= threshold and in_line:
            in_line = False
            if y - start > 5:  # ignore tiny noise slivers
                lines.append((start, y))
    if in_line:
        lines.append((start, len(row_sums)))

    if not lines:
        return "", 0

    extracted_lines = []
    confs = []
    target_height = 60  # upscale every line to this height

    for (y1, y2) in lines:
        pad = 4
        y1p, y2p = max(0, y1 - pad), min(gray.shape[0], y2 + pad)
        line_crop = gray[y1p:y2p, :]
        h, w = line_crop.shape
        if h == 0:
            continue
        scale = target_height / h
        line_resized = cv2.resize(line_crop, (int(w * scale), target_height), interpolation=cv2.INTER_CUBIC)

        config = "--oem 1 --psm 7"  # psm 7 = treat image as a single text line
        data = pytesseract.image_to_data(Image.fromarray(line_resized), config=config, output_type=pytesseract.Output.DICT)
        words = [w for w in data["text"] if w.strip()]
        line_confs = [int(c) for c in data["conf"] if str(c).lstrip("-").isdigit() and int(c) >= 0]
        if words:
            extracted_lines.append(" ".join(words))
            confs.extend(line_confs)

    text = "\n".join(extracted_lines)
    avg_conf = (sum(confs) / len(confs) / 100) if confs else 0
    return text, avg_conf


# ============================================================
# ENGINE 3: Gemini -- structured extraction (vitals gap-fill +
# medicines + appointments) in a single call per image/page.
# ============================================================

# Single combined prompt: fills in any vitals the OCR sweep missed, AND
# extracts medicines / appointments (which OCR+regex can't reliably do
# on their own -- names and dates need real language understanding, not
# just character recognition). One call covers all three so we don't pay
# for three separate Gemini requests per upload.
GEMINI_STRUCTURED_PROMPT = """You are looking at a photo or scan of a
medical report, prescription, appointment slip, or handwritten health
note. Extract ONLY information that is ACTUALLY visible in the image.
Never guess, estimate, or invent a value that isn't really written there.

Return ONLY a raw JSON object (no markdown fences, no extra text) in
exactly this shape:

{
  "vitals": {
    "blood_pressure": "<systolic>/<diastolic>, e.g. 120/80, or null",
    "pulse": "<number> bpm, e.g. 78 bpm, or null",
    "temperature": "<number> in Celsius, e.g. 37.0°C, or null (convert from °F if needed)",
    "sugar": "<number> as a plain string (mg/dL), or null",
    "weight": "<number> as a plain string (kg), or null (convert from lb if needed)",
    "blood_group": "<e.g. A+, O-, AB+, or null if not stated>",
    "report_date": "<YYYY-MM-DD -- the date this report/test was taken or issued, as printed on the document itself, or null if no date is visible anywhere on it>"
  },
  "medicines": [
    {
      "medicine_name": "<name as written>",
      "dosage": "<e.g. '500mg', '1 tablet', or null if not stated>",
      "medicine_time": "<time to take it, 24-hour HH:MM format, or null if no time is given>",
      "duration_days": "<number of days to take this medicine, as a plain integer, or null if no duration/course-length is stated (e.g. 'for 5 days' -> 5, 'for 1 week' -> 7)>"
    }
  ],
  "appointments": [
    {
      "doctor_name": "<doctor's name, or null>",
      "hospital_name": "<hospital/clinic name, or null>",
      "appointment_date": "<YYYY-MM-DD, or null if no date is given>",
      "appointment_time": "<24-hour HH:MM, or null if no time is given>"
    }
  ]
}

Rules:
- "medicines" and "appointments" should be EMPTY LISTS ([]) if none are
  visible in the image -- do not invent entries.
- Only include a medicine entry if a medicine NAME is actually visible.
- Only include an appointment entry if AT LEAST a date or a doctor/hospital
  name is visible -- don't invent an appointment from a stray date.
- Any field you cannot actually read from the image MUST be null."""


def _cv_image_to_png_bytes(img):
    return cv2.imencode(".png", img)[1].tobytes()


def run_gemini_structured(cv_image):
    """
    Single Gemini call: returns a dict with keys "vitals" (dict),
    "medicines" (list of dicts), "appointments" (list of dicts) --
    always all three keys present, defaulting to {} / [] / [] on any
    failure so callers never need to check for missing keys.

    Never raises -- any failure (network, bad JSON, missing key, Gemini
    not configured, etc.) is caught and results in the empty-but-valid
    shape above, so a Gemini outage never breaks the rest of the OCR
    pipeline.
    """
    empty = {"vitals": {}, "medicines": [], "appointments": [], "report_date": None}
    if not GEMINI_AVAILABLE:
        return empty

    try:
        model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        png_bytes = _cv_image_to_png_bytes(cv_image)
        response = model.generate_content(
            [
                GEMINI_STRUCTURED_PROMPT,
                {"mime_type": "image/png", "data": png_bytes},
            ],
            generation_config={"temperature": 0, "response_mime_type": "application/json"},
        )
        raw = response.text.strip()
        # Defensive: strip markdown fences if the model adds them anyway
        raw = re.sub(r"^```(?:json)?|```$", "", raw, flags=re.MULTILINE).strip()
        parsed = json.loads(raw)
    except Exception as e:
        print(f"NOTE: Gemini structured extraction failed, skipping ({e})")
        return empty

    def _clean(v):
        if v is None:
            return None
        s = str(v).strip()
        return s if s and s.lower() not in ("null", "none") else None

    vitals_raw = parsed.get("vitals") or {}
    vitals = {}
    for key in ("blood_pressure", "pulse", "temperature", "sugar", "weight", "blood_group"):
        cleaned = _clean(vitals_raw.get(key))
        if cleaned:
            vitals[key] = cleaned
    report_date = _clean(vitals_raw.get("report_date"))

    medicines = []
    for m in (parsed.get("medicines") or []):
        name = _clean(m.get("medicine_name"))
        if not name:
            continue  # a medicine entry with no name isn't usable
        duration_raw = _clean(m.get("duration_days"))
        duration_days = None
        if duration_raw:
            try:
                duration_days = int(float(duration_raw))
                if duration_days <= 0:
                    duration_days = None
            except (TypeError, ValueError):
                duration_days = None
        medicines.append({
            "medicine_name": name,
            "dosage": _clean(m.get("dosage")) or "",
            "medicine_time": _clean(m.get("medicine_time")),
            "duration_days": duration_days,
        })

    appointments = []
    for a in (parsed.get("appointments") or []):
        doctor = _clean(a.get("doctor_name"))
        hospital = _clean(a.get("hospital_name"))
        date = _clean(a.get("appointment_date"))
        if not (doctor or hospital or date):
            continue  # nothing usable in this entry
        appointments.append({
            "doctor_name": doctor or "",
            "hospital_name": hospital or "",
            "appointment_date": date,
            "appointment_time": _clean(a.get("appointment_time")),
        })

    return {"vitals": vitals, "medicines": medicines, "appointments": appointments, "report_date": report_date}


def _missing_vitals_fields(vitals):
    return [k for k, v in vitals.items() if v == "NOT DETECTED - please verify manually"]


def apply_gemini_structured(vitals, cv_image):
    """
    Runs the single combined Gemini call and returns
    (vitals, medicines, appointments, report_date):
      - vitals: the input dict with ONLY the still-missing fields filled
        in from Gemini (OCR-found values are never overridden), tagged
        "(via Gemini)".
      - medicines / appointments: whatever Gemini found, as lists of
        dicts ready to insert into the medicines/appointments tables.
      - report_date: "YYYY-MM-DD" if a date was visible on the report
        itself, else None.
    Safe to call even if Gemini isn't configured -- returns
    (vitals unchanged, [], [], None).
    """
    if not GEMINI_AVAILABLE:
        return vitals, [], [], None

    result = run_gemini_structured(cv_image)

    missing = _missing_vitals_fields(vitals)
    for field in missing:
        if field in result["vitals"]:
            vitals[field] = result["vitals"][field] + "  (via Gemini)"

    return vitals, result["medicines"], result["appointments"], result["report_date"]


# ============================================================
# COMBINE: fast path first (Tesseract, standard passes, on the raw image).
# If that's confident enough, return immediately. Otherwise fall back to
# the full sweep -- preprocessed variants, the digit-only pass, and the
# line-by-line pass -- and keep whichever attempt has the highest average
# confidence.
# ============================================================
def extract_text_from_image(image_bytes_or_path, return_debug=False):
    original = to_cv_image(image_bytes_or_path)

    attempts = []

    # ---- FAST PATH: try Tesseract on the original image first ----
    fast_text, fast_conf = run_tesseract_best_psm(original)
    attempts.append(("tesseract_original", fast_text, fast_conf))

    fast_word_count = len(fast_text.split())
    fast_number_tokens = len(re.findall(r"\d{2,}", fast_text))
    if (
        fast_conf >= FAST_PATH_CONFIDENCE_THRESHOLD
        and fast_word_count >= FAST_PATH_MIN_WORDS
        and fast_number_tokens >= FAST_PATH_MIN_NUMBER_TOKENS
    ):
        combined_text = fast_text
        if return_debug:
            return fast_text, attempts, combined_text, original
        return fast_text

    # ---- SLOW PATH: fast path wasn't confident enough, try everything else ----
    processed = light_preprocess(original)
    strong = strong_preprocess(original)

    text, conf = run_tesseract_best_psm(processed)
    attempts.append(("tesseract_light_processed", text, conf))

    text, conf = run_tesseract_best_psm(strong)
    attempts.append(("tesseract_strong_processed", text, conf))

    # Digit-only passes on both preprocessed variants -- this is what
    # actually rescues vitals numbers that the general passes above
    # misread as letters.
    text, conf = run_tesseract_digits_only(strong)
    attempts.append(("tesseract_digits_strong", text, conf))

    text, conf = run_tesseract_digits_only(processed)
    attempts.append(("tesseract_digits_light", text, conf))

    # EasyOCR on both original and preprocessed -- this is what rescues
    # handwritten or messy/angled photos that the Tesseract passes above
    # struggle with.
    for label, img in [("easyocr_original", original), ("easyocr_processed", processed)]:
        text, conf = run_easyocr(img)
        attempts.append((label, text, conf))

    line_text, line_conf = run_tesseract_line_by_line(original)
    attempts.append(("tesseract_line_by_line", line_text, line_conf))

    best_label, best_text, best_conf = max(attempts, key=lambda a: _ranking_score(a[1], a[2]))
    # for vitals search: combine every attempt that actually ran (fast path
    # only ever contributes one attempt, slow path contributes all of them)
    combined_text = "\n".join(t for _, t, c in attempts)

    if return_debug:
        return best_text, attempts, combined_text, original
    return best_text


# ============================================================
# PDF SUPPORT: rasterize each page to an image, then run the exact same
# extract_text_from_image() sweep (fast path + full accuracy sweep) on
# every page. Per-page best text is joined for the final "best_text";
# combined_text across ALL pages' attempts is used for vitals search, same
# as the image path.
# ============================================================
def extract_text_from_pdf(pdf_bytes_or_path, return_debug=False):
    if not PDF_SUPPORT_AVAILABLE:
        raise RuntimeError(
            "pdf2image is not installed. Run `pip install pdf2image` and "
            "install poppler (see ocr_module.py docstring) to OCR PDFs."
        )

    try:
        if isinstance(pdf_bytes_or_path, (bytes, bytearray)):
            pages = convert_from_bytes(pdf_bytes_or_path, dpi=PDF_RENDER_DPI)
        else:
            pages = convert_from_path(pdf_bytes_or_path, dpi=PDF_RENDER_DPI)
    except PDFInfoNotInstalledError as e:
        raise RuntimeError(
            "poppler (pdftoppm/pdftocairo) is not installed or not on PATH. "
            "This is a separate system dependency from pdf2image -- see "
            "ocr_module.py docstring for install instructions."
        ) from e

    if not pages:
        return ("", [], "", None) if return_debug else ""

    all_attempts = []
    best_page_texts = []
    first_page_cv = None

    for page_num, pil_page in enumerate(pages, start=1):
        # Reuse the image pipeline: convert the rendered PDF page (PIL,
        # RGB) into the same BGR numpy array to_cv_image() would produce
        # for a photo, so every downstream preprocessing/OCR function
        # behaves identically regardless of whether the source was an
        # uploaded image or a PDF page.
        page_bgr = cv2.cvtColor(np.array(pil_page.convert("RGB")), cv2.COLOR_RGB2BGR)
        if page_num == 1:
            first_page_cv = page_bgr
        page_bytes = cv2.imencode(".png", page_bgr)[1].tobytes()

        page_best_text, page_attempts, page_combined, _ = extract_text_from_image(
            page_bytes, return_debug=True
        )

        if page_best_text.strip():
            best_page_texts.append(page_best_text)

        for label, text, conf in page_attempts:
            all_attempts.append((f"page{page_num}_{label}", text, conf))

    best_text = "\n\n".join(best_page_texts)
    combined_text = "\n".join(t for _, t, c in all_attempts)

    if return_debug:
        return best_text, all_attempts, combined_text, first_page_cv
    return best_text


# ============================================================
# VITALS FIELD EXTRACTION + VALIDATION
# ============================================================
def extract_vitals(raw_text):
    vitals = {}

    # Blood pressure
    vitals["blood_pressure"] = "NOT DETECTED - please verify manually"
    for m in re.finditer(r"(\d{2,3})\s*/\s*(\d{2,3})", raw_text):
        sys_val, dia_val = int(m.group(1)), int(m.group(2))
        if 70 <= sys_val <= 250 and 40 <= dia_val <= 150 and sys_val > dia_val:
            vitals["blood_pressure"] = f"{sys_val}/{dia_val}"
            break

    # Pulse -- "bpm" is a frequent OCR misread (bem, bom, bpni, etc.) since
    # the three narrow letters are easy to confuse at small sizes, so we
    # accept close variants rather than requiring an exact match.
    pulse_match = re.search(r"(\d{2,3})\s*(?:bpm|b[eo]m|bp[nm]i?)\b", raw_text, re.IGNORECASE)
    if pulse_match and 30 <= int(pulse_match.group(1)) <= 220:
        vitals["pulse"] = f"{pulse_match.group(1)} bpm"
    else:
        vitals["pulse"] = "NOT DETECTED - please verify manually"

    # Temperature
    vitals["temperature"] = "NOT DETECTED - please verify manually"
    for m in re.finditer(r"(\d{2}[.,]\d)", raw_text):
        val = float(m.group(1).replace(",", "."))
        if 30.0 <= val <= 45.0:
            vitals["temperature"] = f"{val}\u00b0C"
            break

    # Sugar (blood glucose, mg/dL) -- explicit unit required to avoid false positives
    vitals["sugar"] = "NOT DETECTED - please verify manually"
    sugar_match = re.search(r"(\d{2,3}(?:\.\d)?)\s*mg\s*/\s*dl", raw_text, re.IGNORECASE)
    if sugar_match:
        val = float(sugar_match.group(1))
        if 40 <= val <= 600:
            vitals["sugar"] = str(val)

    # Weight (kg) -- explicit unit required
    vitals["weight"] = "NOT DETECTED - please verify manually"
    weight_match = re.search(r"(\d{2,3}(?:\.\d)?)\s*kg\b", raw_text, re.IGNORECASE)
    if weight_match:
        val = float(weight_match.group(1))
        if 2 <= val <= 300:
            vitals["weight"] = str(val)

    # Blood group -- A/B/AB/O + positive/negative sign
    vitals["blood_group"] = "NOT DETECTED - please verify manually"
    bg_match = re.search(r"\b(A|B|AB|O)\s*([+-]|positive|negative)\b", raw_text, re.IGNORECASE)
    if bg_match:
        letter = bg_match.group(1).upper()
        sign_raw = bg_match.group(2).lower()
        sign = "+" if sign_raw in ("+", "positive") else "-"
        vitals["blood_group"] = f"{letter}{sign}"

    return vitals


def extract_text_and_vitals(file_bytes_or_path, is_pdf=False, use_gemini_fallback=True):
    """Convenience function for Flask: returns
    (best_text, vitals_dict, medicines_list, appointments_list, report_date).

    vitals are searched across every OCR attempt that actually ran (just
    the fast-path Tesseract pass on easy images, or the full dual-engine
    sweep -- both engines, all passes -- on harder ones, times every page
    if it's a PDF) since different attempts sometimes catch different
    fields.

    medicines_list / appointments_list come ONLY from the Gemini call
    (regex/OCR alone can't reliably pull out medicine names or dates) --
    they are always [] if Gemini isn't configured or found nothing.
    Each medicine dict has keys: medicine_name, dosage, medicine_time.
    Each appointment dict has keys: doctor_name, hospital_name,
    appointment_date, appointment_time -- these match the
    medicines/appointments Postgres tables' column names directly.

    report_date is "YYYY-MM-DD" if a date was visible on the report
    itself (also Gemini-only), else None -- lets the caller store health
    data under the report's own date instead of today's date.

    Set is_pdf=True to treat the input as a PDF (rasterized page-by-page)
    instead of a single image. Only the FIRST page is sent to Gemini for
    medicines/appointments, since reports are almost always single-page
    and this avoids one API call per page.

    Set use_gemini_fallback=False to disable the Gemini step for a
    specific call even if GEMINI_API_KEY is configured (e.g. if you want
    a "fast/free-only" mode as a user-facing toggle) -- in that case
    medicines_list and appointments_list will always be [], and
    report_date will always be None.
    """
    if is_pdf:
        best_text, attempts, combined_text, cv_image = extract_text_from_pdf(
            file_bytes_or_path, return_debug=True
        )
    else:
        best_text, attempts, combined_text, cv_image = extract_text_from_image(
            file_bytes_or_path, return_debug=True
        )
    vitals = extract_vitals(combined_text)
    medicines, appointments, report_date = [], [], None

    if use_gemini_fallback and cv_image is not None:
        vitals, medicines, appointments, report_date = apply_gemini_structured(vitals, cv_image)

    return best_text, vitals, medicines, appointments, report_date


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ocr_module.py path/to/image.jpg")
        print("       python ocr_module.py path/to/report.pdf")
        sys.exit(1)
    path = sys.argv[1]
    is_pdf = path.lower().endswith(".pdf")

    if is_pdf:
        best_text, attempts, combined_text, cv_image = extract_text_from_pdf(path, return_debug=True)
    else:
        best_text, attempts, combined_text, cv_image = extract_text_from_image(path, return_debug=True)

    print("----- Confidence per attempt -----")
    for label, text, conf in attempts:
        print(f"{label}: confidence={conf:.2f}")

    print("\n----- BEST Extracted Text -----")
    print(best_text)

    vitals = extract_vitals(combined_text)
    medicines, appointments, report_date = [], [], None
    if cv_image is not None:
        vitals, medicines, appointments, report_date = apply_gemini_structured(vitals, cv_image)

    print("\n----- Vitals (validated, searched across all attempts, Gemini-filled if needed) -----")
    for k, v in vitals.items():
        print(f"{k}: {v}")

    print("\n----- Medicines detected (via Gemini) -----")
    if medicines:
        for m in medicines:
            print(m)
    else:
        print("(none found)")

    print("\n----- Appointments detected (via Gemini) -----")
    if appointments:
        for a in appointments:
            print(a)
    else:
        print("(none found)")

    print("\n----- Report date detected (via Gemini) -----")
    print(report_date or "(none found)")