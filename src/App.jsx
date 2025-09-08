import React, { useState, useEffect } from 'react';
import ACMotorFlow, { renderRKFSFlow, productList, generateModelCode, renderHypoidGearFlow, renderBLDCGearFlow, generateBLDCModelCode, renderPlanetaryGearFlow, generatePlanetaryModelCode, renderServoFlow, generateServoModelCode, renderHBGearFlow, generateHBModelCode, renderSRVFlow } from './components/MotorFlows.js';
import bgImage from './assets/GearBG2.png';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscribeStats, countVisitOncePerDay, recordDownloadOncePerSession } from "./firebase";

import ANL from './assets/ANL.gif';
import ANR from './assets/ANR.gif';

import K3D from './assets/3Dgif/K3D.gif';
import KB3D from './assets/3Dgif/KB3D.gif';
import RC3D from './assets/3Dgif/RC3D.gif';
import RT3D from './assets/3Dgif/RT3D.gif';

import F2A from './assets/hypoid/F2A.gif';
import F2H from './assets/hypoid/F2H.gif';
import F3A from './assets/hypoid/F3A.gif';
import F3H from './assets/hypoid/F3H.gif';
import hourglass from './assets/hourglass.gif';

import GNGUGIF from './assets/bldc/GNGUGIF.gif';
import GNLGULGIF from './assets/bldc/GNLGULGIF.gif';
import SGIF from './assets/bldc/SGIF.gif';
import SFGIF from './assets/bldc/SFGIF.gif';
import SLGIF from './assets/bldc/SLGIF.gif';

// ====== Utilities: BLDC filename mapper ======
function mapBLDCDownloadFilename(modelCode) {
  if (typeof modelCode !== 'string') return null;
  const raw = modelCode.trim();
  if (!raw) return null;

  const parts = raw.split('-');
  if (parts.length < 5) return null;
  const [p0, p1, p2, p3, p4] = parts.slice(0, 5);

  // Nol: รองรับแรงดัน 24/36/48 → p1=XX, p3=XXX, และรีเซ็ตตัวเลขกลางในพาร์ตท้ายเป็น "XX"
  if (['24', '36', '48'].includes(p1)) {
    const replacedP4 = p4.replace(
      /^((?:\d+GN|\d+GU))(\d+)([A-Za-z]+)$/,
      (_m, head, _num, tail) => `${head}XX${tail}`
    );
    return `${p0}-XX-${p2}-XXX-${replacedP4}`;
  }

  // HE: 220 → คง p0,p1,p2,p4; เปลี่ยน p3 เป็น "XXX"
  if (p1 === '220') {
    return `${p0}-${p1}-${p2}-XXX-${p4}`;
  }

  return null;
}

// ====== BLDC HE (SF/SL) static filename mapper by prefix ======
 function mapBLDCHEStaticFilename(modelCode, heType) {
   if (typeof modelCode !== 'string' || !modelCode) return null;
   const prefix = modelCode.split('-')[0]; // e.g. "Z2BLD60"
   if (!prefix) return null;

   const MAP_SF = {
     'Z2BLD60':  '60-60W-220V-SF2',
     'Z4BLD120': '80-120W-220V-SF2',
     'Z5BLD200': '90-200W-220V-SF2',
     'Z6BLD400': '104-400W-220V-SF2',
   };

   const MAP_SL = {
     'Z2BLD100':  '60SL-100W',
     'Z4BLD200':  '80SL-200W',
     'Z5BLD400':  '90SL-400W',
     'Z6BLD750':  '100SL-750',
     'Z7BLD1100': '100SL-1100',
   };

   if (heType === 'SF') return MAP_SF[prefix] || null;
   if (heType === 'SL') return MAP_SL[prefix] || null;
   return null; // ไม่แตะ S
 }

// ===== helper: สร้าง URL แบบ absolute ไปยัง public/model =====
const buildModelUrl = (fileName) => {
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  return `${base}/model/${encodeURIComponent(fileName)}`;
};

// ===== check: HEAD ก่อน, ถ้าไม่ชัดเจนค่อย GET จริง ตรวจชนิด/ขนาด =====
async function checkFileAvailable(fileName, minBytes = 256) {
  const url = buildModelUrl(fileName);

  // 1) HEAD (ถ้ารองรับและไม่ได้ตอบเป็น text/html ก็ใช้ลิงก์ตรงได้)
  try {
    const head = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    if (head.ok) {
      const ct  = (head.headers.get('content-type') || '').toLowerCase();
      const len = parseInt(head.headers.get('content-length') || '0', 10);
      // dev server บางตัวไม่ส่ง content-length; ถ้าไม่ใช่ html ก็โอเค
      if (!ct.includes('text/html') && (!Number.isFinite(len) || len >= minBytes)) {
        return { mode: 'href', url, filename: fileName };
      }
      // ถ้าเป็น html/หรือขนาดน้อย → ตกไป GET เพื่อตรวจจริง
    }
  } catch { /* ตกไป GET */ }

  // 2) GET จริง (กันเคส SPA fallback / HEAD ใช้ไม่ได้) + กัน cache
  try {
    const url2 = `${url}?t=${Date.now()}`;
    const res = await fetch(url2, { method: 'GET', cache: 'no-store' });
    if (!res.ok) return null;

    const ct   = (res.headers.get('content-type') || '').toLowerCase();
    const blob = await res.blob();
    // ถ้าเป็น html ให้ถือว่าไม่ใช่ไฟล์ 3D
    if (ct.includes('text/html')) return null;
    if (blob.size < minBytes) return null;

    // OK: ส่ง blob กลับเพื่อดาวน์โหลด
    return { mode: 'blob', blob, url, filename: fileName };
  } catch {
    return null;
  }
}

// ===== map model → ชื่อไฟล์จริงตามเงื่อนไขคุณ แล้วเช็กว่ามีไฟล์จริง =====
async function resolvePlanetaryStep(planetState) {
  const { series, size, shaftDir } = planetState || {};
  if (!series || !size) throw new Error('ข้อมูลไม่พอ: series/size');

  const base = `${series}${String(size)}`;  // เช่น "ZB042"

  // --- ZT: บังคับ {Series}{Size}-{ShaftDir}-1-001.STEP ---
  if (series === 'ZT') {
    if (!shaftDir) throw new Error('ZT ต้องมี Shaft Direction');
    const fn = `${base}-${shaftDir}-1-001.STEP`;        // ex. ZT075-L-1-001.STEP
    const ok = await checkFileAvailable(fn);
    if (ok) return ok;
    throw new Error(`ไม่พบไฟล์: ${fn}`);
  }

  // --- ซีรีส์อื่น: ใช้ manifest ถ้ามี ---
  const manifestUrl = buildModelUrl('manifest.json');
  try {
    const mr = await fetch(`${manifestUrl}?t=${Date.now()}`, { cache: 'no-store' });
    if (mr.ok) {
      const map = await mr.json();                      // { "ZB042": "ZB042-100T3.STEP", ... }
      const mapped = map[base];
      if (mapped) {
        const ok = await checkFileAvailable(mapped);
        if (ok) return ok;
      }
    }
  } catch { /* ไม่มี/อ่านไม่ได้ ก็ข้าม */ }

  // --- ถ้าไม่มี manifest หรือไม่เจอ mapping → ลองชื่อพื้นฐานตามลำดับ ---
  const candidates = [
    `${base}.STEP`,            // eg. ZB042.STEP (ถ้ามี)
    `${base}-100T3.STEP`,      // eg. ZB042-100T3.STEP (เห็นในโฟลเดอร์คุณ)
  ];

  for (const fn of candidates) {
    const ok = await checkFileAvailable(fn);
    if (ok) return ok;
  }

  throw new Error(`ไม่พบไฟล์ 3D ของ ${base} ใน /public/model/`);
}

// === [ADD] Robust resolver สำหรับ BLDC (.STEP) ===
async function resolveBLDCStep(modelCode) {
  if (!modelCode || typeof modelCode !== 'string') {
    throw new Error('ไม่พบรหัสรุ่น BLDC ที่จะดาวน์โหลด');
  }

  const candidates = [];

  // 1) ชื่อที่ map ตาม logic เดิม (220 → XXX, 24/36/48 → XX กลาง):contentReference[oaicite:4]{index=4}
  const mapped = mapBLDCDownloadFilename(modelCode);
  if (mapped) candidates.push(`${mapped}.STEP`);

  // 2) กรณี NOL: map แบบ static ตาม prefix + ชนิดเกียร์ (GN/GNL/GU/GUL):contentReference[oaicite:5]{index=5}
  const type =
    /GNL/.test(modelCode) ? 'GNL' :
    /GUL/.test(modelCode) ? 'GUL' :
    /GU/.test(modelCode)  ? 'GU'  :
    /GN/.test(modelCode)  ? 'GN'  : null;
  if (type) {
    const nolStatic = mapBLDCNolStaticFilename(modelCode, type);
    if (nolStatic) candidates.push(`${nolStatic}.STEP`);
  }

  // 3) กรณี HE แบบ SF/SL (ถ้ามีตัวอักษร SF/SL ในรหัส ให้ลอง map แบบ static):contentReference[oaicite:6]{index=6}
  const heType = /SF/.test(modelCode) ? 'SF' : (/SL/.test(modelCode) ? 'SL' : null);
  if (heType) {
    const heStatic = mapBLDCHEStaticFilename(modelCode, heType);
    if (heStatic) candidates.push(`${heStatic}.STEP`);
  }

  // 4) เผื่อไว้: ลองชื่อเท่ากับรหัสรุ่นตรง ๆ
  candidates.push(`${modelCode}.STEP`);

  // ==== เช็กทีละชื่อใน /public/model ด้วยหัวใจเดียวกับ Planetary ====:contentReference[oaicite:7]{index=7}
  for (const name of candidates) {
    const ok = await checkFileAvailable(name);
    if (ok) return ok; // {mode:'href'|'blob', url|blob, filename}
  }

  throw new Error(`ไม่พบไฟล์ใน /public/model จากชื่อที่ลอง: ${candidates.join(' , ')}`);
}

// ===== ปุ่ม "ยืนยันและรับไฟล์" ให้เรียกตัวนี้ =====
async function handlePlanetaryDownload3D() {
  try {
    const res = await resolvePlanetaryStep(planetState); // ใช้ planetState ปัจจุบันของคุณ
    const fileName = res.filename || (res.url.split('/').pop() || 'model.STEP');
        const modelCode = generatePlanetaryModelCode(planetState);
        const downloadName = modelCode ? `${modelCode}.STEP` : fileName;
       

    if (res.mode === 'href') {
      const a = document.createElement('a');
      a.href = res.url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      const blobUrl = URL.createObjectURL(res.blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    }
  } catch (err) {
    console.error('Download check failed:', err);
    alert(err?.message || 'ไม่สามารถดาวน์โหลดไฟล์ 3D ได้');
  }
}


// [ADD] ตัวอย่าง handler ดาวน์โหลด BLDC
async function handleBLDCDownload(modelCode) {
  try {
    const res = await resolveBLDCStep(modelCode); // ใช้ตัวเช็กเดียวกับ Planetary
    const fileName = res.filename || (res.url.split('/').pop() || 'model.STEP');

    if (res.mode === 'href') {
      const a = document.createElement('a');
      a.href = res.url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      const blobUrl = URL.createObjectURL(res.blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    }
  } catch (err) {
    console.error('BLDC download failed:', err);
    // ข้อความนี้จะอธิบาย “ชื่อที่ลองแล้ว” ชัด ๆ เวลาแมพไม่เจอ
    toast.error(err?.message || 'ไฟล์ไม่พบใน /public/model');
  }
}

 // ====== BLDC Nol (GN/GNL/GU/GUL) static filename mapping by prefix ======
 function mapBLDCNolStaticFilename(modelCode, gearType) {
   if (typeof modelCode !== 'string' || !modelCode) return null;
   const prefix = modelCode.split('-')[0]; // e.g. "Z5BLD90"
   if (!prefix) return null;

   const MAP_GN = {
     'Z2BLD15':'Z2BLD15W2GNK','Z2BLD25':'Z2BLD25W2GNK',
     'Z3BLD30':'Z3BLD30W3GNK','Z3BLD40':'Z3BLD40W3GNK',
     'Z4BLD40':'Z4BLD40W4GNK','Z4BLD60':'Z4BLD60W4GNK',
     'Z5BLD60':'Z5BLD60W5GNK','Z5BLD90':'Z5BLD90W5GNK','Z5BLD120':'Z5BLD120W5GNK',
     'Z6BLD200':'Z6BLD200W6GNK','Z6BLD400':'Z6BLD400W6GNK',
   };

   const MAP_GNL = {
     'Z2BLD15':'Z2BLD15W2GNL','Z2BLD25':'Z2BLD25W2GNL',
     'Z3BLD30':'Z3BLD30W3GNL','Z3BLD40':'Z3BLD40W3GNL',
     'Z4BLD40':'Z4BLD40W4GNL','Z4BLD60':'Z4BLD60W4GNL',
     'Z5BLD60':'Z5BLD60W5GUL','Z5BLD90':'Z5BLD90W5GUL','Z5BLD120':'Z5BLD120W5GUL',
     'Z6BLD200':'Z6BLD200W6GUL','Z6BLD400':'Z6BLD400W6GUL',
   };

   const MAP_GU = {
     'Z2BLD15':'Z2BLD15W2GUK','Z2BLD25':'Z2BLD25W2GUK',
     'Z3BLD30':'Z3BLD30W3GUK','Z3BLD40':'Z3BLD40W3GUK',
     'Z4BLD40':'Z4BLD40W4GUK','Z4BLD60':'Z4BLD60W4GUK',
     'Z5BLD60':'Z5BLD60W5GUK','Z5BLD90':'Z5BLD90W5GUK','Z5BLD120':'Z5BLD120W5GUK',
     'Z6BLD200':'Z6BLD200W6GUK','Z6BLD400':'Z6BLD400W6GUK',
   };

   const MAP_GUL = {
     'Z2BLD15':'Z2BLD15W2GUL','Z2BLD25':'Z2BLD25W2GUL',
     'Z3BLD30':'Z3BLD30W3GUL','Z3BLD40':'Z3BLD40W3GUL',
     'Z4BLD40':'Z4BLD40W4GUL','Z4BLD60':'Z4BLD60W4GUL',
     'Z5BLD60':'Z5BLD60W5GUL','Z5BLD90':'Z5BLD90W5GUL','Z5BLD120':'Z5BLD120W5GUL',
     'Z6BLD200':'Z6BLD200W6GUL','Z6BLD400':'Z6BLD400W6GUL',
   };

   if (gearType === 'GN')  return MAP_GN[prefix]  || null;
   if (gearType === 'GNL') return MAP_GNL[prefix] || null;
   if (gearType === 'GU')  return MAP_GU[prefix]  || null;
   if (gearType === 'GUL') return MAP_GUL[prefix] || null;
   return null;
 }

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', company: '', email: '' });
    useEffect(() => {
  if (typeof emailjs?.init === 'function') {
    emailjs.init('J6kLpbLcieCe2cKzU'); // ใช้ Public Key เดิมของคุณ
  }
}, []);
  const [isDownloading, setIsDownloading] = useState(false);

  const [acMotorType, setAcMotorType] = useState(null);
  const [acPower, setAcPower] = useState(null);
  const [acSpeedAdjust, setAcSpeedAdjust] = useState(null);
  const [acVoltage, setAcVoltage] = useState(null);
  const [acOption, setAcOption] = useState(null);
  const [acGearHead, setAcGearHead] = useState(null);
  const [acRatio, setAcRatio] = useState(null);
  const [acConfirm, setAcConfirm] = useState(false);
  // ... ในฟังก์ชัน App()
const [modelCodeList, setModelCodeList] = useState([]);   // รายการโค้ดที่ส่งมาจาก MotorFlows
const [selectedModel, setSelectedModel] = useState(null); // ตัวที่ถูกเลือก
// ถ้ายังไม่มี:
const [showForm, setShowForm] = useState(false);


  // Hypoid Gear Flow states
  const [svInertia,   setSvInertia]   = useState(null);  // A / H / G
  const [svFlange,    setSvFlange]    = useState(null);  // 40 / 60 / 80 / 100 / 110 / 130 / 180
  const [svVoltage,   setSvVoltage]   = useState(null);  // A (AC220) / B (AC380)
  const [svPowerCode, setSvPowerCode] = useState(null);  // 01 / 02 / 08 / 10 / 12 / 15 / 18 / 20 / 30 / 80
  const [svSpeed,     setSvSpeed]     = useState(null);  // B10 / B15 / B20 / B30
  const [svOption,    setSvOption]    = useState(null);  // C / S / CE
  const [svEncoder,   setSvEncoder]   = useState(null);  // 1 / 2 / 3 / 4
  const [svOutput,    setSvOutput]    = useState(null);  // 0 / 2 / 6
  // วางใต้กลุ่ม useState ด้านบน
const servoState = {
  svInertia, svFlange, svVoltage, svPowerCode,
  svSpeed, svOption, svEncoder, svOutput,
};

const servoSetters = {
  setSvInertia, setSvFlange, setSvVoltage, setSvPowerCode,
  setSvSpeed, setSvOption, setSvEncoder, setSvOutput,
};

  // Hypoid Gear Flow states
  const [hypoidType, setHypoidType] = useState(null);             // F2 / F3
  const [hypoidGearType, setHypoidGearType] = useState(null);     // H / A
  const [hypoidRatio, setHypoidRatio] = useState(null);           // เช่น 10, 15,...
  const [hypoidDirection, setHypoidDirection] = useState(null);   // RL, RR,...
  const [hypoidPower, setHypoidPower] = useState(null);           // เช่น 90W
  const [hypoidSupply, setHypoidSupply] = useState(null);         // C, A, S, S3
  const [hypoidOptional, setHypoidOptional] = useState([]); 

  const [rkfsSeries, setRkfsSeries] = useState(null);
    const [rkfsDesign, setRkfsDesign] = useState(null);
    const [rkfsSize, setRkfsSize] = useState(null);
    const [rkfsMotorType, setRkfsMotorType] = useState(null);
    const [rkfsMotorPower, setRkfsMotorPower] = useState(null);
    const [rkfsPole, setRkfsPole] = useState(null);
    const [rkfsRatio, setRkfsRatio] = useState(null);
    const [rkfsMounting, setRkfsMounting] = useState(null);
        const [rkfsMountingTemp, setRkfsMountingTemp] = useState(null);
    const [rkfsPosition, setRkfsPosition] = useState(null);
    const [rkfsPositionSub, setRkfsPositionSub] = useState(null);
    const [rkfsDesignSuffix, setRkfsDesignSuffix] = useState(null);
        const [rkfsInputSel, setRkfsInputSel] = useState(null); // Step 3.1 (With Motor / IEC / INPUT / SERVO)

    // === SRV Worm Gear states ===
const [srvSeries, setSrvSeries] = useState(null);
const [srvSize, setSrvSize] = useState(null);
const [srvInputSel, setSrvInputSel] = useState(null);     // 'WM' | 'WS' | 'IS'
const [srvPowerKW, setSrvPowerKW] = useState(null);
const [srvPole, setSrvPole] = useState(null);             // '4P' | '6P'
const [srvIECMode, setSrvIECMode] = useState(null);       // 'IEC' | 'IEC+Motor'
const [srvRatio, setSrvRatio] = useState(null);
const [srvGearType, setSrvGearType] = useState(null);     // 'FA' | 'FB' | 'Hollow' | 'T'
const [srvGearTypeSub, setSrvGearTypeSub] = useState(null);// 'A' | 'B' | null
const [srvShaftDesign, setSrvShaftDesign] = useState(null);// 'DS' | 'DS1' | 'DS2' | 'Hollow'
const [srvMounting, setSrvMounting] = useState(null);     // 'B3','B8','V5','V6','B6','B7'
const [srvIECSize, setSrvIECSize] = useState(null);       // 'B5' | 'B14'
const [srvMotorType, setSrvMotorType] = useState(null);   // (เฉพาะ IEC+Motor)
const [srvPosition, setSrvPosition] = useState(null);
const [srvPositionSub, setSrvPositionSub] = useState(null);

// mappers สำหรับส่งให้ renderSRVFlow
const srvState = {
  srvSeries, srvSize, srvInputSel, srvPowerKW, srvPole, srvIECMode, srvRatio,
  srvGearType, srvGearTypeSub, srvShaftDesign, srvMounting, srvIECSize,
  srvMotorType, srvPosition, srvPositionSub
};
const srvSetters = {
  setSrvSeries, setSrvSize, setSrvInputSel, setSrvPowerKW, setSrvPole, setSrvIECMode, setSrvRatio,
  setSrvGearType, setSrvGearTypeSub, setSrvShaftDesign, setSrvMounting, setSrvIECSize,
  setSrvMotorType, setSrvPosition, setSrvPositionSub
};

// [SRV] reset ทั้ง flow (เรียกใช้จากปุ่มเท่านั้น)
const resetSRV = () => {
  setSrvSeries(null); setSrvSize(null); setSrvInputSel(null); setSrvPowerKW(null);
  setSrvPole(null); setSrvIECMode(null); setSrvRatio(null);
  setSrvGearType(null); setSrvGearTypeSub(null); setSrvShaftDesign(null);
  setSrvMounting(null); setSrvIECSize(null);
  setSrvMotorType(null); setSrvPosition(null); setSrvPositionSub(null);
};

// === [ADD] HB states ===
const [hbSeries, setHbSeries] = useState(null);            // 'HB' | 'ZDYFAMILY'
const [hbHBType, setHbHBType] = useState(null);            // 'H' | 'B' (เฉพาะ HB)
const [hbStage, setHbStage] = useState(null);              // number
const [hbOutput, setHbOutput] = useState(null);            // 'S'|'H'|'D'|'K'|'F'|'DF'
const [hbMount, setHbMount] = useState(null);              // 'H'|'V'
const [hbSize, setHbSize] = useState(null);                // number
const [hbRatio, setHbRatio] = useState(null);              // number
const [hbShaftDesign, setHbShaftDesign] = useState(null);  // 'A'..'I' or 'A'..'F'
const [hbZdySelected, setHbZdySelected] = useState(null);  // 'ZDY', 'ZLY', ...

const hbState = { hbSeries, hbHBType, hbStage, hbOutput, hbMount, hbSize, hbRatio, hbShaftDesign, hbZdySelected };
const hbSetters = { setHbSeries, setHbHBType, setHbStage, setHbOutput, setHbMount, setHbSize, setHbRatio, setHbShaftDesign, setHbZdySelected };

// ★ เพิ่ม state เก็บสถิติ (วางใกล้ ๆ useState อื่น ๆ ของ App)
const [stats, setStats] = useState({ totalVisits: 0, totalDownloads: 0 });

// ★ เพิ่ม effect สำหรับนับผู้ชมและฟัง realtime (รันครั้งเดียวตอน mount)
useEffect(() => {
  countVisitOncePerDay();
  const unsub = subscribeStats(setStats);
  return () => unsub();
}, []);

const COMING_SOON = new Set([
  'DC Gear Motor',
  'SPN Series',
  'P Planetary Gearbox',
  'Servo Drive and Speed controller',
]);

const handleBackUniversal = () => {
  if (selectedProduct === 'RKFS Series') {
    handleBackWithReset();
  } else if (selectedProduct === 'Hypoid Gear') {
    // [ADD-HYPOID] ปุ่ม Home เดิมกดแล้วให้รีเซ็ต Hypoid + กลับหน้า Product
    handleHypoidHome();
  } else {
    handleBack(); // เดิม
  }
};

const handleBackWithReset = () => {
  // Reset common states
    resetSRV();
  setSelectedProduct(null);
  setSelectedModel(null);
  setModelCodeList([]);
  setShowForm(false);
     
  // เฉพาะ RKFS
  rkfsSetters.setRkfsSeries(null);
  rkfsSetters.setRkfsDesign(null);
  rkfsSetters.setRkfsSize(null);
  rkfsSetters.setRkfsMotorType(null);
  rkfsSetters.setRkfsMotorPower(null);
  rkfsSetters.setRkfsPole(null);
  rkfsSetters.setRkfsRatio(null);
  rkfsSetters.setRkfsMounting(null);
  rkfsSetters.setRkfsPosition(null);
  rkfsSetters.setRkfsPositionSub(null);
    rkfsSetters.setRkfsInputSel(null);
    setRkfsDesignSuffix(null);

// [ADD] เคลียร์สถานะ HB ทั้งหมด
  setHbSeries(null);
  setHbHBType(null);
  setHbStage(null);
  setHbOutput(null);
  setHbMount(null);
  setHbSize(null);
  setHbRatio(null);
  setHbShaftDesign(null);
  setHbZdySelected(null);
    resetSRV();
};

    const resetRKFSState = () => {
  rkfsSetters.setRkfsSeries(null);
  rkfsSetters.setRkfsDesign(null);
  rkfsSetters.setRkfsSize(null);
  rkfsSetters.setRkfsMotorType(null);
  rkfsSetters.setRkfsMotorPower(null);
  rkfsSetters.setRkfsPole(null);
  rkfsSetters.setRkfsRatio(null);
  rkfsSetters.setRkfsMounting(null);
  rkfsSetters.setRkfsPosition(null);
  rkfsSetters.setRkfsPositionSub(null);
    setRkfsDesignSuffix(null); 
  setSelectedModel(null);
  setModelCodeList([]);
};

  const handleResetRKFS = () => {
  rkfsSetters.setRkfsSeries(null);
  rkfsSetters.setRkfsDesign(null);
  rkfsSetters.setRkfsSize(null);
  rkfsSetters.setRkfsMotorType(null);
  rkfsSetters.setRkfsMotorPower(null);
  rkfsSetters.setRkfsPole(null);
  rkfsSetters.setRkfsRatio(null);
  rkfsSetters.setRkfsMounting(null);
  rkfsSetters.setRkfsPosition(null);
  rkfsSetters.setRkfsPositionSub(null);
    setRkfsDesignSuffix(null);
  setSelectedModel(null);
  setModelCodeList([]); // ถ้ามี
};

const handleRKFSBackToHome = () => {
  resetRKFSState();               // 🔁 รีเซตก่อนกลับหน้า Home
  setSelectedProduct(null);      // ⬅ กลับหน้าเลือก Product
};

  const [emailVerifiedCode, setEmailVerifiedCode] = useState(null);
  const [emailCodeInput, setEmailCodeInput] = useState('');
  const [codeSent, setCodeSent] = useState(false);

// [ADD-BLDC] State ของ BLDC
const [bldcCategory, setBldcCategory] = useState(null);
const [bldcFrame, setBldcFrame] = useState(null);
const [bldcPower, setBldcPower] = useState(null);
const [bldcVoltage, setBldcVoltage] = useState(null);
const [bldcGearType, setBldcGearType] = useState(null);
const [bldcSpeed, setBldcSpeed] = useState(null);
const [bldcOption, setBldcOption] = useState(null);
const [bldcRatio, setBldcRatio] = useState(null);
// [ADD-BLDC-HIGH] สำหรับ High-efficiency
const [bldcHEType, setBldcHEType] = useState(null);          // 'S'|'SF'|'SL'
const [bldcSelectedImage, setBldcSelectedImage] = useState(null); // 'S' | 'SF' | 'SL'
const [bldcSFDiameter, setBldcSFDiameter] = useState(null);  // ใช้ในโหมด SF ('12','14','15','16','20','25')

// [ADD-PLANETARY-STATE]  ⬅️ src/App.jsx (ใน App component, โซน useState เดิม)
const [planetGroup, setPlanetGroup] = useState(null);         // Step1
const [planetSeries, setPlanetSeries] = useState(null);       // Step2
const [planetSize, setPlanetSize] = useState(null);           // Step3
const [planetShaftDir, setPlanetShaftDir] = useState(null);   // Step3.1 (ZT เท่านั้น)
const [planetRatio, setPlanetRatio] = useState(null);         // Step4
const [planetBacklash, setPlanetBacklash] = useState(null);   // Step5
const [planetInputType, setPlanetInputType] = useState(null); // Step6

// [ADD-PLANETARY-MAPPERS]  ⬅️ src/App.jsx (ถัดจาก state ของ Planetary)
const planetState = {
  group: planetGroup,
  series: planetSeries,
  size: planetSize,
  shaftDir: planetShaftDir,
  ratio: planetRatio,
  backlash: planetBacklash,
  inputType: planetInputType,
};

const planetSetters = {
  setGroup: setPlanetGroup,
  setSeries: setPlanetSeries,
  setSize: setPlanetSize,
  setShaftDir: setPlanetShaftDir,
  setRatio: setPlanetRatio,
  setBacklash: setPlanetBacklash,
  setInputType: setPlanetInputType,
};


// [ADD-BLDC] เคลียร์ค่า BLDC ทั้งหมด
const resetBLDC = () => {
  setBldcCategory(null);
  setBldcFrame(null);
  setBldcPower(null);
  setBldcVoltage(null);
  setBldcGearType(null);
  setBldcSpeed(null);
  setBldcOption(null);
  setBldcRatio(null);
};

// [ADD-BLDC] Back ถอยทีละสเตป
// [ADD-BLDC] Back ถอยทีละสเตป
const backOneStepBLDC = () => {
  // ✅ เงื่อนไขถอยสำหรับ HE (รวม SF diameter) — ต้องอยู่ในฟังก์ชันนี้เท่านั้น
  if (bldcSFDiameter) { setBldcSFDiameter(null); return; }
  if (bldcHEType) {
    if (bldcRatio !== null && bldcRatio !== undefined) { setBldcRatio(null); return; }
    if (bldcSpeed) { setBldcSpeed(null); return; }
    if (bldcPower) { setBldcPower(null); return; }
    if (bldcFrame) { setBldcFrame(null); return; }
    setBldcHEType(null); return;
  }

  // ▼ เงื่อนไขเดิม (Normal BLDC)
  if (bldcRatio !== null && bldcRatio !== undefined) { setBldcRatio(null); return; }
  if (bldcOption !== null && bldcOption !== undefined) { setBldcOption(null); return; }
  if (bldcSpeed) { setBldcSpeed(null); return; }
  if (bldcGearType) { setBldcGearType(null); return; }
  if (bldcVoltage) { setBldcVoltage(null); return; }
  if (bldcPower) { setBldcPower(null); return; }
  if (bldcFrame) { setBldcFrame(null); return; }
  if (bldcCategory) { setBldcCategory(null); return; }
  handleBackUniversal();
};

// [ADD-BLDC] ใช้เป็น callback ให้ flow
const goHomeFromBLDC = () => {
  resetBLDC();
  setModelCodeList([]);        // ถ้ามีตัวแปรนี้ใน App ของคุณอยู่แล้ว
  setSelectedModel(null);
  setSelectedProduct(null);    // กลับหน้า Product
    setBldcHEType(null);
    setBldcSFDiameter(null);
};

const hypoidState = {
  type: hypoidType,
  gearType: hypoidGearType,
  ratio: hypoidRatio,
  direction: hypoidDirection,
  power: hypoidPower,
  supply: hypoidSupply,
  optional: hypoidOptional
};

const hypoidSetters = {
  setType: setHypoidType,
  setGearType: setHypoidGearType,
  setRatio: setHypoidRatio,
  setDirection: setHypoidDirection,
  setPower: setHypoidPower,
  setSupply: setHypoidSupply,
  setOptional: setHypoidOptional
};

// [ADD-HYPOID] รีเซ็ต Hypoid + กลับหน้า Product รวม (เรียกใช้จาก "ปุ่ม Home เดิม")
const handleHypoidHome = () => {
  // เคลียร์ค่าเฉพาะ Hypoid
  setHypoidType(null);
  setHypoidGearType(null);
  setHypoidRatio(null);
  setHypoidDirection(null);
  setHypoidPower(null);
  setHypoidSupply(null);
  setHypoidOptional([]);

  // เคลียร์ผลลัพธ์กลาง
  setModelCodeList([]);
  setSelectedModel(null);
  setShowForm(false);

  // กลับหน้า Product รวม
  setSelectedProduct(null);
};

// [ADD-PLANETARY-RESET]  ⬅️ src/App.jsx (โซน handler/reset เดิม)
const resetPlanetary = () => {
  setPlanetGroup(null);
  setPlanetSeries(null);
  setPlanetSize(null);
  setPlanetShaftDir(null);
  setPlanetRatio(null);
  setPlanetBacklash(null);
  setPlanetInputType(null);
};

// [ADD-PLANETARY-HOME]  ⬅️ src/App.jsx (โซน handler/back/home เดิม)
const handlePlanetaryHome = () => {
  resetPlanetary();
  // เคลียร์ผลลัพธ์กลาง (ใช้ state เดิมของคุณ)
  setModelCodeList([]);
  setSelectedModel(null);
  setShowForm(false);
  // กลับหน้า Product รวม
  setSelectedProduct(null);
};

const onConfirm = (modelCode) => {
  const models = Array.isArray(modelCode) ? modelCode : [modelCode];
  setModelCodeList(models);
  setSelectedModel(models[0]);
};

  useEffect(() => {
    if (
      selectedProduct === 'AC Gear Motor' &&
      acMotorType &&
      acPower &&
      acVoltage &&
      acOption &&
      acGearHead &&	
      acRatio &&
            acConfirm && 
            !selectedModel
    ) {
      const powerArray = acPower.split(',').map(p => p.trim());
      const generatedCodes = powerArray.map(power =>
        generateModelCode({
          acMotorType,
          acPower: power,
          acVoltage,
          acOption,
          acGearHead,
          acRatio,
        })
      ).flat();

      
      const finalCodes = Array.isArray(generatedCodes[0]) ? generatedCodes.flat() : generatedCodes;
      if (finalCodes.length > 0) {
        setModelCodeList(finalCodes);
        setSelectedModel(finalCodes[0]);
      }
    }
  }, [selectedProduct, acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio, acConfirm, selectedModel]);

   // เลือก GIF ตามหัวเกียร์ที่ผู้ใช้เลือก (ใช้ state acGearHead จาก App.jsx)
const gearGifForHead = () => {
  if (acGearHead === 'RIGHT ANGLE GEAR/HOLLOW SHAFT') return RC3D; // RC
  if (acGearHead === 'RIGHT ANGLE GEAR/SOLID SHAFT')  return RT3D; // RT
  if (acGearHead === 'SQUARE BOX')                    return KB3D; // KB
  if (acGearHead === 'SQUARE BOX (Low)')              return KB3D; // Klow ใช้ KB3D
  if (acGearHead === 'SQUARE BOX WITH WING')          return K3D;  // K
  return null;
};
 // เลือก GIF สำหรับ BLDC:
 // - HE: S → SGIF, SF → SFGIF, SL → SLGIF
 // - Nol: GN/GU → GNGUGIF (ชุดเดียวกัน), GNL/GUL → GNLGULGIF (ชุดเดียวกัน)
 const bldcGifForModel = () => {
   // กลุ่ม HE มาก่อน (มี bldcHEType เป็น 'S' | 'SF' | 'SL')
   if (bldcHEType === 'S')  return SGIF;
   if (bldcHEType === 'SF') return SFGIF;
   if (bldcHEType === 'SL') return SLGIF;

   // กลุ่ม Nol → อ่านจาก state หรือดึงจากชื่อรุ่นกันพลาด
   if (!selectedModel) return null;
   const m = selectedModel.match(/-(GUL|GNL|GU|GN)-/);
   const gear = bldcGearType || (m ? m[1] : null);
   if (!gear) return null;

   if (gear === 'GN'  || gear === 'GU')  return GNGUGIF;   // GN/GU ใช้ชุดเดียวกัน
   if (gear === 'GNL' || gear === 'GUL') return GNLGULGIF; // GNL/GUL ใช้ชุดเดียวกัน
   return null;
 };

// เลือก GIF สำหรับ Hypoid จาก state: hypoidType(F2/F3) + hypoidGearType(H/A)
const hypoidGif = () => {
   if (hypoidType === 'F2' && hypoidGearType === 'A') return F2A;
   if (hypoidType === 'F2' && hypoidGearType === 'H') return F2H;
   if (hypoidType === 'F3' && hypoidGearType === 'A') return F3A;
   if (hypoidType === 'F3' && hypoidGearType === 'H') return F3H;
   return null;
 };

  const generate6DigitCode = () => Math.floor(100000 + Math.random() * 900000).toString();
  // ✅ ตรวจสอบเบอร์มือถือไทย: ต้องเป็นตัวเลข 10 หลัก และขึ้นต้น 06/08/09
const isValidThaiMobile = (p) => /^(06|08|09)\d{8}$/.test((p || '').trim());
  
  // ✅ ฟังก์ชันส่งรหัสยืนยันไปยังอีเมลของลูกค้า
const handleSendVerificationCode = () => {
  if (!userInfo.email) {
    toast.warning("⚠️ กรุณากรอกอีเมลก่อนขอรหัส");
    return;
  }

  // ★ เพิ่มบล็อกนี้
  if (!isValidThaiMobile(userInfo.phone)) {
    toast.warning("⚠️ กรุณากรอกเบอร์ 10 หลักของท่าน");
    return;
  }

  const code = generate6DigitCode();
  setEmailVerifiedCode(code);
  setCodeSent(true);

  emailjs.send(
    'service_s30eakb',           // ✅ Service ID ของคุณ
    'template_gum65p2',          // ✅ Template สำหรับส่งรหัสให้ลูกค้า
    {
      to_email: userInfo.email,
      name: userInfo.name || 'ลูกค้า',
      code: code
    },
    'J6kLpbLcieCe2cKzU'          // ✅ Public Key
  )
  .then(() => {
    toast.success('✅ ส่งรหัสแล้ว กรุณาตรวจสอบอีเมลของคุณ');
  })
    .catch((err) => {
         toast.error('❌ ส่งรหัสไม่สำเร็จ กรุณาลองใหม่');
    // เฉพาะตอนพัฒนา (localhost) ให้โชว์โค้ดที่เพิ่งสุ่ม เพื่อทดสอบ flow ต่อได้ทันที
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      toast.info(`(DEV) รหัสยืนยันของคุณคือ: ${code}`);
    }
    // ถ้าต้องการดูสาเหตุจริง: console.log(err);
  });
};

// ✅ ฟังก์ชันกดยืนยันและรับไฟล์ (เวอร์ชัน Blob + บังคับดาวน์โหลด)
const handleDownload = async () => {
  if (emailCodeInput !== emailVerifiedCode) {
    toast.error("❌ รหัสยืนยันไม่ถูกต้อง");
    return;
  }

  // ✅ ส่งข้อมูลลูกค้าเข้าอีเมล Somyot
  try {
    await emailjs.send(
      'service_s30eakb',
      'template_4vqperj',
      {
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        company: userInfo.company,
        model: selectedModel
      },
      'J6kLpbLcieCe2cKzU'
    );
    toast.success("✅ ส่งข้อมูลเรียบร้อยแล้ว");
  } catch (e) {
    toast.error("❌ ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่");
    // ไม่ต้อง return — ให้ลองดาวน์โหลดต่อได้
  }

  // ✅ ดาวน์โหลดไฟล์ .STEP แบบเสถียร
  setIsDownloading(true);
  try { 
      // ✅ Planetary Gear: ใช้ตัว resolver เฉพาะ เพื่อชี้ไฟล์จริงจาก /public/model
    if (selectedProduct === 'Planetary Gear') {
      const res = await resolvePlanetaryStep(planetState);
            const modelCode = generatePlanetaryModelCode(planetState);
            const downloadName = modelCode ? `${modelCode}.STEP` : (res.filename || 'model.STEP');
      if (res.mode === 'href') {
        const a = document.createElement('a');
        a.href = res.url;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (res.mode === 'blob' && res.blob) {
        const blobUrl = URL.createObjectURL(res.blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      }
      // ออกจากฟังก์ชันทันที (finally เดิมยังทำงาน: ปิดโหลด/ปิดฟอร์ม)
      return;
    }
  const url = getFileUrl(); // ตอนนี้ getFileUrl() map ชื่อ BLDC ให้แล้ว

  // 1) เช็กก่อนว่าไฟล์มีจริง
  let head = await fetch(url, { method: 'HEAD', cache: 'no-store' });
  if (!head.ok) {
    // บาง dev server ไม่รองรับ HEAD -> ลอง GET ตรวจ content-type
    const probe = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (!probe.ok) throw new Error(`HTTP ${probe.status}`);
    const ct = probe.headers.get('content-type') || '';
    if (ct.includes('text/html')) throw new Error('Not a STEP file (got HTML)'); // กันไฟล์ 330B
  }

  // 2) ดาวน์โหลดจริง
  const real = await fetch(url, { method: 'GET', cache: 'no-store' });
if (!real.ok) throw new Error(`HTTP ${real.status}`);
const blob = await real.blob();
const realCT = real.headers.get('content-type') || '';
if (realCT.includes('text/html') || blob.size < 1024) {
   throw new Error('Not a STEP file (fallback HTML or too small)');
 }
const objectUrl = URL.createObjectURL(blob);


  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = `${selectedModel}.STEP`; // ใช้ชื่อที่ผู้ใช้คุ้น (ModelCode.STEP)
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
} catch (err) {
  console.error('Download check failed:', err);
  toast.error('ไฟล์ไม่พบใน /public/model หรือชื่อไม่ตรงกับที่ map ได้');
  // ถ้าอยากคง fallback เดิมไว้: เปิดแท็บใหม่ให้เซฟเองก็ได้
  // window.open(getFileUrl(), '_blank', 'noopener,noreferrer');
} finally {
  setIsDownloading(false);
  setShowForm(false);
}
};

  const handleBack = () => {
        resetSRV();  
    setSelectedProduct(null);
    setModelCodeList([]);
    setSelectedModel(null);
    setShowForm(false);
    setIsDownloading(false);
    setUserInfo({ name: '', phone: '', company: '', email: '' });
    setAcMotorType(null);
    setAcPower(null);
    setAcSpeedAdjust(null);
    setAcVoltage(null);
    setAcOption(null);
    setAcGearHead(null);
    setAcRatio(null);
    setRkfsDesign(null);
    setRkfsSize(null);
    setRkfsMotorPower(null);
    setRkfsMounting(null);
  };

  const acState = { acMotorType, acPower, acSpeedAdjust, acVoltage, acOption, acGearHead, acRatio, acConfirm };
const acSetters = { setAcMotorType, setAcPower, setAcSpeedAdjust, setAcVoltage, setAcOption, setAcGearHead, setAcRatio, setAcConfirm };
  const rkfsState = {
  rkfsSeries, rkfsDesign, rkfsSize, rkfsMotorType, rkfsMotorPower,
  rkfsPole, rkfsRatio, rkfsMounting, rkfsPosition, rkfsPositionSub,
  rkfsDesignSuffix,
    rkfsMountingTemp,
  rkfsInputSel,                // ★ เพิ่ม
};
  const rkfsSetters = {
  setRkfsSeries, setRkfsDesign, setRkfsSize, setRkfsMotorType, setRkfsMotorPower,
  setRkfsPole, setRkfsRatio, setRkfsMounting, setRkfsPosition, setRkfsPositionSub,
  setRkfsDesignSuffix, setRkfsMountingTemp,
  setRkfsInputSel,            // ★ เพิ่ม
};

const getFileUrl = () => {
  if (!selectedModel) return '#';

  // 👉 RKFS ใช้ placeholder ทั้ง Ratio=XXX และ Mounting=XX
  if (selectedProduct === 'RKFS Series') {
    const parts = selectedModel.split('-');
    if (parts.length >= 8) {
      parts[4] = 'XXX'; // Ratio
      parts[5] = 'XX';  // Mounting
      const fileName = `${parts.join('-')}.STEP`;
      // same-origin (public/model) + กัน cache
      return `/model/${encodeURIComponent(fileName)}?v=${Date.now()}`;
    }
  }

 if (selectedProduct === 'BLDC Gear Motor') {
   const base = (typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL) || '';

   // ดึงชนิดเกียร์จาก Model Code (-GUL|-GU|-GNL|-GN-) เผื่อ state ไม่ตรง
   const m = selectedModel.match(/-(GUL|GU|GNL|GN)-/);
   const gearFromModel = m ? m[1] : null;
   const effectiveGear  = bldcGearType || gearFromModel;
   const withSTEP = (name) => name.endsWith('.STEP') ? name : `${name}.STEP`;
      // HE (SF/SL) → ใช้ static filename ที่คุณ map ไว้อยู่แล้ว
      if (bldcHEType === 'SF' || bldcHEType === 'SL') {
       const heName = mapBLDCHEStaticFilename(selectedModel, bldcHEType);
   if (heName) return `${base}/model/${encodeURIComponent(withSTEP(heName))}?v=${Date.now()}`;
   }

   // Nol: GN/GNL/GU/GUL → map เป็นชื่อไฟล์คงที่ตาม prefix
   if (effectiveGear) {
     const nol = mapBLDCNolStaticFilename(selectedModel, effectiveGear);
     if (nol) return `${base}/model/${encodeURIComponent(withSTEP(nol))}?v=${Date.now()}`;
   }

   // เดิม (normalizer 24/36/48/220) — ใช้เป็น fallback
   const mapped = mapBLDCDownloadFilename(selectedModel);
   if (mapped) return `${base}/model/${encodeURIComponent(withSTEP(mapped))}?v=${Date.now()}`;
   return '#';
 }
  // อื่น ๆ ใช้ชื่อรุ่นตรงตัว
  return `/model/${encodeURIComponent(`${selectedModel}.STEP`)}?v=${Date.now()}`;
};


  return (
  <div className="relative min-h-screen overflow-hidden">
    {/* BG หรู + เบลอ + ไล่เฉด */}
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-[1.02]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* ไล่เฉดให้ดูแพงขึ้น */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/40" />
      {/* ทับมืดเมื่อเข้าเพจสินค้า */}
      {selectedProduct && <div className="absolute inset-0 bg-black/45" />}
    </div>

    {/* คอนเทนต์ทั้งหมดเหนือ BG */}
    <div className="relative z-10">

      {/* เนื้อหา */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto text-gray-900">
        {!selectedProduct && (
          <>
{/* Title: Lux 3D gradient + GIF flanks */}
<div className="mb-6">
  <div className="mx-auto w-full max-w-5xl">
    <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
      {/* GIF ซ้าย — สูงกว่าตัวอักษรนิดหน่อย */}
      <img
        src={ANL}
        alt="Left accent"
        className="h-[132px] md:h-[160px] lg:h-[180px] object-contain select-none"
        draggable="false"
        aria-hidden="true"
      />

      {/* SVG Title กลาง */}
      <svg
        viewBox="0 0 800 240"
        className="w-auto h-[160px] md:h-[185px] lg:h-[195px] select-none"
        preserveAspectRatio="xMidYMid meet"
        aria-label="SAS 3D.STEP"
      >
        <defs>
          {/* ไล่เฉดโทน น้ำเงิน–ฟ้า–เทา–ขาว พร้อม animation กวาดซ้าย↔ขวา */}
          {/* อิง viewBox กว้าง 1200 เพื่อให้กวาดครอบคลุมถึงคำว่า STEP */}
          <linearGradient
            id="luxGradient"
            x1="0" y1="0" x2="800" y2="0"
            gradientUnits="userSpaceOnUse"
            spreadMethod="pad"
          >
            <stop offset="0%"   stopColor="#dbeafe" />
            <stop offset="35%"  stopColor="#60a5fa" />
            <stop offset="70%"  stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#ffffff" />
            <animateTransform
              attributeName="gradientTransform"
              attributeType="XML"
              type="translate"
              values="-600 0; 600 0; -600 0"
              keyTimes="0;0.5;1"
              dur="4s"
              begin="0s"
              calcMode="linear"
              restart="always"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* เงาทิ้งตัวนุ่ม ๆ ใต้ตัวอักษร */}
          <filter id="luxShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0,0,0,0.35)" />
          </filter>

          {/* Emboss/นูนเงาไฮไลท์ให้ดูเป็นโลหะหรู ๆ */}
          <filter id="emboss" x="-20%" y="-20%" width="140%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.5" specularExponent="20" lightingColor="#ffffff" result="spec">
              <fePointLight x="-5000" y="-10000" z="20000" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="specMask" />
            <feComposite in="SourceGraphic" in2="specMask" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>

        {/* เงาหลัก */}
        <text
          x="50%" y="65%"
          textAnchor="middle" dominantBaseline="middle"
          fontFamily="Inter, ui-sans-serif, system-ui"
          fontWeight="900" fontSize="118"
          fill="url(#luxGradient)"
          filter="url(#luxShadow)"
        >
          SAS 3D.STEP
        </text>

        {/* ชั้นนูน/ไฮไลท์ */}
        <text
          x="50%" y="65%"
          textAnchor="middle" dominantBaseline="middle"
          fontFamily="Inter, ui-sans-serif, system-ui"
          fontWeight="900" fontSize="118"
          fill="url(#luxGradient)"
          filter="url(#emboss)"
        >
          SAS 3D.STEP
        </text>
      </svg>
      {/* === Real-time Stats (Left & Right) === */}
<div className="relative w-full max-w-6xl mx-auto mt-2">
  {/* ซ้าย: ผู้ชมทั้งหมด */}
  <div className="absolute -top-6 left-12">
    <div className="backdrop-blur-md bg-white/20 text-white px-4 py-2 rounded-2xl shadow-lg ring-1 ring-white/10">
      <div className="text-xs opacity-90">มีผู้เข้าชมแล้ว</div>
      <div className="text-2xl font-extrabold tabular-nums">
        {stats.totalVisits.toLocaleString()}
      </div>
    </div>
  </div>

  {/* ขวา: ดาวน์โหลด 3D ทั้งหมด */}
  <div className="absolute -top-6 right-0">
    <div className="backdrop-blur-md bg-white/20 text-white px-4 py-2 rounded-2xl shadow-lg ring-1 ring-white/10">
      <div className="text-xs opacity-90">ยอดดาวน์โหลด 3D ทั้งหมด</div>
      <div className="text-2xl font-extrabold tabular-nums">
        {stats.totalDownloads.toLocaleString()}
      </div>
    </div>
  </div>
</div>


      {/* GIF ขวา — สูงกว่าตัวอักษรนิดหน่อย */}
      <img
        src={ANR}
        alt="Right accent"
        className="h-[142px] md:h-[170px] lg:h-[190px] object-contain select-none"
        draggable="false"
        aria-hidden="true"
      />
    </div>
  </div>
</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {productList.map((p) => (
                <button
  key={p.name}
  type="button"
  onClick={() => {
  if (p.name === 'AC Gear Motor') {
    // กันค้างค่าเดิมทุกตัว
    setAcMotorType(null);
    setAcPower(null);
    setAcSpeedAdjust(null);
    setAcVoltage(null);
    setAcOption(null);
    setAcGearHead(null);
    setAcRatio(null);
    setAcConfirm(false);     // ★ สำคัญ
    setModelCodeList([]);
    setSelectedModel(null);
    setShowForm(false);
  }
  setSelectedProduct(p.name);
}}
  className="
    group relative w-full overflow-hidden text-left
    rounded-2xl
    bg-white/80 backdrop-blur-md
    shadow-[0_8px_20px_rgba(0,0,0,0.25)]
    border border-white/20
    transition
    hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]
    active:translate-y-0.5 active:shadow-[0_6px_14px_rgba(0,0,0,0.25)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
    p-0
    tilt-card
  "
>
  {/* เงาสะท้อนบาง ๆ ที่มีอยู่เดิม */}
  <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition" />

  {/* เพิ่มแสงวิ่งหรู ๆ */}
  <span className="sheen-layer"></span>

  {/* เพิ่มขอบเรืองแสงนุ่ม ๆ */}
  <span className="glow-layer"></span>

  <div className="flex flex-col h-full">
    <div className="aspect-[4/3] grid place-items-center bg-white/50">
      <img
        src={p.image}
        alt={p.name}
        className="card-image max-h-[70%] max-w-[85%] object-contain"
        loading="lazy"
      />
    </div>

    <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-white/30">
      <p className="font-semibold text-gray-900 tracking-wide">
        {p.name}
      </p>
    </div>
  </div>
</button>
              ))}
            </div>
          </>
        )}


{selectedProduct && COMING_SOON.has(selectedProduct) && (
  <>
    {/* ปุ่ม Home มุมขวาบน */}
    <div className="fixed top-4 right-4 z-20">
      <button
        type="button"
        onClick={() => setSelectedProduct(null)}
        className="px-4 py-2 rounded-xl bg-white/90 text-black font-semibold shadow hover:shadow-lg transition"
        aria-label="Home"
        title="Home"
      >
        Home
      </button>
    </div>

    {/* หน้าประกาศ Coming soon */}
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center select-none">
        <div className="bw-text font-black tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
                        text-[64px] md:text-[84px] lg:text-[96px]">
          Coming soon
        </div>
        <div className="mt-2 text-white/90 text-[10px] md:text-[11px]">
          แล้วพบกันเร็วๆนี้.....
        </div>
      </div>
    </div>
  </>
)}

        {selectedProduct === 'AC Gear Motor' && !selectedModel && !showForm && (
          <>
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-green-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">AC Gear Motor Selection</h2>
              <button className="text-green-600 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]" onClick={handleBack}>Home</button>
            </div>
            <ACMotorFlow
              acState={acState}
              acSetters={acSetters}
              onConfirm={(modelCode) => {
                const models = Array.isArray(modelCode) ? modelCode : [modelCode];
                setModelCodeList(models);
                setSelectedModel(models[0]);
              }}
            />
          </>
        )}
        {selectedProduct === 'AC Gear Motor' && selectedModel && !showForm && (
  <>
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code:</h2>
      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex justify-center items-center space-x-2">
          <input
            type="radio"
            name="modelSelect"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <label className="text-white drop-shadow">{code}</label>
        </div>
      ))}
    </div>
        {/* iPad frame + GIF เกียร์ (กึ่งกลางหน้าจอ) */}
{(() => {
  const gif = gearGifForHead();
  if (!gif) return null;

  return (
    <div className="mt-6 flex justify-center">
      {/* กรอบ iPad */}
      <div className="
        relative
        w-[800px] h-[600px]        /* ขนาดหลัก iPad 4:3 */
        sm:w-[720px] sm:h-[540px]  /* เล็กลงเล็กน้อยบนจอแคบ */
        md:w-[900px] md:h-[675px]  /* ขยายบนจอกว้าง */
        bg-black p-6 rounded-[2rem] shadow-2xl ring-1 ring-white/10
      ">
        {/* กล้องหน้า (center camera) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-black ring-2 ring-white/20" />
          <span className="block w-2 h-2 rounded-full bg-black ring-2 ring-white/15" />
        </div>

        {/* หน้าจอ iPad */}
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white">
          <img
            src={gif}
            alt="Gear 3D preview"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
})()}

    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
  await recordDownloadOncePerSession();  // ★ เพิ่มบรรทัดนี้เพื่อเพิ่มตัวนับ
  setShowForm(true);
}}
      >
        Download 3D
      </button>
      <button
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleBack}
      >
        Home
      </button>
    </div>
  </>
)}

{/* ตัวอย่างการเรียก */}
{selectedProduct === 'Servo Motor' && !selectedModel && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-blue-600 font-bold mb-2 drop-shadow">Servo Motor Selection</h2>
      <button
  className="text-blue-600 hover:underline"
  onClick={() => {
    setSvInertia(null);
    setSvFlange(null);
    setSvVoltage(null);
    setSvPowerCode(null);
    setSvSpeed(null);
    setSvOption(null);
    setSvEncoder(null);
    setSvOutput(null);
    setSelectedModel(null);
    setModelCodeList([]);
    setShowForm(false);
    setSelectedProduct(null);
  }}
 >Home</button>
    </div>

    {renderServoFlow(servoState, servoSetters, (modelCode) => {
   const models = [modelCode];
   setModelCodeList(models);
   setSelectedModel(models[0]);
   // ไปหน้าแบบฟอร์มเหมือน product อื่น
   setShowForm(true);
 })}
  </>
)}

  {selectedProduct === 'Hypoid Gear' && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-green-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Hypoid Gear Selection</h2>
      <button
  onClick={() => {
    if (selectedProduct === 'Hypoid Gear') {
      handleHypoidHome();  // [ADD-HYPOID]
    } else {
      // โค้ดเดิมที่คุณใช้สำหรับ Home
      handleBackUniversal(); // หรือฟังก์ชันที่คุณมีอยู่
    }
  }}
className="text-green-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Home
</button>
    </div>
    {renderHypoidGearFlow(hypoidState, hypoidSetters, (modelCode) => {
      const models = Array.isArray(modelCode) ? modelCode : [modelCode];
      setModelCodeList(models);
      setSelectedModel(models[0]);
    })}
   {/* [HYP] ผลลัพธ์อยู่หน้าเดียวกับการเลือก (เหมือน BLDC) */}
    {modelCodeList?.length > 0 && (
      <>
        {/* iPad frame + GIF (Hypoid) */}
        {(() => {
          const gif = hypoidGif();
          if (!gif) return null;
          return (
            <div className="mt-6 flex justify-center">
              {/* กรอบ iPad */}
              <div className="
                relative
                w-[800px] h-[600px]
                sm:w-[720px] sm:h-[540px]
                md:w-[900px] md:h-[675px]
                bg-black p-6 rounded-[2rem] shadow-2xl ring-1 ring-white/10
              ">
                {/* กล้องหน้า */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-full bg-black ring-2 ring-white/20" />
                  <span className="block w-2 h-2 rounded-full bg-black ring-2 ring-white/15" />
                </div>
                {/* หน้าจอ iPad */}
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white">
                  <img src={gif} alt="Hypoid preview" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          );
        })()}

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
  await recordDownloadOncePerSession();  // ★ เพิ่มบรรทัดนี้เพื่อเพิ่มตัวนับ
  setShowForm(true);
}}
          >
            Download 3D
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleBack}
          >
            Home
          </button>
        </div>
      </>
    )}
  </>
)}

{/* [ADD-PLANETARY-VIEW] */}
{selectedProduct === 'Planetary Gear' && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-yellow-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        Planetary Gear Selection
      </h2>
      <button className="text-yellow-600 hover:underline" onClick={handlePlanetaryHome}>Home</button>
    </div>

    {renderPlanetaryGearFlow(planetState, planetSetters, (code) => {
      const codes = Array.isArray(code) ? code : [code];
      setModelCodeList(codes);
      setSelectedModel(codes[0]);

      // 👇 เพิ่มบรรทัดนี้เพื่อ “ไปหน้า Download 3D” ทันที
      setShowForm(true);
    })}
  </>
)}




{selectedProduct === 'BLDC Gear Motor' && !selectedModel && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-green-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">BLDC Gear Selection</h2>
      <button className="text-green-600 hover:underline" onClick={goHomeFromBLDC}>Home</button>
    </div>

    {renderBLDCGearFlow(
  {
    bldcCategory, bldcFrame, bldcPower, bldcVoltage,
    bldcGearType, bldcSpeed, bldcOption, bldcRatio,
    bldcHEType, bldcSFDiameter            // [ADD-BLDC-HIGH]
  },
  {
    setBldcCategory, setBldcFrame, setBldcPower, setBldcVoltage,
    setBldcGearType, setBldcSpeed, setBldcOption, setBldcRatio,
        setBldcSelectedImage,
    setBldcHEType, setBldcSFDiameter      // [ADD-BLDC-HIGH]
  },
  (modelCode) => {
    const models = Array.isArray(modelCode) ? modelCode : [modelCode];
    setModelCodeList(models);
    setSelectedModel(models[0]);
  },
  goHomeFromBLDC,
  backOneStepBLDC
)}
  </>
)}

{/* [ADD-BLDC] แสดงรายการรุ่นหลัง Generate */}
{selectedProduct === 'BLDC Gear Motor' && modelCodeList?.length > 0 && !showForm && (
  <>
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code:</h2>

      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex justify-center items-center space-x-2">
          <input
            type="radio"
            name="modelSelectBLDC"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <label className="text-white/90">{code}</label>
        </div>
      ))}
            {/* iPad frame + GIF (BLDC) */}
 {(() => {
   const gif = bldcGifForModel();
   if (!gif) return null;
   return (
     <div className="mt-6 flex justify-center">
       {/* กรอบ iPad */}
       <div className="
         relative
         w-[800px] h-[600px]
         sm:w-[720px] sm:h-[540px]
         md:w-[900px] md:h-[675px]
         bg-black p-6 rounded-[2rem] shadow-2xl ring-1 ring-white/10
       ">
         {/* กล้องหน้า */}
         <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
           <span className="block w-3 h-3 rounded-full bg-black ring-2 ring-white/20" />
           <span className="block w-2 h-2 rounded-full bg-black ring-2 ring-white/15" />
         </div>
         {/* หน้าจอ iPad */}
         <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white">
           <img src={gif} alt="BLDC preview" className="w-full h-full object-contain" />
         </div>
       </div>
     </div>
   );
 })()}
      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={async () => {
  await recordDownloadOncePerSession();  // ★ เพิ่มบรรทัดนี้เพื่อเพิ่มตัวนับ
  setShowForm(true);
}}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow"
        >
          Download 3D
        </button>
        <button
          onClick={goHomeFromBLDC}
          className="px-5 py-2 rounded-xl bg-white hover:bg-white/90 shadow"
        >
          Home
        </button>
      </div>
    </div>
  </>
)}

{selectedProduct === 'HB Gearbox Series' && !selectedModel && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">HB Gearbox Selection</h2>
      <button className="text-blue-600 hover:underline" onClick={handleBackWithReset}>Home</button>
    </div>
{renderHBGearFlow(
   hbState,
   hbSetters,
   // (onConfirm) — ถ้าคุณยังอยากให้กดไปหน้าสรุปเฉย ๆ ก็เก็บไว้ได้
   (modelCode) => {
     const models = Array.isArray(modelCode) ? modelCode : [modelCode];
     setModelCodeList(models);
     setSelectedModel(models[0]);
   },
   // onHome → กลับหน้า Product รวม + reset ส่วนกลาง
   handleBackUniversal,
   // onDownload → ตั้งรุ่น + เปิดฟอร์มเหมือน product อื่น
   (modelCode) => {
     const models = [modelCode];
     setModelCodeList(models);
     setSelectedModel(modelCode);
     setShowForm(true);        // ใช้ฟอร์มเดียวกับ product อื่น (ชื่อ/อีเมล/ฯลฯ)
   }
 )}
  </>
)}

{selectedProduct === 'SRV Worm Gear' && !selectedModel && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-white font-bold mb-2 drop-shadow">SRV Worm Gear Selection</h2>
      <button className="text-blue-600 hover:underline" onClick={handleBack}>Home</button>
    </div>

    {renderSRVFlow(srvState, srvSetters, (modelCode) => {
      const models = Array.isArray(modelCode) ? modelCode : [modelCode];
      setModelCodeList(models);
      setSelectedModel(models[0]);
      setShowForm(true); // ★ เด้งไปหน้าแบบฟอร์ม
    })}
  </>
)}

{/* 🟦 RKFS Series STEP 1 */}
{selectedProduct === 'RKFS Series' && !selectedModel && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-white font-bold mb-2 drop-shadow">RKFS Series Selection</h2>
      <button className="text-blue-500 font-bold mb-2 drop-shadow" onClick={handleBackUniversal}>Home</button>
    </div>
    {renderRKFSFlow(rkfsState, rkfsSetters, (modelCode) => {
      const models = Array.isArray(modelCode) ? modelCode : [modelCode];
      setModelCodeList(models);
      setSelectedModel(models[0]);
    })}
  </>
)}



{/* 🟩 RKFS Series หลังเลือก model แล้ว */}
{selectedProduct === 'RKFS Series' && selectedModel && !showForm && (
  <>
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code:</h2>
      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex justify-center items-center space-x-2">
          <input
            type="radio"
            name="modelSelect"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <label className="text-white drop-shadow">{code}</label>
        </div>
      ))}
    </div>

    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
  await recordDownloadOncePerSession();  // ★ เพิ่มบรรทัดนี้เพื่อเพิ่มตัวนับ
  setShowForm(true);
}}
      >
        Download 3D
      </button>
      <button
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleBackUniversal}
      >
        Home
      </button>
    </div>
  </>
)}


{showForm && (
          <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold mb-4">กรอกข้อมูลครบทุกช่องและรับไฟล์ .STEP ได้ทันที ไม่ต้องรอ..ตอบกลับครับ</h3>

            <input type="text" placeholder="ชื่อ" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input
  type="text"
  placeholder="เบอร์ติดต่อ"
  value={userInfo.phone}
  onChange={(e) => {
    const v = (e.target.value || '').replace(/\D/g, '').slice(0, 10); // ★ ตัวเลขล้วน, จำกัด 10 หลัก
    setUserInfo({ ...userInfo, phone: v });
  }}
  inputMode="numeric"               // ★ ช่วยเด้งคีย์บอร์ดตัวเลขบนมือถือ (ไม่กระทบโครงสร้าง)
  className="w-full mb-2 p-2 border rounded"
/>
            <input type="text" placeholder="ชื่อบริษัท" value={userInfo.company} onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })} className="w-full mb-2 p-2 border rounded" />

            <div className="flex mb-2 gap-2">
              <input type="email" placeholder="Email ติดต่อ" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} className="flex-1 p-2 border rounded" />
              <button
  type="button"
  onClick={handleSendVerificationCode}
  disabled={!userInfo.email || !isValidThaiMobile(userInfo.phone)}   // ★ เพิ่ม
  title={!isValidThaiMobile(userInfo.phone) ? "กรอกเบอร์ 10 หลักขึ้นต้น 06/08/09" : ""}
  className="bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
>
  รับรหัส
</button>
            </div>

            {codeSent && (
              <input type="text" placeholder="กรอกรหัสที่ได้รับทางอีเมล" value={emailCodeInput} onChange={(e) => setEmailCodeInput(e.target.value)} className="w-full mb-4 p-2 border rounded" />
            )}

            <div className="relative">
              <button onClick={handleDownload} disabled={!userInfo.name || !userInfo.phone || !userInfo.company || !userInfo.email || isDownloading} className={`w-full py-2 rounded text-white font-semibold transition ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg'}`}>
                {isDownloading ? 'กำลังดาวน์โหลด...' : 'ยืนยันและรับไฟล์'}
              </button>
              {isDownloading && (<img src={hourglass} alt="loading" className="w-8 h-8 absolute -top-10 right-0 animate-spin" />)}
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
      </div>
  );
}

export default App;
