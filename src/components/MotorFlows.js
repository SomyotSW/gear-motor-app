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

// Motor type images
import InductionImg from '../assets/ac/induction.png';
import ReversibleImg from '../assets/ac/reversible.png';
import VariableImg from '../assets/ac/variable.png';

// Voltage images
import SingleImg from '../assets/ac/Voltage/Single.png';
import ThreeImg from '../assets/ac/Voltage/Three.png';

// Optional images
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

/**
 * Generates the full model code string.
 */
export function generateModelCode({ acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio }) {
  if (!acMotorType || !acPower || !acVoltage || !acOption || !acGearHead || !acRatio) return null;

  const phaseMap = { '1Phase220V': 'C', '3Phase220V': 'S' };
  const terminalSuffix = acOption.includes('Terminal Box') ? 'T' : '';
  const typeCode = { 'Induction Motor': 'IK', 'Reversible Motor': 'RK', 'Variable Speed Motor': 'IKR' }[acMotorType];
  const prefixNum = { '10W': '2', '15W': '3', '25W': '4', '40W': '5', '60W': '5', '90W': '5', '120W': '5', '140W': '6', '200W': '6' }[acPower];

  let prefix;
  if (['60W','90W','120W','140W','200W'].includes(acPower)) {
    const gu = typeCode === 'IKR' ? 'RGU' : 'GU';
    prefix = `${prefixNum}${typeCode}${acPower.slice(0,-1)}${gu}-${phaseMap[acVoltage]}F${terminalSuffix}`;
    if (typeCode === 'RK') prefix += 'M';
  } else {
    prefix = `${prefixNum}${typeCode}${acPower.slice(0,-1)}GN-${phaseMap[acVoltage]}`;
    if (typeCode === 'RK') prefix += 'M';
    if (['25W','40W'].includes(acPower) && terminalSuffix) prefix += terminalSuffix;
  }

  const headSuffix = acGearHead.startsWith('SQUARE BOX') ? 'K' : acGearHead.startsWith('RIGHT ANGLE') ? (acGearHead.includes('SOLID')?'RT':'RC') : 'KB';
  const suffix = `${headSuffix}${acRatio}${headSuffix}`;

  return `${prefix}/${suffix}`;
}

/**
 * Renders the AC motor selection flow. 
 * @param state current selections
 * @param setters setter functions { setAcMotorType, ... }
 * @param onConfirm callback to receive final model code
 */
export function renderACMotorFlow(state, setters, onConfirm) {
  const { acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio } = state;
  const { setAcMotorType, setAcPower, setAcVoltage, setAcOption, setAcGearHead, setAcRatio } = setters;

  const update = (setter, value) => {
    setter(state[Object.keys(setters).find(k=>setters[k]===setter)] === value ? null : value);
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Motor Type */}
      {!acMotorType && (
        <div>
          <h3 className="font-semibold mb-2">Motor Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Induction Motor', img: InductionImg },
              { label: 'Reversible Motor', img: ReversibleImg },
              { label: 'Variable Speed Motor', img: VariableImg }
            ].map(({ label, img }) => (
              <button key={label} onClick={() => update(setAcMotorType, label)} className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Power */}
      {acMotorType && !acPower && (
        <div>
          <h3 className="font-semibold mb-2">Power</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: '10W', img: W10Img },
              { label: '15W', img: W15Img },
              { label: '25W', img: W25Img },
              { label: '40W', img: W40Img },
              { label: '60W', img: W60Img },
              { label: '90W', img: W90Img },
              { label: '120W', img: W120Img },
              { label: '140W', img: W140Img },
              { label: '200W', img: W200Img },
              { label: 'Special', img: SpecialWImg }
            ].map(({ label, img }) => (
              <button key={label} onClick={() => update(setAcPower, label)} className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voltage */}
      {acPower && !acVoltage && (
        <div>
          <h3 className="font-semibold mb-2">Voltage</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: '1Phase220V', img: SingleImg },
              { label: '3Phase220V', img: ThreeImg }
            ].map(({ label, img }) => (
              <button key={label} onClick={() => update(setAcVoltage, label)} className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Optional */}
      {acVoltage && !acOption && (
        <div>
          <h3 className="font-semibold mb-2">SAS Optional</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Fan', img: FanImg },
              { label: 'Terminal Box', img: TmbImg },
              { label: 'Brake', img: EmbImg },
              { label: 'Cooling Fan', img: FcfImg },
              { label: 'Thermal', img: TmpImg },
              { label: 'Standard', img: StdImg }
            ].map(({ label, img }) => (
              <button key={label} onClick={() => update(setAcOption, label)} className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gear Head */}
      {acOption && !acGearHead && (
        <div>
          <h3 className="font-semibold mb-2">Gear Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'K', img: GBKImg },
              { label: 'KB', img: GBKBImg },
              { label: 'RC', img: GBRCImg },
              { label: 'RT', img: GBRTImg }
            ].map(({ label, img }) => (
              <button key={label} onClick={() => update(setAcGearHead, label)} className="flex flex-col items-center bg-white rounded-xl p-3 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
                <img src={img} alt={label} className="h-32 mb-1 object-contain" />
                <span className="text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ratio */}
      {acGearHead && !acRatio && (
        <div>
          <h3 className="font-semibold mb-2">Ratio</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[3,3.6,5,6,7.5,9,10,12.5,15,18,20,25,30,36,40,50,60,75,90,100,120,150,180,200].map(r => (
              <button key={r} onClick={() => update(setAcRatio, r)} className="bg-blue-100 hover:bg-blue-300 px-3 py-1 rounded">
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Final */}
      {acRatio && (
        <div className="space-y-2 text-center">
          <p>Output Speed 50Hz: {(1500/acRatio).toFixed(1)} rpm</p>
          <p>Output Speed 60Hz: {(1800/acRatio).toFixed(1)} rpm</p>
          <button onClick={() => { const code = generateModelCode(state); if (code) onConfirm(code); }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">เสร็จสิ้น</button>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <img src={DemoGif} alt="Demo GIF" className="w-full max-w-[600px] object-contain" />
      </div>
    </div>
  );
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
