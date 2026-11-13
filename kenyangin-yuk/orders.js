/* =========================================================
   KENYANGIN YUK – orders.js
   Penyimpanan pesanan, dipakai oleh index.html dan dapur.html.
   - FIREBASE_URL kosong  -> mode demo (localStorage)
   - FIREBASE_URL terisi  -> Firebase Realtime Database (REST)
   Status pesanan: baru -> diproses -> siap -> selesai (atau batal)
   ========================================================= */
(function () {
  const cfg = window.KY_CONFIG || {};
  const base = String(cfg.FIREBASE_URL || '').trim().replace(/\/+$/, '');
  const online = base.startsWith('https://');
  const LS_KEY = 'ky_db_orders';
  const POLL = Number(cfg.POLL_MS) || 3000;

  /* ---- mode demo ---- */
  const readLocal = () => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
    catch { return []; }
  };
  const writeLocal = list => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch { /* penuh / diblokir */ }
  };

  /* ---- mode Firebase (REST) ---- */
  async function http(path, method = 'GET', body) {
    const res = await fetch(`${base}${path}.json`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  const byNewest = (a, b) => (b.createdAt || 0) - (a.createdAt || 0);
  const toList = obj => Object.entries(obj || {}).map(([id, o]) => ({ ...o, id })).sort(byNewest);

  const KY = {
    mode: online ? 'firebase' : 'demo',

    async createOrder(order) {
      const data = { ...order, status: 'baru', createdAt: Date.now() };
      if (online) {
        const r = await http('/orders', 'POST', data);
        return { ...data, id: r.name };
      }
      const id = 'o' + Date.now();
      const list = readLocal();
      list.unshift({ ...data, id });
      writeLocal(list);
      return { ...data, id };
    },

    async listOrders() {
      if (online) return toList(await http('/orders'));
      return readLocal().sort(byNewest);
    },

    async getOrder(id) {
      if (online) {
        const o = await http('/orders/' + encodeURIComponent(id));
        return o ? { ...o, id } : null;
      }
      return readLocal().find(o => o.id === id) || null;
    },

    async setStatus(id, status) {
      if (online) { await http('/orders/' + encodeURIComponent(id), 'PATCH', { status }); return; }
      const list = readLocal();
      const o = list.find(x => x.id === id);
      if (o) { o.status = status; writeLocal(list); }
    },

    /* panggil cb(daftarPesanan) tiap beberapa detik; cb(null, error) jika gagal */
    subscribe(cb) {
      const tick = async () => {
        try { cb(await KY.listOrders()); }
        catch (err) { cb(null, err); }
      };
      tick();
      const timer = setInterval(tick, POLL);
      const onStorage = e => { if (e.key === LS_KEY) tick(); };
      window.addEventListener('storage', onStorage);
      return () => { clearInterval(timer); window.removeEventListener('storage', onStorage); };
    },

    /* kode pendek untuk ditampilkan, mis. #A1B2 */
    shortCode(id) {
      return '#' + String(id).replace(/[^a-z0-9]/gi, '').slice(-4).toUpperCase();
    }
  };

  window.KY = KY;
})();
