# app.py
# AC Gear Motor Quote PDF Generator (Excel -> Fill Template -> Convert PDF)
# Requirement:
#   pip install flask openpyxl
#   ต้องมี LibreOffice (soffice) สำหรับ convert xlsx -> pdf

from flask import Flask, request, send_file, jsonify
from openpyxl import load_workbook
import tempfile
import shutil
import subprocess
import os, subprocess
app = Flask(__name__)

# ✅ FIX CORS แบบไม่ล็อค origin ตายตัว (แก้ Failed to fetch ตรงจุด)
ALLOWED_ORIGINS = {
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # ถ้าจะยิงจาก Vercel ด้วย ให้เปิดไว้:
    "https://sas-gear-motor-app.vercel.app",
}

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    # ✅ DEV MODE: อนุญาตทุก origin (กัน localhost/127 สลับกันแล้วพัง)
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.before_request
def handle_preflight():
    # ✅ ให้ preflight ผ่านทุก /api/*
    if request.method == "OPTIONS" and request.path.startswith("/api/"):
        return ("", 204)

# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

import time
import shutil
from datetime import datetime

OUTPUT_DIR = os.path.join(BASE_DIR, "output_pdfs")
RETENTION_DAYS = 7
RETENTION_SECONDS = RETENTION_DAYS * 24 * 60 * 60

os.makedirs(OUTPUT_DIR, exist_ok=True)

def cleanup_old_pdfs():
    """ลบไฟล์ใน output_pdfs ที่เก่ากว่า 7 วัน"""
    now = time.time()
    try:
        for fname in os.listdir(OUTPUT_DIR):
            fpath = os.path.join(OUTPUT_DIR, fname)
            if not os.path.isfile(fpath):
                continue
            mtime = os.path.getmtime(fpath)
            if (now - mtime) > RETENTION_SECONDS:
                os.remove(fpath)
    except Exception as e:
        # ไม่ให้ cleanup ทำให้ request ล้ม
        print(f"[WARN] cleanup_old_pdfs failed: {e}")

PRICE_FILE = os.path.join(DATA_DIR, "AC Gear Motor Price List 2026 14-02-26.xlsx")
TEMPLATE_FILE = os.path.join(DATA_DIR, "QMO26-SAS.xlsx")

PRICE_SHEET_NAME = "sheet1"              # ถ้าในไฟล์จริงชื่อไม่ใช่ sheet1 ให้แก้ตรงนี้
TEMPLATE_SHEET_NAME = "Sales Quote  (2)" # ชื่อชีทใน QMO26-SAS.xlsx

# =========================
# UTIL: สร้าง mapping จาก price list (โหลดครั้งเดียวเพื่อความเร็ว)
# Col A = Code
# Col B = Description
# Col D = Unitprice
# =========================
def build_price_map():
    if not os.path.exists(PRICE_FILE):
        raise FileNotFoundError(f"Price file not found: {PRICE_FILE}")

    wb = load_workbook(PRICE_FILE, data_only=True)

    # เลือกชีท
    if PRICE_SHEET_NAME in wb.sheetnames:
        ws = wb[PRICE_SHEET_NAME]
    else:
        # fallback: ใช้ active
        ws = wb.active

    price_map = {}
    max_row = ws.max_row or 0

    for r in range(1, max_row + 1):
        code = ws.cell(r, 1).value  # A
        if not code:
            continue
        code = str(code).strip()

        desc = ws.cell(r, 2).value  # B
        unitprice = ws.cell(r, 4).value  # D

        # unitprice อาจเป็น None/""/string
        try:
            unitprice_val = float(unitprice) if unitprice not in (None, "") else 0.0
        except Exception:
            unitprice_val = 0.0

        price_map[code] = {
            "desc": str(desc).strip() if desc is not None else "",
            "price": unitprice_val
        }

    return price_map

# โหลดครั้งเดียวตอน start server เพื่อให้เร็ว
try:
    PRICE_MAP = build_price_map()
except Exception as e:
    PRICE_MAP = {}
    print(f"[WARN] Cannot load PRICE_MAP: {e}")


# =========================
# UTIL: convert xlsx -> pdf ด้วย LibreOffice (soffice)
# =========================

def xlsx_to_pdf(xlsx_path: str, out_dir: str) -> str:
    # ✅ ชี้ soffice.exe แบบ fix path (ชัวร์สุดบน Windows)
    soffice = r"C:\Program Files\LibreOffice\program\soffice.exe"
    if not os.path.exists(soffice):
        raise FileNotFoundError(f"LibreOffice soffice.exe not found at: {soffice}")

    subprocess.check_call([
        soffice,
        "--headless",
        "--nologo",
        "--nolockcheck",
        "--convert-to", "pdf",
        "--outdir", out_dir,
        xlsx_path
    ])

    base = os.path.splitext(os.path.basename(xlsx_path))[0]
    pdf_path = os.path.join(out_dir, base + ".pdf")
    if not os.path.exists(pdf_path):
        raise FileNotFoundError("PDF convert failed: output pdf not created.")
    return pdf_path


# =========================
# UTIL: ตรวจ/โหลด PRICE_MAP ใหม่ (เผื่อแก้ราคาแล้วไม่อยาก restart)
# =========================
@app.get("/api/ac-price-reload")
def reload_price():
    global PRICE_MAP
    try:
        PRICE_MAP = build_price_map()
        return jsonify({"ok": True, "count": len(PRICE_MAP)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# =========================
# API: สร้างใบเสนอราคา AC Gear Motor (PDF)
# POST /api/ac-quote
# body JSON:
# {
#   "modelCode": "6IK200GU-CF-6GU12.5KB",
#   "motorCode": "6IK200GU-CF",
#   "gearCode": "6GU12.5KB",
#   "qtyMotor": 1,
#   "qtyGear": 1,
#   "customer": { "name": "", "company": "", "phone": "", "email": "" }
# }
# =========================
@app.post("/api/ac-quote")
def ac_quote():
    # 1) parse input
    payload = request.get_json(force=True, silent=False)

    model_code = str(payload.get("modelCode", "")).strip()
    motor_code = str(payload.get("motorCode", "")).strip()
    gear_code  = str(payload.get("gearCode", "")).strip()

    try:
        qty_motor = int(payload.get("qtyMotor", 1) or 1)
    except Exception:
        qty_motor = 1

    try:
        qty_gear = int(payload.get("qtyGear", 1) or 1)
    except Exception:
        qty_gear = 1

    # 2) validate
    if not motor_code or not gear_code:
        return "Invalid motorCode/gearCode", 400

    if not os.path.exists(TEMPLATE_FILE):
        return f"Template file not found: {TEMPLATE_FILE}", 500

    if not PRICE_MAP:
        return "PRICE_MAP is empty. Check PRICE_FILE path or reload /api/ac-price-reload", 500

    if motor_code not in PRICE_MAP:
        return f"Motor code not found in price list: {motor_code}", 404

    if gear_code not in PRICE_MAP:
        return f"Gear code not found in price list: {gear_code}", 404

    motor = PRICE_MAP[motor_code]
    gear  = PRICE_MAP[gear_code]

    # 3) fill template cells ตามที่คุณกำหนด
    wb = load_workbook(TEMPLATE_FILE)
    if TEMPLATE_SHEET_NAME not in wb.sheetnames:
        return f"Template sheet not found: {TEMPLATE_SHEET_NAME}", 500

    ws = wb[TEMPLATE_SHEET_NAME]

    # ==== Row 20 Motor ====
    ws["A20"] = 1
    ws["B20"] = motor_code
    ws["C20"] = motor["desc"]
    ws["F20"] = qty_motor
    ws["G20"] = motor["price"]

    # ==== Row 22 Gear ====
    ws["A22"] = 2
    ws["B22"] = gear_code
    ws["C22"] = gear["desc"]
    ws["F22"] = qty_gear
    ws["G22"] = gear["price"]

    # (Optional) ถ้าคุณอยากใส่ชื่อบริษัท/ชื่อลูกค้าในตำแหน่งอื่นของ template
    # customer = payload.get("customer", {}) or {}
    # ws["B10"] = customer.get("company","")
    # ws["B11"] = customer.get("name","")
    # ws["B12"] = customer.get("phone","")
    # ws["B13"] = customer.get("email","")

    # 4) save filled xlsx + convert to pdf + return pdf
    cleanup_old_pdfs()

    with tempfile.TemporaryDirectory() as td:
        filled_xlsx = os.path.join(td, "QMO26-SAS-FILLED.xlsx")
        wb.save(filled_xlsx)

        pdf_temp = xlsx_to_pdf(filled_xlsx, td)

        # ตั้งชื่อไฟล์ไม่ให้ชนกัน (ใส่เวลา)
        ts = datetime.now().strftime("%Y%m%d-%H%M%S")
        saved_name = f"QMO26-{motor_code}-{gear_code}-{ts}.pdf"
        saved_path = os.path.join(OUTPUT_DIR, saved_name)

        # copy จาก temp ไป output_pdfs (ถาวร)
        shutil.copy2(pdf_temp, saved_path)

        # ส่ง “ไฟล์ที่เก็บถาวร” กลับให้ผู้ใช้โหลด
        return send_file(
            saved_path,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=saved_name
        )


# =========================
# Health check
# =========================
@app.get("/health")
def health():
    return jsonify({
        "ok": True,
        "price_loaded": bool(PRICE_MAP),
        "price_count": len(PRICE_MAP),
        "price_file": PRICE_FILE,
        "template_file": TEMPLATE_FILE
    })


if __name__ == "__main__":
    # ใช้งานจริงแนะนำ debug=False
    app.run(host="0.0.0.0", port=5000, debug=True)