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
  const { rkfsSeries, rkfsDesign, rkfsSize, rkfsPower, rkfsMounting } = rkfsState;
const { setRkfsSeries, setRkfsDesign, setRkfsSize, setRkfsPower, setRkfsMounting } = rkfsSetters;

const update = (key, value) => {
  const setterMap = {
    rkfsSeries: setRkfsSeries,
    rkfsDesign: setRkfsDesign,
    rkfsSize: setRkfsSize,
    rkfsPower: setRkfsPower,
    rkfsMounting: setRkfsMounting,
  };
  const setter = setterMap[key];
  if (setter) setter(value);
};

  const designOptions = {
    R: ['R', 'RF', 'RM'],
    K: ['K', 'KA', 'KAB', 'KAF', 'KAT', 'KAZ', 'KF'],
    F: ['F', 'FA', 'FAF', 'FAZ', 'FF'],
    S: ['S', 'SA', 'SAF', 'SAT', 'SAZ']
  };

  const ratioList =
    rkfsDesign?.startsWith('R') && ['17','27','37','47','57','67','77','87','97','107','137','147','167'].includes(rkfsSize)
      ? ['15.33', '20.45', '30.55', '41.12']
      : rkfsDesign?.startsWith('K') && ['37','47','57','67','77','87','97','107','127','157','167','187'].includes(rkfsSize)
      ? ['25.5', '35.3', '45.8', '60.4']
      : rkfsDesign?.startsWith('F') && ['37','47','57','67','77','87','97','107','127','157','167','187'].includes(rkfsSize)
      ? ['22.4', '28.5', '35.9', '42.6']
      : rkfsDesign?.startsWith('S') && ['37','47','57','67','77','87','97'].includes(rkfsSize)
      ? ['18.6', '22.3', '27.7', '34.6']
      : [];

  const mountingImageMap = {
    R: '/assets/rkfs/RMT.png',
    K: '/assets/rkfs/KSMT.png',
    S: '/assets/rkfs/KSMT.png',
    F: '/assets/rkfs/FMT.png'
  };

  return (
    <div className="space-y-6 mt-6">
      {/* ✅ Step 1: Select Series with image */}
{!rkfsSeries && (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {[
      { label: 'R', img: require('../assets/rkfs/4Series/1R.png') },
      { label: 'K', img: require('../assets/rkfs/4Series/1K.png') },
      { label: 'F', img: require('../assets/rkfs/4Series/1F.png') },
      { label: 'S', img: require('../assets/rkfs/4Series/1S.png') }
    ].map(({ label, img }) => (
      <div key={label} className="cursor-pointer" onClick={() => update('rkfsSeries', label)}>
        <img src={img} alt={`${label} Series`} className="rounded-xl shadow-lg hover:scale-105 transition" />
        <p className="text-center mt-2 font-semibold text-black">{label} Series</p>
      </div>
    ))}
  </div>
)}

      {/* Step 2: Select Design */}
      {rkfsSeries && !rkfsDesign && (
        <div className="flex flex-wrap gap-3">
          {designOptions[rkfsSeries].map(design => (
            <button key={design} onClick={() => update('rkfsDesign', design)} className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">
              {design}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Select Size */}
      {rkfsDesign && !rkfsSize && (
        <div className="flex flex-wrap gap-3">
          {rkfsSeries === 'R' && ['17','27','37','47','57','67','77','87','97','107','137','147','167'].map(size => (
            <button key={size} onClick={() => update('rkfsSize', size)} className="bg-blue-200 hover:bg-blue-400 px-4 py-2 rounded">
              Size {size}
            </button>
          ))}
          {rkfsSeries === 'K' && ['37','47','57','67','77','87','97','107','127','157','167','187'].map(size => (
            <button key={size} onClick={() => update('rkfsSize', size)} className="bg-blue-200 hover:bg-blue-400 px-4 py-2 rounded">
              Size {size}
            </button>
          ))}
          {rkfsSeries === 'S' && ['37','47','57','67','77','87','97'].map(size => (
            <button key={size} onClick={() => update('rkfsSize', size)} className="bg-blue-200 hover:bg-blue-400 px-4 py-2 rounded">
              Size {size}
            </button>
          ))}
          {rkfsSeries === 'F' && ['37','47','57','67','77','87','97','107','127','157','167','187'].map(size => (
            <button key={size} onClick={() => update('rkfsSize', size)} className="bg-blue-200 hover:bg-blue-400 px-4 py-2 rounded">
              Size {size}
            </button>
          ))}
        </div>
      )}

      {/* Step 4: Select Motor Type */}
      {rkfsSize && !rkfsMotorType && (
        <div className="flex flex-wrap gap-3">
          {['YE3', 'YE4', 'YEJ', 'YVP', 'YVPEJ', 'YB'].map(type => (
            <button key={type} onClick={() => update('rkfsMotorType', type)} className="bg-gradient-to-br from-blue-400 to-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow">
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Step 5: Select Motor Power */}
      {rkfsMotorType && !rkfsMotorPower && (
        <div className="flex flex-wrap gap-3">
          {['0.18','0.25','0.37','0.55','0.75','1.1','1.5','2.2','3','4','5.5','7.5','9.2','11','15','18.5','22','30','37','45','55','75','90','110','132','160'].map(power => (
            <button key={power} onClick={() => update('rkfsMotorPower', power)} className="bg-gradient-to-br from-blue-500 to-blue-800 text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg">
              {power} kW
            </button>
          ))}
        </div>
      )}

      {/* Step 6: Select Pole */}
      {rkfsMotorPower && !rkfsPole && (
        <div className="flex flex-wrap gap-3">
          {['2P', '4P', '6P', '8P'].map(pole => (
            <button key={pole} onClick={() => update('rkfsPole', pole)} className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow">
              {pole}
            </button>
          ))}
        </div>
      )}

      {/* Step 7: Select Ratio */}
      {rkfsPole && !rkfsRatio && (
        <div>
          <h3 className="font-semibold mb-2">เลือกอัตราทดเกียร์ (Gear Ratio)</h3>
          <div className="flex flex-wrap gap-3">
            {ratioList.map((ratio) => (
              <button
                key={ratio}
                onClick={() => update('rkfsRatio', ratio)}
                className="bg-blue-600 text-white font-bold shadow px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                i = {ratio}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 8: Select Mounting */}
      {rkfsRatio && !rkfsMounting && (
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
            {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map(mount => (
              <button
                key={mount}
                onClick={() => update('rkfsMounting', mount)}
                className="bg-gradient-to-br from-blue-500 to-blue-800 text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg"
              >
                {mount}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 9: Terminal Box Position + Sub */}
      {rkfsMounting && !rkfsPosition && (
        <div>
          <h3 className="font-semibold mb-2">เลือกตำแหน่งกล่องสายไฟ (Terminal Box)</h3>
          <div className="flex flex-wrap gap-3">
            {['0', '90', '180', '270'].map(pos => (
              <button
                key={pos}
                onClick={() => update('rkfsPosition', pos)}
                className="bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg"
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      )}

      {rkfsPosition && !rkfsPositionSub && (
        <div>
          <h3 className="font-semibold mb-2">เลือกตำแหน่งย่อย (เพิ่มเติม)</h3>
          <div className="flex flex-wrap gap-3">
            {['X', '2', '3', '4'].map(sub => (
              <button
                key={sub}
                onClick={() => update('rkfsPositionSub', sub)}
                className="bg-gradient-to-br from-blue-600 to-blue-900 text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 10: Final Summary + Download */}
      {rkfsPositionSub && (
        <div className="text-center mt-6 space-y-4">
          <h3 className="text-lg font-bold">Model Code</h3>
          <p className="text-xl text-blue-700 font-semibold">
            {`${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}-${rkfsPosition}-${rkfsPositionSub}`}
          </p>
          <button
            onClick={() => onConfirm(`${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}-${rkfsPosition}-${rkfsPositionSub}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow"
          >
            ✅ เสร็จสิ้น
          </button>
          <a
            href={`https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}-${rkfsPosition}-${rkfsPositionSub}.STEP`}
            className="inline-block bg-green-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-green-700 shadow"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⬇ ดาวน์โหลด 3D Model
          </a>
        </div>
      )}
    </div>
  );
}