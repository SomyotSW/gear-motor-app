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
      className="fixed left-3 bottom-3 z-20 px-3 py-2 rounded-full shadow-xl bg-white/90 hover:bg-white transform hover:-translate-y-1 transition"
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
    return (
      <>
        <Section title="เลือก Series">
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: 'SRV',  img: SRVVImg,  label: 'SRV'  },
              { key: 'SDRV', img: SDRVImg,  label: 'SDRV' },
              { key: 'SVF',  img: SVFImg,   label: 'SVF'  },
            ].map(({ key, img, label }) => (
              <button key={key}
                onClick={() => update('srvSeries', key)}
                className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
              >
                <img src={img} alt={label} className="w-full rounded-t-2xl" />
                <p className="text-center py-2 font-semibold text-gray-800">{label}</p>
              </button>
            ))}
          </div>
        </Section>
      </>
    );
  }

  // ── STEP 2 — Size ───────────────────────────────────────────────────────────
  if (srvSeries && !srvSize) {
    const sizes = sizeMap[srvSeries] || [];
    return (
      <>
        <Section title="เลือก Size Gear">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {sizes.map(sz => (
              <button key={sz}
                onClick={() => update('srvSize', sz)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-4 py-6 text-blue-800 font-bold border border-gray-300 hover:bg-blue-100"
              >{sz}</button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvSeries', null))}
      </>
    );
  }

  // ── STEP 3 — Input Type ─────────────────────────────────────────────────────
  if (srvSize && !srvInputSel) {
    return (
      <>
        <Section title="เลือก Input Power ที่ต้องการ">
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => update('srvInputSel', 'WM')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVWMImg} alt="With motor" className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">With motor</p>
            </button>
            <button onClick={() => update('srvInputSel', 'WS')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVWSImg} alt="With Servo motor" className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">With Servo motor</p>
            </button>
            <button onClick={() => update('srvInputSel', 'IS')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVIImg} alt="Input shaft" className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">Input shaft</p>
            </button>
          </div>
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
        <Section title="เลือกขนาดมอเตอร์ (กิโลวัต): Power Motor (kW)">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {powers.map(p => (
              <button key={p} onClick={() => update('srvPowerKW', p)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-4 py-6 font-semibold">
                {p}
              </button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvInputSel', null))}
      </>
    );
  }

  // ── STEP 3.1.1 (WM only) — Pole ─────────────────────────────────────────────
  if (srvInputSel === 'WM' && srvPowerKW && !srvPole) {
    return (
      <>
        <Section title="เลือกจำนวน Pole มอเตอร์ : Motor Pole">
          <div className="grid grid-cols-2 gap-4">
            {['4P', '6P'].map(p => (
              <button key={p} onClick={() => update('srvPole', p)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-4 py-6 font-semibold">
                {p === '4P' ? '4 Pole' : '6 Pole'}
              </button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvPowerKW', null))}
      </>
    );
  }

  // ── STEP 3.1.2 (WM only) — IEC Mode ─────────────────────────────────────────
  if (srvInputSel === 'WM' && srvPowerKW && srvPole && !srvIECMode) {
    return (
      <>
        <Section title="เลือกเฉพาะ Gear + IEC Adapter หรือ ทั้งชุด Gear + Motor">
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => update('srvIECMode', 'IEC')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVIECImg} alt="IEC Adapter" className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">IEC Adapter</p>
            </button>
            <button onClick={() => update('srvIECMode', 'IEC+Motor')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVWMImg} alt="IEC Adapter + Motor" className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">IEC Adapter + Motor</p>
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

    return (
      <>
        <Section title="เลือกอัตราทด : Ratio">
          {extra}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {ratios.map(r => (
              <button key={r} onClick={() => update('srvRatio', r)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-3 py-4 font-semibold">
                {r}
              </button>
            ))}
          </div>
        </Section>
        <p className="text-blue-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          สามารถใช้สูตรคำนวณความเร็วรอบจากอัตราทดได้เลย:{' '}
          <b>ความเร็วหัวเกียร์ (รอบ/นาที) = ความเร็วมอเตอร์ (รอบ/นาที) ÷ อัตราทด (i)</b><br />
          ถ้าเลือกมอเตอร์ 4 Pole ค่าโดยประมาณ = <b>1450</b> รอบ/นาที<br />
          ถ้าเลือกมอเตอร์ 6 Pole ค่าโดยประมาณ = <b>950</b> รอบ/นาที<br />
          ถ้าเลือกอัตราทด (i) 50 = <b>ความเร็วของหัวเกียร์ = 1450 / 50 = 29 rpm</b>
        </p>
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
    return (
      <>
        <Section title="เลือกตำแหน่งการติดตั้ง : Mounting Type">
          <div className="grid grid-cols-4 gap-4">
            {[
              { k: 'FA',                   label: 'FA',                   img: SRVFAImg     },
              { k: 'FB',                   label: 'FB',                   img: SRVFBImg     },
              { k: 'Hollow & Solid shaft', label: 'Hollow & Solid shaft', img: SRVHollowImg },
              { k: 'T',                    label: 'T',                    img: SRVTImg      },
            ].map(({ k, label, img }) => (
              <button key={k} onClick={() => update('srvGearType', k)}
                className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
                {img
                  ? <img src={img} alt={label} className="w-full rounded-t-2xl" />
                  : <div className="h-32 rounded-t-2xl flex items-center justify-center font-bold text-2xl">{label}</div>
                }
                <p className="text-center py-2 font-semibold text-gray-800">{label}</p>
              </button>
            ))}
          </div>
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

    return (
      <>
        <Section title="เลือกทิศทางการติดตั้ง">
          <div className="grid grid-cols-2 gap-4">
            {subImages.map(({ k, img }) => (
              <button key={k}
                onClick={() => update('srvGearTypeSub', k)}
                className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
                title={k}
              >
                <img src={img} alt={`${srvGearType}${k}`} className="w-full rounded-t-2xl" />
                <p className="text-center py-2 font-semibold text-gray-800">{k}</p>
              </button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvGearType', null))}
      </>
    );
  }

  // ── STEP 5 — Shaft Design ────────────────────────────────────────────────────
  if (!srvShaftDesign) {
    return (
      <>
        <Section title="เลือกลักษณะเพลา : Shaft Design">
          <div className="grid grid-cols-4 gap-4">
            {[
              { k: 'DS',     img: DSImg,        label: 'DS'     },
              { k: 'DS1',    img: DS1Img,       label: 'DS1'    },
              { k: 'DS2',    img: DS2Img,       label: 'DS2'    },
              { k: 'Hollow', img: SRVHollowImg, label: 'Hollow' },
            ].map(({ k, img, label }) => (
              <button key={k} onClick={() => update('srvShaftDesign', k)}
                className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
                <img src={img} alt={label} className="w-full rounded-t-2xl" />
                <p className="text-center py-2 font-semibold">{label}</p>
              </button>
            ))}
          </div>
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
    return (
      <>
        <Section title="เลือกตำแหน่งการติดตั้ง : Mounting position">
          <div className="flex justify-center mb-6">
            <img src={image} alt="Mounting Table" className="max-w-md w-full rounded-xl shadow" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {['B3', 'B8', 'V5', 'V6', 'B6', 'B7'].map(m => (
              <button key={m} onClick={() => update('srvMounting', m)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-3 py-4 font-semibold">
                {m}
              </button>
            ))}
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
        <Section title="เลือกขนาดหน้าแปลนของ Adapter : IEC Adapter Size">
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => update('srvIECSize', 'B5')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={B5Img} alt="B5" className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold">B5</p>
            </button>
            <button onClick={() => update('srvIECSize', 'B14')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={B14TImg} alt="B14" className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold">B14</p>
            </button>
          </div>
        </Section>
        {floatingBack(() => update('srvMounting', null))}
      </>
    );
  }

  // ── STEP 8 — Motor Type + Terminal Box + Cable (IEC+Motor only) ──────────────
  if (srvInputSel === 'WM' && srvIECMode === 'IEC+Motor' && (!srvMotorType || !srvPosition || !srvPositionSub)) {
    return (
      <>
        {/* Motor Type */}
        {!srvMotorType && (
          <Section title="เลือกประเภทของมอเตอร์ : Motor Type">
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
                  className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
                  title={type}
                >
                  <img src={img} alt={type} className="w-full rounded-t-2xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{type}</p>
                </button>
              ))}
            </div>
          </Section>
        )}

        {/* Terminal Box Position */}
        {srvMotorType && !srvPosition && (
          <Section title="ทิศทางการติดตั้งกล่องไฟ : Terminal Box Position">
            <div className="grid grid-cols-4 gap-4">
              {[
                { p: '0',   img: T0Img   },
                { p: '90',  img: T90Img  },
                { p: '180', img: T180Img },
                { p: '270', img: T270Img },
              ].map(({ p, img }) => (
                <button key={p}
                  onClick={() => update('srvPosition', p)}
                  className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
                  title={`${p}°`}
                >
                  <img src={img} alt={`T${p}`} className="w-full rounded-t-2xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{p}°</p>
                </button>
              ))}
            </div>
          </Section>
        )}

        {/* Cable Wire Position */}
        {srvMotorType && srvPosition && !srvPositionSub && (
          <Section title="ทิศทางการเข้าของสายไฟ : Cable wire position">
            <div className="grid grid-cols-4 gap-4">
              {[
                { s: 'X', img: CXImg },
                { s: '1', img: C1Img },
                { s: '2', img: C2Img },
                { s: '3', img: C3Img },
              ].map(({ s, img }) => (
                <button key={s}
                  onClick={() => update('srvPositionSub', s)}
                  className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
                  title={s}
                >
                  <img src={img} alt={`C${s}`} className="w-full rounded-t-2xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{s}</p>
                </button>
              ))}
            </div>
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
    ['Warranty',     '18 เดือน'],
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
function SRVSummaryPage({ code, specRows, glbBase, onConfirm, onRequestQuote, onBack }) {
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
                  <div className="absolute left-0 top-full mt-1 z-[9999] bg-white border border-slate-200 rounded-xl shadow-xl w-[260px] sm:w-[300px] overflow-hidden">
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
