// components/FinalResult.jsx
import React from 'react';

const FinalResult = ({ modelCode, downloadLink }) => {
  if (!modelCode) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 text-center">
      <h2 className="text-xl font-bold mb-2 text-green-700">✅ Model Code ที่คุณเลือก:</h2>
      <p className="text-lg font-mono text-gray-800 mb-4">{modelCode}</p>
      <a
        href={downloadLink}
        download
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        ดาวน์โหลดไฟล์ 3D (.stp)
      </a>
    </div>
  );
};

export default FinalResult;