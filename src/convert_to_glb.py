# convert_to_glb.py
# รัน: "E:\Program Files\FreeCAD 0.21\bin\python.exe" convert_to_glb.py

import sys, os, glob, traceback

# ── path ของ FreeCAD lib ────────────────────────────────────────────────────
FREECAD_LIB = r"E:\Program Files\FreeCAD 0.21\bin"
if FREECAD_LIB not in sys.path:
    sys.path.insert(0, FREECAD_LIB)

import FreeCAD
import Import      # โหลด STEP
import Mesh        # export mesh
import MeshPart

SRC_DIR = r"C:\Users\Haruj\gear-motor-app\public\model"
OUT_DIR = r"C:\Users\Haruj\gear-motor-app\public\model\glb"
os.makedirs(OUT_DIR, exist_ok=True)

# เก็บทุกไฟล์ใน src (ไม่มีนามสกุล + .STEP + .stp)
files = []
for f in os.listdir(SRC_DIR):
    full = os.path.join(SRC_DIR, f)
    if not os.path.isfile(full): continue
    ext = os.path.splitext(f)[1].lower()
    if ext in ('', '.step', '.stp'):
        files.append(full)

total = len(files)
print(f"พบไฟล์ทั้งหมด {total} ไฟล์")

ok, skip, fail = 0, 0, 0

for i, filepath in enumerate(files, 1):
    name = os.path.splitext(os.path.basename(filepath))[0]
    out  = os.path.join(OUT_DIR, name + ".glb")

    if os.path.exists(out):
        skip += 1
        print(f"[{i}/{total}] SKIP  {name}")
        continue

    try:
        # เปิด doc ใหม่ทุกรอบ (กัน memory leak)
        doc = FreeCAD.newDocument("conv")
        Import.insert(filepath, doc.Name)
        doc.recompute()

        # รวม shape ทั้งหมดเป็น mesh
        shapes = [obj for obj in doc.Objects if hasattr(obj, 'Shape')]
        if not shapes:
            raise ValueError("ไม่พบ Shape ในไฟล์")

        mesh = Mesh.Mesh()
        for s in shapes:
            m = MeshPart.meshFromShape(
                Shape=s.Shape,
                LinearDeflection=0.05,
                AngularDeflection=0.1,
                Relative=False
            )
            mesh.addMesh(m)

        # export เป็น GLB (FreeCAD 0.21+ รองรับ)
        mesh.export(out)

        FreeCAD.closeDocument(doc.Name)
        ok += 1
        print(f"[{i}/{total}] OK    {name}")

    except Exception as e:
        fail += 1
        print(f"[{i}/{total}] FAIL  {name} → {e}")
        try: FreeCAD.closeDocument("conv")
        except: pass

print(f"\n✅ สำเร็จ: {ok}  ⏭ ข้าม: {skip}  ❌ ล้มเหลว: {fail}")