import React, { useState } from 'react';
import {
  productList,
  renderACMotorFlow,
  renderRKFSFlow
} from './MotorFlows';
import rkfsDemo from '@/assets/rkfs/rkfs-demo.gif';

const GearSelector = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmedModel, setConfirmedModel] = useState(null);

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
    setConfirmedModel(model);
  };

  const resetAll = () => {
    setSelectedProduct(null);
    setConfirmedModel(null);
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

      {selectedProduct === 'AC Gear Motor' && !confirmedModel && renderACMotorFlow(acState, setAcState, handleConfirm)}

      {selectedProduct === 'RKFS Series' && !confirmedModel && renderRKFSFlow(rkfsState, setRkfsState, handleConfirm)}

      {confirmedModel && (
        <div className="text-center space-y-4 mt-6">
          <h3 className="text-lg font-semibold text-green-700">คุณได้เลือก Model:</h3>
          <p className="text-2xl font-mono text-blue-700">{confirmedModel}</p>
          <button
            onClick={resetAll}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            เลือกใหม่
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
