export default function DownloadSection({ modelCode }) {
  const BASE_URL = "https://your-server.com/files";
  return (
    <div className="p-6 space-y-3">
      <h2 className="text-xl font-bold text-center">ดาวน์โหลดไฟล์สำหรับรุ่น {modelCode}</h2>
      <div className="flex flex-col gap-2">
        <a href={`${BASE_URL}/${modelCode}.step`} className="btn">STEP File</a>
        <a href={`${BASE_URL}/${modelCode}.pdf`} className="btn">2D Drawing PDF</a>
        <a href={`${BASE_URL}/${modelCode}-quotation.pdf`} className="btn">Quotation PDF</a>
      </div>
    </div>
  );
}
