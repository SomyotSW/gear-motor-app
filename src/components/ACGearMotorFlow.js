// ACGearMotorFlow.js
// ─────────────────────────────────────────────────────────────────────────────
// AC Gear Motor Flow — แยกออกจาก MotorFlows.js
// Pattern เดียวกับ IECMotorFlow.js (self-contained)
//
// การเปลี่ยนแปลง:
//  1. แยกทุก import ที่เกี่ยวกับ AC Gear Motor ออกมาจาก MotorFlows.js
//  2. เปลี่ยนชื่อ export default: ACMotorFlow → ACGearMotorFlow
//  3. เปลี่ยนชื่อ export function: generateModelCode → generateACModelCode
//     (เพื่อไม่ชนกับชื่อที่อาจมีใน MotorFlows.js)
//  4. ไม่แตะโค้ดภายในแม้แต่บรรทัดเดียว
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import FinalResult from './FinalResult';

// ── รูป Gear Head ──────────────────────────────────────────────────────────
import GBKImg    from '../assets/ac/Gearhead/K.png';
import GBKlowImg from '../assets/ac/Gearhead/Klow.png';
import GBKBImg   from '../assets/ac/Gearhead/KB.png';
import GBRCImg   from '../assets/ac/Gearhead/RC.png';
import GBRTImg   from '../assets/ac/Gearhead/RT.png';

// ── 3D GIF ─────────────────────────────────────────────────────────────────
import K3D  from '../assets/3Dgif/K3D.gif';
import KB3D from '../assets/3Dgif/KB3D.gif';
import RC3D from '../assets/3Dgif/RC3D.gif';
import RT3D from '../assets/3Dgif/RT3D.gif';

// ── Power flame images ─────────────────────────────────────────────────────
import W10Img    from '../assets/ac/flame/10W.png';
import W15Img    from '../assets/ac/flame/15W.png';
import W25Img    from '../assets/ac/flame/25W.png';
import W40Img    from '../assets/ac/flame/40W.png';
import W60Img    from '../assets/ac/flame/60W.png';
import W90Img    from '../assets/ac/flame/90W.png';
import W120Img   from '../assets/ac/flame/120W.png';
import W140Img   from '../assets/ac/flame/140W.png';
import W200Img   from '../assets/ac/flame/200W.png';
import SpecialWImg from '../assets/ac/flame/SpecialW.png';

// ── Voltage images ─────────────────────────────────────────────────────────
import SingleImg from '../assets/ac/Voltage/Single.png';
import ThreeImg  from '../assets/ac/Voltage/Three.png';

// ── Optional images ────────────────────────────────────────────────────────
import FanImg from '../assets/ac/Optional/Fan.png';
import TmbImg from '../assets/ac/Optional/Tmb.png';
import EmbImg from '../assets/ac/Optional/Emb.png';
import FcfImg from '../assets/ac/Optional/Fcf.png';
import TmpImg from '../assets/ac/Optional/Tmp.png';
import StdImg from '../assets/ac/Optional/Std.png';

// ── Motor Type images ──────────────────────────────────────────────────────
import InductionImg  from '../assets/ac/induction.png';
import ReversibleImg from '../assets/ac/reversible.png';
import VariableImg   from '../assets/ac/variable.png';

// ── Controller images (US / UX) ────────────────────────────────────────────
import USImg from '../assets/ac/US.png';
import UXImg from '../assets/ac/UX.png';

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER MAP
// ─────────────────────────────────────────────────────────────────────────────
const CONTROLLER_MAP = {
  "10W": ["US206C", "UX52-10"],
  "15W": ["US315C", "UX52-15"],
  "25W": ["US425C", "UX52-25"],
  "40W": ["US540C", "UX52-40"],
  "60W": ["US560C", "UX52-60"],
  "90W": ["US590C", "UX52-90"],
  "120W": ["US5120C", "UX52-120"],
  "140W": ["US6140C", "UX52-140"],
  "200W": ["US6200C", "UX52-200"],
};

// ─────────────────────────────────────────────────────────────────────────────
// SALE PERSONS
// ─────────────────────────────────────────────────────────────────────────────
const SALE_PERSONS = [
  { abbr: 'CA',  name: 'Mr. Chottanin A. (CA)',  position: 'TRANSMISSION PRODUCT MANAGER',  phone: '081-921-6225' },
  { abbr: 'AP',  name: 'Ms.Apichaya P. (AP)',    position: 'Sale Supervisor',                phone: '098-3697494' },
  { abbr: 'MY',  name: 'Ms.Matavee Y. (MY)',     position: 'Sale Supervisor',                phone: '092-2715371' },
  { abbr: 'TWS', name: 'Ms.Thitikan W. (TWS)',   position: 'Sale Exclusive',                 phone: '080-4632394' },
  { abbr: 'WS',  name: 'Ms.Warissara S.(WS)',    position: 'Sale Exclusive',                 phone: '065-5051798' },
  { abbr: 'SI',  name: 'Ms.Suphak I.(SI)',        position: 'Sale Exclusive',                phone: '096-0787776' },
  { abbr: 'NM',  name: 'Mr.Naphaphat M.(NM)',    position: 'Sale Exclusive',                 phone: '065-7176332' },
  { abbr: 'SK',  name: 'Mr.Sanya K.(SK)',         position: 'Sale Supervisor',               phone: '086-9819616' },
  { abbr: 'PL',  name: 'Mr.Pongsakorn L.(PL)',    position: 'Sale Engineer',                 phone: '063-2159056' },
];

// ─────────────────────────────────────────────────────────────────────────────
// generateACModelCode
// (เดิมชื่อ generateModelCode ใน MotorFlows.js บรรทัด 564–673)
// ─────────────────────────────────────────────────────────────────────────────
export function generateACModelCode({ acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio , acConfirm }) {
  if (!acMotorType || !acPower || !acVoltage || !acOption || !acGearHead || !acRatio) return null;

  const phaseMap = {
    '1Phase220V AC 50Hz': 'C',
    '3Phase220V AC 50Hz': 'S'
  };

  const optionMap = {
    'With Fan': 'F',
    'With Terminal Box': 'T',
    'With Force Cooling Fan': 'FF',
    'With Electromagnetic Brake': 'M',
    'With Thermal Protector': 'P',
    'With Thermal Protection': 'P',
    'Standard': ''
  };

  const gearHeadMap = {
    'SQUARE BOX WITH WING': 'K',
    'SQUARE BOX (Low)': 'K',
    'SQUARE BOX': 'KB',
    'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'RC',
    'RIGHT ANGLE GEAR/SOLID SHAFT': 'RT'
  };

  // แปลงชื่อหัวเกียร์ → ไฟล์ GIF
const getGearGif = () => {
  if (acGearHead === 'RIGHT ANGLE GEAR/HOLLOW SHAFT') return RC3D;
  if (acGearHead === 'RIGHT ANGLE GEAR/SOLID SHAFT')  return RT3D;
  if (acGearHead === 'SQUARE BOX')                    return KB3D;
  if (acGearHead === 'SQUARE BOX (Low)')              return KB3D;
  if (acGearHead === 'SQUARE BOX WITH WING')          return K3D;
  return null;
};

  const motorMap = {
    'Induction Motor': 'IK',
    'Reversible Motor': 'RK',
    'Variable Speed Motor': 'IK'
  };

  const powerMap = {
    '10W AC Motor': '2',
    '15W AC Motor': '3',
    '25W AC Motor': '4',
    '40W AC Motor': '5',
    '60W AC Motor': '5',
    '90W AC Motor': '5',
    '120W AC Motor': '5',
    '140W AC Motor': '6',
    '200W AC Motor': '6'
  };

  const phase = phaseMap[acVoltage];
  const gearCode = gearHeadMap[acGearHead];
  const motorCode = motorMap[acMotorType];
  const powerCode = powerMap[acPower];

  // ✅ รองรับ acOption เป็น array (multi-select)
  let term = '';
  if (Array.isArray(acOption)) {
    const cleaned = acOption.includes('Standard') ? [] : acOption;
    term = cleaned.map(opt => optionMap[opt] ?? '').join('');
  } else {
    term = optionMap[acOption] ?? '';
  }

  const num = acPower.replace('W AC Motor', '').trim();
  if (!phase || !gearCode || !motorCode || !powerCode || !num) return null;

  const isVariable     = acMotorType === 'Variable Speed Motor';
  const frontSuffixGN  = isVariable ? 'RGN' : 'GN';
  const frontSuffixGU  = isVariable ? 'RGU' : 'GU';

  const results = [];

  if (['10', '15', '25', '40'].includes(num)) {
    const front = `${powerCode}${motorCode}${num}${frontSuffixGN}-${phase}${term}`;
    const end   = `${powerCode}GN${acRatio}${gearCode}`;
    results.push(`${front}-${end}`);
  } else if (num === '60') {
    const frontGN = `${powerCode}${motorCode}${num}${frontSuffixGN}-${phase}${term}`;
    const frontGU = `${powerCode}${motorCode}${num}${frontSuffixGU}-${phase}${term}`;

    if (gearCode === 'RC' || gearCode === 'RT') {
      const end = `${powerCode}GU${acRatio}${gearCode}`;
      results.push(`${frontGU}-${end}`);
    } else if (acGearHead === 'SQUARE BOX WITH WING') {
      const endGU = `${powerCode}GU${acRatio}K`;
      results.push(`${frontGU}-${endGU}`);
    } else {
      const endGN = `${powerCode}GN${acRatio}K`;
      const endGU = `${powerCode}GU${acRatio}KB`;
      results.push(`${frontGN}-${endGN}`);
      results.push(`${frontGU}-${endGU}`);
    }
  } else {
    const front = `${powerCode}${motorCode}${num}${frontSuffixGU}-${phase}${term}`;
    const end   = `${powerCode}GU${acRatio}${gearCode}`;
    results.push(`${front}-${end}`);
  }

  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// normalizeGlbCode — ทุก ratio → 3 เพื่อใช้ไฟล์ GLB ร่วมกัน
// เช่น 5IK90RGU-CF-5GU18KB → 5IK90RGU-CF-5GU3KB
//      2IK10GN-ST-2GN15K    → 2IK10GN-ST-2GN3K
// ─────────────────────────────────────────────────────────────────────────────
function normalizeGlbCode(modelCode) {
  if (!modelCode) return modelCode;
  return modelCode.replace(
    /(\d+)(GN|GU)(\d+(?:\.\d+)?)(K|KB|RC|RT|L|LC)?(?=$|-)/gi,
    (_, frame, gearType, _ratio, suffix) =>
      `${frame}${gearType.toUpperCase()}3${suffix || ''}`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLB base URL — GitHub Releases (Vercel ไม่รองรับ LFS ให้ใช้ตรงนี้แทน)
// หลัง upload ไฟล์ GLB ขึ้น GitHub Releases tag "glb-v1" แล้ว
// ─────────────────────────────────────────────────────────────────────────────
// jsDelivr CDN — proxy GitHub Releases พร้อม CORS header ถูกต้อง
const GLB_BASE = 'https://cdn.jsdelivr.net/gh/SomyotSW/gear-motor-app@main/public/model/glb';

// ─────────────────────────────────────────────────────────────────────────────
// StepViewer3D — แสดงไฟล์ .glb ด้วย <model-viewer> (Google)
// ─────────────────────────────────────────────────────────────────────────────

// โหลด model-viewer script ครั้งเดียวตอน module load
(() => {
  if (typeof document === 'undefined') return;
  const id = 'mv-script';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id; s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
  document.head.appendChild(s);
})();

// ── Environment presets ───────────────────────────────────────────────────────
const ENV_PRESETS = [
  { label: 'Neutral',   value: 'neutral',     bg: '#4a4a4a' },
  { label: 'Studio',    value: 'legacy',       bg: '#6a7a8a' },
  { label: 'Warehouse', value: 'warehouse',    bg: '#8a7a6a' },
  { label: 'Forest',    value: 'forest',       bg: '#4a6a4a' },
  { label: 'Apartment', value: 'apartment',    bg: '#7a6a8a' },
  { label: 'City',      value: 'city',         bg: '#5a6a7a' },
  { label: 'Dawn',      value: 'dawn',         bg: '#8a6a5a' },
  { label: 'Night',     value: 'night',        bg: '#2a2a4a' },
];

function StepViewer3D({ modelCode, width = '100%', aspect = '4/3' }) {
  const glbCode = normalizeGlbCode(modelCode || '');
  const glbUrl  = glbCode
    ? `${GLB_BASE}/${encodeURIComponent(glbCode)}.glb`
    : null;

  const mvRef                     = React.useRef(null);
  const [err, setErr]             = React.useState(false);
  const [ready, setReady]         = React.useState(false);
  const [envIdx, setEnvIdx]       = React.useState(0);
  const [autoLight, setAutoLight] = React.useState(false);
  const [lightRot, setLightRot]   = React.useState(0);
  const lightTimer                = React.useRef(null);

  // reset เมื่อ model เปลี่ยน
  React.useEffect(() => { setErr(false); setReady(false); }, [glbCode]);

  // ref+addEventListener (custom element ไม่รองรับ React synthetic events)
  React.useEffect(() => {
    const el = mvRef.current;
    if (!el) return;
    const onErr  = () => setErr(true);
    const onLoad = () => setReady(true);
    el.addEventListener('error', onErr);
    el.addEventListener('load',  onLoad);
    return () => {
      el.removeEventListener('error', onErr);
      el.removeEventListener('load',  onLoad);
    };
  }, [glbUrl]);

  // auto-rotate lighting
  React.useEffect(() => {
    if (autoLight) {
      lightTimer.current = setInterval(() => {
        setLightRot(r => {
          const next = (r + 2) % 360;
          if (mvRef.current) {
            mvRef.current.style.setProperty('--env-rotation', `${next}deg`);
          }
          return next;
        });
      }, 30);
    } else {
      clearInterval(lightTimer.current);
    }
    return () => clearInterval(lightTimer.current);
  }, [autoLight]);

  // apply environment preset
  React.useEffect(() => {
    const el = mvRef.current;
    if (!el) return;
    el.setAttribute('environment-image', ENV_PRESETS[envIdx].value);
  }, [envIdx]);

  const containerStyle = {
    width, aspectRatio: aspect, position: 'relative',
    borderRadius: '1rem', overflow: 'visible',
  };

  if (!glbUrl) {
    return (
      <div style={{ ...containerStyle, overflow:'hidden', background:'linear-gradient(135deg,#0f0f1a,#1a1a2e)' }}>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, color:'#555' }}>
          <span style={{ fontSize:36 }}>📦</span>
          <span style={{ fontSize:12, color:'#666' }}>ยังไม่มีไฟล์ 3D</span>
          <span style={{ fontSize:9, color:'#444', fontFamily:'monospace' }}>{glbCode}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* ── 3D Viewer ── */}
      <div style={{ width:'100%', aspectRatio: aspect, borderRadius:'1rem', overflow:'hidden', position:'relative', background:'linear-gradient(135deg,#0f0f1a,#1a1a2e)' }}>
        <model-viewer
          ref={mvRef}
          src={glbUrl}
          alt={glbCode}
          auto-rotate
          auto-rotate-delay="300"
          rotation-per-second="20deg"
          camera-controls
          touch-action="pan-y"
          shadow-intensity="1"
          shadow-softness="0.5"
          environment-image={ENV_PRESETS[envIdx].value}
          exposure="1.2"
          style={{
            width: '100%', height: '100%',
            background: 'transparent',
            '--poster-color': 'transparent',
            '--progress-bar-color': '#4a90d9',
            '--progress-mask': 'transparent',
          }}
        />
        {/* hint */}
        {ready && !err && (
          <div style={{
            position:'absolute', bottom:4, left:0, right:0,
            textAlign:'center', color:'rgba(255,255,255,0.25)',
            fontSize:9, pointerEvents:'none', userSelect:'none',
          }}>
            🖱 ลาก = หมุน · Scroll = ซูม
          </div>
        )}
        {/* error overlay */}
        {err && (
          <div style={{
            position:'absolute', inset:0, display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:6,
            background:'rgba(10,10,20,0.92)', borderRadius:'1rem',
          }}>
            <span style={{ fontSize:32 }}>📦</span>
            <span style={{ fontSize:11, color:'#777' }}>ยังไม่มีไฟล์ 3D</span>
            <span style={{ fontSize:9, color:'#555', fontFamily:'monospace' }}>{glbCode}</span>
          </div>
        )}
      </div>

      {/* ── Controls bar ── */}
      {!err && (
        <div style={{ display:'flex', gap:6, marginTop:8, flexWrap:'wrap', alignItems:'center' }}>
          {/* Environment color dots */}
          {ENV_PRESETS.map((env, idx) => (
            <button
              key={env.value}
              title={env.label}
              onClick={() => setEnvIdx(idx)}
              style={{
                width:22, height:22, borderRadius:'50%',
                background: env.bg, padding:0, flexShrink:0,
                border: idx === envIdx ? '2px solid #4a90d9' : '2px solid rgba(255,255,255,0.15)',
                cursor:'pointer',
                boxShadow: idx === envIdx ? '0 0 8px #4a90d9' : 'none',
                transition:'all 0.15s',
              }}
            />
          ))}

          {/* divider */}
          <div style={{ width:1, height:18, background:'rgba(255,255,255,0.15)', margin:'0 2px' }} />

          {/* Auto-rotate Light */}
          <button
            title={autoLight ? 'หยุดหมุนแสง' : 'หมุนแสงรอบๆ'}
            onClick={() => setAutoLight(v => !v)}
            style={{
              padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600,
              cursor:'pointer', border:'none',
              background: autoLight
                ? 'linear-gradient(90deg,#f6d365,#fda085)'
                : 'rgba(255,255,255,0.12)',
              color: autoLight ? '#1a1a1a' : 'rgba(255,255,255,0.7)',
              boxShadow: autoLight ? '0 0 10px rgba(253,160,133,0.5)' : 'none',
              transition:'all 0.2s',
              display:'flex', alignItems:'center', gap:4,
            }}
          >
            <span style={{ display:'inline-block', animation: autoLight ? 'spinLight 1s linear infinite' : 'none' }}>☀️</span>
            {autoLight ? 'หยุด' : 'หมุนแสง'}
            <style>{`@keyframes spinLight{to{transform:rotate(360deg)}}`}</style>
          </button>

          {/* Manual light slider */}
          {!autoLight && (
            <input
              type="range" min={0} max={360} value={lightRot}
              title="ปรับทิศแสง"
              onChange={e => {
                const val = Number(e.target.value);
                setLightRot(val);
                if (mvRef.current) {
                  mvRef.current.style.setProperty('--env-rotation', `${val}deg`);
                }
              }}
              style={{ flex:1, minWidth:60, maxWidth:100, accentColor:'#4a90d9', cursor:'pointer' }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function ACGearMotorFlow({ acState, acSetters, onConfirm }) {
  const { acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio , acConfirm } = acState;
    const [qtyGear, setQtyGear] = useState(1);
  const [qtyMotor, setQtyMotor] = useState(1);
  const [qtyCtrl, setQtyCtrl] = useState(1);
  const [showQuote, setShowQuote] = useState(false);
  const [qName, setQName]       = useState('');
  const [qCompany, setQCompany] = useState('');
  const [qPhone, setQPhone]     = useState('');
  const [qEmail, setQEmail]     = useState('');
  const [ctrlModel, setCtrlModel] = useState("");
  const [hoveredCtrl, setHoveredCtrl] = useState(null); // 'US' | 'UX' | null
  // ===== ADD: variable-speed + controller options (component scope) =====
  const motorTypeNorm = (acMotorType || "").trim().toLowerCase();
  const isVariable = motorTypeNorm === "variable speed motor" || motorTypeNorm.includes("variable");

  const powerKey = (() => {
  const s = (acPower || "").toString();
  const m = s.match(/(\d+)\s*W/i);
  return m ? `${m[1]}W` : "";
})();

  const controllerOptions = CONTROLLER_MAP[powerKey] || [];

// ===== ADD: auto set default controller model when variable speed motor =====
  useEffect(() => {
    if (isVariable) {
      setCtrlModel(controllerOptions[0] || "");
    } else {
      setCtrlModel("");
    }
  }, [isVariable, powerKey]);
  const [sending, setSending] = useState(false);
  const [salePerson, setSalePerson]           = useState('');
  const [showSalePersonPicker, setShowSalePersonPicker] = useState(false);
 // อ้างอิงกล่อง Summary เพื่อจับภาพ
 const summaryRef = useRef(null);

 // โหลดสคริปต์ภายนอกแบบ on-demand
 const ensureLib = (src, globalKey) =>
   new Promise((resolve, reject) => {
     if (globalKey && window[globalKey]) return resolve();
     const s = document.createElement('script');
     s.src = src; s.async = true;
     s.onload = () => resolve();
     s.onerror = () => reject(new Error('load-failed:' + src));
     document.head.appendChild(s);
   });

 // ตั้งค่า EmailJS
 const EMAILJS_SERVICE_ID = 'service_fwgn6cw';
 const EMAILJS_TEMPLATE_ID = 'template_7eppr2x';
 const EMAILJS_PUBLIC_KEY  = 'BvIT5-X7LnkaS3LKq'.trim();

 // แปลง Blob → base64
 const blobToBase64 = (blob) =>
   new Promise((resolve) => {
     const r = new FileReader();
     r.onloadend = () => resolve(String(r.result).split(',')[1]);
     r.readAsDataURL(blob);
   });

  const frameSizeMap = {
    '10W AC Motor': '60mm',
    '15W AC Motor': '70mm',
    '25W AC Motor': '80mm',
    '40W AC Motor': '90mm',
    '60W AC Motor': '90mm',
    '90W AC Motor': '90mm',
    '120W AC Motor': '90mm',
    '140W AC Motor': '104mm',
    '200W AC Motor': '104mm'
  };

const getShaftDia = (power, gear) => {
    if (!power || !gear) return null;

    const map = {
      '10W AC Motor': {
        'SQUARE BOX (Low)': 'Ø8 mm',
      },
      '15W AC Motor': {
        'SQUARE BOX (Low)': 'Ø10 mm',
      },
      '25W AC Motor': {
        'SQUARE BOX (Low)': 'Ø10 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø15 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø12 mm',
      },
      '40W AC Motor': {
        'SQUARE BOX (Low)': 'Ø12 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '60W AC Motor': {
        'SQUARE BOX (Low)': 'Ø12 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '90W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '120W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '140W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø22 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø20 mm',
      },
      '200W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø22 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø20 mm',
      },
    };

    return map[power]?.[gear] || null;
  };

// NEW: map AC Power -> base PDF filename in /public/model/pdf/AC
const powerToPdf = (power) => {
  if (!power) return null;
  const key = String(power).trim();
  const map = {
    '10W AC Motor':  '10W.pdf',
    '15W AC Motor':  '15W.pdf',
    '25W AC Motor':  '25W.pdf',
    '40W AC Motor':  '40W.pdf',
    '60W AC Motor':  '60W.pdf',
    '90W AC Motor':  '90W.pdf',
    '120W AC Motor': '120W.pdf',
    '140W AC Motor': '140W.pdf',
    '200W AC Motor': '200W.pdf',
  };
  return map[key] || null;
};

// NEW: Play custom thank-you audio from public/
const playThanksAudio = () => {
  try {
    const audio = new Audio('/model/pdf/AC/sexy_thank_you.MP3');
    audio.play().catch(() => {});
  } catch (_) {}
};

// [ADD] AC: แยก code จาก Model Code เช่น 6IK200GU-CF-6GU12.5KB
function splitACModelCode(full) {
  const s = String(full || '').trim();
  const parts = s.split('-').filter(Boolean);

  const motorCode = parts.slice(0, 2).join('-');
  const gearCode  = parts.slice(2).join('-');

  return { motorCode, gearCode };
}

  const handleRequestQuote = () => setShowQuote(true);

  const submitQuote = async () => {
    if (!qName || !qCompany || !qPhone || !qEmail) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง'); 
      return;
    }

    try {
      setSending(true);

      const raw  = generateACModelCode({ ...acState, acConfirm: true });
      const list = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw.flat() : raw) : (raw ? [raw] : []);
      const chosenModel =
        (typeof selectedModel === 'string' && selectedModel) ||
        (list && list[0]) ||
        '';

      if (!chosenModel) {
        alert('ไม่พบ Model Code'); 
        return;
      }

    const { motorCode, gearCode } = splitACModelCode(chosenModel);

      const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/ac-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelCode: chosenModel,
          motorCode,
          gearCode,
          qtyMotor,
          qtyGear,
          customer: { name: qName, company: qCompany, phone: qPhone, email: qEmail },
          controllerModel: isVariable ? ctrlModel : "",
          qtyCtrl: isVariable ? qtyCtrl : 0,
          salePerson: salePerson
        })
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(msg || 'สร้างใบเสนอราคาไม่สำเร็จ');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const cd = res.headers.get('content-disposition') || '';
      const match = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)"?/i);
      const filenameFromServer = match ? decodeURIComponent(match[1]) : 'quotation.pdf';

      try {
        const pdfBase64 = await blobToBase64(blob);
        const emailParams = {
          to_email:       qEmail,
          requester_name: qName,
          company:        qCompany,
          phone:          qPhone,
          email:          qEmail,
          model_code:     chosenModel,
          motor_code:     motorCode,
          gear_code:      gearCode,
          qty_motor:      String(qtyMotor),
          qty_gear:       String(qtyGear),
          qty_ctrl:       String(isVariable ? qtyCtrl : 0),
          controller:     isVariable ? ctrlModel : '-',
          sale_person:    salePerson || 'CA',
          time:           new Date().toLocaleString('th-TH'),
          pdf_content:    pdfBase64,
          pdf_name:       filenameFromServer,
        };
        const ejs = emailjs;
        await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: qEmail }, EMAILJS_PUBLIC_KEY);
        await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: 'Chottanin@synergy-as.com' }, EMAILJS_PUBLIC_KEY);
        await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: 'sas04@synergy-as.com' }, EMAILJS_PUBLIC_KEY);
      } catch (e) {
        console.error('EmailJS send failed:', e);
      }

      const a = document.createElement('a');
      a.href = url;
      a.download = filenameFromServer;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);

      setShowQuote(false);

    } catch (err) {
      alert(String(err?.message || err));
    } finally {
      setSending(false);
    }
  };

// NEW: Download PDF from /model/pdf/AC/<power>.pdf with filename = <ModelCode>.pdf
const handleDownloadPDF = async () => {
  try {
       
        playThanksAudio();
    const raw = generateACModelCode({ ...acState, acConfirm: true });
    const list = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw.flat() : raw) : (raw ? [raw] : []);
    const chosenModel = (list && list[0]) || 'SAS_Model';

    const basePdf = powerToPdf(acPower);
    if (!basePdf) {
      alert('ไม่พบไฟล์ PDF สำหรับกำลังไฟนี้');
      return;
    }

    const url = `/model/pdf/AC/${basePdf}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('PDF not found');
    const blob = await res.blob();

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${chosenModel}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);

    speakThanks();
    setTimeout(() => {
      alert('ขอบคุณสำหรับการดาวน์โหลดไฟล์ จะดีกว่านี้หากท่านกดสั่งซื้อด้วย อิอิ');
    }, 200);
  } catch (err) {
    console.error('Download PDF error:', err);
    alert('ขอบคุณสำหรับการดาวน์โหลดไฟล์ ');
  }
};

// แก้ชื่อไฟล์ได้ตามที่คุณมีใน public/model/img/ac/
const getGearPreviewUrl = (gear) => {
  if (!gear) return null;

  const filenameMap = {
    'SQUARE Box (Low)': 'square_box_low.png',
    'SQUARE BOX (Low)': 'square_box_low.png',
    'SQUARE Box': 'square_box.png',
    'SQUARE BOX': 'square_box.png',
    'SQUARE BOX WITH WING': 'square_box_wing.png',
    'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'right_angle_hollow.png',
    'RIGHT ANGLE GEAR/SOLID SHAFT': 'right_angle_solid.png',
  };

  const file = filenameMap[gear];
  return file ? `/model/img/ac/${file}` : null;
};


  // NEW: Current(A) & Rated speed by MotorType x Power x Voltage (AC only)
  const getCurrentRated = (motorType, power, voltage) => {
    if (!motorType || !power || !voltage) return null;
    const phase = String(voltage).startsWith('1') ? '1P'
                : String(voltage).startsWith('3') ? '3P'
                : null;

    const MAP = {
      'Induction Motor': {
        '10W AC Motor': {
          '1P': { current: '0.130 , 0.130', rated: '1200 , 1450' },
          '3P': { current: '0.076 , 0.065', rated: '1200 , 1450' },
        },
        '15W AC Motor': {
          '1P': { current: '0.18 , 0.16', rated: '1200 , 1450' },
          '3P': { current: '0.14 , 0.12', rated: '1200 , 1450' },
        },
        '25W AC Motor': {
          '1P': { current: '0.23 , 0.23', rated: '1250 , 1550' },
          '3P': { current: '0.185 , 0.170', rated: '1250 , 1550' },
        },
        '40W AC Motor': {
          '1P': { current: '0.35 , 0.35', rated: '1250 , 1550' },
          '3P': { current: '0.30 , 0.25', rated: '1250 , 1550' },
        },
        '60W AC Motor': {
          '1P': { current: '0.50 , 0.50', rated: '1250 , 1550' },
          '3P': { current: '0.45 , 0.40', rated: '1250 , 1550' },
        },
        '90W AC Motor': {
          '1P': { current: '0.72 , 0.71', rated: '1250 , 1550' },
          '3P': { current: '0.60 , 0.55', rated: '1250 , 1550' },
        },
        '120W AC Motor': {
          '1P': { current: '1.0 , 1.0', rated: '1250 , 1550' },
          '3P': { current: '0.70 , 0.60', rated: '1250 , 1550' },
        },
        '140W AC Motor': {
          '1P': { current: '1.05 , 1.05', rated: '1350 , 1600' },
          '3P': { current: '0.85 , 0.75', rated: '1250 , 1550' },
        },
        '200W AC Motor': {
          '1P': { current: '1.40 , 1.40', rated: '1250 , 1550' },
          '3P': { current: '1.20 , 1.0',  rated: '1250 , 1550' },
        },
      },

      'Reversible Motor': {
        '10W AC Motor':  { '1P': { current: '0.145 , 0.150', rated: '1200 , 1450' } },
        '15W AC Motor':  { '1P': { current: '0.23 , 0.20',  rated: '1200 , 1450' } },
        '25W AC Motor':  { '1P': { current: '0.29 , 0.35',  rated: '1250 , 1550' } },
        '40W AC Motor':  { '1P': { current: '0.45 , 0.45',  rated: '1250 , 1550' } },
        '60W AC Motor':  { '1P': { current: '0.55 , 0.55',  rated: '1250 , 1550' } },
        '90W AC Motor':  { '1P': { current: '0.82 , 0.81',  rated: '1250 , 1550' } },
        '120W AC Motor': { '1P': { current: '1.15 , 1.20', rated: '1250 , 1550' } },
        '140W AC Motor': {
          '1P': { current: '1.05 , 1.05', rated: '1250 , 1550' },
          '3P': { current: '0.85 , 0.75', rated: '1250 , 1550' },
        },
        '200W AC Motor': {
          '1P': { current: '1.40 , 1.40', rated: '1250 , 1550' },
          '3P': { current: '1.20 , 1.00', rated: '1250 , 1550' },
        },
      },

      'Variable Speed Motor': {
        '10W AC Motor':  { '1P': { current: '0.130 , 0.140', rated: '90~1350  , 90~1650' } },
        '15W AC Motor':  { '1P': { current: '0.18 , 0.16',   rated: '90~1350  , 90~1650' } },
        '25W AC Motor':  { '1P': { current: '0.25 , 0.23',   rated: '90~1350  , 90~1650' } },
        '40W AC Motor':  { '1P': { current: '0.35 , 0.35',   rated: '90~1350  , 90~1650' } },
        '60W AC Motor':  { '1P': { current: '0.50 , 0.50',   rated: '90~1350  , 90~1650' } },
        '90W AC Motor':  { '1P': { current: '0.72 , 0.71',   rated: '90~1350  , 90~1650' } },
        '120W AC Motor': { '1P': { current: '0.95 , 0.95',   rated: '90~1350  , 90~1650' } },
        '140W AC Motor': { '1P': { current: '1.05 , 1.05',   rated: '90~1350  , 90~1650' } },
        '200W AC Motor': { '1P': { current: '1.40 , 1.40',   rated: '90~1350  , 90~1650' } },
      },
    };

    return MAP[motorType]?.[power]?.[phase] || null;
  };

  const [selectedModel, setSelectedModel] = useState(null);
  const [showAcFinal, setShowAcFinal] = React.useState(false);

  // Optional (multi-select + confirm)
  const [optSelected, setOptSelected] = useState(
    Array.isArray(acOption) ? acOption : (acOption ? [acOption] : [])
  );
  const [optConfirmed, setOptConfirmed] = useState(!!acOption);

  const update = (key, value) => {
    const setterMap = {
      acMotorType: acSetters.setAcMotorType,
      acPower: acSetters.setAcPower,
      acVoltage: acSetters.setAcVoltage,
      acOption: acSetters.setAcOption,
      acGearHead: acSetters.setAcGearHead,
      acRatio: acSetters.setAcRatio
    };
    setterMap[key]?.(value);
  };

  const codes = generateACModelCode(acState);
   // เลือก GIF ตามหัวเกียร์ที่กำลังเลือกอยู่
const gifForHead = (() => {
  if (acGearHead === 'RIGHT ANGLE GEAR/HOLLOW SHAFT') return RC3D;
  if (acGearHead === 'RIGHT ANGLE GEAR/SOLID SHAFT')  return RT3D;
  if (acGearHead === 'SQUARE BOX')                    return KB3D;
  if (acGearHead === 'SQUARE BOX (Low)')              return KB3D;
  if (acGearHead === 'SQUARE BOX WITH WING')          return K3D;
  return null;
})();

  // --- Optional lists/filters ---
  const smallPowers = ['10W AC Motor','15W AC Motor','25W AC Motor','40W AC Motor'];
  const highPowers  = ['60W AC Motor','90W AC Motor','120W AC Motor','140W AC Motor','200W AC Motor'];

  const baseOptions = [
    { label: 'Standard', img: StdImg },
    { label: 'With Fan', img: FanImg },
    { label: 'With Terminal Box', img: TmbImg },
    { label: 'With Electromagnetic Brake', img: EmbImg },
    { label: 'With Force Cooling Fan', img: FcfImg },
    { label: 'With Thermal Protector', img: TmpImg }
  ];

  const optionalList = baseOptions.filter(o => {
    if (o.label === 'With Fan' && smallPowers.includes(acPower)) return false;
    if (o.label === 'Standard' && highPowers.includes(acPower)) return false;
    return true;
  });

  const toggleOpt = (label) => {
    setOptSelected(prev => {
      if (label === 'Standard') return ['Standard'];
      const base = prev.includes('Standard') ? [] : [...prev];
      if (base.includes(label)) return base.filter(x => x !== label);
      if (base.length >= 5) return base;
      return [...base, label];
    });
  };
  const isSelected = (label) => optSelected.includes(label);

  return (
    <div className="space-y-6 mt-6">
      {/* Motor Type */}
      {!acMotorType && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Motor Type : เลือกประเภทของมอเตอร์</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Induction Motor', img: InductionImg },
              { label: 'Reversible Motor', img: ReversibleImg },
              { label: 'Variable Speed Motor', img: VariableImg }
            ].map(({ label, img }) => (
              <button
                key={label}
                onClick={() => update('acMotorType', label)}
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
              >
                <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
          <p className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            Variable Speed motor ความเร็วรอบ 90-1350 rpm จำเป็นต้องมี Speed controller ควบคุม (SAS Model: UX52..W)
          </p>
        </div>
      )}

      {/* Power */}
      {acMotorType && !acPower && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Power Motor : กำลังของมอเตอร์</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: '10W AC Motor', img: W10Img },
              { label: '15W AC Motor', img: W15Img },
              { label: '25W AC Motor', img: W25Img },
              { label: '40W AC Motor', img: W40Img },
              { label: '60W AC Motor', img: W60Img },
              { label: '90W AC Motor', img: W90Img },
              { label: '120W AC Motor', img: W120Img },
              { label: '140W AC Motor', img: W140Img },
              { label: '200W AC Motor', img: W200Img }
            ].map(({ label, img }) => (
              <button
                key={label}
                onClick={() => update('acPower', label)}
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
              >
                <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
                    <button
  onClick={() => update('acMotorType', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-green-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-green-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-green-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
        </div>
      )}

      {/* Voltage */}
{acPower && !acVoltage && (
  <div>
    <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      Voltage : แรงดันไฟฟ้า
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {[
        { label: '1Phase220V AC 50Hz', img: SingleImg },
        { label: '3Phase220V AC 50Hz', img: ThreeImg }
      ]
        .filter(v =>
          acMotorType === 'Variable Speed Motor' ? v.label.startsWith('1Phase') : true
        )
        .map(({ label, img }) => (
          <button
            key={label}
            onClick={() => update('acVoltage', label)}
            className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
          >
            <img src={img} alt={label} className="h-64 mb-2 object-contain" />
            <span className="text-sm font-semibold">{label}</span>
          </button>
        ))}
    </div>

    <button
      onClick={() => update('acPower', null)}
      className="fixed z-30 px-1 py-0.5 rounded text-white/70 
                 bg-green-400/20 backdrop-blur-sm border border-white/20 shadow-sm
                 hover:text-white hover:bg-green-500 hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-green-400/60
                 active:scale-95 transition-all duration-200"
      style={{
        left: 'max(1rem, env(safe-area-inset-left))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      ย้อนกลับ
    </button>
  </div>
)}
      {/* Optional (multi-select + next) */}
      {acPower && acVoltage && !optConfirmed && !acGearHead && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Motor Optional : เลือกอุปกรณ์เสริม</h3>

          {smallPowers.includes(acPower) ? (
            <p className="text-white/80 mb-2">รุ่น {acPower} ไม่ต้องใช้พัดลม</p>
          ) : (
            <p className="text-red-600 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              **AC Motor 60W-200W ควรเลือกปุ่ม "With Fan"
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {optionalList.map(({ label, img }) => (
              <button
                key={label}
                onClick={() => toggleOpt(label)}
                className={
                  "flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition " +
                  "transform hover:-translate-y-1 active:scale-105 " +
                  (isSelected(label) ? "ring-4 ring-green-500" : "")
                }
              >
                <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>

          <div className="fixed z-30 px-1 py-0.5 rounded text-white/80"style={{
    left: 'max(25rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}>
            เลือกได้สูงสุด 5 ตัวเลือก (หากไม่ต้องการ Optionsเสริม : เลือก"With FAN")
          </div>

          <div className="flex justify-end mt-4">
  {optSelected.length > 0 && (
    <button
      onClick={() => {
        const finalSel = optSelected.length
          ? optSelected
          : (highPowers.includes(acPower) ? ['With Fan'] : ['Standard']);
        update('acOption', finalSel);
        setOptConfirmed(true);
      }}
      className="fixed z-30 px-1 py-0.5 rounded text-white/70 
                 bg-green-400/20 backdrop-blur-sm border border-white/20 shadow-sm
                 hover:text-white hover:bg-green-500 hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-green-400/60
                 active:scale-95 transition-all duration-200"
      style={{
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      ถัดไป
    </button>
  )}
                     </div>
<button
  onClick={() => update('acVoltage', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-green-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-green-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-green-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
        </div>
      )}

      {/* Gear Type */}
      {acOption && optConfirmed && !acGearHead && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Gear Type : เลือกชนิดหัวเกียร์</h3>
          {(() => {
            const gearOptionsByPower = () => {
              switch (acPower) {
                case '10W AC Motor':
                case '15W AC Motor':
                  return [{ label: 'SQUARE BOX (Low)', img: GBKlowImg }];
                case '25W AC Motor':
                case '40W AC Motor':
                  return [
                    { label: 'SQUARE BOX (Low)', img: GBKlowImg },
                    { label: 'RIGHT ANGLE GEAR/HOLLOW SHAFT', img: GBRCImg },
                    { label: 'RIGHT ANGLE GEAR/SOLID SHAFT', img: GBRTImg },
                  ];
                case '60W AC Motor':
                  return [
                    { label: 'SQUARE BOX WITH WING', img: GBKImg },
                    { label: 'SQUARE BOX', img: GBKBImg },
                    { label: 'RIGHT ANGLE GEAR/HOLLOW SHAFT', img: GBRCImg },
                    { label: 'RIGHT ANGLE GEAR/SOLID SHAFT', img: GBRTImg },
                  ];
                default:
                  return [
                    { label: 'SQUARE BOX WITH WING', img: GBKImg },
                    { label: 'SQUARE BOX', img: GBKBImg },
                    { label: 'RIGHT ANGLE GEAR/HOLLOW SHAFT', img: GBRCImg },
                    { label: 'RIGHT ANGLE GEAR/SOLID SHAFT', img: GBRTImg },
                  ];
              }
            };
            const options = gearOptionsByPower();

            return (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {options.map(({ label, img }) => (
                    <button
                      key={label}
                      onClick={() => update('acGearHead', label)}
                      className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
                    >
                      <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      update('acGearHead', null);
                      setOptConfirmed(false);
                    }}
                    className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-green-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-green-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-green-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
                    ย้อนกลับ
                  </button>

                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Step (AC): Ratio */}
{acGearHead && !acRatio && (
  <div>
    <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      Ratio : เลือกอัตราทดที่ต้องการ
    </h3>

    <div className="flex flex-col items-center gap-2">
      <p className="text-red-600 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        สูตรการหาความเร็วรอบ (rpm) = ความเร็วรอบมอเตอร์ / อัตราทด
      </p>
      <p className="text-white font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        เช่น มอเตอร์ 1Phase 220VAC, 4Pole, 1500 rpm, Gear Head อัตราทด 1:30 → 1500 / 30 = 50 rpm
      </p>

      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {[3,3.6,5,6,7.5,9,12.5,15,18,25,30,36,50,60,75,90,100,120,150,180,200].map(ratio => (
          <button
            key={ratio}
            onClick={(e) => (typeof clickSweep === 'function'
              ? clickSweep(e, () => update('acRatio', ratio))
              : update('acRatio', ratio))}
            className="bg-blue-200 hover:bg-blue-500 text-blue-900 hover:text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg transition"
            title={`อัตราทด 1:${ratio}`}
          >
            {ratio}
          </button>
        ))}
      </div>
      <button
  onClick={() => update('acGearHead', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-green-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-green-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-green-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
    </div>
  </div>
)}

{/* Step (AC): Summary */}
{acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && !showAcFinal && (
  <div id="ac-summary" className="relative max-w-4xl mx-auto mt-6 px-3 sm:px-0">
    <h3 className="text-white font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] flex items-center gap-3 flex-wrap">
  Model Code :{' '}
  <span className="font-mono text-white/90 px-2 py-0.5 rounded max-w-full">
    {(() => {
  const raw = generateACModelCode({ ...acState, acConfirm: true });
  const list = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw.flat() : raw) : (raw ? [raw] : []);
  if (!list.length) return null;
  return (
    <div className="flex flex-col items-start space-y-2 max-w-full">
      {list.map((code, idx) => (
        <label key={idx} className="flex items-center space-x-2">
          <input
            type="radio"
            name="modelSelect"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <span className="font-mono break-all text-[12px] sm:text-sm">{code}</span>
        </label>
      ))}
    </div>
  );
})()}
  </span>
<button
  type="button"
  title="Copy Model"
  className="ml-2 align-middle text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 hover:bg-white/20 transition"
  onClick={async (e) => {
  const btn = e.currentTarget;

  const raw  = generateACModelCode({ ...acState, acConfirm: true });
  const list = Array.isArray(raw)
    ? (Array.isArray(raw[0]) ? raw.flat() : raw)
    : (raw ? [raw] : []);

  const chosen = (typeof selectedModel === 'string' && selectedModel) || (list[0] || '');
  const txt = String(chosen);

  const setBadge = (el, msg = 'Copied!', ms = 1200) => {
    const old = el.textContent;
    el.textContent = msg;
    setTimeout(() => { el.textContent = old; }, ms);
  };

  const fallbackCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(ta);
  };

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(txt);
    } else {
      fallbackCopy();
    }
    setBadge(btn);
  } catch {
    fallbackCopy();
    setBadge(btn);
  }
}}
>
  Copy
</button>
</h3>
    <div className="flex flex-col md:flex-row gap-4 items-start">
    {/* === Mobile: 3D Viewer อยู่บน summaryRef === */}
    {acGearHead && (() => {
      const raw2 = generateACModelCode({ ...acState, acConfirm: true });
      const list2 = Array.isArray(raw2) ? (Array.isArray(raw2[0]) ? raw2.flat() : raw2) : (raw2 ? [raw2] : []);
      const chosenCode = (typeof selectedModel === 'string' && selectedModel) || (list2[0] || '');
      if (!chosenCode) return null;
      return (
        <div className="md:hidden w-full mb-3">
          <StepViewer3D modelCode={chosenCode} width="100%" aspect="4/3" />
        </div>
      );
    })()}
    <div
      ref={summaryRef}
      className="w-full md:flex-1 bg-black/25 rounded-xl px-3 sm:px-5 py-4 sm:py-5 text-white/90 backdrop-blur-sm
                text-[13px] sm:text-base leading-6 sm:leading-7 relative group
                overflow-y-auto md:max-h-[58vh]"
    >
      <div>Motor Type : <b>{acMotorType||'-'}</b></div>
      <div>Frame size : <b>{frameSizeMap[acPower] || '—'}</b></div>
      <div>Motor Power : <b>{acPower||'-'}</b></div>
      <div>Voltage : <b>{acVoltage||'-'}</b></div>
      <div>Frequency : <b>50Hz , 60Hz</b></div>
      {(() => {
  const cr = getCurrentRated(acMotorType, acPower, acVoltage);
  return (
    <>
      <div>Current (A) : <b>{cr?.current || '—'}</b></div>
      <div>Rated speed motor(rpm) : <b>{cr?.rated || '—'}</b></div>
    </>
  );
})()}
      <div>Optional : <b>{acOption||'-'}</b></div>
      <div>Gear Type : <b>{acGearHead||'-'}</b></div>
      <div>Ratio : <b>{acRatio}</b></div>
      <div>
        Output speed :
        <b>
          {(() => {
            const r = Number(acRatio);
            return Number.isFinite(r) && r > 0 ? (1500 / r).toFixed(2) : '-';
          })()}
        </b> rpm
      </div>
      <div>Output shaft diameter : <b>{
  (() => {
    const raw = generateACModelCode({ ...acState, acConfirm: true });
    const list = Array.isArray(raw)
      ? (Array.isArray(raw[0]) ? raw.flat() : raw)
      : (raw ? [raw] : []);

    const chosen = (typeof selectedModel === 'string' && selectedModel) || (list[0] || '');

    const suffixMatch = chosen.match(/(KB|RC|RT|K)\s*$/i);
    const head = (suffixMatch ? suffixMatch[1].toUpperCase() : null);

    const is60W = /\b60W\b/i.test(String(acPower));
    const isGN  = /GN/.test(chosen);
    const isGU  = /GU/.test(chosen);

    if (is60W) {
      if (isGN) return 'Ø12 mm';
      if (isGU) {
        if (head === 'RC') return 'Ø17 mm';
        if (head === 'RT') return 'Ø15 mm';
        return 'Ø15 mm';
      }
    }

    return getShaftDia ? (getShaftDia(acPower, acGearHead) || '—') : '—';
  })()
}</b></div>
      <div>Weight : <b>{(() => {
  // ── ตาราง base motor weight ──────────────────────────────────────────
  const MOTOR_WEIGHT = {
    'Induction Motor': {
      '10W AC Motor':  { base: 0.75, tb: 0.75,  emb: 1.10 },
      '15W AC Motor':  { base: 1.10, tb: 1.10,  emb: 1.47 },
      '25W AC Motor':  { base: 1.60, tb: 1.75,  emb: 2.15 },
      '40W AC Motor':  { base: 2.40, tb: 2.55,  emb: 3.10 },
      '60W AC Motor':  { base: 2.70, tb: 2.85,  emb: 3.55 },
      '90W AC Motor':  { base: 3.20, tb: 3.35,  emb: 4.30 },
      '120W AC Motor': { base: 3.40, tb: 3.55,  emb: 4.30 },
      '140W AC Motor': { base: 5.00, tb: 5.15,  emb: 5.87 },
      '200W AC Motor': { base: 5.00, tb: 5.15,  emb: 5.90 },
    },
    'Reversible Motor': {
      '10W AC Motor':  { base: 0.80, tb: 0.80,  emb: 1.10 },
      '15W AC Motor':  { base: 1.15, tb: 1.15,  emb: 1.47 },
      '25W AC Motor':  { base: 1.65, tb: 1.75,  emb: 2.15 },
      '40W AC Motor':  { base: 2.45, tb: 2.60,  emb: 3.10 },
      '60W AC Motor':  { base: 2.75, tb: 2.90,  emb: 3.55 },
      '90W AC Motor':  { base: 3.25, tb: 3.40,  emb: 4.30 },
      '120W AC Motor': { base: 3.45, tb: 3.60,  emb: 4.30 },
      '140W AC Motor': { base: 5.50, tb: 5.20,  emb: 5.87 },
      '200W AC Motor': { base: 5.50, tb: 5.20,  emb: 5.90 },
    },
    'Variable Speed Motor': {
      '10W AC Motor':  { base: 1.10, tb: 1.10,  emb: 1.10 },
      '15W AC Motor':  { base: 1.20, tb: 1.20,  emb: 1.47 },
      '25W AC Motor':  { base: 1.70, tb: 1.75,  emb: 2.15 },
      '40W AC Motor':  { base: 2.50, tb: 2.60,  emb: 3.10 },
      '60W AC Motor':  { base: 2.80, tb: 2.90,  emb: 3.55 },
      '90W AC Motor':  { base: 3.30, tb: 3.40,  emb: 4.30 },
      '120W AC Motor': { base: 3.50, tb: 3.60,  emb: 4.30 },
      '140W AC Motor': { base: 5.60, tb: 5.20,  emb: 5.87 },
      '200W AC Motor': { base: 5.60, tb: 5.20,  emb: 5.90 },
    },
  };

  // ── ตาราง gearhead weight ─────────────────────────────────────────────
  // 60W/90W/120W: GN→1.35, GU+KB→1.5, GU+K→1.55
  // 10W→0.40, 15W→0.50, 25W/40W→0.80, 140W/200W→2.1
  const getGearWeight = (power, chosen) => {
    const is60_90_120 = /\b(60|90|120)W\b/i.test(String(power));
    if (is60_90_120) {
      if (/GN/.test(chosen))  return 1.35;
      if (/GU/.test(chosen)) {
        if (/KB$/i.test(chosen)) return 1.50;
        if (/K$/i.test(chosen))  return 1.55;
        return 1.50;
      }
      return 1.35;
    }
    const map = {
      '10W AC Motor': 0.40,
      '15W AC Motor': 0.50,
      '25W AC Motor': 0.80,
      '40W AC Motor': 1.35,
      '140W AC Motor': 2.10,
      '200W AC Motor': 2.10,
    };
    return map[power] ?? null;
  };

  if (!acMotorType || !acPower) return '—';

  const wRow = MOTOR_WEIGHT[acMotorType]?.[acPower];
  if (!wRow) return '—';

  // ตรวจ option ที่เลือก
  const opts = Array.isArray(acOption) ? acOption : (acOption ? [acOption] : []);
  const hasEMB = opts.some(o => /electromagnetic brake/i.test(o));
  const hasTB  = opts.some(o => /terminal box/i.test(o));

  let motorW;
  if (hasEMB)      motorW = wRow.emb;
  else if (hasTB)  motorW = wRow.tb;
  else             motorW = wRow.base;

  // หา chosen model code (radio ที่เลือก หรือตัวแรก)
  const raw2 = generateACModelCode({ ...acState, acConfirm: true });
  const list2 = Array.isArray(raw2) ? (Array.isArray(raw2[0]) ? raw2.flat() : raw2) : (raw2 ? [raw2] : []);
  const chosenW = (typeof selectedModel === 'string' && selectedModel) || (list2[0] || '');

  const gearW = getGearWeight(acPower, chosenW);

  const motorStr = `Motor ${motorW.toFixed(2)} kg`;
  const gearStr  = gearW != null ? ` + Gearhead ${gearW.toFixed(2)} kg` : '';
  const totalW   = gearW != null ? motorW + gearW : motorW;
  const totalStr = gearW != null ? ` = Total ${totalW.toFixed(2)} kg` : '';

  return `${motorStr}${gearStr}${totalStr}`;
})()}</b></div>
    </div>
	{/* NEW: Gear preview image on the right side */}
{/* ===== ADD: Mobile Gear qty controls (show on phone, below spec) ===== */}
{acGearHead && (() => {
  return (
    <div className="md:hidden w-full mt-3 flex flex-col gap-2 bg-black/20 rounded-xl px-3 py-3">
        {/* Row 1 — Gear Head */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-white/90 select-none">Gear Head :</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="ลดจำนวน Gear Head"
              onClick={() => setQtyGear(q => Math.max(1, q - 1))}
              className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
            >–</button>
            <input
              type="number"
              min={1}
              step={1}
              value={qtyGear}
              onChange={(e) => {
                const v = Number(e.target.value);
                setQtyGear(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1);
              }}
              onWheel={(e) => e.currentTarget.blur()}
              className="w-20 text-center px-3 py-2 rounded-xl bg-white/90 text-slate-900 shadow outline-none"
            />
            <button
              type="button"
              aria-label="เพิ่มจำนวน Gear Head"
              onClick={() => setQtyGear(q => Math.min(999, q + 1))}
              className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
            >+</button>
          </div>
        </div>

        {/* Row 2 — AC Motor */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-white/90 select-none">AC Motor :</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="ลดจำนวน AC Motor"
              onClick={() => setQtyMotor(q => Math.max(1, q - 1))}
              className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
            >–</button>
            <input
              type="number"
              min={1}
              step={1}
              value={qtyMotor}
              onChange={(e) => {
                const v = Number(e.target.value);
                setQtyMotor(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1);
              }}
              onWheel={(e) => e.currentTarget.blur()}
              className="w-20 text-center px-3 py-2 rounded-xl bg-white/90 text-slate-900 shadow outline-none"
            />
            <button
              type="button"
              aria-label="เพิ่มจำนวน AC Motor"
              onClick={() => setQtyMotor(q => Math.min(999, q + 1))}
              className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
            >+</button>
          </div>
        </div>
                {/* Row 3 — Speed controller (Variable Speed Motor only) */}
{isVariable && (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <span className="text-white/90 select-none">Speed controller :</span>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setCtrlModel("")}
          className={`px-3 py-2 rounded-xl shadow outline-none border transition
            ${ctrlModel === ""
              ? "bg-green-300 text-slate-900 border-green-400"
              : "bg-white/90 text-slate-900 border-white/40 hover:bg-white"
            }`}
          title="No Controller"
        >
          No Ctrl
        </button>
        {controllerOptions.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setCtrlModel(m)}
            onMouseEnter={() => setHoveredCtrl(m.startsWith('US') ? 'US' : m.startsWith('UX') ? 'UX' : null)}
            onMouseLeave={() => setHoveredCtrl(null)}
            onTouchStart={() => setHoveredCtrl(m.startsWith('US') ? 'US' : m.startsWith('UX') ? 'UX' : null)}
            onTouchEnd={() => setTimeout(() => setHoveredCtrl(null), 2000)}
            className={`relative px-3 py-2 rounded-xl shadow outline-none border transition
              ${ctrlModel === m
                ? "bg-green-300 text-slate-900 border-green-400"
                : "bg-white/90 text-slate-900 border-white/40 hover:bg-white"
              }`}
            title={`เลือก ${m}`}
          >
            {m}
            {hoveredCtrl && ((m.startsWith('US') && hoveredCtrl === 'US') || (m.startsWith('UX') && hoveredCtrl === 'UX')) && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[9999] pointer-events-none">
                <img
                  src={hoveredCtrl === 'US' ? USImg : UXImg}
                  alt={hoveredCtrl}
                  className="w-[700px] h-auto rounded-xl shadow-2xl border-2 border-white object-contain bg-black/30"
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        aria-label="ลดจำนวน Speed controller"
        onClick={() => setQtyCtrl(q => Math.max(1, q - 1))}
        className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
      >–</button>
      <input
        type="number"
        min={1}
        step={1}
        value={qtyCtrl}
        onChange={(e) => {
          const v = Number(e.target.value);
          setQtyCtrl(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1);
        }}
        onWheel={(e) => e.currentTarget.blur()}
        className="w-20 text-center px-3 py-2 rounded-xl bg-white/90 text-slate-900 shadow outline-none"
      />
      <button
        type="button"
        aria-label="เพิ่มจำนวน Speed controller"
        onClick={() => setQtyCtrl(q => Math.min(999, q + 1))}
        className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
      >+</button>
    </div>
  </div>
)}
    </div>
  );

})()}

{/* NEW: Desktop — 3D viewer on top, qty controls below */}
{acGearHead && (() => {
  const raw3d = generateACModelCode({ ...acState, acConfirm: true });
  const list3d = Array.isArray(raw3d) ? (Array.isArray(raw3d[0]) ? raw3d.flat() : raw3d) : (raw3d ? [raw3d] : []);
  const code3d = (typeof selectedModel === 'string' && selectedModel) || (list3d[0] || '');
  return (
    <div
      className="hidden md:flex flex-col items-center gap-3"
      style={{ width: '38%', flexShrink: 0 }}
    >
      {/* 3D Viewer 4:3 */}
      <div className="w-full rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
        <StepViewer3D modelCode={code3d} width="100%" aspect="4/3" />
      </div>
      <div className="w-full flex flex-col gap-2">
    {/* Row 1 — Gear Head */}
    <div className="flex items-center justify-between gap-2">
      <span className="text-white/90 select-none">Gear Head :</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="ลดจำนวน Gear Head"
          onClick={() => setQtyGear(q => Math.max(1, q - 1))}
          className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
        >–</button>
        <input
          type="number"
          min={1}
          step={1}
          value={qtyGear}
          onChange={(e) => {
            const v = Number(e.target.value);
            setQtyGear(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1);
          }}
          onWheel={(e) => e.currentTarget.blur()}
          className="w-20 text-center px-3 py-2 rounded-xl bg-white/90 text-slate-900 shadow outline-none"
        />
        <button
          type="button"
          aria-label="เพิ่มจำนวน Gear Head"
          onClick={() => setQtyGear(q => Math.min(999, q + 1))}
          className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
        >+</button>
      </div>
    </div>

    {/* Row 2 — AC Motor */}
    <div className="flex items-center justify-between gap-2">
      <span className="text-white/90 select-none">AC Motor :</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="ลดจำนวน AC Motor"
          onClick={() => setQtyMotor(q => Math.max(1, q - 1))}
          className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
        >–</button>
        <input
          type="number"
          min={1}
          step={1}
          value={qtyMotor}
          onChange={(e) => {
            const v = Number(e.target.value);
            setQtyMotor(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1);
          }}
          onWheel={(e) => e.currentTarget.blur()}
          className="w-20 text-center px-3 py-2 rounded-xl bg-white/90 text-slate-900 shadow outline-none"
        />
        <button
          type="button"
          aria-label="เพิ่มจำนวน AC Motor"
          onClick={() => setQtyMotor(q => Math.min(999, q + 1))}
          className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
        >+</button>
      </div>
    </div>
    {/* Row 3 — Speed controller (เฉพาะ Variable Speed Motor) */}
    {acMotorType === 'Variable Speed Motor' && (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <span className="text-white/90 select-none">Speed controller :</span>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setCtrlModel("")}
          className={`px-3 py-2 rounded-xl shadow outline-none border transition
            ${ctrlModel === ""
              ? "bg-green-300 text-slate-900 border-green-400"
              : "bg-white/90 text-slate-900 border-white/40 hover:bg-white"
            }`}
          title="No Controller"
        >
          No Ctrl
        </button>
        {controllerOptions.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setCtrlModel(m)}
            onMouseEnter={() => setHoveredCtrl(m.startsWith('US') ? 'US' : m.startsWith('UX') ? 'UX' : null)}
            onMouseLeave={() => setHoveredCtrl(null)}
            onTouchStart={() => setHoveredCtrl(m.startsWith('US') ? 'US' : m.startsWith('UX') ? 'UX' : null)}
            onTouchEnd={() => setTimeout(() => setHoveredCtrl(null), 2000)}
            className={`relative px-3 py-2 rounded-xl shadow outline-none border transition
              ${ctrlModel === m
                ? "bg-green-300 text-slate-900 border-green-400"
                : "bg-white/90 text-slate-900 border-white/40 hover:bg-white"
              }`}
            title={`เลือก ${m}`}
          >
            {m}
            {hoveredCtrl && ((m.startsWith('US') && hoveredCtrl === 'US') || (m.startsWith('UX') && hoveredCtrl === 'UX')) && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[9999] pointer-events-none">
                <img
                  src={hoveredCtrl === 'US' ? USImg : UXImg}
                  alt={hoveredCtrl}
                  className="w-[700px] h-auto rounded-xl shadow-2xl border-2 border-white object-contain bg-white"
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        aria-label="ลดจำนวน Speed controller"
        onClick={() => setQtyCtrl(q => Math.max(1, q - 1))}
        className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
      >–</button>
      <input
        type="number"
        min={1}
        step={1}
        value={qtyCtrl}
        onChange={(e) => {
          const v = Number(e.target.value);
          setQtyCtrl(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1);
        }}
        onWheel={(e) => e.currentTarget.blur()}
        className="w-20 text-center px-3 py-2 rounded-xl bg-white/90 text-slate-900 shadow outline-none"
      />
      <button
        type="button"
        aria-label="เพิ่มจำนวน Speed controller"
        onClick={() => setQtyCtrl(q => Math.min(999, q + 1))}
        className="px-3 py-2 rounded-xl bg-white/85 text-slate-900 shadow hover:bg-white"
      >+</button>
    </div>
  </div>
)}
      </div>
    </div>
  );
})()}
    </div>
{showQuote && (
  <div className="fixed inset-0 z-[1200] flex items-center justify-center">
    <div className="absolute inset-0 bg-black/60" onClick={() => !sending && setShowQuote(false)} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-xl p-6 text-slate-900">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <h3 className="text-xl font-bold">ขอใบเสนอราคา</h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSalePersonPicker(v => !v)}
            title="เลือก Sale Person"
            className="text-2xl leading-none select-none hover:scale-110 active:scale-95 transition-transform"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}
          >
            🧑‍💼
          </button>
          {showSalePersonPicker && (
            <div className="absolute left-0 top-full mt-1 z-[9999] bg-white border border-slate-200 rounded-xl shadow-xl w-[260px] sm:w-[300px] overflow-hidden">
              {SALE_PERSONS.map(sp => (
                <button
                  key={sp.abbr}
                  type="button"
                  onClick={() => { setSalePerson(sp.abbr); setShowSalePersonPicker(false); }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-green-50 transition text-sm border-b last:border-b-0 ${salePerson === sp.abbr ? 'bg-green-100 font-semibold' : ''}`}
                >
                  <div className="font-semibold text-slate-800">{sp.name}</div>
                  <div className="text-slate-500 text-xs">{sp.position} · {sp.phone}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        {salePerson && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
            {SALE_PERSONS.find(s => s.abbr === salePerson)?.name || salePerson}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm mb-1">ชื่อผู้ขอราคา :</label>
          <input value={qName} onChange={e=>setQName(e.target.value)}
                 className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
        </div>
        <div>
          <label className="block text-sm mb-1">ชื่อบริษัท :</label>
          <input value={qCompany} onChange={e=>setQCompany(e.target.value)}
                 className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
        </div>
        <div>
          <label className="block text-sm mb-1">เบอร์ติดต่อ :</label>
          <input value={qPhone} onChange={e=>setQPhone(e.target.value)}
                 className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email :</label>
          <input type="email" value={qEmail} onChange={e=>setQEmail(e.target.value)}
                 className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
        </div>
      </div>

      <div className="mt-5 flex gap-3 justify-end">
        <button
          type="button"
          onClick={()=>setShowQuote(false)}
          disabled={sending}
          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
        >
          ปิด
        </button>
        <button
          type="button"
          onClick={submitQuote}
          disabled={sending || !qName || !qCompany || !qPhone || !qEmail}
          className="px-5 py-2 rounded-2xl bg-green-300 hover:bg-green-400 font-semibold shadow
                     active:scale-95 transition transform"
        >
          {sending ? 'กำลังส่ง…' : 'รับใบเสนอราคา'}
        </button>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        <div>Model: <b>{
          (() => {
            const raw = generateACModelCode({ ...acState, acConfirm: true });
            const list = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw.flat() : raw) : (raw ? [raw] : []);
            return (list && list[0]) || '—';
          })()
        }</b></div>
        <div className="flex gap-4 mt-1">
          <span>Gear Head: <b>{qtyGear}</b></span>
          <span>AC Motor: <b>{qtyMotor}</b></span>
          {acMotorType === 'Variable Speed Motor' && <span>Controller: <b>{qtyCtrl}</b></span>}
        </div>
      </div>
    </div>
  </div>
)}

{/* Bottom action bar */}
<div
  className="sticky bottom-0 md:fixed md:bottom-3 md:left-0 md:right-0 z-[1000] px-3"
  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
>
  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between bg-black/20 backdrop-blur-sm rounded-2xl p-2">
    {/* Left: Drawing PDF */}
    <button
      type="button"
      onClick={handleDownloadPDF}
      className="bg-white/90 text-slate-900 px-4 py-2.5 rounded-xl font-semibold shadow hover:bg-white
                 w-full sm:w-auto"
    >
      Drawing PDF
    </button>

    {/* Center: ขอใบเสนอราคา */}
    <button
      type="button"
      onClick={handleRequestQuote}
      className="bg-green-300 hover:bg-green-400 text-slate-900 px-4 py-2.5 rounded-2xl font-semibold shadow-lg
                 flex items-center justify-center gap-2 w-full sm:w-auto"
      title="ขอใบเสนอราคา"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M7 4a1 1 0 1 1 0-2h1a1 1 0 0 1 .95.684L9.76 4H19a1 1 0 0 1 .98 1.197l-1.5 9A1 1 0 0 1 17.5 15H9a1 1 0 0 1-.98-.804L6.24 5H4a1 1 0 1 1 0-2h3Zm3.28 11h7.96l1.17-7H10.45l.83 7ZM9 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18Z"/>
      </svg>
      ขอใบเสนอราคา
    </button>

    {/* Right: รับไฟล์ 3D */}
    <button
      type="button"
      className="btn-3d-rkfs px-6 py-2.5 font-bold w-full sm:w-auto"
      onClick={() => {
        const base = Array.isArray(codes)
          ? (Array.isArray(codes[0]) ? codes.flat() : codes)
          : (codes ? [codes] : []);
        const list = (selectedModel && base.length)
          ? [selectedModel, ...base.filter(c => c !== selectedModel)]
          : base;
        if (list.length) onConfirm(list);
      }}
    >
      รับไฟล์ 3D
    </button>
    <button
      type="button"
      onClick={() => update('acRatio', null)}
      className="md:hidden w-full text-center text-xs text-white/80 underline underline-offset-4 mt-1"
    >
      ย้อนกลับ
    </button>
  </div>
</div>
<button
  onClick={() => update('acRatio', null)}
  className="hidden md:block fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-green-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-green-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-green-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(31.8rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
  </div>
)}
      {/* Final */}
      {acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && showAcFinal &&  (
        <div className="text-center space-y-4 mt-6">
          <h2 className="text-2xl font-bold text-blue-700">
            {Array.isArray(codes) ? codes.join(', ') : codes}
          </h2>
    {gifForHead && (
      <div className="mt-6 flex justify-center">
        <div className="relative w-[280px] h-[560px] rounded-[3rem] bg-black p-4 shadow-2xl ring-1 ring-white/10">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl" />
          <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
            <img
              src={gifForHead}
              alt="Gear 3D preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    )}

          {Array.isArray(codes) && (
            <div className="flex flex-col items-center space-y-2">
              {codes.map((code, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="modelChoice"
                    value={code}
                    checked={selectedModel === code}
                    onChange={() => setSelectedModel(code)}
                  />
                  <span className="font-mono">{code}</span>
                </label>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              const finalCode = Array.isArray(codes) ? selectedModel : codes;
              if (finalCode) onConfirm(finalCode);
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            เสร็จสิ้น
          </button>

          <FinalResult
            modelCode={Array.isArray(codes) ? selectedModel : codes}
            downloadLink={`https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${Array.isArray(codes) ? selectedModel : codes}.STEP`}
            onReset={() => {
              acSetters.setAcMotorType(null);
              acSetters.setAcPower(null);
              acSetters.setAcVoltage(null);
              acSetters.setAcOption(null);
              acSetters.setAcGearHead(null);
              acSetters.setAcRatio(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
