"""app.py
AC Gear Motor Quote PDF Generator
- Reads price from: AC Gear Motor Price List 2026 (sheet1)
- Fills template: QMO26-SAS.xlsx (sheet: Sales Quote  (2))
- Converts filled XLSX -> PDF using LibreOffice (soffice)
- Returns PDF for download
- Saves PDF to output_pdfs/ and auto-deletes files older than 7 days
- (Optional) Emails the PDF to customer via SMTP if SMTP env vars are configured

Minimal-impact design:
- Only backend responsibilities; frontend can keep downloading PDF blob.
"""

from __future__ import annotations

import os
import re
import time
import shutil
import smtplib
import tempfile
import subprocess
from datetime import datetime   
from pathlib import Path
from email.message import EmailMessage
try:
    import fcntl  # Render/Linux มี
except ImportError:
    fcntl = None  # Windows local dev อาจไม่มี
from flask import Flask, request, send_file, jsonify, abort
from openpyxl import load_workbook

from flask_cors import CORS

app = Flask(__name__)

CORS(
    app,
    resources={r"/api/*": {"origins": [
        "https://sas-gear-motor-app.vercel.app",
        "https://sas-gear-motor-q9s9l76vq-somyot442s-projects.vercel.app",
    ]}},
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# =========================
# CORS (dev + vercel)
# - Reflect Origin if it's in allowlist
# - Always allow OPTIONS preflight for /api/*
# =========================
ALLOWED_ORIGINS = {
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://sas-gear-motor-app.vercel.app",
}

from flask import request

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")

    # ✅ ADD: allow vercel preview domains too
    is_vercel_preview = (
        origin
        and origin.endswith(".vercel.app")
        and ("sas-gear-motor" in origin)
    )

    if origin in ALLOWED_ORIGINS or is_vercel_preview:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"

    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    # ✅ ADD: allow common headers used by browsers
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Expose-Headers"] = "Content-Disposition"
    return response

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS" and request.path.startswith("/api/"):
        return ("", 204)
    
@app.route("/api/ac-quote", methods=["OPTIONS"])
def ac_quote_preflight():
    return ("", 204)

# =========================
# Paths
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

PRICE_FILE = os.path.join(DATA_DIR, "AC Gear Motor Price List 2026 14-02-26.xlsx")
TEMPLATE_FILE = os.path.join(DATA_DIR, "QMO26-SAS.xlsx")

PRICE_SHEET_NAME = "sheet1"              # หากชื่อชีทจริงไม่ใช่ sheet1 ให้แก้ตรงนี้
TEMPLATE_SHEET_NAME = "Sales Quote  (2)" # ชื่อชีทใน QMO26-SAS.xlsx
# เพิ่มใหม่ — ข้อมูล Sale Person
SALE_PERSONS = {
    'CA':  {
        'abbr': 'CA',
        'name': 'Mr. Chottanin A. (CA)',
        'position': 'TRANSMISSION PRODUCT MANAGER : 081-921-6225'
    },
    'TWS': {
        'abbr': 'TWS',
        'name': 'Ms.Thitikan W. (TWS)',
        'position': 'Sale Engineer 089-9899989'
    },
    'WS':  {
        'abbr': 'WS',
        'name': 'Ms.Warissara S.(WS)',
        'position': 'Sale Engineer 081-18118181'
    },
    'SK':  {
        'abbr': 'SK',
        'name': 'Mr.Sanya K.(SK)',
        'position': 'Sale Supervisor 082-2222222'
    },
}

# =========================
# Output storage (7 days retention)
# =========================
OUTPUT_DIR = Path(os.path.join(BASE_DIR, "output_pdfs"))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
RETENTION_SECONDS = 7 * 24 * 60 * 60
# ===== ADD: running quotation number (QMO26-SAS-001...) =====
SEQ_FILE = os.environ.get("QMO_SEQ_FILE", str(OUTPUT_DIR / "qmo_seq.txt"))

def next_qmo_no() -> int:
    os.makedirs(os.path.dirname(SEQ_FILE), exist_ok=True)

    with open(SEQ_FILE, "a+", encoding="utf-8") as f:
        if fcntl:
            fcntl.flock(f, fcntl.LOCK_EX)

        f.seek(0)
        raw = f.read().strip()
        last_no = int(raw) if raw.isdigit() else 0
        new_no = last_no + 1

        f.seek(0)
        f.truncate()
        f.write(str(new_no))
        f.flush()

        if fcntl:
            fcntl.flock(f, fcntl.LOCK_UN)

    return new_no

def cleanup_old_pdfs() -> None:
    now = time.time()
    for p in OUTPUT_DIR.glob("*.pdf"):
        try:
            if p.is_file() and (now - p.stat().st_mtime) > RETENTION_SECONDS:
                p.unlink(missing_ok=True)
        except Exception:
            # don't break requests because cleanup failed
            pass

# =========================
# Price map helpers
# =========================

def norm_code(x: str) -> str:
    s = str(x or "")
    s = s.replace("\u00A0", "")  # NBSP
    s = s.replace("\u200B", "")  # zero-width
    s = s.strip().upper()
    s = re.sub(r"\s+", "", s)
    return s

def build_price_map() -> dict[str, dict[str, object]]:
    if not os.path.exists(PRICE_FILE):
        raise FileNotFoundError(f"Price file not found: {PRICE_FILE}")

    wb = load_workbook(PRICE_FILE, data_only=True)
    ws = wb[PRICE_SHEET_NAME] if PRICE_SHEET_NAME in wb.sheetnames else wb.active

    out: dict[str, dict[str, object]] = {}
    max_row = ws.max_row or 0
    for r in range(1, max_row + 1):
        code = ws.cell(r, 1).value  # Col A
        if not code:
            continue
        raw = str(code).strip()
        key = norm_code(raw)

        desc = ws.cell(r, 2).value  # Col B
        price = ws.cell(r, 4).value # Col D

        try:
            price_val = float(price) if price not in (None, "") else 0.0
        except Exception:
            price_val = 0.0

        out[key] = {
            "raw": raw,
            "desc": str(desc).strip() if desc is not None else "",
            "price": price_val,
        }

    return out

try:
    PRICE_MAP = build_price_map()
except Exception as e:
    PRICE_MAP = {}
    print(f"[WARN] Cannot load PRICE_MAP: {e}")

@app.get("/api/ac-price-reload")
def reload_price():
    global PRICE_MAP
    try:
        PRICE_MAP = build_price_map()
        return jsonify({"ok": True, "count": len(PRICE_MAP)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

# =========================
# XLSX -> PDF via LibreOffice
# =========================

def find_soffice() -> str:
    # 1) explicit env override
    env_path = os.environ.get("SOFFICE_PATH", "").strip()
    if env_path and os.path.exists(env_path):
        return env_path

    # 2) PATH lookup (Linux / some Windows setups)
    p = shutil.which("soffice")
    if p:
        return p

    # 3) common Windows default install paths
    candidates = [
        r"C:\\Program Files\\LibreOffice\\program\\soffice.exe",
        r"C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c

    raise FileNotFoundError(
        "LibreOffice soffice not found. Install LibreOffice or set SOFFICE_PATH env var."
    )

def xlsx_to_pdf(xlsx_path: str, out_dir: str) -> str:
    soffice = find_soffice()

    subprocess.check_call([
        soffice,
        "--headless",
        "--nologo",
        "--nolockcheck",
        "--convert-to", "pdf",
        "--outdir", out_dir,
        xlsx_path,
    ])

    base = os.path.splitext(os.path.basename(xlsx_path))[0]
    pdf_path = os.path.join(out_dir, base + ".pdf")
    if not os.path.exists(pdf_path):
        raise FileNotFoundError("PDF convert failed: output pdf not created.")
    return pdf_path

# =========================
# Optional email sending (SMTP)
# =========================

def smtp_is_configured() -> bool:
    return all(os.environ.get(k) for k in ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"]) 

def send_email_with_pdf(to_email: str, subject: str, body: str, pdf_path: str) -> None:
    SMTP_HOST = os.environ.get("SMTP_HOST", "")
    SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
    SMTP_USER = os.environ.get("SMTP_USER", "")
    SMTP_PASS = os.environ.get("SMTP_PASS", "")
    FROM_EMAIL = os.environ.get("FROM_EMAIL", SMTP_USER)

    if not (SMTP_HOST and SMTP_USER and SMTP_PASS and FROM_EMAIL):
        raise RuntimeError("SMTP env not set (SMTP_HOST/SMTP_USER/SMTP_PASS/FROM_EMAIL)")

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg.set_content(body)

    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    msg.add_attachment(
        pdf_bytes,
        maintype="application",
        subtype="pdf",
        filename=os.path.basename(pdf_path),
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as s:
        s.starttls()
        s.login(SMTP_USER, SMTP_PASS)
        s.send_message(msg)

# =========================
# Download endpoint (served from output_pdfs)
# =========================

@app.get("/api/download/<filename>")
def download_pdf(filename: str):
    p = OUTPUT_DIR / filename
    if not p.exists():
        abort(404)
    return send_file(str(p), mimetype="application/pdf", as_attachment=True, download_name=filename)

# =========================
# Main quote endpoint
# =========================

@app.post("/api/ac-quote")
def ac_quote():
    try:
        app.logger.info("RUNNING FILE = %s", __file__)
        APP_VERSION = "2026-03-03-fix-sheetprops-v1"
        app.logger.info("APP_VERSION = %s", APP_VERSION)
        payload = request.get_json(silent=True) or {}

        motor_code = str(payload.get("motorCode", "")).strip()
        gear_code = str(payload.get("gearCode", "")).strip()

        try:
            qty_motor = int(payload.get("qtyMotor", 1) or 1)
        except Exception:
            qty_motor = 1

        try:
            qty_gear = int(payload.get("qtyGear", 1) or 1)
        except Exception:
            qty_gear = 1
        
        ctrl_model = str(payload.get("controllerModel", "") or "").strip()
        try:
            qty_ctrl = int(payload.get("qtyCtrl", 0) or 0)
        except Exception:
            qty_ctrl = 0

        if not motor_code or not gear_code:
            return "Invalid motorCode/gearCode", 400

        if not os.path.exists(TEMPLATE_FILE):
            return f"Template file not found: {TEMPLATE_FILE}", 500

        if not PRICE_MAP:
            return "PRICE_MAP is empty. Check PRICE_FILE path or reload /api/ac-price-reload", 500
        
        ctrl = None
        if ctrl_model and qty_ctrl > 0:
            ckey = norm_code(ctrl_model)
            if ckey not in PRICE_MAP:
                return f"Controller code not found in price list: {ctrl_model}", 404
            ctrl = PRICE_MAP[ckey]

        mkey = norm_code(motor_code)
        gkey = norm_code(gear_code)

        if mkey not in PRICE_MAP:
            return f"Motor code not found in price list: {motor_code}", 404
        if gkey not in PRICE_MAP:
            return f"Gear code not found in price list: {gear_code}", 404

        motor = PRICE_MAP[mkey]
        gear = PRICE_MAP[gkey]

        wb = load_workbook(TEMPLATE_FILE)
        if TEMPLATE_SHEET_NAME not in wb.sheetnames:
            return f"Template sheet not found: {TEMPLATE_SHEET_NAME}", 500

        ws = wb[TEMPLATE_SHEET_NAME]
        if ws is None:
            return jsonify({"ok": False, "error": "Worksheet is None (failed to load template sheet)"}), 500
    # ===== ADD: customer fields -> template cells =====
        cust = payload.get("customer", {}) or {}
        cust_name = str(cust.get("name", "")).strip()
        cust_company = str(cust.get("company", "")).strip()
        cust_phone = str(cust.get("phone", "")).strip()
        cust_email = str(cust.get("email", "")).strip()

    # ===== salePerson fields =====
        sale_person_abbr = str(payload.get("salePerson", "CA")).strip() or "CA"
        sp = SALE_PERSONS.get(sale_person_abbr, SALE_PERSONS["CA"])

    # B8: "คุณ : ..."
        ws["B8"] = f"คุณ : {cust_name}" if cust_name else "คุณ :"
    # B9: company
        ws["B9"] = cust_company
    # B13: email
        ws["B13"] = cust_email
    # B14: phone
        ws["B14"] = cust_phone

    # ===== ADD: keep only 1 sheet (print only this sheet) =====
        for name in list(wb.sheetnames):
            if name != TEMPLATE_SHEET_NAME:
                del wb[name]
        ws.page_setup.paperSize = ws.PAPERSIZE_A4
        ws.page_setup.orientation = ws.ORIENTATION_PORTRAIT
        ws.print_area = "A1:I80"
        # Motor row (A20..G20)
        ws["A20"] = 1
        ws["B20"] = motor_code
        ws["C20"] = motor.get("desc", "")
        ws["F20"] = qty_motor
        ws["G20"] = motor.get("price", 0.0)

        # Gear row (A22..G22)
        ws["A22"] = 2
        ws["B22"] = gear_code
        ws["C22"] = gear.get("desc", "")
        ws["F22"] = qty_gear
        ws["G22"] = gear.get("price", 0.0)

        if ctrl_model and qty_ctrl > 0:
            ws["A24"] = 3
            ws["B24"] = ctrl_model
            ws["C24"] = ctrl.get("desc", "")
            ws["F24"] = qty_ctrl
            ws["G24"] = ctrl.get("price", 0.0)
            # H3: QMO26-SAS-XXX (จะอัปเดตหลังได้ run_no จริง)
            run_no = next_qmo_no()
            run_no_str = f"{run_no:03d}"
            ws["H3"] = f"QMO26-SAS-{run_no_str}"

            # A17: ชื่อย่อ Sale Person
            ws["A17"] = sp["abbr"] if hasattr(sp, "__getitem__") and "abbr" in sp else sale_person_abbr

            # D60: ชื่อเต็ม Sale Person
            ws["D60"] = sp["name"]

            # D61: ตำแหน่ง + เบอร์
            ws["D61"] = sp["position"]

        cleanup_old_pdfs()

        run_no = next_qmo_no()
        run_no_str = f"{run_no:03d}"  # 001,002,003...

        # H3: QMO26-SAS-XXX ให้ตรงกับชื่อไฟล์ PDF
        ws["H3"] = f"QMO26-SAS-{run_no_str}"

        # A17: ชื่อย่อ Sale Person
        ws["A17"] = sp["abbr"]

        # D60: ชื่อเต็ม Sale Person
        ws["D60"] = sp["name"]

        # D61: ตำแหน่ง + เบอร์ Sale Person
        ws["D61"] = sp["position"]

        cleanup_old_pdfs()

        # Create filled xlsx and convert to pdf
        with tempfile.TemporaryDirectory() as td:
            filled_xlsx = os.path.join(td, "QMO26-SAS-FILLED.xlsx")
            wb.save(filled_xlsx)

            try:
                pdf_temp = xlsx_to_pdf(filled_xlsx, td)
            except Exception as e:
                return f"PDF convert failed (LibreOffice): {e}", 500

            # run_no_str ใช้ค่าที่ประกาศไว้แล้วข้างบน (ไม่ต้องเรียก next_qmo_no() อีก)

            company_for_file = cust_company or "NO-COMPANY"
            company_for_file = re.sub(r'[\\/:*?"<>|]+', "", company_for_file).strip()
            company_for_file = re.sub(r"\s+", "_", company_for_file)[:60] or "NO-COMPANY"

            date_str = datetime.now().strftime("%Y%m%d")  # วันที่
            saved_name = f"QMO26-SAS-{run_no_str}-{company_for_file}-{date_str}.pdf"
            saved_path = OUTPUT_DIR / saved_name
            shutil.copy2(pdf_temp, saved_path)

            # Optional: email to customer if SMTP configured
            customer = payload.get("customer", {}) or {}
            to_email = (customer.get("email") or "").strip()
            if to_email and smtp_is_configured():
                subject = f"SAS Quotation: {motor_code} + {gear_code}"
                body = (
                    f"เรียนคุณ {customer.get('name','')}\n\n"
                    f"ใบเสนอราคาของท่านถูกสร้างเรียบร้อยแล้ว\n"
                    f"Model: {payload.get('modelCode','')}\n"
                    f"Qty Motor: {qty_motor}\n"
                    f"Qty Gear: {qty_gear}\n\n"
                    f"แนบไฟล์ PDF มาพร้อมอีเมลนี้\n"
                )
                try:
                    send_email_with_pdf(to_email, subject, body, str(saved_path))
                except Exception as e:
                    # do not fail the download if email fails
                    print("[WARN] send_email_with_pdf failed:", e)

        # Keep compatibility with existing frontend (expects PDF as response)
            return send_file(
                str(saved_path),
                mimetype="application/pdf",
                as_attachment=True,
                download_name=saved_name,
            ) 
    except Exception as e:
        # ✅ จุดนี้ทำให้ "ไม่เห็น HTML 500 อีก" และจะรู้สาเหตุจริง 100%
        app.logger.exception("ac_quote crashed")
        return jsonify({"ok": False, "error": str(e)}), 500

# =========================
# Health
# =========================

@app.get("/health")
def health():
    return jsonify(
        {
            "ok": True,
            "price_loaded": bool(PRICE_MAP),
            "price_count": len(PRICE_MAP),
            "price_file": PRICE_FILE,
            "template_file": TEMPLATE_FILE,
            "output_dir": str(OUTPUT_DIR),
        }
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
