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

import RImg from '../assets/rkfs/R.png';
import KImg from '../assets/rkfs/K.png';
import FImg from '../assets/rkfs/F.png';
import SImg from '../assets/rkfs/S.png';

import KHead from '../assets/ac/K.png';
import KBHead from '../assets/ac/KB.png';
import RCHead from '../assets/ac/RC.png';
import RTHead from '../assets/ac/RT.png';

import DemoGif from '../assets/rkfs/rkfs-demo.gif';

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

export function renderACMotorFlow(state, setState, onConfirm) {
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
      acOption?.charAt(0),
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
          <div className="flex flex-wrap gap-3">
            {['Induction Motor', 'Reversible Motor', 'Torque Motor'].map(type => (
              <button key={type} onClick={() => update('acMotorType', type)}
                className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">{type}</button>
            ))}
          </div>
        </div>
      )}

      {acMotorType && !acPower && (
        <div>
          <h3 className="font-semibold mb-2">Power Motor</h3>
          <div className="flex flex-wrap gap-3">
            {['10W','15W','25W','40W','60W','90W','120W','140W','200W','Special W ?'].map(w => (
              <button key={w} onClick={() => update('acPower', w)}
                className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">{w}</button>
            ))}
          </div>
          <p className="text-sm mt-2 text-gray-600">Flame Size: 60, 60, 70, 70, 80, 90, 90, 104, 104 mm ตามลำดับ</p>
        </div>
      )}

      {acPower && !acSpeedAdjust && (
        <div>
          <h3 className="font-semibold mb-2">การปรับความเร็วรอบของมอเตอร์</h3>
          <div className="flex gap-4">
            <button onClick={() => update('acSpeedAdjust', 'Fixed')} className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">ไม่ปรับสปีด</button>
            <button onClick={() => update('acSpeedAdjust', 'Variable')} className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">ปรับสปีดได้</button>
          </div>
        </div>
      )}

      {acSpeedAdjust && !acVoltage && (
        <div>
          <h3 className="font-semibold mb-2">Voltage</h3>
          <div className="flex gap-4">
            <button onClick={() => update('acVoltage', 'C')} className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">1Phase220V</button>
            <button onClick={() => update('acVoltage', 'S')} className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">3Phase220V</button>
          </div>
        </div>
      )}

      {acVoltage && !acOption && (
        <div>
          <h3 className="font-semibold mb-2">Optional</h3>
          <div className="flex flex-wrap gap-3">
            {['T', 'P', 'F', 'FF', 'M'].map(opt => (
              <button key={opt} onClick={() => update('acOption', opt)}
                className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">{opt}</button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            T = Terminal Box | P = Thermal Protector | F = Fan | FF = Force Cooling Fan | M = Electromagnetic Brake
          </p>
        </div>
      )}

      {acOption && !acGearHead && (
        <div>
          <h3 className="font-semibold mb-2">Gear Type</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{key: 'K', img: KHead}, {key: 'KB', img: KBHead}, {key: 'RC', img: RCHead}, {key: 'RT', img: RTHead}].map(head => (
              <div key={head.key} className="text-center">
                <img src={head.img} alt={head.key}
                  onClick={() => update('acGearHead', head.key)}
                  className="cursor-pointer hover:scale-105 transition mx-auto" />
                <p className="text-sm mt-1 text-gray-700">
                  {head.key === 'K' && 'K = Square box with wing'}
                  {head.key === 'KB' && 'KB = Square box'}
                  {head.key === 'RC' && 'RC = Right angle / Hollow shaft'}
                  {head.key === 'RT' && 'RT = Right angle / Solid shaft'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {acGearHead && !acRatio && (
        <div>
          <h3 className="font-semibold mb-2">Ratio</h3>
          <div className="flex flex-wrap gap-2">
            {[3,3.6,5,6,7.5,9,10,12.5,15,18,20,25,30,36,40,50,60,75,90,100,120,150,180,200].map(r => (
              <button key={r} onClick={() => update('acRatio', r)}
                className="bg-blue-100 hover:bg-blue-300 px-3 py-1 rounded">{r}</button>
            ))}
          </div>
        </div>
      )}

      {acRatio && (
        <div className="space-y-2 text-center">
          <p>Output Speed 50Hz: {(1500 / acRatio).toFixed(1)} rpm</p>
          <p>Output Speed 60Hz: {(1800 / acRatio).toFixed(1)} rpm</p>
          <button onClick={generateModel} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">เสร็จสิ้น</button>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <img src={DemoGif} alt="Demo GIF" className="w-full max-w-[400px]" />
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
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[{key: 'R', img: RImg}, {key: 'K', img: KImg}, {key: 'F', img: FImg}, {key: 'S', img: SImg}].map(type => (
            <div key={type.key} className="text-center">
              <img
                src={type.img}
                alt={type.key}
                onClick={() => update('rkfsDesign', type.key)}
                className="cursor-pointer hover:scale-105 transition mx-auto"
              />
              <p className="mt-2">{descriptionMap[type.key]}</p>
            </div>
          ))}
        </div>
      )}
      {rkfsDesign && !rkfsSize && (
        <div className="flex flex-wrap gap-3">
          {['60', '80', '100', '120'].map(size => (
            <button key={size} onClick={() => update('rkfsSize', size)}
              className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">Size {size}</button>
          ))}
        </div>
      )}
      {rkfsSize && !rkfsPower && (
        <div className="flex flex-wrap gap-3">
          {['0.2kW', '0.4kW', '0.75kW', '1.5kW', '2.2kW'].map(power => (
            <button key={power} onClick={() => update('rkfsPower', power)}
              className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">{power}</button>
          ))}
        </div>
      )}
      {rkfsPower && !rkfsMounting && (
        <div className="flex flex-wrap gap-3">
          {['Foot', 'Flange', 'Both'].map(mount => (
            <button key={mount} onClick={() => update('rkfsMounting', mount)}
              className="bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded">{mount}</button>
          ))}
        </div>
      )}
      {rkfsMounting && (
        <div className="text-center space-y-2">
          <p>Model: {rkfsDesign}-{rkfsSize}-{rkfsPower}-{rkfsMounting}</p>
          <button onClick={confirmModel} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">เสร็จสิ้น</button>
        </div>
      )}
      <div className="flex justify-center mt-10">
        <img src={DemoGif} alt="Demo GIF" className="w-full max-w-[400px]" />
      </div>
    </div>
  );
}