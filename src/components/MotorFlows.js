// MotorFlows.js
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FinalResult from './FinalResult';
import ACImg from '../assets/ac/ac.png';
import DCImg from '../assets/dc/dc.png';
import BLDCImg from '../assets/bldc/bldc.png';
import ServoImg from '../assets/servo/servo.png';
import PlanetaryImg from '../assets/planetary/planetary.png';
import HypoidImg from '../assets/hypoid/hypoid.png';
import RKFSImg from '../assets/rkfs/rkfs.png';
import CYCLOImg from '../assets/cyclo/cyclo.png';
import SPNImg from '../assets/spn/spn.png';
import HBImg from '../assets/hb/hb.png';
import PPlanetaryImg from '../assets/pplanetary/pplanetary.png';
import SMRImg from '../assets/smr/smr.png';
import SRVImg from '../assets/srv/srv.png';
import SMALLACImg from '../assets/smallac/smallac.png';
import DriverImg from '../assets/driver/driver.png';
import BMKImg from '../assets/bmk/bmk.png';
import IECImg from '../assets/iec/iec.png';
import WPImg from '../assets/wp/wp.png';

import SingleImg from '../assets/ac/Voltage/Single.png';
import ThreeImg from '../assets/ac/Voltage/Three.png';

import FanImg from '../assets/ac/Optional/Fan.png';
import TmbImg from '../assets/ac/Optional/Tmb.png';
import EmbImg from '../assets/ac/Optional/Emb.png';
import FcfImg from '../assets/ac/Optional/Fcf.png';
import TmpImg from '../assets/ac/Optional/Tmp.png';
import StdImg from '../assets/ac/Optional/Std.png';

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

import HADesignImg from '../assets/hb/HADesign.png';
import HBDesignImg from '../assets/hb/HBDesign.png';
import HCDesignImg from '../assets/hb/HCDesign.png';
import HDDesignImg from '../assets/hb/HDDesign.png';
import HEDesignImg from '../assets/hb/HEDesign.png';
import HFDesignImg from '../assets/hb/HFDesign.png';
import HGDesignImg from '../assets/hb/HGDesign.png';
import HHDesignImg from '../assets/hb/HHDesign.png';
import HIDesignImg from '../assets/hb/HIDesign.png';
import BADesignImg from '../assets/hb/BADesign.png';
import BBDesignImg from '../assets/hb/BBDesign.png';
import BCDesignImg from '../assets/hb/BCDesign.png';
import BDDesignImg from '../assets/hb/BDDesign.png';
import BEDesignImg from '../assets/hb/BEDesign.png';
import BFDesignImg from '../assets/hb/BFDesign.png';

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
import emailjs from '@emailjs/browser';


/** แปลง/ดึง size เป็นตัวเลขจากรูปแบบที่อาจเป็น string (เช่น "H14") */
function normalizeSize(size) {
  if (typeof size === 'number' && Number.isFinite(size)) return size;
  if (size == null) return null;
  const m = String(size).match(/(\d{1,3})$/);
  return m ? Number(m[1]) : null;
}

/** ใช้ lookup สเปกจาก Series/Stage/Size
 *  @returns { od?: number, oil?: number, weight?: number } | null
 */
function lookupGearSpecs(series, stage, size) {
  if (!series || !stage || !size) return null;
  const S = String(series).toUpperCase();
  const st = Number(stage);
  const sz = Number(size);
  const rec = GEAR_SPECS?.[S]?.[st]?.[sz];
  return rec ? { ...rec } : null;
}


// ===== [ADD] Nominal Power tables (H/B) + helpers =====

// ---------- H Series ----------
export const H1_PN1500_BY_SIZE = {
  1:{1.25:99, 1.4:93 , 1.6:85 , 1.8:79 , 2:73 , 2.24:67 , 2.5:63 , 2.8:56 , 3.15:50 , 3.55:44 , 4:39 , 4.5:29 , 5:25 , 5.6:17},2:{},3:{1.25:327, 1.4:303 , 1.6:285 , 1.8:209 , 2:196 , 2.24:175 , 2.5:163 , 2.8:152 , 3.15:135 , 3.55:124 , 4:110 , 4.5:77 , 5:66 , 5.6:56},4:{},5:{1.25:880, 1.4:807 , 1.6:737 , 1.8:672 , 2:644 , 2.24:589 , 2.5:528 , 2.8:471 , 3.15:419 , 3.55:368 , 4:330 , 4.5:234 , 5:198 , 5.6:168},6:{},7:{1.25:1671, 1.4:1559 , 1.6:1395 , 1.8:1326 , 2:1217 , 2.24:1087 , 2.5:974 , 2.8:836 , 3.15:758 , 3.55:687 , 4:609 , 4.5:481 , 5:377 , 5.6:320},8:{},9:{1.25:2702, 1.4:2501 , 1.6:2318 , 1.8:2128 , 2:1963 , 2.24:1754 , 2.5:1571 , 2.8:1330 , 3.15:1221 , 3.55:1103 , 4:982 , 4.5:746 , 5:644 , 5.6:491},10:{},
  11:{1.6:3929 , 1.8:3611 , 2:3353 , 2.24:3087 , 2.5:2764 , 2.8:2470 , 3.15:2088 , 3.55:1936 , 4:1728 , 4.5:1395 , 5:1059 , 5.6:892},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},
  21:{},22:{},23:{},24:{},25:{},26:{},
};
export const H1_PN1000_BY_SIZE = {
  1:{1.25:66, 1.4:62 , 1.6:57 , 1.8:53 , 2:49 , 2.24:45 , 2.5:42 , 2.8:37 , 3.15:33 , 3.55:30 , 4:26 , 4.5:19 , 5:16 , 5.6:12},2:{},3:{1.25:218, 1.4:202 , 1.6:190 , 1.8:140 , 2:131 , 2.24:117 , 2.5:109 , 2.8:101 , 3.15:90 , 3.55:83 , 4:73 , 4.5:51 , 5:44 , 5.6:37},4:{},5:{1.25:586, 1.4:538 , 1.6:491 , 1.8:448 , 2:429 , 2.24:392 , 2.5:352 , 2.8:557 , 3.15:279 , 3.55:245 , 4:220 , 4.5:156 , 5:132 , 5.6:112},6:{},7:{1.25:1114, 1.4:1039 , 1.6:929 , 1.8:885 , 2:812 , 2.24:724 , 2.5:649 , 2.8:557 , 3.15:505 , 3.55:458 , 4:406 , 4.5:321 , 5:251 , 5.6:214},8:{},9:{},10:{},
  11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},
  21:{},22:{},23:{},24:{},25:{},26:{},
};
export const H1_PN750_BY_SIZE = {
  1:{1.25:50, 1.4:47 , 1.6:43 , 1.8:40 , 2:37 , 2.24:34 , 2.5:31 , 2.8:28 , 3.15:25 , 3.55:22 , 4:20 , 4.5:14 , 5:12 , 5.6:9},2:{},3:{1.25:163, 1.4:152 , 1.6:142 , 1.8:105 , 2:98 , 2.24:88 , 2.5:82 , 2.8:76 , 3.15:67 , 3.55:62 , 4:55 , 4.5:38 , 5:33 , 5.6:28},4:{},5:{1.25:440, 1.4:404 , 1.6:368 , 1.8:336 , 2:322 , 2.24:295 , 2.5:264 , 2.8:236 , 3.15:209 , 3.55:183 , 4:165 , 4.5:117 , 5:99 , 5.6:84},6:{},7:{1.25:836, 1.4:780 , 1.6:697 , 1.8:664 , 2:609 , 2.24:544 , 2.5:487 , 2.8:418 , 3.15:379 , 3.55:342 , 4:305 , 4.5:241 , 5:188 , 5.6:160},8:{},9:{},10:{},
  11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},
  21:{},22:{},23:{},24:{},25:{},26:{},
};

// ---------- H Series : STAGE 2 ----------
export const H2_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

export const H2_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

export const H2_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- H Series : STAGE 3 ----------
export const H3_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{28:616, 31.5:548 , 35.5:479, 40:434, 45:377, 50:342, 56:308, 63:274, 71:240, 80:215, 90:191, 100:171, 112:153},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

export const H3_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{28:411, 31.5:365 , 35.5:320, 40:285, 45:251, 50:228, 56:204, 63:181, 71:161, 80:143, 90:127, 100:114, 112:102},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

export const H3_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{28:308, 31.5:274 , 35.5:240, 40:215, 45:191, 50:171, 56:153, 63:136, 71:121, 80:107, 90:95, 100:86, 112:76},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- H Series : STAGE 4 ----------
export const H4_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H4_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const H4_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 1 ----------
export const B1_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B1_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B1_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 2 ----------
export const B2_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B2_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B2_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 3 ----------
export const B3_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B3_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B3_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };

// ---------- B Series : STAGE 4 ----------
export const B4_PN1500_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B4_PN1000_BY_SIZE = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };
export const B4_PN750_BY_SIZE  = { 1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}, 11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{}, 21:{},22:{},23:{},24:{},25:{},26:{} };


// --- ตัวช่วยคั่นกลาง (log-linear) ---
function interpLogX(mapRatioToPN, x) {
  const keys = Object.keys(mapRatioToPN).map(Number).sort((a,b)=>a-b);
  if (!keys.length) return null;
  if (x <= keys[0]) return Number(mapRatioToPN[keys[0]]);
  if (x >= keys[keys.length-1]) return Number(mapRatioToPN[keys[keys.length-1]]);
  let lo = keys[0], hi = keys[keys.length-1];
  for (let i=0;i<keys.length-1;i++){
    if (x >= keys[i] && x <= keys[i+1]) { lo = keys[i]; hi = keys[i+1]; break; }
  }
  const yLo = Number(mapRatioToPN[lo]), yHi = Number(mapRatioToPN[hi]);
  const t = (Math.log(x) - Math.log(lo)) / (Math.log(hi) - Math.log(lo));
  return Math.exp((1-t)*Math.log(yLo) + t*Math.log(yHi));
}

// --- เลือกตารางตาม Series + Stage + n1 แล้วคืน PN (คั่นค่าได้เมื่อ ratio คั่นกลาง) ---
export function getPNBySeriesStage(series /*'H'|'B'*/, stage /*1..4*/, sizeIndex, ratio, n1 /*1500|1000|750*/) {
  if (!series || !stage || !sizeIndex || !ratio || !n1) return null;

  // เลือกตาราง
  let table = null;
  const S = String(series).toUpperCase();
  const R = Number(ratio);

  if (S === 'H') {
    table =
      stage === 1 ? (n1===1500?H1_PN1500_BY_SIZE:n1===1000?H1_PN1000_BY_SIZE:n1===750?H1_PN750_BY_SIZE:null) :
      stage === 2 ? (n1===1500?H2_PN1500_BY_SIZE:n1===1000?H2_PN1000_BY_SIZE:n1===750?H2_PN750_BY_SIZE:null) :
      stage === 3 ? (n1===1500?H3_PN1500_BY_SIZE:n1===1000?H3_PN1000_BY_SIZE:n1===750?H3_PN750_BY_SIZE:null) :
      stage === 4 ? (n1===1500?H4_PN1500_BY_SIZE:n1===1000?H4_PN1000_BY_SIZE:n1===750?H4_PN750_BY_SIZE:null) : null;
  } else {
    table =
      stage === 1 ? (n1===1500?B1_PN1500_BY_SIZE:n1===1000?B1_PN1000_BY_SIZE:n1===750?B1_PN750_BY_SIZE:null) :
      stage === 2 ? (n1===1500?B2_PN1500_BY_SIZE:n1===1000?B2_PN1000_BY_SIZE:n1===750?B2_PN750_BY_SIZE:null) :
      stage === 3 ? (n1===1500?B3_PN1500_BY_SIZE:n1===1000?B3_PN1000_BY_SIZE:n1===750?B3_PN750_BY_SIZE:null) :
      stage === 4 ? (n1===1500?B4_PN1500_BY_SIZE:n1===1000?B4_PN1000_BY_SIZE:n1===750?B4_PN750_BY_SIZE:null) : null;
  }
  if (!table || !table[sizeIndex]) return null;

  const row = table[sizeIndex];                  // { ratio: PN, ... }
  if (row[R] != null) return Number(row[R]);     // เจอตรง ๆ

  // คั่นกลางถ้ามีอย่างน้อย 2 จุด
  if (Object.keys(row).length >= 2) return interpLogX(row, R);
  return null;
}

// --- คำนวณ S.F. จาก Series+Stage+timetable ---
export function calcSFBySeriesStage(series, stage, sizeIndex, ratio, pole, kW) {
  if (!series || !stage || !sizeIndex || !ratio || !pole || !kW) return { PN:null, SF:null };
  const n1 = pole === 4 ? 1500 : pole === 6 ? 1000 : pole === 8 ? 750 : null; // 2-pole ไม่มีในเอกสารนี้
  if (!n1) return { PN:null, SF:null };
  const PN = getPNBySeriesStage(series, stage, Number(sizeIndex), Number(ratio), n1);
  if (!PN) return { PN:null, SF:null };
  return { PN, SF: PN / Number(kW) };
}

export const productList = [
  { name: 'AC Gear Motor', image: ACImg },
  { name: 'DC Gear Motor', image: DCImg },
  { name: 'BLDC Gear Motor', image: BLDCImg },
  { name: 'Servo Motor', image: ServoImg },
  { name: 'Planetary Gear', image: PlanetaryImg },
  { name: 'Hypoid Gear', image: HypoidImg },
  { name: 'RKFS Series', image: RKFSImg },
  { name: 'Cycloidal Series', image: CYCLOImg },
  { name: 'SPN Series', image: SPNImg },
  { name: 'HB Gearbox Series', image: HBImg },
  { name: 'P Planetary Gearbox', image: PPlanetaryImg },
  { name: 'SRV Worm Gear', image: SRVImg },
  { name: 'SMR Series', image: SMRImg },
  { name: 'Small AC Series', image: SMALLACImg },
  { name: 'IEC STANDARD MOTOR', image: IECImg },
  { name: 'BMK SERIES', image: BMKImg },
  { name: 'WP WORMGEAR REDUCER', image: WPImg },
  { name: 'Servo Driver and Speed Controller', image: DriverImg },
];


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

export function renderHypoidGearFlow(hypoidState, hypoidSetters, onConfirm, onOpenRFQ) {

const EMAILJS_SERVICE_ID = 'service_fwgn6cw';
const EMAILJS_TEMPLATE_ID = 'rfq_hypoid_template';
const EMAILJS_PUBLIC_KEY  = 'BvIT5-X7LnkaS3LKq'.trim();

function RequestQuoteModal({
  open,
  onClose,
  payload,        // { modelCode, series, gearType, power, supply, ratio, outputSpeed, outputTorque, motorOptional, quantity }
}) {
  const [form, setForm] = React.useState({
    name: '',
    phone: '',
    company: '',
    email: '',
  });
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setForm({ name: '', phone: '', company: '', email: '' });
      setSending(false);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  function formatSupply(s) {
  const SUPPLY_LABELS = {
    C: '1เฟส-Single phase 220V/50Hz/60Hz',
    A: '1เฟส-Single phase 220V/50Hz/60Hz',
    S: '3เฟส-Three phase220/380V/50Hz/460V/60Hz',
    S3: '3เฟส-Three phase 220/380/415V/50Hz',
    S4 : '3เฟส-Three phase 460V/60Hz',
  };
  return SUPPLY_LABELS[s] ?? s ?? '-';
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('กรุณากรอกชื่อ และอีเมล');
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // ====== ฟิลด์ของลูกค้า ======
          customer_name: form.name,
          customer_phone: form.phone,
          customer_company: form.company,
          customer_email: form.email,

          // ====== ผู้รับ (คอมมาคั่นได้) ======
          to_email: 'Chotthanin@synergy-as.com,SAS04@synergy-as.com',

          // ====== สเปกจากหน้าเลือกของคุณ ======
          model_code: payload.modelCode || '-',
          series: payload.series || '-',
          gear_type: payload.gearType || '-',
          power_motor: payload.power != null ? `${payload.power} W` : '-',
          power_supply: formatSupply(payload.supply) || '-',
          ratio: payload.ratio != null ? `1/${payload.ratio}` : '-',
          output_speed: payload.outputSpeed != null ? `${Math.round(payload.outputSpeed)} rpm` : '-',
          output_torque: payload.outputTorque != null ? `${Number(payload.outputTorque).toFixed(2)} N.m` : '-',
          motor_optional: payload.motorOptional || '-',
          quantity: payload.quantity != null ? String(payload.quantity) : '1',
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      alert('ขอบคุณสำหรับการขอราคา กรุณารอการตอบกลับสักครู่');
      onClose();
    } catch (err) {
      console.error(err);
      alert('ส่งคำขอไม่สำเร็จ กรุณาลองอีกครั้ง');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[520px] bg-white rounded-2xl shadow-2xl">
        {/* ปุ่ม X มุมขวาบน */}
        <button
          onClick={onClose}
          aria-label="ปิด"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h3 className="text-xl font-bold">ขอใบเสนอราคา ZDF2 & ZDF3 Series</h3>

          <div className="grid grid-cols-1 gap-3 text-left">
            <label className="text-sm font-semibold">
              ชื่อ
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </label>

            <label className="text-sm font-semibold">
              เบอร์ติดต่อ
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </label>

            <label className="text-sm font-semibold">
              ชื่อบริษัท
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </label>

            <label className="text-sm font-semibold">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-50"
            >
              {sending ? 'กำลังส่ง...' : 'ยืนยัน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getContinuousRatingPdf(series, powerW) {
  // series ใช้ 'F2'|'F3' หรือ 'ZDF2'|'ZDF3' ก็ได้
  const s = (series || '').toUpperCase();
  const isF2 = s.includes('F2');   // ครอบคลุมทั้ง F2 และ ZDF2
  const isF3 = s.includes('F3');   // ครอบคลุมทั้ง F3 และ ZDF3
  const p = Number(powerW);

  if (isF2) {
    if (p === 15 || p === 25) return "Specificatio&Continuous rating15W-25W.pdf";
    if (p === 40)              return "Specificatio&Continuous rating40W.pdf";
    if (p === 60 || p === 90)  return "Specificatio&Continuous rating60W-90W.pdf";
    return null;
  }

  if (isF3) {
    // ตามเงื่อนไขที่ให้มา
    if (p === 100)  return "Specificatio&Continuous rating100W.pdf";
    if (p === 200)  return "Specificatio&Continuous rating200W.pdf";
    if (p === 400)  return "Specificatio&Continuous rating400W.pdf";
    if (p === 750)  return "Specificatio&Continuous rating750W.pdf";
    if (p === 1500) return "Specificatio&Continuous rating1500W.pdf";
    if (p === 2200) return "Specificatio&Continuous rating2200W.pdf";
    return null;
  }

  return null;
}


const shaftDiaMapZDF2 = {
  A: { 15: 15, 25: 15, 40: 18, 60: 18, 90: 18 },
  H: { 15: 12, 25: 12, 40: 15, 60: 15, 90: 15 },
};

// ZDF3: ต้องดูเป็นช่วงอัตราทด
const shaftDiaRulesZDF3 = [
  // 100W
  { p: 100, low: 5,  high: 60,  A: 18, H: 20 },
  { p: 100, low: 80, high: 240, A: 22, H: 25 },
  // 200W
  { p: 200, low: 5,  high: 60,  A: 22, H: 25 },
  { p: 200, low: 80, high: 240, A: 28, H: 30 },
  // 400W
  { p: 400, low: 5,  high: 60,  A: 28, H: 30 },
  { p: 400, low: 80, high: 240, A: 32, H: 35 },
  // 750W
  { p: 750, low: 5,  high: 60,  A: 32, H: 35 },
  { p: 750, low: 80, high: 240, A: 40, H: 45 },
  // 1500W
  { p: 1500, low: 5,  high: 60,  A: 40, H: 45 },
  // 2200W
  { p: 2200, low: 5,  high: 30,  A: 40, H: 45 },
];

function getShaftSizeNumber(series, gearType, powerW, ratio) {
  // ใช้ helper เดิมของคุณ ที่คืน "ØXXmm"
  const txt = getShaftDiameter(series, gearType, powerW, ratio); 
  if (!txt) return null;
  const m = txt.match(/(\d+)/);
  return m ? m[1] : null;  // คืนเฉพาะตัวเลข เช่น "45" หรือ "18"
}

function generateDisplayModelCode() {
  const base = generateModelCode(); // เดิมของคุณ เช่น "ZDF3-H40LB-1500-SB" หรือ "F3-H40LB-1500-SB"
  const size = getShaftSizeNumber(type, gearType, power, ratio); // เช่น "45"
  if (!size) return base;

  // แทรกหลังขีดแรก: <หัว>-<ขนาด><ที่เหลือ>
  const idx = base.indexOf('-');
  if (idx === -1) return base;
  return `${base.slice(0, idx + 1)}${size}${base.slice(idx + 1)}`;
}

function getShaftDiameter(series, gearType, powerW, ratio) {
  const s = String(series || '').toUpperCase();   // ex. 'ZDF2' | 'ZDF3'
  const g = String(gearType || '').toUpperCase(); // 'A' | 'H'
  const p = Number(powerW);
  const r = Number(ratio);

  if (s.includes('ZDF2')) {
    const mm = shaftDiaMapZDF2[g]?.[p];
    return mm ? `Ø${mm}mm` : null;
  }

  if (s.includes('ZDF3')) {
    for (const rule of shaftDiaRulesZDF3) {
      if (p === rule.p && r >= rule.low && r <= rule.high) {
        const mm = rule[g];
        return mm ? `Ø${mm}mm` : null;
      }
    }
  }
  return null;
}
const drawingPdfMap = {
  ZDF2: {
    15:  "F215W25W",
    25:  "F215W25W",
    40:  "F240W",
    60:  "F260W90W",
    90:  "F260W90W",
  },
  ZDF3: {
    100:  "F3100W",
    200:  "F3200W",
    400:  "F3400W",
    750:  "F3750W",
    1500: "F31500W",
    2200: "F32200W",
  },
};

function getDrawingPdfSrc(series, powerW) {
  const key = Number(powerW);
  const base = drawingPdfMap?.[series]?.[key];
  return base ? `/model/pdf/Hypoid/${base}.pdf` : null; // path ใต้ public
}

  function HypoidRFQButton() {
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState(null);

  const handleOpen = (e) => {
    e.preventDefault();
    const p = {
  modelCode: generateDisplayModelCode(),
  series: String(type || ''),
  gearType: gearType === 'H' ? 'H Hollow shaft / Keyway' : 'A Solid shaft',

  // ส่งค่าดิบ (number) ไปให้ modal ฟอร์แมตเอง
  power: power != null ? Number(power) : null,
  supply: String(supply ?? ''),
  ratio: ratio != null ? Number(ratio) : null,
  outputSpeed: outputSpeedToShow != null ? Math.round(outputSpeedToShow) : null,
  outputTorque: outputTorqueToShow != null ? Number(outputTorqueToShow) : null,

  motorOptional: (Array.isArray(optional) && optional.length) ? optional.join(', ') : '-',
  quantity: Number(quantity || 1),
};
    setPayload(p);
    setOpen(true);
  };

  return (
    <>
      <button type="button" className="hyp-cta" onClick={handleOpen}>
        ขอใบเสนอราคา
      </button>
  {/* NEW: render โมดัล */}
  <RequestQuoteModal
    open={open}
    onClose={() => setOpen(false)}
    payload={payload}
  />
    </>
  );
}

const {
    type,        // ZDF2 หรือ ZDF3
    gearType,    // H หรือ A
    ratio,       // เช่น 10, 15, ... 240
    direction,   // RL, RR, RF, RB, LL, LR, LF, LB
    power,       // 15W–2200W
    supply,      // C, A, S, S3
    optional,
    outputSpeed,
    outputTorqueNm,
    quantity, 
  } = hypoidState;

const r = Number(ratio) || 0;
const pW = Number(power) || 0;

const calcOutputSpeed = ratio ? 1500 / ratio : null; // rpm
const motorKw         = (typeof power === 'number') ? power / 1000 : null; // kW

const calcOutputTorqueNm =
  (calcOutputSpeed != null && motorKw != null)
    ? (9550 * motorKw) / calcOutputSpeed
    : null;

// ถ้าใน JSX ของคุณอ้าง `outputSpeed` / `outputTorqueNm` อยู่แล้ว
// ให้ map มาใช้ตัวใหม่ หรือถ้าก่อนหน้าคุณมีค่าที่คำนวณแล้วก็ใช้ค่านั้นแทน
const outputSpeedToShow   = (typeof outputSpeed   !== 'undefined') ? outputSpeed   : calcOutputSpeed;
const outputTorqueToShow  = (typeof outputTorqueNm!== 'undefined') ? outputTorqueNm: calcOutputTorqueNm;

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
const backOneStep = () => {
  document.documentElement.classList.remove('hyp-finished'); // << ให้บล็อกกลับมา
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
              { label: 'ZDF2', img: F2Img },
              { label: 'ZDF3', img: F3Img }
            ].map(({ label, img }) => (
              <ThumbCard
                key={label}
                img={img}
                label={label}
                active={type === (label.includes('ZDF2') ? 'ZDF2' : 'ZDF3')}
                onClick={() => update('type', label.includes('ZDF2') ? 'ZDF2' : 'ZDF3')}
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
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-7 sm:gap-8">
            {[
              { label: 'A', img: F23AImg },
              { label: 'H', img: F23HImg }
            ].map(({ label, img }) => (
              <motion.button
                key={label}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
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
                <img src={img} alt={label} className="btn-sweep-img w-full max-w-full object-contain my-2
             scale-[1.18] md:scale-[1.25] transition-transform"
  style={{ transformOrigin: 'center center' }} />
                <span className="btn-sweep-label">{label}</span>
              </motion.button>
            ))}
                        <div className="mt-4">
  <button
    onClick={backOneStep}
    className="
      fixed bottom-4 left-4 z-50
      px-3 py-1 text-xs md:text-sm rounded-full
      bg-white/15 text-gray-800/90 border border-white/30
      backdrop-blur-sm shadow-sm opacity-70
      hover:opacity-100 hover:bg-white/25 hover:shadow-md hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
  >
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
                whileHover={{ y: -1, scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
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
  <button
    onClick={backOneStep}
    className="
      fixed bottom-4 left-4 z-50
      px-3 py-1 text-xs md:text-sm rounded-full
      bg-white/15 text-gray-800/90 border border-white/30
      backdrop-blur-sm shadow-sm opacity-70
      hover:opacity-100 hover:bg-white/25 hover:shadow-md hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
  >
    ย้อนกลับ
  </button>
</div>
          </div>
<div className="mt-6 text-center">
  <span
    className="text-emboss-3d typewriter typewriter-medium text-2xl"
    style={{ '--chars': 28 }}  // นับจำนวนอักษรของข้อความด้านล่าง
  >
    ความเร็วรอบของมอเตอร์  / อัตราทด = ความเร็วรอบหัวเกียร์ ( rpm)
  </span>
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
  <button
    onClick={backOneStep}
    className="
      fixed bottom-4 left-4 z-50
      px-3 py-1 text-xs md:text-sm rounded-full
      bg-white/15 text-gray-800/90 border border-white/30
      backdrop-blur-sm shadow-sm opacity-70
      hover:opacity-100 hover:bg-white/25 hover:shadow-md hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
  >
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
            {(type === 'ZDF2' ? [15,25,40,60,90] : [100,200,400,750,1500,2200]).map(p => (
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
  <button
    onClick={backOneStep}
    className="
      fixed bottom-4 left-4 z-50
      px-3 py-1 text-xs md:text-sm rounded-full
      bg-white/15 text-gray-800/90 border border-white/30
      backdrop-blur-sm shadow-sm opacity-70
      hover:opacity-100 hover:bg-white/25 hover:shadow-md hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
  >
    ย้อนกลับ
  </button>
</div>

          </div>
<div className="text-center mt-6">
  <span
    className="text-emboss-3d typewriter typewriter-medium text-2xl"
    style={{ '--chars': 28 }}  // นับจำนวนอักษรของข้อความด้านล่าง
  >
    กรุณาเลือกขนาด มอเตอร์ที่ต้องการ
  </span>
</div>
        </div>
      )}

      {/* Step 6 */}
      {power && !supply && (
        <div>
          <h3 className="font-semibold text-white drop-shadow mb-2">Power Supply</h3>
          <div className="flex flex-wrap gap-3">
            {(type === 'ZDF2' ? ['C','A','S','S3','S4'] : ['S']).map(s => (
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
  <button
    onClick={backOneStep}
    className="
      fixed bottom-4 left-4 z-50
      px-3 py-1 text-xs md:text-sm rounded-full
      bg-white/15 text-gray-800/90 border border-white/30
      backdrop-blur-sm shadow-sm opacity-70
      hover:opacity-100 hover:bg-white/25 hover:shadow-md hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
  >
    ย้อนกลับ
  </button>
</div>

          </div>
<div className="mt-6 text-center to-fade">
  <br />
  <br />
  <span
    className="text-emboss-3d typewriter typewriter-medium text-2xl"
    style={{ '--chars': 28 }}
  >
    {type === 'ZDF2' ? (
      <>
        <strong>**C : (1เฟส-Single phase 220/50Hz/60Hz)</strong><br />
        <strong>**A : (1เฟส-Single phase 110/50Hz/60Hz)</strong><br />
        <strong>**S : (3เฟส-Three phase 220V/50Hz/60Hz)</strong><br />
        <strong>**S3 : (3เฟส-Three phase 380V/50Hz/60Hz)</strong><br />
        <strong>**S4 : (3เฟส-Three phase 460V/60Hz)</strong>
      </>
    ) : (
      <>
        <strong>**S : (3เฟส-220/380V/50Hz/460V/60Hz)</strong>
      </>
    )}
  </span>
</div>
        </div>
      )}

      {/* Step 7 */}
      {supply && (
        <div className="to-fade">
          <h3 className="font-semibold text-white drop-shadow mb-2">Motor Optional</h3>
          <div className="flex flex-wrap gap-3">
            {['B','F','T'].map(opt => {
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
<div className="mt-6 text-center">
  <span
    className="text-emboss-3d text-xs md:text-sm lg:text-base"
    style={{ '--chars': 28 }}  // นับจำนวนอักษรของข้อความด้านล่าง
  >
    B: Electromagnetic brake  , F: Force cooling fan , T: Thermal protection sensor   หากไม่ต้องการกด "เสร็จสิ้น"
  </span>
</div>
        </div>
      )}

      {/* Final Confirm */}
      {supply && (
        <div className="mt-6 text-center">
  <span className="text-emboss-3d">
    Model Code:&nbsp;
  </span>
<br />
         <span
  className="typewriter typewriter-medium text-sm md:text-base lg:text-lg"
  style={{ '--chars': (generateDisplayModelCode() || '').length }}
  onAnimationEnd={(e) => {
    // ให้เคอร์เซอร์หยุดทันทีเมื่อแอนิเมชัน "type-reveal" จบ
    if (e.animationName === 'type-reveal') {
      e.currentTarget.classList.add('is-done');
    }
  }}
>
  <strong className="text-emboss-3d" style={{ color: '#86ff6a' }}>
    {generateDisplayModelCode()}
  </strong>
<button
  type="button"
  title="Copy Model"
  data-code={generateDisplayModelCode()}   // <<< ใส่รหัสลง data-attribute
  className="ml-2 align-middle text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 hover:bg-white/20 transition"
  onClick={async (e) => {
    const btn = e.currentTarget;
    const txt = String(btn.dataset.code || '');   // <<< อ่านจาก data-attribute เท่านั้น

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
      setBadge(btn);
    } catch {
      fallbackCopy();
      setBadge(btn);
    }
  }}
>
  Copy
</button>
</span>
<br />
<button
  className="finish-trigger px-3 py-2 bg-green-300 rounded hover:bg-green-500 transition"
  data-code={generateDisplayModelCode()}
  onClick={(e) => {
    document.documentElement.classList.add('hyp-finished');
    const val = e.currentTarget.dataset.code || generateDisplayModelCode();
    onConfirm(val);
  }}
>
  เสร็จสิ้น
</button>
{/* ===== Specification & Drawing (อยู่ระหว่าง Model Code และปุ่มเสร็จสิ้น) ===== */}
{/* เนื้อหาจะโผล่เฉพาะหลังคลิก "เสร็จสิ้น" */}
<div className="show-when-finished mt-2 flex justify-center">
  <div id="spec-top" className="mt-4 w-full max-w-[1260px] text-left">
    <div
      className="
        ml-4 md:ml-10 lg:ml-16
        text-left
        bg-white/5 rounded-2xl px-6 py-5
        backdrop-blur-sm ring-1 ring-white/10 shadow-lg
        max-w-[1200px] w-[calc(100%-2rem)]
                relative
      "
    >
      <div className="text-emboss-3d">SAS Hypoid Gearmotor</div>
      <div className="text-emboss-3d">Series : {type}</div>

      <div className="text-emboss-3d">
        {(() => {
          const typeDesc =
            gearType === 'A' ? 'A Solid shaft / Keyway' : 'H Hollow shaft / Keyway';
          const dia = getShaftDiameter(type, gearType, power, ratio) || '-';
          return (
            <>Gear type : {typeDesc} / Output shaft diameter : {dia}</>
          );
        })()}
      </div>

      <div className="text-emboss-3d">
        Power Motor : {power != null ? power.toLocaleString() : '-'} W
      </div>

      <div className="text-emboss-3d">
        {(() => {
          const f2 = {
            C: ' : 1เฟส-Single phase 220/50Hz/60Hz',
            A: ' : 1เฟส-Single phase 110/50Hz/60Hz',
            S: ' : 3เฟส-Three phase 220V/50Hz/60Hz',
            S3: ' : 3เฟส-Three phase 380V/50Hz/60Hz',
            S4: ' : 3เฟส-Three phase 460V/60Hz',
          };
          const f3 = {
            S: '**S : (3เฟส-220/380V/50Hz/460V/60Hz)',
          };
          const desc = type === 'ZDF2' ? f2[supply] : f3[supply];
          return (
            <>
              Power supply : {supply || '-'}
              <strong>{desc || ''}</strong>
            </>
          );
        })()}

        {(() => {
          const crFile = getContinuousRatingPdf(type, power);
          if (!crFile) return null;
          const filePath = `/model/pdf/Hypoid/${encodeURIComponent(crFile)}`;
          return (
            <button
              type="button"
              className="
                ml-2 inline-flex items-center
                px-2 py-0.5 rounded-full text-[10px]
                bg-white/10 text-white/90 border border-white/20
                backdrop-blur-sm shadow-sm opacity-80
                hover:opacity-100 hover:bg-white/20 hover:shadow
                transition
              "
              onClick={() => {
                const a = document.createElement('a');
                a.href = filePath;
                a.setAttribute('download', crFile);
                document.body.appendChild(a);
                a.click();
                a.remove();
              }}
            >
              ข้อมูลจำเพาะและระดับการทำงานต่อเนื่อง
            </button>
          );
        })()}
      </div>

      <div className="text-emboss-3d">Ratio : 1/{ratio}</div>

      <div className="text-emboss-3d">
  Output speed : {outputSpeedToShow != null ? Math.round(outputSpeedToShow) : '-'} rpm
</div>
<div className="text-emboss-3d">
  Output Torque : {outputTorqueToShow != null ? outputTorqueToShow.toFixed(2) : '-'} N.m
</div>

      <div className="text-emboss-3d">
        Motor Optional : {optional?.length ? optional.join(' ') : '-'}
        {optional?.includes('B') && ' — B: Electromagnetic brake'}
      </div>
<div className="show-when-finished mt-4 flex justify-center">
  <div
    className="
      inline-flex items-center gap-2
      px-3 py-1.5 rounded-full
      bg-white/10 text-white/90 border border-white/20
      backdrop-blur-sm shadow-sm text-sm
    "
    aria-label="ตัวเลือกจำนวน"
  >
    <span className="text-emboss-3d mr-1 text-sm">จำนวน</span>

    <button
      type="button"
      title="ลดจำนวน"
      className="
        w-7 h-7 rounded-full grid place-items-center
        bg-white/10 border border-white/20
        hover:bg-white/20 active:scale-95 transition text-xs
      "
      onClick={() => hypoidSetters.setQuantity(q => Math.max(1, q - 1))}
    >
      ➖
    </button>

    <span
      className="min-w-[2ch] text-center font-extrabold text-white/95 text-base select-none"
      aria-live="polite"
    >
      {quantity}
    </span>

    <button
      type="button"
      title="เพิ่มจำนวน"
      className="
        w-7 h-7 rounded-full grid place-items-center
        bg-white/10 border border-white/20
        hover:bg-white/20 active:scale-95 transition text-xs
      "
      // จำกัดค่าสูงสุดตามต้องการ (เช่น 999)
      onClick={() => hypoidSetters.setQuantity(q => q + 1)}
    >
      ➕
    </button>

    <span className="text-emboss-3d ml-1 text-sm">ตัว</span>
  </div>
</div>
          <img
    src={`${process.env.PUBLIC_URL}/model/img/Hypoid/hypoid.png`}
    alt="Hypoid"
    className="hidden md:block absolute top-16 right-7 w-[390px] max-w-[45%] rounded-xl opacity-90"
  />
</div>
    </div>
  </div>
<>
<br />
<div className="show-when-finished hyp-cta-wrap mt-4">
  {/* 1) General specification */}
  <button
    type="button"
    className="hyp-cta"
    onClick={() => {
      const url = '/model/pdf/Hypoid/General%20specification.pdf';
      const a = document.createElement('a');
      a.href = url;
      a.download = 'General specification.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }}
  >
    General specification
  </button>
  {/* 2) Drawing 2D (pdf) */}
  <button
    type="button"
    className="hyp-cta"
    onClick={() => {
      const src = getDrawingPdfSrc(type, power);
      if (!src) {
        alert('ยังไม่มีไฟล์ Drawing 2D สำหรับรุ่นนี้');
        return;
      }
      const fileName = `${generateDisplayModelCode()}.pdf`;
      const a = document.createElement('a');
      a.href = src;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }}
  >
    Drawing 2D (pdf)
  </button>
<HypoidRFQButton />
</div>
</>
          <div className="mt-4">
  <button
    onClick={backOneStep}
    className="
      fixed bottom-4 left-4 z-50
      px-3 py-1 text-xs md:text-sm rounded-full
      bg-white/15 text-gray-800/90 border border-white/30
      backdrop-blur-sm shadow-sm opacity-70
      hover:opacity-100 hover:bg-white/25 hover:shadow-md hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
  >
    ย้อนกลับ
  </button>
</div>
        </div>
      )}
    </div>
  );
} // END renderHypoidGearFlow

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

    function getHBShaftDesignImg(hbType, letter) {
  if (!hbType || !letter) return null;
  const H = { A: HADesignImg, B: HBDesignImg, C: HCDesignImg, D: HDDesignImg, E: HEDesignImg, F: HFDesignImg, G: HGDesignImg, H: HHDesignImg, I: HIDesignImg };
  const B = { A: BADesignImg, B: BBDesignImg, C: BCDesignImg, D: BDDesignImg, E: BEDesignImg, F: BFDesignImg };
  const table = hbType === 'H' ? H : B;
  return table[letter] || null;
}

// === [ADD] HB: Render Flow ===
// Step 1 → Step 9 ตามสเปกผู้ใช้
export function renderHBGearFlow(hbState, hbSetters, onConfirm, onHome, onDownload) {

const normalizeSize = (hbSize) => {
    if (typeof hbSize === 'number') return hbSize;
    if (!hbSize) return null;
    const m = String(hbSize).match(/(\d{1,2})$/);
    return m ? Number(m[1]) : null;
  };

  const H1_SPEC = {
    1:{od:45,oil:2.5,weight:55}, 3:{od:60,oil:7,weight:128}, 5:{od:85,oil:22,weight:302},
    7:{od:105,oil:42,weight:547}, 9:{od:125,oil:68,weight:862}, 11:{od:150,oil:120,weight:1515},
    13:{od:180,oil:175,weight:2395}, 15:{od:220,oil:190,weight:3200}, 17:{od:240,oil:270,weight:4250},
    19:{od:270,oil:390,weight:5800},
  };
  const H2_SPEC = {
    3:{od:65,oil:6,weight:115},4:{od:80,oil:10,weight:190},5:{od:100,oil:15,weight:300},
    6:{od:110,oil:16,weight:355},7:{od:120,oil:27,weight:505},8:{od:130,oil:30,weight:590},
    9:{od:140,oil:42,weight:830},10:{od:160,oil:45,weight:960},11:{od:170,oil:71,weight:1335},
    12:{od:180,oil:76,weight:1615},13:{od:200,oil:135,weight:2000},14:{od:210,oil:140,weight:2570},
    15:{od:230,oil:210,weight:3430},16:{od:240,oil:215,weight:3655},17:{od:250,oil:290,weight:4650},
    18:{od:270,oil:300,weight:5125},19:{od:290,oil:320,weight:5250},20:{od:300,oil:340,weight:6550},
    21:{od:320,oil:320,weight:7200},22:{od:340,oil:340,weight:7800},
  };

  const H3_SPEC = {
    5:{od:100,oil:15,weight:320},
    6:{od:110,oil:17,weight:365},7:{od:120,oil:28,weight:540},8:{od:130,oil:30,weight:625},
    9:{od:140,oil:45,weight:875},10:{od:160,oil:46,weight:1020},11:{od:170,oil:85,weight:1400},
    12:{od:180,oil:90,weight:1675},13:{od:200,oil:160,weight:2295},14:{od:210,oil:165,weight:2625},
    15:{od:230,oil:235,weight:3475},16:{od:240,oil:245,weight:3875},17:{od:250,oil:305,weight:4560},
    18:{od:270,oil:315,weight:5030},19:{od:290,oil:420,weight:5050},20:{od:300,oil:450,weight:6650},
    21:{od:320,oil:470,weight:6950},22:{od:340,oil:490,weight:7550},23:{od:360,oil:620,weight:11500},24:{od:380,oil:650,weight:13400},
    25:{od:400,oil:880,weight:16100},26:{od:420,oil:935,weight:17600},
  };
  const H4_SPEC = {
    7:{od:120,oil:25,weight:550},8:{od:130,oil:27,weight:645},
    9:{od:140,oil:48,weight:875},10:{od:160,oil:50,weight:1010},11:{od:170,oil:80,weight:1460},
    12:{od:180,oil:87,weight:1725},13:{od:200,oil:130,weight:2390},14:{od:210,oil:140,weight:2730},
    15:{od:230,oil:230,weight:3635},16:{od:240,oil:235,weight:3965},17:{od:250,oil:290,weight:4680},
    18:{od:270,oil:305,weight:5185},19:{od:290,oil:360,weight:5700},20:{od:300,oil:380,weight:6400},
    21:{od:320,oil:395,weight:7750},22:{od:340,oil:420,weight:8350},23:{od:360,oil:520,weight:11600},24:{od:380,oil:550,weight:13500},
    25:{od:400,oil:735,weight:16100},26:{od:420,oil:780,weight:16500},
  };
  const B2_SPEC = {
    1:{od:45,oil:2,weight:65},2:{od:55,oil:4,weight:90},3:{od:65,oil:6,weight:140},4:{od:80,oil:10,weight:235},5:{od:100,oil:16,weight:360},
    6:{od:110,oil:19,weight:410},7:{od:120,oil:31,weight:615},8:{od:130,oil:34,weight:700},
    9:{od:140,oil:48,weight:1000},10:{od:160,oil:50,weight:1155},11:{od:170,oil:80,weight:1640},
    12:{od:180,oil:95,weight:1910},13:{od:200,oil:140,weight:2450},14:{od:210,oil:155,weight:2825},
    15:{od:230,oil:220,weight:3990},16:{od:240,oil:230,weight:4345},17:{od:250,oil:320,weight:5620},
    18:{od:270,oil:335,weight:6150},
  }; 
  const B3_SPEC = {
    3:{od:65,oil:6,weight:130},4:{od:80,oil:9,weight:210},5:{od:100,oil:14,weight:325},
    6:{od:110,oil:15,weight:380},7:{od:120,oil:25,weight:550},8:{od:130,oil:28,weight:635},
    9:{od:140,oil:40,weight:890},10:{od:160,oil:42,weight:1020},11:{od:170,oil:66,weight:1455},
    12:{od:180,oil:72,weight:1730},13:{od:200,oil:130,weight:2380},14:{od:210,oil:140,weight:2750},
    15:{od:230,oil:210,weight:3730},16:{od:240,oil:220,weight:3955},17:{od:250,oil:290,weight:4990},
    18:{od:270,oil:300,weight:5495},19:{od:290,oil:380,weight:6240},20:{od:300,oil:420,weight:6950},
21:{od:320,oil:370,weight:8480},22:{od:340,oil:430,weight:9240},23:{od:360,oil:520,weight:11500},24:{od:380,oil:600,weight:13400},25:{od:400,oil:720,weight:16000},26:{od:420,oil:840,weight:17500},
  };
  const B4_SPEC = {
    5:{od:100,oil:16,weight:335},
    6:{od:110,oil:18,weight:385},7:{od:120,oil:30,weight:555},8:{od:130,oil:33,weight:655},
    9:{od:140,oil:48,weight:890},10:{od:160,oil:50,weight:1025},11:{od:170,oil:80,weight:1485},
    12:{od:180,oil:90,weight:1750},13:{od:200,oil:145,weight:2395},14:{od:210,oil:150,weight:2735},
    15:{od:230,oil:230,weight:3630},16:{od:240,oil:235,weight:3985},17:{od:250,oil:295,weight:4695},
    18:{od:270,oil:305,weight:5200},19:{od:290,oil:480,weight:5750},20:{od:300,oil:550,weight:6450},
21:{od:320,oil:540,weight:7850},22:{od:340,oil:620,weight:8400},23:{od:360,oil:710,weight:11600},24:{od:380,oil:810,weight:13500},25:{od:400,oil:1000,weight:16100},26:{od:420,oil:1100,weight:17600},
  };    
  const SPEC_TABLE = { H: { 1: H1_SPEC, 2: H2_SPEC, 3: H3_SPEC, 4: H4_SPEC } , B: { 2: B2_SPEC, 3: B3_SPEC, 4: B4_SPEC }  };

  const lookupGearSpecs = (seriesKey, stageNum, sizeIndex) => {
    if (!seriesKey || !stageNum || !sizeIndex) return null;
    const seriesTbl = SPEC_TABLE[seriesKey]; if (!seriesTbl) return null;
    const stageTbl  = seriesTbl[stageNum];   if (!stageTbl)  return null;
    return stageTbl[sizeIndex] || null;
  };

// [ADD] ===== Rules: Input Shaft Ø by Ratio (H1–H4, B2–B4) =====
// หมายเหตุ: ใส่ข้อมูลจริงที่รู้แล้ว (H1 size 1–2 ตามที่สั่ง) ที่เหลือปล่อยว่างรอเติม
const INPUT_DIA_RULES = {
  H: {
    1: { // H1 = Stage 1
      1: [
        { min: 1.25, max: 2.80, dia: 40 },
        { min: 3.15, max: 4.00, dia: 30 },
        { min: 4.50, max: 5.60, dia: 24 },
      ],
      3: [
        { min: 1.25, max: 2.80, dia: 60 },
        { min: 3.15, max: 4.00, dia: 45 },
        { min: 4.50, max: 5.60, dia: 32 },
      ],
      5: [
        { min: 1.25, max: 2.80, dia: 85 },
        { min: 3.15, max: 4.00, dia: 60 },
        { min: 4.50, max: 5.60, dia: 50 },
      ],
      7: [
        { min: 1.25, max: 2.80, dia: 100 },
        { min: 3.15, max: 4.00, dia: 75 },
        { min: 4.50, max: 5.60, dia: 60 },
      ],
      9: [
        { min: 1.25, max: 2.80, dia: 110 },
        { min: 3.15, max: 4.00, dia: 90 },
        { min: 4.50, max: 5.60, dia: 75 },
      ],
      11: [
        { min: 1.6, max: 2.80, dia: 130 },
        { min: 3.15, max: 4.00, dia: 110 },
        { min: 4.50, max: 5.60, dia: 90 },
      ],
      13: [
        { min: 1.6, max: 2.80, dia: 150 },
        { min: 3.15, max: 4.00, dia: 130 },
        { min: 4.50, max: 5.60, dia: 100 },
      ],
      15: [
        { min: 2, max: 2.80, dia: 180 },
        { min: 3.15, max: 4.00, dia: 150 },
        { min: 4.50, max: 5.60, dia: 125 },
      ],
      17: [
        { min: 2, max: 2.80, dia: 200 },
        { min: 3.15, max: 4.00, dia: 170 },
        { min: 4.50, max: 5.60, dia: 140 },
      ],
      19: [
        { min: 2, max: 2.80, dia: 220 },
        { min: 3.15, max: 4.00, dia: 190 },
        { min: 4.50, max: 5.60, dia: 160 },
      ],
    },
    2: { // H2
      3: [
        { min: 6.3, max: 11.2, dia: 35 },
        { min: 12.5, max: 22.4, dia: 28 },
      ],
      4: [
        { min: 6.3, max: 11.2, dia: 35 },
        { min: 12.5, max: 22.4, dia: 28 },
      ],
      5: [
        { min: 6.3, max: 11.2, dia: 50 },
        { min: 12.5, max: 22.4, dia: 38 },
      ],
      6: [
        { min: 8, max: 14, dia: 50 },
        { min: 16, max: 28, dia: 38 },
      ],
      7: [
        { min: 6.3, max: 11.2, dia: 60 },
        { min: 12.5, max: 22.4, dia: 50 },
      ],
      8: [
        { min: 8, max: 14, dia: 60 },
        { min: 16, max: 28, dia: 50 },
      ],
      9: [
        { min: 6.3, max: 11.2, dia: 75 },
        { min: 12.5, max: 22.4, dia: 60 },
      ],
      10: [
        { min: 8, max: 14, dia: 75 },
        { min: 16, max: 28, dia: 60 },
      ],
      11: [
        { min: 6.3, max: 11.2, dia: 90 },
        { min: 12.5, max: 22.4, dia: 70 },
      ],
      12: [
        { min: 8, max: 14, dia: 90 },
        { min: 16, max: 28, dia: 70 },
      ],
      13: [
        { min: 6.3, max: 11.2, dia: 100 },
        { min: 12.5, max: 20, dia: 85 },
      ],
      14: [
        { min: 8, max: 14, dia: 100 },
        { min: 16, max: 25, dia: 85 },
      ],
      15: [
        { min: 6.3, max: 11.2, dia: 120 },
        { min: 12.5, max: 20, dia: 100 },
      ],
      16: [
        { min: 7.1, max: 12.5, dia: 120 },
        { min: 14, max: 22.4, dia: 100 },
      ],
      17: [
        { min: 6.3, max: 11.2, dia: 125 },
        { min: 12.5, max: 20, dia: 110 },
      ],
      18: [
        { min: 7.1, max: 12.5, dia: 125 },
        { min: 14, max: 22.4, dia: 110 },
      ],
      19: [
        { min: 6.3, max: 11.2, dia: 150 },
        { min: 12.5, max: 20, dia: 120 },
      ],
      20: [
        { min: 7.1, max: 12.5, dia: 150 },
        { min: 14, max: 22.4, dia: 120 },
      ],
      21: [
        { min: 6.3, max: 11.2, dia: 170 },
        { min: 12.5, max: 20, dia: 140 },
      ],
      22: [
        { min: 7.1, max: 12.5, dia: 170 },
        { min: 14, max: 22.4, dia: 140 },
      ],
      23: [
        { min: 6.3, max: 11.2, dia: 190 },
        { min: 12.5, max: 20, dia: 150 },
      ],
      24: [
        { min: 7.1, max: 12.5, dia: 190 },
        { min: 14, max: 22.4, dia: 150 },
      ],
      25: [
        { min: 6.3, max: 11.2, dia: 200 },
        { min: 12.5, max: 20, dia: 170 },
      ],
      26: [
        { min: 7.1, max: 12.5, dia: 200 },
        { min: 14, max: 22.4, dia: 170 },
      ],
    },
    3: { // H3
      5: [
        { min: 25, max: 45, dia: 40 },
        { min: 50, max: 63, dia: 30 },
        { min: 71, max: 90, dia: 24 },        
      ],
      6: [
        { min: 31.5, max: 56, dia: 40 },
        { min: 63, max: 80, dia: 30 },
        { min: 90, max: 112, dia: 24 }, 
      ],
      7: [
        { min: 25, max: 45, dia: 45 },
        { min: 50, max: 63, dia: 35 },
        { min: 71, max: 90, dia: 28 },        
      ],
      8: [
        { min: 31.5, max: 56, dia: 45 },
        { min: 63, max: 80, dia: 35 },
        { min: 90, max: 112, dia: 28 }, 
      ],
      9: [
        { min: 25, max: 45, dia: 60 },
        { min: 50, max: 63, dia: 45 },
        { min: 71, max: 90, dia: 32 },        
      ],
      10: [
        { min: 31.5, max: 56, dia: 60 },
        { min: 63, max: 80, dia: 45 },
        { min: 90, max: 112, dia: 32 }, 
      ],
      11: [
        { min: 25, max: 45, dia: 70 },
        { min: 50, max: 63, dia: 50 },
        { min: 71, max: 90, dia: 42 },        
      ],
      12: [
        { min: 31.5, max: 56, dia: 70 },
        { min: 63, max: 80, dia: 50 },
        { min: 90, max: 112, dia: 42 }, 
      ],
      13: [
        { min: 22.4, max: 45, dia: 85 },
        { min: 50, max: 63, dia: 60 },
        { min: 71, max: 90, dia: 50 },        
      ],
      14: [
        { min: 28, max: 56, dia: 85 },
        { min: 63, max: 80, dia: 60 },
        { min: 90, max: 112, dia: 50 }, 
      ],
      15: [
        { min: 22.4, max: 45, dia: 100 },
        { min: 50, max: 63, dia: 75 },
        { min: 71, max: 90, dia: 60 },        
      ],
      16: [
        { min: 28, max: 56, dia: 100 },
        { min: 63, max: 80, dia: 75 },
        { min: 90, max: 112, dia: 60 }, 
      ],
      17: [
        { min: 22.4, max: 45, dia: 100 },
        { min: 50, max: 63, dia: 75 },
        { min: 71, max: 90, dia: 60 },        
      ],
      18: [
        { min: 28, max: 56, dia: 100 },
        { min: 63, max: 80, dia: 75 },
        { min: 90, max: 112, dia: 60 }, 
      ],
      19: [
        { min: 22.4, max: 45, dia: 110 },
        { min: 50, max: 63, dia: 90 },
        { min: 71, max: 90, dia: 75 },        
      ],
      20: [
        { min: 28, max: 56, dia: 110 },
        { min: 63, max: 80, dia: 90 },
        { min: 90, max: 112, dia: 75 }, 
      ],
      21: [
        { min: 22.4, max: 45, dia: 130 },
        { min: 50, max: 63, dia: 110 },
        { min: 71, max: 90, dia: 90 },        
      ],
      22: [
        { min: 28, max: 56, dia: 130 },
        { min: 63, max: 80, dia: 110 },
        { min: 90, max: 112, dia: 90 }, 
      ],
      23: [
        { min: 22.4, max: 45, dia: 130 },
        { min: 50, max: 63, dia: 110 },
        { min: 71, max: 90, dia: 90 },        
      ],
      24: [
        { min: 25, max: 50, dia: 130 },
        { min: 56, max: 71, dia: 110 },
        { min: 80, max: 100, dia: 90 }, 
      ],
      25: [
        { min: 22.4, max: 45, dia: 150 },
        { min: 50, max: 63, dia: 130 },
        { min: 71, max: 90, dia: 100 },        
      ],
      26: [
        { min: 25, max: 50, dia: 150 },
        { min: 56, max: 71, dia: 130 },
        { min: 80, max: 100, dia: 100 }, 
      ],
    },
    4: { // H4
      7: [
        { min: 100, max: 180, dia: 30 },
        { min: 200, max: 355, dia: 24 },
      ],
      8: [
        { min: 125, max: 224, dia: 30 },
        { min: 250, max: 450, dia: 24 },
      ],
      9: [
        { min: 100, max: 180, dia: 35 },
        { min: 200, max: 355, dia: 28 },
      ],
      10: [
        { min: 125, max: 224, dia: 35 },
        { min: 250, max: 450, dia: 28 },
      ],
      11: [
        { min: 100, max: 180, dia: 45 },
        { min: 200, max: 355, dia: 32 },
      ],
      12: [
        { min: 125, max: 224, dia: 45 },
        { min: 250, max: 450, dia: 32 },
      ],
      13: [
        { min: 100, max: 180, dia: 50 },
        { min: 200, max: 355, dia: 38 },
      ],
      14: [
        { min: 125, max: 224, dia: 50 },
        { min: 250, max: 450, dia: 38 },
      ],
      15: [
        { min: 100, max: 180, dia: 60 },
        { min: 200, max: 355, dia: 50 },
      ],
      16: [
        { min: 112, max: 200, dia: 60 },
        { min: 224, max: 400, dia: 50 },
      ],
      17: [
        { min: 100, max: 180, dia: 60 },
        { min: 200, max: 355, dia: 50 },
      ],
      18: [
        { min: 112, max: 200, dia: 60 },
        { min: 224, max: 400, dia: 50 },
      ],
      19: [
        { min: 100, max: 180, dia: 75 },
        { min: 200, max: 355, dia: 60 },
      ],
      20: [
        { min: 112, max: 200, dia: 75 },
        { min: 224, max: 400, dia: 60 },
      ],
      21: [
        { min: 100, max: 180, dia: 90 },
        { min: 200, max: 355, dia: 70 },
      ],
      22: [
        { min: 112, max: 200, dia: 90 },
        { min: 224, max: 400, dia: 70 },
      ],
      23: [
        { min: 100, max: 180, dia: 90 },
        { min: 200, max: 355, dia: 70 },
      ],
      24: [
        { min: 112, max: 200, dia: 90 },
        { min: 224, max: 400, dia: 70 },
      ],
      25: [
        { min: 100, max: 180, dia: 100 },
        { min: 200, max: 355, dia: 85 },
      ],
      26: [
        { min: 112, max: 200, dia: 100 },
        { min: 224, max: 400, dia: 85 },
      ],
    },
  },
  B: {
    2: { // B2
      1: [
        { min: 5, max: 11.2, dia: 28 },
        { min: 12.5, max: 18, dia: 20 },
      ],
      2: [
        { min: 5, max: 11.2, dia: 30 },
        { min: 12.5, max: 18, dia: 25 },
      ],
      3: [
        { min: 5, max: 11.2, dia: 35 },
        { min: 12.5, max: 18, dia: 28 },
      ],
      4: [
        { min: 5, max: 11.2, dia: 45 },
      ],
      5: [
        { min: 5, max: 11.2, dia: 55 },
      ],
      6: [
        { min: 6.3, max: 14, dia: 55 },
      ],
      7: [
        { min: 5, max: 11.2, dia: 70 },
      ],
      8: [
        { min: 6.3, max: 14, dia: 70 },
      ],
      9: [
        { min: 5, max: 11.2, dia: 80 },
      ],
      10: [
        { min: 6.3, max: 14, dia: 80 },
      ],
      11: [
        { min: 5, max: 11.2, dia: 90 },
      ],
      12: [
        { min: 6.3, max: 14, dia: 90 },
      ],
      13: [
        { min: 5, max: 11.2, dia: 110 },
      ],
      14: [
        { min: 6.3, max: 14, dia: 110 },
      ],
      15: [
        { min: 5, max: 11.2, dia: 130 },
      ],
      16: [
        { min: 5.6, max: 12.5, dia: 130 },
      ],
      17: [
        { min: 5.6, max: 11.2, dia: 150 },
      ],
      18: [
        { min: 7.1, max: 12.5, dia: 150 },
      ],
    },
    3: { // B3
      3: [
        { min: 20, max: 45, dia: 28 },
        { min: 50, max: 71, dia: 20 },
      ],
      4: [
        { min: 12.5, max: 45, dia: 30 },
        { min:  50, max: 71, dia: 25 },
      ],
      5: [
        { min: 12.5, max: 45, dia: 35 },
        { min:  50, max: 71, dia: 28 },
      ],
      6: [
        { min: 16, max: 56, dia: 35 },
        { min: 63, max: 90, dia: 28 },
      ],
      7: [
        { min: 12.5, max: 45, dia: 45 },
        { min:  50, max: 71, dia: 35 },
      ],
      8: [
        { min: 16, max: 56, dia: 45 },
        { min: 63, max: 90, dia: 35 },
      ],
      9: [
        { min: 12.5, max: 45, dia: 55 },
        { min:  50, max: 71, dia: 40 },
      ],
      10: [
        { min: 16, max: 56, dia: 55 },
        { min: 63, max: 90, dia: 40 },
      ],
      11: [
        { min: 12.5, max: 45, dia: 70 },
        { min:  50, max: 71, dia: 50 },
      ],
      12: [
        { min: 16, max: 56, dia: 70 },
        { min: 63, max: 90, dia: 50 },
      ],
      13: [
        { min: 12.5, max: 45, dia: 80 },
        { min:  50, max: 71, dia: 60 },
      ],
      14: [
        { min: 16, max: 56, dia: 80 },
        { min: 63, max: 90, dia: 60 },
      ],
      15: [
        { min: 12.5, max: 45, dia: 90 },
        { min: 50, max: 71, dia: 70 },
      ],
      16: [
        { min: 14, max: 50, dia: 90 },
        { min: 56, max: 80, dia: 70 },
      ],
      17: [
        { min: 12.5, max: 45, dia: 110 },
        { min: 50, max: 71, dia: 80 },
      ],
      18: [
        { min: 14, max: 50, dia: 110 },
        { min: 56, max: 80, dia: 80 },
      ],
      19: [
        { min: 12.5, max: 45, dia: 130 },
        { min: 50, max: 71, dia: 100 },
      ],
      20: [
        { min: 14, max: 50, dia: 130 },
        { min: 56, max: 80, dia: 100 },
      ],
      21: [
        { min: 12.5, max: 45, dia: 130 },
        { min: 50, max: 71, dia: 100 },
      ],
      22: [
        { min: 14, max: 50, dia: 130 },
        { min: 56, max: 80, dia: 100 },
      ],
      23: [
        { min: 20, max: 45, dia: 150 },
        { min: 50, max: 71, dia: 110 },
      ],
      24: [
        { min: 22.4, max: 50, dia: 150 },
        { min: 56, max: 80, dia: 110 },
      ],
      25: [
        { min: 20, max: 45, dia: 150 },
        { min: 50, max: 71, dia: 110 },
      ],
      26: [
        { min: 22.4, max: 50, dia: 150 },
        { min: 56, max: 80, dia: 110 },
      ],
    },
    4: { // B4
      5: [
        { min: 80, max: 180, dia: 28 },
        { min: 200, max: 315, dia: 20 },
      ],
      6: [
        { min: 100, max: 224, dia: 28 },
        { min: 250, max: 400, dia: 20 },
      ],
      7: [
        { min: 80, max: 180, dia: 30 },
        { min: 200, max: 315, dia: 25 },
      ],
      8: [
        { min: 100, max: 224, dia: 30 },
        { min: 250, max: 400, dia: 25 },
      ],
      9: [
        { min: 80, max: 180, dia: 35 },
        { min: 200, max: 315, dia: 28 },
      ],
      10: [
        { min: 100, max: 224, dia: 35 },
        { min: 250, max: 400, dia: 28 },
      ],
      11: [
        { min: 80, max: 180, dia: 45 },
        { min: 200, max: 315, dia: 35 },
      ],
      12: [
        { min: 100, max: 224, dia: 45 },
        { min: 250, max: 400, dia: 35 },
      ],
      13: [
        { min: 80, max: 180, dia: 55 },
        { min: 200, max: 315, dia: 40 },
      ],
      14: [
        { min: 100, max: 224, dia: 55 },
        { min: 250, max: 400, dia: 40 },
      ],
      15: [
        { min: 80, max: 180, dia: 70 },
        { min: 200, max: 315, dia: 50 },
      ],
      16: [
        { min: 90, max: 200, dia: 70 },
        { min: 224, max: 355, dia: 50 },
      ],
      17: [
        { min: 80, max: 180, dia: 70 },
        { min: 200, max: 315, dia: 50 },
      ],
      18: [
        { min: 90, max: 200, dia: 70 },
        { min: 224, max: 355, dia: 50 },
      ],
      19: [
        { min: 80, max: 180, dia: 80 },
        { min: 200, max: 315, dia: 60 },
      ],
      20: [
        { min: 90, max: 200, dia: 80 },
        { min: 224, max: 355, dia: 60 },
      ],
      21: [
        { min: 80, max: 180, dia: 90 },
        { min: 200, max: 315, dia: 70 },
      ],
      22: [
        { min: 90, max: 200, dia: 90 },
        { min: 224, max: 355, dia: 70 },
      ],
      23: [
        { min: 80, max: 180, dia: 90 },
        { min: 200, max: 315, dia: 70 },
      ],
      24: [
        { min: 90, max: 200, dia: 90 },
        { min: 224, max: 355, dia: 70 },
      ],
      25: [
        { min: 80, max: 180, dia: 110 },
        { min: 200, max: 315, dia: 80 },
      ],
      26: [
        { min: 90, max: 200, dia: 110 },
        { min: 224, max: 355, dia: 80 },
      ],

    },
  },
};

// [ADD] ตัวช่วยอ่าน Ø จากกติกา (seriesKey: 'H'|'B', stageNum: 1..4, sizeIndex: 1..N, ratio: number)
function getInputDiaFromRules(seriesKey, stageNum, sizeIndex, ratio) {
  const r = Number(ratio);
  if (!Number.isFinite(r)) return null;

  const sKey = String(seriesKey).toUpperCase();
  const rules = INPUT_DIA_RULES?.[sKey]?.[Number(stageNum)]?.[Number(sizeIndex)];
  if (!rules || !Array.isArray(rules) || rules.length === 0) return null;

  for (const rule of rules) {
    if (r >= rule.min && r <= rule.max) return rule.dia;
  }
  return null; // ไม่เข้า range ใด ๆ → ไม่มี override
}

// [ADD - OPTIONAL] ถ้าคุณเก็บ code อย่าง "H1","H2","B3" ใน state แล้วอยาก map เป็น seriesKey/stageNum
function parseSeriesState(code) {
  if (typeof code !== 'string') return { seriesKey: null, stageNum: null };
  const m = code.trim().toUpperCase().match(/^([HB])(\d)$/);
  return m ? { seriesKey: m[1], stageNum: Number(m[2]) } : { seriesKey: null, stageNum: null };
}


const fmt = (val, digits = 2) => {
  // ให้รองรับ 0, number string, null/undefined
  if (val === 0 || val === '0') {
    return '0';
  }
  const n = Number(val);
  if (Number.isFinite(n)) {
    return n.toLocaleString(undefined, { maximumFractionDigits: digits });
  }
  return '—';
};

const S = typeof hbState !== 'undefined' ? hbState : state;
  const {
    hbSeries, hbHBType, hbStage, hbOutput, hbMount,
    hbSize, hbRatio, hbShaftDesign, hbZdySelected
  } = hbState || {};

// === HB: updater (patch) ===
const update = (k, v) => {
  if (typeof k !== 'string') return; // กัน k.charAt error

  // [ADD] ปุ่มย้อนกลับ: ถอยทีละ Step และรีเซ็ตค่าของ step ปัจจุบัน + ขั้นต่อ ๆ ไป
  if (k === 'goBack') {
    // ลำดับขั้นของ HB (เรียงจากต้น -> ปลาย). ถ้ามี step เพิ่มในอนาคตให้เติมชื่อไว้ท้ายอาร์เรย์ได้
    const stepOrder = [
  'hbSeries',       // Step 1: เลือกซีรีส์ (HB | ZDYFAMILY)
  'hbZdySelected',  // Step 2 (เฉพาะเมื่อเลือก ZDYFAMILY)
  'hbHBType',       // Step 2 (เส้นทาง HB): เลือก H / B
  'hbStage',        // Step 3: Stage of Gear
  'hbOutput',       // Step 4: Output shaft structure
  'hbMount',        // Step 5: Mounting Position (H/V)
  'hbSize',         // Step 6: Gear Size
  'hbRatioDraft',
    'hbKW', 
    'hbPole', 
    'hbRatio',
    'hbPreviewShaft',        
  'hbShaftDesign',
    ];

    // คัดเฉพาะคีย์ที่มีจริงทั้งใน state และมี setter
    const steps = stepOrder.filter(key =>
      Object.prototype.hasOwnProperty.call(hbState, key) &&
      typeof hbSetters?.[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`] === 'function'
    );

    // หา "step ล่าสุด" ที่ผู้ใช้เลือกไว้ (ค่าที่ไม่ null/undefined/'')
    let lastIdx = -1;
    for (let i = steps.length - 1; i >= 0; i--) {
      const key = steps[i];
      const val = hbState[key];
      if (val !== null && val !== undefined && val !== '') {
        lastIdx = i;
        break;
      }
    }

    // ถ้าพบ step ล่าสุด → รีเซ็ต step นั้น และรีเซ็ตทุก step หลังจากนั้น (กันค่าเก่าค้าง)
    if (lastIdx >= 0) {
      for (let i = lastIdx; i < steps.length; i++) {
        const key = steps[i];
        hbSetters[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](null);
      }
    }
    return;
  }

  // อัปเดตคีย์ทั่วไป (เดิม)
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
   update('hbPreviewShaft', null);
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
    <div className="space-y-4 mt-0">
      <h3 className="text-white font-bold mb-2 drop-shadow">Serier Selection</h3>
      <div className="grid grid-cols-2 gap-5 justify-items-center items-start">
        {/* ลบ prop big ออกเพื่อให้ขนาดย่อมลง */}
        <Tile
          img={HB1Img}
          label="HB Series"
          onClick={() => update('hbSeries', 'HB')}
        />
        <Tile
          img={ZDY1Img}
          label="ZDY/ZLY/ZSY/…"
          onClick={() => update('hbSeries', 'ZDYFAMILY')}
        />
      </div>
    </div>
  );
}

  // --- Step 2: ถ้า HB Series → เลือก H/B | ถ้า ZDYFAMILY → แสดง 10 ปุ่ม ---
  if (hbSeries === 'HB' && !hbHBType) {
    return (
      <div className="space-y-4 mt-0">
            <div className="flex justify-between items-center">
  <button
  onClick={() => update('goBack', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-blue-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-blue-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
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
      <div className="space-y-4 mt-0">
            <div className="flex justify-between items-center">
  <button
  onClick={() => update('goBack', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-blue-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-blue-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
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
      <div className="space-y-4 mt-0">
            <div className="flex justify-between items-center">
         <button
  onClick={() => update('goBack', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-blue-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-blue-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
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
      <div className="space-y-4 mt-0">
            <div className="flex justify-between items-center">
         <button
  onClick={() => update('goBack', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-blue-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-blue-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
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
      <div className="space-y-4 mt-0">
             <div className="flex justify-between items-center">
         <button
  onClick={() => update('goBack', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-blue-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-blue-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
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
      if (hbStage === 2) sizeList = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
      if (hbStage === 3) sizeList = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
      if (hbStage === 4) sizeList = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
    } else {
      if (hbStage === 2) sizeList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
      if (hbStage === 3) sizeList = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
      if (hbStage === 4) sizeList = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
    }
    return (
      <div className="space-y-4 mt-0">
            <div className="flex justify-between items-center">
         <button
  onClick={() => update('goBack', null)}
  className="fixed z-30 px-1 py-0.5 rounded text-white/70 
             bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
             hover:text-white hover:bg-blue-500 hover:shadow-lg
             focus:outline-none focus:ring-2 focus:ring-blue-400/60
             active:scale-95 transition-all duration-200"
  style={{
    left: 'max(1rem, env(safe-area-inset-left))',
    bottom: 'max(1rem, env(safe-area-inset-bottom))',
  }}
>
  ย้อนกลับ
</button>
       </div>
        <h3 className="text-white font-bold mb-2 drop-shadow">Step 6 — Gear Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeList.map(s => (
            <button key={s} onClick={() => update('hbSize', s)} className="px-4 py-2 rounded bg-blue-200 hover:bg-blue-400">{s}</button>
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
  <div className="space-y-4 mt-0">
    <div className="flex justify-between items-center">
      <button
        onClick={() => update('goBack', null)}
        className="fixed z-30 px-1 py-0.5 rounded text-white/70 
                   bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
                   hover:text-white hover:bg-blue-500 hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-400/60
                   active:scale-95 transition-all duration-200"
        style={{
          left: 'max(1rem, env(safe-area-inset-left))',
          bottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        ย้อนกลับ
      </button>
    </div>

    <h3 className="text-white font-bold mb-2 drop-shadow">Step 7 — Ratio</h3>

    {/* ปุ่มเลือก Ratio — เซ็ตแค่ hbRatioDraft ยังไม่ข้ามสเต็ป */}
    <div className="flex flex-wrap gap-2">
      {ratioList.map((r) => {
        const isSel = S?.hbRatioDraft === r;
        return (
          <button
            key={r}
            type="button"
            onClick={() => update('hbRatioDraft', r)}   // <— สำคัญ
            className={
              "px-4 py-2 rounded transition " +
              (isSel ? "bg-blue-500 text-white" : "bg-blue-200 hover:bg-blue-400")
            }
          >
            {r}
          </button>
        );
      })}
    </div>

    {/* พาเนลคำนวณ */}
    {(() => {
      const ratio = Number(S?.hbRatioDraft) || null;
      const kw    = parseFloat(S?.hbKW);
      const pole  = Number(S?.hbPole) || null;
      let sizeIndex = null;
if (S?.hbSize != null) {
  sizeIndex = typeof S.hbSize === 'number'
    ? S.hbSize
    : (String(S.hbSize).match(/(\d{1,2})$/)?.[1] ? Number(String(S.hbSize).match(/(\d{1,2})$/)[1]) : null);
}
      // base rpm ตาม pole (50Hz)
      const baseByPole = { 2: 3000, 4: 1500, 6: 1000, 8: 750 };
      const baseRpm    = pole ? baseByPole[pole] : null;
   
      // rpm หลังเกียร์
      const rpm = ratio && baseRpm ? (baseRpm / ratio) : null;

      // Torque (N·m) = (9550 * kW / rpm) * 0.88
      const torque = (kw && rpm) ? (9550 * kw / rpm) * 0.88 : null;

      const series = S?.hbHBType === 'H' ? 'H' : 'B';   
      const stage  = Number(S?.hbStage) || null;   
      const n1 = pole === 4 ? 1500 : pole === 6 ? 1000 : pole === 8 ? 750 : null;

      const { PN, SF: sf } =
  (series && stage && sizeIndex && ratio && pole && kw)
    ? calcSFBySeriesStage(series, stage, sizeIndex, ratio, pole, kw)
    : { PN:null, SF:null };

      const fmt = (x) =>
        (x || x === 0)
          ? x.toLocaleString(undefined, { maximumFractionDigits: 2 })
          : '—';

      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
          {/* S.F. */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
  <div className="text-white/70 text-sm">Service Factor : S.f.</div>
  <div className="text-2xl font-semibold text-white mt-1">
    { (sf || sf === 0) ? sf.toLocaleString(undefined,{ maximumFractionDigits: 2 }) : '—' }
  </div>
  <div className="text-white/50 text-xs mt-1">
    { (PN && sizeIndex && series && stage && pole)
      ? `${series}${stage}: PN=${PN.toLocaleString()} kW @ n1=${(pole===4?1500:pole===6?1000:750)} rpm, Size=${sizeIndex}`
      : 'เลือก Ratio / ใส่ kW / เลือก Pole และมี Size ก่อน'
    }
  </div>
</div>

          {/* rpm */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
            <div className="text-white/70 text-sm">Output speed (rpm)</div>
            <div className="text-2xl font-semibold text-white mt-1">{fmt(rpm)}</div>
            {pole && ratio && (
              <div className="text-white/50 text-xs mt-1">= {baseRpm} / {ratio}</div>
            )}
          </div>

          {/* N·m */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
            <div className="text-white/70 text-sm">Output torque (N·m)</div>
            <div className="text-2xl font-semibold text-white mt-1">{fmt(torque)}</div>
            {kw && rpm && (
              <div className="text-white/50 text-xs mt-1">
                = 9550 × {kw} / {fmt(rpm)} × 0.88
              </div>
            )}
          </div>

          {/* กรอก kW */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4 lg:col-span-2">
            <label className="text-white/70 text-sm">Motor power (kW)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={S?.hbKW ?? ''}
              onChange={(e) => update('hbKW', e.target.value)}  // <— สำคัญ
              placeholder="กรอกขนาดมอเตอร์ตาม kW ที่คุณต้องการ เช่น 37 "
              className="mt-2 w-full rounded-xl bg-black/30 text-white px-3 py-2 outline-none border border-white/15 focus:border-blue-400/60"
            />
          </div>

          {/* เลือก Pole */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
            <div className="text-white/70 text-sm mb-2">กดเลือก Pole ของมอเตอร์</div>
            <div className="flex gap-2">
              {[4,6,8].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => update('hbPole', p)}  // <— สำคัญ
                  className={
                    "px-3 py-2 rounded-lg border " +
                    (S?.hbPole === p
                      ? "bg-blue-500 text-white border-blue-400"
                      : "bg-black/30 text-white border-white/20 hover:bg-black/40")
                  }
                >
                  {p}
                </button>
              ))}
            </div>
            {S?.hbPole && (
              <div className="text-white/50 text-xs mt-2">
                Base speed: {({2:3000,4:1500,6:1000,8:750}[S.hbPole])} rpm
              </div>
            )}
          </div>
        </div>
      );
    })()}

    {/* ปุ่ม OK – commit ratio แล้วค่อยไป Step ถัดไป */}
    <div className="flex justify-end mt-4">
      <button
        type="button"
        disabled={!(S?.hbRatioDraft && S?.hbKW && S?.hbPole)}
        onClick={() => { update('hbRatio', S?.hbRatioDraft); }} // <— สำคัญ
        className={
          "px-5 py-2 rounded-xl border " +
          (S?.hbRatioDraft && S?.hbKW && S?.hbPole
            ? "bg-green-500 text-white border-green-400 hover:bg-green-600"
            : "bg-white/10 text-white/50 border-white/15 cursor-not-allowed")
        }
      >
        OK
      </button>
    </div>
  </div>
);
}

// --- Step 8: Shaft Design ---
if (hbSeries === 'HB' && hbHBType && hbStage && hbOutput && hbMount && hbSize && hbRatio && !hbShaftDesign) {
  const list = hbHBType === 'H'
    ? ['A','B','C','D','E','F','G','H','I']
    : ['A','B','C','D','E','F'];

  // ตรวจเครื่องทัช (ให้ครอบคลุม iPad/iPhone)
  const isTouchDevice =
    typeof window !== 'undefined' &&
    (
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      ('ontouchstart' in window) ||
      (navigator && navigator.maxTouchPoints > 0)
    );

  return (
  <div className="space-y-4 mt-0">
    <div className="flex justify-between items-center">
      <button
        onClick={() => update('goBack', null)}
        className="fixed z-30 px-1 py-0.5 rounded text-white/70 
                   bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
                   hover:text-white hover:bg-blue-500 hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-400/60
                   active:scale-95 transition-all duration-200"
        style={{
          left: 'max(1rem, env(safe-area-inset-left))',
          bottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        ย้อนกลับ
      </button>
    </div>

    <h3 className="text-white font-bold mb-2 drop-shadow">Step 8 — Shaft Design</h3>

    {/* พรีวิวภาพกึ่งกลางจอ — ไม่มีกรอบ ปรับให้พอดีกับ iPad แนวตั้ง */}
    {(() => {
      const previewLetter = hbState?.hbPreviewShaft || null;
      const previewImg = getHBShaftDesignImg(hbHBType, previewLetter);
      if (!previewImg) return null;
      return (
        <div
          className="fixed inset-0 pointer-events-none z-[20] flex items-center justify-center px-3"
          aria-hidden="true"
        >
          <img
            src={previewImg}
            alt={`HB ${hbHBType} - ${previewLetter}`}
            className="
              object-contain
              w-[86vw] md:w-[80vw] lg:w-[56vw]
              max-h-[64vh] md:max-h-[66vh] lg:max-h-[70vh]
              drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]
            "
            draggable={false}
          />
        </div>
      );
    })()}

    {/* แถบพรีวิวด้านล่าง (thumbnail) — เลื่อนแนวนอน, เคารพ safe-area */}
    <div
      className="fixed z-[21] left-1/2 -translate-x-1/2
                 bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl
                 px-3 py-2 flex items-center gap-2 md:gap-3
                 w-[94vw] max-w-[980px] overflow-x-auto"
      style={{
        bottom: 'max(0.75rem, env(safe-area-inset-bottom))'
      }}
      role="group"
      aria-label="HB Shaft thumbnails"
    >
      {list.map((ch) => {
        const thumb = getHBShaftDesignImg(hbHBType, ch);
        return (
          <button
            key={`thumb-${ch}`}
            type="button"
            // บนอุปกรณ์ทัช: แตะครั้งแรก = preview, แตะซ้ำแบบเดิม = ยืนยัน
            onClick={() => {
              if (isTouchDevice) {
                if (hbState?.hbPreviewShaft !== ch) {
                  update('hbPreviewShaft', ch);
                  return; // จบที่พรีวิว
                }
                // แตะซ้ำตัวเดิม → ยืนยันเลือก
                update('hbShaftDesign', ch);
                return;
              }
              // เดสก์ท็อป / เมาส์ → คลิกเดียวไปต่อ
              update('hbShaftDesign', ch);
            }}
            // ไม่ตั้ง preview จาก hover/focus บนทัช เพื่อไม่ให้เด้งไปต่อทันที
            onMouseEnter={!isTouchDevice ? () => update('hbPreviewShaft', ch) : undefined}
            onFocus={!isTouchDevice ? () => update('hbPreviewShaft', ch) : undefined}
            className="w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden bg-white/10 border border-white/20 hover:scale-[1.02] active:scale-95 transition"
            title={`แบบ ${ch}`}
          >
            {thumb ? (
              <img src={thumb} alt={`thumb ${ch}`} className="w-full h-full object-contain" />
            ) : (
              <span className="text-white/70">—</span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);
}

// --- Step 9: Model Code + Final ---
if (
  hbSeries === 'HB' &&
  hbHBType &&
  hbStage &&
  hbOutput &&
  hbMount &&
  hbSize &&
  hbRatio &&
  hbShaftDesign
) {
  const code = generateHBModelCode(hbState);

  // ====== COMPUTE (ก่อน return) ======
const S = hbState;

// helper แปลง size
const normalizeSize = (val) => {
  if (typeof val === 'number') return val;
  const m = String(val ?? '').match(/(\d{1,2})$/);
  return m ? Number(m[1]) : null;
};

const sizeIndex = normalizeSize(S?.hbSize);
const seriesKey = S?.hbHBType === 'H' ? 'H' : (S?.hbHBType === 'B' ? 'B' : null);
const stageNum  = Number(S?.hbStage) || null;

const baseByPole = { 2: 3000, 4: 1500, 6: 1000, 8: 750 };
const n1    = baseByPole[Number(S?.hbPole)] ?? null;
const ratio = (S?.hbRatio == null || S?.hbRatio === '') ? null : Number(S.hbRatio);
const kw    = (S?.hbKW    == null || S?.hbKW    === '') ? null : Number(S.hbKW);

const rpm    = (n1 && ratio) ? n1 / ratio : null;
const torque = (kw && rpm) ? (9550 * kw / rpm) * 0.88 : null;

let PN = null, sf = null;
if (seriesKey && stageNum && sizeIndex && ratio && S?.hbPole && kw) {
  const ret = calcSFBySeriesStage(seriesKey, stageNum, sizeIndex, ratio, Number(S.hbPole), kw);
  PN = ret?.PN ?? null;
  sf = ret?.SF ?? null;
}

// ตารางสเปก Ø / Oil / Weight
const spec = lookupGearSpecs(seriesKey, stageNum, sizeIndex) || null;
// [ADD] อ่าน ratio ที่ผู้ใช้เลือก (ใช้ key ที่คุณเก็บอยู่แล้ว)
const ratioVal = Number(S?.hbRatio ?? S?.ratio ?? ratio);

// [ADD] ถ้าคุณใช้ tag อย่าง 'H1','B3' ใน state (เช่น S.hbSeriesState) และอยาก map อัตโนมัติ:
// const { seriesKey: sk2, stageNum: st2 } = parseSeriesState(S?.hbSeriesState);
// const seriesKeyEff = sk2 ?? seriesKey;
// const stageNumEff  = st2 ?? stageNum;

// ถ้าไม่ได้ใช้ parseSeriesState ก็ใช้ seriesKey & stageNum เดิมได้เลย:
const seriesKeyEff = seriesKey;
const stageNumEff  = stageNum;

// [ADD] หา Ø จากกติกา (ครอบคลุม H1–H4, B2–B4; ถ้าไม่เข้าเงื่อนไขจะคืน null)
const ratioBasedDia = getInputDiaFromRules(seriesKeyEff, stageNumEff, sizeIndex, ratioVal);

const inputShaftDia  = S?.hbInputDia ?? ratioBasedDia ?? spec?.id ?? null; // Ø mm
const outputShaftDia = S?.hbOutputDia ?? spec?.od     ?? null; // Ø mm
const oilLiters      = S?.hbOil       ?? spec?.oil    ?? null; // L
const weightKg       = S?.hbWeight    ?? spec?.weight ?? null; // kg

// ข้อความอ้างอิง PN
const pnLine =
  (PN && n1 && sizeIndex && seriesKey && stageNum)
    ? `Ref PN จากตารางผู้ผลิต ${seriesKey}${stageNum} @ n1 = ${n1} rpm, Size ${sizeIndex} → PN = ${Number(PN).toLocaleString()} kW` 
    : 'ระบบไม่รองรับ Gear size นี้ กรุณาเลือก Gear Size ที่ใกล้เคียง';


  // ---- Qty & Color (fallback ค่าตั้งต้น) ----
  const qty   = Number(S?.hbQty) > 0 ? Number(S.hbQty) : 1;
  const color = S?.hbColor || 'standard';
    const IMG_FILTER_BY_COLOR = {
  white:    'none',
  standard: 'saturate(.9) brightness(1.06)',
  black:    'grayscale(1) brightness(.45) contrast(1.15)',
  blue:     'grayscale(.2) sepia(.35) hue-rotate(190deg) saturate(1.8) brightness(1.05)',
  red:      'grayscale(.2) sepia(.55) hue-rotate(-15deg) saturate(2.2) brightness(1.05)',
};

  const COLOR_HEX = {
    white:    '#f7f7f7',
    standard: '#9aa8b4',
    black:    '#111827',
    blue:     '#3b82f6',
    red:      '#ef4444',
  };

  const key = S?.hbOutput; // 'S','H','D','K','F','DF' ...
  const mapH = {
    S:  require('../assets/hb/output/H/H..S.png'),
    H:  require('../assets/hb/output/H/H..H.png'),
    D:  require('../assets/hb/output/H/H..D.png'),
    K:  require('../assets/hb/output/H/H..K.png'),
    F:  require('../assets/hb/output/H/H..F.png'),
  };
  const mapB = {
    S:  require('../assets/hb/output/B/B..S.png'),
    H:  require('../assets/hb/output/B/B..H.png'),
    D:  require('../assets/hb/output/B/B..D.png'),
    DF: require('../assets/hb/output/B/B..DF.png'),
    K:  require('../assets/hb/output/B/B..K.png'),
    F:  require('../assets/hb/output/B/B..F.png'),
  };
  const outputImg = (seriesKey === 'H' ? mapH : mapB)[key] || null;

  // ====== RETURN (layout: ซ้ายสรุป / ขวารูป) ======
  return (
    <div className="space-y-5 mt-0">
      {/* ปุ่มย้อนกลับ */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => update('goBack', null)}
          className="fixed z-30 px-1 py-0.5 rounded text-white/70 
                     bg-blue-400/20 backdrop-blur-sm border border-white/20 shadow-sm
                     hover:text-white hover:bg-blue-500 hover:shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-400/60
                     active:scale-95 transition-all duration-200"
          style={{
            left: 'max(1rem, env(safe-area-inset-left))',
            bottom: 'max(1rem, env(safe-area-inset-bottom))',
          }}
        >
          ย้อนกลับ
        </button>
      </div>
<div className="grid grid-cols-4 md:grid-cols-4 gap-x-15 gap-y-4 text-white">
  <div className="col-span-4 md:col-span-4 justify-self-center text-center">
    <span className="text-white/60 text-1xl md:text-2xl">Model :</span>{' '}
    <span className="font-semibold text-1xl md:text-2xl">{code}</span>
  </div>
</div>
      {/* กริดซ้าย/ขวา */}
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: SUMMARY */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/15 bg-black/30 backdrop-blur-md shadow-xl p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-white">
              <div><span className="text-white/60">Series :</span> <span className="font-semibold">{S?.hbHBType ?? '—'}</span></div>
              <div><span className="text-white/60">Stage of Gear :</span> <span className="font-semibold">{S?.hbStage ?? '—'}</span></div>

              <div><span className="text-white/60">Output shaft structure :</span> <span className="font-semibold">{S?.hbOutput ?? '—'}</span></div>
              <div><span className="text-white/60">Mounting Position :</span> <span className="font-semibold">{S?.hbMount ?? '—'}</span></div>

              <div><span className="text-white/60">Gear Size :</span> <span className="font-semibold">{S?.hbSize ?? '—'}</span></div>
              <div><span className="text-white/60">Ratio :</span> <span className="font-semibold">{fmt(ratio,2)}</span></div>

              <div><span className="text-white/60">Motor power (kW) :</span> <span className="font-semibold">{fmt(kw,2)}</span></div>
              <div><span className="text-white/60">Pole :</span> <span className="font-semibold">{S?.hbPole ?? '—'}</span></div>

              <div><span className="text-white/60">Output speed (rpm) :</span> <span className="font-semibold">{fmt(rpm,2)}</span></div>
              <div><span className="text-white/60">Output torque (N·m) :</span> <span className="font-semibold">{fmt(torque,2)}</span></div>

              <div><span className="text-white/60">Service Factor (S.F.) :</span> <span className="font-semibold">{fmt(sf,2)}</span></div>
              <div><span className="text-white/60">Shaft Design :</span> <span className="font-semibold">{S?.hbShaftDesign ?? '—'}</span></div>

              <div><span className="text-white/60">Input Shaft Diameter :</span> <span className="font-semibold">Ø {fmt(inputShaftDia,0)} mm</span></div>
              <div><span className="text-white/60">Output Shaft Diameter :</span> <span className="font-semibold">Ø {fmt(outputShaftDia,0)} mm</span></div>

              <div><span className="text-white/60">Oil :</span> <span className="font-semibold">{fmt(oilLiters,2)} Liter</span></div>
              <div><span className="text-white/60">Weight :</span> <span className="font-semibold">{fmt(weightKg,1)} kg</span></div>
            </div>

            <div className="text-xs text-white/50 mt-3">{pnLine}</div>
          </div>
        </div>

       {/* RIGHT: IMAGE FROM STEP 4 */}
<div className="lg:col-span-5">
  <div className="relative rounded-2xl border border-white/15 bg-black/30 backdrop-blur-md shadow-xl min-h-[280px] flex flex-col items-center justify-center p-3 overflow-visible">
    {(() => {
      const colorClass = ({
        white: 'motor-color-white',
        standard: 'motor-color-standard',
        black: 'motor-color-black',
        blue: 'motor-color-blue',
        red: 'motor-color-red',
      }[color]) || 'motor-color-standard';

      return (
        <img
          src={outputImg}
          alt={`Output structure ${S?.hbOutput || ''}`}
          className={`max-h-[340px] max-w-[520px] w-full object-contain mx-auto drop-shadow-lg ${colorClass}`}
        />
      );
    })()}

    {/* แถวปุ่มเลือกสี (เหมือนเดิม) */}
    <div className="mt-3 flex justify-center gap-3 w-full z-20">
      {[
        ['white','ขาว'],
        ['standard','เทา (Standard)'],
        ['black','ดำ'],
        ['blue','น้ำเงิน'],
        ['red','แดง'],
      ].map(([key,label]) => (
        <button
          key={key}
          title={label}
          onClick={() => update('hbColor', key)}
          className={`w-11 h-11 rounded-full border-2 border-white/30 hover:scale-105 transition
                      ${color===key ? 'ring-2 ring-white/70' : ''}`}
          style={{ background: ({
            white: '#f7f7f7',
            standard: '#9aa8b4',
            black: '#111827',
            blue: '#3b82f6',
            red: '#ef4444',
          }[key]) }}
          aria-label={`เลือกสี ${label}`}
        />
      ))}
    </div>
  </div>
</div>

      </div>

      {/* ROW: จำนวน (ใต้คอลัมน์ซ้าย) */}
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 -mt-24 -translate-y-14">
        <div className="lg:col-span-7 flex justify-center lg:justify-center pb-2 mt-2 md:mt-12 lg:mt-0">
          <div className="flex items-center gap-2 bg-black/30 border border-white/15 rounded-xl px-3 py-1.5 shadow">
            <button
              onClick={() => update('hbQty', Math.max(1, qty - 1))}
              className="w-8 h-8 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg"
              aria-label="ลดจำนวน"
            >
              –
            </button>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => {
                const v = Math.max(1, parseInt(e.target.value || '1', 10));
                update('hbQty', v);
              }}
              className="w-16 text-center bg-transparent text-white outline-none"
            />
            <button
              onClick={() => update('hbQty', qty + 1)}
              className="w-8 h-8 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-lg"
              aria-label="เพิ่มจำนวน"
            >
              +
            </button>
          </div>
          <span className="ml-3 self-center text-white/70 text-sm">จำนวน</span>
        </div>
      </div>

{/* ROW: 3 ปุ่ม — เรียงในแถวเดียวและอยู่กึ่งกลางหน้าจอ */}
<div className="mx-auto w-full max-w-6xl mt-4">
  <div className="flex flex-wrap justify-center items-center gap-4">
    {/* 3D STEP */}
    <button
      onClick={() => onDownload && code && onDownload(code, { qty })}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      ดาวน์โหลด 3D .STEP
    </button>

    {/* 2D Drawing */}
    <button
      onClick={() => {
        if (typeof onDownload2D === 'function') return onDownload2D(code, { qty, color, state: hbState });
        if (typeof onDownload   === 'function') return onDownload(code, { type: '2D', qty, color, state: hbState });
      }}
      className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
    >
      ดาวน์โหลด 2D Drawing
    </button>

    {/* ขอใบเสนอราคา */}
    <button
      onClick={() => typeof onRequestQuote === 'function' && onRequestQuote({ code, qty, color, state: hbState })}
      className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
    >
      ขอใบเสนอราคา
    </button>
  </div>
</div>

    </div>
  );
}


  // กรณี ZDYFAMILY เลือกแล้ว แต่ยังไม่มีสเปกถัดไป
  if (hbSeries === 'ZDYFAMILY' && hbZdySelected) {
    return (
      <div className="space-y-4 mt-0">
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
export function renderSRVFlow(state, setState, onConfirm, onRequestQuote) {
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
        <p className="text-blue-400 font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
 <b></b><br/>
  สามารถใช้สูตรคำนวณความเร็วรอบจากอัตราทดได้เลย: <b>ความเร็วหัวเกียร์ (รอบ/นาที) = ความเร็วมอเตอร์ (รอบ/นาที) ÷ อัตราทด (i)</b><br/>
  ถ้าเลือกมอเตอร์ 4 Pole ค่าโดยประมาณ = <b>1450</b> รอบ/นาที<br/>
  ถ้าเลือกมอเตอร์ 6 Pole ค่าโดยประมาณ = <b>950</b> รอบ/นาที<br/>
  ถ้าเลือกอัตราทด (i) 50 = <b>ความเร็วของหัวเกียร์ = 1450 / 50 = 29 rpm </b>
</p>
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

<div className="mt-6 flex items-center w-full">
  {/* ซ้าย: Drawing 2D PDF */}
  <div className="flex-1">
    <button
      type="button"
      onClick={() => {
        // TODO: ใช้ฟังก์ชันดาวน์โหลด PDF ของ SRV ที่คุณมี
        // เช่น downloadSrvDrawingPDF(srvState, confirmModel) หรือพารามิเตอร์ที่คุณใช้จริง
        if (typeof downloadSrvDrawingPDF === 'function') {
          downloadSrvDrawingPDF(srvState, confirmModel);
        } else {
          console.warn('downloadSrvDrawingPDF() not found');
        }
      }}
      className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 shadow border border-white/20"
    >
      📐 Drawing 2D
    </button>
  </div>
  <div className="flex-1 flex justify-center">
    <button
      type="button"
      className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 shadow"
      onClick={(e) => {
  e.stopPropagation();
  e.preventDefault();
  // เรียก callback ตามซิกเนเจอร์เดิมของ renderSRVFlow
  if (typeof onConfirm === 'function') {
    onConfirm(code);   // ส่งเฉพาะ modelCode
  }
}}
    >
      🧾 ขอใบเสนอราคา
    </button>
  </div>

  {/* ขวา: ยืนยันและรับไฟล์ 3D  -- ใช้ handler/เงื่อนไขเดิมทุกอย่าง */}
  <div className="flex-1 flex justify-end">
    <button
      type="button"
      onClick={() => onConfirm(code)}
      className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 shadow"
      // ^ ใช้ class/disabled เงื่อนไขเดิมของคุณได้เลย ถ้ามี
    >
      ✅ ยืนยันและรับไฟล์ 3D
    </button>
  </div>
</div>
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





