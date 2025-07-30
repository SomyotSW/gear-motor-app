import React, { useState } from 'react';

export default function ModelSummary({ modelCode, output50Hz, output60Hz, downloadLink, onReset }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = `${modelCode}.stp`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloaded(true);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="text-center mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-green-700">{modelCode}</h2>
      <p>Output Speed 50Hz: {output50Hz.toFixed(1)} rpm</p>
      <p>Output Speed 60Hz: {output60Hz.toFixed(1)} rpm</p>

      <button
        onClick={handleDownload}
        className={`inline-flex items-center justify-center px-5 py-2 rounded shadow-lg transition ${
          downloaded
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
        disabled={downloading || downloaded}
      >
        {downloading && (
          <span className="animate-spin mr-2 text-white text-lg">⏳</span>
        )}
        {downloaded ? 'ดาวน์โหลดแล้ว' : '📥 ดาวน์โหลด 3D Model'}
      </button>

      <div>
        <button
          onClick={onReset}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          🔁 ย้อนกลับไปเลือกใหม่
        </button>
      </div>
    </div>
  );
}