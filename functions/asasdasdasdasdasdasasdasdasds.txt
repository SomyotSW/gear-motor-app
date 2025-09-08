const functions = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.incStat = functions.onCall(async (req) => {
  const { type } = req.data; // 'visit' | 'download'
  if (!['visit','download'].includes(type)) throw new functions.https.HttpsError('invalid-argument');

  const ref = db.doc('stats/global');
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) tx.set(ref, { totalVisits: 0, totalDownloads: 0 });
    const d = (await tx.get(ref)).data();
    const update = (type === 'visit')
      ? { totalVisits: (d.totalVisits || 0) + 1 }
      : { totalDownloads: (d.totalDownloads || 0) + 1 };
    tx.update(ref, update);
  });
  return { ok: true };
});