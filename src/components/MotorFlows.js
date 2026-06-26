// MotorFlows.js
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FinalResult from './FinalResult';
import ACImg from '../assets/ac/ac.png';
import DCImg from '../assets/dc/dc.png';
import BLDCImg from '../assets/bldc/bldc.png';
import ServoImg from '../assets/servo/servo.png';
import PlanetaryImg from '../assets/planetary/planetary.png';
import HypoidImg from '../assets/hypoid/hypoid.png';
import RKFSImg from '../assets/rkfs/rkfs.png';
import CYCLOImg from '../assets/cyclo/cyclo.png';
import SPNImg from '../assets/spn/spn.png';
import HBImg from '../assets/hb/hb.png';
import PPlanetaryImg from '../assets/pplanetary/pplanetary.png';
import SMRImg from '../assets/smr/smr.png';
import SRVImg from '../assets/srv/srv.png';
import SMALLACImg from '../assets/smallac/smallac.png';
import DriverImg from '../assets/driver/driver.png';
import BMKImg from '../assets/bmk/bmk.png';
import IECImg from '../assets/iec/iec.png';
import WPImg from '../assets/wp/wp.png';
import ZSeriesImg from '../assets/Z/ZDYZLYZSYZFY.png';
import MSeriesImg from '../assets/M/M Series.png';
import SMRRSeriesImg from '../assets/smrr/smrr.png';

import SingleImg from '../assets/ac/Voltage/Single.png';
import ThreeImg from '../assets/ac/Voltage/Three.png';

import FanImg from '../assets/ac/Optional/Fan.png';
import TmbImg from '../assets/ac/Optional/Tmb.png';
import EmbImg from '../assets/ac/Optional/Emb.png';
import FcfImg from '../assets/ac/Optional/Fcf.png';
import TmpImg from '../assets/ac/Optional/Tmp.png';
import StdImg from '../assets/ac/Optional/Std.png';


import BLDCGearmotorImg from '../assets/bldc/BLDCGearmotor.png';
import HighefficiencyBLDCGearmotorImg from '../assets/bldc/HighefficiencyBLDCGearmotor.png';

import GNBLDCNolImg from '../assets/bldc/GNBLDCNol.png';
import GNLBLDCNolImg from '../assets/bldc/GNLBLDCNol.png';
import SHIBLDCImg from '../assets/bldc/SHIBLDC.png';
import SFHIBLDCImg from '../assets/bldc/SFHIBLDC.png';
import SLHIBLDCImg from '../assets/bldc/SLHIBLDC.png';

// [ADD-PLANETARY-IMG]
import ZB_ZBR_ZE_ZER_HD_HDRSSeriesImg from '../assets/planetary/ZB-ZBR-ZE-ZER-HD-HDRSSeries.png';
import ZDE_ZDF_ZDWE_ZDWF_ZDSSeriesImg from '../assets/planetary/ZDE-ZDF-ZDWE-ZDWF-ZDSSeries.png';
import ZDR_ZDGF_ZDGSSeriesImg from '../assets/planetary/ZDR-ZDGF-ZDGSSeries.png';
import ZPG_ZDPG_ZRS_AGVSeriesImg from '../assets/planetary/ZPG-ZDPG-ZRS-AGVSeries.png';
import ZTSeriesImg from '../assets/planetary/ZTSeries.png';

import ZRSGIF from '../assets/planetary/Gif/ZRSGIF.gif';
import AGVGIF from '../assets/planetary/Gif/AGVGIF.gif';
import HDGIF from '../assets/planetary/Gif/HDGIF.gif';
import HDRSGIF from '../assets/planetary/Gif/HDRSGIF.gif';
import ZBGIF from '../assets/planetary/Gif/ZBGIF.gif';
import ZBRGIF from '../assets/planetary/Gif/ZBRGIF.gif';
import ZDFGIF from '../assets/planetary/Gif/ZDFGIF.gif';
import ZDEGIF from '../assets/planetary/Gif/ZDEGIF.gif';
import ZDGFGIF from '../assets/planetary/Gif/ZDGFGIF.gif';
import ZDGSGIF from '../assets/planetary/Gif/ZDGSGIF.gif';
import ZDRGIF from '../assets/planetary/Gif/ZDRGIF.gif';
import ZDSGIF from '../assets/planetary/Gif/ZDSGIF.gif';
import ZDWEGIF from '../assets/planetary/Gif/ZDWEGIF.gif';
import ZDWFGIF from '../assets/planetary/Gif/ZDWFGIF.gif';
import ZEGIF from '../assets/planetary/Gif/ZEGIF.gif';
import ZERGIF from '../assets/planetary/Gif/ZERGIF.gif';
import ZDPGGIF from '../assets/planetary/Gif/ZDPGGIF.gif';
import ZPGGIF from '../assets/planetary/Gif/ZPGGIF.gif';
import ZTFHGIF from '../assets/planetary/Gif/ZTFHGIF.gif';
import ZTFL1GIF from '../assets/planetary/Gif/ZTFL1GIF.gif';
import ZTFLGIF from '../assets/planetary/Gif/ZTFLGIF.gif';
import ZTFR1GIF from '../assets/planetary/Gif/ZTFR1GIF.gif';
import ZTHGIF from '../assets/planetary/Gif/ZTHGIF.gif';
import ZTL1GIF from '../assets/planetary/Gif/ZTL1GIF.gif';
import ZTLGIF from '../assets/planetary/Gif/ZTLGIF.gif';
import ZTR1GIF from '../assets/planetary/Gif/ZTR1GIF.gif';


import ZBImg from '../assets/planetary/ZB.png';
import ZBRImg from '../assets/planetary/ZBR.png';
import ZEImg from '../assets/planetary/ZE.png';
import ZERImg from '../assets/planetary/ZER.png';
import HDImg from '../assets/planetary/HD.png';
import HDRSImg from '../assets/planetary/HDRS.png';
import ZDEImg from '../assets/planetary/ZDE.png';
import ZDFImg from '../assets/planetary/ZDF.png';
import ZDWEImg from '../assets/planetary/ZDWE.png';
import ZDWFImg from '../assets/planetary/ZDWF.png';
import ZDSImg from '../assets/planetary/ZDS.png';
import ZDRImg from '../assets/planetary/ZDR.png';
import ZDGFImg from '../assets/planetary/ZDGF.png';
import ZPGImg from '../assets/planetary/ZPG.png';
import ZRSImg from '../assets/planetary/ZRS.png';
import ZDGSImg from '../assets/planetary/ZDGS.png';
import ZDPGImg from '../assets/planetary/ZDPG.png';
import AGVImg from '../assets/planetary/AGV.png';
import ZTImg from '../assets/planetary/ZT.png';

import ZTLImg from '../assets/planetary/ZTL.png'; // ใช้ในปุ่ม L1 (ZT) ถ้าคุณต้องการ
import ZTL1Img from '../assets/planetary/ZTL1.png';
import ZTR1Img from '../assets/planetary/ZTR1.png';
import ZTHImg from '../assets/planetary/ZTH.png';
import ZTFHImg from '../assets/planetary/ZTFH.png';
import ZTFLImg from '../assets/planetary/ZTFL.png';
import ZTFL1Img from '../assets/planetary/ZTFL1.png';
import ZTFR1Img from '../assets/planetary/ZTFR1.png';

import GImg from '../assets/servo/G.png';
import AImg from '../assets/servo/A.png';
import HImg from '../assets/servo/H.png';
import F40Img from '../assets/servo/F40.png';
import F60Img from '../assets/servo/F60.png';
import F80Img from '../assets/servo/F80.png';
import F100Img from '../assets/servo/F100.png';
import F110Img from '../assets/servo/F110.png';
import F130Img from '../assets/servo/F130.png';
import F180Img from '../assets/servo/F180.png';
import SV100Img from '../assets/servo/SV100.png';
import SV200Img from '../assets/servo/SV200.png';
import SV400Img from '../assets/servo/SV400.png';
import SV750Img from '../assets/servo/SV750.png';
import SV1000Img from '../assets/servo/SV1000.png';
import SV1200Img from '../assets/servo/SV1200.png';
import SV1500Img from '../assets/servo/SV1500.png';
import SV1800Img from '../assets/servo/SV1800.png';
import SV2000Img from '../assets/servo/SV2000.png';
import SV3000Img from '../assets/servo/SV3000.png';
import SV7500Img from '../assets/servo/SV7500.png';
import OCImg from '../assets/servo/OC.png';
import OSImg from '../assets/servo/OS.png';
import OCEImg from '../assets/servo/OCE.png';

import Gif100Img from '../assets/servo/Gif100.gif';
import Gif100CEImg from '../assets/servo/Gif100CE.gif';
import Gif200Img from '../assets/servo/Gif200.gif';
import Gif200CEImg from '../assets/servo/Gif200CE.gif';
import Gif750Img from '../assets/servo/Gif750.gif';
import Gif750CEImg from '../assets/servo/Gif750CE.gif';
import Gif1300Img from '../assets/servo/Gif1300.gif';
import Gif1300CEImg from '../assets/servo/Gif1300CE.gif';
import Gif7500Img from '../assets/servo/Gif7500.gif';
import Gif7500CEImg from '../assets/servo/Gif7500CE.gif';

// [ADD] HB images

// === SRV Worm Gear assets ===
import SRVVImg   from '../assets/srv/SRVV.png';
import SDRVImg   from '../assets/srv/SDRV.png';
import SVFImg    from '../assets/srv/SVF.png';

import SRVWMImg  from '../assets/srv/SRVWM.png';
import SRVIECImg from '../assets/srv/SRVIEC.png';
import SRVWSImg  from '../assets/srv/SRVWS.png';
import SRVIImg   from '../assets/srv/SRVI.png';

import InflangeImg from '../assets/srv/Inflange.png';
import InshaftImg  from '../assets/srv/Inshaft.png';

import DSImg   from '../assets/srv/DS.png';
import DS1Img  from '../assets/srv/DS1.png';
import DS2Img  from '../assets/srv/DS2.png';

import SRVHollowImg from '../assets/srv/SRVHollow.png';
import SRVFAImg from '../assets/srv/SRVFA.png';
import SRVFAAImg from '../assets/srv/SRVFAA.png';
import SRVFABImg from '../assets/srv/SRVFAB.png';
import SRVFBImg from '../assets/srv/SRVFB.png';
import SRVFBAImg from '../assets/srv/SRVFBA.png';
import SRVFBBImg from '../assets/srv/SRVFBB.png';

import SRVTImg from '../assets/srv/SRVT.png';
import SRVTAImg from '../assets/srv/SRVTA.png';
import SRVTBImg from '../assets/srv/SRVTB.png';

import SRVMTImg   from '../assets/srv/SRVMT.png';
import SDRVMTImg  from '../assets/srv/SDRVMT.png'; // ถ้าคุณมีไฟล์ SDRVMT.png จริง ให้เปลี่ยน path ตรงนี้ทีหลัง
import SVFMTImg   from '../assets/srv/SVFMT.png';

import B5Img    from '../assets/srv/B5.png';
import B14TImg  from '../assets/srv/B14.png';
import emailjs from '@emailjs/browser';


// ─────────────────────────────────────────────────────────────────────────────
// ThumbCard — card component ที่ใช้ใน BLDC/Hypoid flow (รูป + label + active state)
// รองรับ framer-motion animate/transition props
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
// ChoiceCard — card ขนาดกะทัดรัดสำหรับ BLDC GearType / HEType selection
// ─────────────────────────────────────────────────────────────────────────────
function ChoiceCard({ img, label, active, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={[
        'relative flex flex-col items-center rounded-xl overflow-hidden shadow cursor-pointer border-2 bg-white/90 transition-all',
        active
          ? 'border-blue-500 shadow-blue-400/40 ring-2 ring-blue-400'
          : 'border-transparent hover:border-blue-300',
      ].join(' ')}
      style={{ minWidth: 90 }}
    >
      {img && (
        <img
          src={img}
          alt={label}
          className="w-full object-contain"
          style={{ maxHeight: 160, background: '#fff', padding: 6 }}
        />
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

/** แปลง/ดึง size เป็นตัวเลขจากรูปแบบที่อาจเป็น string (เช่น "H14") */
function normalizeSize(size) {
  if (typeof size === 'number' && Number.isFinite(size)) return size;
  if (size == null) return null;
  const m = String(size).match(/(\d{1,3})$/);
  return m ? Number(m[1]) : null;
}

/** ใช้ lookup สเปกจาก Series/Stage/Size
 *  @returns { od?: number, oil?: number, weight?: number } | null
 */
function lookupGearSpecs(series, stage, size) {
  if (!series || !stage || !size) return null;
  const S = String(series).toUpperCase();
  const st = Number(stage);
  const sz = Number(size);
  const rec = GEAR_SPECS?.[S]?.[st]?.[sz];
  return rec ? { ...rec } : null;
}



export const productList = [
  { name: 'AC Gear Motor', image: ACImg },
  { name: 'DC Gear Motor', image: DCImg },
  { name: 'BLDC Gear Motor', image: BLDCImg },
  { name: 'Servo Motor', image: ServoImg },
  { name: 'Planetary Gear', image: PlanetaryImg },
  { name: 'Hypoid Gear', image: HypoidImg },
  { name: 'RKFS Series', image: RKFSImg },
  { name: 'Cycloidal Series', image: CYCLOImg },
  { name: 'SPN Series', image: SPNImg },
  { name: 'HB Gearbox Series', image: HBImg },
  { name: 'P Planetary Gearbox', image: PPlanetaryImg },
  { name: 'SRV Worm Gear', image: SRVImg },
  { name: 'SMR Series', image: SMRImg },
  { name: 'Small AC Series', image: SMALLACImg },
  { name: 'IEC STANDARD MOTOR', image: IECImg },
  { name: 'BMK SERIES', image: BMKImg },
  { name: 'WP WORMGEAR REDUCER', image: WPImg },
  { name: 'Servo Driver and Speed Controller', image: DriverImg },
  { name: 'Z Series', image: ZSeriesImg },
  { name: 'M Series', image: MSeriesImg },
  { name: 'SMRR Series', image: SMRRSeriesImg },
];


export { generateBLDCModelCode, renderBLDCGearFlow } from './BLDCGearMotorFlow.js';



export { generateHypoidModelCode, renderHypoidGearFlow } from './HypoidGearFlow.js';

export { generateHBModelCode, renderHBGearFlow, calcSFBySeriesStage, getPNBySeriesStage,
         H1_PN1500_BY_SIZE, H1_PN750_BY_SIZE, H3_PN1500_BY_SIZE, H3_PN1000_BY_SIZE, H3_PN750_BY_SIZE } from './HBGearboxFlow.js';

export { generateZModelCode, renderZSeriesFlow } from './ZSeriesFlow.js';


// [ADD-BLDC] BLDC Gear Motor Flow (updated with High-efficiency)
// ==============================

// =============== Planetary Gear (NEW) ===============

export function generatePlanetaryModelCode(state) {  
  const { series, size, ratio, backlash, inputType, shaftDir } = state;
  if (!series || !size) return '';

  

  // ZT: (Series + Size + ShaftDir + Ratio + Backlash + Input)
  if (series === 'ZT') {
    if (!shaftDir || ratio == null || !backlash || !inputType) return '';
    return `${series}${size}-${shaftDir}-${ratio}-${backlash}-${inputType}`;
  }

  // Others: (Series + Size + Ratio + Backlash + Input)
  if (ratio == null || !backlash || !inputType) return '';
  return `${series}${size}-${ratio}-${backlash}-${inputType}`;
}

export function renderPlanetaryGearFlow(planetState, planetSetters, onConfirm) {
  const {
    group,     // 1..5 (Step1)
    series,    // ex. 'ZB','ZBR','ZE','ZER','HD','HDRS','ZDE','ZDF','ZDWE','ZDWF','ZDS','ZDR','ZDGF','ZDGS','ZPG','ZDPG','ZRS','AGV','ZT' (Step2)
    size,      // ex. '060','115','20','75','095' ... (Step3)
    shaftDir,  // ZT only: 'L','L1','R1','H','FH','FL','FL1','FR1' (Step3.1)
    ratio,     // number/string per mapping (Step4)
    backlash,  // 'P1' | 'P2' (Step5)
    inputType  // 'S1' | 'S2' (Step6)
  } = planetState;

  // [ADD] หน่วงเวลาให้แสงกวาดจบก่อนเปลี่ยนสเตป (เฉพาะ Planetary)
const sweepAnd = (e, doNext, delay = 1100) => {
  if (typeof doNext !== 'function') return;
  const btn = e && e.currentTarget;
  if (btn && btn.classList) {
    btn.classList.add('play-sweep');     // เริ่มกวาดจากซ้าย -> ขวา
    setTimeout(() => {
      btn.classList.remove('play-sweep'); // จบกวาด
      doNext();                           // แล้วค่อยไปสเตปถัดไป
    }, delay);
  } else {
    doNext();
  }
};

  const update = (key, value) => {
    const setter = planetSetters?.[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (setter) setter(value);
  };

  // ====== Step1: 5 ปุ่มภาพ (กลุ่ม Series) ======
  const GROUPS = [
    { id: 1, label: 'ZB/ZBR/ZE/ZER/HD/HDRS Series', img: ZB_ZBR_ZE_ZER_HD_HDRSSeriesImg },
    { id: 2, label: 'ZDE/ZDF/ZDWE/ZDWF/ZDS Series', img: ZDE_ZDF_ZDWE_ZDWF_ZDSSeriesImg },
    { id: 3, label: 'ZDR/ZDGF/ZDGS Series', img: ZDR_ZDGF_ZDGSSeriesImg },
    { id: 4, label: 'ZPG/ZDPG/ZRS/AGV Series', img: ZPG_ZDPG_ZRS_AGVSeriesImg },
    { id: 5, label: 'ZT Series', img: ZTSeriesImg },
  ];

  // ====== Step2: Series ตามกลุ่ม ======
  const SERIES_BY_GROUP = {
    1: ['ZB', 'ZBR', 'ZE', 'ZER', 'HD', 'HDRS'],
    2: ['ZDE', 'ZDF', 'ZDWE', 'ZDWF', 'ZDS'],
    3: ['ZDR', 'ZDGF', 'ZDGS'],
    4: ['ZPG', 'ZDPG', 'ZRS', 'AGV'],
    5: ['ZT'],
  };

  // ====== Step3: Gear head FLAME size ต่อ Series ======
  const SIZES_BY_SERIES = {
    // group 1
    ZB:   ['042','060','090','115','142','180','220'],
    ZBR:  ['060','090','115','142','180','220'],
    ZE:   ['050','070','090','120','155','205','235'],
    ZER:  ['070','090','120','155'],
    HD:   ['064','090','110','140','200'],
    HDRS:  ['064','090','110','140','200'],
    // group 2
    ZDE:  ['40','60','80','120','160'],
    ZDF:  ['40','60','80','120','160'],
    ZDWE: ['60','80','120','160'],
    ZDWF: ['60','80','120','160'],
    ZDS:  ['115','142','190'],
    // group 3
    ZDR:  ['52','78','98','125'],
    ZDGF: ['60','90','120','170'],
    ZDGS: ['60','90','120','170'],
    // group 4
    ZPG:  ['20','32','50'],
    ZDPG: ['20','32','50'],
    ZRS:  ['60','75','100','140'],
    AGV:  ['95','115','090'],
    // group 5
    ZT:   ['075','090','110','140'],
  };

  // ====== Step4: Ratio ต่อ Series (AGV พิเศษแยกตาม size) ======
  const RATIOS_BY_SERIES = {
    ZB:   [3,4,5,6,7,8,10,15,16,20,25,30,35,40,45,50,60,70,80,90,100],
    ZBR:  [3,4,5,6,7,8,9,10,14,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200],
    ZE:   [3,4,5,6,7,8,9,10,15,20,25,30,35,40,45,50,60,70,80,90,100],
    ZER:  [3,4,5,6,7,8,9,10,14,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180,200],
    HD:   [4,5,7,10,20,25,30,35,50,70,100],
    HDRS:  [4,5,7,10,20,25,30,35,50,70,100,140,200],
    ZDE:  [3,4,5,8,9,10,12,15,16,20,25,32,40,60,64,80,100,120,160,200,256,320,512],
    ZDF:  [3,4,5,8,9,10,12,15,16,20,25,32,40,60,64,80,100,120,160,200,256,320,512],
    ZDWE: [3,4,5,8,9,10,12,15,16,20,25,32,40,60,64,80,100,120,160,200,256,320,512],
    ZDWF: [3,4,5,8,9,10,12,15,16,20,25,32,40,60,64,80,100,120,160,200,256,320,512],
    ZDS:  [3,4,5,8,10,12,15,16,20,25,32,40,64,100],
    ZDR:  [3,4,5,6,7,8,9,10,15,20,25,35,45,81],
    ZDGF: [3,4,5,7,9,10,11,15,20,21,25,33,35,40,45,50,70,81,100],
    ZDGS: [3,4,5,7,9,10,11,15,20,21,25,33,35,40,45,50,70,81,100],
    ZPG:  [5,11,15,21,33,45],
    ZDPG: [5,11,15,21,33,45],
    ZRS:  [3,4,5,6,7,8,9,10,15,20,25,30,45,50,60,70,80,90,100],
    // AGV: ขึ้นกับ size
    AGV:  {
      '95':  [5,6,7,8,9],
      '115': [15,18,20,21,30],
      '090': [80],
    },
    // ZT:
    ZT:   [1,1.5,2,3,4,5,7,10,15,20,25,35,50],
  };

  const BACKLASH = ['P1', 'P2'];     // Step5
  const INPUTS   = ['S1', 'S2'];     // Step6
  const ZT_DIRS  = ['L','L1','R1','H','FH','FL','FL1','FR1']; // Step3.1

  // 🔙 ถอยทีละสเตป (ปุ่ม Back เล็ก ลอยมุมซ้ายล่าง)
  const backOneStep = () => {
    if (inputType) return update('inputType', null);
    if (backlash)  return update('backlash', null);
    if (ratio != null) return update('ratio', null);
    if (series === 'ZT' && shaftDir) return update('shaftDir', null);
    if (size)      return update('size', null);
    if (series)    return update('series', null);
    if (group)     return update('group', null);
  };

  // สร้างโค้ด (ใช้รูปแบบที่คุณกำหนด)
  const code = generatePlanetaryModelCode({ series, size, ratio, backlash, inputType, shaftDir });

  // ====== UI ======
  return (
    <div className="space-y-6">
      {/* Step 1: กลุ่ม Series (5 ปุ่มภาพ) */}
{!group && (
  <div>
    <h3 className="font-semibold text-white drop-shadow mb-3">Planetary Gear — Series Group</h3>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {GROUPS.map(g => (
        <button
          key={g.id}
          onClick={(e) => sweepAnd(e, () => update('group', g.id))}
          className="btn-sweep"
        >
          {g.img ? (
            // ⬇️ เปลี่ยน h-40 -> h-56 md:h-64 (ภาพใหญ่ขึ้นพอดี)
            <img src={g.img} alt={g.label} className="h-65 md:h-70 object-contain mx-auto card-image " />
          ) : null}
          <span className="btn-3d-label hover:bg-yellow-100 ">{g.label}</span>
          <div className="btn-3d-sweep" />
        </button>
      ))}
    </div>
    {/* Step แรกไม่แสดง Back */}
  </div>
)}

      {/* Step 2: เลือก Series ภายในกลุ่ม */}
      {group && !series && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-3">Select Series</h3>
          <div className="flex flex-wrap gap-3">
            {SERIES_BY_GROUP[group]?.map(s => (
              <button
                key={s}
                onClick={(e) => sweepAnd(e, () => update('series', s))}
                className="btn-sweep" style={{ width: 'auto', display: 'inline-flex' }}
                title={s}
              >
                {s === 'ZB'  && <img src={ZBImg}  alt="ZB"  className="h-48 md:h-56 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZBR' && <img src={ZBRImg} alt="ZBR" className="h-48 md:h-56 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZE'  && <img src={ZEImg}  alt="ZE"  className="h-48 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZER' && <img src={ZERImg} alt="ZER" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'HD'  && <img src={HDImg}  alt="HD"  className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'HDRS'&& <img src={HDRSImg}alt="HDRS"className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDE' && <img src={ZDEImg} alt="ZDE" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDF' && <img src={ZDFImg} alt="ZDF" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDWE'&& <img src={ZDWEImg}alt="ZDWE"className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDWF'&& <img src={ZDWFImg}alt="ZDWF"className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDS' && <img src={ZDSImg} alt="ZDS" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDR' && <img src={ZDRImg} alt="ZDR" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDGF'&& <img src={ZDGFImg}alt="ZDGF"className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDGS'&& <img src={ZDGSImg}alt="ZDGS"className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZPG' && <img src={ZPGImg} alt="ZPG" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZDPG'&& <img src={ZDPGImg}alt="ZDPG"className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZRS' && <img src={ZRSImg} alt="ZRS" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'AGV' && <img src={AGVImg} alt="AGV" className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
          {s === 'ZT'  && <img src={ZTImg}  alt="ZT"  className="h-40 md:h-48 object-contain mx-auto mb-1 card-image" />}
                <span className="btn-3d-label">{s}</span>
                <div className="btn-3d-sweep" />
              </button>
            ))}
          </div>

          {/* Back ลอยมุมซ้ายล่าง */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step 3: เลือก FLAME size */}
      {group && series && !size && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-3">Gear head flame size</h3>
          <div className="flex flex-wrap gap-2">
            {(SIZES_BY_SERIES[series] || []).map(sz => (
              <button
                key={sz}
                onClick={(e) => sweepAnd(e, () => update('size', sz))}
                className="btn-sweep" style={{ width: 'auto', display: 'inline-flex' }}
              >
                <span className="btn-3d-label">{sz}</span>
                <div className="btn-3d-sweep" />
              </button>
            ))}
          </div>

          {/* Back ลอยมุมซ้ายล่าง */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step 3.1: ZT เท่านั้น → Shaft Direction */}
      {group && series === 'ZT' && size && !shaftDir && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-3">Shaft Direction (ZT only)</h3>
          <div className="flex flex-wrap gap-2">
            {ZT_DIRS.map(d => (
              <button
                key={d}
                onClick={(e) => sweepAnd(e, () => update('shaftDir', d))}
                className="btn-sweep" style={{ width: 'auto', display: 'inline-flex' }}
                title={d}
              >
                {/* ตัวอย่าง: แทรกรูปเฉพาะ L1 ถ้าคุณต้องการ */}
                {d === 'L' && <img src={ZTLImg} alt="L" className="h-64 object-contain mx-auto mb-1 card-image" />}
                {d === 'L1' && <img src={ZTL1Img} alt="L1" className="h-64 object-contain mx-auto mb-1 card-image" />}
                {d === 'R1' && <img src={ZTR1Img} alt="R1" className="h-64 object-contain mx-auto mb-1 card-image" />}
                {d === 'H' && <img src={ZTHImg} alt="H" className="h-64 object-contain mx-auto mb-1 card-image" />}
                {d === 'FH' && <img src={ZTFHImg} alt="FH" className="h-64 object-contain mx-auto mb-1 card-image" />}
                {d === 'FL' && <img src={ZTFLImg} alt="FL" className="h-64 object-contain mx-auto mb-1 card-image" />}
                {d === 'FL1' && <img src={ZTFL1Img} alt="FL1" className="h-64 object-contain mx-auto mb-1 card-image" />}
                {d === 'FR1' && <img src={ZTFR1Img} alt="FR1" className="h-64 object-contain mx-auto mb-1 card-image" />}
                <span className="btn-3d-label hover:bg-yellow-300" >{d}</span>
                <div className="btn-3d-sweep" />
              </button>
            ))}
          </div>

          {/* Back ลอยมุมซ้ายล่าง */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step 4: Ratio */}
      {group && series && size && (series !== 'ZT' || shaftDir) && ratio == null && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-3">Ratio</h3>
          <div className="flex flex-wrap gap-2">
            {(
              series === 'AGV'
                ? (RATIOS_BY_SERIES.AGV[size] || [])
                : (RATIOS_BY_SERIES[series] || [])
            ).map(r => (
              <button
                key={String(r)}
                onClick={(e) => sweepAnd(e, () => update('ratio', r))}
                className="btn-sweep" style={{ width: 'auto', display: 'inline-flex' }}
              >
                <span className="btn-3d-label">{r}</span>
                <div className="btn-3d-sweep" />
              </button>
            ))}
          </div>

          {/* Back ลอยมุมซ้ายล่าง */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step 5: Backlash */}
      {group && series && size && (series !== 'ZT' || shaftDir) && ratio != null && !backlash && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-3">Backlash</h3>
          <div className="flex flex-wrap gap-2">
            {BACKLASH.map(b => (
              <button
                key={b}
                onClick={(e) => sweepAnd(e, () => update('backlash', b))}
                className="btn-sweep" style={{ width: 'auto', display: 'inline-flex' }}
              >
                <span className="btn-3d-label">{b} {b === 'P1' ? '(Low)' : '(Standard)'}</span>
                <div className="btn-3d-sweep" />
              </button>
            ))}
          </div>

          {/* Back ลอยมุมซ้ายล่าง */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step 6: Input shaft type */}
      {group && series && size && (series !== 'ZT' || shaftDir) && ratio != null && backlash && !inputType && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-3">Input shaft type</h3>
          <div className="flex flex-wrap gap-2">
            {INPUTS.map(i => (
              <button
                key={i}
                onClick={(e) => sweepAnd(e, () => update('inputType', i))}
                className="btn-sweep" style={{ width: 'auto', display: 'inline-flex' }}
              >
                <span className="btn-3d-label">{i}</span>
                <div className="btn-3d-sweep" />
              </button>
            ))}
          </div>

          {/* Back ลอยมุมซ้ายล่าง */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Final: แสดง Model Code + ปุ่มยืนยัน */}
      {group && series && size && (series !== 'ZT' || shaftDir) && ratio != null && backlash && inputType && (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-white drop-shadow">Model Code</h3>
          <div className="font-mono text-lg text-white/90">{code}</div>
                    {/* iPad frame + GIF (Planetary) */}
    {(() => {
      // เลือก GIF ตาม Series; กรณี ZT ต้องมี shaftDir
      let gif = null;
      if (series === 'ZT') {
        if (!shaftDir) return null;
        if (shaftDir === 'L')   gif = ZTLGIF;
        else if (shaftDir === 'L1')  gif = ZTL1GIF;
        else if (shaftDir === 'R1')  gif = ZTR1GIF;
        else if (shaftDir === 'H')   gif = ZTHGIF;
        else if (shaftDir === 'FH')  gif = ZTFHGIF;
        else if (shaftDir === 'FL')  gif = ZTFLGIF;
        else if (shaftDir === 'FL1') gif = ZTFL1GIF;
        else if (shaftDir === 'FR1') gif = ZTFR1GIF;
      } else {
        const map = {
          ZB: ZBGIF, ZBR: ZBRGIF, ZE: ZEGIF, ZER: ZERGIF,
          HD: HDGIF, HDRS: HDRSGIF,
          ZDE: ZDEGIF, ZDF: ZDFGIF, ZDWE: ZDWEGIF, ZDWF: ZDWFGIF,
          ZDS: ZDSGIF, ZDR: ZDRGIF, ZDGF: ZDGFGIF, ZDGS: ZDGSGIF,
          ZPG: ZPGGIF, ZDPG: ZDPGGIF, ZRS: ZRSGIF, AGV: AGVGIF,
        };
        gif = map[series] || null;
      }
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
              <img src={gif} alt="Planetary preview" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      );
    })()}
          <button onClick={(e) => sweepAnd(e, () => onConfirm(code))} className="btn-sweep px-2 py-1 mx-auto"style={{ width: 'auto', display: 'inline-flex' }}>
            <span className="btn-3d-label text-sm leading-none hover:bg-yellow-100">ยืนยันและไปหน้า Download 3D</span>
            <div className="btn-3d-sweep" />
          </button>

          {/* Back ลอยมุมซ้ายล่าง */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}
    </div>
  );
}

// ===== Servo: สร้าง Model Code =====
export function generateServoModelCode(sv) {
  const {
    svInertia, svFlange, svVoltage, svPowerCode,
    svSpeed, svOption, svEncoder, svOutput
  } = sv || {};

  if (!svInertia || !svFlange || !svVoltage || !svPowerCode || !svSpeed || !svOption || !svEncoder || !svOutput) {
    return null;
  }
  // รูปแบบ: SM(Inertia)(Flange)-(Voltage)(Power)-(Speed)-(Option)-(Encoder)(Output)
  // เช่น SMH40-A02-B20-CE-22
  return `SM${svInertia}${svFlange}-${svVoltage}${svPowerCode}-${svSpeed}-${svOption}-${svEncoder}${svOutput}`;
}

// ===== Servo: เรนเดอร์ Flow ตาม Step ที่กำหนด =====
export function renderServoFlow(state, setState, onConfirm) {
  const {
    svInertia, svFlange, svVoltage, svPowerCode,
    svSpeed, svOption, svEncoder, svOutput
  } = state;
// คลิกแล้วไล่เฉดสีน้ำเงิน จากซ้ายไปขวา แล้วค่อย “ทำงาน”
  const sweepAnd = (e, action) => {
    const el = e.currentTarget;
    if (!el) { action && action(); return; }
    if (el.querySelector('.sweep-fill')) return; // กันคลิกซ้ำระหว่างวิ่ง
    el.classList.add('sweep-container');
    const span = document.createElement('span');
    span.className = 'sweep-fill';
    el.appendChild(span);
    el.style.pointerEvents = 'none';
    span.addEventListener('animationend', () => {
      try { action && action(); }
      finally {
        el.style.pointerEvents = '';
        if (span.parentNode) span.parentNode.removeChild(span);
        el.classList.remove('sweep-container');
      }
    }, { once: true });
  };

  // เลือก GIF สำหรับแสดงใน iPad ใต้ Model code (Step9)
// mapping ตาม Rate Power ที่คุณกำหนด + ถ้า Options=CE ให้ใช้ไฟล์ ...CE.gif
const servoGifForSelection = () => {
  if (!svPowerCode) return null;
  const isCE = svOption === 'CE';

  // กลุ่มกำลังที่ผูกกับ code:
  // 01 -> 100W
  // 02 -> 200W / 400W
  // 08,10 -> 750W / 1kW
  // 12,15,18,20,30 -> 1.2/1.5/1.8/2/3kW
  // 80 -> 7.5kW
  const code = svPowerCode;

  if (code === '01') {
    return isCE ? Gif100CEImg : Gif100Img;
  }
  if (code === '02') {
    return isCE ? Gif200CEImg : Gif200Img; // ครอบคลุม 200/400W
  }
  if (code === '08' || code === '10') {
    return isCE ? Gif750CEImg : Gif750Img; // 750W / 1kW
  }
  if (code === '12' || code === '15' || code === '18' || code === '20' || code === '30') {
    return isCE ? Gif1300CEImg : Gif1300Img; // 1.2/1.5/1.8/2/3kW
  }
  if (code === '80') {
    return isCE ? Gif7500CEImg : Gif7500Img; // 7.5kW
  }
  return null;
};

  const update = (key, value) => {
    const setter = setState?.[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (setter) setter(value);
  };

  // Step4: mapping ปุ่มกำลังตาม Flange (ใช้ code ตามที่คุณให้มา)
  const powerByFlange = {
    '40' : [{ code: '01', label: '100W',  img: SV100Img }],
    '60' : [
      { code: '02', label: '200W', img: SV200Img },
      { code: '02', label: '400W', img: SV400Img } // ตามที่คุณระบุว่าใช้ 02 ทั้งคู่
    ],
    '80' : [
      { code: '08', label: '750W', img: SV750Img },
      { code: '10', label: '1kW',  img: SV1000Img }
    ],
    '100': [
      { code: '10', label: '1kW',  img: SV1000Img },
      { code: '15', label: '1.5kW',img: SV1500Img }
    ],
    '110': [
      { code: '12', label: '1.2kW',img: SV1200Img },
      { code: '15', label: '1.5kW',img: SV1500Img },
      { code: '18', label: '1.8kW',img: SV1800Img }
    ],
    '130': [
      { code: '10', label: '1kW',  img: SV1000Img },
      { code: '15', label: '1.5kW',img: SV1500Img },
      { code: '18', label: '1.8kW',img: SV1800Img },
      { code: '20', label: '2kW',  img: SV2000Img },
      { code: '30', label: '3kW',  img: SV3000Img }
    ],
    '180': [{ code: '80', label: '7.5kW', img: SV7500Img }]
  };

  const code = generateServoModelCode(state);

  // ปุ่มย้อนกลับ: เคลียร์ค่าตัวล่าสุดทีละสtep
  const backOneStep = () => {
    if (svOutput)      return update('svOutput', null);
    if (svEncoder)     return update('svEncoder', null);
    if (svOption)      return update('svOption', null);
    if (svSpeed)       return update('svSpeed', null);
    if (svPowerCode)   return update('svPowerCode', null);
    if (svVoltage)     return update('svVoltage', null);
    if (svFlange)      return update('svFlange', null);
    if (svInertia)     return update('svInertia', null);
  };

  // ปุ่ม UI 3D (ถ้าคุณมี ThumbCard อยู่แล้ว ใช้ component เดิมเพื่อให้หน้าตาเหมือน flow อื่น)
  const ImgBtn = ({ img, label, active, onClick, className, imageHeight = 'h-40' }) => (
    <div
      onClick={(e) => sweepAnd(e, onClick)}
      className={`cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-0.5 
                  ring-1 ring-white/10 bg-white/90 overflow-hidden relative
                  ${active ? 'outline outline-4 outline-yellow-300' : ''} ${className || ''}`}
      title={label}
    >
      <img src={img} alt={label} className={`w-full ${imageHeight} object-contain bg-white`} />
      <div className="text-center text-sm font-semibold p-2">{label}</div>
    </div>
  );

  const PillBtn = ({ value, label, active, onClick }) => (
    <button
      onClick={(e) => sweepAnd(e, onClick)}
      className={`px-4 py-2 rounded-full shadow-md transition relative overflow-hidden
                  ${active ? 'bg-yellow-300 text-black' : 'bg-white/90 hover:bg-white'} `}
    >
      <span className="font-semibold">{label || value}</span>
    </button>
  );

  return (
    <>
      {/* Step1: Inertia (A/H/G) */}
      {!svInertia && (
        <div className="space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 1 — Inertia</h3>
          <div className="grid grid-cols-3 gap-4">
            <ImgBtn img={AImg} label="A" active={svInertia==='A'} onClick={() => update('svInertia','A')} imageHeight="h-56 md:h-72" />
                   <ImgBtn img={HImg} label="H" active={svInertia==='H'} onClick={() => update('svInertia','H')} imageHeight="h-56 md:h-72" />
                   <ImgBtn img={GImg} label="G" active={svInertia==='G'} onClick={() => update('svInertia','G')} imageHeight="h-56 md:h-72" />
          </div>
        </div>
      )}

      {/* Step2: Flange Size (แสดงเมื่อเลือก Inertia แล้ว) */}
      {svInertia && !svFlange && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 2 — Flange Size</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            <ImgBtn img={F40Img}  label="40"  active={svFlange==='40'}  onClick={() => update('svFlange','40')}imageHeight="h-56 md:h-72" />
            <ImgBtn img={F60Img}  label="60"  active={svFlange==='60'}  onClick={() => update('svFlange','60')}imageHeight="h-56 md:h-72" />
            <ImgBtn img={F80Img}  label="80"  active={svFlange==='80'}  onClick={() => update('svFlange','80')}imageHeight="h-56 md:h-72" />
            <ImgBtn img={F100Img} label="100" active={svFlange==='100'} onClick={() => update('svFlange','100')}imageHeight="h-56 md:h-72" />
            <ImgBtn img={F110Img} label="110" active={svFlange==='110'} onClick={() => update('svFlange','110')}imageHeight="h-56 md:h-72" />
            <ImgBtn img={F130Img} label="130" active={svFlange==='130'} onClick={() => update('svFlange','130')}imageHeight="h-56 md:h-72" />
            <ImgBtn img={F180Img} label="180" active={svFlange==='180'} onClick={() => update('svFlange','180')}imageHeight="h-56 md:h-72" />
          </div>
                    <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step3: Rate Voltage */}
      {svFlange && !svVoltage && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 3 — Rate Voltage</h3>
          <div className="flex flex-wrap gap-3">
            <PillBtn value="A" label="A : AC220" active={svVoltage==='A'} onClick={() => update('svVoltage','A')} />
            <PillBtn value="B" label="B : AC380" active={svVoltage==='B'} onClick={() => update('svVoltage','B')} />
          </div>
                   <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step4: Rate Power (ขึ้นกับ Flange) */}
      {svVoltage && !svPowerCode && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 4 — Rate Power</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(powerByFlange[svFlange] || []).map(({code, label, img}) => (
              <ImgBtn
                key={code + label}
                img={img}
                label={`${code} : ${label}`}
                active={svPowerCode === code}
                onClick={() => update('svPowerCode', code)}
                                imageHeight="h-56 md:h-72"
              />
            ))}
          </div>
                    <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step5: Rate Speed */}
      {svPowerCode && !svSpeed && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 5 — Rate Speed</h3>
          <div className="flex flex-wrap gap-3">
            <PillBtn value="B10" label="B10 : 1000 rpm"  active={svSpeed==='B10'} onClick={() => update('svSpeed','B10')} />
            <PillBtn value="B15" label="B15 : 1500 rpm"  active={svSpeed==='B15'} onClick={() => update('svSpeed','B15')} />
            <PillBtn value="B20" label="B20 : 2000 rpm"  active={svSpeed==='B20'} onClick={() => update('svSpeed','B20')} />
            <PillBtn value="B30" label="B30 : 3000 rpm"  active={svSpeed==='B30'} onClick={() => update('svSpeed','B30')} />
          </div>
                    <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step6: Options (C / S / CE) */}
      {svSpeed && !svOption && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 6 — Options</h3>
          <div className="grid grid-cols-3 gap-4">
            <ImgBtn img={OCImg}  label="C : Without brake"     active={svOption==='C'}  onClick={() => update('svOption','C')} imageHeight="h-56 md:h-72" />
            <ImgBtn img={OSImg}  label="S : With oil seal"      active={svOption==='S'}  onClick={() => update('svOption','S')}imageHeight="h-56 md:h-72" />
            <ImgBtn img={OCEImg} label="CE : With brake"        active={svOption==='CE'} onClick={() => update('svOption','CE')}imageHeight="h-56 md:h-72" />
          </div>
                     <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step7: Encoder */}
      {svOption && !svEncoder && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 7 — Encoder</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <PillBtn value="1" label="1 : 17-bit inc., magnetic"   active={svEncoder==='1'} onClick={() => update('svEncoder','1')} />
            <PillBtn value="2" label="2 : 17-bit abs., magnetic"   active={svEncoder==='2'} onClick={() => update('svEncoder','2')} />
            <PillBtn value="3" label="3 : 23-bit optical"          active={svEncoder==='3'} onClick={() => update('svEncoder','3')} />
            <PillBtn value="4" label="4 : 23-bit MT optical"       active={svEncoder==='4'} onClick={() => update('svEncoder','4')} />
          </div>
                    <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step8: Output Shaft */}
      {svEncoder && !svOutput && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-white drop-shadow">Step 8 — Output Shaft</h3>
          <div className="flex flex-wrap gap-3">
            <PillBtn value="0" label="0 : Flange output"                        active={svOutput==='0'} onClick={() => update('svOutput','0')} />
            <PillBtn value="2" label="2 : Straight shaft, keyway, no thread"    active={svOutput==='2'} onClick={() => update('svOutput','2')} />
            <PillBtn value="6" label="6 : Straight shaft, keyway, threaded"     active={svOutput==='6'} onClick={() => update('svOutput','6')} />
          </div>
                   <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {/* Step9: Model Code + ปุ่มยืนยัน */}
      {svInertia && svFlange && svVoltage && svPowerCode && svSpeed && svOption && svEncoder && svOutput && (
        <div className="text-center space-y-4 mt-8">
          <h3 className="text-xl font-bold text-white drop-shadow">Model Code</h3>
          <div className="font-mono text-lg text-white/90">{code}</div>
          {/* iPad frame + GIF (Servo) ใต้ Model code */}
     {(() => {
       const gif = servoGifForSelection();
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
               <img src={gif} alt="Servo preview" className="w-full h-full object-contain" />
             </div>
           </div>
         </div>
       );
     })()}
          <button
                    onClick={(e) => sweepAnd(e, () => onConfirm && onConfirm(code))}
            className="btn-sweep px-2 py-1 mx-auto" style={{ width: 'auto', display: 'inline-flex' }}
          >
            <span className="btn-3d-label text-sm leading-none hover:bg-blue-600">Download 3D</span>
            <div className="btn-3d-sweep" />
          </button>

          {/* Back ลอยมุมซ้ายล่างทุก Step */}
          <button
            onClick={backOneStep}
            className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ย้อนกลับ
          </button>
        </div>
      )}
    </>
  );
}


// === [ADD] HB: Model Code ===
// รูปแบบ: (Series)(Stage)(Output)(Mounting)(Size)-(Ratio)-(ShaftDesign)
// ตัวอย่าง: H3SH15-56-A , B2HH5-7.1-E , B2FV8-11.2-F

// ============================
// SRV Worm Gear Flow
// ============================
export function renderSRVFlow(state, setState, onConfirm, onRequestQuote) {
  const {
    // Step 1
    srvSeries,              // 'SRV' | 'SDRV' | 'SVF'
    // Step 2
    srvSize,                // '025' | '030' | ... | '150' หรือ '025/030' ฯลฯ
    // Step 3
    srvInputSel,            // 'WM' | 'WS' | 'IS'  (With motor / With Servo motor / Input shaft)
    // Step 3.1 (WM only)
    srvPowerKW,             // '0.06' | '0.09' | ...
    // Step 3.1.1 (WM only)
    srvPole,                // '4P' | '6P'
    // Step 3.1.2 (WM only)
    srvIECMode,             // 'IEC' | 'IEC+Motor'
    // Step 3.1.3 (all inputs require ratio)
    srvRatio,               // '5' | '7.5' | ...
    // Step 4
    srvGearType,            // 'FA' | 'FB' | 'Hollow' | 'T'
    srvGearTypeSub,         // 'A' | 'B' | null
    // Step 5
    srvShaftDesign,         // 'DS' | 'DS1' | 'DS2' | 'Hollow'
    // Step 6
    srvMounting,            // 'B3' | 'B8' | 'V5' | 'V6' | 'B6' | 'B7'
    // Step 7
    srvIECSize,             // 'B5' | 'B14'
    // Step 8 (กรณีเลือก IEC+Motor เท่านั้น)
    srvMotorType,           // 'YE3' | 'YE4' | 'YEJ' | 'YVP' | 'YVPEJ' | 'YB'
    srvPosition,            // '0' | '90' | '180' | '270'
    srvPositionSub          // 'X' | '2' | '3' | '4'
  } = state;

  const update = (key, value) => {
    const setterMap = {
      srvSeries: setState.setSrvSeries,
      srvSize: setState.setSrvSize,
      srvInputSel: setState.setSrvInputSel,
      srvPowerKW: setState.setSrvPowerKW,
      srvPole: setState.setSrvPole,
      srvIECMode: setState.setSrvIECMode,
      srvRatio: setState.setSrvRatio,
      srvGearType: setState.setSrvGearType,
      srvGearTypeSub: setState.setSrvGearTypeSub,
      srvShaftDesign: setState.setSrvShaftDesign,
      srvMounting: setState.setSrvMounting,
      srvIECSize: setState.setSrvIECSize,
      srvMotorType: setState.setSrvMotorType,
      srvPosition: setState.setSrvPosition,
      srvPositionSub: setState.setSrvPositionSub
    };
    if (setterMap[key]) setterMap[key](value);
  };

  // ---------- Data maps ----------
  const sizeMap = {
    SRV:  ["025","030","040","050","063","075","090","110","130","150"],
    SDRV: ["025/030","025/040","030/040","030/050","030/063","040/075","040/090","050/110","063/130","063/150"],
    SVF:  ["030","040","050","063","075","090","110","130","150"]
  };

  const powerBySize = {
    "025": ["0.06","0.09"],
    "030": ["0.06","0.09","0.12","0.18"],
    "040": ["0.09","0.12","0.18","0.25","0.37"],
    "050": ["0.12","0.18","0.25","0.37","0.55","0.75"],
    "063": ["0.25","0.37","0.55","0.75","1.1","1.5"],
    "075": ["0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4"],
    "090": ["0.55","0.75","1.1","1.5","2.2","3","4"],
    "110": ["0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
    "130": ["1.1","1.5","2.2","3","4","5.5","7.5"],
    "150": ["2.2","3","4","5.5","7.5","11","15"]
  };

  const ratio12 = ["5","7.5","10","15","20","25","30","40","50","60","80","100"];
  const ratio11 = ["7.5","10","15","20","25","30","40","50","60","80","100"];
  const ratioBySize = {
    "025": ratio12,
    "030": ratio12,
    "040": ratio11,
    "050": ratio12,
    "063": ratio12,
    "075": ratio11,
    "090": ratio12,
    "110": ratio12,
    "130": ratio11,
    "150": ratio11
  };
  

  const floatingBack = (onClick) => (
    <button
      onClick={onClick}
      className="fixed left-3 bottom-3 z-20 px-3 py-2 rounded-full shadow-xl bg-white/90 hover:bg-white transform hover:-translate-y-1 transition"
    >
      ← ย้อนกลับ
    </button>
  );

  const Section = ({title, children}) => (
    <div className="mt-6">
      <h3 className="font-semibold text-white drop-shadow mb-3">{title}</h3>
      {children}
    </div>
  );

  // ---------- STEP 1 ----------
  if (!srvSeries) {
    return (
      <>
        <Section title="เลือก Series">
          <div className="grid grid-cols-3 gap-4">
            {[
              { key:'SRV',  img: SRVVImg,  label:'SRV'  },
              { key:'SDRV', img: SDRVImg, label:'SDRV' },
              { key:'SVF',  img: SVFImg,  label:'SVF'  },
            ].map(({key,img,label}) => (
              <button key={key}
                onClick={() => update('srvSeries', key)}
                className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
              >
                <img src={img} alt={label} className="w-full rounded-t-2xl"/>
                <p className="text-center py-2 font-semibold text-gray-800">{label}</p>
              </button>
            ))}
          </div>
        </Section>
      </>
    );
  }

  // ---------- STEP 2 ----------
  if (srvSeries && !srvSize) {
    const sizes = sizeMap[srvSeries] || [];
    return (
      <>
        <Section title="เลือก Size Gear">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {sizes.map(sz => (
              <button key={sz}
                onClick={() => update('srvSize', sz)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-4 py-6 text-blue-800 font-bold border border-gray-300 hover:bg-blue-100"
              >{sz}</button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvSeries', null))}
      </>
    );
  }

  // ---------- STEP 3 ----------
  if (srvSize && !srvInputSel) {
    return (
      <>
        <Section title="เลือก Input Power ที่ต้องการ">
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => update('srvInputSel','WM')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVWMImg} alt="With motor" className="w-full rounded-t-2xl"/>
              <p className="text-center py-2 font-semibold text-gray-800">With motor</p>
            </button>
            <button onClick={() => update('srvInputSel','WS')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVWSImg} alt="With Servo motor" className="w-full rounded-t-2xl"/>
              <p className="text-center py-2 font-semibold text-gray-800">With Servo motor</p>
            </button>
            <button onClick={() => update('srvInputSel','IS')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVIImg} alt="Input shaft" className="w-full rounded-t-2xl"/>
              <p className="text-center py-2 font-semibold text-gray-800">Input shaft</p>
            </button>
          </div>
        </Section>
        {floatingBack(() => update('srvSize', null))}
      </>
    );
  }

  // ---------- STEP 3.1 (WM only) ----------
  if (srvInputSel === 'WM' && !srvPowerKW) {
    const key = (srvSize || '').split('/')[0]; // เผื่อ SDRV เลือกคู่ ให้ยึด size แรกสำหรับ mapping power
    const powers = powerBySize[key] || [];
    return (
      <>
        <Section title="เลือกขนาดมอเตอร์ (กิโลวัต): Power Motor (kW)">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {powers.map(p => (
              <button key={p} onClick={() => update('srvPowerKW', p)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-4 py-6 font-semibold">
                {p}
              </button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvInputSel', null))}
      </>
    );
  }

  // ---------- STEP 3.1.1 (WM only) ----------
  if (srvInputSel === 'WM' && srvPowerKW && !srvPole) {
    return (
      <>
        <Section title="เลือกจำนวน Pole มอเตอร์ : Motor Pole">
          <div className="grid grid-cols-2 gap-4">
            {['4P','6P'].map(p => (
              <button key={p} onClick={() => update('srvPole', p)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-4 py-6 font-semibold">
                {p === '4P' ? '4 Pole' : '6 Pole'}
              </button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvPowerKW', null))}
      </>
    );
  }

  // ---------- STEP 3.1.2 (WM only) ----------
  if (srvInputSel === 'WM' && srvPowerKW && srvPole && !srvIECMode) {
    return (
      <>
        <Section title="เลือกเฉพาะ Gear + IEC Adapter หรือ ทั้งชุด Gear + Motor">
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => update('srvIECMode','IEC')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVIECImg} alt="IEC Adapter" className="w-full rounded-t-2xl"/>
              <p className="text-center py-2 font-semibold text-gray-800">IEC Adapter</p>
            </button>
            <button onClick={() => update('srvIECMode','IEC+Motor')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={SRVWMImg} alt="IEC Adapter + Motor" className="w-full rounded-t-2xl"/>
              <p className="text-center py-2 font-semibold text-gray-800">IEC Adapter + Motor</p>
            </button>
          </div>
        </Section>
        {floatingBack(() => update('srvPole', null))}
      </>
    );
  }

  // ---------- STEP 3.1.3 — Ratio (สำหรับทุก input เสมอ) ----------
  if (!srvRatio) {
    const key = (srvSize || '').split('/')[0];
    const ratios = ratioBySize[key] || ratio12;

    // WS: แสดงปุ่ม Inflange + เลือก ratio
    // IS: แสดงปุ่ม Inshaft + เลือก ratio
    const extra = srvInputSel === 'WS'
      ? <img src={InflangeImg} alt="Input Flange" className="w-40 mx-auto mb-4 rounded-xl shadow"/> 
      : srvInputSel === 'IS'
      ? <img src={InshaftImg} alt="Input shaft" className="w-40 mx-auto mb-4 rounded-xl shadow"/>
      : null;

    return (
      <>
        <Section title="เลือกอัตราทด : Ratio">
          {extra}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {ratios.map(r => (
              <button key={r} onClick={() => update('srvRatio', r)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-3 py-4 font-semibold">
                {r}
              </button>
            ))}
          </div>
        </Section>
        <p className="text-blue-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
 <b></b><br/>
  สามารถใช้สูตรคำนวณความเร็วรอบจากอัตราทดได้เลย: <b>ความเร็วหัวเกียร์ (รอบ/นาที) = ความเร็วมอเตอร์ (รอบ/นาที) ÷ อัตราทด (i)</b><br/>
  ถ้าเลือกมอเตอร์ 4 Pole ค่าโดยประมาณ = <b>1450</b> รอบ/นาที<br/>
  ถ้าเลือกมอเตอร์ 6 Pole ค่าโดยประมาณ = <b>950</b> รอบ/นาที<br/>
  ถ้าเลือกอัตราทด (i) 50 = <b>ความเร็วของหัวเกียร์ = 1450 / 50 = 29 rpm </b>
</p>
        {floatingBack(() => {
          if (srvIECMode) return update('srvIECMode', null);
          if (srvPole)     return update('srvPole', null);
          if (srvPowerKW)  return update('srvPowerKW', null);
          update('srvInputSel', null);
        })}
      </>
    );
  }

  // ---------- STEP 4 — Gear Type ----------
  if (!srvGearType) {
    return (
      <>
        <Section title="เลือกตำแหน่งการติดตั้ง : Mounting Type">
          <div className="grid grid-cols-4 gap-4">
            {[
              {k:'FA', label:'FA', img: SRVFAImg},
              {k:'FB', label:'FB', img: SRVFBImg},
              {k:'Hollow & Solid shaft', label:'Hollow & Solid shaft', img: SRVHollowImg},
              {k:'T', label:'T', img: SRVTImg}
            ].map(({k,label,img}) => (
              <button key={k} onClick={() => update('srvGearType', k)}
                className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
                {img ? <img src={img} alt={label} className="w-full rounded-t-2xl"/> : <div className="h-32 rounded-t-2xl flex items-center justify-center font-bold text-2xl">{label}</div>}
                <p className="text-center py-2 font-semibold text-gray-800">{label}</p>
              </button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvRatio', null))}
      </>
    );
  }

  // ---------- STEP 4 : Sub (เฉพาะ FA/FB/T) ----------
if ((srvGearType === 'FA' || srvGearType === 'FB' || srvGearType === 'T') && !srvGearTypeSub) {
  // เลือกรูป A/B ตามชนิดที่เลือก
  const subImages =
    srvGearType === 'FA'
      ? [{ k: '1', img: SRVFAAImg }, { k: '2', img: SRVFABImg }]
      : srvGearType === 'FB'
      ? [{ k: '1', img: SRVFBAImg }, { k: '2', img: SRVFBBImg }]
      : [{ k: '1', img: SRVTAImg }, { k: '2', img: SRVTBImg }]; // 'T'

  return (
    <>
      <Section title="เลือกทิศทางการติดตั้ง">
        <div className="grid grid-cols-2 gap-4">
          {subImages.map(({ k, img }) => (
            <button
              key={k}
              onClick={() => update('srvGearTypeSub', k)}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
              title={k}
            >
              <img src={img} alt={`${srvGearType}${k}`} className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">{k}</p>
            </button>
          ))}
        </div>
      </Section>
      {floatingBack(() => update('srvGearType', null))}
    </>
  );
}

  // ---------- STEP 5 : Shaft Design ----------
  if (!srvShaftDesign) {
    return (
      <>
        <Section title="เลือกลักษณะเพลา : Shaft Design">
          <div className="grid grid-cols-4 gap-4">
            <button onClick={() => update('srvShaftDesign','DS')} className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"><img src={DSImg}  alt="DS"  className="w-full rounded-t-2xl"/><p className="text-center py-2 font-semibold">DS</p></button>
            <button onClick={() => update('srvShaftDesign','DS1')} className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"><img src={DS1Img} alt="DS1" className="w-full rounded-t-2xl"/><p className="text-center py-2 font-semibold">DS1</p></button>
            <button onClick={() => update('srvShaftDesign','DS2')} className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"><img src={DS2Img} alt="DS2" className="w-full rounded-t-2xl"/><p className="text-center py-2 font-semibold">DS2</p></button>
            <button onClick={() => update('srvShaftDesign','Hollow')} className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"><img src={SRVHollowImg} alt="Hollow" className="w-full rounded-t-2xl"/><p className="text-center py-2 font-semibold">Hollow</p></button>
          </div>
        </Section>
        {floatingBack(() => {
          if (srvGearTypeSub) return update('srvGearTypeSub', null);
          update('srvGearType', null);
        })}
      </>
    );
  }

  // ---------- STEP 6 — Mounting Position ----------
  if (!srvMounting) {
    const image = srvSeries === 'SVF' ? SVFMTImg : SRVMTImg; // ถ้าคุณมี SDRVMTImg ต่างหาก ค่อยเปลี่ยนทีหลัง
    return (
      <>
        <Section title="เลือกตำแหน่งการติดตั้ง : Mounting position">
          <div className="flex justify-center mb-6">
            <img src={image} alt="Mounting Table" className="max-w-md w-full rounded-xl shadow"/>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {['B3','B8','V5','V6','B6','B7'].map(m => (
              <button key={m} onClick={() => update('srvMounting', m)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white px-3 py-4 font-semibold">
                {m}
              </button>
            ))}
          </div>
        </Section>
        {floatingBack(() => update('srvShaftDesign', null))}
      </>
    );
  }

  // ---------- STEP 7 — IEC Size ----------
  if (!srvIECSize) {
    return (
      <>
        <Section title="เลือกขนาดหน้าแปลนของ Adapter : IEC Adapter Size">
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => update('srvIECSize','B5')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={B5Img} alt="B5" className="w-full rounded-t-2xl"/>
              <p className="text-center py-2 font-semibold">B5</p>
            </button>
            <button onClick={() => update('srvIECSize','B14')}
              className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white">
              <img src={B14TImg} alt="B14" className="w-full rounded-t-2xl"/>
              <p className="text-center py-2 font-semibold">B14</p>
            </button>
          </div>
        </Section>
        {floatingBack(() => update('srvMounting', null))}
      </>
    );
  }

  // ---------- STEP 8 : Motor Type + Position (เฉพาะกรณี WM & IEC+Motor) ----------
  if (srvInputSel === 'WM' && srvIECMode === 'IEC+Motor' && (!srvMotorType || !srvPosition || !srvPositionSub)) {
    return (
      <>
        {!srvMotorType && (
          <Section title="เลือกประเภทของมอเตอร์ : Motor Type">
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {[
      { type: 'YE3',   img: YE3Img   },
      { type: 'YE4',   img: YE4Img   },
      { type: 'YEJ',   img: YEJImg   },
      { type: 'YVP',   img: YVPImg   },
      { type: 'YVPEJ', img: YVPEJImg },
      { type: 'YB',    img: YBImg    }
    ].map(({ type, img }) => (
      <button
        key={type}
        onClick={() => update('srvMotorType', type)}
        className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
        title={type}
      >
        <img src={img} alt={type} className="w-full rounded-t-2xl" />
        <p className="text-center py-2 font-semibold text-gray-800">{type}</p>
      </button>
    ))}
  </div>
</Section>
        )}
        {srvMotorType && !srvPosition && (
  <Section title="ทิศทางการติดตั้งกล่องไฟ : Terminal Box Position">
    <div className="grid grid-cols-4 gap-4">
      {[
        { p: '0',   img: T0Img   },
        { p: '90',  img: T90Img  },
        { p: '180', img: T180Img },
        { p: '270', img: T270Img }
      ].map(({ p, img }) => (
        <button
          key={p}
          onClick={() => update('srvPosition', p)}
          className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
          title={`${p}°`}
        >
          <img src={img} alt={`T${p}`} className="w-full rounded-t-2xl" />
          <p className="text-center py-2 font-semibold text-gray-800">{p}°</p>
        </button>
      ))}
    </div>
  </Section>
)}
        {srvMotorType && srvPosition && !srvPositionSub && (
  <Section title="ทิศทางการเข้าของสายไฟ : Cable wire position">
    <div className="grid grid-cols-4 gap-4">
      {[
        { s: 'X', img: CXImg },
        { s: '1', img: C1Img },
        { s: '2', img: C2Img },
        { s: '3', img: C3Img }
      ].map(({ s, img }) => (
        <button
          key={s}
          onClick={() => update('srvPositionSub', s)}
          className="rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition bg-white"
          title={s}
        >
          <img src={img} alt={`C${s}`} className="w-full rounded-t-2xl" />
          <p className="text-center py-2 font-semibold text-gray-800">{s}</p>
        </button>
      ))}
    </div>
  </Section>
)}
        {floatingBack(() => {
          if (srvPositionSub) return update('srvPositionSub', null);
          if (srvPosition)    return update('srvPosition', null);
          if (srvMotorType)   return update('srvMotorType', null);
          update('srvIECSize', null);
        })}
      </>
    );
  }

  // ---------- STEP 9 — Model Code & Confirm ----------
  const seriesShort = srvSeries; // 'SRV' | 'SDRV' | 'SVF'
  const sizeShort = srvSize ? srvSize.replaceAll('/', '-') : '';
  const paddedSize  = sizeShort ? sizeShort.padStart(3, '0') : '';
  const motorPart   = srvInputSel === 'WM' ? (srvPowerKW || '') : '';
  const polePart = (srvInputSel === 'WM' && (srvPole === '4P' || srvPole === '6P'))
  ? (srvPole === '6P' ? '6P' : '4P')
  : '';
  const amFrame = getIECFrameBySizePower(srvSize, srvPowerKW);
  const NO_CODE_GEAR = ['Hollow & Solid shaft'];
    const gearPart = (srvGearType && !NO_CODE_GEAR.includes(srvGearType))
  ? `${srvGearType}${srvGearTypeSub || ''}`
  : '';
  const isDSShaft = ['DS','DS1','DS2'].includes(srvShaftDesign || '');
  const shaftPart = isDSShaft ? srvShaftDesign : '';
  const head = gearPart
  ? `${seriesShort}${paddedSize}${gearPart}${shaftPart ? `-${shaftPart}` : ''}`
  : `${seriesShort}${paddedSize}${shaftPart || ''}`;
  const getInputFlangeBySizePower = (sizeStr, powerKW) => {
  const sz = parseInt(String(sizeStr || '').replace(/\D/g, ''), 10);
  const p  = Math.round(parseFloat(powerKW ?? '') * 100) / 100;
  if (!sz || !Number.isFinite(p)) return null;
  const inSet = (v, arr) => arr.some(x => Math.abs(v - x) < 1e-6);

  switch (sz) {
    case 25:
      if (inSet(p, [0.06, 0.09])) return ['Ø80 mm B14'];
      break;

    case 30:
      if (inSet(p, [0.06, 0.09])) return ['Ø120 mm B5'];
      if (inSet(p, [0.12, 0.18])) return ['Ø90 mm B14', 'Ø140 mm B5'];
      break;

    case 40:
      if (inSet(p, [0.09]))       return ['Ø80 mm B14', 'Ø120 mm B5'];
      if (inSet(p, [0.12, 0.18])) return ['Ø90 mm B14', 'Ø140 mm B5'];
      if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5'];
      break;

    case 50:
      if (inSet(p, [0.12, 0.18])) return ['Ø140 mm B5'];
      if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5'];
      if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5'];
      break;

    case 63:
      if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5'];
      if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5'];
      if (inSet(p, [1.1,  1.5 ])) return ['Ø140 mm B14', 'Ø200 mm B5'];
      break;

    case 75:
      if (inSet(p, [0.25, 0.37])) return ['Ø105 mm B14', 'Ø160 mm B5'];
      if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5'];
      if (inSet(p, [1.1,  1.5 ])) return ['Ø120 mm B14', 'Ø200 mm B5'];
      if (inSet(p, [2.2,  3   ])) return ['Ø160 mm B14', 'Ø250 mm B5'];
      if (inSet(p, [4           ])) return ['Ø160 mm B14', 'Ø250 mm B5'];
      break;

    case 90:
      if (inSet(p, [0.55, 0.75])) return ['Ø120 mm B14', 'Ø200 mm B5'];
      if (inSet(p, [1.1,  1.5 ])) return ['Ø120 mm B14', 'Ø200 mm B5'];
      if (inSet(p, [2.2,  3   ])) return ['Ø160 mm B14', 'Ø250 mm B5'];
      if (inSet(p, [4           ])) return ['Ø160 mm B14', 'Ø250 mm B5'];
      break;

    case 110:
      if (inSet(p, [0.55, 0.75])) return ['Ø200 mm B5'];
      if (inSet(p, [1.1,  1.5 ])) return ['Ø200 mm B5'];
      if (inSet(p, [2.2,  3   ])) return ['Ø250 mm B5'];
      if (inSet(p, [4           ])) return ['Ø250 mm B5'];
      if (inSet(p, [5.5,  7.5 ])) return ['Ø300 mm B5'];
      break;

    case 130:
      if (inSet(p, [1.1,  1.5 ])) return ['Ø200 mm B5'];
      if (inSet(p, [2.2,  3   ])) return ['Ø250 mm B5'];
      if (inSet(p, [4           ])) return ['Ø250 mm B5'];
      if (inSet(p, [5.5,  7.5 ])) return ['Ø300 mm B5'];
      break;

    case 150:
      if (inSet(p, [2.2,  3   ])) return ['Ø250 mm B5'];
      if (inSet(p, [4           ])) return ['Ø250 mm B5'];
      if (inSet(p, [5.5,  7.5 ])) return ['Ø300 mm B5'];
      if (inSet(p, [11,   15  ])) return ['Ø350 mm B5'];
      break;
  }
  return null;
};

    const getInputHoleBySizePower = (sizeStr, powerKW) => {
  const sz = parseInt(String(sizeStr || '').replace(/\D/g, ''), 10); // 25..150
  const p  = Math.round(parseFloat(powerKW ?? '') * 100) / 100;      // ปัด 2 ตำแหน่ง
  if (!sz || !Number.isFinite(p)) return null;

  const inSet = (val, arr) => arr.some(x => Math.abs(val - x) < 1e-6);

  switch (sz) {
    case 25:  if (inSet(p, [0.06, 0.09])) return 'Ø9 mm'; break;

    case 30:  if (inSet(p, [0.06, 0.09])) return 'Ø9 mm';
              if (inSet(p, [0.12, 0.18])) return 'Ø11 mm'; break;

    case 40:  if (inSet(p, [0.09]))       return 'Ø9 mm';
              if (inSet(p, [0.12, 0.18])) return 'Ø11 mm';
              if (inSet(p, [0.25, 0.37])) return 'Ø14 mm'; break;

    case 50:  if (inSet(p, [0.12, 0.18])) return 'Ø11 mm';
              if (inSet(p, [0.25, 0.37])) return 'Ø14 mm';
              if (inSet(p, [0.55, 0.75])) return 'Ø19 mm'; break;

    case 63:  if (inSet(p, [0.25, 0.37])) return 'Ø14 mm';
              if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm'; break;

    case 75:  if (inSet(p, [0.25, 0.37])) return 'Ø14 mm';
              if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4           ])) return 'Ø28 mm'; break;

    case 90:  if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4           ])) return 'Ø28 mm'; break;

    case 110: if (inSet(p, [0.55, 0.75])) return 'Ø19 mm';
              if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4           ])) return 'Ø28 mm';
              if (inSet(p, [5.5,  7.5 ])) return 'Ø38 mm'; break;

    case 130: if (inSet(p, [1.1,  1.5 ])) return 'Ø24 mm';
              if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4           ])) return 'Ø28 mm';
              if (inSet(p, [5.5,  7.5 ])) return 'Ø38 mm'; break;

    case 150: if (inSet(p, [2.2,  3   ])) return 'Ø28 mm';
              if (inSet(p, [4           ])) return 'Ø28 mm';
              if (inSet(p, [5.5,  7.5 ])) return 'Ø38 mm';
              if (inSet(p, [11,   15  ])) return 'Ø42 mm'; break;
  }
  return null;
};

  const flangePart  = srvIECSize || ''; // เช่น 'B5' / 'B14'
  function getIECFrameBySizePower(sizeStr, powerKW){
  const sz = parseInt(String(sizeStr || '').replace(/\D/g, ''), 10); // 25..150
  const p  = Math.round(parseFloat(powerKW ?? '') * 100) / 100;      // ปัด 2 ตำแหน่ง

  if (!sz || !Number.isFinite(p)) return null;

  const inSet = (val, arr) => arr.some(x => Math.abs(val - x) < 1e-6);

  switch (sz) {
    case 25:  if (inSet(p, [0.06, 0.09])) return 56; break;

    case 30:  if (inSet(p, [0.06, 0.09])) return 56;
              if (inSet(p, [0.12, 0.18])) return 63; break;

    case 40:  if (inSet(p, [0.09]))       return 56;
              if (inSet(p, [0.12, 0.18])) return 63;
              if (inSet(p, [0.25, 0.37])) return 71; break;

    case 50:  if (inSet(p, [0.12, 0.18])) return 63;
              if (inSet(p, [0.25, 0.37])) return 71;
              if (inSet(p, [0.55, 0.75])) return 80; break;

    case 63:  if (inSet(p, [0.25, 0.37])) return 71;
              if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90; break;

    case 75:  if (inSet(p, [0.25, 0.37])) return 71;
              if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4           ])) return 112; break;

    case 90:  if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4           ])) return 112; break;

    case 110: if (inSet(p, [0.55, 0.75])) return 80;
              if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4           ])) return 112;
              if (inSet(p, [5.5,  7.5 ])) return 132; break;

    case 130: if (inSet(p, [1.1,  1.5 ])) return 90;
              if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4           ])) return 112;
              if (inSet(p, [5.5,  7.5 ])) return 132; break;

    case 150: if (inSet(p, [2.2,  3   ])) return 100;
              if (inSet(p, [4           ])) return 112;
              if (inSet(p, [5.5,  7.5 ])) return 132;
              if (inSet(p, [11,   15  ])) return 160; break;
  }
  return null;
};
  let code = `${head}-${srvRatio}`
         + `${motorPart ? `-${motorPart}` : ''}`
         + `${polePart  ? `-${polePart}`   : ''}`
         + `-${flangePart}`;

// IEC Adapter only → ใส่ AM (IEC+Motor ไม่ใส่ AM)
if (srvInputSel === 'WM' && srvIECMode === 'IEC') {
  const amFrame = getIECFrameBySizePower(srvSize, srvPowerKW); // ใช้ตัวเดิม
  if (amFrame) {
    code = `${head}-${srvRatio}-AM${amFrame}${flangePart}`;
  }
}

  return (
    <>
      <Section title="นี่คือ Specification ที่คุณต้องการ">
  {(() => {
    // --- สร้างค่าจากการเลือก เพื่อโชว์ใต้บรรทัด Model ---
    const sizeKey = (srvSize || '').split('/')[0]; // เผื่อ SDRV
    const inputPowerLabel =
      srvInputSel === 'WM'
    ? (srvIECMode === 'IEC' ? 'IEC Adapter Motor' : 'With motor')
    : srvInputSel === 'WS'
    ? 'With Servo motor'
    : srvInputSel === 'IS'
    ? 'Input shaft'
    : '-';

    const inputFlangeBySize = {
      '025': ['Ø80 mm'],
      '030': ['Ø140 mm','Ø120 mm','Ø90 mm','Ø80 mm'],
      '040': ['Ø160 mm','Ø140 mm','Ø120 mm','Ø105 mm','Ø90 mm'],
      '050': ['Ø200 mm','Ø160 mm','Ø140 mm','Ø120 mm','Ø105 mm'],
      '063': ['Ø200 mm','Ø160 mm','Ø140 mm','Ø120 mm','Ø105 mm'],
      '075': ['Ø250 mm','Ø200 mm','Ø160 mm','Ø140 mm','Ø120 mm'], // ← แทน 070
      '090': ['Ø250 mm','Ø200 mm','Ø160 mm','Ø140 mm','Ø120 mm'],
      '110': ['Ø300 mm','Ø250 mm','Ø200 mm'],
      '130': ['Ø300 mm','Ø250 mm','Ø200 mm'],
      '150': ['Ø350 mm','Ø300 mm','Ø250 mm']
    };

    // แผนที่ Output shaft ตาม Size
    const outputShaftBySize = {
      '025': ['Ø11 mm'],
      '030': ['Ø14 mm'],
      '040': ['Ø18 mm','Ø19 mm'],
      '050': ['Ø24 mm','Ø25 mm'],
      '063': ['Ø25 mm','Ø28 mm'],
      '075': ['Ø28 mm','Ø35 mm'], // ← แทน 070
      '090': ['Ø35 mm','Ø38 mm'],
      '110': ['Ø42 mm'],
      '130': ['Ø45 mm'],
      '150': ['Ø50 mm']
    };

    const flanges = inputFlangeBySize[sizeKey] || [];
    const shafts  = outputShaftBySize[sizeKey] || [];
    const inputFlangeList = getInputFlangeBySizePower(srvSize, srvPowerKW);
    const inputFlangeText = inputFlangeList?.length ? inputFlangeList.join(' , ') : '-';
    const shaftLabelMap = {
  DS:   'DS shaft on both sides : ( เพลา 2 ข้าง ซ้าย-ขวา )',
  DS1:  'DS1 : ( เพลาข้างขวามองจากด้านหัวเกียร์ )',
  DS2:  'DS2 : ( เพลาข้างซ้ายมองจากด้านหัวเกียร์ )',
  Hollow: 'Hollow shaft / Keyway : เพลารูสวม แบบมีร่องลิ่ม',
};
const shaftLabel = srvShaftDesign
  ? (shaftLabelMap[srvShaftDesign] || srvShaftDesign)
  : '-';
    const ratioNum = parseFloat(srvRatio || '');
    const baseRPM  = srvPole === '6P' ? 1000 : (srvPole === '4P' ? 1500 : null);
    const outRPM   = (baseRPM && ratioNum) ? Math.round(baseRPM / ratioNum) : null;
        const srvInputhole = (srvInputSel === 'WM')
  ? getInputHoleBySizePower(srvSize, srvPowerKW)
  : null;
        const isIECAdapter = (srvInputSel === 'WM' && srvIECMode === 'IEC');
   // ★ NEW: คำนวณ Output Torque (เฉพาะกรณี With motor)
const kW = parseFloat(srvPowerKW ?? '');
const outTorque = (srvInputSel === 'WM' && Number.isFinite(kW) && Number.isFinite(outRPM) && outRPM > 0)
  ? Math.round((9550 * kW) / outRPM)
  : null;
// ★ NEW: แปลงโค้ดมอเตอร์ → คำอธิบาย
const motorTypeLabelMap = {
  YE3:  "Premium Efficiency IE3",
  YE4:  "Super Premium Efficiency IE4",
  YEJ:  "Electromagnetic Brake",
  YVP:  "Variable Frequency Motor",
  YVPEJ:"Variable Frequency Brake Motor",
  YB:   "Explosion-proof Motor"
};
const motorTypeLabel = srvMotorType ? (motorTypeLabelMap[srvMotorType] || srvMotorType) : '';


    return (
      <div className="text-center">
        <p className="text-blue-400 font-bold mb-2">
  Model Code:
  <span className="text-yellow-400 font-extrabold text-lg"> {code}</span>
  <button
  type="button"
  title="Copy Model"
  className="ml-2 align-middle text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 hover:bg-white/20 transition"
  onClick={async (e) => {
    const btn = e.currentTarget;              // ✅ จับปุ่มไว้ก่อน
    const txt = String(code || '');

    const setBadge = (el, msg = 'Copied!', ms = 1200) => {
      const old = el.textContent;
      el.textContent = msg;
      setTimeout(() => { el.textContent = old; }, ms);
    };

    const fallbackCopy = () => {
      const ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(txt);
      } else {
        fallbackCopy();
      }
      setBadge(btn);                           // ✅ ใช้ตัวแปรที่จับไว้
    } catch {
      fallbackCopy();
      setBadge(btn);
    }
  }}
>
  Copy
</button>
</p>
        {/* รายละเอียดตามที่กำหนด */}
        <div className="max-w-2xl mx-auto text-left text-white/90 space-y-1">
          <p><span className="font-semibold">SRV Series:</span><span className="text-blue-400"> {srvSeries || '-'}</span></p>
          <p><span className="font-semibold">Size Gear:</span><span className="text-blue-400"> {srvSize || '-'}</span></p>
          <p><span className="font-semibold">Ratio:</span><span className="text-blue-400"> 1/{srvRatio || '-'}</span></p>
          <p><span className="font-semibold">Gear Mounting Type:</span><span className="text-blue-400"> {srvGearType || '-'}</span></p>
                    <p><span className="font-semibold">Direction Type:</span><span className="text-blue-400"> {srvGearTypeSub || '-'}</span></p>
                    <p><span className="font-semibold">Output shaft design:</span><span className="text-blue-400"> {shaftLabel || '-'}</span></p>
                    <p><span className="font-semibold">Flange-mounted:</span><span className="text-blue-400"> {srvIECSize || '-'}</span></p>
                    <p><span className="font-semibold">The hole diameter of input shaft:</span><span className="text-blue-400"> {srvInputhole || '-'}</span></p>
          <p>
  <span className="font-semibold">Input flange Diameter:</span>{' '}
  <span className="text-blue-400">{inputFlangeText}</span>
</p>
          <p><span className="font-semibold">Input Power:</span> <span className="text-blue-400">{inputPowerLabel}</span>
</p>
          <p>
  <span className="font-semibold">Power Motor:</span>{' '}
  <span className="text-blue-400">
    {isIECAdapter
      ? '-'                                                     // IEC Adapter → แสดง '-'
      : (srvInputSel === 'WM'
          ? `${srvPowerKW || '-'}kW  ${srvPole === '6P' ? '6 Pole' : (srvPole === '4P' ? '4 Pole' : '-')}, 3Phase380VAC, 50Hz, IP55, Class F, S1`
          : '-')}
  </span>
  {/* แสดง motorTypeLabel เฉพาะเมื่อไม่ใช่ IEC Adapter */}
  {!isIECAdapter && srvInputSel === 'WM' && srvMotorType && (
    <>
      <span className="text-blue-400"> , </span>
      <span className="text-yellow-400 font-extrabold text-m">
        {motorTypeLabel}
      </span>
    </>
  )}
</p>
 <p>
  <span className="font-semibold">Output Speed:</span>{' '}<span className="text-blue-400">
  {isIECAdapter
    ? '-'                                  // IEC Adapter → แสดง '-'
    : (outRPM !== null ? `${outRPM} rpm` : '-')}</span>
</p>
<p>
  <span className="font-semibold">Output Torque:</span> <span className="text-blue-400">{' '}
  {outTorque !== null ? `${outTorque} N·m` : '-'} </span>
</p>
<p> <span className="font-semibold">Mounting Position: </span> <span className="text-blue-400">{srvMounting}</span></p>
          
<p>
            <span className="font-semibold">Output shaft:</span> <span className="text-blue-400">{' '}
            {shafts.length ? shafts.join(' , ') : '-'}</span>
          </p>
          <p>
  <span className="font-semibold">Warranty:</span>{' '}
  <span className="text-yellow-400 font-extrabold text-xl">18 เดือน</span>
</p>
        </div>

<div className="mt-6 flex items-center w-full">
  {/* ซ้าย: Drawing 2D PDF */}
  <div className="flex-1">
    <button
      type="button"
      onClick={() => {
        // TODO: ใช้ฟังก์ชันดาวน์โหลด PDF ของ SRV ที่คุณมี
        // เช่น downloadSrvDrawingPDF(srvState, confirmModel) หรือพารามิเตอร์ที่คุณใช้จริง
        if (typeof downloadSrvDrawingPDF === 'function') {
          downloadSrvDrawingPDF(srvState, confirmModel);
        } else {
          console.warn('downloadSrvDrawingPDF() not found');
        }
      }}
      className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 shadow border border-white/20"
    >
      📐 Drawing 2D
    </button>
  </div>
  <div className="flex-1 flex justify-center">
    <button
      type="button"
      className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 shadow"
      onClick={(e) => {
  e.stopPropagation();
  e.preventDefault();
  // เรียก callback ตามซิกเนเจอร์เดิมของ renderSRVFlow
  if (typeof onConfirm === 'function') {
    onConfirm(code);   // ส่งเฉพาะ modelCode
  }
}}
    >
      🧾 ขอใบเสนอราคา
    </button>
  </div>

  {/* ขวา: ยืนยันและรับไฟล์ 3D  -- ใช้ handler/เงื่อนไขเดิมทุกอย่าง */}
  <div className="flex-1 flex justify-end">
    <button
      type="button"
      onClick={() => onConfirm(code)}
      className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 shadow"
      // ^ ใช้ class/disabled เงื่อนไขเดิมของคุณได้เลย ถ้ามี
    >
      ✅ ยืนยันและรับไฟล์ 3D
    </button>
  </div>
</div>
      </div>
    );
  })()}
</Section>
      {floatingBack(() => {
        if (srvInputSel === 'WM' && srvIECMode === 'IEC+Motor') {
          if (srvPositionSub) return update('srvPositionSub', null);
          if (srvPosition)    return update('srvPosition', null);
          if (srvMotorType)   return update('srvMotorType', null);
          return update('srvIECSize', null);
        }
        return update('srvIECSize', null);
      })}
    </>
  );
}





