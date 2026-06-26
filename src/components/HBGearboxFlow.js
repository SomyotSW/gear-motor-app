// HBGearboxFlow.js
// ─────────────────────────────────────────────────────────────────────────────
// HB Gearbox Series Flow — แยกออกมาจาก MotorFlows.js
// รวม: generateHBModelCode, renderHBGearFlow
// และข้อมูลตาราง PN (H/B Stage 1–4) + calcSFBySeriesStage + getPNBySeriesStage
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { motion } from 'framer-motion';

// ─── Assets ──────────────────────────────────────────────────────────────────
import HB1Img   from '../assets/hb/HB1.png';
import ZDY1Img  from '../assets/hb/ZDY1.png';

import HTypeImg from '../assets/hb/HType.png';
import BTypeImg from '../assets/hb/BType.png';

import HADesignImg from '../assets/hb/HADesign.png';
import HBDesignImg from '../assets/hb/HBDesign.png';
import HCDesignImg from '../assets/hb/HCDesign.png';
import HDDesignImg from '../assets/hb/HDDesign.png';
import HEDesignImg from '../assets/hb/HEDesign.png';
import HFDesignImg from '../assets/hb/HFDesign.png';
import HGDesignImg from '../assets/hb/HGDesign.png';
import HHDesignImg from '../assets/hb/HHDesign.png';
import HIDesignImg from '../assets/hb/HIDesign.png';
import BADesignImg from '../assets/hb/BADesign.png';
import BBDesignImg from '../assets/hb/BBDesign.png';
import BCDesignImg from '../assets/hb/BCDesign.png';
import BDDesignImg from '../assets/hb/BDDesign.png';
import BEDesignImg from '../assets/hb/BEDesign.png';
import BFDesignImg from '../assets/hb/BFDesign.png';

import HST1Img  from '../assets/hb/HST1.png';
import HST2Img  from '../assets/hb/HST2.png';
import HST3Img  from '../assets/hb/HST3.png';
import HST4Img  from '../assets/hb/HST4.png';

import BST2Img  from '../assets/hb/BST2.png';
import BST3Img  from '../assets/hb/BST3.png';
import BST4Img  from '../assets/hb/BST4.png';

// Output shaft structure (H)
import H__SImg  from '../assets/hb/H..S.png';
import H__HImg  from '../assets/hb/H..H.png';
import H__DImg  from '../assets/hb/H..D.png';
import H__KImg  from '../assets/hb/H..K.png';
import H__FImg  from '../assets/hb/H..F.png';

// Output shaft structure (B)
import B__SImg  from '../assets/hb/B..S.png';
import B__HImg  from '../assets/hb/B..H.png';
import B__DImg  from '../assets/hb/B..D.png';
import B__DFImg from '../assets/hb/B..DF.png';
import B__KImg  from '../assets/hb/B..K.png';
import B__FImg  from '../assets/hb/B..F.png';

// Mounting Position
import HHORImg  from '../assets/hb/HHOR.png';
import HVERImg  from '../assets/hb/HVER.png';
import BHORImg  from '../assets/hb/BHOR.png';
import BVERImg  from '../assets/hb/BVER.png';

// ZDY / ZLY / … (Step 2)
import ZDYImg   from '../assets/hb/ZDY.png';
import ZLYImg   from '../assets/hb/ZLY.png';
import ZSYImg   from '../assets/hb/ZSY.png';
import ZFYImg   from '../assets/hb/ZFY.png';
import DBYImg   from '../assets/hb/DBY.png';
import DCYImg   from '../assets/hb/DCY.png';
import DFYImg   from '../assets/hb/DFY.png';
import DBYKImg  from '../assets/hb/DBYK.png';
import DCYKImg  from '../assets/hb/DCYK.png';
import DFYKImg  from '../assets/hb/DFYK.png';

// ─────────────────────────────────────────────────────────────────────────────
// Nominal Power Tables (H Series)
// ─────────────────────────────────────────────────────────────────────────────

// ---------- H Series : STAGE 1 ----------
export const H1_PN1500_BY_SIZE = {
  1:{1.25:38, 1.4:34 , 1.6:31 , 1.8:28 , 2:26 , 2.24:23 , 2.5:21 , 2.8:19 , 3.15:17 , 3.55:15 , 4:13 , 4.5:9 , 5:7.5 , 5.6:6.3},2:{},3:{1.25:106, 1.4:96 , 1.6:87 , 1.8:80 , 2:72 , 2.24:66 , 2.5:60 , 2.8:55 , 3.15:50 , 3.55:44 , 4:40 , 4.5:28 , 5:24 , 5.6:20},4:{},5:{1.25:310, 1.4:275 , 1.6:245 , 1.8:220 , 2:205 , 2.24:185 , 2.5:165 , 2.8:148 , 3.15:132 , 3.55:120 , 4:105 , 4.5:75 , 5:65 , 5.6:55},6:{},7:{1.25:590, 1.4:545 , 1.6:482 , 1.8:446 , 2:410 , 2.24:366 , 2.5:328 , 2.8:290 , 3.15:255 , 3.55:228 , 4:200 , 4.5:156 , 5:120 , 5.6:103},8:{},9:{},10:{},
  11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},
  21:{},22:{},23:{},24:{},25:{},26:{},
};
export const H1_PN1000_BY_SIZE = {
  1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},
  11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},
  21:{},22:{},23:{},24:{},25:{},26:{},
};
export const H1_PN750_BY_SIZE = {
  1:{1.25:50, 1.4:47 , 1.6:43 , 1.8:40 , 2:37 , 2.24:34 , 2.5:31 , 2.8:28 , 3.15:25 , 3.55:22 , 4:20 , 4.5:14 , 5:12 , 5.6:9},2:{},3:{1.25:163, 1.4:152 , 1.6:142 , 1.8:105 , 2:98 , 2.24:88 , 2.5:82 , 2.8:76 , 3.15:67 , 3.55:62 , 4:55 , 4.5:38 , 5:33 , 5.6:28},4:{},5:{1.25:440, 1.4:404 , 1.6:368 , 1.8:336 , 2:322 , 2.24:295 , 2.5:264 , 2.8:236 , 3.15:209 , 3.55:183 , 4:165 , 4.5:117 , 5:99 , 5.6:84},6:{},7:{1.25:836, 1.4:780 , 1.6:697 , 1.8:664 , 2:609 , 2.24:544 , 2.5:487 , 2.8:418 , 3.15:379 , 3.55:342 , 4:305 , 4.5:241 , 5:188 , 5.6:160},8:{},9:{},10:{},
  11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},
  21:{},22:{},23:{},24:{},25:{},26:{},
};

// ---------- H Series : STAGE 2 ----------
export const H2_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H2_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H2_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- H Series : STAGE 3 ----------
export const H3_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{28:616, 31.5:548 , 35.5:479, 40:434, 45:377, 50:342, 56:308, 63:274, 71:240, 80:215, 90:191, 100:171, 112:153},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H3_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{28:411, 31.5:365 , 35.5:320, 40:285, 45:251, 50:228, 56:204, 63:181, 71:161, 80:143, 90:127, 100:114, 112:102},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H3_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{28:308, 31.5:274 , 35.5:240, 40:215, 45:191, 50:171, 56:153, 63:136, 71:121, 80:107, 90:95, 100:86, 112:76},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- H Series : STAGE 4 ----------
export const H4_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H4_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H4_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 1 ----------
export const B1_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B1_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B1_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 2 ----------
export const B2_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B2_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B2_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 3 ----------
export const B3_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B3_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B3_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 4 ----------
export const B4_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B4_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B4_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ─────────────────────────────────────────────────────────────────────────────
// Helpers: interpolation + PN lookup
// ─────────────────────────────────────────────────────────────────────────────

function interpLogX(mapRatioToPN, x) {
  const keys = Object.keys(mapRatioToPN).map(Number).sort((a, b) => a - b);
  if (!keys.length) return null;
  if (x <= keys[0]) return Number(mapRatioToPN[keys[0]]);
  if (x >= keys[keys.length - 1]) return Number(mapRatioToPN[keys[keys.length - 1]]);
  let lo = keys[0], hi = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) {
    if (x >= keys[i] && x <= keys[i + 1]) { lo = keys[i]; hi = keys[i + 1]; break; }
  }
  const yLo = Number(mapRatioToPN[lo]), yHi = Number(mapRatioToPN[hi]);
  const t = (Math.log(x) - Math.log(lo)) / (Math.log(hi) - Math.log(lo));
  return Math.exp((1 - t) * Math.log(yLo) + t * Math.log(yHi));
}

export function getPNBySeriesStage(series, stage, sizeIndex, ratio, n1) {
  if (!series || !stage || !sizeIndex || !ratio || !n1) return null;
  let table = null;
  const S = String(series).toUpperCase();
  const R = Number(ratio);

  if (S === 'H') {
    table =
      stage === 1 ? (n1 === 1500 ? H1_PN1500_BY_SIZE : n1 === 1000 ? H1_PN1000_BY_SIZE : n1 === 750 ? H1_PN750_BY_SIZE : null) :
      stage === 2 ? (n1 === 1500 ? H2_PN1500_BY_SIZE : n1 === 1000 ? H2_PN1000_BY_SIZE : n1 === 750 ? H2_PN750_BY_SIZE : null) :
      stage === 3 ? (n1 === 1500 ? H3_PN1500_BY_SIZE : n1 === 1000 ? H3_PN1000_BY_SIZE : n1 === 750 ? H3_PN750_BY_SIZE : null) :
      stage === 4 ? (n1 === 1500 ? H4_PN1500_BY_SIZE : n1 === 1000 ? H4_PN1000_BY_SIZE : n1 === 750 ? H4_PN750_BY_SIZE : null) : null;
  } else {
    table =
      stage === 1 ? (n1 === 1500 ? B1_PN1500_BY_SIZE : n1 === 1000 ? B1_PN1000_BY_SIZE : n1 === 750 ? B1_PN750_BY_SIZE : null) :
      stage === 2 ? (n1 === 1500 ? B2_PN1500_BY_SIZE : n1 === 1000 ? B2_PN1000_BY_SIZE : n1 === 750 ? B2_PN750_BY_SIZE : null) :
      stage === 3 ? (n1 === 1500 ? B3_PN1500_BY_SIZE : n1 === 1000 ? B3_PN1000_BY_SIZE : n1 === 750 ? B3_PN750_BY_SIZE : null) :
      stage === 4 ? (n1 === 1500 ? B4_PN1500_BY_SIZE : n1 === 1000 ? B4_PN1000_BY_SIZE : n1 === 750 ? B4_PN750_BY_SIZE : null) : null;
  }
  if (!table || !table[sizeIndex]) return null;
  const row = table[sizeIndex];
  if (row[R] != null) return Number(row[R]);
  if (Object.keys(row).length >= 2) return interpLogX(row, R);
  return null;
}

export function calcSFBySeriesStage(series, stage, sizeIndex, ratio, pole, kW) {
  if (!series || !stage || !sizeIndex || !ratio || !pole || !kW) return { PN: null, SF: null };
  const n1 = pole === 4 ? 1500 : pole === 6 ? 1000 : pole === 8 ? 750 : null;
  if (!n1) return { PN: null, SF: null };
  const PN = getPNBySeriesStage(series, stage, Number(sizeIndex), Number(ratio), n1);
  if (!PN) return { PN: null, SF: null };
  return { PN, SF: PN / Number(kW) };
}

// ─────────────────────────────────────────────────────────────────────────────
// generateHBModelCode
// ─────────────────────────────────────────────────────────────────────────────
export function generateHBModelCode(hbState) {
  const {
    hbSeries,
    hbHBType,
    hbStage,
    hbOutput,
    hbMount,
    hbSize,
    hbRatio,
    hbShaftDesign,
    hbZdySelected,
  } = hbState || {};

  if (hbSeries === 'HB') {
    if (!hbHBType || !hbStage || !hbOutput || !hbMount || !hbSize || !hbRatio || !hbShaftDesign) {
      return null;
    }
    const seriesLetter = hbHBType;
    const stageStr     = String(hbStage);
    const outStr       = hbOutput;
    const mountStr     = hbMount;
    const sizeStr      = String(hbSize);
    const ratioStr     = String(hbRatio);
    const designStr    = hbShaftDesign;
    return `${seriesLetter}${stageStr}${outStr}${mountStr}${sizeStr}-${ratioStr}-${designStr}`;
  }

  // ZDY/… Series: รอข้อมูลรูปแบบโค้ด
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers (ใช้ภายใน renderHBGearFlow เท่านั้น)
// ─────────────────────────────────────────────────────────────────────────────
function getHBShaftDesignImg(hbType, letter) {
  if (!hbType || !letter) return null;
  const H = { A: HADesignImg, B: HBDesignImg, C: HCDesignImg, D: HDDesignImg, E: HEDesignImg, F: HFDesignImg, G: HGDesignImg, H: HHDesignImg, I: HIDesignImg };
  const B = { A: BADesignImg, B: BBDesignImg, C: BCDesignImg, D: BDDesignImg, E: BEDesignImg, F: BFDesignImg };
  const table = hbType === 'H' ? H : B;
  return table[letter] || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// renderHBGearFlow — Step 1–9
// ─────────────────────────────────────────────────────────────────────────────
export function renderHBGearFlow(hbState, hbSetters, onConfirm, onHome, onDownload) {

  const normalizeSize = (hbSize) => {
    if (typeof hbSize === 'number') return hbSize;
    if (!hbSize) return null;
    const m = String(hbSize).match(/(\d{1,2})$/);
    return m ? Number(m[1]) : null;
  };

  // ── Spec Tables ──────────────────────────────────────────────────────────
  const H1_SPEC = {
    1:{od:45,oil:2.5,weight:55}, 3:{od:60,oil:7,weight:128}, 5:{od:85,oil:22,weight:302},
    7:{od:105,oil:42,weight:547}, 9:{od:125,oil:68,weight:862}, 11:{od:150,oil:120,weight:1515},
    13:{od:180,oil:175,weight:2395}, 15:{od:220,oil:190,weight:3200}, 17:{od:240,oil:270,weight:4250},
    19:{od:270,oil:390,weight:5800},
  };
  const H2_SPEC = {
    3:{od:65,oil:6,weight:115},4:{od:80,oil:10,weight:190},5:{od:100,oil:15,weight:300},
    6:{od:110,oil:16,weight:355},7:{od:120,oil:27,weight:505},8:{od:130,oil:30,weight:590},
    9:{od:140,oil:42,weight:830},10:{od:160,oil:45,weight:960},11:{od:170,oil:71,weight:1335},
    12:{od:180,oil:76,weight:1615},13:{od:200,oil:135,weight:2000},14:{od:210,oil:140,weight:2570},
    15:{od:230,oil:210,weight:3430},16:{od:240,oil:215,weight:3655},17:{od:250,oil:290,weight:4650},
    18:{od:270,oil:300,weight:5125},19:{od:290,oil:320,weight:5250},20:{od:300,oil:340,weight:6550},
    21:{od:320,oil:320,weight:7200},22:{od:340,oil:340,weight:7800},
  };
  const H3_SPEC = {
    5:{od:100,oil:15,weight:320},
    6:{od:110,oil:17,weight:365},7:{od:120,oil:28,weight:540},8:{od:130,oil:30,weight:625},
    9:{od:140,oil:45,weight:875},10:{od:160,oil:46,weight:1020},11:{od:170,oil:85,weight:1400},
    12:{od:180,oil:90,weight:1675},13:{od:200,oil:160,weight:2295},14:{od:210,oil:165,weight:2625},
    15:{od:230,oil:235,weight:3475},16:{od:240,oil:245,weight:3875},17:{od:250,oil:305,weight:4560},
    18:{od:270,oil:315,weight:5030},19:{od:290,oil:420,weight:5050},20:{od:300,oil:450,weight:6650},
    21:{od:320,oil:470,weight:6950},22:{od:340,oil:490,weight:7550},23:{od:360,oil:620,weight:11500},24:{od:380,oil:650,weight:13400},
    25:{od:400,oil:880,weight:16100},26:{od:420,oil:935,weight:17600},
  };
  const H4_SPEC = {
    7:{od:120,oil:25,weight:550},8:{od:130,oil:27,weight:645},
    9:{od:140,oil:48,weight:875},10:{od:160,oil:50,weight:1010},11:{od:170,oil:80,weight:1460},
    12:{od:180,oil:87,weight:1725},13:{od:200,oil:130,weight:2390},14:{od:210,oil:140,weight:2730},
    15:{od:230,oil:230,weight:3635},16:{od:240,oil:235,weight:3965},17:{od:250,oil:290,weight:4680},
    18:{od:270,oil:305,weight:5185},19:{od:290,oil:360,weight:5700},20:{od:300,oil:380,weight:6400},
    21:{od:320,oil:395,weight:7750},22:{od:340,oil:420,weight:8350},23:{od:360,oil:520,weight:11600},24:{od:380,oil:550,weight:13500},
    25:{od:400,oil:735,weight:16100},26:{od:420,oil:780,weight:16500},
  };
  const B2_SPEC = {
    1:{od:45,oil:2,weight:65},2:{od:55,oil:4,weight:90},3:{od:65,oil:6,weight:140},4:{od:80,oil:10,weight:235},5:{od:100,oil:16,weight:360},
    6:{od:110,oil:19,weight:410},7:{od:120,oil:31,weight:615},8:{od:130,oil:34,weight:700},
    9:{od:140,oil:48,weight:1000},10:{od:160,oil:50,weight:1155},11:{od:170,oil:80,weight:1640},
    12:{od:180,oil:95,weight:1910},13:{od:200,oil:140,weight:2450},14:{od:210,oil:155,weight:2825},
    15:{od:230,oil:220,weight:3990},16:{od:240,oil:230,weight:4345},17:{od:250,oil:320,weight:5620},
    18:{od:270,oil:335,weight:6150},
  };
  const B3_SPEC = {
    3:{od:65,oil:6,weight:130},4:{od:80,oil:9,weight:210},5:{od:100,oil:14,weight:325},
    6:{od:110,oil:15,weight:380},7:{od:120,oil:25,weight:550},8:{od:130,oil:28,weight:635},
    9:{od:140,oil:40,weight:890},10:{od:160,oil:42,weight:1020},11:{od:170,oil:66,weight:1455},
    12:{od:180,oil:72,weight:1730},13:{od:200,oil:130,weight:2380},14:{od:210,oil:140,weight:2750},
    15:{od:230,oil:210,weight:3730},16:{od:240,oil:220,weight:3955},17:{od:250,oil:290,weight:4990},
    18:{od:270,oil:300,weight:5495},19:{od:290,oil:380,weight:6240},20:{od:300,oil:420,weight:6950},
    21:{od:320,oil:370,weight:8480},22:{od:340,oil:430,weight:9240},23:{od:360,oil:520,weight:11500},24:{od:380,oil:600,weight:13400},25:{od:400,oil:720,weight:16000},26:{od:420,oil:840,weight:17500},
  };
  const B4_SPEC = {
    5:{od:100,oil:16,weight:335},
    6:{od:110,oil:18,weight:385},7:{od:120,oil:30,weight:555},8:{od:130,oil:33,weight:655},
    9:{od:140,oil:48,weight:890},10:{od:160,oil:50,weight:1025},11:{od:170,oil:80,weight:1485},
    12:{od:180,oil:90,weight:1750},13:{od:200,oil:145,weight:2395},14:{od:210,oil:150,weight:2735},
    15:{od:230,oil:230,weight:3630},16:{od:240,oil:235,weight:3985},17:{od:250,oil:295,weight:4695},
    18:{od:270,oil:305,weight:5200},19:{od:290,oil:480,weight:5750},20:{od:300,oil:550,weight:6450},
    21:{od:320,oil:540,weight:7850},22:{od:340,oil:620,weight:8400},23:{od:360,oil:710,weight:11600},24:{od:380,oil:810,weight:13500},25:{od:400,oil:1000,weight:16100},26:{od:420,oil:1100,weight:17600},
  };
  const SPEC_TABLE = { H: { 1: H1_SPEC, 2: H2_SPEC, 3: H3_SPEC, 4: H4_SPEC }, B: { 2: B2_SPEC, 3: B3_SPEC, 4: B4_SPEC } };

  const lookupGearSpecs = (seriesKey, stageNum, sizeIndex) => {
    if (!seriesKey || !stageNum || !sizeIndex) return null;
    const seriesTbl = SPEC_TABLE[seriesKey]; if (!seriesTbl) return null;
    const stageTbl  = seriesTbl[stageNum];   if (!stageTbl)  return null;
    return stageTbl[sizeIndex] || null;
  };

  // ── Input Shaft Ø Rules ───────────────────────────────────────────────────
  const INPUT_DIA_RULES = {
    H: {
      1: {
        1:  [{ min: 1.25, max: 2.80, dia: 40 },{ min: 3.15, max: 4.00, dia: 30 },{ min: 4.50, max: 5.60, dia: 24 }],
        3:  [{ min: 1.25, max: 2.80, dia: 60 },{ min: 3.15, max: 4.00, dia: 45 },{ min: 4.50, max: 5.60, dia: 32 }],
        5:  [{ min: 1.25, max: 2.80, dia: 85 },{ min: 3.15, max: 4.00, dia: 60 },{ min: 4.50, max: 5.60, dia: 50 }],
        7:  [{ min: 1.25, max: 2.80, dia: 100 },{ min: 3.15, max: 4.00, dia: 75 },{ min: 4.50, max: 5.60, dia: 60 }],
        9:  [{ min: 1.25, max: 2.80, dia: 110 },{ min: 3.15, max: 4.00, dia: 90 },{ min: 4.50, max: 5.60, dia: 75 }],
        11: [{ min: 1.6,  max: 2.80, dia: 130 },{ min: 3.15, max: 4.00, dia: 110 },{ min: 4.50, max: 5.60, dia: 90 }],
        13: [{ min: 1.6,  max: 2.80, dia: 150 },{ min: 3.15, max: 4.00, dia: 130 },{ min: 4.50, max: 5.60, dia: 100 }],
        15: [{ min: 2,    max: 2.80, dia: 180 },{ min: 3.15, max: 4.00, dia: 150 },{ min: 4.50, max: 5.60, dia: 125 }],
        17: [{ min: 2,    max: 2.80, dia: 200 },{ min: 3.15, max: 4.00, dia: 170 },{ min: 4.50, max: 5.60, dia: 140 }],
        19: [{ min: 2,    max: 2.80, dia: 220 },{ min: 3.15, max: 4.00, dia: 190 },{ min: 4.50, max: 5.60, dia: 160 }],
      },
      2: {
        3:  [{ min: 6.3,  max: 11.2, dia: 35 },{ min: 12.5, max: 22.4, dia: 28 }],
        4:  [{ min: 6.3,  max: 11.2, dia: 35 },{ min: 12.5, max: 22.4, dia: 28 }],
        5:  [{ min: 6.3,  max: 11.2, dia: 50 },{ min: 12.5, max: 22.4, dia: 38 }],
        6:  [{ min: 8,    max: 14,   dia: 50 },{ min: 16,   max: 28,   dia: 38 }],
        7:  [{ min: 6.3,  max: 11.2, dia: 60 },{ min: 12.5, max: 22.4, dia: 50 }],
        8:  [{ min: 8,    max: 14,   dia: 60 },{ min: 16,   max: 28,   dia: 50 }],
        9:  [{ min: 6.3,  max: 11.2, dia: 75 },{ min: 12.5, max: 22.4, dia: 60 }],
        10: [{ min: 8,    max: 14,   dia: 75 },{ min: 16,   max: 28,   dia: 60 }],
        11: [{ min: 6.3,  max: 11.2, dia: 90 },{ min: 12.5, max: 22.4, dia: 70 }],
        12: [{ min: 8,    max: 14,   dia: 90 },{ min: 16,   max: 28,   dia: 70 }],
      },
    },
    B: {
      3: {
        11: [{ min: 12.5, max: 45, dia: 70 },{ min: 50,   max: 71, dia: 50 }],
        12: [{ min: 16,   max: 56, dia: 70 },{ min: 63,   max: 90, dia: 50 }],
        13: [{ min: 12.5, max: 45, dia: 80 },{ min: 50,   max: 71, dia: 60 }],
        14: [{ min: 16,   max: 56, dia: 80 },{ min: 63,   max: 90, dia: 60 }],
        15: [{ min: 12.5, max: 45, dia: 90 },{ min: 50,   max: 71, dia: 70 }],
        16: [{ min: 14,   max: 50, dia: 90 },{ min: 56,   max: 80, dia: 70 }],
        17: [{ min: 12.5, max: 45, dia: 110 },{ min: 50,  max: 71, dia: 80 }],
        18: [{ min: 14,   max: 50, dia: 110 },{ min: 56,  max: 80, dia: 80 }],
        19: [{ min: 12.5, max: 45, dia: 130 },{ min: 50,  max: 71, dia: 100 }],
        20: [{ min: 14,   max: 50, dia: 130 },{ min: 56,  max: 80, dia: 100 }],
        21: [{ min: 12.5, max: 45, dia: 130 },{ min: 50,  max: 71, dia: 100 }],
        22: [{ min: 14,   max: 50, dia: 130 },{ min: 56,  max: 80, dia: 100 }],
        23: [{ min: 20,   max: 45, dia: 150 },{ min: 50,  max: 71, dia: 110 }],
        24: [{ min: 22.4, max: 50, dia: 150 },{ min: 56,  max: 80, dia: 110 }],
        25: [{ min: 20,   max: 45, dia: 150 },{ min: 50,  max: 71, dia: 110 }],
        26: [{ min: 22.4, max: 50, dia: 150 },{ min: 56,  max: 80, dia: 110 }],
      },
      4: {
        5:  [{ min: 80,   max: 180, dia: 28 },{ min: 200,  max: 315, dia: 20 }],
        6:  [{ min: 100,  max: 224, dia: 28 },{ min: 250,  max: 400, dia: 20 }],
        7:  [{ min: 80,   max: 180, dia: 30 },{ min: 200,  max: 315, dia: 25 }],
        8:  [{ min: 100,  max: 224, dia: 30 },{ min: 250,  max: 400, dia: 25 }],
        9:  [{ min: 80,   max: 180, dia: 35 },{ min: 200,  max: 315, dia: 28 }],
        10: [{ min: 100,  max: 224, dia: 35 },{ min: 250,  max: 400, dia: 28 }],
        11: [{ min: 80,   max: 180, dia: 45 },{ min: 200,  max: 315, dia: 35 }],
        12: [{ min: 100,  max: 224, dia: 45 },{ min: 250,  max: 400, dia: 35 }],
        13: [{ min: 80,   max: 180, dia: 55 },{ min: 200,  max: 315, dia: 40 }],
        14: [{ min: 100,  max: 224, dia: 55 },{ min: 250,  max: 400, dia: 40 }],
        15: [{ min: 80,   max: 180, dia: 70 },{ min: 200,  max: 315, dia: 50 }],
        16: [{ min: 90,   max: 200, dia: 70 },{ min: 224,  max: 355, dia: 50 }],
        17: [{ min: 80,   max: 180, dia: 70 },{ min: 200,  max: 315, dia: 50 }],
        18: [{ min: 90,   max: 200, dia: 70 },{ min: 224,  max: 355, dia: 50 }],
        19: [{ min: 80,   max: 180, dia: 80 },{ min: 200,  max: 315, dia: 60 }],
        20: [{ min: 90,   max: 200, dia: 80 },{ min: 224,  max: 355, dia: 60 }],
        21: [{ min: 80,   max: 180, dia: 90 },{ min: 200,  max: 315, dia: 70 }],
        22: [{ min: 90,   max: 200, dia: 90 },{ min: 224,  max: 355, dia: 70 }],
        23: [{ min: 80,   max: 180, dia: 90 },{ min: 200,  max: 315, dia: 70 }],
        24: [{ min: 90,   max: 200, dia: 90 },{ min: 224,  max: 355, dia: 70 }],
        25: [{ min: 80,   max: 180, dia: 110 },{ min: 200, max: 315, dia: 80 }],
        26: [{ min: 90,   max: 200, dia: 110 },{ min: 224, max: 355, dia: 80 }],
      },
    },
  };

  function getInputDiaFromRules(seriesKey, stageNum, sizeIndex, ratio) {
    const r = Number(ratio);
    if (!Number.isFinite(r)) return null;
    const sKey  = String(seriesKey).toUpperCase();
    const rules = INPUT_DIA_RULES?.[sKey]?.[Number(stageNum)]?.[Number(sizeIndex)];
    if (!rules || !Array.isArray(rules) || rules.length === 0) return null;
    for (const rule of rules) {
      if (r >= rule.min && r <= rule.max) return rule.dia;
    }
    return null;
  }

  const fmt = (val, digits = 2) => {
    if (val === 0 || val === '0') return '0';
    const n = Number(val);
    if (Number.isFinite(n)) return n.toLocaleString(undefined, { maximumFractionDigits: digits });
    return '—';
  };

  const S = hbState || {};
  const { hbSeries, hbHBType, hbStage, hbOutput, hbMount, hbSize, hbRatio, hbShaftDesign, hbZdySelected } = S;

  // ── Updater ───────────────────────────────────────────────────────────────
  const update = (k, v) => {
    if (typeof k !== 'string') return;

    if (k === 'goBack') {
      const stepOrder = [
        'hbSeries', 'hbZdySelected', 'hbHBType', 'hbStage', 'hbOutput',
        'hbMount', 'hbSize', 'hbRatioDraft', 'hbKW', 'hbPole',
        'hbRatio', 'hbPreviewShaft', 'hbShaftDesign',
      ];
      const steps = stepOrder.filter(key =>
        Object.prototype.hasOwnProperty.call(S, key) &&
        typeof hbSetters?.[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`] === 'function'
      );
      let lastIdx = -1;
      for (let i = steps.length - 1; i >= 0; i--) {
        const val = S[steps[i]];
        if (val !== null && val !== undefined && val !== '') { lastIdx = i; break; }
      }
      if (lastIdx >= 0) {
        for (let i = lastIdx; i < steps.length; i++) {
          const key = steps[i];
          hbSetters[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](null);
        }
      }
      return;
    }

    const fn = hbSetters?.[`set${k.charAt(0).toUpperCase()}${k.slice(1)}`];
    if (typeof fn === 'function') fn(v);
  };

  const resetAll = () => {
    ['hbSeries','hbHBType','hbStage','hbOutput','hbMount','hbSize','hbRatio',
     'hbShaftDesign','hbZdySelected','hbPreviewShaft'].forEach(k => update(k, null));
  };

  const goHome = () => { resetAll(); if (typeof onHome === 'function') onHome(); };

  // ── Tile component ────────────────────────────────────────────────────────
  const Tile = ({ img, label, onClick, big }) => {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => { onClick && onClick(); setClicked(false); }, 600);
    };
    return (
      <button
        onClick={handleClick}
        className={`relative tilt-card hb-gradient-effect hb-click-animate rounded-xl p-4 shadow-md ${clicked ? 'clicked' : ''}`}
      >
        <span className="sheen-layer"></span>
        <span className="glow-layer"></span>
        <img src={img} alt={label} className={`${big ? 'h-56 w-56' : 'h-64 w-64'} object-contain card-image`} />
        <div className="mt-2 text-base font-semibold">{label}</div>
      </button>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1: เลือกตระกูล
  // ─────────────────────────────────────────────────────────────────────────
  if (!hbSeries) {
    return (
      <div className="space-y-4 mt-0">
        <h3 className="text-white font-bold mb-2 drop-shadow">Serier Selection</h3>
        <div className="grid grid-cols-1 gap-5 justify-items-center items-start">
          <Tile img={HB1Img}  label="HB Series"       onClick={() => update('hbSeries', 'HB')} />
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Back button (shared)
  // ─────────────────────────────────────────────────────────────────────────
  const BackBtn = () => (
    <button
      onClick={() => update('goBack', null)}
      className="fixed z-30 px-1 py-0.5 rounded text-white/70
                 bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
                 hover:text-white hover:bg-blue-500 hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-400/60
                 active:scale-95 transition-all duration-200"
      style={{ left: 'max(1rem, env(safe-area-inset-left))', bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      ย้อนกลับ
    </button>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2a: HB Series → เลือก H / B
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && !hbHBType) {
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Series Selection H or B</h3>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          <Tile img={HTypeImg} label="H Series" onClick={() => update('hbHBType', 'H')} />
          <Tile img={BTypeImg} label="B Series" onClick={() => update('hbHBType', 'B')} />
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2b: ZDYFAMILY → แสดง 10 ปุ่ม
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'ZDYFAMILY' && !hbZdySelected) {
    const ZLIST = [
      {k:'ZDY',img:ZDYImg},{k:'ZLY',img:ZLYImg},{k:'ZSY',img:ZSYImg},{k:'ZFY',img:ZFYImg},
      {k:'DBY',img:DBYImg},{k:'DCY',img:DCYImg},{k:'DFY',img:DFYImg},
      {k:'DBYK',img:DBYKImg},{k:'DCYK',img:DCYKImg},{k:'DFYK',img:DFYKImg},
    ];
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 2 — เลือก Series (ZDY/ZLY/…)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {ZLIST.map(it => (
            <Tile key={it.k} img={it.img} label={it.k} onClick={() => update('hbZdySelected', it.k)} />
          ))}
        </div>
        <p className="text-white/80 mt-2">* กลุ่มนี้จะลงรายละเอียดเพิ่มเติมภายหลัง</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3: Stage of Gear
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && hbHBType && !hbStage) {
    const HST = [
      {label:'1 Stage', img:HST1Img, v:1},
      {label:'2 Stage', img:HST2Img, v:2},
      {label:'3 Stage', img:HST3Img, v:3},
      {label:'4 Stage', img:HST4Img, v:4},
    ];
    const BST = [
      {label:'2 Stage', img:BST2Img, v:2},
      {label:'3 Stage', img:BST3Img, v:3},
      {label:'4 Stage', img:BST4Img, v:4},
    ];
    const LIST = hbHBType === 'H' ? HST : BST;
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 3 — Stage of Gear</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          {LIST.map(it => (
            <Tile key={it.v} img={it.img} label={it.label} onClick={() => update('hbStage', it.v)} big />
          ))}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 4: Output shaft structure
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && hbHBType && hbStage && !hbOutput) {
    const isH = hbHBType === 'H';
    const allow = isH
      ? (hbStage === 1
          ? [{k:'S',label:'S Solid shaft',img:H__SImg}]
          : [
              {k:'S',label:'S Solid shaft',img:H__SImg},
              {k:'H',label:'H Hollow shaft-Keyway',img:H__HImg},
              {k:'D',label:'D Hollow shaft-Shrink disc',img:H__DImg},
              {k:'K',label:'K Hollow shaft-Splined',img:H__KImg},
              {k:'F',label:'F Hollow shaft-Keyway-Flange mounted',img:H__FImg},
            ])
      : [
          {k:'S',label:'S Solid shaft',img:B__SImg},
          {k:'H',label:'H Hollow shaft-Keyway',img:B__HImg},
          {k:'D',label:'D Hollow shaft-Shrink disc',img:B__DImg},
          {k:'DF',label:'DF Hollow shaft-Shrink disc with fan',img:B__DFImg},
          {k:'K',label:'K Hollow shaft-Splined',img:B__KImg},
          {k:'F',label:'F Hollow shaft-Keyway-Flange mounted',img:B__FImg},
        ];
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 4 — Output shaft structure</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {allow.map(it => (
            <Tile key={it.k} img={it.img} label={it.label} onClick={() => update('hbOutput', it.k)} big />
          ))}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 5: Mounting Position (H/V)
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && !hbMount) {
    const imgs = hbHBType === 'H'
      ? [{k:'H',label:'H : Horizontal',img:HHORImg},{k:'V',label:'V : Vertical',img:HVERImg}]
      : [{k:'H',label:'H : Horizontal',img:BHORImg},{k:'V',label:'V : Vertical',img:BVERImg}];
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 5 — Mounting Position</h3>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {imgs.map(it => (
            <Tile key={it.k} img={it.img} label={it.label} onClick={() => update('hbMount', it.k)} />
          ))}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 6: Gear Size
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && !hbSize) {
    let sizeList = [];
    if (hbHBType === 'H') {
      if (hbStage === 1) sizeList = [1,3,5,7,9,11,13,15,17,19];
      if (hbStage === 2) sizeList = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
      if (hbStage === 3) sizeList = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
      if (hbStage === 4) sizeList = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
    } else {
      if (hbStage === 2) sizeList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
      if (hbStage === 3) sizeList = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
      if (hbStage === 4) sizeList = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
    }
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 6 — Gear Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeList.map(s => (
            <button key={s} onClick={() => update('hbSize', s)} className="px-4 py-2 rounded bg-blue-200 hover:bg-blue-400">{s}</button>
          ))}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 7: Ratio + kW + Pole
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && hbSize && !hbRatio) {
    let ratioList = [];
    if (hbHBType === 'H') {
      if (hbStage === 1) ratioList = [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6];
      if (hbStage === 2) ratioList = [6.3,7.1,8,9,10,11.2,12.5,14,16,18,20,22.4,25,28];
      if (hbStage === 3) ratioList = [22.4,25,28,31.5,35.5,40,45,50,56,63,71,80,90,100,112];
      if (hbStage === 4) ratioList = [100,112,125,140,160,180,200,224,250,280,315,355,400,450];
    } else {
      if (hbStage === 2) ratioList = [5,5.6,6.3,7.1,8,9,10,11.2,12.5,14,16,18];
      if (hbStage === 3) ratioList = [12.5,14,16,18,20,22.4,25,28,31.5,35.5,40,45,50,56,63,71,80,90];
      if (hbStage === 4) ratioList = [80,90,100,112,125,140,160,180,200,224,250,280,315,355,400];
    }
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 7 — Ratio</h3>
        <div className="flex flex-wrap gap-2">
          {ratioList.map((r) => {
            const isSel = S?.hbRatioDraft === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => update('hbRatioDraft', r)}
                className={"px-4 py-2 rounded transition " + (isSel ? "bg-blue-500 text-white" : "bg-blue-200 hover:bg-blue-400")}
              >
                {r}
              </button>
            );
          })}
        </div>

        {/* Calculation Panel */}
        {(() => {
          const ratio    = Number(S?.hbRatioDraft) || null;
          const kw       = parseFloat(S?.hbKW);
          const pole     = Number(S?.hbPole) || null;
          let sizeIndex  = null;
          if (S?.hbSize != null) {
            sizeIndex = typeof S.hbSize === 'number'
              ? S.hbSize
              : (String(S.hbSize).match(/(\d{1,2})$/)?.[1] ? Number(String(S.hbSize).match(/(\d{1,2})$/)[1]) : null);
          }
          const baseByPole = { 2: 3000, 4: 1500, 6: 1000, 8: 750 };
          const baseRpm    = pole ? baseByPole[pole] : null;
          const rpm    = ratio && baseRpm ? (baseRpm / ratio) : null;
          const torque = (kw && rpm) ? (9550 * kw / rpm) * 0.88 : null;
          const series = S?.hbHBType === 'H' ? 'H' : 'B';
          const stage  = Number(S?.hbStage) || null;
          const { PN, SF: sf } =
            (series && stage && sizeIndex && ratio && pole && kw)
              ? calcSFBySeriesStage(series, stage, sizeIndex, ratio, pole, kw)
              : { PN: null, SF: null };

          const fmtV = (x) => (x || x === 0) ? x.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—';

          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                <div className="text-white/70 text-sm">Service Factor : S.f.</div>
                <div className="text-2xl font-semibold text-white mt-1">{(sf || sf === 0) ? sf.toLocaleString(undefined,{ maximumFractionDigits: 2 }) : '—'}</div>
                <div className="text-white/50 text-xs mt-1">
                  {(PN && sizeIndex && series && stage && pole)
                    ? `${series}${stage}: PN=${PN.toLocaleString()} kW @ n1=${(pole===4?1500:pole===6?1000:750)} rpm, Size=${sizeIndex}`
                    : 'เลือก Ratio / ใส่ kW / เลือก Pole และมี Size ก่อน'}
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                <div className="text-white/70 text-sm">Output speed (rpm)</div>
                <div className="text-2xl font-semibold text-white mt-1">{fmtV(rpm)}</div>
                {pole && ratio && <div className="text-white/50 text-xs mt-1">= {baseRpm} / {ratio}</div>}
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                <div className="text-white/70 text-sm">Output torque (N·m)</div>
                <div className="text-2xl font-semibold text-white mt-1">{fmtV(torque)}</div>
                {kw && rpm && <div className="text-white/50 text-xs mt-1">= 9550 × {kw} / {fmtV(rpm)} × 0.88</div>}
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4 lg:col-span-2">
                <label className="text-white/70 text-sm">Motor power (kW)</label>
                <input
                  type="number" min="0" step="0.1"
                  value={S?.hbKW ?? ''}
                  onChange={(e) => update('hbKW', e.target.value)}
                  placeholder="กรอกขนาดมอเตอร์ตาม kW ที่คุณต้องการ เช่น 37"
                  className="mt-2 w-full rounded-xl bg-black/30 text-white px-3 py-2 outline-none border border-white/15 focus:border-blue-400/60"
                />
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                <div className="text-white/70 text-sm mb-2">กดเลือก Pole ของมอเตอร์</div>
                <div className="flex gap-2">
                  {[4,6,8].map((p) => (
                    <button
                      key={p} type="button"
                      onClick={() => update('hbPole', p)}
                      className={"px-3 py-2 rounded-lg border " + (S?.hbPole === p ? "bg-blue-500 text-white border-blue-400" : "bg-black/30 text-white border-white/20 hover:bg-black/40")}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                {S?.hbPole && (
                  <div className="text-white/50 text-xs mt-2">
                    Base speed: {({2:3000,4:1500,6:1000,8:750}[S.hbPole])} rpm
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            disabled={!(S?.hbRatioDraft && S?.hbKW && S?.hbPole)}
            onClick={() => { update('hbRatio', S?.hbRatioDraft); }}
            className={
              "px-5 py-2 rounded-xl border " +
              (S?.hbRatioDraft && S?.hbKW && S?.hbPole
                ? "bg-green-500 text-white border-green-400 hover:bg-green-600"
                : "bg-white/10 text-white/50 border-white/15 cursor-not-allowed")
            }
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 8: Shaft Design
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && hbSize && hbRatio && !hbShaftDesign) {
    const list = hbHBType === 'H' ? ['A','B','C','D','E','F','G','H','I'] : ['A','B','C','D','E','F'];
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
        ('ontouchstart' in window) ||
        (navigator && navigator.maxTouchPoints > 0)
      );
    return (
      <div className="space-y-4 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 8 — Shaft Design</h3>

        {/* Preview กลางจอ */}
        {(() => {
          const previewLetter = S?.hbPreviewShaft || null;
          const previewImg    = getHBShaftDesignImg(hbHBType, previewLetter);
          if (!previewImg) return null;
          return (
            <div className="fixed inset-0 pointer-events-none z-[20] flex items-center justify-center px-3" aria-hidden="true">
              <img
                src={previewImg}
                alt={`HB ${hbHBType} - ${previewLetter}`}
                className="object-contain w-[86vw] md:w-[80vw] lg:w-[56vw] max-h-[64vh] md:max-h-[66vh] lg:max-h-[70vh] drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                draggable={false}
              />
            </div>
          );
        })()}

        {/* Thumbnail bar */}
        <div
          className="fixed z-[21] left-1/2 -translate-x-1/2 bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-2 md:gap-3 w-[94vw] max-w-[980px] overflow-x-auto"
          style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          role="group"
          aria-label="HB Shaft thumbnails"
        >
          {list.map((ch) => {
            const thumb = getHBShaftDesignImg(hbHBType, ch);
            return (
              <button
                key={`thumb-${ch}`}
                type="button"
                onClick={() => {
                  if (isTouchDevice) {
                    if (S?.hbPreviewShaft !== ch) { update('hbPreviewShaft', ch); return; }
                    update('hbShaftDesign', ch);
                    return;
                  }
                  update('hbShaftDesign', ch);
                }}
                onMouseEnter={!isTouchDevice ? () => update('hbPreviewShaft', ch) : undefined}
                onFocus={!isTouchDevice ? () => update('hbPreviewShaft', ch) : undefined}
                className="w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden bg-white/10 border border-white/20 hover:scale-[1.02] active:scale-95 transition"
                title={`แบบ ${ch}`}
              >
                {thumb
                  ? <img src={thumb} alt={`thumb ${ch}`} className="w-full h-full object-contain" />
                  : <span className="text-white/70">—</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 9: Model Code + Final Summary
  // ─────────────────────────────────────────────────────────────────────────
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && hbSize && hbRatio && hbShaftDesign) {
    const code = generateHBModelCode(S);

    const sizeIndex    = normalizeSize(S?.hbSize);
    const seriesKey    = S?.hbHBType === 'H' ? 'H' : (S?.hbHBType === 'B' ? 'B' : null);
    const stageNum     = Number(S?.hbStage) || null;
    const baseByPole   = { 2: 3000, 4: 1500, 6: 1000, 8: 750 };
    const n1           = baseByPole[Number(S?.hbPole)] ?? null;
    const ratio        = (S?.hbRatio == null || S?.hbRatio === '') ? null : Number(S.hbRatio);
    const kw           = (S?.hbKW    == null || S?.hbKW    === '') ? null : Number(S.hbKW);
    const rpm          = (n1 && ratio) ? n1 / ratio : null;
    const torque       = (kw && rpm) ? (9550 * kw / rpm) * 0.88 : null;

    let PN = null, sf = null;
    if (seriesKey && stageNum && sizeIndex && ratio && S?.hbPole && kw) {
      const ret = calcSFBySeriesStage(seriesKey, stageNum, sizeIndex, ratio, Number(S.hbPole), kw);
      PN = ret?.PN ?? null;
      sf = ret?.SF ?? null;
    }

    const spec           = lookupGearSpecs(seriesKey, stageNum, sizeIndex) || null;
    const ratioVal       = Number(S?.hbRatio ?? ratio);
    const ratioBasedDia  = getInputDiaFromRules(seriesKey, stageNum, sizeIndex, ratioVal);
    const inputShaftDia  = S?.hbInputDia  ?? ratioBasedDia ?? spec?.id  ?? null;
    const outputShaftDia = S?.hbOutputDia ?? spec?.od      ?? null;
    const oilLiters      = S?.hbOil       ?? spec?.oil     ?? null;
    const weightKg       = S?.hbWeight    ?? spec?.weight  ?? null;

    const pnLine =
      (PN && n1 && sizeIndex && seriesKey && stageNum)
        ? `Ref PN จากตารางผู้ผลิต ${seriesKey}${stageNum} @ n1 = ${n1} rpm, Size ${sizeIndex} → PN = ${Number(PN).toLocaleString()} kW`
        : 'ระบบไม่รองรับ Gear size นี้ กรุณาเลือก Gear Size ที่ใกล้เคียง';

    const qty   = Number(S?.hbQty) > 0 ? Number(S.hbQty) : 1;
    const color = S?.hbColor || 'standard';

    const mapH = {
      S:  require('../assets/hb/output/H/H..S.png'),
      H:  require('../assets/hb/output/H/H..H.png'),
      D:  require('../assets/hb/output/H/H..D.png'),
      K:  require('../assets/hb/output/H/H..K.png'),
      F:  require('../assets/hb/output/H/H..F.png'),
    };
    const mapB = {
      S:  require('../assets/hb/output/B/B..S.png'),
      H:  require('../assets/hb/output/B/B..H.png'),
      D:  require('../assets/hb/output/B/B..D.png'),
      DF: require('../assets/hb/output/B/B..DF.png'),
      K:  require('../assets/hb/output/B/B..K.png'),
      F:  require('../assets/hb/output/B/B..F.png'),
    };
    const outputImg = (seriesKey === 'H' ? mapH : mapB)[S?.hbOutput] || null;

    const COLOR_HEX = {
      white: '#f7f7f7', standard: '#9aa8b4', black: '#111827', blue: '#3b82f6', red: '#ef4444',
    };

    return (
      <div className="space-y-5 mt-0">
        <div className="flex justify-between items-center"><BackBtn /></div>

        <div className="grid grid-cols-4 md:grid-cols-4 gap-x-15 gap-y-4 text-white">
          <div className="col-span-4 md:col-span-4 justify-self-center text-center">
            <span className="text-white/60 text-1xl md:text-2xl">Model :</span>{' '}
            <span className="font-semibold text-1xl md:text-2xl">{code}</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Summary */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/15 bg-black/30 backdrop-blur-md shadow-xl p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-white">
                <div><span className="text-white/60">Series :</span> <span className="font-semibold">{S?.hbHBType ?? '—'}</span></div>
                <div><span className="text-white/60">Stage of Gear :</span> <span className="font-semibold">{S?.hbStage ?? '—'}</span></div>
                <div><span className="text-white/60">Output shaft structure :</span> <span className="font-semibold">{S?.hbOutput ?? '—'}</span></div>
                <div><span className="text-white/60">Mounting Position :</span> <span className="font-semibold">{S?.hbMount ?? '—'}</span></div>
                <div><span className="text-white/60">Gear Size :</span> <span className="font-semibold">{S?.hbSize ?? '—'}</span></div>
                <div><span className="text-white/60">Ratio :</span> <span className="font-semibold">{fmt(ratio,2)}</span></div>
                <div><span className="text-white/60">Motor power (kW) :</span> <span className="font-semibold">{fmt(kw,2)}</span></div>
                <div><span className="text-white/60">Pole :</span> <span className="font-semibold">{S?.hbPole ?? '—'}</span></div>
                <div><span className="text-white/60">Output speed (rpm) :</span> <span className="font-semibold">{fmt(rpm,2)}</span></div>
                <div><span className="text-white/60">Output torque (N·m) :</span> <span className="font-semibold">{fmt(torque,2)}</span></div>
                <div><span className="text-white/60">Service Factor (S.F.) :</span> <span className="font-semibold">{fmt(sf,2)}</span></div>
                <div><span className="text-white/60">Shaft Design :</span> <span className="font-semibold">{S?.hbShaftDesign ?? '—'}</span></div>
                <div><span className="text-white/60">Input Shaft Diameter :</span> <span className="font-semibold">Ø {fmt(inputShaftDia,0)} mm</span></div>
                <div><span className="text-white/60">Output Shaft Diameter :</span> <span className="font-semibold">Ø {fmt(outputShaftDia,0)} mm</span></div>
                <div><span className="text-white/60">Oil :</span> <span className="font-semibold">{fmt(oilLiters,2)} Liter</span></div>
                <div><span className="text-white/60">Weight :</span> <span className="font-semibold">{fmt(weightKg,1)} kg</span></div>
              </div>
              <div className="text-xs text-white/50 mt-3">{pnLine}</div>
            </div>
          </div>

          {/* RIGHT: Output image + color picker */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/15 bg-black/30 backdrop-blur-md shadow-xl min-h-[280px] flex flex-col items-center justify-center p-3 overflow-visible">
              {outputImg && (
                <img
                  src={outputImg}
                  alt={`Output structure ${S?.hbOutput || ''}`}
                  className={`max-h-[340px] max-w-[520px] w-full object-contain mx-auto drop-shadow-lg`}
                  style={{ filter: ({ white:'none', standard:'saturate(.9) brightness(1.06)', black:'grayscale(1) brightness(.45) contrast(1.15)', blue:'grayscale(.2) sepia(.35) hue-rotate(190deg) saturate(1.8) brightness(1.05)', red:'grayscale(.2) sepia(.55) hue-rotate(-15deg) saturate(2.2) brightness(1.05)' }[color]) }}
                />
              )}
              <div className="mt-3 flex justify-center gap-3 w-full z-20">
                {[['white','ขาว'],['standard','เทา (Standard)'],['black','ดำ'],['blue','น้ำเงิน'],['red','แดง']].map(([key, label]) => (
                  <button
                    key={key}
                    title={label}
                    onClick={() => update('hbColor', key)}
                    className={`w-11 h-11 rounded-full border-2 border-white/30 hover:scale-105 transition ${color === key ? 'ring-2 ring-white/70' : ''}`}
                    style={{ background: COLOR_HEX[key] }}
                    aria-label={`เลือกสี ${label}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Qty selector */}
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 -mt-24 -translate-y-14">
          <div className="lg:col-span-7 flex justify-center lg:justify-center pb-2 mt-2 md:mt-12 lg:mt-0">
            <div className="flex items-center gap-2 bg-black/30 border border-white/15 rounded-xl px-3 py-1.5 shadow">
              <button onClick={() => update('hbQty', Math.max(1, qty - 1))} className="w-8 h-8 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg" aria-label="ลดจำนวน">–</button>
              <input
                type="number" min={1} value={qty}
                onChange={(e) => update('hbQty', Math.max(1, parseInt(e.target.value || '1', 10)))}
                className="w-16 text-center bg-transparent text-white outline-none"
              />
              <button onClick={() => update('hbQty', qty + 1)} className="w-8 h-8 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg" aria-label="เพิ่มจำนวน">+</button>
            </div>
            <span className="ml-3 self-center text-white/70 text-sm">จำนวน</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mx-auto w-full max-w-6xl mt-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button onClick={() => onDownload && code && onDownload(code, { qty })} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              ดาวน์โหลด 3D .STEP
            </button>
            <button
              onClick={() => {
                if (typeof onDownload2D === 'function') return onDownload2D(code, { qty, color, state: S });
                if (typeof onDownload   === 'function') return onDownload(code, { type: '2D', qty, color, state: S });
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
            >
              ดาวน์โหลด 2D Drawing
            </button>
            <button
              onClick={() => typeof onRequestQuote === 'function' && onRequestQuote({ code, qty, color, state: S })}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              ขอใบเสนอราคา
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ZDYFAMILY: เลือกแล้วแต่ยังไม่มีสเปกถัดไป
  if (hbSeries === 'ZDYFAMILY' && hbZdySelected) {
    return (
      <div className="space-y-4 mt-0">
        <h3 className="text-white font-bold drop-shadow">คุณเลือก: {hbZdySelected}</h3>
        <p className="text-white/80">* รอข้อมูลสเปกเพิ่มเติมเพื่อสร้างขั้นตอนต่อไป</p>
      </div>
    );
  }

  return null;
}
