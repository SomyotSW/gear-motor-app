import React, { useState } from 'react';
import { renderACMotorFlow, renderRKFSFlow, productList } from './components/GearSelector';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modelCode, setModelCode] = useState(null);

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

  const handleConfirm = (code) => setModelCode(code);
  const handleBack = () => {
    setSelectedProduct(null);
    setModelCode(null);
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

  const rkfsState = {
    rkfsDesign, setRkfsDesign,
    rkfsSize, setRkfsSize,
    rkfsPower, setRkfsPower,
    rkfsMounting, setRkfsMounting
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      {!selectedProduct && (
        <>
          <h1 className="text-2xl font-bold mb-4">SAS Transmission Product</h1>
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
          {renderACMotorFlow(acState, acState, handleConfirm)}
        </>
      )}

      {selectedProduct === 'RKFS Series' && !modelCode && (
        <>
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">RKFS Series</h2>
            <button className="text-blue-600 hover:underline" onClick={handleBack}>ย้อนกลับ</button>
          </div>
          {renderRKFSFlow(rkfsState, rkfsState, handleConfirm)}
        </>
      )}

      {modelCode && (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">Model Code:</h2>
          <p className="text-lg mt-2 font-mono text-blue-700">{modelCode}</p>
          <button onClick={handleBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">กลับไปเลือกใหม่</button>
        </div>
      )}
    </div>
  );
}

export default App;