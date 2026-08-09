"""
AI Health Guardian - OCR Module (v4, DUAL-ENGINE)
====================================================
Uses BOTH Tesseract and EasyOCR, then picks the better result -- since the
two engines make different kinds of mistakes, running both and comparing
catches more errors than either alone.

REQUIREMENTS:
    pip install easyocr opencv-python-headless pillow numpy pytesseract

    Tesseract ALSO needs its separate program installed (pytesseract is just
    a Python wrapper around it, not the OCR engine itself):
      Windows: download & install from
        https://github.com/UB-Mannheim/tesseract/wiki
      Linux: sudo apt install tesseract-ocr
      Mac:   brew install tesseract

USAGE (standalone test):
    python ocr_module.py path/to/image.jpg

USAGE (inside Flask):
    from ocr_module import extract_text_from_image, extract_vitals
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

reader = easyocr.Reader(['en'], gpu=False)


def to_cv_image(image_bytes_or_path):
    if isinstance(image_bytes_or_path, (bytes, bytearray)):
        pil_img = Image.open(io.BytesIO(image_bytes_or_path)).convert("RGB")
        return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
    return cv2.imread(image_bytes_or_path)


def light_preprocess(img, scale=3):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    denoised = cv2.fastNlMeansDenoising(gray, h=8)
    clahe = cv2.createCLAHE(clipLimit=1.5, tileGridSize=(8, 8))
    return clahe.apply(denoised)


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
def run_tesseract(image, psm=6):
    pil_img = Image.fromarray(image) if isinstance(image, np.ndarray) else image
    config = f"--oem 1 --psm {psm}"  # oem 1 = LSTM-only engine, generally more accurate
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


def run_tesseract_best_psm(image):
    """Try a few page-segmentation modes (documents vs. sparse text) and
    keep whichever gives the highest confidence -- small numbers next to
    labels (like '140/90') are sometimes only picked up correctly under a
    specific PSM."""
    best = ("", 0)
    for psm in (6, 4, 11):  # 6=uniform block, 4=column, 11=sparse text
        text, conf = run_tesseract(image, psm=psm)
        if conf > best[1]:
            best = (text, conf)
    return best


# ============================================================
# COMBINE: run both engines on both original + preprocessed image,
# pick whichever of the 4 attempts has the highest average confidence.
# ============================================================
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


def extract_text_from_image(image_bytes_or_path, return_debug=False):
    original = to_cv_image(image_bytes_or_path)
    processed = light_preprocess(original)

    attempts = []
    for label, img in [("easyocr_original", original), ("easyocr_processed", processed)]:
        text, conf = run_easyocr(img)
        attempts.append((label, text, conf))
    for label, img in [("tesseract_original", original), ("tesseract_processed", processed)]:
        text, conf = run_tesseract_best_psm(img)
        attempts.append((label, text, conf))

    # New: line-by-line segmented OCR (often best for small numbers next to labels)
    line_text, line_conf = run_tesseract_line_by_line(original)
    attempts.append(("tesseract_line_by_line", line_text, line_conf))

    best_label, best_text, best_conf = max(attempts, key=lambda a: a[2])
    combined_text = "\n".join(t for _, t, c in attempts)  # for vitals search across all attempts

    if return_debug:
        return best_text, attempts, combined_text
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

    # Pulse
    pulse_match = re.search(r"(\d{2,3})\s*bpm", raw_text, re.IGNORECASE)
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


def extract_text_and_vitals(image_bytes_or_path):
    """Convenience function for Flask: returns (best_text, vitals_dict),
    where vitals are searched across ALL OCR attempts (not just the best
    one) since different attempts sometimes catch different fields."""
    best_text, attempts, combined_text = extract_text_from_image(image_bytes_or_path, return_debug=True)
    vitals = extract_vitals(combined_text)
    return best_text, vitals


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ocr_module.py path/to/image.jpg")
        sys.exit(1)
    path = sys.argv[1]
    best_text, attempts, combined_text = extract_text_from_image(path, return_debug=True)

    print("----- Confidence per attempt -----")
    for label, text, conf in attempts:
        print(f"{label}: confidence={conf:.2f}")

    print("\n----- BEST Extracted Text -----")
    print(best_text)

    print("\n----- Vitals (validated, searched across all attempts) -----")
    for k, v in extract_vitals(combined_text).items():
        print(f"{k}: {v}")