import React, { useState, useEffect } from 'react';

const FinalSummary = ({ modelCode, output50Hz, output60Hz }) => {
  const modelCodeList = Array.isArray(modelCode) ? modelCode : [modelCode];
  const [selectedModel, setSelectedModel] = useState(modelCodeList[0] || '');

  useEffect(() => {
    if (modelCodeList.length > 0) {
      setSelectedModel(modelCodeList[0]);
    }
  }, [modelCode]);

  const handleDownload = () => {
    if (!selectedModel) return;
    const url = `https://github.com/SomyotSW/gear-motor-app/raw/main/src/assets/model/${selectedModel}.stp`;
    window.open(url, '_blank');
  };

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold mb-4">AC Gear Motor Selection</h1>

      {modelCodeList.length > 1 ? (
        <div className="mb-4 text-left inline-block">
          <p className="text-lg font-semibold mb-1 text-blue-800">📦 เลือกรุ่นที่ต้องการดาวน์โหลด:</p>
          {modelCodeList.map((code, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`model-${idx}`}
                name="modelCode"
                value={code}
                checked={selectedModel === code}
                onChange={() => setSelectedModel(code)}
              />
              <label htmlFor={`model-${idx}`}>{code}</label>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-lg font-semibold mb-2 text-blue-800">
          📦 Model Code: <span className="font-bold">{selectedModel}</span>
        </div>
      )}

      <div className="text-lg mb-4">
        <p>Specification</p>
        <p>Output Speed 50Hz: {output50Hz?.toFixed(1)} rpm</p>
        <p>Output Speed 60Hz: {output60Hz?.toFixed(1)} rpm</p>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition duration-300"
        onClick={handleDownload}
        disabled={!selectedModel}
      >
        📥 Download 3D
      </button>

      <div className="mt-6">
        <img src="/assets/GearBG2.png" alt="gear" className="mx-auto max-w-3xl rounded-xl shadow-md" />
      </div>
    </div>
  );
};

export default FinalSummary;