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
function ImgCard({ img, label, desc, active, onClick }) {
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
      {desc && (
        <div style={{
          width: '100%', textAlign: 'center', padding: '0 4px 6px',
          fontSize: 9, color: active ? 'rgba(0,229,160,0.75)' : 'rgba(255,255,255,0.35)',
          lineHeight: 1.35, flexShrink: 0,
        }}>
          {desc}
        </div>
      )}
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
function PillBtn({ label, desc, active, onClick, wide = false }) {
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
        height: desc ? 'auto' : 34,
        padding: desc ? '6px 10px' : '0 10px',
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
        display: 'flex', flexDirection: 'column', alignItems: desc && wide ? 'flex-start' : 'center',
        textAlign: 'left',
      }}
    >
      <span>{label}</span>
      {desc && <span style={{ fontSize: 9, fontWeight: 400, color: active ? 'rgba(0,229,160,0.7)' : 'rgba(255,255,255,0.35)', marginTop: 2, lineHeight: 1.35 }}>{desc}</span>}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StepBar — แถบ Progress ด้านบน คลิก Step ที่ผ่านมาแล้วได้เลย
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 8;

function StepBar({ currentStep, onJump }) {
  const STEP_LABELS = ['Type','Size','Power','Ratio','Supply','Brake','Terminal','Lead'];
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const stepNum  = i + 1;
        const isDone   = stepNum < currentStep;
        const isCur    = stepNum === currentStep;
        return (
          <div key={i}
            onClick={isDone && onJump ? () => onJump(stepNum) : undefined}
            title={isDone ? `กลับ Step ${stepNum}: ${STEP_LABELS[i]}` : undefined}
            style={{
              flex: '0 0 auto',
              minWidth: 34,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: isDone ? 'pointer' : 'default',
            }}
          >
            <div style={{
              width: '100%', height: isDone ? 5 : 3, borderRadius: 3,
              background: isDone ? '#00e5a0' : isCur ? '#facc15' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.25s',
            }} />
            <span style={{
              fontSize: 8, fontWeight: isDone || isCur ? 700 : 400,
              color: isDone ? '#00e5a0' : isCur ? '#facc15' : 'rgba(255,255,255,0.25)',
              letterSpacing: '0.2px', whiteSpace: 'nowrap',
            }}>
              {STEP_LABELS[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Section wrapper — supports flex (default) or CSS grid via `cols` prop.
 *  Now accepts `onJump` for StepBar + `subtitle` for step description. */
function Section({ step, title, subtitle, note, children, cols, onJump, currentStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: 24 }}
    >
      {/* StepBar — แสดงทุก Section เฉพาะ Section แรก (step===1) ถึงจะ render แถบ */}
      {step === 1 && onJump !== undefined && (
        <StepBar currentStep={currentStep || 1} onJump={onJump} />
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: subtitle ? 4 : 12 }}>
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
      {subtitle && (
        <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 11, margin: '0 0 10px', lineHeight: 1.45 }}>{subtitle}</p>
      )}
      {cols ? (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
          {children}
        </div>
      ) : (
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

// ─── Sale Persons ─────────────────────────────────────────────────────────────
const SAC_SALE_PERSONS = [
  { abbr: 'CA',  name: 'Mr. Chottanin A. (CA)',  position: 'TRANSMISSION PRODUCT MANAGER', phone: '081-921-6225' },
  { abbr: 'AP',  name: 'Ms.Apichaya P. (AP)',    position: 'Sale Supervisor',               phone: '098-3697494' },
  { abbr: 'MY',  name: 'Ms.Matavee Y. (MY)',     position: 'Sale Supervisor',               phone: '092-2715371' },
  { abbr: 'TWS', name: 'Ms.Thitikan W. (TWS)',   position: 'Sale Exclusive',                phone: '080-4632394' },
  { abbr: 'PW',  name: 'Mr.Parada W.(PW)',       position: 'Sale Engineer',                 phone: '088-9404948' },
  { abbr: 'SI',  name: 'Ms.Suphak I.(SI)',       position: 'Sale Exclusive',                phone: '096-0787776' },
  { abbr: 'NM',  name: 'Mr.Naphaphat M.(NM)',    position: 'Sale Exclusive',                phone: '065-7176332' },
  { abbr: 'SK',  name: 'Mr.Sanya K.(SK)',        position: 'Sale Supervisor',               phone: '086-9819616' },
  { abbr: 'PL',  name: 'Mr.Pongsakorn L.(PL)',   position: 'Sale Engineer',                 phone: '063-2159056' },
  { abbr: 'TL',  name: 'Ms.Tanawee L.(TL)',      position: 'Sale Supervisor',               phone: '092-2715372' },
  { abbr: 'NR',  name: 'Ms.Nantida R.(NR)',      position: 'Sale Exclusive',                phone: '098-2711425' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAS Small AC Gear Motor DataSheet PDF Generator
// Full catalog data: Size Tables, Torque, Weight, Shaft Specs
// ─────────────────────────────────────────────────────────────────────────────

// ── Complete Size Table from Catalog (all gearbox sizes) ─────────────────────
// key: `${size}-${powerW}` (Standard type, 50Hz)
// fields: A, D, E, F, G, H, J, K, L, M, X, Y, Z, S, P, Q, W, T, weightKg
const SAC_SIZE_TABLE = {
  // 1# Gearbox — Shaft Ø18mm
  '18-100-std':   { A:254, D:'40(50)', E:'110(140)', F:'135(120)', G:'65(120)', H:9,  J:16,  K:'50(39.5)', L:'10(12)', M:130.5, X:'143(/)', Y:'88.5(2)', Z:100, S:18, P:30, Q:27, W:5, T:20.2, weightKg:5.7 },
  '18-100-light': { A:254, D:'40(50)', E:'110(140)', F:'135(120)', G:'65(120)', H:9,  J:16,  K:'50(39.5)', L:'10(12)', M:130.5, X:'143(/)', Y:'88.5(2)', Z:100, S:18, P:30, Q:27, W:5, T:20.2, weightKg:5.7 },
  '18-200-std':   { A:279, D:'40(50)', E:'110(140)', F:'135(120)', G:'65(120)', H:9,  J:16,  K:'50(39.5)', L:'10(12)', M:130.5, X:'143(/)', Y:'88.5(2)', Z:100, S:18, P:30, Q:27, W:5, T:20.2, weightKg:7.0 },
  '18-200-light': { A:279, D:'40(50)', E:'110(140)', F:'135(120)', G:'65(120)', H:9,  J:16,  K:'50(39.5)', L:'10(12)', M:130.5, X:'143(/)', Y:'88.5(2)', Z:100, S:18, P:30, Q:27, W:5, T:20.2, weightKg:7.0 },

  // 2# Gearbox — Shaft Ø22mm
  '22-100-std':   { A:281, D:'65(148)', E:'130(185)', F:'158(175)', G:'90(165)', H:12, J:17.5, K:'60(48)', L:'13(12)', M:130.5, X:'161(/)', Y:'97.5(3)', Z:100, S:22, P:40, Q:35, W:7, T:25, weightKg:7.30 },
  '22-100-light': { A:341, D:'65(148)', E:'130(185)', F:'158(175)', G:'90(165)', H:12, J:33.5, K:'60(48)', L:'13(12)', M:130.5, X:'161(/)', Y:'97.5(3)', Z:100, S:22, P:40, Q:35, W:7, T:25, weightKg:12.0 },
  '22-200-std':   { A:306, D:'65(148)', E:'130(185)', F:'158(175)', G:'90(165)', H:12, J:17.5, K:'60(48)', L:'13(12)', M:130.5, X:'161(/)', Y:'97.5(3)', Z:100, S:22, P:40, Q:35, W:7, T:25, weightKg:9.00 },
  '22-200-light': { A:306, D:'65(148)', E:'130(185)', F:'158(175)', G:'90(165)', H:12, J:17.5, K:'60(48)', L:'13(12)', M:130.5, X:'161(/)', Y:'97.5(3)', Z:100, S:22, P:40, Q:35, W:7, T:25, weightKg:9.00 },
  '22-400-std':   { A:320, D:'65(148)', E:'130(185)', F:'158(175)', G:'90(165)', H:12, J:17.5, K:'60(48)', L:'13(12)', M:146,   X:'168(/)', Y:'97.5(3)', Z:114, S:22, P:40, Q:35, W:7, T:25, weightKg:11.5 },
  '22-400-light': { A:320, D:'65(148)', E:'130(185)', F:'158(175)', G:'90(165)', H:12, J:17.5, K:'60(48)', L:'13(12)', M:146,   X:'168(/)', Y:'97.5(3)', Z:114, S:22, P:40, Q:35, W:7, T:25, weightKg:11.5 },
  '22-750-light': { A:337, D:'65(148)', E:'130(185)', F:'158(175)', G:'90(165)', H:12, J:17.5, K:'60(48)', L:'13(12)', M:172,   X:'168(/)', Y:'97.5(3)', Z:126, S:22, P:40, Q:35, W:7, T:25, weightKg:13.5 },

  // 3# Gearbox — Shaft Ø28mm
  '28-200-std':   { A:339, D:'90(170)', E:'140(220)', F:'178(205)', G:'120(195)', H:12, J:23, K:'68(58)', L:'17(13)', M:130.5, X:'184(/)', Y:'116(3)', Z:100, S:28, P:45, Q:40, W:7, T:31.1, weightKg:9.00 },
  '28-200-light': { A:401, D:'90(170)', E:'140(220)', F:'178(205)', G:'120(195)', H:12, J:39, K:'68(58)', L:'17(13)', M:130.5, X:'184(/)', Y:'116(3)', Z:100, S:28, P:45, Q:40, W:7, T:31.1, weightKg:18.0 },
  '28-400-std':   { A:352, D:'90(170)', E:'140(220)', F:'178(205)', G:'120(195)', H:12, J:23, K:'68(58)', L:'17(13)', M:146,   X:'184(/)', Y:'116(3)', Z:114, S:28, P:45, Q:40, W:7, T:31.1, weightKg:14.0 },
  '28-400-light': { A:352, D:'90(170)', E:'140(220)', F:'178(205)', G:'120(195)', H:12, J:23, K:'68(58)', L:'17(13)', M:146,   X:'184(/)', Y:'116(3)', Z:114, S:28, P:45, Q:40, W:7, T:31.1, weightKg:14.0 },
  '28-750-std':   { A:367, D:'90(170)', E:'140(220)', F:'178(205)', G:'120(195)', H:12, J:23, K:'68(58)', L:'17(13)', M:172,   X:'184(/)', Y:'116(3)', Z:126, S:28, P:45, Q:40, W:7, T:31.1, weightKg:16.0 },
  '28-750-light': { A:367, D:'90(170)', E:'140(220)', F:'178(205)', G:'120(195)', H:12, J:23, K:'68(58)', L:'17(13)', M:172,   X:'184(/)', Y:'116(3)', Z:126, S:28, P:45, Q:40, W:7, T:31.1, weightKg:16.0 },
  '28-1500-light':{ A:413, D:'90(170)', E:'140(220)', F:'178(205)', G:'120(195)', H:12, J:23, K:'68(58)', L:'17(13)', M:192,   X:'193(/)', Y:'116(3)', Z:137, S:28, P:45, Q:40, W:7, T:31.1, weightKg:25.0 },

  // 4# Gearbox — Shaft Ø32mm
  '32-400-std':   { A:456, D:'130(185)', E:'170(255)', F:'210(239)', G:'165(216)', H:13, J:47.5, K:'70(66.5)', L:'18(13)', M:130.5, X:'216(/)', Y:'138.5(3)', Z:100, S:32, P:55, Q:50, W:10, T:35.5, weightKg:28.0 },
  '32-750-std':   { A:405, D:'130(185)', E:'170(255)', F:'210(239)', G:'165(216)', H:13, J:30.0, K:'70(66.5)', L:'18(13)', M:172,   X:'216(/)', Y:'138.5(3)', Z:126, S:32, P:55, Q:50, W:10, T:35.5, weightKg:28.0 },
  '32-750-light': { A:405, D:'130(185)', E:'170(255)', F:'210(239)', G:'165(216)', H:13, J:30.0, K:'70(66.5)', L:'18(13)', M:172,   X:'216(/)', Y:'138.5(3)', Z:126, S:32, P:55, Q:50, W:10, T:35.5, weightKg:28.0 },
  '32-1500-std':  { A:448, D:'130(185)', E:'170(255)', F:'210(239)', G:'165(216)', H:13, J:30.0, K:'70(66.5)', L:'18(13)', M:192,   X:'216(/)', Y:'138.5(3)', Z:137, S:32, P:55, Q:50, W:10, T:35.5, weightKg:36.0 },
  '32-1500-light':{ A:448, D:'130(185)', E:'170(255)', F:'210(239)', G:'165(216)', H:13, J:30.0, K:'70(66.5)', L:'18(13)', M:192,   X:'216(/)', Y:'138.5(3)', Z:137, S:32, P:55, Q:50, W:10, T:35.5, weightKg:36.0 },

  // 5# Gearbox — Shaft Ø40mm
  '40-400-std':   { A:539, D:'150(230)', E:'210(310)', F:'265(277)', G:'203(255)', H:15, J:59, K:83, L:'20(18)', M:146, X:'255(/)', Y:'160(5)', Z:114, S:40, P:65, Q:60, W:10, T:43.5, weightKg:46.0 },
  '40-750-std':   { A:455, D:'150(230)', E:'210(310)', F:'265(277)', G:'203(255)', H:15, J:36, K:83, L:'20(18)', M:172, X:'255(/)', Y:'160(5)', Z:126, S:40, P:65, Q:60, W:10, T:43.5, weightKg:42.5 },
  '40-750-light': { A:555, D:'150(230)', E:'210(310)', F:'265(277)', G:'203(255)', H:15, J:59, K:83, L:'20(18)', M:172, X:'255(/)', Y:'160(5)', Z:126, S:40, P:65, Q:60, W:10, T:43.5, weightKg:50.0 },
  '40-1500-std':  { A:498, D:'150(230)', E:'210(310)', F:'265(277)', G:'203(255)', H:15, J:36, K:83, L:'20(18)', M:192, X:'255(/)', Y:'160(5)', Z:137, S:40, P:65, Q:60, W:10, T:43.5, weightKg:52.0 },
  '40-1500-light':{ A:498, D:'150(230)', E:'210(310)', F:'265(277)', G:'203(255)', H:15, J:36, K:83, L:'20(18)', M:192, X:'255(/)', Y:'160(5)', Z:137, S:40, P:65, Q:60, W:10, T:43.5, weightKg:52.0 },
  '40-2200-std':  { A:518, D:'150(230)', E:'210(310)', F:'265(277)', G:'203(255)', H:15, J:36, K:83, L:'20(18)', M:192, X:'255(/)', Y:'160(5)', Z:137, S:40, P:65, Q:60, W:10, T:43.5, weightKg:58.0 },
  '40-3700-std':  { A:548, D:'150(230)', E:'210(310)', F:'265(277)', G:'203(255)', H:15, J:36, K:83, L:'20(18)', M:213, X:'255(/)', Y:'160(5)', Z:160, S:40, P:65, Q:60, W:10, T:43.5, weightKg:62.0 },

  // 6# Gearbox — Shaft Ø50mm
  '50-1500-std':  { A:555, D:'170(280)', E:'265(390)', F:'335(367)', G:'238(342)', H:18, J:51, K:'97(92)', L:25, M:192, X:'312(/)', Y:'200(5)', Z:137, S:50, P:80, Q:75, W:14, T:54, weightKg:94.0 },
  '50-2200-std':  { A:575, D:'170(280)', E:'265(390)', F:'335(367)', G:'238(342)', H:18, J:51, K:'97(92)', L:25, M:192, X:'312(/)', Y:'200(5)', Z:137, S:50, P:80, Q:75, W:14, T:54, weightKg:97.0 },
  '50-3700-std':  { A:605, D:'170(280)', E:'265(390)', F:'335(367)', G:'238(342)', H:18, J:51, K:'97(92)', L:25, M:213, X:'312(/)', Y:'200(5)', Z:160, S:50, P:80, Q:75, W:14, T:54, weightKg:98.0 },
};

// Helper: get size table row
function getSizeRow(size, power, isLight) {
  const typeKey = isLight ? 'light' : 'std';
  return SAC_SIZE_TABLE[`${size}-${power}-${typeKey}`]
      || SAC_SIZE_TABLE[`${size}-${power}-std`]
      || null;
}

// Output Torque table (kg.m, 50Hz Standard) — from catalog
const SAC_OUTPUT_TORQUE_DB = {
  '18-100-3':0.20,'18-100-5':0.30,'18-100-10':0.60,'18-100-15':0.80,'18-100-20':1.10,'18-100-25':1.40,'18-100-30':1.70,'18-100-40':2.30,'18-100-45':2.50,'18-100-50':2.80,
  '18-100-60':3.40,'18-100-70':3.40,'18-100-80':3.40,'18-100-90':3.40,'18-100-100':3.40,'18-100-120':3.40,'18-100-140':3.40,'18-100-160':3.40,'18-100-180':3.40,'18-100-200':3.40,
  '18-200-3':0.30,'18-200-5':0.60,'18-200-10':1.10,
  '22-100-60':3.40,'22-100-70':3.90,'22-100-80':4.50,'22-100-90':5.10,'22-100-100':5.60,'22-100-120':6.80,'22-100-140':7.90,'22-100-160':9.00,'22-100-180':10.1,'22-100-200':11.3,
  '22-200-15':1.50,'22-200-20':2.00,'22-200-25':2.50,'22-200-30':3.00,'22-200-40':4.10,'22-200-45':4.60,'22-200-50':5.10,'22-200-60':6.10,'22-200-70':7.10,'22-200-80':8.10,'22-200-90':9.10,
  '22-200-100':10.1,'22-200-120':11.6,'22-200-140':11.6,'22-200-160':11.6,'22-200-180':11.6,'22-200-200':11.6,
  '22-400-3':0.70,'22-400-5':1.10,'22-400-10':2.30,
  '22-400-15':3.00,'22-400-20':4.10,'22-400-25':5.10,'22-400-30':6.10,'22-400-40':8.10,'22-400-45':9.10,'22-400-50':10.1,'22-400-60':10.3,'22-400-70':10.3,'22-400-80':10.3,'22-400-90':10.3,
  '28-200-100':10.1,'28-200-120':12.2,'28-200-140':14.2,'28-200-160':16.2,'28-200-180':18.3,'28-200-200':20.3,
  '28-400-15':3.40,'28-400-20':4.50,'28-400-25':5.60,'28-400-30':6.10,'28-400-40':8.10,'28-400-45':9.10,'28-400-50':10.1,'28-400-60':12.2,'28-400-70':14.2,'28-400-80':16.2,'28-400-90':18.3,'28-400-100':20.3,
  '28-750-3':1.30,'28-750-5':2.10,'28-750-10':4.20,'28-750-15':6.30,'28-750-20':8.50,'28-750-25':10.6,
  '28-750-30':11.4,'28-750-40':15.2,'28-750-45':17.1,'28-750-50':19.0,'28-750-60':20.7,'28-750-70':20.7,'28-750-80':20.7,'28-750-90':20.7,'28-750-100':20.7,'28-750-120':20.7,
  '32-400-100':20.3,'32-400-120':24.4,'32-400-140':28.4,'32-400-160':32.5,'32-400-180':36.5,'32-400-200':40.6,
  '32-750-30':11.4,'32-750-40':15.2,'32-750-45':17.1,'32-750-50':19.0,'32-750-60':22.8,'32-750-70':26.6,'32-750-80':30.4,'32-750-90':34.3,'32-750-100':38.1,'32-750-120':45.7,
  '32-1500-3':2.50,'32-1500-5':4.20,'32-1500-10':8.50,'32-1500-15':12.7,'32-1500-20':16.9,'32-1500-25':21.1,'32-1500-30':25.4,
  '32-1500-40':30.4,'32-1500-45':34.3,'32-1500-50':38.1,'32-1500-60':45.7,'32-1500-70':51.8,'32-1500-80':51.8,'32-1500-90':51.8,'32-1500-100':51.8,
  '40-750-120':48.0,'40-750-140':54.8,'40-750-160':61.7,'40-750-180':68.5,
  '40-1500-40':30.4,'40-1500-45':34.3,'40-1500-50':38.1,'40-1500-60':45.7,'40-1500-70':53.3,'40-1500-80':60.9,'40-1500-90':68.5,'40-1500-100':76.1,
  '40-2200-3':3.70,'40-2200-5':6.20,'40-2200-10':12.4,'40-2200-15':16.7,'40-2200-20':22.3,'40-2200-25':27.9,'40-2200-30':33.5,'40-2200-40':44.7,
  '40-2200-45':50.2,'40-2200-50':55.8,'40-2200-60':67.0,'40-2200-70':78.1,'40-2200-80':83.7,
  '40-3700-3':6.30,'40-3700-5':10.4,'40-3700-10':20.9,
  '50-1500-120':91.3,'50-1500-140':106.6,'50-1500-160':121.8,'50-1500-180':137.0,
  '50-2200-45':50.2,'50-2200-50':55.8,'50-2200-60':67.0,'50-2200-70':78.1,'50-2200-80':89.3,'50-2200-90':100.5,'50-2200-100':111.6,
  '50-3700-15':31.3,'50-3700-20':41.7,'50-3700-25':52.2,'50-3700-30':56.3,'50-3700-40':75.1,'50-3700-45':84.5,'50-3700-50':93.9,'50-3700-60':112.6,
};

// Gear box size — full specs with Ø symbol
const SAC_SHAFT_SPECS = {
  18: { stdDia: 'O18 mm', maxDia: 'O20 mm', bearing: '6004', frameNo: '1#', material: 'Aluminium Alloy' },
  22: { stdDia: 'O22 mm', maxDia: 'O25 mm', bearing: '6205', frameNo: '2#', material: 'Aluminium Alloy' },
  28: { stdDia: 'O28 mm', maxDia: 'O30 mm', bearing: '6206', frameNo: '3#', material: 'Aluminium Alloy' },
  32: { stdDia: 'O32 mm', maxDia: 'O35 mm', bearing: '6207', frameNo: '4#', material: 'Aluminium Alloy' },
  40: { stdDia: 'O40 mm', maxDia: 'O45 mm', bearing: '6209', frameNo: '5#', material: 'Cast Iron' },
  50: { stdDia: 'O50 mm', maxDia: 'O55 mm', bearing: '6211', frameNo: '6#', material: 'Cast Iron' },
};

// Capacitor for single-phase
const SAC_CAPACITOR = {
  100:  '8 uF/450V (C-running)',
  200:  '12 uF/450V (C-running)',
  400:  '15 uF/450V + 75 uF/250V (Running + Starting)',
  750:  '20 uF/450V + 150 uF/250V (Running + Starting)',
  1500: '40 uF/450V + 200 uF/250V (Running + Starting)',
};

// Brake unit specs from catalog
const SAC_BRAKE_SPECS = {
  B: {
    '100-200':  { maxRpm: 4000, torque: '0.15–0.4 kg.m', clearance: '0.25–0.5 mm', weight: '2.0 kg' },
    '400-750':  { maxRpm: 3600, torque: '0.25–0.7 kg.m', clearance: '0.25–0.5 mm', weight: '4.3 kg' },
    '1100-1500':{ maxRpm: 3600, torque: '0.92–2.0 kg.m', clearance: '0.25–0.5 mm', weight: '6.3 kg' },
    '2200-3700':{ maxRpm: 3600, torque: '1.80–3.5 kg.m', clearance: '0.25–0.5 mm', weight: '7.0 kg' },
  },
};

// Helper: get brake spec row by power
function getBrakeSpec(power) {
  if (!power) return null;
  if (power <= 200)  return SAC_BRAKE_SPECS.B['100-200'];
  if (power <= 750)  return SAC_BRAKE_SPECS.B['400-750'];
  if (power <= 1500) return SAC_BRAKE_SPECS.B['1100-1500'];
  return SAC_BRAKE_SPECS.B['2200-3700'];
}

// Gear type descriptions
const GEAR_TYPE_FULL = {
  SHN: 'SHN — Horizontal, Foot-mount Standard',
  SVN: 'SVN — Vertical, Foot-mount Standard',
  SHM: 'SHM — Horizontal, Flange-mount (Scaled Frame)',
  SVM: 'SVM — Vertical, Flange-mount (Scaled Frame)',
  SHD: 'SHD — Horizontal, Scaled Frame Type',
  SVD: 'SVD — Vertical, Scaled Frame Type',
};

const TERMINAL_FULL = {
  G1: 'G1 — Terminal Box on Left side (from output shaft)',
  G2: 'G2 — Terminal Box on Right side (from output shaft)',
  G3: 'G3 — Terminal Box on Top (from output shaft)',
  G4: 'G4 — Terminal Box on Bottom (from output shaft)',
};

// ── jsPDF loader via CDN ──────────────────────────────────────────────────────
async function loadJsPDFforSAC() {
  if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  await new Promise((res, rej) => {
    if (document.getElementById('jspdf-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = res; s.onerror = rej; document.head.appendChild(s);
  });
  await new Promise((res, rej) => {
    if (document.getElementById('jspdf-autotable-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-autotable-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
    s.onload = res; s.onerror = rej; document.head.appendChild(s);
  });
  return window.jspdf?.jsPDF || window.jsPDF;
}

// Helper: load image element → base64 dataURL
function imgToBase64(imgElement) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width  = imgElement.naturalWidth  || imgElement.width  || 120;
    canvas.height = imgElement.naturalHeight || imgElement.height || 120;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  } catch { return null; }
}

// Helper: load image from src URL → base64 via canvas (handles CORS via same-origin)
function loadImgAsBase64(src) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        c.getContext('2d').drawImage(img, 0, 0);
        resolve(c.toDataURL('image/png'));
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function generateSmallACDatasheetPDF(state, modelCode, imgSrcs) {
  const JsPDF = await loadJsPDFforSAC();
  if (!JsPDF) throw new Error('Cannot load jsPDF');

  const { sacGearType, sacSize, sacPower, sacRatio, sacCurrent, sacBrake, sacTerminal, sacLead } = state;

  // Load images passed directly from React (reliable — no DOM query needed)
  const [gearImgB64, termImgB64] = await Promise.all([
    imgSrcs?.gearSrc ? loadImgAsBase64(imgSrcs.gearSrc) : Promise.resolve(null),
    imgSrcs?.termSrc ? loadImgAsBase64(imgSrcs.termSrc) : Promise.resolve(null),
  ]);

  const doc  = new JsPDF({ unit: 'mm', format: 'a4' });
  const W    = doc.internal.pageSize.getWidth();
  const H    = doc.internal.pageSize.getHeight();
  const NAVY = [10, 30, 80];
  const WHITE= [255,255,255];
  const LGRAY= [240,243,248];
  const GREEN= [0, 180, 120];
  const margin = 14;
  let y = 0;

  // ── Add footer to every page ──────────────────────────────────────────────
  const addFooter = () => {
    doc.setFillColor(...NAVY);
    doc.rect(0, H - 14, W, 14, 'F');
    doc.setTextColor(...WHITE);
    doc.setFontSize(6.5); doc.setFont('helvetica', 'bold');
    doc.text('Synergy Asia Solution Co.,Ltd.  |  Small AC Gear Motor SHN/SVN Series  |  WWW.MOTORSAS.COM', margin, H - 8);
    doc.setFont('helvetica', 'normal');
    doc.text('Tel: 081-921-6225  |  Data from SAS Small AC Gear Motor Catalog  |  Specs subject to change without notice.', margin, H - 3.5);
    doc.setTextColor(160,185,215);
    doc.text(`Page ${doc.internal.getNumberOfPages()}`, W - margin, H - 5.5, { align: 'right' });
  };

  // ── Header ──────────────────────────────────────────────────────────────────
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 26, 'F');
  // Accent stripe
  doc.setFillColor(...GREEN);
  doc.rect(0, 26, W, 2, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(15);
  doc.text('Small AC Gear Motor — Technical Data Sheet', margin, 11);
  doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.text('SAS Synergy Asia Solution Co.,Ltd.  |  SHN / SVN Series  |  WWW.MOTORSAS.COM', margin, 18);
  doc.setFontSize(9.5); doc.setFont('helvetica', 'bold');
  doc.setTextColor(...GREEN);
  doc.text(modelCode || '—', W - margin, 18, { align: 'right' });
  doc.setTextColor(20,20,20);
  y = 34;

  // ── sectionTitle helper ───────────────────────────────────────────────────
  const sectionTitle = (t, num) => {
    if (y + 14 > H - 20) { addFooter(); doc.addPage(); y = 16; }
    doc.setFillColor(...LGRAY);
    doc.roundedRect(margin, y, W - margin * 2, 7, 1, 1, 'F');
    doc.setFillColor(...NAVY);
    doc.roundedRect(margin, y, 3, 7, 0.5, 0.5, 'F');
    doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(8.5);
    doc.text(`${num}. ${t}`, margin + 6, y + 4.8);
    doc.setTextColor(20,20,20); doc.setFont('helvetica', 'normal');
    y += 10;
  };

  const autoT = (body, colStyles, extra = {}) => {
    if (y + 20 > H - 20) { addFooter(); doc.addPage(); y = 16; }
    doc.autoTable({
      startY: y, head: [], body,
      margin: { left: margin, right: margin },
      styles: { fontSize: 8.5, cellPadding: 2.4, lineColor: [220,225,235], lineWidth: 0.2 },
      columnStyles: colStyles || {
        0: { fontStyle: 'bold', fillColor: LGRAY, textColor: NAVY, cellWidth: 46 },
        1: { textColor: [20,20,20] },
        2: { fontStyle: 'bold', fillColor: LGRAY, textColor: NAVY, cellWidth: 46 },
        3: { textColor: [20,20,20] },
      },
      theme: 'plain',
      ...extra,
    });
    y = doc.lastAutoTable.finalY + 5;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 1 — MODEL CONFIGURATION
  // ══════════════════════════════════════════════════════════════════════════
  sectionTitle('MODEL CONFIGURATION', 1);
  const motorSpeed  = 1500;
  const outSpeed    = sacRatio ? Math.round((motorSpeed / sacRatio) * 10) / 10 : '—';
  const currentLbl  = sacCurrent === 'S' ? 'Three Phase  220-240 / 380-415V, 50/60Hz' : 'Single Phase  220V, 50/60Hz';
  const brakeLbl    = sacBrake === 'B' ? 'B — DC Electromagnetic Brake' : sacBrake === 'YB' ? 'YB — Manual Brake Unit' : 'None';

  autoT([
    ['Model Code',        modelCode || '—',              'Series',           'SHN / SVN (ZHN / ZVN)'],
    ['Gear Type',         GEAR_TYPE_FULL[sacGearType] || sacGearType || '—', 'Frame Size No.',  sacSize ? `${SAC_SHAFT_SPECS[sacSize]?.frameNo || ''} (No.${sacSize})` : '—'],
    ['Motor Power',       sacPower ? `${sacPower} W  (${(sacPower/746).toFixed(2)} HP)` : '—', 'Motor Speed (Input)', `${motorSpeed} rpm`],
    ['Gear Ratio',        sacRatio ? `${sacRatio} : 1` : '—',                'Output Speed',    `${outSpeed} rpm`],
    ['Power Supply',      currentLbl,                    'IP Protection',    'IP54'],
    ['Brake Unit',        brakeLbl,                      'Terminal Box Dir.',sacTerminal ? `${sacTerminal}  ${TERMINAL_FULL[sacTerminal]?.split('—')[1]?.trim() || ''}` : '—'],
    ['Lead Direction',    sacLead || '—',                'Operating Duty',   'S1 — Continuous Running'],
  ]);

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 2 — MOTOR & GEARBOX SPECIFICATION
  // ══════════════════════════════════════════════════════════════════════════
  sectionTitle('MOTOR & GEARBOX SPECIFICATION', 2);
  const shaftSpec   = SAC_SHAFT_SPECS[sacSize] || {};
  const torqueKey   = `${sacSize}-${sacPower}-${sacRatio}`;
  const outTorque   = SAC_OUTPUT_TORQUE_DB[torqueKey];
  const sizeRow     = getSizeRow(sacSize, sacPower, false);

  autoT([
    ['Insulation Class',  'Class F',                     'Ambient Temperature', '-10°C ~ +40°C'],
    ['Protection Class',  'IP54 (Terminal Box)',          'Humidity',            '≤ 90% RH  (no condensation)'],
    ['Altitude',          '≤ 1000 m',                    'Standard',            'GB755 / IEC-60034'],
    ['Poles',             '4P  (6P motor optional)',      'Starting Method',     sacCurrent === 'S' ? 'Direct-on-line (DOL)' : 'Capacitor start'],
    ['Frame Material',    shaftSpec.material || 'Aluminium Alloy', 'Gear Material', '40Cr + Hb280  Heat-treated HRC50'],
    ['Gear Shaft',        '20CrMnTi  HRC60  Class-6',    'Motor Shaft',         '20CrMnTi  HRC60  Class-6'],
    ['Output Shaft Dia.', shaftSpec.stdDia ? shaftSpec.stdDia.replace('O', '\u00d8') : '—', 'Max Shaft Dia.', shaftSpec.maxDia ? shaftSpec.maxDia.replace('O', '\u00d8') : '—'],
    ['Output Bearing',    shaftSpec.bearing || '—',      'Oil Seal',            'High-temp resistant, oil infiltration proof'],
    ['Output Torque',     outTorque ? `${outTorque} kg.m  (50Hz, Std. type)` : 'See Catalog Torque Table', 'Unit Weight', sizeRow ? `${sizeRow.weightKg} kg` : '—'],
  ]);

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 3 — DIMENSION TABLE (from catalog)
  // ══════════════════════════════════════════════════════════════════════════
  sectionTitle('DIMENSION TABLE  (Unit: mm)', 3);
  if (sizeRow) {
    doc.autoTable({
      startY: y,
      head: [['A', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'X', 'Y', 'Z', 'S', 'P', 'Q', 'W', 'T', 'Weight']],
      body: [[
        sizeRow.A, sizeRow.D, sizeRow.E, sizeRow.F, sizeRow.G,
        sizeRow.H, sizeRow.J, sizeRow.K, sizeRow.L, sizeRow.M,
        sizeRow.X, sizeRow.Y, sizeRow.Z, sizeRow.S, sizeRow.P,
        sizeRow.Q, sizeRow.W, sizeRow.T, `${sizeRow.weightKg} kg`,
      ]],
      margin: { left: margin, right: margin },
      headStyles: { fillColor: NAVY, textColor: WHITE, fontSize: 7, halign: 'center', cellPadding: 1.8 },
      styles: { fontSize: 7, cellPadding: 1.8, halign: 'center', lineColor: [220,225,235], lineWidth: 0.2 },
      theme: 'grid',
    });
    y = doc.lastAutoTable.finalY + 3;
    doc.setFontSize(7); doc.setTextColor(120,120,120); doc.setFont('helvetica','italic');
    doc.text('Note: Values in ( ) denote vertical gearbox dimension.  S = Output shaft std. diameter (\u00d8mm)', margin, y);
    doc.setFont('helvetica','normal'); doc.setTextColor(20,20,20);
    y += 6;
  } else {
    doc.setFontSize(8); doc.setTextColor(120,120,120);
    doc.text('Dimension data not available for this configuration.', margin, y);
    y += 8;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 4 — GEAR TYPE & TERMINAL BOX IMAGES
  // ══════════════════════════════════════════════════════════════════════════
  if (gearImgB64 || termImgB64) {
    sectionTitle('GEAR TYPE & TERMINAL BOX DIRECTION', 4);
    const imgW = 60; const imgH = 52;
    const gap  = 10;
    let imgX   = margin;

    if (gearImgB64) {
      if (y + imgH + 16 > H - 20) { addFooter(); doc.addPage(); y = 16; }
      doc.addImage(gearImgB64, 'PNG', imgX, y, imgW, imgH);
      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...NAVY);
      doc.text(sacGearType || '', imgX + imgW / 2, y + imgH + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(80,80,80);
      const gDesc = GEAR_TYPE_FULL[sacGearType] || '';
      doc.text(gDesc.split('—')[1]?.trim() || '', imgX + imgW / 2, y + imgH + 8.5, { align: 'center' });
      imgX += imgW + gap;
    }

    if (termImgB64) {
      if (y + imgH + 16 > H - 20) { addFooter(); doc.addPage(); y = 16; }
      doc.addImage(termImgB64, 'PNG', imgX, y, imgW, imgH);
      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...NAVY);
      doc.text(sacTerminal || '', imgX + imgW / 2, y + imgH + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(80,80,80);
      const tDesc = TERMINAL_FULL[sacTerminal] || '';
      doc.text(tDesc.split('—')[1]?.trim() || '', imgX + imgW / 2, y + imgH + 8.5, { align: 'center' });
    }
    y += imgH + 16;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 5 — BRAKE UNIT SPECIFICATION (if selected)
  // ══════════════════════════════════════════════════════════════════════════
  let secNum = 5;
  if (sacBrake && sacBrake !== '') {
    sectionTitle(`BRAKE UNIT — ${sacBrake === 'B' ? 'DC Electromagnetic Brake (B)' : 'Manual Brake Unit (YB)'}`, secNum++);
    const bSpec = getBrakeSpec(sacPower) || {};
    autoT([
      ['Brake Type',    sacBrake === 'B' ? 'DC Electromagnetic (spring-applied, DC released)' : 'Manual lever (no electrical required)', 'Max Premit RPM', bSpec.maxRpm ? `${bSpec.maxRpm} rpm` : '—'],
      ['Hold Torque',   bSpec.torque || '—',  'Clearance',  bSpec.clearance || '0.25–0.5 mm'],
      ['Brake Voltage', sacBrake === 'B' ? 'DC 24V (rectified from AC)' : 'N/A (manual)', 'Weight',  bSpec.weight || '—'],
    ]);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 6 — CAPACITOR (single-phase)
  // ══════════════════════════════════════════════════════════════════════════
  if (sacCurrent === 'C' && sacPower) {
    sectionTitle('CAPACITOR — 1-PHASE C-RUNNING TYPE', secNum++);
    const cap = SAC_CAPACITOR[sacPower] || '—';
    autoT([
      ['Motor Power', `${sacPower} W`, 'Capacitor Specification', cap],
      ['Note', 'Running capacitor is always required.  Starting capacitor for 400W and above.', '', ''],
    ]);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 7 — COMPLETE SHAFT SIZE REFERENCE TABLE
  // ══════════════════════════════════════════════════════════════════════════
  if (y + 70 > H - 20) { addFooter(); doc.addPage(); y = 16; }
  sectionTitle('SHAFT SIZE REFERENCE TABLE — All Gearbox Sizes', secNum++);
  doc.autoTable({
    startY: y,
    head: [['Gear No.', 'Std. Shaft Dia.', 'Max Shaft Dia.', 'Output Bearing', 'Frame Material', 'Power Range']],
    body: [
      ['1#', '\u00d818 mm', '\u00d820 mm', '6004', 'Aluminium Alloy', '100W ~ 200W'],
      ['2#', '\u00d822 mm', '\u00d825 mm', '6205', 'Aluminium Alloy', '100W ~ 750W'],
      ['3#', '\u00d828 mm', '\u00d830 mm', '6206', 'Aluminium Alloy', '200W ~ 1500W'],
      ['4#', '\u00d832 mm', '\u00d835 mm', '6207', 'Aluminium Alloy', '400W ~ 1500W'],
      ['5#', '\u00d840 mm', '\u00d845 mm', '6209', 'Cast Iron',       '750W ~ 3700W'],
      ['6#', '\u00d850 mm', '\u00d855 mm', '6211', 'Cast Iron',       '1500W ~ 3700W'],
    ],
    margin: { left: margin, right: margin },
    headStyles: { fillColor: NAVY, textColor: WHITE, fontSize: 8, cellPadding: 2 },
    styles: { fontSize: 8, cellPadding: 2, lineColor: [220,225,235], lineWidth: 0.2 },
    columnStyles: { 0: { halign: 'center', fontStyle: 'bold' } },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 6;

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 8 — GEAR MATERIALS & CONSTRUCTION
  // ══════════════════════════════════════════════════════════════════════════
  sectionTitle('GEAR MATERIALS & CONSTRUCTION', secNum++);
  autoT([
    ['Gearbox Housing',  '1#–4#: Aluminium alloy  |  5#–6#: Cast iron (Al 5#, 6# = 40, 50)', 'Gear Piece',  '40Cr mixed Hb280, HRC50  — precision milled, Class 6'],
    ['Gear Shaft',       '20CrMnTi  cementite quench HRC60  — gear hobbing Class 6', 'Motor Shaft', '20CrMnTi  cementite quench HRC60  — gear hobbing Class 6'],
    ['Ball Bearing',     'High precision — long service life', 'Oil Seal',    'Prevents high-temp oil infiltration'],
    ['Terminal Box (Std)','IP54 Aluminium alloy terminal box', 'Terminal Box (Alt)', 'IP20 Steel case with deft structure'],
  ]);

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION 9 — CONNECTION FACTOR & FORMULAS
  // ══════════════════════════════════════════════════════════════════════════
  sectionTitle('CONNECTION FACTOR & BASIC FORMULAS', secNum++);
  autoT([
    ['Sprocket / Chain', 'K = 1.00', 'Gear',       'K = 1.25'],
    ['Belt',             'K = 1.50', 'Flat Belt',  'K = 2.50'],
    ['Ratio  i',         'i = N / 1800', 'Speed  N', 'N = V / (pi x D)  [m/min]'],
    ['Torque  T',        'T = W x R x K  [kg.m]',  'Input Power',  'kW1 = N x T / 974'],
    ['Output Power',     'kW2 = kW1 x F / E',       'HP',           'HP1 = N x T / 716'],
  ]);

  // ── Footer on last page ────────────────────────────────────────────────
  addFooter();
  doc.save((modelCode || 'SmallAC_DataSheet') + '.pdf');
}

// ─────────────────────────────────────────────────────────────────────────────
// SmallACDataSheetButton
// ─────────────────────────────────────────────────────────────────────────────
function SmallACDataSheetButton({ state, modelCode, imgSrcs }) {
  const [status, setStatus] = React.useState('idle');
  const handleClick = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await generateSmallACDatasheetPDF(state, modelCode, imgSrcs);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('SmallAC PDF error:', err);
      setStatus('error');
      alert('Cannot create PDF:\n' + err.message);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };
  const icon  = { idle: '📄', loading: '⏳', done: '✅', error: '⚠️' }[status];
  const label = { idle: 'Data Sheet', loading: 'กำลังสร้าง...', done: 'ดาวน์โหลดแล้ว ✓', error: 'ลองใหม่' }[status];
  return (
    <button type="button" onClick={handleClick} disabled={status === 'loading'}
      style={{
        width: '100%', padding: '11px 0', borderRadius: 10,
        background: status === 'done' ? 'linear-gradient(90deg,#6366f1,#4f46e5)' : status === 'error' ? 'linear-gradient(90deg,#ef4444,#dc2626)' : 'linear-gradient(90deg,#6366f1,#4f46e5)',
        color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        opacity: status === 'loading' ? 0.7 : 1,
      }}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

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
  const [salePerson, setSalePerson] = useState('CA');
  const [showSalePersonPicker, setShowSalePersonPicker] = useState(false);

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
  const brakeLabel   = sacBrake === 'B' ? 'DC Brake' : sacBrake === 'YB' ? 'Manual Brake' : 'None';
  const motorSpeed   = 1500;
  const outSpeed     = sacRatio ? Math.round((motorSpeed / sacRatio) * 10) / 10 : null;
  const shaftSp      = SAC_SHAFT_SPECS[sacSize] || {};
  const torqueVal    = sacSize && sacPower && sacRatio ? SAC_OUTPUT_TORQUE_DB[`${sacSize}-${sacPower}-${sacRatio}`] : null;
  const sizeRowSP    = sacSize && sacPower ? getSizeRow(sacSize, sacPower, false) : null;

  const specRows = [
    ['Gear Type',       sacGearType || '—'],
    ['Frame Size',      sacSize ? `${shaftSp.frameNo || ''}  No.${sacSize}` : '—'],
    ['Power',           sacPower ? `${sacPower} W  (${(sacPower/746).toFixed(2)} HP)` : '—'],
    ['Motor Speed',     '1500 rpm'],
    ['Ratio',           sacRatio ? `${sacRatio} : 1` : '—'],
    ['Output Speed',    outSpeed ? `${outSpeed} rpm` : '—'],
    ['Output Torque',   torqueVal ? `${torqueVal} kg.m` : '—'],
    ['Shaft Dia. (Std)',shaftSp.stdDia ? shaftSp.stdDia.replace('O', '\u00d8') : '—'],
    ['Shaft Dia. (Max)',shaftSp.maxDia ? shaftSp.maxDia.replace('O', '\u00d8') : '—'],
    ['Output Bearing',  shaftSp.bearing || '—'],
    ['Weight',          sizeRowSP ? `${sizeRowSP.weightKg} kg` : '—'],
    ['Supply',          currentLabel],
    ['Brake Unit',      brakeLabel],
    ['Terminal Dir.',   sacTerminal || '—'],
    ['Lead Dir.',       sacLead || '—'],
    ['IP Class',        'IP54'],
    ['Insulation',      'Class F'],
    ['Duty',            'S1'],
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
        body: JSON.stringify({ modelCode, qtyMotor, salePerson, customer: { name: qName, company: qCompany, phone: qPhone, email: qEmail } }),
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
                  <span style={{ fontSize: 11, fontWeight: 600, color: ['Power', 'Output Speed', 'Ratio', 'Output Torque', 'Weight'].includes(k) ? T.specHighlight : T.valueColor, textAlign: 'right', wordBreak: 'break-all' }}>{v}</span>
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
              <SmallACDataSheetButton
                state={state}
                modelCode={modelCode}
                imgSrcs={{
                  gearSrc: (GEAR_TYPES.find(g => g.code === sacGearType) || {}).img,
                  termSrc: SV_GEAR_TYPES.includes(sacGearType)
                    ? (TERMINAL_DIRS.find(d => d.code === sacTerminal) || {}).imgSV
                    : (TERMINAL_DIRS.find(d => d.code === sacTerminal) || {}).img,
                }}
              />
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
            {/* Sale Person Picker */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-slate-600">ผู้ดูแล :</span>
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
                  <>
                    <div className="fixed inset-0 z-[9998]" onClick={() => setShowSalePersonPicker(false)} />
                    <div className="absolute left-0 top-full mt-1 z-[9999] bg-white border border-slate-200 rounded-xl shadow-xl w-[260px] sm:w-[300px] overflow-y-auto max-h-[320px]">
                      {SAC_SALE_PERSONS.map(sp => (
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
                  </>
                )}
              </div>
              {salePerson && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  {SAC_SALE_PERSONS.find(s => s.abbr === salePerson)?.name || salePerson}
                </span>
              )}
            </div>
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

  // jumpToStep — คลิก StepBar แล้ว reset ข้อมูลจาก step นั้นเป็นต้นไป
  const jumpToStep = (stepNum) => {
    if (stepNum <= 1) setGearType(null);
    else if (stepNum <= 2) setSize(null);
    else if (stepNum <= 3) setPower(null);
    else if (stepNum <= 4) setRatio(null);
    else if (stepNum <= 5) setCurrent(null);
    else if (stepNum <= 6) setBrake(null);
    else if (stepNum <= 7) setTerminal(null);
    else if (stepNum <= 8) setLead(null);
  };

  // currentStep — คำนวณ step ปัจจุบัน
  const currentStep = !sacGearType ? 1
    : !sacSize     ? 2
    : !sacPower    ? 3
    : !sacRatio    ? 4
    : !sacCurrent  ? 5
    : sacBrake === null || sacBrake === undefined ? 6
    : !sacTerminal ? 7
    : 8;

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

  // Descriptions for Gear Type buttons
  const GEAR_TYPE_DESCS = {
    SHN: 'แนวนอน ขาตั้ง มาตรฐาน',
    SVN: 'แนวตั้ง ขาตั้ง มาตรฐาน',
    SHM: 'แนวนอน หน้าแปลน',
    SVM: 'แนวตั้ง หน้าแปลน',
    SHD: 'แนวนอน สเกลเฟรม',
    SVD: 'แนวตั้ง สเกลเฟรม',
  };

  // Brake descriptions
  const BRAKE_DESCS = {
    '': 'ไม่มีเบรก เหมาะงานแนวนอนทั่วไป',
    B: 'เบรกแม่เหล็กไฟฟ้า DC ล็อคเมื่อไฟดับ',
    YB: 'เบรกแบบใช้มือ ไม่ต้องใช้ไฟฟ้า',
  };

  // Current descriptions
  const CURRENT_DESCS = {
    S: 'ระบบไฟ 3 เฟส 220–415V กำลังสูง',
    C: 'ระบบไฟ 1 เฟส 220V มีคาปาซิเตอร์',
  };

  // Terminal descriptions
  const TERMINAL_DESCS = {
    G1: 'กล่องขั้วต่อด้านซ้าย',
    G2: 'กล่องขั้วต่อด้านขวา',
    G3: 'กล่องขั้วต่อด้านบน',
    G4: 'กล่องขั้วต่อด้านล่าง',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: '1.5px', color: '#00e5a0', textTransform: 'uppercase' }}>
          ⚙️ Small AC Gear Motor
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => jumpToStep(1)}
            style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.25)', color: '#ff8080', padding: '5px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>
            🔄 Reset
          </button>
          <button type="button" onClick={onHome}
            style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', color: '#00e5a0', padding: '5px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            ⌂ Home
          </button>
        </div>
      </div>

      {/* ── StepBar — แสดงด้านบนตลอดเวลา ── */}
      <StepBar currentStep={currentStep} onJump={jumpToStep} />

      {/* ── STEP 1: Gear Type — 6 cols desktop / 3 cols mobile ── */}
      <Section step={1} title="Gear Type" subtitle="เลือกรุ่นมอเตอร์เกียร์ตามทิศทางติดตั้งและแบบการยึด" cols={gearTypeCols}>
        {GEAR_TYPES.map(g => (
          <ImgCard
            key={g.code}
            img={g.img}
            label={g.label}
            desc={GEAR_TYPE_DESCS[g.code] || ''}
            active={sacGearType === g.code}
            onClick={() => setGearType(g.code)}
          />
        ))}
      </Section>

      {/* ── STEP 2: Size No. ── */}
      {sacGearType && (
        <Section step={2} title="Size No." subtitle="หมายเลขกระปุกเกียร์ — กำหนดขนาดเพลาออก ขนาดโมลลิ่ง และแรงบิดสูงสุด">
          {SIZES.map(s => (
            <PillBtn key={s} label={`No.${s}`} desc={`เพลา Φ${s}mm`} active={sacSize === s} onClick={() => setSize(s)} wide />
          ))}
        </Section>
      )}

      {/* ── STEP 3: Power Motor ── */}
      {sacSize && (
        <Section step={3} title="Power Motor" subtitle="กำลังมอเตอร์ไฟฟ้า — ยิ่งสูงแรงบิดออกยิ่งมาก เลือกให้ตรงกับโหลดงาน">
          {(POWERS_BY_SIZE[sacSize] || []).map(p => (
            <PillBtn key={p} label={`${p}W`} desc={p >= 750 ? `${(p/746).toFixed(2)} HP` : `${p}W`} active={sacPower === p} onClick={() => setPower(p)} wide />
          ))}
        </Section>
      )}

      {/* ── STEP 4: Ratio ── */}
      {sacPower && ratios.length > 0 && (
        <Section step={4} title="Ratio" subtitle="อัตราทดเกียร์ — ยิ่งสูงความเร็วออกยิ่งต่ำ แรงบิดออกยิ่งสูง" note={`(${ratios.length} ค่า)`}>
          {ratios.map(r => {
            const outRpm = Math.round((1500 / r) * 10) / 10;
            return (
              <PillBtn key={r} label={String(r)} desc={`~${outRpm}rpm`} active={sacRatio === r} onClick={() => setRatio(r)} />
            );
          })}
        </Section>
      )}

      {/* ── STEP 5: Motor Current ── */}
      {sacRatio && (
        <Section step={5} title="Motor Current (Supply)" subtitle="เลือกระบบไฟฟ้าให้ตรงกับที่ใช้ในโรงงาน">
          {currentTypes.map(ct => (
            <PillBtn key={ct} label={CURRENT_LABELS[ct]} desc={CURRENT_DESCS[ct] || ''} active={sacCurrent === ct} onClick={() => setCurrent(ct)} wide />
          ))}
        </Section>
      )}

      {/* ── STEP 6: Brake Unit ── */}
      {sacCurrent && (
        <Section step={6} title="Brake Unit" subtitle="เลือกชุดเบรกสำหรับงานที่ต้องล็อคเพลาเมื่อหยุด หรืองานแนวดิ่ง">
          {BRAKE_UNITS.map(b => (
            <PillBtn key={b.code} label={b.label} desc={BRAKE_DESCS[b.code] || ''} active={sacBrake === b.code} onClick={() => setBrake(b.code)} wide />
          ))}
        </Section>
      )}

      {/* ── STEP 7: Terminal Box Direction — 4 cols desktop / 2 cols mobile ── */}
      {sacBrake !== undefined && sacBrake !== null && (
        <Section step={7} title="Terminal Box Direction (from output shaft)" subtitle="ตำแหน่งกล่องขั้วต่อ วัดจากด้านเพลาออก" cols={terminalCols}>
          {TERMINAL_DIRS.map(d => (
            <ImgCard
              key={d.code}
              img={SV_GEAR_TYPES.includes(sacGearType) ? d.imgSV : d.img}
              label={d.label}
              desc={TERMINAL_DESCS[d.code] || ''}
              active={sacTerminal === d.code}
              onClick={() => setTerminal(d.code)}
            />
          ))}
        </Section>
      )}

      {/* ── STEP 8: Lead Direction ── */}
      {sacTerminal && (
        <Section step={8} title="Lead Direction (from output shaft)" subtitle="ทิศทางออกของสายไฟ วัดจากด้านเพลาออก ดูภาพอ้างอิงด้านล่าง">
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
            <PillBtn key={l} label={l} desc={{ LD:'ซ้าย-ลง',LT:'ซ้าย-บน',LF:'ซ้าย-หน้า',LB:'ซ้าย-หลัง',RD:'ขวา-ลง',RT:'ขวา-บน',RF:'ขวา-หน้า',RB:'ขวา-หลัง',TL:'บน-ซ้าย',TR:'บน-ขวา',TF:'บน-หน้า',TB:'บน-หลัง',DL:'ล่าง-ซ้าย',DR:'ล่าง-ขวา',DF:'ล่าง-หน้า',DB:'ล่าง-หลัง' }[l] || ''} active={sacLead === l} onClick={() => setLead(l)} />
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
