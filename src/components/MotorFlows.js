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

import RIECImg from '../assets/rkfs/RIEC.png';
import RINPUTImg from '../assets/rkfs/RINPUT.png';
import RSERVOImg from '../assets/rkfs/RSERVO.png';
import RWMImg from '../assets/rkfs/RWM.png';
import FIECImg from '../assets/rkfs/FIEC.png';
import FINPUTImg from '../assets/rkfs/FINPUT.png';
import FSERVOImg from '../assets/rkfs/FSERVO.png';
import FWMImg from '../assets/rkfs/FWM.png';
import SIECImg from '../assets/rkfs/SIEC.png';
import SINPUTImg from '../assets/rkfs/SINPUT.png';
import SSERVOImg from '../assets/rkfs/SSERVO.png';
import SWMImg from '../assets/rkfs/SWM.png';
import KIECImg from '../assets/rkfs/KIEC.png';
import KINPUTImg from '../assets/rkfs/KINPUT.png';
import KSERVOImg from '../assets/rkfs/KSERVO.png';
import KWMImg from '../assets/rkfs/KWM.png';

// [ADD-RKFS-ASSETS] IEC drawings
import DrawRam from '../assets/rkfs/DrawRam.png';
import DrawKam from '../assets/rkfs/DrawKam.png';
import DrawFam from '../assets/rkfs/DrawFam.png';
import DrawSam from '../assets/rkfs/DrawSam.png';

// [ADD-RKFS-ASSETS] INPUT shaft gifs
import RADgif from '../assets/rkfs/RADgif.gif';
import KADgif from '../assets/rkfs/KADgif.gif';
import FADgif from '../assets/rkfs/FADgif.gif';
import SADgif from '../assets/rkfs/SADgif.gif';

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
import HB1Img   from '../assets/hb/HB1.png';
import ZDY1Img  from '../assets/hb/ZDY1.png';

import HTypeImg from '../assets/hb/HType.png';
import BTypeImg from '../assets/hb/BType.png';

import HST1Img  from '../assets/hb/HST1.png';
import HST2Img  from '../assets/hb/HST2.png';
import HST3Img  from '../assets/hb/HST3.png';
import HST4Img  from '../assets/hb/HST4.png';

import BST2Img  from '../assets/hb/BST2.png';
import BST3Img  from '../assets/hb/BST3.png';
import BST4Img  from '../assets/hb/BST4.png';

// Output shaft structure (H)
import H__SImg  from '../assets/hb/H..S.png';
import H__HImg  from '../assets/hb/H..H.png';
import H__DImg  from '../assets/hb/H..D.png';
import H__KImg  from '../assets/hb/H..K.png';
import H__FImg  from '../assets/hb/H..F.png';

// Output shaft structure (B)
import B__SImg  from '../assets/hb/B..S.png';
import B__HImg  from '../assets/hb/B..H.png';
import B__DImg  from '../assets/hb/B..D.png';
import B__DFImg from '../assets/hb/B..DF.png';
import B__KImg  from '../assets/hb/B..K.png';
import B__FImg  from '../assets/hb/B..F.png';

// Mounting Position
import HHORImg  from '../assets/hb/HHOR.png';
import HVERImg  from '../assets/hb/HVER.png';
import BHORImg  from '../assets/hb/BHOR.png';
import BVERImg  from '../assets/hb/BVER.png';

// ZDY / ZLY / … (Step 2)
import ZDYImg   from '../assets/hb/ZDY.png';
import ZLYImg   from '../assets/hb/ZLY.png';
import ZSYImg   from '../assets/hb/ZSY.png';
import ZFYImg   from '../assets/hb/ZFY.png';
import DBYImg   from '../assets/hb/DBY.png';
import DCYImg   from '../assets/hb/DCY.png';
import DFYImg   from '../assets/hb/DFY.png';
import DBYKImg  from '../assets/hb/DBYK.png';
import DCYKImg  from '../assets/hb/DCYK.png';
import DFYKImg  from '../assets/hb/DFYK.png';

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

export function generateModelCode({ acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio , acConfirm }) {
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
  const { acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio , acConfirm } = acState;

  const frameSizeMap = {
    '10W AC Motor': '60mm',
    '15W AC Motor': '70mm',
    '25W AC Motor': '80mm',
    '40W AC Motor': '90mm',
    '60W AC Motor': '90mm',
    '90W AC Motor': '90mm',
    '120W AC Motor': '90mm',
    '140W AC Motor': '104mm',
    '200W AC Motor': '104mm'
  };

const getShaftDia = (power, gear) => {
    if (!power || !gear) return null;

    const map = {
      '10W AC Motor': {
        'SQUARE BOX (Low)': 'Ø8 mm',
      },
      '15W AC Motor': {
        'SQUARE BOX (Low)': 'Ø10 mm',
      },
      '25W AC Motor': {
        'SQUARE BOX (Low)': 'Ø10 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø15 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø12 mm',
      },
      '40W AC Motor': {
        'SQUARE BOX (Low)': 'Ø12 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '60W AC Motor': {
        'SQUARE BOX (Low)': 'Ø12 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '90W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '120W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø17 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø15 mm',
      },
      '140W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø22 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø20 mm',
      },
      '200W AC Motor': {
        'SQUARE BOX WITH WING': 'Ø15 mm',
        'SQUARE BOX': 'Ø15 mm',
        'RIGHT ANGLE GEAR/HOLLOW SHAFT': 'Ø22 mm',
        'RIGHT ANGLE GEAR/SOLID SHAFT': 'Ø20 mm',
      },
    };

    return map[power]?.[gear] || null;
  };

  const [selectedModel, setSelectedModel] = useState(null);
  const [showAcFinal, setShowAcFinal] = React.useState(false);

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
      {/* 	 */}
      {!acMotorType && (
        <div>
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Motor Type : เลือกประเภทของมอเตอร์</h3>
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
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Power Motor : กำลังของมอเตอร์</h3>
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
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Voltage : แรงดันไฟฟ้า</h3>
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
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Motor Optional : เลือกอุปกรณ์เสริม</h3>

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
          <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Gear Type : เลือกชนิดหัวเกียร์</h3>
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

      {/* Step (AC): Ratio */}
{acGearHead && !acRatio && (
  <div>
    <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      Ratio : เลือกอัตราทดที่ต้องการ
    </h3>

    <div className="flex flex-col items-center gap-2">
      <p className="text-red-600 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        สูตรการหาความเร็วรอบ (rpm) = ความเร็วรอบมอเตอร์ / อัตราทด
      </p>
      <p className="text-white font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        เช่น มอเตอร์ 1Phase 220VAC, 4Pole, 1500 rpm, Gear Head อัตราทด 1:30 → 1500 / 30 = 50 rpm
      </p>

      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {[3,3.6,5,6,7.5,9,12.5,15,18,25,30,36,50,60,75,90,100,120,150,180,200].map(ratio => (
          <button
            key={ratio}
            onClick={(e) => (typeof clickSweep === 'function'
              ? clickSweep(e, () => update('acRatio', ratio))
              : update('acRatio', ratio))}
            className="bg-blue-200 hover:bg-blue-500 text-blue-900 hover:text-white font-bold px-4 py-2 rounded-xl shadow hover:shadow-lg transition"
            title={`อัตราทด 1:${ratio}`}
          >
            {ratio}
          </button>
        ))}
      </div>
    </div>
  </div>
)}

{/* Step (AC): Summary */}
{acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && !showAcFinal && (
  <div id="ac-summary" className="relative max-w-4xl mx-auto mt-6">
    <h3 className="text-white font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
  Model Code :{' '}
  <span className="font-mono text-white/90 px-2 py-0.5 rounded">
    {(() => {
  const raw = generateModelCode({ ...acState, acConfirm: true });
  const list = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw.flat() : raw) : (raw ? [raw] : []);
  if (!list.length) return null;
  return (
    <div className="flex flex-col items-center space-y-2">
      {list.map((code, idx) => (
        <label key={idx} className="flex items-center space-x-2">
          <input
            type="radio"
            name="modelSelect"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <span className="font-mono">{code}</span>
        </label>
      ))}
    </div>
  );
})()}
  </span>
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
</h3>
    <div className="bg-black/25 rounded-xl px-5 py-5 text-white/90 backdrop-blur-sm leading-7">
      <div>Motor Type : <b>{acMotorType||'-'}</b></div>
      <div>Frame size : <b>{frameSizeMap[acPower] || '—'}</b></div>
      <div>Motor Power : <b>{acPower||'-'}</b></div>
      <div>Voltage : <b>{acVoltage||'-'}</b></div>
      <div>Frequency : <b>50Hz , 60Hz</b></div>
      <div>Current (A) : <b>—</b></div>
      <div>Rated speed : <b>—</b></div>
      <div>Optional : <b>{acOption||'-'}</b></div>
      <div>Gear Type : <b>{acGearHead||'-'}</b></div>
      <div>Ratio : <b>{acRatio}</b></div>
      <div>
        Output speed :
        <b>
          {(() => {
            const r = Number(acRatio);
            return Number.isFinite(r) && r > 0 ? (1500 / r).toFixed(2) : '-';
          })()}
        </b> rpm
      </div>
      <div>Output shaft diameter : <b>{getShaftDia(acPower, acGearHead) || '—'}</b></div>
      <div>Weight : <b>— kg</b></div>
    </div>

    {/* Drawing PDF (กึ่งกลางล่างของจอ) */}
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[998]">
      <button className="btn-3d-rkfs px-6 py-3 font-bold">
        Drawing PDF
      </button>
    </div>
    {/* ถัดไป (มุมขวาล่างของจอ) */}
    <div className="fixed right-6 bottom-6 z-[999]">
  <button
    className="btn-3d-rkfs px-6 py-3 font-bold"
    onClick={() => {
  const base = Array.isArray(codes)
    ? (Array.isArray(codes[0]) ? codes.flat() : codes)
    : (codes ? [codes] : []);
  const list = (selectedModel && base.length)
    ? [selectedModel, ...base.filter(c => c !== selectedModel)] // ★ จัดลำดับ โดยเอาตัวที่ติ๊กไว้ขึ้นก่อน
    : base;
  if (list.length) onConfirm(list); // App.jsx จะตั้ง selectedModel = ตัวแรก → ตรงกับที่ผู้ใช้เลือก
}}
>
  ถัดไป
</button>
    </div>
  </div>
)}
      {/* Final */}
      {acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio && showAcFinal &&  (
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
          <h4 className="text-white">Model Code: <strong>{generateModelCode()}</strong><button
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
</button></h4>
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
    rkfsDesignSuffix,
    rkfsMountingTemp,
    rkfsInputSel,
    rkfsINPUTshaft,
    rkfsINPUTshaftDia,
    rkfsInputShaft,
    rkfsInputShaftDia,
  } = state;

// [ADD-RKFS-MAPS] ผูก Series -> รูป/ไฟล์ ที่ต้องแสดง
const RKFS_IEC_IMG = {
  R: DrawRam,
  K: DrawKam,
  F: DrawFam,
  S: DrawSam,
};

const RKFS_INPUT_GIF = {
  R: RADgif,
  K: KADgif,
  F: FADgif,
  S: SADgif,
};

  const shaftCode = rkfsINPUTshaft ?? rkfsInputShaft ?? null;
  const shaftDia  = rkfsINPUTshaftDia ?? rkfsInputShaftDia ?? null;
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
    rkfsMountingTemp: setState.setRkfsMountingTemp,
    rkfsPosition:     setState.setRkfsPosition,
    rkfsPositionSub:  setState.setRkfsPositionSub,
    rkfsDesignSuffix: setState.setRkfsDesignSuffix,
    rkfsInputSel:     setState.setRkfsInputSel,
    rkfsINPUTshaft:    setState.setRkfsINPUTshaft,
    rkfsINPUTshaftDia: setState.setRkfsINPUTshaftDia,
    rkfsInputShaft:    setState.setRkfsInputShaft,
    rkfsInputShaftDia: setState.setRkfsInputShaftDia,
  };

  if (setterMap[key]) {
    setterMap[key](value);
  }

  // ⬇️ เคลียร์ suffix เมื่อผู้ใช้เปลี่ยน Series/Design กันค่าค้าง
  if (key === 'rkfsSeries' || key === 'rkfsDesign') {
    setState.setRkfsDesignSuffix(null);
  }
};

// === [ADD] RKFS click-sweep helper ===

const sweepThen = (el, fn, ms = RKFS_SWEEP_MS) => {
  try {
    if (el && el.classList) {
      el.classList.add('rkfs-sweep');
      setTimeout(() => {
        fn && fn();
        // เอาออกเพื่อไม่ทับซ้อนเอฟเฟกต์ครั้งถัดไป
        el.classList.remove('rkfs-sweep');
      }, ms);
      return;
    }
  } catch (_) { /* no-op */ }
  // fallback: ถ้าไม่มี element ก็ทำงานทันที
  fn && fn();
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

const rkfsAMByPower = { '0.18':'AM63','0.25':'AM71','0.37':'AM71','0.55':'AM80','0.75':'AM80',
  '1.1':'AM90','1.5':'AM90','2.2':'AM100','3':'AM100','4':'AM112','5.5':'AM132','7.5':'AM132','9.2':'AM132',
  '11':'AM160','15':'AM160','18.5':'AM180','22':'AM180','30':'AM200','37':'AM225','45':'AM225',
  '55':'AM250','75':'AM280','90':'AM280','110':'AM315','132':'AM315','160':'AM315' };
function getRkfsIECByPower(kw){ return rkfsAMByPower[String(kw)] ?? null; }
const rkfsAMFlangeDims = {
  AM63:  { G5: 140, D1: 11 },
  AM71:  { G5: 160, D1: 14 },
  AM80:  { G5: 200, D1: 19 },
  AM90:  { G5: 200, D1: 24 },
  AM100: { G5: 250, D1: 28 },
  AM112: { G5: 250, D1: 28 },
  AM132: { G5: 300, D1: 38 },
  AM160: { G5: 350, D1: 42 },
  AM180: { G5: 350, D1: 48 },
  AM200: { G5: 400, D1: 55 },
  AM225: { G5: 450, D1: 60 },
  AM250: { G5: 550, D1: 65 },
  AM280: { G5: 550, D1: 75 },
  AM315: { G5: 660, D1: 80 },
};

const rkfsInputShaftBySeries = {
  R: {
    '27': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '57': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '107':[{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '137':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}],
    '147':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '167':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
  },
  K: {
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '57': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '107':[{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '127':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '157':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '167':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '187':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
  },
  F: {
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '57': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '107':[{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
    '127':[{code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
    '157':[{code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}, {code:'AD7', dia:'Ø55'}, {code:'AD8', dia:'Ø70'}],
  },
  S: {
    '37': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '47': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '57': [{code:'AD1', dia:'Ø16'}, {code:'AD2', dia:'Ø19'}],
    '67': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}],
    '77': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø24'}, {code:'AD4', dia:'Ø38'}],
    '87': [{code:'AD2', dia:'Ø19'}, {code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}],
    '97': [{code:'AD3', dia:'Ø28'}, {code:'AD4', dia:'Ø38'}, {code:'AD5', dia:'Ø42'}, {code:'AD6', dia:'Ø48'}],
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

  /* === [ADD] RKFS click-sweep helper (black→white gloss) === */
const RKFS_SWEEP_MS = 520;
const clickSweep = (e, run) => {
  const el = e && e.currentTarget;
  if (!el) { run && run(); return; }
  if (!el.classList.contains('rkfs-click-sweep')) el.classList.add('rkfs-click-sweep');
  el.classList.add('is-active');
  setTimeout(() => {
    el.classList.remove('is-active');
    run && run();
  }, RKFS_SWEEP_MS);
};

  return (
    <>
      {/* Step 1: Series */}
      {!rkfsSeries && (
<>
        <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Series Gear ที่คุณต้องการ
    </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["R","K","S","F"].map(label => (
            <button
              key={label}
              onClick={(e) => clickSweep(e, () => update("rkfsSeries", label))}
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
        </>
      )}

      {/* Step 2: Design */}
      {rkfsSeries && !rkfsDesign && (
        <>
                    <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Design Gear ที่คุณต้องการ
    </h3>
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
                  onClick={(e) => clickSweep(e, () => update("rkfsDesign", design))}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={imgSrc} alt={design} className="w-full rounded-xl" />
                  <p className="text-center mt-2 font-semibold">{design}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-left">
            <button
              onClick={(e) => clickSweep(e, () => update("rkfsSeries", null))}
              className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
            >
              ย้อนกลับ
            </button>
          </div>
        </>
      )}

      {/* Step 3: Size */}
{rkfsDesign && !rkfsSize && (
  <>
    <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Size Gear ที่คุณต้องการ
    </h3>
    <div className="flex flex-wrap gap-4 justify-center">
  {(
    rkfsSeries === "R"
      ? ["17","27","37","47","57","67","77","87","97","107","137","147","167"]
      : rkfsSeries === "K"
      ? ["37","47","57","67","77","87","97","107","127","157","167","187"]
      : rkfsSeries === "F"
      ? ["37","47","57","67","77","87","97","107","127","157"]   // ← ตามที่สั่ง
      : ["37","47","57","67","77","87","97"]
  )
        .filter((size) => {
          const n = parseInt(size, 10);
          if (rkfsDesign === "RM") return n >= 57 && n <= 167;
          if (rkfsDesign === "RX" || rkfsDesign === "RXF") return n >= 57 && n <= 107;
          return true;
        })
        .map((size) => (
          <button
            key={size}
            onClick={(e) => clickSweep(e, () => update("rkfsSize", size))}
            className="w-24 h-24 bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 rounded-xl flex items-center justify-center text-blue-800 font-bold text-lg border border-gray-300 hover:bg-blue-100"
          >
            {rkfsDesign}{size}
          </button>
        ))}
    </div>
    <h2 className="text-xs sm:text-sm md:text-base font-semibold text-red-400 drop-shadow mb-6 leading-relaxed">
       <br /><br /><br /><br /><br /><br /><br /><br />
  **ขนาด Size Gear จะเป็นตัวบ่งบอกขนาดของเพลา , ความสูงของกึ่งกลางเพลา ,ระยะขาตั้ง, หน้าแปลน , ขนาด Housing , น้ำหนัก ที่แตกต่างกันออกไป สามารถเลือกได้ตามความเหมาะสมของเครื่องจักรของท่าน
</h2>
    <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsDesign", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>
  </>
)}
      {/* Step 3.1: Input Selection */}
{rkfsSize && !rkfsInputSel && (
  <>
    <h3 className="font-semibold text-blue-500 drop-shadow mb-3">
      เลือก Input Selection
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {(() => {
        // เลือกชุดภาพตามซีรีส์
        const opts =
          rkfsSeries === 'R' ? [
            { key: 'With Motor',    img: RWMImg },
            { key: 'IEC Adapter Motor',   img: RIECImg },
            { key: 'INPUT Shaft', img: RINPUTImg },
            { key: 'SERVO Adapter', img: RSERVOImg },
          ] :
          rkfsSeries === 'F' ? [
            { key: 'With Motor',    img: FWMImg },
            { key: 'IEC Adapter Motor',   img: FIECImg },
            { key: 'INPUT Shaft', img: FINPUTImg },
            { key: 'SERVO Adapter', img: FSERVOImg },
          ] :
          rkfsSeries === 'S' ? [
            { key: 'With Motor',    img: SWMImg },
            { key: 'IEC Adapter Motor',   img: SIECImg },
            { key: 'INPUT Shaft', img: SINPUTImg },
            { key: 'SERVO Adapter', img: SSERVOImg },
          ] : [
            { key: 'With Motor',    img: KWMImg },   // K
            { key: 'IEC Adapter Motor',   img: KIECImg },
            { key: 'INPUT Shaft', img: KINPUTImg },
            { key: 'SERVO Adapter', img: KSERVOImg },
          ];

        return opts.map(({ key, img }) => {
          const isClickable = (key === 'With Motor' || key === 'IEC Adapter Motor' || key === 'INPUT Shaft'); 
          return (
            <button
              key={key}
              onClick={(e) => clickSweep(e, () => {
  if (!isClickable) return;
  update("rkfsInputSel", key);

  // [ADD] เฉพาะ IEC Adapter Motor: วาง "แผนนำทาง" ตั้งแต่ตอนนี้
  // K/S → เมื่อมีหน้า Step 9.3 โผล่ ให้เลื่อนไปที่ #rkfs-step-93
  // R/F → เมื่อมีหน้า Confirm (Step 10) โผล่ ให้เลื่อนไปที่ #rkfs-confirm-step
  if (key === 'IEC Adapter Motor' && (rkfsSeries === 'K' || rkfsSeries === 'S')) {
  try {
    const targetId = 'rkfs-step-93';

      if (targetId) {
        // ยกเลิก observer เก่าถ้ามี
        if (window.__rkfsPlanObs && typeof window.__rkfsPlanObs.disconnect === 'function') {
          window.__rkfsPlanObs.disconnect();
        }

        const obs = new MutationObserver(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            obs.disconnect();
            window.__rkfsPlanObs = null;
          }
        });

        obs.observe(document.body, { childList: true, subtree: true });
        window.__rkfsPlanObs = obs;
      }
    } catch (_) { /* no-op */ }
  }
})}
              className={`rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 bg-white
                          ${isClickable ? 'hover:-translate-y-2 cursor-pointer' : 'opacity-70 cursor-not-allowed'}`}
              title={key}
            >
              <img src={img} alt={`${rkfsSeries}${key}`} className="w-full rounded-t-2xl" />
              <p className="text-center py-2 font-semibold text-gray-800">{key}</p>
            </button>
          );
        });
      })()}
    </div>
    <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsSize", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>
  </>
)}


      {/* Step 4: Motor Type */}
      {rkfsSize && rkfsInputSel === 'With Motor' && !rkfsMotorType && (
        <>
          <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">เลือกประเภทของมอเตอร์</h3>
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
                onClick={(e) => clickSweep(e, () => update("rkfsMotorType", type))}
                className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
              >
                <img src={img} alt={type} className="w-full rounded-t-xl" />
                <p className="text-center py-2 font-semibold text-gray-800">
                  {type}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-4 text-left">
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsInputSel", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

           {/* IEC Adaptor flow: เลือกกำลัง (ไม่ต้องเลือก Motor Type/Pole) */}
{rkfsInputSel === 'IEC Adapter Motor' && !rkfsMotorPower && (
  <>
    <h3 className="text-blue-500 font-bold mb-2">เลือกกำลังของมอเตอร์(หน่วย kW)</h3>
    <div className="flex flex-wrap gap-3">
      {(() => {
        const tableMap = { R: rSeriesPowerBySize, K: kSeriesPowerBySize, F: fSeriesPowerBySize, S: sSeriesPowerBySize };
        const sizeKey = rkfsSize ? String(rkfsSize) : null;
        const mapped  = (tableMap[rkfsSeries] && sizeKey) ? tableMap[rkfsSeries][sizeKey] : null;
        const options = mapped ?? ["0.18","0.25","0.37","0.55","0.75","1.1","1.5","2.2","3","4","5.5","7.5","9.2","11","15","18.5","22","30","37","45","55","75","90","110","132","160"];
        return options.map(p => (
          <button key={p} onClick={(e)=>clickSweep(e,()=>{
   update("rkfsMotorPower", p);
   update("rkfsRatio", null);
   update("rkfsMounting", null);
 })} className="btn-3d-rkfs font-bold px-4 py-2">For motor {p} kW <span className="text-xl text-blue-500 font-bold ml-2">{getRkfsIECByPower(p) || ''}</span></button>
        ));
      })()}
    </div>
    <div
      className="fixed z-[999]"
      style={{
        left: 'max(1.5rem, env(safe-area-inset-right))',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsInputSel", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>
  </>
)}
          {/* INPUT Shaft flow: เลือก AD — แสดงเฉพาะตอนยังไม่ได้เลือก */}
{rkfsInputSel === 'INPUT Shaft' && !(state.rkfsINPUTshaft || state.rkfsInputShaft) && (
  <>
    <h3 className="text-blue-500 font-bold mb-2">เลือกขนาด INPUT shaft (AD)</h3>
    <div className="w-full flex flex-wrap justify-center items-center gap-4 mt-4">
  {(() => {
    const table =
      rkfsInputShaftBySeries?.[rkfsSeries]?.[String(rkfsSize)] ?? [];
    return table.map(({ code, dia }) => (
      <button
        key={code}
        title={`${code}Diameter : ${dia}`}
        onClick={(e) =>
          clickSweep(e, () => {
            // เก็บค่าตามโค้ดเดิม
            update('rkfsINPUTshaft', code);
            update('rkfsINPUTshaftDia', dia);
            update('rkfsInputShaft', code);
            update('rkfsInputShaftDia', dia);

            // ไป Step 7 → รีเซ็ต Ratio/Mounting เดิม
            update('rkfsRatio', null);
            update('rkfsMounting', null);

            setTimeout(() => {
              document
                .getElementById('rkfs-ratio-step')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
          })
        }
        className={`btn-3d-rkfs
                    px-7 py-4 md:px-8 md:py-5
                    min-w-[180px] md:min-w-[220px]
                    text-base md:text-lg rounded-2xl
                    shadow hover:shadow-lg
                    ${state.rkfsINPUTshaft === code ? 'ring-2 ring-blue-500' : ''}`}
      >
        <span className="block leading-tight">{code} </span>
        <span className="block text-blue-500 text-xl font-bold md-0.5:text-sm opacity-80">
           Diameter : {dia}
        </span>
      </button>
    ));
  })()}
</div>
<div
  className="fixed z-[999]"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
<button
        onClick={(e) => clickSweep(e, () => update("rkfsInputSel", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
</div>
  </>
)}

      {/* Step 5: Motor Power */}
      {rkfsMotorType && !rkfsMotorPower && (
        <>
          <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">เลือกกำลังของมอเตอร์(หน่วย kW)</h3>
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

  return powerOptions.map((p) => (
  <button
  key={String(p)}
  onClick={(e) => clickSweep(e, () => update("rkfsMotorPower", p))}
  className="btn-3d-rkfs text-sm md:text-base font-semibold px-4 py-2"
  title={`${p} kW`}
>
  {p} kW
</button>
));
      })()}
    </div>
          <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsMotorType", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

      {/* Step 6: Pole */}
      {rkfsMotorPower && !rkfsPole && rkfsInputSel !== 'IEC Adapter Motor' && (
        <>
          <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">เลือก Pole Motor</h3>
          <div className="flex flex-wrap gap-3">
            <br />
            {["4P","6P"].map(pole =>(
              <button
                key={pole}
                onClick={(e) => clickSweep(e, () => update("rkfsPole", pole))}
                className="bg-blue-600 text-white font-bold px-10 py-8 rounded-xl shadow"
              >
                {pole}
              </button>
            ))}
          </div>
          <br />
          <h2 className="text-red-500 font-bold mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">**ความเร็วรอบของมอเตอร์จะอิงตาม Pole ของมอเตอร์ ค่าประมาณการ 4P = 1500 rpm, 6P = 1000 rpm (ทั้งนี้จะขึ้นอยู่มาตรฐานการผลิตของแต่ล่ะแบรนด์)</h2>
          <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsMotorPower", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

      {/* Step 7: Ratio */}
{(() => {
  // ค่า AD ที่เลือก (รองรับสองชื่อ state)
  const shaftSel = (state.rkfsINPUTshaft ?? state.rkfsInputShaft) || null;

  // เงื่อนไขเข้า Step 7 (คงตรรกะเดิม)
  const prereqOK =
    rkfsInputSel === 'With Motor'
      ? !!rkfsPole
      : rkfsInputSel === 'IEC Adapter Motor'
      ? !!rkfsMotorPower
      : rkfsInputSel === 'INPUT Shaft'
      ? !!shaftSel
      : false;

  const showRatioStep = prereqOK && !rkfsRatio;
  if (!showRatioStep) return null;

  return (
    <>
      <div id="rkfs-ratio-step">
        <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          เลือกอัตราทดเกียร์ (Ratio (i))
        </h3>
        <div className="flex flex-wrap gap-3">
          {ratioList.map((ratio) => (
            <button
              key={ratio}
              onClick={(e) =>
                clickSweep(e, () => {
                  update("rkfsRatio", ratio);

// INPUT Shaft → ไป Mounting (เหมือนเดิม)
if (rkfsInputSel === 'INPUT Shaft') {
  setTimeout(() => {
    document.getElementById("rkfs-mount-step")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 0);

// IEC Adapter Motor เท่านั้น → K/S ไป 9.3, R/F ไม่แตะ
} else if (rkfsInputSel === 'IEC Adapter Motor') {
  setTimeout(() => {
    const targetId = (rkfsSeries === 'K' || rkfsSeries === 'S')
      ? 'rkfs-step-93'
      : null; // R/F: ไม่กระโดด
    if (targetId) {
      document.getElementById(targetId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 0);
}

                })
              }
              className="bg-blue-600 text-white font-bold shadow px-8 py-6 rounded-xl hover:bg-blue-700"
            >
              i = {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* ปุ่มย้อนกลับ */}
      <div
        className="fixed z-[999]"
        style={{
          left: 'max(1.5rem, env(safe-area-inset-right))',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={(e) =>
            clickSweep(e, () => {
              if (rkfsInputSel === 'With Motor') {
                update("rkfsPole", null);
              } else if (rkfsInputSel === 'IEC Adapter Motor') {
                update("rkfsMotorPower", null);
              } else if (rkfsInputSel === 'INPUT Shaft') {
                update("rkfsINPUTshaft", null);
                update("rkfsInputShaft", null);
                update("rkfsINPUTshaftDia", null);
                update("rkfsInputShaftDia", null);
              }
            })
          }
          className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
        >
          ย้อนกลับ
        </button>
      </div>
    </>
  );
})()}

      {/* Step 8: Mounting */}
{rkfsRatio && !rkfsMounting && (
  <>
    <div id="rkfs-mount-step">
      <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        เลือกทิศทางการติดตั้ง (Mounting Position)
      </h3>
      <h3 className="text-red-500 font-bold mb-2 drop-shadow-[0_05px_05px_rgba(0,0,0,0.3)]">
        **ทุกทิศทางการติดตั้งมีผลต่อระดับน้ำมันในห้องเกียร์ มีผลต่ออายุการใช้งานของเกียร์
      </h3>

      {/* รูป Mounting (คลิกได้เฉพาะที่รูป → ขยาย) */}
      <div className="flex justify-center">
        <div className="group mx-auto w-full">
          <img
            src={mountingImageMap[rkfsSeries]}
            alt="Mounting"
            loading="lazy"
            onClick={() => document.getElementById('rkfs-mount-modal')?.showModal()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                document.getElementById('rkfs-mount-modal')?.showModal();
              }
            }}
            tabIndex={0}
            className="
              cursor-zoom-in
              mx-auto h-auto w-full object-contain
              max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[500px]
              rounded-2xl shadow-lg ring-1 ring-white/10
              transition-transform duration-200 group-hover:scale-[1.01] group-active:scale-[0.99]
              focus:outline-none focus:ring-2 focus:ring-white/40
            "
          />
          <div className="mt-2 text-xs text-white/70 text-center select-none pointer-events-none">
            แตะ/คลิกที่รูปเพื่อขยาย
          </div>
        </div>
      </div>

      {/* ปุ่มเลือก M1–M6 */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {["M1", "M2", "M3", "M4", "M5", "M6"].map((mount) => (
          <button
            key={mount}
            onClick={(e) => clickSweep(e, () => update("rkfsMountingTemp", mount))}
            className="bg-gradient-to-br from-blue-500 to-blue-800 text-white font-bold px-6 py-4 rounded-xl shadow hover:shadow-lg"
          >
            {mount}
          </button>
        ))}
      </div>

      {/* ── Info หลังเลือก M ── */}
      {state.rkfsMountingTemp && (
        <div className="mt-6 max-w-4xl mx-auto text-left bg-black/25 rounded-xl px-5 py-4 backdrop-blur-sm text-white/90 text-sm md:text-base leading-7">
          {(() => {
            const mSel = state.rkfsMountingTemp;            // ปุ่มที่เพิ่งคลิก
            const sizeKey = String(rkfsSize || "").trim();  // key ของ size ในตาราง

            // 1) เกรดน้ำมัน + แบรนด์ (R/F/K = VG220, S-family = VG680)
            const isSFamily =
              rkfsSeries === "S" ||
              ["S", "SA", "SAF", "SAZ", "SAT", "SH", "SHF", "SHZ", "ST", "SF"].includes(
                rkfsDesign
              );
            const oilGradeText = isSFamily ? "ISO,NL GI = VG 680" : "ISO,NL GI = VG 220";
            const brandText = isSFamily
              ? "Shell Omala S2 G 680 (SAS เติมแบรนด์นี้) , Mobilgear 600 XP 680 , Castrol Tribol 1100/680"
              : "Shell Omala S2 G220 (SAS เติมแบรนด์นี้) , Mobilgear 600 XP 220 , Castrol Tribol 1100/220";

            // 2) เลือกหมวดตารางจาก Design
            const oilCategory = (() => {
              if (rkfsDesign === "RF") return "RF";
              if (rkfsDesign === "RX") return "RX";
              if (rkfsDesign === "RXF") return "RXF";
              if (rkfsDesign === "FF") return "FF";
              if (["F", "FA", "FAF", "FAZ", "FH", "FHF", "FHZ", "FV", "FVF", "FVZ", "FT"].includes(rkfsDesign)) return "F";
              if (rkfsDesign === "S") return "S";
              if (rkfsDesign === "SF") return "SF";
              if (["SA", "SAF", "SAZ", "SAT", "SH", "SHF", "SHZ", "ST"].includes(rkfsDesign)) return "S_OTHER";
              if (["K", "KA", "KAB", "KAF", "KAT", "KAZ"].includes(rkfsDesign)) return "K";
              return "R"; // ดีไซน์ R
            })();

            // 3) ตารางปริมาณน้ำมัน
            const OIL_DATA = {
              R: {
                "17": [0.25, 0.55, 0.35, 0.55, 0.35, 0.40],
                "27": ["0.25/0.40", 0.70, 0.50, 0.70, 0.50, 0.50],
                "37": ["0.30/0.95", 0.85, 0.95, 1.05, 0.75, 0.95],
                "47": ["0.70/1.50", 1.60, 1.50, 1.65, 1.50, 1.50],
                "57": ["0.80/1.70", 1.90, 1.70, 2.10, 1.70, 1.70],
                "67": ["1.10/2.30", 2.40, 2.80, 2.90, 1.80, 2.00],
                "77": ["1.20/3.00", 3.30, 3.60, 3.80, 2.50, 3.40],
                "87": ["2.30/6.0", 6.4, 7.2, 7.2, 6.3, 6.5],
                "97": ["4.60/9.8", 11.7, 11.7, 13.4, 11.3, 11.7],
                "107": ["6.0/13.7", 16.3, 16.9, 19.2, 13.2, 15.9],
                "137": ["10.0/25.0", 28.0, 29.5, 31.5, 25.0, 25.0],
                "147": ["15.4/40.0", 46.5, 48.0, 52.0, 39.5, 41.0],
                "167": ["27.0/70.0", 82.0, 78.0, 88.0, 66.0, 69.0],
              },
              RF: {
                "17": [0.25, 0.55, 0.35, 0.55, 0.35, 0.40],
                "27": ["0.25/0.40", 0.70, 0.50, 0.70, 0.50, 0.50],
                "37": ["0.35/0.95", 0.90, 0.95, 1.05, 0.75, 0.95],
                "47": ["0.65/1.50", 1.60, 1.50, 1.65, 1.50, 1.50],
                "57": ["0.80/1.70", 1.80, 1.70, 2.00, 1.70, 1.70],
                "67": ["1.20/2.50", 2.50, 2.70, 2.80, 1.90, 2.10],
                "77": ["1.20/2.60", 3.10, 3.30, 3.60, 2.40, 3.00],
                "87": ["2.40/6.0", 6.4, 7.1, 7.2, 6.3, 6.4],
                "97": ["5.1/10.2", 11.9, 11.2, 14.0, 11.2, 11.8],
                "107": ["6.3/14.9", 15.9, 17.0, 19.2, 13.1, 15.9],
                "137": ["9.5/25.0", 27.0, 29.0, 32.5, 25.0, 25.0],
                "147": ["16.4/42.0", 47.0, 48.0, 52.0, 42.0, 42.0],
                "167": ["26.0/70.0", 82.0, 78.0, 88.0, 65.0, 71.0],
              },
              RX: {
                "57": [0.60, 0.80, 1.30, 1.30, 0.90, 0.90],
                "67": [0.80, 0.80, 1.70, 1.90, 1.10, 1.10],
                "77": [1.10, 1.50, 2.60, 2.70, 1.60, 1.60],
                "87": [1.70, 2.50, 4.80, 4.80, 2.90, 2.90],
                "97": [2.10, 3.40, 7.40, 7.00, 4.80, 4.80],
                "107": [3.90, 5.60, 11.60, 11.90, 7.70, 7.70],
              },
              RXF: {
                "57": [0.50, 0.80, 1.10, 1.10, 0.70, 0.70],
                "67": [0.70, 0.80, 1.50, 1.40, 1.00, 1.00],
                "77": [0.90, 1.30, 2.40, 2.00, 1.60, 1.60],
                "87": [1.60, 1.95, 4.90, 3.95, 2.90, 2.90],
                "97": [2.10, 3.70, 7.10, 6.30, 4.80, 4.80],
                "107": [3.10, 5.70, 11.20, 9.30, 7.20, 7.20],
              },
              F: {
                "27": [0.60, 0.80, 0.65, 0.70, 0.60, 0.60],
                "37": [0.95, 1.25, 0.70, 1.25, 1.00, 1.10],
                "47": [1.50, 1.80, 1.10, 1.90, 1.50, 1.70],
                "57": [2.60, 3.50, 2.10, 3.50, 2.80, 2.90],
                "67": [2.70, 3.80, 1.90, 3.80, 2.90, 3.20],
                "77": [5.90, 7.30, 4.30, 8.00, 6.00, 6.30],
                "87": [10.80, 13.00, 7.70, 13.80, 10.80, 11.00],
                "97": [18.50, 22.50, 12.60, 25.20, 18.50, 20.00],
                "107": [24.50, 32.00, 19.50, 37.50, 27.00, 27.00],
                "127": [40.50, 54.50, 34.00, 61.00, 46.30, 47.00],
                "157": [69.00, 104.00, 63.00, 105.00, 86.00, 78.00],
              },
              FF: {
                "27": [0.60, 0.80, 0.65, 0.70, 0.60, 0.60],
                "37": [1.00, 1.25, 0.70, 1.30, 1.00, 1.10],
                "47": [1.60, 1.85, 1.10, 1.90, 1.50, 1.70],
                "57": [2.80, 3.50, 2.10, 3.70, 2.90, 3.00],
                "67": [2.70, 3.80, 1.90, 3.80, 2.90, 3.20],
                "77": [5.90, 7.30, 4.30, 8.10, 6.00, 6.30],
                "87": [10.80, 13.20, 7.80, 14.10, 11.00, 11.20],
                "97": [19.00, 22.50, 12.60, 25.60, 18.90, 20.50],
                "107": [25.50, 32.00, 19.50, 38.50, 27.50, 28.00],
                "127": [41.50, 55.50, 34.00, 63.00, 46.30, 49.00],
                "157": [72.00, 105.00, 64.00, 106.00, 87.00, 79.00],
              },
              K: {
                "37": [0.50, 1.00, 1.00, 1.25, 0.95, 0.95],
                "47": [0.80, 1.30, 1.50, 2.00, 1.60, 1.60],
                "57": [1.10, 2.20, 2.20, 2.80, 2.30, 2.10],
                "67": [1.10, 2.40, 2.70, 3.45, 2.60, 2.60],
                "77": [2.20, 4.10, 4.40, 5.80, 4.20, 4.40],
                "87": [3.70, 8.00, 8.70, 10.90, 8.00, 8.00],
                "97": [7.00, 14.00, 15.70, 20.00, 15.70, 15.50],
                "107": [10.00, 21.00, 25.50, 33.50, 24.00, 24.00],
                "127": [21.00, 41.50, 44.00, 54.00, 40.00, 41.00],
                "157": [31.00, 62.00, 65.00, 90.00, 58.00, 62.00],
                "167": [33.00, 95.00, 105.00, 123.00, 85.00, 84.00],
                "187": [53.00, 152.00, 167.00, 200.00, 143.00, 143.00],
              },
              S: {
                "37": [0.25, 0.40, "0.50", 0.55, 0.40, 0.40],
                "47": [0.35, 0.80, "0.70/0.90", 1.00, 0.80, 0.80],
                "57": [0.50, 1.20, "1.00/1.20", 1.45, 1.30, 1.30],
                "67": [1.00, 2.00, "2.20/3.10", 3.10, 2.60, 2.60],
                "77": [1.90, 4.20, "3.70/5.4", 5.90, 4.40, 4.40],
                "87": [3.30, 8.10, "6.9/10.4", 11.30, 8.40, 8.40],
                "97": [6.80, 15.00, "13.4/18.0", 21.80, 17.00, 17.00],
              },
              SF: {
                "37": [0.25, 0.40, "0.50", 0.55, 0.40, 0.40],
                "47": [0.40, 0.90, "0.90/1.05", 1.05, 1.00, 1.00],
                "57": [0.50, 1.20, "1.00/1.50", 1.55, 1.40, 1.40],
                "67": [1.00, 2.20, "2.30/3.00", 3.20, 2.70, 2.70],
                "77": [1.90, 4.10, "3.90/5.8", 6.50, 4.90, 4.90],
                "87": [3.80, 8.00, "7.1/10.1", 12.00, 9.10, 9.10],
                "97": [7.40, 15.00, "13.8/18.8", 22.60, 18.00, 18.00],
              },
              S_OTHER: {
                "37": [0.25, 0.40, "0.50", 0.50, 0.40, 0.40],
                "47": [0.40, 0.80, "0.70/0.90", 1.00, 0.80, 0.80],
                "57": [0.50, 1.10, "1.00/1.50", 1.50, 1.20, 1.20],
                "67": [1.00, 2.00, "1.80/2.60", 2.90, 2.50, 2.50],
                "77": [1.80, 3.90, "3.60/5.0", 5.80, 4.50, 4.50],
                "87": [3.80, 7.40, "6.0/8.7", 10.80, 8.00, 8.00],
                "97": [7.00, 14.00, "11.4/16.0", 20.50, 15.70, 15.70],
              },
            };

            // 4) คำนวณลิตร
            const mountIdx = { M1: 0, M2: 1, M3: 2, M4: 3, M5: 4, M6: 5 };
            const row = OIL_DATA[oilCategory]?.[sizeKey];

            const pick = (v) =>
              typeof v === "string" && v.includes("/")
                ? Math.max(...v.split("/").map((x) => parseFloat(String(x).trim())))
                : v != null
                ? Number(v)
                : null;

            const oilLiters =
              row && mSel && mountIdx[mSel] != null ? pick(row[mountIdx[mSel]]) : null;

            return (
              <>
                <div className="mb-1">
                  ชนิดของน้ำมันเกียร์ที่แนะนำ สำหรับ{" "}
                  <b>{isSFamily ? "S Series" : `${rkfsSeries} Series`}</b> ในอุณหภูมิ{" "}
                  {isSFamily ? "-0" : "-15"}°C ถึง +40°C :<span className="text-yellow-400 font-extrabold text-l"> <b>{oilGradeText}</b> </span>
                </div>
                <div className="mb-2">
                  แบรนด์ที่แนะนำ{" "}
                  <span className="font-semibold">{brandText}</span>
                </div>
                <div className="mb-3">
                  ระดับน้ำมันเกียร์ = <span className="text-yellow-400 font-extrabold text-xl">
                  <b>
                    {oilLiters != null && !Number.isNaN(oilLiters) ? oilLiters : "—"}
                  </b>
                   ลิตร (Liter) </span>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>

    {/* ปุ่มถัดไป — ยึดมุมขวาล่างของหน้าจอแน่นอน */}
    {state.rkfsMountingTemp && (
      <div
        className="fixed z-[999]"
        style={{
          right: 'max(1.5rem, env(safe-area-inset-right))',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <button
          className="btn-3d-rkfs px-6 py-3 font-bold"
          onClick={(e) =>
            clickSweep(e, () => {
              update('rkfsMounting', state.rkfsMountingTemp);
              update('rkfsMountingTemp', null);

              // ★ เฉพาะโหมด INPUT Shaft: K/S → ไป 9.3, R/F → ไป Confirm
              if (rkfsInputSel === 'INPUT Shaft') {
                setTimeout(() => {
                  const targetId = (rkfsSeries === 'K' || rkfsSeries === 'S')
                    ? 'rkfs-step-93'
                    : 'rkfs-confirm-step';
                  document.getElementById(targetId)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 0);
              }
            })
          }
        >
          ถัดไป
        </button>
      </div>
    )}

    {/* ปุ่มย้อนกลับ → กลับไปเลือก Ratio */}
    <div
      className="fixed z-[999]"
      style={{
        left: 'max(1.5rem, env(safe-area-inset-right))',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsRatio", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
    </div>

    {/* Lightbox (เต็มจอ) สำหรับรูป Mounting */}
    <dialog
      id="rkfs-mount-modal"
      className="
        hidden
        open:fixed open:inset-0 open:z-[9999]
        open:bg-black/80 open:backdrop-blur-sm open:p-4
        open:flex open:items-center open:justify-center
      "
      onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
    >
      <form method="dialog" className="contents">
        <img
          src={mountingImageMap[rkfsSeries]}
          alt="Mounting (full)"
          className="max-h-[92vh] max-w-[96vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
        />
        <button
          type="submit"
          className="absolute top-4 right-4 text-white/90 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-3 py-1 text-sm font-semibold"
        >
          ปิด
        </button>
      </form>
    </dialog>
  </>
)}

      {/* Step 9: Position */}
      {rkfsMounting && !rkfsPosition &&
  rkfsInputSel !== 'IEC Adapter Motor' &&
  rkfsInputSel !== 'INPUT Shaft' && (
        <>
          <div id="rkfs-position-step">
            <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(6,0,0,0.6)]">เลือกตำแหน่งกล่องสายไฟ (Terminal Box)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
              {[
                { pos: "0", img: T0Img },
                { pos: "90", img: T90Img },
                { pos: "180", img: T180Img },
                { pos: "270", img: T270Img }
              ].map(({ pos, img }) => (
                <button
                  key={pos}
                  onClick={(e) => clickSweep(e, () => update("rkfsPosition", pos))}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={img} alt={`T${pos}`} className="w-full rounded-t-xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{pos}°</p>
                </button>
              ))}
            </div>
          </div>
          <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsMounting", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

      {/* Step 9.2: Sub‐position */}
      {rkfsPosition && !rkfsPositionSub &&
  rkfsInputSel !== 'IEC Adapter Motor' &&
  rkfsInputSel !== 'INPUT Shaft' && (
        <>
          <div id="rkfs-step-92">
            <h3 className="text-blue-500 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(6,0,0,0.6)]">เลือกตำแหน่งรูสายไฟ (Cable wire position)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
              {[
                { sub: "X", img: CXImg },
                { sub: "1", img: C1Img },
                { sub: "2", img: C2Img },
                { sub: "3", img: C3Img }
              ].map(({ sub, img }) => (
                <button
                  key={sub}
                  onClick={(e) => clickSweep(e, () => update("rkfsPositionSub", sub))}
                  className="rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white"
                >
                  <img src={img} alt={`C${sub}`} className="w-full rounded-t-xl" />
                  <p className="text-center py-2 font-semibold text-gray-800">{sub}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
      <button
        onClick={(e) => clickSweep(e, () => update("rkfsPosition", null))}
        className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
      >
        ย้อนกลับ
      </button>
          </div>
        </>
      )}

      {/* Step 9.3: Design code (เฉพาะ K / S Series) */}
{ (rkfsSeries === 'K' || rkfsSeries === 'S') && rkfsDesign &&
  (
    // IEC / INPUT: ข้าม Step 9 → โผล่ได้เมื่อเลือก Mounting แล้ว
    ((rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft') && rkfsMounting)
    ||
    // With Motor / อื่น ๆ: ต้องผ่าน Step 9 ให้ครบก่อน (Position + Sub-position)
    ((rkfsInputSel !== 'IEC Adapter Motor' && rkfsInputSel !== 'INPUT Shaft') && rkfsPosition && rkfsPositionSub)
  ) &&
  (!state.rkfsDesignSuffix || state.rkfsDesignSuffix === 'T') && (
  <div id="rkfs-step-93" className="mt-6">
    <h3 className="text-blue-600 font-bold mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
      เลือกทิศทางการติดตั้งเพลา ซ้าย หรือ ขวา ?
    </h3>

    {(() => {
      const selected = state.rkfsDesignSuffix;
      const pick = (val) => update('rkfsDesignSuffix', val);

      // ปุ่มภาพ 3D
      const Card = ({ img, code, label }) => (
        <button
          type="button"
          onClick={(e) => {
            clickSweep(e, () => {
              update('rkfsDesignSuffix', code);
              // ✅ เลือก T = ยังไม่จบ → ไม่เลื่อนไป Confirm
              if (code !== 'T') {
                setTimeout(() => {
                  document.getElementById('rkfs-confirm-step')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 0);
              }
            });
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
        if (rkfsDesign === 'K') {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KXXAImg}  code="A"  label="KXXA (A)"  />
              <Card img={KXXBImg}  code="B"  label="KXXB (B)"  />
              <Card img={KXXABImg} code="AB" label="KXXAB (AB)" />
            </div>
          );
        }

        if (['KA', 'KAB', 'KAF', 'KAZ'].includes(rkfsDesign)) {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={KAXXAImg} code="A" label="KAXXA (A)" />
              <Card img={KAXXBImg} code="B" label="KAXXB (B)" />
            </div>
          );
        }

        if (rkfsDesign === 'KAT') {
          if (!['T', 'TA', 'TB'].includes(selected)) {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
                <Card img={KATXXTImg} code="T" label="KATXXT (T)" />
              </div>
            );
          }
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
        if (rkfsDesign === 'S') {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 justify-items-center">
              <Card img={SXXAImg}  code="A"  label="A"  />
              <Card img={SXXBImg}  code="B"  label="B"  />
              <Card img={SXXABImg} code="AB" label="AB" />
            </div>
          );
        }

        if (['SA', 'SAF', 'SAZ'].includes(rkfsDesign)) {
          return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <Card img={SAXXAImg} code="A" label="SAXXA (A)" />
              <Card img={SAXXBImg} code="B" label="SAXXB (B)" />
            </div>
          );
        }

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

      return null;
    })()}
    {/* [ADD-IEC-INPUT-BACK-93] เฉพาะ IEC / INPUT → Back = กลับไปเลือก Mounting */}
{ (rkfsSeries === 'K' || rkfsSeries === 'S') &&
  (rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft') && (
  <div
    className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
    <button
      onClick={(e) => clickSweep(e, () => update('rkfsMounting', null))}
      className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
    >
      ย้อนกลับ
    </button>
  </div>
)}
  </div>
)}

      {/* Step 10: Confirm */}
{(
  // IEC / INPUT
  ((rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft') &&
    ((rkfsSeries === 'K' || rkfsSeries === 'S')
        ? (rkfsMounting && state.rkfsDesignSuffix && state.rkfsDesignSuffix !== 'T') // ต้องผ่าน 9.3 แล้ว
        : rkfsMounting // R/F: เดิม
    )
  )
  ||
  // With Motor / Servo: เดิม
  ((rkfsInputSel !== 'IEC Adapter Motor' && rkfsInputSel !== 'INPUT Shaft') &&
    rkfsPosition && rkfsPositionSub
  )
) && (
  <div id="rkfs-confirm-step" className="text-center mt-6 space-y-4">
    <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code</h3>
    <p className="text-blue-400 font-extrabold text-xl">
      {(() => {
        // ── IEC Adapter Motor ──
        if (rkfsInputSel === 'IEC Adapter Motor') {
          const amCode = (typeof getRkfsIECByPower === 'function') ? getRkfsIECByPower(rkfsMotorPower) : null;
          if (!rkfsRatio || !rkfsMounting || !amCode) return '-';
          return `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${amCode}-${rkfsMounting}`;
        }

        // ── INPUT Shaft ── (อ่านจาก state เสมอ เพื่อกันกรณีตัวแปรโลคัลไม่ได้ map)
        if (rkfsInputSel === 'INPUT Shaft') {
          const shaftCode = state?.rkfsINPUTshaft ?? state?.rkfsInputShaft ?? null;
          const diaVal    = state?.rkfsINPUTshaftDia ?? state?.rkfsInputShaftDia ?? null;
          if (!rkfsRatio || !rkfsMounting || !shaftCode) return '-';
          const dia = diaVal ? `-${diaVal}` : '';
          return `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${shaftCode}-${rkfsMounting}${dia}`;
        }

        // ── With motor (โครงสร้างเดิม 100%) ──
        return `${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}${rkfsPosition ? `-${rkfsPosition}` : ''}${rkfsPositionSub ? `-${rkfsPositionSub}` : ''}${state.rkfsDesignSuffix ? `-${state.rkfsDesignSuffix}` : ''}`;
      })()}
    </p>
    <br />
    {(() => {
  const isIEC   = rkfsInputSel === 'IEC Adapter Motor';
  const isINPUT = rkfsInputSel === 'INPUT Shaft';
  const thumbIEC   = isIEC   ? RKFS_IEC_IMG?.[rkfsSeries]   : null;
  const thumbINPUT = isINPUT ? RKFS_INPUT_GIF?.[rkfsSeries] : null;
  const thumbSrc = thumbIEC || thumbINPUT;
  const thumbAlt = isIEC ? `${rkfsSeries} IEC adapter drawing` :
                   isINPUT ? `${rkfsSeries} input shaft animation` : '';

  if (!thumbSrc) return null;

  return (
    <div className="group mx-auto mt-3 block w-full">
  {/* คลิกได้เฉพาะที่รูป */}
  <img
    src={thumbSrc}
    alt={thumbAlt}
    loading="lazy"
    onClick={() => document.getElementById('rkfs-illust-modal')?.showModal()}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        document.getElementById('rkfs-illust-modal')?.showModal();
      }
    }}
    tabIndex={0}
    className="
      cursor-zoom-in
      mx-auto h-auto w-full object-contain
      max-w-[20px] sm:max-w-[120px] md:max-w-[220px] lg:max-w-[340px]
      rounded-xl shadow-lg ring-1 ring-white/10
      transition-transform duration-200 group-hover:scale-[1.02] group-active:scale-[0.99]
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
  />
  {/* ป้ายคำบรรยายไม่รับคลิก */}
  <div className="mt-1 text-xs text-white/70 select-none pointer-events-none">
    แตะ/คลิกเพื่อขยาย
  </div>
</div>
  );
})()}
    {/* === [ADD] RKFS: spacer 2 บรรทัด + สรุปสเปค (คงเดิมทั้งหมด) === */}
    <br />
    {(() => {
      // ค่าที่ผู้ใช้เลือก
      const series = rkfsSeries || '-';
      const design = rkfsDesign ? (rkfsDesign + (state?.rkfsDesignSuffix ? `-${state.rkfsDesignSuffix}` : '')) : '-';
      const size   = rkfsSize   || '-';
      const ratioS = rkfsRatio  || '-';
      const shaftPos = state?.rkfsDesignSuffix || '-';
      const inpSel = rkfsInputSel || '-';
      const mType  = rkfsMotorType || '-';
      const mKWs   = rkfsMotorPower || '-';
      const MTP   = rkfsMounting || '-';
      const MTT   = rkfsPosition || '-';
      const MTC   = rkfsPositionSub || '-';
      const poleS  = rkfsPole || '-';
      const amCodeForKW = (typeof getRkfsIECByPower === 'function') ? getRkfsIECByPower(rkfsMotorPower) : null;
      const amDims = amCodeForKW && typeof rkfsAMFlangeDims !== 'undefined' ? rkfsAMFlangeDims[amCodeForKW] : null;

// ดึง/เดาเส้นผ่านศูนย์กลางเพลาขาเข้า (INPUT) จาก state หรือ mapping
let inputShaftDia = state?.rkfsINPUTshaftDia ?? state?.rkfsInputShaftDia ?? null;
if (!inputShaftDia && rkfsSeries && rkfsSize) {
  const list = rkfsInputShaftBySeries?.[rkfsSeries]?.[rkfsSize];
  const codePick = state?.rkfsINPUTshaft ?? state?.rkfsInputShaft;
  if (Array.isArray(list) && codePick) {
    const found = list.find(x => x.code === codePick);
    inputShaftDia = found?.dia ?? null; // รูปแบบเดิมเช่น "Ø28"
  }
}
      // คำนวณความเร็วรอบออก (rpm) ตาม Pole/Ratio
      const r = parseFloat(rkfsRatio);
      const p = parseInt(rkfsPole, 10);
      const baseRPM = p === 2 ? 3000 : p === 4 ? 1500 : p === 6 ? 1000 : p === 8 ? 700 : undefined;
      const outRPM = (baseRPM && r && !Number.isNaN(r) && r > 0) ? (baseRPM / r) : null;

      // คำนวณแรงบิดออก (N·m) = (9550 * kW) / rpm
      const kW = parseFloat(String(rkfsMotorPower).replace(',', '.'));
      const outTorque = (outRPM && kW && !Number.isNaN(kW)) ? (9550 * kW) / outRPM : null;

      // --- NEW: Design description map (ตาม Step 2) ---
      const designMap = {
        // R-series
        R:   "R : Helical Gearmotor / Foot-mounted / Solid shaft.",
        RF:  "RF : Helical Gearmotor / B5 Flange-mounted / Solid shaft.",
        RM:  "RM : Helical Gearmotor / B5 Flange-mounted / Solid shaft / With extended bearing hub.",
        RX:  "RX : Single stage / Helical Gearmotor / Foot-mounted / Solid shaft.",
        RXF: "RXF : Single stage / Helical Gearmotor / Foot-mounted / Solid shaft.",
        // F-series
        F:   "F : Parallel-shaft helical gearmotor / Foot-mounted / Solid shaft.",
        FA:  "FA : Parallel-shaft helical gearmotor / Foot-mounted / Hollow shaft / Keyway.",
        FAF: "FAF : Parallel-shaft helical gearmotor / B5 Flange-mounted / Hollow shaft / Keyway.",
        FAZ: "FAZ : Parallel-shaft helical gearmotor / Foot-mounted / Hollow shaft and shrink disk.",
        FF:  "FF : Parallel-shaft helical gearmotor / B5 Flange-mounted / Solid shaft.",
        // K-series
        K:   "K : Helical-bevel gearmotor / Foot-mounted / Solid shaft.",
        KA:  "KA : Helical-bevel gearmotor / Hollow shaft / Keyway.",
        KAB: "KAB : Helical-bevel gearmotor / Foot-mounted / Hollow shaft / Keyway.",
        KAF: "KAF : Helical-bevel gearmotor / Flange-mounted / Hollow shaft / Keyway.",
        KAT: "KAT : Helical-bevel gearmotor / Hollow shaft / Keyway / Torque Arm.",
        KAZ: "KAZ : Helical-bevel gearmotor / Hollow shaft and shrink disk.",
        // S-series
        S:   "S : Helical-worm gearmotor / Foot-mounted / Solid shaft.",
        SA:  "SA : Helical-worm gearmotor / Hollow shaft / Keyway.",
        SAF: "SAF : Helical-worm gearmotor / B5 Flange-mounted / Hollow shaft / Keyway.",
        SAT: "SAT : Helical-worm gearmotor / Hollow shaft / Keyway / Torque Arm.",
        SAZ: "SAZ : Helical-worm gearmotor / Hollow shaft and shrink disk."
      };
      const designDesc = rkfsDesign ? (designMap[rkfsDesign] || rkfsDesign) : "-";

      const motorTypeDescMap = {
        YE3:  "Premium Efficiency IE3",
        YE4:  "Super Premium Efficiency IE4",
        YEJ:  "Electromagnetic Brake",
        YVP:  "Variable Frequency Motor",
        YVPEJ:"Variable Frequency Brake Motor",
        YB:   "Explosion-proof Motor"
      };
      const motorTypeNote = motorTypeDescMap[rkfsMotorType] || "-";

      // --- NEW: Key สำหรับแมปค่าตามดีไซน์+ไซซ์ ---
      const dsKey = `${rkfsDesign || ''}${rkfsSize || ''}`;

      // --- NEW: Output Shaft Diameter ตาม {rkfsDesign}{rkfsSize} ---
      const shaftDiaMap = {
        R17:'Ø20',  RF17:'Ø20',
        R27:'Ø25',  RF27:'Ø25',
        R37:'Ø25',  RF37:'Ø25',
        R47:'Ø30',  RF47:'Ø30',

        F37:'Ø25',  FA37:'Ø30', FAF37:'Ø30',  FAZ37:'Ø30', FF37:'Ø25',
        F47:'Ø30',  FA47:'Ø35', FAF47:'Ø35',  FAZ47:'Ø35', FF47:'Ø30',
        F57:'Ø35',  FA57:'Ø40', FAF57:'Ø40',  FAZ57:'Ø40', FF57:'Ø35',
        F67:'Ø40',  FA67:'Ø40', FAF67:'Ø40',  FAZ67:'Ø40', FF67:'Ø40',
        F77:'Ø50',  FA77:'Ø50', FAF77:'Ø50',  FAZ77:'Ø50', FF77:'Ø50',
        F87:'Ø60',  FA87:'Ø60', FAF87:'Ø60',  FAZ87:'Ø65', FF87:'Ø60',
        F97:'Ø70',  FA97:'Ø70', FAF97:'Ø70',  FAZ97:'Ø75', FF97:'Ø70',
        F107:'Ø90',  FA107:'Ø90', FAF107:'Ø90',  FAZ107:'Ø95', FF107:'Ø90',
        F127:'Ø110',  FA127:'Ø100', FAF127:'Ø100',  FAZ127:'Ø105', FF37:'Ø110',
        F157:'Ø120',  FA157:'Ø120', FAF157:'Ø120',  FAZ157:'Ø125', FF157:'Ø120',

        K37:'Ø25',  KF37:'Ø25', KA37:'Ø30', KAB37:'Ø30',  KAF37:'Ø30', KAT37:'Ø30', KAZ37:'Ø30',
        K47:'Ø30',  KF47:'Ø30', KA47:'Ø35', KAB47:'Ø35',  KAF47:'Ø35', KAT47:'Ø35', KAZ47:'Ø35',
        K57:'Ø35',  KF57:'Ø35', KA57:'Ø40', KAB57:'Ø40',  KAF57:'Ø40', KAT57:'Ø40', KAZ57:'Ø40',
        K67:'Ø40',  KF67:'Ø40', KA67:'Ø40', KAB67:'Ø40',  KAF67:'Ø40', KAT67:'Ø40', KAZ67:'Ø40',
        K77:'Ø50',  KF77:'Ø50', KA77:'Ø50', KAB77:'Ø50',  KAF77:'Ø50', KAT77:'Ø50', KAZ77:'Ø50',
        K87:'Ø60',  KF87:'Ø60', KA87:'Ø60', KAB87:'Ø60',  KAF87:'Ø60', KAT87:'Ø60', KAZ87:'Ø65',
        K97:'Ø70',  KF97:'Ø70', KA97:'Ø70', KAB97:'Ø70',  KAF97:'Ø70', KAT97:'Ø70', KAZ97:'Ø75',
        K107:'Ø90',  KF107:'Ø90', KA107:'Ø90', KAB107:'Ø90',  KAF107:'Ø90', KAT107:'Ø90', KAZ107:'Ø95',
        K127:'Ø110',  KF127:'Ø110', KA127:'Ø100', KAB127:'Ø100',  KAF127:'Ø100', KAT127:'Ø100', KAZ127:'Ø105',
        K157:'Ø120',  KF157:'Ø120', KA157:'Ø120', KAB157:'Ø120',  KAF157:'Ø120', KAT157:'Ø120', KAZ157:'Ø125',
        K167:'Ø160', KAZ167:'Ø140',
        K187:'Ø190',  KAZ187:'Ø160',

        S37:'Ø20',  SF37:'Ø20', SA37:'Ø20', SAF37:'Ø20', SAT37:'Ø20',  SAZ37:'Ø20',
        S47:'Ø25',  SF47:'Ø30', SA47:['Ø30',',','Ø25'], SAF47:['Ø30',',','Ø25'], SAT47:['Ø30',',','Ø25'],  SAZ47:'Ø30', 
        S57:'Ø30',  SF57:'Ø30', SA57:['Ø35',',','Ø30'], SAF57:['Ø35',',','Ø30'], SAT57:['Ø35',',','Ø30'],  SAZ57:'Ø30', 
        S67:'Ø35',  SF67:'Ø35', SA67:['Ø45',',','Ø40'], SAF67:['Ø45',',','Ø40'], SAT67:['Ø45',',','Ø40'],  SAZ67:'Ø40', 
        S77:'Ø45',  SF77:'Ø45', SA77:['Ø60',',','Ø50'], SAF77:['Ø60',',','Ø50'], SAT77:['Ø60',',','Ø50'],  SAZ77:'Ø50', 
        S87:'Ø60',  SF87:'Ø60', SA87:['Ø70',',','Ø60'], SAF87:['Ø70',',','Ø60'], SAT87:['Ø70',',','Ø60'],  SAZ87:'Ø60', 
        S97:'Ø70',  SF97:'Ø70', SA97:['Ø90',',','Ø70'], SAF97:['Ø90',',','Ø70'], SAT97:['Ø90',',','Ø70'],  SAZ97:'Ø70', 

        // RX, RXF, RM เริ่ม size 57
        R57:'Ø35',  RF57:'Ø35',
        RX57:'Ø20', RXF57:'Ø20',
        RX67:'Ø25', RXF67:'Ø25',
        RX77:'Ø30', RXF77:'Ø30',
        RX87:'Ø40', RXF87:'Ø40',
        RX97:'Ø50', RXF97:'Ø50',
        RX107:'Ø60', RXF107:'Ø60',

        RM57:'Ø35',
        R67:'Ø35',  RF67:'Ø35',  RM67:'Ø40',
        R77:'Ø40',  RF77:'Ø40',  RM77:'Ø50',
        R87:'Ø50',  RF87:'Ø50',  RM87:'Ø60',
        R97:'Ø60',  RF97:'Ø60',  RM97:'Ø70',
        R107:'Ø70',  RF107:'Ø70',  RM107:'Ø80',
        R137:'Ø90',  RF137:'Ø90',  RM137:'Ø100',
        R147:'Ø110',  RF147:'Ø110',  RM147:'Ø110',
        R167:'Ø120',  RF167:'Ø120',  RM167:'Ø125', 
      };
      const outShaftDia = shaftDiaMap[dsKey] || '—';

      // --- NEW: Output Flange Diameter ตาม {rkfsDesign}{rkfsSize} ---
      const flangeDiaMap = {
        RF17:['Ø120','Ø140','Ø160'],
        RF27:['Ø120','Ø140','Ø160'],
        RF37:['Ø120','Ø140','Ø160','Ø200'],
        RF47:['Ø140','Ø160','Ø200'],
        RF57:['Ø160','Ø200','Ø250'],

        RXF57:['Ø140','Ø160','Ø200'],
        RXF67:['Ø160','Ø200','Ø250'],
        RXF77:['Ø200','Ø250'],
        RXF87:['Ø250','Ø300'],
        RXF97:['Ø300','Ø350'],
        RXF107:['Ø350','Ø450'],

        RM57:['Ø250'],
        RF67:['Ø200','Ø250'],
        RM67:['Ø300'],
        RF77:['Ø250','Ø300'],
        RM77:['Ø350'],
        RF87:['Ø300','Ø350'],
        RM87:['Ø350'],
        RF97:['Ø350','Ø450'],
        RM97:['Ø450'],
        RF107:['Ø350','Ø450'],
        RM107:['Ø550'],
        RF137:['Ø450','Ø550'],
        RM137:['Ø550'],
        RF147:['Ø450','Ø550'],
        RM147:['Ø660'],
        RF167:['Ø550','Ø660'],
        RM167:['Ø660'],

        SF37:['Ø120','Ø160'],
        SAF37:['Ø120','Ø160'],
        SHF37:['Ø120','Ø160'],
        SF47:['Ø160'],
        SAF47:['Ø160'],
        SHF47:['Ø160'],
        SF57:['Ø200'],
        SAF57:['Ø200'],
        SHF57:['Ø200'],
        SF67:['Ø200'],
        SAF67:['Ø200'],
        SHF67:['Ø200'],
        SF77:['Ø250'],
        SAF77:['Ø250'],
        SHF77:['Ø250'],
        SF87:['Ø350'],
        SAF87:['Ø350'],
        SHF87:['Ø350'],
        SF97:['Ø450'],
        SAF97:['Ø450'],
        SHF97:['Ø450'],
        
        KF37:['Ø160'],
        KAF37:['Ø160'],
        KHF37:['Ø160'],
        KF47:['Ø200'],
        KAF47:['Ø200'],
        KHF47:['Ø200'],
        KF57:['Ø250'],
        KAF57:['Ø250'],
        KHF57:['Ø250'],
        KF67:['Ø250'],
        KAF67:['Ø250'],
        KHF67:['Ø250'],
        KF77:['Ø300'],
        KAF77:['Ø300'],
        KHF77:['Ø300'],
        KF87:['Ø350'],
        KAF87:['Ø350'],
        KHF87:['Ø350'],
        KF97:['Ø450'],
        KAF97:['Ø450'],
        KHF97:['Ø450'],
        KF107:['Ø450'],
        KAF107:['Ø450'],
        KHF107:['Ø450'],
        KF127:['Ø550'],
        KAF127:['Ø550'],
        KHF127:['Ø550'],
        KF157:['Ø660'],
        KAF157:['Ø660'],
        KHF157:['Ø660'],

        FF27:['Ø136'],
        FAF27:['Ø136'],
        FHF27:['Ø136'],
        FF37:['Ø160'],
        FAF37:['Ø160'],
        FHF37:['Ø160'],
        FF47:['Ø200'],
        FAF47:['Ø200'],
        FHF47:['Ø200'],
        FF57:['Ø250'],
        FAF57:['Ø250'],
        FHF57:['Ø250'],
        FF67:['Ø250'],
        FAF67:['Ø250'],
        FHF67:['Ø250'],
        FF77:['Ø300'],
        FAF77:['Ø300'],
        FHF77:['Ø300'],
        FF87:['Ø350'],
        FAF87:['Ø350'],
        FHF87:['Ø350'],
        FF97:['Ø450'],
        FAF97:['Ø450'],
        FHF97:['Ø450'],
        FF107:['Ø450'],
        FAF107:['Ø450'],
        FHF107:['Ø450'],
        FF127:['Ø550'],
        FAF127:['Ø550'],
        FHF127:['Ø550'],
        FF157:['Ø660'],
        FAF157:['Ø660'],
        FHF157:['Ø660'],
      };
      const outFlangeList = flangeDiaMap[dsKey];

      // ===== Oil fill =====
      const oilCategory = (() => {
        if (rkfsDesign === 'RF') return 'RF';
        if (rkfsDesign === 'RX') return 'RX';
        if (rkfsDesign === 'RXF') return 'RXF';
        if (rkfsDesign === 'FF') return 'FF';
        if (['F','FA','FAF','FAZ','FH','FHF','FHZ','FV','FVF','FVZ','FT'].includes(rkfsDesign)) return 'F';
        if (rkfsDesign === 'S') return 'S';
        if (rkfsDesign === 'SF') return 'SF';
        if (['SA','SAF','SAZ','SAT','SH','SHF','SHZ','ST'].includes(rkfsDesign)) return 'S_OTHER';
        if (['K','KA','KAB','KAF','KAT','KAZ'].includes(rkfsDesign)) return 'K';
        return 'R';
      })();

      const OIL_DATA = {
  R: {
    "17":[0.25,0.55,0.35,0.55,0.35,0.40],
    "27":["0.25/0.40",0.70,0.50,0.70,0.50,0.50],
    "37":["0.30/0.95",0.85,0.95,1.05,0.75,0.95],
    "47":["0.70/1.50",1.60,1.50,1.65,1.50,1.50],
    "57":["0.80/1.70",1.90,1.70,2.10,1.70,1.70],
    "67":["1.10/2.30",2.40,2.80,2.90,1.80,2.00],
    "77":["1.20/3.00",3.30,3.60,3.80,2.50,3.40],
    "87":["2.30/6.0",6.4,7.2,7.2,6.3,6.5],
    "97":["4.60/9.8",11.7,11.7,13.4,11.3,11.7],
    "107":["6.0/13.7",16.3,16.9,19.2,13.2,15.9],
    "137":["10.0/25.0",28.0,29.5,31.5,25.0,25.0],
    "147":["15.4/40.0",46.5,48.0,52.0,39.5,41.0],
    "167":["27.0/70.0",82.0,78.0,88.0,66.0,69.0],
  },
  RF: {
    "17":[0.25,0.55,0.35,0.55,0.35,0.40],
    "27":["0.25/0.40",0.70,0.50,0.70,0.50,0.50],
    "37":["0.35/0.95",0.90,0.95,1.05,0.75,0.95],
    "47":["0.65/1.50",1.60,1.50,1.65,1.50,1.50],
    "57":["0.80/1.70",1.80,1.70,2.00,1.70,1.70],
    "67":["1.20/2.50",2.50,2.70,2.80,1.90,2.10],
    "77":["1.20/2.60",3.10,3.30,3.60,2.40,3.00],
    "87":["2.40/6.0",6.4,7.1,7.2,6.3,6.4],
    "97":["5.1/10.2",11.9,11.2,14.0,11.2,11.8],
    "107":["6.3/14.9",15.9,17.0,19.2,13.1,15.9],
    "137":["9.5/25.0",27.0,29.0,32.5,25.0,25.0],
    "147":["16.4/42.0",47.0,48.0,52.0,42.0,42.0],
    "167":["26.0/70.0",82.0,78.0,88.0,65.0,71.0],
  },
  RX: {
    "57":[0.60,0.80,1.30,1.30,0.90,0.90],
    "67":[0.80,0.80,1.70,1.90,1.10,1.10],
    "77":[1.10,1.50,2.60,2.70,1.60,1.60],
    "87":[1.70,2.50,4.80,4.80,2.90,2.90],
    "97":[2.10,3.40,7.40,7.00,4.80,4.80],
    "107":[3.90,5.60,11.60,11.90,7.70,7.70],
  },
  RXF: {
    "57":[0.50,0.80,1.10,1.10,0.70,0.70],
    "67":[0.70,0.80,1.50,1.40,1.00,1.00],
    "77":[0.90,1.30,2.40,2.00,1.60,1.60],
    "87":[1.60,1.95,4.90,3.95,2.90,2.90],
    "97":[2.10,3.70,7.10,6.30,4.80,4.80],
    "107":[3.10,5.70,11.20,9.30,7.20,7.20],
  },
  // F-family: F, FA, FAZ, FAF, FH, FV ... (เท่ากันตามตาราง)
  F: {
    "27":[0.60,0.80,0.65,0.70,0.60,0.60],
    "37":[0.95,1.25,0.70,1.25,1.00,1.10],
    "47":[1.50,1.80,1.10,1.90,1.50,1.70],
    "57":[2.60,3.50,2.10,3.50,2.80,2.90],
    "67":[2.70,3.80,1.90,3.80,2.90,3.20],
    "77":[5.90,7.30,4.30,8.00,6.00,6.30],
    "87":[10.80,13.00,7.70,13.80,10.80,11.00],
    "97":[18.50,22.50,12.60,25.20,18.50,20.00],
    "107":[24.50,32.00,19.50,37.50,27.00,27.00],
    "127":[40.50,54.50,34.00,61.00,46.30,47.00],
    "157":[69.00,104.00,63.00,105.00,86.00,78.00],
  },
  FF: {
    "27":[0.60,0.80,0.65,0.70,0.60,0.60],
    "37":[1.00,1.25,0.70,1.30,1.00,1.10],
    "47":[1.60,1.85,1.10,1.90,1.50,1.70],
    "57":[2.80,3.50,2.10,3.70,2.90,3.00],
    "67":[2.70,3.80,1.90,3.80,2.90,3.20],
    "77":[5.90,7.30,4.30,8.10,6.00,6.30],
    "87":[10.80,13.20,7.80,14.10,11.00,11.20],
    "97":[19.00,22.50,12.60,25.60,18.90,20.50],
    "107":[25.50,32.00,19.50,38.50,27.50,28.00],
    "127":[41.50,55.50,34.00,63.00,46.30,49.00],
    "157":[72.00,105.00,64.00,106.00,87.00,79.00],
  },
  // K-family: K, KA, KAB, KAF, KAT, KAZ (เท่ากันตามตาราง K.., KA..B, KH..B, KV..B)
  K: {
    "37":[0.50,1.00,1.00,1.25,0.95,0.95],
    "47":[0.80,1.30,1.50,2.00,1.60,1.60],
    "57":[1.10,2.20,2.20,2.80,2.30,2.10],
    "67":[1.10,2.40,2.70,3.45,2.60,2.60],
    "77":[2.20,4.10,4.40,5.80,4.20,4.40],
    "87":[3.70,8.00,8.70,10.90,8.00,8.00],
    "97":[7.00,14.00,15.70,20.00,15.70,15.50],
    "107":[10.00,21.00,25.50,33.50,24.00,24.00],
    "127":[21.00,41.50,44.00,54.00,40.00,41.00],
    "157":[31.00,62.00,65.00,90.00,58.00,62.00],
    "167":[33.00,95.00,105.00,123.00,85.00,84.00],
    "187":[53.00,152.00,167.00,200.00,143.00,143.00],
  },

// ===== NEW: S =====
  S: {
    "37":[0.25,0.40,0.50,0.55,0.40,0.40],
    "47":[0.35,0.80,"0.70/0.90",1.00,0.80,0.80],
    "57":[0.50,1.20,"1.00/1.20",1.45,1.30,1.30],
    "67":[1.00,2.00,"2.20/3.10",3.10,2.60,2.60],
    "77":[1.90,4.20,"3.70/5.4",5.90,4.40,4.40],
    "87":[3.30,8.10,"6.9/10.4",11.30,8.40,8.40],
    "97":[6.80,15.00,"13.4/18.0",21.80,17.00,17.00],
  },

  // ===== NEW: SF.. =====
  SF: {
    "37":[0.25,0.40,0.50,0.55,0.40,0.40],
    "47":[0.40,0.90,"0.90/1.05",1.05,1.00,1.00],
    "57":[0.50,1.20,"1.00/1.50",1.55,1.40,1.40],
    "67":[1.00,2.20,"2.30/3.00",3.20,2.70,2.70],
    "77":[1.90,4.10,"3.90/5.8",6.50,4.90,4.90],
    "87":[3.80,8.00,"7.1/10.1",12.00,9.10,9.10],
    "97":[7.40,15.00,"13.8/18.8",22.60,18.00,18.00],
  },

  // ===== NEW: SA/SAF/SAZ/SAT/SH/SHF/SHZ/ST =====
  S_OTHER: {
    "37":[0.25,0.40,0.50,0.50,0.40,0.40],
    "47":[0.40,0.80,"0.70/0.90",1.00,0.80,0.80],
    "57":[0.50,1.10,"1.00/1.50",1.50,1.20,1.20],
    "67":[1.00,2.00,"1.80/2.60",2.90,2.50,2.50],
    "77":[1.80,3.90,"3.60/5.0",5.80,4.50,4.50],
    "87":[3.80,7.40,"6.0/8.7",10.80,8.00,8.00],
    "97":[7.00,14.00,"11.4/16.0",20.50,15.70,15.70],
  },
};

      // เลือกค่าตาม Mounting (M1..M6) และจัดการ a/b ด้วยค่าที่มากกว่า
      const mountIdx = { M1:0, M2:1, M3:2, M4:3, M5:4, M6:5 };
      const oilArr = OIL_DATA[oilCategory]?.[String(rkfsSize)];
      let oilLiters = null;
      if (oilArr && rkfsMounting && mountIdx[rkfsMounting] != null) {
        const raw = oilArr[mountIdx[rkfsMounting]];
        if (raw != null) {
          oilLiters = (typeof raw === 'string' && raw.includes('/'))
            ? Math.max(...raw.split('/').map(v => parseFloat(v)))
            : Number(raw);
        }
      }

      return (
        <div className="max-w-3xl mx-auto text-left bg-black/25 rounded-xl px-5 py-4 backdrop-blur-sm text-white/90 text-sm md:text-base leading-7">
          <div>Series : <b>{series}</b></div>
          <div>Design : <b>{designDesc}</b></div>
          <div>Gear Size : <b>{design}{size}</b></div>
          <div>Ratio : <b>{ratioS}</b></div>
          <div>Input Selection : <b>{inpSel}</b></div>
          {/* [ADD] IEC: แสดงขนาดหน้าแปลน/รูตาม AM */}
{rkfsInputSel === 'IEC Adapter Motor' && (
  <>
    <div>Input flange diameter : <b>G5 Ø{amDims?.G5 ?? '—'} mm</b></div>
    <div>Input hole diameter : <b>D1 Ø{amDims?.D1 ?? '—'} mm</b></div>
  </>
)}

{/* [ADD] INPUT: แสดงขนาดเพลาขาเข้า */}
{rkfsInputSel === 'INPUT Shaft' && (
  <div>Input shaft diameter : <span className="text-blue-400 font-extrabold text-xl"><b>{inputShaftDia ? `${inputShaftDia.replace('Ø','Ø')} mm` : '—'}</b></span></div>
)}
   {rkfsInputSel === 'IEC Adapter Motor' ? (
  <div>
    Motor Type : For motor (<b>{mKWs || '-'}</b>) kW , Frame size : (<b>{amCodeForKW || '-'}</b>)
  </div>
) : rkfsInputSel === 'INPUT Shaft' ? (
  <div>
    Motor Type : For your design.
  </div>
) : (
  <div>
    Motor Type : <b>{mKWs}</b> kW , <b>{poleS}</b> Pole , 3Phase380VAC,50Hz,IP55,Class F, <b>{mType}</b>, <b>{motorTypeNote}</b>.
  </div>
)}
          <div>Output speed (rpm) : <b>{outRPM ? outRPM.toFixed(2) : '-'}</b></div>
          <div>Output Torque (N·m) : <b>{outTorque ? outTorque.toFixed(2) : '-'}</b></div>
          <div>Shaft Direction : <b>{shaftPos}</b></div>
          <div>Mouting Position : <b>{MTP}</b></div>
          <div>ระดับการเติมน้ำมันเกียร์ : <b>{oilLiters != null ? oilLiters : '—'} ลิตร (liters)</b></div>
          <div>Terminal box : <b>{MTT}</b></div>
          <div>Cable Wire Position : <b>{MTC}</b></div>
          <div>Output Shaft Diameter : <b>{outShaftDia}</b></div>
          <div>
            Output Flange Diameter : <b>{outFlangeList ? outFlangeList.join(' , ') : '—'}</b>
            {' '}<span className="text-red-200 font-semibold">**โปรดระบุขนาดก่อนยืนยันสั่งซื้อ</span>
          </div>
          <div><span className="text-yellow-400 font-extrabold text-l">Warranty : <b>2 Years</b></span></div>
        </div>
      );
    })()}

    {/* ปุ่มยืนยัน: ส่งโค้ดตามโหมด (ไม่แตะโครงสร้างเดิมของ With motor) */}
    {(() => {
      // เตรียมโค้ดตามโหมด
      const amCode   = (typeof getRkfsIECByPower === 'function') ? getRkfsIECByPower(rkfsMotorPower) : null;
      const shaftCode = state?.rkfsINPUTshaft ?? state?.rkfsInputShaft ?? null;
      const diaVal    = state?.rkfsINPUTshaftDia ?? state?.rkfsInputShaftDia ?? null;

      let confirmModel;
      if (rkfsInputSel === 'IEC Adapter Motor' && rkfsRatio && rkfsMounting && amCode) {
        confirmModel = `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${amCode}-${rkfsMounting}`;
      } else if (rkfsInputSel === 'INPUT Shaft' && rkfsRatio && rkfsMounting && shaftCode) {
        const dia = diaVal ? `-${diaVal}` : '';
        confirmModel = `${rkfsDesign}${rkfsSize}-${rkfsRatio}-${shaftCode}-${rkfsMounting}${dia}`;
      } else {
        // With motor (เดิม)
        confirmModel = `${rkfsDesign}${rkfsSize}-${rkfsMotorType}-${rkfsMotorPower}-${rkfsPole}-${rkfsRatio}-${rkfsMounting}${rkfsPosition ? `-${rkfsPosition}` : ''}${rkfsPositionSub ? `-${rkfsPositionSub}` : ''}${state.rkfsDesignSuffix ? `-${state.rkfsDesignSuffix}` : ''}`;
      }

      return (
        <button
          type="button"
          onClick={() => onConfirm(confirmModel)}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 shadow"
        >
          ✅ รับไฟล์ 3D
        </button>
      );
    })()}
    <div
  className="fixed z-[999]"
  style={{
    left: 'max(1.5rem, env(safe-area-inset-right))',
    bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
  }}
>
  <button
    onClick={(e) =>
      clickSweep(e, () => {
        if (rkfsSeries === 'K' || rkfsSeries === 'S') {
          // จังหวะที่ 1: จาก Step 10 → กลับไป Step 9.3 (ล้าง A/B/AB/TA/TB)
          if (state.rkfsDesignSuffix) {
            update('rkfsDesignSuffix', null);
            setTimeout(() => {
              document.getElementById('rkfs-step-93')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
          } else {
            // จังหวะที่ 2: (กรณีไม่มี suffix แล้ว) → กลับ Step 9.2 (Cable Wire Position)
            update('rkfsPositionSub', null);
            setTimeout(() => {
              document.getElementById('rkfs-step-92')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
          }
        } else {
          // R/F: พฤติกรรมเดิม → กลับ Step 9.2
          update('rkfsPositionSub', null);
        }
      })
    }
    className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
  >
    ย้อนกลับ
  </button>
{/* [ADD-IEC-INPUT-BACK-10-RF] ปุ่มย้อนกลับเฉพาะ R/F + IEC/INPUT → กลับไป Step 8 (Mounting) */}
{ ( (rkfsSeries === 'R' || rkfsSeries === 'F') &&
    (rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft')
  ) && (
  <div
    className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
    <button
      onClick={(e) => clickSweep(e, () => {
        // เคลียร์ Mounting เพื่อให้ Step 8 โชว์
        update('rkfsMounting', null);
        // เลื่อนจอไปยัง Step 8 เพื่อให้ผู้ใช้เห็นทันที
        setTimeout(() => {
          document
            .getElementById('rkfs-mount-step')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      })}
      className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
    >
      ย้อนกลับ
    </button>
  </div>
)}
{/* [ADD-IEC-INPUT-BACK-10] ปุ่มย้อนกลับเฉพาะ IEC / INPUT */}
{ (rkfsSeries === 'K' || rkfsSeries === 'S') &&
  (rkfsInputSel === 'IEC Adapter Motor' || rkfsInputSel === 'INPUT Shaft') && (
  <div
    className="fixed z-[999]"
    style={{
      left: 'max(1.5rem, env(safe-area-inset-right))',
      bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }}
  >
    <button
      onClick={(e) => clickSweep(e, () => {
        // K / S → ย้อนกลับไป Step 9.3
        if (rkfsSeries === 'K' || rkfsSeries === 'S') {
          update('rkfsDesignSuffix', null); // ให้ 9.3 โชว์อีกครั้ง
          setTimeout(() => {
            document
              .getElementById('rkfs-step-93')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0);
        } else {
          // R / F → ย้อนกลับไป Step Mounting
          update('rkfsMounting', null);
        }
      })}
      className="bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow"
    >
      ย้อนกลับ
    </button>
  </div>
)}
    {/* [ADD-RKFS-LIGHTBOX] คลิกภาพแล้วขยายเต็มจอ (แก้ให้ซ่อนจนกว่าจะเปิด) */}
<dialog
  id="rkfs-illust-modal"
  /* ซ่อนเป็นค่าเริ่มต้น แล้วค่อยโชว์เมื่อ open */
  className="hidden open:fixed open:inset-0 open:z-[9999] open:bg-black/80 open:backdrop-blur-sm open:p-4 open:flex open:items-center open:justify-center"
  /* คลิกพื้นดำปิด */
  onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
>
  {/* ปล่อย form ว่าง ๆ ไว้สำหรับปุ่ม type=submit จะ close() อัตโนมัติ */}
  <form method="dialog" className="contents">
        {(() => {
          const bigSrc = rkfsInputSel === 'IEC Adapter Motor'
            ? RKFS_IEC_IMG?.[rkfsSeries]
            : (rkfsInputSel === 'INPUT Shaft'
                ? RKFS_INPUT_GIF?.[rkfsSeries]
                : null);
          if (!bigSrc) return null;
          return (
            <img
              src={bigSrc}
              alt="RKFS illustration"
              className="max-h-[92vh] max-w-[96vw] w-auto h-auto
                         object-contain rounded-xl shadow-2xl"
            />
          );
        })()}
        <button
  type="submit"
  className="absolute top-4 right-4 text-white/90 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-3 py-1 text-sm font-semibold"
>
  ปิด
</button>
      </form>
    </dialog>
  </div>
    </div>
)}
</> ); }


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
            <Section title="Step 6: Speed code" note="15S=1500rpm, 20S=2000rpm,  30S=3000rpm">
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
              ยืนยัน
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
              ยืนยัน
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
export function generateHBModelCode(hbState) {
  const {
    hbSeries,          // 'HB' หรือ 'ZDYFAMILY' (กดจาก Step1)
    hbHBType,          // 'H' | 'B' (เฉพาะเมื่อเลือก HB Series)
    hbStage,           // 1..4 (H: 1–4, B: 2–4)
    hbOutput,          // 'S'|'H'|'D'|'K'|'F'|'DF' (ตาม series/เงื่อนไข)
    hbMount,           // 'H'|'V'
    hbSize,            // เลข size ตาม step6
    hbRatio,           // ค่าอัตราทดจาก step7
    hbShaftDesign,     // 'A'..'I' (H), 'A'..'F' (B)
    hbZdySelected      // กรณี ZDY/… (Step2 รายการ 10 ปุ่ม) – ยังไม่รวมลงรหัสจนกว่าจะสเปกฟอร์แมต
  } = hbState || {};

  // เฉพาะ HB Series สร้างโค้ดทันที
  if (hbSeries === 'HB') {
    if (!hbHBType || !hbStage || !hbOutput || !hbMount || !hbSize || !hbRatio || !hbShaftDesign) {
      return null;
    }
    const seriesLetter = hbHBType; // 'H' หรือ 'B'
    const stageStr     = String(hbStage);
    const outStr       = hbOutput; // S/H/D/K/F/DF
    const mountStr     = hbMount;  // H/V
    const sizeStr      = String(hbSize);
    const ratioStr     = String(hbRatio);
    const designStr    = hbShaftDesign; // A..I หรือ A..F

    return `${seriesLetter}${stageStr}${outStr}${mountStr}${sizeStr}-${ratioStr}-${designStr}`;
  }

  // ZDY/… Series: ยังรอข้อมูลรูปแบบโค้ด → คืน null ไปก่อน
  return null;
}

// === [ADD] HB: Render Flow ===
// Step 1 → Step 9 ตามสเปกผู้ใช้
export function renderHBGearFlow(hbState, hbSetters, onConfirm, onHome, onDownload) {
  const {
    hbSeries, hbHBType, hbStage, hbOutput, hbMount,
    hbSize, hbRatio, hbShaftDesign, hbZdySelected
  } = hbState || {};

  const update = (k, v) => {
    const fn = hbSetters?.[`set${k.charAt(0).toUpperCase()}${k.slice(1)}`];
    if (typeof fn === 'function') fn(v);
  };

// ===== Helpers: reset / back / home =====
 const resetAll = () => {
   update('hbSeries', null);
   update('hbHBType', null);
   update('hbStage', null);
   update('hbOutput', null);
   update('hbMount', null);
   update('hbSize', null);
   update('hbRatio', null);
   update('hbShaftDesign', null);
   update('hbZdySelected', null);
 };

 const goHome = () => {
   resetAll();
   if (typeof onHome === 'function') onHome(); // ให้ App.jsx พากลับหน้า Product + เคลียร์ state แบบ global
 };

 // ถอยกลับทีละขั้น (ลำดับย้อนกลับจาก Step9 → Step1)
 const goBack = () => {
   if (hbShaftDesign != null) return update('hbShaftDesign', null);
   if (hbRatio != null)       return update('hbRatio', null);
   if (hbSize != null)        return update('hbSize', null);
   if (hbMount != null)       return update('hbMount', null);
   if (hbOutput != null)      return update('hbOutput', null);
   if (hbStage != null)       return update('hbStage', null);
   if (hbHBType != null)      return update('hbHBType', null);
   if (hbZdySelected != null) return update('hbZdySelected', null);
   if (hbSeries != null)      return update('hbSeries', null);
 };

  // --- Utilities ---
 const Tile = ({img, label, onClick, big}) => {
   const [clicked, setClicked] = React.useState(false);

   const handleClick = () => {
     setClicked(true);
     setTimeout(() => {
       onClick && onClick();
       setClicked(false);
     }, 600); // รอ animation จบแล้วไป Step ต่อไป
   };

   return (
     <button
       onClick={handleClick}
       className={`relative tilt-card hb-gradient-effect hb-click-animate rounded-xl p-4 shadow-md ${clicked ? 'clicked' : ''}`}
     >
       <span className="sheen-layer"></span>
       <span className="glow-layer"></span>
       <img
         src={img}
         alt={label}
         className={`${big ? 'h-84 w-84' : 'h-68 w-68'} object-contain card-image`}
       />
       <div className="mt-2 text-base font-semibold">{label}</div>
     </button>
   );
 };

  // --- Step 1: เลือกตระกูล ---
  if (!hbSeries) {
    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-white font-bold mb-2 drop-shadow">Serier Selection</h3>
        <div className="grid grid-cols-2 gap-5 justify-items-center">
   <Tile img={HB1Img}  label="HB Series" onClick={() => update('hbSeries','HB')} big />
   <Tile img={ZDY1Img} label="ZDY/ZLY/ZSY/…" onClick={() => update('hbSeries','ZDYFAMILY')} big />
 </div>
      </div>
    );
  }

  // --- Step 2: ถ้า HB Series → เลือก H/B | ถ้า ZDYFAMILY → แสดง 10 ปุ่ม ---
  if (hbSeries === 'HB' && !hbHBType) {
    return (
      <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
          Series Selection H or B
        </h3>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          <Tile img={HTypeImg} label="H Series" onClick={() => update('hbHBType','H')} />
          <Tile img={BTypeImg} label="B Series" onClick={() => update('hbHBType','B')} />
        </div>
      </div>
    );
  }

  if (hbSeries === 'ZDYFAMILY' && !hbZdySelected) {
    const ZLIST = [
      {k:'ZDY',img:ZDYImg},{k:'ZLY',img:ZLYImg},{k:'ZSY',img:ZSYImg},{k:'ZFY',img:ZFYImg},
      {k:'DBY',img:DBYImg},{k:'DCY',img:DCYImg},{k:'DFY',img:DFYImg},
      {k:'DBYK',img:DBYKImg},{k:'DCYK',img:DCYKImg},{k:'DFYK',img:DFYKImg},
    ];
    return (
      <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 2 — เลือก Series (ZDY/ZLY/…)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {ZLIST.map(it => (
            <Tile key={it.k} img={it.img} label={it.k} onClick={() => update('hbZdySelected',it.k)} />
          ))}
        </div>
        <p className="text-white/80 mt-2">* กลุ่มนี้จะลงรายละเอียดเพิ่มเติมภายหลัง</p>
      </div>
    );
  }

  // --- Step 3: Stage of Gear ---
  if (hbSeries === 'HB' && hbHBType && !hbStage) {
    const HST = [
      {label:'1 Stage', img:HST1Img, v:1},
      {label:'2 Stage', img:HST2Img, v:2},
      {label:'3 Stage', img:HST3Img, v:3},
      {label:'4 Stage', img:HST4Img, v:4},
    ];
    const BST = [
      {label:'2 Stage', img:BST2Img, v:2},
      {label:'3 Stage', img:BST3Img, v:3},
      {label:'4 Stage', img:BST4Img, v:4},
    ];
    const LIST = hbHBType === 'H' ? HST : BST;

    return (
      <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 3 — Stage of Gear</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          {LIST.map(it => (
            <Tile key={it.v} img={it.img} label={it.label} onClick={() => update('hbStage', it.v)} big />
          ))}
        </div>
      </div>
    );
  }

  // --- Step 4: Output shaft structure ---
  if (hbSeries === 'HB' && hbHBType && hbStage && !hbOutput) {
    const isH = hbHBType === 'H';
    const allow = isH
      ? (hbStage === 1
          ? [{k:'S',label:'S Solid shaft',img:H__SImg}] // H + 1Stage → S เท่านั้น
          : [
              {k:'S',label:'S Solid shaft',img:H__SImg},
              {k:'H',label:'H Hollow shaft-Keyway',img:H__HImg},
              {k:'D',label:'D Hollow shaft-Shrink disc',img:H__DImg},
              {k:'K',label:'K Hollow shaft-Splined',img:H__KImg},
              {k:'F',label:'F Hollow shaft-Keyway-Flange mounted',img:H__FImg},
            ])
      : [
          {k:'S',label:'S Solid shaft',img:B__SImg},
          {k:'H',label:'H Hollow shaft-Keyway',img:B__HImg},
          {k:'D',label:'D Hollow shaft-Shrink disc',img:B__DImg},
          {k:'DF',label:'DF Hollow shaft-Shrink disc with fan',img:B__DFImg},
          {k:'K',label:'K Hollow shaft-Splined',img:B__KImg},
          {k:'F',label:'F Hollow shaft-Keyway-Flange mounted',img:B__FImg},
        ];

    return (
      <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 4 — Output shaft structure</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {allow.map(it => (
            <Tile key={it.k} img={it.img} label={it.label} onClick={() => update('hbOutput', it.k)} big />
          ))}
        </div>
      </div>
    );
  }

  // --- Step 5: Mounting Position (H/V) ---
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && !hbMount) {
    const imgs = hbHBType === 'H'
      ? [{k:'H',label:'H : Horizontal',img:HHORImg},{k:'V',label:'V : Vertical',img:HVERImg}]
      : [{k:'H',label:'H : Horizontal',img:BHORImg},{k:'V',label:'V : Vertical',img:BVERImg}];

    return (
      <div className="space-y-4 mt-6">
             <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 5 — Mounting Position</h3>
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {imgs.map(it => (
            <Tile key={it.k} img={it.img} label={it.label} onClick={() => update('hbMount', it.k)} />
          ))}
        </div>
      </div>
    );
  }

  // --- Step 6: Gear Size (ตามเงื่อนไขที่ให้) ---
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && !hbSize) {
    let sizeList = [];
    if (hbHBType === 'H') {
      if (hbStage === 1) sizeList = [1,3,5,7,9,11,13,15,17,19];
      if (hbStage === 2) sizeList = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
      if (hbStage === 3) sizeList = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
      if (hbStage === 4) sizeList = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    } else {
      if (hbStage === 2) sizeList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
      if (hbStage === 3) sizeList = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
      if (hbStage === 4) sizeList = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    }
    return (
      <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 6 — Gear Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeList.map(s => (
            <button key={s} onClick={() => update('hbSize', s)} className="px-4 py-2 rounded bg-white shadow hover:shadow-lg">{s}</button>
          ))}
        </div>
      </div>
    );
  }

  // --- Step 7: Ratio (ตามเงื่อนไขที่ให้) ---
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && hbSize && !hbRatio) {
    let ratioList = [];
    if (hbHBType === 'H') {
      if (hbStage === 1) ratioList = [1.25,1.4,1.6,1.8,2,2.24,2.5,2.8,3.15,3.55,4,4.5,5,5.6];
      if (hbStage === 2) ratioList = [6.3,7.1,8,9,10,11.2,12.5,14,16,18,20,22.4,25,28];
      if (hbStage === 3) ratioList = [22.4,25,28,31.5,35.5,40,45,50,56,63,71,80,90,100,112];
      if (hbStage === 4) ratioList = [100,112,125,140,160,180,200,224,250,280,315,355,400,450];
    } else {
      if (hbStage === 2) ratioList = [5,5.6,6.3,7.1,8,9,10,11.2,12.5,14,16,18];
      if (hbStage === 3) ratioList = [12.5,14,16,18,20,22.4,25,28,31.5,35.5,40,45,50,56,63,71,80,90];
      if (hbStage === 4) ratioList = [80,90,100,112,125,140,160,180,200,224,250,280,315,355,400];
    }
    return (
      <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 7 — Ratio</h3>
        <div className="flex flex-wrap gap-2">
          {ratioList.map(r => (
            <button key={r} onClick={() => update('hbRatio', r)} className="px-4 py-2 rounded bg-blue-200 hover:bg-blue-400">{r}</button>
          ))}
        </div>
      </div>
    );
  }

  // --- Step 8: Shaft Design ---
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && hbSize && hbRatio && !hbShaftDesign) {
    const list = hbHBType === 'H'
      ? ['A','B','C','D','E','F','G','H','I']
      : ['A','B','C','D','E','F'];
    return (
      <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 8 — Shaft Design</h3>
        <div className="flex flex-wrap gap-2">
          {list.map(ch => (
            <button key={ch} onClick={() => update('hbShaftDesign', ch)} className="px-4 py-2 rounded bg-white shadow hover:shadow-lg">{ch}</button>
          ))}
        </div>
      </div>
    );
  }

  // --- Step 9: Model Code + Final ---
  if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && hbSize && hbRatio && hbShaftDesign) {
    const code = generateHBModelCode(hbState);
        return (
      <div className="text-center space-y-4 mt-6">
            <div className="flex justify-between items-center">
         <button onClick={goBack} className="text-white/90 hover:underline">← Back</button>
       </div>
        <h2 className="text-2xl font-bold text-blue-700">{code}</h2>
                <div className="flex flex-col items-center gap-3">
         {/* ดาวน์โหลด → ให้ App เปิดฟอร์มเดียวกับ product อื่น */}
         <button
           onClick={() => onDownload && code && onDownload(code)}
           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
         >
           ดาวน์โหลด 3D .STEP
         </button>
         {/* เสร็จสิ้น → กลับ Home และ reset HB */}
         <button
           onClick={goHome}
           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         >
           เสร็จสิ้น
         </button>
       </div>
      </div>
    );
  }

  // กรณี ZDYFAMILY เลือกแล้ว แต่ยังไม่มีสเปกถัดไป
  if (hbSeries === 'ZDYFAMILY' && hbZdySelected) {
    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-white font-bold drop-shadow">คุณเลือก: {hbZdySelected}</h3>
        <p className="text-white/80">* รอข้อมูลสเปกเพิ่มเติมเพื่อสร้างขั้นตอนต่อไป</p>
      </div>
    );
  }

  return null;
}

// ============================
// SRV Worm Gear Flow
// ============================
export function renderSRVFlow(state, setState, onConfirm) {
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

        <button
          onClick={() => onConfirm(code)}
          className="mt-3 px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition bg-emerald-500 text-white font-semibold"
        >
          ยืนยันและรับไฟล์ 3D
        </button>
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





