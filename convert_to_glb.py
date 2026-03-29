# convert_to_glb.py v6 — FreeCAD 1.0 headless (no GUI)
# รัน: "E:\Program Files\FreeCAD 1.0\bin\python.exe" "C:\Users\Haruj\gear-motor-app\convert_to_glb.py"

import sys, os

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

files = []
for f in os.listdir(SRC_DIR):
    full = os.path.join(SRC_DIR, f)
    if not os.path.isfile(full):
        continue
    if os.path.splitext(f)[1].lower() in ('.step', '.stp'):
        files.append((f, full))

files.sort(key=lambda x: x[0])
total = len(files)
print(f"พบไฟล์ .STEP ทั้งหมด {total} ไฟล์\n")

ok, skip, fail = 0, 0, 0

for i, (fname, filepath) in enumerate(files, 1):
    name = os.path.splitext(fname)[0]
    out  = os.path.join(OUT_DIR, name + ".glb")

    # ลบไฟล์เดิมแล้ว convert ใหม่ทุกไฟล์ (เพื่อแก้ JSON padding bug)
    if os.path.exists(out):
        os.remove(out)

    try:
        # โหลด STEP โดยตรง (headless safe)
        shape = Part.Shape()
        shape.read(filepath)
        if shape.isNull():
            raise ValueError("Shape เป็น null")

        # tessellate → ได้ (vertices, faces) tuple
        tess = shape.tessellate(0.05)
        verts = tess[0]   # list of FreeCAD.Vector
        faces = tess[1]   # list of (i,j,k)

        if not verts or not faces:
            raise ValueError("tessellate ได้ mesh ว่าง")

        # เขียน GLB แบบ manual (binary glTF)
        import struct, json

        # flatten vertices
        vert_data = bytearray()
        for v in verts:
            vert_data += struct.pack('<fff', v.x, v.y, v.z)

        # flatten indices (uint32)
        idx_data = bytearray()
        for f3 in faces:
            idx_data += struct.pack('<III', f3[0], f3[1], f3[2])

        # pad to 4-byte boundary
        # GLB spec: JSON chunk pad ด้วย space (0x20), BIN chunk pad ด้วย null (0x00)
        def pad4_bin(b):
            r = len(b) % 4
            return b + bytearray(4 - r) if r else b

        def pad4_json(b):
            r = len(b) % 4
            return b + bytearray(b' ' * (4 - r)) if r else b

        vert_data = pad4_bin(vert_data)
        idx_data  = pad4_bin(idx_data)

        # bounding box
        xs = [v.x for v in verts]
        ys = [v.y for v in verts]
        zs = [v.z for v in verts]

        bin_data = idx_data + vert_data
        idx_offset  = 0
        vert_offset = len(idx_data)

        gltf = {
            "asset": {"version": "2.0", "generator": "FreeCAD-SAS"},
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
                    "componentType": 5125,  # UNSIGNED_INT
                    "count": len(faces) * 3,
                    "type": "SCALAR"
                },
                {
                    "bufferView": 1,
                    "componentType": 5126,  # FLOAT
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

        json_bytes = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
        json_bytes = pad4_json(bytearray(json_bytes))

        # GLB header + chunks
        json_chunk_len = len(json_bytes)
        bin_chunk_len  = len(bin_data)
        total_len = 12 + 8 + json_chunk_len + 8 + bin_chunk_len

        with open(out, 'wb') as fp:
            # header
            fp.write(struct.pack('<III', 0x46546C67, 2, total_len))
            # JSON chunk
            fp.write(struct.pack('<II', json_chunk_len, 0x4E4F534A))
            fp.write(json_bytes)
            # BIN chunk
            fp.write(struct.pack('<II', bin_chunk_len, 0x004E4942))
            fp.write(bin_data)

        size = os.path.getsize(out)
        ok += 1
        print(f"[{i}/{total}] OK    {name}  ({size//1024} KB)")

    except Exception as e:
        fail += 1
        print(f"[{i}/{total}] FAIL  {name} → {e}")

print(f"\n{'='*50}")
print(f"✅ สำเร็จ : {ok}")
print(f"⏭  ข้าม   : {skip}")
print(f"❌ ล้มเหลว: {fail}")
print(f"{'='*50}")
