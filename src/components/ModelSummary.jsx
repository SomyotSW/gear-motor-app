export default function ModelSummary({ modelCode, onNext }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold">คุณเลือกรุ่น: {modelCode}</h2>
      <button onClick={onNext} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">ถัดไป</button>
    </div>
  );
}
