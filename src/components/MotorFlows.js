// MotorFlows.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FinalResult from './FinalResult';
import ACImg from '../assets/ac/ac.png';
import DCImg from '../assets/dc/dc.png';
import BLDCImg from '../assets/bldc/bldc.png';
import ServoImg from '../assets/servo/servo.png';
import PlanetaryImg from '../assets/planetary/planetary.png';
import HypoidImg from '../assets/hypoid/hypoid.png';
import RKFSImg from '../assets/rkfs/rkfs.png';
import SPNImg from '../assets/spn/spn.png';
import HBImg from '../assets/hb/hb.png';
import PPlanetaryImg from '../assets/pplanetary/pplanetary.png';
import DriverImg from '../assets/driver/driver.png';
import SRVImg from '../assets/srv/srv.png';

import R1Img from '../assets/rkfs/4Series/1R.png';
import K1Img from '../assets/rkfs/4Series/1K.png';
import F1Img from '../assets/rkfs/4Series/1F.png';
import S1Img from '../assets/rkfs/4Series/1S.png';

import RImg from '../assets/rkfs/R.png';
import RFImg from '../assets/rkfs/RF.png';
import RXImg from '../assets/rkfs/RX.png';
import RXFImg from '../assets/rkfs/RXF.png';
import RMImg from '../assets/rkfs/RM.png';

import KImg from '../assets/rkfs/K.png';
import KAImg from '../assets/rkfs/KA.png';
import KABImg from '../assets/rkfs/KAB.png';
import KAFImg from '../assets/rkfs/KAF.png';
import KATImg from '../assets/rkfs/KAT.png';
import KAZImg from '../assets/rkfs/KAZ.png';
import KAAAImg from '../assets/rkfs/KAAA.png';
import KAABImg from '../assets/rkfs/KAAB.png';
import KAAABImg from '../assets/rkfs/KAAAB.png';

import KXXAImg from '../assets/rkfs/KXXA.png';
import KXXBImg from '../assets/rkfs/KXXB.png';
import KXXABImg from '../assets/rkfs/KXXAB.png';
import KAXXAImg from '../assets/rkfs/KAXXA.png';
import KAXXBImg from '../assets/rkfs/KAXXB.png';
import KATXXTImg from '../assets/rkfs/KATXXT.png';
import SXXAImg from '../assets/rkfs/SXXA.png';
import SXXBImg from '../assets/rkfs/SXXB.png';
import SXXABImg from '../assets/rkfs/SXXAB.png';
import SAXXAImg from '../assets/rkfs/SAXXA.png';
import SAXXBImg from '../assets/rkfs/SAXXB.png';
import SATXXTImg from '../assets/rkfs/SATXXT.png';;

import SImg from '../assets/rkfs/S.png';
import SAAAImg from '../assets/rkfs/SAAA.png';
import SAABImg from '../assets/rkfs/SAAB.png';
import SAAABImg from '../assets/rkfs/SAAAB.png';
import SAImg from '../assets/rkfs/SA.png';
import SAFImg from '../assets/rkfs/SAF.png';
import SATImg from '../assets/rkfs/SAT.png';
import SAZImg from '../assets/rkfs/SAZ.png';

import FImg from '../assets/rkfs/F.png';
import FAImg from '../assets/rkfs/FA.png';
import FAFImg from '../assets/rkfs/FAF.png';
import FAZImg from '../assets/rkfs/FAZ.png';
import FFImg from '../assets/rkfs/FF.png';

import YE3Img from '../assets/rkfs/YE3.png';
import YE4Img from '../assets/rkfs/YE4.png';
import YVPImg from '../assets/rkfs/YVP.png';
import YEJImg from '../assets/rkfs/YEJ.png';
import YVPEJImg from '../assets/rkfs/YVPEJ.png';
import YBImg from '../assets/rkfs/YB.png';

import RMTImg from '../assets/rkfs/RMT.png';
import KSMTImg from '../assets/rkfs/KSMT.png';
import FMTImg from '../assets/rkfs/FMT.png';

import T0Img from '../assets/rkfs/T0.png';
import T90Img from '../assets/rkfs/T90.png';
import T180Img from '../assets/rkfs/T180.png';
import T270Img from '../assets/rkfs/T270.png';

import CXImg from '../assets/rkfs/CX.png';
import C1Img from '../assets/rkfs/C1.png';
import C2Img from '../assets/rkfs/C2.png';
import C3Img from '../assets/rkfs/C3.png';


import GBKImg from '../assets/ac/Gearhead/K.png';
import GBKlowImg from '../assets/ac/Gearhead/Klow.png';
import GBKBImg from '../assets/ac/Gearhead/KB.png';
import GBRCImg from '../assets/ac/Gearhead/RC.png';
import GBRTImg from '../assets/ac/Gearhead/RT.png';
import K3D  from '../assets/3Dgif/K3D.gif';
import KB3D from '../assets/3Dgif/KB3D.gif';
import RC3D from '../assets/3Dgif/RC3D.gif';
import RT3D from '../assets/3Dgif/RT3D.gif';

import W10Img from '../assets/ac/flame/10W.png';
import W15Img from '../assets/ac/flame/15W.png';
import W25Img from '../assets/ac/flame/25W.png';
import W40Img from '../assets/ac/flame/40W.png';
import W60Img from '../assets/ac/flame/60W.png';
import W90Img from '../assets/ac/flame/90W.png';
import W120Img from '../assets/ac/flame/120W.png';
import W140Img from '../assets/ac/flame/140W.png';
import W200Img from '../assets/ac/flame/200W.png';
import SpecialWImg from '../assets/ac/flame/SpecialW.png';

import SingleImg from '../assets/ac/Voltage/Single.png';
import ThreeImg from '../assets/ac/Voltage/Three.png';

import FanImg from '../assets/ac/Optional/Fan.png';
import TmbImg from '../assets/ac/Optional/Tmb.png';
import EmbImg from '../assets/ac/Optional/Emb.png';
import FcfImg from '../assets/ac/Optional/Fcf.png';
import TmpImg from '../assets/ac/Optional/Tmp.png';
import StdImg from '../assets/ac/Optional/Std.png';

import InductionImg from '../assets/ac/induction.png';
import ReversibleImg from '../assets/ac/reversible.png';
import VariableImg from '../assets/ac/variable.png';

import BGH1Img from '../assets/hypoid/BGH1.png';
import BGH2Img from '../assets/hypoid/BGH2.png';
import BGH3Img from '../assets/hypoid/BGH3.png';
import F2Img from '../assets/hypoid/F2.png';
import F3Img from '../assets/hypoid/F3.png';
import F23HImg from '../assets/hypoid/F23H.png';
import F23AImg from '../assets/hypoid/F23A.png';
import LBImg from '../assets/hypoid/LB.png';
import LFImg from '../assets/hypoid/LF.png';
import LLImg from '../assets/hypoid/LL.png';
import LRImg from '../assets/hypoid/LR.png';
import RBImg from '../assets/hypoid/RB.png';
import HRFImg from '../assets/hypoid/HRF.png';
import RLImg from '../assets/hypoid/RL.png';
import RRImg from '../assets/hypoid/RR.png';

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

export const productList = [
  { name: 'AC Gear Motor', image: ACImg },
  { name: 'DC Gear Motor', image: DCImg },
  { name: 'BLDC Gear Motor', image: BLDCImg },
  { name: 'Servo Motor', image: ServoImg },
  { name: 'Planetary Gear', image: PlanetaryImg },
  { name: 'Hypoid Gear', image: HypoidImg },
  { name: 'RKFS Series', image: RKFSImg },
  { name: 'SPN Series', image: SPNImg },
  { name: 'HB Gearbox Series', image: HBImg },
  { name: 'P Planetary Gearbox', image: PPlanetaryImg },
  { name: 'Servo Driver and Speed Controller', image: DriverImg },
  { name: 'SRV Worm Gear', image: SRVImg }
];

export function generateModelCode({ acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio }) {
  if (!acMotorType || !acPower || !acVoltage || !acOption || !acGearHead || !acRatio) return null;

  const phaseMap = {
    '1Phase220V AC 50Hz': 'C',
    '3Phase220V AC 50Hz': 'S'
  };

  const optionMap = {
    'With Fan': 'F',
    'With Terminal Box': 'T',
    'With Force Cooling Fan': 'FF',
    'With Electromagnetic Brake': 'M',
    'With Thermal Protector': 'P',
    'With Thermal Protection': 'P',
    'Standard': ''
  };

  const gearHeadMap = {
    'SQUARE BOX WITH WING': 'K',
    'SQUARE BOX (Low)': 'K',
    'SQUARE BOX': 'KB',
    'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'RC',
    'RIGHT ANGLE GEAR/SOLID SHAFT': 'RT'
  };

  // แปลงชื่อหัวเกียร์ → ไฟล์ GIF
const getGearGif = () => {
  // label ที่ใช้ในแอปของคุณ
  if (acGearHead === 'RIGHT ANGLE GEAR/HOLLOW SHAFT') return RC3D; // RC
  if (acGearHead === 'RIGHT ANGLE GEAR/SOLID SHAFT')  return RT3D; // RT
  if (acGearHead === 'SQUARE BOX')                    return KB3D; // KB
  if (acGearHead === 'SQUARE BOX (Low)')              return KB3D; // Klow → ใช้ KB3D ตามที่สั่ง
  if (acGearHead === 'SQUARE BOX WITH WING')          return K3D;  // K
  return null;
};

  const motorMap = {
    'Induction Motor': 'IK',
    'Reversible Motor': 'RK',
    'Variable Speed Motor': 'IK'
  };

  const powerMap = {
    '10W AC Motor': '2',
    '15W AC Motor': '3',
    '25W AC Motor': '4',
    '40W AC Motor': '5',
    '60W AC Motor': '5',
    '90W AC Motor': '5',
    '120W AC Motor': '5',
    '140W AC Motor': '6',
    '200W AC Motor': '6'
  };

  const phase = phaseMap[acVoltage];
  const gearCode = gearHeadMap[acGearHead];
  const motorCode = motorMap[acMotorType];
  const powerCode = powerMap[acPower];

  // ✅ รองรับ acOption เป็น array (multi-select)
  let term = '';
  if (Array.isArray(acOption)) {
    const cleaned = acOption.includes('Standard') ? [] : acOption;
    term = cleaned.map(opt => optionMap[opt] ?? '').join('');
  } else {
    term = optionMap[acOption] ?? '';
  }

  const num = acPower.replace('W AC Motor', '').trim();
  if (!phase || !gearCode || !motorCode || !powerCode || !num) return null;

  const isVariable     = acMotorType === 'Variable Speed Motor';
  const frontSuffixGN  = isVariable ? 'RGN' : 'GN';
  const frontSuffixGU  = isVariable ? 'RGU' : 'GU';

  const results = [];

  if (['10', '15', '25', '40'].includes(num)) {
    const front = `${powerCode}${motorCode}${num}${frontSuffixGN}-${phase}${term}`;
    const end   = `${powerCode}GN${acRatio}${gearCode}`;
    results.push(`${front}-${end}`);
  } else if (num === '60') {
    const frontGN = `${powerCode}${motorCode}${num}${frontSuffixGN}-${phase}${term}`;
    const frontGU = `${powerCode}${motorCode}${num}${frontSuffixGU}-${phase}${term}`;

    if (gearCode === 'RC' || gearCode === 'RT') {
      // 60W + RC/RT → 1 บรรทัด (GU เท่านั้น)
      const end = `${powerCode}GU${acRatio}${gearCode}`;
      results.push(`${frontGU}-${end}`);
    } else {
      // 60W + K/KB → 2 บรรทัดให้เลือก
      const endGN = `${powerCode}GN${acRatio}K`;
      const endGU = `${powerCode}GU${acRatio}KB`;
      results.push(`${frontGN}-${endGN}`);
      results.push(`${frontGU}-${endGU}`);
    }
  } else {
    // อื่น ๆ → GU family
    const front = `${powerCode}${motorCode}${num}${frontSuffixGU}-${phase}${term}`;
    const end   = `${powerCode}GU${acRatio}${gearCode}`;
    results.push(`${front}-${end}`);
  }

  return results;
}


// Render AC Motor Flow: Motor Type → Power → Voltage → Optional → Gear Type → Ratio → Summary
export default function ACMotorFlow({ acState, acSetters, onConfirm }) {
  const { acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio } = acState;

  const [selectedModel, setSelectedModel] = useState(null);

  // Optional (multi-select + confirm)
  const [optSelected, setOptSelected] = useState(
    Array.isArray(acOption) ? acOption : (acOption ? [acOption] : [])
  );
  const [optConfirmed, setOptConfirmed] = useState(!!acOption);

  const update = (key, value) => {
    const setterMap = {
      acMotorType: acSetters.setAcMotorType,
      acPower: acSetters.setAcPower,
      acVoltage: acSetters.setAcVoltage,
      acOption: acSetters.setAcOption,
      acGearHead: acSetters.setAcGearHead,
      acRatio: acSetters.setAcRatio
    };
    setterMap[key]?.(value);
  };

  const codes = generateModelCode(acState);
   // เลือก GIF ตามหัวเกียร์ที่กำลังเลือกอยู่
const gifForHead = (() => {
  if (acGearHead === 'RIGHT ANGLE GEAR/HOLLOW SHAFT') return RC3D; // RC
  if (acGearHead === 'RIGHT ANGLE GEAR/SOLID SHAFT')  return RT3D; // RT
  if (acGearHead === 'SQUARE BOX')                    return KB3D; // KB
  if (acGearHead === 'SQUARE BOX (Low)')              return KB3D; // Klow ใช้ KB3D
  if (acGearHead === 'SQUARE BOX WITH WING')          return K3D;  // K
  return null;
})();

  // --- Optional lists/filters ---
  const smallPowers = ['10W AC Motor','15W AC Motor','25W AC Motor','40W AC Motor'];
  const highPowers  = ['60W AC Motor','90W AC Motor','120W AC Motor','140W AC Motor','200W AC Motor'];

  const baseOptions = [
    { label: 'Standard', img: StdImg },
    { label: 'With Fan', img: FanImg },
    { label: 'With Terminal Box', img: TmbImg },
    { label: 'With Electromagnetic Brake', img: EmbImg },
    { label: 'With Force Cooling Fan', img: FcfImg },
    { label: 'With Thermal Protector', img: TmpImg }
  ];

  const optionalList = baseOptions.filter(o => {
    if (o.label === 'With Fan' && smallPowers.includes(acPower)) return false;  // ⬅️ ซ่อน With Fan (10–40W)
    if (o.label === 'Standard' && highPowers.includes(acPower)) return false;   // ⬅️ ซ่อน Standard (60–200W)
    return true;
  });

  const toggleOpt = (label) => {
    setOptSelected(prev => {
      if (label === 'Standard') return ['Standard'];
      const base = prev.includes('Standard') ? [] : [...prev];
      if (base.includes(label)) return base.filter(x => x !== label);
      if (base.length >= 5) return base; // สูงสุด 5
      return [...base, label];
    });
  };
  const isSelected = (label) => optSelected.includes(label);

  return (
    <div className="space-y-6 mt-6">
      {/* Motor Type */}
      {!acMotorType && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Motor Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Induction Motor', img: InductionImg },
              { label: 'Reversible Motor', img: ReversibleImg },
              { label: 'Variable Speed Motor', img: VariableImg }
            ].map(({ label, img }) => (
              <button
                key={label}
                onClick={() => update('acMotorType', label)}
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
              >
                <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
          <p className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            Variable Speed motor ความเร็วรอบ 90-1350 rpm จำเป็นต้องมี Speed controller ควบคุม (SAS Model: UX52..W)
          </p>
        </div>
      )}

      {/* Power */}
      {acMotorType && !acPower && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Power Motor</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: '10W AC Motor', img: W10Img },
              { label: '15W AC Motor', img: W15Img },
              { label: '25W AC Motor', img: W25Img },
              { label: '40W AC Motor', img: W40Img },
              { label: '60W AC Motor', img: W60Img },
              { label: '90W AC Motor', img: W90Img },
              { label: '120W AC Motor', img: W120Img },
              { label: '140W AC Motor', img: W140Img },
              { label: '200W AC Motor', img: W200Img }
            ].map(({ label, img }) => (
              <button
                key={label}
                onClick={() => update('acPower', label)}
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
              >
                <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voltage */}
      {acPower && !acVoltage && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Voltage</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: '1Phase220V AC 50Hz', img: SingleImg },
              { label: '3Phase220V AC 50Hz', img: ThreeImg }
            ].map(({ label, img }) => (
              <button
                key={label}
                onClick={() => update('acVoltage', label)}
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
              >
                <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Optional (multi-select + next) */}
      {acPower && acVoltage && !optConfirmed && !acGearHead && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Motor Optional</h3>

          {smallPowers.includes(acPower) ? (
            <p className="text-white/80 mb-2">รุ่น {acPower} ไม่ต้องใช้พัดลม</p>
          ) : (
            <p className="text-red-600 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              **AC Motor 60W-200W ควรเลือกปุ่ม "With Fan"
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {optionalList.map(({ label, img }) => (
              <button
                key={label}
                onClick={() => toggleOpt(label)}
                className={
                  "flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition " +
                  "transform hover:-translate-y-1 active:scale-105 " +
                  (isSelected(label) ? "ring-4 ring-green-500" : "")
                }
              >
                <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs text-white/80">
            เลือกได้สูงสุด 5 ตัวเลือก (หากไม่ต้องการ Optionsเสริม : เลือก"With FAN")
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                const finalSel = optSelected.length
                  ? optSelected
                  : (highPowers.includes(acPower) ? ['With Fan'] : ['Standard']);
                update('acOption', finalSel);
                setOptConfirmed(true);
              }}
              className="px-5 py-2 bg-green-400 text-white rounded hover:bg-green-200"
            >
              ถัดไป
            </button>
          </div>
        </div>
      )}

      {/* Gear Type (มีปุ่มย้อนกลับล่างซ้าย) */}
      {acOption && optConfirmed && !acGearHead && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Gear Type</h3>
          {(() => {
            const gearOptionsByPower = () => {
              switch (acPower) {
                case '10W AC Motor':
                case '15W AC Motor':
                  return [{ label: 'SQUARE BOX (Low)', img: GBKlowImg }];
                case '25W AC Motor':
                case '40W AC Motor':
                  return [
                    { label: 'SQUARE BOX (Low)', img: GBKlowImg },
                    { label: 'RIGHT ANGLE GEAR/HOLLOW SHAFT', img: GBRCImg },
                    { label: 'RIGHT ANGLE GEAR/SOLID SHAFT', img: GBRTImg },
                  ];
                case '60W AC Motor':
                  return [
                    { label: 'SQUARE BOX (Low)', img: GBKlowImg },
                    { label: 'SQUARE BOX', img: GBKBImg },
                    { label: 'RIGHT ANGLE GEAR/HOLLOW SHAFT', img: GBRCImg },
                    { label: 'RIGHT ANGLE GEAR/SOLID SHAFT', img: GBRTImg },
                  ];
                default:
                  return [
                    { label: 'SQUARE BOX WITH WING', img: GBKImg },
                    { label: 'SQUARE BOX', img: GBKBImg },
                    { label: 'RIGHT ANGLE GEAR/HOLLOW SHAFT', img: GBRCImg },
                    { label: 'RIGHT ANGLE GEAR/SOLID SHAFT', img: GBRTImg },
                  ];
              }
            };
            const options = gearOptionsByPower();

            return (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {options.map(({ label, img }) => (
                    <button
                      key={label}
                      onClick={() => update('acGearHead', label)}
                      className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 active:scale-105"
                    >
                      <img src={img} alt={label} className="h-64 mb-2 object-contain" />
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      update('acGearHead', null);
                      setOptConfirmed(false);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ย้อนกลับ
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Ratio */}
      {acGearHead && !acRatio && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Ratio Selection</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <p className="text-red-600 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              สูตรการหาความเร็วรอบ ( rpm ) = ความเร็วรอบมอเตอร์ / อัตราทด :
            </p>
            <p className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              : เช่น มอเตอร์ 1Phase220VAC 4Pole, 1500 rpm , Gear Head อัตราทด 1:30 : 1500 / 30 = 50 rpm
            </p>
            <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
            
            {[3,3.6,5,6,7.5,9,12.5,15,18,25,30,36,50,60,75,90,100,120,150,180,200].map(ratio => (
              <button
                key={ratio}
                onClick={() => update('acRatio', ratio)}
                className="bg-blue-200 hover:bg-blue-500 px-6 py-3 rounded"
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Final */}
      {acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && (
        <div className="text-center space-y-4 mt-6">
          <h2 className="text-2xl font-bold text-blue-700">
            {Array.isArray(codes) ? codes.join(', ') : codes}
          </h2>
                    {/* iPhone frame + GIF เกียร์ (กึ่งกลางหน้าจอ) */}
    {gifForHead && (
      <div className="mt-6 flex justify-center">
        {/* กรอบ iPhone */}
        <div className="relative w-[280px] h-[560px] rounded-[3rem] bg-black p-4 shadow-2xl ring-1 ring-white/10">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl" />
          {/* หน้าจอ */}
          <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
            <img
              src={gifForHead}
              alt="Gear 3D preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    )}
          <div>
            <p>Output Speed 50Hz: {(1500 / acRatio).toFixed(1)} rpm</p>
            <p>Output Speed 60Hz: {(1800 / acRatio).toFixed(1)} rpm</p>
          </div>

          {Array.isArray(codes) && (
            <div className="flex flex-col items-center space-y-2">
              {codes.map((code, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="modelChoice"
                    value={code}
                    checked={selectedModel === code}
                    onChange={() => setSelectedModel(code)}
                  />
                  <span className="font-mono">{code}</span>
                </label>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              const finalCode = Array.isArray(codes) ? selectedModel : codes;
              if (finalCode) onConfirm(finalCode);
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            เสร็จสิ้น
          </button>

          <FinalResult
            modelCode={Array.isArray(codes) ? selectedModel : codes}
            downloadLink={`https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${Array.isArray(codes) ? selectedModel : codes}.STEP`}
            onReset={() => {
              acSetters.setAcMotorType(null);
              acSetters.setAcPower(null);
              acSetters.setAcVoltage(null);
              acSetters.setAcOption(null);
              acSetters.setAcGearHead(null);
              acSetters.setAcRatio(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

// [ADD-BLDC] Model code generator (updated for High-efficiency)
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


export function renderHypoidGearFlow(hypoidState, hypoidSetters, onConfirm) {
  const {
    type,        // F2 หรือ F3
    gearType,    // H หรือ A
    ratio,       // เช่น 10, 15, ... 240
    direction,   // RL, RR, RF, RB, LL, LR, LF, LB
    power,       // 15W–2200W
    supply,      // C, A, S, S3
    optional     // B, F, P (Array)
  } = hypoidState;

  const update = (key, value) => {
    const setterMap = {
      type: hypoidSetters.setType,
      gearType: hypoidSetters.setGearType,
      ratio: hypoidSetters.setRatio,
      direction: hypoidSetters.setDirection,
      power: hypoidSetters.setPower,
      supply: hypoidSetters.setSupply,
      optional: hypoidSetters.setOptional
    };
    if (setterMap[key]) setterMap[key](value);
  };

  const toggleOptional = (opt) => {
    if (!optional.includes(opt)) update('optional', [...optional, opt]);
    else update('optional', optional.filter(o => o !== opt));
  };
    // 🔙 ย้อนกลับทีละสเตป (เรียงจากท้ายไปต้น)
const backOneStep = () => {
  if (supply)    return update('supply', null);
  if (power)     return update('power', null);
  if (direction) return update('direction', null);
  if (ratio)     return update('ratio', null);
  if (gearType)  return update('gearType', null);
  if (type)      return update('type', null);
};

  const generateModelCode = () => {
    const optCode = optional.join('');
    return `${type}-${gearType}${ratio}${direction}-${power}-${supply}${optCode}`;
  };

  return (
    <div className="space-y-6">
      {/* Step 1 */}
      {!type && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Gear Motor Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols1 gap-7 sm:gap-8">
            {[
              { label: 'F2', img: F2Img },
              { label: 'F3', img: F3Img }
            ].map(({ label, img }) => (
              <ThumbCard
                key={label}
                img={img}
                label={label}
                /* กรณี label เป็น 'F2 Series'/'F3 Series' ให้จับจากข้อความ */
                active={type === (label.includes('F2') ? 'F2' : 'F3')}
                onClick={() => update('type', label.includes('F2') ? 'F2' : 'F3')}
                /* ย่อขนาดให้พอดีกับกริด */
                className="w-[340px] h-[300px]"
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {type && !gearType && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Gear Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols1 gap-7 sm:gap-8">
            {[
              { label: 'A', img: F23AImg },
              { label: 'H', img: F23HImg }
            ].map(({ label, img }) => (
              <motion.button
                key={label}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  const el = e.currentTarget;       // กัน SyntheticEvent pooling
                  if (!el) return;
                  // รีสตาร์ทแอนิเมชันไล่สี (ซ้าย→ขวา)
                  el.classList.remove('is-active');
                  void el.offsetWidth;              // reflow
                  el.classList.add('is-active');
                  // ให้เห็นเอฟเฟกต์ก่อน แล้วค่อยไป Step ถัดไป
                  setTimeout(() => update('gearType', label), 550);
                }}
                className="btn-sweep"
              >
                <img src={img} alt={label} className="btn-sweep-img" />
                <span className="btn-sweep-label">{label}</span>
              </motion.button>
            ))}
                        <div className="mt-4">
  <button onClick={backOneStep} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
    ย้อนกลับ
  </button>
</div>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {type && gearType && !ratio && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Ratio</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[10,15,20,25,30,40,50,60,80,100,120,160,200,240].map(r => (
              <motion.button
                key={r}
                onClick={() => update('ratio', r)}
                whileHover={{ y: -1, scale: 1.53 }}
                whileTap={{ scale: 1.57 }}
                className="
                  group relative overflow-hidden
                  rounded-2xl px-5 py-5
                  bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-200
                  text-emerald-900 font-extrabold text-xl tracking-wide
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_20px_rgba(16,185,129,0.25)]
                  ring-1 ring-emerald-400/60 hover:ring-emerald-500/70
                  transition-all
                "
              >
                <span className="relative z-10">{r}</span>
                {/* sheen */}
                <span className="pointer-events-none absolute -top-1/2 left-0 w-full h-full
                                 bg-gradient-to-b from-white/60 via-white/20 to-transparent
                                 translate-y-0 group-hover:translate-y-1/3
                                 transition-transform duration-500 ease-out" />
                {/* bottom glow edge */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1
                                 bg-gradient-to-r from-transparent via-white/60 to-transparent
                                 opacity-70" />
              </motion.button>
            ))}
                       <div className="mt-4">
  <button onClick={backOneStep} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
    ย้อนกลับ
  </button>
</div>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {type && ratio && !direction && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Junction Box Direction</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'LB', img: LBImg },
              { label: 'LF', img: LFImg },
              { label: 'LL', img: LLImg },
              { label: 'LR', img: LRImg },
              { label: 'RB', img: RBImg },
              { label: 'RF', img: HRFImg },
              { label: 'RL', img: RLImg },
              { label: 'RR', img: RRImg }
            ].map(({ label, img }) => (
              <motion.button
                key={label}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  const el = e.currentTarget;       // กัน SyntheticEvent pooling
                  if (!el) return;
                  // รีสตาร์ทแอนิเมชันไล่สี (ซ้าย→ขวา)
                  el.classList.remove('is-active');
                  void el.offsetWidth;              // reflow
                  el.classList.add('is-active');
                  // ให้เห็นเอฟเฟกต์ก่อน แล้วค่อยไป Step ถัดไป
                  setTimeout(() => update('direction', label), 550);
                }}
                className="btn-sweep"
              >
                <img src={img} alt={label} className="btn-sweep-img" />
                <span className="btn-sweep-label">{label}</span>
              </motion.button>
            ))}
                       <div className="mt-4">
  <button onClick={backOneStep} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
    ย้อนกลับ
  </button>
</div>
          </div>

        </div>
      )}

      {/* Step 5 */}
      {type && direction && !power && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Motor Power</h3>
        <div className="grid grid-cols-3 gap-3">
            {(type === 'F2' ? [15,25,40,60,90] : [100,200,400,750,1500,2200]).map(p => (
              <motion.button
                key={p}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
   const el = e.currentTarget;                 // เก็บ element กัน SyntheticEvent pooling
   if (!el) return;
   // รีสตาร์ทแอนิเมชัน spark + ไล่สีซ้าย→ขวา
   el.classList.remove('spark', 'is-active');
   void el.offsetWidth;                        // reflow
   el.classList.add('spark', 'is-active');
   // รอให้เอฟเฟกต์เล่นจบแล้วค่อยไป Step ถัดไป
   setTimeout(() => {
     el.classList.remove('spark', 'is-active');
     update('power', p);                       // <-- ย้ายมาไว้หลัง 600ms
   }, 600);
 }}
                className="btn-3d-dark"
              >
                <span className="btn-3d-label">{p}W</span>
                {/* เอฟเฟกต์สะเก็ดไฟฟ้า */}
                <span className="spark-burst" aria-hidden="true"></span>
              </motion.button>
            ))}
                       <div className="mt-4">
  <button onClick={backOneStep} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
    ย้อนกลับ
  </button>
</div>
          </div>
        </div>
      )}

      {/* Step 6 */}
      {power && !supply && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Power Supply</h3>
          <div className="flex flex-wrap gap-3">
            {(type === 'F2' ? ['C','A','S','S3'] : ['S']).map(s => (
              <motion.button
                key={s}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  const el = e.currentTarget;     // จับ element กัน SyntheticEvent pooling
                  if (!el) return;
                  // รีสตาร์ทแอนิเมชันไล่สีซ้าย→ขวา
                  el.classList.remove('is-active');
                  void el.offsetWidth;            // reflow
                  el.classList.add('is-active');
                  // ให้เห็นเอฟเฟกต์ก่อน แล้วค่อยไป Step ถัดไป
                  setTimeout(() => {
                    el.classList.remove('is-active');
                    update('supply', s);
                  }, 550);
                }}
                className="btn-3d-green"
              >
                <span className="btn-3d-label">{s}</span>
              </motion.button>
            ))}
                       <div className="mt-4">
  <button onClick={backOneStep} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
    ย้อนกลับ
  </button>
</div>
          </div>
        </div>
      )}

      {/* Step 7 */}
      {supply && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Motor Optional</h3>
          <div className="flex flex-wrap gap-3">
            {['B','F','P'].map(opt => {
              const isOn = optional.includes(opt);
              return (
                <motion.button
                  key={opt}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    const el = e.currentTarget;           // กัน SyntheticEvent pooling
                    if (!el) return;
                    // เล่นเอฟเฟกต์ไล่สีซ้าย→ขวา ก่อนค่อย toggle
                    el.classList.remove('is-active');
                    void el.offsetWidth;                  // reflow
                    el.classList.add('is-active');
                    setTimeout(() => {
                      el.classList.remove('is-active');
                      toggleOptional(opt);
                    }, 450);
                  }}
                  className={`btn-3d-green ${isOn ? 'is-on' : ''}`}
                >
                  <span className="btn-3d-label">{opt}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Final Confirm */}
      {supply && (
        <div className="pt-4">
          <h4 className="text-white">Model Code: <strong>{generateModelCode()}</strong></h4>
          <button className="px-1 py-2 bg-green-300 rounded hover:bg-green-500" onClick={() => onConfirm(generateModelCode())}>เสร็จสิ้น</button>
          <div className="mt-2">
  <button onClick={backOneStep} className="px-1 py-2 bg-gray-200 rounded hover:bg-gray-300">
    ย้อนกลับ
  </button>
</div>
        </div>
      )}
    </div>
  );
} // END renderHypoidGearFlow

export function renderRKFSFlow(state, setState, onConfirm) {
  const {
    rkfsSeries,
    rkfsDesign,
    rkfsSize,
    rkfsMotorType,
    rkfsMotorPower,
    rkfsPole,
    rkfsRatio,
    rkfsMounting,
    rkfsPosition,
    rkfsPositionSub,
    rkfsDesignSuffix
  } = state;

  const update = (key, value) => {
  const setterMap = {
    rkfsSeries:       setState.setRkfsSeries,
    rkfsDesign:       setState.setRkfsDesign,
    rkfsSize:         setState.setRkfsSize,
    rkfsMotorType:    setState.setRkfsMotorType,
    rkfsMotorPower:   setState.setRkfsMotorPower,
    rkfsPole:         setState.setRkfsPole,
    rkfsRatio:        setState.setRkfsRatio,
    rkfsMounting:     setState.setRkfsMounting,
    rkfsPosition:     setState.setRkfsPosition,
    rkfsPositionSub:  setState.setRkfsPositionSub,
    // ⬇️ เพิ่มบรรทัดนี้
    rkfsDesignSuffix: setState.setRkfsDesignSuffix,
  };

  if (setterMap[key]) {
    setterMap[key](value);
  }

  // ⬇️ เคลียร์ suffix เมื่อผู้ใช้เปลี่ยน Series/Design กันค่าค้าง
  if (key === 'rkfsSeries' || key === 'rkfsDesign') {
    setState.setRkfsDesignSuffix(null);
  }
};

  const designOptions = {
    R: ["R", "RF", "RM", "RX", "RXF"],   // ⬅️ เพิ่ม RX, RXF
    K: ["K", "KA", "KAB", "KAF", "KAT", "KAZ" ],
    F: ["F", "FA", "FAF", "FAZ", "FF"],
    S: ["S", "SA", "SAF", "SAT", "SAZ"]
  };

   // [ADD] R-Series: Motor Power options by Size (Step 5 depends on Step 3)
const rSeriesPowerBySize = {
  '17':  ["0.18","0.25","0.37","0.55","0.75","1.1"],
  '27':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '77':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11"],
  '87':  ["0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"],
  '97':  ["0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30"],
  '107': ["2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45"],
  '137': ["2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55"],
  '147': ["4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90"],
  '167': ["5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90","110"]
};

// K-Series: Motor Power options by Size
const kSeriesPowerBySize = {
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '77':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11"],
  '87':  ["0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"],
  '97':  ["1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30"],
  '107': ["3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45"],
  '127': ["7.5","9.2","11","15","18.5","22","30","37","45","55","75","90"],
  '157': ["11","15","18.5","22","30","37","45","55","75","90","110"],
  '167': ["11","15","18.5","22","30","37","45","55","75","90","110","132","160"],
  '187': ["18.5","22","30","37","45","55","75","90","110","132","160","200"]
};

// F-Series: Motor Power options by Size
const fSeriesPowerBySize = {
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '77':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '87':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5"],
  '97':  ["0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5"],
  '107': ["0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"],
  '127': ["4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75"],
  '157': ["5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90"]
};

// S-Series: Motor Power options by Size
const sSeriesPowerBySize = {
  '37':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5"],
  '47':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5"],
  '57':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3"],
  '67':  ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5"],
  '77':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5"],
  '87':  ["0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15"],
  '97':  ["0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22"]
};
  
  const ratioMapping = {
    R: {
      '17':  ['3.83','4.51','5.09','5.76','6.15','7.04','7.55','8.63','10.15','11.45','12.98','13.84','15.84','16.99','19.71','23.15','25.23','24.07','28.32','31.94','36.20','38.61','44.18','47.44','53.76','57.35','65.61','70.39','81.64'],
      '27':  ['3.37','4.00','4.27','5.00','5.60','6.59','7.63','8.16','9.41','10.13','11.86','13.28','15.63','18.08','19.35','22.32','26.09','28.37','24.47','28.78','32.47','36.79','39.25','44.90','48.17','55.87','61.30','69.47','74.11','84.78','90.96','105.49','123.91','135.09'],
      '37':  ['134.82','123.66','105.28','90.77','84.61','73.96','69.33','61.18','55.76','48.08','44.81','39.17','36.72','32.40','28.73','24.42','28.32','26.03','22.27','19.31','18.05','15.60','13.25','11.83','10.11','9.47','7.97','6.67','5.67','5.06','4.32','4.05','3.41'],
      '47':  ['176.88','162.94','139.99','121.87','110.81','100.86','88.94','84.00','75.68','68.54','64.21','56.73','52.69','47.75','42.87','36.93','34.73','30.47','26.70','23.59','33.79','31.13','26.74','23.82','21.81','20.32','17.89','16.22','14.56','12.54','11.79','10.61','9.07','8.01','7.16','6.02','5.06','5.84','4.28','4.34'],
      '57':  ['186.89','172.17','147.92','128.77','120.54','106.58','98.91','89.57','80.51','69.23','64.85','57.29','53.22','48.23','43.30','37.30','31.88','28.13','26.97','26.31','24.99','21.93','18.60','17.69','14.77','13.95','11.88','10.79','9.35','9.06','7.97','6.53','6.41','5.82','5.06','4.93','4.39'],
      '67':  ['199.81','180.47','158.14','137.67','120.91','113.94','105.83','96.91','89.11','78.17','69.75','61.26','56.89','51.56','45.29','39.88','35.00','32.27','28.83','28.13','26.72','23.44','19.89','17.95','15.79','14.91','13.54','11.54','10.00','8.70','7.79','6.36','5.70','4.93','4.29'],
      '77':  ['195.24','166.59','145.67','138.39','121.42','102.99','92.97','81.80','72.24','65.77','57.68','52.07','45.81','43.26','36.83','33.47','29.00','25.23','23.37','21.43','18.80','17.82','15.60','14.05','12.33','10.88','9.64'],
      '87':  ['246.54','205.71','185.77','162.38','142.41','118.43','106.25','93.38','81.92','72.57','63.56','54.36','47.58','41.74','36.84','32.66','27.84','23.40','21.51','17.08','15.19','13.35','11.93','9.90','9.14','8.22','7.13','6.39','5.30'],
      '97':  ['289.74','258.71','241.25','215.84','170.02','136.48','126.75','103.44','92.48','83.15','71.02','65.91','56.21','53.21','47.58','42.78','37.13','33.25','27.58','32.05','27.19','23.27','20.45','18.24','16.47','14.62','12.39','10.83','9.29','8.39','7.12','6.21','5.20','4.50'],
      '107': ['251.15','229.95','203.16','179.61','158.68','141.83','128.71','115.63','103.26','92.70','78.57','72.88','65.60','59.64','52.68','45.61','40.37','35.43','29.49','30.77','27.58','25.01','22.62','20.66','18.21','15.85','13.66','11.59','10.34','8.56','8.16','6.82','6.86','4.92'],
      '137': ['222.60','188.45','174.48','156.31','141.12','128.18','115.63','103.26','92.70','80.91','73.49','65.20','59.17','50.86','44.39','37.65','32.91','27.83','29.57','24.12','22.00','19.04','16.80','14.51','12.73','10.79','8.11','7.59','6.38','5.15'],
      '147': ['163.31','146.91','119.86','109.31','94.60','83.47','72.09','66.99','61.09','52.87','46.65','40.29','35.64','29.95','24.19','20.44','18.04','15.64','13.91','11.99','9.74','8.25','7.63','5.89','5.00'],
      '167': ['163.31','146.91','119.86','109.31','94.60','83.47','72.09','66.99','61.09','52.87','46.65','40.29','35.64','29.95','24.19','20.44','18.04','15.64','13.91','11.99','9.74','8.25','7.63','5.89','5.00']
    },
    K: {
      '37':  ['106.38','97.81','87.14','79.64','69.87','59.80','51.27','44.46','37.97','32.56','29.69','26.95','23.95','21.96','20.12','18.32','15.31','13.67','12.05','10.49','8.91','7.45','6.37','5.36'],
      '47':  ['131.87','121.48','107.37','95.16','85.12','75.66','68.30','63.85','56.93','49.31','46.65','43.90','39.93','36.21','33.00','29.61','27.24','24.81','21.56','19.41','17.08','15.27','13.25','11.77','10.65','9.35','8.56','7.36','6.08','5.81'],
      '67':  ['145.14','133.85','123.48','109.79','98.44','86.57','77.81','67.42','61.10','54.06','48.49','43.22','38.43','34.49','30.57','27.34','23.64','20.35','19.37','15.27','13.25','11.77','10.65','9.35','8.56','7.36','6.57'],
      '77':  ['192.18','179.37','154.02','135.28','128.52','110.31','97.75','88.47','77.17','73.99','63.02','58.34','51.35','44.87','40.04','34.63','30.79','26.87','25.62','22.96','20.87','17.87','15.66','13.24','12.36','10.46','8.84','7.24'],
      '87':  ['197.37','174.36','164.34','147.32','126.48','110.87','102.71','90.14','79.34','70.86','62.02','53.36','46.52','42.38','36.52','32.85','27.88','24.38','21.34','18.47','16.74','14.50','12.05','10.20','9.21','7.21'],
      '97':  ['176.05','153.91','140.23','120.38','105.13','96.83','87.69','77.59','62.55','52.87','43.37','41.87','38.32','30.82','27.45','24.75','22.37','18.96','16.56','13.85','11.99','10.41','8.71'],
      '107': ['143.47','121.46','112.41','102.16','90.96','82.35','73.30','66.52','57.17','49.90','42.33','37.89','32.69','31.85','29.00','26.02','22.56','19.74','15.84','14.65','13.43','11.73','9.94','8.69'],
      '127': ['146.07','132.14','122.48','112.18','89.98','81.98','70.95','63.25','54.07','47.82','40.19','36.25','31.57','27.61','23.91','21.15','18.66','15.03','12.79','10.74','8.68'],
      '157': ['150.41','122.39','100.25','91.26','79.75','70.38','61.02','54.29','46.79','38.02','31.45','26.87','23.55','21.64','18.17','15.86','13.42','12.65'],
      '167': ['164.50','134.99','109.83','87.86','78.14','69.00','60.74','51.77','43.30','36.61','32.98','28.77','25.62','21.57','17.34'],
      '187': ['179.86','165.21','144.59','112.66','102.16','88.00','73.96','64.04','53.36','45.50','38.57','33.25','27.92','21.16','17.18']
    },
    F: {
      '37':  ['128.51','117.88','100.36','86.53','80.65','70.50','66.09','58.24','54.54','51.70','47.02','42.30','39.65','35.91','31.69','29.00','28.98','23.88','23.63','21.57','19.53','17.27','15.81','13.63','11.08','9.46','8.97','8.04','6.74','6.05','5.24','4.92','4.20','3.77'],
      '47':  ['190.76','175.88','150.06','130.07','120.51','105.09','89.29','79.72','68.09','65.36','56.49','48.26','42.83','36.61','32.94','28.88','30.86','29.32','25.72','21.82','17.33','15.87','13.00','12.66','10.93','8.98','7.84','6.34','5.43','4.99'],
      '57':  ['199.70','183.60','157.09','136.16','120.87','110.41','93.17','82.05','72.98','63.19','54.00','50.17','44.73','38.21','35.79','30.15','40.13','34.24','29.95','25.45','21.17','18.97','15.88','13.22','12.29','10.64','8.73','7.19','6.55','5.98','5.18'],
      '67':  ['228.99','205.37','170.85','162.31','142.09','120.79','109.74','95.64','90.59','79.76','67.65','61.07','53.73','50.74','43.20','39.26','34.01','36.30','32.04','27.41','25.54','22.05','20.89','18.77','16.48','14.68','12.76','11.31','9.86','8.08','7.53','6.78','5.25','4.66','3.97'],
      '77':  ['281.71','262.93','198.31','188.31','176.47','142.27','130.08','114.45','108.48','94.93','85.52','78.56','72.50','65.22','58.32','55.27','48.37','43.58','38.23','33.74','27.91','25.54','36.58','31.51','25.50','21.43','19.70','17.49','14.06','12.04','10.06','8.96','7.39','6.16','5.16'],
      '87':  ['270.68','253.20','228.93','199.37','177.78','159.61','134.69','109.49','93.19','88.01','78.63','68.40','60.29','55.25','45.28','35.19','33.92','28.78','26.50','21.42','19.31','17.12','15.48','13.90','11.65','9.86','8.35','7.32','6.23','5.63','4.12'],
      '97':  ['276.77','253.41','223.88','189.92','174.87','156.30','140.71','127.42','112.99','102.16','97.55','89.88','86.59','80.31','75.63','72.29','65.47','58.06','52.49','45.91','38.56','32.50','43.28','36.64','33.91','30.39','27.44','24.92','22.61','20.07','17.25','15.06','12.71','11.16','9.06','7.07','6.17','5.23','4.57'],
      '107': ['254.40','231.05','210.63','178.64','161.92','149.47','127.14','101.38','94.34','88.49','83.19','77.92','67.62','58.12','50.73','43.03','37.61','31.80','33.79','27.57','25.14','21.62','19.20','16.44','14.65','12.35','9.96','8.37','6.22'],
      '127': ['170.83','153.67','125.37','114.34','98.71','87.31','75.41','70.91','63.91','55.42','48.80','40.19','37.28','31.33','25.30','26.86','24.57','21.38','18.87','16.36','14.55','10.19','8.88','6.80','5.52','4.68'],
      '157': ['267.43','217.62','178.20','162.86','141.80','125.14','108.49','96.53','85.40','78.46','68.28','52.24','46.48','40.06','32.55','27.60','53.55','43.94','35.75','28.60','25.43','19.12','16.85','13.96','11.92']
    },
    S: {
      '37':  ['157.43','144.40','122.94','106.00','98.84','96.30','86.36','71.44','63.33','55.93','53.83','51.30','43.68','37.66','35.10','30.68','28.76','25.35','22.50','19.89','19.13','18.24','15.53','13.39','12.48','10.91','10.13','8.40','6.80'],
      '47':  ['201.00','184.80','158.12','137.05','128.10','110.73','94.08','84.00','71.75','69.39','67.20','63.80','56.61','54.59','48.32','47.32','44.22','38.23','32.48','29.00','24.77','23.20','20.33','19.54','17.62','16.47','14.24','12.04','10.84','9.63','8.64','7.28'],
      '57':  ['201.00','184.80','158.12','137.05','128.10','110.73','94.08','84.00','71.75','69.39','67.20','63.80','56.61','54.59','48.32','47.32','44.22','38.23','32.48','29.00','24.77','23.20','20.33','19.54','17.62','16.47','14.24','12.04','10.84','9.23','8.64','7.28'],
      '67':  ['217.41','190.11','180.65','158.45','134.40','121.35','106.75','100.83','85.83','78.06','75.06','67.57','65.63','62.35','58.80','54.70','46.40','41.89','38.03','34.80','31.74','29.63','26.45','24.44','23.32','20.37','20.30','17.28','15.06','13.73','12.96','11.80','10.36','8.69','7.56'],
      '77':  ['256.47','225.66','214.00','189.09','161.60','148.15','130.00','123.20','107.83','97.14','85.22','75.20','75.09','71.33','66.67','63.03','56.92','53.87','49.38','43.33','41.07','35.94','32.38','28.41','25.07','22.89','22.22','20.99','18.97','18.45','17.45','15.28','13.76','12.07','10.65','9.44','8.06'],
      '87':  ['288.00','258.18','222.40','202.96','180.00','151.30','139.05','123.48','110.43','99.26','91.20','86.15','81.76','77.14','70.43','64.27','64.00','57.00','47.91','44.03','39.10','34.96','31.43','27.28','25.50','21.43','20.27','19.70','17.49','15.64','12.21','10.36','9.14','7.88'],
      '97':  ['286.40','262.22','231.67','196.52','180.95','161.74','145.60','131.85','116.92','105.71','89.60','80.85','78.26','71.43','65.45','60.59','55.79','49.87','44.65','40.95','36.05','32.60','27.63','26.39','24.13','23.59','21.23','19.23','17.05','15.42','13.07','11.41','9.55','8.26']
    }
  };


  const ratioList =
   rkfsSeries && ratioMapping[rkfsSeries]?.[rkfsSize]
      ? ratioMapping[rkfsSeries][rkfsSize]
      : [];

  const mountingImageMap = {
    R: RMTImg,
    K: KSMTImg,
    S: KSMTImg,
    F: FMTImg
  };

  return (
    <>
      {/* Step 1: Series */}
      {!rkfsSeries && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["R","K","S","F"].map(label => (
            <button
              key={label}
              onClick={() => update("rkfsSeries", label)}
              className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
            >
              <img
                src={require(`../assets/rkfs/4Series/1${label}.png`)}
                alt={`${label} Series`}
                className="w-full rounded-xl"
              />
              <p className="text-center mt-2 font-semibold text-gray-700">
                {label} Series
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Design */}
      {rkfsSeries && !rkfsDesign && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {designOptions[rkfsSeries].map(design => {
              const imageMap = {
                R: { R: RImg, RF: RFImg, RX: RXImg, RXF: RXFImg, RM: RMImg },
                K: { K: KImg, KA: KAImg, KAB: KABImg, KAF: KAFImg, KAT: KATImg, KAZ: KAZImg },
                F: { F: FImg, FA: FAImg, FAF: FAFImg, FAZ: FAZImg, FF: FFImg },
                S: { S: SImg, SA: SAImg, SAF: SAFImg, SAT: SATImg, SAZ: SAZImg }
              };
              const imgSrc = imageMap[rkfsSeries][design];
              return (
                <button
                  key={design}
                  onClick={() => update("rkfsDesign", design)}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={imgSrc} alt={design} className="w-full rounded-xl" />
                  <p className="text-center mt-2 font-semibold">{design}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => update("rkfsSeries", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 3: Size */}
      {rkfsDesign && !rkfsSize && (
        <>
          <div className="flex flex-wrap gap-4 justify-center">
            {(
              rkfsSeries === "R"
                ? ["17","27","37","47","57","67","77","87","97","107","137","147","167"]
                : rkfsSeries === "K" || rkfsSeries === "F"
                ? ["37","47","57","67","77","87","97","107","127","157","167","187"]
                : ["37","47","57","67","77","87","97"]
            ).map(size => (
              <button
                key={size}
                onClick={() => update("rkfsSize", size)}
                className="w-24 h-24 bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 rounded-xl flex items-center justify-center text-blue-800 font-bold text-lg border border-gray-300 hover:bg-blue-100"
              >
                Size {size}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => update("rkfsDesign", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 4: Motor Type */}
      {rkfsSize && !rkfsMotorType && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { type: "YE3", img: YE3Img },
              { type: "YE4", img: YE4Img },
              { type: "YEJ", img: YEJImg },
              { type: "YVP", img: YVPImg },
              { type: "YVPEJ", img: YVPEJImg },
              { type: "YB", img: YBImg }
            ].map(({ type, img }) => (
              <button
                key={type}
                onClick={() => update("rkfsMotorType", type)}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
              >
                <img src={img} alt={type} className="w-full rounded-t-xl" />
                <p className="text-center py-2 font-semibold text-gray-800">
                  {type}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => update("rkfsSize", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 5: Motor Power */}
      {rkfsMotorType && !rkfsMotorPower && (
        <>
          <div className="flex flex-wrap gap-3">
      {(() => {
        // Fallback เดิม (กรณีไม่เจอ mapping หรือยังไม่เลือก Size)
        const defaultPowerOptions = [
          "0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4",
          "5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90","110","132","160"
        ];

        // เลือกตารางตาม Series
        const tableMap = {
          R: rSeriesPowerBySize,
          K: kSeriesPowerBySize,
          F: fSeriesPowerBySize,
          S: sSeriesPowerBySize
        };

        const sizeKey = rkfsSize ? String(rkfsSize) : null; // กันกรณีได้ค่าตัวเลข
        const seriesTable = tableMap[rkfsSeries];
        const mapped = (seriesTable && sizeKey) ? seriesTable[sizeKey] : null;

        const powerOptions = mapped ?? defaultPowerOptions;

        return powerOptions.map(power => (
          <button
            key={power}
            onClick={() => update("rkfsMotorPower", power)}
            className="bg-gradient-to-br from-blue-500 to-blue-800 text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg"
            title={`${power} kW`}
          >
            {power} kW
          </button>
        ));
      })()}
    </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => update("rkfsMotorType", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 6: Pole */}
      {rkfsMotorPower && !rkfsPole && (
        <>
          <div className="flex flex-wrap gap-3">
            <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">ขนาด Pole Motor</h3>
            {["2P","4P","6P","8P"].map(pole => (
              <button
                key={pole}
                onClick={() => update("rkfsPole", pole)}
                className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
              >
                {pole}
              </button>
            ))}
          </div>
          <h2 className="text-red-500 font-bold mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">**ความเร็วรอบของมอเตอร์จะอิงตาม Pole ของมอเตอร์ 2P = 3000 rpm, 4P = 1500 rpm, 6P = 1000 rpm, 8P = 750 rpm</h2>
          <div className="mt-4 text-center">
            <button
              onClick={() => update("rkfsMotorPower", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 7: Ratio */}
      {rkfsPole && !rkfsRatio && (
        <>
          <div>
            <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">เลือกอัตราทดเกียร์ (Gear Ratio)</h3>
            <div className="flex flex-wrap gap-3">
              {ratioList.map(ratio => (
                <button
                  key={ratio}
                  onClick={() => update("rkfsRatio", ratio)}
                  className="bg-blue-600 text-white font-bold shadow px-4 py-2 rounded-xl hover:bg-blue-700"
                >
                  i = {ratio}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => update("rkfsPole", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 8: Mounting */}
      {rkfsRatio && !rkfsMounting && (
        <>
          <div>
            <h3 className="font-semibold mb-2">เลือกรูปแบบ Mounting</h3>
            <div className="flex justify-center">
              <img
                src={mountingImageMap[rkfsSeries]}
                alt="Mounting"
                className="w-full max-w-md rounded-xl shadow"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["M1","M2","M3","M4","M5","M6"].map(mount => (
                <button
                  key={mount}
                  onClick={() => update("rkfsMounting", mount)}
                  className="bg-gradient-to-br from-blue-500 to-blue-800 text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg"
                >
                  {mount}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => update("rkfsRatio", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 9: Position */}
      {rkfsMounting && !rkfsPosition && (
        <>
          <div>
            <h3 className="font-semibold mb-4 text-center">เลือกตำแหน่งกล่องสายไฟ (Terminal Box)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
              {[
                { pos: "0", img: T0Img },
                { pos: "90", img: T90Img },
                { pos: "180", img: T180Img },
                { pos: "270", img: T270Img }
              ].map(({ pos, img }) => (
                <button
                  key={pos}
                  onClick={() => update("rkfsPosition", pos)}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={img} alt={`T${pos}`} className="w-full rounded-t-xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{pos}°</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => update("rkfsMounting", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 9.2: Sub‐position */}
      {rkfsPosition && !rkfsPositionSub && (
        <>
          <div>
            <h3 className="font-semibold mb-4 text-center">เลือกตำแหน่งย่อย (เพิ่มเติม)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
              {[
                { sub: "X", img: CXImg },
                { sub: "1", img: C1Img },
                { sub: "2", img: C2Img },
                { sub: "3", img: C3Img }
              ].map(({ sub, img }) => (
                <button
                  key={sub}
                  onClick={() => update("rkfsPositionSub", sub)}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={img} alt={`C${sub}`} className="w-full rounded-t-xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{sub}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => update("rkfsPosition", null)}
              className="text-blue-600 underline"
            >
              ← ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 9.3: Design code (เฉพาะ K / S Series) */}
{rkfsSeries && rkfsDesign && rkfsPosition && rkfsPositionSub && (rkfsSeries === 'K' || rkfsSeries === 'S') && (
  <div className="mt-6">
    <h3 className="text-white font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      Step 9.3 — Design code
    </h3>

    {(() => {
      const selected = state.rkfsDesignSuffix; // ใช้ state เดิมที่เราอัปเดตใน Step 9.3
      const pick = (val) => update('rkfsDesignSuffix', val);

      // ปุ่มภาพ 3D (ภาพอยู่กึ่งกลาง, กดเลือกได้, ไฮไลท์ตอนเลือก)
      const Card = ({ img, code, label }) => (
  <button
    type="button"
    onClick={() => {
      update('rkfsDesignSuffix', code);
      // เลื่อนไป Step 10 ให้ผู้ใช้เห็น Model Code ทันที
      setTimeout(() => {
        document.getElementById('rkfs-confirm-step')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }}
    className={[
      "group w-64 h-64 sm:w-68 sm:h-68",
      "rounded-2xl border bg-white shadow-md",
      "hover:shadow-xl transition transform hover:-translate-y-0.5 active:scale-95",
      "flex flex-col items-center justify-center",
      state.rkfsDesignSuffix === code
        ? "ring-4 ring-blue-500 border-blue-300"
        : "ring-1 ring-gray-200 border-gray-200",
    ].join(" ")}
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    <img
      src={img}
      alt={label}
      className="w-64 h-64 object-contain pointer-events-none select-none"
      draggable={false}
    />
    <span className="text-red-700 font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      {label}
    </span>
  </button>
);

      // ---------- K-Series ----------
      if (rkfsSeries === 'K') {
        // K → แสดง A / B / AB
        if (rkfsDesign === 'K') {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KXXAImg}  code="A"  label="KXXA (A)"  />
              <Card img={KXXBImg}  code="B"  label="KXXB (B)"  />
              <Card img={KXXABImg} code="AB" label="KXXAB (AB)" />
            </div>
          );
        }

        // KA, KAB, KAF, KAZ → แสดง A / B
        if (['KA', 'KAB', 'KAF', 'KAZ'].includes(rkfsDesign)) {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KAXXAImg} code="A" label="KAXXA (A)" />
              <Card img={KAXXBImg} code="B" label="KAXXB (B)" />
            </div>
          );
        }

        // KAT → ต้องกด T ก่อน แล้วค่อยเลือก A/B → ได้ TA / TB
        if (rkfsDesign === 'KAT') {
          // ยังไม่ได้กด T
          if (!['T', 'TA', 'TB'].includes(selected)) {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
                <Card img={KATXXTImg} code="T" label="KATXXT (T)" />
              </div>
            );
          }
          // กด T แล้ว → เลือก A/B ต่อ (ใช้รูป KAXXA/KAXXB) → เก็บเป็น TA / TB
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KAXXAImg} code="TA" label="KAXXA (TA)" />
              <Card img={KAXXBImg} code="TB" label="KAXXB (TB)" />
            </div>
          );
        }
      }

      // ---------- S-Series ----------
      if (rkfsSeries === 'S') {
        // S → แสดง A / B / AB
        if (rkfsDesign === 'S') {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 justify-items-center">
              <Card img={SXXAImg}  code="A"  label="A"  />
              <Card img={SXXBImg}  code="B"  label="B"  />
              <Card img={SXXABImg} code="AB" label="AB" />
            </div>
          );
        }

        // SA, SAF, SAZ → แสดง A / B
        if (['SA', 'SAF', 'SAZ'].includes(rkfsDesign)) {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={SAXXAImg} code="A" label="SAXXA (A)" />
              <Card img={SAXXBImg} code="B" label="SAXXB (B)" />
            </div>
          );
        }

        // SAT → ต้องกด T ก่อน แล้วค่อยเลือก A/B → ได้ TA / TB
        if (rkfsDesign === 'SAT') {
          if (!['T', 'TA', 'TB'].includes(selected)) {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
                <Card img={SATXXTImg} code="T" label="SATXXT (T)" />
              </div>
            );
          }
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={SAXXAImg} code="TA" label="SAXXA (TA)" />
              <Card img={SAXXBImg} code="TB" label="SAXXB (TB)" />
            </div>
          );
        }
      }

      // อื่น ๆ ไม่แสดง
      return null;
    })()}
  </div>
)}

      {/* Step 10: Confirm */}
{rkfsPositionSub && (
  <div id="rkfs-confirm-step" className="text-center mt-6 space-y-4">
    <h3 className="text-white font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code</h3>

    <p className="text-white font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      {`${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}-${rkfsPosition}-${rkfsPositionSub}${state.rkfsDesignSuffix ? `-${state.rkfsDesignSuffix}` : ''}`}
    </p>

    <button
      type="button"
      onClick={() =>
        onConfirm(
          `${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}-${rkfsPosition}-${rkfsPositionSub}${state.rkfsDesignSuffix ? `-${state.rkfsDesignSuffix}` : ''}`
        )
      }
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow"
    >
      ✅ เสร็จสิ้นพร้อมดาวน์โหลด 3D Model
    </button>

    <div className="mt-4">
      <button
        type="button"
        onClick={() => update('rkfsPositionSub', null)}
        className="text-blue-600 underline"
      >
        ← ย้อนกลับ
      </button>
    </div>
  </div>
)}
</>
);  
}     


// [ADD-BLDC-IMG] Card ปุ่มรูป 3D + เด้งตอน hover (อยู่ นอกทุกฟังก์ชัน)
const ThumbCard = ({
  img,
  label,
  subtitle,
  active,
  onClick,
  className = "",
  animate,
  transition
}) => {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
         const el = e.currentTarget;               // กัน SyntheticEvent pooling
         if (el) {
           el.classList.remove('is-active');
           void el.offsetWidth;                    // reflow เพื่อรีสตาร์ทแอนิเมชัน
           el.classList.add('is-active');          // 🔋 เริ่มไล่สีเขียวซ้าย→ขวา
         }
         setTimeout(() => { onClick && onClick(e); }, 550);
       }}
      className={[
        "relative group w-[500px] h-[300px] rounded-2xl overflow-hidden",
        "thumb-sweep",
        "bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_24px_rgba(0,0,0,0.18)]",
        "transition-all duration-500 ease-out transform-gpu",
        "hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]",
        "active:scale-[0.99] active:translate-y-0.5",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:pointer-events-none",
        active ? "ring-4 ring-blue-400" : "ring-0",
        className
      ].join(" ")}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={animate}
      transition={transition}
      aria-label={label}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <img
        src={img}
        alt={label}
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:rotate-[2deg] group-hover:scale-110 pointer-events-none select-none"
        draggable={false}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 text-center bg-gradient-to-t from-black/50 to-transparent">
        <div className="text-white font-semibold drop-shadow">{label}</div>
        {subtitle && <div className="text-white/90 text-xs drop-shadow mt-0.5">{subtitle}</div>}
      </div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </motion.button>
  );
};

// [ADD] การ์ดรูปสำหรับตัวเลือก (ขนาดกะทัดรัด) — นอกทุกฟังก์ชัน
const ChoiceCard = ({
  img,
  label,
  subtitle,
  active,
  onClick,
  hidden,
  className = ""
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative group w-[320px] h-[280px] rounded-xl overflow-hidden",
        "bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(0,0,0,0.18)]",
        "transition-all duration-500 ease-out transform-gpu",
        "focus:outline-none focus:ring-0",
        hidden ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-100 translate-x-0",
        active
          ? "bg-blue-500 text-white ring-4 ring-blue-500 border-2 border-blue-500 scale-105"
          : "hover:-translate-y-0.5 hover:scale-[1.02] border border-transparent",
        className
      ].join(" ")}
      style={{
        WebkitTapHighlightColor: "transparent",
        outline: "none",
        boxSizing: "border-box",
                margin: "4px"
      }}
    >
      <img
        src={img}
        alt={label}
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
        draggable={false}
        style={{
          border: "none",
          outline: "none",
          transform: active ? "scale(1.06)" : "scale(1.02)"
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-1.5 text-center bg-gradient-to-t from-black/50 to-transparent">
        <div className="text-white text-sm font-semibold drop-shadow">{label}</div>
        {subtitle && <div className="text-white/90 text-[10px]">{subtitle}</div>}
      </div>
    </button>
  );
};

// [ADD-BLDC] BLDC Gear Motor Flow (updated with High-efficiency)
// ==============================
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
            <Section title="Step 6: Speed code" note="15S=1500rpm, 20S=2000rpm, 30S=3000rpm">
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

          {/* Confirm */}
          <div className="mt-6">
            <button disabled={!canConfirmNormal}
              onClick={() => onConfirm(generateBLDCModelCode(state))}
              className={`px-5 py-2 rounded-xl shadow ${canConfirmNormal ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
              ยืนยันรุ่น (Generate Model Code)
            </button>
          </div>
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

          {/* Confirm (HE) */}
          <div className="mt-6">
            <button
              disabled={!(canConfirmHE_S || canConfirmHE_SF || canConfirmHE_SL)}
              onClick={() => onConfirm(generateBLDCModelCode(state))}
              className={`px-5 py-2 rounded-xl shadow ${(canConfirmHE_S || canConfirmHE_SF || canConfirmHE_SL) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}>
              ยืนยันรุ่น (Generate Model Code)
            </button>
          </div>
        </>
      )}
    </>
  );
}

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