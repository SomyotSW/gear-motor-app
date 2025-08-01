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

import RImg from '../assets/rkfs/4Series/R.png';
import KImg from '../assets/rkfs/4Series/K.png';
import FImg from '../assets/rkfs/4Series/F.png';
import SImg from '../assets/rkfs/4Series/S.png';

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

// Generate model code list based on selections
export function generateModelCode({ acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio }) {
  if (!acMotorType || !acPower || !acVoltage || !acOption || !acGearHead || !acRatio) return null;

  const phaseMap = { '1Phase220V AC 50Hz': 'C', '3Phase220V AC 50Hz': 'S' };
  let term = '';
  if (acOption === 'With Fan') term = 'F';
  else if (acOption === 'With Terminal Box') term = 'T';
  else if (acOption === 'With Force cooling Fan') term = 'FF';
  else if (acOption === 'With Electromagnetic Brake') term = 'M';
  else if (acOption === 'With Thermal Protection') term = 'P';

  const gearHeadMap = {
    'SQUARE BOX WITH WING': 'K',
    'SQUARE BOX': 'KB',
    'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'RC',
    'RIGHT ANGLE GEAR/SOLID SHAFT': 'RT'
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
  if (!phase || !gearCode || !motorCode || !powerCode) return null;

  const num = acPower.replace('W AC Motor', '');
  let base = '';

  if (['10', '15'].includes(num)) {
  base = `${powerCode}${motorCode}${num}GN-${phase}`;
  } else if (['25', '40', '60'].includes(num)) {
  base = `${powerCode}${motorCode}${num}GN-${phase}${term}`;
  } else {
  if (['60', '90'].includes(num)) {
    base = `${powerCode}${motorCode}${num}GU-${phase}`;
  } else if (['120', '140', '200'].includes(num)) {
    base = `${powerCode}${motorCode}${num}GU-${phase}${term}`;
  } else {
    const suffix = motorCode === 'IK' ? 'RGU' : 'GU';
    base = `${powerCode}${motorCode}${num}${suffix}-${phase}F${term}`;
  }

  const prefixes = num === '60' ? ['GN', 'GU'] : ['GN', 'GU'];
  const list = prefixes.map(pref => `${powerCode}${pref}${acRatio}${gearCode}`);
  return list.map(item => `${base}-${item}`);
}
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
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition"
              >
                <img src={img} alt={label} className="h-48 mb-1 object-contain" />
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
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition"
              >
                <img src={img} alt={label} className="h-48 mb-1 object-contain" />
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
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition"
              >
                <img src={img} alt={label} className="h-48 mb-1 object-contain" />
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
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition"
              >
                <img src={img} alt={label} className="h-48 mb-1 object-contain" />
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
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition"
              >
                <img src={img} alt={label} className="h-48 mb-1 object-contain" />
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
            {[3,3.6,5,6,7.5,9,10,12.5,15,18,20,25,30,36,40,50,60,75,90,100,120,150,180,200].map(ratio => (
              <button
                key={ratio}
                onClick={() => update('acRatio', ratio)}
                className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded"
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
          <div className="flex gap-4">
            <button onClick={() => update('type', 'F2')} className="button">F2</button>
            <button onClick={() => update('type', 'F3')} className="button">F3</button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {type && !gearType && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Gear Type</h3>
          <div className="flex gap-4">
            <button onClick={() => update('gearType', 'H')} className="button">Hollow Shaft (H)</button>
            <button onClick={() => update('gearType', 'A')} className="button">Solid Shaft (A)</button>
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
          <div className="grid grid-cols-4 gap-2">
            {["RL","RR","RF","RB","LL","LR","LF","LB"].map(d => (
              <button key={d} onClick={() => update('direction', d)} className="button">{d}</button>
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
  const { rkfsDesign, rkfsSize, rkfsPower, rkfsMounting } = state;
  const update = (key, value) => {
    const setter = setState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (setter) setter(state[key] === value ? null : value);
  };
  const modelCode = rkfsDesign && rkfsSize && rkfsPower && rkfsMounting
    ? `${rkfsDesign}-${rkfsSize}-${rkfsPower}-${rkfsMounting}`
    : '';

  return (
    <div className="space-y-6 mt-6">
      {/* Design Selection */}
      {!rkfsDesign && (
        <div>
          <h3 className="font-semibold mb-2">4 Series Gear Motor</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'R Series', img: RImg },
              { label: 'K Series', img: KImg },
              { label: 'S Series', img: SImg },
              { label: 'F Series', img: FImg }
            ].map(({ label, img }) => (
              <button
                key={label}
                onClick={() => update('rkfsDesign', label)}
                className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition"
              >
                <img src={img} alt={label} className="h-48 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Design Selection */}
      {rkfsDesign && !rkfsSize && (
        <div className="flex flex-wrap gap-3">
          {['FOOT-MOUNTED', 'FLANGE-MOUNTED', 'FOOT&FLANGE', 'RM DESIGN'].map(size => (
            <button
              key={size}
              onClick={() => update('rkfsSize', size)}
              className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded"
            >
              Size {size}
            </button>
          ))}
        </div>
      )}

      {/* Power Selection */}
      {rkfsSize && !rkfsPower && (
        <div className="flex flex-wrap gap-3">
          {['0.2kW', '0.4kW', '0.75kW', '1.5kW', '2.2kW'].map(power => (
            <button
              key={power}
              onClick={() => update('rkfsPower', power)}
              className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded"
            >
              {power}
            </button>
          ))}
        </div>
      )}

      {/* Mounting Selection */}
      {rkfsPower && !rkfsMounting && (
        <div className="flex flex-wrap gap-3">
          {['Foot', 'Flange', 'Both'].map(mount => (
            <button
              key={mount}
              onClick={() => update('rkfsMounting', mount)}
              className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded"
            >
              {mount}
            </button>
          ))}
        </div>
      )}

      {/* Final Summary */}
      {rkfsMounting && (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Model Code: {modelCode}</p>
          <button
            onClick={() => onConfirm(modelCode)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            เสร็จสิ้น
          </button>
          <a
            href={`https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${modelCode}.STEP`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ⬇ Download 3D File
          </a>
        </div>
      )}

      {/* Demo GIF */}
      <div className="flex justify-center mt-10">
        <img src={RKFSImg} alt="RKFS Series" className="w-full max-w-[600px]" />
      </div>
    </div>
  );
}