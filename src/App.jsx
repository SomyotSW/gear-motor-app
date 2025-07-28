import React, { useState, useEffect } from 'react';
import { renderACMotorFlow, renderRKFSFlow, productList, generateModelCode } from './components/MotorFlows.js';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modelCode, setModelCode] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', company: '', email: '' });

  // AC Motor States
  const [acMotorType, setAcMotorType] = useState(null);
  const [acPower, setAcPower] = useState(null);
  const [acSpeedAdjust, setAcSpeedAdjust] = useState(null);
  const [acVoltage, setAcVoltage] = useState(null);
  const [acOption, setAcOption] = useState(null);
  const [acGearHead, setAcGearHead] = useState(null);
  const [acRatio, setAcRatio] = useState(null);

  // RKFS Series States
  const [rkfsDesign, setRkfsDesign] = useState(null);
  const [rkfsSize, setRkfsSize] = useState(null);
  const [rkfsPower, setRkfsPower] = useState(null);
  const [rkfsMounting, setRkfsMounting] = useState(null);

  useEffect(() => {
    if (selectedProduct === 'AC Gear Motor' && acMotorType && acPower && acVoltage && acOption && acGearHead && acRatio) {
      const code = generateModelCode({ acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio });
      if (code) setModelCode(code);
    }
  }, [selectedProduct, acMotorType, acPower, acVoltage, acOption, acGearHead, acRatio]);

  const handleBack = () => {
    setSelectedProduct(null);
    setModelCode(null);
    setShowForm(false);
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

  const acState = {
    acMotorType, setAcMotorType,
    acPower, setAcPower,
    acSpeedAdjust, setAcSpeedAdjust,
    acVoltage, setAcVoltage,
    acOption, setAcOption,
    acGearHead, setAcGearHead,
    acRatio, setAcRatio
  };

  const setState = {
  setAcMotorType, setAcPower, setAcSpeedAdjust, setAcVoltage,
  setAcOption, setAcGearHead, setAcRatio, setModelCode,
  };

  const rkfsState = {
    rkfsDesign, setRkfsDesign,
    rkfsSize, setRkfsSize,
    rkfsPower, setRkfsPower,
    rkfsMounting, setRkfsMounting
  };

  const handleDownload = () => {
    alert("ข้อมูลถูกส่งแล้ว ไปยัง Somyot@synergy-as.com");
    setShowForm(false);
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
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-32 sm:h-36 md:h-40 object-contain"
                />
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
          {renderACMotorFlow(acState, acState)}
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
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">Model Code:</h2>
          <p className="text-lg mt-2 font-mono text-blue-700">{modelCode}</p>
          <button onClick={() => setShowForm(true)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Download 3D</button>
          <button onClick={handleBack} className="mt-4 ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">กลับไปเลือกใหม่</button>
        </div>
      )}

      {showForm && (
        <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">กรอกข้อมูลเพื่อรับไฟล์ .STEP</h3>
          <input type="text" placeholder="ชื่อ" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <input type="text" placeholder="เบอร์ติดต่อ" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <input type="text" placeholder="ชื่อบริษัท" value={userInfo.company} onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })} className="w-full mb-2 p-2 border rounded" />
          <input type="email" placeholder="Email ติดต่อ" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} className="w-full mb-4 p-2 border rounded" />
          <button
            onClick={handleDownload}
            disabled={!userInfo.name || !userInfo.phone || !userInfo.company || !userInfo.email}
            className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            ยืนยันและรับไฟล์
          </button>
        </div>
      )}
    </div>
  );
}

export default App;