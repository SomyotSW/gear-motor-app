// components/FinalSummary.jsx
import React from 'react';

const FinalSummary = ({ modelCode, output50Hz, output60Hz }) => {
  const handleDownload = () => {
    const url = `https://github.com/SomyotSW/gear-motor-app/tree/main/src/assets/model/${modelCode}.stp`;
    window.open(url, '_blank');
  };

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold mb-4">AC Gear Motor Selection</h1>

      {modelCode && (
        <div className="text-lg font-semibold mb-2 text-blue-800">
          📦 Model Code: <span className="font-bold">{modelCode}</span>
        </div>
      )}

      <div className="text-lg mb-4">
        <p>Specification </p>
        <p>Output Speed 50Hz: {output50Hz.toFixed(1)} rpm</p>
        <p>Output Speed 60Hz: {output60Hz.toFixed(1)} rpm</p>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition duration-300"
        onClick={handleDownload}
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