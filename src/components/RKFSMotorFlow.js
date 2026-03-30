// RKFSMotorFlow.js
// ─────────────────────────────────────────────────────────────────────────────
// ดึงออกมาจาก MotorFlows.js — แตะเฉพาะส่วน RKFS เท่านั้น
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// ENV_PRESETS + TINT_COLORS + StepViewer3D (model-viewer)
// เหมือน ACGearMotorFlow.js — ใช้แสดง 3D GLB ใน Step 10
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  if (typeof document === 'undefined') return;
  const id = 'mv-script';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id; s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
  document.head.appendChild(s);
})();

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

const GLB_BASE_RKFS = (() => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/model/glb';
  }
  return 'https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev';
})();

function normalizeRkfsGlbCode(modelCode) {
  // แปลง model code → ชื่อไฟล์ GLB จริง
  // ไฟล์ใช้ XXX แทน ratio และ XX แทน mounting (M1-M6)
  // เช่น R67-YE3-7.5-4P-17.95-M1-0-X → R67-YE3-7.5-4P-XXX-XX-0-X
  if (!modelCode) return '';
  const parts = modelCode.trim().split('-');
  if (parts.length < 6) return modelCode.trim();
  parts[4] = 'XXX'; // ratio  → XXX
  parts[5] = 'XX';  // mounting (M1-M6) → XX
  return parts.join('-');
}

// ── Mobile detection ──────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  React.useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

function RkfsViewer3D({ modelCode }) {
  const isMobile = useIsMobile();
  const glbCode = normalizeRkfsGlbCode(modelCode || '');
  const mvRef   = React.useRef(null);
  const [err,     setErr]     = React.useState(false);
  const [ready,   setReady]   = React.useState(false);
  const [envIdx,  setEnvIdx]  = React.useState(0);
  const [tintIdx, setTintIdx] = React.useState(0);
  const [autoLight, setAutoLight] = React.useState(false);
  const [lightRot,  setLightRot]  = React.useState(0);
  const [exposure,  setExposure]  = React.useState(1.3);
  const [shadow,    setShadow]    = React.useState(0.6);
  const lightTimer = React.useRef(null);

  React.useEffect(() => {
    setErr(false); setReady(false);
  }, [glbCode]);

  React.useEffect(() => {
    if (!glbCode) return;
    const url = `${GLB_BASE_RKFS}/${glbCode}.glb`;
    let cancelled = false;
    let attempts = 0;
    function attach() {
      const el = mvRef.current;
      if (cancelled) return;
      if (!el || !el.nodeName) {
        if (attempts < 40) { attempts++; setTimeout(attach, 50); }
        return;
      }
      el.setAttribute('src', url);
      const onLoad = () => { if (!cancelled) { setReady(true); setErr(false); } };
      const onErr  = () => { if (!cancelled) setErr(true); };
      el.addEventListener('load',  onLoad);
      el.addEventListener('error', onErr);
      el.__cleanup = () => { el.removeEventListener('load', onLoad); el.removeEventListener('error', onErr); };
    }
    attach();
    return () => { cancelled = true; mvRef.current?.__cleanup?.(); };
  }, [glbCode]);

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

  React.useEffect(() => {
    if (mvRef.current) mvRef.current.setAttribute('environment-image', ENV_PRESETS[envIdx].value);
  }, [envIdx]);

  React.useEffect(() => { return () => clearInterval(lightTimer.current); }, []);

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

  const S = {
    wrap:      { display:'flex', flexDirection: isMobile?'column':'row', width:'100%', height:'100%', minHeight:0, background:'#0a0c10' },
    viewer:    { flex: isMobile?'none':1, height: isMobile?'55vw':undefined, minHeight: isMobile?220:0, maxHeight: isMobile?380:undefined, position:'relative', background:'linear-gradient(135deg,#0a0c10,#0d111c)', overflow:'hidden' },
    grid:      { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,229,160,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,0.025) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' },
    mv:        { width:'100%', height:'100%', '--poster-color':'transparent', '--progress-bar-color':'#00e5a0', background:'transparent' },
    hint:      { position:'absolute', bottom:10, left:0, right:0, textAlign:'center', color:'rgba(255,255,255,0.2)', fontSize:10, pointerEvents:'none' },
    errorBox:  { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:'#0a0c10' },
    loaderBox: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, background:'linear-gradient(135deg,#0a0c10,#0d111c)' },
    ring:      { width:44, height:44, border:'2px solid rgba(0,229,160,0.15)', borderTopColor:'#00e5a0', borderRadius:'50%', animation:'mv3d-spin 0.9s linear infinite' },
    panel:     { width: isMobile?'100%':200, flexShrink:0, background:'#0f1118', borderLeft: isMobile?'none':'1px solid rgba(255,255,255,0.07)', borderTop: isMobile?'1px solid rgba(255,255,255,0.07)':'none', overflowY:'auto', display:'flex', flexDirection:'column' },
    sec:       { padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' },
    secTitle:  { fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 },
    envGrid:   { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:5 },
    envBtn:    (a) => ({ aspectRatio:1, borderRadius:6, border: a?'2px solid #00e5a0':'2px solid transparent', cursor:'pointer', position:'relative', overflow:'hidden', transition:'all 0.15s' }),
    envLabel:  { position:'absolute', bottom:0, left:0, right:0, fontSize:7, textAlign:'center', background:'rgba(0,0,0,0.65)', padding:'1px 0', color:'rgba(255,255,255,0.7)', fontWeight:600 },
    colorGrid: { display:'flex', gap:6, flexWrap:'wrap' },
    swatch:    (a) => ({ width:24, height:24, borderRadius:'50%', border: a?'2px solid white':'2px solid transparent', cursor:'pointer', transition:'all 0.15s', position:'relative', flexShrink:0, transform: a?'scale(1.1)':'scale(1)' }),
    lightRow:  { display:'flex', alignItems:'center', gap:8, marginBottom:8 },
    lightLbl:  { fontSize:10, color:'#4a5060', width:44, flexShrink:0 },
    slider:    { flex:1, accentColor:'#00e5a0', cursor:'pointer', height:3 },
    sliderVal: { fontSize:10, color:'#e8eaf0', width:30, textAlign:'right', flexShrink:0, fontFamily:'monospace' },
    toggle:    (on) => ({ width:34, height:18, background: on?'#00e5a0':'rgba(255,255,255,0.1)', borderRadius:9, position:'relative', cursor:'pointer', border:'none', transition:'background 0.2s', flexShrink:0 }),
    toggleDot: (on) => ({ position:'absolute', top:2, left: on?16:2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.2s' }),
  };

  return (
    <div style={S.wrap}>
      <style>{`@keyframes mv3d-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={S.viewer}>
        <div style={S.grid} />
        {!ready && !err && (
          <div style={S.loaderBox}>
            <div style={S.ring} />
            <span style={{ fontSize:11, color:'#4a5060', letterSpacing:'1px' }}>กำลังโหลดโมเดล…</span>
          </div>
        )}
        {err && (
          <div style={S.errorBox}>
            <span style={{ fontSize:48 }}>📦</span>
            <span style={{ fontSize:12, color:'#556' }}>ยังไม่มีไฟล์ 3D</span>
            <span style={{ fontSize:9, color:'#3a4050', fontFamily:'monospace' }}>{glbCode}</span>
          </div>
        )}
        <model-viewer ref={mvRef} src="" alt={glbCode}
          auto-rotate auto-rotate-delay="400" rotation-per-second="18deg"
          camera-controls touch-action="pan-y"
          shadow-intensity="1.2" shadow-softness={shadow}
          environment-image="neutral" exposure={exposure}
          style={S.mv} />
        {ready && !err && <div style={S.hint}>🖱 ลาก = หมุน · Scroll = ซูม</div>}
      </div>
      <div style={S.panel}>
        <div style={S.sec}>
          <div style={S.secTitle}>สภาพแวดล้อมแสง</div>
          <div style={S.envGrid}>
            {ENV_PRESETS.map((env, i) => (
              <button key={env.value} title={env.label} onClick={() => setEnvIdx(i)}
                style={{ ...S.envBtn(i===envIdx), background: env.bg }}>
                <span style={S.envLabel}>{env.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={S.sec}>
          <div style={S.secTitle}>ควบคุมแสง</div>
          <div style={S.lightRow}>
            <span style={S.lightLbl}>ความสว่าง</span>
            <input type="range" min={0.5} max={3} step={0.05} value={exposure} style={S.slider}
              onChange={e => { const v=parseFloat(e.target.value); setExposure(v); if(mvRef.current) mvRef.current.setAttribute('exposure',v); }} />
            <span style={S.sliderVal}>{exposure.toFixed(1)}</span>
          </div>
          <div style={S.lightRow}>
            <span style={S.lightLbl}>เงา</span>
            <input type="range" min={0} max={1} step={0.05} value={shadow} style={S.slider}
              onChange={e => { const v=parseFloat(e.target.value); setShadow(v); if(mvRef.current) mvRef.current.setAttribute('shadow-softness',v); }} />
            <span style={S.sliderVal}>{shadow.toFixed(1)}</span>
          </div>
          <div style={S.lightRow}>
            <span style={S.lightLbl}>ทิศแสง</span>
            {autoLight
              ? <span style={{ flex:1, fontSize:10, color:'#00e5a0' }}>⟳ หมุนอัตโนมัติ</span>
              : <input type="range" min={0} max={360} step={1} value={lightRot} style={S.slider}
                  onChange={e => { const v=parseInt(e.target.value); setLightRot(v); if(mvRef.current) mvRef.current.style.setProperty('--env-rotation',v+'deg'); }} />
            }
            <span style={S.sliderVal}>{lightRot}°</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:10 }}>
            <span style={{ fontSize:10, color:'#4a5060' }}>☀️ หมุนแสงอัตโนมัติ</span>
            <button style={S.toggle(autoLight)} onClick={() => setAutoLight(v => !v)}>
              <div style={S.toggleDot(autoLight)} />
            </button>
          </div>
        </div>
        <div style={S.sec}>
          <div style={S.secTitle}>สีโมเดล</div>
          <div style={S.colorGrid}>
            {TINT_COLORS.map((c, i) => (
              <button key={c.label} title={c.label} onClick={() => applyTint(i)}
                style={{ ...S.swatch(i===tintIdx), background: c.bg }}>
                {i===tintIdx && (
                  <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'white' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import R1Img from '../assets/rkfs/4Series/1R.png';
import K1Img from '../assets/rkfs/4Series/1K.png';
import F1Img from '../assets/rkfs/4Series/1F.png';
import S1Img from '../assets/rkfs/4Series/1S.png';

import RImg from '../assets/rkfs/R.png';
import RFImg from '../assets/rkfs/RF.png';
import RXImg from '../assets/rkfs/RX.png';
import RXFImg from '../assets/rkfs/RXF.png';
import RMImg from '../assets/rkfs/RM.png';
import RXXRXXImg from '../assets/rkfs/RR.png';
import RFXXRXXImg from '../assets/rkfs/RFR.png';

import KImg from '../assets/rkfs/K.png';
import KAImg from '../assets/rkfs/KA.png';
import KABImg from '../assets/rkfs/KAB.png';
import KAFImg from '../assets/rkfs/KAF.png';
import KATImg from '../assets/rkfs/KAT.png';
import KAHImg from '../assets/rkfs/KAH.png';
import KAAAImg from '../assets/rkfs/KAAA.png';
import KAABImg from '../assets/rkfs/KAAB.png';
import KAAABImg from '../assets/rkfs/KAAAB.png';

import KXXAImg from '../assets/rkfs/KXXA.png';
import KXXBImg from '../assets/rkfs/KXXB.png';
import KXXABImg from '../assets/rkfs/KXXAB.png';
import KAXXAImg from '../assets/rkfs/KAXXA.png';
import KAXXBImg from '../assets/rkfs/KAXXB.png';
import KATXXTImg from '../assets/rkfs/KATXXT.png';
import SXXAImg from '../assets/rkfs/SXXA.png';
import SXXBImg from '../assets/rkfs/SXXB.png';
import SXXABImg from '../assets/rkfs/SXXAB.png';
import SAXXAImg from '../assets/rkfs/SAXXA.png';
import SAXXBImg from '../assets/rkfs/SAXXB.png';
import SATXXTImg from '../assets/rkfs/SATXXT.png';;

import SImg from '../assets/rkfs/S.png';
import SAAAImg from '../assets/rkfs/SAAA.png';
import SAABImg from '../assets/rkfs/SAAB.png';
import SAAABImg from '../assets/rkfs/SAAAB.png';
import SAImg from '../assets/rkfs/SA.png';
import SAFImg from '../assets/rkfs/SAF.png';
import SATImg from '../assets/rkfs/SAT.png';
import SAZImg from '../assets/rkfs/SAZ.png';

import FImg from '../assets/rkfs/F.png';
import FAImg from '../assets/rkfs/FA.png';
import FAFImg from '../assets/rkfs/FAF.png';
import FAHImg from '../assets/rkfs/FAH.png';
import FFImg from '../assets/rkfs/FF.png';

import RIECImg from '../assets/rkfs/RIEC.png';
import RINPUTImg from '../assets/rkfs/RINPUT.png';
import RSERVOImg from '../assets/rkfs/RSERVO.png';
import RWMImg from '../assets/rkfs/RWM.png';
import FIECImg from '../assets/rkfs/FIEC.png';
import FINPUTImg from '../assets/rkfs/FINPUT.png';
import FSERVOImg from '../assets/rkfs/FSERVO.png';
import FWMImg from '../assets/rkfs/FWM.png';
import SIECImg from '../assets/rkfs/SIEC.png';
import SINPUTImg from '../assets/rkfs/SINPUT.png';
import SSERVOImg from '../assets/rkfs/SSERVO.png';
import SWMImg from '../assets/rkfs/SWM.png';
import KIECImg from '../assets/rkfs/KIEC.png';
import KINPUTImg from '../assets/rkfs/KINPUT.png';
import KSERVOImg from '../assets/rkfs/KSERVO.png';
import KWMImg from '../assets/rkfs/KWM.png';
import hypoidImg from '../assets/hypoid/hypoid.png';

// [ADD-RKFS-ASSETS] IEC drawings
import DrawRam from '../assets/rkfs/DrawRam.png';
import DrawKam from '../assets/rkfs/DrawKam.png';
import DrawFam from '../assets/rkfs/DrawFam.png';
import DrawSam from '../assets/rkfs/DrawSam.png';

// [ADD-RKFS-ASSETS] INPUT shaft gifs
import RADgif from '../assets/rkfs/RADgif.gif';
import KADgif from '../assets/rkfs/KADgif.gif';
import FADgif from '../assets/rkfs/FADgif.gif';
import SADgif from '../assets/rkfs/SADgif.gif';

import YE3Img from '../assets/rkfs/YE3.png';
import YE4Img from '../assets/rkfs/YE4.png';
import YVPImg from '../assets/rkfs/YVP.png';
import YEJImg from '../assets/rkfs/YEJ.png';
import YVPEJImg from '../assets/rkfs/YVPEJ.png';
import YBImg from '../assets/rkfs/YB.png';

import RMTImg from '../assets/rkfs/RMT.png';
import KSMTImg from '../assets/rkfs/KSMT.png';
import FMTImg from '../assets/rkfs/FMT.png';

import T0Img from '../assets/rkfs/T0.png';
import T90Img from '../assets/rkfs/T90.png';
import T180Img from '../assets/rkfs/T180.png';
import T270Img from '../assets/rkfs/T270.png';

import CXImg from '../assets/rkfs/CX.png';
import C1Img from '../assets/rkfs/C1.png';
import C2Img from '../assets/rkfs/C2.png';
import C3Img from '../assets/rkfs/C3.png';

export function renderRKFSFlow(state, setState, onConfirm, onRequestQuote = null) {
  const {
    rkfsSeries,
    rkfsDesign,
    rkfsSize,
    rkfsMotorType,
    rkfsMotorPower,
    rkfsPole,
    rkfsRatio,
    rkfsMounting,
    rkfsPosition,
    rkfsPositionSub,
    rkfsDesignSuffix,
    rkfsMountingTemp,
    rkfsInputSel,
    rkfsINPUTshaft,
    rkfsINPUTshaftDia,
    rkfsInputShaft,
    rkfsInputShaftDia,
        rkfsColor,
  } = state;

// [ADD-RKFS-MAPS] ผูก Series -> รูป/ไฟล์ ที่ต้องแสดง
const RKFS_IEC_IMG = {
  R: DrawRam,
  K: DrawKam,
  F: DrawFam,
  S: DrawSam,
};

const RKFS_INPUT_GIF = {
  R: RADgif,
  K: KADgif,
  F: FADgif,
  S: SADgif,
};

  const shaftCode = rkfsINPUTshaft ?? rkfsInputShaft ?? null;
  const shaftDia  = rkfsINPUTshaftDia ?? rkfsInputShaftDia ?? null;
  const isMobile = useIsMobile();
  const update = (key, value) => {
  const setterMap = {
    rkfsSeries:       setState.setRkfsSeries,
    rkfsDesign:       setState.setRkfsDesign,
    rkfsSize:         setState.setRkfsSize,
    rkfsMotorType:    setState.setRkfsMotorType,
    rkfsMotorPower:   setState.setRkfsMotorPower,
    rkfsPole:         setState.setRkfsPole,
    rkfsRatio:        setState.setRkfsRatio,
    rkfsMounting:     setState.setRkfsMounting,
    rkfsMountingTemp: setState.setRkfsMountingTemp,
    rkfsPosition:     setState.setRkfsPosition,
    rkfsPositionSub:  setState.setRkfsPositionSub,
    rkfsDesignSuffix: setState.setRkfsDesignSuffix,
    rkfsInputSel:     setState.setRkfsInputSel,
    rkfsINPUTshaft:    setState.setRkfsINPUTshaft,
    rkfsINPUTshaftDia: setState.setRkfsINPUTshaftDia,
    rkfsInputShaft:    setState.setRkfsInputShaft,
    rkfsInputShaftDia: setState.setRkfsInputShaftDia,
    rkfsQty: setState.setRkfsQty,
        rkfsColor: setState.setRkfsColor,
  };

  if (setterMap[key]) {
    setterMap[key](value);
  }

  // ⬇️ เคลียร์ suffix เมื่อผู้ใช้เปลี่ยน Series/Design กันค่าค้าง
  if (key === 'rkfsSeries' || key === 'rkfsDesign') {
    setState.setRkfsDesignSuffix(null);
  }
};

// === [ADD] RKFS click-sweep helper ===

const sweepThen = (el, fn, ms = RKFS_SWEEP_MS) => {
  try {
    if (el && el.classList) {
      el.classList.add('rkfs-sweep');
      setTimeout(() => {
        fn && fn();
        // เอาออกเพื่อไม่ทับซ้อนเอฟเฟกต์ครั้งถัดไป
        el.classList.remove('rkfs-sweep');
      }, ms);
      return;
    }
  } catch (_) { /* no-op */ }
  // fallback: ถ้าไม่มี element ก็ทำงานทันที
  fn && fn();
};

  const designOptions = {
    R: ["R", "RF", "RM", "RX", "RXF", "RXXRXX", "RFXXRXX" ],
    K: ["K", "KA", "KAB", "KAF", "KAT", "KAH" ],
    F: ["F", "FA", "FAF", "FAH", "FF"],
    S: ["S", "SA", "SAF", "SAT", "SAZ"]
  };

   // [ADD] R-Series: Motor Power options by Size (Step 5 depends on Step 3)
const rSeriesPowerBySize = {
  '17':  ["0.18","0.25","0.37","0.55","0.75","1.1"],
  '27':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '77':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11"],
  '87':  ["0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"],
  '97':  ["0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30"],
  '107': ["2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45"],
  '137': ["2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55"],
  '147': ["4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90"],
  '167': ["5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90","110"]
};

// K-Series: Motor Power options by Size
const kSeriesPowerBySize = {
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '77':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11"],
  '87':  ["0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"],
  '97':  ["1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30"],
  '107': ["3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45"],
  '127': ["7.5","9.2","11","15","18.5","22","30","37","45","55","75","90"],
  '157': ["11","15","18.5","22","30","37","45","55","75","90","110"],
  '167': ["11","15","18.5","22","30","37","45","55","75","90","110","132","160"],
  '187': ["18.5","22","30","37","45","55","75","90","110","132","160","200"]
};

// F-Series: Motor Power options by Size
const fSeriesPowerBySize = {
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '77':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '87':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5"],
  '97':  ["0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5"],
  '107': ["0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"],
  '127': ["4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75"],
  '157': ["5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90"]
};

// S-Series: Motor Power options by Size
const sSeriesPowerBySize = {
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '77':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '87':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15"],
  '97':  ["0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"]
};
  
  const ratioMapping = {
    R: {
      '17':  ['3.83','4.51','5.09','5.76','6.15','7.04','7.55','8.63','10.15','11.45','12.98','13.84','15.84','16.99','19.71','23.15','25.23','24.07','28.32','31.94','36.20','38.61','44.18','47.44','53.76','57.35','65.61','70.39','81.64'],
      '27':  ['3.37','4.00','4.27','5.00','5.60','6.59','7.63','8.16','9.41','10.13','11.86','13.28','15.63','18.08','19.35','22.32','26.09','28.37','24.47','28.78','32.47','36.79','39.25','44.90','48.17','55.87','61.30','69.47','74.11','84.78','90.96','105.49','123.91','135.09'],
      '37':  ['134.82','123.66','105.28','90.77','84.61','73.96','69.33','61.18','55.76','48.08','44.81','39.17','36.72','32.40','28.73','24.42','28.32','26.03','22.27','19.31','18.05','15.60','13.25','11.83','10.11','9.47','7.97','6.67','5.67','5.06','4.32','4.05','3.41'],
      '47':  ['176.88','162.94','139.99','121.87','110.81','100.86','88.94','84.00','75.68','68.54','64.21','56.73','52.69','47.75','42.87','36.93','34.73','30.47','26.70','23.59','33.79','31.13','26.74','23.82','21.81','20.32','17.89','16.22','14.56','12.54','11.79','10.61','9.07','8.01','7.16','6.02','5.06','5.84','4.28','4.34'],
      '57':  ['186.89','172.17','147.92','128.77','120.54','106.58','98.91','89.57','80.51','69.23','64.85','57.29','53.22','48.23','43.30','37.30','31.88','28.13','26.97','26.31','24.99','21.93','18.60','17.69','14.77','13.95','11.88','10.79','9.35','9.06','7.97','6.53','6.41','5.82','5.06','4.93','4.39'],
      '67':  ['199.81','180.47','158.14','137.67','120.91','113.94','105.83','96.91','89.11','78.17','69.75','61.26','56.89','51.56','45.29','39.88','35.00','32.27','28.83','28.13','26.72','23.44','19.89','17.95','15.79','14.91','13.54','11.54','10.00','8.70','7.79','6.36','5.70','4.93','4.29'],
      '77':  ['195.24','166.59','145.67','138.39','121.42','102.99','92.97','81.80','72.24','65.77','57.68','52.07','45.81','43.26','36.83','33.47','29.00','25.23','23.37','21.43','18.80','17.82','15.60','14.05','12.33','10.88','9.64','7.74','6.79','5.99','5.31'],
      '87':  ['246.54','205.71','185.77','162.38','142.41','118.43','106.25','93.38','81.92','72.57','63.56','54.36','47.58','41.74','36.84','32.66','27.84','23.40','21.51','19.10','17.08','15.19','13.35','11.93','9.90','9.14','8.22','7.13','6.39','5.30'],
      '97':  ['289.74','258.71','241.25','215.84','170.02','136.48','126.75','103.44','92.48','83.15','71.02','65.91','56.21','53.21','47.58','42.78','37.13','33.25','27.58','32.05','27.19','23.27','20.45','18.24','16.47','14.62','12.39','10.83','9.29','8.39','7.12','6.21','5.20','4.50'],
      '107': ['251.15','229.95','203.16','179.61','158.68','141.83','128.71','115.63','103.26','92.70','78.57','72.88','65.60','59.64','52.68','45.61','40.37','35.43','29.49','30.77','27.58','25.01','22.62','20.66','18.21','15.85','13.66','11.59','10.34','8.56','8.16','6.82','6.86','4.92'],
      '137': ['222.60','188.45','174.48','156.31','141.12','128.18','115.63','103.26','92.70','80.91','73.49','65.20','59.17','50.86','44.39','37.65','32.91','27.83','29.57','24.12','22.00','19.04','16.80','14.51','12.73','10.79','8.11','7.59','6.38','5.15'],
      '147': ['163.31','146.91','119.86','109.31','94.60','83.47','72.09','66.99','61.09','52.87','46.65','40.29','35.64','29.95','24.19','20.44','18.04','15.64','13.91','11.99','9.74','8.25','7.63','5.89','5.00'],
      '167': ['163.31','146.91','119.86','109.31','94.60','83.47','72.09','66.99','61.09','52.87','46.65','40.29','35.64','29.95','24.19','20.44','18.04','15.64','13.91','11.99','9.74','8.25','7.63','5.89','5.00']
    },
    K: {
      '37':  ['106.38','97.81','87.14','79.64','69.87','59.80','51.27','44.46','37.97','32.56','29.69','26.95','23.95','21.96','20.12','18.32','15.31','13.67','12.05','10.49','8.91','7.45','6.37','5.36'],
      '47':  ['131.87','121.48','107.37','95.16','85.12','75.66','68.30','63.85','56.93','49.31','46.65','43.90','39.93','36.21','33.00','29.61','27.24','24.81','21.56','19.41','17.08','15.27','13.25','11.77','10.65','9.35','8.56','7.36','6.08','5.81'],
      '67':  ['145.14','133.85','123.48','109.79','98.44','86.57','77.81','67.42','61.10','54.06','48.49','43.22','38.43','34.49','30.57','27.34','23.64','20.35','19.37','15.27','13.25','11.77','10.65','9.35','8.56','7.36','6.57'],
      '77':  ['192.18','179.37','154.02','135.28','128.52','110.31','97.75','88.47','77.17','73.99','63.02','58.34','51.35','44.87','40.04','34.63','30.79','26.87','25.62','22.96','20.87','17.87','15.66','13.24','12.36','10.46','8.84','7.24'],
      '87':  ['197.37','174.36','164.34','147.32','126.48','110.87','102.71','90.14','79.34','70.86','62.02','53.36','46.52','42.38','36.52','32.85','27.88','24.38','21.34','18.47','16.74','14.50','12.05','10.20','9.21','7.21'],
      '97':  ['176.05','153.91','140.23','120.38','105.13','96.83','87.69','77.59','62.55','52.87','43.37','41.87','38.32','30.82','27.45','24.75','22.37','18.96','16.56','13.85','11.99','10.41','8.71'],
      '107': ['143.47','121.46','112.41','102.16','90.96','82.35','73.30','66.52','57.17','49.90','42.33','37.89','32.69','31.85','29.00','26.02','22.56','19.74','15.84','14.65','13.43','11.73','9.94','8.69'],
      '127': ['146.07','132.14','122.48','112.18','89.98','81.98','70.95','63.25','54.07','47.82','40.19','36.25','31.57','27.61','23.91','21.15','18.66','15.03','12.79','10.74','8.68'],
      '157': ['150.41','122.39','100.25','91.26','79.75','70.38','61.02','54.29','46.79','38.02','31.45','26.87','23.55','21.64','18.17','15.86','13.42','12.65'],
      '167': ['164.50','134.99','109.83','87.86','78.14','69.00','60.74','51.77','43.30','36.61','32.98','28.77','25.62','21.57','17.34'],
      '187': ['179.86','165.21','144.59','112.66','102.16','88.00','73.96','64.04','53.36','45.50','38.57','33.25','27.92','21.16','17.18']
    },
    F: {
      '37':  ['128.51','117.88','100.36','86.53','80.65','70.50','66.09','58.24','54.54','51.70','47.02','42.30','39.65','35.91','31.69','29.00','28.98','23.88','23.63','21.57','19.53','17.27','15.81','13.63','11.08','9.46','8.97','8.04','6.74','6.05','5.24','4.92','4.20','3.77'],
      '47':  ['190.76','175.88','150.06','130.07','120.51','105.09','89.29','79.72','68.09','65.36','56.49','48.26','42.83','36.61','32.94','28.88','30.86','29.32','25.72','21.82','17.33','15.87','13.00','12.66','10.93','8.98','7.84','6.34','5.43','4.99'],
      '57':  ['199.70','183.60','157.09','136.16','120.87','110.41','93.17','82.05','72.98','63.19','54.00','50.17','44.73','38.21','35.79','30.15','40.13','34.24','29.95','24.96','21.17','19.11','16.81','15.88','13.22','12.29','10.64','8.73','7.19','6.55','5.98','5.18'],
      '67':  ['228.99','205.37','170.85','162.31','142.09','120.79','109.74','95.64','90.59','79.76','67.65','61.07','53.73','50.74','43.20','39.26','34.01','36.30','32.04','27.41','25.54','22.05','20.89','18.77','16.48','14.68','12.76','11.31','9.86','8.08','7.53','6.78','5.25','4.66','3.97'],
      '77':  ['281.71','262.93','198.31','188.31','176.47','142.27','130.08','114.45','108.48','94.93','85.52','78.56','72.50','65.22','58.32','55.27','48.37','43.58','38.23','33.74','27.91','25.54','36.58','31.51','25.50','21.43','19.70','17.49','14.06','12.04','10.06','8.96','7.39','6.16','5.16'],
      '87':  ['270.68','253.20','228.93','199.37','177.78','159.61','134.69','109.49','93.19','88.01','78.63','68.40','60.29','55.25','45.28','35.19','33.92','28.78','26.50','21.42','19.31','17.12','15.48','13.90','11.65','9.86','8.35','7.32','6.23','5.63','4.12'],
      '97':  ['276.77','253.41','223.88','189.92','174.87','156.30','140.71','127.42','112.99','102.16','97.55','89.88','86.59','80.31','75.63','72.29','65.47','58.06','52.49','45.91','38.56','32.50','43.28','36.64','33.91','30.39','27.44','24.92','22.61','20.07','17.25','15.06','12.71','11.16','9.06','7.07','6.17','5.23','4.57'],
      '107': ['254.40','231.05','210.63','178.64','161.92','149.47','127.14','101.38','94.34','88.49','83.19','77.92','67.62','58.12','50.73','43.03','37.61','31.80','33.79','27.57','25.14','21.62','19.20','16.44','14.65','12.35','9.96','8.37','6.22'],
      '127': ['170.83','153.67','125.37','114.34','98.71','87.31','75.41','70.91','63.91','55.42','48.80','40.19','37.28','31.33','25.30','26.86','24.57','21.38','18.87','16.36','14.55','10.19','8.88','6.80','5.52','4.68'],
      '157': ['267.43','217.62','178.20','162.86','141.80','125.14','108.49','96.53','85.40','78.46','68.28','52.24','46.48','40.06','32.55','27.60','53.55','43.94','35.75','28.60','25.43','19.12','16.85','13.96','11.92']
    },
    S: {
      '37':  ['157.43','144.40','122.94','106.00','98.84','96.30','86.36','71.44','63.33','55.93','53.83','51.30','43.68','37.66','35.10','30.68','28.76','25.35','22.50','19.89','19.13','18.24','15.53','13.39','12.48','10.91','10.13','8.40','6.80'],
      '47':  ['201.00','184.80','158.12','137.05','128.10','110.73','94.08','84.00','71.75','69.39','67.20','63.80','56.61','54.59','48.32','47.32','44.22','38.23','32.48','29.00','24.77','23.20','20.33','19.54','17.62','16.47','14.24','12.04','10.84','9.63','8.64','7.28'],
      '57':  ['201.00','184.80','158.12','137.05','128.10','110.73','94.08','84.00','71.75','69.39','67.20','63.80','56.61','54.59','48.32','47.32','44.22','38.23','32.48','29.00','24.77','23.20','20.33','19.54','17.62','16.47','14.24','12.04','10.84','9.23','8.64','7.28'],
      '67':  ['217.41','190.11','180.65','158.45','134.40','121.35','106.75','100.83','85.83','78.06','75.06','67.57','65.63','62.35','58.80','54.70','46.40','41.89','38.03','34.80','31.74','29.63','26.45','24.44','23.32','20.37','20.30','17.28','15.06','13.73','12.96','11.80','10.36','8.69','7.56'],
      '77':  ['256.47','225.66','214.00','189.09','161.60','148.15','130.00','123.20','107.83','97.14','85.22','75.20','75.09','71.33','66.67','63.03','56.92','53.87','49.38','43.33','41.07','35.94','32.38','28.41','25.07','22.89','22.22','20.99','18.97','18.45','17.45','15.28','13.76','12.07','10.65','9.44','8.06'],
      '87':  ['288.00','258.18','222.40','202.96','180.00','151.30','139.05','123.48','110.43','99.26','91.20','86.15','81.76','77.14','70.43','64.27','64.00','57.00','47.91','44.03','39.10','34.96','31.43','27.28','25.50','21.43','20.27','19.70','17.49','15.64','12.21','10.36','9.14','7.88'],
      '97':  ['286.40','262.22','231.67','196.52','180.95','161.74','145.60','131.85','116.92','105.71','89.60','80.85','78.26','71.43','65.45','60.59','55.79','49.87','44.65','40.95','36.05','32.60','27.63','26.39','24.13','23.59','21.23','19.23','17.05','15.42','13.07','11.41','9.55','8.26']
    }
  };

const SERVICE_FACTOR_DB = {
  R: {
      R77: {
      0.12: {
        '6P': [
          { i: 195.24, fB: 3.3 }, { i: 166.59, fB: 3.9 },
          { i: 145.67, fB: 4.4 },
        ],
      },
      0.18: {
        '6P': [
          { i: 195.24, fB: 2.10 }, { i: 166.59, fB: 2.5 }, { i: 145.67, fB: 2.8 },
          { i: 138.39, fB: 3.0 }, { i: 121.42, fB: 3.4 },
        ],
        '4P': [
          { i: 195.24, fB: 3.2 }, { i: 166.59, fB: 3.8 }, { i: 145.67, fB: 4.3 },
          { i: 138.39, fB: 4.6 },
        ],
      },
      0.25: {
        '8P': [
          { i: 166.59, fB: 1.40 }, { i: 145.67, fB: 1.60 }, { i: 138.39, fB: 1.70 },
          { i: 121.42, fB: 1.90 }, 
        ],
        '6P': [
          { i: 195.24, fB: 1.55 }, { i: 166.59, fB: 1.80 }, { i: 145.67, fB: 2.10 },
        ],
        '4P': [
          { i: 195.24, fB: 2.3 }, { i: 166.59, fB: 2.70 }, { i: 145.67, fB: 3.1 },
          { i: 138.39, fB: 3.20 }, { i: 121.42, fB: 3.70 },
        ],
      },
            0.37: {
        '8P': [
          { i: 145.67, fB: 1.10 }, { i: 138.39, fB: 1.15 }, { i: 121.42, fB: 1.30 }, 
        ],
        '6P': [
          { i: 166.59, fB: 1.25 }, { i: 145.67, fB: 1.45 }, { i: 138.39, fB: 1.50 },
        ],
        '4P': [
          { i: 195.24, fB: 1.65 }, { i: 166.59, fB: 1.90 }, { i: 145.67, fB: 2.2 },
          { i: 138.39, fB: 2.30 }, { i: 121.42, fB: 2.60 }, { i: 102.99, fB: 3.1 }, { i: 92.97, fB: 3.50 },
        ],
      },
      0.55: {
        '4P': [
          { i: 166.59, fB: 1.25 }, { i: 145.67, fB: 1.45 },
          { i: 138.39, fB: 1.55 }, { i: 121.42, fB: 1.75 }, { i: 102.99, fB: 2.1 }, { i: 92.97, fB: 2.3 }, { i: 81.80, fB: 2.6 }, { i: 77.24, fB: 2.8 }, { i: 65.77, fB: 3.2 },
        ],
      },
      0.75: {
        '4P': [
          { i: 166.59, fB: 0.95 }, { i: 145.67, fB: 1.10 },
          { i: 138.39, fB: 1.15 }, { i: 121.42, fB: 1.30 }, { i: 102.99, fB: 1.55 }, { i: 92.97, fB: 1.70 }, { i: 81.80, fB: 1.95 }, { i: 77.24, fB: 2.0 }, { i: 65.77, fB: 2.4 }, { i: 57.68, fB: 2.7 }, { i: 52.07, fB: 3.0 }, { i: 45.81, fB: 3.5 }, { i: 43.26, fB: 3.7 },
        ],
      },
      1.1: {
        '4P': [
         { i: 121.42, fB: 0.90 }, { i: 102.99, fB: 1.05 }, { i: 92.97, fB: 1.20 }, { i: 81.80, fB: 1.35 }, { i: 77.24, fB: 1.40 }, { i: 65.77, fB: 1.65 }, { i: 57.68, fB: 1.9 }, { i: 52.07, fB: 2.1 }, { i: 45.81, fB: 2.4 }, { i: 43.26, fB: 2.5 },  { i: 36.83, fB: 3.0 },  { i: 33.47, fB: 3.3 },
        ],
      },
      1.5: {
        '4P': [
         { i: 92.97, fB: 0.85 }, { i: 81.80, fB: 1.00 }, { i: 77.24, fB: 1.05 }, { i: 65.77, fB: 1.25 }, { i: 57.68, fB: 1.40 }, { i: 52.07, fB: 1.55 }, { i: 45.81, fB: 1.75 }, { i: 43.26, fB: 1.85 },  { i: 36.83, fB: 2.2 },  { i: 33.47, fB: 2.4 }, { i: 29.00, fB: 2.8 }, { i: 25.23, fB: 3.0 },
        ],
      },
      2.2: {
        '4P': [
        { i: 65.77, fB: 0.85 }, { i: 57.68, fB: 0.95 }, { i: 52.07, fB: 1.05 }, { i: 45.81, fB: 1.20 }, { i: 43.26, fB: 1.25 },  { i: 36.83, fB: 1.50 },  { i: 33.47, fB: 1.65 }, { i: 29.00, fB: 1.90 }, { i: 25.23, fB: 2.1 }, { i: 23.37, fB: 2.30 }, { i: 21.43, fB: 2.60 }, { i: 18.80, fB: 2.80 }, { i: 17.82, fB: 2.90 }, { i: 15.60, fB: 3.20 }, { i: 14.05, fB: 3.40 },
        ],
      },
      3: {
        '4P': [
        { i: 45.81, fB: 0.85 }, { i: 43.26, fB: 0.95 },  { i: 36.83, fB: 1.10 },  { i: 33.47, fB: 1.20 }, { i: 29.00, fB: 1.40 }, { i: 25.23, fB: 1.50 }, { i: 23.37, fB: 1.70 }, { i: 21.43, fB: 1.85 }, { i: 18.80, fB: 2.00 }, { i: 17.82, fB: 2.10 }, { i: 15.60, fB: 2.30 }, { i: 14.05, fB: 2.50 }, { i: 12.33, fB: 2.70 }, { i: 10.88, fB: 3.00 }, { i: 9.64, fB: 3.20 }, { i: 8.59, fB: 3.60 }, { i: 7.74, fB: 3.80 }, { i: 6.79, fB: 4.20 },
        ],
      },
      4: {
        '4P': [
{ i: 23.37, fB: 1.30 }, { i: 21.43, fB: 1.40 }, { i: 18.80, fB: 1.55 }, { i: 17.82, fB: 1.65 }, { i: 15.60, fB: 1.75 }, { i: 14.05, fB: 1.90 }, { i: 12.33, fB: 2.10 }, { i: 10.88, fB: 2.30 }, { i: 9.64, fB: 2.40 }, { i: 8.59, fB: 2.70 }, { i: 7.74, fB: 2.90 }, { i: 6.79, fB: 3.20 }, { i: 5.99, fB: 3.30 }, { i: 5.31, fB: 3.60 }, 
        ],
      },
      5.5: { 
      '4P': [
{ i: 18.80, fB: 1.15 }, { i: 17.82, fB: 1.20 }, { i: 15.60, fB: 1.30 }, { i: 14.05, fB: 1.40 }, { i: 12.33, fB: 1.50 }, { i: 10.88, fB: 1.65 }, { i: 9.64, fB: 1.80 }, { i: 8.59, fB: 2.00 }, { i: 7.74, fB: 2.20 }, { i: 6.79, fB: 2.30 }, { i: 5.99, fB: 2.50 }, { i: 5.31, fB: 2.60 }, 
        ],
      },
      7.5: { 
      '4P': [
{ i: 18.80, fB: 0.85 }, { i: 17.82, fB: 0.85 }, { i: 15.60, fB: 0.95 }, { i: 14.05, fB: 1.00 }, { i: 12.33, fB: 1.10 }, { i: 10.88, fB: 1.20 }, { i: 9.64, fB: 1.30 }, { i: 8.59, fB: 1.45 }, { i: 7.74, fB: 1.55 }, { i: 6.79, fB: 1.70 }, { i: 5.99, fB: 1.80 }, { i: 5.31, fB: 1.90 }, 
        ],
      },
      9.2: { 
      '4P': [
{ i: 14.05, fB: 0.85 }, { i: 12.33, fB: 0.90 }, { i: 10.88, fB: 1.00 }, { i: 9.64, fB: 1.05 }, { i: 7.74, fB: 1.30 }, { i: 6.79, fB: 1.40 }, { i: 5.99, fB: 1.50 }, { i: 5.31, fB: 1.55 }, 
        ],
      },
      11: {       
      '4P': [
{ i: 10.88, fB: 0.85 }, { i: 9.64, fB: 0.90 }, { i: 7.74, fB: 1.10 }, { i: 6.79, fB: 1.15 }, { i: 5.99, fB: 1.25 }, { i: 5.31, fB: 1.30 }, 
        ],
      },
      15.0: { '4P': [
        { i: 17.08, fB: 0.85 }, { i: 15.35, fB: 0.90 }, { i: 13.33, fB: 1.00 }, { i: 11.93, fB: 1.05 },
        { i: 9.90,  fB: 1.20 }, { i: 9.14,  fB: 1.35 }, { i: 8.22,  fB: 1.45 },
        { i: 7.13,  fB: 1.55 }, { i: 6.39,  fB: 1.65 }, { i: 5.30,  fB: 1.75 },
      ]},
      18.5: { '4P': [
        { i: 13.33, fB: 0.80 }, { i: 11.93, fB: 0.85 }, { i: 9.90,  fB: 1.00 }, { i: 9.14,  fB: 1.10 },
        { i: 8.22,  fB: 1.15 }, { i: 7.13,  fB: 1.25 }, { i: 6.39,  fB: 1.30 }, { i: 5.30,  fB: 1.40 },
      ]},
      22: { '4P': [
        { i: 9.90, fB: 0.85 }, { i: 9.14, fB: 0.90 }, { i: 8.22, fB: 1.00 },
        { i: 7.13, fB: 1.05 }, { i: 6.39, fB: 1.10 }, { i: 5.30, fB: 1.20 },
      ]},
    },

    R87: {
      0.25: {
        '8P': [
          { i: 246.54, fB: 1.80 }, { i: 216.54, fB: 2.0 },
          { i: 205.71, fB: 2.2 },  { i: 181.77, fB: 2.4 },
        ],
      },
      0.37: {
        '8P': [
          { i: 216.54, fB: 1.40 }, { i: 205.71, fB: 1.45 }, { i: 181.77, fB: 1.65 },
        ],
        '6P': [
          { i: 246.54, fB: 1.60 }, { i: 216.54, fB: 1.80 }, { i: 205.71, fB: 1.90 },
          { i: 181.77, fB: 2.20 }, { i: 155.34, fB: 2.50 }, { i: 142.41, fB: 2.80 },
        ],
      },
      0.55: {
        '6P': [
          { i: 246.54, fB: 1.10 }, { i: 216.54, fB: 1.25 }, { i: 205.71, fB: 1.30 },
          { i: 181.77, fB: 1.45 }, { i: 155.34, fB: 1.70 },
        ],
        '4P': [
          { i: 246.54, fB: 1.65 }, { i: 216.54, fB: 1.85 }, { i: 205.71, fB: 1.95 },
          { i: 181.77, fB: 2.20 }, { i: 155.34, fB: 2.60 }, { i: 142.41, fB: 2.80 },
          { i: 124.97, fB: 3.20 }, { i: 118.43, fB: 3.40 }, { i: 103.65, fB: 3.90 },
        ],
      },
      0.75: {
        '6P': [
          { i: 216.54, fB: 0.90 }, { i: 205.71, fB: 0.95 }, { i: 181.77, fB: 1.05 },
          { i: 155.34, fB: 1.25 }, { i: 142.41, fB: 1.35 },
        ],
        '4P': [
          { i: 246.54, fB: 1.20 }, { i: 216.54, fB: 1.30 }, { i: 205.71, fB: 1.40 },
          { i: 181.77, fB: 1.65 }, { i: 155.34, fB: 2.00 }, { i: 142.41, fB: 2.10 },
          { i: 124.97, fB: 2.40 }, { i: 118.43, fB: 2.50 }, { i: 103.65, fB: 2.90 }, { i: 93.38, fB: 3.20 },
        ],
      },
      1.1: {
        '4P': [
          { i: 216.54, fB: 0.95 }, { i: 205.71, fB: 1.00 }, { i: 181.77, fB: 1.15 },
          { i: 155.34, fB: 1.35 }, { i: 142.41, fB: 1.45 }, { i: 124.97, fB: 1.65 },
          { i: 118.43, fB: 1.75 }, { i: 103.65, fB: 2.00 }, { i: 93.38,  fB: 2.20 },
          { i: 81.92,  fB: 2.50 }, { i: 72.57,  fB: 2.80 }, { i: 63.68,  fB: 3.20 },
          { i: 60.35,  fB: 3.40 }, { i: 52.82,  fB: 3.90 },
        ],
      },
      1.5: {
        '4P': [
          { i: 181.77, fB: 0.85 }, { i: 155.34, fB: 1.00 }, { i: 141.83, fB: 1.05 },
          { i: 124.97, fB: 1.20 }, { i: 118.43, fB: 1.30 }, { i: 103.65, fB: 1.45 },
          { i: 93.38,  fB: 1.65 }, { i: 81.92,  fB: 1.85 }, { i: 72.57,  fB: 2.10 },
          { i: 63.68,  fB: 2.40 }, { i: 60.35,  fB: 2.50 }, { i: 52.82,  fB: 2.90 },
          { i: 47.58,  fB: 3.20 }, { i: 41.74,  fB: 3.70 }, { i: 36.84,  fB: 4.10 },
        ],
      },
      2.2: {
        '4P': [
          { i: 124.97, fB: 0.85 }, { i: 118.43, fB: 0.90 }, { i: 103.65, fB: 1.00 },
          { i: 93.38,  fB: 1.10 }, { i: 81.92,  fB: 1.25 },
          { i: 72.57,  fB: 1.45 }, { i: 63.68,  fB: 1.65 }, { i: 60.35,  fB: 1.70 },
          { i: 52.82,  fB: 1.95 }, { i: 47.58,  fB: 2.20 }, { i: 41.74,  fB: 2.50 },
          { i: 36.84,  fB: 2.80 }, { i: 32.66,  fB: 3.20 },
          { i: 34.40,  fB: 2.90 }, { i: 31.40,  fB: 3.30 }, { i: 27.84,  fB: 3.70 },
          { i: 23.40,  fB: 4.40 }, { i: 21.51,  fB: 4.70 },
        ],
      },
      3: {
        '4P': [
          { i: 93.38,  fB: 0.80 }, { i: 81.92,  fB: 0.90 }, { i: 72.57,  fB: 1.05 }, { i: 63.68,  fB: 1.20 },
          { i: 60.35,  fB: 1.25 }, { i: 52.82,  fB: 1.45 }, { i: 47.58,  fB: 1.60 },
          { i: 41.74,  fB: 1.80 }, { i: 37.13,  fB: 2.00 }, { i: 32.66,  fB: 2.30 }, { i: 27.88,  fB: 2.60 },
          { i: 34.40,  fB: 2.10 }, { i: 31.40,  fB: 2.40 }, { i: 27.84,  fB: 2.70 },
          { i: 23.40,  fB: 3.20 }, { i: 21.51,  fB: 3.40 }, { i: 19.10,  fB: 3.70 },
          { i: 17.08,  fB: 4.00 }, { i: 15.35,  fB: 4.30 },
        ],
      },
      4: {
        '4P': [
          { i: 63.68,  fB: 0.90 }, { i: 60.35,  fB: 0.95 }, { i: 52.82,  fB: 1.10 },
          { i: 47.58,  fB: 1.20 }, { i: 41.74,  fB: 1.40 }, { i: 36.84,  fB: 1.55 },
          { i: 32.66,  fB: 1.75 }, { i: 27.88,  fB: 2.00 },
          { i: 34.40,  fB: 1.60 }, { i: 31.40,  fB: 1.85 }, { i: 27.84,  fB: 2.10 },
          { i: 23.40,  fB: 2.50 }, { i: 21.51,  fB: 2.60 }, { i: 19.10,  fB: 2.80 },
          { i: 17.08,  fB: 3.00 }, { i: 15.35,  fB: 3.20 }, { i: 13.33,  fB: 3.60 }, { i: 11.93,  fB: 3.80 },
        ],
      },
      5.5: { '4P': [
        { i: 47.58, fB: 0.90 }, { i: 41.74, fB: 1.00 }, { i: 36.84, fB: 1.15 }, { i: 32.66, fB: 1.30 },
        { i: 27.88, fB: 1.45 }, { i: 27.84, fB: 1.50 }, { i: 23.40, fB: 1.80 }, { i: 21.51, fB: 1.90 },
        { i: 19.10, fB: 2.0 },  { i: 17.08, fB: 2.2 },  { i: 15.35, fB: 2.4 }, { i: 13.33, fB: 2.6 },
        { i: 11.93, fB: 2.8 }, { i: 9.90, fB: 3.2 }, { i: 9.14, fB: 3.6 }, { i: 8.22, fB: 3.8 }, { i: 7.13, fB: 4.1 },
      ]},
      7.5: { '4P': [
        { i: 36.84, fB: 0.85 }, { i: 32.66, fB: 0.95 }, { i: 27.88, fB: 1.05 },
        { i: 27.84, fB: 1.10 }, { i: 23.40, fB: 1.30 }, { i: 21.51, fB: 1.40 },
        { i: 19.10, fB: 1.50 }, { i: 17.08, fB: 1.65 }, { i: 15.35, fB: 1.75 },
        { i: 13.33, fB: 1.90 }, { i: 11.93, fB: 2.10 }, { i: 9.90,  fB: 2.40 },
        { i: 9.14,  fB: 2.60 }, { i: 8.22,  fB: 2.80 }, { i: 7.13,  fB: 3.00 },
        { i: 6.39,  fB: 3.20 }, { i: 5.30,  fB: 3.40 },
      ]},
      9.2: { '4P': [
        { i: 21.51, fB: 1.15 }, { i: 19.10, fB: 1.25 }, { i: 17.08, fB: 1.35 },
        { i: 15.35, fB: 1.45 }, { i: 13.33, fB: 1.55 }, { i: 11.93, fB: 1.70 },
        { i: 9.90,  fB: 1.95 }, { i: 9.14,  fB: 2.20 }, { i: 8.22,  fB: 2.30 },
        { i: 7.13,  fB: 2.50 }, { i: 6.39,  fB: 2.60 },
      ]},
      11: { '4P': [
        { i: 21.51, fB: 0.95 }, { i: 19.10, fB: 1.05 }, { i: 17.08, fB: 1.10 },
        { i: 15.35, fB: 1.20 }, { i: 13.33, fB: 1.30 }, { i: 11.93, fB: 1.40 },
        { i: 9.90,  fB: 1.65 }, { i: 9.14,  fB: 1.80 }, { i: 8.22,  fB: 1.95 },
        { i: 7.13,  fB: 2.10 }, { i: 6.39,  fB: 2.20 }, { i: 5.30,  fB: 2.30 },
      ]},
      15.0: { '4P': [
        { i: 17.08, fB: 0.85 }, { i: 15.35, fB: 0.90 }, { i: 13.33, fB: 1.00 }, { i: 11.93, fB: 1.05 },
        { i: 9.90,  fB: 1.20 }, { i: 9.14,  fB: 1.35 }, { i: 8.22,  fB: 1.45 },
        { i: 7.13,  fB: 1.55 }, { i: 6.39,  fB: 1.65 }, { i: 5.30,  fB: 1.75 },
      ]},
      18.5: { '4P': [
        { i: 13.33, fB: 0.80 }, { i: 11.93, fB: 0.85 }, { i: 9.90,  fB: 1.00 }, { i: 9.14,  fB: 1.10 },
        { i: 8.22,  fB: 1.15 }, { i: 7.13,  fB: 1.25 }, { i: 6.39,  fB: 1.30 }, { i: 5.30,  fB: 1.40 },
      ]},
      22: { '4P': [
        { i: 9.90, fB: 0.85 }, { i: 9.14, fB: 0.90 }, { i: 8.22, fB: 1.00 },
        { i: 7.13, fB: 1.05 }, { i: 6.39, fB: 1.10 }, { i: 5.30, fB: 1.20 },
      ]},
    },

    R97: {
      0.25: {
        '8P': [
          { i: 289.74, fB: 3.00 }, { i: 255.71, fB: 3.3 },
          { i: 241.25, fB: 3.5 },  { i: 216.28, fB: 4.0 },
        ],
      },
      0.37: {
        '8P': [
          { i: 255.71, fB: 2.30 }, { i: 241.25, fB: 2.40 }, { i: 216.28, fB: 2.7 }, { i: 186.30, fB: 3.1 },
        ],
        '6P': [
          { i: 289.74, fB: 2.60 }, { i: 255.71, fB: 3.00 }, { i: 241.25, fB: 3.20 }, { i: 216.28, fB: 3.50 },
        ],
      },
      0.55: {
        '8P': [
          { i: 255.71, fB: 1.50 }, { i: 241.25, fB: 1.60 }, { i: 216.28, fB: 1.80 },
        ],
        '6P': [
          { i: 289.74, fB: 1.75 }, { i: 255.71, fB: 2.00 }, { i: 241.25, fB: 2.10 }, { i: 216.28, fB: 2.40 },
        ],
        '4P': [
          { i: 289.74, fB: 2.70 }, { i: 255.71, fB: 3.00 }, { i: 241.25, fB: 3.2 }, { i: 216.28, fB: 3.6 },
        ],
      },
      0.75: {
        '8P': [
          { i: 216.28, fB: 1.35 }, { i: 186.30, fB: 1.55 }, { i: 170.02, fB: 1.75 },
        ],
        '6P': [
          { i: 255.71, fB: 1.45 }, { i: 241.25, fB: 1.55 }, { i: 216.28, fB: 1.75 },
        ],
        '4P': [
          { i: 289.74, fB: 2.00 }, { i: 255.71, fB: 2.30 }, { i: 241.25, fB: 2.4 }, { i: 216.28, fB: 2.7 }, { i: 186.30, fB: 3.1 }, { i: 170.02, fB: 3.4 },
        ],
      },
      1.1: {
        '6P': [
          { i: 255.71, fB: 1.05 }, { i: 241.25, fB: 1.10 }, { i: 216.28, fB: 1.20 }, { i: 186.30, fB: 1.40 },
        ],
        '4P': [
          { i: 255.71, fB: 1.55 }, { i: 241.25, fB: 1.65 }, { i: 216.28, fB: 1.85 }, { i: 186.30, fB: 2.2 }, { i: 170.02, fB: 2.3 }, { i: 150.78, fB: 2.7 }, { i: 126.75, fB: 3.2 }, { i: 116.48, fB: 3.4 },
        ],
      },
      1.5: {
        '4P': [
{ i: 255.71, fB: 1.15 }, { i: 241.25, fB: 1.20 }, { i: 216.28, fB: 1.35 }, { i: 186.30, fB: 1.60 }, { i: 170.02, fB: 1.75 }, { i: 150.78, fB: 1.95 }, { i: 126.75, fB: 2.3 }, { i: 116.48, fB: 2.5 }, { i: 103.44, fB: 2.8 }, { i: 92.48, fB: 3.2 },
        ],
      },
      2.2: {
        '4P': [
{ i: 216.28, fB: 0.95 }, { i: 186.30, fB: 1.10 }, { i: 170.02, fB: 1.20 }, { i: 150.78, fB: 1.35 }, { i: 126.75, fB: 1.60 }, { i: 116.48, fB: 1.75 }, { i: 103.44, fB: 1.95 }, { i: 92.48, fB: 2.2 }, { i: 83.15, fB: 2.4 }, { i: 72.17, fB: 2.8 }, { i: 65.21, fB: 3.1 }, { i: 59.92, fB: 3.4 }, { i: 53.21, fB: 3.8 }, { i: 47.58, fB: 4.2 },
        ],
      },
      3: {
        '4P': [
{ i: 150.78, fB: 0.95 }, { i: 126.75, fB: 1.15 }, { i: 116.48, fB: 1.25 }, { i: 103.44, fB: 1.40 }, { i: 92.48, fB: 1.60 }, { i: 83.15, fB: 1.75 }, { i: 72.17, fB: 2.0 }, { i: 65.21, fB: 2.2 }, { i: 59.92, fB: 2.5 }, { i: 53.21, fB: 2.8 }, { i: 47.58, fB: 3.1 }, { i: 42.78, fB: 3.4 }, { i: 37.13, fB: 4.0 }, { i: 33.25, fB: 4.2 },
        ],
      },
      4: {
        '4P': [
{ i: 116.48, fB: 0.95 }, { i: 103.44, fB: 1.10 }, { i: 92.48, fB: 1.20 }, { i: 83.15, fB: 1.35 }, { i: 72.17, fB: 1.55 }, { i: 65.21, fB: 1.70 }, { i: 59.92, fB: 1.85 }, { i: 53.21, fB: 2.1 }, { i: 47.58, fB: 2.3 }, { i: 42.78, fB: 2.6 }, { i: 37.13, fB: 3.0 }, { i: 33.25, fB: 3.2 }, { i: 32.05, fB: 3.0 }, { i: 27.19, fB: 3.5 }, { i: 25.03, fB: 4.2 }, { i: 22.37, fB: 4.5 }, { i: 20.14, fB: 4.8 },
        ],
      },
      5.5: { 
      '4P': [
{ i: 83.15, fB: 1.00 }, { i: 72.17, fB: 1.15 }, { i: 65.21, fB: 1.25 }, { i: 59.92, fB: 1.35 }, { i: 53.21, fB: 1.55 }, { i: 47.58, fB: 1.70 }, { i: 42.78, fB: 1.90 }, { i: 37.13, fB: 2.2 }, { i: 33.25, fB: 2.4 }, { i: 27.58, fB: 2.6 }, { i: 32.05, fB: 2.2 }, { i: 27.19, fB: 2.6 }, { i: 25.03, fB: 3.1 }, { i: 22.37, fB: 3.3 }, { i: 20.14, fB: 3.5 }, { i: 18.24, fB: 3.7 }, { i: 16.17, fB: 4.0 },
      ]},
      7.5: { '4P': [
{ i: 59.92, fB: 1.00 }, { i: 53.21, fB: 1.15 }, { i: 47.58, fB: 1.25 }, { i: 42.78, fB: 1.40 }, { i: 37.13, fB: 1.60 }, { i: 33.25, fB: 1.75 }, { i: 27.58, fB: 1.95 }, { i: 32.05, fB: 1.60 }, { i: 27.19, fB: 1.90 }, { i: 25.03, fB: 2.3 }, { i: 22.37, fB: 2.4 }, { i: 20.14, fB: 2.6 }, { i: 18.24, fB: 2.7 },
      ]},
      9.2: { '4P': [
{ i: 53.21, fB: 0.90 }, { i: 47.58, fB: 1.05 }, { i: 42.78, fB: 1.15 }, { i: 37.13, fB: 1.30 }, { i: 33.25, fB: 1.40 }, { i: 27.58, fB: 1.60 }, { i: 25.03, fB: 1.85 }, { i: 22.37, fB: 2.0 }, { i: 20.14, fB: 2.1 }, { i: 18.24, fB: 2.2 }, { i: 16.17, fB: 2.4 }, { i: 14.62, fB: 2.6 }, { i: 12.39, fB: 2.9 },
      ]},
      11: { '4P': [
{ i: 42.78, fB: 0.95 }, { i: 37.13, fB: 1.10 }, { i: 33.25, fB: 1.20 }, { i: 27.58, fB: 1.35 }, { i: 25.03, fB: 1.55 }, { i: 22.37, fB: 1.65 }, { i: 20.14, fB: 1.80 }, { i: 18.24, fB: 1.90 }, { i: 16.17, fB: 2.0 }, { i: 14.62, fB: 2.2 }, { i: 12.39, fB: 2.4 }, { i: 10.83, fB: 2.7 }, { i: 9.29, fB: 3.0 }, { i: 8.39, fB: 3.3 }, { i: 7.12, fB: 3.8 }, { i: 6.21, fB: 4.2 },
      ]},
      15.0: { '4P': [
{ i: 27.58, fB: 1.00 }, { i: 25.03, fB: 1.15 }, { i: 22.37, fB: 1.25 }, { i: 20.14, fB: 1.30 }, { i: 18.24, fB: 1.40 }, { i: 16.17, fB: 1.50 }, { i: 14.62, fB: 1.60 }, { i: 12.39, fB: 1.80 }, { i: 10.83, fB: 1.95 }, { i: 9.29, fB: 2.2 }, { i: 8.39, fB: 2.5 }, { i: 7.12, fB: 2.9 }, { i: 6.21, fB: 3.1 },
      ]},
      18.5: { '4P': [
{ i: 20.14, fB: 1.05 }, { i: 18.24, fB: 1.15 }, { i: 16.17, fB: 1.25 }, { i: 14.62, fB: 1.30 }, { i: 12.39, fB: 1.45 }, { i: 10.83, fB: 1.60 }, { i: 9.29, fB: 1.80 }, { i: 8.39, fB: 2.0 }, { i: 7.12, fB: 2.3 }, { i: 6.21, fB: 2.5 }, { i: 5.20, fB: 2.8 }, { i: 4.50, fB: 3.0 },
      ]},
      22: { '4P': [
        { i: 20.14, fB: 0.90 }, { i: 18.24, fB: 0.95 }, { i: 16.17, fB: 1.05 }, { i:14.62, fB: 1.10 }, { i: 12.39, fB: 1.25 }, { i: 10.83, fB: 1.35 }, { i: 9.29, fB: 1.50 }, { i: 8.39, fB: 1.70 }, { i: 7.12, fB: 1.95 }, { i: 6.21, fB: 2.1 }, { i: 5.20, fB: 2.40 }, { i: 4.50, fB: 2.5 },
      ]},
      30: { '4P': [
{ i:14.62, fB: 0.80 }, { i: 12.39, fB: 0.90 }, { i: 10.83, fB: 1.00 }, { i: 9.29, fB: 1.10 }, { i: 8.39, fB: 1.25 }, { i: 7.12, fB: 1.45 }, { i: 6.21, fB: 1.55 }, { i: 5.20, fB: 1.75 }, { i: 4.50, fB: 1.85 },
      ]},
    },
    R107: {
      0.75: {
        '8P': [
          { i: 251.15, fB: 1.65 }, { i: 229.95, fB: 1.80 }, { i: 203.16, fB: 2.0 },
        ],
      },
      1.1: {
        '8P': [
{ i: 251.15, fB: 1.10 }, { i: 229.95, fB: 1.20 }, { i: 203.16, fB: 1.35 }, { i: 172.34, fB: 1.60 },
        ],
      },
      1.5: {
      '8P': [
          { i: 229.95, fB: 0.90 }, { i: 203.16, fB: 1.05 }, { i: 172.34, fB: 1.20 }, { i: 158.68, fB: 1.30 },
      ],
      '6P': [
{ i: 251.15, fB: 1.10 }, { i: 229.95, fB: 1.20 }, { i: 203.16, fB: 1.35 }, { i: 172.34, fB: 1.60 }, { i: 158.68, fB: 1.75 }, { i: 141.83, fB: 1.95 },
        ],
      },
      2.2: {
      '6P': [
          { i: 203.16, fB: 0.95 }, { i: 172.34, fB: 1.10 }, { i: 158.68, fB: 1.20 }, { i: 141.83, fB: 1.35 },
      ],
      '4P': [
{ i: 251.15, fB: 1.15 }, { i: 229.95, fB: 1.25 }, { i: 203.16, fB: 1.40 }, { i: 172.34, fB: 1.65 }, { i: 158.68, fB: 1.80 }, { i: 141.83, fB: 2.0 }, { i: 127.68, fB: 2.3 }, { i: 115.63, fB: 2.5 }, { i: 102.53, fB: 2.8 }, { i: 92.70, fB: 3.10},
        ],
      },
      3: {
        '6P': [
          { i: 158.68, fB: 0.90 }, { i: 141.83, fB: 1.00 }, { i: 127.68, fB: 1.10 },
        ],
        '4P': [
{ i: 229.95, fB: 0.90 }, { i: 203.16, fB: 1.05 }, { i: 172.34, fB: 1.20 }, { i: 158.68, fB: 1.30 }, { i: 141.83, fB: 1.50 }, { i: 127.68, fB: 1.65 }, { i: 115.63, fB: 1.80 }, { i: 102.53, fB: 2.0 }, { i: 92.70, fB: 2.30}, { i: 78.57, fB: 2.7 }, { i: 72.88, fB: 2.9 },
        ],
      },
      4: {
        '4P': [
{ i: 172.34, fB: 0.95 }, { i: 158.68, fB: 1.05 }, { i: 141.83, fB: 1.15 }, { i: 127.68, fB: 1.25 }, { i: 115.63, fB: 1.40 }, { i: 102.53, fB: 1.55 }, { i: 92.70, fB: 1.70}, { i: 78.57, fB: 2.0 }, { i: 72.88, fB: 2.2 }, { i: 65.60, fB: 2.4 }, { i: 59.41, fB: 2.7 }, { i: 52.68, fB: 3.0 },
        ],
      },
      5.5: { 
      '4P': [
{ i: 127.68, fB: 0.90 }, { i: 115.63, fB: 1.00 }, { i: 102.53, fB: 1.15 }, { i: 92.70, fB: 1.25 }, { i: 78.57, fB: 1.50 }, { i: 72.88, fB: 1.60 }, { i: 65.60, fB: 1.80 }, { i: 59.41, fB: 1.95 }, { i: 52.68, fB: 2.2 }, { i: 47.63, fB: 2.50 }, { i: 40.37, fB: 2.9 },
      ]},
      7.5: { '4P': [
{ i: 92.70, fB: 0.95 }, { i: 78.57, fB: 1.10 }, { i: 72.88, fB: 1.20 }, { i: 65.60, fB: 1.30 }, { i: 59.41, fB: 1.45 }, { i: 52.68, fB: 1.65 }, { i: 47.63, fB: 1.80 }, { i: 40.37, fB: 2.1 }, { i: 35.26, fB: 2.4 }, { i: 29.49, fB: 2.9 }, { i: 30.77, fB: 2.80 }, { i: 27.58, fB: 3.10 }, { i: 24.90, fB: 3.50 }, { i: 22.62, fB: 3.80 },
      ]},
      9.2: { '4P': [
{ i: 78.57, fB: 0.90 }, { i: 72.88, fB: 0.95 }, { i: 65.60, fB: 1.05 }, { i: 59.41, fB: 1.20 }, { i: 52.68, fB: 1.35 }, { i: 47.63, fB: 1.50 }, { i: 40.37, fB: 1.75 }, { i: 35.26, fB: 2.0 }, { i: 29.49, fB: 2.4 }, { i: 30.77, fB: 2.30 }, { i: 27.58, fB: 2.60 }, { i: 24.90, fB: 2.80 }, { i: 22.62, fB: 3.10 }, { i: 20.07, fB: 3.50 },
      ]},
      11: { '4P': [
{ i: 65.60, fB: 0.90 }, { i: 59.41, fB: 1.00 }, { i: 52.68, fB: 1.10 }, { i: 47.63, fB: 1.25 }, { i: 40.37, fB: 1.45 }, { i: 35.26, fB: 1.65 }, { i: 29.49, fB: 2.0 }, { i: 30.77, fB: 1.90 }, { i: 27.58, fB: 2.10 }, { i: 24.90, fB: 2.40 }, { i: 22.62, fB: 2.60 }, { i: 20.07, fB: 2.90 }, { i: 18.21, fB: 3.20 },
      ]},
      15.0: { '4P': [
{ i: 47.63, fB: 0.90 }, { i: 40.37, fB: 1.10 }, { i: 35.26, fB: 1.25 }, { i: 29.49, fB: 1.50 }, { i: 30.77, fB: 1.40 }, { i: 27.58, fB: 1.60 }, { i: 24.90, fB: 1.75 }, { i: 22.62, fB: 1.95 }, { i: 20.07, fB: 2.20 }, { i: 18.21, fB: 2.40 }, { i: 15.65, fB: 2.80 }, { i: 13.66, fB: 3.20 },
      ]},
      18.5: { '4P': [
{ i: 40.37, fB: 0.90 }, { i: 35.26, fB: 1.00 }, { i: 29.49, fB: 1.20 }, { i: 24.90, fB: 1.45 }, { i: 22.62, fB: 1.60 }, { i: 20.07, fB: 1.80 }, { i: 18.21, fB: 1.95 }, { i: 15.65, fB: 2.30 }, { i: 13.66, fB: 2.60 }, { i: 11.59, fB: 3.10 }, { i:10.13, fB: 3.5 }, { i: 8.56, fB: 3.3 }, { i: 7.86, fB: 3.1 }, { i: 6.66, fB: 3.7 },
      ]},
      22: { '4P': [
{ i: 35.26, fB: 0.85 }, { i: 29.49, fB: 1.00 }, { i: 24.90, fB: 1.20 }, { i: 22.62, fB: 1.35 }, { i: 20.07, fB: 1.50 }, { i: 18.21, fB: 1.65 }, { i: 15.65, fB: 1.90 }, { i: 13.66, fB: 2.2 }, { i: 11.59, fB: 2.60 }, { i:10.13, fB: 3.0 }, { i: 8.56, fB: 3.5 }, { i: 7.86, fB: 2.6 }, { i: 6.66, fB: 3.1 }, { i: 5.82, fB: 3.60 },
      ]},
      30: { '4P': [
{ i: 20.07, fB: 1.10 }, { i: 18.21, fB: 1.20 }, { i: 15.65, fB: 1.40 }, { i: 13.66, fB: 1.60 }, { i: 11.59, fB: 1.90 }, { i:10.13, fB: 2.2 }, { i: 8.56, fB: 2.60 }, { i: 7.86, fB: 1.95 }, { i: 6.66, fB: 2.3 }, { i: 5.82, fB: 2.60 }, { i: 4.92, fB: 3.0 },
      ]},
      37: { '4P': [
{ i: 20.07, fB: 0.90 }, { i: 18.21, fB: 1.00 }, { i: 15.65, fB: 1.15 }, { i: 13.66, fB: 1.30 }, { i: 11.59, fB: 1.55 }, { i:10.13, fB: 1.75 }, { i: 8.56, fB: 2.10 }, { i: 7.86, fB: 1.55 }, { i: 6.66, fB: 1.85 }, { i: 5.82, fB: 2.10 }, { i: 4.92, fB: 2.5 },
      ]},
      45: { '4P': [
{ i: 15.65, fB: 0.95 }, { i: 13.66, fB: 1.10 }, { i: 11.59, fB: 1.25 }, { i:10.13, fB: 1.45 }, { i: 8.56, fB: 1.70 }, { i: 7.86, fB: 1.30 }, { i: 6.66, fB: 1.50 }, { i: 5.82, fB: 1.75 }, { i: 4.92, fB: 2.0 },
      ]},
    },

        R137: {
      2.2: {
        '8P': [
          { i: 222.60, fB: 1.20 }, { i: 188.45, fB: 1.40 }, { i: 174.40, fB: 1.55 }, { i: 156.31, fB: 1.70 }, { i: 141.12, fB: 1.90 }, { i: 128.18, fB: 2.10 }, { i: 113.72, fB: 2.30 }, { i: 103.20, fB: 2.60 },
        ],
      },
      3: {
        '8P': [
          { i: 222.60, fB: 0.90 }, { i: 188.45, fB: 1.05 }, { i: 174.40, fB: 1.15 }, { i: 156.31, fB: 1.30 }, { i: 141.12, fB: 1.40 }, { i: 128.18, fB: 1.55 }, { i: 113.72, fB: 1.75 }, { i: 103.20, fB: 1.95 }, { i: 88.70, fB: 2.30 },
        ],
        '6P': [
{ i: 222.60, fB: 1.20 }, { i: 188.45, fB: 1.40 }, { i: 174.40, fB: 1.50 }, { i: 156.31, fB: 1.70 }, { i: 141.12, fB: 1.85 }, { i: 128.18, fB: 2.0 }, { i: 113.72, fB: 2.3 }, { i: 103.20, fB: 2.5 }, 
        ],
      },
      4: {
        '8P': [
          { i: 174.40, fB: 0.85 }, { i: 156.31, fB: 0.95 }, { i: 141.12, fB: 1.05 }, { i: 128.18, fB: 1.20 }, { i: 113.72, fB: 1.35 }, { i: 103.20, fB: 1.45 },
        ],
        '6P': [
{ i: 222.60, fB: 0.90 }, { i: 188.45, fB: 1.05 }, { i: 174.40, fB: 1.15 }, { i: 156.31, fB: 1.30 }, { i: 141.12, fB: 1.40 }, { i: 128.18, fB: 1.55 }, { i: 113.72, fB: 1.75 }, { i: 103.20, fB: 1.95 }, { i: 88.70, fB: 2.3 }, 
        ],
      },
      5.5: { 
      '8P': [
{ i: 128.18, fB: 0.85 }, { i: 113.72, fB: 0.95 }, { i: 103.20, fB: 1.05 }, { i: 88.70, fB: 1.2 },
        ],
        '6P': [
{ i: 174.40, fB: 0.85 }, { i: 156.31, fB: 0.95 }, { i: 141.12, fB: 1.05 }, { i: 128.18, fB: 1.15 }, { i: 113.72, fB: 1.30 }, { i: 103.20, fB: 1.40 },
        ],
        '4P': [
{ i: 222.60, fB: 1.00 }, { i: 188.45, fB: 1.15 }, { i: 174.40, fB: 1.25 }, { i: 156.31, fB: 1.40 }, { i: 141.12, fB: 1.55 }, { i: 128.18, fB: 1.70 }, { i: 113.72, fB: 1.90 }, { i: 103.20, fB: 2.1 }, { i: 88.70, fB: 2.5 }, { i: 80.91, fB: 2.7 }, { i: 73.49, fB: 3.0 }, { i: 65.20, fB: 3.3 }, { i: 59.17, fB: 3.7 }, { i: 50.86, fB: 4.3 }, 
        ],
},
      7.5: { '4P': [
{ i: 188.45, fB: 0.85 }, { i: 174.40, fB: 0.90 }, { i: 156.31, fB: 1.00 }, { i: 141.12, fB: 1.15 }, { i: 128.18, fB: 1.25 }, { i: 113.72, fB: 1.40 }, { i: 103.20, fB: 1.55 }, { i: 88.70, fB: 1.80 }, { i: 80.91, fB: 1.95 }, { i: 73.49, fB: 2.2 }, { i: 65.20, fB: 2.5 }, { i: 59.17, fB: 2.7 }, { i: 50.86, fB: 3.1 },
      ]},
      9.2: { '4P': [
{ i: 156.31, fB: 0.85 }, { i: 141.12, fB: 0.95 }, { i: 128.18, fB: 1.00 }, { i: 113.72, fB: 1.15 }, { i: 103.20, fB: 1.25 }, { i: 88.70, fB: 1.50 }, { i: 80.91, fB: 1.60 }, { i: 73.49, fB: 1.80 }, { i: 65.20, fB: 2.0 }, { i: 59.17, fB: 2.2 }, { i: 50.86, fB: 2.6 }, { i: 44.39, fB: 3.0 },
      ]},
      11: { '4P': [
{ i: 141.12, fB: 0.80 }, { i: 128.18, fB: 0.85 }, { i: 113.72, fB: 0.95 }, { i: 103.20, fB: 1.05 }, { i: 88.70, fB: 1.25 }, { i: 80.91, fB: 1.35 }, { i: 73.49, fB: 1.50 }, { i: 65.20, fB: 1.70 }, { i: 59.17, fB: 1.85 }, { i: 50.86, fB: 2.2 }, { i: 44.39, fB: 2.5 }, { i: 37.65, fB: 2.9 }, { i: 32.91, fB: 2.9 }, 
      ]},
      15.0: { '4P': [
{ i: 103.20, fB: 0.80 }, { i: 88.70, fB: 0.90 }, { i: 80.91, fB: 1.00 }, { i: 73.49, fB: 1.10 }, { i: 65.20, fB: 1.25 }, { i: 59.17, fB: 1.40 }, { i: 50.86, fB: 1.60 }, { i: 44.39, fB: 1.85 }, { i: 37.65, fB: 2.2 }, { i: 32.91, fB: 2.5 }, { i: 27.83, fB: 2.8 },
      ]},
      18.5: { '4P': [
{ i: 80.91, fB: 0.80 }, { i: 73.49, fB: 0.90 }, { i: 65.20, fB: 1.00 }, { i: 59.17, fB: 1.10 }, { i: 50.86, fB: 1.30 }, { i: 44.39, fB: 1.50 }, { i: 37.65, fB: 1.75 }, { i: 32.91, fB: 2.0 }, { i: 27.83, fB: 2.3 }, { i: 29.57, fB: 2.2 }, { i: 24.12, fB: 2.8 }, { i: 22.00, fB: 3.0 }, { i: 19.04, fB: 3.5 }, { i: 16.80, fB: 4.0 },
      ]},
      22: { '4P': [
{ i: 65.20, fB: 0.85 }, { i: 59.17, fB: 0.95 }, { i: 50.86, fB: 1.10 }, { i: 44.39, fB: 1.25 }, { i: 37.65, fB: 1.50 }, { i: 32.91, fB: 1.70 }, { i: 27.83, fB: 1.90 }, { i: 29.57, fB: 1.85 }, { i: 24.12, fB: 2.3 }, { i: 22.00, fB: 2.5 }, { i: 19.04, fB: 2.9 }, { i: 16.80, fB: 3.3 }, { i: 14.51, fB: 3.8 }, { i: 12.83, fB: 4.3 },
      ]},
      30: { '4P': [
{ i: 50.86, fB: 0.80 }, { i: 44.39, fB: 0.90 }, { i: 37.65, fB: 1.10 }, { i: 32.91, fB: 1.25 }, { i: 27.83, fB: 1.40 }, { i: 24.12, fB: 1.70 }, { i: 22.00, fB: 1.85 }, { i: 19.04, fB: 2.2 }, { i: 16.80, fB: 2.4 }, { i: 14.51, fB: 2.8 }, { i: 12.83, fB: 3.2 }, { i: 10.79, fB: 3.8 }, { i: 7.59, fB: 3.5 }, { i: 6.38, fB: 4.1 },
      ]},
      37: { '4P': [
{ i: 37.65, fB: 0.90 }, { i: 32.91, fB: 1.00 }, { i: 27.83, fB: 1.15 }, { i: 24.12, fB: 1.40 }, { i: 22.00, fB: 1.50 }, { i: 19.04, fB: 1.75 }, { i: 16.80, fB: 2.0 }, { i: 14.51, fB: 2.3 }, { i: 12.83, fB: 2.6 }, { i: 10.79, fB: 3.1 }, { i: 7.59, fB: 2.8 }, { i: 6.38, fB: 3.3 }, { i: 5.15, fB: 3.7 },
      ]},
      45: { '4P': [
{ i: 32.91, fB: 0.85 }, { i: 27.83, fB: 0.95 }, { i: 24.12, fB: 1.15 }, { i: 22.00, fB: 1.25 }, { i: 19.04, fB: 1.45 }, { i: 16.80, fB: 1.65 }, { i: 14.51, fB: 1.90 }, { i: 12.83, fB: 2.1 }, { i: 10.79, fB: 2.5 }, { i: 7.59, fB: 2.3 }, { i: 6.38, fB: 2.7 }, { i: 5.15, fB: 3.0 },
      ]},
      55: { '4P': [
{ i: 19.04, fB: 1.20 }, { i: 16.80, fB: 1.35 }, { i: 14.51, fB: 1.55 }, { i: 12.83, fB: 1.75 }, { i: 10.79, fB: 2.1 }, { i: 7.59, fB: 1.90 }, { i: 6.38, fB: 2.2 }, { i: 5.15, fB: 2.5 },
      ]},
    },
    R147: {
      4: {
        '8P': [
          { i: 163.31, fB: 1.50 }, { i: 146.91, fB: 1.65 }, { i: 119.86, fB: 2.00 }, { i: 109.31, fB: 2.2 },
        ],
      },
      5.5: { 
      '8P': [
{ i: 163.31, fB: 1.10 }, { i: 146.91, fB: 1.20 }, { i: 119.86, fB: 1.45 }, { i: 109.31, fB: 1.60 },
        ],
        '6P': [
{ i: 163.31, fB: 1.45 }, { i: 146.91, fB: 1.60 }, { i: 119.86, fB: 2.0 }, { i: 109.31, fB: 2.2 }, { i: 94.60, fB: 2.5 }, { i: 83.47, fB: 2.8 },
        ]
},
      7.5: {
      '8P': [
{ i: 163.31, fB: 0.80 }, { i: 146.91, fB: 0.90 }, { i: 119.86, fB: 1.10 }, { i: 109.31, fB: 1.20 },
        ],
        '6P': [
{ i: 163.31, fB: 1.05 }, { i: 146.91, fB: 1.20 }, { i: 119.86, fB: 1.45 }, { i: 109.31, fB: 1.60 }, { i: 94.60, fB: 1.85 }, { i: 83.47, fB: 2.1 },
        ]},
      9.2: { '4P': [
{ i: 163.31, fB: 1.30 }, { i: 146.91, fB: 1.45 }, { i: 119.86, fB: 1.80 }, { i: 109.31, fB: 1.95 }, { i: 94.60, fB: 2.2 }, { i: 83.47, fB: 2.5 }, { i: 72.09, fB: 3.0 }, { i: 66.99, fB: 3.2 },
      ]},
      11: { 
      '6P': [
{ i: 146.91, fB: 0.80 }, { i: 119.86, fB: 1.00 }, { i: 109.31, fB: 1.10 }, { i: 94.60, fB: 1.25 }, { i: 83.47, fB: 1.40 },
      ],
      '4P': [
{ i: 163.31, fB: 1.10 }, { i: 146.91, fB: 1.20 }, { i: 119.86, fB: 1.50 }, { i: 109.31, fB: 1.65 }, { i: 94.60, fB: 1.90 }, { i: 83.47, fB: 2.1 }, { i: 72.09, fB: 2.5 }, { i: 66.99, fB: 2.7 }, { i: 61.09, fB: 2.9 }, { i: 52.87, fB: 3.4 },
      ] },
      15: { 
      '6P': [
{ i: 109.31, fB: 0.80 }, { i: 94.60, fB: 0.95 }, { i: 83.47, fB: 1.05 }, { i: 72.09, fB: 1.20 }, { i: 66.99, fB: 1.30 },
      ],
      '4P': [
{ i: 163.31, fB: 0.80 }, { i: 146.91, fB: 0.90 }, { i: 119.86, fB: 1.10 }, { i: 109.31, fB: 1.20 }, { i: 94.60, fB: 1.40 }, { i: 83.47, fB: 1.60 }, { i: 72.09, fB: 1.85 }, { i: 66.99, fB: 2.0 }, { i: 61.09, fB: 2.2 }, { i: 52.87, fB: 2.5 }, { i: 46.65, fB: 2.8 },
      ]},
      18.5: { '4P': [
{ i: 119.86, fB: 0.90 }, { i: 109.31, fB: 1.00 }, { i: 94.60, fB: 1.15 }, { i: 83.47, fB: 1.30 }, { i: 72.09, fB: 1.50 }, { i: 66.99, fB: 1.60 }, { i: 61.09, fB: 1.75 }, { i: 52.87, fB: 2.0 }, { i: 46.65, fB: 2.2 }, { i: 40.29, fB: 2.7 },
      ]},
      22: { '4P': [
{ i: 109.31, fB: 0.85 }, { i: 94.60, fB: 0.95 }, { i: 83.47, fB: 1.10 }, { i: 72.09, fB: 1.25 }, { i: 66.99, fB: 1.35 }, { i: 61.09, fB: 1.50 }, { i: 52.87, fB: 1.70 }, { i: 46.65, fB: 1.95 }, { i: 40.29, fB: 2.2 }, { i: 35.64, fB: 2.5 }, { i: 29.95, fB: 3.0 },
      ]},
      30: { '4P': [
{ i: 83.47, fB: 0.80 }, { i: 72.09, fB: 0.95 }, { i: 66.99, fB: 1.00 }, { i: 61.09, fB: 1.10 }, { i: 52.87, fB: 1.25 }, { i: 46.65, fB: 1.45 }, { i: 40.29, fB: 1.65 }, { i: 35.64, fB: 1.85 }, { i: 29.95, fB: 2.2 }, { i: 24.19, fB: 2.5 },
      ]},
      37: { '4P': [
{ i: 66.99, fB: 0.80 }, { i: 61.09, fB: 0.90 }, { i: 52.87, fB: 1.00 }, { i: 46.65, fB: 1.15 }, { i: 40.29, fB: 1.35 }, { i: 35.64, fB: 1.50 }, { i: 29.95, fB: 1.80 }, { i: 24.19, fB: 2.0 }, { i: 20.44, fB: 2.4 }, { i: 18.04, fB: 2.4 }, { i: 15.64, fB: 3.5 }, { i: 13.91, fB: 3.8 },
      ]},
      45: { '4P': [
{ i: 52.87, fB: 0.85 }, { i: 46.65, fB: 0.95 }, { i: 40.29, fB: 1.10 }, { i: 35.64, fB: 1.25 }, { i: 29.95, fB: 1.50 }, { i: 24.19, fB: 1.70 }, { i: 20.44, fB: 2.0 }, { i: 18.04, fB: 2.0 }, { i: 15.64, fB: 2.8 }, { i: 13.91, fB: 3.1 }, { i: 11.99, fB: 3.7 }, { i: 7.25, fB: 4.1 },
      ]},
      55: { '4P': [
{ i: 46.65, fB: 0.80 }, { i: 40.29, fB: 0.90 }, { i: 35.64, fB: 1.00 }, { i: 29.95, fB: 1.20 }, { i: 24.19, fB: 1.40 }, { i: 20.44, fB: 1.65 }, { i: 18.04, fB: 1.65 }, { i: 15.64, fB: 2.3 }, { i: 13.91, fB: 2.5 }, { i: 11.99, fB: 3.0 }, { i: 7.25, fB: 3.8 }, { i: 5.89, fB: 4.1 },
      ]},
      75: { '4P': [
{ i: 29.95, fB: 0.90 }, { i: 24.19, fB: 1.00 }, { i: 20.44, fB: 1.20 }, { i: 18.04, fB: 1.20 }, { i: 15.64, fB: 1.70 }, { i: 13.91, fB: 1.85 }, { i: 11.99, fB: 2.2 }, { i: 7.25, fB: 2.5 }, { i: 5.89, fB: 3.0 }, { i: 5.00, fB: 3.6 },
      ]},
      90: { '4P': [
{ i: 20.44, fB: 1.00 }, { i: 18.04, fB: 1.00 }, { i: 15.64, fB: 1.45 }, { i: 13.91, fB: 1.55 }, { i: 11.99, fB: 1.85 }, { i: 7.25, fB: 2.1 }, { i: 5.89, fB: 2.5 }, { i: 5.00, fB: 3.0 },
      ]},      
    },

    R167: {
      15.0: [ /* เช่น { i: 186.93, fB: 0.80 }, { i: 153.07, fB: 1.00 }, ... */ ],
      18.5: [ /* เติมจากหน้าตาราง 18.5kW */ ],
    },
  },

  F: {
    F87: {
      0.37: {
        '8P': [
          { i: 270.68, fB: 2.10 }, { i: 255.37, fB: 2.30 },
          { i: 228.93, fB: 2.50 }, { i: 197.20, fB: 2.90 },
        ],
        '6P': [
          { i: 270.68, fB: 2.80 }, { i: 255.37, fB: 3.00 }, { i: 228.93, fB: 3.30 },
        ],
      },
      0.55: {
        '8P': [
          { i: 270.68, fB: 1.90 }, { i: 255.37, fB: 2.00 },
          { i: 228.93, fB: 2.20 }, { i: 197.20, fB: 2.60 },
        ],
        '6P': [
          { i: 270.68, fB: 1.90 }, { i: 255.37, fB: 2.00 }, { i: 228.93, fB: 2.20 },
          { i: 197.20, fB: 2.60 }, { i: 179.97, fB: 2.90 },
        ],
      },
      0.75: {
        '6P': [
          { i: 270.68, fB: 1.40 }, { i: 255.37, fB: 1.50 }, { i: 228.93, fB: 1.65 },
          { i: 197.20, fB: 1.90 }, { i: 179.97, fB: 2.10 }, { i: 156.61, fB: 2.40 },
        ],
        '4P': [
          { i: 270.68, fB: 2.10 }, { i: 255.37, fB: 2.30 }, { i: 228.93, fB: 2.50 },
        ],
      },
    },
  },

  K: {
    K87: {
      0.37: {
        '8P': [
          { i: 174.19, fB: 3.0 }, { i: 164.34, fB: 3.2 }, { i: 147.32, fB: 3.5 },
        ],
        '6P': [
          { i: 197.37, fB: 3.5 }, { i: 174.19, fB: 4.0 },
        ],
      },
      0.55: {
        '8P': [
          { i: 174.19, fB: 2.7 }, { i: 164.34, fB: 2.8 }, { i: 147.32, fB: 3.1 },
        ],
        '6P': [
          { i: 197.37, fB: 2.3 }, { i: 174.19, fB: 2.7 }, { i: 164.34, fB: 2.8 }, { i: 147.32, fB: 3.1 },
        ],
      },
      0.75: {
        '8P': [
          { i: 147.32, fB: 1.75 }, { i: 126.91, fB: 2.00 }, { i: 115.82, fB: 2.20 }, { i: 102.71, fB: 2.50 },
        ],
        '6P': [
          { i: 174.19, fB: 1.95 }, { i: 164.34, fB: 2.10 }, { i: 147.32, fB: 2.30 }, { i: 126.91, fB: 2.70 },
        ],
        '4P': [
          { i: 197.37, fB: 2.60 }, { i: 174.19, fB: 3.00 }, { i: 164.34, fB: 3.20 }, { i: 147.32, fB: 3.50 },
        ],
      },
      1.1: {
        '6P': [
          { i: 174.19, fB: 2.1 }, { i: 164.34, fB: 2.2 }, { i: 147.32, fB: 2.4 }, { i: 126.91, fB: 2.8 },
        ],
        '4P': [
          { i: 174.19, fB: 2.1 }, { i: 164.34, fB: 2.2 }, { i: 147.32, fB: 2.4 },
          { i: 126.91, fB: 2.8 }, { i: 115.82, fB: 3.1 },
        ],
      },
      1.5: {
        '6P': [
          { i: 147.32, fB: 1.80 }, { i: 126.91, fB: 2.10 }, { i: 115.82, fB: 2.30 }, { i: 102.71, fB: 2.60 },
        ],
        '4P': [
          { i: 174.19, fB: 1.55 }, { i: 164.34, fB: 1.60 }, { i: 147.32, fB: 1.80 },
          { i: 126.91, fB: 2.10 }, { i: 115.82, fB: 2.30 }, { i: 102.71, fB: 2.60 },
          { i: 86.34,  fB: 3.10 },
        ],
      },
      2.2: {
        '4P': [
          { i: 147.32, fB: 1.25 }, { i: 126.91, fB: 1.45 }, { i: 115.82, fB: 1.55 }, { i: 102.71, fB: 1.75 },
          { i: 86.34,  fB: 2.10 }, { i: 79.34,  fB: 2.30 }, { i: 70.46,  fB: 2.60 }, { i: 63.00,  fB: 2.90 },
        ],
      },
      3: {
        '4P': [
          { i: 147.32, fB: 0.90 }, { i: 126.91, fB: 1.05 }, { i: 115.82, fB: 1.15 }, { i: 102.71, fB: 1.30 },
          { i: 86.34,  fB: 1.55 }, { i: 79.34,  fB: 1.65 }, { i: 70.46,  fB: 1.85 }, { i: 63.00,  fB: 2.10 },
          { i: 56.64,  fB: 2.30 }, { i: 49.16,  fB: 2.70 }, { i: 44.02,  fB: 2.90 }, { i: 36.52,  fB: 3.30 },
        ],
      },
      4: {
        '4P': [
          { i: 115.82, fB: 0.85 }, { i: 102.71, fB: 1.00 }, { i: 86.34,  fB: 1.15 }, { i: 79.34,  fB: 1.25 },
          { i: 70.46,  fB: 1.40 }, { i: 63.00,  fB: 1.60 }, { i: 56.64,  fB: 1.75 }, { i: 49.16,  fB: 2.00 },
          { i: 44.02,  fB: 2.20 }, { i: 36.52,  fB: 2.50 },
        ],
      },
      5.5: {
        '4P': [
          { i: 86.34, fB: 0.85 }, { i: 79.34, fB: 0.95 }, { i: 70.46, fB: 1.05 }, { i: 63.00, fB: 1.15 },
          { i: 56.64, fB: 1.30 }, { i: 49.16, fB: 1.50 }, { i: 44.02, fB: 1.60 }, { i: 36.52, fB: 1.85 },
          { i: 31.39, fB: 2.30 }, { i: 27.88, fB: 2.50 },
        ],
      },
      7.5: {
        '4P': [
          { i: 63.00, fB: 0.85 }, { i: 56.64, fB: 0.95 }, { i: 49.16, fB: 1.10 }, { i: 44.02, fB: 1.20 },
          { i: 36.52, fB: 1.35 }, { i: 31.39, fB: 1.70 }, { i: 27.88, fB: 1.85 }, { i: 24.92, fB: 2.00 },
          { i: 22.41, fB: 2.00 }, { i: 19.45, fB: 2.40 }, { i: 17.42, fB: 2.50 }, { i: 16.00, fB: 2.20 },
          { i: 14.45, fB: 2.90 },
        ],
      },
      9.2: {
        '4P': [
          { i: 49.16, fB: 0.90 }, { i: 44.02, fB: 0.95 }, { i: 36.52, fB: 1.10 }, { i: 31.39, fB: 1.40 },
          { i: 27.88, fB: 1.55 }, { i: 24.92, fB: 1.65 }, { i: 22.41, fB: 1.70 }, { i: 19.45, fB: 1.95 },
          { i: 17.42, fB: 2.10 }, { i: 16.00, fB: 1.85 }, { i: 14.45, fB: 2.40 }, { i: 12.56, fB: 2.60 },
          { i: 11.17, fB: 2.20 }, { i: 10.00, fB: 2.50 },
        ],
      },
      11: {
        '4P': [
          { i: 44.02, fB: 0.80 }, { i: 36.52, fB: 0.95 }, { i: 31.39, fB: 1.20 }, { i: 27.88, fB: 1.30 },
          { i: 24.92, fB: 1.40 }, { i: 22.41, fB: 1.40 }, { i: 19.45, fB: 1.60 }, { i: 17.42, fB: 1.75 },
          { i: 16.00, fB: 1.55 }, { i: 14.45, fB: 2.00 }, { i: 12.56, fB: 2.20 }, { i: 11.17, fB: 1.85 },
          { i: 10.00, fB: 2.10 }, { i: 8.29, fB: 2.30 }, { i: 7.21, fB: 2.50 },
        ],
      },
      15: {
        '4P': [
          { i: 31.39, fB: 0.90 }, { i: 27.88, fB: 0.95 }, { i: 24.92, fB: 1.00 }, { i: 22.41, fB: 1.05 },
          { i: 19.45, fB: 1.20 }, { i: 17.42, fB: 1.30 }, { i: 16.00, fB: 1.15 }, { i: 14.45, fB: 1.50 },
          { i: 12.56, fB: 1.60 }, { i: 11.17, fB: 1.35 }, { i: 10.00, fB: 1.55 }, { i: 8.29, fB: 1.70 },
          { i: 7.21, fB: 1.85 },
        ],
      },
      18.5: {
        '4P': [
          { i: 24.92, fB: 0.85 }, { i: 22.41, fB: 0.85 }, { i: 19.45, fB: 1.00 }, { i: 17.42, fB: 1.05 },
          { i: 14.45, fB: 1.20 }, { i: 12.56, fB: 1.30 }, { i: 11.17, fB: 1.10 }, { i: 10.00, fB: 1.25 },
          { i: 8.29, fB: 1.40 }, { i: 7.21, fB: 1.50 },
        ],
      },
    },
  },

  S: {
    // S77: { 5.5: [ { i, fB }, ... ] }
  },
};


function getServiceFactorFB(series, sizeCode, motorKw, pole, ratio) {
  // แปลง pole ให้เป็นรูปแบบ '4P','6P','8P' (ถ้าเป็นตัวเลข/ไม่มี P)
  const poleKey = String(pole).toUpperCase().endsWith('P')
    ? String(pole).toUpperCase()
    : `${pole}P`;

  const list =
    SERVICE_FACTOR_DB?.[series]?.[sizeCode]?.[Number(motorKw)]?.[poleKey]
    // บางหน้าไม่แยก pole ให้ลอง bucket '—' เป็น fallback เท่านั้น
    || SERVICE_FACTOR_DB?.[series]?.[sizeCode]?.[Number(motorKw)]?.['—']
    || null;

  if (!list || !list.length) return null;

  const r = Number(ratio);
  const exact = list.find(row => Math.abs(Number(row.i) - r) < 1e-6);
  if (exact) return Number(exact.fB);

  const sorted = [...list].sort((a, b) => Number(a.i) - Number(b.i));
  let lo = null, hi = null;
  for (let i = 0; i < sorted.length; i++) {
    const cur = sorted[i];
    if (Number(cur.i) <= r) lo = cur;
    if (Number(cur.i) >= r) { hi = cur; break; }
  }
  if (!lo) return hi ? Number(hi.fB) : null;
  if (!hi) return lo ? Number(lo.fB) : null;
  if (Number(hi.i) === Number(lo.i)) return Number(lo.fB);

  const t = (r - Number(lo.i)) / (Number(hi.i) - Number(lo.i));
  return Number(lo.fB) + t * (Number(hi.fB) - Number(lo.fB));
}

// [REPLACE] RKFS Drawing 2D path resolver — รองรับ R / K / F / S
function rkfsDrawingPdfPathByDesign(design, size) {
  const dRaw = String(design || '').toUpperCase().replace(/\s+/g, '');
  let d = dRaw;
  let n;

  // ระบุ Series จากตัวหน้า design
  const series =
    d.startsWith('K') ? 'K' :
    d.startsWith('F') ? 'F' :
    d.startsWith('S') ? 'S' :
    'R';

  // ------- เคส R-Series (ใช้กติกาเดิม) -------
  if (series === 'R') {
    // ดึง "ตัวหน้า" จากค่า size ที่เป็นคู่ เช่น R147R87 / RF167R109
    const m = String(size || '').toUpperCase().match(/^(RF|R)(\d+)R(\d+)$/);
    if (m) {
      d = m[1];                // 'R' หรือ 'RF' (ตัวหน้า)
      n = Number(m[2]);        // เลขตัวหน้า
    } else {
      n = Number(size);
    }

    if (!Number.isFinite(n)) return null;

    // กติกา:
    // - ถ้า Design ขึ้นต้นด้วย 'RX' (เช่น RX, RXF) => GRX + n
    // - อื่น ๆ (R, RF, ...) => GR + (n + 2)
    if (d.startsWith('RX')) {
      return `/model/pdf/RKFS/R/GRX${n}.pdf`;
    }
    return `/model/pdf/RKFS/R/GR${n + 2}.pdf`;
  }

  // ------- เคส K / F / S -------
  // size จะเป็นเลขล้วน เช่น 87, 57, 37 ฯลฯ
  const mSize = String(size || '').match(/(\d+)/);
  if (!mSize) return null;

  const numStr = mSize[1];        // "87" , "57" , ...
  const fileBase = `${series}${numStr}`;   // K87 / F37 / S57
  return `/model/pdf/RKFS/${series}/${fileBase}.pdf`;
}

// [REPLACE] ดาวน์โหลด Drawing 2D — รองรับ R + K + F + S
async function downloadRkfsDrawingPDF(design, size, modelCode) {
  const dRaw = String(design || '').toUpperCase().replace(/\s+/g, '');
  let d = dRaw;
  let n;

  // [NEW] ระบุ Series หลักจาก design
  const series =
    d.startsWith('K') ? 'K' :
    d.startsWith('F') ? 'F' :
    d.startsWith('S') ? 'S' :
    'R';

  // ================= K / F / S SERIES =================
  if (series === 'K' || series === 'F' || series === 'S') {
    // ดึงตัวเลขจาก size เช่น 87 จาก K87 / KA87 / SAF57 (จริง ๆ ใน state คือ "87","57" อยู่แล้ว)
    const mSize = String(size || '').match(/(\d+)/);
    const numStr = mSize ? mSize[1] : null;

    if (!numStr) {
      alert('ขนาด (size) ไม่ถูกต้อง');
      return;
    }

    const base = `/model/pdf/RKFS/${series}/`;
    const fileBase = `${series}${numStr}`;      // K87, F37, S57 ...
    const relPath = `${base}${fileBase}.pdf`;

    try {
      const res = await fetch(relPath, { cache: 'no-store' });
      if (!res.ok) {
        alert(
          `ไม่พบไฟล์ PDF: ${relPath}\n\n` +
          `ตรวจชื่อไฟล์ใน: C:\\Users\\Haruj\\gear-motor-app\\public\\model\\pdf\\RKFS\\${series}`
        );
        return;
      }

      const ct = (res.headers.get('content-type') || '').toLowerCase();
      const blob = await res.blob();
      const isPdf = ct.includes('pdf') || (blob.type && blob.type.toLowerCase().includes('pdf'));
      if (!isPdf) {
        alert('ไฟล์ที่พบไม่ใช่ PDF');
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // ชื่อไฟล์ = Model Code (ไม่ต้องตัด prefix แบบ RXXRXX)
      const displayName = String(modelCode || fileBase);
      const safeName = displayName.replace(/[^\w.-]/g, '_');

      a.download = `${safeName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      return; // ✅ เจอไฟล์แล้ว
    } catch (_) {
      alert(`เกิดข้อผิดพลาดระหว่างดาวน์โหลดไฟล์:\n${relPath}`);
      return;
    }
  }

  // ================= R SERIES (ตรรกะเดิมทั้งหมด) =================

  // ดึง "ตัวหน้า" จาก size แบบคู่ เช่น R147R87 / RF167R109
  const m = String(size || '').toUpperCase().match(/^(RF|R)(\d+)R(\d+)$/);
  if (m) {
    d = m[1];          // 'R' หรือ 'RF' ของตัวหน้า
    n = Number(m[2]);  // เลขตัวหน้า
  } else {
    n = Number(size);
  }

  if (!Number.isFinite(n)) {
    alert('ขนาด (size) ไม่ถูกต้อง');
    return;
  }

  // --- สร้าง candidates ตามกติกาเดิม ---
  let candidates = [];
  if (d.startsWith('RX')) {
    // RX / RXF: ให้ลอง GRX n, n+2, n-2
    candidates = [`GRX${n}`, `GRX${n + 2}`, `GRX${n - 2}`];
  } else {
    // R / RF / อื่น ๆ: ใช้ GR (n+2) เป็นหลัก แล้วกันพลาดด้วย n และ n-2
    candidates = [`GR${n + 2}`, `GR${n}`, `GR${n - 2}`];
  }

  const base = `/model/pdf/RKFS/R/`;

  for (const fileBase of candidates) {
    const relPath = `${base}${fileBase}.pdf`;
    try {
      const res = await fetch(relPath, { cache: 'no-store' });
      if (!res.ok) continue;
      const ct = (res.headers.get('content-type') || '').toLowerCase();
      const blob = await res.blob();
      const isPdf = ct.includes('pdf') || (blob.type && blob.type.toLowerCase().includes('pdf'));
      if (!isPdf) continue;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // [KEEP] ชื่อไฟล์ = Model Code ที่ "ตัด RXXRXX/RFXXRXX ด้านหน้าออก"
      const displayName = String(modelCode || fileBase).replace(/^(RXXRXX|RFXXRXX)/, '');
      const safeName = displayName.replace(/[^\w.-]/g, '_');

      a.download = `${safeName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      return; // ✅ เจอไฟล์แล้ว
    } catch (_) {
      // ลองตัวถัดไป
    }
  }

  alert(`ไม่พบไฟล์ PDF ใด ๆ ตามตัวเลือกต่อไปนี้:\n${candidates
    .map(x => `${base}${x}.pdf`)
    .join('\n')}\n\nตรวจชื่อไฟล์ใน: C:\\Users\\Haruj\\gear-motor-app\\public\\model\\pdf\\RKFS\\R`);
}

const rkfsAMByPower = { '0.18':'AM63','0.25':'AM71','0.37':'AM71','0.55':'AM80','0.75':'AM80',
  '1.1':'AM90','1.5':'AM90','2.2':'AM100','3':'AM100','4':'AM112','5.5':'AM132','7.5':'AM132','9.2':'AM132',
  '11':'AM160','15':'AM160','18.5':'AM180','22':'AM180','30':'AM200','37':'AM225','45':'AM225',
  '55':'AM250','75':'AM280','90':'AM280','110':'AM315','132':'AM315','160':'AM315' };
function getRkfsIECByPower(kw){ return rkfsAMByPower[String(kw)] ?? null; }
const rkfsAMFlangeDims = {
  AM63:  { G5: 140, D1: 11 },
  AM71:  { G5: 160, D1: 14 },
  AM80:  { G5: 200, D1: 19 },
  AM90:  { G5: 200, D1: 24 },
  AM100: { G5: 250, D1: 28 },
  AM112: { G5: 250, D1: 28 },
  AM132: { G5: 300, D1: 38 },
  AM160: { G5: 350, D1: 42 },
  AM180: { G5: 350, D1: 48 },
  AM200: { G5: 400, D1: 55 },
  AM225: { G5: 450, D1: 60 },
  AM250: { G5: 550, D1: 65 },
  AM280: { G5: 550, D1: 75 },
  AM315: { G5: 660, D1: 80 },
};

const rkfsInputShaftBySeries = {
  R: {
    '27': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '57': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '107':[{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '137':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}],
    '147':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '167':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
  },
  K: {
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '57': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '107':[{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '127':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '157':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '167':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '187':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
  },
  F: {
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '57': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '107':[{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '127':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '157':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
  },
  S: {
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '57': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
  }
};
    
   // [ADD] Normalize size key for RKFS pair labels (RXXRXX / RFXXRXX)
// ใช้ดึง "ไซซ์ตัวหน้า" เพื่อนำไป lookup ratioMapping
function normalizeRKFSSizeKey(design, sizeVal) {
  const raw = String(sizeVal ?? '');
  if (design === 'RXXRXX' || design === 'RFXXRXX') {
    // ตัวอย่าง: "R27R17" หรือ "RF37R17" → ดึง "27" / "37"
    const m = raw.match(/^RF?(\d+)R(\d+)$/i) || raw.match(/^R(\d+)R(\d+)$/i);
    if (m) return m[1];
  }
  return raw;
}  
// [CHANGE] ใช้คีย์ไซซ์ที่ normalize แล้ว เพื่อรองรับ RXXRXX / RFXXRXX
const _sizeKey = normalizeRKFSSizeKey(rkfsDesign, rkfsSize);
const ratioList =
  rkfsSeries && ratioMapping[rkfsSeries]?.[_sizeKey]
    ? ratioMapping[rkfsSeries][_sizeKey]
    : [];


  const mountingImageMap = {
    R: RMTImg,
    K: KSMTImg,
    S: KSMTImg,
    F: FMTImg
  };

  /* === [ADD] RKFS click-sweep helper (black→white gloss) === */
const RKFS_SWEEP_MS = 520;
const clickSweep = (e, run) => {
  const el = e && e.currentTarget;
  if (!el) { run && run(); return; }
  if (!el.classList.contains('rkfs-click-sweep')) el.classList.add('rkfs-click-sweep');
  el.classList.add('is-active');
  setTimeout(() => {
    el.classList.remove('is-active');
    run && run();
  }, RKFS_SWEEP_MS);
};

  return (
    <>
      {/* Step 1: Series */}
      {!rkfsSeries && (
<>
        <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Series Gear ที่คุณต้องการ
    </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["R","K","S","F"].map(label => (
            <button
              key={label}
              onClick={(e) => clickSweep(e, () => update("rkfsSeries", label))}
              className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
            >
              <img
                src={require(`../assets/rkfs/4Series/1${label}.png`)}
                alt={`${label} Series`}
                className="w-full rounded-xl"
              />
              <p className="text-center mt-2 font-semibold text-gray-700">
                {label} Series
              </p>
            </button>
          ))}
        </div>
        </>
      )}

      {/* Step 2: Design */}
      {rkfsSeries && !rkfsDesign && (
        <>
                    <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Design Gear ที่คุณต้องการ
    </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {designOptions[rkfsSeries].map(design => {
              const imageMap = {
                R: { R: RImg, RF: RFImg, RX: RXImg, RXF: RXFImg, RM: RMImg, RXXRXX: RXXRXXImg, RFXXRXX: RFXXRXXImg  },
                K: { K: KImg, KA: KAImg, KAB: KABImg, KAF: KAFImg, KAT: KATImg, KAH: KAHImg },
                F: { F: FImg, FA: FAImg, FAF: FAFImg, FAH: FAHImg, FF: FFImg },
                S: { S: SImg, SA: SAImg, SAF: SAFImg, SAT: SATImg, SAZ: SAZImg }
              };
              const imgSrc = imageMap[rkfsSeries][design];
              return (
                <button
                  key={design}
                  onClick={(e) => clickSweep(e, () => update("rkfsDesign", design))}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={imgSrc} alt={design} className="w-full rounded-xl" />
                  <p className="text-center mt-2 font-semibold">{design}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-left">
            <button
              onClick={(e) => clickSweep(e, () => update("rkfsSeries", null))}
              className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
            >
              ย้อนกลับ
            </button>
          </div>
        </>
      )}

     {/* Step 3: Size */}
{rkfsDesign && !rkfsSize && (
  <>
    <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Size Gear ที่คุณต้องการ
    </h3>
    <div className="flex flex-wrap gap-4 justify-center">
      {(
        // --- เงื่อนไขพิเศษ: แสดงปุ่มเป็นคู่ต่อท้าย (เฉพาะ RXXRXX / RFXXRXX) ---
        rkfsDesign === "RXXRXX"
          ? [
              "R27R17","R37R17","R47R37","R57R37","R67R37","R77R37",
              "R87R57","R97R57","R97R57","R107R77","R137R77",
              "R147R77","R147R87","R167R97","R167R109"
            ]
          : rkfsDesign === "RFXXRXX"
          ? [
              "RF27R17","RF37R17","RF47R37","RF57R37","RF67R37","RF77R37",
              "RF87R57","RF97R57","RF97R57","RF107R77","RF137R77",
              "RF147R77","RF147R87","RF167R97","RF167R109"
            ]
          // --- เคสทั่วไป: ทำงานเหมือนเดิม ---
          : (
              rkfsSeries === "R"
                ? ["17","27","37","47","57","67","77","87","97","107","137","147","167"]
                : rkfsSeries === "K"
                ? ["37","47","57","67","77","87","97","107","127","157","167","187"]
                : rkfsSeries === "F"
                ? ["37","47","57","67","77","87","97","107","127","157"]   // ← ตามที่สั่ง
                : ["37","47","57","67","77","87","97"]
            )
      )
        // เงื่อนไข filter เดิม (ใช้เฉพาะเมื่อเป็นเคสทั่วไปที่เป็นตัวเลขเดี่ยว)
        .filter((size) => {
          if (rkfsDesign === "RXXRXX" || rkfsDesign === "RFXXRXX") return true;
          const n = parseInt(size, 10);
          if (rkfsDesign === "RM") return n >= 57 && n <= 167;
          if (rkfsDesign === "RX" || rkfsDesign === "RXF") return n >= 57 && n <= 107;
          return true;
        })
        .map((size) => (
          <button
            key={size}
            onClick={(e) => clickSweep(e, () => update("rkfsSize", size))}
            className="w-24 h-24 bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 rounded-xl flex items-center justify-center text-blue-800 font-bold text-sm sm:text-base border border-gray-300 hover:bg-blue-100 text-center"
          >
            {/* ถ้าเป็น RXXRXX/RFXXRXX ให้แสดงข้อความตามรายการ
                ถ้าเป็นเคสทั่วไป ให้แสดง 'rkfsDesign + size' เหมือนเดิม */}
            {rkfsDesign === "RXXRXX" || rkfsDesign === "RFXXRXX"
              ? size
              : `${rkfsDesign}${size}`}
          </button>
        ))}
    </div>
    <h2 className="text-xs sm:text-sm md:text-base font-semibold text-red-400 drop-shadow mb-6 leading-relaxed">
       <br /><br /><br /><br /><br /><br /><br /><br />
  **ขนาด Size Gear จะเป็นตัวบ่งบอกขนาดของเพลา , ความสูงของกึ่งกลางเพลา ,ระยะขาตั้ง, หน้าแปลน , ขนาด Housing , น้ำหนัก ที่แตกต่างกันออกไป สามารถเลือกได้ตามความเหมาะสมของเครื่องจักรของท่าน
</h2>
    <div className="fixed z-[999]"
      style={{
        left: 'max(1.5rem, env(safe-area-inset-right))',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsDesign", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>
  </>
)}

      {/* Step 3.1: Input Selection */}
{rkfsSize && !rkfsInputSel && (
  <>
    <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Input Selection
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {(() => {
        // เลือกชุดภาพตามซีรีส์
        const opts =
          rkfsSeries === 'R' ? [
            { key: 'With Motor',    img: RWMImg },
            { key: 'IEC Adapter Motor',   img: RIECImg },
            { key: 'INPUT Shaft', img: RINPUTImg },
            { key: 'SERVO Adapter', img: RSERVOImg },
          ] :
          rkfsSeries === 'F' ? [
            { key: 'With Motor',    img: FWMImg },
            { key: 'IEC Adapter Motor',   img: FIECImg },
            { key: 'INPUT Shaft', img: FINPUTImg },
            { key: 'SERVO Adapter', img: FSERVOImg },
          ] :
          rkfsSeries === 'S' ? [
            { key: 'With Motor',    img: SWMImg },
            { key: 'IEC Adapter Motor',   img: SIECImg },
            { key: 'INPUT Shaft', img: SINPUTImg },
            { key: 'SERVO Adapter', img: SSERVOImg },
          ] : [
            { key: 'With Motor',    img: KWMImg },   // K
            { key: 'IEC Adapter Motor',   img: KIECImg },
            { key: 'INPUT Shaft', img: KINPUTImg },
            { key: 'SERVO Adapter', img: KSERVOImg },
          ];

        return opts.map(({ key, img }) => {
          const isClickable = (key === 'With Motor' || key === 'IEC Adapter Motor' || key === 'INPUT Shaft'); 
          return (
            <button
              key={key}
              onClick={(e) => clickSweep(e, () => {
  if (!isClickable) return;
  update("rkfsInputSel", key);

  // [ADD] เฉพาะ IEC Adapter Motor: วาง "แผนนำทาง" ตั้งแต่ตอนนี้
  // K/S → เมื่อมีหน้า Step 9.3 โผล่ ให้เลื่อนไปที่ #rkfs-step-93
  // R/F → เมื่อมีหน้า Confirm (Step 10) โผล่ ให้เลื่อนไปที่ #rkfs-confirm-step
  if (key === 'IEC Adapter Motor' && (rkfsSeries === 'K' || rkfsSeries === 'S')) {
  try {
    const targetId = 'rkfs-step-93';

      if (targetId) {
        // ยกเลิก observer เก่าถ้ามี
        if (window.__rkfsPlanObs && typeof window.__rkfsPlanObs.disconnect === 'function') {
          window.__rkfsPlanObs.disconnect();
        }

        const obs = new MutationObserver(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            obs.disconnect();
            window.__rkfsPlanObs = null;
          }
        });

        obs.observe(document.body, { childList: true, subtree: true });
        window.__rkfsPlanObs = obs;
      }
    } catch (_) { /* no-op */ }
  }
})}
              className={`rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 bg-white
                          ${isClickable ? 'hover:-translate-y-2 cursor-pointer' : 'opacity-70 cursor-not-allowed'}`}
              title={key}
            >
              <img src={img} alt={`${rkfsSeries}${key}`} className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">{key}</p>
            </button>
          );
        });
      })()}
    </div>
    <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsSize", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>
  </>
)}


      {/* Step 4: Motor Type */}
      {rkfsSize && rkfsInputSel === 'With Motor' && !rkfsMotorType && (
        <>
          <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">เลือกประเภทของมอเตอร์</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { type: "YE3", img: YE3Img },
              { type: "YE4", img: YE4Img },
              { type: "YEJ", img: YEJImg },
              { type: "YVP", img: YVPImg },
              { type: "YVPEJ", img: YVPEJImg },
              { type: "YB", img: YBImg }
            ].map(({ type, img }) => (
              <button
                key={type}
                onClick={(e) => clickSweep(e, () => update("rkfsMotorType", type))}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
              >
                <img src={img} alt={type} className="w-full rounded-t-xl" />
                <p className="text-center py-2 font-semibold text-gray-800">
                  {type}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-4 text-left">
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsInputSel", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

           {/* IEC Adaptor flow: เลือกกำลัง (ไม่ต้องเลือก Motor Type/Pole) */}
{rkfsInputSel === 'IEC Adapter Motor' && !rkfsMotorPower && (
  <>
    <h3 className="text-blue-500 font-bold mb-2">เลือกกำลังของมอเตอร์(หน่วย kW)</h3>
    <div className="flex flex-wrap gap-3">
      {(() => {
        const tableMap = { R: rSeriesPowerBySize, K: kSeriesPowerBySize, F: fSeriesPowerBySize, S: sSeriesPowerBySize };
        const sizeKey = rkfsSize ? String(rkfsSize) : null;
        const mapped  = (tableMap[rkfsSeries] && sizeKey) ? tableMap[rkfsSeries][sizeKey] : null;
        const options = mapped ?? ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90","110","132","160"];
        return options.map(p => (
          <button key={p} onClick={(e)=>clickSweep(e,()=>{
   update("rkfsMotorPower", p);
   update("rkfsRatio", null);
   update("rkfsMounting", null);
 })} className="btn-3d-rkfs font-bold px-4 py-2">For motor {p} kW <span className="text-xl text-blue-500 font-bold ml-2">{getRkfsIECByPower(p) || ''}</span></button>
        ));
      })()}
    </div>
    <div
      className="fixed z-[999]"
      style={{
        left: 'max(1.5rem, env(safe-area-inset-right))',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsInputSel", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>
  </>
)}
          {/* INPUT Shaft flow: เลือก AD — แสดงเฉพาะตอนยังไม่ได้เลือก */}
{rkfsInputSel === 'INPUT Shaft' && !(state.rkfsINPUTshaft || state.rkfsInputShaft) && (
  <>
    <h3 className="text-blue-500 font-bold mb-2">เลือกขนาด INPUT shaft (AD)</h3>
    <div className="w-full flex flex-wrap justify-center items-center gap-4 mt-4">
  {(() => {
    const table =
      rkfsInputShaftBySeries?.[rkfsSeries]?.[String(rkfsSize)] ?? [];
    return table.map(({ code, dia }) => (
      <button
        key={code}
        title={`${code}Diameter : ${dia}`}
        onClick={(e) =>
          clickSweep(e, () => {
            // เก็บค่าตามโค้ดเดิม
            update('rkfsINPUTshaft', code);
            update('rkfsINPUTshaftDia', dia);
            update('rkfsInputShaft', code);
            update('rkfsInputShaftDia', dia);

            // ไป Step 7 → รีเซ็ต Ratio/Mounting เดิม
            update('rkfsRatio', null);
            update('rkfsMounting', null);

            setTimeout(() => {
              document
                .getElementById('rkfs-ratio-step')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
          })
        }
        className={`btn-3d-rkfs
                    px-7 py-4 md:px-8 md:py-5
                    min-w-[180px] md:min-w-[220px]
                    text-base md:text-lg rounded-2xl
                    shadow hover:shadow-lg
                    ${state.rkfsINPUTshaft === code ? 'ring-2 ring-blue-500' : ''}`}
      >
        <span className="block leading-tight">{code} </span>
        <span className="block text-blue-500 text-xl font-bold md-0.5:text-sm opacity-80">
           Diameter : {dia}
        </span>
      </button>
    ));
  })()}
</div>
<div
  className="fixed z-[999]"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
<button
        onClick={(e) => clickSweep(e, () => update("rkfsInputSel", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
</div>
  </>
)}

      {/* Step 5: Motor Power */}
{rkfsMotorType && !rkfsMotorPower && (
  <>
    <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      เลือกกำลังของมอเตอร์(หน่วย kW)
    </h3>

    <div className="flex flex-wrap gap-3">
      {(() => {
        // Fallback เดิม (กรณีไม่เจอ mapping หรือยังไม่เลือก Size)
        const defaultPowerOptions = [
          "0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4",
          "5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90","110","132","160"
        ];

        // เลือกตารางตาม Series
        const tableMap = {
          R: rSeriesPowerBySize,
          K: kSeriesPowerBySize,
          F: fSeriesPowerBySize,
          S: sSeriesPowerBySize
        };

        const sizeKey = rkfsSize ? String(rkfsSize) : null; // กันกรณีได้ค่าตัวเลข
        const seriesTable = tableMap[rkfsSeries];

        // [ADD] รองรับ RXXRXX / RFXXRXX → ใช้ "ไซซ์ตัวหน้า" ไป map กำลังจาก R-series
        let overrideByPair = null;
        if (rkfsDesign === "RXXRXX" || rkfsDesign === "RFXXRXX") {
          // ตัวอย่าง: "R27R17" หรือ "RF37R17" → จับ "27" เป็น primary size
          const m = sizeKey && sizeKey.match(/^RF?(\d+)R(\d+)$/i);
          const primarySize = m ? m[1] : null;
          if (primarySize && rSeriesPowerBySize[primarySize]) {
            overrideByPair = rSeriesPowerBySize[primarySize];
          }
        }

        // เดิม: map ตามซีรีส์และ sizeKey
        const mapped = overrideByPair ?? ((seriesTable && sizeKey) ? seriesTable[sizeKey] : null);

        const powerOptions = mapped ?? defaultPowerOptions;

        return powerOptions.map((p) => (
          <button
            key={String(p)}
            onClick={(e) => clickSweep(e, () => update("rkfsMotorPower", p))}
            className="btn-3d-rkfs text-sm md:text-base font-semibold px-4 py-2"
            title={`${p} kW`}
          >
            {p} kW
          </button>
        ));
      })()}
    </div>

    <div
      className="fixed z-[999]"
      style={{
        left: 'max(1.5rem, env(safe-area-inset-right))',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsMotorType", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>
  </>
)}


      {/* Step 6: Pole */}
      {rkfsMotorPower && !rkfsPole && rkfsInputSel !== 'IEC Adapter Motor' && (
        <>
          <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">เลือก Pole Motor</h3>
          <div className="flex flex-wrap gap-3">
            <br />
            {["4P","6P","8P"].map(pole =>(
              <button
                key={pole}
                onClick={(e) => clickSweep(e, () => update("rkfsPole", pole))}
                className="bg-blue-600 text-white font-bold px-10 py-8 rounded-xl shadow"
              >
                {pole}
              </button>
            ))}
          </div>
          <br />
          <h2 className="text-red-500 font-bold mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">**ความเร็วรอบของมอเตอร์จะอิงตาม Pole ของมอเตอร์ ค่าประมาณการ 4P = 1500 rpm, 6P = 1000 rpm (ทั้งนี้จะขึ้นอยู่มาตรฐานการผลิตของแต่ล่ะแบรนด์)</h2>
          <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsMotorPower", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

      {/* Step 7: Ratio */}
{(() => {
  // ค่า AD ที่เลือก (รองรับสองชื่อ state)
  const shaftSel = (state.rkfsINPUTshaft ?? state.rkfsInputShaft) || null;

  // เงื่อนไขเข้า Step 7 (คงตรรกะเดิม)
  const prereqOK =
    rkfsInputSel === 'With Motor'
      ? !!rkfsPole
      : rkfsInputSel === 'IEC Adapter Motor'
      ? !!rkfsMotorPower
      : rkfsInputSel === 'INPUT Shaft'
      ? !!shaftSel
      : false;

  const showRatioStep = prereqOK && !rkfsRatio;
  if (!showRatioStep) return null;

  return (
    <>
      <div id="rkfs-ratio-step">
        <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          เลือกอัตราทดเกียร์ (Ratio (i))
        </h3>
        <div className="flex flex-wrap gap-3">
          {ratioList.map((ratio) => (
            <button
              key={ratio}
              onClick={(e) =>
                clickSweep(e, () => {
                  update("rkfsRatio", ratio);

// INPUT Shaft → ไป Mounting (เหมือนเดิม)
if (rkfsInputSel === 'INPUT Shaft') {
  setTimeout(() => {
    document.getElementById("rkfs-mount-step")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 0);

// IEC Adapter Motor เท่านั้น → K/S ไป 9.3, R/F ไม่แตะ
} else if (rkfsInputSel === 'IEC Adapter Motor') {
  setTimeout(() => {
    const targetId = (rkfsSeries === 'K' || rkfsSeries === 'S')
      ? 'rkfs-step-93'
      : null; // R/F: ไม่กระโดด
    if (targetId) {
      document.getElementById(targetId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 0);
}

                })
              }
              className="bg-blue-600 text-white font-bold shadow px-8 py-6 rounded-xl hover:bg-blue-700"
            >
              i = {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* ปุ่มย้อนกลับ */}
      <div
        className="fixed z-[999]"
        style={{
          left: 'max(1.5rem, env(safe-area-inset-right))',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={(e) =>
            clickSweep(e, () => {
              if (rkfsInputSel === 'With Motor') {
                update("rkfsPole", null);
              } else if (rkfsInputSel === 'IEC Adapter Motor') {
                update("rkfsMotorPower", null);
              } else if (rkfsInputSel === 'INPUT Shaft') {
                update("rkfsINPUTshaft", null);
                update("rkfsInputShaft", null);
                update("rkfsINPUTshaftDia", null);
                update("rkfsInputShaftDia", null);
              }
            })
          }
          className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
        >
          ย้อนกลับ
        </button>
      </div>
    </>
  );
})()}

      {/* Step 8: Mounting */}
{rkfsRatio && !rkfsMounting && (
  <>
    <div id="rkfs-mount-step">
      <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        เลือกทิศทางการติดตั้ง (Mounting Position)
      </h3>
      <h3 className="text-red-500 font-bold mb-2 drop-shadow-[0_05px_05px_rgba(0,0,0,0.3)]">
        **ทุกทิศทางการติดตั้งมีผลต่อระดับน้ำมันในห้องเกียร์ มีผลต่ออายุการใช้งานของเกียร์
      </h3>

      {/* รูป Mounting (คลิกได้เฉพาะที่รูป → ขยาย) */}
      <div className="flex justify-center">
        <div className="group mx-auto w-full">
          <img
            src={mountingImageMap[rkfsSeries]}
            alt="Mounting"
            loading="lazy"
            onClick={() => document.getElementById('rkfs-mount-modal')?.showModal()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                document.getElementById('rkfs-mount-modal')?.showModal();
              }
            }}
            tabIndex={0}
            className="
              cursor-zoom-in
              mx-auto h-auto w-full object-contain
              max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[500px]
              rounded-2xl shadow-lg ring-1 ring-white/10
              transition-transform duration-200 group-hover:scale-[1.01] group-active:scale-[0.99]
              focus:outline-none focus:ring-2 focus:ring-white/40
            "
          />
          <div className="mt-2 text-xs text-white/70 text-center select-none pointer-events-none">
            แตะ/คลิกที่รูปเพื่อขยาย
          </div>
        </div>
      </div>

      {/* ปุ่มเลือก M1–M6 */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {["M1", "M2", "M3", "M4", "M5", "M6"].map((mount) => (
          <button
            key={mount}
            onClick={(e) => clickSweep(e, () => update("rkfsMountingTemp", mount))}
            className="bg-gradient-to-br from-blue-500 to-blue-800 text-white font-bold px-6 py-4 rounded-xl shadow hover:shadow-lg"
          >
            {mount}
          </button>
        ))}
      </div>

      {/* ── Info หลังเลือก M ── */}
      {state.rkfsMountingTemp && (
        <div className="mt-6 max-w-4xl mx-auto text-left bg-black/25 rounded-xl px-5 py-4 backdrop-blur-sm text-white/90 text-sm md:text-base leading-7">
          {(() => {
            const mSel = state.rkfsMountingTemp;            // ปุ่มที่เพิ่งคลิก
            const sizeKey = String(rkfsSize || "").trim();  // key ของ size ในตาราง

            // 1) เกรดน้ำมัน + แบรนด์ (R/F/K = VG220, S-family = VG680)
            const isSFamily =
              rkfsSeries === "S" ||
              ["S", "SA", "SAF", "SAZ", "SAT", "SH", "SHF", "SHZ", "ST", "SF"].includes(
                rkfsDesign
              );
            const oilGradeText = isSFamily ? "ISO,NL GI = VG 680" : "ISO,NL GI = VG 220";
            const brandText = isSFamily
              ? "Shell Omala S2 G 680 (SAS เติมแบรนด์นี้) , Mobilgear 600 XP 680 , Castrol Tribol 1100/680"
              : "Shell Omala S2 G220 (SAS เติมแบรนด์นี้) , Mobilgear 600 XP 220 , Castrol Tribol 1100/220";

            // 2) เลือกหมวดตารางจาก Design
            const oilCategory = (() => {
              if (rkfsDesign === "RF") return "RF";
              if (rkfsDesign === "RX") return "RX";
              if (rkfsDesign === "RXF") return "RXF";
              if (rkfsDesign === "FF") return "FF";
              if (["F", "FA", "FAF", "FAH", "FH", "FHF", "FHZ", "FV", "FVF", "FVZ", "FT"].includes(rkfsDesign)) return "F";
              if (rkfsDesign === "S") return "S";
              if (rkfsDesign === "SF") return "SF";
              if (["SA", "SAF", "SAZ", "SAT", "SH", "SHF", "SHZ", "ST"].includes(rkfsDesign)) return "S_OTHER";
              if (["K", "KA", "KAB", "KAF", "KAT", "KAH"].includes(rkfsDesign)) return "K";
              return "R"; // ดีไซน์ R
            })();

            // 3) ตารางปริมาณน้ำมัน
            const OIL_DATA = {
              R: {
                "17": [0.25, 0.55, 0.35, 0.55, 0.35, 0.40],
                "27": ["0.25/0.40", 0.70, 0.50, 0.70, 0.50, 0.50],
                "37": ["0.30/0.95", 0.85, 0.95, 1.05, 0.75, 0.95],
                "47": ["0.70/1.50", 1.60, 1.50, 1.65, 1.50, 1.50],
                "57": ["0.80/1.70", 1.90, 1.70, 2.10, 1.70, 1.70],
                "67": ["1.10/2.30", 2.40, 2.80, 2.90, 1.80, 2.00],
                "77": ["1.20/3.00", 3.30, 3.60, 3.80, 2.50, 3.40],
                "87": ["2.30/6.0", 6.4, 7.2, 7.2, 6.3, 6.5],
                "97": ["4.60/9.8", 11.7, 11.7, 13.4, 11.3, 11.7],
                "107": ["6.0/13.7", 16.3, 16.9, 19.2, 13.2, 15.9],
                "137": ["10.0/25.0", 28.0, 29.5, 31.5, 25.0, 25.0],
                "147": ["15.4/40.0", 46.5, 48.0, 52.0, 39.5, 41.0],
                "167": ["27.0/70.0", 82.0, 78.0, 88.0, 66.0, 69.0],
              },
              RF: {
                "17": [0.25, 0.55, 0.35, 0.55, 0.35, 0.40],
                "27": ["0.25/0.40", 0.70, 0.50, 0.70, 0.50, 0.50],
                "37": ["0.35/0.95", 0.90, 0.95, 1.05, 0.75, 0.95],
                "47": ["0.65/1.50", 1.60, 1.50, 1.65, 1.50, 1.50],
                "57": ["0.80/1.70", 1.80, 1.70, 2.00, 1.70, 1.70],
                "67": ["1.20/2.50", 2.50, 2.70, 2.80, 1.90, 2.10],
                "77": ["1.20/2.60", 3.10, 3.30, 3.60, 2.40, 3.00],
                "87": ["2.40/6.0", 6.4, 7.1, 7.2, 6.3, 6.4],
                "97": ["5.1/10.2", 11.9, 11.2, 14.0, 11.2, 11.8],
                "107": ["6.3/14.9", 15.9, 17.0, 19.2, 13.1, 15.9],
                "137": ["9.5/25.0", 27.0, 29.0, 32.5, 25.0, 25.0],
                "147": ["16.4/42.0", 47.0, 48.0, 52.0, 42.0, 42.0],
                "167": ["26.0/70.0", 82.0, 78.0, 88.0, 65.0, 71.0],
              },
              RX: {
                "57": [0.60, 0.80, 1.30, 1.30, 0.90, 0.90],
                "67": [0.80, 0.80, 1.70, 1.90, 1.10, 1.10],
                "77": [1.10, 1.50, 2.60, 2.70, 1.60, 1.60],
                "87": [1.70, 2.50, 4.80, 4.80, 2.90, 2.90],
                "97": [2.10, 3.40, 7.40, 7.00, 4.80, 4.80],
                "107": [3.90, 5.60, 11.60, 11.90, 7.70, 7.70],
              },
              RXF: {
                "57": [0.50, 0.80, 1.10, 1.10, 0.70, 0.70],
                "67": [0.70, 0.80, 1.50, 1.40, 1.00, 1.00],
                "77": [0.90, 1.30, 2.40, 2.00, 1.60, 1.60],
                "87": [1.60, 1.95, 4.90, 3.95, 2.90, 2.90],
                "97": [2.10, 3.70, 7.10, 6.30, 4.80, 4.80],
                "107": [3.10, 5.70, 11.20, 9.30, 7.20, 7.20],
              },
              F: {
                "27": [0.60, 0.80, 0.65, 0.70, 0.60, 0.60],
                "37": [0.95, 1.25, 0.70, 1.25, 1.00, 1.10],
                "47": [1.50, 1.80, 1.10, 1.90, 1.50, 1.70],
                "57": [2.60, 3.50, 2.10, 3.50, 2.80, 2.90],
                "67": [2.70, 3.80, 1.90, 3.80, 2.90, 3.20],
                "77": [5.90, 7.30, 4.30, 8.00, 6.00, 6.30],
                "87": [10.80, 13.00, 7.70, 13.80, 10.80, 11.00],
                "97": [18.50, 22.50, 12.60, 25.20, 18.50, 20.00],
                "107": [24.50, 32.00, 19.50, 37.50, 27.00, 27.00],
                "127": [40.50, 54.50, 34.00, 61.00, 46.30, 47.00],
                "157": [69.00, 104.00, 63.00, 105.00, 86.00, 78.00],
              },
              FF: {
                "27": [0.60, 0.80, 0.65, 0.70, 0.60, 0.60],
                "37": [1.00, 1.25, 0.70, 1.30, 1.00, 1.10],
                "47": [1.60, 1.85, 1.10, 1.90, 1.50, 1.70],
                "57": [2.80, 3.50, 2.10, 3.70, 2.90, 3.00],
                "67": [2.70, 3.80, 1.90, 3.80, 2.90, 3.20],
                "77": [5.90, 7.30, 4.30, 8.10, 6.00, 6.30],
                "87": [10.80, 13.20, 7.80, 14.10, 11.00, 11.20],
                "97": [19.00, 22.50, 12.60, 25.60, 18.90, 20.50],
                "107": [25.50, 32.00, 19.50, 38.50, 27.50, 28.00],
                "127": [41.50, 55.50, 34.00, 63.00, 46.30, 49.00],
                "157": [72.00, 105.00, 64.00, 106.00, 87.00, 79.00],
              },
              K: {
                "37": [0.50, 1.00, 1.00, 1.25, 0.95, 0.95],
                "47": [0.80, 1.30, 1.50, 2.00, 1.60, 1.60],
                "57": [1.10, 2.20, 2.20, 2.80, 2.30, 2.10],
                "67": [1.10, 2.40, 2.70, 3.45, 2.60, 2.60],
                "77": [2.20, 4.10, 4.40, 5.80, 4.20, 4.40],
                "87": [3.70, 8.00, 8.70, 10.90, 8.00, 8.00],
                "97": [7.00, 14.00, 15.70, 20.00, 15.70, 15.50],
                "107": [10.00, 21.00, 25.50, 33.50, 24.00, 24.00],
                "127": [21.00, 41.50, 44.00, 54.00, 40.00, 41.00],
                "157": [31.00, 62.00, 65.00, 90.00, 58.00, 62.00],
                "167": [33.00, 95.00, 105.00, 123.00, 85.00, 84.00],
                "187": [53.00, 152.00, 167.00, 200.00, 143.00, 143.00],
              },
              S: {
                "37": [0.25, 0.40, "0.50", 0.55, 0.40, 0.40],
                "47": [0.35, 0.80, "0.70/0.90", 1.00, 0.80, 0.80],
                "57": [0.50, 1.20, "1.00/1.20", 1.45, 1.30, 1.30],
                "67": [1.00, 2.00, "2.20/3.10", 3.10, 2.60, 2.60],
                "77": [1.90, 4.20, "3.70/5.4", 5.90, 4.40, 4.40],
                "87": [3.30, 8.10, "6.9/10.4", 11.30, 8.40, 8.40],
                "97": [6.80, 15.00, "13.4/18.0", 21.80, 17.00, 17.00],
              },
              SF: {
                "37": [0.25, 0.40, "0.50", 0.55, 0.40, 0.40],
                "47": [0.40, 0.90, "0.90/1.05", 1.05, 1.00, 1.00],
                "57": [0.50, 1.20, "1.00/1.50", 1.55, 1.40, 1.40],
                "67": [1.00, 2.20, "2.30/3.00", 3.20, 2.70, 2.70],
                "77": [1.90, 4.10, "3.90/5.8", 6.50, 4.90, 4.90],
                "87": [3.80, 8.00, "7.1/10.1", 12.00, 9.10, 9.10],
                "97": [7.40, 15.00, "13.8/18.8", 22.60, 18.00, 18.00],
              },
              S_OTHER: {
                "37": [0.25, 0.40, "0.50", 0.50, 0.40, 0.40],
                "47": [0.40, 0.80, "0.70/0.90", 1.00, 0.80, 0.80],
                "57": [0.50, 1.10, "1.00/1.50", 1.50, 1.20, 1.20],
                "67": [1.00, 2.00, "1.80/2.60", 2.90, 2.50, 2.50],
                "77": [1.80, 3.90, "3.60/5.0", 5.80, 4.50, 4.50],
                "87": [3.80, 7.40, "6.0/8.7", 10.80, 8.00, 8.00],
                "97": [7.00, 14.00, "11.4/16.0", 20.50, 15.70, 15.70],
              },
            };

            // 4) คำนวณลิตร
            const mountIdx = { M1: 0, M2: 1, M3: 2, M4: 3, M5: 4, M6: 5 };
            const row = OIL_DATA[oilCategory]?.[sizeKey];

            const pick = (v) =>
              typeof v === "string" && v.includes("/")
                ? Math.max(...v.split("/").map((x) => parseFloat(String(x).trim())))
                : v != null
                ? Number(v)
                : null;

            const oilLiters =
              row && mSel && mountIdx[mSel] != null ? pick(row[mountIdx[mSel]]) : null;

            return (
              <>
                <div className="mb-1">
                  ชนิดของน้ำมันเกียร์ที่แนะนำ สำหรับ{" "}
                  <b>{isSFamily ? "S Series" : `${rkfsSeries} Series`}</b> ในอุณหภูมิ{" "}
                  {isSFamily ? "-0" : "-15"}°C ถึง +40°C :<span className="text-yellow-400 font-extrabold text-l"> <b>{oilGradeText}</b> </span>
                </div>
                <div className="mb-2">
                  แบรนด์ที่แนะนำ{" "}
                  <span className="font-semibold">{brandText}</span>
                </div>
                <div className="mb-3">
                  ระดับน้ำมันเกียร์ = <span className="text-yellow-400 font-extrabold text-xl">
                  <b>
                    {oilLiters != null && !Number.isNaN(oilLiters) ? oilLiters : "—"}
                  </b>
                   ลิตร (Liter) </span>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>

    {/* ปุ่มถัดไป — ยึดมุมขวาล่างของหน้าจอแน่นอน */}
    {state.rkfsMountingTemp && (
      <div
        className="fixed z-[999]"
        style={{
          right: 'max(1.5rem, env(safe-area-inset-right))',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <button
          className="btn-3d-rkfs px-6 py-3 font-bold"
          onClick={(e) =>
            clickSweep(e, () => {
              update('rkfsMounting', state.rkfsMountingTemp);
              update('rkfsMountingTemp', null);

              // ★ เฉพาะโหมด INPUT Shaft: K/S → ไป 9.3, R/F → ไป Confirm
              if (rkfsInputSel === 'INPUT Shaft') {
                setTimeout(() => {
                  const targetId = (rkfsSeries === 'K' || rkfsSeries === 'S')
                    ? 'rkfs-step-93'
                    : 'rkfs-confirm-step';
                  document.getElementById(targetId)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 0);
              }
            })
          }
        >
          ถัดไป
        </button>
      </div>
    )}

    {/* ปุ่มย้อนกลับ → กลับไปเลือก Ratio */}
    <div
      className="fixed z-[999]"
      style={{
        left: 'max(1.5rem, env(safe-area-inset-right))',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsRatio", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>

    {/* Lightbox (เต็มจอ) สำหรับรูป Mounting */}
    <dialog
      id="rkfs-mount-modal"
      className="
        hidden
        open:fixed open:inset-0 open:z-[9999]
        open:bg-black/80 open:backdrop-blur-sm open:p-4
        open:flex open:items-center open:justify-center
      "
      onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
    >
      <form method="dialog" className="contents">
        <img
          src={mountingImageMap[rkfsSeries]}
          alt="Mounting (full)"
          className="max-h-[92vh] max-w-[96vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
        />
        <button
          type="submit"
          className="absolute top-4 right-4 text-white/90 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-3 py-1 text-sm font-semibold"
        >
          ปิด
        </button>
      </form>
    </dialog>
  </>
)}

      {/* Step 9: Position */}
      {rkfsMounting && !rkfsPosition &&
  rkfsInputSel !== 'IEC Adapter Motor' &&
  rkfsInputSel !== 'INPUT Shaft' && (
        <>
          <div id="rkfs-position-step">
            <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(6,0,0,0.6)]">เลือกตำแหน่งกล่องสายไฟ (Terminal Box)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
              {[
                { pos: "0", img: T0Img },
                { pos: "90", img: T90Img },
                { pos: "180", img: T180Img },
                { pos: "270", img: T270Img }
              ].map(({ pos, img }) => (
                <button
                  key={pos}
                  onClick={(e) => clickSweep(e, () => update("rkfsPosition", pos))}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={img} alt={`T${pos}`} className="w-full rounded-t-xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{pos}°</p>
                </button>
              ))}
            </div>
          </div>
          <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsMounting", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

      {/* Step 9.2: Sub‐position */}
      {rkfsPosition && !rkfsPositionSub &&
  rkfsInputSel !== 'IEC Adapter Motor' &&
  rkfsInputSel !== 'INPUT Shaft' && (
        <>
          <div id="rkfs-step-92">
            <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(6,0,0,0.6)]">เลือกตำแหน่งรูสายไฟ (Cable wire position)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
              {[
                { sub: "X", img: CXImg },
                { sub: "1", img: C1Img },
                { sub: "2", img: C2Img },
                { sub: "3", img: C3Img }
              ].map(({ sub, img }) => (
                <button
                  key={sub}
                  onClick={(e) => clickSweep(e, () => update("rkfsPositionSub", sub))}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={img} alt={`C${sub}`} className="w-full rounded-t-xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{sub}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsPosition", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

      {/* Step 9.3: Design code (เฉพาะ K / S Series) */}
{ (rkfsSeries === 'K' || rkfsSeries === 'S') && rkfsDesign &&
  (
    // IEC / INPUT: ข้าม Step 9 → โผล่ได้เมื่อเลือก Mounting แล้ว
    ((rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft') && rkfsMounting)
    ||
    // With Motor / อื่น ๆ: ต้องผ่าน Step 9 ให้ครบก่อน (Position + Sub-position)
    ((rkfsInputSel !== 'IEC Adapter Motor' && rkfsInputSel !== 'INPUT Shaft') && rkfsPosition && rkfsPositionSub)
  ) &&
  (!state.rkfsDesignSuffix || state.rkfsDesignSuffix === 'T') && (
  <div id="rkfs-step-93" className="mt-6">
    <h3 className="text-blue-600 font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      เลือกทิศทางการติดตั้งเพลา ซ้าย หรือ ขวา ?
    </h3>

    {(() => {
      const selected = state.rkfsDesignSuffix;
      const pick = (val) => update('rkfsDesignSuffix', val);

      // ปุ่มภาพ 3D
      const Card = ({ img, code, label }) => (
        <button
          type="button"
          onClick={(e) => {
            clickSweep(e, () => {
              update('rkfsDesignSuffix', code);
              // ✅ เลือก T = ยังไม่จบ → ไม่เลื่อนไป Confirm
              if (code !== 'T') {
                setTimeout(() => {
                  document.getElementById('rkfs-confirm-step')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 0);
              }
            });
          }}
          className={[
            "group w-64 h-64 sm:w-68 sm:h-68",
            "rounded-2xl border bg-white shadow-md",
            "hover:shadow-xl transition transform hover:-translate-y-0.5 active:scale-95",
            "flex flex-col items-center justify-center",
            state.rkfsDesignSuffix === code
              ? "ring-4 ring-blue-500 border-blue-300"
              : "ring-1 ring-gray-200 border-gray-200",
          ].join(" ")}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <img
            src={img}
            alt={label}
            className="w-64 h-64 object-contain pointer-events-none select-none"
            draggable={false}
          />
          <span className="text-red-700 font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            {label}
          </span>
        </button>
      );

      // ---------- K-Series ----------
      if (rkfsSeries === 'K') {
        if (rkfsDesign === 'K') {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KXXAImg}  code="A"  label="KXXA (A)"  />
              <Card img={KXXBImg}  code="B"  label="KXXB (B)"  />
              <Card img={KXXABImg} code="AB" label="KXXAB (AB)" />
            </div>
          );
        }

        if (['KA', 'KAB', 'KAF', 'KAH'].includes(rkfsDesign)) {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KAXXAImg} code="A" label="KAXXA (A)" />
              <Card img={KAXXBImg} code="B" label="KAXXB (B)" />
            </div>
          );
        }

        if (rkfsDesign === 'KAT') {
          if (!['T', 'TA', 'TB'].includes(selected)) {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
                <Card img={KATXXTImg} code="T" label="KATXXT (T)" />
              </div>
            );
          }
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KAXXAImg} code="TA" label="KAXXA (TA)" />
              <Card img={KAXXBImg} code="TB" label="KAXXB (TB)" />
            </div>
          );
        }
      }

      // ---------- S-Series ----------
      if (rkfsSeries === 'S') {
        if (rkfsDesign === 'S') {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 justify-items-center">
              <Card img={SXXAImg}  code="A"  label="A"  />
              <Card img={SXXBImg}  code="B"  label="B"  />
              <Card img={SXXABImg} code="AB" label="AB" />
            </div>
          );
        }

        if (['SA', 'SAF', 'SAZ'].includes(rkfsDesign)) {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={SAXXAImg} code="A" label="SAXXA (A)" />
              <Card img={SAXXBImg} code="B" label="SAXXB (B)" />
            </div>
          );
        }

        if (rkfsDesign === 'SAT') {
          if (!['T', 'TA', 'TB'].includes(selected)) {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
                <Card img={SATXXTImg} code="T" label="SATXXT (T)" />
              </div>
            );
          }
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={SAXXAImg} code="TA" label="SAXXA (TA)" />
              <Card img={SAXXBImg} code="TB" label="SAXXB (TB)" />
            </div>
          );
        }
      }

      return null;
    })()}
    {/* [ADD-IEC-INPUT-BACK-93] เฉพาะ IEC / INPUT → Back = กลับไปเลือก Mounting */}
{ (rkfsSeries === 'K' || rkfsSeries === 'S') &&
  (rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft') && (
  <div
    className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
    <button
      onClick={(e) => clickSweep(e, () => update('rkfsMounting', null))}
      className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
    >
      ย้อนกลับ
    </button>
  </div>
)}
  </div>
)}

    {/* Step 10: Confirm — fullscreen layout (แบบ ACGearMotorFlow) */}
{(
  ((rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft') &&
    ((rkfsSeries === 'K' || rkfsSeries === 'S')
        ? (rkfsMounting && state.rkfsDesignSuffix && state.rkfsDesignSuffix !== 'T')
        : rkfsMounting
    )
  )
  ||
  ((rkfsInputSel !== 'IEC Adapter Motor' && rkfsInputSel !== 'INPUT Shaft') &&
    rkfsPosition && rkfsPositionSub
  )
) && (
  <div id="rkfs-confirm-step"
    style={{ position:'fixed', inset:0, zIndex:500, display:'flex', flexDirection:'column', background:'#0a0c10', fontFamily:"'Sarabun',sans-serif" }}>

    {/* ── Top bar ── */}
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 18px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'rgba(10,12,16,0.95)', backdropFilter:'blur(12px)', flexShrink:0, flexWrap:'wrap', gap:8 }}>
      <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'1.5px', color:'#00e5a0', textTransform:'uppercase' }}>
        ⚙ RKFS Series
      </span>

      {/* Model Code + Copy */}
      <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
        {(() => {
          const needTrim = rkfsDesign === 'RXXRXX' || rkfsDesign === 'RFXXRXX';
          let code = '';
          if (rkfsInputSel === 'IEC Adapter Motor') {
            const amCode = (typeof getRkfsIECByPower === 'function') ? getRkfsIECByPower(rkfsMotorPower) : null;
            if (rkfsRatio && rkfsMounting && amCode) {
              code = `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${amCode}-${rkfsMounting}`;
            }
          } else if (rkfsInputSel === 'INPUT Shaft') {
            const sc = state?.rkfsINPUTshaft ?? state?.rkfsInputShaft ?? null;
            const dv = state?.rkfsINPUTshaftDia ?? state?.rkfsInputShaftDia ?? null;
            if (rkfsRatio && rkfsMounting && sc) {
              code = `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${sc}-${rkfsMounting}${dv ? `-${dv}` : ''}`;
            }
          } else {
            code = `${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}${rkfsPosition?`-${rkfsPosition}`:''}${rkfsPositionSub?`-${rkfsPositionSub}`:''}${state.rkfsDesignSuffix?`-${state.rkfsDesignSuffix}`:''}`;
          }
          if (needTrim) code = code.replace(/^(RXXRXX|RFXXRXX)/, '');
          return (
            <>
              <span style={{ fontFamily:'monospace', fontSize:12, fontWeight:600, color:'#e8eaf0', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', padding:'3px 10px', borderRadius:5 }}>
                {code || '-'}
              </span>
              <button type="button"
                style={{ background:'none', border:'none', cursor:'pointer', color:'#00e5a0', fontSize:11, padding:'3px 8px', borderRadius:4 }}
                onClick={async (e) => {
                  const btn = e.currentTarget;
                  try {
                    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
                    else { const ta=document.createElement('textarea'); ta.value=code; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
                  } catch {}
                  const old = btn.textContent; btn.textContent = 'Copied!';
                  setTimeout(() => { btn.textContent = old; }, 1200);
                }}>Copy</button>
            </>
          );
        })()}
      </div>

      {/* ย้อนกลับ */}
      <button type="button"
        onClick={(e) => {
          if (rkfsSeries === 'K' || rkfsSeries === 'S') {
            if (state.rkfsDesignSuffix) { update('rkfsDesignSuffix', null); }
            else { update('rkfsPositionSub', null); }
          } else {
            update('rkfsPositionSub', null);
          }
        }}
        style={{ background:'rgba(0,229,160,0.08)', border:'1px solid rgba(0,229,160,0.25)', color:'#00e5a0', padding:'4px 12px', borderRadius:6, cursor:'pointer', fontSize:11, fontWeight:600 }}>
        ← ย้อนกลับ
      </button>
    </div>

    {/* ── Body: Viewer (left) + Right Panel ── */}
    <div style={{ flex:1, display:'flex', flexDirection: isMobile?'column':'row', minHeight:0, overflow: isMobile?'auto':'hidden' }}>

      {/* 3D Viewer */}
      {(() => {
        const needTrim = rkfsDesign === 'RXXRXX' || rkfsDesign === 'RFXXRXX';
        let code = '';
        if (rkfsInputSel === 'IEC Adapter Motor') {
          const amCode = (typeof getRkfsIECByPower === 'function') ? getRkfsIECByPower(rkfsMotorPower) : null;
          if (rkfsRatio && rkfsMounting && amCode) code = `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${amCode}-${rkfsMounting}`;
        } else if (rkfsInputSel === 'INPUT Shaft') {
          const sc = state?.rkfsINPUTshaft ?? state?.rkfsInputShaft ?? null;
          const dv = state?.rkfsINPUTshaftDia ?? state?.rkfsInputShaftDia ?? null;
          if (rkfsRatio && rkfsMounting && sc) code = `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${sc}-${rkfsMounting}${dv?`-${dv}`:''}`;
        } else {
          code = `${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}${rkfsPosition?`-${rkfsPosition}`:''}${rkfsPositionSub?`-${rkfsPositionSub}`:''}${state.rkfsDesignSuffix?`-${state.rkfsDesignSuffix}`:''}`;
        }
        if (needTrim) code = code.replace(/^(RXXRXX|RFXXRXX)/,'');
        return (
          <div style={{ flex: isMobile?'none':1, height: isMobile?'55vw':undefined, minHeight: isMobile?220:0, maxHeight: isMobile?380:undefined, minWidth:0 }}>
            <RkfsViewer3D modelCode={code} />
          </div>
        );
      })()}

      {/* ── Right Panel ── */}
      <div style={{ width: isMobile?'100%':280, flexShrink:0, background:'#0f1118', borderLeft: isMobile?'none':'1px solid rgba(255,255,255,0.07)', borderTop: isMobile?'1px solid rgba(255,255,255,0.07)':'none', overflowY:'auto', display:'flex', flexDirection:'column' }}>

        {/* Specs */}
        <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 }}>ข้อมูลจำเพาะ</div>
          {(() => {
            // คำนวณ output speed / torque / SF (copy จาก summary เดิม)
            const r = parseFloat(rkfsRatio);
            const p = parseInt(rkfsPole, 10);
            const baseRPM = p===2?3000:p===4?1500:p===6?1000:p===8?700:undefined;
            const outRPM  = (baseRPM && r && !Number.isNaN(r) && r>0) ? (baseRPM/r) : null;
            const kWNum   = parseFloat(String(rkfsMotorPower||'').replace(',','.'));
            const outTorque = (outRPM && kWNum && !Number.isNaN(kWNum)) ? (9550*kWNum)/outRPM : null;
            const amCode  = (typeof getRkfsIECByPower==='function') ? getRkfsIECByPower(rkfsMotorPower) : null;
            const amDims  = amCode && typeof rkfsAMFlangeDims!=='undefined' ? rkfsAMFlangeDims[amCode] : null;

            const dsKey = (() => {
              const d = String(rkfsDesign||'').toUpperCase();
              const s = String(rkfsSize||'').toUpperCase();
              if (d==='RXXRXX'||d==='RFXXRXX') { const m=s.match(/^(RF|R)\d+/); return m?m[0]:''; }
              return (d&&s)?`${d}${s}`:'';
            })();

            const rows = [
              ['Series',          rkfsSeries||'-'],
              ['Design',          rkfsDesign||'-'],
              ['Gear Size',       (rkfsDesign==='RXXRXX'||rkfsDesign==='RFXXRXX') ? String(rkfsSize||'-') : `${rkfsDesign||''}${rkfsSize||''}`],
              ['Ratio',           rkfsRatio||'-'],
              ['Input Selection', rkfsInputSel||'-'],
              ...(rkfsInputSel==='IEC Adapter Motor' ? [
                ['Input flange Ø', amDims ? `G5 Ø${amDims.G5} mm` : '—'],
                ['Input hole Ø',   amDims ? `D1 Ø${amDims.D1} mm` : '—'],
                ['Motor frame',    amCode||'—'],
              ] : rkfsInputSel==='INPUT Shaft' ? [
                ['Input shaft Ø', (() => { const d=state?.rkfsINPUTshaftDia??state?.rkfsInputShaftDia; return d?`${d} mm`:'—'; })()],
              ] : [
                ['Motor Type',    rkfsMotorType||'-'],
                ['Power',         rkfsMotorPower ? `${rkfsMotorPower} kW` : '-'],
                ['Pole',          rkfsPole||'-'],
                ['Rated Speed',   outRPM!=null ? `${outRPM.toFixed(0)} rpm` : '—'],
              ]),
              ['Output Speed',   outRPM!=null ? `${outRPM.toFixed(2)} rpm` : '—'],
              ['Output Torque',  outTorque!=null ? `${outTorque.toFixed(2)} N·m` : '—'],
              ['Mounting',       rkfsMounting||'-'],
              ['Terminal box',   rkfsPosition||'-'],
              ['Cable Position', rkfsPositionSub||'-'],
              ['Warranty',       '2 Years'],
            ];

            return rows.map(([k, v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', gap:6 }}>
                <span style={{ fontSize:11, color:'#4a5060', flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:11, fontWeight:600, color:['Output Speed','Output Torque','Ratio'].includes(k)?'#00e5a0':'#e8eaf0', textAlign:'right', wordBreak:'break-all' }}>{v||'—'}</span>
              </div>
            ));
          })()}
        </div>

        {/* Qty */}
        <div style={{ padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:10 }}>จำนวน</div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.65)' }}>RKFS</span>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <button type="button" onClick={() => update('rkfsQty', Math.max(1,(state.rkfsQty??1)-1))}
                style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>–</button>
              <input type="number" min={1} max={999} value={state.rkfsQty??1}
                onChange={e => { const v=Number(e.target.value); update('rkfsQty', Number.isFinite(v)?Math.max(1,Math.floor(v)):1); }}
                style={{ width:38, textAlign:'center', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:5, color:'#e8eaf0', fontSize:13, fontWeight:700, padding:'2px 0' }} />
              <button type="button" onClick={() => update('rkfsQty', Math.min(999,(state.rkfsQty??1)+1))}
                style={{ width:26, height:26, borderRadius:5, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.06)', color:'#e8eaf0', cursor:'pointer', fontSize:15 }}>+</button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
          {/* รับไฟล์ 3D */}
          <button type="button"
            style={{ width:'100%', padding:'11px 0', borderRadius:10, background:'rgba(0,229,160,0.12)', border:'1px solid rgba(0,229,160,0.3)', color:'#00e5a0', fontWeight:700, fontSize:14, cursor:'pointer' }}
            onClick={() => {
              const needTrim = rkfsDesign==='RXXRXX'||rkfsDesign==='RFXXRXX';
              let code = '';
              if (rkfsInputSel==='IEC Adapter Motor') {
                const amCode=(typeof getRkfsIECByPower==='function')?getRkfsIECByPower(rkfsMotorPower):null;
                if (rkfsRatio&&rkfsMounting&&amCode) code=`${rkfsDesign}${rkfsSize}-${rkfsRatio}-${amCode}-${rkfsMounting}`;
              } else if (rkfsInputSel==='INPUT Shaft') {
                const sc=state?.rkfsINPUTshaft??state?.rkfsInputShaft??null;
                const dv=state?.rkfsINPUTshaftDia??state?.rkfsInputShaftDia??null;
                if (rkfsRatio&&rkfsMounting&&sc) code=`${rkfsDesign}${rkfsSize}-${rkfsRatio}-${sc}-${rkfsMounting}${dv?`-${dv}`:''}`;
              } else {
                code=`${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}${rkfsPosition?`-${rkfsPosition}`:''}${rkfsPositionSub?`-${rkfsPositionSub}`:''}${state.rkfsDesignSuffix?`-${state.rkfsDesignSuffix}`:''}`;
              }
              if (needTrim) code=code.replace(/^(RXXRXX|RFXXRXX)/,'');
              if (code) onConfirm(code);
            }}>
            📦 รับไฟล์ 3D
          </button>

          {/* ขอใบเสนอราคา */}
          <button type="button"
            style={{ width:'100%', padding:'11px 0', borderRadius:10, background:'linear-gradient(90deg,#00e5a0,#00c87a)', color:'#0a1a10', fontWeight:700, fontSize:14, border:'none', cursor:'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              if (typeof onRequestQuote !== 'function') return;
              const needTrim = rkfsDesign==='RXXRXX'||rkfsDesign==='RFXXRXX';
              let code = '';
              if (rkfsInputSel==='IEC Adapter Motor') {
                const amCode=(typeof getRkfsIECByPower==='function')?getRkfsIECByPower(rkfsMotorPower):null;
                if (rkfsRatio&&rkfsMounting&&amCode) code=`${rkfsDesign}${rkfsSize}-${rkfsRatio}-${amCode}-${rkfsMounting}`;
              } else if (rkfsInputSel==='INPUT Shaft') {
                const sc=state?.rkfsINPUTshaft??state?.rkfsInputShaft??null;
                const dv=state?.rkfsINPUTshaftDia??state?.rkfsInputShaftDia??null;
                if (rkfsRatio&&rkfsMounting&&sc) code=`${rkfsDesign}${rkfsSize}-${rkfsRatio}-${sc}-${rkfsMounting}${dv?`-${dv}`:''}`;
              } else {
                code=`${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}${rkfsPosition?`-${rkfsPosition}`:''}${rkfsPositionSub?`-${rkfsPositionSub}`:''}${state.rkfsDesignSuffix?`-${state.rkfsDesignSuffix}`:''}`;
              }
              if (needTrim) code=code.replace(/^(RXXRXX|RFXXRXX)/,'');
              const summary = {
                product: 'RKFS Series', series: rkfsSeries||'', design: rkfsDesign||'',
                gearSize: rkfsSize||'', ratio: rkfsRatio||'', model: code,
                motor_kw: rkfsMotorPower||'', pole: rkfsPole||'',
                motor_type: rkfsMotorType||rkfsInputSel||'',
                motor_note: state?.rkfsDesignSuffix ? `(${state.rkfsDesignSuffix})` : '',
              };
              onRequestQuote(summary);
            }}>
            🛒 ขอใบเสนอราคา
          </button>

          {/* Drawing 2D */}
          <button type="button"
            style={{ width:'100%', padding:'10px 0', borderRadius:10, background:'rgba(255,255,255,0.07)', color:'#e8eaf0', fontWeight:600, fontSize:13, border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer' }}
            onClick={() => {
              const needTrim = rkfsDesign==='RXXRXX'||rkfsDesign==='RFXXRXX';
              let code = '';
              if (rkfsInputSel==='IEC Adapter Motor') {
                const amCode=(typeof getRkfsIECByPower==='function')?getRkfsIECByPower(rkfsMotorPower):null;
                if (rkfsRatio&&rkfsMounting&&amCode) code=`${rkfsDesign}${rkfsSize}-${rkfsRatio}-${amCode}-${rkfsMounting}`;
              } else if (rkfsInputSel==='INPUT Shaft') {
                const sc=state?.rkfsINPUTshaft??state?.rkfsInputShaft??null;
                if (rkfsRatio&&rkfsMounting&&sc) code=`${rkfsDesign}${rkfsSize}-${rkfsRatio}-${sc}-${rkfsMounting}`;
              } else {
                code=`${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}${rkfsPosition?`-${rkfsPosition}`:''}${rkfsPositionSub?`-${rkfsPositionSub}`:''}${state.rkfsDesignSuffix?`-${state.rkfsDesignSuffix}`:''}`;
              }
              if (needTrim) code=code.replace(/^(RXXRXX|RFXXRXX)/,'');
              if (typeof downloadRkfsDrawingPDF === 'function') downloadRkfsDrawingPDF(rkfsDesign, rkfsSize, code);
            }}>
            📐 Drawing 2D
          </button>
        </div>

      </div>
    </div>
  </div>
)}
</> ); }
