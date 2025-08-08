// MotorFlows.js
import React, { useState } from 'react';
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
import RMImg from '../assets/rkfs/RM.png';

import KImg from '../assets/rkfs/K.png';
import KAImg from '../assets/rkfs/KA.png';
import KABImg from '../assets/rkfs/KAB.png';
import KAFImg from '../assets/rkfs/KAF.png';
import KATImg from '../assets/rkfs/KAT.png';
import KAZImg from '../assets/rkfs/KAZ.png';
import KFImg from '../assets/rkfs/KF.png';
import KAAAImg from '../assets/rkfs/KAAA.png';
import KAABImg from '../assets/rkfs/KAAB.png';
import KAAABImg from '../assets/rkfs/KAAAB.png';

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
import GBKBImg from '../assets/ac/Gearhead/KB.png';
import GBRCImg from '../assets/ac/Gearhead/RC.png';
import GBRTImg from '../assets/ac/Gearhead/RT.png';

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
    'With Force cooling Fan': 'FF',
    'With Electromagnetic Brake': 'M',
    'With Thermal Protection': 'P'
  };

  const gearHeadMap = {
    'SQUARE BOX WITH WING': 'K',
    'SQUARE BOX': 'KB',
    'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'RC',
    'RIGHT ANGLE GEAR/SOLID SHAFT': 'RT'
  };

  const motorMap = {
    'Induction Motor': 'IK',
    'Reversible Motor': 'RK',
    'Variable Speed Motor': 'IK' // ด้านหน้าใช้ IK เหมือนกัน
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
  const term = optionMap[acOption] || '';
  const num = acPower.replace('W AC Motor', '');

  if (!phase || !gearCode || !motorCode || !powerCode || !num) return null;

  // ตรวจสอบว่าเป็น Variable Speed Motor หรือไม่
  const isVariable = acMotorType === 'Variable Speed Motor';
  const frontSuffixGN = isVariable ? 'RGN' : 'GN';
  const frontSuffixGU = isVariable ? 'RGU' : 'GU';



  const results = [];

  if (['10', '15', '25', '40'].includes(num)) {
    const front = `${powerCode}${motorCode}${num}${frontSuffixGN}-${phase}${term}`;
    const end = `${powerCode}GN${acRatio}${gearCode}`;
    results.push(`${front}-${end}`);
  } else if (num === '60') {
    const frontGN = `${powerCode}${motorCode}${num}${frontSuffixGN}-${phase}${term}`;
    const frontGU = `${powerCode}${motorCode}${num}${frontSuffixGU}-${phase}${term}`;
    const endGN = `${powerCode}GN${acRatio}${gearCode}`;
    const endGU = `${powerCode}GU${acRatio}${gearCode}`;
    results.push(`${frontGN}-${endGN}`);
    results.push(`${frontGU}-${endGU}`);
  } else {
    const front = `${powerCode}${motorCode}${num}${frontSuffixGU}-${phase}${term}`;
    const end = `${powerCode}GU${acRatio}${gearCode}`;
    results.push(`${front}-${end}`);
  }

  return results;
}
// Render AC Motor Flow: Motor Type → Power → Voltage → Optional → Gear Type → Ratio → Summary
export default function ACMotorFlow({ acState, acSetters, onConfirm }) {
  const { acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio } = acState;
  const [selectedModel, setSelectedModel] = useState(null);

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

  return (
    <div className="space-y-6 mt-6">
      {/* Motor Type Selection */}
      {!acMotorType && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Motor Type
                    </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Induction Motor', img: InductionImg },
              { label: 'Reversible Motor', img: ReversibleImg },
              { label: 'Variable Speed Motor', img: VariableImg }
            ].map(({ label, img }) => (
              <button
  		key={label}
  		onClick={() => update('acMotorType', label)}
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>
                    <p className="text-sm text-gray-600 mt-2">
            Variable Speed motor ความเร็วรอบ 90-1350 rpm จำเป็นต้องมี Speed controller ควบคุม (SAS Model: UX52..W)
          </p>
        </div>
      )}

      {/* Power Selection */}
      {acMotorType && !acPower && (
        <div>
	    <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Power Motor
                    </h3>
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
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>
        </div>
      )}

      {/* Voltage Selection */}
      {acPower && !acVoltage && (
        <div>
	    <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Voltage
                    </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: '1Phase220V AC 50Hz', img: SingleImg },
              { label: '3Phase220V AC 50Hz', img: ThreeImg }
            ].map(({ label, img }) => (
              <button
  		key={label}
  		onClick={() => update('acVoltage', label)}
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>
        </div>
      )}

      {/* Optional Selection */}
      {acVoltage && !acOption && (
        <div>
	  <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Motor Optional
                    </h3>
          <p className="text-sm text-red-600 mt-3">
            **AC Motor 60W-200W จำเป็นต้องเลือกปุ่ม "With Fan" แทน Standard
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'With Fan', img: FanImg },
              { label: 'With Terminal Box', img: TmbImg },
              { label: 'With Electromagnetic Brake', img: EmbImg },
              { label: 'With Force Cooling Fan', img: FcfImg },
              { label: 'With Thermal Protector', img: TmpImg },
              { label: 'Standard', img: StdImg }
            ].map(({ label, img }) => (
              <button
  		key={label}
  		onClick={() => update('acOption', label)}
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>
                    <p className="text-sm text-gray-600 mt-2">
            **หากไม่ต้องการ Option เสริม เลือกปุ่ม "STANDARD"ได้เลยครับ
          </p>
        </div>
      )}

      {/* Gearhead Selection */}
      {acOption && !acGearHead && (
        <div>
	  <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Gear Type
                    </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'SQUARE BOX WITH WING', img: GBKImg },
              { label: 'SQUARE BOX', img: GBKBImg },
              { label: 'RIGHT ANGLE GEAR/HOLLOW SHAFT', img: GBRCImg },
              { label: 'RIGHT ANGLE GEAR/SOLID SHAFT', img: GBRTImg }
            ].map(({ label, img }) => (
              <button
  		key={label}
  		onClick={() => update('acGearHead', label)}
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>
        </div>
      )}

      {/* Ratio Selection */}
      {acGearHead && !acRatio && (
        <div>
	  <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Ratio Selection
                    </h3>
          <div className="flex flex-wrap gap-2 justify-center">
	    <p className="text-sm text-white-600 mt-2">
            สูตรการหาความเร็วรอบ ( rpm ) = ความเร็วรอบมอเตอร์ / อัตราทด : 
            : เช่น มอเตอร์ 1Phase220VAC 4Pole, 1500 rpm , Gear Head อัตราทด 1:30 
            : 1500 / 30 = 50 rpm , จะได้ความเร็วรอบจาก Gear Head = 30 รอบ/นาที 
          </p>
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

      {/* Final Summary and Download */}
      {acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && (
        <div className="text-center space-y-4 mt-6">
          <h2 className="text-2xl font-bold text-blue-700">
            {Array.isArray(codes) ? codes.join(', ') : codes}
          </h2>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'F2 Series', img: F2Img },
              { label: 'F3 Series', img: F3Img }
            ].map(({ label, img }) => (
              <button
  		key={label}
  		onClick={() => update('type', label)}
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {type && !gearType && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Gear Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'A', img: F23AImg },
              { label: 'H', img: F23HImg }
            ].map(({ label, img }) => (
              <button
  		key={label}
  		onClick={() => update('gearType', label)}
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 */}
      {type && gearType && !ratio && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Ratio</h3>
          <div className="grid grid-cols-4 gap-2">
            {[10,15,20,25,30,40,50,60,80,100,120,160,200,240].map(r => (
              <button key={r} onClick={() => update('ratio', r)} className="button">{r}</button>
            ))}
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
              <button
  		key={label}
  		onClick={() => update('direction', label)}
  		className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition 
             		transform hover:-translate-y-1 active:scale-105"
	             >
  		<img src={img} alt={label} className="h-64 mb-2 object-contain" />
  		<span className="text-sm font-semibold">{label}</span>
                             </button>
            ))}
          </div>

        </div>
      )}

      {/* Step 5 */}
      {type && direction && !power && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Motor Power</h3>
          <div className="grid grid-cols-3 gap-2">
            {(type === 'F2'
              ? [15,25,40,60,90]
              : [100,200,400,750,1500,2200]).map(p => (
                <button key={p} onClick={() => update('power', p)} className="button">{p}W</button>
              ))}
          </div>
        </div>
      )}

      {/* Step 6 */}
      {power && !supply && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Power Supply</h3>
          <div className="flex flex-wrap gap-2">
            {(type === 'F2'
              ? ['C','A','S','S3']
              : ['S']).map(s => (
                <button key={s} onClick={() => update('supply', s)} className="button">{s}</button>
              ))}
          </div>
        </div>
      )}

      {/* Step 7 */}
      {supply && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Motor Optional</h3>
          <div className="flex gap-3">
            {['B','F','P'].map(opt => (
              <button
                key={opt}
                className={`button ${optional.includes(opt) ? 'bg-blue-700 text-white' : ''}`}
                onClick={() => toggleOptional(opt)}>{opt}</button>
            ))}
          </div>
        </div>
      )}

      {/* Final Confirm */}
      {supply && (
        <div className="pt-4">
          <h4 className="text-white">Model Code: <strong>{generateModelCode()}</strong></h4>
          <button className="mt-4 button bg-green-600" onClick={() => onConfirm(generateModelCode())}>เสร็จสิ้น</button>
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
    rkfsPositionSub
  } = state;

  const update = (key, value) => {
    const setter = setState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (setter) setter(value);
  };

  const designOptions = {
    R: ["R", "RF", "RM"],
    K: ["K", "KA", "KAB", "KAF", "KAT", "KAZ", "KF"],
    F: ["F", "FA", "FAF", "FAZ", "FF"],
    S: ["S", "SA", "SAF", "SAT", "SAZ"]
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
                R: { R: RImg, RF: RFImg, RM: RMImg },
                K: { K: KImg, KA: KAImg, KAB: KABImg, KAF: KAFImg, KAT: KATImg, KAZ: KAZImg, KF: KFImg },
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
            {[
              "0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4",
              "5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90","110","132","160"
            ].map(power => (
              <button
                key={power}
                onClick={() => update("rkfsMotorPower", power)}
                className="bg-gradient-to-br from-blue-500 to-blue-800 text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg"
              >
                {power} kW
              </button>
            ))}
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
            <h3 className="font-semibold mb-2">เลือกอัตราทดเกียร์ (Gear Ratio)</h3>
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
                { sub: "2", img: C1Img },
                { sub: "3", img: C2Img },
                { sub: "4", img: C3Img }
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

      {/* Step 10: Confirm */}
      {rkfsPositionSub && (
        <>
          <div className="text-center mt-6 space-y-4">
            <h3 className="text-lg font-bold">Model Code</h3>
            <p className="text-xl text-blue-700 font-semibold">
              {`${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}-${rkfsPosition}-${rkfsPositionSub}`}
            </p>
            <button
              onClick={() =>
                onConfirm(
                  `${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}-${rkfsPosition}-${rkfsPositionSub}`
                )
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow"
            >
              ✅ เสร็จสิ้นพร้อมดาวน์โหลด 3D Model
            </button>
            <div className="mt-4">
              <button
                onClick={() => update("rkfsPositionSub", null)}
                className="text-blue-600 underline"
              >
                ← ย้อนกลับ
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}