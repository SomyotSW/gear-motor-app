// DCGearMotorFlow.js  v2.0
// ─────────────────────────────────────────────────────────────────────────────
// Fixes: 1) Gear head 1:1 square cards  2) Full lighting+color panel always visible
//        3) Rich multi-color design (not just green)  4) Full mobile responsive
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

import DesImg     from '../assets/dc/Des.png';
import DesGearImg from '../assets/dc/DesGear.png';
import KImg   from '../assets/dc/K.png';
import KKImg  from '../assets/dc/KK.png';
import KBImg  from '../assets/dc/KB.png';
import RCImg  from '../assets/dc/RC.png';
import RTImg  from '../assets/dc/RT.png';

// ── model-viewer script ──────────────────────────────────────────────────────
(() => {
  if (typeof document === 'undefined') return;
  const id = 'mv-dc-script';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id; s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
  document.head.appendChild(s);
})();

// ── GLB base ─────────────────────────────────────────────────────────────────
const GLB_BASE = (() => {
  if (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    return '/model/glb';
  return 'https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev';
})();

// ── Sale persons ──────────────────────────────────────────────────────────────
const SALE_PERSONS = [
  { abbr:'CA',  name:'Mr. Chottanin A. (CA)',  position:'TRANSMISSION PRODUCT MANAGER', phone:'081-921-6225' },
  { abbr:'AP',  name:'Ms.Apichaya P. (AP)',    position:'Sale Supervisor',               phone:'098-3697494' },
  { abbr:'MY',  name:'Ms.Matavee Y. (MY)',     position:'Sale Supervisor',               phone:'092-2715371' },
  { abbr:'TWS', name:'Ms.Thitikan W. (TWS)',   position:'Sale Exclusive',                phone:'080-4632394' },
  { abbr:'WS',  name:'Ms.Warissara S.(WS)',    position:'Sale Exclusive',                phone:'065-5051798' },
  { abbr:'SI',  name:'Ms.Suphak I.(SI)',        position:'Sale Exclusive',               phone:'096-0787776' },
  { abbr:'NM',  name:'Mr.Naphaphat M.(NM)',    position:'Sale Exclusive',                phone:'065-7176332' },
  { abbr:'SK',  name:'Mr.Sanya K.(SK)',         position:'Sale Supervisor',              phone:'086-9819616' },
  { abbr:'PL',  name:'Mr.Pongsakorn L.(PL)',    position:'Sale Engineer',                phone:'063-2159056' },
];
const EMAILJS_SERVICE_ID  = 'service_fwgn6cw';
const EMAILJS_TEMPLATE_ID = 'template_7eppr2x';
const EMAILJS_PUBLIC_KEY  = 'BvIT5-X7LnkaS3LKq';

// ── Motor data ────────────────────────────────────────────────────────────────
const MOTOR_DATA = [
  { power:10,  frameSize:'60mm',  motorPrefix:'S2D10',   gearPrefix:'2GN', gearSuffix:'GN' },
  { power:15,  frameSize:'60mm',  motorPrefix:'S2D15',   gearPrefix:'2GN', gearSuffix:'GN' },
  { power:25,  frameSize:'70mm',  motorPrefix:'S3D25',   gearPrefix:'3GN', gearSuffix:'GN' },
  { power:25,  frameSize:'80mm',  motorPrefix:'S4D25',   gearPrefix:'4GN', gearSuffix:'GN' },
  { power:40,  frameSize:'80mm',  motorPrefix:'S4D40',   gearPrefix:'4GN', gearSuffix:'GN' },
  { power:40,  frameSize:'90mm',  motorPrefix:'S5D40',   gearPrefix:'5GU', gearSuffix:'GU' },
  { power:60,  frameSize:'90mm',  motorPrefix:'S5D60',   gearPrefix:'5GU', gearSuffix:'GU' },
  { power:90,  frameSize:'90mm',  motorPrefix:'S5D90',   gearPrefix:'5GU', gearSuffix:'GU' },
  { power:120, frameSize:'90mm',  motorPrefix:'S5D120',  gearPrefix:'5GU', gearSuffix:'GU' },
  { power:250, frameSize:'90mm',  motorPrefix:'S55D250', gearPrefix:'5GU', gearSuffix:'GU' },
  { power:250, frameSize:'104mm', motorPrefix:'S6D250',  gearPrefix:'6GU', gearSuffix:'GU' },
];

const VOLTAGE_OPTIONS = ['12','24','48','90'];
const getVoltageSuffix = (v, gs) => `${v}${gs}`;
const RATE_SPEED_CODE  = '30S';
const RATE_SPEED_RPM   = '3000 rpm';
const RATIO_LIST       = [3,3.6,5,6,7.5,9,10,12.5,15,18,20,25,30,36,40,50,60,75,90,100,120,150,180,200];

function getAllowedGearHeads(m) {
  if (!m) return [];
  if (m.gearPrefix === '2GN') return ['KK'];
  if (m.gearPrefix === '3GN') return ['KK'];
  if (m.gearPrefix === '4GN') return ['KK','RC','RT'];
  if (m.gearPrefix === '5GU') return ['K','KB','RC','RT'];
  if (m.gearPrefix === '6GU') return ['KB'];
  return ['K'];
}
function getGearHeadCode(m, k) {
  if (!m || !k) return '';
  if (m.gearSuffix === 'GN') return 'K';
  if (m.gearPrefix === '6GU') return 'K';
  return k;
}

export function generateDCModelCode(state) {
  const { dcMotor, dcVoltage, dcRatio, dcGearHead } = state;
  if (!dcMotor || !dcVoltage || !dcRatio || !dcGearHead) return null;
  const e = MOTOR_DATA.find(m => m.motorPrefix === dcMotor);
  if (!e) return null;
  const vs = getVoltageSuffix(dcVoltage, e.gearSuffix);
  const gc = getGearHeadCode(e, dcGearHead);
  const rs = String(dcRatio).replace(/\.0$/,'');
  return `${e.motorPrefix}-${vs}-${RATE_SPEED_CODE}-${e.gearPrefix}${rs}${gc}`;
}

export function mapDCGlbFilename(modelCode) {
  if (!modelCode) return null;
  const parts = modelCode.split('-');
  if (parts.length < 4) return null;
  const [motorPfx,,,gearPart] = parts;
  const m = gearPart.match(/^(\d+G[NU])([\d.]+)([A-Z]+)$/);
  if (!m) return null;
  return `${motorPfx}XX${m[1]}XX${m[3]}`;
}

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useIsMobile(bp=768) {
  const [v,setV] = React.useState(()=>typeof window!=='undefined'&&window.innerWidth<bp);
  React.useEffect(()=>{
    const fn=()=>setV(window.innerWidth<bp);
    window.addEventListener('resize',fn);
    return()=>window.removeEventListener('resize',fn);
  },[bp]);
  return v;
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const D = {
  bg0:'#0d0f14', bg1:'#13161d', bg2:'#1a1e28', bg3:'#222638',
  border0:'rgba(255,255,255,0.06)', border1:'rgba(255,255,255,0.10)', border2:'rgba(255,255,255,0.16)',
  mint:'#00e58c', mintDim:'rgba(0,229,140,0.13)', mintGlow:'0 0 20px rgba(0,229,140,0.28)',
  indigo:'#7c8fff', indigoDim:'rgba(124,143,255,0.14)',
  amber:'#f5a623',  amberDim:'rgba(245,166,35,0.14)',
  rose:'#ff5e7e',
  txt0:'#eef2ff', txt1:'#7a88a8', txt2:'#404860',
  topBar:'rgba(13,15,20,0.94)',
};
const L = {
  bg0:'#f3f5fb', bg1:'#ffffff', bg2:'#edf0f8', bg3:'#e0e4f0',
  border0:'rgba(0,0,0,0.06)', border1:'rgba(0,0,0,0.10)', border2:'rgba(0,0,0,0.18)',
  mint:'#00965a', mintDim:'rgba(0,150,90,0.09)', mintGlow:'0 0 16px rgba(0,150,90,0.18)',
  indigo:'#4a5de8', indigoDim:'rgba(74,93,232,0.09)',
  amber:'#c07a00',  amberDim:'rgba(192,122,0,0.10)',
  rose:'#e0334d',
  txt0:'#0f1420', txt1:'#5a6888', txt2:'#9aa4c0',
  topBar:'rgba(243,245,251,0.96)',
};

// ── 3D Environment presets ────────────────────────────────────────────────────
const ENV_PRESETS = [
  { label:'Neutral', value:'neutral',   bg:'linear-gradient(135deg,#2e3340,#1a1e26)' },
  { label:'Legacy',  value:'legacy',    bg:'linear-gradient(135deg,#3a4455,#252e3a)' },
  { label:'Warm',    value:'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr', bg:'linear-gradient(135deg,#c87a4a,#8a4a2a)' },
  { label:'Studio',  value:'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr', bg:'linear-gradient(135deg,#6070a0,#3a4060)' },
  { label:'Outdoor', value:'https://modelviewer.dev/shared-assets/environments/pillars_1k.hdr', bg:'linear-gradient(135deg,#3a8a5a,#1a5a3a)' },
  { label:'Moon',    value:'https://modelviewer.dev/shared-assets/environments/moon_1k.hdr', bg:'linear-gradient(135deg,#1a2050,#0a1030)' },
];

// ── Model tint colors ─────────────────────────────────────────────────────────
const TINT_COLORS = [
  { label:'Default', value:null,      bg:'linear-gradient(135deg,#888,#444)' },
  { label:'Silver',  value:'#ccd4e0', bg:'linear-gradient(135deg,#d0d8e8,#8898b0)' },
  { label:'Gold',    value:'#ffd060', bg:'linear-gradient(135deg,#ffd060,#b07820)' },
  { label:'Indigo',  value:'#7c8fff', bg:'linear-gradient(135deg,#7c8fff,#3040c0)' },
  { label:'Rose',    value:'#ff5e7e', bg:'linear-gradient(135deg,#ff8090,#cc2040)' },
  { label:'White',   value:'#f4f4f8', bg:'linear-gradient(135deg,#ffffff,#cccccc)' },
  { label:'Slate',   value:'#445566', bg:'linear-gradient(135deg,#6688aa,#334455)' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function blobToBase64(blob){
  return new Promise(r=>{const fr=new FileReader();fr.onloadend=()=>r(String(fr.result).split(',')[1]);fr.readAsDataURL(blob);});
}

// ═════════════════════════════════════════════════════════════════════════════
// DCViewer3D — always shows lighting + color controls
// ═════════════════════════════════════════════════════════════════════════════
function DCViewer3D({ modelCode, dark }) {
  const mvRef    = useRef(null);
  const isMobile = useIsMobile();
  const [ready,   setReady]   = useState(false);
  const [err,     setErr]     = useState(false);
  const [envIdx,  setEnvIdx]  = useState(0);
  const [tintIdx, setTintIdx] = useState(0);
  const [exposure,setExposure]= useState(1.3);
  const [shadow,  setShadow]  = useState(0.6);
  const [lightRot,setLightRot]= useState(0);
  const [autoRot, setAutoRot] = useState(false);
  const autoTimer = useRef(null);
  const glbName   = mapDCGlbFilename(modelCode);
  const T = dark ? D : L;

  useEffect(()=>{
    setReady(false); setErr(false);
    if (!glbName || !mvRef.current) return;
    const mv = mvRef.current;
    mv.setAttribute('src',`${GLB_BASE}/${glbName}.glb`);
    const onL=()=>setReady(true), onE=()=>setErr(true);
    mv.addEventListener('load',onL); mv.addEventListener('error',onE);
    return()=>{mv.removeEventListener('load',onL); mv.removeEventListener('error',onE);};
  },[glbName]);

  useEffect(()=>{
    if(autoRot){
      autoTimer.current = setInterval(()=>{
        setLightRot(r=>{const nr=(r+2)%360;if(mvRef.current)mvRef.current.style.setProperty('--env-rotation',nr+'deg');return nr;});
      },30);
    } else clearInterval(autoTimer.current);
    return()=>clearInterval(autoTimer.current);
  },[autoRot]);

  useEffect(()=>{
    const mv=mvRef.current; if(!mv) return;
    const c=TINT_COLORS[tintIdx].value;
    if(!c){try{mv.model?.materials?.forEach(mat=>{mat.pbrMetallicRoughness.setBaseColorFactor([1,1,1,1]);});}catch(e){} return;}
    const hex=c.replace('#','');
    const r=parseInt(hex.slice(0,2),16)/255, g=parseInt(hex.slice(2,4),16)/255, b=parseInt(hex.slice(4,6),16)/255;
    try{mv.model?.materials?.forEach(mat=>{mat.pbrMetallicRoughness.setBaseColorFactor([r,g,b,1]);});}catch(e){}
  },[tintIdx]);

  const setEnvPreset = (i)=>{
    setEnvIdx(i);
    if(mvRef.current)try{mvRef.current.setAttribute('environment-image',ENV_PRESETS[i].value);}catch(e){}
  };

  // ── ตำแหน่งเดียวกับ BLDC: flex-row, viewer ซ้าย, panel ขวา width:200 แสดงเฉพาะ !isMobile ──
  return (
    <div style={{display:'flex',flexDirection:isMobile?'column':'row',width:'100%',height:'100%',minHeight:0,background:T.bg0}}>
      <style>{`@keyframes dc3d-spin{to{transform:rotate(360deg)}}`}</style>

      {/* viewer */}
      <div style={{flex:isMobile?'none':1,height:isMobile?'300px':undefined,minHeight:isMobile?300:0,maxHeight:isMobile?400:undefined,position:'relative',overflow:'hidden'}}>
        {!ready&&!err&&(
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,pointerEvents:'none',background:T.bg0}}>
            <div style={{width:44,height:44,borderRadius:'50%',border:`2px solid ${T.mint}18`,borderTopColor:T.mint,animation:'dc3d-spin 0.9s linear infinite'}}/>
            <span style={{fontSize:11,color:T.txt1,letterSpacing:'1px'}}>กำลังโหลดโมเดล…</span>
          </div>
        )}
        {err&&(
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,pointerEvents:'none',background:T.bg0}}>
            <span style={{fontSize:48}}>📦</span>
            <span style={{fontSize:12,color:T.txt1}}>ยังไม่มีไฟล์ 3D</span>
            <span style={{fontSize:9,color:T.txt2,fontFamily:'monospace',textAlign:'center',padding:'0 8px',wordBreak:'break-all'}}>
              {glbName?`${GLB_BASE}/${glbName}.glb`:'—'}
            </span>
          </div>
        )}
        <model-viewer ref={mvRef} src="" alt={glbName||'dc-motor'}
          auto-rotate auto-rotate-delay="400" rotation-per-second="18deg"
          camera-controls touch-action="pan-y"
          shadow-intensity="1.2" shadow-softness={shadow}
          environment-image={ENV_PRESETS[envIdx].value}
          exposure={exposure}
          style={{width:'100%',height:isMobile?'300px':'100%',background:'transparent',display:'block'}}/>
        {ready&&!err&&(
          <div style={{position:'absolute',bottom:10,left:0,right:0,textAlign:'center',color:'rgba(255,255,255,0.2)',fontSize:10,pointerEvents:'none'}}>
            🖱 ลาก = หมุน &nbsp;·&nbsp; Scroll = ซูม
          </div>
        )}
      </div>

      {/* ── Right panel — เหมือน BLDC: !isMobile เท่านั้น, width:200 ── */}
      {!isMobile && (
        <div style={{
          width:200, flexShrink:0,
          background:T.bg1,
          borderLeft:`1px solid ${T.border0}`,
          overflowY:'auto',
          display:'flex', flexDirection:'column',
        }}>
          {/* สภาพแวดล้อมแสง */}
          <div style={P.sec}>
            <div style={P.secT(T)}>สภาพแวดล้อมแสง</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5}}>
              {ENV_PRESETS.map((e,i)=>(
                <button key={e.value} title={e.label} onClick={()=>setEnvPreset(i)}
                  style={{...P.envBtn(i===envIdx,T),background:e.bg}}>
                  <span style={P.envLbl}>{e.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ควบคุมแสง */}
          <div style={P.sec}>
            <div style={P.secT(T)}>ควบคุมแสง</div>
            <div style={P.lrow}>
              <span style={P.llbl(T)}>ความสว่าง</span>
              <input type="range" min={0.5} max={3} step={0.05} value={exposure} style={P.slider(T)}
                onChange={e=>{const v=parseFloat(e.target.value);setExposure(v);if(mvRef.current)mvRef.current.setAttribute('exposure',v);}}/>
              <span style={P.slVal(T)}>{exposure.toFixed(1)}</span>
            </div>
            <div style={P.lrow}>
              <span style={P.llbl(T)}>เงา</span>
              <input type="range" min={0} max={1} step={0.05} value={shadow} style={P.slider(T)}
                onChange={e=>{const v=parseFloat(e.target.value);setShadow(v);if(mvRef.current)mvRef.current.setAttribute('shadow-softness',v);}}/>
              <span style={P.slVal(T)}>{shadow.toFixed(1)}</span>
            </div>
            <div style={{...P.lrow,marginBottom:0}}>
              <span style={P.llbl(T)}>ทิศแสง</span>
              {autoRot
                ? <span style={{flex:1,fontSize:10,color:T.mint}}>⟳ หมุนอัตโนมัติ</span>
                : <input type="range" min={0} max={360} step={1} value={lightRot} style={P.slider(T)}
                    onChange={e=>{const v=parseInt(e.target.value);setLightRot(v);if(mvRef.current)mvRef.current.style.setProperty('--env-rotation',v+'deg');}}/>
              }
              <span style={P.slVal(T)}>{lightRot}°</span>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
              <span style={{fontSize:10,color:T.txt1}}>☀️ หมุนแสงอัตโนมัติ</span>
              <button onClick={()=>setAutoRot(v=>!v)}
                style={{width:34,height:18,background:autoRot?T.mint:'rgba(255,255,255,0.10)',borderRadius:9,position:'relative',cursor:'pointer',border:'none',transition:'background 0.2s',flexShrink:0}}>
                <div style={{position:'absolute',top:2,left:autoRot?16:2,width:14,height:14,borderRadius:'50%',background:'white',transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.4)'}}/>
              </button>
            </div>
          </div>

          {/* สีโมเดล */}
          <div style={P.sec}>
            <div style={P.secT(T)}>สีโมเดล</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {TINT_COLORS.map((c,i)=>(
                <button key={c.label} title={c.label} onClick={()=>setTintIdx(i)}
                  style={{width:24,height:24,borderRadius:'50%',background:c.bg,
                    border:i===tintIdx?`2px solid ${T.mint}`:'2px solid transparent',
                    cursor:'pointer',position:'relative',flexShrink:0,
                    transform:i===tintIdx?'scale(1.1)':'scale(1)',transition:'all 0.15s'}}>
                  {i===tintIdx&&<span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'white',textShadow:'0 1px 3px rgba(0,0,0,0.8)'}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Panel styles — ตรงกับ BLDC ทุก pixel
const P = {
  sec:   { padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' },
  secT:  (T) => ({ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:T.txt2, marginBottom:10 }),
  envBtn:(a,T) => ({ aspectRatio:1, borderRadius:6, border:a?`2px solid ${T.mint}`:'2px solid transparent', cursor:'pointer', position:'relative', overflow:'hidden', transition:'all 0.15s' }),
  envLbl:{ position:'absolute', bottom:0, left:0, right:0, fontSize:7, textAlign:'center', background:'rgba(0,0,0,0.65)', padding:'1px 0', color:'rgba(255,255,255,0.7)', fontWeight:600 },
  lrow:  { display:'flex', alignItems:'center', gap:8, marginBottom:8 },
  llbl:  (T) => ({ fontSize:10, color:T.txt1, width:44, flexShrink:0 }),
  slider:(T) => ({ flex:1, accentColor:T.mint, cursor:'pointer', height:3 }),
  slVal: (T) => ({ fontSize:10, color:T.txt0, width:30, textAlign:'right', flexShrink:0, fontFamily:'monospace' }),
};

// ═════════════════════════════════════════════════════════════════════════════
// CAROUSEL_SLIDES — ข้อมูลภาพ Step 1
// ═════════════════════════════════════════════════════════════════════════════
const CAROUSEL_SLIDES = [
  { src: DesImg,     title: 'DC Motor',   subtitle: 'Motor Structure Overview' },
  { src: DesGearImg, title: 'Gear Head',  subtitle: 'Gear Head Structure Overview' },
];

// ═════════════════════════════════════════════════════════════════════════════
// ImageCarousel — swipe left/right + click to zoom, X to close
// ═════════════════════════════════════════════════════════════════════════════
function ImageCarousel({ dark, T }) {
  const [idx,     setIdx]     = useState(0);
  const [zoomIdx, setZoomIdx] = useState(null); // null = ปิด zoom
  const [dir,     setDir]     = useState(0);    // -1 ซ้าย, +1 ขวา (สำหรับ animation)
  const dragStart = useRef(null);
  const isDragging= useRef(false);
  const total     = CAROUSEL_SLIDES.length;

  const goTo = (next, direction) => {
    setDir(direction);
    setIdx((next + total) % total);
  };

  // ── mouse / touch drag ────────────────────────────────────────────────────
  const onPointerDown = (e) => {
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX;
    isDragging.current = false;
  };
  const onPointerMove = (e) => {
    if (dragStart.current === null) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX;
    if (Math.abs(cx - dragStart.current) > 6) isDragging.current = true;
  };
  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const cx  = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStart.current;
    const dx  = cx - dragStart.current;
    dragStart.current = null;
    if (!isDragging.current) return; // click → handled by onClick
    if (dx < -40)      goTo(idx + 1, +1);  // swipe left → next
    else if (dx > 40)  goTo(idx - 1, -1);  // swipe right → prev
    isDragging.current = false;
  };

  const handleClick = () => {
    if (!isDragging.current) setZoomIdx(idx);
  };

  const slide = CAROUSEL_SLIDES[idx];

  // slide variants
  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0   }),
    center:       ({ x: 0,              opacity: 1   }),
    exit:  (d) => ({ x: d > 0 ? '-60%' : '60%',   opacity: 0   }),
  };

  return (
    <>
      {/* ── Carousel ── */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>

        {/* slide wrapper */}
        <div
          style={{
            position:'relative', width:'100%', maxWidth:520,
            borderRadius:14, overflow:'hidden',
            border:`1px solid ${T.border1}`,
            boxShadow:'0 8px 32px rgba(0,0,0,0.28)',
            cursor: isDragging.current ? 'grabbing' : 'zoom-in',
            userSelect:'none', touchAction:'pan-y',
          }}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          onClick={handleClick}
        >
          {/* ── animated slide ── */}
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={idx}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type:'spring', stiffness:320, damping:32, mass:0.9 }}
              style={{ position:'relative' }}
            >
              {/* title bar */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, zIndex:2,
                background:'linear-gradient(180deg,rgba(0,0,0,0.62) 0%,rgba(0,0,0,0) 100%)',
                padding:'10px 14px 18px',
                display:'flex', alignItems:'flex-start', gap:8,
              }}>
                {/* dot indicator inline */}
                <div style={{ display:'flex', gap:5, marginTop:3 }}>
                  {CAROUSEL_SLIDES.map((_,i)=>(
                    <div key={i} style={{
                      width: i===idx ? 16 : 6, height:6, borderRadius:3,
                      background: i===idx ? T.mint : 'rgba(255,255,255,0.40)',
                      transition:'all 0.3s ease',
                    }}/>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:'#ffffff', letterSpacing:'0.3px', lineHeight:1.2 }}>
                    {slide.title}
                  </div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.65)', marginTop:1 }}>
                    {slide.subtitle}
                  </div>
                </div>
              </div>

              {/* image */}
              <img
                src={slide.src}
                alt={slide.title}
                draggable={false}
                style={{
                  width:'100%', display:'block', objectFit:'contain',
                  background: dark ? '#0d0f14' : '#f3f5fb',
                  pointerEvents:'none',
                }}
              />

              {/* bottom hint */}
              <div style={{
                position:'absolute', bottom:8, right:8,
                background:'rgba(0,0,0,0.55)', backdropFilter:'blur(4px)',
                borderRadius:6, padding:'3px 8px',
                fontSize:10, color:'rgba(255,255,255,0.85)', fontWeight:600, zIndex:2,
              }}>
                🔍 คลิกเพื่อขยาย
              </div>
            </motion.div>
          </AnimatePresence>

          {/* swipe arrow hints — faint */}
          <div style={{ position:'absolute', top:'50%', left:8, transform:'translateY(-50%)', zIndex:3, pointerEvents:'none', fontSize:20, color:'rgba(255,255,255,0.25)' }}>‹</div>
          <div style={{ position:'absolute', top:'50%', right:8, transform:'translateY(-50%)', zIndex:3, pointerEvents:'none', fontSize:20, color:'rgba(255,255,255,0.25)' }}>›</div>
        </div>

        {/* swipe hint text */}
        <div style={{ fontSize:10, color:T.txt2, letterSpacing:'0.3px' }}>
          ← ลากซ้าย / ขวา เพื่อดูภาพถัดไป →
        </div>
      </div>

      {/* ── Zoom Overlay ── */}
      <AnimatePresence>
        {zoomIdx !== null && (
          <motion.div
            key="zoom-bg"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.22 }}
            onClick={()=>setZoomIdx(null)}
            style={{
              position:'fixed', inset:0, zIndex:2000,
              background:'rgba(0,0,0,0.92)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}
          >
            <motion.div
              key="zoom-img"
              initial={{ scale:0.72, opacity:0, y:24 }}
              animate={{ scale:1,    opacity:1, y:0  }}
              exit={{    scale:0.72, opacity:0, y:16 }}
              transition={{ type:'spring', stiffness:360, damping:28 }}
              onClick={e=>e.stopPropagation()}
              style={{ position:'relative', maxWidth:'92vw', maxHeight:'90vh' }}
            >
              {/* title in zoom */}
              <div style={{
                position:'absolute', top:-32, left:0, right:0, textAlign:'center',
                fontSize:13, fontWeight:800, color:'#fff', letterSpacing:'0.5px',
              }}>
                {CAROUSEL_SLIDES[zoomIdx].title}
              </div>

              <img
                src={CAROUSEL_SLIDES[zoomIdx].src}
                alt={CAROUSEL_SLIDES[zoomIdx].title}
                style={{
                  maxWidth:'92vw', maxHeight:'80vh', borderRadius:14,
                  objectFit:'contain',
                  boxShadow:'0 24px 80px rgba(0,0,0,0.70)',
                  border:'1.5px solid rgba(255,255,255,0.15)',
                  display:'block',
                }}
              />

              {/* X button */}
              <button
                onClick={()=>setZoomIdx(null)}
                style={{
                  position:'absolute', top:-14, right:-14,
                  width:34, height:34, borderRadius:'50%',
                  background:'linear-gradient(135deg,#00e58c,#00c070)',
                  border:'none', cursor:'pointer',
                  fontSize:18, fontWeight:700, color:'#050d08',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow:'0 4px 16px rgba(0,229,140,0.50)',
                }}
              >×</button>

              {/* swipe in zoom too */}
              <div style={{ display:'flex', justifyContent:'center', gap:14, marginTop:14 }}>
                {CAROUSEL_SLIDES.map((_,i)=>(
                  <button
                    key={i}
                    onClick={(e)=>{ e.stopPropagation(); setZoomIdx(i); }}
                    style={{
                      width: i===zoomIdx ? 20 : 8, height:8, borderRadius:4,
                      background: i===zoomIdx ? '#00e58c' : 'rgba(255,255,255,0.35)',
                      border:'none', cursor:'pointer', padding:0,
                      transition:'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── old ImageZoom kept for backward compat (not used in Step1 anymore) ────────
function ImageZoom({ src, onClose }) {
  return (
    <AnimatePresence>
      <motion.div key="iz" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        onClick={onClose}
        style={{position:'fixed',inset:0,zIndex:2000,background:'rgba(0,0,0,0.90)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <motion.div initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.7,opacity:0}}
          transition={{type:'spring',stiffness:380,damping:26}}
          onClick={e=>e.stopPropagation()}
          style={{position:'relative',maxWidth:'90vw',maxHeight:'88vh'}}>
          <img src={src} alt="zoom"
            style={{maxWidth:'90vw',maxHeight:'80vh',borderRadius:14,objectFit:'contain',
              boxShadow:'0 24px 80px rgba(0,0,0,0.70)',border:'1.5px solid rgba(255,255,255,0.15)'}}/>
          <button onClick={onClose}
            style={{position:'absolute',top:-14,right:-14,width:34,height:34,borderRadius:'50%',
              background:'linear-gradient(135deg,#00e58c,#00c070)',border:'none',cursor:'pointer',
              fontSize:18,fontWeight:700,color:'#050d08',display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 4px 16px rgba(0,229,140,0.50)'}}>×</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// DCSummaryPage
// ═════════════════════════════════════════════════════════════════════════════
function DCSummaryPage({ state, modelCode, onConfirm, onBack }) {
  const isMobile = useIsMobile();
  const { dcMotor, dcVoltage, dcRatio, dcGearHead } = state;
  const [dark,  setDark]    = useState(true);
  const [qty,   setQty]     = useState(1);
  const [showQ, setShowQ]   = useState(false);
  const [qName, setQName]   = useState('');
  const [qComp, setQComp]   = useState('');
  const [qPhone,setQPhone]  = useState('');
  const [qEmail,setQEmail]  = useState('');
  const [sending,setSending]= useState(false);
  const [sp,    setSp]      = useState('CA');
  const [showSP,setShowSP]  = useState(false);
  const T = dark ? D : L;
  const e   = MOTOR_DATA.find(m=>m.motorPrefix===dcMotor);
  const ghc = e ? getGearHeadCode(e, dcGearHead) : dcGearHead||'—';
  const outSpd = dcRatio ? (3000/Number(dcRatio)).toFixed(1) : null;

  const specRows = [
    ['Motor Code',   e?.motorPrefix||'—'],
    ['Power',        e?`${e.power} W`:'—'],
    ['Frame Size',   e?.frameSize||'—'],
    ['Voltage',      dcVoltage?`${dcVoltage} VDC`:'—'],
    ['Gear Series',  e?.gearSuffix||'—'],
    ['Rated Speed',  RATE_SPEED_RPM],
    ['Ratio',        dcRatio?`${dcRatio} : 1`:'—'],
    ['Output Speed', outSpd?`${outSpd} rpm`:'—'],
    ['Gear Head',    ghc],
  ];

  const submitQuote = async () => {
    if (!qName||!qComp||!qPhone||!qEmail){alert('กรุณากรอกข้อมูลให้ครบ');return;}
    try {
      setSending(true);
      const API=process.env.REACT_APP_API_BASE||'http://localhost:5000';
      const res=await fetch(`${API}/api/dc-quote`,{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({modelCode,qty,customer:{name:qName,company:qComp,phone:qPhone,email:qEmail},salePerson:sp}),
      });
      if(!res.ok) throw new Error(await res.text().catch(()=>''));
      const blob=await res.blob();
      const url=URL.createObjectURL(blob);
      const cd=res.headers.get('content-disposition')||'';
      const fn=(cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)"?/i)||[])[1]||'dc-quotation.pdf';
      try{
        const b64=await blobToBase64(blob);
        const ep={to_email:qEmail,requester_name:qName,company:qComp,phone:qPhone,email:qEmail,
          model_code:modelCode,qty_motor:String(qty),sale_person:sp,
          time:new Date().toLocaleString('th-TH'),pdf_content:b64,pdf_name:fn};
        await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{...ep,to_email:qEmail},EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{...ep,to_email:'Chottanin@synergy-as.com'},EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{...ep,to_email:'sas04@synergy-as.com'},EMAILJS_PUBLIC_KEY);
      }catch(err){console.error('EmailJS:',err);}
      const a=document.createElement('a');a.href=url;a.download=decodeURIComponent(fn);
      document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
      setShowQ(false);
    }catch(err){alert(String(err?.message||err));}
    finally{setSending(false);}
  };

  return (
    <>
      <style>{`@keyframes dc3d-spin{to{transform:rotate(360deg)}}#dc-sp::-webkit-scrollbar{width:4px}#dc-sp::-webkit-scrollbar-thumb{background:rgba(124,143,255,0.28);border-radius:2px}`}</style>
      <div style={{position:'fixed',inset:0,zIndex:500,display:'flex',flexDirection:'column',
        background:T.bg0,fontFamily:"'Sarabun',sans-serif",transition:'background 0.25s',overflow:'hidden'}}>

        {/* top bar */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'9px 16px',background:T.topBar,backdropFilter:'blur(16px)',
          borderBottom:`1px solid ${T.border0}`,flexShrink:0,flexWrap:'wrap',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:800,fontSize:14,letterSpacing:'2px',
              background:`linear-gradient(90deg,${T.mint},${T.indigo})`,
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',textTransform:'uppercase'}}>
              ⚙ DC GEAR MOTOR
            </span>
            <button onClick={()=>setDark(d=>!d)}
              style={{width:26,height:26,borderRadius:7,background:T.mintDim,border:`1px solid ${T.border1}`,cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {dark?'☀️':'🌙'}
            </button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6,flex:1,justifyContent:'center',minWidth:0}}>
            <span style={{fontFamily:'monospace',fontSize:11,fontWeight:700,color:T.mint,
              background:T.mintDim,border:`1px solid ${T.mint}40`,padding:'3px 10px',borderRadius:5,
              whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:220}}>
              {modelCode||'—'}
            </span>
            <button onClick={async()=>{try{await navigator.clipboard.writeText(modelCode||'');}catch(e){}}}
              style={{background:'none',border:'none',cursor:'pointer',color:T.indigo,fontSize:10,padding:'2px 6px',borderRadius:4,whiteSpace:'nowrap'}}>
              Copy
            </button>
          </div>
          <button onClick={onBack}
            style={{background:T.indigoDim,border:`1px solid ${T.indigo}50`,color:T.indigo,
              padding:'4px 12px',borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:600,whiteSpace:'nowrap'}}>
            ← ย้อนกลับ
          </button>
        </div>

        {/* body */}
        <div style={{flex:1,display:'flex',flexDirection:isMobile?'column':'row',minHeight:0,overflow:'hidden'}}>
          {/* viewer */}
          <div style={{flex:isMobile?'none':1,height:isMobile?260:undefined,minHeight:isMobile?260:0,minWidth:0,overflow:'hidden'}}>
            <DCViewer3D modelCode={modelCode} dark={dark}/>
          </div>
          {/* right panel */}
          <div id="dc-sp" style={{width:isMobile?'100%':272,flexShrink:0,
            background:T.bg1,borderLeft:isMobile?'none':`1px solid ${T.border0}`,
            borderTop:isMobile?`1px solid ${T.border0}`:'none',overflowY:'auto',display:'flex',flexDirection:'column'}}>

            {/* specs */}
            <div style={{padding:'14px 16px',borderBottom:`1px solid ${T.border0}`}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:T.txt2,marginBottom:10}}>ข้อมูลจำเพาะ</div>
              {specRows.map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',
                  padding:'5px 0',borderBottom:`1px solid ${T.border0}`,gap:6}}>
                  <span style={{fontSize:11,color:T.txt1,flexShrink:0}}>{k}</span>
                  <span style={{fontSize:11,fontWeight:600,textAlign:'right',wordBreak:'break-all',
                    color:['Power','Output Speed','Ratio'].includes(k)?T.mint:T.txt0}}>{v||'—'}</span>
                </div>
              ))}
            </div>

            {/* qty */}
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${T.border0}`}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:T.txt2,marginBottom:10}}>จำนวน</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontSize:12,color:T.txt1}}>DC Gear Motor</span>
                <div style={{display:'flex',alignItems:'center',gap:4}}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))}
                    style={{width:26,height:26,borderRadius:5,background:T.bg2,border:`1px solid ${T.border1}`,color:T.txt0,cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>–</button>
                  <input type="number" min={1} max={999} value={qty}
                    onChange={e=>{const v=Number(e.target.value);setQty(isFinite(v)?Math.max(1,Math.floor(v)):1);}}
                    onWheel={e=>e.currentTarget.blur()}
                    style={{width:36,textAlign:'center',background:T.bg2,border:`1px solid ${T.border1}`,borderRadius:5,color:T.txt0,fontSize:13,fontWeight:700,padding:'2px 0'}}/>
                  <button onClick={()=>setQty(q=>Math.min(999,q+1))}
                    style={{width:26,height:26,borderRadius:5,background:T.bg2,border:`1px solid ${T.border1}`,color:T.txt0,cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:8}}>
              <button onClick={()=>setShowQ(true)}
                style={{width:'100%',padding:'11px 0',borderRadius:10,border:'none',cursor:'pointer',fontWeight:700,fontSize:14,
                  background:`linear-gradient(135deg,${T.mint},#00c070)`,color:dark?'#050d08':'#fff',
                  boxShadow:`0 4px 20px ${T.mint}40`}}>
                🛒 ขอใบเสนอราคา
              </button>
              <button onClick={()=>{if(modelCode)onConfirm(modelCode);}}
                style={{width:'100%',padding:'11px 0',borderRadius:10,border:'none',cursor:'pointer',fontWeight:700,fontSize:14,
                  background:`linear-gradient(135deg,${T.indigo},#4a5de8)`,color:'white',
                  boxShadow:`0 4px 20px ${T.indigo}40`}}>
                📦 รับไฟล์ 3D (.STEP)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote modal */}
      {showQ&&(
        <div style={{position:'fixed',inset:0,zIndex:1200,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.65)'}} onClick={()=>!sending&&setShowQ(false)}/>
          <div style={{position:'relative',background:dark?D.bg1:L.bg1,border:`1px solid ${T.border1}`,
            borderRadius:18,padding:24,width:'92%',maxWidth:450,maxHeight:'90vh',overflowY:'auto',
            boxShadow:'0 24px 80px rgba(0,0,0,0.60)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,flexWrap:'wrap'}}>
              <h3 style={{fontSize:17,fontWeight:800,color:T.txt0,margin:0}}>ขอใบเสนอราคา</h3>
              <div style={{position:'relative'}}>
                <button onClick={()=>setShowSP(v=>!v)}
                  style={{background:'none',border:'none',cursor:'pointer',fontSize:22}}>🧑‍💼</button>
                {showSP&&(
                  <div style={{position:'absolute',left:0,top:'100%',marginTop:4,zIndex:9999,
                    background:dark?D.bg2:L.bg1,border:`1px solid ${T.border1}`,borderRadius:12,
                    boxShadow:'0 12px 40px rgba(0,0,0,0.50)',width:260,overflow:'hidden'}}>
                    {SALE_PERSONS.map(s=>(
                      <button key={s.abbr} onClick={()=>{setSp(s.abbr);setShowSP(false);}}
                        style={{width:'100%',textAlign:'left',padding:'8px 14px',
                          background:sp===s.abbr?T.mintDim:'transparent',border:'none',cursor:'pointer',
                          borderBottom:`1px solid ${T.border0}`,color:T.txt0}}>
                        <div style={{fontSize:12,fontWeight:600}}>{s.name}</div>
                        <div style={{fontSize:10,color:T.txt1}}>{s.position} · {s.phone}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {sp&&<span style={{fontSize:10,background:T.mintDim,color:T.mint,padding:'2px 8px',borderRadius:10,fontWeight:600}}>
                {SALE_PERSONS.find(s=>s.abbr===sp)?.name||sp}
              </span>}
            </div>
            {[['ชื่อผู้ขอราคา',qName,setQName,'text'],['ชื่อบริษัท',qComp,setQComp,'text'],
              ['เบอร์ติดต่อ',qPhone,setQPhone,'text'],['Email',qEmail,setQEmail,'email']].map(([lbl,val,set,type])=>(
              <div key={lbl} style={{marginBottom:10}}>
                <label style={{fontSize:12,color:T.txt1,display:'block',marginBottom:4}}>{lbl}</label>
                <input type={type} value={val} onChange={e=>set(e.target.value)}
                  style={{width:'100%',padding:'9px 12px',borderRadius:8,background:T.bg2,
                    border:`1px solid ${T.border1}`,color:T.txt0,fontSize:13,boxSizing:'border-box',outline:'none'}}/>
              </div>
            ))}
            <div style={{marginTop:12,padding:'10px 12px',borderRadius:8,background:T.bg2,border:`1px solid ${T.border0}`,fontSize:12,color:T.txt1}}>
              <div>Model: <b style={{color:T.mint}}>{modelCode}</b></div>
              <div style={{marginTop:4}}>จำนวน: <b style={{color:T.txt0}}>{qty}</b> ตัว</div>
            </div>
            <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:16}}>
              <button onClick={()=>setShowQ(false)} disabled={sending}
                style={{padding:'8px 18px',borderRadius:10,background:T.bg2,border:`1px solid ${T.border1}`,color:T.txt0,cursor:'pointer',fontSize:13,fontWeight:600}}>ปิด</button>
              <button onClick={submitQuote} disabled={sending||!qName||!qComp||!qPhone||!qEmail}
                style={{padding:'8px 22px',borderRadius:10,border:'none',cursor:'pointer',fontSize:13,fontWeight:700,
                  background:(!qName||!qComp||!qPhone||!qEmail||sending)?T.bg3:`linear-gradient(135deg,${T.mint},#00c070)`,
                  color:dark?'#050d08':'#fff',opacity:(!qName||!qComp||!qPhone||!qEmail||sending)?0.45:1}}>
                {sending?'กำลังส่ง…':'รับใบเสนอราคา'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Export
// ═════════════════════════════════════════════════════════════════════════════
export function renderDCGearFlow(state, setState, onConfirm, onHome, onBack) {
  return <DCGearFlowUI state={state} setState={setState} onConfirm={onConfirm} onHome={onHome} onBack={onBack}/>;
}

// ═════════════════════════════════════════════════════════════════════════════
// DCGearFlowUI — multi-step selection
// ═════════════════════════════════════════════════════════════════════════════
function DCGearFlowUI({ state, setState, onConfirm, onHome, onBack }) {
  const { dcMotor, dcVoltage, dcRatio, dcGearHead } = state;
  const { setDcMotor, setDcVoltage, setDcRatio, setDcGearHead } = setState;
  const [dark,    setDark]    = useState(true);
  const isMobile = useIsMobile();
  const T = dark ? D : L;

  const entry        = MOTOR_DATA.find(m=>m.motorPrefix===dcMotor);
  const allowedHeads = entry ? getAllowedGearHeads(entry) : [];
  const canSummary   = !!(dcMotor && dcVoltage && dcRatio && dcGearHead);
  const modelCode    = canSummary ? generateDCModelCode(state) : null;

  const partial = (() => {
    if (!dcMotor) return 'XXXXXXXXXX';
    const vs = dcVoltage&&entry ? getVoltageSuffix(dcVoltage,entry.gearSuffix) : 'XXXX';
    const rp = dcRatio&&entry   ? `${entry.gearPrefix}${String(dcRatio).replace(/\.0$/,'')}${dcGearHead?getGearHeadCode(entry,dcGearHead):'XXXXX'}` : 'XXXXX';
    return `${entry.motorPrefix}-${vs}-${RATE_SPEED_CODE}-${rp}`;
  })();

  const handleBack = () => {
    if (dcGearHead) { setDcGearHead(null); return; }
    if (dcRatio)    { setDcRatio(null);    return; }
    if (dcVoltage)  { setDcVoltage(null);  return; }
    if (dcMotor)    { setDcMotor(null);    return; }
    if (onBack)     onBack();
  };

  if (canSummary && modelCode) {
    return <DCSummaryPage state={state} modelCode={modelCode} onConfirm={onConfirm} onBack={()=>setDcGearHead(null)}/>;
  }

  // button factory
  const pill = (active, accent='mint') => {
    const col = T[accent]||T.mint;
    const dim = T[accent+'Dim']||T.mintDim;
    return {
      padding:'8px 16px', borderRadius:10, cursor:'pointer', fontWeight:700, fontSize:13,
      border: active?`1.5px solid ${col}`:`1px solid ${T.border1}`,
      background: active?dim:T.bg1,
      color: active?col:T.txt0,
      boxShadow: active?`0 0 14px ${col}28,0 4px 0 rgba(0,0,0,0.28)`:'0 4px 0 rgba(0,0,0,0.22)',
      transition:'all 0.15s cubic-bezier(0.34,1.56,0.64,1)',
      transform: active?'scale(1.04) translateY(-1px)':'scale(1)',
      outline:'none', position:'relative', top:0,
    };
  };

  const gearImages = { K:KImg, KK:KKImg, KB:KBImg, RC:RCImg, RT:RTImg };

  return (
    <div style={{minHeight:'100vh',background:T.bg0,color:T.txt0,
      fontFamily:"'Sarabun','Noto Sans Thai',sans-serif",transition:'background 0.25s,color 0.25s'}}>

      <style>{`
        @keyframes dcPopIn{0%{opacity:0;transform:scale(0.76) translateY(14px)}80%{transform:scale(1.04) translateY(-2px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        .dc-appear{animation:dcPopIn 0.30s cubic-bezier(0.34,1.56,0.64,1) both}
        .dc-pbtn{transition:all 0.12s ease !important}
        .dc-pbtn:active{transform:scale(0.94) translateY(2px) !important;box-shadow:0 1px 0 rgba(0,0,0,0.28) !important}
        .dc-gc{transition:all 0.16s ease;cursor:pointer;border-radius:14px}
        .dc-gc:active{transform:scale(0.93) !important}
        .dc-scroll::-webkit-scrollbar{height:3px;width:3px}
        .dc-scroll::-webkit-scrollbar-thumb{background:rgba(124,143,255,0.22);border-radius:2px}
      `}</style>

      {/* STICKY NAV */}
      <div style={{position:'sticky',top:0,zIndex:100,background:T.topBar,backdropFilter:'blur(16px)',borderBottom:`1px solid ${T.border0}`,transition:'all 0.25s'}}>
        <div style={{maxWidth:900,margin:'0 auto',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <button onClick={handleBack}
              style={{padding:'5px 12px',borderRadius:7,background:T.indigoDim,border:`1px solid ${T.indigo}50`,color:T.indigo,cursor:'pointer',fontSize:12,fontWeight:600}}>
              ← ย้อนกลับ
            </button>
            <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:800,fontSize:14,letterSpacing:'2px',
              background:`linear-gradient(90deg,${T.mint},${T.indigo})`,
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',textTransform:'uppercase'}}>
              ⚙ DC GEAR MOTOR
            </span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <button onClick={()=>setDark(d=>!d)}
              style={{width:28,height:28,borderRadius:8,background:T.mintDim,border:`1px solid ${T.border1}`,cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {dark?'☀️':'🌙'}
            </button>
            <button onClick={onHome||onBack}
              style={{padding:'5px 12px',borderRadius:7,background:T.bg2,border:`1px solid ${T.border1}`,color:T.txt1,cursor:'pointer',fontSize:12}}>
              Home
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:900,margin:'0 auto',padding: isMobile?'12px 14px 80px':'20px 24px 80px'}}>

        {/* MODEL CODE DISPLAY */}
        <div style={{marginBottom:16,padding:'12px 16px',borderRadius:14,
          background:T.bg1,border:`1px solid ${T.border0}`,
          display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
          <span style={{fontSize:9,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.txt2,flexShrink:0}}>MODEL CODE</span>
          <span style={{fontFamily:'monospace',fontSize:isMobile?12:14,fontWeight:700,color:T.mint,letterSpacing:'0.5px',wordBreak:'break-all'}}>
            {partial}
          </span>
        </div>

        {/* STEP 1 — CAROUSEL (Des.png ↔ DesGear.png) */}
        <StepCard step="1" title="Overview" T={T} dark={dark}>
          <ImageCarousel dark={dark} T={T} />
        </StepCard>

        {/* STEP 2 — POWER MOTOR */}
        <StepCard step="2" title="Power Motor" T={T} dark={dark}>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {MOTOR_DATA.map((m,i)=>{
              const active = dcMotor===m.motorPrefix;
              return (
                <motion.button key={`${m.motorPrefix}-${i}`} type="button"
                  className={`dc-pbtn dc-appear${active?' active-btn':''}`}
                  onClick={()=>{setDcMotor(m.motorPrefix);setDcVoltage(null);setDcRatio(null);setDcGearHead(null);}}
                  whileTap={{scale:0.93}}
                  style={{...pill(active,'mint'),display:'flex',flexDirection:'column',alignItems:'center',gap:2,minWidth:isMobile?68:84}}>
                  <span style={{fontSize:15,fontWeight:800}}>{m.power}W</span>
                  <span style={{fontSize:10,opacity:0.75}}>{m.motorPrefix}</span>
                  <span style={{fontSize:9,opacity:0.55,background:active?T.mintDim:T.bg2,padding:'1px 6px',borderRadius:4,marginTop:1}}>{m.frameSize}</span>
                </motion.button>
              );
            })}
          </div>
          {entry&&(
            <div className="dc-appear" style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
              <Tag label="Frame" value={entry.frameSize} T={T} accent="mint"/>
              <Tag label="Series" value={entry.gearSuffix} T={T} accent="indigo"/>
              <Tag label="Prefix" value={entry.gearPrefix} T={T} accent="amber"/>
            </div>
          )}
        </StepCard>

        {/* STEP 3 — VOLTAGE */}
        {dcMotor&&(
          <AnimatePresence>
            <motion.div key="s3" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.26}}>
              <StepCard step="3" title="Voltage DC" T={T} dark={dark}>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {VOLTAGE_OPTIONS.map(v=>(
                    <motion.button key={v} type="button"
                      className={`dc-pbtn${dcVoltage===v?' active-btn':''}`}
                      onClick={()=>{setDcVoltage(v);setDcRatio(null);setDcGearHead(null);}}
                      whileTap={{scale:0.93}}
                      style={{...pill(dcVoltage===v,'indigo'),minWidth:72,fontSize:14}}>
                      {v}<span style={{fontSize:10,opacity:0.70}}> VDC</span>
                    </motion.button>
                  ))}
                </div>
                {dcVoltage&&entry&&(
                  <div className="dc-appear" style={{marginTop:10}}>
                    <Tag label="Voltage Code" value={getVoltageSuffix(dcVoltage,entry.gearSuffix)} T={T} accent="indigo"/>
                  </div>
                )}
              </StepCard>
            </motion.div>
          </AnimatePresence>
        )}

        {/* STEP 4 — RATE SPEED */}
        {dcVoltage&&(
          <AnimatePresence>
            <motion.div key="s4" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.24}}>
              <StepCard step="4" title="Rate Speed" T={T} dark={dark}>
                <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                  <div style={{...pill(true,'amber'),cursor:'default',minWidth:64,textAlign:'center',fontSize:15}}>30S</div>
                  <Tag label="Speed" value={RATE_SPEED_RPM} T={T} accent="amber"/>
                </div>
              </StepCard>
            </motion.div>
          </AnimatePresence>
        )}

        {/* STEP 5 — GEAR RATIO */}
        {dcVoltage&&(
          <AnimatePresence>
            <motion.div key="s5" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.24,delay:0.04}}>
              <StepCard step="5" title="Gear Ratio" T={T} dark={dark}>
                <div className="dc-scroll" style={{display:'flex',flexWrap:'wrap',gap:7}}>
                  {RATIO_LIST.map(r=>(
                    <motion.button key={r} type="button"
                      className={`dc-pbtn${String(dcRatio)===String(r)?' active-btn':''}`}
                      onClick={()=>{setDcRatio(r);setDcGearHead(null);}}
                      whileTap={{scale:0.91}}
                      style={{...pill(String(dcRatio)===String(r),'mint'),padding:'6px 11px',fontSize:13}}>
                      {r}
                    </motion.button>
                  ))}
                </div>
                {dcRatio&&(
                  <div className="dc-appear" style={{marginTop:10,display:'flex',gap:8,flexWrap:'wrap'}}>
                    <Tag label="Ratio" value={`${dcRatio} : 1`} T={T} accent="mint"/>
                    <Tag label="Output" value={`${(3000/Number(dcRatio)).toFixed(1)} rpm`} T={T} accent="indigo"/>
                  </div>
                )}
              </StepCard>
            </motion.div>
          </AnimatePresence>
        )}

        {/* STEP 6 — GEAR HEAD TYPE  (190×190px ≈ 5cm×5cm) */}
        {dcRatio&&entry&&(
          <AnimatePresence>
            <motion.div key="s6" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.27,delay:0.05}}>
              <StepCard step="6" title="Gear Head Type" T={T} dark={dark}>
                <div style={{
                  display:'flex',
                  flexWrap:'wrap',
                  gap:12,
                }}>
                  {allowedHeads.map(key=>{
                    const active = dcGearHead===key;
                    const img    = gearImages[key];
                    return (
                      <motion.button key={key} type="button" className="dc-gc"
                        onClick={()=>setDcGearHead(key)}
                        whileTap={{scale:0.93}}
                        style={{
                          display:'flex',flexDirection:'column',alignItems:'stretch',
                          padding:0,border:active?`2px solid ${T.mint}`:`2px solid ${T.border1}`,
                          background:active?T.mintDim:T.bg1,
                          boxShadow:active?`0 0 22px ${T.mint}38,0 6px 0 rgba(0,0,0,0.28)`:'0 4px 0 rgba(0,0,0,0.26),0 1px 8px rgba(0,0,0,0.12)',
                          cursor:'pointer',outline:'none',borderRadius:14,overflow:'hidden',
                          transform:active?'scale(1.04) translateY(-2px)':'scale(1)',
                          transition:'all 0.17s cubic-bezier(0.34,1.56,0.64,1)',
                          position:'relative',
                          width: isMobile ? 'calc(50% - 6px)' : 190,
                        }}>
                        {/* ── image box: fixed 190×190px (≈5cm×5cm at 96dpi) ── */}
                        <div style={{
                          width:'100%',
                          height: isMobile ? 0 : 190,
                          paddingBottom: isMobile ? '100%' : 0,
                          position:'relative',
                          background:dark?'#111620':'#edf0f8',
                          overflow:'hidden',
                          flexShrink:0,
                        }}>
                          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                            {img&&<img src={img} alt={key}
                              style={{width:'78%',height:'78%',objectFit:'contain',
                                transition:'transform 0.2s',transform:active?'scale(1.10)':'scale(1)'}}/>}
                          </div>
                        </div>
                        {/* label */}
                        <div style={{padding:'8px 4px',textAlign:'center',
                          background:active?T.mintDim:T.bg2,
                          borderTop:`1px solid ${active?T.mint+'38':T.border0}`}}>
                          <span style={{fontSize:13,fontWeight:800,color:active?T.mint:T.txt0,letterSpacing:'0.5px'}}>
                            {key}
                          </span>
                        </div>
                        {/* check badge */}
                        {active&&(
                          <div style={{position:'absolute',top:6,right:6,
                            width:20,height:20,borderRadius:'50%',
                            background:`linear-gradient(135deg,${T.mint},#00c070)`,
                            display:'flex',alignItems:'center',justifyContent:'center',
                            fontSize:11,color:dark?'#050d08':'#fff',fontWeight:700,
                            boxShadow:`0 2px 8px ${T.mint}55`}}>✓</div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {dcGearHead&&(
                  <div className="dc-appear" style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
                    <Tag label="Head Code" value={getGearHeadCode(entry,dcGearHead)} T={T} accent="mint"/>
                    {entry.gearSuffix==='GN'&&dcGearHead==='KK'&&
                      <Tag label="Note" value="KK image → Code K" T={T} accent="amber"/>}
                  </div>
                )}
              </StepCard>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────
function StepCard({ step, title, T, dark, children }) {
  return (
    <div style={{marginBottom:14,borderRadius:16,
      background:T.bg1,border:`1px solid ${T.border0}`,overflow:'hidden',
      boxShadow:`0 2px 16px rgba(0,0,0,${dark?0.22:0.06})`}}>
      <div style={{padding:'10px 16px',borderBottom:`1px solid ${T.border0}`,
        background:`linear-gradient(90deg,${T.bg2},${T.bg1})`,
        display:'flex',alignItems:'center',gap:10}}>
        <span style={{width:22,height:22,borderRadius:6,flexShrink:0,
          background:`linear-gradient(135deg,${T.mint},${T.indigo})`,
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:11,fontWeight:800,color:'#fff'}}>{step}</span>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.txt1}}>
          STEP {step} — {title}
        </span>
      </div>
      <div style={{padding:'14px 16px'}}>{children}</div>
    </div>
  );
}

function Tag({ label, value, T, accent='mint' }) {
  const col = T[accent]||T.mint;
  const dim = T[accent+'Dim']||T.mintDim;
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:5,
      background:dim,border:`1px solid ${col}30`,borderRadius:8,padding:'3px 9px'}}>
      <span style={{fontSize:9,color:col,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px'}}>{label}</span>
      <span style={{fontSize:12,fontWeight:700,color:col}}>{value}</span>
    </div>
  );
}

export default renderDCGearFlow;
