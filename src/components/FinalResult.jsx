// components/FinalResult.jsx
import React from 'react';
import DownloadButton from './DownloadButton';

const FinalResult = ({ modelCode, onReset }) => {
  if (!modelCode) return null;

  const renderModelBlock = (code) => (
    <div key={code} className="p-4 bg-white rounded-xl shadow-md text-center space-y-3 mb-4">
      <h3 className="text-lg font-semibold text-blue-700">✅ คุณได้เลือก Model:</h3>
      <p className="text-xl font-bold text-gray-800">{code}</p>

      <DownloadButton
        modelCode={code}
        downloadLink={`https://github.com/SomyotSW/gear-motor-app/tree/main/src/assets/model/${code}.STEP`}
      />
    </div>
  );

  return (
    <div className="mt-8">
      {Array.isArray(modelCode)
        ? modelCode.map(renderModelBlock)
        : renderModelBlock(modelCode)}

      {onReset && (
        <div className="text-center mt-6">
          <button
            onClick={onReset}
            className="px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 active:translate-y-[2px] transition"
          >
            🔁 กลับไปเลือกใหม่
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalResult;