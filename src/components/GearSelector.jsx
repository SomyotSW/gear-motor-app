import React, { useState } from 'react';
import {
  productList,
  renderACMotorFlow,
  renderRKFSFlow
} from './MotorFlows.js';
import rkfsDemo from '../assets/rkfs/rkfs-demo.gif';
import DownloadButton from './DownloadButton';

const GearSelector = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmedModels, setConfirmedModels] = useState([]); // ✅ เป็น array
  const [selectedModel, setSelectedModel] = useState(null);   // ✅ ตัวที่ลูกค้าเลือก

  // State สำหรับ renderACMotorFlow
  const [acMotorType, setAcMotorType] = useState(null);
  const [acPower, setAcPower] = useState(null);
  const [acSpeedAdjust, setAcSpeedAdjust] = useState(null);
  const [acVoltage, setAcVoltage] = useState(null);
  const [acOption, setAcOption] = useState(null);
  const [acGearHead, setAcGearHead] = useState(null);
  const [acRatio, setAcRatio] = useState(null);

  // State สำหรับ renderRKFSFlow
  const [rkfsDesign, setRkfsDesign] = useState(null);
  const [rkfsSize, setRkfsSize] = useState(null);
  const [rkfsPower, setRkfsPower] = useState(null);
  const [rkfsMounting, setRkfsMounting] = useState(null);

  const acState = {
    acMotorType, acPower, acSpeedAdjust, acVoltage,
    acOption, acGearHead, acRatio
  };
  const setAcState = {
    setAcMotorType, setAcPower, setAcSpeedAdjust, setAcVoltage,
    setAcOption, setAcGearHead, setAcRatio
  };

  const rkfsState = {
    rkfsDesign, rkfsSize, rkfsPower, rkfsMounting
  };
  const setRkfsState = {
    setRkfsDesign, setRkfsSize, setRkfsPower, setRkfsMounting
  };

  const handleConfirm = (model) => {
    const models = Array.isArray(model) ? model : [model];
    setConfirmedModels(models);
    setSelectedModel(models[0]); // default เลือกตัวแรก
  };

  const resetAll = () => {
    setSelectedProduct(null);
    setConfirmedModels([]);
    setSelectedModel(null);
    setAcMotorType(null); setAcPower(null); setAcSpeedAdjust(null); setAcVoltage(null);
    setAcOption(null); setAcGearHead(null); setAcRatio(null);
    setRkfsDesign(null); setRkfsSize(null); setRkfsPower(null); setRkfsMounting(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gear Motor Product Selection</h2>

      {!selectedProduct && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {productList.map(product => (
            <div key={product.name} className="text-center cursor-pointer" onClick={() => setSelectedProduct(product.name)}>
              <img src={product.image} alt={product.name} className="hover:scale-105 transition mx-auto" />
              <p className="mt-2 font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      )}

      {selectedProduct === 'AC Gear Motor' && confirmedModels.length === 0 &&
        renderACMotorFlow(acState, setAcState, handleConfirm)
      }

      {selectedProduct === 'RKFS Series' && confirmedModels.length === 0 &&
        renderRKFSFlow(rkfsState, setRkfsState, handleConfirm)
      }

      {confirmedModels.length > 0 && (
        <div className="text-center space-y-4 mt-6">
          <h3 className="text-lg font-semibold text-green-700">✅ คุณได้เลือก Model:</h3>

          {confirmedModels.map((code, idx) => (
            <div key={idx} className="flex justify-center items-center space-x-2">
              <input
                type="radio"
                id={`model-${idx}`}
                name="modelSelect"
                value={code}
                checked={selectedModel === code}
                onChange={() => setSelectedModel(code)}
              />
              <label htmlFor={`model-${idx}`}>{code}</label>
            </div>
          ))}

          <DownloadButton modelCodeList={[selectedModel]} />

          <button
            onClick={resetAll}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            🔁 เลือกใหม่
          </button>
        </div>
      )}

      {/* GIF ด้านล่างสุด */}
      <div className="flex justify-center mt-10">
        <img src={rkfsDemo} alt="RKFS Demo" className="w-[280px]" />
      </div>
    </div>
  );
};

export default GearSelector;