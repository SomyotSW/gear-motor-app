# convert_to_glb.py v7 — FreeCAD 1.0 headless (no GUI)
# รัน: "E:\Program Files\FreeCAD 1.0\bin\python.exe" "C:\Users\Haruj\gear-motor-app\convert_to_glb.py"
#
# ✅ ข้ามไฟล์ที่ .glb ใหม่กว่า (หรือเท่ากับ) .STEP → ไม่ต้อง convert ซ้ำ
# ✅ ถ้า .glb เก่ากว่า .STEP (ไฟล์ STEP ถูกอัปเดต) → แปลงใหม่อัตโนมัติ
# ✅ ถ้า .glb เสียหาย (header ผิด) → แปลงใหม่อัตโนมัติ

import sys, os, struct, json

FREECAD_BIN = r"E:\Program Files\FreeCAD 1.0\bin"
for p in [FREECAD_BIN, os.path.join(FREECAD_BIN, 'lib')]:
    if p not in sys.path:
        sys.path.insert(0, p)

import FreeCAD
import Part
import MeshPart

SRC_DIR = r"C:\Users\Haruj\gear-motor-app\public\model"
OUT_DIR = r"C:\Users\Haruj\gear-motor-app\public\model\glb"
os.makedirs(OUT_DIR, exist_ok=True)

# ─── helpers ───────────────────────────────────────────────────────────────

def pad4_bin(b: bytearray) -> bytearray:
    r = len(b) % 4
    return b + bytearray(4 - r) if r else b

def pad4_json(b: bytearray) -> bytearray:
    r = len(b) % 4
    return b + bytearray(b' ' * (4 - r)) if r else b

def is_valid_glb(path: str) -> bool:
    """ตรวจ GLB header + JSON chunk เบื้องต้น"""
    try:
        with open(path, 'rb') as f:
            if f.read(4) != b'glTF':
                return False
            f.seek(12)
            json_len = int.from_bytes(f.read(4), 'little')
            f.seek(4, 1)                      # ข้าม chunk type
            json_data = f.read(json_len)
            json.loads(json_data.rstrip(b' '))
        return True
    except Exception:
        return False

def needs_convert(step_path: str, glb_path: str) -> tuple[bool, str]:
    """
    คืน (True/False, เหตุผล)
    False = ข้าม  |  True = ต้อง convert
    """
    if not os.path.exists(glb_path):
        return True, "ไฟล์ใหม่"

    glb_size = os.path.getsize(glb_path)
    if glb_size == 0:
        return True, "GLB ว่างเปล่า"

    # timestamp: ถ้า STEP ใหม่กว่า GLB → ต้อง re-convert
    step_mtime = os.path.getmtime(step_path)
    glb_mtime  = os.path.getmtime(glb_path)
    if step_mtime > glb_mtime + 1:          # +1 วินาที tolerance
        return True, f"STEP อัปเดตใหม่กว่า GLB"

    # GLB มีอยู่และ STEP ไม่ใหม่กว่า → ตรวจความถูกต้อง header
    if not is_valid_glb(glb_path):
        return True, "GLB เสียหาย (header ผิด)"

    return False, "มีอยู่แล้วและ up-to-date"

# ─── scan STEP files ────────────────────────────────────────────────────────

files = sorted(
    [
        (f, os.path.join(SRC_DIR, f))
        for f in os.listdir(SRC_DIR)
        if os.path.isfile(os.path.join(SRC_DIR, f))
        and os.path.splitext(f)[1].lower() in ('.step', '.stp')
    ],
    key=lambda x: x[0]
)

total = len(files)
print(f"พบไฟล์ .STEP ทั้งหมด {total} ไฟล์\n")

ok, skip, fail = 0, 0, 0
new_files = []   # เก็บชื่อไฟล์ที่ถูก convert จริง

# ─── main loop ──────────────────────────────────────────────────────────────

for i, (fname, filepath) in enumerate(files, 1):
    name    = os.path.splitext(fname)[0]
    out     = os.path.join(OUT_DIR, name + ".glb")

    convert, reason = needs_convert(filepath, out)

    if not convert:
        skip += 1
        print(f"[{i:>3}/{total}] SKIP    {name}")
        continue

    # ── ต้อง convert ──
    print(f"[{i:>3}/{total}] CONVERT {name}  ({reason})")

    # ลบไฟล์เก่าถ้ามี
    if os.path.exists(out):
        os.remove(out)

    try:
        shape = Part.Shape()
        shape.read(filepath)
        if shape.isNull():
            raise ValueError("Shape เป็น null")

        tess  = shape.tessellate(0.05)
        verts = tess[0]
        faces = tess[1]

        if not verts or not faces:
            raise ValueError("tessellate ได้ mesh ว่าง")

        # ── build binary buffers ──
        vert_data = bytearray()
        for v in verts:
            vert_data += struct.pack('<fff', v.x, v.y, v.z)

        idx_data = bytearray()
        for f3 in faces:
            idx_data += struct.pack('<III', f3[0], f3[1], f3[2])

        vert_data = pad4_bin(vert_data)
        idx_data  = pad4_bin(idx_data)

        xs = [v.x for v in verts]
        ys = [v.y for v in verts]
        zs = [v.z for v in verts]

        bin_data    = idx_data + vert_data
        idx_offset  = 0
        vert_offset = len(idx_data)

        gltf = {
            "asset": {"version": "2.0", "generator": "FreeCAD-SAS-v7"},
            "scene": 0,
            "scenes": [{"nodes": [0]}],
            "nodes": [{"mesh": 0}],
            "meshes": [{
                "primitives": [{
                    "attributes": {"POSITION": 1},
                    "indices": 0
                }]
            }],
            "accessors": [
                {
                    "bufferView": 0,
                    "componentType": 5125,      # UNSIGNED_INT
                    "count": len(faces) * 3,
                    "type": "SCALAR"
                },
                {
                    "bufferView": 1,
                    "componentType": 5126,      # FLOAT
                    "count": len(verts),
                    "type": "VEC3",
                    "min": [min(xs), min(ys), min(zs)],
                    "max": [max(xs), max(ys), max(zs)]
                }
            ],
            "bufferViews": [
                {"buffer": 0, "byteOffset": idx_offset,  "byteLength": len(idx_data),  "target": 34963},
                {"buffer": 0, "byteOffset": vert_offset, "byteLength": len(vert_data), "target": 34962}
            ],
            "buffers": [{"byteLength": len(bin_data)}]
        }

        json_bytes     = bytearray(json.dumps(gltf, separators=(',', ':')).encode('utf-8'))
        json_bytes     = pad4_json(json_bytes)
        json_chunk_len = len(json_bytes)
        bin_chunk_len  = len(bin_data)
        total_len      = 12 + 8 + json_chunk_len + 8 + bin_chunk_len

        with open(out, 'wb') as fp:
            fp.write(struct.pack('<III', 0x46546C67, 2, total_len))      # header
            fp.write(struct.pack('<II',  json_chunk_len, 0x4E4F534A))    # JSON chunk header
            fp.write(json_bytes)
            fp.write(struct.pack('<II',  bin_chunk_len,  0x004E4942))    # BIN chunk header
            fp.write(bin_data)

        size = os.path.getsize(out)
        ok  += 1
        new_files.append(name)
        print(f"           → OK  ({size // 1024} KB)")

    except Exception as e:
        fail += 1
        print(f"           → FAIL: {e}")

# ─── summary ────────────────────────────────────────────────────────────────

print(f"\n{'='*55}")
print(f"✅ แปลงสำเร็จ  : {ok} ไฟล์")
print(f"⏭  ข้ามแล้ว   : {skip} ไฟล์  (ไม่มีการเปลี่ยนแปลง)")
print(f"❌ ล้มเหลว    : {fail} ไฟล์")
print(f"{'='*55}")

if new_files:
    print(f"\n📦 ไฟล์ที่ถูก convert ใหม่ ({len(new_files)} ไฟล์):")
    for n in new_files:
        print(f"   • {n}.glb")
else:
    print("\nℹ️  ไม่มีไฟล์ใหม่ที่ต้อง convert")
