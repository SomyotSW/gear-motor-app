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

import InductionImg from '../assets/ac/induction.png';
import ReversibleImg from '../assets/ac/reversible.png';
import TorqueImg from '../assets/ac/torque.png';

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
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => update('acMotorType', 'Induction Motor')}>
              <img src={InductionImg} alt="Induction" className="h-20 object-contain" />
              <button className="bg-blue-100 hover:bg-blue-300 px-2 py-1 rounded mt-1">Induction Motor</button>
            </div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => update('acMotorType', 'Reversible Motor')}>
              <img src={ReversibleImg} alt="Reversible" className="h-20 object-contain" />
              <button className="bg-blue-100 hover:bg-blue-300 px-2 py-1 rounded mt-1">Reversible Motor</button>
            </div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => update('acMotorType', 'Torque Motor')}>
              <img src={TorqueImg} alt="Torque" className="h-20 object-contain" />
              <button className="bg-blue-100 hover:bg-blue-300 px-2 py-1 rounded mt-1">Torque Motor</button>
            </div>
          </div>
        </div>
      )}

      {/* Render ส่วนอื่นต่อได้ตามเดิม เช่น Power, Voltage ฯลฯ */}
    </div>
  );
}

export function renderDCMotorFlow(state, setState, onConfirm) {
  // ตัวอย่างสำหรับ DC Motor
  return (
    <div className="mt-6">
      <h3 className="font-semibold">DC Motor Flow Placeholder</h3>
    </div>
  );
}

export function renderBLDCMotorFlow(state, setState, onConfirm) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">BLDC Motor Flow Placeholder</h3>
    </div>
  );
}

export function renderServoFlow(state, setState, onConfirm) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">Servo Motor Flow Placeholder</h3>
    </div>
  );
}

export function renderRKFSFlow(state, setState, onConfirm) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">RKFS Gear Flow Placeholder</h3>
    </div>
  );
}
