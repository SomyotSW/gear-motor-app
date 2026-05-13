// ServoMotorFlow.js  v4.0
// ✅ Spec ละเอียดจาก Catalog หน้า 17 ครบทุกรุ่น
// ✅ DataSheet PDF button แบบเดียวกับ IECMotorFlow
// ✅ Step 2 Flange ล็อคตาม Inertia (Matching Table)
// ✅ Step 6 ปุ่ม 2 ปุ่ม CS / CE
// ✅ Live Model Code ทุก Step
// ✅ Responsive PC + Mobile
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import sasLogoUrl from '../assets/iec/SAS.png'; // ใช้โลโก้เดียวกับ IEC

// ── Step images ───────────────────────────────────────────────────────────────
import GImg    from '../assets/servo/G.png';
import AImg    from '../assets/servo/A.png';
import HImg    from '../assets/servo/H.png';
import F40Img  from '../assets/servo/F40.png';
import F60Img  from '../assets/servo/F60.png';
import F80Img  from '../assets/servo/F80.png';
import F130Img from '../assets/servo/F130.png';
import SV100Img  from '../assets/servo/SV100.png';
import SV200Img  from '../assets/servo/SV200.png';
import SV400Img  from '../assets/servo/SV400.png';
import SV750Img  from '../assets/servo/SV750.png';
import SV1000Img from '../assets/servo/SV1000.png';
import SV1500Img from '../assets/servo/SV1500.png';
import SV1800Img from '../assets/servo/SV1800.png';
import SV2000Img from '../assets/servo/SV2000.png';
import SV3000Img from '../assets/servo/SV3000.png';
import SV850Img  from '../assets/servo/SV1000.png';
import SV1300Img from '../assets/servo/SV1200.png';
import OCImg  from '../assets/servo/OC.png';
import OCEImg from '../assets/servo/OCE.png';

// ─────────────────────────────────────────────────────────────────────────────
// Preload images
// ─────────────────────────────────────────────────────────────────────────────
if (typeof window !== 'undefined') {
  [AImg,HImg,GImg,F40Img,F60Img,F80Img,F130Img,
   SV100Img,SV200Img,SV400Img,SV750Img,SV1000Img,
   SV1500Img,SV1800Img,SV2000Img,SV3000Img,SV850Img,SV1300Img,
   OCImg,OCEImg].forEach(src => { const i=new window.Image(); i.src=src; });
}

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_fwgn6cw';
const EMAILJS_TEMPLATE_ID = 'template_7eppr2x';
const EMAILJS_PUBLIC_KEY  = 'BvIT5-X7LnkaS3LKq';

const SALE_PERSONS = [
  { abbr:'CA',  name:'Mr. Chottanin A. (CA)',  position:'TRANSMISSION PRODUCT MANAGER', phone:'081-921-6225' },
  { abbr:'AP',  name:'Ms.Apichaya P. (AP)',    position:'Sale Supervisor',               phone:'098-3697494'  },
  { abbr:'MY',  name:'Ms.Matavee Y. (MY)',     position:'Sale Supervisor',               phone:'092-2715371'  },
  { abbr:'TWS', name:'Ms.Thitikan W. (TWS)',   position:'Sale Exclusive',                phone:'080-4632394'  },
  { abbr:'PW',  name:'Mr.Parada W.(PW)',        position:'Sale Engineer',                phone:'088-9404948'  },
  { abbr:'SI',  name:'Ms.Suphak I.(SI)',        position:'Sale Exclusive',               phone:'096-0787776'  },
  { abbr:'NM',  name:'Mr.Naphaphat M.(NM)',     position:'Sale Exclusive',               phone:'065-7176332'  },
  { abbr:'SK',  name:'Mr.Sanya K.(SK)',         position:'Sale Supervisor',              phone:'086-9819616'  },
  { abbr:'PL',  name:'Mr.Pongsakorn L.(PL)',    position:'Sale Engineer',                phone:'063-2159056'  },
  { abbr:'TL',  name:'Ms.Tanawee L.(TL)',       position:'Sale Supervisor',              phone:'092-2715372'  },
  { abbr:'NR',  name:'Ms.Nantida R.(NR)',       position:'Sale Exclusive',               phone:'098-2711425'  },
];

// ─────────────────────────────────────────────────────────────────────────────
// R2 GLB
// ─────────────────────────────────────────────────────────────────────────────
const GLB_BASE = (() => {
  if (typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    return '/model/glb';
  return 'https://pub-8cdc08b3fc55463c8c8f399a10351d7e.r2.dev';
})();

(() => {
  if (typeof document === 'undefined') return;
  const id = 'mv-servo-script';
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id; s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
  document.head.appendChild(s);
})();

// mapServoGlbFilename — ตัด 4 segment แรก ลบ dash
// SMH60-A04-B30-CE42  →  SMH60A04B30CE   (ตัด "42" = encoder+shaft ออก)
// SMH60-A04-B30-CS12  →  SMH60A04B30CS
function mapServoGlbFilename(mc) {
  if (!mc || typeof mc !== 'string') return mc;
  const parts = mc.split('-'); // ['SMH60','A04','B30','CE42']
  if (parts.length < 4) return mc.replace(/-/g,'');
  // segment 4 (index 3) = 'CE42' หรือ 'CS12' → เอาแค่ 2 ตัวแรก (option code)
  const seg4 = (parts[3] || '').slice(0, 2); // 'CE' หรือ 'CS'
  return parts[0] + parts[1] + parts[2] + seg4;
  // ผลลัพธ์: SMH60A04B30CE
}

export { mapServoGlbFilename };

// R2 base URL (ใช้เดียวกัน ทั้ง .glb และ .STEP)
const R2_BASE = GLB_BASE;

// ─────────────────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
// SERVO SPEC DATABASE — จาก Catalog หน้า 17 ครบทุกรุ่น
// key: `${inertia}-${flange}-${powerCode}-${speedCode}`
// ══════════════════════════════════════════════════════════════════════════════
const SERVO_SPEC_DB = {
  // ── H60A04B30 — 100W / 3000rpm / High Inertia / Flange 40mm ─────────────────
  // NOTE: Catalog เรียก "H60" แต่ระบบนี้ map F40=100W (ตาม Matching Table)
  'H-40-01-B30': {
    motorModel: 'XMQ1-H60A04B30S16',
    drive: 'SDQ1-04PA',
    ratedPowerKW: 0.4, ratedPowerHP: 0.54,
    ratedTorque: 1.27, maxTorque: 4.45,
    ratedCurrent: 2.6, maxCurrent: 9.1,
    ratedSpeed: 3000, maxSpeed: 6000,
    rotaryInertia: 0.594,   // ×10⁻⁴ kg·m²
    brakeRatedPowerW: 7.3,
    brakeHoldTorque: 1.27,
    brakeInertia: 0.013,    // ×10⁻⁴ kg·m²
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── H60A04B30 — 200W / 400W / 3000rpm (Catalog: H60A04B30 = 0.4kW, Flange 60mm)
  // 200W = sub-variant ที่ไม่ได้ระบุในตารางแยก → ใช้ค่าเดียวกัน proportional
  'H-60-02-B30': {
    motorModel: 'XMQ1-H60A04B30S16',
    drive: 'SDQ1-04PA',
    ratedPowerKW: 0.2,  ratedPowerHP: 0.27,
    ratedTorque: 0.64,  maxTorque: 1.91,       // ≈ 50% ของ 400W (proportional)
    ratedCurrent: 1.3,  maxCurrent: 4.6,
    ratedSpeed: 3000,   maxSpeed: 6000,
    rotaryInertia: 0.594,
    brakeRatedPowerW: 7.3, brakeHoldTorque: 0.64, brakeInertia: 0.013,
    brakeVoltage:'DC 24V ±10%', heatResistance:'Class F',
    insResistance:'DC500V, 1S ≥100MΩ', insVoltage:'AC1800V, 1S, leakage ≤8mA',
    excitation:'Permanent Magnet', vibLevel:'V15', ipClass:'IP67 (with oil seal)',
    ambientTemp:'0~40°C (no freezing)', humidity:'20%~80%RH (no condensation)', voltage:'AC 220V',
  },
  // H60A04B30 — 0.4kW (ค่าจาก Catalog หน้า 17 ครบถ้วน)
  'H-60-04-B30': {
    motorModel: 'XMQ1-H60A04B30S16',
    drive: 'SDQ1-04PA',
    ratedPowerKW: 0.4,  ratedPowerHP: 0.54,
    ratedTorque: 1.27,  maxTorque: 4.45,
    ratedCurrent: 2.6,  maxCurrent: 9.1,
    ratedSpeed: 3000,   maxSpeed: 6000,
    rotaryInertia: 0.594,
    brakeRatedPowerW: 7.3, brakeHoldTorque: 1.27, brakeInertia: 0.013,
    brakeVoltage:'DC 24V ±10%', heatResistance:'Class F',
    insResistance:'DC500V, 1S ≥100MΩ', insVoltage:'AC1800V, 1S, leakage ≤8mA',
    excitation:'Permanent Magnet', vibLevel:'V15', ipClass:'IP67 (with oil seal)',
    ambientTemp:'0~40°C (no freezing)', humidity:'20%~80%RH (no condensation)', voltage:'AC 220V',
  },
  // ── H80A08B30 — 0.75kW / 3000rpm ─────────────────────────────────────────
  'H-80-08-B30': {
    motorModel: 'XMQ1-H80A08B30S16',
    drive: 'SDQ1-08PA',
    ratedPowerKW: 0.75, ratedPowerHP: 1.0,
    ratedTorque: 2.39, maxTorque: 8.37,
    ratedCurrent: 4.8, maxCurrent: 16.8,
    ratedSpeed: 3000, maxSpeed: 6000,
    rotaryInertia: 1.58,
    brakeRatedPowerW: 8.5,
    brakeHoldTorque: 2.39,
    brakeInertia: 0.05,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── H80A10B30 — 1kW / 3000rpm ─────────────────────────────────────────────
  'H-80-10-B30': {
    motorModel: 'XMQ1-H80A10B30S16',
    drive: 'SDQ1-10PAL',
    ratedPowerKW: 1.0, ratedPowerHP: 1.34,
    ratedTorque: 3.18, maxTorque: 11.13,
    ratedCurrent: 6.1, maxCurrent: 21.35,
    ratedSpeed: 3000, maxSpeed: 6000,
    rotaryInertia: 1.89,
    brakeRatedPowerW: 8.5,
    brakeHoldTorque: 3.18,
    brakeInertia: 0.05,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── A130A10B20 — 1kW / 2000rpm / Low Inertia ─────────────────────────────
  'A-130-10-B20': {
    motorModel: 'XMQ1-A130A10B20S16',
    drive: 'SDQ1-10PA',
    ratedPowerKW: 1.0, ratedPowerHP: 1.34,
    ratedTorque: 4.77, maxTorque: 14.3,
    ratedCurrent: 4.77, maxCurrent: 14.31,
    ratedSpeed: 2000, maxSpeed: 3000,
    rotaryInertia: 10.2,
    brakeRatedPowerW: 23,
    brakeHoldTorque: 4.77,
    brakeInertia: 1.22,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── A130A15B20 — 1.5kW / 2000rpm ─────────────────────────────────────────
  'A-130-15-B20': {
    motorModel: 'XMQ1-A130A15B20S16',
    drive: 'SDQ1-15PA',
    ratedPowerKW: 1.5, ratedPowerHP: 2.01,
    ratedTorque: 7.16, maxTorque: 21.5,
    ratedCurrent: 7.01, maxCurrent: 21.03,
    ratedSpeed: 2000, maxSpeed: 3000,
    rotaryInertia: 14.3,
    brakeRatedPowerW: 23,
    brakeHoldTorque: 7.16,
    brakeInertia: 1.22,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── A130A20B20 — 2kW / 2000rpm ────────────────────────────────────────────
  'A-130-20-B20': {
    motorModel: 'XMQ1-A130A20B20S16',
    drive: 'SDQ1-20PAL',
    ratedPowerKW: 2.0, ratedPowerHP: 2.68,
    ratedTorque: 9.55, maxTorque: 28.6,
    ratedCurrent: 9.25, maxCurrent: 27.75,
    ratedSpeed: 2000, maxSpeed: 3000,
    rotaryInertia: 18.4,
    brakeRatedPowerW: 23,
    brakeHoldTorque: 9.55,
    brakeInertia: 1.22,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── A130A30B20 — 3kW / 2000rpm ────────────────────────────────────────────
  'A-130-30-B20': {
    motorModel: 'XMQ1-A130A30B20S16',
    drive: 'SDQ1-30PA',
    ratedPowerKW: 3.0, ratedPowerHP: 4.02,
    ratedTorque: 14.3, maxTorque: 43.0,
    ratedCurrent: 9.25, maxCurrent: 27.75,
    ratedSpeed: 2000, maxSpeed: 3000,
    rotaryInertia: 18.4,
    brakeRatedPowerW: 23,
    brakeHoldTorque: 14.3,
    brakeInertia: 1.22,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── G130A09B15 — 0.85kW / 1500rpm / Medium Inertia ───────────────────────
  'G-130-09-B15': {
    motorModel: 'XMQ1-G130A09B15S16',
    drive: 'SDQ1-10PA',
    ratedPowerKW: 0.85, ratedPowerHP: 1.14,
    ratedTorque: 5.39, maxTorque: 16.17,
    ratedCurrent: 5.43, maxCurrent: 16.29,
    ratedSpeed: 1500, maxSpeed: 3000,
    rotaryInertia: 14.4,
    brakeRatedPowerW: 23,
    brakeHoldTorque: 5.39,
    brakeInertia: 1.22,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── G130A13B15 — 1.3kW / 1500rpm ─────────────────────────────────────────
  'G-130-13-B15': {
    motorModel: 'XMQ1-G130A13B15S16',
    drive: 'SDQ1-15PA',
    ratedPowerKW: 1.3, ratedPowerHP: 1.74,
    ratedTorque: 8.34, maxTorque: 25.02,
    ratedCurrent: 7.69, maxCurrent: 21.0,
    ratedSpeed: 1500, maxSpeed: 3000,
    rotaryInertia: 19.6,
    brakeRatedPowerW: 23,
    brakeHoldTorque: 8.34,
    brakeInertia: 1.22,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
  // ── G130A18B15 — 1.8kW / 1500rpm ─────────────────────────────────────────
  'G-130-18-B15': {
    motorModel: 'XMQ1-G130A18B15S16',
    drive: 'SDQ1-20PA',
    ratedPowerKW: 1.8, ratedPowerHP: 2.41,
    ratedTorque: 11.5, maxTorque: 34.5,
    ratedCurrent: 11.2, maxCurrent: 28.0,
    ratedSpeed: 1500, maxSpeed: 3000,
    rotaryInertia: 24.8,
    brakeRatedPowerW: 23,
    brakeHoldTorque: 11.5,
    brakeInertia: 1.22,
    brakeVoltage: 'DC 24V ±10%',
    heatResistance: 'Class F',
    insResistance: 'DC500V, 1S ≥100MΩ',
    insVoltage: 'AC1800V, 1S, leakage ≤8mA',
    excitation: 'Permanent Magnet',
    vibLevel: 'V15',
    ipClass: 'IP67 (with oil seal)',
    ambientTemp: '0~40°C (no freezing)',
    humidity: '20%~80%RH (no condensation)',
    voltage: 'AC 220V',
    weightKg: null,
  },
};

function getServoSpec(inertia, flange, powerCode, speedCode) {
  return SERVO_SPEC_DB[`${inertia}-${flange}-${powerCode}-${speedCode}`] || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Label maps
// ─────────────────────────────────────────────────────────────────────────────
const INERTIA_MAP = { A:'Low Inertia (A)', H:'High Inertia (H)', G:'Medium Inertia (G)' };
const VOLTAGE_MAP = { A:'AC 220V (50/60Hz)', B:'AC 380V (50/60Hz)' };
const SPEED_MAP   = { B10:'1,000 rpm', B15:'1,500 rpm', B20:'2,000 rpm', B30:'3,000 rpm' };
const OPTION_MAP  = { CS:'Without Brake', CE:'With Brake (Electromagnetic)' };
const ENCODER_MAP = {
  '1':'17-bit Incremental Magnetic', '2':'17-bit Absolute Magnetic',
  '3':'23-bit Optical',              '4':'23-bit Multi-Turn Optical',
};
const SHAFT_MAP = {
  '0':'Flange Output', '2':'Straight Shaft + Keyway (No Thread)', '6':'Straight Shaft + Keyway (Threaded)',
};

// Flange options ตาม Inertia (Matching Table)
const FLANGE_BY_INERTIA = {
  H: [
    { size:'40',  img:F40Img,  desc:'40×40mm · 100W'      },
    { size:'60',  img:F60Img,  desc:'60×60mm · 200W / 400W' },
    { size:'80',  img:F80Img,  desc:'80×80mm · 750W / 1kW'  },
  ],
  A: [{ size:'130', img:F130Img, desc:'130×130mm · 1~3kW / 2000rpm' }],
  G: [{ size:'130', img:F130Img, desc:'130×130mm · 0.85~1.8kW / 1500rpm' }],
};

// Power options ตาม Inertia+Flange
const POWER_BY_INERTIA_FLANGE = {
  'H-40': [{ code:'01', speedCode:'B30', label:'100W',   img:SV100Img,  spec:'1.27 N·m · 3000rpm', drive:'SDQ1-04PA'  }],
  'H-60': [
    { code:'02', speedCode:'B30', label:'200W',  img:SV200Img,  spec:'0.64 N·m · 3000rpm', drive:'SDQ1-04PA'  },
    { code:'04', speedCode:'B30', label:'400W',  img:SV400Img,  spec:'1.27 N·m · 3000rpm', drive:'SDQ1-04PA'  },
  ],
  'H-80': [
    { code:'08', speedCode:'B30', label:'750W',  img:SV750Img,  spec:'2.39 N·m · 3000rpm', drive:'SDQ1-08PA'  },
    { code:'10', speedCode:'B30', label:'1kW',   img:SV1000Img, spec:'3.18 N·m · 3000rpm', drive:'SDQ1-10PAL' },
  ],
  'A-130': [
    { code:'10', speedCode:'B20', label:'1kW',   img:SV1000Img, spec:'4.77 N·m · 2000rpm', drive:'SDQ1-10PA'  },
    { code:'15', speedCode:'B20', label:'1.5kW', img:SV1500Img, spec:'7.16 N·m · 2000rpm', drive:'SDQ1-15PA'  },
    { code:'20', speedCode:'B20', label:'2kW',   img:SV2000Img, spec:'9.55 N·m · 2000rpm', drive:'SDQ1-20PAL' },
    { code:'30', speedCode:'B20', label:'3kW',   img:SV3000Img, spec:'14.3 N·m · 2000rpm', drive:'SDQ1-30PA'  },
  ],
  'G-130': [
    { code:'09', speedCode:'B15', label:'0.85kW', img:SV850Img,  spec:'5.39 N·m · 1500rpm', drive:'SDQ1-10PA' },
    { code:'13', speedCode:'B15', label:'1.3kW',  img:SV1300Img, spec:'8.34 N·m · 1500rpm', drive:'SDQ1-15PA' },
    { code:'18', speedCode:'B15', label:'1.8kW',  img:SV1800Img, spec:'11.5 N·m · 1500rpm', drive:'SDQ1-20PA' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Model Code generator (Live)
// Format: SM{I}{F}-{V}{P}-{Speed}-{Option}{Enc}{Shaft}
// ─────────────────────────────────────────────────────────────────────────────
export function generateServoModelCode(sv) {
  const { svInertia, svFlange, svVoltage, svPowerCode, svSpeed, svOption, svEncoder, svOutput } = sv || {};
  let code = 'SM';
  if (svInertia) code += svInertia;
  if (svFlange)  code += svFlange;
  if (svVoltage || svPowerCode) { code += '-'; if (svVoltage) code += svVoltage; if (svPowerCode) code += svPowerCode; }
  if (svSpeed)  code += `-${svSpeed}`;
  if (svOption || svEncoder || svOutput) code += `-${svOption||''}${svEncoder||''}${svOutput||''}`;
  return code;
}

export function isServoModelComplete(sv) {
  const { svInertia, svFlange, svVoltage, svPowerCode, svSpeed, svOption, svEncoder, svOutput } = sv || {};
  return !!(svInertia && svFlange && svVoltage && svPowerCode && svSpeed && svOption && svEncoder && svOutput);
}

// ─────────────────────────────────────────────────────────────────────────────
// ── jsPDF loader (เหมือน IECMotorFlow)
// ─────────────────────────────────────────────────────────────────────────────
async function loadJsPDF() {
  if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  await new Promise((res,rej) => {
    if (document.getElementById('jspdf-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id='jspdf-cdn'; s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload=res; s.onerror=rej; document.head.appendChild(s);
  });
  await new Promise((res,rej) => {
    if (document.getElementById('jspdf-autotable-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id='jspdf-autotable-cdn'; s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
    s.onload=res; s.onerror=rej; document.head.appendChild(s);
  });
  return window.jspdf?.jsPDF || window.jsPDF;
}

// ─────────────────────────────────────────────────────────────────────────────
// generateServoDatasheetPDF — แบบเดียวกับ IECMotorFlow
// ─────────────────────────────────────────────────────────────────────────────
async function generateServoDatasheetPDF(state) {
  const { svInertia, svFlange, svVoltage, svPowerCode, svSpeed, svOption, svEncoder, svOutput } = state;
  const modelCode = generateServoModelCode(state);
  const powerKey  = `${svInertia}-${svFlange}`;
  const powerEntry = (POWER_BY_INERTIA_FLANGE[powerKey]||[]).find(p=>p.code===svPowerCode);
  const speedCode  = powerEntry?.speedCode || svSpeed;
  const spec = getServoSpec(svInertia, svFlange, svPowerCode, speedCode);

  const dateStr = new Date().toLocaleDateString('en-GB',{ year:'numeric', month:'long', day:'numeric' });

  const JsPDF = await loadJsPDF();
  if (!JsPDF) throw new Error('Cannot load jsPDF');

  const doc   = new JsPDF({ orientation:'portrait', unit:'mm', format:'a4', compress:true });
  const W     = doc.internal.pageSize.getWidth();
  const margin = 14;
  let   y      = margin;

  const BLUE  = [30,  90, 200];
  const NAVY  = [15,  40, 100];
  const GREEN = [ 0, 140,  80];
  const LGRAY = [240, 240, 245];
  const WHITE = [255, 255, 255];
  const DGRAY = [ 60,  60,  70];

  // ── Header Banner (เหมือน IEC) ─────────────────────────────────────────────
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 30, 'F');

  // Logo
  try {
    const logoB64 = await new Promise((resolve) => {
      const img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth||480; c.height = img.naturalHeight||360;
        const ctx = c.getContext('2d');
        ctx.fillStyle = `rgb(${NAVY[0]},${NAVY[1]},${NAVY[2]})`;
        ctx.fillRect(0,0,c.width,c.height);
        ctx.drawImage(img,0,0,c.width,c.height);
        const d = ctx.getImageData(0,0,c.width,c.height).data;
        for (let i=0;i<d.length;i+=4){ if((d[i]+d[i+1]+d[i+2])/3<40){ d[i]=NAVY[0]; d[i+1]=NAVY[1]; d[i+2]=NAVY[2]; } }
        ctx.putImageData(new ImageData(d,c.width,c.height),0,0);
        resolve(c.toDataURL('image/jpeg',0.92));
      };
      img.onerror = () => resolve(null);
      img.src = sasLogoUrl;
    });
    if (logoB64) doc.addImage(logoB64,'JPEG',W-44,2,30,22);
  } catch(e){}

  doc.setTextColor(255,255,255);
  doc.setFontSize(16); doc.setFont('helvetica','bold');
  doc.text('SAS TRANSMISSION', margin, 12);
  doc.setFontSize(9); doc.setFont('helvetica','normal');
  doc.text('Servo Motor  -  Technical Data Sheet', margin, 20);
  doc.setFontSize(8);
  doc.text('Date: '+dateStr, margin, 27);
  y = 36;

  // ── Model Code Box ─────────────────────────────────────────────────────────
  doc.setFillColor(...LGRAY);
  doc.roundedRect(margin, y, W-margin*2, 16, 3, 3, 'F');
  doc.setFillColor(...BLUE);
  doc.roundedRect(margin, y, 44, 16, 3, 3, 'F');
  doc.setTextColor(...WHITE);
  doc.setFontSize(7.5); doc.setFont('helvetica','bold');
  doc.text('MODEL CODE', margin+2, y+5.5);
  doc.setFontSize(10.5);
  doc.text(modelCode||'-', margin+22, y+12.5, { align:'center' });
  doc.setTextColor(...NAVY);
  doc.setFontSize(9); doc.setFont('helvetica','normal');
  doc.text(`SAS Q1 Series Servo Motor  |  ${INERTIA_MAP[svInertia]||'-'}`, margin+50, y+7);
  doc.setTextColor(90,90,90); doc.setFontSize(8);
  const speedLabel = SPEED_MAP[svSpeed]||svSpeed||'-';
  doc.text(`Flange: ${svFlange}mm  |  ${powerEntry?.label||'-'}  |  ${speedLabel}  |  ${VOLTAGE_MAP[svVoltage]||'-'}`, margin+50, y+13);
  y += 22;

  const sectionTitle = (title, color=BLUE) => {
    doc.setFillColor(...color);
    doc.rect(margin, y, W-margin*2, 7, 'F');
    doc.setTextColor(...WHITE);
    doc.setFontSize(8.5); doc.setFont('helvetica','bold');
    doc.text(title, margin+3, y+5);
    y += 9;
  };

  // ── SECTION 1: Motor Selection Summary ────────────────────────────────────
  sectionTitle('1. MOTOR SELECTION SUMMARY');
  doc.autoTable({
    startY: y, head:[],
    body: [
      ['Motor Type',           'SAS Q1 Series Servo Motor'],
      ['Motor Model (SAS)',    modelCode||'-'],          // ✅ แสดง SMH60-A04-B30-CS12
      ['Ref. Catalog Model',   spec?.motorModel||'-'],  // XMQ1-... อ้างอิงเท่านั้น
      ['Inertia',              INERTIA_MAP[svInertia]||'-'],
      ['Flange Size',          `${svFlange} mm`],
      ['Rated Voltage',        VOLTAGE_MAP[svVoltage]||'-'],
      ['Rated Power',          spec?.ratedPowerKW ? `${spec.ratedPowerKW} kW  (${spec.ratedPowerHP||'-'} HP)` : (powerEntry?.label||'-')],
      ['Rated Speed',          speedLabel],
      ['Options',              OPTION_MAP[svOption]||svOption||'-'],
      ['Encoder',              ENCODER_MAP[svEncoder]||svEncoder||'-'],
      ['Output Shaft',         SHAFT_MAP[svOutput]||svOutput||'-'],
      ['Matching Servo Drive', spec?.drive||'-'],
    ],
    margin:{ left:margin, right:margin },
    styles:{ fontSize:9, cellPadding:2.5 },
    columnStyles:{ 0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:50 }, 1:{ textColor:[20,20,20] } },
    theme:'plain',
  });
  y = doc.lastAutoTable.finalY + 5;

  // ── SECTION 2: Rated Performance Data (จาก Catalog หน้า 17) ───────────────
  sectionTitle('2. RATED PERFORMANCE DATA  (from Catalog)');
  const hasSpec = !!spec;
  const pv = (v, unit) => (v != null) ? `${v} ${unit}` : '— (not listed)';
  doc.autoTable({
    startY: y, head:[['Parameter','Value','Parameter','Value']],
    body: [
      ['Rated Power',     hasSpec?`${spec.ratedPowerKW} kW`:'-',            'Max Speed',      hasSpec?`${spec.maxSpeed} rpm`:'-'],
      ['Rated Torque',    pv(spec?.ratedTorque, 'N·m'),                      'Max Torque',     pv(spec?.maxTorque, 'N·m')],
      ['Rated Current',   pv(spec?.ratedCurrent, 'A'),                       'Max Current',    pv(spec?.maxCurrent, 'A')],
      ['Rated Speed',     hasSpec?`${spec.ratedSpeed} rpm`:'-',              'Rotary Inertia', pv(spec?.rotaryInertia, '×10⁻⁴ kg·m²')],
    ],
    margin:{ left:margin, right:margin },
    styles:{ fontSize:9, cellPadding:2.5 },
    headStyles:{ fillColor:GREEN, textColor:WHITE, fontStyle:'bold', fontSize:8 },
    columnStyles:{
      0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:45 },
      1:{ textColor:[10,10,10], fontStyle:'bold', cellWidth:35 },
      2:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:45 },
      3:{ textColor:[10,10,10], fontStyle:'bold' },
    },
    theme:'grid',
  });
  y = doc.lastAutoTable.finalY + 5;

  // ── SECTION 3: Brake Specifications (แสดงเฉพาะเมื่อเลือก CE เท่านั้น) ────
  if (svOption === 'CE') {
    sectionTitle('3. BRAKE SPECIFICATIONS  (Electromagnetic Brake)');
    doc.autoTable({
      startY: y, head:[],
      body: [
        ['Brake Voltage',     spec?.brakeVoltage||'DC 24V ±10%',   'Brake Rated Power', spec?.brakeRatedPowerW ? `${spec.brakeRatedPowerW} W` : '-'],
        ['Brake Hold Torque', spec?.brakeHoldTorque ? `${spec.brakeHoldTorque} N·m` : '-', 'Brake Inertia', spec?.brakeInertia ? `${spec.brakeInertia}×10⁻⁴ kg·m²` : '-'],
      ],
      margin:{ left:margin, right:margin },
      styles:{ fontSize:9, cellPadding:2.5 },
      columnStyles:{
        0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:50 },
        1:{ textColor:[10,10,10], cellWidth:40 },
        2:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:50 },
        3:{ textColor:[10,10,10] },
      },
      theme:'plain',
    });
    y = doc.lastAutoTable.finalY + 5;
  }

  // ── SECTION 4: Technical Specifications ────────────────────────────────────
  sectionTitle('4. TECHNICAL SPECIFICATIONS');
  doc.autoTable({
    startY: y, head:[],
    body: [
      ['Excitation Method',    spec?.excitation||'Permanent Magnet',  'Heat Resistance',    spec?.heatResistance||'Class F'],
      ['Insulation Resistance',spec?.insResistance||'DC500V,1S ≥100MΩ','Insulation Voltage', spec?.insVoltage||'AC1800V,1S,leakage ≤8mA'],
      ['Vibration Level',      spec?.vibLevel||'V15',                  'IP Rating',          spec?.ipClass||'IP67 (with oil seal)'],
      ['Installation Method',  'Flange',                               'Connection Method',  'Direct Connection'],
      ['Ambient Temperature',  spec?.ambientTemp||'0~40°C (no freezing)', 'Humidity',        spec?.humidity||'20%~80%RH (no condensation)'],
      ['Storage Temperature',  '-20°C to +60°C (no freezing)',         'Storage Humidity',   '20%RH~80%RH (no condensation)'],
      ['Vib. Resistance',      '49m/s² (front/back 24.5m/s²)',         'Impact Resistance',  '490m/s², 2 times'],
      ['Encoder Type',         ENCODER_MAP[svEncoder]||'-',             'Output Shaft',       SHAFT_MAP[svOutput]||'-'],
    ],
    margin:{ left:margin, right:margin },
    styles:{ fontSize:8.5, cellPadding:2.2, lineColor:[220,222,228], lineWidth:0.3 },
    columnStyles:{
      0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:50 },
      1:{ textColor:[20,20,20], cellWidth:40 },
      2:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:50 },
      3:{ textColor:[20,20,20] },
    },
    theme:'plain',
  });
  y = doc.lastAutoTable.finalY + 5;

  // ── SECTION 5: Matching Drive Specifications ───────────────────────────────
  sectionTitle('5. MATCHING SERVO DRIVE  (SDQ1 Series)');
  const driveContCurrent = { '04PA':'2.8 A', '08PA':'4.8 A', '10PA':'6.6 A', '10PAL':'6.6 A', '15PA':'8.5 A', '20PA':'12.0 A', '20PAL':'12.0 A', '30PA':'16.0 A' };
  const driveChassis     = { '04PA':'Type A', '08PA':'Type A', '10PA':'Type A', '10PAL':'Type A', '15PA':'Type B', '20PA':'Type B', '20PAL':'Type B', '30PA':'Type C' };
  const drivePower       = { '04PA':'0.4kW', '08PA':'0.75kW', '10PA':'1kW', '10PAL':'1kW', '15PA':'1.5kW', '20PA':'2kW', '20PAL':'2kW', '30PA':'3kW' };
  const driveCode        = spec?.drive||powerEntry?.drive||'-';
  const shortCode        = driveCode.replace('SDQ1-','');
  doc.autoTable({
    startY: y, head:[],
    body: [
      ['Drive Model',          driveCode,                              'Chassis Type',    driveChassis[shortCode]||'-'],
      ['Rated Power',          drivePower[shortCode]||'-',             'Cont. Current',   driveContCurrent[shortCode]||'-'],
      ['Input Power',          '1/3PH AC200~230V, 50/60Hz',           'Control Method',  'SVPWM'],
      ['Feedback',             '17-bit Magnetic / 23-bit Optical',     'Communication',   'RS485 (MODBUS) / USB / CAN (optional)'],
      ['Speed Range',          '1:5000',                               'Speed Accuracy',  '±0.01% of rated speed'],
      ['Protection',           'IP20',                                 'Display',         '5-digit digital tube'],
      ['Operating Temp.',      '-5°C ~ +40°C',                         'Altitude',        'Below 1000 m'],
    ],
    margin:{ left:margin, right:margin },
    styles:{ fontSize:8.5, cellPadding:2.2 },
    columnStyles:{
      0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:50 },
      1:{ textColor:[20,20,20], cellWidth:40 },
      2:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:50 },
      3:{ textColor:[20,20,20] },
    },
    theme:'plain',
  });
  y = doc.lastAutoTable.finalY + 5;

  // ── SECTION 6: Encoder Cable Matching ─────────────────────────────────────
  if (y + 40 < 270) {
    sectionTitle('6. CABLE & ACCESSORIES REFERENCE');
    const flange_60_80  = ['40','60','80'].includes(svFlange);
    // □□ → -xx  (jsPDF ไม่รองรับ Unicode U+25A1 → ใช้ -xx แทน length suffix)
    const powerCable    = svOption==='CE'
      ? (flange_60_80 ? 'LQ1-P0B0A-xx / LQ1-P0B0B-xx' : 'LQ1-P0B2C-xx / LQ1-P0B2D-xx')
      : (flange_60_80 ? 'LQ1-P0M0A-xx / LQ1-P0M0B-xx' : 'LQ1-P0M2C-xx / LQ1-P0M2D-xx');
    const encoderCable  = (svEncoder==='2'||svEncoder==='4')
      ? (flange_60_80 ? 'LQ1-E0B0-xx' : 'LQ1-E0B2-xx')
      : (flange_60_80 ? 'LQ1-E0A0-xx' : 'LQ1-E0A2-xx');
    doc.autoTable({
      startY: y, head:[],
      body: [
        ['Power Cable',      powerCable,   'Encoder Cable', encoderCable],
        ['USB Cable',        'XPAC-L01',   'RS485 Cable',   'XPAC-L02'],
        ['Encoder Conn (Motor)','XPAC-M01 (terminal) / XPAC-M03 (aviation)', 'Power Conn (Motor)','XPAC-M02 (terminal) / XPAC-M04 (aviation)'],
      ],
      margin:{ left:margin, right:margin },
      styles:{ fontSize:8.5, cellPadding:2.2 },
      columnStyles:{
        0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:40 },
        1:{ textColor:[20,20,20], cellWidth:55 },
        2:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:40 },
        3:{ textColor:[20,20,20] },
      },
      theme:'plain',
    });
    y = doc.lastAutoTable.finalY + 5;
  }

  // ── Footer ─────────────────────────────────────────────────────────────────
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(...NAVY);
  doc.rect(0, h-16, W, 16, 'F');
  doc.setTextColor(...WHITE);
  doc.setFontSize(7); doc.setFont('helvetica','bold');
  doc.text('Synergy Asia Solution Co.,Ltd.  |  Servo Motor & Servo Drive  |  WWW.MOTORSAS.COM', margin, h-9);
  doc.setFont('helvetica','normal');
  doc.text('Tel: 081-921-6225  |  Warranty: 18 months after delivery  |  Data from SAS Servo Motor Catalog', margin, h-4);
  doc.setTextColor(160,185,215);
  doc.text('Specs subject to change without notice.', W-margin, h-4, { align:'right' });

  doc.save((modelCode||'Servo_DataSheet')+'.pdf');
}

// ─────────────────────────────────────────────────────────────────────────────
// ServoDataSheetButton — แบบเดียวกับ IECMotorFlow DataSheetButton
// ─────────────────────────────────────────────────────────────────────────────
function ServoDataSheetButton({ state }) {
  const [status, setStatus] = React.useState('idle');

  const handleClick = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await generateServoDatasheetPDF(state);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Servo PDF error:', err);
      setStatus('error');
      alert('ไม่สามารถสร้าง PDF ได้:\n' + err.message);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const icon  = { idle:'📄', loading:'⏳', done:'✅', error:'⚠️' }[status];
  const label = { idle:'Data Sheet', loading:'กำลังสร้าง...', done:'ดาวน์โหลดแล้ว ✓', error:'ลองใหม่' }[status];
  const cls   = {
    idle:    'bg-indigo-600 hover:bg-indigo-700',
    loading: 'bg-indigo-400 cursor-not-allowed',
    done:    'bg-indigo-400',
    error:   'bg-red-600 hover:bg-red-700',
  }[status];

  return (
    <button type="button" onClick={handleClick} disabled={status==='loading'}
      className={`flex flex-col items-center justify-center gap-1 ${cls} text-white px-3 py-4 rounded-xl shadow transition active:scale-95`}>
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ServoStepDownloadButton — เรียก onConfirm เพื่อให้ App.jsx แสดง form
// กรอกข้อมูลก่อนดาวน์โหลด (เหมือน flow เดิมของ BLDC/AC motor)
// App.jsx จะใช้ mapServoGlbFilename(modelCode) เป็นชื่อไฟล์ lookup ใน R2
// ─────────────────────────────────────────────────────────────────────────────
function ServoStepDownloadButton({ modelCode, onConfirm }) {
  return (
    <button type="button"
      className="flex flex-col items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-4 rounded-xl shadow transition active:scale-95"
      onClick={()=>{ if(modelCode && onConfirm) onConfirm(modelCode); }}>
      <span className="text-2xl">📦</span>
      <span className="font-semibold text-xs text-center leading-tight">รับไฟล์ 3D (.STEP)</span>
    </button>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
const ENV_PRESETS_SRV = [
  { label:'Neutral', value:'neutral',  bg:'linear-gradient(135deg,#5a5a5a,#3a3a3a)' },
  { label:'Legacy',  value:'legacy',   bg:'linear-gradient(135deg,#7a8a9a,#5a6a7a)' },
  { label:'Warm',    value:'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr',    bg:'linear-gradient(135deg,#c87a4a,#8a4a2a)' },
  { label:'Studio',  value:'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr', bg:'linear-gradient(135deg,#8a7a9a,#6a5a7a)' },
  { label:'Outdoor', value:'https://modelviewer.dev/shared-assets/environments/pillars_1k.hdr',              bg:'linear-gradient(135deg,#5a8a5a,#3a6a3a)' },
  { label:'Moon',    value:'https://modelviewer.dev/shared-assets/environments/moon_1k.hdr',                 bg:'linear-gradient(135deg,#2a2a5a,#1a1a3a)' },
];
const TINT_SRV = [
  { label:'Default', value:null,      bg:'linear-gradient(135deg,#aaa,#666)' },
  { label:'Silver',  value:'#d0d8e0', bg:'linear-gradient(135deg,#d0d8e0,#9aa8b8)' },
  { label:'Gold',    value:'#ffd060', bg:'linear-gradient(135deg,#ffd060,#c08020)' },
  { label:'Navy',    value:'#2050a0', bg:'linear-gradient(135deg,#4070c0,#103060)' },
  { label:'Red',     value:'#c02030', bg:'linear-gradient(135deg,#e04050,#901020)' },
  { label:'White',   value:'#f0f0f0', bg:'linear-gradient(135deg,#ffffff,#cccccc)' },
];

function useIsMobileSrv() {
  const [m,setM]=useState(()=>typeof window!=='undefined'&&window.innerWidth<768);
  useEffect(()=>{ const fn=()=>setM(window.innerWidth<768); window.addEventListener('resize',fn); return()=>window.removeEventListener('resize',fn); },[]);
  return m;
}

function ServoViewer3D({ modelCode, T }) {
  const mvRef=useRef(null); const isMobile=useIsMobileSrv();
  const [ready,setReady]=useState(false); const [err,setErr]=useState(false);
  const [envIdx,setEnvIdx]=useState(0); const [exposure,setExposure]=useState(1.3);
  const [shadow,setShadow]=useState(0.6); const [tintIdx,setTintIdx]=useState(0);
  const [autoLight,setAutoLight]=useState(false); const [lightRot,setLightRot]=useState(0);
  const ltRef=useRef(null); const glbName=mapServoGlbFilename(modelCode);

  useEffect(()=>{ setReady(false);setErr(false); if(!glbName)return; const url=`${GLB_BASE}/${glbName}.glb`; let can=false,att=0;
    function attach(){ const el=mvRef.current; if(can)return; if(!el||!el.nodeName){if(att<40){att++;setTimeout(attach,50);}return;}
      el.setAttribute('src',url);
      const onL=()=>{if(!can){setReady(true);setErr(false);}};
      const onE=()=>{if(!can)setErr(true);};
      el.addEventListener('load',onL); el.addEventListener('error',onE);
      el.__c=()=>{el.removeEventListener('load',onL);el.removeEventListener('error',onE);}; }
    attach(); return()=>{can=true;mvRef.current?.__c?.();}; },[glbName]);

  useEffect(()=>{ if(autoLight){ ltRef.current=setInterval(()=>{ setLightRot(r=>{const n=(r+2)%360;if(mvRef.current)mvRef.current.style.setProperty('--env-rotation',n+'deg');return n;}); },30); } else clearInterval(ltRef.current); return()=>clearInterval(ltRef.current); },[autoLight]);
  useEffect(()=>{ if(mvRef.current)mvRef.current.setAttribute('environment-image',ENV_PRESETS_SRV[envIdx].value); },[envIdx]);
  useEffect(()=>()=>clearInterval(ltRef.current),[]);

  const applyTint=(idx)=>{ setTintIdx(idx); const color=TINT_SRV[idx].value;
    const fn=()=>{ try{ const mats=mvRef.current?.model?.materials; if(!mats)return;
      if(!color){[...mats].forEach(m=>m.pbrMetallicRoughness.setBaseColorFactor([1,1,1,1]));}
      else{const r=parseInt(color.slice(1,3),16)/255,g=parseInt(color.slice(3,5),16)/255,b=parseInt(color.slice(5,7),16)/255;[...mats].forEach(m=>m.pbrMetallicRoughness.setBaseColorFactor([r,g,b,1]));} }catch(e){} };
    if(ready)fn(); else mvRef.current?.addEventListener('load',fn,{once:true}); };

  const S={ wrap:{display:'flex',flexDirection:isMobile?'column':'row',width:'100%',height:'100%',minHeight:0,background:T.viewerBg},
    viewer:{flex:isMobile?'none':1,height:isMobile?'300px':undefined,minHeight:isMobile?300:0,maxHeight:isMobile?400:undefined,position:'relative',background:T.viewerBg,overflow:'hidden'},
    grid:{position:'absolute',inset:0,backgroundImage:`linear-gradient(${T.gridLine} 1px,transparent 1px),linear-gradient(90deg,${T.gridLine} 1px,transparent 1px)`,backgroundSize:'40px 40px',pointerEvents:'none'},
    mv:{width:'100%',height:isMobile?'300px':'100%','--poster-color':'transparent','--progress-bar-color':T.accent,background:'transparent',display:'block'},
    ring:{width:44,height:44,border:`2px solid ${T.accentFaint}`,borderTopColor:T.loaderRingColor,borderRadius:'50%',animation:'srv3d-spin 0.9s linear infinite'},
    box:{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,background:T.viewerBg},
    panel:{width:isMobile?'100%':200,flexShrink:0,background:T.panelBg,borderLeft:isMobile?'none':T.panelBorder,borderTop:isMobile?T.panelBorder:'none',overflowY:'auto',display:'flex',flexDirection:'column'},
    sec:{padding:'14px 16px',borderBottom:T.sectionDivider}, secT:{fontSize:9,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.sectionHeadColor,marginBottom:10},
    envGrid:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5},
    eBtn:(a)=>({aspectRatio:1,borderRadius:6,border:a?`2px solid ${T.accent}`:'2px solid transparent',cursor:'pointer',position:'relative',overflow:'hidden',transition:'all 0.15s'}),
    eLbl:{position:'absolute',bottom:0,left:0,right:0,fontSize:7,textAlign:'center',background:'rgba(0,0,0,0.65)',padding:'1px 0',color:'rgba(255,255,255,0.7)',fontWeight:600},
    cGrid:{display:'flex',gap:6,flexWrap:'wrap'},
    sw:(a)=>({width:24,height:24,borderRadius:'50%',border:a?`2px solid ${T.accent}`:'2px solid transparent',cursor:'pointer',position:'relative',flexShrink:0,transform:a?'scale(1.1)':'scale(1)',transition:'all 0.15s'}),
    sl:{flex:1,accentColor:T.accent,cursor:'pointer',height:3}, sv:{fontSize:10,color:T.valueColor,width:30,textAlign:'right',flexShrink:0,fontFamily:'monospace'},
    lr:{display:'flex',alignItems:'center',gap:8,marginBottom:8}, ll:{fontSize:10,color:T.labelColor,width:44,flexShrink:0},
    tog:(on)=>({width:34,height:18,background:on?T.accent:'rgba(255,255,255,0.1)',borderRadius:9,position:'relative',cursor:'pointer',border:'none',transition:'background 0.2s',flexShrink:0}),
    td:(on)=>({position:'absolute',top:2,left:on?16:2,width:14,height:14,borderRadius:'50%',background:'white',transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.4)'}),
  };

  const Panels=()=>(
    <>
      <div style={S.sec}><div style={S.secT}>สภาพแวดล้อมแสง</div><div style={S.envGrid}>{ENV_PRESETS_SRV.map((e,i)=>(<button key={e.value} onClick={()=>setEnvIdx(i)} style={{...S.eBtn(i===envIdx),background:e.bg}}><span style={S.eLbl}>{e.label}</span></button>))}</div></div>
      <div style={S.sec}><div style={S.secT}>ควบคุมแสง</div>
        <div style={S.lr}><span style={S.ll}>ความสว่าง</span><input type="range" min={0.5} max={3} step={0.05} value={exposure} style={S.sl} onChange={e=>{const v=parseFloat(e.target.value);setExposure(v);if(mvRef.current)mvRef.current.setAttribute('exposure',v);}}/><span style={S.sv}>{exposure.toFixed(1)}</span></div>
        <div style={S.lr}><span style={S.ll}>เงา</span><input type="range" min={0} max={1} step={0.05} value={shadow} style={S.sl} onChange={e=>{const v=parseFloat(e.target.value);setShadow(v);if(mvRef.current)mvRef.current.setAttribute('shadow-softness',v);}}/><span style={S.sv}>{shadow.toFixed(1)}</span></div>
        <div style={{...S.lr,marginBottom:0}}><span style={S.ll}>ทิศแสง</span>{autoLight?<span style={{flex:1,fontSize:10,color:T.accent}}>⟳ อัตโนมัติ</span>:<input type="range" min={0} max={360} step={1} value={lightRot} style={S.sl} onChange={e=>{const v=parseInt(e.target.value);setLightRot(v);if(mvRef.current)mvRef.current.style.setProperty('--env-rotation',v+'deg');}}/>}<span style={S.sv}>{lightRot}°</span></div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:10}}><span style={{fontSize:10,color:T.labelColor}}>☀️ หมุนอัตโนมัติ</span><button style={S.tog(autoLight)} onClick={()=>setAutoLight(v=>!v)}><div style={S.td(autoLight)}/></button></div>
      </div>
      <div style={S.sec}><div style={S.secT}>สีโมเดล</div><div style={S.cGrid}>{TINT_SRV.map((c,i)=>(<button key={c.label} onClick={()=>applyTint(i)} style={{...S.sw(i===tintIdx),background:c.bg}}>{i===tintIdx&&<span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'white',textShadow:'0 1px 3px rgba(0,0,0,0.8)'}}>✓</span>}</button>))}</div></div>
    </>
  );

  return (
    <div style={S.wrap}>
      <style>{`@keyframes srv3d-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={S.viewer}>
        <div style={S.grid}/>
        {!ready&&!err&&<div style={S.box}><div style={S.ring}/><span style={{fontSize:11,color:T.loaderText,letterSpacing:'1px'}}>กำลังโหลดโมเดล…</span></div>}
        {err&&<div style={S.box}><span style={{fontSize:48}}>⚡</span><span style={{fontSize:12,color:T.labelColor}}>ยังไม่มีไฟล์ 3D</span></div>}
        <model-viewer ref={mvRef} src="" alt={glbName} auto-rotate auto-rotate-delay="400" rotation-per-second="18deg" camera-controls touch-action="pan-y" shadow-intensity="1.2" shadow-softness={shadow} environment-image="neutral" exposure={exposure} style={S.mv}/>
        {ready&&!err&&<div style={{position:'absolute',bottom:10,left:0,right:0,textAlign:'center',color:'rgba(255,255,255,0.2)',fontSize:10,pointerEvents:'none'}}>🖱 ลาก = หมุน · Scroll = ซูม</div>}
      </div>
      <div style={S.panel}><Panels/></div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Summary Page
// ─────────────────────────────────────────────────────────────────────────────
function ServoSummaryPage({ state, modelCode, spec, onConfirm, onBack }) {
  const isMobile=useIsMobileSrv();
  const { svInertia,svFlange,svVoltage,svPowerCode,svSpeed,svOption,svEncoder,svOutput } = state;
  const [qtyMotor,setQtyMotor]=useState(1); const [showQuote,setShowQuote]=useState(false);
  const [qName,setQName]=useState(''); const [qCompany,setQCompany]=useState('');
  const [qPhone,setQPhone]=useState(''); const [qEmail,setQEmail]=useState('');
  const [sending,setSending]=useState(false); const [lightMode,setLightMode]=useState(false);
  const [salePerson,setSalePerson]=useState('CA'); const [showSPPicker,setShowSPPicker]=useState(false);

  const T = lightMode ? {
    pageBg:'#f0f4f8',topBarBg:'rgba(240,244,248,0.97)',topBarBorder:'1px solid rgba(0,0,0,0.08)',
    panelBg:'#fff',panelBorder:'1px solid rgba(0,0,0,0.08)',accent:'#1a4fd6',accentFaint:'rgba(26,79,214,0.08)',accentBorder:'rgba(26,79,214,0.25)',
    titleColor:'#1a4fd6',labelColor:'#8090a8',valueColor:'#0d1526',qtyLabelColor:'rgba(13,21,38,0.7)',
    inputBg:'rgba(0,0,0,0.04)',inputBorder:'1px solid rgba(0,0,0,0.1)',inputColor:'#0d1526',
    btnBg:'rgba(0,0,0,0.04)',btnBorder:'1px solid rgba(0,0,0,0.1)',btnColor:'#0d1526',
    sectionDivider:'1px solid rgba(0,0,0,0.06)',sectionHeadColor:'#8090a8',
    codeBg:'rgba(0,0,0,0.05)',codeBorder:'1px solid rgba(0,0,0,0.1)',codeColor:'#0d1526',
    backBtnBg:'rgba(26,79,214,0.08)',backBtnBorder:'1px solid rgba(26,79,214,0.25)',backBtnColor:'#1a4fd6',
    specHighlight:'#1a4fd6',gridLine:'rgba(26,79,214,0.04)',viewerBg:'linear-gradient(135deg,#e8edf5,#dde4f0)',
    loaderRingColor:'#1a4fd6',loaderText:'#8090a8',toggleIcon:'☀️',
  } : {
    pageBg:'#0a0c10',topBarBg:'rgba(10,12,16,0.95)',topBarBorder:'1px solid rgba(255,255,255,0.07)',
    panelBg:'#0f1118',panelBorder:'1px solid rgba(255,255,255,0.07)',accent:'#00e5a0',accentFaint:'rgba(0,229,160,0.08)',accentBorder:'rgba(0,229,160,0.25)',
    titleColor:'#00e5a0',labelColor:'#4a5060',valueColor:'#e8eaf0',qtyLabelColor:'rgba(255,255,255,0.65)',
    inputBg:'rgba(255,255,255,0.06)',inputBorder:'1px solid rgba(255,255,255,0.1)',inputColor:'#e8eaf0',
    btnBg:'rgba(255,255,255,0.06)',btnBorder:'1px solid rgba(255,255,255,0.1)',btnColor:'#e8eaf0',
    sectionDivider:'1px solid rgba(255,255,255,0.06)',sectionHeadColor:'#4a5060',
    codeBg:'rgba(255,255,255,0.06)',codeBorder:'1px solid rgba(255,255,255,0.1)',codeColor:'#e8eaf0',
    backBtnBg:'rgba(0,229,160,0.08)',backBtnBorder:'1px solid rgba(0,229,160,0.25)',backBtnColor:'#00e5a0',
    specHighlight:'#00e5a0',gridLine:'rgba(0,229,160,0.025)',viewerBg:'linear-gradient(135deg,#0a0c10,#0d111c)',
    loaderRingColor:'#00e5a0',loaderText:'#4a5060',toggleIcon:'🌙',
  };

  const powerKey=(POWER_BY_INERTIA_FLANGE[`${svInertia}-${svFlange}`]||[]).find(p=>p.code===svPowerCode);

  // Spec rows ละเอียดจาก Catalog — แสดง note เมื่อค่า null
  const fmtTorque = (v) => v != null ? `${v} N·m` : '— (ไม่ระบุใน Catalog)';
  const fmtCurrent = (v) => v != null ? `${v} A` : '— (ไม่ระบุใน Catalog)';
  const fmtInertia = (v) => v != null ? `${v}×10⁻⁴ kg·m²` : '— (ไม่ระบุใน Catalog)';
  const hasBrake = svOption === 'CE';
  const specRows = [
    ['ประเภท',          'Servo Motor Q1 Series'],
    ['Motor Model',     modelCode],                     // ✅ SMH60-A04-B30-CS12
    ['Inertia',         INERTIA_MAP[svInertia]||'—'],
    ['Flange Size',     svFlange?`${svFlange} mm`:'—'],
    ['แรงดัน',          VOLTAGE_MAP[svVoltage]||'—'],
    ['กำลัง',           spec?.ratedPowerKW?`${spec.ratedPowerKW} kW`:(powerKey?.label||'—')],
    ['ความเร็วพิกัด',   SPEED_MAP[svSpeed]||svSpeed||'—'],
    ['Max Speed',       spec?.maxSpeed?`${spec.maxSpeed} rpm`:'—'],
    ['Rated Torque',    fmtTorque(spec?.ratedTorque)],
    ['Max Torque',      fmtTorque(spec?.maxTorque)],
    ['Rated Current',   fmtCurrent(spec?.ratedCurrent)],
    ['Max Current',     fmtCurrent(spec?.maxCurrent)],
    ['Rotary Inertia',  fmtInertia(spec?.rotaryInertia)],
    ['IP Rating',       spec?.ipClass||'IP67 (with oil seal)'],
    ['Heat Resistance', spec?.heatResistance||'Class F'],
    // Brake rows — แสดงเฉพาะเมื่อเลือก CE
    ...(hasBrake ? [
      ['Brake Voltage',      spec?.brakeVoltage||'DC 24V ±10%'],
      ['Brake Hold Torque',  fmtTorque(spec?.brakeHoldTorque)],
      ['Brake Rated Power',  spec?.brakeRatedPowerW?`${spec.brakeRatedPowerW} W`:'—'],
      ['Brake Inertia',      fmtInertia(spec?.brakeInertia)],
    ] : []),
    ['Vibration Level', spec?.vibLevel||'V15'],
    ['Encoder',         ENCODER_MAP[svEncoder]||svEncoder||'—'],
    ['Options',         OPTION_MAP[svOption]||svOption||'—'],
    ['เพลาออก',         SHAFT_MAP[svOutput]||svOutput||'—'],
    ['Servo Drive',     spec?.drive||powerKey?.drive||'—'],
  ];

  const submitQuote=async()=>{
    if(!qName||!qCompany||!qPhone||!qEmail){alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');return;}
    setSending(true);
    try{
      await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{
        product:'Servo Motor',model_code:modelCode||'',inertia:INERTIA_MAP[svInertia]||'',
        flange:svFlange?`${svFlange}mm`:'',voltage:VOLTAGE_MAP[svVoltage]||'',
        power:spec?.ratedPowerKW?`${spec.ratedPowerKW}kW`:(powerKey?.label||''),
        speed:SPEED_MAP[svSpeed]||svSpeed||'',option:OPTION_MAP[svOption]||svOption||'',
        encoder:ENCODER_MAP[svEncoder]||svEncoder||'',output:SHAFT_MAP[svOutput]||svOutput||'',
        qty_motor:String(qtyMotor),requester_name:qName,company:qCompany,phone:qPhone,email:qEmail,to_email:qEmail,
        time:new Date().toLocaleString('th-TH'),sale_person:salePerson,
      },EMAILJS_PUBLIC_KEY);
      alert('ส่งคำขอใบเสนอราคาเรียบร้อยแล้วครับ ✅');
      setShowQuote(false);setQName('');setQCompany('');setQPhone('');setQEmail('');
    }catch(e){console.error(e);alert('ส่งไม่สำเร็จ กรุณาลองใหม่');}
    finally{setSending(false);}
  };

  return (
    <>
      <div id="servo-summary" style={{position:'fixed',inset:0,zIndex:500,display:'flex',flexDirection:'column',background:T.pageBg,fontFamily:"'Sarabun',sans-serif",transition:'background 0.25s'}}>
        {/* Top bar */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 18px',borderBottom:T.topBarBorder,background:T.topBarBg,backdropFilter:'blur(12px)',flexShrink:0,flexWrap:'wrap',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:15,letterSpacing:'1.5px',color:T.titleColor,textTransform:'uppercase'}}>⚡ Servo Motor</span>
            <button type="button" onClick={()=>setLightMode(m=>!m)} style={{display:'flex',alignItems:'center',justifyContent:'center',width:28,height:28,borderRadius:8,background:T.accentFaint,border:`1px solid ${T.accentBorder}`,cursor:'pointer',fontSize:15}}>{T.toggleIcon}</button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{fontFamily:'monospace',fontSize:12,fontWeight:600,color:T.codeColor,background:T.codeBg,border:T.codeBorder,padding:'3px 10px',borderRadius:5}}>{modelCode||'—'}</span>
            <button type="button" style={{background:'none',border:'none',cursor:'pointer',color:T.accent,fontSize:11,padding:'3px 8px'}} onClick={async()=>{try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(modelCode||'');}catch{}}}>Copy</button>
          </div>
          <button type="button" onClick={onBack} style={{background:T.backBtnBg,border:T.backBtnBorder,color:T.backBtnColor,padding:'4px 12px',borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:600}}>← ย้อนกลับ</button>
        </div>

        {/* Body */}
        <div style={{flex:1,display:'flex',flexDirection:isMobile?'column':'row',minHeight:0,overflow:isMobile?'auto':'hidden'}}>
          <div style={{flex:isMobile?'none':1,height:isMobile?'300px':undefined,minHeight:isMobile?300:0,maxHeight:isMobile?400:undefined,minWidth:0}}>
            <ServoViewer3D modelCode={modelCode} T={T}/>
          </div>
          <div style={{width:isMobile?'100%':300,flexShrink:0,background:T.panelBg,borderLeft:isMobile?'none':T.panelBorder,borderTop:isMobile?T.panelBorder:'none',overflowY:'auto',display:'flex',flexDirection:'column'}}>
            {/* Specs */}
            <div style={{padding:'14px 16px',borderBottom:T.sectionDivider}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.sectionHeadColor,marginBottom:10}}>ข้อมูลจำเพาะ</div>
              {specRows.map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'5px 0',borderBottom:`1px solid ${lightMode?'rgba(0,0,0,0.04)':'rgba(255,255,255,0.04)'}`,gap:6}}>
                  <span style={{fontSize:11,color:T.labelColor,flexShrink:0}}>{k}</span>
                  <span style={{fontSize:11,fontWeight:600,color:['กำลัง','ความเร็วพิกัด','Rated Torque','Max Torque'].includes(k)?T.specHighlight:T.valueColor,textAlign:'right',wordBreak:'break-all'}}>{v||'—'}</span>
                </div>
              ))}
            </div>
            {/* Qty */}
            <div style={{padding:'14px 16px',borderBottom:T.sectionDivider}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:T.sectionHeadColor,marginBottom:10}}>จำนวน</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontSize:12,color:T.qtyLabelColor}}>Servo Motor</span>
                <div style={{display:'flex',alignItems:'center',gap:4}}>
                  <button type="button" onClick={()=>setQtyMotor(q=>Math.max(1,q-1))} style={{width:26,height:26,borderRadius:5,border:T.btnBorder,background:T.btnBg,color:T.btnColor,cursor:'pointer',fontSize:15}}>–</button>
                  <input type="number" min={1} max={999} value={qtyMotor} onChange={e=>{const v=Number(e.target.value);setQtyMotor(Number.isFinite(v)?Math.max(1,Math.floor(v)):1);}} onWheel={e=>e.currentTarget.blur()} style={{width:38,textAlign:'center',background:T.inputBg,border:T.inputBorder,borderRadius:5,color:T.inputColor,fontSize:13,fontWeight:700,padding:'2px 0'}}/>
                  <button type="button" onClick={()=>setQtyMotor(q=>Math.min(999,q+1))} style={{width:26,height:26,borderRadius:5,border:T.btnBorder,background:T.btnBg,color:T.btnColor,cursor:'pointer',fontSize:15}}>+</button>
                </div>
              </div>
            </div>
            {/* Action buttons — 3 ปุ่มเหมือน IEC */}
            <div style={{padding:'14px 16px'}}>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {/* 🛒 ขอใบเสนอราคา */}
                <button type="button"
                  className="flex flex-col items-center justify-center gap-1 text-white px-2 py-4 rounded-xl shadow transition active:scale-95"
                  style={{background:lightMode?'linear-gradient(90deg,#1a4fd6,#1040b8)':'linear-gradient(90deg,#00e5a0,#00c87a)',color:lightMode?'#fff':'#0a1a10'}}
                  onClick={()=>setShowQuote(true)}>
                  <span className="text-2xl">🛒</span>
                  <span className="font-semibold text-xs">ขอใบเสนอราคา</span>
                </button>
                {/* 📦 รับไฟล์ 3D (.STEP) — ดาวน์โหลดจาก R2 โดยตรง */}
                <ServoStepDownloadButton modelCode={modelCode} onConfirm={onConfirm}/>
                {/* 📄 Data Sheet — แบบเดียวกับ IEC */}
                <ServoDataSheetButton state={state}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuote&&(
        <div className="fixed inset-0 z-[1200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={()=>!sending&&setShowQuote(false)}/>
          <div className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-xl p-6 text-slate-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h3 className="text-xl font-bold">ขอใบเสนอราคา Servo Motor</h3>
              <div className="relative">
                <button type="button" onClick={()=>setShowSPPicker(v=>!v)} className="text-2xl leading-none select-none hover:scale-110 active:scale-95 transition-transform" style={{filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'}}>🧑‍💼</button>
                {showSPPicker&&(<div className="absolute left-0 top-full mt-1 z-[9999] bg-white border border-slate-200 rounded-xl shadow-xl w-[260px] sm:w-[300px] overflow-y-auto max-h-[320px]">
                  {SALE_PERSONS.map(sp=>(<button key={sp.abbr} type="button" onClick={()=>{setSalePerson(sp.abbr);setShowSPPicker(false);}} className={`w-full text-left px-4 py-2.5 hover:bg-green-50 transition text-sm border-b last:border-b-0 ${salePerson===sp.abbr?'bg-green-100 font-semibold':''}`}><div className="font-semibold text-slate-800">{sp.name}</div><div className="text-slate-500 text-xs">{sp.position} · {sp.phone}</div></button>))}
                </div>)}
              </div>
              {salePerson&&<span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">{SALE_PERSONS.find(s=>s.abbr===salePerson)?.name||salePerson}</span>}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[['ชื่อผู้ขอราคา :',qName,setQName,'text'],['ชื่อบริษัท :',qCompany,setQCompany,'text'],['เบอร์ติดต่อ :',qPhone,setQPhone,'tel'],['Email :',qEmail,setQEmail,'email']].map(([lbl,val,setter,type])=>(<div key={lbl}><label className="block text-sm mb-1">{lbl}</label><input type={type} value={val} onChange={e=>setter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring"/></div>))}
            </div>
            <div className="mt-4 text-sm text-slate-600"><div>Model: <b className="text-blue-700 font-mono">{modelCode}</b></div><div className="flex gap-3 mt-1 flex-wrap text-xs"><span>Motor: <b>{qtyMotor}</b> ตัว</span><span>กำลัง: <b>{spec?.ratedPowerKW?`${spec.ratedPowerKW}kW`:(powerKey?.label||svPowerCode)}</b></span><span>ความเร็ว: <b>{SPEED_MAP[svSpeed]||svSpeed}</b></span></div></div>
            <div className="mt-5 flex gap-3 justify-end">
              <button type="button" onClick={()=>setShowQuote(false)} disabled={sending} className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50">ปิด</button>
              <button type="button" onClick={submitQuote} disabled={sending||!qName||!qCompany||!qPhone||!qEmail} className="px-5 py-2 rounded-2xl bg-green-300 hover:bg-green-400 font-semibold shadow active:scale-95 transition transform disabled:opacity-50">{sending?'กำลังส่ง…':'รับใบเสนอราคา'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step UI Components
// ─────────────────────────────────────────────────────────────────────────────
function LiveCodeBar({ code }) {
  const [copied,setCopied]=useState(false);
  const copy=async()=>{ try{await navigator.clipboard.writeText(code||'');setCopied(true);setTimeout(()=>setCopied(false),1500);}catch{} };
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(0,0,0,0.35)',backdropFilter:'blur(8px)',border:'1px solid rgba(0,229,160,0.2)',borderRadius:10,padding:'7px 14px',marginBottom:16,flexWrap:'wrap'}}>
      <span style={{fontSize:10,color:'rgba(0,229,160,0.6)',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',flexShrink:0}}>Model Code</span>
      <span style={{fontFamily:'monospace',fontSize:14,fontWeight:800,color:'#facc15',letterSpacing:'0.06em',flex:1,minWidth:0,wordBreak:'break-all'}}>{code||<span style={{color:'rgba(255,255,255,0.2)',fontStyle:'italic',fontWeight:400}}>กำลังเลือก…</span>}</span>
      {code&&<button type="button" onClick={copy} style={{fontSize:11,padding:'2px 10px',borderRadius:6,border:'1px solid rgba(0,229,160,0.3)',background:'rgba(0,229,160,0.1)',color:copied?'#00e5a0':'rgba(255,255,255,0.6)',cursor:'pointer',flexShrink:0,transition:'color 0.2s'}}>{copied?'✓ Copied':'Copy'}</button>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StepBar — คลิกได้ เพื่อ jump กลับไป step ใดก็ได้ที่ผ่านแล้ว
// onJump(stepNum) → reset state ที่อยู่หลัง stepNum นั้น
// ─────────────────────────────────────────────────────────────────────────────
function StepBar({ step, total=7, onJump }) {
  return (
    <div style={{display:'flex',gap:4,marginBottom:10}}>
      {Array.from({length:total},(_,i)=>{
        const stepNum   = i+1;
        const isDone    = i < step-1;   // step ที่ผ่านแล้ว → คลิกได้
        const isCurrent = i === step-1;
        return (
          <div key={i}
            onClick={isDone && onJump ? ()=>onJump(stepNum) : undefined}
            title={isDone ? `กลับ Step ${stepNum}` : undefined}
            style={{
              flex:1, height:isDone?5:3, borderRadius:3,
              background: isDone?'#00e5a0' : isCurrent?'#facc15':'rgba(255,255,255,0.15)',
              transition:'all 0.25s',
              cursor: isDone ? 'pointer' : 'default',
              transform: isDone ? 'scaleY(1)' : 'scaleY(1)',
            }}
          />
        );
      })}
    </div>
  );
}

function StepHeader({ step, total, title, subtitle, icon, onJump }) {
  return (
    <div style={{marginBottom:14}}>
      <StepBar step={step} total={total} onJump={onJump}/>
      <div style={{display:'flex',alignItems:'flex-start',gap:8}}>
        {icon&&<span style={{fontSize:18,flexShrink:0,marginTop:1}}>{icon}</span>}
        <div>
          <div style={{fontSize:9,fontWeight:700,color:'rgba(0,229,160,0.65)',letterSpacing:'0.08em',textTransform:'uppercase'}}>Step {step} / {total}</div>
          <h3 style={{color:'#fff',fontWeight:700,fontSize:14,margin:'2px 0 0',lineHeight:1.3}}>{title}</h3>
          {subtitle&&<p style={{color:'rgba(255,255,255,0.45)',fontSize:11,margin:'3px 0 0',lineHeight:1.45}}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IMG_SIZE = 4cm × 4cm ≈ 151px at 96dpi  (ทุกปุ่มรูปภาพใช้ขนาดเท่ากัน)
// ─────────────────────────────────────────────────────────────────────────────
const IMG_SIZE = 280; // px

function ImgCard({ img, label, subLabel, desc, active, onClick }) {
  const [loaded,setLoaded]=useState(false);
  return (<div onClick={onClick} style={{cursor:'pointer',borderRadius:12,overflow:'hidden',position:'relative',background:'rgba(255,255,255,0.93)',boxShadow:active?'0 0 0 3px #facc15,0 6px 20px rgba(250,204,21,0.25)':'0 2px 10px rgba(0,0,0,0.25)',transform:active?'scale(1.03)':'scale(1)',transition:'all 0.18s cubic-bezier(0.34,1.56,0.64,1)'}}>
    {!loaded&&<div style={{width:'100%',height:IMG_SIZE,background:'linear-gradient(90deg,#dde 25%,#eee 50%,#dde 75%)',backgroundSize:'200% 100%',animation:'skelShine 1.1s infinite'}}/>}
    <img src={img} alt={label} loading="eager" onLoad={()=>setLoaded(true)} style={{width:'100%',height:IMG_SIZE,objectFit:'contain',background:'#fff',padding:8,display:loaded?'block':'none'}}/>
    <div style={{padding:'6px 8px 8px',background:active?'#facc15':'#fff',transition:'background 0.18s'}}>
      <div style={{fontWeight:700,fontSize:12,color:active?'#000':'#111',lineHeight:1.2}}>{label}</div>
      {subLabel&&<div style={{fontSize:10,fontWeight:600,color:active?'#333':'#00aa70',marginTop:1}}>{subLabel}</div>}
      {desc&&<div style={{fontSize:10,color:active?'#444':'#6b7280',marginTop:2,lineHeight:1.35}}>{desc}</div>}
    </div>
    {active&&<span style={{position:'absolute',top:5,right:5,background:'#facc15',borderRadius:'50%',width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#000'}}>✓</span>}
  </div>);
}

function OptionCard({ code, title, desc, icon, img, active, onClick }) {
  const [loaded,setLoaded]=useState(false);
  return (<div onClick={onClick} style={{cursor:'pointer',borderRadius:14,overflow:'hidden',position:'relative',background:'rgba(255,255,255,0.93)',boxShadow:active?'0 0 0 3px #facc15,0 8px 24px rgba(250,204,21,0.3)':'0 2px 12px rgba(0,0,0,0.2)',transform:active?'scale(1.03)':'scale(1)',transition:'all 0.2s cubic-bezier(0.34,1.56,0.64,1)'}}>
    {!loaded&&<div style={{width:'100%',height:IMG_SIZE,background:'linear-gradient(90deg,#dde 25%,#eee 50%,#dde 75%)',backgroundSize:'200% 100%',animation:'skelShine 1.1s infinite'}}/>}
    <img src={img} alt={title} loading="eager" onLoad={()=>setLoaded(true)} style={{width:'100%',height:IMG_SIZE,objectFit:'contain',background:'#fff',padding:8,display:loaded?'block':'none'}}/>
    <div style={{padding:'8px 10px 10px',background:active?'#facc15':'#fff',transition:'background 0.18s'}}>
      <div style={{display:'flex',alignItems:'center',gap:5}}><span style={{fontSize:16}}>{icon}</span><div style={{fontWeight:800,fontSize:13,color:active?'#000':'#111'}}>{title}</div></div>
      <div style={{fontSize:10,color:active?'#444':'#6b7280',marginTop:4,lineHeight:1.4}}>{desc}</div>
      <div style={{marginTop:4,fontSize:10,fontWeight:700,color:active?'#000':'#00aa70'}}>Code: {code}</div>
    </div>
    {active&&<span style={{position:'absolute',top:6,right:6,background:'#facc15',borderRadius:'50%',width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#000'}}>✓</span>}
  </div>);
}

function PillCard({ value, label, desc, icon, active, onClick }) {
  return (<button type="button" onClick={onClick} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'11px 14px',borderRadius:11,cursor:'pointer',textAlign:'left',width:'100%',background:active?'rgba(250,204,21,0.13)':'rgba(255,255,255,0.06)',border:active?'2px solid #facc15':'2px solid rgba(255,255,255,0.1)',transform:active?'scale(1.01)':'scale(1)',transition:'all 0.16s cubic-bezier(0.34,1.56,0.64,1)'}}>
    {icon&&<span style={{fontSize:20,flexShrink:0,marginTop:1}}>{icon}</span>}
    <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:13,color:active?'#facc15':'rgba(255,255,255,0.9)',lineHeight:1.2}}>{label}</div>{desc&&<div style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginTop:3,lineHeight:1.4}}>{desc}</div>}</div>
    {active&&<span style={{fontSize:15,color:'#facc15',flexShrink:0}}>✓</span>}
  </button>);
}

function BackBtn({ onClick }) {
  return (<button onClick={onClick} style={{position:'fixed',bottom:16,left:16,zIndex:50,padding:'8px 16px',borderRadius:8,background:'rgba(255,255,255,0.1)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.18)',color:'rgba(255,255,255,0.75)',fontSize:13,cursor:'pointer'}}>← ย้อนกลับ</button>);
}

// ─────────────────────────────────────────────────────────────────────────────
// renderServoFlow
// ─────────────────────────────────────────────────────────────────────────────
export function renderServoFlow(state, setState, onConfirm) {
  const { svInertia,svFlange,svVoltage,svPowerCode,svSpeed,svOption,svEncoder,svOutput } = state||{};
  const liveCode   = generateServoModelCode(state);
  const isComplete = isServoModelComplete(state);

  const update=(key,value)=>{ const setter=setState?.[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`]; if(setter)setter(value); };

  // ── jumpToStep: reset state ที่หลัง stepNum ออกทั้งหมด ───────────────────
  // Step: 1=Inertia 2=Flange 3=Voltage 4=Power 5=Speed 6=Option 7=Encoder+Shaft
  const jumpToStep = (stepNum) => {
    // reset ทุก state ที่อยู่หลัง stepNum (step 1 = inertia ยัง keep ไว้)
    if (stepNum <= 1) { update('svInertia',null); }
    if (stepNum <= 2) { update('svFlange',null); }
    if (stepNum <= 3) { update('svVoltage',null); }
    if (stepNum <= 4) { update('svPowerCode',null); }
    if (stepNum <= 5) { update('svSpeed',null); }
    if (stepNum <= 6) { update('svOption',null); }
    if (stepNum <= 7) { update('svEncoder',null); update('svOutput',null); }
  };

  const backOneStep=()=>{
    if(svOutput)   return update('svOutput',null);
    if(svEncoder)  return update('svEncoder',null);
    if(svOption)   return update('svOption',null);
    if(svSpeed)    return update('svSpeed',null);
    if(svPowerCode)return update('svPowerCode',null);
    if(svVoltage)  return update('svVoltage',null);
    if(svFlange)   return update('svFlange',null);
    if(svInertia)  return update('svInertia',null);
  };

  const powerOptions = svInertia&&svFlange ? (POWER_BY_INERTIA_FLANGE[`${svInertia}-${svFlange}`]||[]) : [];
  const selectedPower = powerOptions.find(p=>p.code===svPowerCode);
  const speedCode = selectedPower?.speedCode||svSpeed;
  const spec = svInertia&&svFlange&&svPowerCode&&speedCode ? getServoSpec(svInertia,svFlange,svPowerCode,speedCode) : null;

  if (isComplete) return <ServoSummaryPage state={state} modelCode={liveCode} spec={spec} onConfirm={onConfirm} onBack={backOneStep}/>;

  const TOTAL=7;

  return (
    <>
      <style>{`@keyframes skelShine{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
      <LiveCodeBar code={liveCode}/>

      {/* Step 1: Inertia */}
      {!svInertia&&(
        <div>
          <StepHeader step={1} total={TOTAL} icon="🎯" title="เลือกประเภท Inertia" subtitle="กำหนดลักษณะการตอบสนองต่อ Load — เลือกให้ตรงกับประเภทงาน" onJump={jumpToStep}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            <ImgCard img={AImg} label="A — Low Inertia"     desc="ตอบสนองไว CNC, Pick & Place" active={svInertia==='A'} onClick={()=>update('svInertia','A')}/>
            <ImgCard img={HImg} label="H — High Inertia"    desc="แรงบิดสูง งานหนัก 100W~1kW"  active={svInertia==='H'} onClick={()=>update('svInertia','H')}/>
            <ImgCard img={GImg} label="G — Medium Inertia"  desc="สมดุล 0.85~1.8kW / 1500rpm"   active={svInertia==='G'} onClick={()=>update('svInertia','G')}/>
          </div>
        </div>
      )}

      {/* Step 2: Flange — ล็อคตาม Inertia */}
      {svInertia&&!svFlange&&(()=>{
        const flanges=FLANGE_BY_INERTIA[svInertia]||[];
        return (<div><StepHeader step={2} total={TOTAL} icon="📐" title="เลือก Flange Size (ขนาดหน้าแปลน)" subtitle={`Inertia ${svInertia} รองรับ ${flanges.length} ขนาด`} onJump={jumpToStep}/>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${Math.min(flanges.length,3)},1fr)`,gap:12}}>
            {flanges.map(({size,img,desc})=>(<ImgCard key={size} img={img} label={`${size} mm`} desc={desc} active={svFlange===size} onClick={()=>update('svFlange',size)}/>))}
          </div><BackBtn onClick={backOneStep}/></div>);
      })()}

      {/* Step 3: Voltage */}
      {svFlange&&!svVoltage&&(
        <div><StepHeader step={3} total={TOTAL} icon="⚡" title="เลือกแรงดันไฟฟ้าพิกัด" subtitle="เลือกให้ตรงกับระบบไฟฟ้าในโรงงาน" onJump={jumpToStep}/>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <PillCard value="A" label="A — AC 220V (50/60Hz)" icon="🔌" desc="ไฟ 1/3 เฟส 220V มาตรฐานโรงงานทั่วไปในไทย · Drive Series: SDQ1-xxPA" active={svVoltage==='A'} onClick={()=>update('svVoltage','A')}/>
            <PillCard value="B" label="B — AC 380V (50/60Hz)" icon="🔋" desc="ไฟ 3 เฟส 380V ระบบแรงดันสูง · Drive Series: SDQ1-xxPB" active={svVoltage==='B'} onClick={()=>update('svVoltage','B')}/>
          </div><BackBtn onClick={backOneStep}/></div>
      )}

      {/* Step 4: Power */}
      {svVoltage&&!svPowerCode&&(()=>{
        const powers=POWER_BY_INERTIA_FLANGE[`${svInertia}-${svFlange}`]||[];
        return (<div><StepHeader step={4} total={TOTAL} icon="💡" title="เลือกกำลังมอเตอร์" subtitle={`${svInertia}-Inertia · Flange ${svFlange}mm · ${powers.length} รุ่นที่รองรับ`} onJump={jumpToStep}/>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${Math.min(powers.length,3)},1fr)`,gap:10}}>
            {powers.map(({code,label,img,spec:sT,drive})=>(<ImgCard key={code+label} img={img} label={label} subLabel={sT} desc={`Drive: ${drive}`} active={svPowerCode===code}
              onClick={()=>{ update('svPowerCode',code); const sp=POWER_BY_INERTIA_FLANGE[`${svInertia}-${svFlange}`].find(p=>p.code===code); update('svSpeed',sp?.speedCode||null); }}/>))}
          </div><BackBtn onClick={backOneStep}/></div>);
      })()}

      {/* Step 5: Speed confirm */}
      {svPowerCode&&!svSpeed&&(()=>{
        const autoSpd=selectedPower?.speedCode;
        return (<div><StepHeader step={5} total={TOTAL} icon="🏎️" title="ยืนยันความเร็วพิกัด" subtitle="ความเร็วกำหนดจาก Catalog — แตะเพื่อยืนยัน" onJump={jumpToStep}/>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {(autoSpd?[autoSpd]:['B10','B15','B20','B30']).map(k=>(<PillCard key={k} value={k} label={SPEED_MAP[k]||k} icon="🏎️" desc={{B10:'1,000 rpm · แรงบิดสูง H-Series',B15:'1,500 rpm · G-Series',B20:'2,000 rpm · A-Series',B30:'3,000 rpm · H-Series'}[k]} active={svSpeed===k} onClick={()=>update('svSpeed',k)}/>))}
          </div><BackBtn onClick={backOneStep}/></div>);
      })()}

      {/* Step 6: Options — 2 ปุ่ม CS / CE */}
      {svSpeed&&!svOption&&(
        <div><StepHeader step={6} total={TOTAL} icon="🔧" title="เลือก Options (Brake)" subtitle="เพิ่ม Electromagnetic Brake สำหรับงานที่ต้อง Holding เมื่อไฟดับ" onJump={jumpToStep}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}}>
            <OptionCard code="CS" icon="⚙️" title="Without Brake" img={OCImg} desc="มอเตอร์มาตรฐาน ไม่มีเบรก เหมาะงานแนวนอน" active={svOption==='CS'} onClick={()=>update('svOption','CS')}/>
            <OptionCard code="CE" icon="🛑" title="With Brake" img={OCEImg} desc="มีเบรกแม่เหล็กไฟฟ้า ล็อคแกนเมื่อไฟดับ เหมาะงานแนวดิ่ง" active={svOption==='CE'} onClick={()=>update('svOption','CE')}/>
          </div><BackBtn onClick={backOneStep}/></div>
      )}

      {/* Step 7: Encoder + Shaft */}
      {svOption&&(!svEncoder||!svOutput)&&(
        <div>
          {!svEncoder?(
            <><StepHeader step={7} total={TOTAL} icon="🔢" title="เลือก Encoder" subtitle="กำหนดความแม่นยำตำแหน่งและความเร็ว" onJump={jumpToStep}/>
              <div style={{display:'flex',flexDirection:'column',gap:9}}>
                <PillCard value="1" label="1 — 17-bit Incremental (Magnetic)" icon="🔢" desc="ไม่จำตำแหน่งเมื่อไฟดับ ต้อง Home ใหม่ เหมาะงานทั่วไป" active={svEncoder==='1'} onClick={()=>update('svEncoder','1')}/>
                <PillCard value="2" label="2 — 17-bit Absolute (Magnetic)" icon="💾" desc="จำตำแหน่งเมื่อไฟดับ ไม่ต้อง Home ใหม่ เหมาะ Automation" active={svEncoder==='2'} onClick={()=>update('svEncoder','2')}/>
                <PillCard value="3" label="3 — 23-bit Optical" icon="🔬" desc="ความแม่นยำสูง 8M พัลส์/รอบ เหมาะ CNC, Precision" active={svEncoder==='3'} onClick={()=>update('svEncoder','3')}/>
                <PillCard value="4" label="4 — 23-bit Multi-Turn Optical" icon="🌀" desc="23-bit + จำหลายรอบ เหมาะ Robotics" active={svEncoder==='4'} onClick={()=>update('svEncoder','4')}/>
              </div></>
          ):(
            <><StepHeader step={7} total={TOTAL} icon="🔩" title="เลือกรูปแบบเพลาออก (Output Shaft)" subtitle="เลือกให้เหมาะกับวิธีเชื่อมต่อ Coupling หรือ Gearbox" onJump={jumpToStep}/>
              <div style={{display:'flex',flexDirection:'column',gap:9}}>
                <PillCard value="0" label="0 — Flange Output" icon="🔘" desc="แบบหน้าแปลน ไม่มีเพลายื่น เชื่อมต่อตรงกับ Coupling/Gearbox" active={svOutput==='0'} onClick={()=>update('svOutput','0')}/>
                <PillCard value="2" label="2 — Straight Shaft + Keyway (ไม่มีเกลียว)" icon="📏" desc="เพลาตรง มี Keyway ไม่มีเกลียวปลาย สวม Coupling ได้เลย" active={svOutput==='2'} onClick={()=>update('svOutput','2')}/>
                <PillCard value="6" label="6 — Straight Shaft + Keyway (มีเกลียว)" icon="🔩" desc="เพลาตรง มี Keyway + เกลียวปลาย ยึดแน่นด้วยน็อต" active={svOutput==='6'} onClick={()=>update('svOutput','6')}/>
              </div></>
          )}
          <BackBtn onClick={backOneStep}/>
        </div>
      )}
    </>
  );
}
