// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, runTransaction } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";   // ★ เพิ่ม
import { getFunctions, httpsCallable } from "firebase/functions";

export async function countVisitViaFn() {
  const fn = httpsCallable(getFunctions(), 'incStat');
  await fn({ type: 'visit' });
}
export async function recordDownloadViaFn() {
  const fn = httpsCallable(getFunctions(), 'incStat');
  await fn({ type: 'download' });
}


const firebaseConfig = {
  apiKey: "AIzaSyAPcFp7Ad-_3DMQUaJMkT5Xlii8VNlmy1E",
  authDomain: "sas-gear-motor-app.firebaseapp.com",
  projectId: "sas-gear-motor-app",
  storageBucket: "sas-gear-motor-app.firebasestorage.app",
  messagingSenderId: "376110262759",
  appId: "1:376110262759:web:36659808b748930b4a7542",
  measurementId: "G-5RQ5VEL0YC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ★ ensure anonymous auth
const auth = getAuth(app);
export const authReady = signInAnonymously(auth)
  .catch(e => console.error("anonymous sign-in failed:", e));

/** subscribe สถิติแบบเรียลไทม์ */
export function subscribeStats(cb) {
  const ref = doc(db, "stats", "global");
  return onSnapshot(ref, (snap) => {
    const d = snap.data() || { totalVisits: 0, totalDownloads: 0 };
    cb({ totalVisits: d.totalVisits || 0, totalDownloads: d.totalDownloads || 0 });
  });
}

/** นับ visit (กันนับซ้ำทั้งวันต่อเบราว์เซอร์ด้วย localStorage) */
export async function countVisitOncePerDay() {
  const todayKey = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  const k = "sas_visit_day";
  if (localStorage.getItem(k) === todayKey) return; // เคยนับวันนี้แล้ว
  const ref = doc(db, "stats", "global");
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const cur = snap.exists() ? (snap.data().totalVisits || 0) : 0;
    if (!snap.exists()) tx.set(ref, { totalVisits: 0, totalDownloads: 0 });
    tx.update(ref, { totalVisits: cur + 1 });
  });
  localStorage.setItem(k, todayKey);
}

/** นับดาวน์โหลด (กันกดรัวใน session เดียวด้วย sessionStorage) */
export async function recordDownloadOncePerSession() {
  if (sessionStorage.getItem("sas_dl_done")) return;
  const ref = doc(db, "stats", "global");
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const cur = snap.exists() ? (snap.data().totalDownloads || 0) : 0;
    if (!snap.exists()) tx.set(ref, { totalVisits: 0, totalDownloads: 0 });
    tx.update(ref, { totalDownloads: cur + 1 });
  });
  sessionStorage.setItem("sas_dl_done", "1");
}