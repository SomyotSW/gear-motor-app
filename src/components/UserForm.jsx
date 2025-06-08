import { useState } from 'react';

export default function UserForm({ onNext }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    onNext();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">กรอกข้อมูลเพื่อเข้าใช้งาน</h2>
      <input className="w-full p-2 border" placeholder="ชื่อ" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full p-2 border" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="w-full p-2 border" placeholder="เบอร์โทร" value={phone} onChange={e => setPhone(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>เข้าสู่แอป</button>
    </div>
  );
}
