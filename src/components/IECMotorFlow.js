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
    if (p <= 0.75) return 'YE3-80M1-2';
    if (p <= 1.1)  return 'YE3-80M2-2';
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
    if (p <= 0.18) return 'YE3-71M10-4';
    if (p <= 0.25) return 'YE3-71M11-4';
    if (p <= 0.37) return 'YE3-71M22-4';
    if (p <= 0.55) return 'YE3-80M1-4-4';
    if (p <= 0.75) return 'YE3-80M2-4';
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
    if (p <= 0.55) return 'YE3-80M2-6';
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
  'YE3-80M1-2':   { kw:0.75, hp:1,    speed:2880, eff:80.7, pf:0.82, i380:1.7,   i400:1.6,   i415:1.6,   torque:2.49,  weight:18.1 },
  'YE3-80M2-2':   { kw:1.1,  hp:1.5,  speed:2880, eff:82.7, pf:0.83, i380:2.4,   i400:2.3,   i415:2.2,   torque:3.65,  weight:19.5 },
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
  'YE3-71M10-4':   { kw:0.18, hp:0.24, speed:1330, eff:69.9, pf:0.73, i380:0.5,   i400:0.51,  i415:0.49,  torque:1.29,  weight:4.5  },
  'YE3-71M11-4':   { kw:0.25, hp:0.34, speed:1350, eff:73.5, pf:0.74, i380:0.7,   i400:0.66,  i415:0.64,  torque:1.77,  weight:6.5  },
  'YE3-71M22-4':   { kw:0.37, hp:0.5,  speed:1350, eff:77.3, pf:0.75, i380:1.0,   i400:0.92,  i415:0.89,  torque:2.62,  weight:7.5  },
  'YE3-80M1-4':   { kw:0.55, hp:0.75, speed:1400, eff:80.8, pf:0.75, i380:1.4,   i400:1.3,   i415:1.3,   torque:3.75,  weight:17.6 },
  'YE3-80M2-4':   { kw:0.75, hp:1,    speed:1420, eff:82.5, pf:0.75, i380:1.8,   i400:1.7,   i415:1.7,   torque:5.04,  weight:18.4 },
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
  'YE3-80M2-6':   { kw:0.55, hp:0.75, speed:890,  eff:73.6, pf:0.72, i380:1.6,   i400:1.5,   i415:1.4,   torque:5.9,   weight:16.6 },
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
  { code:'YPEJ', label:'YPEJ', sub:'Variable Frequency Brake Motor', img:YVPEJImg },
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
      style={{ maxHeight:400, background:'#fff', padding:6 }} />
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
      ['Motor Type',           iecMotorType + ' - ' + (motorInfo?.sub || '-')],
      ['Frame Size',           fl],
      ['Power',                iecPower + ' kW  (' + (parseFloat(iecPower) * 1.341).toFixed(2) + ' HP)'],
      ['Pole',                 (poleInfo?.label||'-') + '  (' + (poleInfo?.rpm||'-') + ')'],
      ['Mounting',             (mountInfo?.label||'-') + ' - ' + (mountInfo?.desc||'-')],
      ['Terminal Box',         iecTerminal + ' deg'],
      ['Cable Position',       iecCable],
      ['Direction of Rotation','CW / CCW'],
      ['Casing Material',      'Iron'],
    ],
    margin: { left: margin, right: margin + 58 },
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

  // ── Technical Specifications (ซ้าย) + Connection Diagram (ขวา) side-by-side ─
  const techSpecsStartY = y;
  const techColW = (W - margin*2) * 0.55;   // 55% ซ้าย
  const diagColX = margin + techColW + 4;    // เริ่ม column ขวา
  const diagColW = (W - margin*2) * 0.45 - 4; // 45% ขวา

  // Section header ข้าม full width
  sectionTitle('TECHNICAL SPECIFICATIONS');
  const techBodyY = y;

  doc.autoTable({
    startY: techBodyY, head: [],
    body: [
      ['Standard',        'IEC 60034 / GB18613'],
      ['Power Supply',    '3 Phase 380V, 50Hz'],
      ['Protection',      'IP55'],
      ['Insulation',      'Class F (105K), examined by Class B'],
      ['Cooling',         'TEFC  IC411 (IEC60034-6), Plastic Fan'],
      ['Winding',         '100% Copper Wire'],
      ['Duty',            'Continuous (S1)'],
      ['Vibration',       'Class A  (Class B on request)'],
      ['Site Conditions', '-15 C to +40 C, Altitude <= 1000 m'],
      ['Voltage Range',   '200-660V, 50/60Hz (+/-5% nominal)'],
      ['Quality',         'ISO 9001 Documented System'],
    ],
    margin: { left:margin, right: margin + diagColW + 6 },
    styles: { fontSize:8.5, cellPadding:2.2 },
    columnStyles: { 0:{ fontStyle:'bold', fillColor:LGRAY, textColor:NAVY, cellWidth:38 }, 1:{ textColor:[20,20,20] } },
    theme: 'plain',
  });
  const techFinalY = doc.lastAutoTable.finalY;

  // วาด Connection Diagram ในกรอบขวา
  const drawConnectionDiagram = (startX, startY, isStar) => {
    const bw = diagColW - 2;
    const bh = 46;
    const [nr, ng, nb] = isStar ? [30,58,138] : [13,92,46];
    const cx = startX + bw/2;
    const pad = bw * 0.12;
    const terminals = [
      [startX + pad,       startY+10],
      [startX + bw/2,      startY+10],
      [startX + bw - pad,  startY+10],
    ];
    const labels_top = ['W2','U2','V2'];
    const bot = [
      [startX + pad,       startY+36],
      [startX + bw/2,      startY+36],
      [startX + bw - pad,  startY+36],
    ];
    const labels_bot = ['U1','V1','W1'];

    doc.setFillColor(isStar ? 250 : 245, isStar ? 252 : 255, isStar ? 255 : 250);
    doc.roundedRect(startX, startY - 2, bw, bh, 2, 2, 'F');
    doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.3);
    doc.roundedRect(startX, startY - 2, bw, bh, 2, 2, 'S');

    doc.setFontSize(7); doc.setFont('helvetica','bold');
    doc.setTextColor(nr, ng, nb);
    doc.text(isStar ? 'Y  Star Connection' : 'Delta Connection', cx, startY + 4, { align:'center' });

    terminals.forEach(([tx, ty], i) => {
      doc.setFillColor(255,255,255); doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.8);
      doc.ellipse(tx, ty, 4.2, 2.6, 'FD');
      doc.setFontSize(5); doc.setFont('helvetica','bold'); doc.setTextColor(nr, ng, nb);
      doc.text(labels_top[i], tx, ty+1.1, { align:'center' });
    });
    if (isStar) {
      doc.setDrawColor(nr, ng, nb); doc.setLineWidth(2);
      doc.line(terminals[0][0], terminals[0][1], terminals[2][0], terminals[2][1]);
    }
    terminals.forEach(([tx, ty], i) => {
      doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.8);
      doc.line(tx, ty + 2.6, bot[i][0], bot[i][1] - 2.6);
    });
    bot.forEach(([tx, ty], i) => {
      doc.setFillColor(255,255,255); doc.setDrawColor(nr, ng, nb); doc.setLineWidth(0.8);
      doc.ellipse(tx, ty, 4.2, 2.6, 'FD');
      doc.setFontSize(5); doc.setFont('helvetica','bold'); doc.setTextColor(nr, ng, nb);
      doc.text(labels_bot[i], tx, ty+1.1, { align:'center' });
    });
    doc.setFontSize(5.5); doc.setFont('helvetica','normal');
    doc.setTextColor(100,100,100);
    doc.text(isStar ? '<= 3 kW' : '>= 4 kW', cx, startY + bh - 6, { align:'center' });

    if ((isStar && isStarConnection) || (!isStar && !isStarConnection)) {
      doc.setFillColor(255, 200, 0);
      doc.roundedRect(startX + bw - 16, startY - 2, 16, 6, 1.5, 1.5, 'F');
      doc.setFontSize(5); doc.setFont('helvetica','bold'); doc.setTextColor(80, 50, 0);
      doc.text('SELECTED', startX + bw - 8, startY + 2.5, { align:'center' });
    }
  };

  // header กรอบขวา "CONNECTION DIAGRAMS"
  doc.setFillColor(...BLUE);
  doc.rect(diagColX, techBodyY, diagColW, 7, 'F');
  doc.setTextColor(255,255,255);
  doc.setFontSize(7.5); doc.setFont('helvetica','bold');
  doc.text('CONNECTION DIAGRAMS', diagColX + diagColW/2, techBodyY + 5, { align:'center' });

  // วาด diagram 2 อัน ซ้อนกันในคอลัมน์ขวา
  const dStartY = techBodyY + 10;
  drawConnectionDiagram(diagColX + 1, dStartY, true);
  drawConnectionDiagram(diagColX + 1, dStartY + 52, false);

  y = Math.max(techFinalY, dStartY + 52 + 48) + 6;

  // ── Rated Performance Data — แสดงตารางเสมอ ถ้าไม่มีข้อมูลใส่ "-" ─────────
  sectionTitle('RATED PERFORMANCE DATA');
  const perfRows = [
    ['Rated Speed',          spec?.speed  ? spec.speed  + ' rpm' : '-'],
    ['Efficiency (100%)',    spec?.eff    ? spec.eff    + ' %'   : '-'],
    ['Power Factor (cos p)', spec?.pf     ? String(spec.pf)      : '-'],
    ['Rated Current 380V',   spec?.i380   ? spec.i380   + ' A'   : '-'],
    ['Rated Current 400V',   spec?.i400   ? spec.i400   + ' A'   : '-'],
    ['Rated Current 415V',   spec?.i415   ? spec.i415   + ' A'   : '-'],
    ['Rated Torque',         spec?.torque ? spec.torque + ' N.m' : '-'],
    ['Weight',               spec?.weight ? spec.weight + ' kg'  : '-'],
  ];
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
  doc.text('Synergy Asia Solution Co., Ltd.  |  www.synergy-as.com  |  Sales : 080-7780778 ', W / 2, pageH - 4.5, { align:'center' });

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
                <img src={img} alt={`C${code}`} className="w-full object-contain" style={{ maxHeight:220 }} />
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
                <img src={img} alt={`T${code}`} className="w-full object-contain" style={{ maxHeight:200 }} />
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
      <div className="mb-3 flex justify-center" style={{ minHeight: 330 }}>
        {preview ? (
          <motion.div
            key={preview.code}
            initial={{ opacity:1, scale:0.88 }}
            animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.58 }}
            className="bg-blur rounded-2xl shadow-xl px-4 py-3 flex flex-col items-center"
            style={{ maxWidth: 400 }}
          >
            <img src={preview.img} alt={preview.label} className="object-contain" style={{ maxHeight:300, maxWidth:380 }} />
            <p className="mt-1 font-bold text-yellow-400 text-sm">{preview.label}</p>
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
// SALE PERSONS (shared with AC Motor flow)
// ─────────────────────────────────────────────────────────────────────────────
const IEC_SALE_PERSONS = [
  { abbr: 'CA',  name: 'Mr. Chottanin A. (CA)',  position: 'TRANSMISSION PRODUCT MANAGER', phone: '081-921-6225' },
  { abbr: 'AP',  name: 'Ms.Apichaya P. (AP)',    position: 'Sale Supervisor',               phone: '098-3697494' },
  { abbr: 'MY',  name: 'Ms.Matavee Y. (MY)',     position: 'Sale Supervisor',               phone: '092-2715371' },
  { abbr: 'TWS', name: 'Ms.Thitikan W. (TWS)',   position: 'Sale Exclusive',                phone: '080-4632394' },
  { abbr: 'WS',  name: 'Ms.Warissara S.(WS)',    position: 'Sale Exclusive',                phone: '065-5051798' },
  { abbr: 'SI',  name: 'Ms.Suphak I.(SI)',       position: 'Sale Exclusive',                phone: '096-0787776' },
  { abbr: 'NM',  name: 'Mr.Naphaphat M.(NM)',    position: 'Sale Exclusive',                phone: '065-7176332' },
  { abbr: 'SK',  name: 'Mr.Sanya K.(SK)',        position: 'Sale Supervisor',               phone: '086-9819616' },
  { abbr: 'PL',  name: 'Mr.Pongsakorn L.(PL)',   position: 'Sale Engineer',                 phone: '063-2159056' },
];

const IEC_EMAILJS_SERVICE_ID  = 'service_fwgn6cw';
const IEC_EMAILJS_TEMPLATE_ID = 'template_7eppr2x';
const IEC_EMAILJS_PUBLIC_KEY  = 'BvIT5-X7LnkaS3LKq'.trim();

const iecBlobToBase64 = (blob) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = () => res(r.result.split(',')[1]);
    r.onerror = rej;
    r.readAsDataURL(blob);
  });

// ─────────────────────────────────────────────────────────────────────────────
// IEC MOTOR PRICE DATABASE  (คำนวณจาก IECMotorPriceList2026.xlsx)
// key: 'YE3-{frame}-{pole}'  → { YE3B5, YE3B3, YE3B14, YE3B35, YE3B34,
//                                 YVPB5, YVPB3, YVPB14, YVPB35, YVPB34,
//                                 YEJB5, YEJB3, YEJB14, YEJB35, YEJB34,
//                                 YPEJB5, YPEJB3, YPEJB14, YPEJB35, YPEJB34 }
// ราคาขาย (บาท) = (motorBase + mountAdj) × 33 × 1.1 × 1.2 × 1.1 × 1.7
// ─────────────────────────────────────────────────────────────────────────────
const IEC_PRICE_DB = {
  'YE3-71M10-4': {"YE3B5":3331,"YE3B3":3005,"YE3B14":3168,"YE3B35":3738,"YE3B34":3738,"YVPB5":5047,"YVPB3":4721,"YVPB14":4884,"YVPB35":5454,"YVPB34":5454,"YEJB5":6113,"YEJB3":5788,"YEJB14":5950,"YEJB35":6521,"YEJB34":6521,"YPEJB5":9250,"YPEJB3":8924,"YPEJB14":9087,"YPEJB35":9658,"YPEJB34":9658},
  'YE3-71M11-4': {"YE3B5":3737,"YE3B3":3411,"YE3B14":3574,"YE3B35":4145,"YE3B34":4145,"YVPB5":5504,"YVPB3":5178,"YVPB14":5341,"YVPB35":5911,"YVPB34":5911,"YEJB5":6489,"YEJB3":6163,"YEJB14":6326,"YEJB35":6896,"YEJB34":6896,"YPEJB5":9423,"YPEJB3":9097,"YPEJB14":9260,"YPEJB35":9830,"YPEJB34":9830},
  'YE3-71M22-4': {"YE3B5":3960,"YE3B3":3635,"YE3B14":3798,"YE3B35":4368,"YE3B34":4368,"YVPB5":5748,"YVPB3":5422,"YVPB14":5585,"YVPB35":6155,"YVPB34":6155,"YEJB5":6895,"YEJB3":6570,"YEJB14":6732,"YEJB35":7303,"YEJB34":7303,"YPEJB5":9748,"YPEJB3":9422,"YPEJB14":9585,"YPEJB35":10155,"YPEJB34":10155},
  'YE3-71M23-4': {"YE3B5":4255,"YE3B3":3929,"YE3B14":4092,"YE3B35":4663,"YE3B34":4663,"YVPB5":6459,"YVPB3":6133,"YVPB14":6296,"YVPB35":6866,"YVPB34":6866,"YEJB5":7342,"YEJB3":7016,"YEJB14":7179,"YEJB35":7749,"YEJB34":7749,"YPEJB5":9971,"YPEJB3":9645,"YPEJB14":9808,"YPEJB35":10378,"YPEJB34":10378},
  'YE3-71M24-4': {"YE3B5":4458,"YE3B3":4132,"YE3B14":4295,"YE3B35":4865,"YE3B34":4865,"YVPB5":6682,"YVPB3":6356,"YVPB14":6519,"YVPB35":7089,"YVPB34":7089,"YEJB5":7769,"YEJB3":7443,"YEJB14":7606,"YEJB35":8176,"YEJB34":8176,"YPEJB5":10317,"YPEJB3":9991,"YPEJB14":10154,"YPEJB35":10724,"YPEJB34":10724},
  'YE3-80M1-4': {"YE3B5":5129,"YE3B3":4803,"YE3B14":4966,"YE3B35":5536,"YE3B34":5536,"YVPB5":7251,"YVPB3":6925,"YVPB14":7088,"YVPB35":7658,"YVPB34":7658,"YEJB5":8317,"YEJB3":7991,"YEJB14":8154,"YEJB35":8724,"YEJB34":8724,"YPEJB5":10601,"YPEJB3":10275,"YPEJB14":10438,"YPEJB35":11008,"YPEJB34":11008},
  'YE3-80M2-4': {"YE3B5":5738,"YE3B3":5412,"YE3B14":5575,"YE3B35":6145,"YE3B34":6145,"YVPB5":7910,"YVPB3":7584,"YVPB14":7747,"YVPB35":8318,"YVPB34":8318,"YEJB5":8611,"YEJB3":8285,"YEJB14":8448,"YEJB35":9018,"YEJB34":9018,"YPEJB5":11210,"YPEJB3":10884,"YPEJB14":11047,"YPEJB35":11617,"YPEJB34":11617},
  'YE3-90S-4': {"YE3B5":6682,"YE3B3":6356,"YE3B14":6519,"YE3B35":7089,"YE3B34":7089,"YVPB5":8966,"YVPB3":8640,"YVPB14":8803,"YVPB35":9373,"YVPB34":9373,"YEJB5":10012,"YEJB3":9686,"YEJB14":9849,"YEJB35":10419,"YEJB34":10419,"YPEJB5":12784,"YPEJB3":12458,"YPEJB14":12621,"YPEJB35":13191,"YPEJB34":13191},
  'YE3-90L-4': {"YE3B5":7667,"YE3B3":7341,"YE3B14":7504,"YE3B35":8074,"YE3B34":8074,"YVPB5":9789,"YVPB3":9463,"YVPB14":9626,"YVPB35":10196,"YVPB34":10196,"YEJB5":10905,"YEJB3":10580,"YEJB14":10743,"YEJB35":11313,"YEJB34":11313,"YPEJB5":13698,"YPEJB3":13372,"YPEJB14":13535,"YPEJB35":14105,"YPEJB34":14105},
  'YE3-100L1-4': {"YE3B5":10449,"YE3B3":10123,"YE3B14":10286,"YE3B35":10856,"YE3B34":10856,"YVPB5":12865,"YVPB3":12540,"YVPB14":12702,"YVPB35":13273,"YVPB34":13273,"YEJB5":13769,"YEJB3":13443,"YEJB14":13606,"YEJB35":14176,"YEJB34":14176,"YPEJB5":16733,"YPEJB3":16407,"YPEJB14":16570,"YPEJB35":17140,"YPEJB34":17140},
  'YE3-100L2-4': {"YE3B5":11444,"YE3B3":11118,"YE3B14":11281,"YE3B35":11851,"YE3B34":11851,"YVPB5":13708,"YVPB3":13382,"YVPB14":13545,"YVPB35":14115,"YVPB34":14115,"YEJB5":14713,"YEJB3":14387,"YEJB14":14550,"YEJB35":15120,"YEJB34":15120,"YPEJB5":19170,"YPEJB3":18844,"YPEJB14":19007,"YPEJB35":19577,"YPEJB34":19577},
  'YE3-112M-4': {"YE3B5":13423,"YE3B3":13098,"YE3B14":13260,"YE3B35":13831,"YE3B34":13831,"YVPB5":16601,"YVPB3":16275,"YVPB14":16438,"YVPB35":17008,"YVPB34":17008,"YEJB5":17627,"YEJB3":17301,"YEJB14":17464,"YEJB35":18034,"YEJB34":18034,"YPEJB5":22693,"YPEJB3":22367,"YPEJB14":22530,"YPEJB35":23100,"YPEJB34":23100},
  'YE3-132S-4': {"YE3B5":18693,"YE3B3":18367,"YE3B14":18530,"YE3B35":19100,"YE3B34":19100,"YVPB5":22946,"YVPB3":22621,"YVPB14":22784,"YVPB35":23354,"YVPB34":23354,"YEJB5":25018,"YEJB3":24692,"YEJB14":24855,"YEJB35":25425,"YEJB34":25425,"YPEJB5":31150,"YPEJB3":30824,"YPEJB14":30987,"YPEJB35":31557,"YPEJB34":31557},
  'YE3-132M-4': {"YE3B5":21261,"YE3B3":20935,"YE3B14":21098,"YE3B35":21668,"YE3B34":21668,"YVPB5":25343,"YVPB3":25017,"YVPB14":25180,"YVPB35":25750,"YVPB34":25750,"YEJB5":27515,"YEJB3":27190,"YEJB14":27353,"YEJB35":27923,"YEJB34":27923,"YPEJB5":34765,"YPEJB3":34439,"YPEJB14":34602,"YPEJB35":35172,"YPEJB34":35172},
  'YE3-160M-4': {"YE3B5":30369,"YE3B3":30043,"YE3B14":30206,"YE3B35":30776,"YE3B34":30776,"YVPB5":36501,"YVPB3":36175,"YVPB14":36338,"YVPB35":36908,"YVPB34":36908,"YEJB5":39344,"YEJB3":39018,"YEJB14":39181,"YEJB35":39751,"YEJB34":39751,"YPEJB5":51111,"YPEJB3":50785,"YPEJB14":50948,"YPEJB35":51518,"YPEJB34":51518},
  'YE3-160L-4': {"YE3B5":35070,"YE3B3":34744,"YE3B14":34907,"YE3B35":35477,"YE3B34":35477,"YVPB5":41222,"YVPB3":40896,"YVPB14":41059,"YVPB35":41630,"YVPB34":41630,"YEJB5":45436,"YEJB3":45110,"YEJB14":45273,"YEJB35":45843,"YEJB34":45843,"YPEJB5":59021,"YPEJB3":58695,"YPEJB14":58858,"YPEJB35":59428,"YPEJB34":59428},
  'YE3-180M-4': {"YE3B5":43751,"YE3B3":43425,"YE3B14":43588,"YE3B35":44158,"YE3B34":44158,"YVPB5":51111,"YVPB3":50785,"YVPB14":50948,"YVPB35":51518,"YVPB34":51518,"YEJB5":55416,"YEJB3":55090,"YEJB14":55253,"YEJB35":55823,"YEJB34":55823,"YPEJB5":74849,"YPEJB3":74523,"YPEJB14":74686,"YPEJB35":75256,"YPEJB34":75256},
  'YE3-180L-4': {"YE3B5":48644,"YE3B3":48318,"YE3B14":48481,"YE3B35":49051,"YE3B34":49051,"YVPB5":53660,"YVPB3":53334,"YVPB14":53497,"YVPB35":54067,"YVPB34":54067,"YEJB5":61143,"YEJB3":60817,"YEJB14":60980,"YEJB35":61550,"YEJB34":61550,"YPEJB5":78169,"YPEJB3":77843,"YPEJB14":78006,"YPEJB35":78576,"YPEJB34":78576},
  'YE3-200L-4': {"YE3B5":65123,"YE3B3":64797,"YE3B14":64960,"YE3B35":65530,"YE3B34":65530,"YVPB5":71620,"YVPB3":71295,"YVPB14":71458,"YVPB35":72028,"YVPB34":72028,"YEJB5":83763,"YEJB3":83437,"YEJB14":83600,"YEJB35":84171,"YEJB34":84171,"YPEJB5":102891,"YPEJB3":102565,"YPEJB14":102728,"YPEJB35":103298,"YPEJB34":103298},
  'YE3-225S-4': {"YE3B5":78027,"YE3B3":77701,"YE3B14":77864,"YE3B35":78434,"YE3B34":78434,"YVPB5":87296,"YVPB3":86970,"YVPB14":87133,"YVPB35":87703,"YVPB34":87703,"YEJB5":100059,"YEJB3":99733,"YEJB14":99896,"YEJB35":100466,"YEJB34":100466,"YPEJB5":126741,"YPEJB3":126415,"YPEJB14":126578,"YPEJB35":127148,"YPEJB34":127148},
  'YE3-225M-4': {"YE3B5":84819,"YE3B3":84493,"YE3B14":84656,"YE3B35":85226,"YE3B34":85226,"YVPB5":97653,"YVPB3":97327,"YVPB14":97490,"YVPB35":98060,"YVPB34":98060,"YEJB5":118811,"YEJB3":118485,"YEJB14":118648,"YEJB35":119218,"YEJB34":119218,"YPEJB5":141665,"YPEJB3":141340,"YPEJB14":141503,"YPEJB35":142073,"YPEJB34":142073},
  'YE3-250M-4': {"YE3B5":107633,"YE3B3":107307,"YE3B14":107470,"YE3B35":108040,"YE3B34":108040,"YVPB5":122263,"YVPB3":121937,"YVPB14":122100,"YVPB35":122670,"YVPB34":122670,"YEJB5":137360,"YEJB3":137035,"YEJB14":137198,"YEJB35":137768,"YEJB34":137768,"YPEJB5":175475,"YPEJB3":175149,"YPEJB14":175312,"YPEJB35":175882,"YPEJB34":175882},
  'YE3-280S-4': {"YE3B5":141645,"YE3B3":141319,"YE3B14":141482,"YE3B35":142052,"YE3B34":142052,"YVPB5":153544,"YVPB3":153219,"YVPB14":153381,"YVPB35":153952,"YVPB34":153952,"YEJB5":173119,"YEJB3":172794,"YEJB14":172956,"YEJB35":173527,"YEJB34":173527,"YPEJB5":220361,"YPEJB3":220035,"YPEJB14":220198,"YPEJB35":220769,"YPEJB34":220769},
  'YE3-280M-4': {"YE3B5":162418,"YE3B3":162092,"YE3B14":162255,"YE3B35":162826,"YE3B34":162826,"YVPB5":172175,"YVPB3":171849,"YVPB14":172012,"YVPB35":172583,"YVPB34":172583,"YEJB5":196238,"YEJB3":195912,"YEJB14":196075,"YEJB35":196645,"YEJB34":196645,"YPEJB5":249876,"YPEJB3":249550,"YPEJB14":249713,"YPEJB35":250283,"YPEJB34":250283},
  'YE3-80M2-6': {"YE3B5":5666,"YE3B3":5340,"YE3B14":5503,"YE3B35":6073,"YE3B34":6073,"YVPB5":9210,"YVPB3":8884,"YVPB14":9047,"YVPB35":9617,"YVPB34":9617,"YEJB5":9372,"YEJB3":9047,"YEJB14":9210,"YEJB35":9780,"YEJB34":9780,"YPEJB5":11251,"YPEJB3":10925,"YPEJB14":11088,"YPEJB35":11658,"YPEJB34":11658},
  'YE3-90S-6': {"YE3B5":6621,"YE3B3":6295,"YE3B14":6458,"YE3B35":7028,"YE3B34":7028,"YVPB5":10510,"YVPB3":10184,"YVPB14":10347,"YVPB35":10917,"YVPB34":10917,"YEJB5":10733,"YEJB3":10407,"YEJB14":10570,"YEJB35":11140,"YEJB34":11140,"YPEJB5":13535,"YPEJB3":13209,"YPEJB14":13372,"YPEJB35":13942,"YPEJB34":13942},
  'YE3-90L-6': {"YE3B5":7576,"YE3B3":7250,"YE3B14":7413,"YE3B35":7983,"YE3B34":7983,"YVPB5":11718,"YVPB3":11392,"YVPB14":11555,"YVPB35":12125,"YVPB34":12125,"YEJB5":11718,"YEJB3":11392,"YEJB14":11555,"YEJB35":12125,"YEJB34":12125,"YPEJB5":15779,"YPEJB3":15453,"YPEJB14":15616,"YPEJB35":16186,"YPEJB34":16186},
  'YE3-100L-6': {"YE3B5":10439,"YE3B3":10113,"YE3B14":10276,"YE3B35":10846,"YE3B34":10846,"YVPB5":13444,"YVPB3":13118,"YVPB14":13281,"YVPB35":13851,"YVPB34":13851,"YEJB5":14094,"YEJB3":13768,"YEJB14":13931,"YEJB35":14501,"YEJB34":14501,"YPEJB5":18804,"YPEJB3":18479,"YPEJB14":18641,"YPEJB35":19212,"YPEJB34":19212},
  'YE3-112M-6': {"YE3B5":13312,"YE3B3":12986,"YE3B14":13149,"YE3B35":13719,"YE3B34":13719,"YVPB5":16287,"YVPB3":15961,"YVPB14":16124,"YVPB35":16694,"YVPB34":16694,"YEJB5":17271,"YEJB3":16946,"YEJB14":17108,"YEJB35":17679,"YEJB34":17679,"YPEJB5":22257,"YPEJB3":21931,"YPEJB14":22094,"YPEJB35":22664,"YPEJB34":22664},
  'YE3-132S-6': {"YE3B5":16337,"YE3B3":16011,"YE3B14":16174,"YE3B35":16744,"YE3B34":16744,"YVPB5":22500,"YVPB3":22174,"YVPB14":22337,"YVPB35":22907,"YVPB34":22907,"YEJB5":24531,"YEJB3":24205,"YEJB14":24368,"YEJB35":24938,"YEJB34":24938,"YPEJB5":30531,"YPEJB3":30205,"YPEJB14":30368,"YPEJB35":30938,"YPEJB34":30938},
  'YE3-132M1-6': {"YE3B5":18632,"YE3B3":18306,"YE3B14":18469,"YE3B35":19039,"YE3B34":19039,"YVPB5":24825,"YVPB3":24499,"YVPB14":24662,"YVPB35":25232,"YVPB34":25232,"YEJB5":26642,"YEJB3":26316,"YEJB14":26479,"YEJB35":27049,"YEJB34":27049,"YPEJB5":34085,"YPEJB3":33759,"YPEJB14":33922,"YPEJB35":34492,"YPEJB34":34492},
  'YE3-132M2-6': {"YE3B5":20845,"YE3B3":20519,"YE3B14":20682,"YE3B35":21252,"YE3B34":21252,"YVPB5":25221,"YVPB3":24895,"YVPB14":25058,"YVPB35":25628,"YVPB34":25628,"YEJB5":27221,"YEJB3":26896,"YEJB14":27058,"YEJB35":27629,"YEJB34":27629,"YPEJB5":42207,"YPEJB3":41881,"YPEJB14":42044,"YPEJB35":42614,"YPEJB34":42614},
  'YE3-160M-6': {"YE3B5":29769,"YE3B3":29444,"YE3B14":29606,"YE3B35":30177,"YE3B34":30177,"YVPB5":35770,"YVPB3":35444,"YVPB14":35607,"YVPB35":36178,"YVPB34":36178,"YEJB5":38562,"YEJB3":38236,"YEJB14":38399,"YEJB35":38969,"YEJB34":38969,"YPEJB5":51741,"YPEJB3":51415,"YPEJB14":51578,"YPEJB35":52148,"YPEJB34":52148},
  'YE3-160L-6': {"YE3B5":34369,"YE3B3":34043,"YE3B14":34206,"YE3B35":34777,"YE3B34":34777,"YVPB5":40400,"YVPB3":40074,"YVPB14":40237,"YVPB35":40807,"YVPB34":40807,"YEJB5":44552,"YEJB3":44226,"YEJB14":44389,"YEJB35":44959,"YEJB34":44959,"YPEJB5":57843,"YPEJB3":57517,"YPEJB14":57680,"YPEJB35":58250,"YPEJB34":58250},
  'YE3-180L-6': {"YE3B5":45324,"YE3B3":44998,"YE3B14":45161,"YE3B35":45731,"YE3B34":45731,"YVPB5":52603,"YVPB3":52278,"YVPB14":52441,"YVPB35":53011,"YVPB34":53011,"YEJB5":59934,"YEJB3":59608,"YEJB14":59771,"YEJB35":60341,"YEJB34":60341,"YPEJB5":76606,"YPEJB3":76280,"YPEJB14":76443,"YPEJB35":77013,"YPEJB34":77013},
  'YE3-200L1-6': {"YE3B5":56776,"YE3B3":56451,"YE3B14":56614,"YE3B35":57184,"YE3B34":57184,"YVPB5":70199,"YVPB3":69873,"YVPB14":70036,"YVPB35":70606,"YVPB34":70606,"YEJB5":82098,"YEJB3":81772,"YEJB14":81935,"YEJB35":82506,"YEJB34":82506,"YPEJB5":100841,"YPEJB3":100515,"YPEJB14":100678,"YPEJB35":101248,"YPEJB34":101248},
  'YE3-200L2-6': {"YE3B5":61955,"YE3B3":61629,"YE3B14":61792,"YE3B35":62362,"YE3B34":62362,"YVPB5":71132,"YVPB3":70807,"YVPB14":70970,"YVPB35":71540,"YVPB34":71540,"YEJB5":82595,"YEJB3":82269,"YEJB14":82432,"YEJB35":83002,"YEJB34":83002,"YPEJB5":101927,"YPEJB3":101601,"YPEJB14":101764,"YPEJB35":102334,"YPEJB34":102334},
  'YE3-225M-6': {"YE3B5":81519,"YE3B3":81193,"YE3B14":81356,"YE3B35":81926,"YE3B34":81926,"YVPB5":95713,"YVPB3":95387,"YVPB14":95550,"YVPB35":96120,"YVPB34":96120,"YEJB5":103551,"YEJB3":103225,"YEJB14":103388,"YEJB35":103958,"YEJB34":103958,"YPEJB5":138843,"YPEJB3":138517,"YPEJB14":138680,"YPEJB35":139250,"YPEJB34":139250},
  'YE3-250M-6': {"YE3B5":100464,"YE3B3":100139,"YE3B14":100302,"YE3B35":100872,"YE3B34":100872,"YVPB5":119846,"YVPB3":119521,"YVPB14":119683,"YVPB35":120254,"YVPB34":120254,"YEJB5":134670,"YEJB3":134344,"YEJB14":134507,"YEJB35":135077,"YEJB34":135077,"YPEJB5":171982,"YPEJB3":171656,"YPEJB14":171819,"YPEJB35":172390,"YPEJB34":172390},
  'YE3-280S-6': {"YE3B5":134843,"YE3B3":134517,"YE3B14":134680,"YE3B35":135250,"YE3B34":135250,"YVPB5":150488,"YVPB3":150162,"YVPB14":150325,"YVPB35":150895,"YVPB34":150895,"YEJB5":169667,"YEJB3":169341,"YEJB14":169504,"YEJB35":170074,"YEJB34":170074,"YPEJB5":215965,"YPEJB3":215639,"YPEJB14":215802,"YPEJB35":216372,"YPEJB34":216372},
  'YE3-280M-6': {"YE3B5":154559,"YE3B3":154234,"YE3B14":154396,"YE3B35":154967,"YE3B34":154967,"YVPB5":169454,"YVPB3":169128,"YVPB14":169291,"YVPB35":169861,"YVPB34":169861,"YEJB5":192329,"YEJB3":192003,"YEJB14":192166,"YEJB35":192736,"YEJB34":192736,"YPEJB5":244890,"YPEJB3":244565,"YPEJB14":244728,"YPEJB35":245298,"YPEJB34":245298},
  'YE3-80M1-2': {"YE3B5":5129,"YE3B3":4803,"YE3B14":4966,"YE3B35":5536,"YE3B34":5536,"YVPB5":7251,"YVPB3":6925,"YVPB14":7088,"YVPB35":7658,"YVPB34":7658,"YEJB5":8317,"YEJB3":7991,"YEJB14":8154,"YEJB35":8724,"YEJB34":8724,"YPEJB5":10601,"YPEJB3":10275,"YPEJB14":10438,"YPEJB35":11008,"YPEJB34":11008},
  'YE3-80M2-2': {"YE3B5":5738,"YE3B3":5412,"YE3B14":5575,"YE3B35":6145,"YE3B34":6145,"YVPB5":7910,"YVPB3":7584,"YVPB14":7747,"YVPB35":8318,"YVPB34":8318,"YEJB5":8611,"YEJB3":8285,"YEJB14":8448,"YEJB35":9018,"YEJB34":9018,"YPEJB5":11210,"YPEJB3":10884,"YPEJB14":11047,"YPEJB35":11617,"YPEJB34":11617},
  'YE3-90S-2': {"YE3B5":6682,"YE3B3":6356,"YE3B14":6519,"YE3B35":7089,"YE3B34":7089,"YVPB5":8977,"YVPB3":8651,"YVPB14":8814,"YVPB35":9384,"YVPB34":9384,"YEJB5":10012,"YEJB3":9686,"YEJB14":9849,"YEJB35":10419,"YEJB34":10419,"YPEJB5":12784,"YPEJB3":12458,"YPEJB14":12621,"YPEJB35":13191,"YPEJB34":13191},
  'YE3-90L-2': {"YE3B5":7667,"YE3B3":7341,"YE3B14":7504,"YE3B35":8074,"YE3B34":8074,"YVPB5":9789,"YVPB3":9463,"YVPB14":9626,"YVPB35":10196,"YVPB34":10196,"YEJB5":10905,"YEJB3":10580,"YEJB14":10743,"YEJB35":11313,"YEJB34":11313,"YPEJB5":13698,"YPEJB3":13372,"YPEJB14":13535,"YPEJB35":14105,"YPEJB34":14105},
  'YE3-100L-2': {"YE3B5":11444,"YE3B3":11118,"YE3B14":11281,"YE3B35":11851,"YE3B34":11851,"YVPB5":13708,"YVPB3":13382,"YVPB14":13545,"YVPB35":14115,"YVPB34":14115,"YEJB5":15779,"YEJB3":15453,"YEJB14":15616,"YEJB35":16186,"YEJB34":16186,"YPEJB5":19170,"YPEJB3":18844,"YPEJB14":19007,"YPEJB35":19577,"YPEJB34":19577},
  'YE3-112M-2': {"YE3B5":13423,"YE3B3":13098,"YE3B14":13260,"YE3B35":13831,"YE3B34":13831,"YVPB5":16601,"YVPB3":16275,"YVPB14":16438,"YVPB35":17008,"YVPB34":17008,"YEJB5":18338,"YEJB3":18012,"YEJB14":18175,"YEJB35":18745,"YEJB34":18745,"YPEJB5":22693,"YPEJB3":22367,"YPEJB14":22530,"YPEJB35":23100,"YPEJB34":23100},
  'YE3-132S1-2': {"YE3B5":18693,"YE3B3":18367,"YE3B14":18530,"YE3B35":19100,"YE3B34":19100,"YVPB5":22764,"YVPB3":22438,"YVPB14":22601,"YVPB35":23171,"YVPB34":23171,"YEJB5":24592,"YEJB3":24266,"YEJB14":24429,"YEJB35":24999,"YEJB34":24999,"YPEJB5":31029,"YPEJB3":30703,"YPEJB14":30866,"YPEJB35":31436,"YPEJB34":31436},
  'YE3-132S2-2': {"YE3B5":21261,"YE3B3":20935,"YE3B14":21098,"YE3B35":21668,"YE3B34":21668,"YVPB5":27810,"YVPB3":27484,"YVPB14":27647,"YVPB35":28218,"YVPB34":28218,"YEJB5":27394,"YEJB3":27068,"YEJB14":27231,"YEJB35":27801,"YEJB34":27801,"YPEJB5":31150,"YPEJB3":30824,"YPEJB14":30987,"YPEJB35":31557,"YPEJB34":31557},
  'YE3-160M1-2': {"YE3B5":29769,"YE3B3":29444,"YE3B14":29606,"YE3B35":30177,"YE3B34":30177,"YVPB5":36349,"YVPB3":36023,"YVPB14":36186,"YVPB35":36756,"YVPB34":36756,"YEJB5":39192,"YEJB3":38866,"YEJB14":39029,"YEJB35":39599,"YEJB34":39599,"YPEJB5":49862,"YPEJB3":49537,"YPEJB14":49699,"YPEJB35":50270,"YPEJB34":50270},
  'YE3-160M2-2': {"YE3B5":30369,"YE3B3":30043,"YE3B14":30206,"YE3B35":30776,"YE3B34":30776,"YVPB5":36501,"YVPB3":36175,"YVPB14":36338,"YVPB35":36908,"YVPB34":36908,"YEJB5":39344,"YEJB3":39018,"YEJB14":39181,"YEJB35":39751,"YEJB34":39751,"YPEJB5":51111,"YPEJB3":50785,"YPEJB14":50948,"YPEJB35":51518,"YPEJB34":51518},
  'YE3-160L2-2': {"YE3B5":35070,"YE3B3":34744,"YE3B14":34907,"YE3B35":35477,"YE3B34":35477,"YVPB5":41222,"YVPB3":40896,"YVPB14":41059,"YVPB35":41630,"YVPB34":41630,"YEJB5":45436,"YEJB3":45110,"YEJB14":45273,"YEJB35":45843,"YEJB34":45843,"YPEJB5":59021,"YPEJB3":58695,"YPEJB14":58858,"YPEJB35":59428,"YPEJB34":59428},
  'YE3-180M-2': {"YE3B5":43751,"YE3B3":43425,"YE3B14":43588,"YE3B35":44158,"YE3B34":44158,"YVPB5":51111,"YVPB3":50785,"YVPB14":50948,"YVPB35":51518,"YVPB34":51518,"YEJB5":59071,"YEJB3":58745,"YEJB14":58908,"YEJB35":59478,"YEJB34":59478,"YPEJB5":74849,"YPEJB3":74523,"YPEJB14":74686,"YPEJB35":75256,"YPEJB34":75256},
  'YE3-200L1-2': {"YE3B5":63843,"YE3B3":63517,"YE3B14":63680,"YE3B35":64250,"YE3B34":64250,"YVPB5":71357,"YVPB3":71031,"YVPB14":71194,"YVPB35":71764,"YVPB34":71764,"YEJB5":83550,"YEJB3":83224,"YEJB14":83387,"YEJB35":83957,"YEJB34":83957,"YPEJB5":102729,"YPEJB3":102403,"YPEJB14":102566,"YPEJB35":103136,"YPEJB34":103136},
  'YE3-200L2-2': {"YE3B5":65123,"YE3B3":64797,"YE3B14":64960,"YE3B35":65530,"YE3B34":65530,"YVPB5":71620,"YVPB3":71295,"YVPB14":71458,"YVPB35":72028,"YVPB34":72028,"YEJB5":83763,"YEJB3":83437,"YEJB14":83600,"YEJB35":84171,"YEJB34":84171,"YPEJB5":102891,"YPEJB3":102565,"YPEJB14":102728,"YPEJB35":103298,"YPEJB34":103298},
};

// ── ฟังก์ชันดึงราคา: motorType (YE3/YVP/YEJ/YPEJ) + fullKey (YE3-xxx-P) + mount (B5/B3/B14/B35/B34)
function lookupIECPrice(motorType, fullKey, mount) {
  if (!motorType || !fullKey || !mount) return null;
  const row = IEC_PRICE_DB[fullKey];
  if (!row) return null;
  // map motorType → prefix in price col
  const prefixMap = { YE3:'YE3', YE4:'YE3', YVP:'YVP', YEJ:'YEJ', YPEJ:'YPEJ' };
  const prefix = prefixMap[motorType];
  if (!prefix) return null;
  return row[`${prefix}${mount}`] ?? null;
}

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
    <div className="flex flex-col items-center" style={{ minWidth:290, maxWidth:340 }}>
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

      {/* Color picker row: ‹ [swatch + name + RAL inline] › */}
      <div className="flex items-center gap-2 w-full bg-white/5 rounded-xl px-2 py-2">
        <button type="button" onClick={prev}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white font-bold text-xl flex items-center justify-center transition shadow active:scale-95">
          ‹
        </button>
        <div className="flex-1 flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border-2 border-white/80 shadow-lg transition-all duration-300 flex-shrink-0"
                 style={{ backgroundColor: color.hex }} />
            <span className="text-white/50 text-[10px] font-mono">RAL {color.code}</span>
          </div>
          <span className="text-white font-semibold text-xs text-center leading-tight">{color.name}</span>
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
  const [selectedColor,          setSelectedColor]          = React.useState(MOTOR_COLORS[7]);
  const [showQuote,               setShowQuote]              = React.useState(false);
  const [qName,                   setQName]                  = React.useState('');
  const [qCompany,                setQCompany]               = React.useState('');
  const [qPhone,                  setQPhone]                 = React.useState('');
  const [qEmail,                  setQEmail]                 = React.useState('');
  const [qtyMotor,                setQtyMotor]               = React.useState(1);
  const [sending,                 setSending]                = React.useState(false);
  const [salePerson,              setSalePerson]             = React.useState('');
  const [showSalePersonPicker,    setShowSalePersonPicker]   = React.useState(false);

  const mountInfo = IEC_MOUNT_LIST.find(m  => m.code  === iecMount);
  const poleInfo  = IEC_POLE_LIST.find(pl  => pl.code === iecPole);
  const motorInfo = IEC_MOTOR_TYPES.find(m => m.code  === iecMotorType);

  // ── Price lookup ─────────────────────────────────────────────────────────
  const unitPrice = lookupIECPrice(iecMotorType, fullKey, iecMount);

  // ── Submit quote → POST /api/iec-quote ───────────────────────────────────
  const submitQuote = async () => {
    if (!qName || !qCompany || !qPhone || !qEmail) { alert('กรุณากรอกข้อมูลให้ครบ'); return; }
    try {
      setSending(true);
      const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/iec-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelCode,
          motorCode:  modelCode,
          gearCode:   '-',
          qtyMotor,
          qtyGear:    1,
          customer:   { name: qName, company: qCompany, phone: qPhone, email: qEmail },
          controllerModel: '',
          qtyCtrl:    0,
          salePerson: salePerson || 'CA',
          iecMotorType, iecPower, iecPole, iecMount, iecTerminal, iecCable,
          unitPrice:  unitPrice ?? 0,
        }),
      });
      if (!res.ok) { const msg = await res.text().catch(() => ''); throw new Error(msg || 'สร้างใบเสนอราคาไม่สำเร็จ'); }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const cd   = res.headers.get('content-disposition') || '';
      const match = cd.match(/filename\*?=(?:UTF-8''|")?([^";]+)"?/i);
      const filenameFromServer = match ? decodeURIComponent(match[1]) : `${modelCode}.pdf`;
      try {
        const pdfBase64 = await iecBlobToBase64(blob);
        const emailParams = {
          to_email: qEmail, requester_name: qName, company: qCompany, phone: qPhone, email: qEmail,
          model_code: modelCode, motor_code: modelCode, gear_code: '-',
          qty_motor: String(qtyMotor), qty_gear: '1', qty_ctrl: '0', controller: '-',
          sale_person: salePerson || 'CA',
          time: new Date().toLocaleString('th-TH'),
          pdf_content: pdfBase64, pdf_name: filenameFromServer,
        };
        const ejs = window.emailjs;
        if (ejs) {
          await ejs.send(IEC_EMAILJS_SERVICE_ID, IEC_EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: qEmail },                   IEC_EMAILJS_PUBLIC_KEY);
          await ejs.send(IEC_EMAILJS_SERVICE_ID, IEC_EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: 'Chottanin@synergy-as.com' }, IEC_EMAILJS_PUBLIC_KEY);
          await ejs.send(IEC_EMAILJS_SERVICE_ID, IEC_EMAILJS_TEMPLATE_ID, { ...emailParams, to_email: 'sas04@synergy-as.com' },     IEC_EMAILJS_PUBLIC_KEY);
        }
      } catch (e) { console.error('EmailJS send failed:', e); }
      const a = document.createElement('a');
      a.href = url; a.download = filenameFromServer;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      setShowQuote(false);
    } catch (err) {
      alert(String(err?.message || err));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-4 pb-28">
      {/* ── Summary Card ────────────────────────────────────────────────── */}
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

        {/* Top row */}
        <div className="flex flex-row gap-3 items-start">
          <div className="flex-1 min-w-0 flex flex-col">
            {[
              ['Motor Type', motorInfo?.sub || iecMotorType],
              ['Power',      iecPower + ' kW (' + (parseFloat(iecPower)*1.341).toFixed(2) + ' HP)'],
              ['Mounting',   (mountInfo?.label||'-') + ' – ' + (mountInfo?.desc||'-')],
              ['Cable Pos.', iecCable],
              ['Frame',      frameLabel(fullKey)],
              ['Pole',       (poleInfo?.label||'-') + ' (' + (poleInfo?.rpm||'-') + ')'],
              ['Terminal',   iecTerminal + '°'],
              ['Direction',  'CW / CCW'],
              ['Casing',     'Iron'],
            ].map(([lbl, val]) => (
              <div key={lbl} className="flex text-xs mb-0.5">
                <span className="text-white/60 w-20 flex-shrink-0 font-medium">{lbl}:</span>
                <span className="text-blue-300 font-semibold">{val}</span>
              </div>
            ))}
            {unitPrice != null && (
              <div className="flex text-xs mb-0.5 mt-1">
                <span className="text-white/60 w-20 flex-shrink-0 font-medium">ราคา:</span>
                <span className="text-emerald-400 font-bold">{unitPrice.toLocaleString('th-TH')} ฿/ตัว</span>
              </div>
            )}

            <div className="mt-3 flex-1 flex flex-col justify-center">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">Connection Diagrams</p>
              <div className={`rounded-xl p-2 border-2 ${isStarConnection ? 'border-yellow-400 bg-yellow-400/10' : 'border-blue-400 bg-blue-400/10'}`}>
                <ConnectionDiagram isStar={isStarConnection} />
                <p className={`text-center text-xs font-bold mt-1 ${isStarConnection ? 'text-yellow-400' : 'text-blue-400'}`}>
                  {isStarConnection ? '★ Star (Y) — ใช้กับมอเตอร์นี้' : '▲ Delta (Δ) — ใช้กับมอเตอร์นี้'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <MountingColorViewer mountInfo={mountInfo} onColorChange={setSelectedColor} />
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="border-t border-white/20 pt-3 mt-3">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">Technical Specifications</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 text-xs text-white/90">
            {[
              ['Standard',   'IEC 60034 / GB18613, 3Ph 380V 50Hz, IP55, Class F, S1'],
              ['Insulation', 'Class F (105K), by Class B'],
              ['Cooling',    'TEFC (IC411, IEC60034-6)'],
              ['Winding',    '100% Copper Wire'],
              ['Duty',       'Continuous (S1)'],
              ['Vibration',  'Class A (Class B on request)'],
              ['Site',       '-15°C to +40°C, Alt ≤ 1000 m'],
              ['Voltage',    '200–660V, 50/60Hz (±5%)'],
              ...(spec ? [
                ['Rated Speed',  spec.speed  + ' rpm'],
                ['Efficiency',   spec.eff    + ' %'],
                ...(spec.pf   ? [['Power Factor', String(spec.pf)]]      : []),
                ...(spec.i380 ? [['Current 380V', spec.i380 + ' A']]     : []),
                ...(spec.i400 ? [['Current 400V', spec.i400 + ' A']]     : []),
                ...(spec.i415 ? [['Current 415V', spec.i415 + ' A']]     : []),
                ['Rated Torque', spec.torque + ' N·m'],
                ...(spec.weight ? [['Weight',     spec.weight + ' kg']]  : []),
              ] : []),
              ['Protection', 'IP54 / IP55'],
              ['Quality',    'ISO 9001'],
            ].map(([lbl, val]) => (
              <div key={lbl} className="flex gap-1">
                <span className="font-semibold text-white/60 w-24 flex-shrink-0">{lbl}:</span>
                <span className="text-blue-300">{val}</span>
              </div>
            ))}
            <div className="flex gap-1 col-span-full">
              <span className="font-semibold text-yellow-400 w-24 flex-shrink-0">Warranty:</span>
              <span className="text-yellow-400 font-extrabold text-base">24 เดือน</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ปุ่ม 4 ปุ่ม ─────────────────────────────────────────────────────── */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <DataSheetButton state={state} selectedColor={selectedColor} isStarConnection={isStarConnection} />
        <button type="button"
          onClick={() => alert(`Drawing 2D for ${modelCode}\n(Coming soon)`)}
          className="flex flex-col items-center justify-center gap-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-4 rounded-xl shadow transition active:scale-95">
          <span className="text-2xl">📐</span>
          <span className="font-semibold text-sm">Drawing 2D</span>
        </button>
        <button type="button"
          onClick={() => setShowQuote(true)}
          className="flex flex-col items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-4 rounded-xl shadow transition active:scale-95">
          <span className="text-2xl">🧾</span>
          <span className="font-semibold text-sm">ขอใบเสนอราคา</span>
        </button>
        <button type="button"
          onClick={() => { if (typeof onConfirm==='function') onConfirm(modelCode,'3d'); }}
          className="flex flex-col items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-4 rounded-xl shadow transition active:scale-95">
          <span className="text-2xl">📦</span>
          <span className="font-semibold text-sm">3D Step file</span>
        </button>
      </div>

      <FloatingBack onClick={() => update('iecCable', null)} />

      {/* ── Quote Modal ──────────────────────────────────────────────────────── */}
      {showQuote && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => !sending && setShowQuote(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-[9991] overflow-y-auto max-h-[90vh]">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <h3 className="text-xl font-bold flex-1">ขอใบเสนอราคา</h3>
              <div className="relative">
                <button type="button"
                  onClick={() => setShowSalePersonPicker(v => !v)}
                  className="text-2xl leading-none hover:scale-110 active:scale-95 transition-transform"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}>
                  🧑‍💼
                </button>
                {showSalePersonPicker && (
                  <div className="absolute left-0 top-full mt-1 z-[9999] bg-white border border-slate-200 rounded-xl shadow-xl w-[260px] overflow-hidden">
                    {IEC_SALE_PERSONS.map(sp => (
                      <button key={sp.abbr} type="button"
                        onClick={() => { setSalePerson(sp.abbr); setShowSalePersonPicker(false); }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-green-50 transition text-sm border-b last:border-b-0 ${salePerson===sp.abbr ? 'bg-green-100 font-semibold' : ''}`}>
                        <div className="font-semibold text-slate-800">{sp.name}</div>
                        <div className="text-slate-500 text-xs">{sp.position} · {sp.phone}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {salePerson && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                  {IEC_SALE_PERSONS.find(s => s.abbr === salePerson)?.name || salePerson}
                </span>
              )}
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm mb-1">ชื่อผู้ขอราคา :</label>
                <input value={qName} onChange={e => setQName(e.target.value)}
                       className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm mb-1">ชื่อบริษัท :</label>
                <input value={qCompany} onChange={e => setQCompany(e.target.value)}
                       className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm mb-1">เบอร์ติดต่อ :</label>
                <input value={qPhone} onChange={e => setQPhone(e.target.value)}
                       className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm mb-1">Email :</label>
                <input type="email" value={qEmail} onChange={e => setQEmail(e.target.value)}
                       className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring" />
              </div>
              <div>
                <label className="block text-sm mb-1">จำนวน (ตัว) :</label>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setQtyMotor(q => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-lg flex items-center justify-center active:scale-95">−</button>
                  <input type="number" min={1} max={999} value={qtyMotor}
                    onChange={e => { const v = parseInt(e.target.value, 10); setQtyMotor(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1); }}
                    className="w-16 text-center px-2 py-2 rounded-lg border border-slate-200 outline-none focus:ring font-bold" />
                  <button type="button" onClick={() => setQtyMotor(q => Math.min(999, q + 1))}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-lg flex items-center justify-center active:scale-95">+</button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowQuote(false)} disabled={sending}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50">ปิด</button>
              <button type="button" onClick={submitQuote}
                disabled={sending || !qName || !qCompany || !qPhone || !qEmail}
                className="px-5 py-2 rounded-2xl bg-green-300 hover:bg-green-400 font-semibold shadow active:scale-95 transition transform disabled:opacity-50">
                {sending ? 'กำลังส่ง…' : 'รับใบเสนอราคา'}
              </button>
            </div>

            {/* Summary */}
            <div className="mt-4 text-sm text-slate-600">
              <div>Model: <b>{modelCode}</b></div>
              <div className="flex gap-4 mt-1 flex-wrap">
                <span>IEC Motor: <b>{qtyMotor}</b></span>
                {unitPrice != null && <span>ราคา/ตัว: <b>{unitPrice.toLocaleString('th-TH')} ฿</b></span>}
                {unitPrice != null && <span>รวม: <b>{(unitPrice * qtyMotor).toLocaleString('th-TH')} ฿</b></span>}
              </div>
            </div>
          </div>
        </div>
      )}
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
