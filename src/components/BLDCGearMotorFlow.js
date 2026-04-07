// BLDCGearMotorFlow.js
// แยกออกจาก MotorFlows.js — pattern เดียวกับ ACGearMotorFlow.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

import BLDCGearmotorImg              from '../assets/bldc/BLDCGearmotor.png';
import HighefficiencyBLDCGearmotorImg from '../assets/bldc/HighefficiencyBLDCGearmotor.png';
import GNBLDCNolImg                  from '../assets/bldc/GNBLDCNol.png';
import GNLBLDCNolImg                 from '../assets/bldc/GNLBLDCNol.png';
import SHIBLDCImg                    from '../assets/bldc/SHIBLDC.png';
import SFHIBLDCImg                   from '../assets/bldc/SFHIBLDC.png';
import SLHIBLDCImg                   from '../assets/bldc/SLHIBLDC.png';
// ── Driver images — HE series ────────────────────────────────────────────────
import C40_200Img   from '../assets/bldc/C40-200S2.png';
import C40_400Img   from '../assets/bldc/C40-400S2.png';
import C40_750Img   from '../assets/bldc/C40-750S2.png';
import C30_400Img   from '../assets/bldc/C30-400C2.png';
// ── Driver images — Normal series ────────────────────────────────────────────
import C20_120Img   from '../assets/bldc/C20-120L2R.png';
import C20_200Img   from '../assets/bldc/C20-200L.png';
import C20_400Img   from '../assets/bldc/C20-400LR.png';

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
      <img src={img} alt={label} className="w-full object-contain"
        style={{ maxHeight: 220, background: '#fff', padding: 8 }} />
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
// ChoiceCard
// ─────────────────────────────────────────────────────────────────────────────
function ChoiceCard({ img, label, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={[
        'relative flex flex-col items-center rounded-xl overflow-hidden shadow cursor-pointer border-2 bg-white/90 transition-all',
        active ? 'border-blue-500 shadow-blue-400/40 ring-2 ring-blue-400' : 'border-transparent hover:border-blue-300',
      ].join(' ')}
      style={{ minWidth: 90 }}
    >
      {img && (
        <img src={img} alt={label} className="w-full object-contain"
          style={{ maxHeight: 160, background: '#fff', padding: 6 }} />
      )}
      <div className={`w-full text-center py-1.5 px-2 ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
        <p className="font-bold text-xs leading-tight">{label}</p>
      </div>
      {active && (
        <span className="absolute top-1 right-1 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-[10px] font-bold">✓</span>
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLDC SPEC DATABASE — ดึงจาก Catalog PDF
// key: `${frame}-${power}W`  เช่น 'Z2BLD-15W'
// ─────────────────────────────────────────────────────────────────────────────
const BLDC_NORMAL_SPEC = {
  // Series 60 (Z2BLD) — 25W
  'Z2BLD-15W': { ratedSpeed:3000, ratedTorque:0.048, maxTorque:0.12, current24V:0.7, current36V:null, current48V:null, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'60×60mm' },
  'Z2BLD-25W': { ratedSpeed:3000, ratedTorque:0.08,  maxTorque:0.18, current24V:1.3, current36V:null, current48V:null, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'60×60mm' },
  // Series 70 (Z3BLD)
  'Z3BLD-30W': { ratedSpeed:3000, ratedTorque:0.096, maxTorque:0.191, current24V:1.7, current36V:1.0, current48V:3.7, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'70×70mm' },
  'Z3BLD-40W': { ratedSpeed:3000, ratedTorque:0.127, maxTorque:0.191, current24V:1.7, current36V:1.0, current48V:3.7, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'70×70mm' },
  // Series 80 (Z4BLD)
  'Z4BLD-40W': { ratedSpeed:3000, ratedTorque:0.127, maxTorque:0.191, current24V:1.7, current36V:1.0, current48V:3.7, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'80×80mm' },
  'Z4BLD-60W': { ratedSpeed:3000, ratedTorque:0.191, maxTorque:0.287, current24V:1.7, current36V:1.0, current48V:3.7, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'80×80mm' },
  // Series 90 GN (Z5BLD-GN)
  'Z5BLD-GN-40W': { ratedSpeed:3000, ratedTorque:0.127, maxTorque:0.191, current24V:1.7, current36V:1.0, current48V:3.7, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'90×90mm (GN)' },
  'Z5BLD-GN-60W': { ratedSpeed:3000, ratedTorque:0.191, maxTorque:0.287, current24V:1.7, current36V:1.0, current48V:3.7, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'90×90mm (GN)' },
  // Series 90 GU (Z5BLD-GU)
  'Z5BLD-GU-60W':  { ratedSpeed:3000, ratedTorque:0.191, maxTorque:0.287, current24V:1.7, current36V:1.0, current48V:3.7, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'90×90mm (GU)' },
  'Z5BLD-GU-90W':  { ratedSpeed:3000, ratedTorque:0.287, maxTorque:0.430, current24V:2.6, current36V:null,current48V:null,ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'90×90mm (GU)' },
  'Z5BLD-GU-120W': { ratedSpeed:3000, ratedTorque:0.382, maxTorque:0.573, current24V:3.5, current36V:2.0, current48V:6.8, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'90×90mm (GU)' },
  // Series 104 (Z6BLD)
  'Z6BLD-200W': { ratedSpeed:3000, ratedTorque:0.636, maxTorque:0.955, current24V:4.7, current36V:2.4, current48V:7.5, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'104×104mm' },
  'Z6BLD-400W': { ratedSpeed:3000, ratedTorque:1.273, maxTorque:1.910, current24V:4.7, current36V:2.4, current48V:7.5, ipClass:'IP40/IP54', voltage:'DC 24/36/48V', frameSize:'104×104mm' },
  // Series 120 (Z7BLD)
  'Z7BLD-750W': { ratedSpeed:3000, ratedTorque:2.387, maxTorque:3.580, current24V:null,current36V:null,current48V:null, ipClass:'IP40/IP54', voltage:'DC 48/220V',    frameSize:'120×120mm' },
};

// HE Series specs
const BLDC_HE_SPEC = {
  // S series
  'S-Z2BLD-30W':   { ratedSpeed:'80~3000', ratedTorque:0.096, maxTorque:0.144, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'60mm' },
  'S-Z3BLD-60W':   { ratedSpeed:'80~3000', ratedTorque:0.191, maxTorque:0.287, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'70mm' },
  'S-Z4BLD-60W':   { ratedSpeed:'80~3000', ratedTorque:0.191, maxTorque:0.287, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'80mm' },
  'S-Z4BLD-120W':  { ratedSpeed:'80~3000', ratedTorque:0.382, maxTorque:0.573, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'80mm' },
  'S-Z5BLD-120W':  { ratedSpeed:'80~3000', ratedTorque:0.382, maxTorque:0.573, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'90mm' },
  'S-Z5BLD-200W':  { ratedSpeed:'80~3000', ratedTorque:0.637, maxTorque:1.150, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'90mm' },
  'S-Z6BLD-200W':  { ratedSpeed:'80~3000', ratedTorque:0.637, maxTorque:1.150, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'100mm' },
  'S-Z6BLD-400W':  { ratedSpeed:'80~3000', ratedTorque:1.273, maxTorque:1.910, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'100mm' },
  'S-Z7BLD-750W':  { ratedSpeed:'80~3000', ratedTorque:2.387, maxTorque:3.580, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'120mm' },
  // SF series
  'SF-Z2BLD-60W':  { ratedSpeed:'80~3000', ratedTorque:0.191, maxTorque:0.287, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'SF2-12' },
  'SF-Z4BLD-120W': { ratedSpeed:'80~3000', ratedTorque:0.382, maxTorque:0.764, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'SF2-15' },
  'SF-Z5BLD-200W': { ratedSpeed:'80~3000', ratedTorque:0.637, maxTorque:1.150, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'SF2-20' },
  'SF-Z6BLD-400W': { ratedSpeed:'80~3000', ratedTorque:1.273, maxTorque:1.910, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'SF2-25' },
  // SL series
  'SL-Z2BLD-100W':  { ratedSpeed:'80~3000', ratedTorque:0.318, maxTorque:0.637, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'60mm' },
  'SL-Z4BLD-200W':  { ratedSpeed:'80~3000', ratedTorque:0.637, maxTorque:1.273, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'80mm' },
  'SL-Z5BLD-400W':  { ratedSpeed:'80~3000', ratedTorque:1.273, maxTorque:1.910, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'90mm' },
  'SL-Z6BLD-750W':  { ratedSpeed:'80~3000', ratedTorque:2.387, maxTorque:3.580, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'104mm' },
  'SL-Z7BLD-1100W': { ratedSpeed:'80~3000', ratedTorque:3.500, maxTorque:7.000, voltage:'AC 220V 50/60Hz', ipClass:'IP54', driver:'C30', frameSize:'120mm' },
};

// ─────────────────────────────────────────────────────────────────────────────
// SALE PERSONS (เหมือน ACGearMotorFlow)
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

// EmailJS config (เหมือน ACGearMotorFlow)
const EMAILJS_SERVICE_ID  = 'service_fwgn6cw';
const EMAILJS_TEMPLATE_ID = 'template_7eppr2x';
const EMAILJS_PUBLIC_KEY  = 'BvIT5-X7LnkaS3LKq';

// map driver button key → รหัสในไฟล์ราคา BLDC
const DRIVER_CODE_MAP = {
  // HE series
  'C40-200S2': 'ZDRV.C40-200S2-BR-001',
  'C40-400S2': 'ZDRV.C40-400S2-BR',
  'C40-750S2': 'ZDRV.C40-750S2-BR',
  'C30-400C2': 'ZDRV.C30-400C2-BDR-A',
  // Normal series
  'C20-120L2R': 'ZBLD.C20-120L2R',
  'C20-200L':   'ZDRV.C20-200L-DR',
  'C20-400LR':  'ZBLD.C20-400LR',
};

// ── Driver options ตาม category และ power ─────────────────────────────────────
// Normal BLDC: power คือตัวเลขจาก bldcPower (number)
// HE BLDC:     power คือตัวเลขจาก bldcPower (number)
function getDriverOptions(isHE, powerW) {
  const w = Number(powerW) || 0;
  if (isHE) {
    // กำหนด C40 variant ตาม watt
    const c40Key = w < 200 ? 'C40-200S2' : w < 400 ? 'C40-400S2' : 'C40-750S2';
    const c40Img = w < 200 ? C40_200Img  : w < 400 ? C40_400Img  : C40_750Img;
    const opts = [{ key: c40Key, img: c40Img }];
    if (w <= 400) opts.push({ key: 'C30-400C2', img: C30_400Img });
    return opts;
  } else {
    // Normal BLDC
    if (w > 120) {
      return [{ key: 'C20-400LR', img: C20_400Img }];
    } else {
      return [
        { key: 'C20-120L2R', img: C20_120Img },
        { key: 'C20-200L',   img: C20_200Img },
      ];
    }
  }
}

// แปลง Blob → base64
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onloadend = () => resolve(String(r.result).split(',')[1]);
    r.readAsDataURL(blob);
  });
}

function getBLDCSpec(state) {
  const { bldcCategory, bldcFrame, bldcPower, bldcHEType } = state;
  if (!bldcFrame || !bldcPower) return null;
  if (bldcCategory === 'HighefficiencyBLDCGearmotor' && bldcHEType) {
    return BLDC_HE_SPEC[`${bldcHEType}-${bldcFrame}-${bldcPower}W`] || null;
  }
  return BLDC_NORMAL_SPEC[`${bldcFrame}-${bldcPower}W`] || null;
}

function getOutputSpeed(motorSpeedCode, ratio) {
  if (!motorSpeedCode || !ratio) return null;
  const speedMap = { '15S':1500,'20S':2000,'30S':3000,'40S':4000 };
  const rpm = speedMap[motorSpeedCode];
  if (!rpm || !Number(ratio)) return null;
  return (rpm / Number(ratio)).toFixed(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// GLB base URL
// ─────────────────────────────────────────────────────────────────────────────
const GLB_BASE = (() => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/model/glb';
  }
  return 'https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev';
})();

(() => {
  if (typeof document === 'undefined') return;
  const id = 'mv-bldc-script';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id; s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
  document.head.appendChild(s);
})();

const ENV_PRESETS_BLDC = [
  { label:'Neutral', value:'neutral',  bg:'linear-gradient(135deg,#5a5a5a,#3a3a3a)' },
  { label:'Legacy',  value:'legacy',   bg:'linear-gradient(135deg,#7a8a9a,#5a6a7a)' },
  { label:'Warm',    value:'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr', bg:'linear-gradient(135deg,#c87a4a,#8a4a2a)' },
  { label:'Studio',  value:'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr', bg:'linear-gradient(135deg,#8a7a9a,#6a5a7a)' },
  { label:'Outdoor', value:'https://modelviewer.dev/shared-assets/environments/pillars_1k.hdr', bg:'linear-gradient(135deg,#5a8a5a,#3a6a3a)' },
  { label:'Moon',    value:'https://modelviewer.dev/shared-assets/environments/moon_1k.hdr', bg:'linear-gradient(135deg,#2a2a5a,#1a1a3a)' },
];

const TINT_COLORS_BLDC = [
  { label:'Default', value:null,      bg:'linear-gradient(135deg,#aaa,#666)' },
  { label:'Silver',  value:'#d0d8e0', bg:'linear-gradient(135deg,#d0d8e0,#9aa8b8)' },
  { label:'Gold',    value:'#ffd060', bg:'linear-gradient(135deg,#ffd060,#c08020)' },
  { label:'Navy',    value:'#2050a0', bg:'linear-gradient(135deg,#4070c0,#103060)' },
  { label:'Red',     value:'#c02030', bg:'linear-gradient(135deg,#e04050,#901020)' },
  { label:'White',   value:'#f0f0f0', bg:'linear-gradient(135deg,#ffffff,#cccccc)' },
];

function useIsMobileBLDC() {
  const [mobile, setMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  React.useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// mapBLDCGlbFilename — แปลง Model Code → ชื่อไฟล์ GLB
//
// Normal BLDC:
//   Z5BLD120-24-GU-30S-5GU18KB  → Z5BLD120W5GUK
//   Z5BLD120-24-GUL-30S-5GU25LC → Z5BLD120W5GUL
//   Z5BLD60-24-GN-30S-5GN18K    → Z5BLD60W5GNK
//   Z5BLD60-24-GNL-30S-5GN18LC  → Z5BLD60W5GNL
//
// HE S:   Z6BLD400-220-GV-30S-6GU200V  → Z6BLD400-220-GV
// HE SF:  Z6BLD400-220-GS-30S-25H30SF  → Z6BLD400-220-GV-SF
// HE SL:  Z6BLD400-220-GSL-30S-6GU30SL → Z6BLD400-220-GV-SL
// ─────────────────────────────────────────────────────────────────────────────
function mapBLDCGlbFilename(modelCode) {
  if (!modelCode || typeof modelCode !== 'string') return modelCode;
  const m = modelCode.trim();

  // ── High-Efficiency (ประกอบด้วย -220-) ──────────────────────────────────
  // ชื่อไฟล์ GLB ไม่มี dash เช่น Z5BLD200220GV, Z5BLD400220GVSL, Z5BLD400220GVSF
  if (m.includes('-220-')) {
    const base = m.split('-220-')[0]; // e.g. Z5BLD200, Z6BLD400
    // HE SL: contains GSL
    if (m.includes('-GSL-')) {
      return `${base}220GVSL`;
    }
    // HE SF: contains GS (but not GSL)
    if (m.includes('-GS-')) {
      return `${base}220GVSF`;
    }
    // HE S: contains GV
    if (m.includes('-GV-')) {
      return `${base}220GV`;
    }
    return m;
  }

  // ── Normal BLDC ────────────────────────────────────────────────────────────
  // format: ZxBLDppp-VV-GT-SS-xGTrSFX
  // parts:  [0]=ZxBLDppp [1]=VV [2]=GT [3]=SS [4]=xGTrSFX
  const parts = m.split('-');
  if (parts.length < 5) return m;

  const motorPart = parts[0]; // e.g. Z5BLD120
  const gearType  = parts[2]; // e.g. GU, GUL, GN, GNL

  // series digit จาก motorPart เช่น Z5BLD → '5'
  const seriesMatch = motorPart.match(/^Z(\d)BLD/);
  const series = seriesMatch ? seriesMatch[1] : '';

  // power จาก motorPart เช่น Z5BLD120 → '120'
  const powerMatch = motorPart.match(/^Z\dBLD(.+)$/);
  const power = powerMatch ? powerMatch[1] : '';

  // ตัดชื่อ frame ส่วน -GN / -GU ออก (Z5BLD-GN, Z5BLD-GU)
  // motorPart อาจเป็น Z5BLD120 อยู่แล้ว (ไม่มี -GN suffix)

  // map GearType → suffix
  const suffixMap = {
    'GU':  'K',
    'GUL': 'L',
    'GN':  'K',
    'GNL': 'L',
  };
  const suffix = suffixMap[gearType] || 'K';

  // base gear type (GU/GN)
  const baseGear = gearType.includes('N') ? 'GN' : 'GU';

  // ผลลัพธ์: ZxBLDpppWxGTsuffix  เช่น Z5BLD120W5GUK
  return `${motorPart}W${series}${baseGear}${suffix}`;
}

function BLDCViewer3D({ modelCode, lightMode = false, T = null }) {
  // Fallback T for standalone usage (e.g. mobile path)
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
  const mvRef = useRef(null);
  const isMobile = useIsMobileBLDC();
  const [ready, setReady] = useState(false);
  const [err, setErr]     = useState(false);
  const [envIdx, setEnvIdx]   = useState(0);
  const [exposure, setExposure] = useState(1.3);
  const [shadow, setShadow]   = useState(0.6);
  const [tintIdx, setTintIdx] = useState(0);
  const [autoLight, setAutoLight] = useState(false);
  const [lightRot, setLightRot]   = useState(0);
  const lightTimer = useRef(null);

  const glbName = mapBLDCGlbFilename(modelCode);

  useEffect(() => {
    setReady(false); setErr(false);
    if (!glbName) return;

    // ใช้ raw filename ไม่ encode (R2 รองรับ - ใน path ปกติ)
    const url = `${GLB_BASE}/${glbName}.glb`;

    let cancelled = false;

    // ── Set src ตรงให้ model-viewer จัดการ load/error เอง ──────────────────
    // ไม่ใช้ fetch HEAD เพราะ Cloudflare R2 public bucket ไม่ส่ง CORS headers
    // สำหรับ HEAD request → browser block → setErr(true) ผิดพลาดใน production
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
      el.addEventListener('load', onLoad);
      el.addEventListener('error', onErr);
      el.__bldcCleanup = () => {
        el.removeEventListener('load', onLoad);
        el.removeEventListener('error', onErr);
      };
    }
    attach();

    return () => { cancelled = true; mvRef.current?.__bldcCleanup?.(); };
  }, [glbName]);

  useEffect(() => {
    if (autoLight) {
      lightTimer.current = setInterval(() => {
        setLightRot(r => { const n=(r+2)%360; if(mvRef.current) mvRef.current.style.setProperty('--env-rotation',n+'deg'); return n; });
      }, 30);
    } else clearInterval(lightTimer.current);
    return () => clearInterval(lightTimer.current);
  }, [autoLight]);

  useEffect(() => { if(mvRef.current) mvRef.current.setAttribute('environment-image', ENV_PRESETS_BLDC[envIdx].value); }, [envIdx]);
  useEffect(() => () => clearInterval(lightTimer.current), []);

  const applyTint = (idx) => {
    setTintIdx(idx);
    const color = TINT_COLORS_BLDC[idx].value;
    const applyColor = () => {
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
    if (ready) applyColor(); else mvRef.current?.addEventListener('load', applyColor, { once:true });
  };

  const isLight = lightMode;
  const S = {
    wrap:     { display:'flex', flexDirection:isMobile?'column':'row', width:'100%', height:'100%', minHeight:0, background:theme.viewerBg, fontFamily:"'Sarabun',sans-serif", transition:'background 0.25s' },
    viewer:   { flex:isMobile?'none':1, height:isMobile?'300px':undefined, minHeight:isMobile?300:0, maxHeight:isMobile?400:undefined, position:'relative', background:theme.viewerBg, overflow:'hidden', transition:'background 0.25s' },
    grid:     { position:'absolute', inset:0, backgroundImage:`linear-gradient(${theme.gridLine} 1px,transparent 1px),linear-gradient(90deg,${theme.gridLine} 1px,transparent 1px)`, backgroundSize:'40px 40px', pointerEvents:'none' },
    mv:       { width:'100%', height:isMobile?'300px':'100%', '--poster-color':'transparent', '--progress-bar-color':theme.accent, background:'transparent', display:'block' },
    ring:     { width:44, height:44, border:`2px solid ${theme.accentFaint}`, borderTopColor:theme.loaderRingColor, borderRadius:'50%', animation:'bldc3d-spin 0.9s linear infinite' },
    loaderBox:{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, background:theme.viewerBg, transition:'background 0.25s' },
    errorBox: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:theme.viewerBg, transition:'background 0.25s' },
    panel:    { width:isMobile?'100%':200, flexShrink:0, background:theme.panelBg, borderLeft:isMobile?'none':theme.panelBorder, borderTop:isMobile?theme.panelBorder:'none', overflowY:'auto', display:'flex', flexDirection:'column', transition:'background 0.25s, border 0.25s' },
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
      <style>{`@keyframes bldc3d-spin{to{transform:rotate(360deg)}}`}</style>
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
            <span style={{fontSize:48}}>📦</span>
            <span style={{fontSize:12, color:theme.labelColor, transition:'color 0.25s'}}>ยังไม่มีไฟล์ 3D</span>
            <span style={{fontSize:9, color:isLight?'#8090a8':'#3a4050', fontFamily:'monospace', textAlign:'center', padding:'0 8px', wordBreak:'break-all', transition:'color 0.25s'}}>
              {`${GLB_BASE}/${glbName}.glb`}
            </span>
          </div>
        )}
        <model-viewer ref={mvRef} src="" alt={glbName} auto-rotate auto-rotate-delay="400" rotation-per-second="18deg" camera-controls touch-action="pan-y" shadow-intensity="1.2" shadow-softness={shadow} environment-image="neutral" exposure={exposure} style={S.mv} />
        {ready && !err && (
          <div style={{position:'absolute',bottom:10,left:0,right:0,textAlign:'center',color:isLight?'rgba(0,0,0,0.2)':'rgba(255,255,255,0.2)',fontSize:10,pointerEvents:'none',transition:'color 0.25s'}}>
            🖱 ลาก = หมุน &nbsp;·&nbsp; Scroll = ซูม
          </div>
        )}
      </div>

      {!isMobile && <div style={S.panel}>
        <div style={S.sec}>
          <div style={S.secT}>สภาพแวดล้อมแสง</div>
          <div style={S.envGrid}>
            {ENV_PRESETS_BLDC.map((env,i)=>(
              <button key={env.value} title={env.label} onClick={()=>setEnvIdx(i)} style={{...S.envBtn(i===envIdx), background:env.bg}}>
                <span style={S.envLabel}>{env.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={S.sec}>
          <div style={S.secT}>ควบคุมแสง</div>
          <div style={S.lrow}><span style={S.llbl}>ความสว่าง</span><input type="range" min={0.5} max={3} step={0.05} value={exposure} style={S.slider} onChange={e=>{const v=parseFloat(e.target.value);setExposure(v);if(mvRef.current)mvRef.current.setAttribute('exposure',v);}}/><span style={S.sliderVal}>{exposure.toFixed(1)}</span></div>
          <div style={S.lrow}><span style={S.llbl}>เงา</span><input type="range" min={0} max={1} step={0.05} value={shadow} style={S.slider} onChange={e=>{const v=parseFloat(e.target.value);setShadow(v);if(mvRef.current)mvRef.current.setAttribute('shadow-softness',v);}}/><span style={S.sliderVal}>{shadow.toFixed(1)}</span></div>
          <div style={{...S.lrow,marginBottom:0}}>
            <span style={S.llbl}>ทิศแสง</span>
            {autoLight ? <span style={{flex:1,fontSize:10,color:theme.accent,transition:'color 0.25s'}}>⟳ หมุนอัตโนมัติ</span> : <input type="range" min={0} max={360} step={1} value={lightRot} style={S.slider} onChange={e=>{const v=parseInt(e.target.value);setLightRot(v);if(mvRef.current)mvRef.current.style.setProperty('--env-rotation',v+'deg');}}/>}
            <span style={S.sliderVal}>{lightRot}°</span>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
            <span style={{fontSize:10, color:theme.labelColor, transition:'color 0.25s'}}>☀️ หมุนแสงอัตโนมัติ</span>
            <button style={S.toggle(autoLight)} onClick={()=>setAutoLight(v=>!v)}><div style={S.toggleDot(autoLight)}/></button>
          </div>
        </div>
        <div style={S.sec}>
          <div style={S.secT}>สีโมเดล</div>
          <div style={S.colorGrid}>
            {TINT_COLORS_BLDC.map((c,i)=>(
              <button key={c.label} title={c.label} onClick={()=>applyTint(i)} style={{...S.swatch(i===tintIdx), background:c.bg}}>
                {i===tintIdx && <span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'white',textShadow:'0 1px 3px rgba(0,0,0,0.8)'}}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>}
    </div>
  );
}

export function generateBLDCModelCode(state) {
  const {
    bldcCategory, bldcFrame, bldcPower, bldcVoltage, bldcGearType,
    bldcSpeed, bldcOption, bldcRatio,
    bldcHEType, bldcSFDiameter
  } = state;

  const series = (bldcFrame?.match(/^Z(\d)BLD/) || [,''])[1];

  // ---------- High-efficiency ----------
  if (bldcCategory === 'HighefficiencyBLDCGearmotor') {
    if (!bldcFrame || !bldcPower || !bldcSpeed) return null;

    // S: ZxBLDxx-220-GV-YS- xGU[r]V
    if (bldcHEType === 'S') {
      if (!bldcRatio) return null;
      const head = `${bldcFrame}${bldcPower}-220-GV-${bldcSpeed}`;
      const tail = `${series}GU${String(bldcRatio).replace(/\.0$/,'')}V`;
      return `${head}-${tail}`;
    }

    // SF: ZxBLDxx-220-GS-YS- [Dia]H[r]SF
    if (bldcHEType === 'SF') {
      if (!bldcSFDiameter || !bldcRatio) return null;
      const head = `${bldcFrame}${bldcPower}-220-GS-${bldcSpeed}`;
      const tail = `${bldcSFDiameter}H${String(bldcRatio).replace(/\.0$/,'')}SF`;
      return `${head}-${tail}`;
    }

    // SL: ZxBLDxx-220-GSL-YS- xGU[r]SL
    if (bldcHEType === 'SL') {
      if (!bldcRatio) return null;
      const head = `${bldcFrame}${bldcPower}-220-GSL-${bldcSpeed}`;
      const tail = `${series}GU${String(bldcRatio).replace(/\.0$/,'')}SL`;
      return `${head}-${tail}`;
    }

    return null;
  }

  // ---------- Normal BLDC (เหมือนเดิม) ----------
  if (!bldcFrame || !bldcPower || !bldcVoltage || !bldcGearType || !bldcSpeed || !bldcRatio) return null;

  const base = bldcGearType.includes('N') ? 'GN' : 'GU';
  const optionSeg = (bldcOption && bldcOption !== 'Standard') ? `-${bldcOption}` : '';
  const suffix = (() => {
    const isZ7_750 = (bldcFrame === 'Z7BLD' && Number(bldcPower) === 750);
    if (bldcGearType === 'GU')  return isZ7_750 ? 'V'  : 'KB';
    if (bldcGearType === 'GUL') return isZ7_750 ? 'L'  : 'LC';
    if (bldcGearType === 'GN')  return 'K';
    if (bldcGearType === 'GNL') return 'LC';
    return 'K';
  })();

  const frameCode = (bldcFrame.match(/^Z\dBLD/) || [''])[0];
  const head = `${frameCode}${bldcPower}-${bldcVoltage}-${bldcGearType}-${bldcSpeed}${optionSeg}`;
  const tail = `${series}${base}${String(bldcRatio).replace(/\.0$/,'')}${suffix}`;
  return `${head}-${tail}`;
}

export function renderBLDCGearFlow(state, setState, onConfirm, onHome, onBack) {
  const {
    // เดิม:
    bldcCategory, bldcFrame, bldcPower, bldcVoltage, bldcGearType,
    bldcSpeed, bldcOption, bldcRatio,
    // [ADD-BLDC-HIGH] ใหม่:
    bldcHEType,     // 'S' | 'SF' | 'SL'  (ใช้เมื่อ bldcCategory === 'HighefficiencyBLDCGearmotor')
    bldcSFDiameter,  // '12'|'14'|'15'|'16'|'20'|'25'  (เฉพาะโหมด SF)
    bldcSelectedImage
  } = state;

  const update = (key, value) => {
    const setter = setState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (setter) setter(value);
  };

  // ---------- Normal BLDC (เหมือนเดิม) ----------
  const framePowerMap = {
    'Z2BLD': [15, 25],
    'Z3BLD': [30, 40],
    'Z4BLD': [40, 60],
    'Z5BLD-GN': [40, 60],
    'Z5BLD-GU': [60, 90, 120],
    'Z6BLD': [200, 400],
    'Z7BLD': [750],
  };
  const frameGearOptions = {
    'Z2BLD': ['GN', 'GNL'],
    'Z3BLD': ['GN', 'GNL'],
    'Z4BLD': ['GN', 'GNL'],
    'Z5BLD-GN': ['GN', 'GNL'],
    'Z5BLD-GU': ['GU', 'GUL'],
    'Z6BLD': ['GU', 'GUL'],
    'Z7BLD': ['GU', 'GUL'],
  };

  // ---------- [ADD-BLDC-HIGH] High-efficiency mappings ----------
  // Step 2 → 3 (Frame → Power) แยกตาม S / SF / SL
  const HE_framePower = {
    S: {
      'Z2BLD': [30],
      'Z3BLD': [60],
      'Z4BLD': [60, 120],
      'Z5BLD': [120, 200],
      'Z6BLD': [200, 400],
      'Z7BLD': [750],
    },
    SF: {
      'Z2BLD': [60],
      'Z4BLD': [120],
      'Z5BLD': [200],
      'Z6BLD': [400],
    },
    SL: {
      'Z2BLD': [100],
      'Z4BLD': [200],
      'Z5BLD': [400],
      'Z6BLD': [750],
      'Z7BLD': [1100],
    }
  };

  // Step 5 (เงื่อนไข Speed text)
  const speedInfo = { '15S': '1500 rpm', '20S': '2000 rpm', '30S': '3000 rpm', '40S': '4000 rpm' };
  // Step 8 (Normal BLDC ratios)
  const normalRatioList = [3, 3.6, 5, 6, 7.5, 9, 10, 12.5, 15, 18, 20, 25, 30, 36, 50, 60, 75, 90, 100, 120, 150, 180, 200];

  // [ADD-BLDC-HIGH] S ratios (มีกรณีพิเศษ)
  const HE_S_baseRatios = [5, 10, 15, 20, 30, 50, 100, 200];
  const HE_S_ratiosForFrame = (frame) => {
    if (frame === 'Z3BLD') return [...HE_S_baseRatios, 360];
    if (frame === 'Z7BLD') return [5, 10, 15, 20, 30, 50]; // ตัด 100,200 ออก
    return HE_S_baseRatios;
  };

  // [ADD-BLDC-HIGH] SF: Diameter options per frame (Step 6)
  const HE_SF_diameterByFrame = {
    'Z2BLD': [{v:'12', label:'Φ12 Standard'}, {v:'14', label:'Φ14 Special'}],
    'Z4BLD': [{v:'15', label:'Φ15 Standard'}, {v:'16', label:'Φ16 Special'}],
    'Z5BLD': [{v:'20', label:'Φ20 Standard (Key 6mm)'}, {v:'20', label:'Φ20 Special (Key 7mm)'}],
    'Z6BLD': [{v:'25', label:'Φ25 Standard (Key 8mm)'}, {v:'25', label:'Φ25 Special (Key 7mm)'}],
  };
  // [ADD-BLDC-HIGH] SF: Ratio list (Step 7)
  const HE_SF_ratios = [7.5, 10, 15, 20, 30, 50];

  // [ADD-BLDC-HIGH] SL ratios (+ กรณีพิเศษ Z7)
  const HE_SL_baseRatios = [5, 7.5, 10, 15, 20, 25, 30, 40, 50];
  const HE_SL_ratiosForFrame = (frame) => {
    if (frame === 'Z7BLD') return [...HE_SL_baseRatios, 100];
    return HE_SL_baseRatios;
  };

  // Helpers
  const seriesDigitFromFrame = (frame) => {
    const m = frame?.match(/^Z(\d)BLD/);
    return m ? m[1] : '';
  };

  const suffixFor = (gearType, frame, power) => {
    const isZ7_750 = (frame === 'Z7BLD' && Number(power) === 750);
    if (gearType === 'GU')   return isZ7_750 ? 'V'  : 'KB';
    if (gearType === 'GUL')  return isZ7_750 ? 'L'  : 'LC';
    if (gearType === 'GN')   return 'K';
    if (gearType === 'GNL')  return 'LC';
    return 'K';
  };

  const canConfirmNormal = !!(bldcCategory === 'BLDCGearmotor' &&
    bldcFrame && bldcPower && bldcVoltage && bldcGearType && bldcSpeed && bldcRatio);

  const canConfirmHE_S = !!(bldcCategory === 'HighefficiencyBLDCGearmotor' && bldcHEType === 'S' &&
    bldcFrame && bldcPower && bldcSpeed && bldcRatio);

  const canConfirmHE_SF = !!(bldcCategory === 'HighefficiencyBLDCGearmotor' && bldcHEType === 'SF' &&
    bldcFrame && bldcPower && bldcSpeed && bldcSFDiameter && bldcRatio);

  const canConfirmHE_SL = !!(bldcCategory === 'HighefficiencyBLDCGearmotor' && bldcHEType === 'SL' &&
    bldcFrame && bldcPower && bldcSpeed && bldcRatio);

  const Section = ({ title, children, note }) => (
    <div className="mt-4">
      <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">{title}</h3>
      {note && <div className="text-sm text-white/80 mb-2">{note}</div>}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
  const Btn = ({ active, onClick, children, smallNote }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-xl shadow ${active ? 'bg-blue-600 text-white' : 'bg-white/90 hover:bg-white'} transition`}>
      <div className="font-semibold">{children}</div>
      {smallNote && <div className="text-xs opacity-70">{smallNote}</div>}
    </button>
  );

  // ---------------- RENDER ----------------
  return (
    <>
      {/* Step 1: เลือกประเภท BLDC (Normal vs High-efficiency) */}
<Section title="SAS BLDC Gear Motor">
  {(() => {
    const isNormal = bldcCategory === "BLDCGearmotor";
    const isHE     = bldcCategory === "HighefficiencyBLDCGearmotor";
    const spring   = { type: "spring", stiffness: 420, damping: 28, bounce: 0.22 };

    return (
      <div className="relative flex items-center justify-center gap-6 min-h-[14rem] w-full">
        {/* BLDC (Normal) */}
        <ThumbCard
          img={BLDCGearmotorImg}
          label="BLDCGearmotor"
          subtitle="DC 24/36/48V • GN/GU"
          active={isNormal}
          animate={{
            opacity: isHE ? 0.15 : 1,     // ถ้าอีกฝั่งถูกเลือก → จาง
            x: isHE ? -28 : 0,            // เลื่อนซ้ายตอนเป็นรอง
            scale: isNormal ? 1.06 : 1.0,
            zIndex: isNormal ? 10 : 0
          }}
          transition={{ ...spring, delay: isNormal ? 0.08 : 0 }}
          onClick={() => {
            update("bldcCategory","BLDCGearmotor");
            // reset chain
            update("bldcHEType", null);
            update("bldcSFDiameter", null);
            update("bldcVoltage", null);
            update("bldcFrame", null);
            update("bldcPower", null);
            update("bldcGearType", null);
            update("bldcSpeed", null);
            update("bldcOption", null);
            update("bldcRatio", null);
          }}
        />

        {/* High-efficiency */}
        <ThumbCard
          img={HighefficiencyBLDCGearmotorImg}
          label="Highefficiency BLDCGearmotor"
          subtitle="AC 220V • S / SF / SL"
          active={isHE}
          animate={{
            opacity: isNormal ? 0.15 : 1,
            x: isNormal ? 28 : 0,         // เลื่อนขวาตอนเป็นรอง
            scale: isHE ? 1.06 : 1.0,
            zIndex: isHE ? 10 : 0
          }}
          transition={{ ...spring, delay: isHE ? 0.08 : 0 }}
          onClick={() => {
            update("bldcCategory","HighefficiencyBLDCGearmotor");
            update("bldcVoltage","220");
            update("bldcHEType", null);
            update("bldcSFDiameter", null);
            update("bldcFrame", null);
            update("bldcPower", null);
            update("bldcGearType", null);
            update("bldcSpeed", null);
            update("bldcOption", null);
            update("bldcRatio", null);
          }}
        />
      </div>
    );
  })()}
</Section>

      {/* --------- Normal BLDC flow (เหมือนเดิม) --------- */}
      {bldcCategory === 'BLDCGearmotor' && (
        <>
          {/* Step 2: Frame */}
          <Section title="Step 2: เลือก Frame Size">
            <Btn active={bldcFrame === 'Z2BLD'} onClick={() => update('bldcFrame','Z2BLD')}>Z2BLD<div className="text-xs">60mm • 15W,25W</div></Btn>
            <Btn active={bldcFrame === 'Z3BLD'} onClick={() => update('bldcFrame','Z3BLD')}>Z3BLD<div className="text-xs">70mm • 30W,40W</div></Btn>
            <Btn active={bldcFrame === 'Z4BLD'} onClick={() => update('bldcFrame','Z4BLD')}>Z4BLD<div className="text-xs">80mm • 40W,60W</div></Btn>
            <Btn active={bldcFrame === 'Z5BLD-GN'} onClick={() => update('bldcFrame','Z5BLD-GN')}>Z5BLD (GN)<div className="text-xs">90mm • 40W,60W</div></Btn>
            <Btn active={bldcFrame === 'Z5BLD-GU'} onClick={() => update('bldcFrame','Z5BLD-GU')}>Z5BLD (GU)<div className="text-xs">90mm • 60W,90W,120W</div></Btn>
            <Btn active={bldcFrame === 'Z6BLD'} onClick={() => update('bldcFrame','Z6BLD')}>Z6BLD<div className="text-xs">104mm • 200W,400W</div></Btn>
            <Btn active={bldcFrame === 'Z7BLD'} onClick={() => update('bldcFrame','Z7BLD')}>Z7BLD<div className="text-xs">120mm • 750W</div></Btn>
          </Section>

          {/* Step 3: Power */}
          {bldcFrame && (
            <Section title="Step 3: เลือกกำลัง (W)">
              {(framePowerMap[bldcFrame] || []).map(p => (
                <Btn key={p} active={bldcPower === p} onClick={() => update('bldcPower', p)}>{p}W</Btn>
              ))}
            </Section>
          )}

          {/* Step 4: Voltage */}
          {bldcPower && (
            <Section title="Step 4: Rated Voltage">
              {['24','36','48'].map(v => (
                <Btn key={v} active={bldcVoltage === v} onClick={() => update('bldcVoltage', v)}>{v}VDC</Btn>
              ))}
            </Section>
          )}

          {/* Step 5: Gear Type (ตาม Frame) — Nol */}
{bldcVoltage && bldcCategory === 'BLDCGearmotor' && (
  <Section title="Step 5: Gear Type (ตาม Frame)">
    {(frameGearOptions[bldcFrame] || []).map(gt => {
      // map รูป: GU ใช้ GN, GUL ใช้ GNL
      const imgMap = { 
        GN: GNBLDCNolImg, 
        GNL: GNLBLDCNolImg,
        GU: GNBLDCNolImg,
        GUL: GNLBLDCNolImg
      };
      const img = imgMap[gt];

      const isActive = (bldcGearType || '').trim().toUpperCase() === gt.trim().toUpperCase();

      const wrapperStyle = {
        transform: isActive ? 'scale(1)' : 'scale(0.5)',
        opacity:   isActive ? 1 : 0.5,
        transition: isActive
          ? 'opacity 320ms ease'
          : 'transform 340ms cubic-bezier(0.22, 0.68, 0, 1.0), opacity 320ms ease',
        animation: isActive ? 'popOvershoot 380ms cubic-bezier(0.22, 0.68, 0, 1.0)' : 'none',
        borderRadius: '14px',
        padding: '4px',
        cursor: 'pointer',
        willChange: 'transform, opacity'
      };

      return (
        <div 
          key={gt} 
          className="inline-block" 
          style={wrapperStyle} 
          onClick={() => update('bldcGearType', gt)}
        >
          {img ? (
            <ChoiceCard
              img={img}
              label={gt}         // ✅ label จะเป็น GU/GUL ตามจริง
              active={isActive}
              onClick={() => update('bldcGearType', gt)}
            />
          ) : (
            <Btn active={isActive} onClick={() => update('bldcGearType', gt)}>
              <span className="inline-block">{gt}</span>
            </Btn>
          )}
        </div>
      );
    })}
  </Section>
)}

          {/* Step 6: Speed */}
          {bldcGearType && (
            <Section title="Step 6: Speed code" note="15S=1500rpm, 20S=2000rpm,  30S=3000rpm">
              {['15S','20S','30S'].map(s => (
                <Btn key={s} active={bldcSpeed === s} onClick={() => update('bldcSpeed', s)}>
                  {s}<div className="text-xs">{speedInfo[s]}</div>
                </Btn>
              ))}
            </Section>
          )}

          {/* Step 7: Motor options */}
          {bldcSpeed && (
            <Section title="Step 7: Motor options" note="M: Electromagnetic brake, BM: Closed loop (encoder/Hall). ถ้าเลือก Standard จะไม่ใส่โค้ดตัวนี้">
              {['Standard','M','BM'].map(opt => (
                <Btn key={opt} active={bldcOption === opt} onClick={() => update('bldcOption', opt)}>{opt}</Btn>
              ))}
            </Section>
          )}

          {/* Step 8: Ratio */}
          {(bldcOption !== undefined && bldcOption !== null) && (
            <Section title="Step 8: Ratio">
              {normalRatioList.map(r => (
                <Btn key={r} active={String(bldcRatio)===String(r)} onClick={() => update('bldcRatio', r)}>{r}</Btn>
              ))}
            </Section>
          )}

          {/* ── Summary Page (Normal BLDC) */}
          {canConfirmNormal && (() => {
            const modelCode = generateBLDCModelCode(state);
            const spec = getBLDCSpec(state);
            const outSpeed = getOutputSpeed(bldcSpeed, bldcRatio);
            return (
              <BLDCSummaryPage
                state={state}
                modelCode={modelCode}
                spec={spec}
                outSpeed={outSpeed}
                onConfirm={onConfirm}
                onBack={onBack}
              />
            );
          })()}
        </>
      )}

      {/* --------- [ADD-BLDC-HIGH] High-efficiency flow --------- */}
      {bldcCategory === 'HighefficiencyBLDCGearmotor' && (
        <>
          {/* Step 1 (HE): เลือกซีรีส์ — ใช้ภาพ S / SF / SL */}
{/* Step 1 (HE): Gear Type */}
<Section title="BLDC High Efficiency Voltage : Gear Type">
  <div className="bldc-group">
    {[
  { img: SHIBLDCImg,  label: 'S'  },
  { img: SFHIBLDCImg, label: 'SF' },
  { img: SLHIBLDCImg, label: 'SL' }
].map(({ img, label }) => {
  const norm = label.trim().toUpperCase();
  const isActive = (bldcHEType || '').trim().toUpperCase() === norm;

  return (
    <div
      key={norm}
      className="bldc-item"
      data-label={norm}
      style={{
        /* ย่อ/จางปุ่มที่ไม่ได้เลือก แต่ยังคลิกได้ */
        transform: isActive ? 'scale(1)' : 'scale(0.5)',
        opacity:   isActive ? 1 : 0.5,

        /* ให้ inactive ย่อ/ขยายลื่น ๆ, active ใช้อนิเมชัน overshoot */
        transition: isActive
          ? 'opacity 320ms ease'
          : 'transform 340ms cubic-bezier(0.22, 0.68, 0, 1.0), opacity 320ms ease',
        animation:  isActive ? 'popOvershoot 380ms cubic-bezier(0.22, 0.68, 0, 1.0)' : 'none',

        /* สไตล์เสริมทั่วไป */
        borderRadius: '14px',
        padding: '4px',
        cursor: 'pointer',
        willChange: 'transform, opacity'
      }}
      onClick={() => {
        const v = norm;
        update('bldcHEType', v);
        if (typeof setBldcHEType === 'function') setBldcHEType(v);
      }}
    >
      <ChoiceCard img={img} label={norm} active={isActive} />
    </div>
  );
})}
  </div>

  {/* DEBUG ชั่วคราว: ดูว่าค่าเปลี่ยนไหม (ลบออกได้) */}
  {/* <pre style={{color:'#fff',fontWeight:'bold'}}>bldcHEType={String(bldcHEType)}</pre> */}
</Section>


          {/* Step 2: Frame (ตาม HE type) */}
          {/* Step 2: Frame (ตาม HE type) */}
{bldcHEType && (
  <Section title=" Frame Size ">
    {Object.keys(HE_framePower[bldcHEType] || {}).map(fr => (   // << เพิ่ม || {}
      <Btn key={fr} active={bldcFrame === fr} onClick={() => {
        update('bldcFrame', fr);
        update('bldcPower', null);
        update('bldcSpeed', null);
        update('bldcRatio', null);
        update('bldcSFDiameter', null);
      }}>
        {fr}
        <div className="text-xs">
          {fr==='Z2BLD'&& (bldcHEType==='S'?'60mm • 30W': bldcHEType==='SF'?'60mm • 60W':'60mm • 100W')}
          {fr==='Z3BLD'&& (bldcHEType==='S'?'70mm • 60W':'')}
          {fr==='Z4BLD'&& (bldcHEType==='S'?'80mm • 60W,120W': bldcHEType==='SF'?'80mm • 120W':'80mm • 200W')}
          {fr==='Z5BLD'&& (bldcHEType==='S'?'90mm • 120W,200W': bldcHEType==='SF'?'90mm • 200W':'90mm • 400W')}
          {fr==='Z6BLD'&& (bldcHEType==='S'?'110mm • 200W,400W': bldcHEType==='SF'?'104mm • 400W':'104mm • 750W')}
          {fr==='Z7BLD'&& (bldcHEType==='S'?'120mm • 750W':'120mm • 1100W')}
        </div>
      </Btn>
    ))}
  </Section>
)}

          {/* Step 3: Power */}
          {bldcHEType && bldcFrame && (
            <Section title="Power Motor (W)">
              {(HE_framePower[bldcHEType][bldcFrame] || []).map(p => (
                <Btn key={p} active={bldcPower === p} onClick={() => update('bldcPower', p)}>{p}W</Btn>
              ))}
            </Section>
          )}

          {/* Step 4: Voltage = 220V AC (fix) */}
          {bldcHEType && bldcFrame && bldcPower && (
            <Section title="Voltage">
              <Btn active={bldcVoltage === '220'} onClick={() => update('bldcVoltage','220')}>220V AC</Btn>
            </Section>
          )}

          {/* Step 5: Speed (15S,20S,30S,40S) */}
{bldcHEType && bldcFrame && bldcPower && bldcVoltage === '220' && (
  <Section title="Output Speed Motor" note="• 15S=1500rpm    • 20S=2000rpm    • 30S=3000rpm(**Standard)    • 40S=4000rpm">
    {['15S','20S','30S','40S'].map(s => (
      <Btn key={s} active={bldcSpeed === s} onClick={() => update('bldcSpeed', s)}>
        {s}<div className="text-xs">{speedInfo[s]}</div>
      </Btn>
    ))}
  </Section>
)}

          {/* Step 6 / 7: ตาม S / SF / SL */}
          {/* S: เลือก Ratio ใน Step 6 (มีกรณีพิเศษ) */}
          {bldcHEType === 'S' && bldcSpeed && (
            <Section title="Ratio">
              {HE_S_ratiosForFrame(bldcFrame).map(r => (
                <Btn key={r} active={String(bldcRatio)===String(r)} onClick={() => update('bldcRatio', r)}>{r}</Btn>
              ))}
            </Section>
          )}

          {/* SF: Step 6 เลือก Shaft Diameter, Step 7 เลือก Ratio */}
          {bldcHEType === 'SF' && bldcSpeed && (
            <>
              <Section title="Diameter Output Shaft">
                {(HE_SF_diameterByFrame[bldcFrame] || []).map(d => (
                  <Btn key={d.label} active={bldcSFDiameter === d.v} onClick={() => update('bldcSFDiameter', d.v)}>
                    {d.label}
                  </Btn>
                ))}
              </Section>
              {bldcSFDiameter && (
                <Section title="Ratio">
                  {HE_SF_ratios.map(r => (
                    <Btn key={r} active={String(bldcRatio)===String(r)} onClick={() => update('bldcRatio', r)}>{r}</Btn>
                  ))}
                </Section>
              )}
            </>
          )}

          {/* SL: เลือก Ratio ใน Step 6 (มีกรณีพิเศษ Z7) */}
          {bldcHEType === 'SL' && bldcSpeed && (
            <Section title="Ratio">
              {HE_SL_ratiosForFrame(bldcFrame).map(r => (
                <Btn key={r} active={String(bldcRatio)===String(r)} onClick={() => update('bldcRatio', r)}>{r}</Btn>
              ))}
            </Section>
          )}

          {/* ── Summary Page (แสดงเมื่อ confirm ครบทุก step) ────────────────── */}
          {(canConfirmHE_S || canConfirmHE_SF || canConfirmHE_SL) && (() => {
            const modelCode = generateBLDCModelCode(state);
            const spec = getBLDCSpec(state);
            const outSpeed = getOutputSpeed(bldcSpeed, bldcRatio);
            return (
              <BLDCSummaryPage
                state={state}
                modelCode={modelCode}
                spec={spec}
                outSpeed={outSpeed}
                onConfirm={onConfirm}
                onBack={onBack}
              />
            );
          })()}
        </>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLDCMobileLightingControls — แสดงบน mobile ใน right panel
// ─────────────────────────────────────────────────────────────────────────────
function BLDCMobileLightingControls() {
  const getMV = () => document.querySelector('model-viewer');
  const [envIdx,   setEnvIdx]   = React.useState(0);
  const [exposure, setExposure] = React.useState(1.3);
  const [shadow,   setShadow]   = React.useState(0.6);
  const [autoLight,setAutoLight]= React.useState(false);
  const lightTimer = React.useRef(null);

  React.useEffect(() => {
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
  React.useEffect(() => () => clearInterval(lightTimer.current), []);

  const sec = { padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' };
  const secT = { fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#4a5060', marginBottom:8 };
  const row = { display:'flex', alignItems:'center', gap:8, marginBottom:6 };
  const lbl = { fontSize:10, color:'#4a5060', width:54, flexShrink:0 };
  const sld = { flex:1, accentColor:'#00e5a0', cursor:'pointer', height:3 };
  const val = { fontSize:10, color:'#e8eaf0', width:28, textAlign:'right', flexShrink:0, fontFamily:'monospace' };

  return (
    <>
      <div style={sec}>
        <div style={secT}>สภาพแวดล้อมแสง</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4 }}>
          {ENV_PRESETS_BLDC.map((env,i) => (
            <button key={env.value} title={env.label} onClick={() => { setEnvIdx(i); const mv=getMV(); if(mv) { try{mv.setAttribute('environment-image',env.value);}catch(e){} } }}
              style={{ aspectRatio:1, borderRadius:5, border:i===envIdx?'2px solid #00e5a0':'2px solid transparent', cursor:'pointer', position:'relative', overflow:'hidden', background:env.bg }}>
              <span style={{ position:'absolute', bottom:0, left:0, right:0, fontSize:6, textAlign:'center', background:'rgba(0,0,0,0.6)', color:'rgba(255,255,255,0.8)' }}>{env.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={sec}>
        <div style={secT}>ควบคุมแสง</div>
        <div style={row}><span style={lbl}>ความสว่าง</span><input type="range" min={0.5} max={3} step={0.05} value={exposure} style={sld} onChange={e=>{const v=parseFloat(e.target.value);setExposure(v);const mv=getMV();if(mv)mv.setAttribute('exposure',v);}}/><span style={val}>{exposure.toFixed(1)}</span></div>
        <div style={row}><span style={lbl}>เงา</span><input type="range" min={0} max={1} step={0.05} value={shadow} style={sld} onChange={e=>{const v=parseFloat(e.target.value);setShadow(v);const mv=getMV();if(mv)mv.setAttribute('shadow-softness',v);}}/><span style={val}>{shadow.toFixed(1)}</span></div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:4 }}>
          <span style={{ fontSize:10, color:'#4a5060' }}>☀️ หมุนแสงอัตโนมัติ</span>
          <button onClick={() => setAutoLight(v=>!v)} style={{ width:34, height:18, background:autoLight?'#00e5a0':'rgba(255,255,255,0.1)', borderRadius:9, position:'relative', cursor:'pointer', border:'none', transition:'background 0.2s' }}>
            <div style={{ position:'absolute', top:2, left:autoLight?16:2, width:14, height:14, borderRadius:'50%', background:'white', transition:'left 0.2s' }} />
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLDCSummaryPage
function BLDCSummaryPage({ state, modelCode, spec, outSpeed, onConfirm, onBack }) {
  const isMobile = useIsMobileBLDC();
  const { bldcCategory, bldcFrame, bldcPower, bldcVoltage, bldcGearType, bldcSpeed, bldcOption, bldcRatio, bldcHEType, bldcSFDiameter } = state;

  const [qtyMotor, setQtyMotor]   = useState(1);
  const [qtyDriver, setQtyDriver] = useState(1);
  const [showQuote, setShowQuote] = useState(false);
  const [qName, setQName]         = useState('');
  const [qCompany, setQCompany]   = useState('');
  const [qPhone, setQPhone]       = useState('');
  const [qEmail, setQEmail]       = useState('');
  const [sending, setSending]     = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [salePerson, setSalePerson]                       = useState('CA');
  const [showSalePersonPicker, setShowSalePersonPicker]   = useState(false);
  const [driverModel, setDriverModel]                     = useState('');     // '' = No Driver, 'C40-200S2' หรือ 'C30-400C2'
  const [hoveredDriver, setHoveredDriver]                 = useState(null);   // key สำหรับแสดงรูป hover

  // ── Theme tokens — dark (default) vs light ──────────────────────────────
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
    qtyLabelColor:   'rgba(13,21,38,0.70)',
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
    gridLine:        'rgba(26,79,214,0.04)',
    viewerBg:        'linear-gradient(135deg,#e8edf5,#dde4f0)',
    loaderRingColor: '#1a4fd6',
    loaderText:      '#8090a8',
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
    qtyLabelColor:   'rgba(255,255,255,0.65)',
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
    gridLine:        'rgba(0,229,160,0.025)',
    viewerBg:        'linear-gradient(135deg,#0a0c10,#0d111c)',
    loaderRingColor: '#00e5a0',
    loaderText:      '#4a5060',
    toggleIcon:      '🌙',
  };

  const isHE = bldcCategory === 'HighefficiencyBLDCGearmotor';
  const voltageLabel = isHE ? 'AC 220V 50/60Hz' : `DC ${bldcVoltage}V`;
  const speedRpmLabel = bldcSpeed ? ({ '15S':'1500 rpm','20S':'2000 rpm','30S':'3000 rpm','40S':'4000 rpm' }[bldcSpeed] || bldcSpeed) : '—';

  const submitQuote = async () => {
    if (!qName || !qCompany || !qPhone || !qEmail) { alert('กรุณากรอกข้อมูลให้ครบทุกช่อง'); return; }
    try {
      setSending(true);

      const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/bldc-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelCode,
          qtyMotor,
          qtyDriver: driverModel !== '' ? qtyDriver : 0,
          driverModel: driverModel !== '' ? (DRIVER_CODE_MAP[driverModel] || driverModel) : '',
          customer: { name: qName, company: qCompany, phone: qPhone, email: qEmail },
          category:   bldcCategory,
          heType:     bldcHEType || '',
          salePerson,
        })
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(msg || 'สร้างใบเสนอราคาไม่สำเร็จ');
      }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);

      const cd    = res.headers.get('content-disposition') || '';
      const match = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)"?/i);
      const filename = match ? decodeURIComponent(match[1]) : 'bldc-quotation.pdf';

      // ── EmailJS ──────────────────────────────────────────────────────────────
      try {
        const pdfBase64 = await blobToBase64(blob);
        const emailParams = {
          to_email:       qEmail,
          requester_name: qName,
          company:        qCompany,
          phone:          qPhone,
          email:          qEmail,
          model_code:     modelCode,
          qty_motor:      String(qtyMotor),
          qty_driver:     String(qtyDriver),
          driver_model:   driverModel !== '' ? (DRIVER_CODE_MAP[driverModel] || driverModel) : 'No Driver',
          qty_driver:     driverModel !== '' ? String(qtyDriver) : '0',
          sale_person:    salePerson || 'CA',
          time:           new Date().toLocaleString('th-TH'),
          pdf_content:    pdfBase64,
          pdf_name:       filename,
        };
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: qEmail },                    EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: 'Chottanin@synergy-as.com' }, EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: 'sas04@synergy-as.com' },     EMAILJS_PUBLIC_KEY);
      } catch (e) {
        console.error('EmailJS send failed:', e);
      }

      // ── Download PDF ─────────────────────────────────────────────────────────
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
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

  const specRows = [
    ['Category',     isHE ? `High-Efficiency BLDC (${bldcHEType})` : 'Standard BLDC'],
    ['Frame',        bldcFrame?.replace('-GN','').replace('-GU','') || '—'],
    ['Power',        bldcPower ? `${bldcPower} W` : '—'],
    ['Voltage',      voltageLabel],
    ['Motor Speed',  speedRpmLabel],
    ['Gear Type',    bldcHEType === 'SF' ? 'Right Angle (SF)' : bldcHEType === 'SL' ? 'Parallel Hollow (SL)' : bldcGearType || '—'],
    ['Ratio',        bldcRatio ? `${bldcRatio} : 1` : '—'],
    ['Output Speed', outSpeed ? `${outSpeed} rpm` : '—'],
    ...(bldcHEType === 'SF' ? [['Shaft Dia.',`Ø${bldcSFDiameter} mm`]] : []),
    ...(spec ? [
      ['Rated Speed',   `${spec.ratedSpeed} rpm`],
      ['Rated Torque',  `${spec.ratedTorque} N·m`],
      ['Max Torque',    `${spec.maxTorque} N·m`],
      ['IP Class',      spec.ipClass],
      ...(spec.driver ? [['Driver Series', spec.driver]] : []),
    ] : []),
    ['Option',       bldcOption && bldcOption !== 'Standard' ? bldcOption : 'Standard'],
  ];

  return (
    <>
      <div id="bldc-summary" style={{ position:'fixed', inset:0, zIndex:500, display:'flex', flexDirection:'column', background:T.pageBg, fontFamily:"'Sarabun',sans-serif", transition:'background 0.25s' }}>

        {/* Top bar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 18px', borderBottom:T.topBarBorder, background:T.topBarBg, backdropFilter:'blur(12px)', flexShrink:0, flexWrap:'wrap', gap:8, transition:'background 0.25s, border 0.25s' }}>
          {/* Left: title + theme toggle */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'1.5px', color:T.titleColor, textTransform:'uppercase', transition:'color 0.25s' }}>
              ⚡ BLDC Gear Motor
            </span>
            {/* Light / Dark toggle button */}
            <button
              type="button"
              title={lightMode ? 'Switch to Dark mode' : 'Switch to Light mode'}
              onClick={() => setLightMode(m => !m)}
              style={{
                display:'flex', alignItems:'center', justifyContent:'center',
                width:28, height:28, borderRadius:8,
                background: T.accentFaint,
                border: `1px solid ${T.accentBorder}`,
                cursor:'pointer', fontSize:15, lineHeight:1,
                transition:'background 0.2s, border 0.2s',
                flexShrink:0,
              }}
            >
              {T.toggleIcon}
            </button>
          </div>

          {/* Center: model code + copy */}
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontFamily:'monospace', fontSize:12, fontWeight:600, color:T.codeColor, background:T.codeBg, border:T.codeBorder, padding:'3px 10px', borderRadius:5, transition:'all 0.25s' }}>
              {modelCode || '—'}
            </span>
            <button type="button"
              style={{ background:'none', border:'none', cursor:'pointer', color:T.accent, fontSize:11, padding:'3px 8px', borderRadius:4, transition:'color 0.25s' }}
              onClick={async () => { try { if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(modelCode||''); } catch{} }}
            >Copy</button>
          </div>

          {/* Right: back button */}
          <button type="button" onClick={onBack}
            style={{ background:T.backBtnBg, border:T.backBtnBorder, color:T.backBtnColor, padding:'4px 12px', borderRadius:6, cursor:'pointer', fontSize:11, fontWeight:600, transition:'all 0.25s' }}>
            ← ย้อนกลับ
          </button>
        </div>

        {/* Body */}
        <div style={{ flex:1, display:'flex', flexDirection:isMobile?'column':'row', minHeight:0, overflow:isMobile?'auto':'hidden' }}>

          {/* 3D Viewer */}
          <div style={{ flex:isMobile?'none':1, height:isMobile?'300px':undefined, minHeight:isMobile?300:0, maxHeight:isMobile?400:undefined, minWidth:0 }}>
            <BLDCViewer3D modelCode={modelCode} lightMode={lightMode} T={T} />
          </div>

          {/* Right Panel */}
          <div style={{ width:isMobile?'100%':280, flexShrink:0, background:T.panelBg, borderLeft:isMobile?'none':T.panelBorder, borderTop:isMobile?T.panelBorder:'none', overflowY:'auto', display:'flex', flexDirection:'column', transition:'background 0.25s, border 0.25s' }}>

            {/* Mobile: lighting controls inline */}
            {isMobile && <BLDCMobileLightingControls />}

            {/* Specs */}
            <div style={{ padding:'14px 16px', borderBottom:T.sectionDivider }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:T.sectionHeadColor, marginBottom:10, transition:'color 0.25s' }}>ข้อมูลจำเพาะ</div>
              {specRows.map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'5px 0', borderBottom:`1px solid ${lightMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`, gap:6 }}>
                  <span style={{ fontSize:11, color:T.labelColor, flexShrink:0, transition:'color 0.25s' }}>{k}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:['Power','Output Speed','Ratio'].includes(k) ? T.specHighlight : T.valueColor, textAlign:'right', wordBreak:'break-all', transition:'color 0.25s' }}>{v||'—'}</span>
                </div>
              ))}
            </div>

            {/* Driver selector — options ขึ้นอยู่กับ HE/Normal + watt */}
            {(() => {
              const driverOpts = getDriverOptions(isHE, bldcPower);
              // reset driverModel ถ้าปุ่มที่เลือกไว้ไม่อยู่ใน options ใหม่
              const validKeys = driverOpts.map(o => o.key);
              return (
                <div style={{ padding:'14px 16px', borderBottom:T.sectionDivider }}>
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:T.sectionHeadColor, marginBottom:8, transition:'color 0.25s' }}>Driver</div>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    {/* No Driver */}
                    <button type="button"
                      onClick={() => setDriverModel('')}
                      style={{ padding:'3px 9px', borderRadius:5, border:'1px solid', borderColor:driverModel===''?T.accent:'rgba(128,128,128,0.2)', background:driverModel===''?T.accentFaint:'rgba(128,128,128,0.05)', color:driverModel===''?T.accent:T.labelColor, fontSize:11, cursor:'pointer', transition:'all 0.2s' }}>
                      No Driver
                    </button>
                    {/* Driver options */}
                    {driverOpts.map(({key, img}) => (
                      <button key={key} type="button"
                        onClick={() => {
                          if (isMobile) {
                            if (hoveredDriver === key) { setDriverModel(key); setHoveredDriver(null); }
                            else { setHoveredDriver(key); }
                          } else {
                            setDriverModel(key);
                          }
                        }}
                        onMouseEnter={() => !isMobile && setHoveredDriver(key)}
                        onMouseLeave={() => !isMobile && setHoveredDriver(null)}
                        style={{ position:'relative', padding:'3px 9px', borderRadius:5, border:'1px solid', borderColor:driverModel===key?T.accent:'rgba(128,128,128,0.2)', background:driverModel===key?T.accentFaint:'rgba(128,128,128,0.05)', color:driverModel===key?T.accent:T.labelColor, fontSize:11, cursor:'pointer', transition:'all 0.2s' }}>
                        {key}
                        {hoveredDriver === key && (
                          <div style={{ position:'fixed', left:'50%', top:'50%', transform:'translate(-50%,-50%)', zIndex:9999, pointerEvents:'none' }}>
                            <img src={img} alt={key}
                              style={{ width:200, height:240, objectFit:'contain', borderRadius:8, boxShadow:'0 8px 32px rgba(0,0,0,0.8)', border:'2px solid rgba(255,255,255,0.8)', background:'#fff' }} />
                            {isMobile && (
                              <div style={{ textAlign:'center', marginTop:6, fontSize:10, color:'rgba(255,255,255,0.7)' }}>แตะอีกครั้งเพื่อเลือก</div>
                            )}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {/* แจ้งเตือนถ้าตัวเลือกเปลี่ยน */}
                  {driverModel !== '' && !validKeys.includes(driverModel) && (
                    <div style={{ marginTop:6, fontSize:10, color:'#f59e0b' }}>
                      ⚠ Driver ที่เลือกไว้ไม่รองรับ กรุณาเลือกใหม่
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Qty */}
            <div style={{ padding:'14px 16px', borderBottom:T.sectionDivider }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:T.sectionHeadColor, marginBottom:10, transition:'color 0.25s' }}>จำนวน</div>
              {/* Motor qty */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ fontSize:12, color:T.qtyLabelColor, transition:'color 0.25s' }}>BLDC Motor</span>
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <button type="button" onClick={()=>setQtyMotor(q=>Math.max(1,q-1))} style={{ width:26, height:26, borderRadius:5, border:T.btnBorder, background:T.btnBg, color:T.btnColor, cursor:'pointer', fontSize:15, transition:'all 0.25s' }}>–</button>
                  <input type="number" min={1} max={999} value={qtyMotor}
                    onChange={e=>{const v=Number(e.target.value);setQtyMotor(Number.isFinite(v)?Math.max(1,Math.floor(v)):1);}}
                    onWheel={e=>e.currentTarget.blur()}
                    style={{ width:38, textAlign:'center', background:T.inputBg, border:T.inputBorder, borderRadius:5, color:T.inputColor, fontSize:13, fontWeight:700, padding:'2px 0', transition:'all 0.25s' }} />
                  <button type="button" onClick={()=>setQtyMotor(q=>Math.min(999,q+1))} style={{ width:26, height:26, borderRadius:5, border:T.btnBorder, background:T.btnBg, color:T.btnColor, cursor:'pointer', fontSize:15, transition:'all 0.25s' }}>+</button>
                </div>
              </div>
              {/* Driver qty — แสดงเฉพาะเมื่อเลือก Driver */}
              {driverModel !== '' && (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                  <span style={{ fontSize:12, color:T.qtyLabelColor, transition:'color 0.25s' }}>Driver ({driverModel})</span>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <button type="button" onClick={()=>setQtyDriver(q=>Math.max(1,q-1))} style={{ width:26, height:26, borderRadius:5, border:T.btnBorder, background:T.btnBg, color:T.btnColor, cursor:'pointer', fontSize:15, transition:'all 0.25s' }}>–</button>
                    <input type="number" min={1} max={999} value={qtyDriver}
                      onChange={e=>{const v=Number(e.target.value);setQtyDriver(Number.isFinite(v)?Math.max(1,Math.floor(v)):1);}}
                      onWheel={e=>e.currentTarget.blur()}
                      style={{ width:38, textAlign:'center', background:T.inputBg, border:T.inputBorder, borderRadius:5, color:T.inputColor, fontSize:13, fontWeight:700, padding:'2px 0', transition:'all 0.25s' }} />
                    <button type="button" onClick={()=>setQtyDriver(q=>Math.min(999,q+1))} style={{ width:26, height:26, borderRadius:5, border:T.btnBorder, background:T.btnBg, color:T.btnColor, cursor:'pointer', fontSize:15, transition:'all 0.25s' }}>+</button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column', gap:8 }}>
              <button type="button"
                style={{ width:'100%', padding:'11px 0', borderRadius:10, background: lightMode ? 'linear-gradient(90deg,#1a4fd6,#1040b8)' : 'linear-gradient(90deg,#00e5a0,#00c87a)', color: lightMode ? '#ffffff' : '#0a1a10', fontWeight:700, fontSize:14, border:'none', cursor:'pointer', transition:'background 0.25s, color 0.25s' }}
                onClick={()=>setShowQuote(true)}>
                🛒 ขอใบเสนอราคา
              </button>
              <button type="button"
                style={{ width:'100%', padding:'11px 0', borderRadius:10, background:'linear-gradient(90deg,#4080ff,#2060dd)', color:'white', fontWeight:700, fontSize:14, border:'none', cursor:'pointer' }}
                onClick={()=>{ if(modelCode) onConfirm(modelCode); }}>
                📦 รับไฟล์ 3D (.STEP)
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Quote Modal — เหมือน ACGearMotorFlow */}
      {showQuote && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => !sending && setShowQuote(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-xl p-6 text-slate-900">

            {/* Header + Sale Person picker */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h3 className="text-xl font-bold">ขอใบเสนอราคา BLDC</h3>
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

            {/* Form — 1 column เหมือน AC */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm mb-1">ชื่อผู้ขอราคา :</label>
                <input value={qName} onChange={e => setQName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm mb-1">ชื่อบริษัท :</label>
                <input value={qCompany} onChange={e => setQCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm mb-1">เบอร์ติดต่อ :</label>
                <input value={qPhone} onChange={e => setQPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm mb-1">Email :</label>
                <input type="email" value={qEmail} onChange={e => setQEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
            </div>

            {/* Model info */}
            <div className="mt-4 text-sm text-slate-600">
              <div>Model: <b className="text-blue-700">{modelCode}</b></div>
              <div className="flex gap-4 mt-1 flex-wrap">
                <span>Motor: <b>{qtyMotor}</b> ตัว</span>
                {driverModel !== '' ? (
                  <span>Driver ({DRIVER_CODE_MAP[driverModel] || driverModel}): <b>{qtyDriver}</b> ตัว</span>
                ) : (
                  <span className="text-slate-400">Driver: ไม่เลือก</span>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowQuote(false)}
                disabled={sending}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
              >
                ปิด
              </button>
              <button
                type="button"
                onClick={submitQuote}
                disabled={sending || !qName || !qCompany || !qPhone || !qEmail}
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
