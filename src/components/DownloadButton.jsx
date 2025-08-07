// components/DownloadButton.jsx
import React, { useState, useEffect } from 'react';
import HourglassGif from '../assets/hourglass.gif';

const DownloadButton = ({ modelCodeList = [], selectedProduct }) => {
  const [selectedModel, setSelectedModel] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (modelCodeList.length > 0) {
      setSelectedModel(modelCodeList[0]); // default เลือกตัวแรก
    }
  }, [modelCodeList]);

  const handleDownload = async () => {
    if (!selectedModel) return;

    let filename = selectedModel;

    // ✅ เฉพาะ RKFS Series เท่านั้นที่แทน Ratio ด้วย 'XXX'
    if (selectedProduct === 'RKFS Series') {
      const parts = selectedModel.split('-');
      if (parts.length === 8) {
        parts[4] = 'XXX'; // แทน Ratio
        filename = parts.join('-');
      }
    }

    const rawUrl = `https://raw.githubusercontent.com/SomyotSW/gear-motor-app/main/src/assets/model/${filename}.STEP`;
    setDownloading(true);

    try {
      const response = await fetch(rawUrl);
      if (!response.ok) throw new Error('ไฟล์ไม่พบหรือเชื่อมต่อผิดพลาด');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.STEP`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        setDownloading(false);
      }, 3000);
    } catch (error) {
      alert('❌ ไม่สามารถดาวน์โหลดไฟล์ได้ กรุณาตรวจสอบการเชื่อมต่อหรือลิงก์ไฟล์');
      setDownloading(false);
    }
  };

  if (!modelCodeList || modelCodeList.length === 0) return null;

  return (
    <div className="text-center mt-4">
      <p className="text-sm mb-2 font-medium text-blue-700">เลือกรุ่นที่ต้องการดาวน์โหลด:</p>
      {modelCodeList.map((code, idx) => (
        <div key={idx} className="flex items-center justify-center space-x-2 mb-1">
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

      <div className="flex justify-center items-center gap-3 mt-3">
        <button
          onClick={handleDownload}
          disabled={!selectedModel || downloading}
          className={`px-6 py-2 text-white font-semibold rounded shadow-lg transition duration-200 ${
            downloading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 active:translate-y-[2px]'
          }`}
        >
          {downloading ? 'กำลังดาวน์โหลด...' : '📥 ดาวน์โหลด .STEP'}
        </button>

        {downloading && (
          <img
            src={HourglassGif}
            alt="loading"
            className="w-6 h-6 animate-spin"
          />
        )}
      </div>
    </div>
  );
};

export default DownloadButton;