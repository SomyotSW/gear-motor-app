import React, { useState, useEffect } from 'react';
import ACMotorFlow, { renderRKFSFlow, productList, generateModelCode } from './components/MotorFlows.js';
import bgImage from './assets/GearBG2.png';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [rkfsDesign, setRkfsDesign] = useState(null);
  const [rkfsSize, setRkfsSize] = useState(null);
  const [rkfsPower, setRkfsPower] = useState(null);
  const [rkfsMounting, setRkfsMounting] = useState(null);

  const [emailVerifiedCode, setEmailVerifiedCode] = useState(null);
  const [emailCodeInput, setEmailCodeInput] = useState('');
  const [codeSent, setCodeSent] = useState(false);

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

  const handleSendVerificationCode = () => {
    if (!userInfo.email) {
      toast.warning("⚠️ กรุณากรอกอีเมลก่อนขอรหัส");
      return;
    }

    const code = generate6DigitCode();
    setEmailVerifiedCode(code);
    setCodeSent(true);

    emailjs.send('service_s30eakb', 'template_gum65p2', {
      to_email: userInfo.email,
      name: userInfo.name || 'ลูกค้า',
      code: code
    }, 'J6kLpbLcieCe2cKzU')
      .then(() => {
      toast.success('✅ ส่งรหัสแล้ว กรุณาตรวจสอบอีเมลของคุณ');
    })
    .catch(() => {
      toast.error('❌ ส่งรหัสไม่สำเร็จ กรุณาลองใหม่');
    });

  };

  const handleDownload = () => {
    if (emailCodeInput !== emailVerifiedCode) {
      alert("รหัสยืนยันไม่ถูกต้อง");
      return;
    }

    emailjs.send('service_s30eakb', 'template_gum65p2', {
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      company: userInfo.company,
      model: selectedModel
    }, 'J6kLpbLcieCe2cKzU');

    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = fileUrl;
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
  const rkfsState = { rkfsDesign, setRkfsDesign, rkfsSize, setRkfsSize, rkfsPower, setRkfsPower, rkfsMounting, setRkfsMounting };

  const fileUrl = selectedModel ? `https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${selectedModel}.STEP` : '#';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center blur-sm z-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="relative z-10 p-6 text-gray-900">
        {/* ... รหัสส่วนที่ไม่ได้แก้ ... */}

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
      </div>
    </div>
  );
}

export default App;