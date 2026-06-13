import React, { useState, useRef, useEffect } from 'react';

// ─── IEC 60034-30-1 Efficiency Table ────────────────────────────────────────
const IEC_EFF = {
  2: {
    0.12:{IE1:57.0,IE2:64.0,IE3:69.0,IE4:74.0,IE5:77.0},0.18:{IE1:63.0,IE2:69.0,IE3:74.0,IE4:78.0,IE5:81.0},
    0.25:{IE1:67.0,IE2:73.0,IE3:77.0,IE4:81.0,IE5:83.0},0.37:{IE1:70.0,IE2:75.5,IE3:79.6,IE4:83.0,IE5:85.5},
    0.55:{IE1:72.5,IE2:77.5,IE3:81.4,IE4:84.7,IE5:87.0},0.75:{IE1:75.5,IE2:80.0,IE3:83.8,IE4:86.7,IE5:88.6},
    1.1:{IE1:78.5,IE2:82.0,IE3:85.8,IE4:88.4,IE5:90.1},1.5:{IE1:80.5,IE2:84.0,IE3:87.3,IE4:89.6,IE5:91.2},
    2.2:{IE1:82.5,IE2:85.5,IE3:88.7,IE4:90.7,IE5:92.2},3:{IE1:84.0,IE2:87.0,IE3:89.8,IE4:91.7,IE5:93.0},
    4:{IE1:85.0,IE2:88.0,IE3:90.6,IE4:92.4,IE5:93.6},5.5:{IE1:86.5,IE2:89.0,IE3:91.6,IE4:93.2,IE5:94.3},
    7.5:{IE1:87.5,IE2:90.0,IE3:92.4,IE4:93.9,IE5:94.9},11:{IE1:88.5,IE2:91.0,IE3:93.0,IE4:94.5,IE5:95.4},
    15:{IE1:89.5,IE2:91.5,IE3:93.6,IE4:95.0,IE5:95.8},18.5:{IE1:90.2,IE2:92.2,IE3:94.1,IE4:95.4,IE5:96.1},
    22:{IE1:90.5,IE2:92.5,IE3:94.3,IE4:95.6,IE5:96.3},30:{IE1:91.4,IE2:93.0,IE3:94.7,IE4:95.9,IE5:96.6},
    37:{IE1:91.8,IE2:93.3,IE3:95.0,IE4:96.1,IE5:96.8},45:{IE1:92.0,IE2:93.7,IE3:95.2,IE4:96.3,IE5:97.0},
    55:{IE1:92.5,IE2:94.0,IE3:95.4,IE4:96.5,IE5:97.1},75:{IE1:93.0,IE2:94.3,IE3:95.6,IE4:96.7,IE5:97.3},
    90:{IE1:93.2,IE2:94.5,IE3:95.8,IE4:96.8,IE5:97.4},110:{IE1:93.5,IE2:94.7,IE3:96.0,IE4:97.0,IE5:97.5},
    132:{IE1:93.5,IE2:94.7,IE3:96.0,IE4:97.0,IE5:97.6},160:{IE1:93.8,IE2:95.0,IE3:96.2,IE4:97.1,IE5:97.7},
    200:{IE1:94.0,IE2:95.2,IE3:96.3,IE4:97.2,IE5:97.8},250:{IE1:94.0,IE2:95.2,IE3:96.3,IE4:97.2,IE5:97.8},
    315:{IE1:94.0,IE2:95.2,IE3:96.3,IE4:97.2,IE5:97.8},
  },
  4: {
    0.12:{IE1:57.0,IE2:64.0,IE3:69.0,IE4:74.0,IE5:77.0},0.18:{IE1:63.0,IE2:69.0,IE3:74.0,IE4:78.0,IE5:81.0},
    0.25:{IE1:67.0,IE2:73.0,IE3:77.0,IE4:81.0,IE5:83.0},0.37:{IE1:70.0,IE2:75.5,IE3:79.6,IE4:83.0,IE5:85.5},
    0.55:{IE1:72.5,IE2:77.5,IE3:81.4,IE4:84.7,IE5:87.0},0.75:{IE1:75.5,IE2:80.0,IE3:83.8,IE4:86.7,IE5:88.6},
    1.1:{IE1:78.5,IE2:82.0,IE3:85.8,IE4:88.4,IE5:90.1},1.5:{IE1:82.5,IE2:84.0,IE3:87.6,IE4:89.8,IE5:91.4},
    2.2:{IE1:84.0,IE2:86.5,IE3:89.5,IE4:91.3,IE5:92.7},3:{IE1:85.5,IE2:87.5,IE3:90.4,IE4:92.0,IE5:93.3},
    4:{IE1:86.5,IE2:88.5,IE3:91.2,IE4:92.7,IE5:93.9},5.5:{IE1:87.5,IE2:89.5,IE3:92.1,IE4:93.5,IE5:94.5},
    7.5:{IE1:88.5,IE2:90.5,IE3:92.7,IE4:94.0,IE5:95.0},11:{IE1:89.5,IE2:91.5,IE3:93.3,IE4:94.6,IE5:95.5},
    15:{IE1:90.5,IE2:92.1,IE3:93.9,IE4:95.1,IE5:95.9},18.5:{IE1:91.0,IE2:92.6,IE3:94.2,IE4:95.4,IE5:96.2},
    22:{IE1:91.3,IE2:93.0,IE3:94.5,IE4:95.6,IE5:96.4},30:{IE1:92.0,IE2:93.5,IE3:95.0,IE4:96.0,IE5:96.7},
    37:{IE1:92.5,IE2:93.8,IE3:95.3,IE4:96.2,IE5:96.9},45:{IE1:92.8,IE2:94.2,IE3:95.5,IE4:96.4,IE5:97.1},
    55:{IE1:93.0,IE2:94.5,IE3:95.7,IE4:96.6,IE5:97.2},75:{IE1:93.5,IE2:94.7,IE3:96.0,IE4:96.8,IE5:97.4},
    90:{IE1:93.8,IE2:95.0,IE3:96.2,IE4:97.0,IE5:97.5},110:{IE1:94.0,IE2:95.2,IE3:96.3,IE4:97.1,IE5:97.6},
    132:{IE1:94.0,IE2:95.2,IE3:96.3,IE4:97.1,IE5:97.7},160:{IE1:94.2,IE2:95.4,IE3:96.5,IE4:97.2,IE5:97.8},
    200:{IE1:94.5,IE2:95.6,IE3:96.6,IE4:97.3,IE5:97.9},250:{IE1:94.5,IE2:95.6,IE3:96.6,IE4:97.3,IE5:97.9},
    315:{IE1:94.5,IE2:95.6,IE3:96.6,IE4:97.3,IE5:97.9},
  },
  6: {
    0.12:{IE1:55.0,IE2:62.0,IE3:67.0,IE4:72.0,IE5:75.0},0.18:{IE1:61.0,IE2:67.0,IE3:72.0,IE4:76.0,IE5:79.0},
    0.25:{IE1:65.0,IE2:71.0,IE3:75.0,IE4:79.0,IE5:81.5},0.37:{IE1:68.5,IE2:73.5,IE3:78.0,IE4:81.5,IE5:84.0},
    0.55:{IE1:71.0,IE2:76.0,IE3:80.0,IE4:83.5,IE5:85.8},0.75:{IE1:73.5,IE2:78.0,IE3:82.0,IE4:85.2,IE5:87.3},
    1.1:{IE1:76.5,IE2:80.5,IE3:84.1,IE4:87.0,IE5:88.9},1.5:{IE1:79.5,IE2:83.0,IE3:86.0,IE4:88.6,IE5:90.3},
    2.2:{IE1:81.5,IE2:85.0,IE3:87.8,IE4:90.1,IE5:91.6},3:{IE1:83.0,IE2:86.5,IE3:89.1,IE4:91.1,IE5:92.5},
    4:{IE1:84.5,IE2:87.5,IE3:90.0,IE4:91.9,IE5:93.1},5.5:{IE1:85.5,IE2:88.5,IE3:90.9,IE4:92.6,IE5:93.8},
    7.5:{IE1:86.5,IE2:89.5,IE3:91.7,IE4:93.3,IE5:94.4},11:{IE1:88.0,IE2:90.5,IE3:92.5,IE4:94.0,IE5:95.0},
    15:{IE1:89.0,IE2:91.0,IE3:93.1,IE4:94.5,IE5:95.4},18.5:{IE1:89.5,IE2:91.8,IE3:93.5,IE4:94.9,IE5:95.7},
    22:{IE1:90.0,IE2:92.2,IE3:93.8,IE4:95.1,IE5:96.0},30:{IE1:90.7,IE2:92.7,IE3:94.3,IE4:95.5,IE5:96.3},
    37:{IE1:91.2,IE2:93.0,IE3:94.6,IE4:95.7,IE5:96.5},45:{IE1:91.7,IE2:93.3,IE3:94.9,IE4:96.0,IE5:96.7},
    55:{IE1:92.0,IE2:93.7,IE3:95.1,IE4:96.2,IE5:96.9},75:{IE1:92.5,IE2:94.0,IE3:95.4,IE4:96.4,IE5:97.0},
    90:{IE1:92.8,IE2:94.3,IE3:95.6,IE4:96.6,IE5:97.2},110:{IE1:93.1,IE2:94.5,IE3:95.8,IE4:96.7,IE5:97.3},
    132:{IE1:93.1,IE2:94.5,IE3:95.8,IE4:96.7,IE5:97.4},160:{IE1:93.4,IE2:94.8,IE3:96.0,IE4:96.9,IE5:97.5},
    200:{IE1:93.6,IE2:95.0,IE3:96.1,IE4:97.0,IE5:97.6},250:{IE1:93.6,IE2:95.0,IE3:96.1,IE4:97.0,IE5:97.6},
    315:{IE1:93.6,IE2:95.0,IE3:96.1,IE4:97.0,IE5:97.6},
  },
  8: {
    0.12:{IE1:52.0,IE2:59.0,IE3:64.0,IE4:69.5,IE5:73.0},0.18:{IE1:58.0,IE2:64.5,IE3:69.5,IE4:74.0,IE5:77.0},
    0.25:{IE1:62.0,IE2:68.5,IE3:73.0,IE4:77.0,IE5:80.0},0.37:{IE1:65.5,IE2:71.5,IE3:75.5,IE4:79.5,IE5:82.0},
    0.55:{IE1:68.0,IE2:74.0,IE3:78.0,IE4:81.6,IE5:84.0},0.75:{IE1:71.0,IE2:76.5,IE3:80.5,IE4:83.9,IE5:86.0},
    1.1:{IE1:74.0,IE2:79.0,IE3:82.7,IE4:85.8,IE5:87.9},1.5:{IE1:77.0,IE2:81.5,IE3:84.8,IE4:87.6,IE5:89.3},
    2.2:{IE1:79.5,IE2:83.5,IE3:86.8,IE4:89.2,IE5:90.8},3:{IE1:81.5,IE2:85.0,IE3:88.0,IE4:90.2,IE5:91.7},
    4:{IE1:83.0,IE2:86.5,IE3:89.0,IE4:91.1,IE5:92.5},5.5:{IE1:84.5,IE2:87.5,IE3:90.0,IE4:91.9,IE5:93.2},
    7.5:{IE1:86.0,IE2:88.5,IE3:90.9,IE4:92.7,IE5:93.9},11:{IE1:87.5,IE2:89.5,IE3:91.7,IE4:93.3,IE5:94.5},
    15:{IE1:88.5,IE2:90.5,IE3:92.4,IE4:93.9,IE5:94.9},18.5:{IE1:89.0,IE2:91.0,IE3:92.8,IE4:94.3,IE5:95.2},
    22:{IE1:89.5,IE2:91.5,IE3:93.1,IE4:94.5,IE5:95.4},30:{IE1:90.5,IE2:92.0,IE3:93.6,IE4:94.9,IE5:95.8},
    37:{IE1:91.0,IE2:92.5,IE3:94.0,IE4:95.2,IE5:96.0},45:{IE1:91.5,IE2:92.9,IE3:94.3,IE4:95.5,IE5:96.2},
    55:{IE1:92.0,IE2:93.3,IE3:94.6,IE4:95.7,IE5:96.4},75:{IE1:92.5,IE2:93.7,IE3:94.9,IE4:96.0,IE5:96.6},
    90:{IE1:92.8,IE2:94.0,IE3:95.2,IE4:96.1,IE5:96.8},110:{IE1:93.1,IE2:94.2,IE3:95.4,IE4:96.3,IE5:96.9},
    132:{IE1:93.1,IE2:94.2,IE3:95.4,IE4:96.3,IE5:97.0},160:{IE1:93.4,IE2:94.5,IE3:95.6,IE4:96.5,IE5:97.1},
    200:{IE1:93.6,IE2:94.7,IE3:95.8,IE4:96.6,IE5:97.2},250:{IE1:93.6,IE2:94.7,IE3:95.8,IE4:96.6,IE5:97.2},
    315:{IE1:93.6,IE2:94.7,IE3:95.8,IE4:96.6,IE5:97.2},
  },
};

const SAS_PRICE={4:{
  0.12:{IE3:2800,IE4:3800},0.18:{IE3:3200,IE4:4400},0.25:{IE3:3600,IE4:5000},
  0.37:{IE3:4200,IE4:5800},0.55:{IE3:4800,IE4:6600},0.75:{IE3:5600,IE4:7800},
  1.1:{IE3:7200,IE4:9800},1.5:{IE3:8500,IE4:11500},2.2:{IE3:10500,IE4:14200},
  3:{IE3:13200,IE4:17800},4:{IE3:15800,IE4:21500},5.5:{IE3:19500,IE4:26500},
  7.5:{IE3:24500,IE4:33500},11:{IE3:33000,IE4:45500},15:{IE3:42000,IE4:58000},
  18.5:{IE3:50000,IE4:68500},22:{IE3:58000,IE4:79500},30:{IE3:74000,IE4:102000},
  37:{IE3:88000,IE4:122000},45:{IE3:105000,IE4:145000},55:{IE3:126000,IE4:175000},
  75:{IE3:165000,IE4:230000},90:{IE3:195000,IE4:272000},110:{IE3:235000,IE4:328000},
  132:{IE3:278000,IE4:388000},160:{IE3:330000,IE4:462000},200:{IE3:408000,IE4:572000},
}};

const HP_TO_KW={'1/8 HP':0.09,'1/6 HP':0.12,'1/4 HP':0.18,'1/3 HP':0.25,'1/2 HP':0.37,
  '3/4 HP':0.55,'1 HP':0.75,'1.5 HP':1.1,'2 HP':1.5,'3 HP':2.2,'4 HP':3.0,
  '5 HP':3.7,'5.5 HP':4.0,'7.5 HP':5.5,'10 HP':7.5,'15 HP':11,'20 HP':15,
  '25 HP':18.5,'30 HP':22,'40 HP':30,'50 HP':37,'60 HP':45,'75 HP':55,
  '100 HP':75,'125 HP':90,'150 HP':110,'200 HP':132,'250 HP':160,'300 HP':200};

const AGING_DEGRADE={
  '0-2':{pct:0.0},'3-5':{pct:1.5},'6-10':{pct:3.5},'11-15':{pct:5.5},'15+':{pct:8.0}
};
const REWIND_DEGRADE={0:{pct:0.0},1:{pct:2.0},2:{pct:4.5},3:{pct:7.5}};

const KW_OPTIONS=[0.12,0.18,0.25,0.37,0.55,0.75,1.1,1.5,2.2,3,4,5.5,7.5,11,15,18.5,22,30,37,45,55,75,90,110,132,160,200,250,315];
const POLE_OPTIONS=[2,4,6,8];
const ELEC_RATE_THB=4.18;
const WORKING_DAYS=26;

function getClosestKw(kw,pole){
  const avail=Object.keys(IEC_EFF[pole]||IEC_EFF[4]).map(Number);
  return avail.reduce((a,b)=>Math.abs(b-kw)<Math.abs(a-kw)?b:a);
}
function calcPower(kw,eff){return kw/(eff/100);}
function getSasPrice(kw,pole,grade){
  const p=SAS_PRICE[pole]||SAS_PRICE[4];
  const ck=getClosestKw(kw,4);
  const row=p[ck]||p[Object.keys(p).map(Number).reduce((a,b)=>Math.abs(b-kw)<Math.abs(a-kw)?b:a)];
  return row?.[grade]||null;
}
function degradeColor(pct,dark){
  if(pct===0)return dark?{bg:'bg-green-900/40',text:'text-green-400',border:'border-green-600/40',fill:'bg-green-400'}:{bg:'bg-green-50',text:'text-green-700',border:'border-green-300',fill:'bg-green-500'};
  if(pct<3)  return dark?{bg:'bg-yellow-900/40',text:'text-yellow-400',border:'border-yellow-600/40',fill:'bg-yellow-400'}:{bg:'bg-yellow-50',text:'text-yellow-700',border:'border-yellow-300',fill:'bg-yellow-500'};
  if(pct<7)  return dark?{bg:'bg-orange-900/40',text:'text-orange-400',border:'border-orange-600/40',fill:'bg-orange-400'}:{bg:'bg-orange-50',text:'text-orange-700',border:'border-orange-300',fill:'bg-orange-500'};
  return dark?{bg:'bg-red-900/40',text:'text-red-400',border:'border-red-600/40',fill:'bg-red-400'}:{bg:'bg-red-50',text:'text-red-700',border:'border-red-300',fill:'bg-red-500'};
}

// ─── i18n ────────────────────────────────────────────────────────────────────
const T={
  th:{
    back:'← Home',
    brand:'SYNERGY ASIA SOLUTIONS',
    heroTitle1:'มอเตอร์เก่าของคุณ',
    heroTitle2:'กินไฟมากกว่าที่คิดไว้มาก',
    heroSub:'มอเตอร์ที่ใช้มา 5–10 ปี หรือเคยพันใหม่ มี Efficiency จริงต่ำกว่าค่า nameplate อยู่แล้ว ระบบนี้คำนวนจาก Efficiency ที่เสื่อมไปจริง ๆ ไม่ใช่แค่ตัวเลขบนกล่อง',
    riskTitle:'⚠️ ความเสี่ยงที่มองข้ามไม่ได้',
    riskSub:'ทุกวันที่ยังใช้มอเตอร์เก่าอยู่ คุณกำลังจ่ายต้นทุนที่มองไม่เห็น 4 ประการนี้',
    risks:[
      {icon:'💰',title:'ต้นทุนพลังงานที่เพิ่มขึ้นทุกวัน',body:'มอเตอร์ IE1 อายุ 10 ปีที่เคยพันใหม่ 1 ครั้ง มี Efficiency จริงต่ำกว่า nameplate ถึง 5.5–11.5% ความสูญเสียนี้สะสมเป็นค่าไฟ 24 ชั่วโมง 365 วัน'},
      {icon:'🔥',title:'ความร้อนที่ทำลายทุกอย่างรอบข้าง',body:'มอเตอร์ที่มีประสิทธิภาพต่ำจะแปลงพลังงานส่วนเกินเป็นความร้อน ทำให้ฉนวนเสื่อมเร็วขึ้น bearing หมดอายุก่อนกำหนด และเสี่ยงต่อการลุกไหม้'},
      {icon:'🛑',title:'ความเสี่ยงหยุดสาย Production',body:'มอเตอร์เก่าที่อ่อนแอลงมีโอกาส fail กะทันหันสูงกว่ามอเตอร์ใหม่ถึง 3–5 เท่า ค่าเสียหายจากการหยุดสายการผลิต 1 ชั่วโมง มักแพงกว่าราคามอเตอร์ใหม่ทั้งตัว'},
      {icon:'🌍',title:'ต้นทุนคาร์บอนและความรับผิดชอบ',body:'ทุก kWh ที่สูญเสียโดยไม่จำเป็น คือ CO₂ ที่ปล่อยออกสู่ชั้นบรรยากาศโดยเปล่าประโยชน์ บริษัทชั้นนำกำลังถูกประเมิน Carbon Footprint ในห่วงโซ่อุปทาน'},
    ],
    pillar1T:'ความร้อนสะสม',pillar1D:'ทุก 10°C เกิน Class ฉนวน อายุฉนวนลดครึ่งนึง (Arrhenius Law) — Eff ลด 0.5–1% ต่อ 5 ปี',
    pillar2T:'การพันมอเตอร์ใหม่',pillar2D:'EASA/AEMT Rewind Study พบ core loss เพิ่ม 1–5% หมายถึง Eff ลด 1–3% ต่อครั้ง',
    pillar3T:'การสึกหรอทางกล',pillar3D:'Bearing friction และ air gap drift สะสมตามอายุ ทำให้กำลังสูญเสียเพิ่ม 0.2–0.5% ต่อ 5 ปี',
    ieChartTitle:'ระดับประสิทธิภาพ IEC 60034-30-1',ieChartSub:'ยิ่งระดับสูง ยิ่งประหยัดพลังงาน',
    formTitle:'ข้อมูลมอเตอร์ปัจจุบัน',formSub:'กรอกสเปกและสภาพมอเตอร์ที่ใช้งานอยู่ตอนนี้',
    ieLabel:'ระดับมอเตอร์ปัจจุบัน (IE Class)',ieSub:'มอเตอร์เก่าในโรงงานส่วนใหญ่เป็น IE1',
    poleLabel:'จำนวน Pole',poleSub:'4P (1450 rpm) พบมากที่สุดในโรงงาน',
    sizeLabel:'ขนาดมอเตอร์',
    hoursLabel:'ชั่วโมงการทำงาน/วัน',
    hoursOpts:['8 ชม./วัน','16 ชม./วัน','24 ชม./วัน'],
    ageLabel:'อายุการใช้งานมอเตอร์',ageSub:'ความร้อนสะสม + bearing wear ลด Eff จริงทุกปี — อิง IEEE Std 112 / EPRI',
    ageOpts:['ใหม่ (0–2 ปี)','3–5 ปี','6–10 ปี','11–15 ปี','> 15 ปี'],
    ageDescs:['ยังใหม่ ประสิทธิภาพใกล้ nameplate','เริ่มมีความร้อนสะสม ฉนวนเริ่มเสื่อม','ความร้อนสะสมมาก bearing เริ่มสึก','ฉนวนเสื่อมสภาพชัดเจน แรงต้านเพิ่ม','เสื่อมสภาพสูงมาก ความสูญเสียเพิ่มขึ้นมาก'],
    rewindLabel:'เคยพันมอเตอร์ใหม่กี่ครั้ง',rewindSub:'การพันใหม่ที่ไม่ได้มาตรฐานทำให้ stator core เสียหาย — อ้างอิง EASA/AEMT Rewind Study',
    rewindOpts:['ไม่เคยพัน','พันใหม่ 1 ครั้ง','พันใหม่ 2 ครั้ง','พันใหม่ 3+ ครั้ง'],
    rewindDescs:['Core loss ยังเป็นค่าออกแบบเดิม','Core loss เพิ่ม ~1–3% (EASA Study)','Core loss เพิ่มสะสม Eff ลดต่อเนื่อง','Stator core เสียหายสะสม Eff ต่ำมาก'],
    degradeTotal:'ผลรวมการเสื่อมสภาพที่คำนวนได้',degradeNote:'Efficiency จริงต่ำกว่าค่า nameplate',
    qtyLabel:'จำนวนมอเตอร์ (ตัว)',
    compareLabel:'เปรียบเทียบกับ SAS Motor',compareSub:'เลือกได้มากกว่า 1 ระดับ',
    calcBtn:'⚡ คำนวนค่าไฟและความประหยัด',
    resultTitle:'สรุปข้อมูลที่ใช้คำนวน',
    nameplateEff:'Eff ตาม Nameplate',nameplateNote:'ค่าบนป้ายมอเตอร์',
    degradeTotal2:'การเสื่อมสภาพรวม',noDeg:'ไม่มี',
    actualEff:'Eff จริงที่ใช้คำนวน',inputPowerNote:'ดูด',perUnit:'kW/ตัว',
    warnExtra:'กินไฟมากกว่าวันที่เพิ่งซื้อมา','warnSuffix':'คิดเป็นต้นทุนพลังงานที่จ่ายไปโดยเปล่าประโยชน์ทุกวัน',
    sasNew:'SAS Motor ใหม่',effNew:'Eff ใหม่ (ไม่เสื่อม)',
    savingTotal:'ประหยัดพลังงานรวม',
    breakdownTitle:'แบ่งที่มาของการประหยัด (ต่อวัน)',
    fromIE:'🔋 จาก IE Class ที่ดีกว่า',fromDeg:'🔥 จากการเสื่อมสภาพ',
    totalPerDay:'รวมประหยัดได้/วัน',
    perDay:'ประหยัดต่อวัน',perMonth:'ประหยัดต่อเดือน',perYear:'ประหยัดต่อปี',
    unitDay:'บาท/วัน',unitMonth:'บาท/เดือน',unitYear:'บาท/ปี',
    motorCountNote:'ตัว, อ้างอิง',daysUnit:'วัน/เดือน',
    investTitle:'การลงทุน SAS',pricePerUnit:'ราคาโดยประมาณ/ตัว',
    totalInvest:'รวม',paybackIn:'คืนทุนใน',months:'เดือน',
    benefit1:'✅ รับประกัน 18 เดือน',benefit2:'✅ Service Engineer ทั่วประเทศ',benefit3:'✅ ส่งได้ใน 1–3 วันทำการ',benefit4:'✅ มีสต็อกพร้อมจัดส่ง',
    ctaTitle:'สนใจอัปเกรดมอเตอร์?',ctaSub:'ติดต่อทีมงาน Synergy Asia Solutions ได้เลย',
    ctaPhone:'📞 081-921-6225',ctaLine:'💬 LINE: @synergy.as',ctaBack:'ดูสินค้า SAS',
    disclaimer:'* ค่าประสิทธิภาพอ้างอิง IEC 60034-30-1 · ค่าเสื่อมอ้างอิง IEEE Std 112, EPRI, EASA/AEMT · อัตราค่าไฟ 4.18 บาท/หน่วย (MEA/PEA ปี 2567) · ราคาเป็นค่าประมาณการ ไม่รวม VAT',
    vsNote:'เทียบกับ Eff จริงปัจจุบัน',diffNote:'ต่างกัน',
    baht:'บาท',
  },
  en:{
    back:'← Home',
    brand:'SYNERGY ASIA SOLUTIONS',
    heroTitle1:'Your Aging Motor',
    heroTitle2:'Consumes Far More Power Than You Think',
    heroSub:'Motors that have run 5–10 years or been rewound have real Efficiency well below their nameplate. This calculator uses actual degraded Efficiency — not the number on the label.',
    riskTitle:'⚠️ Risks You Cannot Afford to Ignore',
    riskSub:'Every day you keep running the old motor, you are paying four invisible costs.',
    risks:[
      {icon:'💰',title:'Energy Cost Rising Every Day',body:'An IE1 motor aged 10 years with one rewind has real Efficiency 5.5–11.5% below nameplate. This loss compounds as electricity cost 24 hours a day, 365 days a year.'},
      {icon:'🔥',title:'Heat That Destroys Everything Around It',body:'A low-efficiency motor converts excess energy into heat, accelerating insulation breakdown, shortening bearing life, and increasing fire risk.'},
      {icon:'🛑',title:'Risk of Unplanned Production Stoppage',body:'An aging, weakened motor is 3–5× more likely to fail suddenly. One hour of downtime typically costs more than the price of a brand-new motor.'},
      {icon:'🌍',title:'Carbon Cost and Corporate Responsibility',body:'Every unnecessary kWh wasted is CO₂ released for nothing. Leading manufacturers are now being assessed on Carbon Footprint across their supply chain.'},
    ],
    pillar1T:'Thermal Accumulation',pillar1D:'Every 10°C above insulation Class rating halves insulation life (Arrhenius Law) — Eff drops 0.5–1% per 5 years',
    pillar2T:'Motor Rewinding',pillar2D:'EASA/AEMT Rewind Study shows core loss increases 1–5%, meaning Eff drops 1–3% per rewind',
    pillar3T:'Mechanical Wear',pillar3D:'Bearing friction and air gap drift accumulate over time, adding 0.2–0.5% power loss per 5 years',
    ieChartTitle:'IEC 60034-30-1 Efficiency Levels',ieChartSub:'Higher level = more energy savings',
    formTitle:'Current Motor Information',formSub:'Enter the specs and condition of your current motor',
    ieLabel:'Current Motor Level (IE Class)',ieSub:'Most aging factory motors are IE1',
    poleLabel:'Number of Poles',poleSub:'4P (1450 rpm) is most common in factories',
    sizeLabel:'Motor Size',
    hoursLabel:'Working Hours / Day',
    hoursOpts:['8 hrs/day','16 hrs/day','24 hrs/day'],
    ageLabel:'Motor Age',ageSub:'Thermal accumulation + bearing wear reduce actual Eff over time — ref. IEEE Std 112 / EPRI',
    ageOpts:['New (0–2 yrs)','3–5 years','6–10 years','11–15 years','> 15 years'],
    ageDescs:['Still new, Eff close to nameplate','Thermal buildup starting, insulation beginning to degrade','Significant heat buildup, bearing wear starting','Insulation clearly degraded, friction increased','Severely degraded, losses greatly increased'],
    rewindLabel:'Number of Times Rewound',rewindSub:'Non-standard rewinding damages the stator core — ref. EASA/AEMT Rewind Study',
    rewindOpts:['Never rewound','Rewound 1×','Rewound 2×','Rewound 3+×'],
    rewindDescs:['Core loss still at original design value','Core loss +1–3% (EASA Study)','Core loss accumulating, Eff declining','Stator core cumulatively damaged, Eff very low'],
    degradeTotal:'Total Calculated Degradation',degradeNote:'Actual Eff below nameplate',
    qtyLabel:'Number of Motors (units)',
    compareLabel:'Compare with SAS Motor',compareSub:'Select one or more efficiency levels',
    calcBtn:'⚡ Calculate Energy Savings',
    resultTitle:'Calculation Summary',
    nameplateEff:'Nameplate Eff',nameplateNote:'Value on motor label (new)',
    degradeTotal2:'Total Degradation',noDeg:'None',
    actualEff:'Real Eff Used in Calculation',inputPowerNote:'Drawing',perUnit:'kW/unit',
    warnExtra:'Motor is consuming','warnSuffix':'more power than the day it was purchased — paid as wasted energy every single day',
    sasNew:'New SAS Motor',effNew:'New Eff (no degradation)',
    savingTotal:'Total Energy Saving',
    breakdownTitle:'Saving Breakdown (per day)',
    fromIE:'🔋 From better IE Class',fromDeg:'🔥 From degradation recovery',
    totalPerDay:'Total saving/day',
    perDay:'Saving per day',perMonth:'Saving per month',perYear:'Saving per year',
    unitDay:'THB/day',unitMonth:'THB/month',unitYear:'THB/year',
    motorCountNote:'units, ref.',daysUnit:'days/month',
    investTitle:'SAS Investment',pricePerUnit:'Estimated price/unit',
    totalInvest:'Total for',paybackIn:'Payback in',months:'months',
    benefit1:'✅ 18-month warranty',benefit2:'✅ Service Engineers nationwide',benefit3:'✅ Delivery in 1–3 working days',benefit4:'✅ Stock ready to ship',
    ctaTitle:'Ready to upgrade your motors?',ctaSub:'Contact the SAS team now',
    ctaPhone:'📞 081-921-6225',ctaLine:'💬 LINE: @synergy.as',ctaBack:'View SAS Products',
    disclaimer:'* Efficiency ref. IEC 60034-30-1 · Degradation ref. IEEE Std 112, EPRI, EASA/AEMT · Electricity rate 4.18 THB/kWh (MEA/PEA 2024) · Prices are estimates, excl. VAT',
    vsNote:'vs. real current Eff',diffNote:'difference',
    baht:'THB',
  }
};

// ─── Animation hook ──────────────────────────────────────────────────────────
function useInView(ref){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVisible(true);},{threshold:0.15});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[ref]);
  return visible;
}

function AnimCard({children,delay=0,className=''}){
  const ref=useRef(null);
  const vis=useInView(ref);
  return(
    <div ref={ref} className={className}
      style={{opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(28px)',
        transition:`opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`}}>
      {children}
    </div>
  );
}

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimNumber({value,decimals=0,duration=1200}){
  const [disp,setDisp]=useState(0);
  const prev=useRef(0);
  useEffect(()=>{
    const start=prev.current;const end=value;const startT=performance.now();
    const step=(now)=>{
      const t=Math.min((now-startT)/duration,1);
      const ease=1-Math.pow(1-t,3);
      setDisp(start+(end-start)*ease);
      if(t<1)requestAnimationFrame(step);else{prev.current=end;setDisp(end);}
    };
    requestAnimationFrame(step);
  },[value,duration]);
  return <>{Number(disp).toLocaleString('th-TH',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}</>;
}

// ─── Progress bar ────────────────────────────────────────────────────────────
function ProgressBar({pct,color,dark}){
  const [w,setW]=useState(0);
  useEffect(()=>{const t=setTimeout(()=>setW(pct),120);return()=>clearTimeout(t);},[pct]);
  return(
    <div className={`w-full h-2 rounded-full ${dark?'bg-white/10':'bg-gray-200'} overflow-hidden`}>
      <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{width:`${w}%`}}/>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function ElectricityCalculator({onBack}){
  const [lang,setLang]=useState('th');
  const [dark,setDark]=useState(true);
  const [inputMode,setInputMode]=useState('kw');
  const [currentIE,setCurrentIE]=useState('IE1');
  const [currentKw,setCurrentKw]=useState(7.5);
  const [currentHp,setCurrentHp]=useState('10 HP');
  const [pole,setPole]=useState(4);
  const [hoursPerDay,setHoursPerDay]=useState(8);
  const [motorQty,setMotorQty]=useState(1);
  const [compareGrades,setCompareGrades]=useState(['IE3','IE4']);
  const [motorAge,setMotorAge]=useState('6-10');
  const [rewindCount,setRewindCount]=useState(0);
  const [result,setResult]=useState(null);
  const [showResult,setShowResult]=useState(false);
  const [calcPressed,setCalcPressed]=useState(false);
  const resultRef=useRef(null);
  const t=T[lang];

  const ageKeys=['0-2','3-5','6-10','11-15','15+'];
  const rewindKeys=[0,1,2,3];
  const effectiveKw=inputMode==='hp'?(HP_TO_KW[currentHp]||7.5):currentKw;
  const agingPct=AGING_DEGRADE[motorAge]?.pct||0;
  const rewindPct=REWIND_DEGRADE[rewindCount]?.pct||0;
  const totalDegradePct=agingPct+rewindPct;
  const dc=degradeColor(totalDegradePct,dark);

  const bg=dark?'bg-gray-950 text-white':'bg-gray-50 text-gray-900';
  const card=dark?'bg-white/5 border-white/10':'bg-white border-gray-200';
  const cardBorder=dark?'border-white/10':'border-gray-200';
  const subText=dark?'text-white/50':'text-gray-500';
  const labelText=dark?'text-white/40':'text-gray-400';
  const mutedText=dark?'text-white/30':'text-gray-400';
  const inputBg=dark?'bg-white/10 border-white/15 text-white':'bg-gray-100 border-gray-300 text-gray-900';
  const btnBase=dark?'border-white/15 text-white/50 hover:border-white/30 hover:text-white/80':'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700';

  const gradeColor={
    IE3:{bg:'bg-emerald-500',text:dark?'text-emerald-400':'text-emerald-600',glow:'shadow-emerald-500/25'},
    IE4:{bg:'bg-blue-500',   text:dark?'text-blue-400':'text-blue-600',      glow:'shadow-blue-500/25'},
    IE5:{bg:'bg-purple-500', text:dark?'text-purple-400':'text-purple-600',  glow:'shadow-purple-500/25'},
  };

  const handleCalculate=()=>{
    setCalcPressed(true);
    const closestKw=getClosestKw(effectiveKw,pole);
    const effRow=(IEC_EFF[pole]||IEC_EFF[4])[closestKw];
    if(!effRow)return;
    const nameplateEff=effRow[currentIE];
    const effActual=Math.max(nameplateEff*(1-totalDegradePct/100),30);
    const inputPower=calcPower(closestKw,effActual);
    const inputPowerNameplate=calcPower(closestKw,nameplateEff);
    const comparisons=compareGrades.map(grade=>{
      const sasEff=effRow[grade];
      const sasPower=calcPower(closestKw,sasEff);
      const savingKw=inputPower-sasPower;
      const savingPct=(savingKw/inputPower)*100;
      const savingVsNameplate=inputPowerNameplate-sasPower;
      const savingFromDegrade=inputPower-inputPowerNameplate;
      const savingPerDay=savingKw*hoursPerDay*ELEC_RATE_THB*motorQty;
      const savingPerMonth=savingPerDay*WORKING_DAYS;
      const savingPerYear=savingPerDay*365;
      const price=getSasPrice(closestKw,pole,grade);
      const totalInvest=price?price*motorQty:null;
      const paybackMonths=(totalInvest&&savingPerMonth>0)?totalInvest/savingPerMonth:null;
      return{grade,sasEff,sasPower,savingKw,savingPct,savingVsNameplate,savingFromDegrade,
        savingPerDay,savingPerMonth,savingPerYear,price,totalInvest,paybackMonths};
    });
    setResult({closestKw,pole,hoursPerDay,motorQty,currentIE,nameplateEff,effActual,
      totalDegradePct,agingPct,rewindPct,inputPower,inputPowerNameplate,comparisons});
    setShowResult(true);
    setTimeout(()=>resultRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),150);
  };

  const fmt=(n,d=0)=>n==null?'–':Number(n).toLocaleString('th-TH',{minimumFractionDigits:d,maximumFractionDigits:d});

  return(
    <div className={`min-h-screen font-sans transition-colors duration-300 ${bg}`}>
      <style>{`
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse-ring{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)}50%{box-shadow:0 0 0 8px rgba(16,185,129,0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes scanline{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        .fade-up{animation:fadeSlideUp 0.6s ease both}
        .shimmer-text{background:linear-gradient(90deg,#34d399,#06b6d4,#34d399);background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:shimmer 3s linear infinite}
        .pulse-btn{animation:pulse-ring 2.5s infinite}
        .float-icon{animation:float 3s ease-in-out infinite}
        .scan-btn:after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
          animation:scanline 2s ease-in-out infinite}
        .risk-card:hover{transform:translateY(-3px);transition:transform 0.25s ease}
      `}</style>

      {/* ══ TOP NAV BAR ════════════════════════════════════════════════ */}
      <div className={`sticky top-0 z-50 border-b ${dark?'bg-gray-950/90 border-white/10 backdrop-blur-md':'bg-white/90 border-gray-200 backdrop-blur-md'}`}>
        <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between">
          <button onClick={onBack}
            className={`flex items-center gap-1.5 text-xs font-medium transition-all hover:gap-2.5 ${dark?'text-white/50 hover:text-white':'text-gray-500 hover:text-gray-900'}`}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.back}
          </button>
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className={`flex rounded-lg overflow-hidden border text-xs font-bold ${dark?'border-white/15':'border-gray-300'}`}>
              {['th','en'].map(l=>(
                <button key={l} onClick={()=>setLang(l)}
                  className={`px-2.5 py-1 transition-all ${lang===l?(dark?'bg-emerald-500 text-white':'bg-emerald-500 text-white'):(dark?'text-white/40 hover:text-white/70':'text-gray-400 hover:text-gray-700')}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Dark/Light toggle */}
            <button onClick={()=>setDark(d=>!d)}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center text-base transition-all ${dark?'border-white/15 hover:bg-white/10':'border-gray-300 hover:bg-gray-100'}`}>
              {dark?'☀️':'🌙'}
            </button>
          </div>
        </div>
      </div>

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <div className={`relative overflow-hidden ${dark?'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950':'bg-gradient-to-br from-slate-100 via-white to-emerald-50'} border-b ${cardBorder}`}>
        {/* Grid bg */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{opacity:dark?0.035:0.06}}>
          <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0L0 0 0 40" fill="none" stroke={dark?'#60a5fa':'#10b981'} strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>

        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-10">
          <div className="flex items-center gap-2 mb-3 fade-up">
            <span className="text-[10px] uppercase tracking-[0.22em] text-emerald-400 font-bold">{t.brand}</span>
            <span className={`h-px flex-1 bg-gradient-to-r from-emerald-400/50 to-transparent`}/>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-3 fade-up">
            {t.heroTitle1}<br/>
            <span className="shimmer-text">{t.heroTitle2}</span>
          </h1>
          <p className={`text-sm leading-relaxed mb-6 max-w-xl fade-up ${subText}`}>{t.heroSub}</p>

          {/* 3 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              {icon:'🌡️',title:t.pillar1T,desc:t.pillar1D,delay:0},
              {icon:'🔧',title:t.pillar2T,desc:t.pillar2D,delay:80},
              {icon:'⚙️',title:t.pillar3T,desc:t.pillar3D,delay:160},
            ].map(p=>(
              <AnimCard key={p.title} delay={p.delay}
                className={`rounded-xl p-4 border ${card} ${cardBorder}`}>
                <div className="text-2xl mb-2 float-icon" style={{animationDelay:`${p.delay}ms`}}>{p.icon}</div>
                <div className={`text-sm font-bold mb-1 ${dark?'text-white/90':'text-gray-800'}`}>{p.title}</div>
                <div className={`text-xs leading-relaxed ${subText}`}>{p.desc}</div>
              </AnimCard>
            ))}
          </div>

          {/* IE bar chart */}
          <AnimCard className={`rounded-xl p-4 border ${card} ${cardBorder}`}>
            <p className={`text-xs uppercase tracking-widest mb-3 font-semibold ${labelText}`}>{t.ieChartTitle}</p>
            <div className="flex items-end gap-2">
              {[
                {label:'IE1',pct:55,col:'bg-gray-400'},
                {label:'IE2',pct:65,col:'bg-yellow-400'},
                {label:'IE3',pct:76,col:'bg-emerald-400'},
                {label:'IE4',pct:88,col:'bg-blue-400'},
                {label:'IE5',pct:100,col:'bg-purple-400'},
              ].map((b,i)=>{
                const [h,setH]=useState(0);
                useEffect(()=>{const t2=setTimeout(()=>setH(b.pct*0.65),200+i*80);return()=>clearTimeout(t2);},[]);
                return(
                  <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full rounded-t-md ${b.col} transition-all duration-700`}
                      style={{height:`${h}px`,opacity:0.85}}/>
                    <span className={`text-[11px] font-bold ${dark?'text-white/60':'text-gray-500'}`}>{b.label}</span>
                  </div>
                );
              })}
            </div>
            <p className={`text-[10px] mt-2 text-right ${mutedText}`}>{t.ieChartSub}</p>
          </AnimCard>
        </div>
      </div>

      {/* ══ RISK SECTION ════════════════════════════════════════════════ */}
      <div className={`${dark?'bg-gray-900/50':'bg-red-50/70'} border-b ${cardBorder}`}>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <AnimCard>
            <h2 className={`text-xl font-black mb-1 ${dark?'text-red-400':'text-red-600'}`}>{t.riskTitle}</h2>
            <p className={`text-sm mb-6 ${subText}`}>{t.riskSub}</p>
          </AnimCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.risks.map((r,i)=>(
              <AnimCard key={i} delay={i*90}
                className={`risk-card rounded-2xl p-5 border ${dark?'bg-white/5 border-white/10':'bg-white border-red-100'} cursor-default`}>
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className={`text-sm font-bold mb-2 ${dark?'text-white/90':'text-gray-800'}`}>{r.title}</h3>
                <p className={`text-xs leading-relaxed ${subText}`}>{r.body}</p>
              </AnimCard>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FORM ════════════════════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimCard>
          <h2 className={`text-xl font-bold mb-1 ${dark?'text-white/90':'text-gray-900'}`}>{t.formTitle}</h2>
          <p className={`text-sm mb-6 ${subText}`}>{t.formSub}</p>
        </AnimCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* IE Class */}
          <AnimCard delay={0} className={`rounded-2xl p-4 border ${card} ${cardBorder}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${labelText}`}>{t.ieLabel}</p>
            <div className="flex gap-2 flex-wrap">
              {['IE1','IE2','IE3'].map(ie=>(
                <button key={ie} onClick={()=>setCurrentIE(ie)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${currentIE===ie?'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/25 scale-105':btnBase}`}>
                  {ie}
                </button>
              ))}
            </div>
            <p className={`text-[11px] mt-2 ${mutedText}`}>{t.ieSub}</p>
          </AnimCard>

          {/* Pole */}
          <AnimCard delay={60} className={`rounded-2xl p-4 border ${card} ${cardBorder}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${labelText}`}>{t.poleLabel}</p>
            <div className="flex gap-2">
              {POLE_OPTIONS.map(p=>(
                <button key={p} onClick={()=>setPole(p)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border ${pole===p?(dark?'bg-white text-gray-900 border-white shadow scale-105':'bg-gray-900 text-white border-gray-900 shadow scale-105'):btnBase}`}>
                  {p}P
                </button>
              ))}
            </div>
            <p className={`text-[11px] mt-2 ${mutedText}`}>{t.poleSub}</p>
          </AnimCard>

          {/* kW/HP */}
          <AnimCard delay={120} className={`rounded-2xl p-4 border ${card} ${cardBorder}`}>
            <div className="flex items-center justify-between mb-3">
              <p className={`text-xs font-semibold uppercase tracking-widest ${labelText}`}>{t.sizeLabel}</p>
              <div className={`flex rounded-lg overflow-hidden border text-xs ${dark?'border-white/15':'border-gray-300'}`}>
                {['kw','hp'].map(m=>(
                  <button key={m} onClick={()=>setInputMode(m)}
                    className={`px-2.5 py-1 font-bold transition-all ${inputMode===m?(dark?'bg-white text-gray-900':'bg-gray-900 text-white'):(dark?'text-white/40':'text-gray-500')}`}>
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            {inputMode==='kw'?(
              <select value={currentKw} onChange={e=>setCurrentKw(Number(e.target.value))}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 ${inputBg}`}>
                {KW_OPTIONS.map(kw=><option key={kw} value={kw} className={dark?'bg-gray-800':'bg-white'}>{kw} kW</option>)}
              </select>
            ):(
              <select value={currentHp} onChange={e=>setCurrentHp(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 ${inputBg}`}>
                {Object.keys(HP_TO_KW).map(hp=><option key={hp} value={hp} className={dark?'bg-gray-800':'bg-white'}>{hp} ({HP_TO_KW[hp]} kW)</option>)}
              </select>
            )}
          </AnimCard>

          {/* Hours */}
          <AnimCard delay={180} className={`rounded-2xl p-4 border ${card} ${cardBorder}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${labelText}`}>{t.hoursLabel}</p>
            <div className="flex gap-2">
              {[8,16,24].map((h,i)=>(
                <button key={h} onClick={()=>setHoursPerDay(h)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${hoursPerDay===h?(dark?'bg-white text-gray-900 border-white shadow scale-105':'bg-gray-900 text-white border-gray-900 shadow scale-105'):btnBase}`}>
                  {t.hoursOpts[i]}
                </button>
              ))}
            </div>
          </AnimCard>

          {/* Motor Age */}
          <AnimCard delay={0} className={`rounded-2xl p-4 border sm:col-span-2 ${dark?'bg-orange-500/5 border-orange-500/20':'bg-orange-50 border-orange-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">🕐</span>
              <p className={`text-xs font-semibold uppercase tracking-widest ${dark?'text-orange-300/80':'text-orange-700'}`}>{t.ageLabel}</p>
            </div>
            <p className={`text-[11px] mb-3 ${mutedText}`}>{t.ageSub}</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {ageKeys.map((k,i)=>(
                <button key={k} onClick={()=>setMotorAge(k)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center ${motorAge===k?'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/25 scale-105':(dark?'border-white/10 text-white/40 hover:border-orange-400/50':'border-orange-200 text-orange-600/60 hover:border-orange-400')}`}>
                  <div>{t.ageOpts[i]}</div>
                  {AGING_DEGRADE[k].pct>0&&<div className="text-[10px] mt-0.5 opacity-75">-{AGING_DEGRADE[k].pct}% Eff</div>}
                </button>
              ))}
            </div>
            {motorAge&&<p className={`text-[11px] mt-2 ${dark?'text-orange-300/60':'text-orange-600'}`}>{t.ageDescs[ageKeys.indexOf(motorAge)]}</p>}
          </AnimCard>

          {/* Rewind */}
          <AnimCard delay={0} className={`rounded-2xl p-4 border sm:col-span-2 ${dark?'bg-red-500/5 border-red-500/20':'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">🔧</span>
              <p className={`text-xs font-semibold uppercase tracking-widest ${dark?'text-red-300/80':'text-red-700'}`}>{t.rewindLabel}</p>
            </div>
            <p className={`text-[11px] mb-3 ${mutedText}`}>{t.rewindSub}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {rewindKeys.map((k,i)=>(
                <button key={k} onClick={()=>setRewindCount(k)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center ${rewindCount===k?'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/25 scale-105':(dark?'border-white/10 text-white/40 hover:border-red-400/50':'border-red-200 text-red-600/60 hover:border-red-400')}`}>
                  <div>{t.rewindOpts[i]}</div>
                  {REWIND_DEGRADE[k].pct>0&&<div className="text-[10px] mt-0.5 opacity-75">-{REWIND_DEGRADE[k].pct}% Eff</div>}
                </button>
              ))}
            </div>
            {<p className={`text-[11px] mt-2 ${dark?'text-red-300/60':'text-red-600'}`}>{t.rewindDescs[rewindCount]}</p>}
          </AnimCard>

          {/* Live Degrade Preview */}
          {totalDegradePct>0&&(
            <AnimCard delay={0} className={`rounded-2xl p-4 border sm:col-span-2 ${dc.bg} ${dc.border}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex-1 min-w-0">
                  <p className={`text-xs uppercase tracking-widest mb-1 font-semibold ${labelText}`}>{t.degradeTotal}</p>
                  <p className={`text-sm ${subText}`}>
                    {t.ageLabel}: <span className={`font-bold ${dark?'text-white':'text-gray-900'}`}>-{agingPct}%</span>
                    <span className="mx-2 opacity-30">+</span>
                    {t.rewindLabel}: <span className={`font-bold ${dark?'text-white':'text-gray-900'}`}>-{rewindPct}%</span>
                  </p>
                  <p className={`text-xs mt-1 ${mutedText}`}>{t.degradeNote} {totalDegradePct.toFixed(1)}%</p>
                </div>
                <div className={`shrink-0 text-right px-4 py-2.5 rounded-xl border ${dc.border} ${dc.bg}`}>
                  <p className={`text-[10px] mb-0.5 ${mutedText}`}>Eff lost</p>
                  <p className={`text-2xl font-black ${dc.text}`}>-{totalDegradePct.toFixed(1)}%</p>
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar pct={Math.min(totalDegradePct*5,100)} color={dc.fill} dark={dark}/>
              </div>
            </AnimCard>
          )}

          {/* Qty */}
          <AnimCard delay={60} className={`rounded-2xl p-4 border ${card} ${cardBorder}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${labelText}`}>{t.qtyLabel}</p>
            <div className="flex items-center gap-2">
              <button onClick={()=>setMotorQty(q=>Math.max(1,q-1))}
                className={`w-9 h-9 rounded-xl border font-bold text-lg flex items-center justify-center transition-all active:scale-95 ${dark?'border-white/20 text-white hover:bg-white/10':'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>−</button>
              <input type="number" min="1" value={motorQty}
                onChange={e=>setMotorQty(Math.max(1,parseInt(e.target.value)||1))}
                className={`flex-1 border rounded-xl px-3 py-2 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400/40 ${inputBg}`}/>
              <button onClick={()=>setMotorQty(q=>q+1)}
                className={`w-9 h-9 rounded-xl border font-bold text-lg flex items-center justify-center transition-all active:scale-95 ${dark?'border-white/20 text-white hover:bg-white/10':'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>+</button>
            </div>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {[1,10,20,54,100].map(n=>(
                <button key={n} onClick={()=>setMotorQty(n)}
                  className={`text-xs px-2 py-1 rounded-lg border transition-all active:scale-95 ${motorQty===n?(dark?'bg-white/20 border-white/40 text-white':'bg-gray-900 border-gray-900 text-white'):(dark?'border-white/10 text-white/35 hover:text-white/65':'border-gray-200 text-gray-400 hover:text-gray-600')}`}>
                  {n}{lang==='th'?' ตัว':' u.'}
                </button>
              ))}
            </div>
          </AnimCard>

          {/* Compare */}
          <AnimCard delay={120} className={`rounded-2xl p-4 border ${card} ${cardBorder}`}>
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${labelText}`}>{t.compareLabel}</p>
            <div className="flex gap-2 flex-wrap">
              {['IE3','IE4','IE5'].map(g=>(
                <button key={g}
                  onClick={()=>setCompareGrades(prev=>prev.includes(g)?prev.filter(x=>x!==g):[...prev,g])}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${compareGrades.includes(g)?`${gradeColor[g].bg} border-transparent text-white shadow-lg ${gradeColor[g].glow} scale-105`:btnBase}`}>
                  SAS {g}
                </button>
              ))}
            </div>
            <p className={`text-[11px] mt-2 ${mutedText}`}>{t.compareSub}</p>
          </AnimCard>
        </div>

        {/* Calc button */}
        <AnimCard delay={0} className="mt-6">
          <button onClick={handleCalculate} disabled={compareGrades.length===0}
            className={`scan-btn relative w-full py-4 rounded-2xl text-base font-black tracking-wide overflow-hidden
              bg-gradient-to-r from-emerald-500 to-cyan-500
              hover:from-emerald-400 hover:to-cyan-400
              active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed
              shadow-xl shadow-emerald-500/25 transition-all duration-200
              ${calcPressed?'':'pulse-btn'}`}>
            {t.calcBtn}
          </button>
        </AnimCard>

        {/* ══ RESULTS ════════════════════════════════════════════════ */}
        {showResult&&result&&(
          <div ref={resultRef} className="mt-10 space-y-5">

            {/* Summary */}
            <AnimCard className={`rounded-2xl p-5 border ${card} ${cardBorder}`}>
              <p className={`text-xs uppercase tracking-widest mb-3 font-semibold ${labelText}`}>{t.resultTitle}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  {label:t.ieLabel.split('(')[0].trim(),val:result.currentIE},
                  {label:t.sizeLabel,val:`${result.closestKw} kW`},
                  {label:t.poleLabel,val:`${result.pole}P`},
                  {label:t.hoursLabel,val:`${result.hoursPerDay}h`},
                ].map(x=>(
                  <div key={x.label} className={`rounded-xl p-3 text-center ${dark?'bg-white/5':'bg-gray-100'}`}>
                    <p className={`text-[10px] mb-1 ${mutedText}`}>{x.label}</p>
                    <p className={`text-sm font-bold ${dark?'text-white':'text-gray-900'}`}>{x.val}</p>
                  </div>
                ))}
              </div>

              {/* 3-column efficiency comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`rounded-xl p-4 text-center border ${dark?'bg-blue-500/10 border-blue-500/25':'bg-blue-50 border-blue-200'}`}>
                  <p className={`text-[10px] uppercase tracking-widest mb-1 ${dark?'text-blue-300/70':'text-blue-600'}`}>{t.nameplateEff}</p>
                  <p className={`text-3xl font-black ${dark?'text-blue-300':'text-blue-600'}`}>
                    <AnimNumber value={result.nameplateEff} decimals={1}/>%
                  </p>
                  <p className={`text-[11px] mt-1 ${mutedText}`}>{t.nameplateNote}</p>
                </div>

                <div className={`rounded-xl p-4 text-center border ${degradeColor(result.totalDegradePct,dark).bg} ${degradeColor(result.totalDegradePct,dark).border}`}>
                  <p className={`text-[10px] uppercase tracking-widest mb-1 ${degradeColor(result.totalDegradePct,dark).text}`}>{t.degradeTotal2}</p>
                  <p className={`text-3xl font-black ${degradeColor(result.totalDegradePct,dark).text}`}>
                    {result.totalDegradePct>0?`-${result.totalDegradePct.toFixed(1)}%`:t.noDeg}
                  </p>
                  <p className={`text-[11px] mt-1 ${mutedText}`}>{t.ageLabel} -{result.agingPct}% + {t.rewindLabel.split(' ')[0]} -{result.rewindPct}%</p>
                </div>

                <div className={`rounded-xl p-4 text-center border ${dark?'bg-red-500/10 border-red-500/25':'bg-red-50 border-red-200'}`}>
                  <p className={`text-[10px] uppercase tracking-widest mb-1 ${dark?'text-red-300/70':'text-red-600'}`}>{t.actualEff}</p>
                  <p className={`text-3xl font-black ${dark?'text-red-300':'text-red-600'}`}>
                    <AnimNumber value={result.effActual} decimals={1}/>%
                  </p>
                  <p className={`text-[11px] mt-1 ${mutedText}`}>{t.inputPowerNote} <AnimNumber value={result.inputPower} decimals={3}/> {t.perUnit}</p>
                </div>
              </div>

              {result.totalDegradePct>0&&(
                <div className={`mt-3 flex items-start gap-2 text-xs rounded-xl p-3 ${dark?'bg-orange-500/10':'bg-orange-50'}`}>
                  <span className="shrink-0 mt-0.5">⚠️</span>
                  <span className={dark?'text-orange-300/80':'text-orange-700'}>
                    {t.warnExtra} <b>{((result.inputPower/result.inputPowerNameplate-1)*100).toFixed(1)}%</b> {t.warnSuffix}
                  </span>
                </div>
              )}
            </AnimCard>

            {/* Result cards */}
            <div className={`grid grid-cols-1 ${result.comparisons.length>1?'sm:grid-cols-2':''} gap-4`}>
              {result.comparisons.map((c,ci)=>{
                const clr=gradeColor[c.grade]||gradeColor.IE3;
                return(
                  <AnimCard key={c.grade} delay={ci*80} className="rounded-2xl border border-white/10 overflow-hidden">
                    {/* Header */}
                    <div className={`${clr.bg} px-5 py-4`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-white/65 uppercase tracking-wider">{t.sasNew}</p>
                          <p className="text-2xl font-black text-white">{c.grade}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/65">{t.effNew}</p>
                          <p className="text-2xl font-black text-white">{c.sasEff}%</p>
                        </div>
                      </div>
                      <ProgressBar pct={c.sasEff} color="bg-white/80" dark={true}/>
                      <p className="text-[11px] text-white/50 mt-1.5">
                        {t.vsNote} {result.effActual.toFixed(1)}% → {t.diffNote} <b className="text-white">{(c.sasEff-result.effActual).toFixed(1)} pp</b>
                      </p>
                    </div>

                    {/* Body */}
                    <div className={`p-5 space-y-3 ${dark?'bg-gray-900/80':'bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${subText}`}>{t.savingTotal}</span>
                        <span className={`text-2xl font-black ${clr.text}`}>
                          +<AnimNumber value={c.savingPct} decimals={2}/>%
                        </span>
                      </div>

                      {result.totalDegradePct>0&&(
                        <div className={`rounded-xl p-3 space-y-2 text-xs ${dark?'bg-white/5':'bg-gray-50'}`}>
                          <p className={`text-[10px] uppercase tracking-widest font-semibold mb-1 ${labelText}`}>{t.breakdownTitle}</p>
                          <div className="flex justify-between items-center">
                            <span className={subText}>{t.fromIE}</span>
                            <span className={`font-bold ${dark?'text-blue-300':'text-blue-600'}`}>
                              {fmt(c.savingVsNameplate*hoursPerDay*ELEC_RATE_THB*motorQty,2)} {t.baht}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={subText}>{t.fromDeg}</span>
                            <span className={`font-bold ${dark?'text-orange-300':'text-orange-600'}`}>
                              {fmt(c.savingFromDegrade*hoursPerDay*ELEC_RATE_THB*motorQty,2)} {t.baht}
                            </span>
                          </div>
                          <div className={`h-px ${dark?'bg-white/10':'bg-gray-200'}`}/>
                          <div className="flex justify-between font-bold">
                            <span className={subText}>{t.totalPerDay}</span>
                            <span className={dark?'text-emerald-400':'text-emerald-600'}>{fmt(c.savingPerDay,2)} {t.baht}</span>
                          </div>
                        </div>
                      )}

                      <div className={`h-px ${dark?'bg-white/5':'bg-gray-100'}`}/>

                      {[
                        {label:t.perDay,val:c.savingPerDay,unit:t.unitDay},
                        {label:t.perMonth,val:c.savingPerMonth,unit:t.unitMonth},
                        {label:t.perYear,val:c.savingPerYear,unit:t.unitYear},
                      ].map(row=>(
                        <div key={row.label} className="flex items-center justify-between">
                          <span className={`text-sm ${subText}`}>{row.label}</span>
                          <div className="text-right">
                            <span className={`text-base font-bold ${dark?'text-white':'text-gray-900'}`}>
                              <AnimNumber value={row.val} decimals={2}/>
                            </span>
                            <span className={`text-xs ml-1 ${mutedText}`}>{row.unit}</span>
                          </div>
                        </div>
                      ))}

                      {result.motorQty>1&&<p className={`text-[11px] ${mutedText}`}>* {result.motorQty} {t.motorCountNote} {WORKING_DAYS} {t.daysUnit}</p>}

                      {c.price&&(
                        <>
                          <div className={`h-px ${dark?'bg-white/5':'bg-gray-100'}`}/>
                          <div className={`rounded-xl p-4 space-y-2 ${dark?'bg-white/5':'bg-gray-50'}`}>
                            <p className={`text-xs font-semibold uppercase tracking-wider ${labelText}`}>{t.investTitle}</p>
                            <div className="flex justify-between text-sm">
                              <span className={subText}>{t.pricePerUnit}</span>
                              <span className={`font-bold ${dark?'text-white':'text-gray-900'}`}>{fmt(c.price)} {t.baht}</span>
                            </div>
                            {result.motorQty>1&&(
                              <div className="flex justify-between text-sm">
                                <span className={subText}>{t.totalInvest} {result.motorQty} {lang==='th'?'ตัว':'units'}</span>
                                <span className={`font-bold ${dark?'text-white':'text-gray-900'}`}>{fmt(c.totalInvest)} {t.baht}</span>
                              </div>
                            )}
                            {c.paybackMonths&&(
                              <div className="flex justify-between items-center pt-1">
                                <span className={`text-sm ${subText}`}>{t.paybackIn}</span>
                                <span className={`text-xl font-black ${c.paybackMonths<=12?'text-emerald-400':c.paybackMonths<=24?(dark?'text-blue-400':'text-blue-600'):(dark?'text-white/70':'text-gray-600')}`}>
                                  <AnimNumber value={c.paybackMonths<=1?1:c.paybackMonths} decimals={c.paybackMonths<1?0:1}/> {t.months}
                                </span>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="mt-1 space-y-1.5">
                        {[t.benefit1,t.benefit2,t.benefit3,t.benefit4].map(b=>(
                          <p key={b} className={`text-xs ${subText}`}>{b}</p>
                        ))}
                      </div>
                    </div>
                  </AnimCard>
                );
              })}
            </div>

            {/* CTA */}
            <AnimCard className={`rounded-2xl p-6 text-center border ${dark?'bg-gradient-to-br from-emerald-900/60 to-cyan-900/40 border-emerald-500/25':'bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-300'}`}>
              <p className={`text-sm font-semibold mb-1 ${dark?'text-emerald-300':'text-emerald-600'}`}>{t.ctaTitle}</p>
              <p className={`text-2xl font-black mb-5 ${dark?'text-white':'text-gray-900'}`}>{t.ctaSub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:0819216225"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-emerald-500/25">
                  {t.ctaPhone}
                </a>
                <a href="https://line.me/R/ti/p/@synergy.as" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#06C755] hover:bg-[#04a844] text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-green-500/25">
                  {t.ctaLine}
                </a>
                <button onClick={onBack}
                  className={`px-6 py-3 rounded-xl border font-bold text-sm transition-all active:scale-95 ${dark?'border-white/20 text-white/60 hover:text-white hover:border-white/40':'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400'}`}>
                  {t.ctaBack}
                </button>
              </div>
              <p className={`text-xs mt-5 max-w-lg mx-auto ${mutedText}`}>{t.disclaimer}</p>
            </AnimCard>
          </div>
        )}
      </div>
    </div>
  );
}
