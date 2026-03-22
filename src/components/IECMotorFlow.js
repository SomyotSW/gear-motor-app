// IECMotorFlow.js  (v2 – updated)
// ─────────────────────────────────────────────────────────────────────────────
// การเปลี่ยนแปลงใน v2:
//  1. ตัด 3.7 kW ออกจาก IEC_POWER_LIST
//  2. Step 5 (Mounting): hover แสดงรูป B5/B3/B14/B35/B34 จาก src/assets/iec/
//     คลิกแล้วไป Step ต่อไป
//  3. Step 8 (Summary): แสดงข้อมูล Specs จาก MOTOR_DB ที่ผูกกับ Model จริง
//  4. เพิ่มปุ่ม "Data Sheet" ดาวน์โหลด PDF ตามชื่อ Model
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sasLogoUrl from '../assets/iec/SAS.png';

// ── รูปประเภทมอเตอร์ (assets เดิม) ──────────────────────────────────────────
import YE3Img   from '../assets/rkfs/YE3.png';
import YE4Img   from '../assets/rkfs/YE4.png';
import YEJImg   from '../assets/rkfs/YEJ.png';
import YVPImg   from '../assets/rkfs/YVP.png';
import YVPEJImg from '../assets/rkfs/YVPEJ.png';
import YBImg    from '../assets/rkfs/YB.png';

// ── รูป Terminal Box / Cable (assets เดิม) ───────────────────────────────────
import T0Img    from '../assets/rkfs/T0.png';
import T90Img   from '../assets/rkfs/T90.png';
import T180Img  from '../assets/rkfs/T180.png';
import T270Img  from '../assets/rkfs/T270.png';
import CXImg    from '../assets/rkfs/CX.png';
import C1Img    from '../assets/rkfs/C1.png';
import C2Img    from '../assets/rkfs/C2.png';
import C3Img    from '../assets/rkfs/C3.png';

// ── [NEW] รูป Mounting จาก assets/iec/ ──────────────────────────────────────
import B5Img  from '../assets/iec/B5.png';
import B3Img  from '../assets/iec/B3.png';
import B14Img from '../assets/iec/B14.png';
import B35Img from '../assets/iec/B35.png';
import B34Img from '../assets/iec/B34.png';

// ─────────────────────────────────────────────────────────────────────────────
// MOTOR DATABASE  (ดึงจากรูปตารางที่แนบมา)
// key: `${type}-${frame}-${pole}`  →  { speed, eff, pf, i380, i400, i415, torque, weight, ... }
// ─────────────────────────────────────────────────────────────────────────────

// ── ฟังก์ชันแปลง kW+Pole → Frame ──
function getIECFrame(kw, pole) {
  const p   = parseFloat(kw);
  const pol = parseInt((pole || '').replace('P', ''), 10);

  // ───── 2 Pole ─────
  if (pol === 2) {
    if (p <= 0.18) return 'YE3-631-2';
    if (p <= 0.25) return 'YE3-632-2';
    if (p <= 0.37) return 'YE3-711-2';
    if (p <= 0.55) return 'YE3-712-2';
    if (p <= 0.75) return 'YE3-801-2';
    if (p <= 1.1)  return 'YE3-802-2';
    if (p <= 1.5)  return 'YE3-90S-2';
    if (p <= 2.2)  return 'YE3-90L-2';
    if (p <= 3)    return 'YE3-100L-2';
    if (p <= 4)    return 'YE3-112M-2';
    if (p <= 5.5)  return 'YE3-132S1-2';
    if (p <= 7.5)  return 'YE3-132S2-2';
    if (p <= 11)   return 'YE3-160M1-2';
    if (p <= 15)   return 'YE3-160M2-2';
    if (p <= 18.5) return 'YE3-160L-2';
    if (p <= 22)   return 'YE3-180M-2';
    if (p <= 30)   return 'YE3-200L1-2';
    if (p <= 37)   return 'YE3-200L2-2';
    if (p <= 45)   return 'YE3-225M-2';
    if (p <= 55)   return 'YE3-250M-2';
    if (p <= 75)   return 'YE3-280S-2';
    if (p <= 90)   return 'YE3-280M-2';
    if (p <= 110)  return 'YE3-315S-2';
    if (p <= 132)  return 'YE3-315M-2';
    if (p <= 160)  return 'YE3-315L1-2';
    if (p <= 200)  return 'YE3-315L2-2';
  }
  // ───── 4 Pole ─────
  if (pol === 4) {
    if (p <= 0.12) return 'YE3-631-4';
    if (p <= 0.18) return 'YE3-632-4';
    if (p <= 0.25) return 'YE3-711-4';
    if (p <= 0.37) return 'YE3-712-4';
    if (p <= 0.55) return 'YE3-801-4';
    if (p <= 0.75) return 'YE3-802-4';
    if (p <= 1.1)  return 'YE3-90S-4';
    if (p <= 1.5)  return 'YE3-90L-4';
    if (p <= 2.2)  return 'YE3-100L1-4';
    if (p <= 3)    return 'YE3-100L2-4';
    if (p <= 4)    return 'YE3-112M-4';
    if (p <= 5.5)  return 'YE3-132S-4';
    if (p <= 7.5)  return 'YE3-132M-4';
    if (p <= 11)   return 'YE3-160M-4';
    if (p <= 15)   return 'YE3-160L-4';
    if (p <= 18.5) return 'YE3-180M-4';
    if (p <= 22)   return 'YE3-180L-4';
    if (p <= 30)   return 'YE3-200L-4';
    if (p <= 37)   return 'YE3-225S-4';
    if (p <= 45)   return 'YE3-225M-4';
    if (p <= 55)   return 'YE3-250M-4';
    if (p <= 75)   return 'YE3-280S-4';
    if (p <= 90)   return 'YE3-280M-4';
    if (p <= 110)  return 'YE3-315S-4';
    if (p <= 132)  return 'YE3-315M-4';
    if (p <= 160)  return 'YE3-315L1-4';
    if (p <= 200)  return 'YE3-315L2-4';
    if (p <= 250)  return 'YE3-355M-4';
    if (p <= 315)  return 'YE3-355L-4';
  }
  // ───── 6 Pole ─────
  if (pol === 6) {
    if (p <= 0.18) return 'YE3-711-6';
    if (p <= 0.25) return 'YE3-712-6';
    if (p <= 0.37) return 'YE3-801-6';
    if (p <= 0.55) return 'YE3-802-6';
    if (p <= 0.75) return 'YE3-90S-6';
    if (p <= 1.1)  return 'YE3-90L-6';
    if (p <= 1.5)  return 'YE3-100L-6';
    if (p <= 2.2)  return 'YE3-112M-6';
    if (p <= 3)    return 'YE3-132S-6';
    if (p <= 4)    return 'YE3-132M1-6';
    if (p <= 5.5)  return 'YE3-132M2-6';
    if (p <= 7.5)  return 'YE3-160M-6';
    if (p <= 11)   return 'YE3-160L-6';
    if (p <= 15)   return 'YE3-180L-6';
    if (p <= 18.5) return 'YE3-200L1-6';
    if (p <= 22)   return 'YE3-200L2-6';
    if (p <= 30)   return 'YE3-225M-6';
    if (p <= 37)   return 'YE3-250M-6';
    if (p <= 45)   return 'YE3-280S-6';
    if (p <= 55)   return 'YE3-280M-6';
    if (p <= 75)   return 'YE3-315S-6';
    if (p <= 90)   return 'YE3-315M-6';
    if (p <= 110)  return 'YE3-315L1-6';
    if (p <= 132)  return 'YE3-315L2-6';
    if (p <= 160)  return 'YE3-355M1-6';
    if (p <= 200)  return 'YE3-355M2-6';
    if (p <= 250)  return 'YE3-355L-6';
  }
  // ───── 8 Pole ─────
  if (pol === 8) {
    if (p <= 0.18) return 'YE3-801-8';
    if (p <= 0.25) return 'YE3-802-8';
    if (p <= 0.37) return 'YE3-90S-8';
    if (p <= 0.55) return 'YE3-90L-8';
    if (p <= 0.75) return 'YE3-100L1-8';
    if (p <= 1.1)  return 'YE3-100L2-8';
    if (p <= 1.5)  return 'YE3-112M-8';
    if (p <= 2.2)  return 'YE3-132S-8';
    if (p <= 3)    return 'YE3-132M-8';
    if (p <= 4)    return 'YE3-160M1-8';
    if (p <= 5.5)  return 'YE3-160M2-8';
    if (p <= 7.5)  return 'YE3-160L-8';
    if (p <= 11)   return 'YE3-180L-8';
    if (p <= 15)   return 'YE3-200L-8';
    if (p <= 18.5) return 'YE3-225S-8';
    if (p <= 22)   return 'YE3-225M-8';
    if (p <= 30)   return 'YE3-250M-8';
    if (p <= 37)   return 'YE3-280S-8';
    if (p <= 45)   return 'YE3-280M-8';
    if (p <= 55)   return 'YE3-315S-8';
    if (p <= 75)   return 'YE3-315M-8';
    if (p <= 90)   return 'YE3-315L1-8';
    if (p <= 110)  return 'YE3-315L2-8';
    if (p <= 132)  return 'YE3-355M1-8';
    if (p <= 160)  return 'YE3-355M2-8';
    if (p <= 200)  return 'YE3-355L-8';
  }
  return null;
}

// แยก frame suffix (ตัดชื่อ type prefix ออก) → ใช้ใน Model Code
// เช่น 'YE3-112M-4' → '112M'  ,  'YE3-132S1-2' → '132S1'
function frameLabel(fullKey) {
  if (!fullKey) return '???';
  const parts = fullKey.split('-');
  // parts[0]=YE3, parts[1]=frameBody, parts[2]=pole
  return parts.slice(1, parts.length - 1).join('-');
}

// ─────────────────────────────────────────────────────────────────────────────
// YE3 Specs database (ข้อมูลจากตารางในรูปภาพ)
// ─────────────────────────────────────────────────────────────────────────────
const YE3_DB = {
  // ── 2 Pole ──────────────────────────────────────────────────────────────────
  'YE3-631-2':   { kw:0.18, hp:0.24, speed:2735, eff:65.9, pf:0.80, i380:0.5,   i400:0.49,  i415:0.48,  torque:0.63,  weight:4.0  },
  'YE3-632-2':   { kw:0.25, hp:0.34, speed:2735, eff:69.7, pf:0.81, i380:0.7,   i400:0.64,  i415:0.62,  torque:0.87,  weight:4.5  },
  'YE3-711-2':   { kw:0.37, hp:0.5,  speed:2760, eff:73.8, pf:0.81, i380:0.9,   i400:0.89,  i415:0.86,  torque:1.28,  weight:6.5  },
  'YE3-712-2':   { kw:0.55, hp:0.75, speed:2760, eff:77.8, pf:0.82, i380:1.3,   i400:1.24,  i415:1.20,  torque:1.90,  weight:7.5  },
  'YE3-801-2':   { kw:0.75, hp:1,    speed:2880, eff:80.7, pf:0.82, i380:1.7,   i400:1.6,   i415:1.6,   torque:2.49,  weight:18.1 },
  'YE3-802-2':   { kw:1.1,  hp:1.5,  speed:2880, eff:82.7, pf:0.83, i380:2.4,   i400:2.3,   i415:2.2,   torque:3.65,  weight:19.5 },
  'YE3-90S-2':   { kw:1.5,  hp:2,    speed:2895, eff:84.2, pf:0.84, i380:3.2,   i400:3.1,   i415:3.0,   torque:4.95,  weight:23.3 },
  'YE3-90L-2':   { kw:2.2,  hp:3,    speed:2895, eff:85.9, pf:0.85, i380:4.6,   i400:4.3,   i415:4.2,   torque:7.26,  weight:27.1 },
  'YE3-100L-2':  { kw:3,    hp:4,    speed:2895, eff:87.1, pf:0.87, i380:6.0,   i400:5.7,   i415:5.5,   torque:9.9,   weight:38.8 },
  'YE3-112M-2':  { kw:4,    hp:5.5,  speed:2905, eff:88.1, pf:0.88, i380:7.8,   i400:7.4,   i415:7.2,   torque:13.1,  weight:48.3 },
  'YE3-132S1-2': { kw:5.5,  hp:7.5,  speed:2930, eff:89.2, pf:0.88, i380:10.6,  i400:10.1,  i415:9.7,   torque:17.9,  weight:55.1 },
  'YE3-132S2-2': { kw:7.5,  hp:10,   speed:2930, eff:90.1, pf:0.88, i380:14.4,  i400:13.7,  i415:13.2,  torque:24.4,  weight:69.2 },
  'YE3-160M1-2': { kw:11,   hp:15,   speed:2945, eff:91.2, pf:0.89, i380:20.6,  i400:19.6,  i415:18.9,  torque:35.7,  weight:113  },
  'YE3-160M2-2': { kw:15,   hp:20,   speed:2945, eff:91.9, pf:0.89, i380:27.9,  i400:26.5,  i415:25.5,  torque:48.6,  weight:123  },
  'YE3-160L-2':  { kw:18.5, hp:25,   speed:2940, eff:92.4, pf:0.89, i380:34.2,  i400:32.5,  i415:31.3,  torque:60.1,  weight:142  },
  'YE3-180M-2':  { kw:22,   hp:30,   speed:2955, eff:92.7, pf:0.89, i380:40.5,  i400:38.5,  i415:37.1,  torque:71.1,  weight:182  },
  'YE3-200L1-2': { kw:30,   hp:40,   speed:2960, eff:93.3, pf:0.89, i380:54.9,  i400:52.1,  i415:50.3,  torque:96.8,  weight:246  },
  'YE3-200L2-2': { kw:37,   hp:50,   speed:2960, eff:93.7, pf:0.89, i380:67.4,  i400:64.0,  i415:61.7,  torque:119.4, weight:265  },
  'YE3-225M-2':  { kw:45,   hp:60,   speed:2965, eff:94.0, pf:0.90, i380:80.8,  i400:76.8,  i415:74.0,  torque:144.9, weight:323  },
  'YE3-250M-2':  { kw:55,   hp:75,   speed:2970, eff:94.3, pf:0.90, i380:98.5,  i400:93.5,  i415:90.2,  torque:176.9, weight:413  },
  'YE3-280S-2':  { kw:75,   hp:100,  speed:2975, eff:94.7, pf:0.90, i380:133.7, i400:127.0, i415:122.4, torque:240.8, weight:546  },
  'YE3-280M-2':  { kw:90,   hp:125,  speed:2975, eff:95.0, pf:0.90, i380:159.9, i400:151.9, i415:146.4, torque:288.9, weight:569  },
  'YE3-315S-2':  { kw:110,  hp:150,  speed:2975, eff:95.2, pf:0.90, i380:195.1, i400:185.3, i415:178.6, torque:352.8, weight:897  },
  'YE3-315M-2':  { kw:132,  hp:180,  speed:2978, eff:95.4, pf:0.90, i380:233.6, i400:221.9, i415:213.9, torque:423.3, weight:1029 },
  'YE3-315L1-2': { kw:160,  hp:200,  speed:2978, eff:95.6, pf:0.91, i380:279.4, i400:265.5, i415:255.9, torque:512.8, weight:1067 },
  'YE3-315L2-2': { kw:200,  hp:270,  speed:2980, eff:95.8, pf:0.91, i380:348.6, i400:331.1, i415:319.2, torque:640.9, weight:1194 },
  // ── 4 Pole ──────────────────────────────────────────────────────────────────
  'YE3-631-4':   { kw:0.12, hp:0.16, speed:1330, eff:64.8, pf:0.72, i380:0.4,   i400:0.37,  i415:0.36,  torque:0.86,  weight:4.0  },
  'YE3-632-4':   { kw:0.18, hp:0.24, speed:1330, eff:69.9, pf:0.73, i380:0.5,   i400:0.51,  i415:0.49,  torque:1.29,  weight:4.5  },
  'YE3-711-4':   { kw:0.25, hp:0.34, speed:1350, eff:73.5, pf:0.74, i380:0.7,   i400:0.66,  i415:0.64,  torque:1.77,  weight:6.5  },
  'YE3-712-4':   { kw:0.37, hp:0.5,  speed:1350, eff:77.3, pf:0.75, i380:1.0,   i400:0.92,  i415:0.89,  torque:2.62,  weight:7.5  },
  'YE3-801-4':   { kw:0.55, hp:0.75, speed:1400, eff:80.8, pf:0.75, i380:1.4,   i400:1.3,   i415:1.3,   torque:3.75,  weight:17.6 },
  'YE3-802-4':   { kw:0.75, hp:1,    speed:1420, eff:82.5, pf:0.75, i380:1.8,   i400:1.7,   i415:1.7,   torque:5.04,  weight:18.4 },
  'YE3-90S-4':   { kw:1.1,  hp:1.5,  speed:1445, eff:84.1, pf:0.76, i380:2.6,   i400:2.5,   i415:2.4,   torque:7.27,  weight:24.2 },
  'YE3-90L-4':   { kw:1.5,  hp:2,    speed:1445, eff:85.3, pf:0.77, i380:3.5,   i400:3.3,   i415:3.2,   torque:9.91,  weight:29.7 },
  'YE3-100L1-4': { kw:2.2,  hp:3,    speed:1435, eff:86.7, pf:0.81, i380:4.8,   i400:4.5,   i415:4.4,   torque:14.6,  weight:41.5 },
  'YE3-100L2-4': { kw:3,    hp:4,    speed:1435, eff:87.7, pf:0.82, i380:6.3,   i400:6.0,   i415:5.8,   torque:20.0,  weight:46   },
  'YE3-112M-4':  { kw:4,    hp:5.5,  speed:1440, eff:88.6, pf:0.82, i380:8.4,   i400:7.9,   i415:7.7,   torque:26.5,  weight:63.2 },
  'YE3-132S-4':  { kw:5.5,  hp:7.5,  speed:1460, eff:89.6, pf:0.83, i380:11.2,  i400:10.7,  i415:10.3,  torque:36.0,  weight:71.2 },
  'YE3-132M-4':  { kw:7.5,  hp:10,   speed:1460, eff:90.4, pf:0.84, i380:15.0,  i400:14.3,  i415:13.7,  torque:49.1,  weight:85.1 },
  'YE3-160M-4':  { kw:11,   hp:15,   speed:1465, eff:91.4, pf:0.85, i380:21.5,  i400:20.4,  i415:19.7,  torque:71.7,  weight:121  },
  'YE3-160L-4':  { kw:15,   hp:20,   speed:1465, eff:92.1, pf:0.86, i380:28.8,  i400:27.3,  i415:26.3,  torque:97.8,  weight:142  },
  'YE3-180M-4':  { kw:18.5, hp:25,   speed:1470, eff:92.6, pf:0.86, i380:35.3,  i400:33.5,  i415:32.3,  torque:120.2, weight:181  },
  'YE3-180L-4':  { kw:22,   hp:30,   speed:1470, eff:93.0, pf:0.86, i380:41.8,  i400:39.7,  i415:38.3,  torque:142.9, weight:209  },
  'YE3-200L-4':  { kw:30,   hp:40,   speed:1475, eff:93.6, pf:0.86, i380:56.6,  i400:53.8,  i415:51.9,  torque:194.2, weight:284  },
  'YE3-225S-4':  { kw:37,   hp:50,   speed:1485, eff:93.9, pf:0.86, i380:69.6,  i400:66.1,  i415:63.7,  torque:237.9, weight:328  },
  'YE3-225M-4':  { kw:45,   hp:60,   speed:1485, eff:94.2, pf:0.86, i380:84.4,  i400:80.2,  i415:77.3,  torque:289.4, weight:363  },
  'YE3-250M-4':  { kw:55,   hp:75,   speed:1485, eff:94.6, pf:0.86, i380:102.7, i400:97.6,  i415:94.1,  torque:353.7, weight:442  },
  'YE3-280S-4':  { kw:75,   hp:100,  speed:1486, eff:95.0, pf:0.88, i380:136.3, i400:129.5, i415:124.8, torque:482.0, weight:569  },
  'YE3-280M-4':  { kw:90,   hp:125,  speed:1486, eff:95.2, pf:0.88, i380:163.2, i400:155.1, i415:149.5, torque:578.4, weight:639  },
  'YE3-315S-4':  { kw:110,  hp:150,  speed:1488, eff:95.4, pf:0.89, i380:196.8, i400:187.0, i415:180.2, torque:706.0, weight:939  },
  'YE3-315M-4':  { kw:132,  hp:180,  speed:1488, eff:95.6, pf:0.89, i380:235.7, i400:223.9, i415:215.8, torque:847.2, weight:1033 },
  'YE3-315L1-4': { kw:160,  hp:200,  speed:1488, eff:95.8, pf:0.89, i380:285.1, i400:270.9, i415:261.1, torque:1027,  weight:1126 },
  'YE3-315L2-4': { kw:200,  hp:270,  speed:1490, eff:96.0, pf:0.90, i380:351.7, i400:334.1, i415:322.0, torque:1282,  weight:1238 },
  'YE3-355M-4':  { kw:250,  hp:340,  speed:1490, eff:96.0, pf:0.90, i380:439.6, i400:417.6, i415:402.6, torque:1602,  weight:1830 },
  'YE3-355L-4':  { kw:315,  hp:430,  speed:1490, eff:96.0, pf:0.90, i380:553.9, i400:526.2, i415:507.2, torque:2019,  weight:1950 },
  // ── 6 Pole ──────────────────────────────────────────────────────────────────
  'YE3-711-6':   { kw:0.18, hp:0.24, speed:860,  eff:63.9, pf:0.66, i380:0.6,   i400:0.62,  i415:0.59,  torque:2.00,  weight:6.0  },
  'YE3-712-6':   { kw:0.25, hp:0.34, speed:860,  eff:68.6, pf:0.68, i380:0.8,   i400:0.77,  i415:0.75,  torque:2.78,  weight:7.5  },
  'YE3-801-6':   { kw:0.37, hp:0.5,  speed:890,  eff:62.0, pf:0.70, i380:1.3,   i400:1.2,   i415:1.2,   torque:3.97,  weight:15.2 },
  'YE3-802-6':   { kw:0.55, hp:0.75, speed:890,  eff:73.6, pf:0.72, i380:1.6,   i400:1.5,   i415:1.4,   torque:5.9,   weight:16.6 },
  'YE3-90S-6':   { kw:0.75, hp:1,    speed:935,  eff:78.9, pf:0.72, i380:2.0,   i400:1.9,   i415:1.8,   torque:7.66,  weight:24.1 },
  'YE3-90L-6':   { kw:1.1,  hp:1.5,  speed:945,  eff:81.0, pf:0.73, i380:2.8,   i400:2.7,   i415:2.6,   torque:11.1,  weight:25.7 },
  'YE3-100L-6':  { kw:1.5,  hp:2,    speed:949,  eff:82.5, pf:0.74, i380:3.7,   i400:3.5,   i415:3.4,   torque:15.1,  weight:34.9 },
  'YE3-112M-6':  { kw:2.2,  hp:3,    speed:955,  eff:84.3, pf:0.74, i380:5.4,   i400:5.1,   i415:4.9,   torque:22.0,  weight:54.2 },
  'YE3-132S-6':  { kw:3,    hp:4,    speed:968,  eff:85.6, pf:0.74, i380:7.2,   i400:6.8,   i415:6.6,   torque:29.6,  weight:62.3 },
  'YE3-132M1-6': { kw:4,    hp:5.5,  speed:968,  eff:86.8, pf:0.74, i380:9.5,   i400:9.0,   i415:8.7,   torque:39.5,  weight:75.2 },
  'YE3-132M2-6': { kw:5.5,  hp:7.5,  speed:968,  eff:88.0, pf:0.75, i380:12.7,  i400:12.0,  i415:11.6,  torque:54.3,  weight:82.3 },
  'YE3-160M-6':  { kw:7.5,  hp:10,   speed:970,  eff:89.1, pf:0.79, i380:16.2,  i400:15.4,  i415:14.8,  torque:73.8,  weight:112  },
  'YE3-160L-6':  { kw:11,   hp:15,   speed:970,  eff:90.3, pf:0.80, i380:23.1,  i400:22.0,  i415:21.2,  torque:108.3, weight:134  },
  'YE3-180L-6':  { kw:15,   hp:20,   speed:978,  eff:91.2, pf:0.81, i380:30.9,  i400:29.3,  i415:28.2,  torque:146.5, weight:197  },
  'YE3-200L1-6': { kw:18.5, hp:25,   speed:980,  eff:91.7, pf:0.81, i380:37.8,  i400:36.0,  i415:34.7,  torque:180.3, weight:234  },
  'YE3-200L2-6': { kw:22,   hp:30,   speed:980,  eff:92.2, pf:0.81, i380:44.8,  i400:42.5,  i415:41.0,  torque:214.4, weight:251  },
  'YE3-225M-6':  { kw:30,   hp:40,   speed:980,  eff:92.9, pf:0.83, i380:59.1,  i400:56.2,  i415:54.1,  torque:292.3, weight:308  },
  'YE3-250M-6':  { kw:37,   hp:50,   speed:985,  eff:93.3, pf:0.84, i380:71.7,  i400:68.1,  i415:65.7,  torque:358.7, weight:383  },
  'YE3-280S-6':  { kw:45,   hp:60,   speed:985,  eff:93.7, pf:0.85, i380:85.8,  i400:81.6,  i415:78.6,  torque:436.3, weight:501  },
  'YE3-280M-6':  { kw:55,   hp:75,   speed:985,  eff:94.1, pf:0.86, i380:103.3, i400:98.1,  i415:94.6,  torque:533.2, weight:573  },
  'YE3-315S-6':  { kw:75,   hp:100,  speed:985,  eff:94.6, pf:0.84, i380:143.4, i400:136.2, i415:131.3, torque:727.2, weight:843  },
  'YE3-315M-6':  { kw:90,   hp:125,  speed:988,  eff:94.9, pf:0.85, i380:169.5, i400:161.0, i415:155.2, torque:869.9, weight:941  },
  'YE3-315L1-6': { kw:110,  hp:150,  speed:988,  eff:95.1, pf:0.85, i380:206.8, i400:196.4, i415:189.3, torque:1063,  weight:1017 },
  'YE3-315L2-6': { kw:132,  hp:180,  speed:988,  eff:95.4, pf:0.86, i380:244.5, i400:232.2, i415:223.8, torque:1276,  weight:1121 },
  'YE3-355M1-6': { kw:160,  hp:200,  speed:990,  eff:95.6, pf:0.86, i380:295.7, i400:280.9, i415:270.7, torque:1543,  weight:1715 },
  'YE3-355M2-6': { kw:200,  hp:270,  speed:990,  eff:95.8, pf:0.87, i380:364.6, i400:346.4, i415:333.8, torque:1929,  weight:1846 },
  'YE3-355L-6':  { kw:250,  hp:340,  speed:990,  eff:95.8, pf:0.87, i380:455.7, i400:433.0, i415:417.3, torque:2412,  weight:2085 },
  // ── 8 Pole ──────────────────────────────────────────────────────────────────
  'YE3-801-8':   { kw:0.18, hp:0.25, speed:650,  eff:51.0, pf:0.61, i380:0.9,   i400:0.8,   i415:0.8,   torque:2.64,  weight:14.5 },
  'YE3-802-8':   { kw:0.25, hp:0.37, speed:650,  eff:54.0, pf:0.61, i380:1.2,   i400:1.1,   i415:1.1,   torque:3.67,  weight:16.7 },
  'YE3-90S-8':   { kw:0.37, hp:0.5,  speed:675,  eff:62.0, pf:0.61, i380:1.5,   i400:1.4,   i415:1.4,   torque:5.23,  weight:28.2 },
  'YE3-90L-8':   { kw:0.55, hp:0.75, speed:675,  eff:63.0, pf:0.61, i380:2.2,   i400:2.1,   i415:2.0,   torque:7.78,  weight:29.7 },
  'YE3-100L1-8': { kw:0.75, hp:1,    speed:685,  eff:68.7, pf:0.67, i380:2.5,   i400:2.4,   i415:2.3,   torque:10.5,  weight:40   },
  'YE3-100L2-8': { kw:1.1,  hp:1.5,  speed:685,  eff:70.7, pf:0.67, i380:3.5,   i400:3.4,   i415:3.2,   torque:15.3,  weight:41.4 },
  'YE3-112M-8':  { kw:1.5,  hp:2,    speed:695,  eff:72.8, pf:0.71, i380:4.4,   i400:4.2,   i415:4.0,   torque:20.6,  weight:57.5 },
  'YE3-132S-8':  { kw:2.2,  hp:3,    speed:710,  eff:77.9, pf:0.71, i380:6.0,   i400:5.7,   i415:5.5,   torque:29.6,  weight:74.8 },
  'YE3-132M-8':  { kw:3,    hp:4,    speed:710,  eff:78.9, pf:0.73, i380:7.9,   i400:7.5,   i415:7.2,   torque:40.4,  weight:89.1 },
  'YE3-160M1-8': { kw:4,    hp:5.5,  speed:725,  eff:79.9, pf:0.73, i380:10.4,  i400:9.9,   i415:9.5,   torque:52.7,  weight:101  },
  'YE3-160M2-8': { kw:5.5,  hp:7.5,  speed:725,  eff:82.0, pf:0.74, i380:13.8,  i400:13.1,  i415:12.6,  torque:72.4,  weight:126.5},
  'YE3-160L-8':  { kw:7.5,  hp:10,   speed:725,  eff:84.0, pf:0.75, i380:18.1,  i400:17.2,  i415:16.6,  torque:98.8,  weight:136  },
  'YE3-180L-8':  { kw:11,   hp:15,   speed:735,  eff:86.4, pf:0.75, i380:25.8,  i400:24.5,  i415:23.6,  torque:142.9, weight:198  },
  'YE3-200L-8':  { kw:15,   hp:20,   speed:730,  eff:86.9, pf:0.76, i380:34.5,  i400:32.8,  i415:31.6,  torque:196.2, weight:234  },
  'YE3-225S-8':  { kw:18.5, hp:25,   speed:730,  eff:89.1, pf:0.76, i380:41.5,  i400:39.4,  i415:38.0,  torque:242.0, weight:284  },
  'YE3-225M-8':  { kw:22,   hp:30,   speed:730,  eff:89.6, pf:0.78, i380:47.8,  i400:45.4,  i415:43.8,  torque:287.8, weight:325  },
  'YE3-250M-8':  { kw:30,   hp:40,   speed:735,  eff:90.4, pf:0.79, i380:63.8,  i400:60.6,  i415:58.4,  torque:389.8, weight:425  },
  'YE3-280S-8':  { kw:37,   hp:50,   speed:735,  eff:90.9, pf:0.79, i380:78.3,  i400:74.4,  i415:71.7,  torque:480.7, weight:518  },
  'YE3-280M-8':  { kw:45,   hp:60,   speed:735,  eff:91.4, pf:0.79, i380:94.7,  i400:90.0,  i415:86.7,  torque:584.7, weight:582  },
  'YE3-315S-8':  { kw:55,   hp:75,   speed:735,  eff:92.3, pf:0.80, i380:113.2, i400:107.5, i415:103.6, torque:714.6, weight:852  },
  'YE3-315M-8':  { kw:75,   hp:100,  speed:735,  eff:93.2, pf:0.80, i380:152.8, i400:145.2, i415:139.9, torque:974.5, weight:952  },
  'YE3-315L1-8': { kw:90,   hp:125,  speed:735,  eff:93.5, pf:0.80, i380:182.8, i400:173.7, i415:167.4, torque:1169,  weight:1040 },
  'YE3-315L2-8': { kw:110,  hp:150,  speed:735,  eff:93.5, pf:0.82, i380:218.0, i400:207.1, i415:199.6, torque:1429,  weight:1056 },
  'YE3-355M1-8': { kw:132,  hp:180,  speed:740,  eff:93.8, pf:0.82, i380:260.8, i400:247.7, i415:238.8, torque:1704,  weight:1784 },
  'YE3-355M2-8': { kw:160,  hp:200,  speed:740,  eff:94.0, pf:0.82, i380:315.4, i400:299.6, i415:288.8, torque:2065,  weight:1941 },
  'YE3-355L-8':  { kw:200,  hp:270,  speed:740,  eff:94.2, pf:0.83, i380:388.7, i400:369.2, i415:355.9, torque:2581,  weight:2026 },
};

// ─── YE4 DB (2P partial – from Image 5) ────────────────────────────────────
const YE4_DB = {
  // 2 Pole
  'YE4-631-2':   { kw:0.18, speed:2740, eff:70.8, pf:0.80, i380:0.5,   torque:0.63,  weight:4.0  },
  'YE4-632-2':   { kw:0.25, speed:2740, eff:74.3, pf:0.81, i380:0.6,   torque:0.87,  weight:4.5  },
  'YE4-711-2':   { kw:0.37, speed:2765, eff:78.1, pf:0.81, i380:0.9,   torque:1.28,  weight:6.5  },
  'YE4-712-2':   { kw:0.55, speed:2765, eff:81.5, pf:0.82, i380:1.3,   torque:1.90,  weight:7.5  },
  'YE4-80M1-2':  { kw:0.75, speed:2900, eff:83.5, pf:0.83, i380:1.6,   torque:2.47,  weight:22   },
  'YE4-80M2-2':  { kw:1.1,  speed:2900, eff:85.2, pf:0.83, i380:2.4,   torque:3.62,  weight:25   },
  'YE4-90S2':    { kw:1.5,  speed:2910, eff:86.5, pf:0.85, i380:3.1,   torque:4.92,  weight:31   },
  'YE4-90L-2':   { kw:2.2,  speed:2910, eff:88.0, pf:0.86, i380:4.4,   torque:7.22,  weight:36   },
  'YE4-100L-2':  { kw:3,    speed:2920, eff:89.1, pf:0.87, i380:5.9,   torque:9.81,  weight:45   },
  'YE4-112M-2':  { kw:4,    speed:2920, eff:90.0, pf:0.88, i380:7.7,   torque:13.08, weight:60   },
  'YE4-132S1-2': { kw:5.5,  speed:2940, eff:90.9, pf:0.88, i380:10.4,  torque:17.87, weight:78   },
  'YE4-132S2-2': { kw:7.5,  speed:2940, eff:91.7, pf:0.89, i380:14.0,  torque:24.36, weight:85   },
  'YE4-160M1-2': { kw:11,   speed:2950, eff:92.6, pf:0.89, i380:20.3,  torque:35.58, weight:150  },
  'YE4-160M2-2': { kw:15,   speed:2950, eff:93.3, pf:0.89, i380:27.4,  torque:48.53, weight:165  },
  'YE4-160L-2':  { kw:18.5, speed:2950, eff:93.7, pf:0.89, i380:33.7,  torque:59.85, weight:173  },
  'YE4-180M-2':  { kw:22,   speed:2960, eff:94.0, pf:0.89, i380:40.0,  torque:70.95, weight:210  },
  'YE4-200L1-2': { kw:30,   speed:2970, eff:94.5, pf:0.89, i380:54.2,  torque:96.47, weight:290  },
  'YE4-200L2-2': { kw:37,   speed:2970, eff:94.8, pf:0.89, i380:66.6,  torque:118.93,weight:310  },
  'YE4-225M-2':  { kw:45,   speed:2970, eff:95.0, pf:0.89, i380:80.9,  torque:144.7, weight:370  },
  'YE4-250M-2':  { kw:55,   speed:2980, eff:95.3, pf:0.89, i380:98.5,  torque:176.3, weight:510  },
  'YE4-280S-2':  { kw:75,   speed:2980, eff:95.6, pf:0.89, i380:133.9, torque:240.3, weight:620  },
  'YE4-280M-2':  { kw:90,   speed:2980, eff:95.8, pf:0.89, i380:160.4, torque:288.3, weight:680  },
  'YE4-315S-2':  { kw:110,  speed:2980, eff:96.0, pf:0.89, i380:195.6, torque:352.3, weight:1120 },
  'YE4-315M-2':  { kw:132,  speed:2980, eff:96.2, pf:0.89, i380:234.2, torque:422.8, weight:1130 },
  'YE4-315L1-2': { kw:160,  speed:2980, eff:96.3, pf:0.90, i380:283.6, torque:512.5, weight:1210 },
  'YE4-315L2-2': { kw:200,  speed:2980, eff:96.5, pf:0.90, i380:353.8, torque:640.5, weight:1310 },
  'YE4-355M-2':  { kw:250,  speed:2980, eff:96.5, pf:0.91, i380:432.5, torque:801.4, weight:1860 },
  'YE4-355L-2':  { kw:315,  speed:2980, eff:96.5, pf:0.91, i380:545.0, torque:1009,  weight:2150 },
  // 4 Pole
  'YE4-631-4':   { kw:0.12, speed:1335, eff:69.8, pf:0.72, i380:0.4,   torque:0.86,  weight:4.0  },
  'YE4-632-4':   { kw:0.18, speed:1335, eff:74.7, pf:0.73, i380:0.5,   torque:1.29,  weight:4.5  },
  'YE4-711-4':   { kw:0.25, speed:1355, eff:77.9, pf:0.74, i380:0.7,   torque:1.76,  weight:6.5  },
  'YE4-712-4':   { kw:0.37, speed:1355, eff:81.1, pf:0.75, i380:0.9,   torque:2.61,  weight:7.5  },
  'YE4-801-4':   { kw:0.55, speed:1400, eff:83.9, pf:0.75, i380:1.3,   torque:3.75,  weight:25   },
  'YE4-90S-4':   { kw:1.1,  speed:1445, eff:87.2, pf:0.75, i380:2.6,   torque:7.27,  weight:33   },
  'YE4-90L-4':   { kw:1.5,  speed:1445, eff:88.2, pf:0.76, i380:3.4,   torque:9.91,  weight:38   },
  'YE4-100L1-4': { kw:2.2,  speed:1460, eff:89.5, pf:0.79, i380:4.7,   torque:14.4,  weight:44   },
  'YE4-100L2-4': { kw:3,    speed:1460, eff:90.4, pf:0.80, i380:6.3,   torque:19.6,  weight:50   },
  'YE4-112M-4':  { kw:4,    speed:1460, eff:91.1, pf:0.80, i380:8.3,   torque:26.2,  weight:65   },
  'YE4-132S-4':  { kw:5.5,  speed:1470, eff:91.9, pf:0.80, i380:11.4,  torque:35.7,  weight:80   },
  'YE4-132M-4':  { kw:7.5,  speed:1470, eff:92.6, pf:0.81, i380:15.2,  torque:48.7,  weight:92   },
  'YE4-160M-4':  { kw:11,   speed:1475, eff:93.3, pf:0.83, i380:21.6,  torque:71.2,  weight:160  },
  'YE4-160L-4':  { kw:15,   speed:1475, eff:93.9, pf:0.84, i380:28.9,  torque:97.1,  weight:180  },
  'YE4-180M-4':  { kw:18.5, speed:1480, eff:94.2, pf:0.85, i380:35.1,  torque:119.4, weight:205  },
  'YE4-180L-4':  { kw:22,   speed:1480, eff:94.5, pf:0.85, i380:41.6,  torque:141.9, weight:235  },
  'YE4-200L-4':  { kw:30,   speed:1480, eff:94.9, pf:0.85, i380:56.5,  torque:193.5, weight:310  },
  'YE4-225S-4':  { kw:37,   speed:1485, eff:95.2, pf:0.85, i380:69.5,  torque:237.9, weight:370  },
  'YE4-225M-4':  { kw:45,   speed:1485, eff:95.4, pf:0.86, i380:84.3,  torque:289.4, weight:405  },
  'YE4-250M-4':  { kw:55,   speed:1485, eff:95.7, pf:0.86, i380:101.5, torque:353.7, weight:520  },
  'YE4-280S-4':  { kw:75,   speed:1485, eff:96.0, pf:0.87, i380:136.4, torque:482.4, weight:650  },
  'YE4-280M-4':  { kw:90,   speed:1485, eff:96.1, pf:0.88, i380:161.7, torque:578.5, weight:720  },
  'YE4-315S-4':  { kw:110,  speed:1490, eff:96.3, pf:0.89, i380:195.0, torque:705.5, weight:1140 },
  'YE4-315M-4':  { kw:132,  speed:1490, eff:96.4, pf:0.89, i380:233.8, torque:846.5, weight:1150 },
  'YE4-315L1-4': { kw:160,  speed:1490, eff:96.6, pf:0.90, i380:279.6, torque:1025,  weight:1230 },
  'YE4-315L2-4': { kw:200,  speed:1490, eff:96.7, pf:0.90, i380:349.2, torque:1281,  weight:1320 },
  'YE4-355M-4':  { kw:250,  speed:1490, eff:96.7, pf:0.90, i380:436.4, torque:1601,  weight:1850 },
  'YE4-355L-4':  { kw:315,  speed:1490, eff:96.7, pf:0.90, i380:549.9, torque:2018,  weight:2160 },
  // 6 Pole
  'YE4-711-6':   { kw:0.18, speed:865,  eff:70.1, pf:0.66, i380:0.6,   torque:1.99,  weight:6.0  },
  'YE4-712-6':   { kw:0.25, speed:865,  eff:74.1, pf:0.68, i380:0.8,   torque:2.76,  weight:7.5  },
  'YE4-801-6':   { kw:0.37, speed:890,  eff:78.0, pf:0.66, i380:1.1,   torque:3.97,  weight:6.0  },
  'YE4-802-6':   { kw:0.55, speed:890,  eff:80.9, pf:0.68, i380:1.5,   torque:5.9,   weight:7.5  },
  'YE4-90S-6':   { kw:0.75, speed:950,  eff:82.7, pf:0.70, i380:2.0,   torque:7.54,  weight:35   },
  'YE4-90L-6':   { kw:1.1,  speed:950,  eff:84.5, pf:0.70, i380:2.8,   torque:11.06, weight:41   },
  'YE4-100L-6':  { kw:1.5,  speed:960,  eff:85.9, pf:0.71, i380:3.7,   torque:14.92, weight:51   },
  'YE4-112M-6':  { kw:2.2,  speed:970,  eff:87.4, pf:0.71, i380:5.4,   torque:21.65, weight:60   },
  'YE4-132S-6':  { kw:3,    speed:970,  eff:88.6, pf:0.71, i380:7.2,   torque:29.52, weight:78   },
  'YE4-132M1-6': { kw:4,    speed:970,  eff:89.5, pf:0.72, i380:9.4,   torque:39.36, weight:85   },
  'YE4-132M2-6': { kw:5.5,  speed:970,  eff:90.5, pf:0.72, i380:12.8,  torque:54.13, weight:90   },
  'YE4-160M-6':  { kw:7.5,  speed:975,  eff:91.3, pf:0.76, i380:16.4,  torque:73.46, weight:145  },
  'YE4-160L-6':  { kw:11,   speed:975,  eff:92.3, pf:0.77, i380:23.5,  torque:107.8, weight:175  },
  'YE4-180L-6':  { kw:15,   speed:985,  eff:92.9, pf:0.80, i380:30.7,  torque:145.4, weight:175  },
  'YE4-200L1-6': { kw:18.5, speed:985,  eff:93.4, pf:0.80, i380:37.6,  torque:179.4, weight:215  },
  'YE4-200L2-6': { kw:22,   speed:985,  eff:93.7, pf:0.81, i380:44.0,  torque:213.4, weight:295  },
  'YE4-225M-6':  { kw:30,   speed:985,  eff:94.2, pf:0.82, i380:59.0,  torque:290.9, weight:350  },
  'YE4-250M-6':  { kw:37,   speed:990,  eff:94.5, pf:0.83, i380:71.7,  torque:356.9, weight:470  },
  'YE4-280S-6':  { kw:45,   speed:990,  eff:94.8, pf:0.83, i380:86.9,  torque:433.9, weight:600  },
  'YE4-280M-6':  { kw:55,   speed:990,  eff:95.1, pf:0.84, i380:104.6, torque:530.3, weight:670  },
  'YE4-315S-6':  { kw:75,   speed:990,  eff:95.4, pf:0.84, i380:142.2, torque:723.0, weight:1020 },
  'YE4-315M-6':  { kw:90,   speed:990,  eff:95.6, pf:0.85, i380:168.3, torque:867.5, weight:1100 },
  'YE4-315L1-6': { kw:110,  speed:990,  eff:95.8, pf:0.85, i380:205.2, torque:1060,  weight:1260 },
  'YE4-315L2-6': { kw:132,  speed:990,  eff:96.0, pf:0.86, i380:242.9, torque:1273,  weight:1350 },
  'YE4-355M1-6': { kw:160,  speed:990,  eff:96.2, pf:0.86, i380:293.8, torque:1543,  weight:1780 },
  'YE4-355M2-6': { kw:200,  speed:990,  eff:96.3, pf:0.86, i380:366.9, torque:1929,  weight:1930 },
  'YE4-355L-6':  { kw:250,  speed:990,  eff:96.5, pf:0.86, i380:457.7, torque:2412,  weight:2200 },
};

// YVP DB (2P & 4P – from Image 7)
const YVP_DB = {
  'YVP80M1-2': { kw:0.75, speed:2400, pf:null, i380:1.9, torque:2.4,  weight:29   },
  'YVP80M2-2': { kw:1.1,  speed:2400, pf:null, i380:2.7, torque:3.5,  weight:30   },
  'YVP90S-2':  { kw:1.5,  speed:2400, pf:null, i380:3.5, torque:4.8,  weight:41.5 },
  'YVP90L-2':  { kw:2.2,  speed:2400, pf:null, i380:4.9, torque:7.0,  weight:44.3 },
  'YVP100L1-2':{ kw:3,    speed:2400, pf:null, i380:6.4, torque:9.5,  weight:51.3 },
  'YVP112M-2': { kw:4,    speed:2400, pf:null, i380:8.3, torque:12.7, weight:59   },
  'YVP132S1-2':{ kw:5.5,  speed:2400, pf:null, i380:11.2,torque:17.5, weight:95   },
  'YVP132S2-2':{ kw:7.5,  speed:2400, pf:null, i380:14.9,torque:23.9, weight:96   },
  'YVP160M1-2':{ kw:11,   speed:2400, pf:null, i380:21.4,torque:35.0, weight:131  },
  'YVP160M2-2':{ kw:15,   speed:2400, pf:null, i380:28.9,torque:47.7, weight:140  },
  'YVP160L-2': { kw:18.5, speed:2400, pf:null, i380:35.4,torque:58.9, weight:155  },
  'YVP180M-2': { kw:22,   speed:2400, pf:null, i380:41.8,torque:70.0, weight:224  },
  'YVP200L1-2':{ kw:30,   speed:2400, pf:null, i380:56.5,torque:95.5, weight:290  },
  'YVP200L2-2':{ kw:37,   speed:2400, pf:null, i380:69.3,torque:117.8,weight:300  },
  'YVP225M-2': { kw:45,   speed:2400, pf:null, i380:83.8,torque:143.2,weight:365  },
  'YVP250M-2': { kw:55,   speed:2400, pf:null, i380:101.9,torque:175.1,weight:477 },
  'YVP280S-2': { kw:75,   speed:2400, pf:null, i380:138.1,torque:238.7,weight:505 },
  'YVP280M-2': { kw:90,   speed:2400, pf:null, i380:165.2,torque:286.5,weight:545 },
  'YVP315S-2': { kw:110,  speed:2400, pf:null, i380:199.0,torque:350.1,weight:1001},
  'YVP315M-2': { kw:132,  speed:2400, pf:null, i380:238.3,torque:420.2,weight:1094},
  'YVP315L1-2':{ kw:160,  speed:2400, pf:null, i380:284.8,torque:509.3,weight:1141},
  'YVP315L2-2':{ kw:200,  speed:2400, pf:null, i380:355.2,torque:636.6,weight:1219},
  'YVP80M2-4': { kw:0.75, speed:1200, pf:null, i380:2.1,  torque:4.8,  weight:30  },
  'YVP90S-4':  { kw:1.1,  speed:1200, pf:null, i380:2.9,  torque:7.0,  weight:41.3},
  'YVP90L-4':  { kw:1.5,  speed:1200, pf:null, i380:3.8,  torque:9.5,  weight:44.4},
  'YVP100L1-4':{ kw:2.2,  speed:1200, pf:null, i380:5.2,  torque:14.0, weight:50.1},
  'YVP100L2-4':{ kw:3,    speed:1200, pf:null, i380:6.9,  torque:19.1, weight:53.8},
  'YVP112M-4': { kw:4,    speed:1200, pf:null, i380:9.0,  torque:25.5, weight:66  },
  'YVP132S-4': { kw:5.5,  speed:1200, pf:null, i380:12.0, torque:35.0, weight:94  },
  'YVP132M-4': { kw:7.5,  speed:1200, pf:null, i380:16.0, torque:47.7, weight:104 },
  'YVP160M-4': { kw:11,   speed:1200, pf:null, i380:23.0, torque:70.0, weight:138 },
  'YVP160L-4': { kw:15,   speed:1200, pf:null, i380:30.6, torque:95.5, weight:150 },
  'YVP180M-4': { kw:18.5, speed:1200, pf:null, i380:37.0, torque:117.8,weight:222 },
  'YVP180L-4': { kw:22,   speed:1200, pf:null, i380:43.7, torque:140.1,weight:233 },
  'YVP200L-4': { kw:30,   speed:1200, pf:null, i380:59.1, torque:191.0,weight:298 },
  'YVP225S-4': { kw:37,   speed:1200, pf:null, i380:71.7, torque:235.5,weight:350 },
  'YVP225M-4': { kw:45,   speed:1200, pf:null, i380:86.7, torque:286.5,weight:375 },
  'YVP250M-4': { kw:55,   speed:1200, pf:null, i380:105.5,torque:350.1,weight:494 },
  'YVP280S-4': { kw:75,   speed:1200, pf:null, i380:141.3,torque:477.5,weight:550 },
  'YVP280M-4': { kw:90,   speed:1200, pf:null, i380:167.1,torque:573.0,weight:615 },
  'YVP315S-4': { kw:110,  speed:1200, pf:null, i380:201.3,torque:700.3,weight:1018},
  'YVP315M-4': { kw:132,  speed:1200, pf:null, i380:241.0,torque:840.3,weight:1192},
  'YVP315L1-4':{ kw:160,  speed:1200, pf:null, i380:288.0,torque:1018.6,weight:1192},
  'YVP315L2-4':{ kw:200,  speed:1200, pf:null, i380:359.2,torque:1273.2,weight:1281},
};

// ─── Lookup function: หา spec จาก motorType + fullKey ──────────────────────
function getMotorSpec(motorType, fullKey) {
  if (!fullKey) return null;
  // แปลง fullKey ให้ตรงกับ DB key สำหรับ YE4 / YVP
  if (motorType === 'YE3') return YE3_DB[fullKey] || null;
  if (motorType === 'YE4') {
    // fullKey เป็น 'YE3-xxx-P' → แปลงเป็น 'YE4-xxx-P'
    const k4 = fullKey.replace(/^YE3-/, 'YE4-');
    return YE4_DB[k4] || null;
  }
  if (motorType === 'YVP') {
    // fullKey → 'YVP{frame}-{pole}'
    const parts = fullKey.split('-'); // ['YE3','frame','pole']
    const frameBody = parts.slice(1, parts.length - 1).join('');
    const pole = parts[parts.length - 1];
    const k = `YVP${frameBody}-${pole}`;
    return YVP_DB[k] || null;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

// [1] ตัด 3.7 kW ออก
const IEC_POWER_LIST = [
  '0.12','0.18','0.25','0.37','0.55','0.75',
  '1.1','1.5','2.2','3','4','5.5','7.5',
  '11','15','18.5','22','30','37','45','55','75','90','110','132','160','200',
];

const IEC_MOTOR_TYPES = [
  { code:'YE3',   label:'YE3',   sub:'Premium Efficiency IE3',         img:YE3Img   },
  { code:'YE4',   label:'YE4',   sub:'Super Premium Efficiency IE4',   img:YE4Img   },
  { code:'YEJ',   label:'YEJ',   sub:'Electromagnetic Brake Motor',    img:YEJImg   },
  { code:'YVP',   label:'YVP',   sub:'Variable Frequency Motor',       img:YVPImg   },
  { code:'YVPEJ', label:'YVPEJ', sub:'Variable Frequency Brake Motor', img:YVPEJImg },
  { code:'YB',    label:'YB',    sub:'Explosion-proof Motor',           img:YBImg    },
];

const IEC_POLE_LIST = [
  { code:'2P', label:'2 Pole', rpm:'~3000 rpm' },
  { code:'4P', label:'4 Pole', rpm:'~1500 rpm' },
  { code:'6P', label:'6 Pole', rpm:'~1000 rpm' },
  { code:'8P', label:'8 Pole', rpm:'~750 rpm'  },
];

// [2] Step 5 Mounting – เพิ่ม img
const IEC_MOUNT_LIST = [
  { code:'B5',  label:'B5',  desc:'Flange Mounting',      img:B5Img  },
  { code:'B3',  label:'B3',  desc:'Foot Mounting',        img:B3Img  },
  { code:'B14', label:'B14', desc:'Face Flange Mounting', img:B14Img },
  { code:'B35', label:'B35', desc:'Foot + Flange (B5)',   img:B35Img },
  { code:'B34', label:'B34', desc:'Foot + Flange (B14)',  img:B34Img },
];

const IEC_TERMINAL_LIST = [
  { code:'0',   label:'0°',   img:T0Img   },
  { code:'90',  label:'90°',  img:T90Img  },
  { code:'180', label:'180°', img:T180Img },
  { code:'270', label:'270°', img:T270Img },
];

const IEC_CABLE_LIST = [
  { code:'X', label:'X', img:CXImg },
  { code:'1', label:'1', img:C1Img },
  { code:'2', label:'2', img:C2Img },
  { code:'3', label:'3', img:C3Img },
];

// ─────────────────────────────────────────────────────────────────────────────
// Model Code builder
// ─────────────────────────────────────────────────────────────────────────────
function buildIECModelCode(state) {
  const { iecMotorType, iecPower, iecPole, iecMount, iecTerminal, iecCable } = state;
  if (!iecMotorType || !iecPower || !iecPole || !iecMount || !iecTerminal || !iecCable) return null;
  const fullKey = getIECFrame(iecPower, iecPole);
  if (!fullKey) return null;
  const fl  = frameLabel(fullKey);              // e.g. '112M'
  const pol = (iecPole || '').replace('P', ''); // '4'
  return `${iecMotorType}-${fl}-${pol}-${iecMount}-${iecTerminal}-${iecCable}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI helpers
// ─────────────────────────────────────────────────────────────────────────────
const Section = ({ title, children, note }) => (
  <div className="mt-4">
    <h3 className="text-white font-bold mb-2 text-base drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">{title}</h3>
    {note && <p className="text-white/70 text-xs mb-2">{note}</p>}
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const ImgCard = ({ img, label, sub, active, onClick }) => (
  <motion.button type="button" onClick={onClick} whileTap={{ scale:0.95 }}
    className={`relative flex flex-col items-center rounded-2xl overflow-hidden shadow transition cursor-pointer border-2 w-full
      ${active ? 'border-blue-500 shadow-blue-400/40' : 'border-transparent bg-white/90'}`}>
    <img src={img} alt={label} className="w-full object-contain"
      style={{ maxHeight:100, background:'#fff', padding:6 }} />
    <div className={`w-full text-center py-2 px-1 ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
      <p className="font-bold text-xs">{label}</p>
      {sub && <p className="text-[9px] opacity-70 leading-tight mt-0.5">{sub}</p>}
    </div>
    {active && <span className="absolute top-1 right-1 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-[10px]">✓</span>}
  </motion.button>
);

const FloatingBack = ({ onClick }) => (
  <div className="fixed z-[999]" style={{ left:'max(1rem,env(safe-area-inset-left))', bottom:'max(1rem,env(safe-area-inset-bottom))' }}>
    <button type="button" onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold px-5 py-3 rounded-2xl shadow-lg transition text-sm">
      ← ย้อนกลับ
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// [4] Generate PDF Data Sheet จากข้อมูลที่ผู้ใช้เลือกทุก Step
//     ใช้ jsPDF + jspdf-autotable (โหลด CDN อัตโนมัติ)
// ─────────────────────────────────────────────────────────────────────────────
async function loadJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
  if (window.jsPDF) return window.jsPDF;
  await new Promise((res, rej) => {
    if (document.getElementById('jspdf-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
  await new Promise((res, rej) => {
    if (document.getElementById('jspdf-autotable-cdn')) { res(); return; }
    const s = document.createElement('script');
    s.id = 'jspdf-autotable-cdn';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
    s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
  return window.jspdf?.jsPDF || window.jsPDF;
}

async function generateDatasheetPDF(state, selectedColor, isStarConnection) {
  const { iecMotorType, iecPower, iecPole, iecMount, iecTerminal, iecCable } = state;
  const modelCode = buildIECModelCode(state);
  const fullKey   = getIECFrame(iecPower, iecPole);
  const spec      = getMotorSpec(iecMotorType, fullKey);
  const fl        = frameLabel(fullKey);
  const poleInfo  = IEC_POLE_LIST.find(pl => pl.code === iecPole);
  const mountInfo = IEC_MOUNT_LIST.find(m  => m.code  === iecMount);
  const motorInfo = IEC_MOTOR_TYPES.find(m => m.code  === iecMotorType);
  const color     = selectedColor || MOTOR_COLORS[7]; // fallback Gentian Blue

  const dateStr = new Date().toLocaleDateString('en-GB', { year:'numeric', month:'long', day:'numeric' });

  const JsPDF = await loadJsPDF();
  if (!JsPDF) throw new Error('Cannot load jsPDF');

  const doc    = new JsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
  const W      = doc.internal.pageSize.getWidth();
  const pageH  = doc.internal.pageSize.getHeight();
  const margin = 14;
  let   y      = margin;

  const BLUE  = [30,  90,  200];
  const NAVY  = [15,  40,  100];
  const GOLD  = [180, 130,  10];
  const LGRAY = [240, 240, 245];

  // แปลง color.hex → RGB array สำหรับใช้ใน PDF
  const hexToRgb = (hex) => {
    const h = hex.replace('#','');
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  };
  const MOTOR_COLOR_RGB = hexToRgb(color.hex);

  // ── helper: tinted image via canvas ───────────────────────────────────────
  const getTintedImageB64 = async (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const [r,g,b] = MOTOR_COLOR_RGB;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imageData.data;
        for (let i = 0; i < d.length; i+=4) {
          const bright = (d[i]+d[i+1]+d[i+2])/3;
          if (bright > 238 || d[i+3] < 30) continue;
          const t = 0.68;
          d[i]   = Math.round(d[i]  *(1-t)+(d[i]  *r/255)*t);
          d[i+1] = Math.round(d[i+1]*(1-t)+(d[i+1]*g/255)*t);
          d[i+2] = Math.round(d[i+2]*(1-t)+(d[i+2]*b/255)*t);
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  // ── Header Banner ──────────────────────────────────────────────────────────
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 30, 'F');

  // Logo มุมขวาบน (กรองพื้นหลังดำออกไม่ได้ใน jsPDF → ใช้ PNG ตรงๆ)
  try {
    doc.addImage(sasLogoUrl, 'PNG', W - 44, 2, 30, 22);
  } catch(e) { /* fallback: text logo */ }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16); doc.setFont('helvetica', 'bold');
  doc.text('SAS TRANSMISSION', margin, 12);
  doc.setFontSize(9);  doc.setFont('helvetica', 'normal');
  doc.text('IEC Standard Motor  -  Technical Data Sheet', margin, 20);
  doc.setFontSize(8);
  doc.text('Date: ' + dateStr, margin, 27);
  y = 36;

  // ── Model Code Box ─────────────────────────────────────────────────────────
  doc.setFillColor(...LGRAY);
  doc.roundedRect(margin, y, W - margin * 2, 16, 3, 3, 'F');
  doc.setFillColor(...BLUE);
  doc.roundedRect(margin, y, 44, 16, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
  doc.text('MODEL CODE', margin + 2, y + 5.5);
  doc.setFontSize(10.5);
  doc.text(modelCode || '-', margin + 22, y + 12.5, { align:'center' });

  doc.setTextColor(...NAVY);
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text(motorInfo?.sub || iecMotorType, margin + 50, y + 7);
  doc.setTextColor(90, 90, 90);
  doc.setFontSize(8);
  doc.text('Frame: ' + fl + '  |  ' + (poleInfo?.label||'') + ' (' + (poleInfo?.rpm||'') + ')  |  ' + iecPower + ' kW',
           margin + 50, y + 13);
  y += 22;

  // ── helper: section header ─────────────────────────────────────────────────
  const sectionTitle = (title) => {
    doc.setFillColor(...BLUE);
    doc.rect(margin, y, W - margin * 2, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 3, y + 5);
    y += 9;
  };

  // ── Motor Selection Summary  +  Mounting Image (side by side) ──────────────
  sectionTitle('MOTOR SELECTION SUMMARY');

  const tableStartY = y;

  // Table (left side, narrower to leave room for image)
  doc.autoTable({
    startY: tableStartY,
    head: [],
    body: [
      ['Motor Type',     iecMotorType + ' - ' + (motorInfo?.sub || '-')],
      ['Frame Size',     fl],
      ['Power',          iecPower + ' kW  (' + (parseFloat(iecPower) * 1.341).toFixed(2) + ' HP)'],
      ['Pole',           (poleInfo?.label||'-') + '  (' + (poleInfo?.rpm||'-') + ')'],
      ['Mounting',       (mountInfo?.label||'-') + ' - ' + (mountInfo?.desc||'-')],
      ['Terminal Box',   iecTerminal + ' deg'],
      ['Cable Position', iecCable],
    ],
    margin: { left: margin, right: margin + 58 },  // ← เว้นขวา 58mm สำหรับรูป
    styles: { fontSize: 9, cellPadding: 2.5 },
    columnStyles: {
      0: { fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:46 },
      1: { textColor:[20,20,20] },
    },
    theme: 'plain',
  });

  // Mounting image (right side) — tinted with selected color
  const imgX     = W - margin - 52;
  const imgY     = tableStartY;
  const imgW     = 50;
  const imgH     = 50;

  const mountImgSrc = mountInfo?.img;
  if (mountImgSrc) {
    const b64url = await getTintedImageB64(mountImgSrc);
    if (b64url) {
      doc.addImage(b64url, 'PNG', imgX, imgY, imgW, imgH);
    }
    // กรอบ + color swatch
    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.4);
    doc.rect(imgX, imgY, imgW, imgH);
    if (!b64url) {
      doc.setTextColor(...NAVY);
      doc.setFontSize(14); doc.setFont('helvetica','bold');
      doc.text(mountInfo.label, imgX + imgW/2, imgY + imgH/2, { align:'center' });
    }
    // label ใต้รูป
    doc.setTextColor(...NAVY);
    doc.setFontSize(9); doc.setFont('helvetica','bold');
    doc.text(mountInfo.label, imgX + imgW/2, imgY + imgH + 5, { align:'center' });
    doc.setFontSize(7.5); doc.setFont('helvetica','normal');
    doc.setTextColor(80,80,80);
    doc.text(mountInfo.desc, imgX + imgW/2, imgY + imgH + 10, { align:'center' });
    // color swatch + name
    const swatchY = imgY + imgH + 13;
    doc.setFillColor(...MOTOR_COLOR_RGB);
    doc.circle(imgX + imgW/2, swatchY + 3, 3, 'F');
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.3);
    doc.circle(imgX + imgW/2, swatchY + 3, 3, 'S');
    doc.setTextColor(...NAVY);
    doc.setFontSize(7); doc.setFont('helvetica','normal');
    doc.text(color.name, imgX + imgW/2, swatchY + 9, { align:'center' });
    doc.setTextColor(120,120,120);
    doc.setFontSize(6);
    doc.text('RAL ' + color.code, imgX + imgW/2, swatchY + 13, { align:'center' });
  }

  y = Math.max(doc.lastAutoTable.finalY, imgY + imgH + 14) + 4;

  // ── Technical Specifications ───────────────────────────────────────────────
  sectionTitle('TECHNICAL SPECIFICATIONS');
  doc.autoTable({
    startY: y, head: [],
    body: [
      ['Standard',        'IEC 60034 / GB18613'],
      ['Power Supply',    '3 Phase 380V, 50Hz'],
      ['Protection',      'IP54 / IP55'],
      ['Insulation',      'Class F (105K), examined by Class B'],
      ['Cooling',         'TEFC  IC411 (IEC60034-6), Plastic Fan'],
      ['Winding',         '100% Copper Wire'],
      ['Duty',            'Continuous (S1)'],
      ['Vibration',       'Class A  (Class B on request)'],
      ['Site Conditions', '-15 C to +40 C, Altitude <= 1000 m'],
      ['Voltage Range',   '200-660V, 50/60Hz (+/-5% nominal)'],
      ['Quality',         'ISO 9001 Documented System'],
    ],
    margin: { left:margin, right:margin },
    styles: { fontSize:9, cellPadding:2.5 },
    columnStyles: { 0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:52 }, 1:{ textColor:[20,20,20] } },
    theme: 'plain',
  });
  y = doc.lastAutoTable.finalY + 6;

  // ── Connection Diagrams ────────────────────────────────────────────────────
  sectionTitle('CONNECTION DIAGRAMS  (Three Phase Motor)');

  // วาด diagram แบบ vector ใน jsPDF
  const drawConnectionDiagram = (startX, startY, isStar) => {
    const bw = 62; const bh = 46;
    const nc = isStar ? '#1e3a8a' : '#0d5c2e';
    const [nr, ng, nb] = isStar ? [30,58,138] : [13,92,46];
    const terminals = [[startX+8, startY+10], [startX+31, startY+10], [startX+54, startY+10]];
    const labels_top = ['W2','U2','V2'];
    const bot = [[startX+8, startY+36], [startX+31, startY+36], [startX+54, startY+36]];
    const labels_bot = ['U1','V1','W1'];

    // box bg
    doc.setFillColor(isStar ? 250 : 245, isStar ? 252 : 255, isStar ? 255 : 250);
    doc.roundedRect(startX, startY - 2, bw, bh, 2, 2, 'F');
    doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.3);
    doc.roundedRect(startX, startY - 2, bw, bh, 2, 2, 'S');

    // title
    doc.setFontSize(7.5); doc.setFont('helvetica','bold');
    doc.setTextColor(nr, ng, nb);
    doc.text(isStar ? 'Y  Star Connection' : '\u25B3  Delta Connection', startX + bw/2, startY + 4, { align:'center' });

    // top terminals
    terminals.forEach(([tx, ty], i) => {
      doc.setFillColor(255,255,255); doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.8);
      doc.ellipse(tx, ty, 4.5, 2.8, 'FD');
      doc.setFontSize(5.5); doc.setFont('helvetica','bold'); doc.setTextColor(nr, ng, nb);
      doc.text(labels_top[i], tx, ty+1.2, { align:'center' });
    });
    // connecting bar (Star only)
    if (isStar) {
      doc.setDrawColor(nr, ng, nb); doc.setLineWidth(2);
      doc.line(terminals[0][0], terminals[0][1], terminals[2][0], terminals[2][1]);
    }
    // vertical lines
    terminals.forEach(([tx, ty], i) => {
      doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.8);
      doc.line(tx, ty + 2.8, bot[i][0], bot[i][1] - 2.8);
    });
    // bottom terminals
    bot.forEach(([tx, ty], i) => {
      doc.setFillColor(255,255,255); doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.8);
      doc.ellipse(tx, ty, 4.5, 2.8, 'FD');
      doc.setFontSize(5.5); doc.setFont('helvetica','bold'); doc.setTextColor(nr, ng, nb);
      doc.text(labels_bot[i], tx, ty+1.2, { align:'center' });
    });
    // sub-label
    doc.setFontSize(6); doc.setFont('helvetica','normal');
    doc.setTextColor(100,100,100);
    doc.text(isStar ? '<= 3 kW' : '>= 4 kW', startX + bw/2, startY + bh - 6, { align:'center' });

    // "SELECTED" badge
    if ((isStar && isStarConnection) || (!isStar && !isStarConnection)) {
      doc.setFillColor(255, 200, 0);
      doc.roundedRect(startX + bw - 18, startY - 2, 18, 7, 1.5, 1.5, 'F');
      doc.setFontSize(5.5); doc.setFont('helvetica','bold'); doc.setTextColor(80, 50, 0);
      doc.text('SELECTED', startX + bw - 9, startY + 3, { align:'center' });
    }
  };

  const diagW = (W - margin*2 - 6) / 2;
  drawConnectionDiagram(margin,           y, true);
  drawConnectionDiagram(margin + diagW + 6, y, false);
  y += 48;

  // ── Rated Performance Data ─────────────────────────────────────────────────
  if (spec) {
    sectionTitle('RATED PERFORMANCE DATA');
    const perfRows = [['Rated Speed', spec.speed + ' rpm']];
    if (spec.eff)    perfRows.push(['Efficiency (100%)',    spec.eff  + ' %']);
    if (spec.pf)     perfRows.push(['Power Factor (cos p)', String(spec.pf)]);
    if (spec.i380)   perfRows.push(['Rated Current 380V',   spec.i380 + ' A']);
    if (spec.i400)   perfRows.push(['Rated Current 400V',   spec.i400 + ' A']);
    if (spec.i415)   perfRows.push(['Rated Current 415V',   spec.i415 + ' A']);
    perfRows.push(['Rated Torque', spec.torque + ' N.m']);
    if (spec.weight) perfRows.push(['Weight',               spec.weight + ' kg']);

    doc.autoTable({
      startY: y, head:[['Parameter','Value']],
      body: perfRows,
      margin: { left:margin, right:margin },
      styles: { fontSize:9, cellPadding:2.5 },
      headStyles: { fillColor:BLUE, textColor:255, fontStyle:'bold', fontSize:8.5 },
      columnStyles: { 0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:52 }, 1:{ textColor:[20,20,20], fontStyle:'bold' } },
      theme: 'striped',
      alternateRowStyles: { fillColor:[250,250,255] },
    });
    y = doc.lastAutoTable.finalY + 6;
  }

  // ── Warranty Bar ───────────────────────────────────────────────────────────
  doc.setFillColor(255, 245, 205);
  doc.roundedRect(margin, y, W - margin * 2, 10, 2, 2, 'F');
  doc.setTextColor(...GOLD);
  doc.setFontSize(10); doc.setFont('helvetica','bold');
  doc.text('*  Warranty: 24 Months  *', W / 2, y + 7, { align:'center' });

  // ── Footer ─────────────────────────────────────────────────────────────────
  doc.setFillColor(...NAVY);
  doc.rect(0, pageH - 12, W, 12, 'F');
  doc.setTextColor(180, 200, 255);
  doc.setFontSize(7.5); doc.setFont('helvetica','normal');
  doc.text('Synergy Asia Solution Co., Ltd.  |  www.synergy-as.com  |  ฝ่ายขาย: 080-7780778 ', W / 2, pageH - 4.5, { align:'center' });

  doc.save(modelCode + '.pdf');
}

// ─────────────────────────────────────────────────────────────────────────────
// Main exported render function
// ─────────────────────────────────────────────────────────────────────────────
export function renderIECMotorFlow(state, setState, onConfirm, onHome) {
  const { iecMotorType, iecPower, iecPole, iecMount, iecTerminal, iecCable } = state;

  const update = (key, value) => {
    const fn = setState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`];
    if (typeof fn === 'function') fn(value);
  };

  const modelCode = buildIECModelCode(state);
  const isComplete = !!modelCode;

  // ─── Step 8: Summary ───────────────────────────────────────────────────────
  if (isComplete) {
    const fullKey  = getIECFrame(iecPower, iecPole);
    const spec     = getMotorSpec(iecMotorType, fullKey);
    const poleNum  = parseInt((iecPole || '').replace('P', ''), 10);
    const pwrNum   = parseFloat(iecPower);
    const isStarConnection = pwrNum <= 3;   // ≤3kW → Star, ≥4kW → Delta

    // selectedColor state — ใช้ React.useState ผ่าน wrapper component
    return <SummaryView
      state={state} update={update} onConfirm={onConfirm}
      modelCode={modelCode} fullKey={fullKey} spec={spec}
      poleNum={poleNum} isStarConnection={isStarConnection}
    />;
  }

  // ─── Step 7: Cable wire position ──────────────────────────────────────────
  if (iecTerminal && !iecCable) {
    return (
      <div className="mt-4 pb-20">
        <Section title="Step 7 : เลือกตำแหน่งรูสายไฟ (Cable wire position)">
          <div className="grid grid-cols-2 gap-3 w-full">
            {IEC_CABLE_LIST.map(({ code, label, img }) => (
              <button key={code} type="button" onClick={() => update('iecCable', code)}
                className="rounded-2xl shadow overflow-hidden bg-white active:scale-95 transition border-2 border-transparent hover:border-blue-400">
                <img src={img} alt={`C${code}`} className="w-full object-contain" style={{ maxHeight:100 }} />
                <p className="text-center py-2 font-bold text-gray-800 text-sm">{label}</p>
              </button>
            ))}
          </div>
        </Section>
        <FloatingBack onClick={() => update('iecTerminal', null)} />
      </div>
    );
  }

  // ─── Step 6: Terminal Box ──────────────────────────────────────────────────
  if (iecMount && !iecTerminal) {
    return (
      <div className="mt-4 pb-20">
        <Section title="Step 6 : เลือกตำแหน่งกล่องสายไฟ (Terminal Box)">
          <div className="grid grid-cols-2 gap-3 w-full">
            {IEC_TERMINAL_LIST.map(({ code, label, img }) => (
              <button key={code} type="button" onClick={() => update('iecTerminal', code)}
                className="rounded-2xl shadow overflow-hidden bg-white active:scale-95 transition border-2 border-transparent hover:border-blue-400">
                <img src={img} alt={`T${code}`} className="w-full object-contain" style={{ maxHeight:100 }} />
                <p className="text-center py-2 font-bold text-gray-800 text-sm">{label}</p>
              </button>
            ))}
          </div>
        </Section>
        <FloatingBack onClick={() => update('iecMount', null)} />
      </div>
    );
  }

  // ─── Step 5: Mounting — [2] hover แสดงรูป, คลิกไป Step ต่อ ───────────────
  if (iecPole && !iecMount) {
    return <MountStep iecMount={iecMount} update={update} />;
  }

  // ─── Step 4: Pole Motor ────────────────────────────────────────────────────
  if (iecPower && !iecPole) {
    return (
      <div className="mt-4 pb-20">
        <Section title="Step 4 : เลือก Pole Motor">
          <div className="grid grid-cols-2 gap-3 w-full">
            {IEC_POLE_LIST.map(({ code, label, rpm }) => (
              <button key={code} type="button" onClick={() => update('iecPole', code)}
                className={`flex flex-col items-center justify-center px-4 py-5 rounded-2xl shadow font-bold transition active:scale-95
                  ${iecPole===code ? 'bg-blue-600 text-white shadow-blue-400/40' : 'bg-white/90 text-gray-800'}`}>
                <span className="text-xl font-black">{label}</span>
                <span className="text-xs font-normal opacity-70 mt-0.5">{rpm}</span>
              </button>
            ))}
          </div>
        </Section>
        <FloatingBack onClick={() => update('iecPower', null)} />
      </div>
    );
  }

  // ─── Step 3: Power (kW) ────────────────────────────────────────────────────
  if (iecMotorType && !iecPower) {
    return (
      <div className="mt-4 pb-20">
        <Section title="Step 3 : เลือกกำลังของมอเตอร์ (kW)">
          <div className="grid grid-cols-4 gap-2 w-full">
            {IEC_POWER_LIST.map((p) => (
              <button key={p} type="button" onClick={() => update('iecPower', p)}
                className={`py-3 rounded-xl shadow font-bold text-sm transition active:scale-95
                  ${iecPower===p ? 'bg-blue-600 text-white scale-105 shadow-blue-400/40' : 'bg-white/90 text-gray-800 hover:bg-white'}`}>
                {p}
                <span className="block text-[10px] font-normal opacity-60">kW</span>
              </button>
            ))}
          </div>
        </Section>
        <FloatingBack onClick={() => update('iecMotorType', null)} />
      </div>
    );
  }

  // ─── Step 2: Motor Type ────────────────────────────────────────────────────
  return (
    <div className="mt-4 pb-20">
      <h3 className="text-white font-bold text-base mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        Step 2 : เลือกประเภทของมอเตอร์
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {IEC_MOTOR_TYPES.map(({ code, label, sub, img }) => (
          <ImgCard key={code} img={img} label={label} sub={sub}
            active={iecMotorType === code}
            onClick={() => {
              update('iecMotorType', code);
              update('iecPower',    null);
              update('iecPole',     null);
              update('iecMount',    null);
              update('iecTerminal', null);
              update('iecCable',    null);
            }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// [2] MountStep component — hover preview + click to proceed
// ─────────────────────────────────────────────────────────────────────────────
function MountStep({ iecMount, update }) {
  const [hovered, setHovered] = useState(null);
  const preview = IEC_MOUNT_LIST.find(m => m.code === hovered);

  return (
    <div className="mt-4 pb-20">
      <h3 className="text-white font-bold mb-2 text-base drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
        Step 5 : เลือกรูปแบบการติดตั้ง
      </h3>

      {/* Preview image area — compact for mobile */}
      <div className="mb-3 flex justify-center" style={{ minHeight: 130 }}>
        {preview ? (
          <motion.div
            key={preview.code}
            initial={{ opacity:0, scale:0.88 }}
            animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.18 }}
            className="bg-white rounded-2xl shadow-xl px-4 py-3 flex flex-col items-center"
            style={{ maxWidth: 200 }}
          >
            <img src={preview.img} alt={preview.label} className="object-contain" style={{ maxHeight:100, maxWidth:180 }} />
            <p className="mt-1 font-bold text-gray-800 text-sm">{preview.label}</p>
            <p className="text-gray-500 text-xs">{preview.desc}</p>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center text-white/40 text-xs italic" style={{ minHeight:100 }}>
            แตะปุ่มเพื่อดูตัวอย่าง
          </div>
        )}
      </div>

      {/* Buttons — 3 columns on mobile */}
      <div className="grid grid-cols-3 gap-2">
        {IEC_MOUNT_LIST.map(({ code, label, desc }) => (
          <button
            key={code}
            type="button"
            onMouseEnter={() => setHovered(code)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(code)}
            onClick={() => update('iecMount', code)}
            className={`flex flex-col items-center justify-center gap-0.5 px-2 py-4 rounded-2xl shadow font-bold transition active:scale-95
              ${iecMount === code ? 'bg-blue-600 text-white' : 'bg-white/90 text-gray-800'}`}
          >
            <span className="text-2xl font-black tracking-tight">{label}</span>
            <span className="text-[10px] font-normal opacity-70 text-center leading-tight">{desc}</span>
          </button>
        ))}
      </div>
      <FloatingBack onClick={() => update('iecPole', null)} />
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// COLOR PALETTE — เฉดสีมอเตอร์ (ชื่อตาม RAL / SAS palette ในรูป)
// ─────────────────────────────────────────────────────────────────────────────
const MOTOR_COLORS = [
  { code:'2008',  name:'Deep Orange',      hex:'#D9381E' },
  { code:'3000',  name:'Flame Red',        hex:'#AB2524' },
  { code:'3020',  name:'Traffic Red',      hex:'#CC0605' },
  { code:'5340',  name:'Vermilion',        hex:'#E84B20' },
  { code:'2012',  name:'Salmon Orange',    hex:'#E55137' },
  { code:'5014',  name:'Pigeon Blue',      hex:'#637D96' },
  { code:'4187',  name:'Signal Violet',    hex:'#2A3756' },
  { code:'5010',  name:'Gentian Blue',     hex:'#0E4C96' },
  { code:'5005',  name:'Signal Blue',      hex:'#1C4F9C' },
  { code:'0490',  name:'Sky Blue',         hex:'#2674A8' },
  { code:'5018',  name:'Turquoise Blue',   hex:'#1F7A6C' },
  { code:'6034',  name:'Pastel Turquoise', hex:'#2E8B72' },
  { code:'6032',  name:'Signal Green',     hex:'#287233' },
  { code:'5012',  name:'Light Blue',       hex:'#3C6B8A' },
  { code:'7000',  name:'Squirrel Grey',    hex:'#7E8B93' },
  { code:'1036',  name:'Pearl Gold',       hex:'#7B5E29' },
  { code:'5000',  name:'Violet Blue',      hex:'#2D2457' },
  { code:'5001',  name:'Green Blue',       hex:'#1F3A52' },
  { code:'5008',  name:'Grey Blue',        hex:'#2A3545' },
  { code:'5007',  name:'Brilliant Blue',   hex:'#3A5170' },
  { code:'9005',  name:'Jet Black',        hex:'#0A0A0A' },
  { code:'6016',  name:'Turquoise Green',  hex:'#1A5C3A' },
  { code:'5013',  name:'Cobalt Blue',      hex:'#243458' },
  { code:'5009',  name:'Azure Blue',       hex:'#2B4D77' },
  { code:'4161',  name:'Teal Blue',        hex:'#1B6378' },
  { code:'5019',  name:'Capri Blue',       hex:'#1D4568' },
  { code:'7001',  name:'Silver Grey',      hex:'#8C9E9A' },
  { code:'7004',  name:'Signal Grey',      hex:'#9E9B8B' },
  { code:'7040',  name:'Window Grey',      hex:'#9B9A8A' },
  { code:'9005b', name:'Black Matt',       hex:'#111111' },
  { code:'7032',  name:'Pebble Grey',      hex:'#B5AA88' },
  { code:'7030',  name:'Stone Grey',       hex:'#BDB49A' },
  { code:'7023',  name:'Concrete Grey',    hex:'#7D7B6A' },
  { code:'7045',  name:'Telegrey 1',       hex:'#8F9191' },
  { code:'9006',  name:'White Aluminium',  hex:'#A5A5A5' },
];

// ─────────────────────────────────────────────────────────────────────────────
// MountingColorViewer — แสดงรูป Mounting พร้อม Color Tint Picker
// ─────────────────────────────────────────────────────────────────────────────
function MountingColorViewer({ mountInfo, onColorChange }) {
  const [colorIdx, setColorIdx] = React.useState(7); // default: 5010 Gentian Blue
  const canvasRef = React.useRef(null);
  const imgRef    = React.useRef(null);
  const color = MOTOR_COLORS[colorIdx];

  const drawTinted = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const W = canvas.width  = img.naturalWidth;
    const H = canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, W, H);
    const hex = color.hex.replace('#','');
    const r = parseInt(hex.slice(0,2),16);
    const g = parseInt(hex.slice(2,4),16);
    const b = parseInt(hex.slice(4,6),16);
    const imageData = ctx.getImageData(0, 0, W, H);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const bright = (d[i] + d[i+1] + d[i+2]) / 3;
      if (bright > 238 || d[i+3] < 30) continue; // ข้ามพื้นหลังขาว + โปร่งใส
      const t = 0.68;
      d[i]   = Math.round(d[i]   * (1-t) + (d[i]   * r / 255) * t);
      d[i+1] = Math.round(d[i+1] * (1-t) + (d[i+1] * g / 255) * t);
      d[i+2] = Math.round(d[i+2] * (1-t) + (d[i+2] * b / 255) * t);
    }
    ctx.putImageData(imageData, 0, 0);
  }, [colorIdx, color]);

  React.useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) { drawTinted(); return; }
    img.onload = drawTinted;
  }, [drawTinted, mountInfo]);

  if (!mountInfo) return null;

  const prev = () => setColorIdx(i => { const n=(i-1+MOTOR_COLORS.length)%MOTOR_COLORS.length; onColorChange?.(MOTOR_COLORS[n]); return n; });
  const next = () => setColorIdx(i => { const n=(i+1)%MOTOR_COLORS.length; onColorChange?.(MOTOR_COLORS[n]); return n; });

  return (
    <div className="flex flex-col items-center" style={{ minWidth:190, maxWidth:240 }}>
      {/* Mounting label บนสุด */}
      <div className="mb-1 text-white/70 text-xs font-semibold uppercase tracking-wider self-start">
        Mounting
      </div>
      {/* รูป tinted — ขนาดใหญ่ขึ้น */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-blur w-full flex items-center justify-center"
           style={{ aspectRatio:'5/5' }}>
        <img ref={imgRef} src={mountInfo.img} alt={mountInfo.label} crossOrigin="anonymous"
             style={{ display:'none' }} onLoad={drawTinted} />
        <canvas ref={canvasRef} style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }} />
      </div>
      {/* ชื่อ mounting ใต้รูป */}
      <p className="mt-2 text-white font-bold text-base">{mountInfo.label}</p>
      <p className="text-white/50 text-xs mb-2">{mountInfo.desc}</p>

      {/* Color picker row: ‹ [swatch + name] › */}
      <div className="flex items-center gap-2 w-full bg-white/5 rounded-xl px-2 py-2">
        <button type="button" onClick={prev}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white font-bold text-xl flex items-center justify-center transition shadow active:scale-95">
          ‹
        </button>
        <div className="flex-1 flex flex-col items-center gap-0.5">
          <div className="w-8 h-8 rounded-full border-2 border-white/80 shadow-lg transition-all duration-300"
               style={{ backgroundColor: color.hex }} />
          <span className="text-white font-semibold text-xs text-center leading-tight">{color.name}</span>
          <span className="text-white/40 text-[9px]">RAL {color.code}</span>
        </div>
        <button type="button" onClick={next}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white font-bold text-xl flex items-center justify-center transition shadow active:scale-95">
          ›
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ConnectionDiagram — SVG diagram Star/Delta
// ─────────────────────────────────────────────────────────────────────────────
function ConnectionDiagram({ isStar }) {
  const c = '#1e3a8a'; // stroke color
  const txt = { fill: c, fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' };
  const lbl = { fill: '#374151', fontSize: 9, fontFamily: 'sans-serif' };

  if (isStar) {
    // Star: W2-U2-V2 connected by bar on top, U1 V1 W1 separate on bottom
    return (
      <svg viewBox="0 0 160 110" width="100%" style={{ maxWidth:220 }}>
        {/* title */}
        <text x="80" y="12" textAnchor="middle" style={{ fill:'#1e3a8a', fontSize:11, fontWeight:'bold', fontFamily:'sans-serif' }}>Y – Star Connection</text>
        {/* top terminals W2 U2 V2 */}
        {[['W₂',22,30],['U₂',72,30],['V₂',122,30]].map(([n,x,y])=>(
          <g key={n}>
            <ellipse cx={x} cy={y} rx={10} ry={6} fill="white" stroke={c} strokeWidth={1.5}/>
            <text x={x} y={y+3.5} textAnchor="middle" style={txt}>{n}</text>
          </g>
        ))}
        {/* connecting bar */}
        <line x1={22} y1={30} x2={122} y2={30} stroke={c} strokeWidth={2.5}/>
        {/* bottom terminals U1 V1 W1 */}
        {[['U₁',22,80],['V₁',72,80],['W₁',122,80]].map(([n,x,y])=>(
          <g key={n}>
            <ellipse cx={x} cy={y} rx={10} ry={6} fill="white" stroke={c} strokeWidth={1.5}/>
            <text x={x} y={y+3.5} textAnchor="middle" style={txt}>{n}</text>
          </g>
        ))}
        {/* vertical lines top→bottom */}
        {[[22,36,74],[72,36,74],[122,36,74]].map(([x,y1,y2],i)=>
          <line key={i} x1={x} y1={y1} x2={x} y2={y2} stroke={c} strokeWidth={1.5}/>
        )}
        <text x="80" y="100" textAnchor="middle" style={{...lbl, fill:'#6b7280'}}>≤ 3 kW</text>
      </svg>
    );
  } else {
    // Delta: W2-U2 / U2-V2 / V2-W2 links top, U1 V1 W1 separate
    return (
      <svg viewBox="0 0 160 110" width="100%" style={{ maxWidth:220 }}>
        <text x="80" y="12" textAnchor="middle" style={{ fill:'#1e3a8a', fontSize:11, fontWeight:'bold', fontFamily:'sans-serif' }}>△ – Delta Connection</text>
        {/* top terminals W2 U2 V2 — no connecting bar */}
        {[['W₂',22,30],['U₂',72,30],['V₂',122,30]].map(([n,x,y])=>(
          <g key={n}>
            <ellipse cx={x} cy={y} rx={10} ry={6} fill="white" stroke={c} strokeWidth={1.5}/>
            <text x={x} y={y+3.5} textAnchor="middle" style={txt}>{n}</text>
          </g>
        ))}
        {/* bottom terminals U1 V1 W1 */}
        {[['U₁',22,80],['V₁',72,80],['W₁',122,80]].map(([n,x,y])=>(
          <g key={n}>
            <ellipse cx={x} cy={y} rx={10} ry={6} fill="white" stroke={c} strokeWidth={1.5}/>
            <text x={x} y={y+3.5} textAnchor="middle" style={txt}>{n}</text>
          </g>
        ))}
        {/* vertical lines, no cross-bar */}
        {[[22,36,74],[72,36,74],[122,36,74]].map(([x,y1,y2],i)=>
          <line key={i} x1={x} y1={y1} x2={x} y2={y2} stroke={c} strokeWidth={1.5}/>
        )}
        <text x="80" y="100" textAnchor="middle" style={{...lbl, fill:'#6b7280'}}>≥ 4 kW</text>
      </svg>
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SummaryView — Summary Card with state hooks (needs its own component for useState)
// ─────────────────────────────────────────────────────────────────────────────
function SummaryView({ state, update, onConfirm, modelCode, fullKey, spec, poleNum, isStarConnection }) {
  const { iecMotorType, iecPower, iecPole, iecMount, iecTerminal, iecCable } = state;
  const [selectedColor, setSelectedColor] = React.useState(MOTOR_COLORS[7]); // default Gentian Blue

  const mountInfo = IEC_MOUNT_LIST.find(m => m.code === iecMount);
  const poleInfo  = IEC_POLE_LIST.find(pl => pl.code === iecPole);
  const motorInfo = IEC_MOTOR_TYPES.find(m => m.code === iecMotorType);

  return (
    <div className="mt-4 pb-28">
      {/* ── Summary Card ──────────────────────────────────────────────────── */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
        <p className="text-blue-300 text-xs font-semibold mb-1 uppercase tracking-wider">IEC Standard Motor</p>

        {/* Model Code + Copy */}
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <span className="text-white font-bold text-sm">Model:</span>
          <span className="text-yellow-400 font-extrabold text-xl tracking-wide leading-tight break-all">{modelCode}</span>
          <button type="button" title="Copy"
            className="text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 hover:bg-white/20 text-white transition flex-shrink-0"
            onClick={async (e) => {
              const btn = e.currentTarget; const old = btn.textContent;
              const fb = () => { const ta=document.createElement('textarea');ta.value=modelCode;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta); };
              try { navigator.clipboard && window.isSecureContext ? await navigator.clipboard.writeText(modelCode) : fb(); } catch { fb(); }
              btn.textContent='✓'; setTimeout(()=>{btn.textContent=old;},1400);
            }}>Copy</button>
        </div>

        {/* Top row: Basic info ซ้าย + Mounting viewer ขวา */}
        <div className="flex flex-row gap-3 items-start">
          {/* ── info list ── */}
          <div className="flex-1 min-w-0">
            {[
              ['Motor Type', motorInfo?.sub || iecMotorType],
              ['Power',      iecPower + ' kW (' + (parseFloat(iecPower)*1.341).toFixed(2) + ' HP)'],
              ['Mounting',   (mountInfo?.label||'-') + ' – ' + (mountInfo?.desc||'-')],
              ['Cable Pos.', iecCable],
              ['Frame',      frameLabel(fullKey)],
              ['Pole',       (poleInfo?.label||'-') + ' (' + (poleInfo?.rpm||'-') + ')'],
              ['Terminal',   iecTerminal + '°'],
            ].map(([lbl, val]) => (
              <div key={lbl} className="flex text-xs mb-0.5">
                <span className="text-white/60 w-20 flex-shrink-0 font-medium">{lbl}:</span>
                <span className="text-blue-300 font-semibold">{val}</span>
              </div>
            ))}
          </div>

          {/* ── Mounting Color Viewer ── */}
          <div className="flex-shrink-0" style={{ width: 'min(42vw, 180px)' }}>
            <MountingColorViewer mountInfo={mountInfo} onColorChange={setSelectedColor} />
          </div>
        </div>

        {/* ── Connection Diagrams ──────────────────────────────────────────── */}
        <div className="border-t border-white/20 mt-3 pt-3">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
            Connection Diagrams
          </p>
          <div className={`flex gap-3 items-start ${isStarConnection ? '' : ''}`}>
            {/* Active connection — highlighted */}
            <div className={`flex-1 rounded-xl p-2 border-2 ${isStarConnection ? 'border-yellow-400 bg-yellow-400/10' : 'border-blue-400 bg-blue-400/10'}`}>
              <ConnectionDiagram isStar={isStarConnection} />
              <p className={`text-center text-xs font-bold mt-1 ${isStarConnection ? 'text-yellow-400' : 'text-blue-400'}`}>
                {isStarConnection ? '★ Star (Y) — ใช้กับมอเตอร์นี้' : '▲ Delta (Δ) — ใช้กับมอเตอร์นี้'}
              </p>
            </div>
            {/* Reference other — dimmed */}
            <div className="flex-1 rounded-xl p-2 border border-white/10 bg-white/5 opacity-40">
              <ConnectionDiagram isStar={!isStarConnection} />
              <p className="text-center text-xs text-white/50 mt-1">
                {!isStarConnection ? 'Star (Y) — ≤ 3 kW' : 'Delta (Δ) — ≥ 4 kW'}
              </p>
            </div>
          </div>
        </div>

        {/* ── Technical Specifications ──────────────────────────────────────── */}
        <div className="border-t border-white/20 pt-3 mt-3">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">Technical Specifications</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 text-xs text-white/90">
            {[
              ['Standard',       'IEC 60034 / GB18613, 3Ph 380V 50Hz, IP55, Class F, S1'],
              ['Insulation',     'Class F (105K), by Class B'],
              ['Cooling',        'TEFC (IC411, IEC60034-6)'],
              ['Winding',        '100% Copper Wire'],
              ['Duty',           'Continuous (S1)'],
              ['Vibration',      'Class A (Class B on request)'],
              ['Site',           '-15°C to +40°C, Alt ≤ 1000 m'],
              ['Voltage',        '200–660V, 50/60Hz (±5%)'],
              ...(spec ? [
                ['Rated Speed',  spec.speed + ' rpm'],
                ['Efficiency',   spec.eff + ' %'],
                ...(spec.pf  ? [['Power Factor', String(spec.pf)]] : []),
                ...(spec.i380? [['Current 380V', spec.i380 + ' A']] : []),
                ...(spec.i400? [['Current 400V', spec.i400 + ' A']] : []),
                ...(spec.i415? [['Current 415V', spec.i415 + ' A']] : []),
                ['Rated Torque', spec.torque + ' N·m'],
                ...(spec.weight? [['Weight',      spec.weight + ' kg']] : []),
              ] : []),
              ['Protection',     'IP54 / IP55'],
              ['Quality',        'ISO 9001'],
            ].map(([lbl, val]) => (
              <div key={lbl} className="flex gap-1">
                <span className="font-semibold text-white/60 w-24 flex-shrink-0">{lbl}:</span>
                <span className="text-blue-300">{val}</span>
              </div>
            ))}
            <div className="flex gap-1 col-span-full">
              <span className="font-semibold text-yellow-400 w-24 flex-shrink-0">Warranty:</span>
              <span className="text-yellow-400 font-extrabold text-base">18 เดือน</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ปุ่ม 4 ปุ่ม ──────────────────────────────────────────────────────── */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <DataSheetButton state={state} selectedColor={selectedColor} isStarConnection={isStarConnection} />
        <button type="button"
          onClick={() => alert(`Drawing 2D for ${modelCode}\n(Coming soon)`)}
          className="flex flex-col items-center justify-center gap-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-4 rounded-xl shadow transition active:scale-95">
          <span className="text-2xl">📐</span>
          <span className="font-semibold text-sm">Drawing 2D</span>
        </button>
        <button type="button" onClick={() => { if (typeof onConfirm==='function') onConfirm(modelCode,'quote'); }}
          className="flex flex-col items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-4 rounded-xl shadow transition active:scale-95">
          <span className="text-2xl">🧾</span>
          <span className="font-semibold text-sm">ขอใบเสนอราคา</span>
        </button>
        <button type="button" onClick={() => { if (typeof onConfirm==='function') onConfirm(modelCode,'3d'); }}
          className="flex flex-col items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-4 rounded-xl shadow transition active:scale-95">
          <span className="text-2xl">📦</span>
          <span className="font-semibold text-sm">3D Step file</span>
        </button>
      </div>

      <FloatingBack onClick={() => update('iecCable', null)} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DataSheetButton — async PDF generator, needs own state for loading indicator
// ─────────────────────────────────────────────────────────────────────────────
function DataSheetButton({ state, selectedColor, isStarConnection }) {
  const [status, setStatus] = React.useState('idle'); // idle | loading | done | error

  const handleClick = async () => {
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await generateDatasheetPDF(state, selectedColor, isStarConnection);
      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('PDF generation error:', err);
      setStatus('error');
      alert('ไม่สามารถสร้าง PDF ได้:\n' + err.message);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const icon  = { idle:'📄', loading:'⏳', done:'✅', error:'⚠️' }[status];
  const label = { idle:'Data Sheet', loading:'กำลังสร้าง...', done:'ดาวน์โหลดแล้ว ✓', error:'ลองใหม่' }[status];
  const cls   = {
    idle:    'bg-indigo-600 hover:bg-indigo-700',
    loading: 'bg-indigo-400 cursor-not-allowed',
    done:    'bg-indigo-400',
    error:   'bg-red-600 hover:bg-red-700',
  }[status];

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === 'loading'}
      className={`flex flex-col items-center justify-center gap-1 ${cls} text-white px-3 py-4 rounded-xl shadow transition`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export { buildIECModelCode, IEC_MOTOR_TYPES, IEC_POWER_LIST, IEC_POLE_LIST, IEC_MOUNT_LIST };
