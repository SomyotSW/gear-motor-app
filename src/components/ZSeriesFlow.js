// ZSeriesFlow.js
// ─────────────────────────────────────────────────────────────────────────────
// Z Series Gearbox Flow  (ZDY / ZLY / ZSY / ZFY)
// Steps: Type → Size → Ratio → Assembly Type → Summary / Code
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Assets ───────────────────────────────────────────────────────────────────
import ZDYImg   from '../assets/Z/ZDY.png';
import ZLYImg   from '../assets/Z/ZLY.png';
import ZSYImg   from '../assets/Z/ZSY.png';
import ZFYImg   from '../assets/Z/ZFY.png';
import AstypeImg from '../assets/Z/Astype.png';

// ─────────────────────────────────────────────────────────────────────────────
// Data Tables
// ─────────────────────────────────────────────────────────────────────────────
const Z_TYPES = [
  { key: 'ZDY', label: 'ZDY', img: ZDYImg },
  { key: 'ZLY', label: 'ZLY', img: ZLYImg },
  { key: 'ZSY', label: 'ZSY', img: ZSYImg },
  { key: 'ZFY', label: 'ZFY', img: ZFYImg },
];

const SIZES = {
  ZDY: [80,100,125,160,200,250,280,315,355,400,450,500,560],
  ZLY: [112,125,140,160,180,200,224,250,280,315,355,400,450,500,560,630,710],
  ZSY: [160,180,200,224,250,280,315,355,400,450,500,560,630,710],
  ZFY: [180,200,224,250,280,315,355,400,450,500,560,630,710,800],
};

// ZDY Ratios per size  (ZLY / ZSY / ZFY → placeholder แจ้ง TODO)
const RATIOS_ZDY = {
  80:  [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  100: [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  125: [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  160: [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  200: [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  250: [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  280: [1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  315: [1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  355: [1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  400: [2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  450: [2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  500: [2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
  560: [2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6],
};

// TODO: เพิ่ม RATIOS_ZLY, RATIOS_ZSY, RATIOS_ZFY ที่นี่
const RATIOS_ZLY = null; // placeholder
const RATIOS_ZSY = null; // placeholder
const RATIOS_ZFY = null; // placeholder

const RATIOS_MAP = { ZDY: RATIOS_ZDY, ZLY: RATIOS_ZLY, ZSY: RATIOS_ZSY, ZFY: RATIOS_ZFY };

const ASSEMBLY_TYPES = ['I','II','III','IV','V','VI','VII','VIII','IX'];

// ─────────────────────────────────────────────────────────────────────────────
// Code generator
// ─────────────────────────────────────────────────────────────────────────────
export function generateZModelCode(state = {}) {
  const { zType, zSize, zRatio, zAssembly } = state;
  if (!zType) return '';
  const parts = [zType];
  if (zSize)     parts.push(String(zSize));
  if (zRatio)    parts.push(String(zRatio));
  if (zAssembly) parts.push(String(zAssembly));
  return parts.join('-');
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0,  transition: { duration: 0.28, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -40, transition: { duration: 0.18, ease: 'easeIn'  } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18, scale: 0.95 },
  visible: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.045, duration: 0.22, ease: 'easeOut' } }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** 3-D image tile button — ไม่มีกรอบ ภาพใหญ่ มุมโค้ง label ห้อยใต้ */
const Tile3D = ({ img, label, onClick, selected }) => {
  const [pressing, setPressing] = useState(false);
  return (
    <button
      type="button"
      onPointerDown={() => setPressing(true)}
      onPointerUp={() => { setPressing(false); onClick && onClick(); }}
      onPointerLeave={() => setPressing(false)}
      className={`
        flex flex-col items-center gap-2 bg-transparent border-none outline-none
        transition-all duration-150 select-none
        ${pressing ? 'scale-90 brightness-90' : 'hover:-translate-y-1 active:scale-95'}
        ${selected ? 'opacity-100' : 'opacity-90 hover:opacity-100'}
      `}
      style={{ cursor: 'pointer' }}
    >
      {img && (
        <img
          src={img}
          alt={label}
          className="object-cover card-image select-none"
          style={{
            width: '100%',
            height: '160px',
            borderRadius: '12px',
            boxShadow: pressing
              ? '0 2px 8px rgba(0,0,0,0.3)'
              : '0 6px 20px rgba(0,0,0,0.35)',
            transition: 'box-shadow 0.15s',
          }}
          draggable={false}
        />
      )}
      <span className="text-sm font-bold text-white drop-shadow">{label}</span>
    </button>
  );
};

/** Number / text pill button (Size & Ratio) */
const PillBtn = ({ label, onClick, selected }) => {
  const [pressing, setPressing] = useState(false);
  return (
    <button
      type="button"
      onPointerDown={() => setPressing(true)}
      onPointerUp={() => { setPressing(false); onClick && onClick(); }}
      onPointerLeave={() => setPressing(false)}
      className={`
        relative rounded-xl px-3 py-2 text-sm font-bold shadow-md
        border border-white/20 backdrop-blur-sm
        transition-all duration-150 select-none
        ${pressing
          ? 'scale-90 shadow-inner translate-y-0.5 brightness-90'
          : 'hover:-translate-y-0.5 hover:shadow-lg active:scale-95'}
        ${selected
          ? 'bg-blue-500 text-white ring-2 ring-blue-300 scale-105'
          : 'bg-white/20 text-white hover:bg-white/30'}
      `}
      style={{
        boxShadow: pressing
          ? 'inset 0 2px 6px rgba(0,0,0,0.35)'
          : '0 4px 10px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.15) inset',
      }}
    >
      {label}
    </button>
  );
};

/** Breadcrumb / step tracker bar */
const Breadcrumb = ({ steps, onJump }) => (
  <div className="flex flex-wrap items-center gap-1 text-xs text-white/80 mb-2 select-none">
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-white/40">›</span>}
        <button
          type="button"
          onClick={() => s.active && onJump(s.key)}
          className={`px-2 py-0.5 rounded-full transition
            ${s.done
              ? 'bg-blue-500/70 text-white cursor-pointer hover:bg-blue-400'
              : s.current
                ? 'bg-white/30 text-white font-bold cursor-default'
                : 'bg-white/10 text-white/40 cursor-default'}`}
        >
          {s.label}
        </button>
      </React.Fragment>
    ))}
  </div>
);

/** Back button (bottom-left) */
const BackBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="fixed z-30 px-2 py-1 rounded-lg text-xs text-white/80
               bg-black/30 backdrop-blur-sm border border-white/20 shadow
               hover:text-white hover:bg-blue-500/70 hover:shadow-lg
               active:scale-95 transition-all duration-200"
    style={{ left: 'max(1rem, env(safe-area-inset-left))', bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
  >
    ← ย้อนกลับ
  </button>
);

/** Home button (top-right) — SVG icon */
const HomeBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="fixed z-30 w-8 h-8 rounded-full flex items-center justify-center
               bg-black/25 backdrop-blur-sm border border-white/20 shadow
               text-white/70 hover:text-white hover:bg-blue-500 hover:shadow-lg
               active:scale-95 transition-all duration-200"
    style={{ right: 'max(1rem, env(safe-area-inset-right))', top: 'max(1rem, env(safe-area-inset-top))' }}
    title="กลับหน้าหลัก"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
    </svg>
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main render function
// ─────────────────────────────────────────────────────────────────────────────
export function renderZSeriesFlow({ zState = {}, zSetters = {}, onHome, onSubmit }) {
  return (
    <ZSeriesFlow
      zState={zState}
      zSetters={zSetters}
      onHome={onHome}
      onSubmit={onSubmit}
    />
  );
}

function ZSeriesFlow({ zState, zSetters, onHome, onSubmit }) {
  const S = zState || {};
  const { zType, zSize, zRatio, zAssembly } = S;

  // Lightbox state for Astype image
  const [lightbox, setLightbox] = useState(false);

  // ── updater ────────────────────────────────────────────────────────────────
  const update = useCallback((key, value) => {
    if (key === 'goBack') {
      const order = ['zType','zSize','zRatio','zAssembly'];
      let lastIdx = -1;
      for (let i = order.length - 1; i >= 0; i--) {
        if (S[order[i]] != null && S[order[i]] !== '') { lastIdx = i; break; }
      }
      if (lastIdx >= 0) {
        for (let i = lastIdx; i < order.length; i++) {
          const fn = zSetters[`set${order[i].charAt(0).toUpperCase()}${order[i].slice(1)}`];
          if (typeof fn === 'function') fn(null);
        }
      }
      return;
    }
    // Reset downstream when going back to an earlier step
    const order = ['zType','zSize','zRatio','zAssembly'];
    const idx = order.indexOf(key);
    if (idx >= 0) {
      for (let i = idx; i < order.length; i++) {
        const fn = zSetters[`set${order[i].charAt(0).toUpperCase()}${order[i].slice(1)}`];
        if (typeof fn === 'function') fn(i === idx ? value : null);
      }
      return;
    }
    const fn = zSetters[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (typeof fn === 'function') fn(value);
  }, [S, zSetters]);

  const resetAll = useCallback(() => {
    ['zType','zSize','zRatio','zAssembly'].forEach(k => {
      const fn = zSetters[`set${k.charAt(0).toUpperCase()}${k.slice(1)}`];
      if (typeof fn === 'function') fn(null);
    });
  }, [zSetters]);

  const goHome = useCallback(() => { resetAll(); if (typeof onHome === 'function') onHome(); }, [resetAll, onHome]);

  // ── breadcrumb builder ─────────────────────────────────────────────────────
  const buildBreadcrumbs = () => {
    const code = generateZModelCode(S);
    const crumbs = [
      { key: 'zType',     label: zType     ? `Type: ${zType}`         : 'Type',          done: !!zType,     current: !zType },
      { key: 'zSize',     label: zSize     ? `Size: ${zSize}`         : 'Size',          done: !!zSize,     current: !!zType && !zSize },
      { key: 'zRatio',    label: zRatio    ? `Ratio: ${zRatio}`       : 'Ratio',         done: !!zRatio,    current: !!zSize && !zRatio },
      { key: 'zAssembly', label: zAssembly ? `Assembly: ${zAssembly}` : 'Assembly Type', done: !!zAssembly, current: !!zRatio && !zAssembly },
    ];
    if (code) crumbs.push({ key: 'code', label: `Code: ${code}`, done: false, current: false, active: false });
    return crumbs.map(c => ({ ...c, active: c.done }));
  };

  const pageKey = zAssembly ? 'summary' : zRatio ? 'assembly' : zSize ? 'ratio' : zType ? 'size' : 'type';

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1 — Type
  // ─────────────────────────────────────────────────────────────────────────
  if (!zType) {
    return (
      <div className="space-y-3 mt-0">
        <HomeBtn onClick={goHome} />
        <Breadcrumb steps={buildBreadcrumbs()} onJump={(k) => update(k, null)} />
        <h3 className="text-white font-bold drop-shadow">Z Series — เลือกประเภท</h3>
        <AnimatePresence mode="wait">
          <motion.div key="step-type" variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 justify-items-center">
            {Z_TYPES.map((t, i) => (
              <motion.div key={t.key} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                <Tile3D img={t.img} label={t.label} onClick={() => update('zType', t.key)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2 — Size
  // ─────────────────────────────────────────────────────────────────────────
  if (zType && !zSize) {
    const sizeList = SIZES[zType] || [];
    return (
      <div className="space-y-3 mt-0">
        <HomeBtn onClick={goHome} />
        <BackBtn onClick={() => update('goBack', null)} />
        <Breadcrumb steps={buildBreadcrumbs()} onJump={(k) => update(k, null)} />
        <h3 className="text-white font-bold drop-shadow">{zType} — เลือก Size</h3>
        <AnimatePresence mode="wait">
          <motion.div key="step-size" variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="flex flex-wrap gap-2 justify-start">
            {sizeList.map((sz, i) => (
              <motion.div key={sz} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                <PillBtn label={String(sz)} onClick={() => update('zSize', sz)} selected={zSize === sz} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3 — Ratio
  // ─────────────────────────────────────────────────────────────────────────
  if (zType && zSize && !zRatio) {
    const ratioMap = RATIOS_MAP[zType];
    const ratioList = ratioMap ? (ratioMap[zSize] || []) : null;

    return (
      <div className="space-y-3 mt-0">
        <HomeBtn onClick={goHome} />
        <BackBtn onClick={() => update('goBack', null)} />
        <Breadcrumb steps={buildBreadcrumbs()} onJump={(k) => update(k, null)} />
        <h3 className="text-white font-bold drop-shadow">{zType}-{zSize} — เลือก Ratio</h3>
        <AnimatePresence mode="wait">
          <motion.div key="step-ratio" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {ratioList && ratioList.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-start">
                {ratioList.map((r, i) => (
                  <motion.div key={r} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <PillBtn label={String(r)} onClick={() => update('zRatio', r)} selected={zRatio === r} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-yellow-400/20 border border-yellow-300/40 text-yellow-200 p-4 text-sm">
                ⚠️ ข้อมูล Ratio ของ <strong>{zType}</strong> ยังไม่ได้กำหนด — TODO: เพิ่ม RATIOS_{zType} ใน ZSeriesFlow.js
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 4 — Assembly Type
  // ─────────────────────────────────────────────────────────────────────────
  if (zType && zSize && zRatio && !zAssembly) {
    return (
      <div className="space-y-3 mt-0">
        <HomeBtn onClick={goHome} />
        <BackBtn onClick={() => update('goBack', null)} />
        <Breadcrumb steps={buildBreadcrumbs()} onJump={(k) => update(k, null)} />
        <h3 className="text-white font-bold drop-shadow">{zType}-{zSize}-{zRatio} — เลือก Assembly Type</h3>

        {/* Astype reference image — คลิกเพื่อขยาย */}
        <AnimatePresence mode="wait">
          <motion.div key="step-assembly" variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="space-y-3">
            <div className="flex justify-center">
              <motion.img
                src={AstypeImg}
                alt="Assembly Type Reference"
                className="rounded-xl shadow-lg cursor-zoom-in max-h-44 object-contain border border-white/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightbox(true)}
                title="คลิกเพื่อขยาย"
              />
              <span className="absolute text-white/50 text-xs mt-1 select-none" style={{marginTop:'11.5rem'}}>แตะรูปเพื่อขยาย</span>
            </div>

            {/* Assembly type buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 justify-items-center">
              {ASSEMBLY_TYPES.map((at, i) => (
                <motion.div key={at} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                  <PillBtn
                    label={at}
                    onClick={() => update('zAssembly', at)}
                    selected={zAssembly === at}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setLightbox(false)}
            >
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                className="relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(false)}
                  className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white/20 border border-white/30 text-white hover:bg-red-500 transition flex items-center justify-center font-bold shadow-lg"
                >
                  ✕
                </button>
                <img
                  src={AstypeImg}
                  alt="Assembly Type Reference"
                  className="rounded-2xl shadow-2xl max-h-[80vh] max-w-[90vw] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 5 — Summary & Code
  // ─────────────────────────────────────────────────────────────────────────
  if (zType && zSize && zRatio && zAssembly) {
    const code = generateZModelCode(S);

    return (
      <div className="space-y-4 mt-0">
        <HomeBtn onClick={goHome} />
        <BackBtn onClick={() => update('goBack', null)} />
        <Breadcrumb steps={buildBreadcrumbs()} onJump={(k) => update(k, null)} />

        <AnimatePresence mode="wait">
          <motion.div key="step-summary" variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="space-y-4">

            {/* Code display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 200 } }}
              className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-5 text-center"
            >
              <p className="text-white/60 text-sm mb-1">Model Code</p>
              <p className="text-white font-extrabold text-3xl tracking-widest drop-shadow">{code}</p>
            </motion.div>

            {/* Detail table */}
            <div className="grid grid-cols-2 gap-3 text-white text-sm">
              {[
                { label: 'Series Type', value: zType },
                { label: 'Size',        value: zSize },
                { label: 'Ratio',       value: zRatio },
                { label: 'Assembly',    value: zAssembly },
              ].map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="rounded-xl bg-white/10 border border-white/15 p-3"
                >
                  <p className="text-white/50 text-xs mb-0.5">{label}</p>
                  <p className="font-semibold">{value}</p>
                </motion.div>
              ))}
            </div>

            {/* Confirm button */}
            <motion.button
              type="button"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0,  opacity: 1, transition: { delay: 0.35, type: 'spring', stiffness: 180 } }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => typeof onSubmit === 'function' && onSubmit(code, S)}
              className="w-full py-4 rounded-2xl font-bold text-lg tracking-wide
                         bg-gradient-to-r from-blue-500 to-blue-700
                         text-white shadow-xl border border-blue-300/30
                         active:brightness-90 transition-all duration-200"
              style={{ boxShadow: '0 6px 20px rgba(37,99,235,0.45), 0 1px 0 rgba(255,255,255,0.15) inset' }}
            >
              รับไฟล์ 3D .step
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

export default ZSeriesFlow;
