import React from 'react';
import DownloadButton from './DownloadButton';

const FinalResult = ({ modelCode, onReset }) => {
  if (!modelCode || modelCode.length === 0) return null;

  const modelCodeList = Array.isArray(modelCode) ? modelCode : [modelCode];

  return (
    <div className="mt-8 text-center">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">✅ คุณได้เลือก Model:</h3>

      <DownloadButton modelCodeList={modelCodeList} />

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