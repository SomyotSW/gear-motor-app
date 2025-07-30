// components/DownloadButton.jsx
import React, { useState } from 'react';
import HourglassGif from '../assets/hourglass.gif'; // 🔄 ไฟล์ GIF ต้องวางไว้ใน assets

const DownloadButton = ({ modelCode, downloadLink }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const response = await fetch(downloadLink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${modelCode}.stp`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        setDownloading(false);
      }, 3000);
    } catch (error) {
      alert('❌ เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์');
      setDownloading(false);
    }
  };

  if (!modelCode || !downloadLink) return null;

  return (
    <div className="text-center mt-4">
      <p className="text-sm mb-2">
        ดาวน์โหลดไฟล์ 3D STEP รุ่น: <strong>{modelCode}</strong>
      </p>

      <div className="flex justify-center items-center gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`px-6 py-2 text-white font-semibold rounded shadow-lg transition duration-200 ${
            downloading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 active:translate-y-[2px]'
          }`}
        >
          {downloading ? 'กำลังดาวน์โหลด...' : '📥 ดาวน์โหลด .stp'}
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