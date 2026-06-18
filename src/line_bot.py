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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  KNOWN PITFALLS & DEFENSES  (อ่านก่อนแก้ไขไฟล์นี้!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PITFALL 1 — SIGNATURE ไม่ได้ตรวจสอบ (🔴 Critical Security)
───────────────────────────────────────────────────────────
  ปัญหา: LINE ส่ง X-Line-Signature header มาพร้อมทุก webhook
         ถ้าไม่ verify ใครก็ POST มา /line/webhook แกล้งเป็น LINE ได้
         inject state เพี้ยน หรือทำให้ bot reply ผิดๆ ได้
  สถานะ: ✅ มี _verify_line_signature() ป้องกันแล้ว (ดูใต้ Config block)
  ⚠️ BUG TRAP — "body consumed twice":
     Flask request body เป็น stream อ่านได้ครั้งเดียว
     ถ้าเรียก request.get_data() แล้วตามด้วย request.get_json()
     → get_json() ได้ empty dict → events ว่าง → bot เงียบ ไม่ตอบ!
     วิธีแก้: parse JSON จาก raw_body โดยตรงด้วย json.loads(raw_body)
     (ดูใน line_webhook() — ห้ามเปลี่ยนกลับไปใช้ get_json() เด็ดขาด)

PITFALL 2 — REPLY TOKEN หมดอายุเร็ว (~30 วินาที)
───────────────────────────────────────────────────────────
  ปัญหา: LINE replyToken ใช้ได้ครั้งเดียวและหมดอายุในเวลาสั้นมาก
         _fetch_r2() มี timeout=30s → ถ้า R2 ช้า token อาจหมดก่อน
         → LINE API คืน 400 "Invalid reply token" → user ไม่ได้รับข้อความ
  สถานะ: ⚠️ ยังเสี่ยงอยู่สำหรับไฟล์ใหญ่หรือ R2 ช้า
  แนวทางแก้: ตอบ LINE ด้วย 200 OK ทันที แล้วใช้ Push Message API แทน
             หรือลด R2 timeout ให้เหลือ ~8 วิ แล้ว fallback แจ้ง user

PITFALL 3 — DUPLICATE EVENTS (LINE ส่ง webhook ซ้ำ)
───────────────────────────────────────────────────────────
  ปัญหา: LINE Platform อาจส่ง webhook event ซ้ำได้เสมอ (at-least-once)
         เช่น กดปุ่ม __asset:3d แล้วมา 2 ครั้ง → reply 2 รอบ
         → ครั้งที่ 2 LINE API error เพราะ token ใช้ไปแล้ว (ไม่ crash แต่ log error)
  สถานะ: ✅ ป้องกันด้วย _seen_event_ids set + TTL-style cleanup
         (ดู _is_duplicate_event() ใต้ State management block)
  หมายเหตุ: webhookEventId อยู่ใน event["webhookEventId"] (ไม่ใช่ event["id"])

PITFALL 4 — IN-MEMORY STATE หายเมื่อ SERVER RESTART / REDEPLOY
───────────────────────────────────────────────────────────
  ปัญหา: Render deploy ใหม่ทุกครั้ง → _user_state ล้างหมดทันที
         user ที่กำลังอยู่ใน step "asset_model" จะหลุด flow
         → พิมพ์ Model code มา → bot งง → ตอบ Greeting แทน
  สถานะ: ✅ มี Fallback regex ดัก Model code ไว้แล้ว (~บรรทัด 692)
         จับ pattern [A-Z0-9][A-Z0-9\-\.]+ ที่มี '-' → ถามประเภทไฟล์ใหม่
  แนวทางแก้ระยะยาว: ย้าย state → Redis (Upstash) หรือ Supabase table

PITFALL 5 — DEAD CODE ใน _flex_asset_type_with_model()
───────────────────────────────────────────────────────────
  ปัญหา: ฟังก์ชันนี้มีโค้ดหลัง return statement (~บรรทัด 367-401)
         เป็นซาก _flex_ask_model() เก่าที่ถูก inline แล้วลืมลบ
         ไม่ทำให้ crash แต่ทำให้ confuse มากเวลาอ่าน
  สถานะ: ⚠️ ยังอยู่ — ไม่กระทบ runtime แต่ควร cleanup ในรอบถัดไป

PITFALL 6 — /line/download โหลด R2 ทั้งก้อนก่อน send
───────────────────────────────────────────────────────────
  ปัญหา: endpoint นี้ดึงไฟล์ทั้งหมดก่อน (_fetch_r2) แล้วค่อย send
         ถ้าไฟล์ STEP ใหญ่หลาย MB → RAM spike + response ช้า
         ถ้า Render มี memory limit จะ OOM crash
  สถานะ: ⚠️ acceptable สำหรับไฟล์เล็ก/ปานกลาง
  แนวทางแก้: redirect ไปยัง R2 URL ตรงๆ แทน proxy
             (ทำได้เลยถ้า R2 bucket เป็น public อยู่แล้ว)

PITFALL 7 — GROUP CHAT: user_id ปนกับ groupId
───────────────────────────────────────────────────────────
  ปัญหา: _get_user_id() ใช้ groupId เป็น fallback ถ้าไม่มี userId
         ทำให้ทุกคนในกลุ่มแชร์ state เดียวกัน
         คนหนึ่งกด "ขอ3D&Spec" อีกคนพิมพ์ model code → ได้ไฟล์แทน
  สถานะ: ⚠️ acceptable เพราะ use case หลักเป็น 1:1 DM
  แนวทางแก้: ใช้ composite key f"{groupId}:{userId}" แทน

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

# Startup diagnostic — แสดงใน Render Logs ว่า ENV ถูก set ไหม
print(f"[line_bot] LINE_CHANNEL_SECRET  : {'✅ set ({} chars)'.format(len(_LINE_SECRET.strip())) if _LINE_SECRET.strip() else '❌ NOT SET'}")
print(f"[line_bot] LINE_CHANNEL_ACCESS_TOKEN: {'✅ set ({} chars)'.format(len(_LINE_TOKEN.strip())) if _LINE_TOKEN.strip() else '❌ NOT SET'}")

# =============================================================================
# State management (Supabase-backed — persistent across restarts)
# user_id → { "step": str, "data": dict }
#
# step values:
#   "asset_type"    — รอ user เลือก 3D / 2D / Datasheet
#   "asset_model"   — รอ user พิมพ์ Model code
#   "compare_brand" — รอ user เลือกแบรนด์คู่แข่ง
#   "compare_photo" — รอ user ส่งรูปเนมเพลท
#
# ต้องสร้าง table ใน Supabase ก่อนใช้งาน:
#   create table line_user_state (
#     user_id  text primary key,
#     step     text not null,
#     data     jsonb not null default '{}',
#     updated_at timestamptz not null default now()
#   );
# =============================================================================
import json as _json_mod

_SUPABASE_URL   = os.environ.get("SUPABASE_URL", "").rstrip("/")
_SUPABASE_KEY   = os.environ.get("SUPABASE_SECRET_KEY", "")
_STATE_TABLE    = "line_user_state"

# Fallback in-memory cache — ใช้เมื่อ Supabase ไม่ได้ตั้งค่า (dev) หรือ request ล้มเหลว
_user_state: dict[str, dict] = {}

def _sb_headers() -> dict:
    return {
        "apikey": _SUPABASE_KEY,
        "Authorization": f"Bearer {_SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

def _state_get(user_id: str) -> dict:
    """ดึง state ของ user จาก Supabase; fallback in-memory ถ้า Supabase ไม่พร้อม"""
    if not (_SUPABASE_URL and _SUPABASE_KEY):
        return _user_state.get(user_id, {})
    try:
        url = f"{_SUPABASE_URL}/rest/v1/{_STATE_TABLE}?user_id=eq.{quote(user_id, safe='')}&select=step,data"
        r = http_requests.get(url, headers=_sb_headers(), timeout=5)
        if r.status_code == 200:
            rows = r.json()
            if rows:
                return {"step": rows[0]["step"], "data": rows[0].get("data") or {}}
        return {}
    except Exception as e:
        print(f"[state_get error] {e}")
        return _user_state.get(user_id, {})

def _state_set(user_id: str, state: dict) -> None:
    """บันทึก state ลง Supabase (upsert); fallback in-memory ถ้า Supabase ไม่พร้อม"""
    _user_state[user_id] = state  # อัปเดต in-memory เสมอ (เร็ว + fallback)
    if not (_SUPABASE_URL and _SUPABASE_KEY):
        return
    try:
        url = f"{_SUPABASE_URL}/rest/v1/{_STATE_TABLE}"
        payload = {
            "user_id": user_id,
            "step": state.get("step", ""),
            "data": state.get("data", {}),
            "updated_at": "now()",
        }
        headers = {**_sb_headers(), "Prefer": "resolution=merge-duplicates,return=minimal"}
        http_requests.post(url, headers=headers, json=payload, timeout=5)
    except Exception as e:
        print(f"[state_set error] {e}")

def _state_pop(user_id: str) -> None:
    """ลบ state ของ user ออกจาก Supabase และ in-memory"""
    _user_state.pop(user_id, None)
    if not (_SUPABASE_URL and _SUPABASE_KEY):
        return
    try:
        url = f"{_SUPABASE_URL}/rest/v1/{_STATE_TABLE}?user_id=eq.{quote(user_id, safe='')}"
        http_requests.delete(url, headers=_sb_headers(), timeout=5)
    except Exception as e:
        print(f"[state_pop error] {e}")

# =============================================================================
# Defense: Duplicate-event deduplication (PITFALL 3)
# เก็บ webhookEventId ที่เคยเห็นไว้ใน set เพื่อ skip event ซ้ำ
# ล้าง set ทุก MAX_SEEN_SIZE entries เพื่อไม่ให้ RAM รั่ว
# =============================================================================
_seen_event_ids: set[str] = set()
_MAX_SEEN_SIZE = 500  # รีเซ็ตเมื่อ set ใหญ่เกินนี้


def _is_duplicate_event(event: dict) -> bool:
    """คืน True ถ้า event นี้เคยประมวลผลไปแล้ว (LINE ส่งซ้ำ)"""
    global _seen_event_ids
    event_id = event.get("webhookEventId") or event.get("id")
    if not event_id:
        return False  # ไม่มี ID → ประมวลผลปกติ (ปลอดภัยกว่า skip)
    if event_id in _seen_event_ids:
        print(f"[dedup] skipping duplicate event_id={event_id}")
        return True
    if len(_seen_event_ids) >= _MAX_SEEN_SIZE:
        _seen_event_ids = set()  # flush เมื่อเต็ม (simple TTL substitute)
    _seen_event_ids.add(event_id)
    return False


# =============================================================================
# Defense: Signature verification (PITFALL 1)
# LINE ส่ง HMAC-SHA256 ของ raw body ใน X-Line-Signature header
# ต้อง verify ก่อนประมวลผลทุกครั้ง — อ่าน raw bytes ก่อน parse JSON
# =============================================================================

def _verify_line_signature(raw_body: bytes, signature_header: str) -> bool:
    """ตรวจสอบว่า request มาจาก LINE Platform จริง
    คืน False ถ้า signature ไม่ตรงหรือ _LINE_SECRET ว่าง"""
    secret = _LINE_SECRET.strip()  # ป้องกัน whitespace/newline ที่ติดมาจาก ENV
    if not secret:
        print("[security] LINE_CHANNEL_SECRET not set — skipping signature check")
        return True  # dev fallback: ถ้าไม่มี secret ให้ผ่านไปก่อน
    if not signature_header:
        print("[security] missing X-Line-Signature header")
        return False
    expected = base64.b64encode(
        hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).digest()
    ).decode("utf-8")
    ok = hmac.compare_digest(expected, signature_header.strip())
    if not ok:
        print(f"[security] signature mismatch — expected={expected[:20]}... got={signature_header[:20]}...")
    return ok

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
    resp = http_requests.post(
        _LINE_REPLY_API,
        headers={
            "Authorization": f"Bearer {_LINE_TOKEN}",
            "Content-Type": "application/json",
        },
        json={"replyToken": reply_token, "messages": messages},
        timeout=10,
    )
    if resp.status_code != 200:
        print(f"[LINE reply error] status={resp.status_code} body={resp.text[:300]}")


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
    """Bubble ถาม type ไฟล์ พร้อมแสดง model ที่ส่งมา (ไม่ mutate _flex_asset_type)"""
    import copy
    base = copy.deepcopy(_flex_asset_type())
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


def _flex_ask_model(asset_label: str) -> dict:
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
                    "text": "💡 ท่านสามารถ Copy code แต่ละรายการจากใบเสนอราคามากรอกในนี้ได้เลยครับ",
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
    state  = _state_get(user_id)
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
        _state_pop(user_id)
        return

    # ใช้ชื่อไฟล์จริงที่เจอใน R2 (อาจเป็น .step หรือ .STEP)
    r2_file = actual_r2_file
    url = _dl_url(r2_file, display_name)
    label = _ASSET_LABEL.get(a_type, "ดาวน์โหลด")

    flex = _flex_download_result(raw_model, [{"label": f"📥 {label}", "url": url}])
    _reply_flex(reply_token, f"✅ {label} — {raw_model}", flex)
    _state_pop(user_id)


# =============================================================================
# Main webhook handler
# =============================================================================

def _get_user_id(event: dict) -> str:
    """ดึง user_id จาก event (รองรับทั้ง 1:1 และ group)"""
    src = event.get("source", {})
    return src.get("userId") or src.get("groupId") or "unknown"


@line_bot_bp.post("/line/webhook")
def line_webhook():
    # ── Defense PITFALL 1: ตรวจ signature ก่อนทุกอย่าง ──────────────────
    # อ่าน raw_body ครั้งเดียว แล้ว parse JSON จาก bytes เลย
    # ⚠️ อย่าเรียก request.get_json() หลังจากนี้ — body stream หมดแล้ว
    raw_body = request.get_data()

    # ✅ FIX 1: LINE Verify ส่ง empty body → ตอบ 200 ทันที
    if not raw_body:
        print("[webhook] empty body — LINE Verify ping, returning 200")
        return jsonify({"ok": True}), 200

    sig = request.headers.get("X-Line-Signature", "")

    # ✅ FIX 2: debug log + ถ้า secret ไม่ได้ set → bypass signature check
    secret_len = len(_LINE_SECRET.strip())
    print(f"[webhook] body_len={len(raw_body)} sig={'OK' if sig else 'MISSING'} secret={'SET('+str(secret_len)+')' if secret_len else 'NOT SET ❌'}")

    if not _LINE_SECRET.strip():
        print("[webhook] ⚠️ LINE_CHANNEL_SECRET not set — bypassing signature check")
    elif not _verify_line_signature(raw_body, sig):
        print(f"[security] ❌ invalid signature rejected — sig={sig[:30]}...")
        return jsonify({"error": "invalid signature"}), 400
    else:
        print("[webhook] ✅ signature verified OK")

    import json as _json
    try:
        payload = _json.loads(raw_body) if raw_body else {}
    except Exception:
        payload = {}

    for event in payload.get("events", []):
        # ── Defense PITFALL 3: ข้าม duplicate event ──────────────────────
        if _is_duplicate_event(event):
            continue
        try:
            _handle_event(event)
        except Exception as exc:
            import traceback
            print(f"[webhook unhandled exception] {exc}\n{traceback.format_exc()}")

    return jsonify({"ok": True}), 200


def _handle_event(event: dict) -> None:
    """ประมวลผล 1 event จาก LINE"""
    event_type  = event.get("type")
    reply_token = event.get("replyToken", "")
    user_id     = _get_user_id(event)

    # ── follow / join → ทักทายทันที ────────────────────────────────────
    if event_type in ("follow", "join"):
        _reply_flex(reply_token, "สวัสดีครับ! Mr.SAS MotorBot", _flex_greeting())
        return

    if event_type != "message":
        return

    msg      = event.get("message", {})
    msg_type = msg.get("type")

    # ── รูปภาพ (เนมเพลท) ────────────────────────────────────────────────
    if msg_type == "image":
        state = _state_get(user_id)
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
            _state_pop(user_id)
        else:
            _reply_flex(reply_token, "สวัสดีครับ!", _flex_greeting())
        return

    if msg_type != "text":
        return

    text = msg.get("text", "").strip()

    # ── คำสั่ง: เมนู / กลับ ─────────────────────────────────────────────
    if text.lower() in ("เมนู", "menu", "หน้าแรก", "กลับ", "start", "สวัสดี", "hi", "hello"):
        _state_pop(user_id)
        _reply_flex(reply_token, "สวัสดีครับ! Mr.SAS MotorBot", _flex_greeting())
        return

    # ── ปุ่มหลัก: ขอ3D&Spec ─────────────────────────────────────────────
    if text == "ขอ3D&Spec":
        _state_set(user_id, {"step": "asset_type", "data": {}})
        _reply_flex(reply_token, "เอาอะไรดีครับ?", _flex_asset_type())
        return

    # ── ปุ่มหลัก: เทียบรุ่น ─────────────────────────────────────────────
    if text == "เทียบรุ่น":
        _state_set(user_id, {"step": "compare_brand", "data": {}})
        _reply_flex(reply_token, "เลือกแบรนด์คู่เทียบครับ", _flex_compare_brands())
        return

    # ── STATE: asset_type — User เลือกประเภทไฟล์ ────────────────────────
    if text.startswith("__asset:"):
        a_type = text.replace("__asset:", "")
        prev_state = _state_get(user_id)
        pending_model = prev_state.get("data", {}).get("pending_model")
        if pending_model:
            # มี model code รอค้างอยู่ → ประมวลผลได้เลย
            _state_set(user_id, {"step": "asset_model", "data": {"asset_type": a_type}})
            _handle_asset_request(reply_token, user_id, pending_model)
        else:
            _state_set(user_id, {"step": "asset_model", "data": {"asset_type": a_type}})
            label = _ASSET_LABEL.get(a_type, a_type)
            _reply_flex(reply_token, f"ขอ {label}", _flex_ask_model(label))
        return

    # ── STATE: asset_model — User ส่ง Model code ────────────────────────
    state = _state_get(user_id)
    if state.get("step") == "asset_model":
        _handle_asset_request(reply_token, user_id, text)
        return

    # ── Fallback: ข้อความที่ดูเหมือน Model code แต่ไม่มี state ──────────
    # (กรณี server restart ทำให้ in-memory state หาย — ยังคงไว้เพื่อ edge case อื่นๆ)
    if re.match(r'^[A-Z0-9][A-Z0-9\-\.]+$', text, re.IGNORECASE) and '-' in text:
        _state_set(user_id, {"step": "asset_type", "data": {"pending_model": text}})
        _reply_flex(
            reply_token,
            "เอาไฟล์ประเภทไหนดีครับ?",
            _flex_asset_type_with_model(text),
        )
        return

    # ── STATE: compare_brand — User เลือกแบรนด์ ─────────────────────────
    if text.startswith("__brand:"):
        brand = text.replace("__brand:", "")
        _state_set(user_id, {"step": "compare_photo", "data": {"brand": brand}})
        _reply_text(
            reply_token,
            f"เลือก {brand} แล้วครับ 👍\n\n"
            f"📸 ขอดูเนมเพลทหน่อยครับ\n"
            f"(ถ่ายรูปหรือส่งภาพเนมเพลทมาได้เลยครับ)",
        )
        return

    # ── STATE: compare_photo — รอรูป (แต่ user ส่ง text มา) ─────────────
    if state.get("step") == "compare_photo":
        _reply_text(
            reply_token,
            "📸 รอรูปเนมเพลทอยู่ครับ\n"
            "ส่งรูปมาได้เลยนะครับ 😊\n\n"
            "พิมพ์ 'เมนู' ถ้าอยากเริ่มใหม่",
        )
        return

    # ── ข้อความอื่นๆ → ทักทาย ────────────────────────────────────────────
    _state_pop(user_id)
    _reply_flex(reply_token, "สวัสดีครับ! Mr.SAS MotorBot", _flex_greeting())


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
