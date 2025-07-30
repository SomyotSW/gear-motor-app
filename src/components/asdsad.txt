// components/FinalResult.jsx
import React from 'react';
import DownloadButton from './DownloadButton';

const FinalResult = ({ modelCode, downloadLink, onReset }) => {
  if (!modelCode) return null;

  return (
    <div className="mt-8 p-4 bg-white rounded-xl shadow-md text-center space-y-4">
      <h3 className="text-lg font-semibold text-blue-700">
        ✅ คุณได้เลือก Model:
      </h3>
      <p className="text-xl font-bold text-gray-800">{modelCode}</p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
        <DownloadButton modelCode={modelCode} downloadLink={downloadLink} />

        {onReset && (
          <button
            onClick={onReset}
            className="px-5 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 active:translate-y-[2px] transition"
          >
            🔁 กลับไปเลือกใหม่
          </button>
        )}
      </div>
    </div>
  );
};

export default FinalResult;