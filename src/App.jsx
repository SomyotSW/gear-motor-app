import React, { useState, useEffect } from 'react';
import { renderACMotorFlow, renderRKFSFlow, productList, generateModelCode } from './components/MotorFlows.js';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modelCode, setModelCode] = useState(null);
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
      // ✅ รองรับหลายค่า เช่น "60W GN, GU"
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
        setModelCode(finalCodes[0]);
      }
    }
  }, [selectedProduct, acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio]);

  const handleBack = () => {
    setSelectedProduct(null);
    setModelCode(null);
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
  const fileUrl =
    modelCode && typeof modelCode === 'string'
      ? `https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${modelCode}.STEP`
      : '#';

  const handleModelConfirm = (code) => {
    setModelCode(code);
    setShowForm(true);
  };

  const handleDownload = () => {
    setIsDownloading(true);

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${modelCode}.STEP`;
      link.click();
      setIsDownloading(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      {!selectedProduct && (
        <>
          <h1 className="text-2xl font-bold mb-4">SAS Transmission Request 3D file</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productList.map((p) => (
              <div
                key={p.name}
                className="cursor-pointer hover:scale-105 transition text-center"
                onClick={() => setSelectedProduct(p.name)}
              >
                <img src={p.image} alt={p.name} className="w-full h-32 sm:h-36 md:h-40 object-contain" />
                <p className="mt-2 font-semibold">{p.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedProduct === 'AC Gear Motor' && !modelCode && (
        <>
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">AC Gear Motor Selection</h2>
            <button className="text-blue-600 hover:underline" onClick={handleBack}>ย้อนกลับ</button>
          </div>
          {renderACMotorFlow(acState, acSetters, setModelCode)}
        </>
      )}

      {selectedProduct === 'RKFS Series' && !modelCode && (
        <>
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">RKFS Series</h2>
            <button className="text-blue-600 hover:underline" onClick={handleBack}>ย้อนกลับ</button>
          </div>
          {renderRKFSFlow(rkfsState, rkfsState)}
        </>
      )}

      {modelCode && !showForm && (
        <div className="text-center mt-10 space-y-4">
          <h2 className="text-2xl font-bold text-blue-700">Model Code: {modelCode}</h2>
          <button
            onClick={() => setShowForm(true)}
            disabled={isDownloading}
            className={`mt-4 px-5 py-2 rounded text-white transition ${
              isDownloading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 shadow-lg'
            }`}
          >
            {isDownloading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="4" fill="none" />
                </svg>
                กำลังดาวน์โหลด...
              </span>
            ) : (
              'Download 3D'
            )}
          </button>
          <button onClick={handleBack} className="ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
            กลับไปเลือกใหม่
          </button>
        </div>
      )}

      {showForm && (
        <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-4">กรอกข้อมูลครบทุกช่องเพื่อรับไฟล์ .STEP ทันที</h3>

          <input
            type="text"
            placeholder="ชื่อ"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="เบอร์ติดต่อ"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="ชื่อบริษัท"
            value={userInfo.company}
            onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email ติดต่อ"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />

          <div className="relative">
            <button
              onClick={handleDownload}
              disabled={!userInfo.name || !userInfo.phone || !userInfo.company || !userInfo.email || isDownloading}
              className={`w-full py-2 rounded text-white font-semibold transition 
                ${isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg'}`}
            >
              {isDownloading ? 'กำลังดาวน์โหลด...' : 'ยืนยันและรับไฟล์'}
            </button>

            {isDownloading && (
              <img
                src="/assets/hourglass.gif"
                alt="loading"
                className="w-8 h-8 absolute -top-10 right-0 animate-spin"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;