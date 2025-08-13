import React, { useState, useEffect } from 'react';
import ACMotorFlow, { renderRKFSFlow, productList, generateModelCode, renderHypoidGearFlow, renderBLDCGearFlow, generateBLDCModelCode } from './components/MotorFlows.js';
import bgImage from './assets/GearBG2.png';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import K3D from './assets/3Dgif/K3D.gif';
import KB3D from './assets/3Dgif/KB3D.gif';
import RC3D from './assets/3Dgif/RC3D.gif';
import RT3D from './assets/3Dgif/RT3D.gif';

import F2A from './assets/hypoid/F2A.gif';
import F2H from './assets/hypoid/F2H.gif';
import F3A from './assets/hypoid/F3A.gif';
import F3H from './assets/hypoid/F3H.gif';
import hourglass from './assets/hourglass.gif';

// ====== Utilities: BLDC filename mapper ======
function mapBLDCDownloadFilename(modelCode) {
  if (typeof modelCode !== 'string') return null;
  const raw = modelCode.trim();
  if (!raw) return null;

  const parts = raw.split('-');
  if (parts.length < 5) return null;
  const [p0, p1, p2, p3, p4] = parts.slice(0, 5);

  // Nol: รองรับแรงดัน 24/36/48 → p1=XX, p3=XXX, และรีเซ็ตตัวเลขกลางในพาร์ตท้ายเป็น "XX"
  if (['24', '36', '48'].includes(p1)) {
    const replacedP4 = p4.replace(
      /^((?:\d+GN|\d+GU))(\d+)([A-Za-z]+)$/,
      (_m, head, _num, tail) => `${head}XX${tail}`
    );
    return `${p0}-XX-${p2}-XXX-${replacedP4}`;
  }

  // HE: 220 → คง p0,p1,p2,p4; เปลี่ยน p3 เป็น "XXX"
  if (p1 === '220') {
    return `${p0}-${p1}-${p2}-XXX-${p4}`;
  }

  return null;
}

function mapBLDCDownloadURL(modelCode) {
  const name = mapBLDCDownloadFilename(modelCode);
  if (!name) return null;
  const base = (typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL) || '';
  return `${base}/model/${encodeURIComponent(name)}.STEP`;
}


function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modelCodeList, setModelCodeList] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', company: '', email: '' });
  const [isDownloading, setIsDownloading] = useState(false);

  const [acMotorType, setAcMotorType] = useState(null);
  const [acPower, setAcPower] = useState(null);
  const [acSpeedAdjust, setAcSpeedAdjust] = useState(null);
  const [acVoltage, setAcVoltage] = useState(null);
  const [acOption, setAcOption] = useState(null);
  const [acGearHead, setAcGearHead] = useState(null);
  const [acRatio, setAcRatio] = useState(null);

  // Hypoid Gear Flow states
  const [hypoidType, setHypoidType] = useState(null);             // F2 / F3
  const [hypoidGearType, setHypoidGearType] = useState(null);     // H / A
  const [hypoidRatio, setHypoidRatio] = useState(null);           // เช่น 10, 15,...
  const [hypoidDirection, setHypoidDirection] = useState(null);   // RL, RR,...
  const [hypoidPower, setHypoidPower] = useState(null);           // เช่น 90W
  const [hypoidSupply, setHypoidSupply] = useState(null);         // C, A, S, S3
  const [hypoidOptional, setHypoidOptional] = useState([]); 

  const [rkfsSeries, setRkfsSeries] = useState(null);
    const [rkfsDesign, setRkfsDesign] = useState(null);
    const [rkfsSize, setRkfsSize] = useState(null);
    const [rkfsMotorType, setRkfsMotorType] = useState(null);
    const [rkfsMotorPower, setRkfsMotorPower] = useState(null);
    const [rkfsPole, setRkfsPole] = useState(null);
    const [rkfsRatio, setRkfsRatio] = useState(null);
    const [rkfsMounting, setRkfsMounting] = useState(null);
    const [rkfsPosition, setRkfsPosition] = useState(null);
    const [rkfsPositionSub, setRkfsPositionSub] = useState(null);
    const [rkfsDesignSuffix, setRkfsDesignSuffix] = useState(null);

const COMING_SOON = new Set([
  'DC Gear Motor',
  'SPN Series',
  'P Planetary Gearbox',
  'Servo Drive and Speed controller',
  'SRV Worm Gear',
]);

const handleBackUniversal = () => {
  if (selectedProduct === 'RKFS Series') {
    handleBackWithReset();
  } else {
    handleBack(); // ใช้อันเดิมสำหรับ Product อื่น
  }
};

const handleBackWithReset = () => {
  // Reset common states
  setSelectedProduct(null);
  setSelectedModel(null);
  setModelCodeList([]);
  setShowForm(false);
     
  // เฉพาะ RKFS
  rkfsSetters.setRkfsSeries(null);
  rkfsSetters.setRkfsDesign(null);
  rkfsSetters.setRkfsSize(null);
  rkfsSetters.setRkfsMotorType(null);
  rkfsSetters.setRkfsMotorPower(null);
  rkfsSetters.setRkfsPole(null);
  rkfsSetters.setRkfsRatio(null);
  rkfsSetters.setRkfsMounting(null);
  rkfsSetters.setRkfsPosition(null);
  rkfsSetters.setRkfsPositionSub(null);
    setRkfsDesignSuffix(null);
};

    const resetRKFSState = () => {
  rkfsSetters.setRkfsSeries(null);
  rkfsSetters.setRkfsDesign(null);
  rkfsSetters.setRkfsSize(null);
  rkfsSetters.setRkfsMotorType(null);
  rkfsSetters.setRkfsMotorPower(null);
  rkfsSetters.setRkfsPole(null);
  rkfsSetters.setRkfsRatio(null);
  rkfsSetters.setRkfsMounting(null);
  rkfsSetters.setRkfsPosition(null);
  rkfsSetters.setRkfsPositionSub(null);
    setRkfsDesignSuffix(null); 
  setSelectedModel(null);
  setModelCodeList([]);
};

  const handleResetRKFS = () => {
  rkfsSetters.setRkfsSeries(null);
  rkfsSetters.setRkfsDesign(null);
  rkfsSetters.setRkfsSize(null);
  rkfsSetters.setRkfsMotorType(null);
  rkfsSetters.setRkfsMotorPower(null);
  rkfsSetters.setRkfsPole(null);
  rkfsSetters.setRkfsRatio(null);
  rkfsSetters.setRkfsMounting(null);
  rkfsSetters.setRkfsPosition(null);
  rkfsSetters.setRkfsPositionSub(null);
    setRkfsDesignSuffix(null);
  setSelectedModel(null);
  setModelCodeList([]); // ถ้ามี
};

const handleRKFSBackToHome = () => {
  resetRKFSState();               // 🔁 รีเซตก่อนกลับหน้า Home
  setSelectedProduct(null);      // ⬅ กลับหน้าเลือก Product
};

  const [emailVerifiedCode, setEmailVerifiedCode] = useState(null);
  const [emailCodeInput, setEmailCodeInput] = useState('');
  const [codeSent, setCodeSent] = useState(false);

// [ADD-BLDC] State ของ BLDC
const [bldcCategory, setBldcCategory] = useState(null);
const [bldcFrame, setBldcFrame] = useState(null);
const [bldcPower, setBldcPower] = useState(null);
const [bldcVoltage, setBldcVoltage] = useState(null);
const [bldcGearType, setBldcGearType] = useState(null);
const [bldcSpeed, setBldcSpeed] = useState(null);
const [bldcOption, setBldcOption] = useState(null);
const [bldcRatio, setBldcRatio] = useState(null);
// [ADD-BLDC-HIGH] สำหรับ High-efficiency
const [bldcHEType, setBldcHEType] = useState(null);          // 'S'|'SF'|'SL'
const [bldcSelectedImage, setBldcSelectedImage] = useState(null); // 'S' | 'SF' | 'SL'
const [bldcSFDiameter, setBldcSFDiameter] = useState(null);  // ใช้ในโหมด SF ('12','14','15','16','20','25')


// [ADD-BLDC] เคลียร์ค่า BLDC ทั้งหมด
const resetBLDC = () => {
  setBldcCategory(null);
  setBldcFrame(null);
  setBldcPower(null);
  setBldcVoltage(null);
  setBldcGearType(null);
  setBldcSpeed(null);
  setBldcOption(null);
  setBldcRatio(null);
};

// [ADD-BLDC] Back ถอยทีละสเตป
// [ADD-BLDC] Back ถอยทีละสเตป
const backOneStepBLDC = () => {
  // ✅ เงื่อนไขถอยสำหรับ HE (รวม SF diameter) — ต้องอยู่ในฟังก์ชันนี้เท่านั้น
  if (bldcSFDiameter) { setBldcSFDiameter(null); return; }
  if (bldcHEType) {
    if (bldcRatio !== null && bldcRatio !== undefined) { setBldcRatio(null); return; }
    if (bldcSpeed) { setBldcSpeed(null); return; }
    if (bldcPower) { setBldcPower(null); return; }
    if (bldcFrame) { setBldcFrame(null); return; }
    setBldcHEType(null); return;
  }

  // ▼ เงื่อนไขเดิม (Normal BLDC)
  if (bldcRatio !== null && bldcRatio !== undefined) { setBldcRatio(null); return; }
  if (bldcOption !== null && bldcOption !== undefined) { setBldcOption(null); return; }
  if (bldcSpeed) { setBldcSpeed(null); return; }
  if (bldcGearType) { setBldcGearType(null); return; }
  if (bldcVoltage) { setBldcVoltage(null); return; }
  if (bldcPower) { setBldcPower(null); return; }
  if (bldcFrame) { setBldcFrame(null); return; }
  if (bldcCategory) { setBldcCategory(null); return; }
  handleBackUniversal();
};

// [ADD-BLDC] ใช้เป็น callback ให้ flow
const goHomeFromBLDC = () => {
  resetBLDC();
  setModelCodeList([]);        // ถ้ามีตัวแปรนี้ใน App ของคุณอยู่แล้ว
  setSelectedModel(null);
  setSelectedProduct(null);    // กลับหน้า Product
    setBldcHEType(null);
    setBldcSFDiameter(null);
};

const hypoidState = {
  type: hypoidType,
  gearType: hypoidGearType,
  ratio: hypoidRatio,
  direction: hypoidDirection,
  power: hypoidPower,
  supply: hypoidSupply,
  optional: hypoidOptional
};

const hypoidSetters = {
  setType: setHypoidType,
  setGearType: setHypoidGearType,
  setRatio: setHypoidRatio,
  setDirection: setHypoidDirection,
  setPower: setHypoidPower,
  setSupply: setHypoidSupply,
  setOptional: setHypoidOptional
};

const onConfirm = (modelCode) => {
  const models = Array.isArray(modelCode) ? modelCode : [modelCode];
  setModelCodeList(models);
  setSelectedModel(models[0]);
};

  useEffect(() => {
    if (
      selectedProduct === 'AC Gear Motor' &&
      acMotorType &&
      acPower &&
      acVoltage &&
      acOption &&
      acGearHead &&
      acRatio
    ) {
      const powerArray = acPower.split(',').map(p => p.trim());
      const generatedCodes = powerArray.map(power =>
        generateModelCode({
          acMotorType,
          acPower: power,
          acVoltage,
          acOption,
          acGearHead,
          acRatio,
        })
      ).flat();

      const finalCodes = Array.isArray(generatedCodes[0]) ? generatedCodes.flat() : generatedCodes;
      if (finalCodes.length > 0) {
        setModelCodeList(finalCodes);
        setSelectedModel(finalCodes[0]);
      }
    }
  }, [selectedProduct, acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio]);

   // เลือก GIF ตามหัวเกียร์ที่ผู้ใช้เลือก (ใช้ state acGearHead จาก App.jsx)
const gearGifForHead = () => {
  if (acGearHead === 'RIGHT ANGLE GEAR/HOLLOW SHAFT') return RC3D; // RC
  if (acGearHead === 'RIGHT ANGLE GEAR/SOLID SHAFT')  return RT3D; // RT
  if (acGearHead === 'SQUARE BOX')                    return KB3D; // KB
  if (acGearHead === 'SQUARE BOX (Low)')              return KB3D; // Klow ใช้ KB3D
  if (acGearHead === 'SQUARE BOX WITH WING')          return K3D;  // K
  return null;
};

  const generate6DigitCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  // ✅ ฟังก์ชันส่งรหัสยืนยันไปยังอีเมลของลูกค้า
const handleSendVerificationCode = () => {
  if (!userInfo.email) {
    toast.warning("⚠️ กรุณากรอกอีเมลก่อนขอรหัส");
    return;
  }

  const code = generate6DigitCode();
  setEmailVerifiedCode(code);
  setCodeSent(true);

  emailjs.send(
    'service_s30eakb',           // ✅ Service ID ของคุณ
    'template_gum65p2',          // ✅ Template สำหรับส่งรหัสให้ลูกค้า
    {
      to_email: userInfo.email,
      name: userInfo.name || 'ลูกค้า',
      code: code
    },
    'J6kLpbLcieCe2cKzU'          // ✅ Public Key
  )
  .then(() => {
    toast.success('✅ ส่งรหัสแล้ว กรุณาตรวจสอบอีเมลของคุณ');
  })
  .catch(() => {
    toast.error('❌ ส่งรหัสไม่สำเร็จ กรุณาลองใหม่');
  });
};

// ✅ ฟังก์ชันกดยืนยันและรับไฟล์ (เวอร์ชัน Blob + บังคับดาวน์โหลด)
const handleDownload = async () => {
  if (emailCodeInput !== emailVerifiedCode) {
    toast.error("❌ รหัสยืนยันไม่ถูกต้อง");
    return;
  }

  // ✅ ส่งข้อมูลลูกค้าเข้าอีเมล Somyot
  try {
    await emailjs.send(
      'service_s30eakb',
      'template_4vqperj',
      {
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        company: userInfo.company,
        model: selectedModel
      },
      'J6kLpbLcieCe2cKzU'
    );
    toast.success("✅ ส่งข้อมูลเรียบร้อยแล้ว");
  } catch (e) {
    toast.error("❌ ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่");
    // ไม่ต้อง return — ให้ลองดาวน์โหลดต่อได้
  }

  // ✅ ดาวน์โหลดไฟล์ .STEP แบบเสถียร
  setIsDownloading(true);
  try {
  const url = getFileUrl(); // ตอนนี้ getFileUrl() map ชื่อ BLDC ให้แล้ว

  // 1) เช็กก่อนว่าไฟล์มีจริง
  let head = await fetch(url, { method: 'HEAD', cache: 'no-store' });
  if (!head.ok) {
    // บาง dev server ไม่รองรับ HEAD -> ลอง GET ตรวจ content-type
    const probe = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (!probe.ok) throw new Error(`HTTP ${probe.status}`);
    const ct = probe.headers.get('content-type') || '';
    if (ct.includes('text/html')) throw new Error('Not a STEP file (got HTML)'); // กันไฟล์ 330B
  }

  // 2) ดาวน์โหลดจริง
  const real = await fetch(url, { method: 'GET', cache: 'no-store' });
  if (!real.ok) throw new Error(`HTTP ${real.status}`);
  const blob = await real.blob();
  const objectUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = `${selectedModel}.STEP`; // ใช้ชื่อที่ผู้ใช้คุ้น (ModelCode.STEP)
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
} catch (err) {
  console.error('Download check failed:', err);
  toast.error('ไฟล์ไม่พบใน /public/model หรือชื่อไม่ตรงกับที่ map ได้');
  // ถ้าอยากคง fallback เดิมไว้: เปิดแท็บใหม่ให้เซฟเองก็ได้
  // window.open(getFileUrl(), '_blank', 'noopener,noreferrer');
} finally {
  setIsDownloading(false);
  setShowForm(false);
}
};

  const handleBack = () => {
    setSelectedProduct(null);
    setModelCodeList([]);
    setSelectedModel(null);
    setShowForm(false);
    setIsDownloading(false);
    setUserInfo({ name: '', phone: '', company: '', email: '' });
    setAcMotorType(null);
    setAcPower(null);
    setAcSpeedAdjust(null);
    setAcVoltage(null);
    setAcOption(null);
    setAcGearHead(null);
    setAcRatio(null);
    setRkfsDesign(null);
    setRkfsSize(null);
    setRkfsMotorPower(null);
    setRkfsMounting(null);
  };

  const acState = { acMotorType, acPower, acSpeedAdjust, acVoltage, acOption, acGearHead, acRatio };
  const acSetters = { setAcMotorType, setAcPower, setAcSpeedAdjust, setAcVoltage, setAcOption, setAcGearHead, setAcRatio };
  const rkfsState = {
  rkfsSeries, rkfsDesign, rkfsSize, rkfsMotorType, rkfsMotorPower,
  rkfsPole, rkfsRatio, rkfsMounting, rkfsPosition, rkfsPositionSub,
  rkfsDesignSuffix,          // <-- เพิ่มบรรทัดนี้
};
  const rkfsSetters = {
  setRkfsSeries, setRkfsDesign, setRkfsSize, setRkfsMotorType, setRkfsMotorPower,
  setRkfsPole, setRkfsRatio, setRkfsMounting, setRkfsPosition, setRkfsPositionSub,
  setRkfsDesignSuffix,       // <-- เพิ่มบรรทัดนี้
};

const getFileUrl = () => {
  if (!selectedModel) return '#';

  // 👉 RKFS ใช้ placeholder ทั้ง Ratio=XXX และ Mounting=XX
  if (selectedProduct === 'RKFS Series') {
    const parts = selectedModel.split('-');
    if (parts.length >= 8) {
      parts[4] = 'XXX'; // Ratio
      parts[5] = 'XX';  // Mounting
      const fileName = `${parts.join('-')}.STEP`;
      // same-origin (public/model) + กัน cache
      return `/model/${encodeURIComponent(fileName)}?v=${Date.now()}`;
    }
  }

 // ✅ BLDC: ใช้ชื่อไฟล์ที่ map แล้ว (ไม่ใช่ <ModelCode>.STEP ตรงๆ)
if (selectedProduct === 'BLDC Gear Motor') {
  const mapped = mapBLDCDownloadFilename(selectedModel);
  if (!mapped) return '#';
  const base = (typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL) || '';
  return `${base}/model/${encodeURIComponent(mapped)}.STEP?v=${Date.now()}`;
}

  // อื่น ๆ ใช้ชื่อรุ่นตรงตัว
  return `/model/${encodeURIComponent(`${selectedModel}.STEP`)}?v=${Date.now()}`;
};


  return (
  <div className="relative min-h-screen overflow-hidden">
    {/* BG หรู + เบลอ + ไล่เฉด */}
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-[1.02]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* ไล่เฉดให้ดูแพงขึ้น */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/40" />
      {/* ทับมืดเมื่อเข้าเพจสินค้า */}
      {selectedProduct && <div className="absolute inset-0 bg-black/45" />}
    </div>

    {/* คอนเทนต์ทั้งหมดเหนือ BG */}
    <div className="relative z-10">

      {/* เนื้อหา */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto text-gray-900">
        {!selectedProduct && (
          <>
            {/* Title: Thai-flag gradient + waving */}
{/* Title: Lux 3D gradient (replace the old Thai-flag block with this) */}
<div className="mb-6">
  <div className="mx-auto w-full max-w-5xl">
    <svg
      viewBox="0 0 1200 240"
      className="w-full h-[120px] md:h-[145px] lg:h-[165px] select-none"
      preserveAspectRatio="xMidYMid meet"
      aria-label="SAS 3D.STEP"
    >
      <defs>
        {/* ไล่เฉดโทน น้ำเงิน–ฟ้า–เทา–ขาว พร้อม animation สลับสี */}
        <linearGradient id="luxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2efff">
            <animate attributeName="stop-color" values="#e2efff;#d1e9ff;#e2efff" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="35%" stopColor="#93c5fd">
            <animate attributeName="stop-color" values="#93c5fd;#60a5fa;#93c5fd" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="70%" stopColor="#cbd5e1">
            <animate attributeName="stop-color" values="#cbd5e1;#e5e7eb;#cbd5e1" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#ffffff">
            <animate attributeName="stop-color" values="#ffffff;#f8fafc;#ffffff" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* เงาทิ้งตัวนุ่ม ๆ ใต้ตัวอักษร */}
        <filter id="luxShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0,0,0,0.35)" />
        </filter>

        {/* Emboss/นูนเงาไฮไลท์ให้ดูเป็นโลหะหรู ๆ */}
        <filter id="emboss" x="-20%" y="-20%" width="140%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.5" specularExponent="20" lightingColor="#ffffff" result="spec">
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specMask" />
          <feComposite in="SourceGraphic" in2="specMask" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </defs>

      {/* เงาหลัก */}
      <text
        x="50%" y="65%"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="Inter, ui-sans-serif, system-ui"
        fontWeight="900" fontSize="118"
        fill="url(#luxGradient)"
        filter="url(#luxShadow)"
      >
        SAS 3D.STEP
      </text>

      {/* ชั้นนูน/ไฮไลท์ */}
      <text
        x="50%" y="65%"
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="Inter, ui-sans-serif, system-ui"
        fontWeight="900" fontSize="118"
        fill="url(#luxGradient)"
        filter="url(#emboss)"
      >
        SAS 3D.STEP
      </text>
    </svg>
  </div>
</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {productList.map((p) => (
                <button
  key={p.name}
  type="button"
  onClick={() => setSelectedProduct(p.name)}
  className="
    group relative w-full overflow-hidden text-left
    rounded-2xl
    bg-white/80 backdrop-blur-md
    shadow-[0_8px_20px_rgba(0,0,0,0.25)]
    border border-white/20
    transition
    hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]
    active:translate-y-0.5 active:shadow-[0_6px_14px_rgba(0,0,0,0.25)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
    p-0
    tilt-card
  "
>
  {/* เงาสะท้อนบาง ๆ ที่มีอยู่เดิม */}
  <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition" />

  {/* เพิ่มแสงวิ่งหรู ๆ */}
  <span className="sheen-layer"></span>

  {/* เพิ่มขอบเรืองแสงนุ่ม ๆ */}
  <span className="glow-layer"></span>

  <div className="flex flex-col h-full">
    <div className="aspect-[4/3] grid place-items-center bg-white/50">
      <img
        src={p.image}
        alt={p.name}
        className="card-image max-h-[70%] max-w-[85%] object-contain"
        loading="lazy"
      />
    </div>

    <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-white/30">
      <p className="font-semibold text-gray-900 tracking-wide">
        {p.name}
      </p>
    </div>
  </div>
</button>
              ))}
            </div>
          </>
        )}


{selectedProduct && COMING_SOON.has(selectedProduct) && (
  <>
    {/* ปุ่ม Home มุมขวาบน */}
    <div className="fixed top-4 right-4 z-20">
      <button
        type="button"
        onClick={() => setSelectedProduct(null)}
        className="px-4 py-2 rounded-xl bg-white/90 text-black font-semibold shadow hover:shadow-lg transition"
        aria-label="Home"
        title="Home"
      >
        Home
      </button>
    </div>

    {/* หน้าประกาศ Coming soon */}
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center select-none">
        <div className="bw-text font-black tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
                        text-[64px] md:text-[84px] lg:text-[96px]">
          Coming soon
        </div>
        <div className="mt-2 text-white/90 text-[10px] md:text-[11px]">
          แล้วพบกันเร็วๆนี้.....
        </div>
      </div>
    </div>
  </>
)}

        {selectedProduct === 'AC Gear Motor' && !selectedModel && !showForm && (
          <>
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">AC Gear Motor Selection</h2>
              <button className="text-blue-600 hover:underline" onClick={handleBack}>Home</button>
            </div>
            <ACMotorFlow
              acState={acState}
              acSetters={acSetters}
              onConfirm={(modelCode) => {
                const models = Array.isArray(modelCode) ? modelCode : [modelCode];
                setModelCodeList(models);
                setSelectedModel(models[0]);
              }}
            />
          </>
        )}
        {selectedProduct === 'AC Gear Motor' && selectedModel && !showForm && (
  <>
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code:</h2>
      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex justify-center items-center space-x-2">
          <input
            type="radio"
            name="modelSelect"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <label className="text-white drop-shadow">{code}</label>
        </div>
      ))}
    </div>
        {/* iPad frame + GIF เกียร์ (กึ่งกลางหน้าจอ) */}
{(() => {
  const gif = gearGifForHead();
  if (!gif) return null;

  return (
    <div className="mt-6 flex justify-center">
      {/* กรอบ iPad */}
      <div className="
        relative
        w-[800px] h-[600px]        /* ขนาดหลัก iPad 4:3 */
        sm:w-[720px] sm:h-[540px]  /* เล็กลงเล็กน้อยบนจอแคบ */
        md:w-[900px] md:h-[675px]  /* ขยายบนจอกว้าง */
        bg-black p-6 rounded-[2rem] shadow-2xl ring-1 ring-white/10
      ">
        {/* กล้องหน้า (center camera) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-black ring-2 ring-white/20" />
          <span className="block w-2 h-2 rounded-full bg-black ring-2 ring-white/15" />
        </div>

        {/* หน้าจอ iPad */}
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white">
          <img
            src={gif}
            alt="Gear 3D preview"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
})()}

    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(true)}
      >
        Download 3D
      </button>
      <button
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleBack}
      >
        Home
      </button>
    </div>
  </>
)}
  {selectedProduct === 'Hypoid Gear' && !selectedModel && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Hypoid Gear Selection</h2>
      <button className="text-blue-600 hover:underline" onClick={handleBack}>Home</button>
    </div>
    {renderHypoidGearFlow(hypoidState, hypoidSetters, (modelCode) => {
      const models = Array.isArray(modelCode) ? modelCode : [modelCode];
      setModelCodeList(models);
      setSelectedModel(models[0]);
    })}
  </>
)}
{selectedProduct === 'Hypoid Gear' && selectedModel && !showForm && (
  <>
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code:</h2>
      <p className="text-blue-200 font-medium mb-2">เลือกรุ่นที่ต้องการดาวน์โหลด:</p>
      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex justify-center items-center space-x-2">
          <input
            type="radio"
            name="modelSelect"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <label className="text-white drop-shadow">{code}</label>
        </div>
      ))}
    </div>

    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(true)}
      >
        Download 3D
      </button>
      <button
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleBack}
      >
        Home
      </button>
    </div>
  </>
)}

{selectedProduct === 'BLDC Gear Motor' && !selectedModel && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">BLDC Gear Selection</h2>
      <button className="text-blue-600 hover:underline" onClick={goHomeFromBLDC}>Home</button>
    </div>

    {renderBLDCGearFlow(
  {
    bldcCategory, bldcFrame, bldcPower, bldcVoltage,
    bldcGearType, bldcSpeed, bldcOption, bldcRatio,
    bldcHEType, bldcSFDiameter            // [ADD-BLDC-HIGH]
  },
  {
    setBldcCategory, setBldcFrame, setBldcPower, setBldcVoltage,
    setBldcGearType, setBldcSpeed, setBldcOption, setBldcRatio,
        setBldcSelectedImage,
    setBldcHEType, setBldcSFDiameter      // [ADD-BLDC-HIGH]
  },
  (modelCode) => {
    const models = Array.isArray(modelCode) ? modelCode : [modelCode];
    setModelCodeList(models);
    setSelectedModel(models[0]);
  },
  goHomeFromBLDC,
  backOneStepBLDC
)}
  </>
)}

{/* [ADD-BLDC] แสดงรายการรุ่นหลัง Generate */}
{selectedProduct === 'BLDC Gear Motor' && modelCodeList?.length > 0 && !showForm && (
  <>
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code:</h2>

      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex justify-center items-center space-x-2">
          <input
            type="radio"
            name="modelSelectBLDC"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <label className="text-white/90">{code}</label>
        </div>
      ))}

      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow"
        >
          Download 3D
        </button>
        <button
          onClick={goHomeFromBLDC}
          className="px-5 py-2 rounded-xl bg-white hover:bg-white/90 shadow"
        >
          Home
        </button>
      </div>
    </div>
  </>
)}



{/* 🟦 RKFS Series STEP 1 */}
{selectedProduct === 'RKFS Series' && !selectedModel && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-white font-bold mb-2 drop-shadow">RKFS Series Selection</h2>
      <button className="text-blue-600 hover:underline" onClick={handleBackUniversal}>Home</button>
    </div>
    {renderRKFSFlow(rkfsState, rkfsSetters, (modelCode) => {
      const models = Array.isArray(modelCode) ? modelCode : [modelCode];
      setModelCodeList(models);
      setSelectedModel(models[0]);
    })}
  </>
)}

{/* 🟩 RKFS Series หลังเลือก model แล้ว */}
{selectedProduct === 'RKFS Series' && selectedModel && !showForm && (
  <>
    <div className="text-center mt-10 space-y-4">
      <h2 className="text-white font-bold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">Model Code:</h2>
      <p className="text-blue-200 font-medium mb-2">เลือกรุ่นที่ต้องการดาวน์โหลด:</p>
      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex justify-center items-center space-x-2">
          <input
            type="radio"
            name="modelSelect"
            value={code}
            checked={selectedModel === code}
            onChange={() => setSelectedModel(code)}
          />
          <label className="text-white drop-shadow">{code}</label>
        </div>
      ))}
    </div>

    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(true)}
      >
        Download 3D
      </button>
      <button
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleBackUniversal}
      >
        Home
      </button>
    </div>
  </>
)}


{showForm && (
          <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold mb-4">อีกนิดเดียว กรอกข้อมูลครบทุกช่องเพื่อรับไฟล์ .STEP ทันที</h3>

            <input type="text" placeholder="ชื่อ" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="เบอร์ติดต่อ" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input type="text" placeholder="ชื่อบริษัท" value={userInfo.company} onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })} className="w-full mb-2 p-2 border rounded" />

            <div className="flex mb-2 gap-2">
              <input type="email" placeholder="Email ติดต่อ" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} className="flex-1 p-2 border rounded" />
              <button type="button" onClick={handleSendVerificationCode} className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">ขอรหัส</button>
            </div>

            {codeSent && (
              <input type="text" placeholder="กรอกรหัสที่ได้รับทางอีเมล" value={emailCodeInput} onChange={(e) => setEmailCodeInput(e.target.value)} className="w-full mb-4 p-2 border rounded" />
            )}

            <div className="relative">
              <button onClick={handleDownload} disabled={!userInfo.name || !userInfo.phone || !userInfo.company || !userInfo.email || isDownloading} className={`w-full py-2 rounded text-white font-semibold transition ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg'}`}>
                {isDownloading ? 'กำลังดาวน์โหลด...' : 'ยืนยันและรับไฟล์'}
              </button>
              {isDownloading && (<img src={hourglass} alt="loading" className="w-8 h-8 absolute -top-10 right-0 animate-spin" />)}
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
      </div>
  );
}

export default App;
