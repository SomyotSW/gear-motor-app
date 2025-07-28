// MotorFlows.js

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

export function renderACMotorFlow(state, setState, handleConfirm) {
  const {
    acMotorType, acPower, acSpeedAdjust, acVoltage,
    acOption, acGearHead, acRatio
  } = state;

  const update = (key, value) => {
    if (state[key] === value) {
      setState[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](null);
    } else {
      setState[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](value);
    }
  };

  const generateModel = () => {
    const model = [
      acMotorType?.charAt(0),
      acPower,
      acSpeedAdjust?.charAt(0),
      acVoltage?.charAt(0),
      acOption,
      acGearHead,
      acRatio
    ].filter(Boolean).join('-');
    onConfirm(model);
  };

  return (
    <div className="space-y-6 mt-6">
      {!acMotorType && (
        <div>
          <h3 className="font-semibold mb-2">Motor Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Induction Motor', img: InductionImg },
              { label: 'Reversible Motor', img: ReversibleImg },
              { label: 'Variable Speed Motor', img: VariableImg }
              ].map(({ label, img }) => (
              <button
               key={label}
               onClick={() => update('acMotorType', label)}
               className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
          >
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
              ))}
          </div>
	  <p className="text-sm text-gray-600 mt-2">
            Variable Speed motor ความเร็วรอบ 90-1350 rpm จำเป็นต้องมี Speed controller ควบคุม ( SAS Model : UX52..W ) 
          </p>
        </div>
      )}

      {acMotorType && !acPower && (
        <div>
          <h3 className="font-semibold mb-2">Power Motor</h3>
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
	      { label: '200W AC Motor', img: W200Img },
              { label: 'Special W?', img: SpecialWImg }
              ].map(({ label, img }) => (
              <button
               key={label}
               onClick={() => update('acPower', label)}
               className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
          >
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
              ))}
          </div>
        </div>
      )}

      {acPower && !acVoltage && (
        <div>
          <h3 className="font-semibold mb-2">Voltage</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
	      { label: '1Phase220V AC 50Hz', img: SingleImg },
              { label: '3Phase220V AC 50Hz', img: ThreeImg }
              ].map(({ label, img }) => (
              <button
               key={label}
               onClick={() => update('acVoltage', label)}
               className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
          >
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
              ))}
          </div>
        </div>
      )}

      {acVoltage && !acOption && (
        <div>
          <h3 className="font-semibold mb-2">SAS Optional</h3>
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
               className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
          >
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
              ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Or Special optional ?? ( Special shaft for Encoder ) 
          </p>
        </div>
      )}

      {acOption && !acGearHead && (
        <div>
          <h3 className="font-semibold mb-2">Gear Type</h3>
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
               className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
          >
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
              ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Or Special optional ?? ( Special shaft for Encoder ) 
          </p>
        </div>
      )}

      {acGearHead && !acRatio && (
        <div>
               <h3 className="font-semibold mb-2">Ratio</h3>

               {/* 🖼 ปุ่มแสดงภาพ GearBG2 ที่คลิกแล้วแสดงคำอธิบาย */}
               <div className="mb-4 text-center">
      	      <button
                 onClick={() => alert(
                  '🛠 วิธีคำนวนความเร็วรอบ:\n\nความเร็วรอบของมอเตอร์ ÷ อัตราทด = ความเร็วรอบของหัวเกียร์\n\nเช่น มอเตอร์ 1500 / 15 = 100 rpm (รอบต่อนาที)'
                 )}
                 className="mx-auto block"
                >
                 <img
                  src={require('../assets/ac/Gearhead/GearBG2.jpg')}
                  alt="Gear BG"
                  className="h-86 mx-auto cursor-pointer hover:scale-105 transition"
                 />
                 <p className="text-xs text-gray-600 mt-1">คลิกเพื่อดูวิธีคำนวณความเร็วรอบ</p>
                </button>
               </div>

               {/* 🔢 ปุ่มเลือกอัตราทด */}
               <div className="flex flex-wrap gap-2 justify-center">
                {[3, 3.6, 5, 6, 7.5, 9, 10, 12.5, 15, 18, 20, 25, 30, 36, 40, 50, 60, 75, 90, 100, 120, 150, 180, 200].map(r => (
                 <button
                  key={r}
                  onClick={() => update('acRatio', r)}
                  className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded"
                 >
                  {r}
                 </button>
                ))}
               </div>
              </div>
      )}

      {acRatio && (
        <div className="space-y-2 text-center">
          <p>Output Speed 50Hz: {(1500 / acRatio).toFixed(1)} rpm</p>
          <p>Output Speed 60Hz: {(1800 / acRatio).toFixed(1)} rpm</p>
          <button onClick={modelCode} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">เสร็จสิ้น</button>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <img src={DemoGif} alt="Demo GIF" className="w-full max-w-[600px]" />
      </div>
    </div>
  );
}
export function generateModelCode({ acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio }) {
  if (!acMotorType || !acPower || !acVoltage || !acOption || !acGearHead || !acRatio) return null;

  const phaseMap = {
    '1Phase220V': 'C',
    '3Phase220V': 'S'
  };
  const terminalSuffix = acOption === 'Terminal box' ? 'T' : '';

  const getPrefix = () => {
    const motorTypeCode = {
      'Induction Motor': 'IK',
      'Reversible Motor': 'RK',
      'Variable Speed Motor': 'IKR'
    }[acMotorType];

    const powerMap = {
      '10W': '2',
      '15W': '3',
      '25W': '4',
      '40W': '5',
      '60W': '5',
      '90W': '5',
      '120W': '5',
      '140W': '6',
      '200W': '6'
    };
    const powerCode = powerMap[acPower];

    let model = '';

    if (acPower === '10W') {
      model = `${powerCode}${motorTypeCode}10GN-${phaseMap[acVoltage]}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '15W') {
      model = `${powerCode}${motorTypeCode}15GN-${phaseMap[acVoltage]}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '25W') {
      model = `${powerCode}${motorTypeCode}25GN-${phaseMap[acVoltage]}${terminalSuffix}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '40W') {
      model = `${powerCode}${motorTypeCode}40GN-${phaseMap[acVoltage]}${terminalSuffix}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '60W') {
      const suffix = motorTypeCode === 'IKR' ? 'RGU' : 'GU';
      model = `${powerCode}${motorTypeCode}60${suffix}-${phaseMap[acVoltage]}F${terminalSuffix}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '90W') {
      const suffix = motorTypeCode === 'IKR' ? 'RGU' : 'GU';
      model = `${powerCode}${motorTypeCode}90${suffix}-${phaseMap[acVoltage]}F${terminalSuffix}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '120W') {
      const suffix = motorTypeCode === 'IKR' ? 'RGU' : 'GU';
      model = `${powerCode}${motorTypeCode}120${suffix}-${phaseMap[acVoltage]}F${terminalSuffix}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '140W') {
      const suffix = motorTypeCode === 'IKR' ? 'RGU' : 'GU';
      model = `6${motorTypeCode}140${suffix}-${phaseMap[acVoltage]}F${terminalSuffix}`;
      if (motorTypeCode === 'RK') model += 'M';
    } else if (acPower === '200W') {
      const suffix = motorTypeCode === 'IKR' ? 'RGU' : 'GU';
      model = `6${motorTypeCode}200${suffix}-${phaseMap[acVoltage]}F${terminalSuffix}`;
      if (motorTypeCode === 'RK') model += 'M';
    }

    return model;
  };

  const prefix = getPrefix();
  if (!prefix) return null;

  const suffix = `${acGearHead === 'KB' ? 'GU' : 'GN'}${acRatio}${acGearHead}`;

  return `${prefix}/${suffix}`;
}

export function renderRKFSFlow(state, setState, onConfirm) {
  const { rkfsDesign, rkfsSize, rkfsPower, rkfsMounting } = state;

  const update = (key, value) => {
    if (state[key] === value) {
      setState[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](null);
    } else {
      setState[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](value);
    }
  };

  const confirmModel = () => {
    const model = [rkfsDesign, rkfsSize, rkfsPower, rkfsMounting].filter(Boolean).join('-');
    onConfirm(model);
  };

  const descriptionMap = {
    R: 'R Series, Helical Gear Motor',
    K: 'K Series, Bevel Gear Motor',
    F: 'F Series, Parallel Shaft Gear Motor',
    S: 'S Series, Worm Gear Motor'
  };

  return (
    <div className="space-y-6 mt-6">
      {!rkfsDesign && (
	<div>
          <h3 className="font-semibold mb-2">4 Series Gear Motor</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'R Series : Helical Gear', img: RImg },
	      { label: 'K Series : Helical-Bevel Gear', img: KImg },
              { label: 'S Series : Worm Gear', img: SImg },
              { label: 'F Series : Parallel Shaft Gear', img: FImg }
              ].map(({ label, img }) => (
              <button
               key={label}
               onClick={() => update('rkfsDesign', label)}
               className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
          >
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
              ))}
          </div>
	  <p className="text-sm text-gray-600 mt-2">
            Variable Speed motor ความเร็วรอบ 90-1350 rpm จำเป็นต้องมี Speed controller ควบคุม ( SAS Model : UX52..W ) 
          </p>
        </div>
      )}

      {rkfsDesign && !rkfsSize && (
        <div className="flex flex-wrap gap-3">
          {['60', '80', '100', '120'].map(size => (
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

      {rkfsMounting && (
        <div className="text-center space-y-2">
          <p>Model: {rkfsDesign}-{rkfsSize}-{rkfsPower}-{rkfsMounting}</p>
          <button
            onClick={confirmModel}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            เสร็จสิ้น
          </button>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <img src={DemoGif} alt="Demo GIF" className="w-full max-w-[600px]" />
      </div>
    </div>
  );
}
// ❗ ส่วน render อื่น ๆ เช่น renderDCMotorFlow, renderServoFlow, renderBLDCFlow ยังสามารถเพิ่มต่อด้านล่างนี้ โดยไม่ลบหรือเปลี่ยน renderRKFSFlow ที่คุณมีอยู่เดิม
