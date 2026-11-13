/* =========================================================
   KENYANGIN YUK – script.js
   Fitur: carousel promo, filter kategori, pencarian, sortir,
   favorit, keranjang (tersimpan), checkout, toast
   ========================================================= */

/* ---------- Data ---------- */
const PRODUCTS = [
  // ----- Fast Food -----
  { id: 1,  name: 'Independence Bundle',  cat: 'fast-food', price: 129000, img: 'independence-bundle', rating: 4.9, time: '15 min', tag: 'Best Offer',  tagColor: '' },
  { id: 2,  name: 'Ultimate Burger Team', cat: 'fast-food', price: 100000, img: 'burger-ultimate',     rating: 4.8, time: '12 min', tag: 'Best Seller', tagColor: 'purple' },
  { id: 3,  name: 'Family Flavor Bundle', cat: 'fast-food', price: 170000, img: 'family-bundle',       rating: 4.7, time: '20 min', tag: 'Family',      tagColor: 'green' },
  { id: 4,  name: 'Classic Cheeseburger', cat: 'fast-food', price: 35000,  img: 'burger-classic',      rating: 4.6, time: '10 min', tag: '',            tagColor: '' },
  { id: 5,  name: 'Double Beef Burger',   cat: 'fast-food', price: 48000,  img: 'burger-double',       rating: 4.7, time: '12 min', tag: 'Hot Pick',    tagColor: '' },
  { id: 6,  name: 'Sesame Cheese Burger', cat: 'fast-food', price: 42000,  img: 'burger-sesame',       rating: 4.5, time: '11 min', tag: '',            tagColor: '' },
  { id: 7,  name: 'Mega Jumbo Burger',    cat: 'fast-food', price: 55000,  img: 'burger-mega',         rating: 4.8, time: '14 min', tag: 'Jumbo',       tagColor: 'purple' },
  { id: 8,  name: 'Pickle BBQ Burger',    cat: 'fast-food', price: 45000,  img: 'burger-bbq',          rating: 4.6, time: '12 min', tag: '',            tagColor: '' },
  { id: 9,  name: 'Mini Cheese Burger',   cat: 'fast-food', price: 28000,  img: 'burger-mini',         rating: 4.4, time: '8 min',  tag: '',            tagColor: '' },
  { id: 10, name: 'Double Pickle Burger', cat: 'fast-food', price: 52000,  img: 'burger-cheese-pickle',rating: 4.7, time: '13 min', tag: '',            tagColor: '' },
  { id: 11, name: 'Spicy Chicken Box',    cat: 'fast-food', price: 38000,  img: 'chicken-box',         rating: 4.7, time: '12 min', tag: 'Spicy',       tagColor: '' },
  { id: 12, name: 'Honey Sesame Wings',   cat: 'fast-food', price: 40000,  img: 'wings',               rating: 4.6, time: '15 min', tag: '',            tagColor: '' },
  // ----- Food -----
  { id: 13, name: 'Korean Bibimbap Bowl', cat: 'food',      price: 45000,  img: 'bibimbap',            rating: 4.8, time: '16 min', tag: 'Fresh',       tagColor: 'green' },
  { id: 14, name: 'Nasi Goreng Spesial',  cat: 'food',      price: 28000,  img: 'nasi-goreng',         rating: 4.6, time: '13 min', tag: '',            tagColor: '' },
  { id: 15, name: 'Nasi Goreng Crispy',   cat: 'food',      price: 32000,  img: 'nasi-goreng-crispy',  rating: 4.7, time: '14 min', tag: '',            tagColor: '' },
  { id: 16, name: 'Ayam Lada Hitam',      cat: 'food',      price: 44000,  img: 'ayam-lada-hitam',     rating: 4.5, time: '15 min', tag: '',            tagColor: '' },
  { id: 17, name: 'Mac & Cheese',         cat: 'food',      price: 30000,  img: 'mac-cheese',          rating: 4.6, time: '10 min', tag: '',            tagColor: '' },
  { id: 18, name: 'Cheesy Lasagna',       cat: 'food',      price: 42000,  img: 'lasagna',             rating: 4.7, time: '18 min', tag: 'Cheesy',      tagColor: 'purple' },
  { id: 19, name: 'Grilled Cheese Toast', cat: 'food',      price: 26000,  img: 'grilled-cheese',      rating: 4.4, time: '8 min',  tag: '',            tagColor: '' },
  { id: 20, name: 'Mashed Potato Gravy',  cat: 'food',      price: 20000,  img: 'mashed-potato',       rating: 4.3, time: '8 min',  tag: '',            tagColor: '' },
  // ----- Ice Drink (termasuk menu teh) -----
  { id: 21, name: 'Boba Milk Tea',        cat: 'ice-drink', price: 22000,  img: 'boba-milk-tea',       rating: 4.8, time: '8 min',  tag: 'Buy 1 Get 1', tagColor: '' },
  { id: 22, name: 'Honey Milk Tea',       cat: 'ice-drink', price: 20000,  img: 'honey-milk-tea',      rating: 4.5, time: '7 min',  tag: '',            tagColor: '' },
  { id: 23, name: 'Classic Milk Tea',     cat: 'ice-drink', price: 18000,  img: 'classic-milk-tea',    rating: 4.5, time: '7 min',  tag: '',            tagColor: '' },
  { id: 24, name: 'Lemon Iced Tea',       cat: 'ice-drink', price: 18000,  img: 'lemon-tea',           rating: 4.6, time: '6 min',  tag: 'Fresh',       tagColor: 'green' },
  { id: 25, name: 'Peach Iced Tea',       cat: 'ice-drink', price: 19000,  img: 'peach-tea',           rating: 4.5, time: '6 min',  tag: '',            tagColor: '' },
  // ----- Ice Cream -----
  { id: 26, name: 'Soft Serve Cone',      cat: 'ice-cream', price: 12000,  img: 'icecream',            rating: 4.6, time: '5 min',  tag: 'Sweet',       tagColor: 'purple' },
  // ----- Donuts -----
  { id: 27, name: 'Pink Sprinkle Donuts', cat: 'donuts',    price: 25000,  img: 'donut',               rating: 4.8, time: '8 min',  tag: 'Hot Pick',    tagColor: '' }
];

const CATEGORIES = [
  { key: 'ice-drink', label: 'Ice Drink', img: 'lemon-tea' },
  { key: 'fast-food', label: 'Fast Food', img: 'burger-classic' },
  { key: 'ice-cream', label: 'Ice Cream', img: 'icecream' },
  { key: 'donuts',    label: 'Donuts',    img: 'donut' },
  { key: 'food',      label: 'Food',      img: 'bibimbap' }
];

/* path gambar menu */
const imgSrc = name => `img/${name}.webp`;

const SORTS = [
  { key: 'default', label: '' },
  { key: 'low',     label: 'Sorted by: lowest price' },
  { key: 'high',    label: 'Sorted by: highest price' },
  { key: 'rating',  label: 'Sorted by: top rated' }
];

const FREE_DELIVERY_MIN = 100000;
const DELIVERY_FEE = 10000;

/* ---------- State ---------- */
const state = {
  view: 'home',        // 'home' | 'fav'
  category: null,
  query: '',
  sort: 0,
  grid: false,
  favs: load('ky_favs', []),
  cart: [],     // [{ id, qty }]  -> mulai kosong tiap halaman dibuka
  notifs: [],   // [{ id, title, text, time, read }]
  table: ''     // nomor meja, diambil dari link QR: ?meja=12
};

// buang data lama di localStorage yang id-nya sudah tidak ada
state.favs = state.favs.filter(id => PRODUCTS.some(p => p.id === id));

// nomor meja dari link QR, contoh: index.html?meja=12
state.table = (new URLSearchParams(location.search).get('meja') || '')
  .replace(/[^\w\-]/g, '').slice(0, 4);

/* ---------- Helpers ---------- */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
const byId = id => PRODUCTS.find(p => p.id === Number(id));

/* semua teks dari pengguna di-escape sebelum masuk innerHTML */
const esc = str => String(str ?? '').replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage tidak tersedia */ }
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-show'), 1800);
}

const ICON_PLUS  = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';
const ICON_HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.3-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.3 6c-2.3 4.5-9.3 9-9.3 9z"/></svg>';

const EMPTY_FAV = `
  <div class="empty-fav">
    <div class="empty-fav__icons">
      <svg viewBox="0 0 64 64" class="ef-burger" aria-hidden="true">
        <path d="M8 26a24 20 0 0 1 48 0z" fill="currentColor" stroke="none"/>
        <circle cx="25" cy="15" r="2" fill="#fff" stroke="none"/><circle cx="36" cy="11" r="1.6" fill="#fff" stroke="none"/>
        <rect x="8" y="30" width="48" height="5" rx="2.5" fill="currentColor" stroke="none"/>
        <path d="M8 39h48a0 0 0 0 1 0 0 14 12 0 0 1-14 11H22A14 12 0 0 1 8 39z" fill="currentColor" stroke="none"/>
        <path d="M22 39l10 6 10-6z" fill="#fff" stroke="none"/>
      </svg>
      <svg viewBox="0 0 64 64" class="ef-cup" aria-hidden="true">
        <path d="M30 14V6h12" stroke-width="3.5"/>
        <path d="M12 16h40" stroke-width="4"/>
        <path d="M16 20h32l-3.5 34a4 4 0 0 1-4 3.5H23.5a4 4 0 0 1-4-3.5z" fill="currentColor" stroke="none"/>
      </svg>
    </div>
    <p>You haven't added any favorite food or drinks here yet.</p>
  </div>`;

/* ---------- Categories ---------- */
function renderCategories() {
  $('#cats').innerHTML = CATEGORIES.map(c => `
    <button class="cat ${state.category === c.key ? 'is-active' : ''}" data-cat="${c.key}" aria-pressed="${state.category === c.key}">
      <div class="cat__icon"><img src="${imgSrc(c.img)}" alt="" loading="lazy"></div>
      <span>${c.label}</span>
    </button>`).join('');
}

/* ---------- Products ---------- */
function visibleProducts() {
  let list = PRODUCTS.slice();

  if (state.view === 'fav') list = list.filter(p => state.favs.includes(p.id));
  if (state.category)       list = list.filter(p => p.cat === state.category);
  if (state.query) {
    const q = state.query.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.replace('-', ' ').includes(q));
  }

  const s = SORTS[state.sort].key;
  if (s === 'low')    list.sort((a, b) => a.price - b.price);
  if (s === 'high')   list.sort((a, b) => b.price - a.price);
  if (s === 'rating') list.sort((a, b) => b.rating - a.rating);
  return list;
}

function renderProducts() {
  const list = visibleProducts();
  const box = $('#picksList');

  // judul
  let title = 'Popular Pick';
  if (state.view === 'fav') title = 'My Favorites';
  else if (state.category) title = CATEGORIES.find(c => c.key === state.category).label;
  $('#picksTitle').textContent = title;

  // tombol View All
  $('#btnViewAll').innerHTML = (state.grid ? 'Show Less' : 'View All') +
    '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  box.classList.toggle('is-grid', state.grid || state.view === 'fav');

  if (!list.length) {
    box.innerHTML = state.view === 'fav' && !state.query
      ? EMPTY_FAV
      : `<div class="empty"><b>No menu found</b>Try another keyword or pick a different category.</div>`;
    return;
  }

  box.innerHTML = list.map(p => `
    <article class="card">
      ${p.tag ? `<span class="card__tag ${p.tagColor ? 'card__tag--' + p.tagColor : ''}">${p.tag}</span>` : ''}
      <button class="card__heart ${state.favs.includes(p.id) ? 'is-on' : ''}" data-fav="${p.id}" aria-label="Favorite ${p.name}">${ICON_HEART}</button>
      <div class="card__plate"><img src="${imgSrc(p.img)}" alt="${p.name}" loading="lazy"></div>
      <h3 class="card__name">${p.name}</h3>
      <p class="card__meta">⭐ ${p.rating} &nbsp;•&nbsp; ${p.time}</p>
      <div class="card__foot">
        <span class="card__price">${rupiah(p.price)}</span>
        <button class="card__add" data-add="${p.id}" aria-label="Add ${p.name} to cart">${ICON_PLUS}</button>
      </div>
    </article>`).join('');
}

/* Halaman aktif -> bulatan merah navbar ikut pindah */
function setNav(key) {
  $$('.nav__btn[data-nav]').forEach(b => {
    const on = b.dataset.nav === key;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-current', on ? 'page' : 'false');
  });
}

function renderView() {
  const v = state.view;   // 'home' | 'fav' | 'promo' | 'profile'
  const show = (sel, on) => { $(sel).hidden = !on; };

  show('#heroSection',  v === 'home' || v === 'promo');
  show('#cats',         v === 'home');
  show('#picksSection', v === 'home' || v === 'fav');
  show('#promo',        v === 'home' || v === 'promo');
  show('#profileView',  v === 'profile');
  show('.search',       v !== 'profile');
  if (v === 'profile') $('#sortNote').hidden = true;
  else $('#sortNote').hidden = state.sort === 0;

  $('#searchInput').placeholder = v === 'fav' ? 'Find what your favorite' : 'Find what you want to eat...';
  $('.picks__head').hidden = v === 'fav';

  setNav(v);
  renderProducts();
  if (v === 'profile') renderProfile();
}

function renderProfile() {
  $('#statOrders').textContent = load('ky_orders', 0);
  $('#statFavs').textContent = state.favs.length;
}

/* ---------- Cart ---------- */
function cartCount() { return state.cart.reduce((n, i) => n + i.qty, 0); }
function cartSubtotal() { return state.cart.reduce((n, i) => n + byId(i.id).price * i.qty, 0); }

function addToCart(id, qty = 1) {
  const item = state.cart.find(i => i.id === Number(id));
  if (item) item.qty += qty; else state.cart.push({ id: Number(id), qty });
  renderCartBadge(true);
  renderCart();
  toast(`${qty}× ${byId(id).name} added to cart`);
}

function changeQty(id, delta) {
  const item = state.cart.find(i => i.id === Number(id));
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter(i => i !== item);
  renderCartBadge(false);
  renderCart();
}

function renderCartBadge(animate) {
  const badge = $('#cartBadge');
  const n = cartCount();
  badge.hidden = n === 0;
  badge.textContent = n;
  if (animate) {
    badge.classList.remove('pop');
    void badge.offsetWidth;
    badge.classList.add('pop');
  }
}

function renderCart() {
  const body = $('#cartBody');
  const foot = $('#cartFoot');

  if (!state.cart.length) {
    foot.hidden = true;
    body.innerHTML = `<div class="empty"><b>Your cart is empty</b>Pick something tasty from the menu and tap +.</div>`;
    return;
  }

  foot.hidden = false;
  body.innerHTML = state.cart.map(i => {
    const p = byId(i.id);
    return `
      <div class="line">
        <div class="line__img"><img src="${imgSrc(p.img)}" alt=""></div>
        <div>
          <p class="line__name">${p.name}</p>
          <p class="line__price">${rupiah(p.price * i.qty)}</p>
        </div>
        <div class="qty">
          <button data-qty="${p.id}" data-d="-1" aria-label="Decrease">−</button>
          <span>${i.qty}</span>
          <button data-qty="${p.id}" data-d="1" aria-label="Increase">+</button>
        </div>
      </div>`;
  }).join('');

  const sub = cartSubtotal();
  const delivery = sub >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  $('#cartSubtotal').textContent = rupiah(sub);
  $('#cartDelivery').textContent = delivery === 0 ? 'Free' : rupiah(delivery);
  $('#cartTotal').textContent = rupiah(sub + delivery);
}

/* ---------- Sheets (cart, order, notif) ---------- */
const SHEETS = ['cartSheet', 'orderSheet', 'notifSheet'];

function openSheet(id) {
  SHEETS.forEach(sid => {
    $('#' + sid).classList.remove('is-open');
    $('#' + sid).setAttribute('aria-hidden', 'true');
  });
  $('#overlay').hidden = false;
  $('#' + id).classList.add('is-open');
  $('#' + id).setAttribute('aria-hidden', 'false');
}
function closeSheets() {
  SHEETS.forEach(sid => {
    $('#' + sid).classList.remove('is-open');
    $('#' + sid).setAttribute('aria-hidden', 'true');
  });
  $('#overlay').hidden = true;
  setNav(state.view);
  resetSwipe();
}
function openCart() { setNav('cart'); openSheet('cartSheet'); }
function closeCart() { closeSheets(); }

function renderTable() {
  const chip = $('#tableChip');
  chip.hidden = !state.table;
  chip.textContent = `Table ${state.table}`;
  const input = $('#tableInput');
  if (input !== document.activeElement) input.value = state.table;
}

async function checkout() {
  if (!state.cart.length) return;

  const table = $('#tableInput').value.trim();
  if (!table) {
    toast('Please enter your table number');
    $('#tableInput').focus();
    return;
  }
  state.table = table;
  renderTable();

  const items = cartCount();
  const sub = cartSubtotal();
  const delivery = sub >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const total = sub + delivery;

  const payload = {
    table,
    note: $('#noteInput').value.trim(),
    items: state.cart.map(i => ({ id: i.id, name: byId(i.id).name, qty: i.qty, price: byId(i.id).price })),
    subtotal: sub, delivery, total
  };

  const btn = $('#btnCheckout');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const saved = await KY.createOrder(payload);
    const code = KY.shortCode(saved.id);

    pushNotif(`Order ${code} sent 🎉`, `Table ${table} • ${items} item${items > 1 ? 's' : ''} • ${rupiah(total)} — waiting for the kitchen.`);
    save('ky_orders', load('ky_orders', 0) + 1);

    $('#cartFoot').hidden = true;
    $('#cartBody').innerHTML = `
      <div class="success">
        <div class="success__emoji">🎉</div>
        <h3>Order ${esc(code)} placed!</h3>
        <p>Table ${esc(table)} · The kitchen has received your order. We'll let you know when it's ready.</p>
      </div>`;
    state.cart = [];
    $('#noteInput').value = '';
    renderCartBadge(false);
    watchOrder(saved.id);
  } catch (err) {
    toast('Could not send the order. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Checkout';
  }
}

/* pantau status pesanan dari dapur, lalu beri tahu pelanggan */
function watchOrder(id) {
  let last = 'baru';
  const timer = setInterval(async () => {
    try {
      const o = await KY.getOrder(id);
      if (!o || o.status === last) return;
      last = o.status;
      const code = KY.shortCode(id);
      if (o.status === 'diproses') { pushNotif('Being prepared 👨‍🍳', `Order ${code} is now being cooked.`); toast('Your order is being prepared 👨‍🍳'); }
      if (o.status === 'siap')     { pushNotif('Ready! 🍽️', `Order ${code} is on its way to table ${o.table}.`); toast('Your order is ready 🍽️'); }
      if (o.status === 'batal')    { pushNotif('Order cancelled', `Order ${code} was cancelled by the kitchen.`); }
      if (['selesai', 'batal'].includes(o.status)) clearInterval(timer);
    } catch { /* koneksi putus sebentar, coba lagi di putaran berikutnya */ }
  }, 3000);
}

/* ---------- Order sheet: pilih jumlah + geser untuk pesan ---------- */
const order = { id: null, qty: 1 };

function openOrder(id) {
  const p = byId(id);
  if (!p) return;
  order.id = p.id;
  order.qty = 1;
  $('#orderImg').src = imgSrc(p.img);
  $('#orderImg').alt = p.name;
  $('#orderName').textContent = p.name;
  $('#orderMeta').textContent = `⭐ ${p.rating}  •  ${p.time}`;
  $('#orderPrice').textContent = rupiah(p.price) + ' / item';
  renderOrderQty();
  resetSwipe();
  openSheet('orderSheet');
}

function renderOrderQty() {
  const p = byId(order.id);
  $('#qtyVal').textContent = order.qty;
  $('#orderTotal').textContent = rupiah(p.price * order.qty);
  $('#qtyMinus').disabled = order.qty <= 1;
}

/* slider "geser seperti buka kunci" */
const swipe = { pos: 0, max: 0, drag: false, startX: 0, done: false };

function setSwipe(x) {
  swipe.pos = x;
  const handle = $('#swipeHandle');
  handle.style.transform = `translateX(${x}px)`;
  const half = handle.offsetWidth / 2 + 4;           // sampai tengah bulatan
  $('#swipeFill').style.width = swipe.done ? '100%' : (x > 0 ? (x + half) + 'px' : '0px');
  $('#swipeLabel').style.opacity = swipe.done ? 1 : Math.max(0, 1 - x / ((swipe.max || 200) * 0.55));
}

function resetSwipe() {
  swipe.done = false;
  swipe.drag = false;
  const track = $('#swipeTrack');
  track.classList.remove('is-drag', 'is-done');
  $('#swipeLabel').textContent = 'Slide to add to cart';
  setSwipe(0);
}

function completeSwipe() {
  if (swipe.done) return;
  swipe.done = true;
  $('#swipeTrack').classList.add('is-done');
  $('#swipeLabel').textContent = 'Added to cart';
  setSwipe(swipe.max || ($('#swipeTrack').clientWidth - $('#swipeHandle').offsetWidth - 8));
  addToCart(order.id, order.qty);
  setTimeout(closeSheets, 650);
}

function initSwipe() {
  const track = $('#swipeTrack');
  const handle = $('#swipeHandle');
  const calcMax = () => track.clientWidth - handle.offsetWidth - 8;

  handle.addEventListener('pointerdown', e => {
    if (swipe.done) return;
    swipe.drag = true;
    swipe.max = calcMax();
    swipe.startX = e.clientX - swipe.pos;
    handle.setPointerCapture(e.pointerId);
    track.classList.add('is-drag');
  });
  handle.addEventListener('pointermove', e => {
    if (!swipe.drag) return;
    setSwipe(Math.min(Math.max(0, e.clientX - swipe.startX), swipe.max));
  });
  const end = () => {
    if (!swipe.drag) return;
    swipe.drag = false;
    track.classList.remove('is-drag');
    if (swipe.pos >= swipe.max * 0.85) completeSwipe();
    else setSwipe(0);                       // belum sampai ujung -> balik lagi
  };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);

  // akses keyboard
  handle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault();
      swipe.max = calcMax();
      completeSwipe();
    }
  });

  $('#qtyMinus').addEventListener('click', () => { order.qty = Math.max(1, order.qty - 1); renderOrderQty(); });
  $('#qtyPlus').addEventListener('click',  () => { order.qty = Math.min(99, order.qty + 1); renderOrderQty(); });
}

/* ---------- Notifikasi ---------- */
function pushNotif(title, text) {
  state.notifs.unshift({ id: Date.now(), title, text, time: Date.now(), read: false });
  state.notifs = state.notifs.slice(0, 20);
  renderBell();
}

function renderBell() {
  const n = state.notifs.filter(x => !x.read).length;
  const badge = $('#bellBadge');
  badge.hidden = n === 0;
  badge.textContent = n;
}

function renderNotifs() {
  const body = $('#notifBody');
  if (!state.notifs.length) {
    body.innerHTML = `<div class="empty"><b>No notifications yet</b>We'll let you know when your order is on its way.</div>`;
    return;
  }
  body.innerHTML = state.notifs.map(n => `
    <div class="notif ${n.read ? '' : 'is-new'}">
      <div class="notif__icon">🧾</div>
      <div class="notif__text">
        <p class="notif__title">${esc(n.title)}</p>
        <p class="notif__desc">${esc(n.text)}</p>
      </div>
      <span class="notif__time">${new Date(n.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
    </div>`).join('');
}

function openNotifs() {
  renderNotifs();
  openSheet('notifSheet');
  state.notifs.forEach(n => { n.read = true; });   // badge hilang setelah dibuka
  renderBell();
}

/* ---------- Hero carousel ---------- */
function initHero() {
  const track = $('#heroTrack');
  const slides = $$('.slide', track);
  const dots = $('#heroDots');
  let index = 0, timer;

  dots.innerHTML = slides.map((_, i) => `<button aria-label="Slide ${i + 1}" data-slide="${i}"></button>`).join('');
  const setDot = () => $$('button', dots).forEach((d, i) => d.classList.toggle('is-active', i === index));
  const goTo = i => {
    index = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[index].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setDot();
  };

  dots.addEventListener('click', e => {
    const b = e.target.closest('[data-slide]');
    if (b) { goTo(Number(b.dataset.slide)); restart(); }
  });

  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index && i >= 0 && i < slides.length) { index = i; setDot(); }
  }, { passive: true });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = () => { if (!reduce) timer = setInterval(() => goTo(index + 1), 4500); };
  const stop = () => clearInterval(timer);
  const restart = () => { stop(); start(); };

  track.addEventListener('pointerdown', stop);
  track.addEventListener('pointerup', restart);
  setDot();
  start();
}

/* ---------- Events ---------- */
function bindEvents() {
  // pencarian
  $('#searchInput').addEventListener('input', e => {
    state.query = e.target.value.trim();
    if (state.view === 'promo') { state.view = 'home'; renderView(); }
    else renderProducts();
  });

  // sortir
  $('#btnSort').addEventListener('click', () => {
    state.sort = (state.sort + 1) % SORTS.length;
    const note = $('#sortNote');
    note.hidden = state.sort === 0;
    note.textContent = SORTS[state.sort].label;
    renderProducts();
  });

  // kategori (klik lagi = batal)
  $('#cats').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    state.category = state.category === b.dataset.cat ? null : b.dataset.cat;
    renderCategories();
    renderProducts();
  });

  // view all
  $('#btnViewAll').addEventListener('click', () => {
    state.grid = !state.grid;
    renderProducts();
  });

  // klik pada daftar produk: favorit & tambah
  $('#picksList').addEventListener('click', e => {
    const fav = e.target.closest('[data-fav]');
    const add = e.target.closest('[data-add]');
    if (fav) {
      const id = Number(fav.dataset.fav);
      const on = state.favs.includes(id);
      state.favs = on ? state.favs.filter(f => f !== id) : [...state.favs, id];
      save('ky_favs', state.favs);
      toast(on ? 'Removed from favorites' : 'Saved to favorites');
      renderProducts();
    }
    if (add) openOrder(add.dataset.add);
  });

  // tombol ORDER di banner
  $('#app').addEventListener('click', e => {
    const o = e.target.closest('[data-order]');
    if (o) openOrder(o.dataset.order);
  });

  // keranjang
  $('#btnCart').addEventListener('click', openCart);
  $('#btnCloseCart').addEventListener('click', closeSheets);
  $('#btnCloseOrder').addEventListener('click', closeSheets);
  $('#btnCloseNotif').addEventListener('click', closeSheets);
  $('#overlay').addEventListener('click', closeSheets);
  $('#btnCheckout').addEventListener('click', checkout);
  $('#cartBody').addEventListener('click', e => {
    const q = e.target.closest('[data-qty]');
    if (q) changeQty(q.dataset.qty, Number(q.dataset.d));
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheets(); });

  // notifikasi
  $('#btnBell').addEventListener('click', openNotifs);

  // nomor meja (boleh diketik manual kalau tidak scan QR)
  $('#tableInput').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^\w\-]/g, '').slice(0, 4);
    state.table = e.target.value;
    renderTable();
  });

  // navigasi bawah
  $$('.nav__btn').forEach(btn => btn.addEventListener('click', () => {
    const go = btn.dataset.nav;
    if (go === 'cart') { openCart(); return; }
    state.view = go;                 // home | fav | promo | profile
    renderView();
    $('#screen').scrollTo({ top: 0 });
  }));

  // menu profil
  $('#profileView').addEventListener('click', e => {
    const b = e.target.closest('[data-soon]');
    if (b) toast(`${b.dataset.soon} is coming soon`);
  });
}

/* ---------- Init ---------- */
renderCategories();
renderView();
renderCart();
renderCartBadge(false);
renderBell();
renderTable();
initSwipe();
initHero();
bindEvents();
