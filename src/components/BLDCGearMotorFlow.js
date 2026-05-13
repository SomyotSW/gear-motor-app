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
  { abbr: 'PW',  name: 'Mr.Parada W.(PW)',       position: 'Sale Engineer',                 phone: '088-9404948' },
  { abbr: 'SI',  name: 'Ms.Suphak I.(SI)',       position: 'Sale Exclusive',                phone: '096-0787776' },
  { abbr: 'NM',  name: 'Mr.Naphaphat M.(NM)',    position: 'Sale Exclusive',                 phone: '065-7176332' },
  { abbr: 'SK',  name: 'Mr.Sanya K.(SK)',        position: 'Sale Supervisor',               phone: '086-9819616' },
  { abbr: 'PL',  name: 'Mr.Pongsakorn L.(PL)',   position: 'Sale Engineer',                 phone: '063-2159056' },
  { abbr: 'TL',  name: 'Ms.Tanawee L.(TL)',      position: 'Sale Supervisor',               phone: '092-2715372' },
  { abbr: 'NR',  name: 'Ms.Nantida R.(NR)',      position: 'Sale Exclusive',                 phone: '098-2711425' },
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
// ═════════════════════════════════════════════════════════════════════════════
// BLDC DataSheet PDF Generator
// ข้อมูลมาจาก: BRUSHLESS DC MOTOR - SAS TRANSMISSION
//              HIGH EFFICIENCY BRUSHLESS MOTOR SAS TRANSMISSION
// ═════════════════════════════════════════════════════════════════════════════

async function loadJsPDFBLDC() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  await new Promise((res) => {
    if (document.getElementById('jspdf-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = res; document.head.appendChild(s);
  });
  await new Promise((res) => {
    if (document.getElementById('jspdf-autotable-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-autotable-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
    s.onload = res; document.head.appendChild(s);
  });
  return window.jspdf?.jsPDF || window.jsPDF;
}

// ── Catalog performance data: Normal BLDC (Z-series) ─────────────────────────
// Source: BRUSHLESS DC MOTOR - SAS TRANSMISSION catalog
// ratedTorque/maxTorque ใน N·m, current ใน A, gearRatioParallel/LType ช่วงที่ใช้ได้
const BLDC_CATALOG_NORMAL = {
  'Z2BLD-15W':  {
    frameCode:'Z2BLD', series:'60', frameSize:'60×60mm', powerW:15,
    ratedTorque:0.048, maxTorque:0.12, instMaxTorque:0.12,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'0.7A (rated)', '36V':'—', '48V':'1.7A (inst.max)' },
    speedControl:'200~3000 rpm (adjustable via driver)', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'5~200',
    gearTypeParallel:'2GN□K (Parallel, GN)', gearTypeLType:'2GNL□C/RC/RT',
    driverNormal:'ZBLD.C20 series (120W/200W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'115×115mm t5mm',
    remarks:'Power supply: DC 24V / 36V / 48V (optional)',
  },
  'Z2BLD-25W':  {
    frameCode:'Z2BLD', series:'60', frameSize:'60×60mm', powerW:25,
    ratedTorque:0.08, maxTorque:0.18, instMaxTorque:0.18,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'1.3A (rated)', '36V':'—', '48V':'2.6A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'5~200',
    gearTypeParallel:'2GN□K', gearTypeLType:'2GNL□C/RC/RT',
    driverNormal:'ZBLD.C20 series (120W/200W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'115×115mm t5mm',
    remarks:'Power supply: DC 24V / 36V / 48V (optional)',
  },
  'Z3BLD-40W':  {
    frameCode:'Z3BLD', series:'70', frameSize:'70×70mm', powerW:40,
    ratedTorque:0.127, maxTorque:0.191, instMaxTorque:0.191,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'1.7A', '36V':'1.0A', '48V':'3.7A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'5~100',
    gearTypeParallel:'3GN□K', gearTypeLType:'3GNL□C/RC/RT',
    driverNormal:'ZBLD.C20 series (120W/200W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'135×135mm t5mm',
    remarks:'Suitable for 24VDC/36VDC/48VDC power supply',
  },
  'Z4BLD-40W':  {
    frameCode:'Z4BLD', series:'80', frameSize:'80×80mm', powerW:40,
    ratedTorque:0.127, maxTorque:0.191, instMaxTorque:0.191,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'1.7A', '36V':'1.0A', '48V':'3.7A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'5~100',
    gearTypeParallel:'4GN□K', gearTypeLType:'4GNL□C/RC/RT',
    driverNormal:'ZBLD.C20 series (200W/400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'135×135mm t5mm',
    remarks:'Suitable for 24VDC/36VDC/48VDC power supply',
  },
  'Z4BLD-60W':  {
    frameCode:'Z4BLD', series:'80', frameSize:'80×80mm', powerW:60,
    ratedTorque:0.191, maxTorque:0.287, instMaxTorque:0.287,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'1.7A', '36V':'1.0A', '48V':'3.7A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'5~100',
    gearTypeParallel:'4GN□K', gearTypeLType:'4GNL□C/RC/RT',
    driverNormal:'ZBLD.C20 series (400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'135×135mm t5mm',
    remarks:'Suitable for 24VDC/36VDC/48VDC power supply',
  },
  'Z5BLD-GN-40W': {
    frameCode:'Z5BLD-GN', series:'90 (GN)', frameSize:'90×90mm (GN type)', powerW:40,
    ratedTorque:0.127, maxTorque:0.191, instMaxTorque:0.191,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'1.7A', '36V':'1.0A', '48V':'3.7A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'5~100',
    gearTypeParallel:'5GN□K', gearTypeLType:'5GNL□C/RC/RT',
    driverNormal:'ZBLD.C20 series (200W/400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'135×135mm t5mm',
    remarks:'GN type (General helical gear)',
  },
  'Z5BLD-GN-60W': {
    frameCode:'Z5BLD-GN', series:'90 (GN)', frameSize:'90×90mm (GN type)', powerW:60,
    ratedTorque:0.191, maxTorque:0.287, instMaxTorque:0.287,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'1.7A', '36V':'1.0A', '48V':'3.7A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'5~100',
    gearTypeParallel:'5GN□K', gearTypeLType:'5GNL□C/RC/RT',
    driverNormal:'ZBLD.C20 series (400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'135×135mm t5mm',
    remarks:'GN type (General helical gear)',
  },
  'Z5BLD-GU-60W': {
    frameCode:'Z5BLD-GU', series:'90 (GU)', frameSize:'90×90mm (GU type)', powerW:60,
    ratedTorque:0.191, maxTorque:0.287, instMaxTorque:0.287,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'1.7A', '36V':'1.0A', '48V':'3.7A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'7.5~180',
    gearTypeParallel:'5GU□K/KB', gearTypeLType:'5GUL□RC/RT',
    driverNormal:'ZBLD.C20 series (400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'135×135mm t5mm',
    remarks:'GU type (Reinforced helical gear) - higher torque capacity',
  },
  'Z5BLD-GU-90W': {
    frameCode:'Z5BLD-GU', series:'90 (GU)', frameSize:'90×90mm (GU type)', powerW:90,
    ratedTorque:0.287, maxTorque:0.430, instMaxTorque:0.430,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'2.6A', '36V':'—', '48V':'—' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'7.5~180',
    gearTypeParallel:'5GU□K/KB', gearTypeLType:'5GUL□RC/RT',
    driverNormal:'ZBLD.C20 series (400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'135×135mm t5mm',
    remarks:'GU type (Reinforced helical gear)',
  },
  'Z5BLD-GU-120W': {
    frameCode:'Z5BLD-GU', series:'90 (GU)', frameSize:'90×90mm (GU type)', powerW:120,
    ratedTorque:0.382, maxTorque:0.573, instMaxTorque:0.764,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'3.5A', '36V':'2.0A', '48V':'6.8A (inst.max)' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'7.5~180',
    gearTypeParallel:'5GU□K/KB', gearTypeLType:'5GUL□RC/RT',
    driverNormal:'ZBLD.C20 series (400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'165×165mm t5mm',
    remarks:'GU type - requires Aluminum Heat Sink 165x165mm t5mm',
  },
  'Z6BLD-200W': {
    frameCode:'Z6BLD', series:'104', frameSize:'104×104mm', powerW:200,
    ratedTorque:0.636, maxTorque:0.955, instMaxTorque:1.150,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'4.7A', '36V':'2.4A', '48V':'7.5A' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'7.5~180',
    gearTypeParallel:'6GU□K/KB', gearTypeLType:'6GUL□RC/RT',
    driverNormal:'ZBLD.C20 series (400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'200×200mm t5mm',
    remarks:'Requires Aluminum Heat Sink 200x200mm t5mm',
  },
  'Z6BLD-400W': {
    frameCode:'Z6BLD', series:'104', frameSize:'104×104mm', powerW:400,
    ratedTorque:1.273, maxTorque:1.910, instMaxTorque:1.910,
    voltageOptions:['DC 24V','DC 36V','DC 48V'],
    ratedCurrent:{ '24V':'4.7A', '36V':'2.4A', '48V':'7.5A' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'7.5~180',
    gearTypeParallel:'6GU□K/KB', gearTypeLType:'6GUL□RC/RT',
    driverNormal:'ZBLD.C20 series (400W)',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'200×200mm t5mm',
    remarks:'Requires Aluminum Heat Sink 200x200mm t5mm',
  },
  'Z7BLD-750W': {
    frameCode:'Z7BLD', series:'120', frameSize:'120×120mm', powerW:750,
    ratedTorque:2.387, maxTorque:3.580, instMaxTorque:3.580,
    voltageOptions:['DC 48V','DC 220V'],
    ratedCurrent:{ '48V':'—', '220V':'—' },
    speedControl:'200~3000 rpm', speedChange:'+/-1.0% (load)',
    gearRatioParallel:'3~200', gearRatioLType:'7.5~180',
    gearTypeParallel:'7GU□K/KB/V', gearTypeLType:'7GUL□RC/RT',
    driverNormal:'ZBLD.C20 series (800W) / C30 series',
    brushlessLife:'No brushes - Maintenance-free',
    ip:'IP40 / IP54', heatSinkSize:'300×300mm t6mm',
    remarks:'High voltage option: DC 220V - requires large Heat Sink',
  },
};

// ── Catalog performance data: High-Efficiency BLDC (S/SF/SL series) ──────────
// Source: HIGH EFFICIENCY BRUSHLESS MOTOR SAS TRANSMISSION catalog
const BLDC_CATALOG_HE = {
  // S series — Parallel shaft gear reducer
  'S-Z2BLD-30W': {
    frameCode:'Z2BLD', series:'S', subType:'S (Parallel)', frameSize:'60×60mm', powerW:30,
    ratedTorque:0.096, maxTorque:0.144, instMaxTorque:0.144,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2% (full speed range)',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200',
    gearTypeParallel:'2GU□V (S series — Parallel shaft)',
    driver:'C30 series (ZDRV.C30)',
    outputSpeeds_3000rpm:{ '5':600,'10':300,'15':200,'20':150,'30':100,'50':60,'100':30,'200':15 },
    ip:'IP54', heatSinkSize:'115×115mm t5mm',
    energySaving:'~23% less power than 3-phase induction motor + inverter',
    holdingTorque:'Up to 50% of rated torque (at standstill)',
    multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z3BLD-60W': {
    frameCode:'Z3BLD', series:'S', subType:'S (Parallel)', frameSize:'70×70mm', powerW:60,
    ratedTorque:0.191, maxTorque:0.287, instMaxTorque:0.287,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2% (full speed range)',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200, 360',
    gearTypeParallel:'3GU□V (S series — Parallel shaft)',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'135×135mm t5mm',
    energySaving:'~23% less power than 3-phase inverter motor',
    holdingTorque:'Up to 50% of rated torque (at standstill)',
    multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z4BLD-60W': {
    frameCode:'Z4BLD', series:'S', subType:'S (Parallel)', frameSize:'80×80mm', powerW:60,
    ratedTorque:0.191, maxTorque:0.287, instMaxTorque:0.287,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200',
    gearTypeParallel:'4GU□V',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'135×135mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque', multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z4BLD-120W': {
    frameCode:'Z4BLD', series:'S', subType:'S (Parallel)', frameSize:'80×80mm', powerW:120,
    ratedTorque:0.382, maxTorque:0.573, instMaxTorque:0.764,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200',
    gearTypeParallel:'4GU□V',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'165×165mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque', multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z5BLD-120W': {
    frameCode:'Z5BLD', series:'S', subType:'S (Parallel)', frameSize:'90×90mm', powerW:120,
    ratedTorque:0.382, maxTorque:0.573, instMaxTorque:0.764,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200',
    gearTypeParallel:'5GU□V',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'165×165mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque', multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z5BLD-200W': {
    frameCode:'Z5BLD', series:'S', subType:'S (Parallel)', frameSize:'90×90mm', powerW:200,
    ratedTorque:0.637, maxTorque:1.150, instMaxTorque:1.150,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200',
    gearTypeParallel:'5GU□V',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'200×200mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque', multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z6BLD-200W': {
    frameCode:'Z6BLD', series:'S', subType:'S (Parallel)', frameSize:'100×100mm', powerW:200,
    ratedTorque:0.637, maxTorque:1.150, instMaxTorque:1.150,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200',
    gearTypeParallel:'6GU□V',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'200×200mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque', multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z6BLD-400W': {
    frameCode:'Z6BLD', series:'S', subType:'S (Parallel)', frameSize:'100×100mm', powerW:400,
    ratedTorque:1.273, maxTorque:1.910, instMaxTorque:1.910,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50, 100, 200',
    gearTypeParallel:'6GU□V',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'250×250mm t6mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque', multiSpeed:'Up to 16 preset speed levels',
  },
  'S-Z7BLD-750W': {
    frameCode:'Z7BLD', series:'S', subType:'S (Parallel)', frameSize:'120×120mm', powerW:750,
    ratedTorque:2.387, maxTorque:3.580, instMaxTorque:3.580,
    voltage:'AC 220V (50/60Hz)', voltageRange:'198~242VAC (+/-10%)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 30, 50',
    gearTypeParallel:'7GU□V',
    driver:'C30 series (ZDRV.C30-400 or higher)',
    ip:'IP54', heatSinkSize:'300×300mm t6mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque', multiSpeed:'Up to 16 preset speed levels',
  },
  // SF series — Right Angle gear reducer
  'SF-Z2BLD-60W': {
    frameCode:'Z2BLD', series:'SF', subType:'SF (Right Angle)', frameSize:'SF2-12', powerW:60,
    ratedTorque:0.191, maxTorque:0.287, instMaxTorque:0.287,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'7.5, 10, 15, 20, 30, 50',
    gearTypeSF:'Right Angle (SF) - output shaft perpendicular to motor',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'135×135mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SF type: Right-angle gearbox - ideal for space-constrained installations',
  },
  'SF-Z4BLD-120W': {
    frameCode:'Z4BLD', series:'SF', subType:'SF (Right Angle)', frameSize:'SF2-15', powerW:120,
    ratedTorque:0.382, maxTorque:0.764, instMaxTorque:0.764,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'7.5, 10, 15, 20, 30, 50',
    gearTypeSF:'Right Angle (SF)',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'165×165mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SF type: Right-angle gearbox',
  },
  'SF-Z5BLD-200W': {
    frameCode:'Z5BLD', series:'SF', subType:'SF (Right Angle)', frameSize:'SF2-20', powerW:200,
    ratedTorque:0.637, maxTorque:1.150, instMaxTorque:1.150,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'7.5, 10, 15, 20, 30, 50',
    gearTypeSF:'Right Angle (SF)',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'200×200mm t5mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SF type: Right-angle gearbox',
  },
  'SF-Z6BLD-400W': {
    frameCode:'Z6BLD', series:'SF', subType:'SF (Right Angle)', frameSize:'SF2-25', powerW:400,
    ratedTorque:1.273, maxTorque:1.910, instMaxTorque:1.910,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'7.5, 10, 15, 20, 30, 50',
    gearTypeSF:'Right Angle (SF)',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54', heatSinkSize:'250×250mm t6mm',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SF type: Right-angle gearbox',
  },
  // SL series — Parallel Hollow shaft
  'SL-Z2BLD-100W': {
    frameCode:'Z2BLD', series:'SL', subType:'SL (Hollow Shaft)', frameSize:'60mm', powerW:100,
    ratedTorque:0.318, maxTorque:0.637, instMaxTorque:0.637,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 7.5, 10, 15, 20, 25, 30, 40, 50',
    gearTypeSL:'SL — Parallel Hollow shaft output reducer',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SL type: Hollow shaft output - mounts directly onto machine shaft',
  },
  'SL-Z4BLD-200W': {
    frameCode:'Z4BLD', series:'SL', subType:'SL (Hollow Shaft)', frameSize:'80mm', powerW:200,
    ratedTorque:0.637, maxTorque:1.273, instMaxTorque:1.273,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 7.5, 10, 15, 20, 25, 30, 40, 50',
    gearTypeSL:'SL — Parallel Hollow shaft',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SL type: Hollow shaft output reducer',
  },
  'SL-Z5BLD-400W': {
    frameCode:'Z5BLD', series:'SL', subType:'SL (Hollow Shaft)', frameSize:'90mm', powerW:400,
    ratedTorque:1.273, maxTorque:1.910, instMaxTorque:1.910,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 7.5, 10, 15, 20, 25, 30, 40, 50',
    gearTypeSL:'SL — Parallel Hollow shaft',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SL type: Hollow shaft output reducer',
  },
  'SL-Z6BLD-750W': {
    frameCode:'Z6BLD', series:'SL', subType:'SL (Hollow Shaft)', frameSize:'104mm', powerW:750,
    ratedTorque:2.387, maxTorque:3.580, instMaxTorque:3.580,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 7.5, 10, 15, 20, 25, 30, 40, 50',
    gearTypeSL:'SL — Parallel Hollow shaft',
    driver:'C30 series (ZDRV.C30)',
    ip:'IP54',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SL type: Hollow shaft output reducer',
  },
  'SL-Z7BLD-1100W': {
    frameCode:'Z7BLD', series:'SL', subType:'SL (Hollow Shaft)', frameSize:'120mm', powerW:1100,
    ratedTorque:3.500, maxTorque:7.000, instMaxTorque:7.000,
    voltage:'AC 220V (50/60Hz)',
    speedControl:'80~3000 rpm', speedChange:'+/-0.2%',
    gearRatioAvailable:'5, 10, 15, 20, 25, 30, 40, 50, 100',
    gearTypeSL:'SL — Parallel Hollow shaft',
    driver:'C30 series (ZDRV.C30-400 or higher)',
    ip:'IP54',
    energySaving:'~23% energy saving vs AC inverter motor', holdingTorque:'Up to 50% of rated torque',
    remarks:'SL type: Hollow shaft - largest HE model, 1100W',
  },
};

// ── Driver model specs (C20/C30/C40) ─────────────────────────────────────────
const BLDC_DRIVER_SPECS = {
  'C20': {
    name:'C20 Series', power:'120W / 200W / 400W / 800W',
    voltage:'DC 24~48V (L: 12V/24V; L2: 24V; L3: 36V; L4: 48V)',
    controlMode:'Open-loop / Closed-loop (accuracy +/-0.5%)',
    features:'Multi-function input (5 digital inputs), 2 digital outputs, Accel/Decel 0.3~10s',
    protections:'Under-voltage, Over-voltage, Over-current, Overload, Locked-rotor, Short-circuit, Phase-loss, Over-temperature',
    communication:'— (no communication option)',
    display:'LED indicator',
    speedSetting:'Knob / External analog 0~5V / PWM 3k~10kHz / Keyboard',
  },
  'C30': {
    name:'C30 Series', power:'120W / 200W / 400W',
    voltage:'DC 24~48V (L: 12V/24V; L2: 24V; L3: 36V; L4: 48V) / High voltage AC220V (S2 option)',
    controlMode:'Open-loop / Closed-loop (+/-0.5%) / 4-quadrant operation / Zero-speed hold',
    features:'5 digital inputs (NPN/PNP), 2 digital outputs, Accel/Decel 0.3~10s, Simple PLC control',
    protections:'Under-voltage, Over-voltage, Over-current, Overload, Locked-rotor, Short-circuit, Phase-loss, Over-temperature',
    communication:'RS-485 (B option) / CAN (C option)',
    display:'LED / Display panel (D option)',
    speedSetting:'Knob / Analog 0~5V / PWM 3k~10kHz / HDI 0~20kHz / Keyboard',
    remarks:'C30 supports RS-485/CAN communication for PLC/SCADA integration.',
  },
  'C40': {
    name:'C40 Series', power:'200W / 400W / 750W',
    voltage:'High voltage AC 220V (Single phase input)',
    controlMode:'Open-loop / Closed-loop (+/-0.5%)',
    features:'5 digital inputs, 2 digital outputs, Accel/Decel 0.3~10s',
    protections:'Under-voltage, Over-voltage, Over-current, Overload, Locked-rotor, Short-circuit, Phase-loss, Over-temperature',
    communication:'— (no communication option)',
    display:'LED indicator',
    speedSetting:'Knob / Analog 0~5V / PWM / Keyboard',
    remarks:'C40 uses single-phase AC 220V input — designed for HE series motors.',
  },
};

async function generateBLDCDatasheetPDF(modelCode, specRows, state) {
  const JsPDF = await loadJsPDFBLDC();
  if (!JsPDF) throw new Error('Cannot load jsPDF');

  const { bldcCategory, bldcFrame, bldcPower, bldcHEType, bldcVoltage, bldcSpeed, bldcGearType, bldcRatio, bldcOption } = state || {};

  const isHE = bldcCategory === 'HighefficiencyBLDCGearmotor';

  // Look up full catalog data
  let catData = null;
  if (isHE && bldcHEType && bldcFrame && bldcPower) {
    catData = BLDC_CATALOG_HE[`${bldcHEType}-${bldcFrame}-${bldcPower}W`] || null;
  } else if (bldcFrame && bldcPower) {
    catData = BLDC_CATALOG_NORMAL[`${bldcFrame}-${bldcPower}W`] || null;
  }

  const doc    = new JsPDF({ orientation:'portrait', unit:'mm', format:'a4', compress:true });
  const W      = doc.internal.pageSize.getWidth();
  const pH     = doc.internal.pageSize.getHeight();
  const margin = 14;
  let   y      = margin;

  // ── Color palette — BLDC green/teal brand ──
  const GREEN   = [0, 160, 100];
  const NAVY    = [10, 35, 80];
  const TEAL    = [0, 140, 130];
  const LGRAY   = [240, 242, 246];
  const DGRAY   = [55, 65, 80];
  const WHITE   = [255, 255, 255];
  const AMBER   = [200, 120, 0];
  const RED     = [180, 40, 40];

  const dateStr = new Date().toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' });

  // ══════════════════════════════════════════════════════════════
  // HEADER BANNER
  // ══════════════════════════════════════════════════════════════
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 30, 'F');
  doc.setFillColor(...GREEN);
  doc.rect(0, 30, W, 3, 'F');

  doc.setTextColor(...WHITE);
  doc.setFontSize(17); doc.setFont('helvetica', 'bold');
  doc.text('SAS TRANSMISSION', margin, 12);
  doc.setFontSize(9.5); doc.setFont('helvetica', 'normal');
  doc.text(isHE
    ? 'High Efficiency Brushless DC Gear Motor  —  Technical Data Sheet'
    : 'Brushless DC Gear Motor  —  Technical Data Sheet', margin, 21);
  doc.setFontSize(7.5);
  doc.text('Date: ' + dateStr, margin, 28);

  // Category badge
  const badge = isHE ? 'HE BLDC (S/SF/SL)' : 'Standard BLDC (Z-Series)';
  doc.setFillColor(...GREEN);
  const bw = doc.getTextWidth(badge) + 8;
  doc.roundedRect(W - margin - bw, 4, bw, 10, 2, 2, 'F');
  doc.setFontSize(7); doc.setFont('helvetica', 'bold');
  doc.text(badge, W - margin - bw/2, 10.5, { align:'center' });
  y = 40;

  // ══════════════════════════════════════════════════════════════
  // MODEL CODE BOX
  // ══════════════════════════════════════════════════════════════
  doc.setFillColor(...LGRAY);
  doc.roundedRect(margin, y, W - margin*2, 17, 3, 3, 'F');
  doc.setFillColor(...GREEN);
  doc.roundedRect(margin, y, 44, 17, 3, 3, 'F');

  // MODEL CODE — auto-shrink font so text never overflows the green badge
  doc.setTextColor(...WHITE);
  doc.setFontSize(6.5); doc.setFont('helvetica', 'bold');
  doc.text('MODEL CODE', margin + 2, y + 5.5);

  // Fit model code text inside 40mm wide green box
  const codeText = modelCode || '—';
  const maxCodeW = 40; // mm available inside green box
  let codeFontSize = 9;
  doc.setFontSize(codeFontSize);
  while (doc.getTextWidth(codeText) > maxCodeW - 2 && codeFontSize > 5) {
    codeFontSize -= 0.5;
    doc.setFontSize(codeFontSize);
  }
  doc.setFont('helvetica', 'bold');
  doc.text(codeText, margin + 22, y + 13, { align:'center' });

  doc.setTextColor(...NAVY);
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.text(isHE ? 'HIGH EFFICIENCY BRUSHLESS DC GEAR MOTOR' : 'BRUSHLESS DC GEAR MOTOR', margin + 50, y + 7);
  doc.setTextColor(...DGRAY);
  doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
  doc.text('Synergy Asia Solution Co.,Ltd.  |  WWW.MOTORSAS.COM  |  HIGH QUALITY, BETTER VALUE', margin + 50, y + 14);
  y += 23;

  // ══════════════════════════════════════════════════════════════
  // SECTION 1: SELECTED CONFIGURATION
  // ══════════════════════════════════════════════════════════════
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('1. SELECTED CONFIGURATION', margin, y);
  y += 5;

  const configRows = specRows.map(([k, v]) => [String(k), String(v || '—')]);
  doc.autoTable({
    startY: y,
    head: [['Parameter', 'Value']],
    body: configRows,
    margin: { left: margin, right: margin },
    styles: { fontSize: 8.5, cellPadding: 3, lineColor: [220, 222, 228], lineWidth: 0.3 },
    headStyles: { fillColor: NAVY, textColor: WHITE, fontStyle:'bold', fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 249, 252] },
    columnStyles: {
      0: { fontStyle:'bold', textColor: DGRAY, cellWidth: 50 },
      1: { textColor: [20, 20, 30] },
    },
  });
  y = doc.lastAutoTable.finalY + 7;

  // ══════════════════════════════════════════════════════════════
  // SECTION 2: MOTOR PERFORMANCE DATA (from catalog)
  // ══════════════════════════════════════════════════════════════
  if (catData) {
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('2. MOTOR PERFORMANCE DATA  (from SAS Catalog)', margin, y);
    y += 5;

    const perfBody = [
      ['Frame Size',              catData.frameSize || '—'],
      ['Motor Power',             `${catData.powerW} W`],
      ['Rated Torque',            `${catData.ratedTorque} N·m`],
      ['Max Torque (rated)',      `${catData.maxTorque} N·m`],
      ['Instantaneous Max Torque', catData.instMaxTorque ? `${catData.instMaxTorque} N·m` : '—'],
      ['Rated Speed',             isHE ? (catData.speedControl || '80~3000 rpm') : '3000 rpm'],
      ['Speed Control Range',     catData.speedControl || '—'],
      ['Speed Variation Rate',    catData.speedChange || '—'],
      ['Voltage',                 catData.voltage || (catData.voltageOptions ? catData.voltageOptions.join(' / ') : '—')],
      ['IP Protection',           catData.ip || '—'],
    ];

    if (!isHE && catData.ratedCurrent) {
      const ci = catData.ratedCurrent;
      if (ci['24V']) perfBody.push(['Rated Current @24V', ci['24V']]);
      if (ci['36V']) perfBody.push(['Rated Current @36V', ci['36V']]);
      if (ci['48V']) perfBody.push(['Rated Current @48V', ci['48V']]);
    }

    doc.autoTable({
      startY: y,
      head: [['Specification', 'Value']],
      body: perfBody,
      margin: { left: margin, right: margin },
      styles: { fontSize: 8.5, cellPadding: 3, lineColor: [220, 222, 228], lineWidth: 0.3 },
      headStyles: { fillColor: GREEN, textColor: WHITE, fontStyle:'bold', fontSize: 8 },
      alternateRowStyles: { fillColor: [245, 252, 248] },
      columnStyles: {
        0: { fontStyle:'bold', textColor: DGRAY, cellWidth: 62 },
        1: { textColor: [20, 20, 30] },
      },
    });
    y = doc.lastAutoTable.finalY + 7;
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 3: GEAR HEAD & RATIO INFORMATION
  // ══════════════════════════════════════════════════════════════
  if (catData && y < 220) {
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('3. GEAR HEAD & RATIO INFORMATION', margin, y);
    y += 5;

    const gearBody = [];
    if (!isHE) {
      if (catData.gearTypeParallel) gearBody.push(['Parallel Shaft Type', catData.gearTypeParallel]);
      if (catData.gearTypeLType)    gearBody.push(['L-Type (Right Angle)', catData.gearTypeLType]);
      if (catData.gearRatioParallel) gearBody.push(['Ratio Range (Parallel)', `1:${catData.gearRatioParallel}`]);
      if (catData.gearRatioLType)   gearBody.push(['Ratio Range (L-Type)', `1:${catData.gearRatioLType}`]);
    } else {
      if (catData.gearTypeParallel) gearBody.push(['Gear Type (S)', catData.gearTypeParallel]);
      if (catData.gearTypeSF)       gearBody.push(['Gear Type (SF)', catData.gearTypeSF]);
      if (catData.gearTypeSL)       gearBody.push(['Gear Type (SL)', catData.gearTypeSL]);
      if (catData.gearRatioAvailable) gearBody.push(['Available Ratios', catData.gearRatioAvailable]);
    }
    gearBody.push(['Driver Required', catData.driver || catData.driverNormal || '—']);
    if (catData.brushlessLife) gearBody.push(['Brush Maintenance', catData.brushlessLife]);

    if (gearBody.length > 0) {
      doc.autoTable({
        startY: y,
        head: [['Parameter', 'Value']],
        body: gearBody,
        margin: { left: margin, right: margin },
        styles: { fontSize: 8.5, cellPadding: 3, lineColor: [220, 222, 228], lineWidth: 0.3 },
        headStyles: { fillColor: TEAL, textColor: WHITE, fontStyle:'bold', fontSize: 8 },
        alternateRowStyles: { fillColor: [245, 250, 252] },
        columnStyles: {
          0: { fontStyle:'bold', textColor: DGRAY, cellWidth: 62 },
          1: { textColor: [20, 20, 30] },
        },
      });
      y = doc.lastAutoTable.finalY + 7;
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION 4: OPERATING & ENVIRONMENTAL CONDITIONS
  // ══════════════════════════════════════════════════════════════
  if (y < 215) {
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('4. OPERATING & ENVIRONMENTAL CONDITIONS', margin, y);
    y += 5;

    doc.autoTable({
      startY: y,
      head: [['Condition', 'Motor', 'Driver']],
      body: [
        ['Ambient Temperature', '0 ~ +40°C (No icing)', '0 ~ +40°C (No icing)'],
        ['Ambient Humidity',    'Below 85% (No dew)',   'Below 85% (No dew)'],
        ['Altitude',           'Below 1,000m',         'Below 1,000m'],
        ['Vibration',          'No continuous/excessive shock', 'No continuous/excessive shock'],
        ['Medium Environment',  'No corrosive gas, dust, radioactive material, magnetic field', ''],
        ['Insulation Resistance', '>100 MΩ (DC 500V Megger)', '>100 MΩ (DC 500V)'],
        ['Dielectric Withstand', '1.5kV 50Hz / 1min (< 10mA)', 'AC 1.5kV 50Hz / 1min'],
        ['Temperature Rise',    isHE ? 'Winding ≤55°C, Shell ≤40°C (400W≤60°C)' : 'Winding ≤55°C', '≤50°C'],
        ['Thermal Class',       'UL/CSA: 105(A), EN: 120(E)', '—'],
        ['Storage Temp',        '-20 ~ +70°C (No icing)', '-25 ~ +70°C (No icing)'],
        ['IP Rating',           catData?.ip || (isHE ? 'IP54' : 'IP40/IP54'), 'IP20'],
      ],
      margin: { left: margin, right: margin },
      styles: { fontSize: 7.5, cellPadding: 2.5, lineColor: [220, 222, 228], lineWidth: 0.3 },
      headStyles: { fillColor: NAVY, textColor: WHITE, fontStyle:'bold', fontSize: 7.5 },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: {
        0: { fontStyle:'bold', textColor: DGRAY, cellWidth: 46 },
        1: { textColor: [20, 20, 30], cellWidth: 68 },
        2: { textColor: [20, 20, 30] },
      },
    });
    y = doc.lastAutoTable.finalY + 7;
  }

  // ══════════════════════════════════════════════════════════════
  // PAGE 2: DRIVER SPECS + SAFETY + OPTIONS
  // ══════════════════════════════════════════════════════════════
  doc.addPage();
  y = margin;

  // Footer strip on page 1 already added below — but add same header on p2
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 12, 'F');
  doc.setTextColor(...WHITE);
  doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
  doc.text('SAS TRANSMISSION  |  BLDC Gear Motor Technical Data Sheet  |  ' + (modelCode || ''), margin, 8);
  doc.setTextColor(180, 200, 230);
  doc.setFont('helvetica', 'normal');
  doc.text('Page 2 of 2', W - margin, 8, { align:'right' });
  y = 18;

  // ── SECTION 5: DRIVER / CONTROLLER SPECIFICATIONS ───────────────────────────
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('5. DRIVER / CONTROLLER SPECIFICATIONS', margin, y);
  y += 5;

  const driverSeries = isHE ? 'C30' : 'C20';
  const dSpec = BLDC_DRIVER_SPECS[driverSeries];

  if (dSpec) {
    doc.autoTable({
      startY: y,
      head: [['Driver Parameter', 'Value']],
      body: [
        ['Driver Series',     dSpec.name],
        ['Compatible Power',  dSpec.power],
        ['Input Voltage',     dSpec.voltage],
        ['Control Mode',      dSpec.controlMode],
        ['Speed Setting',     dSpec.speedSetting],
        ['Digital Inputs',    dSpec.features.split(',')[0]],
        ['Digital Outputs',   dSpec.features.split(',')[1] || '—'],
        ['Accel/Decel',       '0.3 ~ 10s (adjustable via panel or parameter)'],
        ['Communication',     dSpec.communication || '—'],
        ['Display',           dSpec.display],
        ['Protection Functions', dSpec.protections],
        ...(dSpec.remarks ? [['Notes', dSpec.remarks]] : []),
      ],
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 2.8, lineColor: [220, 222, 228], lineWidth: 0.3 },
      headStyles: { fillColor: GREEN, textColor: WHITE, fontStyle:'bold', fontSize: 8 },
      alternateRowStyles: { fillColor: [245, 252, 248] },
      columnStyles: {
        0: { fontStyle:'bold', textColor: DGRAY, cellWidth: 52 },
        1: { textColor: [20, 20, 30], fontSize: 7.5 },
      },
    });
    y = doc.lastAutoTable.finalY + 7;
  }

  // ── SECTION 6: SAFETY & PRECAUTIONS ──────────────────────────────────────────
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.setTextColor(...RED);
  doc.text('6. SAFETY & PRECAUTIONS', margin, y);
  doc.setTextColor(...NAVY);
  y += 5;

  const precautions = [
    ['[!] Heat Sink Required', isHE
      ? 'Always mount an aluminum heat sink on the motor body. Required size by power:\n30W: 115x115mm t5, 60W: 135x135mm t5, 120W: 165x165mm t5\n200W: 200x200mm t5, 400W: 250x250mm t6, 750W: 300x300mm t6\nKeep motor surface temperature below 90 deg C at all times.'
      : 'Always mount an aluminum heat sink on the motor body.\n120W: 165x165mm t5mm, 200W: 200x200mm t5mm\nKeep motor surface temperature below 90 deg C.'],
    ['[!] No Insulation Test\nWith Driver Connected', 'Do NOT perform insulation resistance or dielectric withstand tests while the driver is connected to the motor. This can permanently damage the driver.'],
    ['[!] Gear Output Rotation', 'The output shaft of the gearhead always rotates in the OPPOSITE direction to the motor. Exception: Decimal gearhead (ratio 10:1).'],
    ['[!] Instantaneous Torque\nLimit', 'Do not apply torque exceeding the instantaneous max torque during start-up or impact loads. Exceeding this value triggers driver overcurrent protection and shutdown.'],
    ['[!] Power Supply Polarity', 'Verify +/- polarity and voltage spec before applying power. Reverse polarity or over-voltage will permanently damage the driver and/or motor.'],
    ['[!] Environment', 'Do not use in areas with corrosive gases, metal dust, strong magnetic fields, or radioactive materials. Operating environment must be free from condensation.'],
    ['[!] No Modification', 'Do not modify the motor or driver. Any unauthorized modification voids the warranty immediately.'],
    ['[!] Cable Length', 'Maximum cable length between motor and driver is 10 meters (standard cable). Exceeding this length may cause signal interference and erratic operation.'],
  ];

  doc.autoTable({
    startY: y,
    head: [['Item', 'Details']],
    body: precautions,
    margin: { left: margin, right: margin },
    styles: { fontSize: 7.5, cellPadding: 2.5, lineColor: [220, 222, 228], lineWidth: 0.3 },
    headStyles: { fillColor: [160, 30, 30], textColor: WHITE, fontStyle:'bold', fontSize: 8 },
    alternateRowStyles: { fillColor: [255, 250, 248] },
    columnStyles: {
      0: { fontStyle:'bold', textColor: [150, 30, 30], cellWidth: 52, fontSize: 7.5 },
      1: { textColor: [40, 40, 40], fontSize: 7 },
    },
  });
  y = doc.lastAutoTable.finalY + 7;

  // ── SECTION 7: RECOMMENDED OPTIONAL ADD-ONS ─────────────────────────────────
  if (y < 240) {
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GREEN);
    doc.text('7. RECOMMENDED OPTIONAL ADD-ONS', margin, y);
    doc.setTextColor(...NAVY);
    y += 5;

    const heDriverRow = isHE
      ? 'ZDRV.C30-400 with CAN/RS-485 option: enables PLC/SCADA integration with speed feedback. Ideal for automation systems requiring closed-loop position or speed control.'
      : 'ZBLD.C20-400LR: Driver for motors >120W. Supports speed control via external analog/PWM signal from PLC or controller.';

    const options = [
      ['Electromagnetic Brake (-M)',
        'Add suffix "-M" to motor model code. Electromagnetic brake provides holding torque up to 50% of rated torque.\nIdeal for applications requiring position locking: vertical axes, lifts, conveyors with inclines.'],
      ['Encoder / Closed-loop (-BM)',
        'Add suffix "-BM" for closed-loop feedback mode with encoder.\nImproves speed and position accuracy. Recommended for CNC, precision conveyor, and synchronized multi-axis systems.'],
      ['Driver with RS-485 / CAN',
        heDriverRow],
      ['External Keyboard Panel',
        'External keypad for setting parameters, monitoring speed, and viewing fault codes.\nConnects via standard connector — no need to open the control panel enclosure.'],
      ['Multi-Speed / Simple PLC',
        'C20/C30 drivers support up to 16 preset speed levels via 5 digital inputs.\nNo external PLC required — configure speeds directly via driver keyboard or parameter settings.'],
      ['Decimal Gearhead (10:1)',
        'Intermediate gearhead (ratio 10:1) installed between motor and output gearhead.\nMultiplies total reduction ratio. Permissible output torque: 3~5 N·m (model dependent).'],
      [isHE ? 'Round Shaft Motor (no gearhead)' : 'L-Type Gearbox (RC / RT)',
        isHE
          ? 'Order motor with round shaft only (no gearhead attached) for custom coupling or integration.\nModel series: Z5BLD-GV-30S (round shaft type).'
          : 'L-Type right-angle gearbox: RC = hollow shaft spiral bevel output, RT = solid shaft spiral bevel output.\nFor applications requiring 90-degree power transmission direction change.'],
      ['IP54 Protection Class',
        'Select IP54 (dustproof and splash-waterproof) for environments with dust or water splash.\nStandard IP40 is suitable for clean, indoor environments only.'],
    ];

    doc.autoTable({
      startY: y,
      head: [['Option', 'Details']],
      body: options,
      margin: { left: margin, right: margin },
      styles: { fontSize: 7.5, cellPadding: 2.5, lineColor: [220, 222, 228], lineWidth: 0.3 },
      headStyles: { fillColor: [0, 120, 80], textColor: WHITE, fontStyle:'bold', fontSize: 8 },
      alternateRowStyles: { fillColor: [245, 252, 248] },
      columnStyles: {
        0: { fontStyle:'bold', textColor: [0, 100, 70], cellWidth: 52, fontSize: 7.5 },
        1: { textColor: [30, 40, 40], fontSize: 7 },
      },
    });
    y = doc.lastAutoTable.finalY + 5;
  }

  // ── Quick formulas ───────────────────────────────────────────────────────────
  if (y < 255) {
    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('QUICK FORMULAS:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...DGRAY);
    y += 4.5;
    const formulas = [
      'Output Speed (n₂) = n₁ ÷ i   [rpm]     |     Output Torque (T₂) ≈ T₁ × i × η   [N·m]',
      'Speed change rate: BLDC ±0.2% (HE) / ±1.0% (Standard)  vs  AC+Inverter −15%',
    ];
    formulas.forEach(f => { doc.text(f, margin + 2, y); y += 4.5; });
  }

  // ══════════════════════════════════════════════════════════════
  // FOOTER (both pages)
  // ══════════════════════════════════════════════════════════════
  [1, 2].forEach(pg => {
    doc.setPage(pg);
    const h = doc.internal.pageSize.getHeight();
    doc.setFillColor(...NAVY);
    doc.rect(0, h - 16, W, 16, 'F');
    doc.setTextColor(...WHITE);
    doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.text('Synergy Asia Solution Co.,Ltd.  |  Brushless DC Gear Motor  |  WWW.MOTORSAS.COM', margin, h - 9);
    doc.setFont('helvetica', 'normal');
    doc.text('Tel: 081-921-6225  |  Warranty: 18 months after delivery  |  Data from SAS BLDC & HE Catalog', margin, h - 4);
    doc.setTextColor(160, 185, 215);
    doc.text('Specs subject to change without notice.', W - margin, h - 4, { align:'right' });
  });

  doc.save((modelCode || 'BLDC_DataSheet') + '.pdf');
}

// ─────────────────────────────────────────────────────────────────────────────
// BLDCDataSheetButton — same pattern as SRVDataSheetButton
// ─────────────────────────────────────────────────────────────────────────────
function BLDCDataSheetButton({ modelCode, specRows, state, T }) {
  const [status, setStatus] = React.useState('idle');

  const handleClick = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await generateBLDCDatasheetPDF(modelCode, specRows, state);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('BLDC PDF error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const label = { idle:'📄 Data Sheet', loading:'⏳ กำลังสร้าง...', done:'✅ ดาวน์โหลดแล้ว', error:'⚠️ ลองใหม่' }[status];
  const bg     = status === 'error' ? 'rgba(220,50,50,0.18)' : 'rgba(30,100,220,0.12)';
  const border = status === 'error' ? '1px solid rgba(220,50,50,0.4)' : '1px solid rgba(30,100,220,0.3)';
  const color  = status === 'error' ? '#e05050' : '#6090e0';

  return (
    <button type="button" onClick={handleClick} disabled={status === 'loading'}
      style={{ width:'100%', padding:'10px 0', borderRadius:10, background:bg, border, color,
        fontWeight:600, fontSize:13, cursor:'pointer', transition:'opacity 0.15s',
        opacity: status === 'loading' ? 0.6 : 1 }}>
      {label}
    </button>
  );
}

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
              <BLDCDataSheetButton
                modelCode={modelCode}
                specRows={specRows}
                state={state}
                T={T}
              />
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
                  <div className="absolute left-0 top-full mt-1 z-[9999] bg-white border border-slate-200 rounded-xl shadow-xl w-[260px] sm:w-[300px] overflow-y-auto max-h-[320px]">
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
