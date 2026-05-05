// SRVWormGearFlow.js
// ─────────────────────────────────────────────────────────────────────────────
// แยกออกมาจาก MotorFlows.js — pattern เดียวกับ RKFSMotorFlow.js
// แก้ปัญหา: YE3Img, YE4Img, YEJImg, YVPImg, YVPEJImg, YBImg,
//           T0Img, T90Img, T180Img, T270Img, CXImg, C1Img, C2Img, C3Img
//           ไม่ได้ถูก import ใน MotorFlows.js เดิม → ReferenceError
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

// ── SRV series images ─────────────────────────────────────────────────────────
import SRVVImg    from '../assets/srv/SRVV.png';
import SDRVImg    from '../assets/srv/SDRV.png';
import SVFImg     from '../assets/srv/SVF.png';

import SRVWMImg   from '../assets/srv/SRVWM.png';
import SRVIECImg  from '../assets/srv/SRVIEC.png';
import SRVWSImg   from '../assets/srv/SRVWS.png';
import SRVIImg    from '../assets/srv/SRVI.png';

import InflangeImg from '../assets/srv/Inflange.png';
import InshaftImg  from '../assets/srv/Inshaft.png';

import DSImg        from '../assets/srv/DS.png';
import DS1Img       from '../assets/srv/DS1.png';
import DS2Img       from '../assets/srv/DS2.png';
import SRVHollowImg from '../assets/srv/SRVHollow.png';

import SRVFAImg  from '../assets/srv/SRVFA.png';
import SRVFAAImg from '../assets/srv/SRVFAA.png';
import SRVFABImg from '../assets/srv/SRVFAB.png';
import SRVFBImg  from '../assets/srv/SRVFB.png';
import SRVFBAImg from '../assets/srv/SRVFBA.png';
import SRVFBBImg from '../assets/srv/SRVFBB.png';

import SRVTImg  from '../assets/srv/SRVT.png';
import SRVTAImg from '../assets/srv/SRVTA.png';
import SRVTBImg from '../assets/srv/SRVTB.png';

import SRVMTImg  from '../assets/srv/SRVMT.png';
import SDRVMTImg from '../assets/srv/SDRVMT.png';
import SVFMTImg  from '../assets/srv/SVFMT.png';

import B5Img   from '../assets/srv/B5.png';
import B14TImg from '../assets/srv/B14.png';

// ── Motor type images (ใช้จาก assets/rkfs — เหมือน RKFSMotorFlow) ────────────
import YE3Img   from '../assets/rkfs/YE3.png';
import YE4Img   from '../assets/rkfs/YE4.png';
import YEJImg   from '../assets/rkfs/YEJ.png';
import YVPImg   from '../assets/rkfs/YVP.png';
import YVPEJImg from '../assets/rkfs/YVPEJ.png';
import YBImg    from '../assets/rkfs/YB.png';

// ── Terminal box position images (ใช้จาก assets/rkfs — เหมือน RKFSMotorFlow) ─
import T0Img   from '../assets/rkfs/T0.png';
import T90Img  from '../assets/rkfs/T90.png';
import T180Img from '../assets/rkfs/T180.png';
import T270Img from '../assets/rkfs/T270.png';

// ── Cable wire position images (ใช้จาก assets/rkfs — เหมือน RKFSMotorFlow) ───
import CXImg from '../assets/rkfs/CX.png';
import C1Img from '../assets/rkfs/C1.png';
import C2Img from '../assets/rkfs/C2.png';
import C3Img from '../assets/rkfs/C3.png';

// ─────────────────────────────────────────────────────────────────────────────
// Helper — IEC frame by size+power
// ─────────────────────────────────────────────────────────────────────────────
function getIECFrameBySizePower(sizeStr, powerKW) {
  const sz = parseInt(String(sizeStr || '').replace(/\D/g, ''), 10);
  const p  = Math.round(parseFloat(powerKW ?? '') * 100) / 100;
  if (!sz || !Number.isFinite(p)) return null;
  const inSet = (val, arr) => arr.some(x => Math.abs(val - x) < 1e-6);
  switch (sz) {
    case 25:  if (inSet(p, [0.06, 0.09])) return 56; break;
    case 30:  if (inSet(p, [0.06, 0.09])) return 56;
              if (inSet(p, [0.12, 0.18])) return 63; break;
    case 40:  if (inSet(p, [0.09]))       return 56;
              if (inSet(p, [0.12, 0.18])) return 63;
              if (inSet(p, [0.25, 0.37])) return 71; break;
    case 50:  if (inSet(p, [0.12, 0.18])) return 63;
              if (inSet(p, [0.25, 0.37])) return 71;
              if (inSet(p, [0.55, 0.75])) return 80; break;
    case 63:  if (inSet(p, [0.25, 0.37])) return 71;
              if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90; break;
    case 75:  if (inSet(p, [0.25, 0.37])) return 71;
              if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4         ])) return 112; break;
    case 90:  if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4         ])) return 112; break;
    case 110: if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4         ])) return 112;
              if (inSet(p, [5.5, 7.5  ])) return 132; break;
    case 130: if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4         ])) return 112;
              if (inSet(p, [5.5, 7.5  ])) return 132; break;
    case 150: if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4         ])) return 112;
              if (inSet(p, [5.5, 7.5  ])) return 132;
              if (inSet(p, [11,  15   ])) return 160; break;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper — Input hole diameter by size+power
// ─────────────────────────────────────────────────────────────────────────────
function getInputHoleBySizePower(sizeStr, powerKW) {
  const sz = parseInt(String(sizeStr || '').replace(/\D/g, ''), 10);
  const p  = Math.round(parseFloat(powerKW ?? '') * 100) / 100;
  if (!sz || !Number.isFinite(p)) return null;
  const inSet = (val, arr) => arr.some(x => Math.abs(val - x) < 1e-6);
  switch (sz) {
    case 25:  if (inSet(p, [0.06, 0.09])) return 'Ø9 mm'; break;
    case 30:  if (inSet(p, [0.06, 0.09])) return 'Ø9 mm';
              if (inSet(p, [0.12, 0.18])) return 'Ø11 mm'; break;
    case 40:  if (inSet(p, [0.09]))       return 'Ø9 mm';
              if (inSet(p, [0.12, 0.18])) return 'Ø11 mm';
              if (inSet(p, [0.25, 0.37])) return 'Ø14 mm'; break;
    case 50:  if (inSet(p, [0.12, 0.18])) return 'Ø11 mm';
              if (inSet(p, [0.25, 0.37])) return 'Ø14 mm';
              if (inSet(p, [0.55, 0.75])) return 'Ø19 mm'; break;
    case 63:  if (inSet(p, [0.25, 0.37])) return 'Ø14 mm';
              if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm'; break;
    case 75:  if (inSet(p, [0.25, 0.37])) return 'Ø14 mm';
              if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4         ])) return 'Ø28 mm'; break;
    case 90:  if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4         ])) return 'Ø28 mm'; break;
    case 110: if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4         ])) return 'Ø28 mm';
              if (inSet(p, [5.5, 7.5  ])) return 'Ø38 mm'; break;
    case 130: if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4         ])) return 'Ø28 mm';
              if (inSet(p, [5.5, 7.5  ])) return 'Ø38 mm'; break;
    case 150: if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4         ])) return 'Ø28 mm';
              if (inSet(p, [5.5, 7.5  ])) return 'Ø38 mm';
              if (inSet(p, [11,  15   ])) return 'Ø42 mm'; break;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper — Input flange by size+power
// ─────────────────────────────────────────────────────────────────────────────
function getInputFlangeBySizePower(sizeStr, powerKW) {
  const sz = parseInt(String(sizeStr || '').replace(/\D/g, ''), 10);
  const p  = Math.round(parseFloat(powerKW ?? '') * 100) / 100;
  if (!sz || !Number.isFinite(p)) return null;
  const inSet = (v, arr) => arr.some(x => Math.abs(v - x) < 1e-6);
  switch (sz) {
    case 25:  if (inSet(p, [0.06, 0.09])) return ['Ø80 mm B14']; break;
    case 30:  if (inSet(p, [0.06, 0.09])) return ['Ø120 mm B5'];
              if (inSet(p, [0.12, 0.18])) return ['Ø90 mm B14', 'Ø140 mm B5']; break;
    case 40:  if (inSet(p, [0.09]))       return ['Ø80 mm B14', 'Ø120 mm B5'];
              if (inSet(p, [0.12, 0.18])) return ['Ø90 mm B14', 'Ø140 mm B5'];
              if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5']; break;
    case 50:  if (inSet(p, [0.12, 0.18])) return ['Ø140 mm B5'];
              if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5'];
              if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5']; break;
    case 63:  if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5'];
              if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5'];
              if (inSet(p, [1.1,  1.5 ])) return ['Ø140 mm B14', 'Ø200 mm B5']; break;
    case 75:  if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5'];
              if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5'];
              if (inSet(p, [1.1,  1.5 ])) return ['Ø120 mm B14', 'Ø200 mm B5'];
              if (inSet(p, [2.2,  3   ])) return ['Ø160 mm B14', 'Ø250 mm B5'];
              if (inSet(p, [4         ])) return ['Ø160 mm B14', 'Ø250 mm B5']; break;
    case 90:  if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5'];
              if (inSet(p, [1.1,  1.5 ])) return ['Ø120 mm B14', 'Ø200 mm B5'];
              if (inSet(p, [2.2,  3   ])) return ['Ø160 mm B14', 'Ø250 mm B5'];
              if (inSet(p, [4         ])) return ['Ø160 mm B14', 'Ø250 mm B5']; break;
    case 110: if (inSet(p, [0.55, 0.75])) return ['Ø200 mm B5'];
              if (inSet(p, [1.1,  1.5 ])) return ['Ø200 mm B5'];
              if (inSet(p, [2.2,  3   ])) return ['Ø250 mm B5'];
              if (inSet(p, [4         ])) return ['Ø250 mm B5'];
              if (inSet(p, [5.5, 7.5  ])) return ['Ø300 mm B5']; break;
    case 130: if (inSet(p, [1.1,  1.5 ])) return ['Ø200 mm B5'];
              if (inSet(p, [2.2,  3   ])) return ['Ø250 mm B5'];
              if (inSet(p, [4         ])) return ['Ø250 mm B5'];
              if (inSet(p, [5.5, 7.5  ])) return ['Ø300 mm B5']; break;
    case 150: if (inSet(p, [2.2,  3   ])) return ['Ø250 mm B5'];
              if (inSet(p, [4         ])) return ['Ø250 mm B5'];
              if (inSet(p, [5.5, 7.5  ])) return ['Ø300 mm B5'];
              if (inSet(p, [11,  15   ])) return ['Ø350 mm B5']; break;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// renderSRVFlow — Main export
// ─────────────────────────────────────────────────────────────────────────────
export function renderSRVFlow(state, setState, onConfirm, onRequestQuote) {
  const {
    srvSeries,
    srvSize,
    srvInputSel,
    srvPowerKW,
    srvPole,
    srvIECMode,
    srvRatio,
    srvGearType,
    srvGearTypeSub,
    srvShaftDesign,
    srvMounting,
    srvIECSize,
    srvMotorType,
    srvPosition,
    srvPositionSub,
  } = state;

  const update = (key, value) => {
    const setterMap = {
      srvSeries:       setState.setSrvSeries,
      srvSize:         setState.setSrvSize,
      srvInputSel:     setState.setSrvInputSel,
      srvPowerKW:      setState.setSrvPowerKW,
      srvPole:         setState.setSrvPole,
      srvIECMode:      setState.setSrvIECMode,
      srvRatio:        setState.setSrvRatio,
      srvGearType:     setState.setSrvGearType,
      srvGearTypeSub:  setState.setSrvGearTypeSub,
      srvShaftDesign:  setState.setSrvShaftDesign,
      srvMounting:     setState.setSrvMounting,
      srvIECSize:      setState.setSrvIECSize,
      srvMotorType:    setState.setSrvMotorType,
      srvPosition:     setState.setSrvPosition,
      srvPositionSub:  setState.setSrvPositionSub,
    };
    if (setterMap[key]) setterMap[key](value);
  };

  // ── Data maps ───────────────────────────────────────────────────────────────
  const sizeMap = {
    SRV:  ['025','030','040','050','063','075','090','110','130','150'],
    SDRV: ['025/030','025/040','030/040','030/050','030/063','040/075','040/090','050/110','063/130','063/150'],
    SVF:  ['030','040','050','063','075','090','110','130','150'],
  };

  const powerBySize = {
    '025': ['0.06','0.09'],
    '030': ['0.06','0.09','0.12','0.18'],
    '040': ['0.09','0.12','0.18','0.25','0.37'],
    '050': ['0.12','0.18','0.25','0.37','0.55','0.75'],
    '063': ['0.25','0.37','0.55','0.75','1.1','1.5'],
    '075': ['0.25','0.37','0.55','0.75','1.1','1.5','2.2','3','4'],
    '090': ['0.55','0.75','1.1','1.5','2.2','3','4'],
    '110': ['0.55','0.75','1.1','1.5','2.2','3','4','5.5','7.5'],
    '130': ['1.1','1.5','2.2','3','4','5.5','7.5'],
    '150': ['2.2','3','4','5.5','7.5','11','15'],
  };

  const ratio12 = ['5','7.5','10','15','20','25','30','40','50','60','80','100'];
  const ratio11 = ['7.5','10','15','20','25','30','40','50','60','80','100'];
  const ratioBySize = {
    '025': ratio12, '030': ratio12, '040': ratio11, '050': ratio12,
    '063': ratio12, '075': ratio11, '090': ratio12, '110': ratio12,
    '130': ratio11, '150': ratio11,
  };

  // ── UI Helpers ──────────────────────────────────────────────────────────────
  const floatingBack = (onClick) => (
    <button
      onClick={onClick}
      className="fixed left-3 bottom-3 z-20 px-3 py-2 rounded-full shadow-lg bg-white/90 hover:bg-white transition-colors"
    >
      ← ย้อนกลับ
    </button>
  );

  const Section = ({ title, children }) => (
    <div className="mt-6">
      <h3 className="font-semibold text-white drop-shadow mb-3">{title}</h3>
      {children}
    </div>
  );

  // ── STEP 1 — Series ─────────────────────────────────────────────────────────
  if (!srvSeries) {
    const seriesInfo = {
      SRV:  { desc: 'เกียร์หนอนมาตรฐาน เพลาออกด้านเดียว ติดตั้งง่าย ใช้งานได้หลากหลาย เหมาะกับงานทั่วไปอุตสาหกรรม', tag: 'Single Output Shaft' },
      SDRV: { desc: 'เกียร์หนอนคู่ อัตราทดสูง ลดความเร็วได้มากในรุ่นเดียว ประหยัดพื้นที่ติดตั้ง เหมาะสำหรับงานที่ต้องการอัตราทดสูงพิเศษ', tag: 'Double Reduction' },
      SVF:  { desc: 'แบบ Foot-mount พร้อมหน้าแปลน ติดตั้งบนฐานราบได้โดยตรง เหมาะสำหรับงานที่ต้องการฐานรองรับน้ำหนักสูง', tag: 'Flange + Foot Mount' },
    };
    return (
      <>
        <Section title="เลือก Series — ซีรีส์เกียร์หนอน">
          <div className="grid grid-cols-3 gap-5">
            {[
              { key: 'SRV',  img: SRVVImg,  label: 'SRV'  },
              { key: 'SDRV', img: SDRVImg,  label: 'SDRV' },
              { key: 'SVF',  img: SVFImg,   label: 'SVF'  },
            ].map(({ key, img, label }) => (
              <button key={key}
                onClick={() => update('srvSeries', key)}
                className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left"
              >
                <img src={img} alt={label} className="w-full rounded-t-2xl" />
                <div className="px-3 py-2 pb-3">
                  <p className="font-bold text-gray-800 text-sm">{label}</p>
                  <p className="text-[10px] text-blue-600 font-semibold mb-1">{seriesInfo[key].tag}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{seriesInfo[key].desc}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-blue-200 opacity-70 italic">* กรุณาเลือก Series ที่ตรงกับความต้องการในงานของคุณ — หากไม่แน่ใจสามารถปรึกษาทีมวิศวกรฝ่ายขายได้ทันที</p>
        </Section>
      </>
    );
  }

  // ── STEP 2 — Size ───────────────────────────────────────────────────────────
  if (srvSeries && !srvSize) {
    const sizes = sizeMap[srvSeries] || [];
    const sizeHint = {
      '025':'≤ 120 N·m', '030':'≤ 200 N·m', '040':'≤ 400 N·m', '050':'≤ 630 N·m',
      '063':'≤ 1,400 N·m','075':'≤ 2,200 N·m','090':'≤ 4,200 N·m','110':'≤ 8,000 N·m',
      '130':'≤ 11,000 N·m','150':'≤ 16,000 N·m',
      '025/030':'ทด 2 ขั้น','025/040':'ทด 2 ขั้น','030/040':'ทด 2 ขั้น','030/050':'ทด 2 ขั้น',
      '030/063':'ทด 2 ขั้น','040/075':'ทด 2 ขั้น','040/090':'ทด 2 ขั้น','050/110':'ทด 2 ขั้น',
      '063/130':'ทด 2 ขั้น','063/150':'ทด 2 ขั้น',
    };
    return (
      <>
        <Section title="เลือก Size Gear — ขนาดเกียร์หนอน">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {sizes.map(sz => (
              <button key={sz}
                onClick={() => update('srvSize', sz)}
                className="rounded-xl shadow-md transition-opacity hover:opacity-80 bg-white px-3 py-4 text-blue-800 font-bold border border-gray-200 flex flex-col items-center gap-1"
              >
                <span className="text-base font-bold">{sz}</span>
                {sizeHint[sz] && <span className="text-[9px] text-gray-400 font-normal">{sizeHint[sz]}</span>}
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20">
            <p className="text-xs text-blue-200 font-semibold mb-1">💡 แนะนำการเลือกขนาด</p>
            <p className="text-[11px] text-white/70 leading-relaxed">ขนาดเกียร์ควรเลือกให้แรงบิดสูงสุดของเกียร์ <span className="text-yellow-300 font-semibold">(M2n)</span> มากกว่าแรงบิดที่ต้องการใช้งานจริง อย่างน้อย <span className="text-yellow-300 font-semibold">1.0–1.5 เท่า</span> เพื่อความปลอดภัยและอายุการใช้งานที่ยาวนาน</p>
          </div>
        </Section>
        {floatingBack(() => update('srvSeries', null))}
      </>
    );
  }

  // ── STEP 3 — Input Type ─────────────────────────────────────────────────────
  if (srvSize && !srvInputSel) {
    const inputInfo = {
      WM: { label: 'With Motor', sub: 'พร้อมมอเตอร์ AC', desc: 'เลือกรับเกียร์พร้อมมอเตอร์มาตรฐาน IEC ครบชุด เหมาะสำหรับงานติดตั้งใหม่ที่ต้องการชุดขับเคลื่อนสมบูรณ์' },
      WS: { label: 'With Servo Motor', sub: 'พร้อม Servo Motor', desc: 'เกียร์สำหรับต่อเข้ากับ Servo Motor โดยตรง มีหน้าแปลน Input สำหรับยึดมอเตอร์ Servo ทุกยี่ห้อ' },
      IS: { label: 'Input Shaft', sub: 'มีเพลา Input', desc: 'แบบมีเพลา Input โผล่ออกมาพร้อมใช้ เหมาะสำหรับต่อสายพาน โซ่ หรือ Coupling เข้ากับต้นกำลังอื่นๆ' },
    };
    return (
      <>
        <Section title="เลือกรูปแบบ Input — ต้นกำลังขับเคลื่อน">
          <div className="grid grid-cols-3 gap-5">
            {[
              { key: 'WM', img: SRVWMImg },
              { key: 'WS', img: SRVWSImg },
              { key: 'IS', img: SRVIImg  },
            ].map(({ key, img }) => (
              <button key={key} onClick={() => update('srvInputSel', key)}
                className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left">
                <img src={img} alt={inputInfo[key].label} className="w-full rounded-t-2xl" />
                <div className="px-3 py-2 pb-3">
                  <p className="font-bold text-gray-800 text-sm">{inputInfo[key].label}</p>
                  <p className="text-[10px] text-blue-600 font-semibold mb-1">{inputInfo[key].sub}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{inputInfo[key].desc}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/60 italic">* Size ที่เลือก: <span className="text-yellow-300 font-bold">{srvSeries}{srvSize}</span> — หากต้องการรับชุดครบพร้อมมอเตอร์แนะนำเลือก "With Motor"</p>
        </Section>
        {floatingBack(() => update('srvSize', null))}
      </>
    );
  }

  // ── STEP 3.1 (WM only) — Power ──────────────────────────────────────────────
  if (srvInputSel === 'WM' && !srvPowerKW) {
    const key = (srvSize || '').split('/')[0];
    const powers = powerBySize[key] || [];
    return (
      <>
        <Section title="เลือกกำลังมอเตอร์ — Power Motor (kW)">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {powers.map(p => (
              <button key={p} onClick={() => update('srvPowerKW', p)}
                className="rounded-xl shadow-md transition-opacity hover:opacity-80 bg-white px-4 py-5 font-bold text-blue-800 border border-gray-200 flex flex-col items-center gap-1">
                <span className="text-xl">{p}</span>
                <span className="text-[10px] text-gray-400 font-normal">กิโลวัตต์</span>
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20">
            <p className="text-xs text-blue-200 font-semibold mb-1">💡 แนะนำการเลือกกำลังมอเตอร์</p>
            <p className="text-[11px] text-white/70 leading-relaxed">กำลังมอเตอร์ที่เลือกควรมากกว่ากำลังที่ต้องการใช้งานจริง เพื่อรองรับการสตาร์ทและโหลดกระแทก (Shock load) หากมีสภาวะโหลดหนัก ควรเพิ่มขนาดขึ้น 1 ระดับ</p>
          </div>
        </Section>
        {floatingBack(() => update('srvInputSel', null))}
      </>
    );
  }

  // ── STEP 3.1.1 (WM only) — Pole ─────────────────────────────────────────────
  if (srvInputSel === 'WM' && srvPowerKW && !srvPole) {
    const poleInfo = {
      '4P': { rpm: '~1,450 รอบ/นาที', desc: 'ความเร็วมาตรฐาน เหมาะกับงานทั่วไป เครื่องจักร สายพาน และงานต่อเนื่อง ประหยัดพลังงานในระยะยาว' },
      '6P': { rpm: '~950 รอบ/นาที', desc: 'ความเร็วต่ำกว่า แรงบิดสูงกว่า เหมาะกับงานที่ต้องการความนุ่มนวล เช่น ลิฟต์ ระบบลำเลียงวัสดุหนัก' },
    };
    return (
      <>
        <Section title="เลือกจำนวน Pole — ความเร็วมอเตอร์">
          <div className="grid grid-cols-2 gap-5">
            {['4P', '6P'].map(p => (
              <button key={p} onClick={() => update('srvPole', p)}
                className="rounded-2xl shadow-md transition-opacity hover:opacity-80 bg-white px-4 py-5 text-left border border-gray-200">
                <p className="text-2xl font-bold text-blue-800 mb-1">{p === '4P' ? '4 Pole' : '6 Pole'}</p>
                <p className="text-sm text-green-600 font-semibold mb-2">{poleInfo[p].rpm}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{poleInfo[p].desc}</p>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/60 italic">* ความเร็วรอบมอเตอร์เป็นค่าโดยประมาณที่ความถี่ 50 Hz — ค่าจริงอาจแตกต่างเล็กน้อยตามโหลด</p>
        </Section>
        {floatingBack(() => update('srvPowerKW', null))}
      </>
    );
  }

  // ── STEP 3.1.2 (WM only) — IEC Mode ─────────────────────────────────────────
  if (srvInputSel === 'WM' && srvPowerKW && srvPole && !srvIECMode) {
    return (
      <>
        <Section title="เลือกรูปแบบการสั่งซื้อ — IEC Adapter">
          <div className="grid grid-cols-2 gap-5">
            <button onClick={() => update('srvIECMode', 'IEC')}
              className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left">
              <img src={SRVIECImg} alt="IEC Adapter" className="w-full rounded-t-2xl" />
              <div className="px-3 py-3">
                <p className="font-bold text-gray-800">IEC Adapter เท่านั้น</p>
                <p className="text-[10px] text-blue-600 font-semibold mb-1">Gear Unit Only</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">สั่งซื้อเฉพาะชุดเกียร์พร้อม IEC Adapter — เหมาะสำหรับผู้ที่มีมอเตอร์อยู่แล้วหรือต้องการติดตั้งมอเตอร์เอง ลดต้นทุนได้</p>
              </div>
            </button>
            <button onClick={() => update('srvIECMode', 'IEC+Motor')}
              className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left">
              <img src={SRVWMImg} alt="IEC Adapter + Motor" className="w-full rounded-t-2xl" />
              <div className="px-3 py-3">
                <p className="font-bold text-gray-800">IEC Adapter + Motor</p>
                <p className="text-[10px] text-green-600 font-semibold mb-1">Complete Drive Package</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">รับชุดครบพร้อมมอเตอร์ ประกอบสมบูรณ์จากโรงงาน ทดสอบแล้ว พร้อมใช้งานได้ทันที ลดเวลาติดตั้งในหน้างาน</p>
              </div>
            </button>
          </div>
        </Section>
        {floatingBack(() => update('srvPole', null))}
      </>
    );
  }

  // ── STEP 3.1.3 — Ratio (ทุก input) ──────────────────────────────────────────
  if (!srvRatio) {
    const key = (srvSize || '').split('/')[0];
    const ratios = ratioBySize[key] || ratio12;

    const extra = srvInputSel === 'WS'
      ? <img src={InflangeImg} alt="Input Flange" className="w-40 mx-auto mb-4 rounded-xl shadow" />
      : srvInputSel === 'IS'
      ? <img src={InshaftImg} alt="Input shaft" className="w-40 mx-auto mb-4 rounded-xl shadow" />
      : null;

    const baseRPMDisplay = srvPole === '6P' ? 950 : 1450;

    return (
      <>
        <Section title="เลือกอัตราทด — Gear Ratio (i)">
          {extra}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {ratios.map(r => {
              const outSpd = srvInputSel === 'WM' ? Math.round(baseRPMDisplay / parseFloat(r)) : null;
              return (
                <button key={r} onClick={() => update('srvRatio', r)}
                  className="rounded-xl shadow-md transition-opacity hover:opacity-80 bg-white px-2 py-4 flex flex-col items-center gap-1 border border-gray-200">
                  <span className="text-base font-bold text-blue-800">1:{r}</span>
                  {outSpd !== null && <span className="text-[9px] text-gray-400">~{outSpd} rpm</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20 space-y-1">
            <p className="text-xs text-blue-200 font-semibold">📐 สูตรคำนวณความเร็วรอบ Output</p>
            <p className="text-[11px] text-white/80"><span className="text-yellow-300 font-bold">n₂ = n₁ ÷ i</span> — ความเร็วรอบ Output (rpm) = ความเร็วมอเตอร์ ÷ อัตราทด</p>
            {srvInputSel === 'WM' && <p className="text-[11px] text-white/60">มอเตอร์ {srvPole === '6P' ? '6 Pole ≈ 950 rpm' : '4 Pole ≈ 1,450 rpm'} — ตัวเลขใต้แต่ละปุ่มคือ Output Speed โดยประมาณ</p>}
          </div>
        </Section>
        {floatingBack(() => {
          if (srvIECMode)  return update('srvIECMode', null);
          if (srvPole)     return update('srvPole', null);
          if (srvPowerKW)  return update('srvPowerKW', null);
          update('srvInputSel', null);
        })}
      </>
    );
  }

  // ── STEP 4 — Gear Type ───────────────────────────────────────────────────────
  if (!srvGearType) {
    const gearTypeInfo = {
      'FA':                   { desc: 'หน้าแปลนยึดด้านหน้า (Flange-A) เพลา Output โผล่ออกด้านหน้า นิยมใช้กับงานที่ต้องการยึดตรง เช่น Roller Conveyor, Mixer' },
      'FB':                   { desc: 'หน้าแปลนยึดด้านหลัง (Flange-B) เพลา Output โผล่ออกด้านหลัง ติดตั้งกลับทิศทาง เหมาะกับงานที่พื้นที่จำกัดด้านหน้า' },
      'Hollow & Solid shaft': { desc: 'เพลา Hollow (กลวง) หรือ Solid — สวมเพลาได้โดยตรงไม่ต้องใช้ Coupling ลดการสูญเสียพลังงาน เหมาะกับงาน Agitator, Conveyor' },
      'T':                    { desc: 'แบบ Torque Arm รองรับแรงบิดด้วย Arm ด้านข้าง เหมาะกับงาน Conveyor Belt และงานที่เพลา Output ไม่สามารถยึดแบบปกติได้' },
    };
    return (
      <>
        <Section title="เลือกรูปแบบติดตั้ง — Gear Mounting Type">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { k: 'FA',                   label: 'FA',                   img: SRVFAImg     },
              { k: 'FB',                   label: 'FB',                   img: SRVFBImg     },
              { k: 'Hollow & Solid shaft', label: 'Hollow / Solid',       img: SRVHollowImg },
              { k: 'T',                    label: 'Torque Arm (T)',        img: SRVTImg      },
            ].map(({ k, label, img }) => (
              <button key={k} onClick={() => update('srvGearType', k)}
                className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left">
                {img
                  ? <img src={img} alt={label} className="w-full rounded-t-2xl" />
                  : <div className="h-32 rounded-t-2xl flex items-center justify-center font-bold text-2xl bg-gray-100">{label}</div>
                }
                <div className="px-3 py-2 pb-3">
                  <p className="font-bold text-gray-800 text-sm mb-1">{label}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{gearTypeInfo[k].desc}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/60 italic">* การเลือกรูปแบบติดตั้งที่ถูกต้องช่วยลดความเสียหายของเกียร์และยืดอายุการใช้งาน — หากไม่แน่ใจให้ติดต่อวิศวกรฝ่ายขาย</p>
        </Section>
        {floatingBack(() => update('srvRatio', null))}
      </>
    );
  }

  // ── STEP 4 Sub — Direction (FA / FB / T) ─────────────────────────────────────
  if ((srvGearType === 'FA' || srvGearType === 'FB' || srvGearType === 'T') && !srvGearTypeSub) {
    const subImages =
      srvGearType === 'FA' ? [{ k: '1', img: SRVFAAImg }, { k: '2', img: SRVFABImg }]
      : srvGearType === 'FB' ? [{ k: '1', img: SRVFBAImg }, { k: '2', img: SRVFBBImg }]
      : [{ k: '1', img: SRVTAImg }, { k: '2', img: SRVTBImg }];

    const dirLabel = { '1': 'ทิศทาง A — เพลา Output ด้านซ้าย', '2': 'ทิศทาง B — เพลา Output ด้านขวา' };

    return (
      <>
        <Section title={`เลือกทิศทาง Output — ${srvGearType} Direction`}>
          <div className="grid grid-cols-2 gap-5">
            {subImages.map(({ k, img }) => (
              <button key={k}
                onClick={() => update('srvGearTypeSub', k)}
                className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left"
              >
                <img src={img} alt={`${srvGearType}${k}`} className="w-full rounded-t-2xl" />
                <div className="px-3 py-2 pb-3">
                  <p className="font-bold text-gray-800 text-sm">{srvGearType}{k}</p>
                  <p className="text-[11px] text-gray-500 mt-1">{dirLabel[k]}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/60 italic">* กรุณาตรวจสอบทิศทางการวางเกียร์ในหน้างานจริงก่อนสั่งซื้อ เพื่อหลีกเลี่ยงการติดตั้งผิดทิศทาง</p>
        </Section>
        {floatingBack(() => update('srvGearType', null))}
      </>
    );
  }

  // ── STEP 5 — Shaft Design ────────────────────────────────────────────────────
  if (!srvShaftDesign) {
    const shaftInfo = {
      DS:     { label: 'DS — Dual Shaft',     desc: 'เพลาโผล่ทั้ง 2 ข้าง (ซ้าย-ขวา) เหมาะสำหรับงานที่ต้องการ Output 2 ด้าน หรือต้องการติดตาชั่ง/เอ็นโคดเดอร์ฝั่งหนึ่ง' },
      DS1:    { label: 'DS1 — Right Shaft',   desc: 'เพลาโผล่ด้านขวาเพียงข้างเดียว ลดการชนกับโครงสร้าง เหมาะกับพื้นที่จำกัดด้านซ้าย' },
      DS2:    { label: 'DS2 — Left Shaft',    desc: 'เพลาโผล่ด้านซ้ายเพียงข้างเดียว เหมาะกับพื้นที่จำกัดด้านขวา หรืองานที่ต้องการ Output ด้านซ้ายเท่านั้น' },
      Hollow: { label: 'Hollow Shaft',        desc: 'เพลากลวง สวมเข้ากับเพลาเครื่องจักรได้โดยตรง ไม่ต้องใช้ Coupling — ลดการสั่นสะเทือน เหมาะกับ Agitator และ Conveyor' },
    };
    return (
      <>
        <Section title="เลือกลักษณะเพลา Output — Shaft Design">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { k: 'DS',     img: DSImg        },
              { k: 'DS1',    img: DS1Img       },
              { k: 'DS2',    img: DS2Img       },
              { k: 'Hollow', img: SRVHollowImg },
            ].map(({ k, img }) => (
              <button key={k} onClick={() => update('srvShaftDesign', k)}
                className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left">
                <img src={img} alt={k} className="w-full rounded-t-2xl" />
                <div className="px-2 py-2 pb-3">
                  <p className="font-bold text-gray-800 text-xs mb-1">{shaftInfo[k].label}</p>
                  <p className="text-[9px] text-gray-500 leading-relaxed">{shaftInfo[k].desc}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-white/60 italic">* เพลา Hollow ไม่มีรหัสเพิ่มในชื่อรุ่น — DS, DS1, DS2 จะปรากฏในรหัสสินค้าเพื่อระบุลักษณะเพลา</p>
        </Section>
        {floatingBack(() => {
          if (srvGearTypeSub) return update('srvGearTypeSub', null);
          update('srvGearType', null);
        })}
      </>
    );
  }

  // ── STEP 6 — Mounting Position ───────────────────────────────────────────────
  if (!srvMounting) {
    const image = srvSeries === 'SVF' ? SVFMTImg : SRVMTImg;
    const mountInfo = {
      B3: 'แนวนอน เพลา Output ขนานพื้น (มาตรฐาน)', B8: 'แนวนอน เพลา Output ขนานพื้นแบบกลับด้าน',
      V5: 'แนวตั้ง เพลา Input ชี้ขึ้น',            V6: 'แนวตั้ง เพลา Input ชี้ลง',
      B6: 'เพลา Output ตั้งฉากกับพื้น (ชี้ขึ้น)',   B7: 'เพลา Output ตั้งฉากกับพื้น (ชี้ลง)',
    };
    return (
      <>
        <Section title="เลือกตำแหน่งติดตั้ง — Mounting Position">
          <div className="flex justify-center mb-5">
            <img src={image} alt="Mounting Table" className="max-w-lg w-full rounded-xl shadow-lg" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {['B3', 'B8', 'V5', 'V6', 'B6', 'B7'].map(m => (
              <button key={m} onClick={() => update('srvMounting', m)}
                className="rounded-xl shadow-md transition-opacity hover:opacity-80 bg-white px-2 py-4 flex flex-col items-center gap-1 border border-gray-200">
                <span className="text-base font-bold text-blue-800">{m}</span>
                <span className="text-[8px] text-gray-400 text-center leading-tight">{mountInfo[m]?.split(' ').slice(0,2).join(' ')}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20">
            <p className="text-xs text-blue-200 font-semibold mb-1">⚠️ สำคัญ — การเลือกตำแหน่งติดตั้ง</p>
            <p className="text-[11px] text-white/70 leading-relaxed">ตำแหน่งติดตั้งส่งผลต่อระดับน้ำมันหล่อลื่นภายในเกียร์โดยตรง — กรุณาระบุตำแหน่งที่ถูกต้องเพื่อให้ทีมงานเตรียมน้ำมันในปริมาณที่เหมาะสม ป้องกันความเสียหายของเกียร์</p>
          </div>
        </Section>
        {floatingBack(() => update('srvShaftDesign', null))}
      </>
    );
  }

  // ── STEP 7 — IEC Adapter Size ────────────────────────────────────────────────
  if (!srvIECSize) {
    return (
      <>
        <Section title="เลือกขนาดหน้าแปลน Adapter — IEC Flange Size">
          <div className="grid grid-cols-2 gap-5">
            <button onClick={() => update('srvIECSize', 'B5')}
              className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left">
              <img src={B5Img} alt="B5" className="w-full rounded-t-2xl" />
              <div className="px-3 py-3">
                <p className="font-bold text-gray-800">B5 — Large Flange</p>
                <p className="text-[10px] text-blue-600 font-semibold mb-1">หน้าแปลนขนาดใหญ่</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">หน้าแปลนแบบ B5 มีขนาดใหญ่กว่า B14 รองรับมอเตอร์กำลังสูงขึ้น มีรูยึด 4 รู บนหน้าแปลนวงกลม นิยมใช้กับงานหนักและมอเตอร์ขนาดใหญ่</p>
              </div>
            </button>
            <button onClick={() => update('srvIECSize', 'B14')}
              className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left">
              <img src={B14TImg} alt="B14" className="w-full rounded-t-2xl" />
              <div className="px-3 py-3">
                <p className="font-bold text-gray-800">B14 — Small Flange</p>
                <p className="text-[10px] text-green-600 font-semibold mb-1">หน้าแปลนขนาดเล็ก</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">หน้าแปลนแบบ B14 มีขนาดกะทัดรัดกว่า รูยึด 4 รู บนหน้าแปลนสี่เหลี่ยม เหมาะกับมอเตอร์กำลังต่ำ-กลาง และพื้นที่ติดตั้งจำกัด</p>
              </div>
            </button>
          </div>
          <p className="mt-3 text-[11px] text-white/60 italic">* ขนาดหน้าแปลนที่เหมาะสมได้จากตาราง Catalog หน้า 20–21 ตามขนาดเกียร์และกำลังมอเตอร์ที่เลือก</p>
        </Section>
        {floatingBack(() => update('srvMounting', null))}
      </>
    );
  }

  // ── STEP 8 — Motor Type + Terminal Box + Cable (IEC+Motor only) ──────────────
  if (srvInputSel === 'WM' && srvIECMode === 'IEC+Motor' && (!srvMotorType || !srvPosition || !srvPositionSub)) {
    const motorDesc = {
      YE3:   { eff: 'IE3 Premium', desc: 'ประสิทธิภาพสูง ประหยัดพลังงาน เหมาะกับงานเดินต่อเนื่อง มาตรฐาน IEC 60034-30 ประหยัดค่าไฟระยะยาว' },
      YE4:   { eff: 'IE4 Super Premium', desc: 'ประสิทธิภาพสูงสุด ลดการใช้พลังงานกว่า IE3 เหมาะกับงาน 24 ชั่วโมง คืนทุนเร็วจากการประหยัดไฟ' },
      YEJ:   { eff: 'Brake Motor', desc: 'มอเตอร์พร้อม Electromagnetic Brake หยุดได้ทันทีเมื่อตัดไฟ เหมาะกับลิฟต์ ระบบยก และงานที่ต้องการหยุดแม่นยำ' },
      YVP:   { eff: 'VFD Motor', desc: 'ออกแบบพิเศษสำหรับ Inverter ปรับความเร็วได้หลากหลาย ฉนวนทนทานต่อแรงดันพัลส์จาก VFD' },
      YVPEJ: { eff: 'VFD + Brake', desc: 'มอเตอร์ Inverter พร้อม Brake รวมทั้งการปรับความเร็วและการเบรกในหน่วยเดียว ใช้กับงานที่ต้องการควบคุมทั้งสองฟังก์ชัน' },
      YB:    { eff: 'Explosion-proof', desc: 'มอเตอร์กันระเบิด สำหรับพื้นที่อันตราย เช่น โรงงานเคมี ปิโตรเคมี ได้รับมาตรฐาน ATEX/IECEx' },
    };
    return (
      <>
        {/* Motor Type */}
        {!srvMotorType && (
          <Section title="เลือกประเภทมอเตอร์ — Motor Type">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { type: 'YE3',   img: YE3Img   },
                { type: 'YE4',   img: YE4Img   },
                { type: 'YEJ',   img: YEJImg   },
                { type: 'YVP',   img: YVPImg   },
                { type: 'YVPEJ', img: YVPEJImg },
                { type: 'YB',    img: YBImg    },
              ].map(({ type, img }) => (
                <button key={type}
                  onClick={() => update('srvMotorType', type)}
                  className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left"
                >
                  <img src={img} alt={type} className="w-full rounded-t-2xl" />
                  <div className="px-2 py-2 pb-3">
                    <p className="font-bold text-gray-800 text-sm">{type}</p>
                    <p className="text-[9px] text-blue-600 font-semibold mb-1">{motorDesc[type]?.eff}</p>
                    <p className="text-[9px] text-gray-500 leading-relaxed">{motorDesc[type]?.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-white/60 italic">* สำหรับงานทั่วไปแนะนำ YE3 (IE3) — หากต้องการปรับความเร็วให้เลือก YVP พร้อม Inverter</p>
          </Section>
        )}

        {/* Terminal Box Position */}
        {srvMotorType && !srvPosition && (
          <Section title="เลือกทิศทางกล่องสายไฟ — Terminal Box Position">
            <div className="grid grid-cols-4 gap-4">
              {[
                { p: '0',   img: T0Img,   desc: 'กล่องไฟด้านบน' },
                { p: '90',  img: T90Img,  desc: 'หมุน 90° ซ้าย' },
                { p: '180', img: T180Img, desc: 'กล่องไฟด้านล่าง' },
                { p: '270', img: T270Img, desc: 'หมุน 270° ขวา' },
              ].map(({ p, img, desc }) => (
                <button key={p}
                  onClick={() => update('srvPosition', p)}
                  className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left"
                >
                  <img src={img} alt={`T${p}`} className="w-full rounded-t-2xl" />
                  <div className="px-2 py-2">
                    <p className="font-bold text-gray-800 text-sm text-center">{p}°</p>
                    <p className="text-[9px] text-gray-500 text-center">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-white/60 italic">* เลือกตำแหน่งกล่องไฟให้เข้าถึงได้สะดวก และหลีกเลี่ยงให้น้ำไหลเข้าช่องสาย (ขาเสียบสายควรชี้ลง)</p>
          </Section>
        )}

        {/* Cable Wire Position */}
        {srvMotorType && srvPosition && !srvPositionSub && (
          <Section title="เลือกทิศทางเข้าสาย — Cable Entry Position">
            <div className="grid grid-cols-4 gap-4">
              {[
                { s: 'X', img: CXImg, desc: 'ไม่ระบุทิศทาง (Standard)' },
                { s: '1', img: C1Img, desc: 'สายเข้าด้านซ้าย' },
                { s: '2', img: C2Img, desc: 'สายเข้าด้านขวา' },
                { s: '3', img: C3Img, desc: 'สายเข้าด้านหน้า' },
              ].map(({ s, img, desc }) => (
                <button key={s}
                  onClick={() => update('srvPositionSub', s)}
                  className="rounded-2xl shadow-lg transition-opacity hover:opacity-80 bg-white text-left"
                >
                  <img src={img} alt={`C${s}`} className="w-full rounded-t-2xl" />
                  <div className="px-2 py-2">
                    <p className="font-bold text-gray-800 text-sm text-center">{s}</p>
                    <p className="text-[9px] text-gray-500 text-center">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-white/60 italic">* หากไม่มีข้อกำหนดพิเศษ เลือก X (Standard) — ทีมโรงงานจะเลือกตำแหน่งที่เหมาะสมตามการติดตั้งมาตรฐาน</p>
          </Section>
        )}

        {floatingBack(() => {
          if (srvPositionSub) return update('srvPositionSub', null);
          if (srvPosition)    return update('srvPosition', null);
          if (srvMotorType)   return update('srvMotorType', null);
          return update('srvIECSize', null);
        })}
      </>
    );
  }

  // ── STEP 9 — Fullscreen Summary (แบบ BLDC / RKFS) ──────────────────────────
  const seriesShort = srvSeries;
  const sizeShort   = srvSize ? srvSize.replaceAll('/', '-') : '';
  const paddedSize  = sizeShort ? sizeShort.padStart(3, '0') : '';
  const motorPart   = srvInputSel === 'WM' ? (srvPowerKW || '') : '';
  const polePart    = (srvInputSel === 'WM' && (srvPole === '4P' || srvPole === '6P')) ? srvPole : '';
  const NO_CODE_GEAR = ['Hollow & Solid shaft'];
  const gearPart    = (srvGearType && !NO_CODE_GEAR.includes(srvGearType))
    ? `${srvGearType}${srvGearTypeSub || ''}` : '';
  const isDSShaft   = ['DS', 'DS1', 'DS2'].includes(srvShaftDesign || '');
  const shaftPart   = isDSShaft ? srvShaftDesign : '';
  const flangePart  = srvIECSize || '';

  const head = gearPart
    ? `${seriesShort}${paddedSize}${gearPart}${shaftPart ? `-${shaftPart}` : ''}`
    : `${seriesShort}${paddedSize}${shaftPart || ''}`;

  let code = `${head}-${srvRatio}`
    + `${motorPart  ? `-${motorPart}`  : ''}`
    + `${polePart   ? `-${polePart}`   : ''}`
    + `-${flangePart}`;

  if (srvInputSel === 'WM' && srvIECMode === 'IEC') {
    const amFrame = getIECFrameBySizePower(srvSize, srvPowerKW);
    if (amFrame) code = `${head}-${srvRatio}-AM${amFrame}${flangePart}`;
  }

  const sizeKey = (srvSize || '').split('/')[0];
  const outputShaftBySize = {
    '025': ['Ø11 mm'], '030': ['Ø14 mm'], '040': ['Ø18 mm','Ø19 mm'],
    '050': ['Ø24 mm','Ø25 mm'], '063': ['Ø25 mm','Ø28 mm'], '075': ['Ø28 mm','Ø35 mm'],
    '090': ['Ø35 mm','Ø38 mm'], '110': ['Ø42 mm'], '130': ['Ø45 mm'], '150': ['Ø50 mm'],
  };
  const shafts = outputShaftBySize[sizeKey] || [];
  const inputFlangeList = getInputFlangeBySizePower(srvSize, srvPowerKW);
  const inputFlangeText = inputFlangeList?.length ? inputFlangeList.join(' , ') : '-';
  const srvInputhole = (srvInputSel === 'WM') ? getInputHoleBySizePower(srvSize, srvPowerKW) : null;
  const isIECAdapter = (srvInputSel === 'WM' && srvIECMode === 'IEC');
  const shaftLabelMap = {
    DS: 'DS shaft on both sides (เพลา 2 ข้าง)', DS1: 'DS1 (เพลาข้างขวา)', DS2: 'DS2 (เพลาข้างซ้าย)',
    Hollow: 'Hollow shaft / Keyway',
  };
  const shaftLabel = srvShaftDesign ? (shaftLabelMap[srvShaftDesign] || srvShaftDesign) : '-';
  const ratioNum = parseFloat(srvRatio || '');
  const baseRPM  = srvPole === '6P' ? 1000 : (srvPole === '4P' ? 1500 : null);
  const outRPM   = (baseRPM && ratioNum) ? Math.round(baseRPM / ratioNum) : null;
  const kW = parseFloat(srvPowerKW ?? '');
  const outTorque = (srvInputSel === 'WM' && Number.isFinite(kW) && Number.isFinite(outRPM) && outRPM > 0)
    ? Math.round((9550 * kW) / outRPM) : null;
  const motorTypeLabelMap = {
    YE3: 'Premium Efficiency IE3', YE4: 'Super Premium Efficiency IE4',
    YEJ: 'Electromagnetic Brake', YVP: 'Variable Frequency Motor',
    YVPEJ: 'Variable Frequency Brake Motor', YB: 'Explosion-proof Motor',
  };
  const motorTypeLabel = srvMotorType ? (motorTypeLabelMap[srvMotorType] || srvMotorType) : '';
  const inputPowerLabel = srvInputSel === 'WM'
    ? (srvIECMode === 'IEC' ? 'IEC Adapter Motor' : 'With motor')
    : srvInputSel === 'WS' ? 'With Servo motor'
    : srvInputSel === 'IS' ? 'Input shaft' : '-';

  const specRows = [
    ['Series',       srvSeries || '-'],
    ['Size Gear',    srvSize   || '-'],
    ['Ratio',        srvRatio  ? `1 : ${srvRatio}` : '-'],
    ['Gear Type',    srvGearType || '-'],
    ['Direction',    srvGearTypeSub || '-'],
    ['Shaft Design', shaftLabel],
    ['IEC Flange',   flangePart || '-'],
    ['Input hole Ø', srvInputhole || '-'],
    ['Input flange', inputFlangeText],
    ['Input Power',  inputPowerLabel],
    ...(srvInputSel === 'WM' && !isIECAdapter ? [
      ['Power Motor', `${srvPowerKW || '-'} kW, ${srvPole === '6P' ? '6 Pole' : '4 Pole'}`],
      ['Motor Type',  motorTypeLabel || '-'],
    ] : []),
    ['Output Speed',  outRPM   !== null ? `${outRPM} rpm`  : '-'],
    ['Output Torque', outTorque !== null ? `${outTorque} N·m` : '-'],
    ['Mounting',     srvMounting || '-'],
    ['Output shaft', shafts.join(' , ') || '-'],
    ['Warranty',     '18 Months (after delivery)'],
  ];

  // ─── SRV GLB filename mapping (SRV090... → use SRV090 as base) ───────────
  const glbBase = (() => {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return '/model/glb';
    }
    return 'https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev';
  })();

  return (
    <SRVSummaryPage
      code={code}
      specRows={specRows}
      sizeKey={sizeKey}
      glbBase={glbBase}
      onConfirm={onConfirm}
      onRequestQuote={onRequestQuote}
      onBack={() => {
        if (srvInputSel === 'WM' && srvIECMode === 'IEC+Motor') {
          if (srvPositionSub) return update('srvPositionSub', null);
          if (srvPosition)    return update('srvPosition', null);
          if (srvMotorType)   return update('srvMotorType', null);
        }
        update('srvIECSize', null);
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENV_PRESETS + TINT_COLORS (สำหรับ SRV 3D Viewer)
// ─────────────────────────────────────────────────────────────────────────────
(() => {
  if (typeof document === 'undefined') return;
  const id = 'mv-srv-script';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id; s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
  document.head.appendChild(s);
})();

const SRV_ENV_PRESETS = [
  { label: 'Neutral', value: 'neutral',  bg: 'linear-gradient(135deg,#5a5a5a,#3a3a3a)' },
  { label: 'Legacy',  value: 'legacy',   bg: 'linear-gradient(135deg,#7a8a9a,#5a6a7a)' },
  { label: 'Warm',    value: 'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr', bg: 'linear-gradient(135deg,#c87a4a,#8a4a2a)' },
  { label: 'Studio',  value: 'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr', bg: 'linear-gradient(135deg,#8a7a9a,#6a5a7a)' },
  { label: 'Outdoor', value: 'https://modelviewer.dev/shared-assets/environments/pillars_1k.hdr', bg: 'linear-gradient(135deg,#5a8a5a,#3a6a3a)' },
  { label: 'Moon',    value: 'https://modelviewer.dev/shared-assets/environments/moon_1k.hdr', bg: 'linear-gradient(135deg,#2a2a5a,#1a1a3a)' },
];
const SRV_TINT_COLORS = [
  { label: 'Default', value: null,      bg: 'linear-gradient(135deg,#aaa,#666)' },
  { label: 'Silver',  value: '#d0d8e0', bg: 'linear-gradient(135deg,#d0d8e0,#9aa8b8)' },
  { label: 'Gold',    value: '#ffd060', bg: 'linear-gradient(135deg,#ffd060,#c08020)' },
  { label: 'Navy',    value: '#2050a0', bg: 'linear-gradient(135deg,#4070c0,#103060)' },
  { label: 'Red',     value: '#c02030', bg: 'linear-gradient(135deg,#e04050,#901020)' },
  { label: 'White',   value: '#f0f0f0', bg: 'linear-gradient(135deg,#ffffff,#cccccc)' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SRVViewer3D
// ─────────────────────────────────────────────────────────────────────────────
function SRVViewer3D({ modelCode, glbBase }) {
  const mvRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [err,   setErr]   = React.useState(false);
  const [envIdx,    setEnvIdx]    = React.useState(0);
  const [tintIdx,   setTintIdx]   = React.useState(0);
  const [exposure,  setExposure]  = React.useState(1.3);
  const [shadow,    setShadow]    = React.useState(0.6);
  const [autoLight, setAutoLight] = React.useState(false);
  const [lightRot,  setLightRot]  = React.useState(0);
  const lightTimer = React.useRef(null);

  React.useEffect(() => { setReady(false); setErr(false); }, [modelCode]);

  React.useEffect(() => {
    if (!modelCode) return;
    const url = `${glbBase}/${modelCode}.glb`;
    let cancelled = false, attempts = 0;
    function attach() {
      const el = mvRef.current;
      if (cancelled) return;
      if (!el || !el.nodeName) { if (attempts < 40) { attempts++; setTimeout(attach, 50); } return; }
      el.setAttribute('src', url);
      const onLoad = () => { if (!cancelled) { setReady(true); setErr(false); } };
      const onErr  = () => { if (!cancelled) setErr(true); };
      el.addEventListener('load', onLoad); el.addEventListener('error', onErr);
      el.__srvCleanup = () => { el.removeEventListener('load', onLoad); el.removeEventListener('error', onErr); };
    }
    attach();
    return () => { cancelled = true; mvRef.current?.__srvCleanup?.(); };
  }, [modelCode, glbBase]);

  React.useEffect(() => {
    if (autoLight) {
      lightTimer.current = setInterval(() => {
        setLightRot(r => { const n=(r+2)%360; if(mvRef.current) mvRef.current.style.setProperty('--env-rotation',n+'deg'); return n; });
      }, 30);
    } else clearInterval(lightTimer.current);
    return () => clearInterval(lightTimer.current);
  }, [autoLight]);

  React.useEffect(() => () => clearInterval(lightTimer.current), []);

  const applyTint = (idx) => {
    setTintIdx(idx);
    const color = SRV_TINT_COLORS[idx].value;
    const apply = () => {
      try {
        const mats = mvRef.current?.model?.materials;
        if (!mats) return;
        if (!color) { [...mats].forEach(m => m.pbrMetallicRoughness.setBaseColorFactor([1,1,1,1])); }
        else {
          const r=parseInt(color.slice(1,3),16)/255, g=parseInt(color.slice(3,5),16)/255, b=parseInt(color.slice(5,7),16)/255;
          [...mats].forEach(m => m.pbrMetallicRoughness.setBaseColorFactor([r,g,b,1]));
        }
      } catch(e) {}
    };
    if (ready) apply(); else mvRef.current?.addEventListener('load', apply, { once: true });
  };

  const S = {
    wrap:   { display:'flex', flexDirection:'row', width:'100%', height:'100%', minHeight:0, background:'#0a0c10' },
    viewer: { flex:1, position:'relative', background:'linear-gradient(135deg,#0a0c10,#0d111c)', overflow:'hidden' },
    grid:   { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,229,160,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,0.025) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' },
    mv:     { width:'100%', height:'100%', '--poster-color':'transparent', '--progress-bar-color':'#00e5a0', background:'transparent', display:'block' },
    ring:   { width:44, height:44, border:'2px solid rgba(0,229,160,0.15)', borderTopColor:'#00e5a0', borderRadius:'50%', animation:'srv3d-spin 0.9s linear infinite' },
    panel:  { width:200, flexShrink:0, background:'#0f1118', borderLeft:'1px solid rgba(255,255,255,0.07)', overflowY:'auto', display:'flex', flexDirection:'column' },
    sec:    { padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)' },
    secT:   { fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:8 },
    row:    { display:'flex', alignItems:'center', gap:8, marginBottom:6 },
    lbl:    { fontSize:10, color:'#4a5060', width:44, flexShrink:0 },
    sld:    { flex:1, accentColor:'#00e5a0', cursor:'pointer', height:3 },
    val:    { fontSize:10, color:'#e8eaf0', width:28, textAlign:'right', flexShrink:0, fontFamily:'monospace' },
    toggle: (on) => ({ width:34, height:18, background:on?'#00e5a0':'rgba(255,255,255,0.1)', borderRadius:9, position:'relative', cursor:'pointer', border:'none', transition:'background 0.2s' }),
    dot:    (on) => ({ position:'absolute', top:2, left:on?16:2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.2s' }),
  };

  return (
    <div style={S.wrap}>
      <style>{`@keyframes srv3d-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={S.viewer}>
        <div style={S.grid} />
        {!ready && !err && (
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, background:'linear-gradient(135deg,#0a0c10,#0d111c)' }}>
            <div style={S.ring} /><span style={{ fontSize:11, color:'#4a5060', letterSpacing:'1px' }}>กำลังโหลดโมเดล…</span>
          </div>
        )}
        {err && (
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:'#0a0c10' }}>
            <span style={{ fontSize:48 }}>📦</span>
            <span style={{ fontSize:12, color:'#556' }}>ยังไม่มีไฟล์ 3D</span>
          </div>
        )}
        <model-viewer ref={mvRef} src="" alt={modelCode}
          auto-rotate auto-rotate-delay="400" rotation-per-second="18deg"
          camera-controls touch-action="pan-y"
          shadow-intensity="1.2" shadow-softness={shadow}
          environment-image="neutral" exposure={exposure}
          style={S.mv} />
        {ready && !err && <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center', color:'rgba(255,255,255,0.2)', fontSize:10, pointerEvents:'none' }}>🖱 ลาก = หมุน · Scroll = ซูม</div>}
      </div>
      <div style={S.panel}>
        {/* Lighting env */}
        <div style={S.sec}>
          <div style={S.secT}>สภาพแวดล้อมแสง</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:4 }}>
            {SRV_ENV_PRESETS.map((env, i) => (
              <button key={env.value} title={env.label}
                onClick={() => { setEnvIdx(i); if(mvRef.current){try{mvRef.current.setAttribute('environment-image',env.value);}catch(e){}} }}
                style={{ aspectRatio:1, borderRadius:5, border:i===envIdx?'2px solid #00e5a0':'2px solid transparent', cursor:'pointer', position:'relative', overflow:'hidden', background:env.bg }}>
                <span style={{ position:'absolute', bottom:0, left:0, right:0, fontSize:6, textAlign:'center', background:'rgba(0,0,0,0.6)', color:'rgba(255,255,255,0.8)' }}>{env.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Light controls */}
        <div style={S.sec}>
          <div style={S.secT}>ควบคุมแสง</div>
          <div style={S.row}><span style={S.lbl}>ความสว่าง</span><input type="range" min={0.5} max={3} step={0.05} value={exposure} style={S.sld} onChange={e=>{const v=parseFloat(e.target.value);setExposure(v);if(mvRef.current)mvRef.current.setAttribute('exposure',v);}}/><span style={S.val}>{exposure.toFixed(1)}</span></div>
          <div style={S.row}><span style={S.lbl}>เงา</span><input type="range" min={0} max={1} step={0.05} value={shadow} style={S.sld} onChange={e=>{const v=parseFloat(e.target.value);setShadow(v);if(mvRef.current)mvRef.current.setAttribute('shadow-softness',v);}}/><span style={S.val}>{shadow.toFixed(1)}</span></div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:4 }}>
            <span style={{ fontSize:10, color:'#4a5060' }}>☀️ หมุนแสงอัตโนมัติ</span>
            <button onClick={() => setAutoLight(v=>!v)} style={S.toggle(autoLight)}><div style={S.dot(autoLight)} /></button>
          </div>
        </div>
        {/* Color tint */}
        <div style={S.sec}>
          <div style={S.secT}>สีโมเดล</div>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
            {SRV_TINT_COLORS.map((ct, i) => (
              <button key={ct.label} title={ct.label} onClick={() => applyTint(i)}
                style={{ width:22, height:22, borderRadius:'50%', border:i===tintIdx?'2px solid white':'2px solid transparent', cursor:'pointer', position:'relative', background:ct.bg, transform:i===tintIdx?'scale(1.15)':'scale(1)', transition:'all 0.15s' }}>
                {i===tintIdx && <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'white' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SALE_PERSONS (สำหรับ quote modal)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// SRV DataSheet PDF Generator — jsPDF (same pattern as IECMotorFlow)
// ─────────────────────────────────────────────────────────────────────────────
async function loadJsPDFSRV() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  await new Promise((res) => {
    if (document.getElementById('jspdf-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = res; document.head.appendChild(s);
  });
  await new Promise((res) => {
    if (document.getElementById('jspdf-autotable-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-autotable-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
    s.onload = res; document.head.appendChild(s);
  });
  return window.jspdf?.jsPDF || window.jsPDF;
}

// ── Performance data from SAS SRV Series catalog ─────────────────────────────
// Key specs per size: Max output torque (N·m), output shaft Ø, Fr2 max (N), weight approx
const SRV_SIZE_SPECS = {
  '025': { maxTorque: 120,  shaft: 'Ø11 mm', fr2: 1350,  weightKg: 0.8  },
  '030': { maxTorque: 200,  shaft: 'Ø14 mm', fr2: 1830,  weightKg: 1.3  },
  '040': { maxTorque: 400,  shaft: 'Ø18/19 mm', fr2: 3490, weightKg: 2.5 },
  '050': { maxTorque: 630,  shaft: 'Ø24/25 mm', fr2: 4840, weightKg: 4.2 },
  '063': { maxTorque: 1400, shaft: 'Ø25/28 mm', fr2: 6270, weightKg: 7.5 },
  '075': { maxTorque: 2200, shaft: 'Ø28/35 mm', fr2: 7380, weightKg: 11  },
  '090': { maxTorque: 4200, shaft: 'Ø35/38 mm', fr2: 8180, weightKg: 17  },
  '110': { maxTorque: 8000, shaft: 'Ø42 mm',    fr2:12000, weightKg: 28  },
  '130': { maxTorque:11000, shaft: 'Ø45 mm',    fr2:13500, weightKg: 40  },
  '150': { maxTorque:16000, shaft: 'Ø50 mm',    fr2:18000, weightKg: 58  },
};

// Ratio → available (condensed from catalog table)
const SRV_RATIO_LIST = [5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100];

async function generateSRVDatasheetPDF(code, specRows, sizeKey) {
  const JsPDF = await loadJsPDFSRV();
  if (!JsPDF) throw new Error('Cannot load jsPDF');

  const doc    = new JsPDF({ orientation:'portrait', unit:'mm', format:'a4', compress:true });
  const W      = doc.internal.pageSize.getWidth();
  const margin = 14;
  let   y      = margin;

  const NAVY   = [15, 40, 100];
  const TEAL   = [0,  160, 120];
  const LGRAY  = [240, 242, 246];
  const DGRAY  = [60, 70, 80];
  const WHITE  = [255, 255, 255];

  const dateStr = new Date().toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' });

  // ── Header Banner ──
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 28, 'F');
  doc.setFillColor(...TEAL);
  doc.rect(0, 28, W, 3, 'F');

  doc.setTextColor(...WHITE);
  doc.setFontSize(16); doc.setFont('helvetica', 'bold');
  doc.text('SAS TRANSMISSION', margin, 11);
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text('SRV Worm Gear Reducer  -  Technical Data Sheet', margin, 19);
  doc.setFontSize(7.5);
  doc.text('Date: ' + dateStr, margin, 26);
  y = 38;

  // ── Model Code Box ──
  doc.setFillColor(...LGRAY);
  doc.roundedRect(margin, y, W - margin * 2, 16, 3, 3, 'F');
  doc.setFillColor(...TEAL);
  doc.roundedRect(margin, y, 42, 16, 3, 3, 'F');

  doc.setTextColor(...WHITE);
  doc.setFontSize(7); doc.setFont('helvetica', 'bold');
  doc.text('MODEL CODE', margin + 2, y + 5);
  doc.setFontSize(9.5);
  doc.text(code || '-', margin + 21, y + 12, { align:'center' });

  doc.setTextColor(...NAVY);
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.text('SRV WORM GEAR REDUCER SERIES', margin + 48, y + 7);
  doc.setTextColor(...DGRAY);
  doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
  doc.text('Synergy Asia Solution Co.,Ltd.  |  We Only Focus On The Reducer Field', margin + 48, y + 13.5);
  y += 22;

  // ── Spec table ──
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('SELECTED CONFIGURATION', margin, y + 5);
  y += 9;

  const tableRows = specRows.map(([k, v]) => [k, v || '-']);

  doc.autoTable({
    startY: y,
    head: [['Parameter', 'Value']],
    body: tableRows,
    margin: { left: margin, right: margin },
    styles: { fontSize: 8.5, cellPadding: 3, lineColor: [220, 222, 228], lineWidth: 0.3 },
    headStyles: { fillColor: NAVY, textColor: WHITE, fontStyle:'bold', fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 249, 252] },
    columnStyles: {
      0: { fontStyle:'bold', textColor: DGRAY, cellWidth: 48 },
      1: { textColor: [20, 20, 30] },
    },
  });

  y = doc.lastAutoTable.finalY + 8;

  // ── Size Performance Data ──
  const sk = (sizeKey || '').split('/')[0].replace(/\D/g,'').padStart(3,'0');
  const specs = SRV_SIZE_SPECS[sk];

  if (specs) {
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text(`SRV${sk} — SIZE PERFORMANCE DATA  (from SAS SRV Series Catalog)`, margin, y);
    y += 5;

    doc.autoTable({
      startY: y,
      head: [['Specification', 'Value']],
      body: [
        ['Max Output Torque (M2n)', specs.maxTorque + ' N·m'],
        ['Output Shaft Diameter', specs.shaft],
        ['Max Radial Load Fr2', specs.fr2 + ' N'],
        ['Approx. Weight', specs.weightKg + ' kg'],
        ['Available Ratios (i)', SRV_RATIO_LIST.join(' / ')],
        ['Lubrication', 'Synthetic oil (factory filled)'],
        ['Housing material', 'Die-cast aluminium / Cast iron (SRV110-150)'],
        ['Protection class', 'IP54 (standard)'],
        ['Ambient temperature', '-10°C to +40°C'],
        ['Thermal capacity', 'See catalog page 14-15'],
      ],
      margin: { left: margin, right: margin },
      styles: { fontSize: 8.5, cellPadding: 3, lineColor: [220, 222, 228], lineWidth: 0.3 },
      headStyles: { fillColor: TEAL, textColor: WHITE, fontStyle:'bold', fontSize: 8 },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: {
        0: { fontStyle:'bold', textColor: DGRAY, cellWidth: 72 },
        1: { textColor: [20, 20, 30] },
      },
    });
    y = doc.lastAutoTable.finalY + 8;
  }

  // ── Formula reference ──
  if (y < 240) {
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('QUICK FORMULAS', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...DGRAY);
    const formulas = [
      'Output speed (n2):  n2 = n1 ÷ i   [1/min]',
      'Output torque (M2n):  M2n = 9550 × P1n × ηd ÷ n2   [N·m]',
      'Service factor (fs):  Select from daily operating hours & load type (catalog p.16–17)',
    ];
    formulas.forEach(f => { doc.text(f, margin + 2, y); y += 5; });
    y += 2;
  }

  // ── Footer ──
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFillColor(...NAVY);
  doc.rect(0, pageH - 18, W, 18, 'F');
  doc.setTextColor(...WHITE);
  doc.setFontSize(7); doc.setFont('helvetica', 'bold');
  doc.text('Synergy Asia Solution Co.,Ltd.  |  SRV Worm Gear Reducer Series', margin, pageH - 11);
  doc.setFont('helvetica', 'normal');
  doc.text('Tel: 081-921-6225  |  Warranty: 18 Months after delivery', margin, pageH - 5);
  doc.setTextColor(160, 185, 215);
  doc.text('Data from SAS SRV Series Catalog. Specs subject to change without notice.', W - margin, pageH - 5, { align: 'right' });

  doc.save((code || 'SRV_DataSheet') + '.pdf');
}

// SRVDataSheetButton — same pattern as IECMotorFlow DataSheetButton
function SRVDataSheetButton({ code, specRows, sizeKey }) {
  const [status, setStatus] = React.useState('idle');

  const handleClick = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await generateSRVDatasheetPDF(code, specRows, sizeKey);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('SRV PDF error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const label = { idle:'📄 Data Sheet', loading:'⏳ กำลังสร้าง...', done:'✅ ดาวน์โหลดแล้ว', error:'⚠️ ลองใหม่' }[status];
  const bg = status === 'error' ? 'rgba(220,50,50,0.18)' : 'rgba(30,100,220,0.12)';
  const border = status === 'error' ? '1px solid rgba(220,50,50,0.4)' : '1px solid rgba(30,100,220,0.3)';
  const color = status === 'error' ? '#e05050' : '#6090e0';

  return (
    <button type="button" onClick={handleClick} disabled={status === 'loading'}
      style={{ width:'100%', padding:'10px 0', borderRadius:10, background:bg, border, color, fontWeight:600, fontSize:13, cursor:'pointer', transition:'opacity 0.15s', opacity: status === 'loading' ? 0.6 : 1 }}>
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const SRV_SALE_PERSONS = [
  { abbr: 'CA',  name: 'Mr. Chottanin A. (CA)',  position: 'TRANSMISSION PRODUCT MANAGER', phone: '081-921-6225' },
  { abbr: 'AP',  name: 'Ms.Apichaya P. (AP)',    position: 'Sale Supervisor',               phone: '098-3697494' },
  { abbr: 'MY',  name: 'Ms.Matavee Y. (MY)',     position: 'Sale Supervisor',               phone: '092-2715371' },
  { abbr: 'TWS', name: 'Ms.Thitikan W. (TWS)',   position: 'Sale Exclusive',                phone: '080-4632394' },
  { abbr: 'WS',  name: 'Ms.Warissara S.(WS)',    position: 'Sale Exclusive',                phone: '065-5051798' },
  { abbr: 'SI',  name: 'Ms.Suphak I.(SI)',        position: 'Sale Exclusive',               phone: '096-0787776' },
  { abbr: 'NM',  name: 'Mr.Naphaphat M.(NM)',    position: 'Sale Exclusive',                phone: '065-7176332' },
  { abbr: 'SK',  name: 'Mr.Sanya K.(SK)',         position: 'Sale Supervisor',              phone: '086-9819616' },
  { abbr: 'PL',  name: 'Mr.Pongsakorn L.(PL)',    position: 'Sale Engineer',                phone: '063-2159056' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SRVSummaryPage — fullscreen layout แบบ BLDC
// ─────────────────────────────────────────────────────────────────────────────
function SRVSummaryPage({ code, specRows, sizeKey, glbBase, onConfirm, onRequestQuote, onBack }) {
  const [qty,      setQty]      = React.useState(1);
  const [showQuote,setShowQuote]= React.useState(false);
  const [qName,    setQName]    = React.useState('');
  const [qCompany, setQCompany] = React.useState('');
  const [qPhone,   setQPhone]   = React.useState('');
  const [qEmail,   setQEmail]   = React.useState('');
  const [sending,  setSending]  = React.useState(false);
  const [salePerson, setSalePerson]               = React.useState('CA');
  const [showSalePersonPicker, setShowSalePersonPicker] = React.useState(false);

  const submitQuote = async () => {
    if (!qName || !qCompany || !qPhone || !qEmail) { alert('กรุณากรอกข้อมูลให้ครบทุกช่อง'); return; }
    try {
      setSending(true);
      const sp = SRV_SALE_PERSONS.find(s => s.abbr === salePerson) || SRV_SALE_PERSONS[0];
      // ส่งผ่าน onRequestQuote ไปยัง App.jsx (SRV modal เดิม) พร้อมข้อมูลครบ
      if (typeof onRequestQuote === 'function') {
        onRequestQuote({
          product: 'SRV Worm Gear', model: code, qty,
          name: qName, company: qCompany, phone: qPhone, email: qEmail,
          salePerson: sp.name,
        });
      }
      setShowQuote(false);
    } catch (e) {
      alert(String(e?.message || e));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div id="srv-summary" style={{ position:'fixed', inset:0, zIndex:500, display:'flex', flexDirection:'column', background:'#0a0c10', fontFamily:"'Sarabun',sans-serif" }}>

        {/* ── Top bar ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 18px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'rgba(10,12,16,0.95)', backdropFilter:'blur(12px)', flexShrink:0, flexWrap:'wrap', gap:8 }}>
          <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'1.5px', color:'#00e5a0', textTransform:'uppercase' }}>
            ⚙ SRV WORM GEAR
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontFamily:'monospace', fontSize:12, fontWeight:600, color:'#e8eaf0', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', padding:'3px 10px', borderRadius:5 }}>
              {code || '—'}
            </span>
            <button type="button"
              style={{ background:'none', border:'none', cursor:'pointer', color:'#00e5a0', fontSize:11, padding:'3px 8px', borderRadius:4 }}
              onClick={async (e) => {
                const btn = e.currentTarget;
                try {
                  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code||'');
                  else { const ta=document.createElement('textarea'); ta.value=code||''; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
                } catch {}
                const old=btn.textContent; btn.textContent='Copied!'; setTimeout(()=>{btn.textContent=old;},1200);
              }}>Copy</button>
          </div>
          <button type="button" onClick={onBack}
            style={{ background:'rgba(0,229,160,0.08)', border:'1px solid rgba(0,229,160,0.25)', color:'#00e5a0', padding:'4px 12px', borderRadius:6, cursor:'pointer', fontSize:11, fontWeight:600 }}>
            ← ย้อนกลับ
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ flex:1, display:'flex', flexDirection:'row', minHeight:0, overflow:'hidden' }}>

          {/* 3D Viewer */}
          <div style={{ flex:1, minWidth:0 }}>
            <SRVViewer3D modelCode={code} glbBase={glbBase} />
          </div>

          {/* ── Right Panel ── */}
          <div style={{ width:280, flexShrink:0, background:'#0f1118', borderLeft:'1px solid rgba(255,255,255,0.07)', overflowY:'auto', display:'flex', flexDirection:'column' }}>

            {/* Specs */}
            <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 }}>ข้อมูลจำเพาะ</div>
              {specRows.map(([k, v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', gap:6 }}>
                  <span style={{ fontSize:11, color:'#4a5060', flexShrink:0 }}>{k}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:['Output Speed','Output Torque','Ratio'].includes(k)?'#00e5a0':'#e8eaf0', textAlign:'right', wordBreak:'break-all' }}>{v||'—'}</span>
                </div>
              ))}
            </div>

            {/* Qty */}
            <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 }}>จำนวน</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)' }}>SRV Gear</span>
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <button type="button" onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>–</button>
                  <input type="number" min={1} max={999} value={qty}
                    onChange={e=>{const v=Number(e.target.value);setQty(Number.isFinite(v)?Math.max(1,Math.floor(v)):1);}}
                    onWheel={e=>e.currentTarget.blur()}
                    style={{ width:38, textAlign:'center', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:5, color:'#e8eaf0', fontSize:13, fontWeight:700, padding:'2px 0' }} />
                  <button type="button" onClick={()=>setQty(q=>Math.min(999,q+1))} style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>+</button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
              <button type="button"
                style={{ width:'100%', padding:'11px 0', borderRadius:10, background:'linear-gradient(90deg,#00e5a0,#00c87a)', color:'#0a1a10', fontWeight:700, fontSize:14, border:'none', cursor:'pointer' }}
                onClick={() => setShowQuote(true)}>
                🛒 ขอใบเสนอราคา
              </button>
              <button type="button"
                style={{ width:'100%', padding:'11px 0', borderRadius:10, background:'rgba(0,229,160,0.12)', border:'1px solid rgba(0,229,160,0.3)', color:'#00e5a0', fontWeight:700, fontSize:14, cursor:'pointer' }}
                onClick={() => { if(code) onConfirm(code); }}>
                📦 รับไฟล์ 3D (.STEP)
              </button>
              <button type="button"
                style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'rgba(255,255,255,0.07)', color:'#e8eaf0', fontWeight:600, fontSize:13, border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer' }}
                onClick={() => { if (typeof downloadSrvDrawingPDF === 'function') downloadSrvDrawingPDF(code); else console.warn('downloadSrvDrawingPDF not found'); }}>
                📐 Drawing 2D
              </button>
              <SRVDataSheetButton code={code} specRows={specRows} sizeKey={sizeKey} />
            </div>

          </div>
        </div>
      </div>

      {/* ── Quote Modal (แบบ BLDC) ── */}
      {showQuote && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => !sending && setShowQuote(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-xl p-6 text-slate-900">

            {/* Header + Sale Person */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h3 className="text-xl font-bold">ขอใบเสนอราคา SRV Worm Gear</h3>
              <div className="relative">
                <button type="button"
                  onClick={() => setShowSalePersonPicker(v => !v)}
                  className="text-2xl leading-none select-none hover:scale-110 active:scale-95 transition-transform"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}>🧑‍💼</button>
                {showSalePersonPicker && (
                  <div className="absolute left-0 top-full mt-1 z-[9999] bg-white border border-slate-200 rounded-xl shadow-xl w-[260px] sm:w-[300px] overflow-y-auto max-h-[320px]">
                    {SRV_SALE_PERSONS.map(sp => (
                      <button key={sp.abbr} type="button"
                        onClick={() => { setSalePerson(sp.abbr); setShowSalePersonPicker(false); }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-green-50 transition text-sm border-b last:border-b-0 ${salePerson === sp.abbr ? 'bg-green-100 font-semibold' : ''}`}>
                        <div className="font-semibold text-slate-800">{sp.name}</div>
                        <div className="text-slate-500 text-xs">{sp.position} · {sp.phone}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {salePerson && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  {SRV_SALE_PERSONS.find(s => s.abbr === salePerson)?.name || salePerson}
                </span>
              )}
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-3">
              <div><label className="block text-sm mb-1">ชื่อผู้ขอราคา :</label>
                <input value={qName} onChange={e=>setQName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"/></div>
              <div><label className="block text-sm mb-1">ชื่อบริษัท :</label>
                <input value={qCompany} onChange={e=>setQCompany(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"/></div>
              <div><label className="block text-sm mb-1">เบอร์ติดต่อ :</label>
                <input value={qPhone} onChange={e=>setQPhone(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"/></div>
              <div><label className="block text-sm mb-1">Email :</label>
                <input type="email" value={qEmail} onChange={e=>setQEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"/></div>
            </div>

            {/* Model info */}
            <div className="mt-4 text-sm text-slate-600">
              <div>Model: <b className="text-blue-700">{code}</b></div>
              <div className="mt-1">จำนวน: <b>{qty}</b> ชุด</div>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowQuote(false)} disabled={sending}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50">ปิด</button>
              <button type="button" onClick={submitQuote} disabled={sending || !qName || !qCompany || !qPhone || !qEmail}
                className="px-5 py-2 rounded-2xl bg-green-300 hover:bg-green-400 font-semibold shadow active:scale-95 transition transform disabled:opacity-50">
                {sending ? 'กำลังส่ง…' : 'รับใบเสนอราคา'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
