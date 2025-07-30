// MotorFlows.js
import React, { useState } from 'react';
import FinalSummary from '../components/FinalSummary';
import DownloadButton from '../components/DownloadButton';
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

import DemoGif from '../assets/rkfs/rkfs-demo.gif';

// ภาพแสดง Motor Type
import InductionImg from '../assets/ac/induction.png';
import ReversibleImg from '../assets/ac/reversible.png';
import VariableImg from '../assets/ac/variable.png';

import SingleImg from '../assets/ac/Voltage/Single.png';
import ThreeImg from '../assets/ac/Voltage/Three.png';

import FanImg from '../assets/ac/Optional/Fan.png';
import TmbImg from '../assets/ac/Optional/Tmb.png';
import EmbImg from '../assets/ac/Optional/Emb.png';
import FcfImg from '../assets/ac/Optional/Fcf.png';
import TmpImg from '../assets/ac/Optional/Tmp.png';
import StdImg from '../assets/ac/Optional/Std.png';

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
  const terminalSuffix = acOption === 'With Terminal Box' ? 'T' : '';

  const gearHeadCodeMap = {
    'SQUARE BOX WITH WING': 'K',
    'SQUARE BOX': 'KB',
    'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'RC',
    'RIGHT ANGLE GEAR/SOLID SHAFT': 'RT'
  };

  const gearCode = gearHeadCodeMap[acGearHead];
  if (!gearCode) return null;

  const motorTypeCode = {
    'Induction Motor': 'IK',
    'Reversible Motor': 'RK',
    'Variable Speed Motor': 'IK'
  }[acMotorType];

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
  const powerCode = powerMap[acPower];

  let model = '';

  // Build base model string
  if (['10W AC Motor','15W AC Motor'].includes(acPower)) {
    const num = acPower.replace('W AC Motor','');
    model = `${powerCode}${motorTypeCode}${num}GN-${phaseMap[acVoltage]}`;
  } else if (['25W AC Motor','40W AC Motor'].includes(acPower)) {
    const num = acPower.replace('W AC Motor','');
    model = `${powerCode}${motorTypeCode}${num}GN-${phaseMap[acVoltage]}${terminalSuffix}`;
  } else {
    const num = acPower.replace('W AC Motor','');
    const suffix = motorTypeCode === 'IKR' ? 'RGU' : 'GU';
    model = `${powerCode}${motorTypeCode}${num}${suffix}-${phaseMap[acVoltage]}F${terminalSuffix}`;
  }
  if (!model) return null;

  // Generate gear list
  const gnPrefix = 'GN';
  const guPrefix = 'GU';
  const gearList = (() => {
    const num = acRatio;
    if (['10W AC Motor','15W AC Motor','25W AC Motor','40W AC Motor'].includes(acPower)) {
      return [`${powerCode}${gnPrefix}${num}${gearCode}`];
    }
    if (acPower === '60W AC Motor') {
      return [`${powerCode}${gnPrefix}${num}${gearCode}`, `${powerCode}${guPrefix}${num}${gearCode}`];
    }
    return [`${powerCode}${guPrefix}${num}${gearCode}`];
  })();

  return gearList.map(suffix => `${model}-${suffix}`);
}

// Corrected: use lowercase onConfirm parameter
export function renderACMotorFlow(acState, acSetters, onConfirm) {
  const { acMotorType, acPower, acSpeedAdjust, acVoltage, acOption, acGearHead, acRatio } = acState;
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
    const setter = setterMap[key];
    if (setter) setter(value);
  };

  return (
    <div className="space-y-6 mt-6">
      {!acMotorType && (
        // Motor Type selection...
        <div>/* ... */</div>
      )}
      {/* ... other steps for acPower, acVoltage, acOption, acGearHead, acRatio ... */}

      {acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && (
        <div className="text-center mt-6 space-y-4">
          <h2 className="text-2xl font-bold text-blue-700">{Array.isArray(generateModelCode(acState)) ?
            generateModelCode(acState).join(', ') : generateModelCode(acState)}</h2>
          <div>
            <p>Output Speed 50Hz: {(1500 / acRatio).toFixed(1)} rpm</p>
            <p>Output Speed 60Hz: {(1800 / acRatio).toFixed(1)} rpm</p>
          </div>

          {Array.isArray(generateModelCode(acState)) && (
            <>
              <p className="text-lg font-semibold text-gray-700">กรุณาเลือกรุ่นที่ต้องการดาวน์โหลด:</p>
              <div className="flex flex-col items-center space-y-2">
                {generateModelCode(acState).map((code, idx) => (
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
            </>
          )}

          <button
            onClick={() => {
              const modelCode = Array.isArray(generateModelCode(acState)) ? selectedModel : generateModelCode(acState);
              if (modelCode) onConfirm(modelCode);
            }}
            className="mt-2 px-5 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
          >
            เสร็จสิ้น
          </button>

          <FinalResult
            modelCode={Array.isArray(generateModelCode(acState)) ? selectedModel : generateModelCode(acState)}
            downloadLink={`https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${
              Array.isArray(generateModelCode(acState)) ? selectedModel : generateModelCode(acState)
            }.stp`}
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
      {/* RKFS flow... */}
      {rkfsDesign && rkfsSize && rkfsPower && rkfsMounting && (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Model Code: {modelCode}</p>
          <button onClick={() => onConfirm(modelCode)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">เสร็จสิ้น</button>
          <a href={`https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${modelCode}.stp`} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">⬇ Download 3D File</a>
        </div>
      )}
      <div className="flex justify-center mt-10">
        <img src={DemoGif} alt="Demo GIF" className="w-full max-w-[600px]" />
      </div>
    </div>
  );
}
