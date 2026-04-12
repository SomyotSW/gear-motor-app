// HypoidGearFlow.js
// แยกออกจาก MotorFlows.js — pattern เดียวกับ BLDCGearMotorFlow.js
// Summary page redesigned to match BLDCSummaryPage style

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Page transition variants — fade + slide up (ใช้กับทุก step)
const stepVariants = {
  initial:  { opacity: 0, y: 24, scale: 0.97 },
  animate:  { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.2,  ease: 'easeIn' } },
};
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────────────────────────
// GLB Base URL — localhost → /model/glb  |  production → Cloudflare R2
// ─────────────────────────────────────────────────────────────────────────────
const GLB_BASE = (() => {
  if (typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/model/glb';
  }
  return 'https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev';
})();

// inject model-viewer script once
(() => {
  if (typeof document === 'undefined') return;
  const id = 'mv-hypoid-script';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id; s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
  document.head.appendChild(s);
})();

// ─────────────────────────────────────────────────────────────────────────────
// mapHypoidGlbFilename — แปลง Model Code → ชื่อไฟล์ GLB
//
// ZDF3 (เหมือนเดิม):
//   ZDF3-45H100LB-750-S  →  ZDF3-45HXXX-750-S
//   ZDF3-40A60LF-400-S   →  ZDF3-40AXXX-400-S
//
// ZDF2 + H (ไม่มี direction ใน code):
//   ZDF2-12H60-15-C   →  ZDF2-12HXXX-15-C
//   ZDF2-15H10-60-CF  →  ZDF2-15HXXX-60-CF
//
// ZDF2 + A (มี direction 1 ตัว: L/R/T):
//   ZDF2-15A80L-25-CT   →  ZDF2-15AXXXL-25-CT
//   ZDF2-18A15T-40-C    →  ZDF2-18AXXXT-40-C
//   ZDF2-18A240R-90-CFT →  ZDF2-18AXXXR-90-CFT
// ─────────────────────────────────────────────────────────────────────────────
export function mapHypoidGlbFilename(modelCode) {
  if (!modelCode || typeof modelCode !== 'string') return null;
  const m = modelCode.trim();
  const parts = m.split('-');
  if (parts.length < 3) return null;

  const series = parts[0]; // ZDF2 | ZDF3
  const seg    = parts[1]; // e.g. "12H60" | "15A80L" | "45H100LB"

  // ── ZDF2 + H: seg = {shaftSize}H{ratio}  (ไม่มี direction)
  const matchH = seg.match(/^(\d{1,2}H)(\d+)$/);
  if (matchH) {
    // ZDF2-12H60-15-C → ZDF2-12HXXX-15-C
    return `${series}-${matchH[1]}XXX-${parts.slice(2).join('-')}`;
  }

  // ── ZDF2 + A: seg = {shaftSize}A{ratio}{dir1}  (direction 1 ตัว L/R/T)
  const matchA1 = seg.match(/^(\d{1,2}A)(\d+)([LRT])$/);
  if (matchA1) {
    // ZDF2-15A80L-25-CT → ZDF2-15AXXXL-25-CT
    return `${series}-${matchA1[1]}XXX${matchA1[3]}-${parts.slice(2).join('-')}`;
  }

  // ── ZDF3: seg = {shaftSize}{H|A}{ratio}{dir2}  (direction 2 ตัว เช่น LB)
  const matchDir2 = seg.match(/^(\d{1,2}[AH])(\d+)([A-Z]{2})$/);
  if (matchDir2) {
    return `${series}-${matchDir2[1]}XXX-${parts.slice(2).join('-')}`;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// generateHypoidModelCode
// state.mounting = 'C' | 'CT' | 'CF' | 'CFT'  (ZDF2 เท่านั้น)
// state.direction = 'L'|'R'|'T'  (ZDF2+A) | 'LB'..'RR' (ZDF3) | null (ZDF2+H)
// ─────────────────────────────────────────────────────────────────────────────
export function generateHypoidModelCode(state) {
  const { type, gearType, ratio, direction, power, supply, optional, mounting } = state;
  if (!type || !gearType || !ratio || !power || !supply) return '';
  // ZDF2+A ต้องมี direction, ZDF2+H ไม่ต้องมี direction, ZDF3 ต้องมี direction
  if (type === 'ZDF2' && gearType === 'A' && !direction) return '';
  if (type === 'ZDF3' && !direction) return '';

  const size = getShaftSizeNumber(type, gearType, power, ratio);
  if (!size) return '';

  const optCode = (optional || []).join('');

  if (type === 'ZDF2') {
    if (gearType === 'H') {
      // ZDF2-12H60-15-C  (ไม่มี direction, mounting แทน supply suffix)
      const mnt = mounting || supply;
      return `${type}-${size}${gearType}${ratio}-${power}-${mnt}${optCode}`;
    }
    if (gearType === 'A') {
      // ZDF2-15A80L-25-CT
      const mnt = mounting || supply;
      return `${type}-${size}${gearType}${ratio}${direction}-${power}-${mnt}${optCode}`;
    }
  }

  // ZDF3 (เหมือนเดิม)
  const base = `${type}-${size}${gearType}${ratio}${direction}-${power}-${supply}${optCode}`;
  return base;
}

// ─────────────────────────────────────────────────────────────────────────────
// ENV / TINT presets (เหมือน BLDC)
// ─────────────────────────────────────────────────────────────────────────────
const ENV_PRESETS_HYP = [
  { label:'Neutral', value:'neutral',  bg:'linear-gradient(135deg,#5a5a5a,#3a3a3a)' },
  { label:'Legacy',  value:'legacy',   bg:'linear-gradient(135deg,#7a8a9a,#5a6a7a)' },
  { label:'Warm',    value:'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr', bg:'linear-gradient(135deg,#c87a4a,#8a4a2a)' },
  { label:'Studio',  value:'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr', bg:'linear-gradient(135deg,#8a7a9a,#6a5a7a)' },
  { label:'Outdoor', value:'https://modelviewer.dev/shared-assets/environments/pillars_1k.hdr', bg:'linear-gradient(135deg,#5a8a5a,#3a6a3a)' },
  { label:'Moon',    value:'https://modelviewer.dev/shared-assets/environments/moon_1k.hdr', bg:'linear-gradient(135deg,#2a2a5a,#1a1a3a)' },
];

const TINT_COLORS_HYP = [
  { label:'Default', value:null,      bg:'linear-gradient(135deg,#aaa,#666)' },
  { label:'Silver',  value:'#d0d8e0', bg:'linear-gradient(135deg,#d0d8e0,#9aa8b8)' },
  { label:'Gold',    value:'#ffd060', bg:'linear-gradient(135deg,#ffd060,#c08020)' },
  { label:'Navy',    value:'#2050a0', bg:'linear-gradient(135deg,#4070c0,#103060)' },
  { label:'Red',     value:'#c02030', bg:'linear-gradient(135deg,#e04050,#901020)' },
  { label:'White',   value:'#f0f0f0', bg:'linear-gradient(135deg,#ffffff,#cccccc)' },
];

function useIsMobileHyp() {
  const [mobile, setMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  React.useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// HypoidViewer3D  — model-viewer แบบเดียวกับ BLDCViewer3D
// ─────────────────────────────────────────────────────────────────────────────
function HypoidViewer3D({ modelCode, lightMode = false, T = null, isMobileSummary = false }) {
  const theme = T || {
    viewerBg:        'linear-gradient(135deg,#0a0c10,#0d111c)',
    gridLine:        'rgba(0,229,160,0.025)',
    loaderRingColor: '#00e5a0',
    loaderText:      '#4a5060',
    labelColor:      '#4a5060',
    valueColor:      '#e8eaf0',
    panelBg:         '#0f1118',
    panelBorder:     '1px solid rgba(255,255,255,0.07)',
    sectionDivider:  '1px solid rgba(255,255,255,0.06)',
    sectionHeadColor:'#4a5060',
    accent:          '#00e5a0',
    accentFaint:     'rgba(0,229,160,0.08)',
    accentBorder:    'rgba(0,229,160,0.25)',
  };
  const mvRef    = useRef(null);
  const isMobile = useIsMobileHyp();
  const [ready, setReady]       = useState(false);
  const [err,   setErr]         = useState(false);
  const [envIdx, setEnvIdx]     = useState(0);
  const [exposure, setExposure] = useState(1.3);
  const [shadow,   setShadow]   = useState(0.6);
  const [tintIdx,  setTintIdx]  = useState(0);
  const [autoLight, setAutoLight] = useState(false);
  const [lightRot,  setLightRot]  = useState(0);
  const lightTimer = useRef(null);

  const glbName = mapHypoidGlbFilename(modelCode);

  useEffect(() => {
    setReady(false); setErr(false);
    if (!glbName) return;
    const url = `${GLB_BASE}/${glbName}.glb`;
    let cancelled = false;
    let attempts  = 0;
    function attach() {
      const el = mvRef.current;
      if (cancelled) return;
      if (!el || !el.nodeName) {
        if (attempts < 40) { attempts++; setTimeout(attach, 50); }
        return;
      }
      el.setAttribute('src', url);
      const onLoad = () => { if (!cancelled) { setReady(true);  setErr(false); } };
      const onErr  = () => { if (!cancelled) setErr(true); };
      el.addEventListener('load', onLoad);
      el.addEventListener('error', onErr);
      el.__hypCleanup = () => {
        el.removeEventListener('load', onLoad);
        el.removeEventListener('error', onErr);
      };
    }
    attach();
    return () => { cancelled = true; mvRef.current?.__hypCleanup?.(); };
  }, [glbName]);

  useEffect(() => {
    if (autoLight) {
      lightTimer.current = setInterval(() => {
        setLightRot(r => {
          const n = (r + 2) % 360;
          if (mvRef.current) mvRef.current.style.setProperty('--env-rotation', n + 'deg');
          return n;
        });
      }, 30);
    } else clearInterval(lightTimer.current);
    return () => clearInterval(lightTimer.current);
  }, [autoLight]);

  useEffect(() => {
    if (mvRef.current) mvRef.current.setAttribute('environment-image', ENV_PRESETS_HYP[envIdx].value);
  }, [envIdx]);

  useEffect(() => () => clearInterval(lightTimer.current), []);

  const applyTint = (idx) => {
    setTintIdx(idx);
    const color = TINT_COLORS_HYP[idx].value;
    const doApply = () => {
      try {
        const mats = mvRef.current?.model?.materials;
        if (!mats) return;
        if (!color) { [...mats].forEach(m => m.pbrMetallicRoughness.setBaseColorFactor([1,1,1,1])); }
        else {
          const r = parseInt(color.slice(1,3),16)/255;
          const g = parseInt(color.slice(3,5),16)/255;
          const b = parseInt(color.slice(5,7),16)/255;
          [...mats].forEach(m => m.pbrMetallicRoughness.setBaseColorFactor([r,g,b,1]));
        }
      } catch(e) {}
    };
    if (ready) doApply();
    else mvRef.current?.addEventListener('load', doApply, { once: true });
  };

  const isLight = lightMode;
  const S = {
    wrap:     { display:'flex', flexDirection:'row', width:'100%', height:'100%', minHeight:0, background:theme.viewerBg, fontFamily:"'Sarabun',sans-serif", transition:'background 0.25s' },
    viewer:   { flex:1, position:'relative', background:theme.viewerBg, overflow:'hidden', transition:'background 0.25s' },
    grid:     { position:'absolute', inset:0, backgroundImage:`linear-gradient(${theme.gridLine} 1px,transparent 1px),linear-gradient(90deg,${theme.gridLine} 1px,transparent 1px)`, backgroundSize:'40px 40px', pointerEvents:'none' },
    mv:       { width:'100%', height:'100%', '--poster-color':'transparent', '--progress-bar-color':theme.accent, background:'transparent', display:'block' },
    ring:     { width:44, height:44, border:`2px solid ${theme.accentFaint}`, borderTopColor:theme.loaderRingColor, borderRadius:'50%', animation:'hyp3d-spin 0.9s linear infinite' },
    loaderBox:{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, background:theme.viewerBg, transition:'background 0.25s' },
    errorBox: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:theme.viewerBg, transition:'background 0.25s' },
    panel:    { width:200, flexShrink:0, background:theme.panelBg, borderLeft:theme.panelBorder, overflowY:'auto', display:'flex', flexDirection:'column', transition:'background 0.25s, border 0.25s' },
    sec:      { padding:'14px 16px', borderBottom:theme.sectionDivider },
    secT:     { fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:theme.sectionHeadColor, marginBottom:10, transition:'color 0.25s' },
    envGrid:  { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:5 },
    envBtn:   (a) => ({ aspectRatio:1, borderRadius:6, border:a?`2px solid ${theme.accent}`:'2px solid transparent', cursor:'pointer', position:'relative', overflow:'hidden', transition:'all 0.15s' }),
    envLabel: { position:'absolute', bottom:0, left:0, right:0, fontSize:7, textAlign:'center', background:'rgba(0,0,0,0.65)', padding:'1px 0', color:'rgba(255,255,255,0.7)', fontWeight:600 },
    colorGrid:{ display:'flex', gap:6, flexWrap:'wrap' },
    swatch:   (a) => ({ width:24, height:24, borderRadius:'50%', border:a?`2px solid ${theme.accent}`:'2px solid transparent', cursor:'pointer', transition:'all 0.15s', position:'relative', flexShrink:0, transform:a?'scale(1.1)':'scale(1)' }),
    slider:   { flex:1, accentColor:theme.accent, cursor:'pointer', height:3 },
    sliderVal:{ fontSize:10, color:theme.valueColor, width:30, textAlign:'right', flexShrink:0, fontFamily:'monospace', transition:'color 0.25s' },
    lrow:     { display:'flex', alignItems:'center', gap:8, marginBottom:8 },
    llbl:     { fontSize:10, color:theme.labelColor, width:44, flexShrink:0, transition:'color 0.25s' },
    toggle:   (on) => ({ width:34, height:18, background:on?theme.accent:isLight?'rgba(0,0,0,0.12)':'rgba(255,255,255,0.1)', borderRadius:9, position:'relative', cursor:'pointer', border:'none', transition:'background 0.2s', flexShrink:0 }),
    toggleDot:(on) => ({ position:'absolute', top:2, left:on?16:2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.4)' }),
  };

  return (
    <div style={S.wrap}>
      <style>{`@keyframes hyp3d-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={S.viewer}>
        <div style={S.grid} />
        {!ready && !err && (
          <div style={S.loaderBox}>
            <div style={S.ring}/>
            <span style={{fontSize:11, color:theme.loaderText, letterSpacing:'1px', transition:'color 0.25s'}}>กำลังโหลดโมเดล…</span>
          </div>
        )}
        {err && (
          <div style={S.errorBox}>
            {/* fallback: แสดงรูปภาพ hypoid.png แทน */}
            <img
              src={`${process.env.PUBLIC_URL}/model/img/Hypoid/hypoid.png`}
              alt="Hypoid Gear"
              style={{ maxWidth:'70%', maxHeight:'70%', objectFit:'contain', borderRadius:12, opacity:0.85 }}
            />
            <span style={{fontSize:10, color:theme.labelColor, transition:'color 0.25s'}}>
              {glbName ? `ยังไม่มีไฟล์ 3D (${glbName}.glb)` : 'ยังไม่มีไฟล์ 3D'}
            </span>
          </div>
        )}
        {!glbName && !err && !ready && (
          <div style={S.errorBox}>
            <img
              src={`${process.env.PUBLIC_URL}/model/img/Hypoid/hypoid.png`}
              alt="Hypoid Gear"
              style={{ maxWidth:'70%', maxHeight:'70%', objectFit:'contain', borderRadius:12, opacity:0.85 }}
            />
          </div>
        )}
        <model-viewer
          ref={mvRef}
          src=""
          alt={glbName || 'hypoid'}
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
          <div style={{position:'absolute',bottom:10,left:0,right:0,textAlign:'center',color:isLight?'rgba(0,0,0,0.2)':'rgba(255,255,255,0.2)',fontSize:10,pointerEvents:'none',transition:'color 0.25s'}}>
            🖱 ลาก = หมุน &nbsp;·&nbsp; Scroll = ซูม
          </div>
        )}
      </div>

      {/* Lighting/Color controls panel — desktop only, hidden when mobile summary uses inline controls */}
      {!isMobile && !isMobileSummary && (
        <div style={S.panel}>
          <div style={S.sec}>
            <div style={S.secT}>สภาพแวดล้อมแสง</div>
            <div style={S.envGrid}>
              {ENV_PRESETS_HYP.map((env,i) => (
                <button key={env.value} title={env.label} onClick={()=>setEnvIdx(i)}
                  style={{...S.envBtn(i===envIdx), background:env.bg}}>
                  <span style={S.envLabel}>{env.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={S.sec}>
            <div style={S.secT}>ควบคุมแสง</div>
            <div style={S.lrow}>
              <span style={S.llbl}>ความสว่าง</span>
              <input type="range" min={0.5} max={3} step={0.05} value={exposure} style={S.slider}
                onChange={e=>{const v=parseFloat(e.target.value);setExposure(v);if(mvRef.current)mvRef.current.setAttribute('exposure',v);}}/>
              <span style={S.sliderVal}>{exposure.toFixed(1)}</span>
            </div>
            <div style={S.lrow}>
              <span style={S.llbl}>เงา</span>
              <input type="range" min={0} max={1} step={0.05} value={shadow} style={S.slider}
                onChange={e=>{const v=parseFloat(e.target.value);setShadow(v);if(mvRef.current)mvRef.current.setAttribute('shadow-softness',v);}}/>
              <span style={S.sliderVal}>{shadow.toFixed(1)}</span>
            </div>
            <div style={{...S.lrow,marginBottom:0}}>
              <span style={S.llbl}>ทิศแสง</span>
              {autoLight
                ? <span style={{flex:1,fontSize:10,color:theme.accent,transition:'color 0.25s'}}>⟳ หมุนอัตโนมัติ</span>
                : <input type="range" min={0} max={360} step={1} value={lightRot} style={S.slider}
                    onChange={e=>{const v=parseInt(e.target.value);setLightRot(v);if(mvRef.current)mvRef.current.style.setProperty('--env-rotation',v+'deg');}}/>}
              <span style={S.sliderVal}>{lightRot}°</span>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
              <span style={{fontSize:10, color:theme.labelColor, transition:'color 0.25s'}}>☀️ หมุนแสงอัตโนมัติ</span>
              <button style={S.toggle(autoLight)} onClick={()=>setAutoLight(v=>!v)}>
                <div style={S.toggleDot(autoLight)}/>
              </button>
            </div>
          </div>
          <div style={S.sec}>
            <div style={S.secT}>สีโมเดล</div>
            <div style={S.colorGrid}>
              {TINT_COLORS_HYP.map((c,i) => (
                <button key={c.label} title={c.label} onClick={()=>applyTint(i)}
                  style={{...S.swatch(i===tintIdx), background:c.bg}}>
                  {i===tintIdx && (
                    <span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'white',textShadow:'0 1px 3px rgba(0,0,0,0.8)'}}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import F2Img    from '../assets/hypoid/F2.png';
import F3Img    from '../assets/hypoid/F3.png';
import F23HImg  from '../assets/hypoid/F23H.png';
import F23AImg  from '../assets/hypoid/F23A.png';
import F33HImg  from '../assets/hypoid/F33H.png';
import F33AImg  from '../assets/hypoid/F33A.png';
import LBImg    from '../assets/hypoid/LB.png';
import LFImg    from '../assets/hypoid/LF.png';
import LLImg    from '../assets/hypoid/LL.png';
import LRImg    from '../assets/hypoid/LR.png';
import RBImg    from '../assets/hypoid/RB.png';
import HRFImg   from '../assets/hypoid/HRF.png';
import RLImg    from '../assets/hypoid/RL.png';
import RRImg    from '../assets/hypoid/RR.png';
import BGH1Img  from '../assets/hypoid/BGH1.png';
import BGH2Img  from '../assets/hypoid/BGH2.png';
import BGH3Img  from '../assets/hypoid/BGH3.png';
// ZDF2-A direction (1 letter)
import LImg     from '../assets/hypoid/L.png';
import RImg     from '../assets/hypoid/R.png';
import TImg     from '../assets/hypoid/T.png';
// ZDF2 Mounting type (after supply)
import CImg     from '../assets/hypoid/C.png';
import CTImg    from '../assets/hypoid/CT.png';
import CFImg    from '../assets/hypoid/CF.png';
import CFTImg   from '../assets/hypoid/CFT.png';

// ─────────────────────────────────────────────────────────────────────────────
// ThumbCard
// ─────────────────────────────────────────────────────────────────────────────
function ThumbCard({ img, label, subtitle, active, onClick, className = '', animate, transition }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={animate}
      transition={transition}
      whileTap={{ scale: 0.96 }}
      className={[
        'relative flex flex-col items-center rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 bg-white/90 transition-all',
        active ? 'border-blue-500 shadow-blue-400/40 ring-2 ring-blue-400' : 'border-transparent hover:border-blue-300',
        className,
      ].join(' ')}
      style={{ minWidth: 120 }}
    >
      <img
        src={img}
        alt={label}
        className="w-full object-contain"
        style={{ maxHeight: 220, background: '#fff', padding: 8 }}
      />
      <div className={`w-full text-center py-2 px-2 ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
        <p className="font-bold text-xs leading-tight">{label}</p>
        {subtitle && <p className="text-[9px] opacity-70 leading-tight mt-0.5">{subtitle}</p>}
      </div>
      {active && (
        <span className="absolute top-1 right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-[11px] font-bold">✓</span>
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sale Persons (เหมือน BLDC)
// ─────────────────────────────────────────────────────────────────────────────
const SALE_PERSONS = [
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
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_fwgn6cw';
const EMAILJS_TEMPLATE_ID = 'rfq_hypoid_template';
const EMAILJS_PUBLIC_KEY  = 'BvIT5-X7LnkaS3LKq'.trim();

// ZDF2: ขนาดเพลาไม่ขึ้นกับ ratio (เหมือนกันทุก ratio 10-240)
// H = Hollow shaft  |  A = Solid shaft
const shaftDiaMapZDF2 = {
  H: { 15: 12, 25: 12, 40: 15, 60: 15, 90: 15 },
  A: { 15: 15, 25: 15, 40: 18, 60: 18, 90: 18 },
};

// ZDF3: ขนาดเพลาขึ้นกับ power + ratio
// Ratio 5–60  → กลุ่มเล็ก  |  Ratio 80–240 → กลุ่มใหญ่
const shaftDiaRulesZDF3 = [
  // 100W
  { p: 100,  low: 5,  high: 60,  H: 20, A: 18 },
  { p: 100,  low: 80, high: 240, H: 25, A: 22 },
  // 200W
  { p: 200,  low: 5,  high: 60,  H: 25, A: 22 },
  { p: 200,  low: 80, high: 240, H: 30, A: 28 },
  // 400W
  { p: 400,  low: 5,  high: 60,  H: 30, A: 28 },
  { p: 400,  low: 80, high: 240, H: 35, A: 32 },
  // 750W
  { p: 750,  low: 5,  high: 60,  H: 35, A: 32 },
  { p: 750,  low: 80, high: 240, H: 45, A: 40 },
  // 1500W (ratio เดียวกันทั้งหมด)
  { p: 1500, low: 5,  high: 240, H: 45, A: 40 },
  // 2200W
  { p: 2200, low: 5,  high: 30,  H: 45, A: 40 },
];

function getShaftDiameter(series, gearType, powerW, ratio) {
  const s = String(series || '').toUpperCase();
  const g = String(gearType || '').toUpperCase();
  const p = Number(powerW);
  const r = Number(ratio);

  if (s.includes('ZDF2')) {
    const mm = shaftDiaMapZDF2[g]?.[p];
    return mm ? `Ø${mm}mm` : null;
  }
  if (s.includes('ZDF3')) {
    for (const rule of shaftDiaRulesZDF3) {
      if (p === rule.p && r >= rule.low && r <= rule.high) {
        const mm = rule[g];
        return mm ? `Ø${mm}mm` : null;
      }
    }
  }
  return null;
}

function getShaftSizeNumber(series, gearType, powerW, ratio) {
  const txt = getShaftDiameter(series, gearType, powerW, ratio);
  if (!txt) return null;
  const m = txt.match(/(\d+)/);
  return m ? m[1] : null;
}

const drawingPdfMap = {
  ZDF2: { 15: 'F215W25W', 25: 'F215W25W', 40: 'F240W', 60: 'F260W90W', 90: 'F260W90W' },
  ZDF3: { 100: 'F3100W', 200: 'F3200W', 400: 'F3400W', 750: 'F3750W', 1500: 'F31500W', 2200: 'F32200W' },
};

function getDrawingPdfSrc(series, powerW) {
  const key = Number(powerW);
  const base = drawingPdfMap?.[series]?.[key];
  return base ? `/model/pdf/Hypoid/${base}.pdf` : null;
}

function getContinuousRatingPdf(series, powerW) {
  const s = (series || '').toUpperCase();
  const isF2 = s.includes('F2');
  const isF3 = s.includes('F3');
  const p = Number(powerW);

  if (isF2) {
    if (p === 15 || p === 25) return 'Specificatio&Continuous rating15W-25W.pdf';
    if (p === 40)              return 'Specificatio&Continuous rating40W.pdf';
    if (p === 60 || p === 90)  return 'Specificatio&Continuous rating60W-90W.pdf';
    return null;
  }
  if (isF3) {
    if (p === 100)  return 'Specificatio&Continuous rating100W.pdf';
    if (p === 200)  return 'Specificatio&Continuous rating200W.pdf';
    if (p === 400)  return 'Specificatio&Continuous rating400W.pdf';
    if (p === 750)  return 'Specificatio&Continuous rating750W.pdf';
    if (p === 1500) return 'Specificatio&Continuous rating1500W.pdf';
    if (p === 2200) return 'Specificatio&Continuous rating2200W.pdf';
    return null;
  }
  return null;
}

function formatSupply(s) {
  const SUPPLY_LABELS = {
    C:  '1เฟส-Single phase 220V/50Hz/60Hz',
    A:  '1เฟส-Single phase 110V/50Hz/60Hz',
    S:  '3เฟส-Three phase 220/380V/50Hz/460V/60Hz',
    S3: '3เฟส-Three phase 220/380/415V/50Hz',
    S4: '3เฟส-Three phase 460V/60Hz',
  };
  return SUPPLY_LABELS[s] ?? s ?? '-';
}

// ─────────────────────────────────────────────────────────────────────────────
// HypoidMobileLightingControls — inline controls ใต้ viewer บน mobile
// เหมือน BLDCMobileLightingControls แต่ใช้ querySelector 'model-viewer' ตัวแรก
// ─────────────────────────────────────────────────────────────────────────────
function HypoidMobileLightingControls({ T }) {
  const getMV = () => document.querySelector('#hypoid-summary model-viewer') || document.querySelector('model-viewer');
  const [envIdx,    setEnvIdx]    = useState(0);
  const [exposure,  setExposure]  = useState(1.3);
  const [shadow,    setShadow]    = useState(0.6);
  const [autoLight, setAutoLight] = useState(false);
  const lightTimer = useRef(null);

  useEffect(() => {
    if (autoLight) {
      lightTimer.current = setInterval(() => {
        const mv = getMV();
        if (mv) {
          const cur = parseInt(mv.style.getPropertyValue('--env-rotation') || '0', 10);
          mv.style.setProperty('--env-rotation', ((cur + 2) % 360) + 'deg');
        }
      }, 30);
    } else clearInterval(lightTimer.current);
    return () => clearInterval(lightTimer.current);
  }, [autoLight]);
  useEffect(() => () => clearInterval(lightTimer.current), []);

  const theme = T || {};
  const accent = theme.accent || '#00e5a0';
  const labelColor = theme.labelColor || '#4a5060';
  const valueColor = theme.valueColor || '#e8eaf0';
  const sectionDivider = theme.sectionDivider || '1px solid rgba(255,255,255,0.06)';
  const sectionHeadColor = theme.sectionHeadColor || '#4a5060';

  const sec  = { padding:'12px 16px', borderBottom: sectionDivider };
  const secT = { fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color: sectionHeadColor, marginBottom:8 };
  const row  = { display:'flex', alignItems:'center', gap:8, marginBottom:6 };
  const lbl  = { fontSize:10, color: labelColor, width:54, flexShrink:0 };
  const sld  = { flex:1, accentColor: accent, cursor:'pointer', height:3 };
  const val  = { fontSize:10, color: valueColor, width:28, textAlign:'right', flexShrink:0, fontFamily:'monospace' };

  return (
    <>
      <div style={sec}>
        <div style={secT}>สภาพแวดล้อมแสง</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4 }}>
          {ENV_PRESETS_HYP.map((env, i) => (
            <button key={env.value} title={env.label}
              onClick={() => {
                setEnvIdx(i);
                const mv = getMV();
                if (mv) { try { mv.setAttribute('environment-image', env.value); } catch(e){} }
              }}
              style={{ aspectRatio:1, borderRadius:5, border: i===envIdx ? `2px solid ${accent}` : '2px solid transparent', cursor:'pointer', position:'relative', overflow:'hidden', background:env.bg }}
            >
              <span style={{ position:'absolute', bottom:0, left:0, right:0, fontSize:6, textAlign:'center', background:'rgba(0,0,0,0.6)', color:'rgba(255,255,255,0.8)' }}>{env.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={sec}>
        <div style={secT}>ควบคุมแสง</div>
        <div style={row}>
          <span style={lbl}>ความสว่าง</span>
          <input type="range" min={0.5} max={3} step={0.05} value={exposure} style={sld}
            onChange={e=>{ const v=parseFloat(e.target.value); setExposure(v); const mv=getMV(); if(mv) mv.setAttribute('exposure',v); }}/>
          <span style={val}>{exposure.toFixed(1)}</span>
        </div>
        <div style={row}>
          <span style={lbl}>เงา</span>
          <input type="range" min={0} max={1} step={0.05} value={shadow} style={sld}
            onChange={e=>{ const v=parseFloat(e.target.value); setShadow(v); const mv=getMV(); if(mv) mv.setAttribute('shadow-softness',v); }}/>
          <span style={val}>{shadow.toFixed(1)}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:4 }}>
          <span style={{ fontSize:10, color: labelColor }}>☀️ หมุนแสงอัตโนมัติ</span>
          <button onClick={() => setAutoLight(v => !v)}
            style={{ width:34, height:18, background: autoLight ? accent : 'rgba(255,255,255,0.1)', borderRadius:9, position:'relative', cursor:'pointer', border:'none', transition:'background 0.2s' }}>
            <div style={{ position:'absolute', top:2, left: autoLight ? 16 : 2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.2s' }} />
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HypoidSummaryPage — matches BLDCSummaryPage layout exactly
// ─────────────────────────────────────────────────────────────────────────────
function HypoidSummaryPage({ state, modelCode, onConfirm, onBack }) {
  const { type, gearType, ratio, direction, power, supply, optional, quantity, mounting } = state;
  const isMobile = useIsMobileHyp();

  const [lightMode, setLightMode] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [sending, setSending]     = useState(false);
  const [form, setForm]           = useState({ name: '', phone: '', company: '', email: '' });
  const [salePerson, setSalePerson]               = useState('CA');
  const [showSalePersonPicker, setShowSalePersonPicker] = useState(false);

  // ── Theme tokens (same as BLDC) ─────────────────────────────────────────
  const T = lightMode ? {
    pageBg:          '#f0f4f8',
    topBarBg:        'rgba(240,244,248,0.97)',
    topBarBorder:    '1px solid rgba(0,0,0,0.08)',
    panelBg:         '#ffffff',
    panelBorder:     '1px solid rgba(0,0,0,0.08)',
    accent:          '#1a4fd6',
    accentFaint:     'rgba(26,79,214,0.08)',
    accentBorder:    'rgba(26,79,214,0.25)',
    titleColor:      '#1a4fd6',
    labelColor:      '#8090a8',
    valueColor:      '#0d1526',
    inputBg:         'rgba(0,0,0,0.04)',
    inputBorder:     '1px solid rgba(0,0,0,0.10)',
    inputColor:      '#0d1526',
    btnBg:           'rgba(0,0,0,0.04)',
    btnBorder:       '1px solid rgba(0,0,0,0.10)',
    btnColor:        '#0d1526',
    sectionDivider:  '1px solid rgba(0,0,0,0.06)',
    sectionHeadColor:'#8090a8',
    codeBg:          'rgba(0,0,0,0.05)',
    codeBorder:      '1px solid rgba(0,0,0,0.10)',
    codeColor:       '#0d1526',
    backBtnBg:       'rgba(26,79,214,0.08)',
    backBtnBorder:   '1px solid rgba(26,79,214,0.25)',
    backBtnColor:    '#1a4fd6',
    specHighlight:   '#1a4fd6',
    viewerBg:        'linear-gradient(135deg,#e8edf5,#dde4f0)',
    toggleIcon:      '☀️',
  } : {
    pageBg:          '#0a0c10',
    topBarBg:        'rgba(10,12,16,0.95)',
    topBarBorder:    '1px solid rgba(255,255,255,0.07)',
    panelBg:         '#0f1118',
    panelBorder:     '1px solid rgba(255,255,255,0.07)',
    accent:          '#00e5a0',
    accentFaint:     'rgba(0,229,160,0.08)',
    accentBorder:    'rgba(0,229,160,0.25)',
    titleColor:      '#00e5a0',
    labelColor:      '#4a5060',
    valueColor:      '#e8eaf0',
    inputBg:         'rgba(255,255,255,0.06)',
    inputBorder:     '1px solid rgba(255,255,255,0.1)',
    inputColor:      '#e8eaf0',
    btnBg:           'rgba(255,255,255,0.06)',
    btnBorder:       '1px solid rgba(255,255,255,0.1)',
    btnColor:        '#e8eaf0',
    sectionDivider:  '1px solid rgba(255,255,255,0.06)',
    sectionHeadColor:'#4a5060',
    codeBg:          'rgba(255,255,255,0.06)',
    codeBorder:      '1px solid rgba(255,255,255,0.1)',
    codeColor:       '#e8eaf0',
    backBtnBg:       'rgba(0,229,160,0.08)',
    backBtnBorder:   '1px solid rgba(0,229,160,0.25)',
    backBtnColor:    '#00e5a0',
    specHighlight:   '#00e5a0',
    viewerBg:        'linear-gradient(135deg,#0a0c10,#0d111c)',
    toggleIcon:      '🌙',
  };

  // ── Computed values ──────────────────────────────────────────────────────
  const outputSpeed  = ratio ? Math.round(1500 / ratio) : null;
  const motorKw      = power ? power / 1000 : null;
  const outputTorque = (outputSpeed && motorKw && outputSpeed > 0)
    ? ((9550 * motorKw) / outputSpeed).toFixed(2)
    : null;

  const shaftDia     = getShaftDiameter(type, gearType, power, ratio) || '-';
  const gearTypeDesc = gearType === 'A'
    ? 'A Solid shaft / Keyway'
    : 'H Hollow shaft / Keyway';

  // ── Spec rows ────────────────────────────────────────────────────────────
  const dirLabel = type === 'ZDF2' && gearType === 'H' ? '—' : (direction || '—');
  const specRows = [
    ['Series',         type || '—'],
    ['Gear Type',      gearTypeDesc],
    ['Output Shaft',   shaftDia],
    ['Ratio',          ratio ? `1/${ratio}` : '—'],
    ['Power',          power ? `${power} W` : '—'],
    ['Power Supply',   supply ? formatSupply(supply) : '—'],
    ['Output Speed',   outputSpeed ? `${outputSpeed} rpm` : '—'],
    ['Output Torque',  outputTorque ? `${outputTorque} N.m` : '—'],
    ['Direction',      dirLabel],
    ...(type === 'ZDF2' ? [['Mounting', mounting || '—']] : []),
    ['Optional',       optional?.length ? optional.join(', ') : '-'],
  ];

  // ── Quote submit ─────────────────────────────────────────────────────────
  const submitQuote = async () => {
    if (!form.name || !form.email) { alert('กรุณากรอกชื่อ และอีเมล'); return; }
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          customer_name:    form.name,
          customer_phone:   form.phone,
          customer_company: form.company,
          customer_email:   form.email,
          to_email:         'Chotthanin@synergy-as.com,SAS04@synergy-as.com',
          model_code:       modelCode || '-',
          series:           type || '-',
          gear_type:        gearTypeDesc,
          power_motor:      power != null ? `${power} W` : '-',
          power_supply:     formatSupply(supply),
          ratio:            ratio != null ? `1/${ratio}` : '-',
          output_speed:     outputSpeed != null ? `${outputSpeed} rpm` : '-',
          output_torque:    outputTorque != null ? `${outputTorque} N.m` : '-',
          motor_optional:   optional?.length ? optional.join(', ') : '-',
          mounting:         mounting || '-',
          output_shaft:     shaftDia !== '-' ? shaftDia : '-',
          quantity:         String(quantity || 1),
          sale_person:      salePerson || 'CA',
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      alert('ขอบคุณสำหรับการขอราคา กรุณารอการตอบกลับสักครู่');
      setShowQuote(false);
      setShowSalePersonPicker(false);
      setForm({ name: '', phone: '', company: '', email: '' });
    } catch (err) {
      console.error(err);
      alert('ส่งคำขอไม่สำเร็จ กรุณาลองอีกครั้ง');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* ── Full-screen panel (same structure as BLDC) ── */}
      <div
        id="hypoid-summary"
        style={{
          position: 'fixed', inset: 0, zIndex: 500,
          display: 'flex', flexDirection: 'column',
          background: T.pageBg,
          fontFamily: "'Sarabun',sans-serif",
          transition: 'background 0.25s',
        }}
      >
        {/* ── Top bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '8px 12px' : '10px 18px',
          borderBottom: T.topBarBorder,
          background: T.topBarBg,
          backdropFilter: 'blur(12px)',
          flexShrink: 0, flexWrap: 'wrap', gap: 6,
          transition: 'background 0.25s, border 0.25s',
        }}>
          {/* Left: title + theme toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: "'Rajdhani',sans-serif", fontWeight: 700,
              fontSize: isMobile ? 13 : 15, letterSpacing: '1.5px',
              color: T.titleColor, textTransform: 'uppercase',
              transition: 'color 0.25s',
            }}>
              ⚙️ Hypoid Gear
            </span>
            <button
              type="button"
              title={lightMode ? 'Switch to Dark mode' : 'Switch to Light mode'}
              onClick={() => setLightMode(m => !m)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: 8,
                background: T.accentFaint,
                border: `1px solid ${T.accentBorder}`,
                cursor: 'pointer', fontSize: 15, lineHeight: 1,
                transition: 'background 0.2s, border 0.2s',
                flexShrink: 0,
              }}
            >
              {T.toggleIcon}
            </button>
          </div>

          {/* Center: model code + copy */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontFamily: 'monospace',
              fontSize: isMobile ? 10 : 12,
              fontWeight: 600,
              color: T.codeColor, background: T.codeBg, border: T.codeBorder,
              padding: '3px 8px', borderRadius: 5, transition: 'all 0.25s',
              maxWidth: isMobile ? 160 : 'none',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {modelCode || '—'}
            </span>
            <button
              type="button"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: T.accent, fontSize: 11, padding: '3px 8px',
                borderRadius: 4, transition: 'color 0.25s',
              }}
              onClick={async () => {
                try {
                  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(modelCode || '');
                } catch {}
              }}
            >
              Copy
            </button>
          </div>

          {/* Right: back button */}
          <button
            type="button"
            onClick={onBack}
            style={{
              background: T.backBtnBg, border: T.backBtnBorder,
              color: T.backBtnColor, padding: '4px 12px',
              borderRadius: 6, cursor: 'pointer',
              fontSize: 11, fontWeight: 600, transition: 'all 0.25s',
            }}
          >
            ← ย้อนกลับ
          </button>
        </div>

        {/* ── Body — column on mobile (scroll), row on desktop ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: 0,
          overflow: isMobile ? 'auto' : 'hidden',
        }}>

          {/* 3D Viewer */}
          <div style={{
            flex: isMobile ? 'none' : 1,
            height: isMobile ? '300px' : undefined,
            minHeight: isMobile ? 300 : 0,
            maxHeight: isMobile ? 400 : undefined,
            minWidth: 0,
            background: T.viewerBg,
            transition: 'background 0.25s',
          }}>
            <HypoidViewer3D modelCode={modelCode} lightMode={lightMode} T={T} isMobileSummary={isMobile} />
          </div>

          {/* Panel — full width on mobile, fixed 280px on desktop */}
          <div style={{
            width: isMobile ? '100%' : 280,
            flexShrink: 0,
            background: T.panelBg,
            borderLeft: isMobile ? 'none' : T.panelBorder,
            borderTop: isMobile ? T.panelBorder : 'none',
            overflowY: isMobile ? 'visible' : 'auto',
            display: 'flex', flexDirection: 'column',
            transition: 'background 0.25s, border 0.25s',
          }}>

            {/* Mobile: lighting controls inline (เหมือน BLDC) */}
            {isMobile && <HypoidMobileLightingControls T={T} />}

            {/* Specs */}
            <div style={{ padding: '14px 16px', borderBottom: T.sectionDivider }}>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: T.sectionHeadColor,
                marginBottom: 10, transition: 'color 0.25s',
              }}>
                ข้อมูลจำเพาะ
              </div>
              {specRows.map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', padding: '5px 0',
                  borderBottom: `1px solid ${lightMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`,
                  gap: 6,
                }}>
                  <span style={{ fontSize: 11, color: T.labelColor, flexShrink: 0, transition: 'color 0.25s' }}>{k}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: ['Output Speed', 'Ratio', 'Power', 'Output Shaft'].includes(k) ? T.specHighlight : T.valueColor,
                    textAlign: 'right', wordBreak: 'break-all', transition: 'color 0.25s',
                  }}>
                    {v || '—'}
                  </span>
                </div>
              ))}

              {/* Continuous rating PDF inline */}
              {(() => {
                const crFile = getContinuousRatingPdf(type, power);
                if (!crFile) return null;
                const filePath = `/model/pdf/Hypoid/${encodeURIComponent(crFile)}`;
                return (
                  <button
                    type="button"
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = filePath;
                      a.setAttribute('download', crFile);
                      document.body.appendChild(a); a.click(); a.remove();
                    }}
                    style={{
                      marginTop: 8, width: '100%', padding: '5px 0',
                      borderRadius: 6, background: T.accentFaint,
                      border: `1px solid ${T.accentBorder}`,
                      color: T.accent, fontSize: 10, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    📋 ข้อมูลจำเพาะและระดับการทำงานต่อเนื่อง
                  </button>
                );
              })()}
            </div>

            {/* Quantity */}
            <div style={{ padding: '14px 16px', borderBottom: T.sectionDivider }}>
              <div style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: T.sectionHeadColor,
                marginBottom: 10, transition: 'color 0.25s',
              }}>
                จำนวน
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: T.labelColor, transition: 'color 0.25s' }}>Hypoid Motor</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    type="button"
                    onClick={() => state.setQuantity && state.setQuantity(q => Math.max(1, q - 1))}
                    style={{ width: 26, height: 26, borderRadius: 5, border: T.btnBorder, background: T.btnBg, color: T.btnColor, cursor: 'pointer', fontSize: 15, transition: 'all 0.25s' }}
                  >–</button>
                  <span style={{
                    width: 38, textAlign: 'center', background: T.inputBg,
                    border: T.inputBorder, borderRadius: 5, color: T.inputColor,
                    fontSize: 13, fontWeight: 700, padding: '2px 0',
                    display: 'inline-block', transition: 'all 0.25s',
                  }}>
                    {quantity || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => state.setQuantity && state.setQuantity(q => Math.min(999, q + 1))}
                    style={{ width: 26, height: 26, borderRadius: 5, border: T.btnBorder, background: T.btnBg, color: T.btnColor, cursor: 'pointer', fontSize: 15, transition: 'all 0.25s' }}
                  >+</button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>

              {/* Top row: ขอราคา + รับไฟล์ 3D — 2 col on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr', gap: 8 }}>
                <button
                  type="button"
                  style={{
                    padding: '11px 6px', borderRadius: 10,
                    background: lightMode ? 'linear-gradient(90deg,#1a4fd6,#1040b8)' : 'linear-gradient(90deg,#00e5a0,#00c87a)',
                    color: lightMode ? '#ffffff' : '#0a1a10',
                    fontWeight: 700, fontSize: isMobile ? 12 : 14,
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.25s, color 0.25s',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => setShowQuote(true)}
                >
                  🛒 {isMobile ? 'ขอราคา' : 'ขอใบเสนอราคา'}
                </button>

                <button
                  type="button"
                  style={{
                    padding: '11px 6px', borderRadius: 10,
                    background: 'linear-gradient(90deg,#4080ff,#2060dd)',
                    color: 'white', fontWeight: 700, fontSize: isMobile ? 12 : 14,
                    border: 'none', cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => { if (modelCode) onConfirm(modelCode); }}
                >
                  📦 {isMobile ? 'ไฟล์ 3D' : 'รับไฟล์ 3D (.STEP)'}
                </button>
              </div>

              {/* Bottom row: General Spec + Drawing 2D — 2 col on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr', gap: 8 }}>
                <button
                  type="button"
                  style={{
                    padding: isMobile ? '9px 4px' : '9px 0', borderRadius: 10,
                    background: T.btnBg, border: T.btnBorder,
                    color: T.btnColor, fontWeight: 600,
                    fontSize: isMobile ? 11 : 13, cursor: 'pointer',
                    transition: 'all 0.25s', whiteSpace: 'nowrap',
                  }}
                  onClick={() => {
                    const pub = (typeof process !== 'undefined' && process.env?.PUBLIC_URL) || '';
                    const a = document.createElement('a');
                    a.href = `${pub}/model/pdf/Hypoid/General%20specification.pdf`;
                    a.download = 'General specification.pdf';
                    document.body.appendChild(a); a.click(); document.body.removeChild(a);
                  }}
                >
                  📐 {isMobile ? 'General Spec' : 'General Specification'}
                </button>

                <button
                  type="button"
                  style={{
                    padding: isMobile ? '9px 4px' : '9px 0', borderRadius: 10,
                    background: T.btnBg, border: T.btnBorder,
                    color: T.btnColor, fontWeight: 600,
                    fontSize: isMobile ? 11 : 13, cursor: 'pointer',
                    transition: 'all 0.25s', whiteSpace: 'nowrap',
                  }}
                  onClick={() => {
                    const src = getDrawingPdfSrc(type, power);
                    if (!src) { alert('ยังไม่มีไฟล์ Drawing 2D สำหรับรุ่นนี้'); return; }
                    const a = document.createElement('a');
                    a.href = src;
                    a.download = `${modelCode}.pdf`;
                    document.body.appendChild(a); a.click(); document.body.removeChild(a);
                  }}
                >
                  📄 Drawing 2D (pdf)
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ── Quote Modal (same style as BLDC) ── */}
      {showQuote && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => { if (!sending) { setShowQuote(false); setShowSalePersonPicker(false); } }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-xl p-6 text-slate-900">

            {/* Header + Sale Person picker — เหมือน BLDC */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h3 className="text-xl font-bold">ขอใบเสนอราคา ZDF2 &amp; ZDF3 Series</h3>
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
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">ชื่อบริษัท :</label>
                <input
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">เบอร์ติดต่อ :</label>
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email :</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"
                />
              </div>
            </div>

            {/* Model info */}
            <div className="mt-4 text-sm text-slate-600">
              <div>Model: <b className="text-blue-700">{modelCode}</b></div>
              <div className="mt-1">จำนวน: <b>{quantity || 1}</b> ตัว</div>
            </div>

            <div className="mt-5 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => { setShowQuote(false); setShowSalePersonPicker(false); }}
                disabled={sending}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
              >
                ปิด
              </button>
              <button
                type="button"
                onClick={submitQuote}
                disabled={sending || !form.name || !form.email}
                className="px-5 py-2 rounded-2xl bg-green-300 hover:bg-green-400 font-semibold shadow active:scale-95 transition transform disabled:opacity-50"
              >
                {sending ? 'กำลังส่ง…' : 'รับใบเสนอราคา'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DirectionStep — Step 4 Grid only (BGH bar & lightbox ย้ายไปอยู่นอก)
// ─────────────────────────────────────────────────────────────────────────────
const DIRECTIONS = [
  { label: 'LB', img: LBImg,  sub: 'Standard' },
  { label: 'LF', img: LFImg,  sub: '' },
  { label: 'LL', img: LLImg,  sub: '' },
  { label: 'LR', img: LRImg,  sub: '' },
  { label: 'RB', img: RBImg,  sub: '' },
  { label: 'RF', img: HRFImg, sub: '' },
  { label: 'RL', img: RLImg,  sub: '' },
  { label: 'RR', img: RRImg,  sub: '' },
];
const BGH_IMGS = [
  { src: BGH1Img, alt: 'BGH1' },
  { src: BGH2Img, alt: 'BGH2' },
  { src: BGH3Img, alt: 'BGH3' },
];
const BGH_BAR_H = 72; // px

// Preload BGH images ทันทีที่ module โหลด (production เร็วขึ้นมาก)
if (typeof document !== 'undefined') {
  BGH_IMGS.forEach(({ src }) => {
    // ใช้ Image object ให้ browser cache ก่อนที่ component จะ render
    const img = new window.Image();
    img.src = src;
  });
  // Preload direction images ด้วย
  [...DIRECTIONS].forEach(({ img }) => {
    const el = new window.Image();
    el.src = img;
  });
}

function DirectionStep({ update, isMobile }) {
  return (
    <div style={{ paddingBottom: BGH_BAR_H + 16 }}>
      <h3 className="font-semibold text-white drop-shadow mb-1 text-base tracking-wide">
        Junction Box Direction
      </h3>
      <p className="text-white/40 text-xs mb-4">เลือกทิศทางกล่องสายไฟ</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
        gap: isMobile ? 10 : 14,
        maxWidth: 700,
      }}>
        {DIRECTIONS.map(({ label, img, sub }, i) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.26, ease: 'easeOut' } }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              const el = e.currentTarget;
              if (!el) return;
              el.classList.remove('is-active'); void el.offsetWidth; el.classList.add('is-active');
              setTimeout(() => update('direction', label), 460);
            }}
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14,
              overflow: 'hidden',
              cursor: 'pointer',
              padding: 0,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'box-shadow 0.2s, border-color 0.2s',
              display: 'flex', flexDirection: 'column',
              minWidth: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,229,160,0.5)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,229,160,0.14), inset 0 1px 0 rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)';
            }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.97)',
              padding: isMobile ? '8px 6px 4px' : '10px 8px 6px',
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={img} alt={label}
                loading="eager"
                fetchpriority="high"
                style={{ width:'100%', maxHeight: isMobile ? 80 : 110, objectFit:'contain', display:'block' }}
              />
            </div>
            <div style={{
              padding: isMobile ? '5px 4px 6px' : '7px 8px 8px',
              background: 'rgba(0,0,0,0.35)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'center',
            }}>
              <span style={{ display:'block', fontSize: isMobile ? 12 : 13, fontWeight:700, color:'#00e5a0', letterSpacing:'0.5px', lineHeight:1.2 }}>
                {label}
              </span>
              {sub && <span style={{ display:'block', fontSize:9, color:'rgba(255,255,255,0.35)', marginTop:1 }}>{sub}</span>}
            </div>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,229,160,0.04),transparent)', pointerEvents:'none' }} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BGHBar — fixed bottom bar, อยู่นอก AnimatePresence ไม่เคลื่อนไหวตาม step
// ─────────────────────────────────────────────────────────────────────────────
function BGHBar({ onOpenLightbox, isMobile }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: BGH_BAR_H,
      zIndex: 45,
      background: 'rgba(6,8,12,0.96)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: isMobile ? 6 : 10,
      padding: '0 16px',
      // ไม่มี motion / animation — bar คงที่ 100%
    }}>
      <span style={{ fontSize:9, color:'rgba(255,255,255,0.3)', flexShrink:0, marginRight:4, letterSpacing:'1.5px', textTransform:'uppercase' }}>
        Ref.
      </span>
      {BGH_IMGS.map(({ src, alt }) => (
        <button
          key={alt}
          type="button"
          onClick={() => onOpenLightbox({ src, alt })}
          title={`คลิกเพื่อดูรูป ${alt}`}
          style={{
            background: '#fff',
            borderRadius: 8,
            border: '1px solid rgba(200,200,200,0.4)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
            padding: isMobile ? '3px 5px' : '4px 8px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: isMobile ? 48 : 54,
            // ไม่ใช้ motion ใน bar — ป้องกัน bar กระตุก
          }}
        >
          <img
            src={src} alt={alt}
            loading="eager"
            fetchpriority="high"
            style={{ height: isMobile ? 40 : 46, maxWidth: isMobile ? 80 : 110, objectFit:'contain' }}
          />
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HypoidLightbox — Lightbox overlay แยก component
// ─────────────────────────────────────────────────────────────────────────────
function HypoidLightbox({ lightbox, onClose }) {
  return (
    <AnimatePresence>
      {lightbox && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.18 } }}
          exit={{ opacity: 0, transition: { duration: 0.14 } }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.84)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.2, ease: [0.22,1,0.36,1] } }}
            exit={{ scale: 0.92, opacity: 0, transition: { duration: 0.14 } }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: 18,
              padding: 12,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              maxWidth: '92vw', maxHeight: '85vh',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <img
              src={lightbox.src} alt={lightbox.alt}
              style={{ maxWidth:'80vw', maxHeight:'78vh', objectFit:'contain', display:'block', borderRadius:8 }}
            />
            <button
              type="button" onClick={onClose}
              style={{
                position:'absolute', top:-12, right:-12,
                width:32, height:32, borderRadius:'50%',
                background:'#ef4444', border:'2px solid #fff',
                color:'#fff', fontSize:14, fontWeight:700,
                cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 2px 8px rgba(0,0,0,0.4)', lineHeight:1, zIndex:10000,
              }}
            >✕</button>
            <div style={{
              position:'absolute', bottom:-28, left:0, right:0,
              textAlign:'center', fontSize:11, color:'rgba(255,255,255,0.6)',
            }}>
              {lightbox.alt} — แตะพื้นที่ว่างเพื่อปิด
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HypoidFlowController — React component ที่ wraps selection flow
// (แยกออกมาเพื่อให้ใช้ useState / useIsMobileHyp ได้)
// ─────────────────────────────────────────────────────────────────────────────
function HypoidFlowController({ hypoidState, hypoidSetters, onConfirm, onOpenRFQ }) {
  const [lightbox, setLightbox] = useState(null);
  const isMobile = useIsMobileHyp();
  const {
    type, gearType, ratio, direction, power, supply, optional,
    outputSpeed, outputTorqueNm, quantity,
  } = hypoidState;

  // mounting = 'C'|'CT'|'CF'|'CFT' (ZDF2 only, after supply step)
  const mounting  = hypoidState.mounting  || null;
  const setMounting = hypoidSetters.setMounting;

  const update = (key, value) => {
    const setterMap = {
      type: hypoidSetters.setType, gearType: hypoidSetters.setGearType,
      ratio: hypoidSetters.setRatio, direction: hypoidSetters.setDirection,
      power: hypoidSetters.setPower, supply: hypoidSetters.setSupply,
      optional: hypoidSetters.setOptional,
      mounting: setMounting,
    };
    if (setterMap[key]) setterMap[key](value);
  };

  const backOneStep = () => {
    // ZDF2: mounting → supply → power → (direction if A) → ratio → gearType → type
    if (type === 'ZDF2') {
      if (mounting)  return update('mounting', null);
      if (supply)    return update('supply', null);
      if (power)     return update('power', null);
      if (gearType === 'A' && direction) return update('direction', null);
      if (ratio)     return update('ratio', null);
      if (gearType)  return update('gearType', null);
      return update('type', null);
    }
    // ZDF3
    if (supply)    return update('supply', null);
    if (power)     return update('power', null);
    if (direction) return update('direction', null);
    if (ratio)     return update('ratio', null);
    if (gearType)  return update('gearType', null);
    if (type)      return update('type', null);
  };

  const modelCode = generateHypoidModelCode({ ...hypoidState, mounting });

  // ── ZDF2+H: ข้าม direction อัตโนมัติ ────────────────────────────────────
  // useEffect ต้องอยู่ก่อน conditional return ทุกตัว (Rules of Hooks)
  React.useEffect(() => {
    if (type === 'ZDF2' && gearType === 'H' && direction === null) {
      update('direction', ''); // '' = ไม่มี direction (ข้ามขั้นตอน)
    }

  }, [type, gearType, direction]);

  // ── Summary: ZDF2 ต้องมี mounting, ZDF3 ต้องมี supply ────────────────────
  const isComplete = type === 'ZDF2' ? !!mounting : !!supply;
  if (isComplete) {
    return (
      <HypoidSummaryPage
        state={{ ...hypoidState, mounting, setQuantity: hypoidSetters.setQuantity }}
        modelCode={modelCode}
        onConfirm={onConfirm}
        onBack={backOneStep}
      />
    );
  }

  // ── stepKey ─────────────────────────────────────────────────────────────
  const needDirection = type === 'ZDF3' || (type === 'ZDF2' && gearType === 'A');
  const dirDone = !needDirection || (direction !== null && direction !== undefined);

  const stepKey =
    !type      ? 'step1-type' :
    !gearType  ? 'step2-geartype' :
    !ratio     ? 'step3-ratio' :
    !dirDone   ? 'step4-direction' :
    !power     ? 'step5-power' :
    !supply    ? 'step6-supply' :
    type === 'ZDF2' && !mounting ? 'step7-mounting' : 'done';

  // mounting options by power
  const getMountingOptions = () => {
    const p = Number(power);
    if (type !== 'ZDF2') return [];
    if (p >= 15 && p <= 40) return [
      { label: 'C',  img: CImg  },
      { label: 'CT', img: CTImg },
    ];
    if (p >= 60 && p <= 90) return [
      { label: 'CF',  img: CFImg  },
      { label: 'CFT', img: CFTImg },
    ];
    return [];
  };

  return (
    <div className="relative min-h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepKey}
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-6"
        >

          {/* Step 1: Gear Motor Type */}
          {!type && (
            <div>
              <h3 className="font-semibold text-white drop-shadow mb-4">Gear Motor Type</h3>
              <div className="grid grid-cols-2 gap-6 max-w-xl">
                {[{ label:'ZDF2', img:F2Img }, { label:'ZDF3', img:F3Img }].map(({ label, img }) => (
                  <ThumbCard key={label} img={img} label={label} active={type===label} onClick={()=>update('type',label)} />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Gear Type */}
          {type && !gearType && (
            <div>
              <h3 className="font-semibold text-white drop-shadow mb-4">Gear Type</h3>
              <div className="grid grid-cols-2 gap-6 max-w-xl">
                {[
                  { label:'A', img: type==='ZDF3' ? F33AImg : F23AImg },
                  { label:'H', img: type==='ZDF3' ? F33HImg : F23HImg },
                ].map(({ label, img }) => (
                  <motion.button
                    key={label}
                    whileHover={{ y:-2, scale:1.02 }} whileTap={{ scale:0.99 }}
                    onClick={(e)=>{ const el=e.currentTarget; if(!el)return; el.classList.remove('is-active'); void el.offsetWidth; el.classList.add('is-active'); setTimeout(()=>update('gearType',label),550); }}
                    className="btn-sweep"
                  >
                    <img src={img} alt={label} className="btn-sweep-img w-full max-w-full object-contain my-2 scale-[1.18] md:scale-[1.25] transition-transform" style={{transformOrigin:'center center'}} />
                    <span className="btn-sweep-label">{label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Ratio */}
          {type && gearType && !ratio && (() => {
            const ratioList = type==='ZDF2'
              ? [10,15,20,25,30,40,50,60,80,100,120,160,200,240]
              : [5,10,15,20,25,30,40,50,60,80,100,120,160,200,240];
            const boundaryRatio = type==='ZDF3' ? 80 : null;
            return (
              <div>
                <h3 className="font-semibold text-white drop-shadow mb-2">Ratio</h3>
                {type==='ZDF3' && <p className="text-white/60 text-xs mb-3">⚠ Ratio 5–60 และ 80–240 มีขนาดเพลาต่างกัน</p>}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {ratioList.map((r) => {
                    const showDivider = boundaryRatio && r===boundaryRatio;
                    return (
                      <React.Fragment key={r}>
                        {showDivider && (
                          <div className="col-span-2 sm:col-span-3 md:col-span-4 flex items-center gap-2 my-1">
                            <div className="flex-1 border-t border-white/20" />
                            <span className="text-white/40 text-[10px] px-2">ขนาดเพลาเปลี่ยน</span>
                            <div className="flex-1 border-t border-white/20" />
                          </div>
                        )}
                        <motion.button key={r} onClick={()=>update('ratio',r)} whileHover={{y:-1,scale:1.06}} whileTap={{scale:0.98}}
                          className="group relative overflow-hidden rounded-2xl px-3 py-4 bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-200 text-emerald-900 font-extrabold text-xl tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/60 hover:ring-emerald-500/70 transition-all flex flex-col items-center gap-0.5"
                        >
                          <span className="relative z-10 text-lg font-extrabold">{r}</span>
                        </motion.button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Step 4: Junction Box Direction */}
          {/* ZDF3: แสดงปุ่มเดิม 8 ทิศ | ZDF2+A: แสดง L / R / T เท่านั้น | ZDF2+H: ข้าม */}
          {stepKey === 'step4-direction' && (
            type === 'ZDF2' && gearType === 'A' ? (
              /* ZDF2+A: 3 ปุ่ม L / R / T */
              <div>
                <h3 className="font-semibold text-white drop-shadow mb-1 text-base tracking-wide">Junction Box Direction</h3>
                <p className="text-white/40 text-xs mb-4">เลือกทิศทางกล่องสายไฟ (ZDF2)</p>
                <div style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap:14, maxWidth:480 }}>
                  {[{ label:'L', img:LImg }, { label:'R', img:RImg }, { label:'T', img:TImg }].map(({ label, img }, i) => (
                    <motion.button
                      key={label}
                      initial={{ opacity:0, y:16 }}
                      animate={{ opacity:1, y:0, transition:{ delay:i*0.06, duration:0.26 } }}
                      whileHover={{ y:-3, scale:1.04 }} whileTap={{ scale:0.96 }}
                      onClick={()=>update('direction', label)}
                      style={{
                        position:'relative', background:'rgba(255,255,255,0.06)',
                        border:'1px solid rgba(255,255,255,0.12)', borderRadius:14,
                        overflow:'hidden', cursor:'pointer', padding:0,
                        display:'flex', flexDirection:'column',
                        backdropFilter:'blur(8px)',
                        boxShadow:'0 4px 20px rgba(0,0,0,0.25)',
                        transition:'box-shadow 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(0,229,160,0.5)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; }}
                    >
                      <div style={{ background:'rgba(255,255,255,0.97)', padding:'12px 10px 8px', flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <img src={img} alt={label} loading="eager" fetchpriority="high"
                          style={{ width:'100%', maxHeight:120, objectFit:'contain', display:'block' }} />
                      </div>
                      <div style={{ padding:'8px', background:'rgba(0,0,0,0.35)', borderTop:'1px solid rgba(255,255,255,0.06)', textAlign:'center' }}>
                        <span style={{ display:'block', fontSize:14, fontWeight:700, color:'#00e5a0', letterSpacing:'0.5px' }}>{label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              /* ZDF3: ปุ่มเดิม 8 ทิศ */
              <DirectionStep update={update} isMobile={isMobile} />
            )
          )}

          {/* Step 5: Motor Power */}
          {stepKey === 'step5-power' && (
            <div>
              <h3 className="font-semibold text-white drop-shadow mb-4">Motor Power</h3>
              <div className="grid grid-cols-3 gap-3">
                {(type==='ZDF2'?[15,25,40,60,90]:[100,200,400,750,1500,2200]).map(p=>(
                  <motion.button key={p} whileHover={{y:-4,scale:1.03}} whileTap={{scale:0.97}}
                    onClick={(e)=>{ const el=e.currentTarget; if(!el)return; el.classList.remove('spark','is-active'); void el.offsetWidth; el.classList.add('spark','is-active'); setTimeout(()=>{ el.classList.remove('spark','is-active'); update('power',p); },600); }}
                    className="btn-3d-dark"
                  >
                    <span className="btn-3d-label">{p}W</span>
                    <span className="spark-burst" aria-hidden="true"></span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Power Supply */}
          {stepKey === 'step6-supply' && (
            <div>
              <h3 className="font-semibold text-white drop-shadow mb-4">Power Supply</h3>
              <div className="flex flex-wrap gap-3">
                {(type==='ZDF2'?['C','A','S','S3','S4']:['S']).map(s=>(
                  <motion.button key={s} whileHover={{y:-4,scale:1.03}} whileTap={{scale:0.97}}
                    onClick={(e)=>{ const el=e.currentTarget; if(!el)return; el.classList.remove('is-active'); void el.offsetWidth; el.classList.add('is-active'); setTimeout(()=>{ el.classList.remove('is-active'); update('supply',s); },550); }}
                    className="btn-3d-green"
                  >
                    <span className="btn-3d-label">{s}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Mounting Type (ZDF2 only) */}
          {stepKey === 'step7-mounting' && (() => {
            const opts = getMountingOptions();
            return (
              <div>
                <h3 className="font-semibold text-white drop-shadow mb-1 text-base tracking-wide">Mounting Type</h3>
                <p className="text-white/40 text-xs mb-4">
                  {Number(power) <= 40 ? '15W–40W: เลือกแบบติดตั้ง' : '60W–90W: เลือกแบบติดตั้ง'}
                </p>
                <div style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : `repeat(${opts.length},1fr)`, gap:14, maxWidth: opts.length === 2 ? 400 : 600 }}>
                  {opts.map(({ label, img }, i) => (
                    <motion.button
                      key={label}
                      initial={{ opacity:0, y:16 }}
                      animate={{ opacity:1, y:0, transition:{ delay:i*0.07, duration:0.26 } }}
                      whileHover={{ y:-3, scale:1.04 }} whileTap={{ scale:0.96 }}
                      onClick={()=>update('mounting', label)}
                      style={{
                        position:'relative', background:'rgba(255,255,255,0.06)',
                        border:'1px solid rgba(255,255,255,0.12)', borderRadius:14,
                        overflow:'hidden', cursor:'pointer', padding:0,
                        display:'flex', flexDirection:'column',
                        backdropFilter:'blur(8px)',
                        boxShadow:'0 4px 20px rgba(0,0,0,0.25)',
                        transition:'box-shadow 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(0,229,160,0.5)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; }}
                    >
                      <div style={{ background:'rgba(255,255,255,0.97)', padding:'16px 12px 10px', flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <img src={img} alt={label} loading="eager" fetchpriority="high"
                          style={{ width:'100%', maxHeight:150, objectFit:'contain', display:'block' }} />
                      </div>
                      <div style={{ padding:'10px', background:'rgba(0,0,0,0.35)', borderTop:'1px solid rgba(255,255,255,0.06)', textAlign:'center' }}>
                        <span style={{ display:'block', fontSize:14, fontWeight:700, color:'#00e5a0', letterSpacing:'0.5px' }}>{label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })()}

        </motion.div>
      </AnimatePresence>

      {/* ── BGH bar — แสดงเฉพาะ step4 ZDF3 หรือ ZDF2+A ── */}
      {stepKey === 'step4-direction' && type === 'ZDF3' && (
        <BGHBar onOpenLightbox={setLightbox} isMobile={isMobile} />
      )}

      {/* ── Lightbox ── */}
      <HypoidLightbox lightbox={lightbox} onClose={() => setLightbox(null)} />

      {/* ── ปุ่มย้อนกลับ ── */}
      <AnimatePresence>
        {stepKey !== 'step1-type' && (
          <motion.button
            key="back-btn"
            initial={{ opacity:0, y:8 }}
            animate={{ opacity:1, y:0, transition:{ duration:0.2, delay:0.15 } }}
            exit={{ opacity:0, y:8, transition:{ duration:0.15 } }}
            onClick={backOneStep}
            style={{
              bottom: (stepKey==='step4-direction' && type==='ZDF3') ? BGH_BAR_H+12 : 16,
              transition: 'bottom 0.25s ease',
            }}
            className="fixed left-4 z-50 px-3 py-1 text-xs md:text-sm rounded-full bg-white/15 text-gray-800/90 border border-white/30 backdrop-blur-sm shadow-sm opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
          >
            ย้อนกลับ
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// renderHypoidGearFlow — thin wrapper ที่ return HypoidFlowController
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
export function renderHypoidGearFlow(hypoidState, hypoidSetters, onConfirm, onOpenRFQ) {
  return (
    <HypoidFlowController
      hypoidState={hypoidState}
      hypoidSetters={hypoidSetters}
      onConfirm={onConfirm}
      onOpenRFQ={onOpenRFQ}
    />
  );
}
