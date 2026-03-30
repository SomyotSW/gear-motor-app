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
// เช่น 5IK90RGU-CF-5GU18KB  → 5IK90RGU-CF-5GU3KB
//      5IK120GU-CF-5GU200KB  → 5IK120GU-CF-5GU3KB
//      5IK60GN-CF-5GN200K    → 5IK60GN-CF-5GN3K
//      5IK40GU-CF-5GU7.5KB   → 5IK40GU-CF-5GU3KB
//
// Bug เดิม: regex  (K|KB|RC|RT)?(?=$|-)  มีปัญหา 2 จุด
//   1. ลำดับ K อยู่ก่อน KB ทำให้ regex กิน K แล้วเหลือ B
//      → lookahead (?=$|-) fail → ไม่ replace เลย
//   2. suffix เป็น optional (?) ทำให้บางครั้ง replace แค่ตัวเลข
//      แล้วทิ้ง suffix ไว้ → ชื่อไฟล์ผิด
// Fix: ใช้ alternation ที่เรียง KB/RC/RT ก่อน K และจับด้วย word-boundary/end
// ─────────────────────────────────────────────────────────────────────────────
function normalizeGlbCode(modelCode) {
  if (!modelCode) return modelCode;
  // จับ (frameNum)(GN|GU)(ratio)(KB|RC|RT|K) — KB/RC/RT ต้องอยู่ก่อน K เสมอ
  return modelCode.replace(
    /(\d+)(GN|GU)(\d+(?:\.\d+)?)(KB|RC|RT|K)(\b|$)/gi,
    (_, frame, gearType, _ratio, suffix) =>
      `${frame}${gearType.toUpperCase()}3${suffix.toUpperCase()}`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLB base URL — GitHub Releases (Vercel ไม่รองรับ LFS ให้ใช้ตรงนี้แทน)
// หลัง upload ไฟล์ GLB ขึ้น GitHub Releases tag "glb-v1" แล้ว
// ─────────────────────────────────────────────────────────────────────────────
// jsDelivr CDN — proxy GitHub Releases พร้อม CORS header ถูกต้อง
// ใช้ local path เมื่อรันใน localhost, ใช้ CDN เมื่อ deploy บน production
const GLB_BASE = (() => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/model/glb';  // local dev — ไฟล์อยู่ใน public/model/glb/
  }
  return 'https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev'; // production CDN
})();

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
  { label: 'Neutral',   value: 'neutral',  bg: 'linear-gradient(135deg,#5a5a5a,#3a3a3a)' },
  { label: 'Legacy',    value: 'legacy',   bg: 'linear-gradient(135deg,#7a8a9a,#5a6a7a)' },
  { label: 'Commerce',  value: 'commerce', bg: 'linear-gradient(135deg,#9a8a6a,#7a6a5a)' },
  { label: 'Sunset',    value: 'sunset',   bg: 'linear-gradient(135deg,#c87a4a,#8a4a2a)' },
  { label: 'Studio',    value: 'studio',   bg: 'linear-gradient(135deg,#8a7a9a,#6a5a7a)' },
  { label: 'Park',      value: 'park',     bg: 'linear-gradient(135deg,#5a8a5a,#3a6a3a)' },
  { label: 'Dawn',      value: 'dawn',     bg: 'linear-gradient(135deg,#9a7a5a,#7a5a3a)' },
  { label: 'Night',     value: 'night',    bg: 'linear-gradient(135deg,#2a2a5a,#1a1a3a)' },
];

const TINT_COLORS = [
  { label: 'Default', value: null,      bg: 'linear-gradient(135deg,#aaa,#666)' },
  { label: 'Silver',  value: '#d0d8e0', bg: 'linear-gradient(135deg,#d0d8e0,#9aa8b8)' },
  { label: 'Gold',    value: '#ffd060', bg: 'linear-gradient(135deg,#ffd060,#c08020)' },
  { label: 'Navy',    value: '#2050a0', bg: 'linear-gradient(135deg,#4070c0,#103060)' },
  { label: 'Red',     value: '#c02030', bg: 'linear-gradient(135deg,#e04050,#901020)' },
  { label: 'Green',   value: '#00a060', bg: 'linear-gradient(135deg,#00c070,#006040)' },
  { label: 'Black',   value: '#1a1a1a', bg: 'linear-gradient(135deg,#3a3a3a,#0a0a0a)' },
  { label: 'White',   value: '#f0f0f0', bg: 'linear-gradient(135deg,#ffffff,#cccccc)' },
];

// ─── normalizeGlbCode แล้วโหลดตรงเลย ไม่มี fallback ───────────────────────────
// ─── StepViewer3D — Full demo-style viewer ────────────────────────────────────
function StepViewer3D({ modelCode }) {
  const glbCode = normalizeGlbCode(modelCode || '');
  const fbCodes = glbCode ? [glbCode] : [];

  const mvRef   = React.useRef(null);
  const fbIdx   = React.useRef(0);

  const [err,     setErr]     = React.useState(false);
  const [ready,   setReady]   = React.useState(false);
  const [curCode, setCurCode] = React.useState(fbCodes[0] || glbCode);
  const [envIdx,  setEnvIdx]  = React.useState(0);
  const [tintIdx, setTintIdx] = React.useState(0);
  const [autoLight, setAutoLight] = React.useState(false);
  const [lightRot,  setLightRot]  = React.useState(0);
  const [exposure,  setExposure]  = React.useState(1.3);
  const [shadow,    setShadow]    = React.useState(0.6);
  const lightTimer = React.useRef(null);

  // reset เมื่อ model เปลี่ยน
  React.useEffect(() => {
    fbIdx.current = 0;
    setErr(false);
    setReady(false);
    setCurCode(glbCode);
  }, [glbCode]);

  // attach load/error listeners ทุกครั้งที่ curCode เปลี่ยน
  React.useEffect(() => {
    if (!curCode) return;
    const url = `${GLB_BASE}/${encodeURIComponent(curCode)}.glb`;

    // poll รอจนกว่า mvRef จะ ready (custom element อาจ mount ช้า)
    let cancelled = false;
    let attempts = 0;

    function attach() {
      const el = mvRef.current;
      if (cancelled) return;

      if (!el || !el.nodeName) {
        // ยังไม่ mount — รอ 50ms แล้วลองใหม่ (max 40 ครั้ง = 2s)
        if (attempts < 40) { attempts++; setTimeout(attach, 50); }
        return;
      }

      el.setAttribute('src', url);

      const onLoad = () => { if (!cancelled) { setReady(true); setErr(false); } };
      const onErr  = () => {
        if (cancelled) return;
        const codes = glbCode ? [glbCode] : [];
        fbIdx.current += 1;
        if (fbIdx.current < codes.length) {
          setCurCode(codes[fbIdx.current]);
        } else {
          setErr(true);
        }
      };

      el.addEventListener('load',  onLoad);
      el.addEventListener('error', onErr);

      // store cleanup
      el.__cleanup = () => {
        el.removeEventListener('load',  onLoad);
        el.removeEventListener('error', onErr);
      };
    }

    attach();

    return () => {
      cancelled = true;
      mvRef.current?.__cleanup?.();
    };
  }, [curCode]);

  // autoLight
  React.useEffect(() => {
    if (autoLight) {
      lightTimer.current = setInterval(() => {
        setLightRot(r => {
          const next = (r + 2) % 360;
          if (mvRef.current) mvRef.current.style.setProperty('--env-rotation', `${next}deg`);
          return next;
        });
      }, 30);
    } else { clearInterval(lightTimer.current); }
    return () => clearInterval(lightTimer.current);
  }, [autoLight]);

  // environment
  React.useEffect(() => {
    if (mvRef.current) mvRef.current.setAttribute('environment-image', ENV_PRESETS[envIdx].value);
  }, [envIdx]);

  // cleanup
  React.useEffect(() => {
    return () => clearInterval(lightTimer.current);
  }, []);
  const applyTint = (idx) => {
    setTintIdx(idx);
    const color = TINT_COLORS[idx].value;
    const applyColor = () => {
      try {
        const mats = mvRef.current?.model?.materials;
        if (!mats) return;
        if (!color) {
          [...mats].forEach(m => m.pbrMetallicRoughness.setBaseColorFactor([1,1,1,1]));
        } else {
          const r = parseInt(color.slice(1,3),16)/255;
          const g = parseInt(color.slice(3,5),16)/255;
          const b = parseInt(color.slice(5,7),16)/255;
          [...mats].forEach(m => m.pbrMetallicRoughness.setBaseColorFactor([r,g,b,1]));
        }
      } catch(e) {}
    };
    if (ready) applyColor();
    else mvRef.current?.addEventListener('load', applyColor, { once: true });
  };

  // shared inline styles (CSS-in-JS เพื่อไม่กระทบ Tailwind ของ host)
  const S = {
    wrap: { display:'flex', flexDirection:'column', width:'100%', height:'100%', minHeight:0, background:'#0a0c10', fontFamily:"'Sarabun',sans-serif" },
    viewer: { flex:1, minHeight:200, position:'relative', background:'linear-gradient(135deg,#0a0c10,#0d111c)', overflow:'hidden' },
    grid: { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,229,160,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,0.025) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' },
    mv: { width:'100%', height:'100%', '--poster-color':'transparent', '--progress-bar-color':'#00e5a0', '--progress-mask':'transparent', background:'transparent' },
    hint: { position:'absolute', bottom:10, left:0, right:0, textAlign:'center', color:'rgba(255,255,255,0.2)', fontSize:10, pointerEvents:'none', letterSpacing:'0.5px' },
    errorBox: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:'#0a0c10' },
    loaderBox: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, background:'linear-gradient(135deg,#0a0c10,#0d111c)', transition:'opacity 0.4s' },
    ring: { width:44, height:44, border:'2px solid rgba(0,229,160,0.15)', borderTopColor:'#00e5a0', borderRadius:'50%', animation:'mv3d-spin 0.9s linear infinite' },
    panel: { flex:'none', height:220, background:'#0f1118', borderTop:'1px solid rgba(255,255,255,0.07)', overflowY:'auto', display:'flex', flexDirection:'row', flexWrap:'wrap' },
    sec: { padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' },
    secTitle: { fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 },
    envGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:5 },
    envBtn: (active) => ({ aspectRatio:1, borderRadius:6, border: active ? '2px solid #00e5a0' : '2px solid transparent', cursor:'pointer', position:'relative', overflow:'hidden', transition:'all 0.15s', boxShadow: active ? '0 0 8px rgba(0,229,160,0.35)' : 'none' }),
    envLabel: { position:'absolute', bottom:0, left:0, right:0, fontSize:7, textAlign:'center', background:'rgba(0,0,0,0.65)', padding:'1px 0', color:'rgba(255,255,255,0.7)', fontWeight:600 },
    colorGrid: { display:'flex', gap:6, flexWrap:'wrap' },
    swatch: (active) => ({ width:24, height:24, borderRadius:'50%', border: active ? '2px solid white' : '2px solid transparent', cursor:'pointer', transition:'all 0.15s', position:'relative', flexShrink:0, transform: active ? 'scale(1.1)' : 'scale(1)' }),
    lightRow: { display:'flex', alignItems:'center', gap:8, marginBottom:8 },
    lightLbl: { fontSize:10, color:'#4a5060', width:44, flexShrink:0 },
    slider: { flex:1, accentColor:'#00e5a0', cursor:'pointer', height:3 },
    sliderVal: { fontSize:10, color:'#e8eaf0', width:30, textAlign:'right', flexShrink:0, fontFamily:'monospace' },
    toggle: (on) => ({ width:34, height:18, background: on ? '#00e5a0' : 'rgba(255,255,255,0.1)', borderRadius:9, position:'relative', cursor:'pointer', border:'none', transition:'background 0.2s', flexShrink:0 }),
    toggleDot: (on) => ({ position:'absolute', top:2, left: on ? 16 : 2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.4)' }),
  };

  return (
    <div style={S.wrap}>
      <style>{`@keyframes mv3d-spin{to{transform:rotate(360deg)}}`}</style>

      {/* ── LEFT: 3D Viewer ── */}
      <div style={S.viewer}>
        <div style={S.grid} />

        {/* Loader */}
        {!ready && !err && (
          <div style={S.loaderBox}>
            <div style={S.ring} />
            <span style={{ fontSize:11, color:'#4a5060', letterSpacing:'1px' }}>กำลังโหลดโมเดล…</span>
          </div>
        )}

        {/* Error */}
        {err && (
          <div style={S.errorBox}>
            <span style={{ fontSize:48 }}>📦</span>
            <span style={{ fontSize:12, color:'#556' }}>ยังไม่มีไฟล์ 3D</span>
            <span style={{ fontSize:9, color:'#3a4050', fontFamily:'monospace' }}>{curCode}</span>
          </div>
        )}

        <model-viewer
          ref={mvRef}
          src=""
          alt={curCode}
          auto-rotate
          auto-rotate-delay="400"
          rotation-per-second="18deg"
          camera-controls
          touch-action="pan-y"
          shadow-intensity="1.2"
          shadow-softness={shadow}
          environment-image="neutral"
          exposure={exposure}
          style={S.mv}
        />

        {ready && !err && (
          <div style={S.hint}>🖱 ลาก = หมุน &nbsp;·&nbsp; Scroll = ซูม</div>
        )}
      </div>

      {/* ── RIGHT: Controls Panel ── */}
      <div style={S.panel}>

        {/* Environment */}
        <div style={S.sec}>
          <div style={S.secTitle}>สภาพแวดล้อมแสง</div>
          <div style={S.envGrid}>
            {ENV_PRESETS.map((env, i) => (
              <button key={env.value} title={env.label} onClick={() => setEnvIdx(i)}
                style={{ ...S.envBtn(i === envIdx), background: env.bg }}>
                <span style={S.envLabel}>{env.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Controls */}
        <div style={S.sec}>
          <div style={S.secTitle}>ควบคุมแสง</div>
          <div style={S.lightRow}>
            <span style={S.lightLbl}>ความสว่าง</span>
            <input type="range" min={0.5} max={3} step={0.05} value={exposure} style={S.slider}
              onChange={e => { const v = parseFloat(e.target.value); setExposure(v); if(mvRef.current) mvRef.current.setAttribute('exposure', v); }} />
            <span style={S.sliderVal}>{exposure.toFixed(1)}</span>
          </div>
          <div style={S.lightRow}>
            <span style={S.lightLbl}>เงา</span>
            <input type="range" min={0} max={1} step={0.05} value={shadow} style={S.slider}
              onChange={e => { const v = parseFloat(e.target.value); setShadow(v); if(mvRef.current) mvRef.current.setAttribute('shadow-softness', v); }} />
            <span style={S.sliderVal}>{shadow.toFixed(1)}</span>
          </div>
          <div style={{ ...S.lightRow, marginBottom: autoLight ? 0 : 0 }}>
            <span style={S.lightLbl}>ทิศแสง</span>
            {autoLight ? (
              <span style={{ flex:1, fontSize:10, color:'#00e5a0' }}>⟳ หมุนอัตโนมัติ</span>
            ) : (
              <input type="range" min={0} max={360} step={1} value={lightRot} style={S.slider}
                onChange={e => { const v = parseInt(e.target.value); setLightRot(v); if(mvRef.current) mvRef.current.style.setProperty('--env-rotation', v+'deg'); }} />
            )}
            <span style={S.sliderVal}>{lightRot}°</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:10 }}>
            <span style={{ fontSize:10, color:'#4a5060' }}>☀️ หมุนแสงอัตโนมัติ</span>
            <button style={S.toggle(autoLight)} onClick={() => setAutoLight(v => !v)}>
              <div style={S.toggleDot(autoLight)} />
            </button>
          </div>
        </div>

        {/* Color Tint */}
        <div style={S.sec}>
          <div style={S.secTitle}>สีโมเดล</div>
          <div style={S.colorGrid}>
            {TINT_COLORS.map((c, i) => (
              <button key={c.label} title={c.label} onClick={() => applyTint(i)}
                style={{ ...S.swatch(i === tintIdx), background: c.bg }}>
                {i === tintIdx && (
                  <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'white', textShadow:'0 1px 3px rgba(0,0,0,0.8)' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
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

{/* Step (AC): Summary — Full demo-style layout */}
{acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && !showAcFinal && (
  <div id="ac-summary" style={{ position:'fixed', inset:0, zIndex:500, display:'flex', flexDirection:'column', background:'#0a0c10', fontFamily:"'Sarabun',sans-serif" }}>

    {/* Top bar */}
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 18px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'rgba(10,12,16,0.95)', backdropFilter:'blur(12px)', flexShrink:0, flexWrap:'wrap', gap:8 }}>
      <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'1.5px', color:'#00e5a0', textTransform:'uppercase' }}>
        ⚙ AC Gear Motor
      </span>
      <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
        {(() => {
          const raw = generateACModelCode({ ...acState, acConfirm: true });
          const list = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw.flat() : raw) : (raw ? [raw] : []);
          return list.map((code, idx) => (
            <label key={idx} style={{ display:'flex', alignItems:'center', gap:5, cursor:'pointer' }}>
              {list.length > 1 && (
                <input type="radio" name="modelSelect" value={code}
                  checked={selectedModel === code}
                  onChange={() => setSelectedModel(code)}
                  style={{ accentColor:'#00e5a0' }} />
              )}
              <span style={{ fontFamily:'monospace', fontSize:12, fontWeight:600, color:'#e8eaf0', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', padding:'3px 10px', borderRadius:5 }}>
                {code}
              </span>
            </label>
          ));
        })()}
        <button type="button"
          style={{ background:'none', border:'none', cursor:'pointer', color:'#00e5a0', fontSize:11, padding:'3px 8px', borderRadius:4 }}
          onClick={async (e) => {
            const btn = e.currentTarget;
            const raw = generateACModelCode({ ...acState, acConfirm: true });
            const list = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw.flat() : raw) : (raw ? [raw] : []);
            const chosen = (typeof selectedModel === 'string' && selectedModel) || (list[0] || '');
            try {
              if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(chosen); }
              else { const ta=document.createElement('textarea'); ta.value=chosen; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
            } catch {}
            const old = btn.textContent; btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = old; }, 1200);
          }}
        >Copy</button>
      </div>
      <button type="button" onClick={() => update('acRatio', null)}
        style={{ background:'rgba(0,229,160,0.08)', border:'1px solid rgba(0,229,160,0.25)', color:'#00e5a0', padding:'4px 12px', borderRadius:6, cursor:'pointer', fontSize:11, fontWeight:600 }}>
        ← ย้อนกลับ
      </button>
    </div>

    {/* Body: Viewer + Right Panel */}
    <div style={{ flex:1, display:'flex', minHeight:0, overflow:'hidden' }}>

      {/* 3D Viewer full height */}
      {(() => {
        const raw3d = generateACModelCode({ ...acState, acConfirm: true });
        const list3d = Array.isArray(raw3d) ? (Array.isArray(raw3d[0]) ? raw3d.flat() : raw3d) : (raw3d ? [raw3d] : []);
        const code3d = (typeof selectedModel === 'string' && selectedModel) || (list3d[0] || '');
        return (
          <div style={{ flex:1, minWidth:0, minHeight:0 }}>
            <StepViewer3D modelCode={code3d} />
          </div>
        );
      })()}

      {/* Right Panel */}
      <div style={{ width:280, flexShrink:0, background:'#0f1118', borderLeft:'1px solid rgba(255,255,255,0.07)', overflowY:'auto', display:'flex', flexDirection:'column' }}>

        {/* Specs */}
        <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 }}>ข้อมูลจำเพาะ</div>
          <div ref={summaryRef}>
            {[
              ['Motor Type',    acMotorType],
              ['Frame Size',    frameSizeMap[acPower] || '—'],
              ['Motor Power',   acPower],
              ['Voltage',       acVoltage],
              ['Frequency',     '50Hz , 60Hz'],
              ...((() => {
                const cr = getCurrentRated(acMotorType, acPower, acVoltage);
                return cr ? [['Current (A)', cr.current], ['Speed (rpm)', cr.rated]] : [];
              })()),
              ['Optional',      Array.isArray(acOption) ? acOption.join(', ') : acOption],
              ['Gear Type',     acGearHead],
              ['Ratio',         acRatio],
              ['Output Speed',  (() => { const r=Number(acRatio); return Number.isFinite(r)&&r>0 ? (1500/r).toFixed(2)+' rpm' : '—'; })()],
              ['Shaft Ø',       (() => {
                const rawS = generateACModelCode({ ...acState, acConfirm: true });
                const lstS = Array.isArray(rawS) ? (Array.isArray(rawS[0]) ? rawS.flat() : rawS) : (rawS ? [rawS] : []);
                const ch = (typeof selectedModel==='string'&&selectedModel)||(lstS[0]||'');
                const sm = ch.match(/(KB|RC|RT|K)\s*$/i);
                const hd = sm ? sm[1].toUpperCase() : null;
                if (/\b60W\b/i.test(String(acPower))) {
                  if (/GN/.test(ch)) return 'Ø12 mm';
                  if (/GU/.test(ch)) return hd==='RC' ? 'Ø17 mm' : 'Ø15 mm';
                }
                return getShaftDia ? (getShaftDia(acPower, acGearHead)||'—') : '—';
              })()],
              ['Weight', (() => {
                const MW = { 'Induction Motor':{'10W AC Motor':{base:0.75,tb:0.75,emb:1.10},'15W AC Motor':{base:1.10,tb:1.10,emb:1.47},'25W AC Motor':{base:1.60,tb:1.75,emb:2.15},'40W AC Motor':{base:2.40,tb:2.55,emb:3.10},'60W AC Motor':{base:2.70,tb:2.85,emb:3.55},'90W AC Motor':{base:3.20,tb:3.35,emb:4.30},'120W AC Motor':{base:3.40,tb:3.55,emb:4.30},'140W AC Motor':{base:5.00,tb:5.15,emb:5.87},'200W AC Motor':{base:5.00,tb:5.15,emb:5.90}},'Reversible Motor':{'10W AC Motor':{base:0.80,tb:0.80,emb:1.10},'15W AC Motor':{base:1.15,tb:1.15,emb:1.47},'25W AC Motor':{base:1.65,tb:1.75,emb:2.15},'40W AC Motor':{base:2.45,tb:2.60,emb:3.10},'60W AC Motor':{base:2.75,tb:2.90,emb:3.55},'90W AC Motor':{base:3.25,tb:3.40,emb:4.30},'120W AC Motor':{base:3.45,tb:3.60,emb:4.30},'140W AC Motor':{base:5.50,tb:5.20,emb:5.87},'200W AC Motor':{base:5.50,tb:5.20,emb:5.90}},'Variable Speed Motor':{'10W AC Motor':{base:1.10,tb:1.10,emb:1.10},'15W AC Motor':{base:1.20,tb:1.20,emb:1.47},'25W AC Motor':{base:1.70,tb:1.75,emb:2.15},'40W AC Motor':{base:2.50,tb:2.60,emb:3.10},'60W AC Motor':{base:2.80,tb:2.90,emb:3.55},'90W AC Motor':{base:3.30,tb:3.40,emb:4.30},'120W AC Motor':{base:3.50,tb:3.60,emb:4.30},'140W AC Motor':{base:5.60,tb:5.20,emb:5.87},'200W AC Motor':{base:5.60,tb:5.20,emb:5.90}} };
                const getGW = (pw,ch) => { if(/\b(60|90|120)W\b/i.test(String(pw))){ if(/GN/.test(ch)) return 1.35; if(/GU/.test(ch)){ return /KB$/i.test(ch)?1.50:/K$/i.test(ch)?1.55:1.50; } return 1.35; } return {'10W AC Motor':0.40,'15W AC Motor':0.50,'25W AC Motor':0.80,'40W AC Motor':1.35,'140W AC Motor':2.10,'200W AC Motor':2.10}[pw]??null; };
                if(!acMotorType||!acPower) return '—';
                const wr = MW[acMotorType]?.[acPower]; if(!wr) return '—';
                const opts2=Array.isArray(acOption)?acOption:(acOption?[acOption]:[]);
                const mw = opts2.some(o=>/electromagnetic brake/i.test(o))?wr.emb:opts2.some(o=>/terminal box/i.test(o))?wr.tb:wr.base;
                const rawW=generateACModelCode({...acState,acConfirm:true});
                const lstW=Array.isArray(rawW)?(Array.isArray(rawW[0])?rawW.flat():rawW):(rawW?[rawW]:[]);
                const chW=(typeof selectedModel==='string'&&selectedModel)||(lstW[0]||'');
                const gw=getGW(acPower,chW);
                return gw!=null ? `Motor ${mw.toFixed(2)} + Gear ${gw.toFixed(2)} = ${(mw+gw).toFixed(2)} kg` : `Motor ${mw.toFixed(2)} kg`;
              })()],
            ].map(([k, v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', gap:6 }}>
                <span style={{ fontSize:11, color:'#4a5060', flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:11, fontWeight:600, color: ['Motor Power','Output Speed','Ratio'].includes(k)?'#00e5a0':'#e8eaf0', textAlign:'right', wordBreak:'break-all' }}>{v||'—'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Qty Controls */}
        <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 }}>จำนวน</div>
          {[{ label:'Gear Head', val:qtyGear, set:setQtyGear },{ label:'AC Motor', val:qtyMotor, set:setQtyMotor }].map(({ label, val, set }) => (
            <div key={label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)' }}>{label}</span>
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                <button type="button" onClick={() => set(q => Math.max(1,q-1))} style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>–</button>
                <input type="number" min={1} max={999} value={val}
                  onChange={e => { const v=Number(e.target.value); set(Number.isFinite(v)?Math.max(1,Math.floor(v)):1); }}
                  onWheel={e => e.currentTarget.blur()}
                  style={{ width:38, textAlign:'center', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:5, color:'#e8eaf0', fontSize:13, fontWeight:700, padding:'2px 0' }} />
                <button type="button" onClick={() => set(q => Math.min(999,q+1))} style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>+</button>
              </div>
            </div>
          ))}
          {acMotorType === 'Variable Speed Motor' && (
            <div style={{ marginTop:4 }}>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.65)', marginBottom:5 }}>Speed controller</div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:6 }}>
                <button type="button" onClick={() => setCtrlModel("")}
                  style={{ padding:'2px 7px', borderRadius:5, border:'1px solid', borderColor:ctrlModel===""?'#00e5a0':'rgba(255,255,255,0.12)', background:ctrlModel===""?'rgba(0,229,160,0.12)':'rgba(255,255,255,0.05)', color:ctrlModel===""?'#00e5a0':'#999', fontSize:11, cursor:'pointer' }}>No Ctrl</button>
                {controllerOptions.map(m => (
                  <button key={m} type="button" onClick={() => setCtrlModel(m)}
                    onMouseEnter={() => setHoveredCtrl(m.startsWith('US')?'US':m.startsWith('UX')?'UX':null)}
                    onMouseLeave={() => setHoveredCtrl(null)}
                    style={{ position:'relative', padding:'2px 7px', borderRadius:5, border:'1px solid', borderColor:ctrlModel===m?'#00e5a0':'rgba(255,255,255,0.12)', background:ctrlModel===m?'rgba(0,229,160,0.12)':'rgba(255,255,255,0.05)', color:ctrlModel===m?'#00e5a0':'#999', fontSize:11, cursor:'pointer' }}>
                    {m}
                    {hoveredCtrl&&((m.startsWith('US')&&hoveredCtrl==='US')||(m.startsWith('UX')&&hoveredCtrl==='UX'))&&(
                      <div style={{ position:'absolute', bottom:'100%', left:'50%', transform:'translateX(-50%)', marginBottom:4, zIndex:9999, pointerEvents:'none' }}>
                        <img src={hoveredCtrl==='US'?USImg:UXImg} alt={hoveredCtrl} style={{ width:260, borderRadius:8, boxShadow:'0 4px 20px rgba(0,0,0,0.6)', border:'2px solid white' }} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:4 }}>
                <button type="button" onClick={() => setQtyCtrl(q=>Math.max(1,q-1))} style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>–</button>
                <input type="number" min={1} max={999} value={qtyCtrl}
                  onChange={e => { const v=Number(e.target.value); setQtyCtrl(Number.isFinite(v)?Math.max(1,Math.floor(v)):1); }}
                  onWheel={e => e.currentTarget.blur()}
                  style={{ width:38, textAlign:'center', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:5, color:'#e8eaf0', fontSize:13, fontWeight:700, padding:'2px 0' }} />
                <button type="button" onClick={() => setQtyCtrl(q=>Math.min(999,q+1))} style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>+</button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
          <button type="button"
            className="btn-3d-rkfs"
            style={{ width:'100%', padding:'11px 0', borderRadius:10, fontWeight:700, fontSize:14, cursor:'pointer' }}
            onClick={() => {
              const base=Array.isArray(codes)?(Array.isArray(codes[0])?codes.flat():codes):(codes?[codes]:[]);
              const list=(selectedModel&&base.length)?[selectedModel,...base.filter(c=>c!==selectedModel)]:base;
              if(list.length) onConfirm(list);
            }}>
            📦 รับไฟล์ 3D
          </button>
          <button type="button" onClick={handleRequestQuote}
            style={{ width:'100%', padding:'11px 0', borderRadius:10, background:'linear-gradient(90deg,#00e5a0,#00c87a)', color:'#0a1a10', fontWeight:700, fontSize:14, border:'none', cursor:'pointer' }}>
            🛒 ขอใบเสนอราคา
          </button>
          <button type="button" onClick={handleDownloadPDF}
            style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'rgba(255,255,255,0.07)', color:'#e8eaf0', fontWeight:600, fontSize:13, border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer' }}>
            📄 Drawing PDF
          </button>
        </div>

      </div>
    </div>
  </div>
)}
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
