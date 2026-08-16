"""
AI Health Guardian - OCR Module (v8, DUAL-ENGINE, ACCURACY-FIRST)
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

PDF SUPPORT:
    PDFs are rasterized page-by-page into images (via pdf2image, which
    wraps the poppler `pdftoppm` binary) and then each page image is run
    through the exact same dual-engine sweep as a normal photo upload.
    Per-page best text is joined together for the final text, and vitals
    are searched across every attempt from every page (same "search
    everything, keep whichever field is found" approach used for images).

REQUIREMENTS:
    pip install easyocr opencv-python-headless pillow numpy pytesseract pdf2image

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
import shutil
from PIL import Image

try:
    from pdf2image import convert_from_bytes, convert_from_path
    from pdf2image.exceptions import PDFInfoNotInstalledError
    PDF_SUPPORT_AVAILABLE = True
except ImportError:
    PDF_SUPPORT_AVAILABLE = False

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
            return fast_text, attempts, combined_text
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
        return best_text, attempts, combined_text
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
        return ("", [], "") if return_debug else ""

    all_attempts = []
    best_page_texts = []

    for page_num, pil_page in enumerate(pages, start=1):
        # Reuse the image pipeline: convert the rendered PDF page (PIL,
        # RGB) into the same BGR numpy array to_cv_image() would produce
        # for a photo, so every downstream preprocessing/OCR function
        # behaves identically regardless of whether the source was an
        # uploaded image or a PDF page.
        page_bgr = cv2.cvtColor(np.array(pil_page.convert("RGB")), cv2.COLOR_RGB2BGR)
        page_bytes = cv2.imencode(".png", page_bgr)[1].tobytes()

        page_best_text, page_attempts, page_combined = extract_text_from_image(
            page_bytes, return_debug=True
        )

        if page_best_text.strip():
            best_page_texts.append(page_best_text)

        for label, text, conf in page_attempts:
            all_attempts.append((f"page{page_num}_{label}", text, conf))

    best_text = "\n\n".join(best_page_texts)
    combined_text = "\n".join(t for _, t, c in all_attempts)

    if return_debug:
        return best_text, all_attempts, combined_text
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

    return vitals


def extract_text_and_vitals(file_bytes_or_path, is_pdf=False):
    """Convenience function for Flask: returns (best_text, vitals_dict),
    where vitals are searched across every OCR attempt that actually ran
    (just the fast-path Tesseract pass on easy images, or the full
    dual-engine sweep -- both engines, all passes -- on harder ones, times
    every page if it's a PDF) since different attempts sometimes catch
    different fields.

    Set is_pdf=True to treat the input as a PDF (rasterized page-by-page)
    instead of a single image.
    """
    if is_pdf:
        best_text, attempts, combined_text = extract_text_from_pdf(
            file_bytes_or_path, return_debug=True
        )
    else:
        best_text, attempts, combined_text = extract_text_from_image(
            file_bytes_or_path, return_debug=True
        )
    vitals = extract_vitals(combined_text)
    return best_text, vitals


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ocr_module.py path/to/image.jpg")
        print("       python ocr_module.py path/to/report.pdf")
        sys.exit(1)
    path = sys.argv[1]
    is_pdf = path.lower().endswith(".pdf")

    if is_pdf:
        best_text, attempts, combined_text = extract_text_from_pdf(path, return_debug=True)
    else:
        best_text, attempts, combined_text = extract_text_from_image(path, return_debug=True)

    print("----- Confidence per attempt -----")
    for label, text, conf in attempts:
        print(f"{label}: confidence={conf:.2f}")

    print("\n----- BEST Extracted Text -----")
    print(best_text)

    print("\n----- Vitals (validated, searched across all attempts) -----")
    for k, v in extract_vitals(combined_text).items():
        print(f"{k}: {v}")