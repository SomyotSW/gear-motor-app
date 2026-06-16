"""line_bot.py
Mr.SAS MotorBot — LINE Webhook (Flask Blueprint)

═══════════════════════════════════════════════════════════════
ENV vars (Render):
  LINE_CHANNEL_SECRET        — Channel Secret
  LINE_CHANNEL_ACCESS_TOKEN  — Long-lived Access Token
  R2_PUBLIC_BASE             — https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev
  SERVER_BASE                — https://gear-motor-app.onrender.com

═══════════════════════════════════════════════════════════════
FLOW ภาพรวม:

  [User พิมพ์อะไรก็ตาม / เริ่มแชท]
       ↓
  [Greeting Flex] — ทักทาย + 2 ปุ่มหลัก
       ├── [🔄 เทียบรุ่น]  →  STATE: compare_brand   (ดูหัวข้อ COMPARE FLOW)
       └── [📦 ขอ3D&Spec] →  STATE: asset_type       (ดูหัวข้อ ASSET FLOW)

─────────────────────────────────────────────────────────────
ASSET FLOW (ขอ3D&Spec):
  STATE asset_type  → Flex "เอาอะไรดีครับ?"  [3D] [2D PDF] [Data sheet]
  STATE asset_model → ถาม "SAS Model อะไรครับ?"
  → User ส่ง Model code
  → ระบบหาไฟล์ใน R2 ตาม type (STEP / pdf / datasheet-pdf)
  → ส่งปุ่มดาวน์โหลดกลับ

─────────────────────────────────────────────────────────────
COMPARE FLOW (เทียบรุ่น) — [TODO: รอ Catalog Solution]
  STATE compare_brand → Flex แสดงรายชื่อแบรนด์คู่แข่ง
       (Oriental, ZD, Suntech, GTR, Panasonic, SPG,
        TAILI, SEW, Sumitomo, ABB, INNOMOTIC, NORD,
        BONFIGLIOLI, ROSSI)
  → User เลือกแบรนด์
  → Bot ตอบ "ขอดูเนมเพลทหน่อยครับ"
  → User ส่งรูปเนมเพลท
  → [TODO] OCR อ่านข้อมูลเนมเพลท
  → [TODO] Match กับ Model SAS จาก Catalog/Database
  → ส่งผลลัพธ์ Model SAS + ปุ่ม 3D / 2D / Data sheet

  ── Catalog Solution ที่กำลังพิจารณา ──────────────────────
  แนวทางที่ดีที่สุดสำหรับ PDF catalog ขนาดใหญ่:

  Option A — Vector DB (แนะนำ)
    1. Pre-process: แตก PDF ทุกเล่มเป็น chunks → embed → เก็บใน
       Supabase pgvector (มีอยู่แล้วในโปรเจกต์) หรือ Pinecone/Qdrant
    2. Runtime: OCR เนมเพลท → สร้าง query จากค่าที่อ่านได้
       (kW, RPM, ratio, frame size, voltage) → semantic search ใน vector DB
       → ได้ SAS model ที่ใกล้เคียงที่สุด
    - ข้อดี: ไม่เปลือง token ตอน query, ทำครั้งเดียว
    - ข้อเสีย: ต้องทำ pre-processing pipeline ก่อน 1 ครั้ง

  Option B — Google Cloud Vision + Structured JSON
    1. แปลง PDF catalog → JSON structured (model, kW, rpm, ratio, frame)
       ด้วย Claude API batch (จ่ายครั้งเดียว ถูกกว่า)
    2. เก็บ JSON ใน Supabase table แยกต่างหาก
    3. Runtime: OCR เนมเพลท → query SQL ใน Supabase
    - ข้อดี: query เร็ว, ถูก, ควบคุมได้
    - ข้อเสีย: ต้องทำ JSON extraction ก่อน

  → สรุป: เริ่มด้วย Option B ก่อน เพราะ Supabase มีอยู่แล้ว
    แล้วค่อย upgrade เป็น vector search ถ้าต้องการ semantic matching

═══════════════════════════════════════════════════════════════
STATE MANAGEMENT:
  ใช้ in-memory dict _user_state[user_id] = { "step": ..., "data": ... }
  (เพียงพอสำหรับ dev/test — production ควรย้ายไป Redis หรือ Supabase)
═══════════════════════════════════════════════════════════════
"""

from __future__ import annotations

import io
import os
import re
import base64
import hashlib
import hmac
from urllib.parse import quote, unquote

import requests as http_requests
from flask import Blueprint, jsonify, request, send_file

# =============================================================================
# Blueprint
# =============================================================================
line_bot_bp = Blueprint("line_bot", __name__)

# =============================================================================
# Config (ENV vars)
# =============================================================================
_LINE_REPLY_API = "https://api.line.me/v2/bot/message/reply"
_LINE_SECRET    = os.environ.get("LINE_CHANNEL_SECRET", "")
_LINE_TOKEN     = os.environ.get("LINE_CHANNEL_ACCESS_TOKEN", "")
_R2_BASE        = os.environ.get(
    "R2_PUBLIC_BASE",
    "https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev",
)
_SERVER_BASE = os.environ.get(
    "SERVER_BASE",
    "https://gear-motor-app.onrender.com",
)

# =============================================================================
# State management (in-memory)
# user_id → { "step": str, "data": dict }
#
# step values:
#   "asset_type"    — รอ user เลือก 3D / 2D / Datasheet
#   "asset_model"   — รอ user พิมพ์ Model code
#   "compare_brand" — รอ user เลือกแบรนด์คู่แข่ง
#   "compare_photo" — รอ user ส่งรูปเนมเพลท
# =============================================================================
_user_state: dict[str, dict] = {}

COMPARE_BRANDS = [
    "Oriental", "ZD", "Suntech", "GTR", "Panasonic",
    "SPG", "TAILI", "SEW", "Sumitomo", "ABB",
    "INNOMOTIC", "NORD", "BONFIGLIOLI", "ROSSI",
]

# =============================================================================
# Helpers — R2
# =============================================================================

def _normalize_ac_ratio(model_code: str) -> str:
    """เปลี่ยน ratio ทุกค่า → 3 เพื่อชี้ไฟล์จริงใน R2
    เช่น 5IK90RGU-CF-5GU15KB → 5IK90RGU-CF-5GU3KB"""
    return re.sub(
        r"(\d+)(GN|GU)(\d+(?:\.\d+)?)(KB|RC|RT|K)(\b|$)",
        lambda m: f"{m.group(1)}{m.group(2).upper()}3{m.group(4).upper()}",
        model_code,
        flags=re.IGNORECASE,
    )


def _r2_url(filename: str) -> str:
    return f"{_R2_BASE}/{quote(filename, safe='')}"


def _fetch_r2(filename: str) -> tuple[bytes, str] | tuple[None, None]:
    """ดึงไฟล์จาก R2 คืน (bytes, actual_filename) หรือ (None, None) ถ้าไม่เจอ
    สำหรับ .step/.STEP จะลองทั้งตัวพิมพ์เล็กและตัวพิมพ์ใหญ่อัตโนมัติ"""
    candidates = [filename]
    # สร้าง variant นามสกุล: ถ้าเป็น .step → ลอง .STEP ด้วย และในทางกลับกัน
    base, _, ext = filename.rpartition(".")
    if ext.lower() == "step":
        alt = f"{base}.STEP" if ext == "step" else f"{base}.step"
        if alt != filename:
            candidates.append(alt)

    for candidate in candidates:
        try:
            r = http_requests.get(_r2_url(candidate), timeout=30)
            if r.status_code != 200:
                continue
            if "text/html" in r.headers.get("content-type", ""):
                continue
            if len(r.content) < 256:
                continue
            return r.content, candidate
        except Exception as e:
            print(f"[R2 fetch error] {candidate}: {e}")
    return None, None


def _dl_url(r2_file: str, display_name: str) -> str:
    """สร้าง download proxy URL"""
    return (
        f"{_SERVER_BASE}/line/download"
        f"?file={quote(r2_file, safe='')}"
        f"&name={quote(display_name, safe='')}"
        f"&openExternalBrowser=1"
    )


# =============================================================================
# Helpers — LINE Messaging API
# =============================================================================

def _post_line(reply_token: str, messages: list) -> None:
    http_requests.post(
        _LINE_REPLY_API,
        headers={
            "Authorization": f"Bearer {_LINE_TOKEN}",
            "Content-Type": "application/json",
        },
        json={"replyToken": reply_token, "messages": messages},
        timeout=10,
    )


def _reply_text(reply_token: str, text: str) -> None:
    _post_line(reply_token, [{"type": "text", "text": text}])


def _reply_flex(reply_token: str, alt_text: str, flex_body: dict) -> None:
    _post_line(reply_token, [{
        "type": "flex",
        "altText": alt_text,
        "contents": flex_body,
    }])


# =============================================================================
# Flex Message builders
# =============================================================================

def _flex_greeting() -> dict:
    """Bubble ทักทาย + 2 ปุ่มหลัก"""
    return {
        "type": "bubble",
        "size": "mega",
        "header": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#1A1A2E",
            "paddingAll": "20px",
            "contents": [
                {
                    "type": "text",
                    "text": "🤖 Mr.SAS MotorBot",
                    "color": "#FFFFFF",
                    "size": "xl",
                    "weight": "bold",
                },
                {
                    "type": "text",
                    "text": "สวัสดีครับ! ผมช่วยอะไรได้บ้างครับ?",
                    "color": "#AAAACC",
                    "size": "sm",
                    "margin": "sm",
                },
            ],
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "paddingAll": "16px",
            "contents": [
                {
                    "type": "button",
                    "style": "primary",
                    "color": "#0066CC",
                    "height": "md",
                    "action": {
                        "type": "message",
                        "label": "🔄  เทียบรุ่น",
                        "text": "เทียบรุ่น",
                    },
                },
                {
                    "type": "button",
                    "style": "primary",
                    "color": "#1DB954",
                    "height": "md",
                    "action": {
                        "type": "message",
                        "label": "📦  ขอ3D&Spec",
                        "text": "ขอ3D&Spec",
                    },
                },
            ],
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "paddingAll": "10px",
            "contents": [{
                "type": "text",
                "text": "SAS Gear Motor • พิมพ์ 'เมนู' เพื่อกลับมาหน้านี้",
                "color": "#AAAAAA",
                "size": "xs",
                "align": "center",
            }],
        },
    }


def _flex_asset_type() -> dict:
    """Bubble ถาม type ไฟล์ที่ต้องการ"""
    return {
        "type": "bubble",
        "size": "mega",
        "header": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#1DB954",
            "paddingAll": "16px",
            "contents": [{
                "type": "text",
                "text": "📦 ขอ3D&Spec",
                "color": "#FFFFFF",
                "size": "lg",
                "weight": "bold",
            }],
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "paddingAll": "16px",
            "contents": [
                {
                    "type": "text",
                    "text": "เอาอะไรดีครับ?",
                    "size": "md",
                    "weight": "bold",
                    "color": "#333333",
                },
                {
                    "type": "button",
                    "style": "primary",
                    "color": "#0066CC",
                    "height": "md",
                    "action": {
                        "type": "message",
                        "label": "📐  3D (.STEP)",
                        "text": "__asset:3d",
                    },
                },
                {
                    "type": "button",
                    "style": "primary",
                    "color": "#E67E22",
                    "height": "md",
                    "action": {
                        "type": "message",
                        "label": "📄  2D Drawing (PDF)",
                        "text": "__asset:2d",
                    },
                },
                {
                    "type": "button",
                    "style": "primary",
                    "color": "#8E44AD",
                    "height": "md",
                    "action": {
                        "type": "message",
                        "label": "📋  Data Sheet",
                        "text": "__asset:datasheet",
                    },
                },
            ],
        },
    }


def _flex_asset_type_with_model(model: str) -> dict:
    """Bubble ถาม type ไฟล์ พร้อมแสดง model ที่ส่งมา"""
    base = _flex_asset_type()
    # แทรก text แสดง model ไว้ใต้หัวข้อ "เอาอะไรดีครับ?"
    body_contents = base["body"]["contents"]
    body_contents.insert(1, {
        "type": "text",
        "text": f"Model: {model}",
        "size": "sm",
        "color": "#0066CC",
        "weight": "bold",
        "margin": "sm",
        "wrap": True,
    })
    return base
    """Bubble ถาม Model code"""
    return {
        "type": "bubble",
        "size": "mega",
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "paddingAll": "20px",
            "contents": [
                {
                    "type": "text",
                    "text": f"ขอ {asset_label}",
                    "weight": "bold",
                    "size": "lg",
                    "color": "#333333",
                },
                {
                    "type": "text",
                    "text": "SAS Model อะไรครับ?",
                    "size": "md",
                    "color": "#555555",
                    "margin": "md",
                },
                {
                    "type": "text",
                    "text": "(Model ที่แอดมินเสนอในใบเสนอราคา — Copy แล้วส่งมาได้เลยครับ)",
                    "size": "xs",
                    "color": "#AAAAAA",
                    "wrap": True,
                    "margin": "sm",
                },
            ],
        },
    }


def _flex_download_result(model: str, buttons: list[dict]) -> dict:
    """Bubble แสดงผลพร้อมปุ่มดาวน์โหลดหลายปุ่ม"""
    btn_contents = []
    colors = ["#0066CC", "#E67E22", "#8E44AD"]
    for i, btn in enumerate(buttons):
        btn_contents.append({
            "type": "button",
            "style": "primary",
            "color": colors[i % len(colors)],
            "height": "md",
            "action": {
                "type": "uri",
                "label": btn["label"],
                "uri": btn["url"],
            },
        })

    return {
        "type": "bubble",
        "size": "mega",
        "header": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#1A1A2E",
            "paddingAll": "16px",
            "contents": [
                {
                    "type": "text",
                    "text": "✅ พบไฟล์แล้วครับ",
                    "color": "#FFFFFF",
                    "size": "lg",
                    "weight": "bold",
                },
                {
                    "type": "text",
                    "text": model,
                    "color": "#AAAACC",
                    "size": "sm",
                    "margin": "sm",
                    "wrap": True,
                },
            ],
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "paddingAll": "16px",
            "contents": btn_contents,
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "paddingAll": "10px",
            "contents": [{
                "type": "text",
                "text": "พิมพ์ 'เมนู' เพื่อเริ่มใหม่",
                "color": "#AAAAAA",
                "size": "xs",
                "align": "center",
            }],
        },
    }


def _flex_compare_brands() -> dict:
    """Bubble แสดงปุ่มเลือกแบรนด์คู่แข่ง (2 คอลัมน์)"""
    # จัดปุ่มเป็น row ละ 2 ปุ่ม
    rows = []
    brand_colors = ["#2C3E50", "#1A5276", "#154360", "#1B2631"]
    for i in range(0, len(COMPARE_BRANDS), 2):
        pair = COMPARE_BRANDS[i:i+2]
        row_btns = []
        for brand in pair:
            row_btns.append({
                "type": "button",
                "style": "primary",
                "color": brand_colors[(i // 2) % len(brand_colors)],
                "height": "sm",
                "flex": 1,
                "action": {
                    "type": "message",
                    "label": brand,
                    "text": f"__brand:{brand}",
                },
            })
        rows.append({
            "type": "box",
            "layout": "horizontal",
            "spacing": "sm",
            "contents": row_btns,
        })

    return {
        "type": "bubble",
        "size": "mega",
        "header": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#0066CC",
            "paddingAll": "16px",
            "contents": [
                {
                    "type": "text",
                    "text": "🔄 เทียบรุ่น",
                    "color": "#FFFFFF",
                    "size": "lg",
                    "weight": "bold",
                },
                {
                    "type": "text",
                    "text": "เลือกแบรนด์คู่เทียบครับ",
                    "color": "#CCE5FF",
                    "size": "sm",
                    "margin": "sm",
                },
            ],
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "paddingAll": "16px",
            "contents": rows,
        },
    }


# =============================================================================
# Asset handler — ค้นหาไฟล์ใน R2 และส่งกลับ
# =============================================================================

_ASSET_LABEL = {
    "3d":        "3D (.STEP)",
    "2d":        "2D Drawing (PDF)",
    "datasheet": "Data Sheet (PDF)",
}

def _handle_asset_request(reply_token: str, user_id: str, raw_model: str) -> None:
    """รับ model code, หาไฟล์ใน R2 ตาม asset_type ที่เลือกไว้, ส่งกลับ"""
    state  = _user_state.get(user_id, {})
    a_type = state.get("data", {}).get("asset_type", "3d")
    file_model = _normalize_ac_ratio(raw_model)

    # กำหนด candidates ตาม type
    if a_type == "3d":
        # ลอง .step (ตัวพิมพ์เล็ก) ก่อน แล้ว fallback .STEP อัตโนมัติใน _fetch_r2
        r2_file      = f"{file_model}.step"
        display_name = f"{raw_model}.step"
        mime         = "application/octet-stream"
    elif a_type == "2d":
        r2_file      = f"{file_model}.pdf"
        display_name = f"{raw_model}.pdf"
        mime         = "application/pdf"
    else:  # datasheet — ไฟล์เดียวกับ .pdf (Spec Sheet)
        r2_file      = f"{file_model}.pdf"
        display_name = f"{raw_model}.pdf"
        mime         = "application/pdf"

    # ตรวจว่าไฟล์มีจริง (_fetch_r2 คืน actual filename ที่เจอ)
    file_bytes, actual_r2_file = _fetch_r2(r2_file)
    if file_bytes is None:
        _reply_text(
            reply_token,
            f"❌ ไม่พบไฟล์ {r2_file} ใน R2 ครับ\n"
            f"ลองตรวจสอบ Model code อีกครั้งนะครับ\n\n"
            f"พิมพ์ 'เมนู' เพื่อเริ่มใหม่",
        )
        _user_state.pop(user_id, None)
        return

    # ใช้ชื่อไฟล์จริงที่เจอใน R2 (อาจเป็น .step หรือ .STEP)
    r2_file = actual_r2_file
    url = _dl_url(r2_file, display_name)
    label = _ASSET_LABEL.get(a_type, "ดาวน์โหลด")

    flex = _flex_download_result(raw_model, [{"label": f"📥 {label}", "url": url}])
    _reply_flex(reply_token, f"✅ {label} — {raw_model}", flex)
    _user_state.pop(user_id, None)


# =============================================================================
# Main webhook handler
# =============================================================================

def _get_user_id(event: dict) -> str:
    """ดึง user_id จาก event (รองรับทั้ง 1:1 และ group)"""
    src = event.get("source", {})
    return src.get("userId") or src.get("groupId") or "unknown"


@line_bot_bp.post("/line/webhook")
def line_webhook():
    payload = request.get_json(silent=True) or {}

    for event in payload.get("events", []):
        event_type  = event.get("type")
        reply_token = event.get("replyToken", "")
        user_id     = _get_user_id(event)

        # ── follow / join → ทักทายทันที ────────────────────────────────────
        if event_type in ("follow", "join"):
            _reply_flex(reply_token, "สวัสดีครับ! Mr.SAS MotorBot", _flex_greeting())
            continue

        if event_type != "message":
            continue

        msg      = event.get("message", {})
        msg_type = msg.get("type")

        # ── รูปภาพ (เนมเพลท) ────────────────────────────────────────────────
        if msg_type == "image":
            state = _user_state.get(user_id, {})
            if state.get("step") == "compare_photo":
                brand = state.get("data", {}).get("brand", "")
                # [TODO] ส่ง image message_id ไป OCR (Google Vision / Claude Vision)
                # แล้ว match กับ SAS model จาก Supabase / Vector DB
                # ตอนนี้ตอบ placeholder ไปก่อน
                _reply_text(
                    reply_token,
                    f"📷 ได้รับรูปเนมเพลทแล้วครับ ({brand})\n\n"
                    f"🔧 ระบบกำลังพัฒนาส่วน OCR + Match อยู่ครับ\n"
                    f"ในระหว่างนี้ทีมแอดมินจะ Match รุ่นให้ด้วยตัวเองก่อนนะครับ 🙏\n\n"
                    f"พิมพ์ 'เมนู' เพื่อเริ่มใหม่",
                )
                _user_state.pop(user_id, None)
            else:
                _reply_flex(reply_token, "สวัสดีครับ!", _flex_greeting())
            continue

        if msg_type != "text":
            continue

        text = msg.get("text", "").strip()

        # ── คำสั่ง: เมนู / กลับ ─────────────────────────────────────────────
        if text.lower() in ("เมนู", "menu", "หน้าแรก", "กลับ", "start", "สวัสดี", "hi", "hello"):
            _user_state.pop(user_id, None)
            _reply_flex(reply_token, "สวัสดีครับ! Mr.SAS MotorBot", _flex_greeting())
            continue

        # ── ปุ่มหลัก: ขอ3D&Spec ─────────────────────────────────────────────
        if text == "ขอ3D&Spec":
            _user_state[user_id] = {"step": "asset_type", "data": {}}
            _reply_flex(reply_token, "เอาอะไรดีครับ?", _flex_asset_type())
            continue

        # ── ปุ่มหลัก: เทียบรุ่น ─────────────────────────────────────────────
        if text == "เทียบรุ่น":
            _user_state[user_id] = {"step": "compare_brand", "data": {}}
            _reply_flex(reply_token, "เลือกแบรนด์คู่เทียบครับ", _flex_compare_brands())
            continue

        # ── STATE: asset_type — User เลือกประเภทไฟล์ ────────────────────────
        if text.startswith("__asset:"):
            a_type = text.replace("__asset:", "")
            prev_state = _user_state.get(user_id, {})
            pending_model = prev_state.get("data", {}).get("pending_model")
            if pending_model:
                # มี model code รอค้างอยู่ → ประมวลผลได้เลย
                _user_state[user_id] = {"step": "asset_model", "data": {"asset_type": a_type}}
                _handle_asset_request(reply_token, user_id, pending_model)
            else:
                _user_state[user_id] = {"step": "asset_model", "data": {"asset_type": a_type}}
                label = _ASSET_LABEL.get(a_type, a_type)
                _reply_flex(reply_token, f"ขอ {label}", _flex_ask_model(label))
            continue

        # ── STATE: asset_model — User ส่ง Model code ────────────────────────
        state = _user_state.get(user_id, {})
        if state.get("step") == "asset_model":
            _handle_asset_request(reply_token, user_id, text)
            continue

        # ── Fallback: ข้อความที่ดูเหมือน Model code แต่ไม่มี state ──────────
        # (กรณี server restart ทำให้ in-memory state หาย)
        if re.match(r'^[A-Z0-9][A-Z0-9\-\.]+$', text, re.IGNORECASE) and '-' in text:
            _user_state[user_id] = {"step": "asset_type", "data": {"pending_model": text}}
            _reply_flex(
                reply_token,
                "เอาไฟล์ประเภทไหนดีครับ?",
                _flex_asset_type_with_model(text),
            )
            continue

        # ── STATE: compare_brand — User เลือกแบรนด์ ─────────────────────────
        if text.startswith("__brand:"):
            brand = text.replace("__brand:", "")
            _user_state[user_id] = {"step": "compare_photo", "data": {"brand": brand}}
            _reply_text(
                reply_token,
                f"เลือก {brand} แล้วครับ 👍\n\n"
                f"📸 ขอดูเนมเพลทหน่อยครับ\n"
                f"(ถ่ายรูปหรือส่งภาพเนมเพลทมาได้เลยครับ)",
            )
            continue

        # ── STATE: compare_photo — รอรูป (แต่ user ส่ง text มา) ─────────────
        if state.get("step") == "compare_photo":
            _reply_text(
                reply_token,
                "📸 รอรูปเนมเพลทอยู่ครับ\n"
                "ส่งรูปมาได้เลยนะครับ 😊\n\n"
                "พิมพ์ 'เมนู' ถ้าอยากเริ่มใหม่",
            )
            continue

        # ── ข้อความอื่นๆ → ทักทาย ────────────────────────────────────────────
        _user_state.pop(user_id, None)
        _reply_flex(reply_token, "สวัสดีครับ! Mr.SAS MotorBot", _flex_greeting())

    return jsonify({"ok": True}), 200


# =============================================================================
# Download proxy
# GET /line/download?file=xxx&name=yyy&openExternalBrowser=1
# =============================================================================

@line_bot_bp.get("/line/download")
def line_download():
    file_param = unquote(request.args.get("file", ""))
    name_param = unquote(request.args.get("name", "")) or file_param
    if not file_param:
        return jsonify({"error": "missing file param"}), 400

    file_bytes, _ = _fetch_r2(file_param)
    if file_bytes is None:
        return jsonify({"error": f"ไม่พบไฟล์ {file_param}"}), 404

    ext = file_param.rsplit(".", 1)[-1].lower()
    mime = "application/pdf" if ext == "pdf" else "application/octet-stream"

    return send_file(
        io.BytesIO(file_bytes),
        as_attachment=True,
        download_name=name_param,
        mimetype=mime,
    )
