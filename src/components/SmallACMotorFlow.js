// SmallACMotorFlow.js
// Small AC Series — 9-step selection flow + BLDC-style 3D Summary Page
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Image imports ─────────────────────────────────────────────────────────────
import SHNImg      from '../assets/smallac/SHN.png';
import SVNImg      from '../assets/smallac/SVN.png';
import SHMImg      from '../assets/smallac/SHM.png';
import SVMImg      from '../assets/smallac/SVM.png';
import SHDImg      from '../assets/smallac/SHD.png';
import SVDImg      from '../assets/smallac/SVD.png';

import G1Img       from '../assets/smallac/G1.png';
import G2Img       from '../assets/smallac/G2.png';
import G3Img       from '../assets/smallac/G3.png';
import G4Img       from '../assets/smallac/G4.png';

import SVG1Img     from '../assets/smallac/SVG1.png';
import SVG2Img     from '../assets/smallac/SVG2.png';
import SVG3Img     from '../assets/smallac/SVG3.png';
import SVG4Img     from '../assets/smallac/SVG4.png';

import TerminalImg from '../assets/smallac/Terminal.png';

// ─────────────────────────────────────────────────────────────────────────────
// DATA TABLES
// ─────────────────────────────────────────────────────────────────────────────

// Step 1 — Gear Types
const GEAR_TYPES = [
  { code: 'SHN', label: 'SHN', img: SHNImg },
  { code: 'SVN', label: 'SVN', img: SVNImg },
  { code: 'SHM', label: 'SHM', img: SHMImg },
  { code: 'SVM', label: 'SVM', img: SVMImg },
  { code: 'SHD', label: 'SHD', img: SHDImg },
  { code: 'SVD', label: 'SVD', img: SVDImg },
];

// Step 2 — Size Numbers
const SIZES = [18, 22, 28, 32, 40, 50];

// Step 3 — Powers per Size
const POWERS_BY_SIZE = {
  18: [100, 200, 300],
  22: [100, 200, 300, 400, 550, 750, 900, 1100],
  28: [100, 200, 300, 400, 550, 750, 900, 1100, 1500],
  32: [200, 300, 400, 550, 750, 900, 1100, 1500],
  40: [400, 550, 750, 900, 1100, 1500, 2200, 3700],
  50: [750, 900, 1100, 1500, 2200, 3700],
};

// Step 4 — Ratios per Size+Power
const RATIOS_BY_SIZE_POWER = {
  '18-100':  [3,5,10,15,20,25,30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '18-200':  [3,5,10,15,20,25,30,40,45,50,60,70,80,90],
  '18-300':  [3,5,10,15,20,25,30,40,45,50,60,70,80,90],

  '22-100':  [60,70,80,90,100,120,140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '22-200':  [15,20,25,30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '22-300':  [15,20,25,30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '22-400':  [3,5,10,15,20,25,30,40,45,50,60,70,80,90],
  '22-550':  [3,5,10,15,20,25,30,40,45,50,60,70,80,90],
  '22-750':  [3,5,10,15,20,25],
  '22-900':  [3,5,10,15,20,25],
  '22-1100': [3,5,10,15,20,25],

  '28-100':  [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '28-200':  [100,120,140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '28-300':  [100,120,140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '28-400':  [15,20,25,30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '28-550':  [15,20,25,30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '28-750':  [3,5,10,15,20,25,30,40,45,50,60,70,80,90,100,120],
  '28-900':  [3,5,10,15,20,25,30,40,45,50,60,70,80,90,100,120],
  '28-1100': [3,5,10,15,20,25,30,40,45,50,60,70,80,90,100,120],
  '28-1500': [3,5,10,15,20,25,30],

  '32-200':  [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '32-300':  [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '32-400':  [100,120,140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '32-550':  [100,120,140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '32-750':  [30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '32-900':  [30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '32-1100': [30,40,45,50,60,70,80,90,100,120,140,160,180,200],
  '32-1500': [3,5,10,15,20,25,30,40,45,50,60,70,80,90,100,120],

  '40-400':  [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '40-550':  [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '40-750':  [140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '40-900':  [140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '40-1100': [140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '40-1500': [40,45,50,60,70,80,90,100,140,160,180,200,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '40-2200': [3,5,10,15,20,25,30,40,45,50,60,70,80,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '40-3700': [3,5,10,15,20,25,30,40,45,50,60,70,80],

  '50-750':  [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '50-900':  [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '50-1100': [250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '50-1500': [120,140,160,180,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '50-2200': [45,50,60,70,80,90,100,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800],
  '50-3700': [15,20,25,30,40,45,50,60,70,80,90,100],
};

// Step 5 — Motor Current (voltage supply)
// Single Phase only: size=18 power=100/200 | size=22 power=100/200 | size=28 power=200
// otherwise Three Phase
function getAvailableCurrentTypes(size, power) {
  const singlePhaseOnly =
    (size === 18 && (power === 100 || power === 200)) ||
    (size === 22 && (power === 100 || power === 200)) ||
    (size === 28 && power === 200);

  if (singlePhaseOnly) return ['C'];   // Single Phase only
  return ['S'];                         // Three Phase only
}

const CURRENT_LABELS = {
  S: 'S : Three Phase 220/380VAC',
  C: 'C : Single Phase 220VAC',
};

// Step 6 — Brake Unit options
const BRAKE_UNITS = [
  { code: '', label: 'ไม่มี (None)' },
  { code: 'B', label: 'B : DC Brake' },
  { code: 'YB', label: 'YB : Manual Brake Unit' },
];

// Step 7 — Terminal Box Direction (G1–G4)
const TERMINAL_DIRS = [
  { code: 'G1', label: 'G1 : Left',  img: G1Img,  imgSV: SVG1Img },
  { code: 'G2', label: 'G2 : Right', img: G2Img,  imgSV: SVG2Img },
  { code: 'G3', label: 'G3 : Top',   img: G3Img,  imgSV: SVG3Img },
  { code: 'G4', label: 'G4 : Down',  img: G4Img,  imgSV: SVG4Img },
];

// Gear types that use SVG images in Step 7
const SV_GEAR_TYPES = ['SVN', 'SVM', 'SVD'];

// Step 8 — Lead Direction (depends on G selection from Step 7)
const LEAD_BY_TERMINAL = {
  G1: ['LD', 'LT', 'LF', 'LB'],
  G2: ['RD', 'RT', 'RF', 'RB'],
  G3: ['TL', 'TR', 'TF', 'TB'],
  G4: ['DL', 'DR', 'DF', 'DB'],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODEL CODE GENERATOR
// SHN18-100-45-C-G1-LD  |  SHN32-1500-15-S-YB-G3-TL
// ─────────────────────────────────────────────────────────────────────────────
export function generateSmallACModelCode(state) {
  const { sacGearType, sacSize, sacPower, sacRatio, sacCurrent, sacBrake, sacTerminal, sacLead } = state;
  if (!sacGearType || !sacSize || !sacPower || !sacRatio || !sacCurrent || !sacTerminal || !sacLead) return '';

  const parts = [
    `${sacGearType}${sacSize}`,
    String(sacPower),
    String(sacRatio),
    sacCurrent,
  ];
  if (sacBrake) parts.push(sacBrake);
  parts.push(sacTerminal);
  parts.push(sacLead);
  return parts.join('-');
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [mob, setMob] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Image Card — fluid, fills grid cell. Hover: scale up + glow. Tap: press down. */
function ImgCard({ img, label, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        scale: 1.08,
        y: -5,
        transition: { type: 'spring', stiffness: 350, damping: 18 },
      }}
      whileTap={{ scale: 0.93, y: 3, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
      style={{
        width: '100%',
        borderRadius: 14,
        border: active ? '2.5px solid #00e5a0' : '2px solid rgba(255,255,255,0.14)',
        background: active
          ? 'linear-gradient(145deg,#1a2a1a,#0d1f0d)'
          : 'linear-gradient(145deg,#1e2130,#10131a)',
        boxShadow: active
          ? '0 0 0 2px #00e5a060, 0 8px 24px rgba(0,229,160,0.28), 0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.09)'
          : '0 6px 18px rgba(0,0,0,0.52), 0 2px 5px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.07)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: 0,
        willChange: 'transform',
      }}
    >
      {/* Top shine */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(180deg,rgba(255,255,255,0.07) 0%,transparent 100%)',
        borderRadius: '14px 14px 0 0', pointerEvents: 'none',
      }} />
      {/* Square image area using aspect-ratio */}
      <div style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10%' }}>
        <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      {/* Label */}
      <div style={{
        width: '100%', textAlign: 'center', padding: '5px 4px 6px',
        fontSize: 11, fontWeight: 700, color: active ? '#00e5a0' : '#c8d0de',
        letterSpacing: '0.5px', flexShrink: 0,
      }}>
        {label}
      </div>
      {active && (
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 18, height: 18, borderRadius: '50%',
          background: '#00e5a0', color: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 900,
        }}>✓</span>
      )}
    </motion.button>
  );
}

/** Pill Button — 3D raised. Hover: lift + brighten. Tap: press. */
function PillBtn({ label, active, onClick, wide = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        scale: 1.10,
        y: -3,
        transition: { type: 'spring', stiffness: 380, damping: 18 },
      }}
      whileTap={{ scale: 0.9, y: 2, transition: { type: 'spring', stiffness: 420, damping: 22 } }}
      style={{
        minWidth: wide ? 90 : 56,
        height: 34,
        padding: '0 10px',
        borderRadius: 8,
        border: active ? '2px solid #00e5a0' : '1.5px solid rgba(255,255,255,0.18)',
        background: active
          ? 'linear-gradient(145deg,#004028,#002a1a)'
          : 'linear-gradient(145deg,#22263a,#15182a)',
        boxShadow: active
          ? '0 0 0 1.5px #00e5a050, 0 5px 14px rgba(0,229,160,0.22), 0 2px 5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)'
          : '0 5px 10px rgba(0,0,0,0.48), 0 1px 4px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.09)',
        cursor: 'pointer',
        fontSize: 12, fontWeight: 700,
        color: active ? '#00e5a0' : '#d0d8e8',
        letterSpacing: '0.3px',
        flexShrink: 0,
        willChange: 'transform',
      }}
    >
      {label}
    </motion.button>
  );
}

/** Section wrapper — supports flex (default) or CSS grid via `cols` prop */
function Section({ step, title, note, children, cols }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: 24 }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
        {step && (
          <span style={{
            background: 'linear-gradient(135deg,#00e5a0,#00b880)',
            color: '#000', borderRadius: 6, padding: '1px 7px',
            fontSize: 10, fontWeight: 800, letterSpacing: '1px', flexShrink: 0,
          }}>
            STEP {step}
          </span>
        )}
        <span style={{ color: '#e8eaf0', fontWeight: 700, fontSize: 13, letterSpacing: '0.5px' }}>{title}</span>
        {note && <span style={{ color: '#4a5060', fontSize: 10 }}>{note}</span>}
      </div>
      {cols ? (
        /* CSS Grid — fills full width, equal columns */
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
          {children}
        </div>
      ) : (
        /* Flex wrap — for pill buttons */
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {children}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENV PRESETS for 3D viewer — ใช้ค่าที่ model-viewer รองรับจริง
// neutral / legacy = built-in keywords | ที่เหลือใช้ HDR จาก Poly Haven via CDN
// ─────────────────────────────────────────────────────────────────────────────
const ENV_PRESETS = [
  { value: 'neutral',  label: 'Neutral', bg: '#2a2c30' },
  { value: 'legacy',   label: 'Legacy',  bg: '#3a3c40' },
  {
    value: 'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr',
    label: 'Studio', bg: '#252830',
  },
  {
    value: 'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr',
    label: 'Sunset', bg: '#3a2820',
  },
  {
    value: 'https://modelviewer.dev/shared-assets/environments/whipple_creek_regional_park_04_1k.hdr',
    label: 'Forest', bg: '#1a2a1a',
  },
  {
    value: 'https://modelviewer.dev/shared-assets/environments/music_hall_01_1k.hdr',
    label: 'City',   bg: '#202028',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Product tint colors — ใช้ CSS filter hue-rotate+saturate บน model-viewer
// ─────────────────────────────────────────────────────────────────────────────
const TINT_COLORS = [
  { label: 'ปกติ',     hue: null,  sat: 1,   bright: 1    },  // no filter
  { label: 'ขาว',      hue: 0,     sat: 0,   bright: 2.2  },
  { label: 'เทา',      hue: 0,     sat: 0,   bright: 1.0  },
  { label: 'ดำ',       hue: 0,     sat: 0,   bright: 0.25 },
  { label: 'น้ำเงิน',  hue: 210,   sat: 3,   bright: 0.8  },
  { label: 'เขียว',    hue: 120,   sat: 3,   bright: 0.7  },
  { label: 'เหลือง',   hue: 50,    sat: 4,   bright: 1.1  },
  { label: 'แดง',      hue: 0,     sat: 4,   bright: 0.8  },
];

// Swatch display colours (วงกลมแสดงใน UI)
const TINT_SWATCHES = ['#c8cdd6','#ffffff','#8a9098','#0a0a0a','#1a4faa','#1a6e30','#c8a800','#aa1a1a'];
function SmallACSummaryPage({ state, modelCode, onConfirm, onBack }) {
  const isMobile = useIsMobile();
  const { sacGearType, sacSize, sacPower, sacRatio, sacCurrent, sacBrake, sacTerminal, sacLead } = state;

  const [lightMode,  setLightMode]  = useState(false);
  const [qtyMotor,   setQtyMotor]   = useState(1);
  const [showQuote,  setShowQuote]  = useState(false);
  const [imgLightbox, setImgLightbox] = useState(false);
  const [qName,      setQName]      = useState('');
  const [qCompany,   setQCompany]   = useState('');
  const [qPhone,     setQPhone]     = useState('');
  const [qEmail,     setQEmail]     = useState('');
  const [sending,    setSending]    = useState(false);

  // 3D viewer state
  const [envIdx,    setEnvIdx]    = useState(0);
  const [exposure,  setExposure]  = useState(1.3);
  const [shadow,    setShadow]    = useState(0.6);
  const [autoLight, setAutoLight] = useState(false);
  const [tintIdx,   setTintIdx]   = useState(0); // 0 = ปกติ (no filter)
  const mvRef       = useRef(null);
  const lightTimer  = useRef(null);

  useEffect(() => {
    if (autoLight) {
      lightTimer.current = setInterval(() => {
        const mv = document.querySelector('model-viewer');
        if (mv) {
          const cur = parseInt(mv.style.getPropertyValue('--env-rotation') || '0', 10);
          mv.style.setProperty('--env-rotation', ((cur + 2) % 360) + 'deg');
        }
      }, 30);
    } else clearInterval(lightTimer.current);
    return () => clearInterval(lightTimer.current);
  }, [autoLight]);
  useEffect(() => () => clearInterval(lightTimer.current), []);

  // Theme tokens
  const T = lightMode ? {
    pageBg: '#f0f4f8', topBarBg: 'rgba(240,244,248,0.97)', topBarBorder: '1px solid rgba(0,0,0,0.08)',
    panelBg: '#ffffff', panelBorder: '1px solid rgba(0,0,0,0.08)',
    accent: '#1a4fd6', accentFaint: 'rgba(26,79,214,0.08)', accentBorder: 'rgba(26,79,214,0.25)',
    titleColor: '#1a4fd6', labelColor: '#8090a8', valueColor: '#0d1526',
    qtyLabelColor: 'rgba(13,21,38,0.70)', inputBg: 'rgba(0,0,0,0.04)', inputBorder: '1px solid rgba(0,0,0,0.10)',
    inputColor: '#0d1526', btnBg: 'rgba(0,0,0,0.04)', btnBorder: '1px solid rgba(0,0,0,0.10)', btnColor: '#0d1526',
    sectionDivider: '1px solid rgba(0,0,0,0.06)', sectionHeadColor: '#8090a8',
    codeBg: 'rgba(0,0,0,0.05)', codeBorder: '1px solid rgba(0,0,0,0.10)', codeColor: '#0d1526',
    backBtnBg: 'rgba(26,79,214,0.08)', backBtnBorder: '1px solid rgba(26,79,214,0.25)', backBtnColor: '#1a4fd6',
    specHighlight: '#1a4fd6', viewerBg: 'linear-gradient(135deg,#e8edf5,#dde4f0)',
    loaderRingColor: '#1a4fd6', loaderText: '#8090a8', toggleIcon: '☀️',
  } : {
    pageBg: '#0a0c10', topBarBg: 'rgba(10,12,16,0.95)', topBarBorder: '1px solid rgba(255,255,255,0.07)',
    panelBg: '#0f1118', panelBorder: '1px solid rgba(255,255,255,0.07)',
    accent: '#00e5a0', accentFaint: 'rgba(0,229,160,0.08)', accentBorder: 'rgba(0,229,160,0.25)',
    titleColor: '#00e5a0', labelColor: '#4a5060', valueColor: '#e8eaf0',
    qtyLabelColor: 'rgba(255,255,255,0.65)', inputBg: 'rgba(255,255,255,0.06)', inputBorder: '1px solid rgba(255,255,255,0.1)',
    inputColor: '#e8eaf0', btnBg: 'rgba(255,255,255,0.06)', btnBorder: '1px solid rgba(255,255,255,0.1)', btnColor: '#e8eaf0',
    sectionDivider: '1px solid rgba(255,255,255,0.06)', sectionHeadColor: '#4a5060',
    codeBg: 'rgba(255,255,255,0.06)', codeBorder: '1px solid rgba(255,255,255,0.1)', codeColor: '#e8eaf0',
    backBtnBg: 'rgba(0,229,160,0.08)', backBtnBorder: '1px solid rgba(0,229,160,0.25)', backBtnColor: '#00e5a0',
    specHighlight: '#00e5a0', viewerBg: 'linear-gradient(135deg,#0a0c10,#0d111c)',
    loaderRingColor: '#00e5a0', loaderText: '#4a5060', toggleIcon: '🌙',
  };

  const currentLabel = sacCurrent === 'S' ? 'Three Phase 220/380VAC' : 'Single Phase 220VAC';
  const brakeLabel   = sacBrake === 'B' ? 'DC Brake' : sacBrake === 'YB' ? 'Manual Brake Unit' : 'None';
  const motorSpeed   = 1500; // standard AC motor
  const outSpeed     = sacRatio ? Math.round((motorSpeed / sacRatio) * 10) / 10 : null;

  const specRows = [
    ['Gear Type',     sacGearType || '—'],
    ['Frame Size',    sacSize ? `No.${sacSize}` : '—'],
    ['Power',         sacPower ? `${sacPower} W` : '—'],
    ['Motor Speed',   '1500 rpm'],
    ['Ratio',         sacRatio ? `${sacRatio} : 1` : '—'],
    ['Output Speed',  outSpeed ? `${outSpeed} rpm` : '—'],
    ['Supply',        currentLabel],
    ['Brake Unit',    brakeLabel],
    ['Terminal Dir.', sacTerminal || '—'],
    ['Lead Dir.',     sacLead || '—'],
    ['IP Class',      'IP54'],
    ['Insulation',    'Class F'],
    ['Duty',          'S1'],
  ];

  // ── GLB model URL resolver ──────────────────────────────────────────────────
  // Pattern ชื่อไฟล์: {GearType}{Size}{Power}XXX{Brake}.glb
  //   SHN28-400-40-S-G1-LD      → SHN28400XXX.glb
  //   SHN40-1500-40-S-B-G1-LD   → SHN401500XXXB.glb
  //   SVN32-750-30-S-YB-G1-LD   → SVN32750XXXYB.glb
  function resolveGlbUrl(code) {
    if (!code) return null;
    const m = code.match(
      /^(SHN|SVN|SHM|SVM|SHD|SVD)(\d+)-(\d+)-\d+-[SC](?:-(YB|B))?-G[1-4]-/
    );
    if (m) {
      const [, gearType, size, power] = m;
      const brake = m[4] || '';
      return `${gearType}${size}${power}XXX${brake}.glb`;
    }
    return `${code}.glb`;
  }

  const glbFile = resolveGlbUrl(modelCode);
  // ✅ Production-safe: ใช้ window.location.origin + pathname prefix
  // รองรับทั้ง CRA (PUBLIC_URL), Vite (BASE_URL), และ deploy บน sub-path
  const getPublicBase = () => {
    if (typeof window === 'undefined') return '';
    // CRA
    if (typeof process !== 'undefined' && process.env?.PUBLIC_URL)
      return process.env.PUBLIC_URL.replace(/\/$/, '');
    // Vite
    if (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL)
      return import.meta.env.BASE_URL.replace(/\/$/, '');
    // Fallback: origin only (works for both localhost & production)
    return '';
  };
  const glbUrl = glbFile ? `${getPublicBase()}/model/glb/${glbFile}` : null;

  // Build STEP file URL  (same pattern as BLDCViewer3D)
  const PUBLIC_URL = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  const stepUrl = modelCode
    ? `${PUBLIC_URL}/model/${encodeURIComponent(modelCode + '.STEP')}`
    : null;

  const submitQuote = async () => {
    if (!qName || !qCompany || !qPhone || !qEmail) { alert('กรุณากรอกข้อมูลให้ครบ'); return; }
    try {
      setSending(true);
      const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000'
        : 'https://sas-qc-gearmotor.onrender.com';
      await fetch(`${API_BASE}/api/smallac-quote`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelCode, qtyMotor, customer: { name: qName, company: qCompany, phone: qPhone, email: qEmail } }),
      });
      setShowQuote(false);
      alert('ส่งคำขอใบเสนอราคาเรียบร้อยแล้วครับ');
    } catch (e) { console.error(e); alert('ส่งไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'); }
    finally { setSending(false); }
  };

  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 500,
        display: 'flex', flexDirection: 'column',
        background: T.pageBg,
        fontFamily: "'Sarabun',sans-serif",
        transition: 'background 0.25s',
        overflow: 'hidden',
      }}>

        {/* ── Top Bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '8px 12px' : '10px 18px',
          borderBottom: T.topBarBorder, background: T.topBarBg, backdropFilter: 'blur(12px)',
          flexShrink: 0, flexWrap: 'wrap', gap: 6,
        }}>
          {/* Left: title + toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: isMobile ? 13 : 15, letterSpacing: '1.5px', color: T.titleColor, textTransform: 'uppercase' }}>
              ⚙️ Small AC Gear Motor
            </span>
            <button type="button" title={lightMode ? 'Dark mode' : 'Light mode'} onClick={() => setLightMode(m => !m)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 8, background: T.accentFaint, border: `1px solid ${T.accentBorder}`, cursor: 'pointer', fontSize: 14 }}>
              {T.toggleIcon}
            </button>
          </div>
          {/* Center: model code + copy */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, flex: isMobile ? '1 1 100%' : '0 0 auto', order: isMobile ? 3 : 0 }}>
            <span style={{ fontFamily: 'monospace', fontSize: isMobile ? 10 : 12, fontWeight: 600, color: T.codeColor, background: T.codeBg, border: T.codeBorder, padding: '3px 8px', borderRadius: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
              {modelCode || '—'}
            </span>
            <button type="button"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.accent, fontSize: 11, padding: '3px 6px', borderRadius: 4, flexShrink: 0 }}
              onClick={async () => { try { if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(modelCode || ''); } catch { } }}>
              Copy
            </button>
          </div>
          {/* Right: back */}
          <button type="button" onClick={onBack}
            style={{ background: T.backBtnBg, border: T.backBtnBorder, color: T.backBtnColor, padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
            ← ย้อนกลับ
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: 0,
          overflowY: isMobile ? 'auto' : 'hidden',
          overflowX: 'hidden',
        }}>

          {/* ── Left: 3D Viewer + Lighting Controls ── */}
          <div style={{ flex: isMobile ? 'none' : 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

            {/* 3D Viewer */}
            <div style={{ flex: isMobile ? 'none' : 1, height: isMobile ? '260px' : '100%', background: T.viewerBg, position: 'relative', overflow: 'hidden' }}>
              {(() => {
                const t = TINT_COLORS[tintIdx];
                const mvFilter = t.hue === null
                  ? 'none'
                  : `hue-rotate(${t.hue}deg) saturate(${t.sat}) brightness(${t.bright})`;
                return (
                  <model-viewer
                    ref={mvRef}
                    src={glbUrl || ''}
                    alt={modelCode}
                    auto-rotate
                    camera-controls
                    shadow-intensity={shadow}
                    exposure={exposure}
                    environment-image={ENV_PRESETS[envIdx].value}
                    style={{ width: '100%', height: '100%', background: 'transparent', minHeight: isMobile ? 260 : 400, filter: mvFilter, transition: 'filter 0.3s' }}
                  >
                    <div slot="progress-bar" style={{ display: 'none' }} />
                  </model-viewer>
                );
              })()}

              {/* Desktop Lighting Controls — absolute overlay (top-left), desktop only */}
              {!isMobile && (
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'rgba(10,12,16,0.88)', backdropFilter: 'blur(10px)',
                  borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.08)',
                  width: 214, fontSize: 10, zIndex: 10,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5060', marginBottom: 8 }}>สภาพแวดล้อมแสง</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 3, marginBottom: 10 }}>
                    {ENV_PRESETS.map((env, i) => (
                      <button key={env.value} title={env.label} type="button" onClick={() => {
                        setEnvIdx(i);
                        if (mvRef.current) { try { mvRef.current.setAttribute('environment-image', env.value); } catch (e) {} }
                      }}
                        style={{ aspectRatio: '1', borderRadius: 4, border: i === envIdx ? '2px solid #00e5a0' : '2px solid transparent', cursor: 'pointer', background: env.bg, position: 'relative', overflow: 'hidden' }}>
                        <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, fontSize: 5, textAlign: 'center', background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.8)' }}>{env.label}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5060', marginBottom: 6 }}>สีผลิตภัณฑ์</div>
                  <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
                    {TINT_SWATCHES.map((swatch, i) => (
                      <button key={i} type="button" title={TINT_COLORS[i].label} onClick={() => setTintIdx(i)}
                        style={{ width: 20, height: 20, borderRadius: '50%', border: tintIdx === i ? '2.5px solid #00e5a0' : '2px solid rgba(255,255,255,0.15)', cursor: 'pointer', background: i === 0 ? 'linear-gradient(135deg,#555 50%,#aaa 50%)' : swatch, flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.5)', transition: 'border 0.15s' }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <span style={{ color: '#4a5060', width: 50 }}>ความสว่าง</span>
                    <input type="range" min={0.5} max={3} step={0.05} value={exposure} style={{ flex: 1, accentColor: '#00e5a0', cursor: 'pointer', height: 3 }}
                      onChange={e => { const v = parseFloat(e.target.value); setExposure(v); if (mvRef.current) mvRef.current.setAttribute('exposure', v); }} />
                    <span style={{ color: '#e8eaf0', width: 24, textAlign: 'right', fontFamily: 'monospace' }}>{exposure.toFixed(1)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <span style={{ color: '#4a5060', width: 50 }}>เงา</span>
                    <input type="range" min={0} max={1} step={0.05} value={shadow} style={{ flex: 1, accentColor: '#00e5a0', cursor: 'pointer', height: 3 }}
                      onChange={e => { const v = parseFloat(e.target.value); setShadow(v); if (mvRef.current) mvRef.current.setAttribute('shadow-softness', v); }} />
                    <span style={{ color: '#e8eaf0', width: 24, textAlign: 'right', fontFamily: 'monospace' }}>{shadow.toFixed(1)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#4a5060', fontSize: 9 }}>☀️ หมุนแสงอัตโนมัติ</span>
                    <button type="button" onClick={() => setAutoLight(v => !v)}
                      style={{ width: 32, height: 16, background: autoLight ? '#00e5a0' : 'rgba(255,255,255,0.1)', borderRadius: 8, position: 'relative', cursor: 'pointer', border: 'none', transition: 'background 0.2s' }}>
                      <div style={{ position: 'absolute', top: 2, left: autoLight ? 16 : 2, width: 12, height: 12, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Lighting Controls — inline block BELOW viewer, NOT overlapping */}
            {isMobile && (
              <div style={{
                background: 'rgba(10,12,16,0.97)',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                padding: '10px 14px',
                flexShrink: 0,
              }}>
                {/* Row 1: Environment presets */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 4, marginBottom: 8 }}>
                  {ENV_PRESETS.map((env, i) => (
                    <button key={env.value} title={env.label} type="button" onClick={() => {
                      setEnvIdx(i);
                      if (mvRef.current) { try { mvRef.current.setAttribute('environment-image', env.value); } catch (e) {} }
                    }}
                      style={{ aspectRatio: '1', borderRadius: 5, border: i === envIdx ? '2px solid #00e5a0' : '2px solid transparent', cursor: 'pointer', background: env.bg, position: 'relative', overflow: 'hidden' }}>
                      <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, fontSize: 6, textAlign: 'center', background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.8)' }}>{env.label}</span>
                    </button>
                  ))}
                </div>

                {/* Row 2: Tint swatches + sliders side by side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Tint swatches */}
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'nowrap', flexShrink: 0 }}>
                    {TINT_SWATCHES.map((swatch, i) => (
                      <button key={i} type="button" title={TINT_COLORS[i].label} onClick={() => setTintIdx(i)}
                        style={{ width: 18, height: 18, borderRadius: '50%', border: tintIdx === i ? '2.5px solid #00e5a0' : '2px solid rgba(255,255,255,0.15)', cursor: 'pointer', background: i === 0 ? 'linear-gradient(135deg,#555 50%,#aaa 50%)' : swatch, flexShrink: 0 }} />
                    ))}
                  </div>
                  {/* Sliders */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#4a5060', fontSize: 9, width: 38, flexShrink: 0 }}>แสง</span>
                      <input type="range" min={0.5} max={3} step={0.05} value={exposure} style={{ flex: 1, accentColor: '#00e5a0', height: 3 }}
                        onChange={e => { const v = parseFloat(e.target.value); setExposure(v); if (mvRef.current) mvRef.current.setAttribute('exposure', v); }} />
                      <span style={{ color: '#e8eaf0', width: 22, textAlign: 'right', fontFamily: 'monospace', fontSize: 9 }}>{exposure.toFixed(1)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#4a5060', fontSize: 9, width: 38, flexShrink: 0 }}>เงา</span>
                      <input type="range" min={0} max={1} step={0.05} value={shadow} style={{ flex: 1, accentColor: '#00e5a0', height: 3 }}
                        onChange={e => { const v = parseFloat(e.target.value); setShadow(v); if (mvRef.current) mvRef.current.setAttribute('shadow-softness', v); }} />
                      <span style={{ color: '#e8eaf0', width: 22, textAlign: 'right', fontFamily: 'monospace', fontSize: 9 }}>{shadow.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Panel ── */}
          <div style={{
            width: isMobile ? '100%' : 280,
            flexShrink: 0,
            background: T.panelBg,
            borderLeft: isMobile ? 'none' : T.panelBorder,
            borderTop: isMobile ? T.panelBorder : 'none',
            overflowY: isMobile ? 'visible' : 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>

            {/* Specs */}
            <div style={{ padding: '14px 16px', borderBottom: T.sectionDivider }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: T.sectionHeadColor, marginBottom: 10 }}>ข้อมูลจำเพาะ</div>
              {specRows.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '5px 0', borderBottom: `1px solid ${lightMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`, gap: 6 }}>
                  <span style={{ fontSize: 11, color: T.labelColor, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: ['Power', 'Output Speed', 'Ratio'].includes(k) ? T.specHighlight : T.valueColor, textAlign: 'right', wordBreak: 'break-all' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Qty */}
            <div style={{ padding: '14px 16px', borderBottom: T.sectionDivider }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: T.sectionHeadColor, marginBottom: 10 }}>จำนวน</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: T.qtyLabelColor }}>Motor</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button type="button" onClick={() => setQtyMotor(q => Math.max(1, q - 1))} style={{ width: 26, height: 26, borderRadius: 5, border: T.btnBorder, background: T.btnBg, color: T.btnColor, cursor: 'pointer', fontSize: 15 }}>–</button>
                  <input type="number" min={1} max={999} value={qtyMotor}
                    onChange={e => { const v = Number(e.target.value); setQtyMotor(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1); }}
                    onWheel={e => e.currentTarget.blur()}
                    style={{ width: 38, textAlign: 'center', background: T.inputBg, border: T.inputBorder, borderRadius: 5, color: T.inputColor, fontSize: 13, fontWeight: 700, padding: '2px 0' }} />
                  <button type="button" onClick={() => setQtyMotor(q => Math.min(999, q + 1))} style={{ width: 26, height: 26, borderRadius: 5, border: T.btnBorder, background: T.btnBg, color: T.btnColor, cursor: 'pointer', fontSize: 15 }}>+</button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button type="button"
                style={{ width: '100%', padding: '11px 0', borderRadius: 10, background: lightMode ? 'linear-gradient(90deg,#1a4fd6,#1040b8)' : 'linear-gradient(90deg,#00e5a0,#00c87a)', color: lightMode ? '#fff' : '#0a1a10', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}
                onClick={() => setShowQuote(true)}>
                🛒 ขอใบเสนอราคา
              </button>
              <button type="button"
                style={{ width: '100%', padding: '11px 0', borderRadius: 10, background: 'linear-gradient(90deg,#4080ff,#2060dd)', color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}
                onClick={() => { if (modelCode) onConfirm(modelCode); }}>
                📦 รับไฟล์ 3D (.STEP)
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuote && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => !sending && setShowQuote(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-xl p-6 text-slate-900">
            <h3 className="text-xl font-bold mb-4">ขอใบเสนอราคา Small AC Gear Motor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1">ชื่อผู้ขอราคา :</label><input value={qName} onChange={e => setQName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" /></div>
              <div><label className="block text-sm mb-1">ชื่อบริษัท :</label><input value={qCompany} onChange={e => setQCompany(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" /></div>
              <div><label className="block text-sm mb-1">เบอร์ติดต่อ :</label><input value={qPhone} onChange={e => setQPhone(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" /></div>
              <div><label className="block text-sm mb-1">Email :</label><input type="email" value={qEmail} onChange={e => setQEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" /></div>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              <div>Model: <b>{modelCode}</b></div>
              <div className="mt-1">จำนวน: <b>{qtyMotor}</b> ตัว</div>
            </div>
            <div className="mt-5 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowQuote(false)} disabled={sending} className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50">ปิด</button>
              <button type="button" onClick={submitQuote} disabled={sending || !qName || !qCompany || !qPhone || !qEmail}
                className="px-5 py-2 rounded-2xl bg-green-300 hover:bg-green-400 font-semibold shadow active:scale-95 transition disabled:opacity-50">
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
// SmallACFlowInner — real React component (can use hooks)
// ─────────────────────────────────────────────────────────────────────────────
function SmallACFlowInner({ state, setters, onConfirm, onHome }) {
  const isMobileView = useIsMobile();
  const [imgLightboxStep8, setImgLightboxStep8] = useState(false);

  const {
    sacGearType, sacSize, sacPower, sacRatio,
    sacCurrent, sacBrake, sacTerminal, sacLead,
  } = state;

  const update = (key, val) => setters[key](val);

  // Reset downstream when upstream changes
  const setGearType  = v => { update('sacGearType', v); update('sacSize', null); update('sacPower', null); update('sacRatio', null); update('sacCurrent', null); update('sacBrake', null); update('sacTerminal', null); update('sacLead', null); };
  const setSize      = v => { update('sacSize', v);     update('sacPower', null); update('sacRatio', null); update('sacCurrent', null); update('sacBrake', null); update('sacTerminal', null); update('sacLead', null); };
  const setPower     = v => { update('sacPower', v);    update('sacRatio', null); update('sacCurrent', null); update('sacBrake', null); update('sacTerminal', null); update('sacLead', null); };
  const setRatio     = v => { update('sacRatio', v);    update('sacCurrent', null); update('sacBrake', null); update('sacTerminal', null); update('sacLead', null); };
  const setCurrent   = v => { update('sacCurrent', v);  update('sacBrake', null); update('sacTerminal', null); update('sacLead', null); };
  const setBrake     = v => { update('sacBrake', v);    update('sacTerminal', null); update('sacLead', null); };
  const setTerminal  = v => { update('sacTerminal', v); update('sacLead', null); };
  const setLead      = v => { update('sacLead', v); };

  const ratios       = sacSize && sacPower ? (RATIOS_BY_SIZE_POWER[`${sacSize}-${sacPower}`] || []) : [];
  const currentTypes = sacSize && sacPower ? getAvailableCurrentTypes(sacSize, sacPower) : [];
  const leadOptions  = sacTerminal ? (LEAD_BY_TERMINAL[sacTerminal] || []) : [];

  const canSummary = sacGearType && sacSize && sacPower && sacRatio && sacCurrent && sacBrake !== undefined && sacBrake !== null && sacTerminal && sacLead;
  const modelCode  = canSummary ? generateSmallACModelCode(state) : '';

  if (canSummary && sacLead) {
    return (
      <SmallACSummaryPage
        state={state}
        modelCode={modelCode}
        onConfirm={onConfirm}
        onBack={() => setLead(null)}
      />
    );
  }

  // Responsive grid columns (reactive via hook)
  const gearTypeCols = isMobileView ? 3 : 6;
  const terminalCols = isMobileView ? 2 : 4;

  const containerStyle = {
    background: 'linear-gradient(160deg,#0a0c12 0%,#0d1020 60%,#0a0e18 100%)',
    minHeight: '100vh',
    padding: '20px 16px',
    fontFamily: "'Sarabun', sans-serif",
    color: '#e8eaf0',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 24, paddingBottom: 14,
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: '1.5px', color: '#00e5a0', textTransform: 'uppercase' }}>
          ⚙️ Small AC Gear Motor
        </span>
        <button type="button" onClick={onHome}
          style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', color: '#00e5a0', padding: '5px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
          ⌂ Home
        </button>
      </div>

      {/* ── STEP 1: Gear Type — 6 cols desktop / 3 cols mobile ── */}
      <Section step={1} title="Gear Type" cols={gearTypeCols}>
        {GEAR_TYPES.map(g => (
          <ImgCard
            key={g.code}
            img={g.img}
            label={g.label}
            active={sacGearType === g.code}
            onClick={() => setGearType(g.code)}
          />
        ))}
      </Section>

      {/* ── STEP 2: Size No. ── */}
      {sacGearType && (
        <Section step={2} title="Size No.">
          {SIZES.map(s => (
            <PillBtn key={s} label={String(s)} active={sacSize === s} onClick={() => setSize(s)} />
          ))}
        </Section>
      )}

      {/* ── STEP 3: Power Motor ── */}
      {sacSize && (
        <Section step={3} title="Power Motor">
          {(POWERS_BY_SIZE[sacSize] || []).map(p => (
            <PillBtn key={p} label={`${p}W`} active={sacPower === p} onClick={() => setPower(p)} wide />
          ))}
        </Section>
      )}

      {/* ── STEP 4: Ratio ── */}
      {sacPower && ratios.length > 0 && (
        <Section step={4} title="Ratio" note={`(${ratios.length} ค่า)`}>
          {ratios.map(r => (
            <PillBtn key={r} label={String(r)} active={sacRatio === r} onClick={() => setRatio(r)} />
          ))}
        </Section>
      )}

      {/* ── STEP 5: Motor Current ── */}
      {sacRatio && (
        <Section step={5} title="Motor Current (Supply)">
          {currentTypes.map(ct => (
            <PillBtn key={ct} label={CURRENT_LABELS[ct]} active={sacCurrent === ct} onClick={() => setCurrent(ct)} wide />
          ))}
        </Section>
      )}

      {/* ── STEP 6: Brake Unit ── */}
      {sacCurrent && (
        <Section step={6} title="Brake Unit">
          {BRAKE_UNITS.map(b => (
            <PillBtn key={b.code} label={b.label} active={sacBrake === b.code} onClick={() => setBrake(b.code)} wide />
          ))}
        </Section>
      )}

      {/* ── STEP 7: Terminal Box Direction — 4 cols desktop / 2 cols mobile ── */}
      {sacBrake !== undefined && sacBrake !== null && (
        <Section step={7} title="Terminal Box Direction (from output shaft)" cols={terminalCols}>
          {TERMINAL_DIRS.map(d => (
            <ImgCard
              key={d.code}
              img={SV_GEAR_TYPES.includes(sacGearType) ? d.imgSV : d.img}
              label={d.label}
              active={sacTerminal === d.code}
              onClick={() => setTerminal(d.code)}
            />
          ))}
        </Section>
      )}

      {/* ── STEP 8: Lead Direction ── */}
      {sacTerminal && (
        <Section step={8} title="Lead Direction (from output shaft)">
          <div style={{ width: '100%', marginBottom: 12 }}>
            <img
              src={TerminalImg}
              alt="Terminal Direction Reference"
              onClick={() => setImgLightboxStep8(true)}
              style={{ maxWidth: 360, width: '100%', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', cursor: 'zoom-in', transition: 'opacity 0.2s' }}
            />
          </div>
          {/* Lightbox for Step 8 image */}
          {imgLightboxStep8 && (
            <div
              onClick={() => setImgLightboxStep8(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            >
              <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
                <img
                  src={TerminalImg}
                  alt="Terminal Direction Reference"
                  style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.8)', objectFit: 'contain' }}
                />
                <button
                  onClick={() => setImgLightboxStep8(false)}
                  style={{ position: 'absolute', top: -14, right: -14, width: 32, height: 32, borderRadius: '50%', background: '#00e5a0', color: '#000', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          {leadOptions.map(l => (
            <PillBtn key={l} label={l} active={sacLead === l} onClick={() => setLead(l)} />
          ))}
        </Section>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: renderSmallACFlow (wraps component so App.jsx call pattern works)
// ─────────────────────────────────────────────────────────────────────────────
export function renderSmallACFlow(state, setters, onConfirm, onHome) {
  return <SmallACFlowInner state={state} setters={setters} onConfirm={onConfirm} onHome={onHome} />;
}

export default renderSmallACFlow;
