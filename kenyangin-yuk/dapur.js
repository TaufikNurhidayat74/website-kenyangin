/* =========================================================
   KENYANGIN YUK – dapur.js
   Papan pesanan untuk dapur / kasir.
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const rupiah = n => 'Rp ' + (Number(n) || 0).toLocaleString('id-ID');
const hhmm = t => new Date(t).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

/* semua teks dari pelanggan WAJIB di-escape sebelum masuk innerHTML */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const NEXT = {
  baru:     { to: 'diproses', label: 'Proses' },
  diproses: { to: 'siap',     label: 'Siap diantar' },
  siap:     { to: 'selesai',  label: 'Selesai' }
};

let known = null;       // id pesanan yang sudah pernah terlihat
let soundOn = false;
let audioCtx = null;

/* ---------- Info mode ---------- */
$('#modeInfo').textContent = KY.mode === 'firebase'
  ? 'Terhubung ke Firebase · diperbarui otomatis'
  : 'MODE DEMO · pesanan hanya dari browser ini. Isi FIREBASE_URL di config.js agar terhubung ke HP pelanggan.';

/* ---------- Jam ---------- */
function tickClock() {
  $('#clock').textContent = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
tickClock();
setInterval(tickClock, 1000);

/* ---------- Bunyi pesanan baru ---------- */
function beep() {
  if (!soundOn || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 880;
  gain.gain.value = 0.15;
  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}
$('#btnSound').addEventListener('click', () => {
  soundOn = !soundOn;
  if (soundOn) audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  $('#btnSound').textContent = soundOn ? '🔔 Bunyi aktif' : '🔕 Bunyi mati';
  if (soundOn) beep();
});

/* ---------- Tampilan ---------- */
function actions(o) {
  const n = NEXT[o.status];
  if (!n) return `<span class="tag tag--${esc(o.status)}">${o.status === 'batal' ? 'Dibatalkan' : 'Selesai'}</span>`;
  const cancel = o.status === 'baru'
    ? `<button class="btn btn--ghost" data-act="batal" data-id="${esc(o.id)}">Batal</button>` : '';
  return `${cancel}<button class="btn" data-act="${n.to}" data-id="${esc(o.id)}">${n.label}</button>`;
}

function card(o) {
  const items = (o.items || []).map(i => `<li><b>${Number(i.qty) || 0}×</b> ${esc(i.name)}</li>`).join('');
  return `
    <article class="ord ord--${esc(o.status)}">
      <header>
        <div>
          <span class="ord__table">Meja ${esc(o.table)}</span>
          <span class="ord__code">${KY.shortCode(o.id)}</span>
        </div>
        <time>${hhmm(o.createdAt)}</time>
      </header>
      <ul class="ord__items">${items}</ul>
      ${o.note ? `<p class="ord__note">📝 ${esc(o.note)}</p>` : ''}
      <footer>
        <span class="ord__total">${rupiah(o.total)}</span>
        <div class="ord__btns">${actions(o)}</div>
      </footer>
    </article>`;
}

function render(list, err) {
  const bar = $('#errorBar');
  if (!list) {
    bar.hidden = false;
    bar.textContent = 'Gagal mengambil pesanan. Periksa internet atau pengaturan Firebase (' + (err && err.message) + ').';
    return;
  }
  bar.hidden = true;

  // bunyi untuk pesanan baru yang masuk setelah halaman terbuka
  const ids = new Set(list.map(o => o.id));
  if (known) {
    const fresh = list.some(o => o.status === 'baru' && !known.has(o.id));
    if (fresh) beep();
  }
  known = ids;

  const group = s => list.filter(o => o.status === s);
  const done = list.filter(o => o.status === 'selesai' || o.status === 'batal');

  const fill = (key, arr, empty) => {
    $('#c-' + key).textContent = arr.length;
    $('#l-' + key).innerHTML = arr.length ? arr.map(card).join('') : `<p class="empty">${empty}</p>`;
  };
  // yang paling lama menunggu tampil paling atas
  fill('baru',     group('baru').reverse(),     'Belum ada pesanan baru');
  fill('diproses', group('diproses').reverse(), 'Tidak ada yang diproses');
  fill('siap',     group('siap').reverse(),     'Belum ada yang siap');
  fill('selesai',  done.slice(0, 10),           'Belum ada pesanan selesai');
}

/* ---------- Aksi tombol ---------- */
$('.board').addEventListener('click', async e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  b.disabled = true;
  try {
    await KY.setStatus(b.dataset.id, b.dataset.act);
    render(await KY.listOrders());
  } catch (err) {
    render(null, err);
  }
});

KY.subscribe(render);
