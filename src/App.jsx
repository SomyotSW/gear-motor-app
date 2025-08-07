import React, { useState, useEffect } from 'react';
import ACMotorFlow, { renderRKFSFlow, productList, generateModelCode, renderHypoidGearFlow } from './components/MotorFlows.js';
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

// ✅ ฟังก์ชันกดยืนยันและรับไฟล์
const handleDownload = () => {
  if (emailCodeInput !== emailVerifiedCode) {
    toast.error("❌ รหัสยืนยันไม่ถูกต้อง");
    return;
  }

  // ✅ ส่งข้อมูลลูกค้าเข้าอีเมล Somyot
  emailjs.send(
    'service_s30eakb',           // ✅ Service ID ของคุณ
    'template_4vqperj',     // ✅ Template ส่งข้อมูลเข้าอีเมลคุณ
    {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      company: userInfo.company,
      model: selectedModel
    },
    'J6kLpbLcieCe2cKzU'          // ✅ Public Key
  )
  .then(() => {
    toast.success("✅ ส่งข้อมูลเรียบร้อยแล้ว");
  })
  .catch(() => {
    toast.error("❌ ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่");
  });

  // ✅ ดำเนินการดาวน์โหลด .STEP
  setIsDownloading(true);
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = getFileUrl();
    link.download = `${selectedModel}.STEP`;
    link.click();
    setIsDownloading(false);
    setShowForm(false);
  }, 2000);
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
    setRkfsPower(null);
    setRkfsMounting(null);
  };

  const acState = { acMotorType, acPower, acSpeedAdjust, acVoltage, acOption, acGearHead, acRatio };
  const acSetters = { setAcMotorType, setAcPower, setAcSpeedAdjust, setAcVoltage, setAcOption, setAcGearHead, setAcRatio };
  const rkfsState = { rkfsSeries, rkfsDesign, rkfsSize, rkfsMotorType, rkfsMotorPower, rkfsPole, rkfsRatio, rkfsMounting, rkfsPosition, rkfsPositionSub };
  const rkfsSetters = { setRkfsSeries, setRkfsDesign, setRkfsSize, setRkfsMotorType, setRkfsMotorPower, setRkfsPole, setRkfsRatio, setRkfsMounting, setRkfsPosition, setRkfsPositionSub };
  const getFileUrl = () => {
  if (!selectedModel) return '#';

  // ถ้าเป็น RKFS ให้แปลง ratio → 'XXX'
  if (selectedProduct === 'RKFS Series') {
    const parts = selectedModel.split('-');
    if (parts.length === 8) {
      parts[4] = 'XXX';
      return `https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${parts.join('-')}.STEP`;
    }
  }

  // อื่น ๆ ปกติ
  return `https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${selectedModel}.STEP`;
};

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center blur-sm z-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="relative z-10 p-6 text-gray-900">
        {!selectedProduct && (
          <>
            <h1
  className="
    text-5xl
    font-bold
    mb-5
    drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]
    text-3d-blink
  "
>
  SAS 3D.STEP
</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((p) => (
                <div
                  key={p.name}
                  className="cursor-pointer hover:scale-105 transition text-center bg-white bg-opacity-90 rounded-xl shadow-lg p-2"
                  onClick={() => setSelectedProduct(p.name)}
                >
                  <img src={p.image} alt={p.name} className="w-full h-48 sm:h-56 md:h-64 object-contain" />
                  <p className="mt-3 font-semibold text-black">{p.name}</p>
                </div>
              ))}
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

{/* 🟦 RKFS Series STEP 1 */}
{selectedProduct === 'RKFS Series' && !selectedModel && !showForm && (
  <>
    <div className="flex justify-between items-center mt-6">
      <h2 className="text-white font-bold mb-2 drop-shadow">RKFS Series Selection</h2>
      <button className="text-blue-600 hover:underline" onClick={handleBack}>Home</button>
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
        กลับไปเลือกใหม่
      </button>
    </div>
  </>
)}


{showForm && (
          <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold mb-4">กรอกข้อมูลครบทุกช่องเพื่อรับไฟล์ .STEP ทันที</h3>

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
              {isDownloading && (<img src="/assets/hourglass.gif" alt="loading" className="w-8 h-8 absolute -top-10 right-0 animate-spin" />)}
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
