// firebase-loader.ts
// Firebase Realtime Database integration for Sweet Crumb

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// ─────────────────────────────────────────────
// 1. FIREBASE CONFIG (from environment variables)
// ─────────────────────────────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// ─────────────────────────────────────────────
// 2. TYPES
// ─────────────────────────────────────────────
interface Config {
  WA_NUMBER?: string;
  STORE_STREET?: string;
  STORE_DISTRICT?: string;
  STORE_CITY?: string;
  STORE_HOURS?: string;
}

interface MenuItem {
  name?: string;
  description?: string;
  price?: number;
  tag?: string;
  type?: string;
  image_url?: string;
}

interface Menu {
  [key: string]: MenuItem;
}

interface FirebaseData {
  config?: Config;
  menu?: Menu;
}

// ─────────────────────────────────────────────
// 3. INIT FIREBASE
// ─────────────────────────────────────────────
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ─────────────────────────────────────────────
// 4. HELPERS
// ─────────────────────────────────────────────
function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  } else {
    console.warn(`[firebase-loader] #${id} tidak ditemukan`);
  }
}

function setImg(id: string, src?: string, alt?: string): void {
  const el = document.getElementById(id) as HTMLImageElement;
  if (!el) return;
  if (src) el.src = `${src}?auto=format&fit=crop&w=900&q=80`;
  if (alt) el.alt = alt;
}

function formatRupiah(value?: number): string {
  if (!value && value !== 0) return '-';
  return Number(value).toLocaleString('id-ID');
}

// ─────────────────────────────────────────────
// 5. APPLY CONFIG (CONTACT sheet)
// ─────────────────────────────────────────────
function applyConfig(config?: Config): string {
  if (!config) return '';
  setText('STORE_STREET', config.STORE_STREET || '-');
  setText('STORE_DISTRICT', config.STORE_DISTRICT || '-');
  setText('STORE_CITY', config.STORE_CITY || '-');
  setText('STORE_HOURS', config.STORE_HOURS || '-');
  return config.WA_NUMBER || '';
}

// ─────────────────────────────────────────────
// 6. APPLY MENU (MENU sheet)
// ─────────────────────────────────────────────
function applyMenu(menu?: Menu): void {
  if (!menu) return;

  const menuMap = [
    {
      id: '000_CLASSIC_DONUT',
      imgEl: 'img-000',
      nameEl: 'name-000',
      descEl: 'desc-000',
      priceEl: 'price-000',
      tagEl: 'tag-000',
      typeEl: 'type-000'
    },
    {
      id: '001_CHOCO_SPRINKLE',
      imgEl: 'img-001',
      nameEl: 'name-001',
      descEl: 'desc-001',
      priceEl: 'price-001',
      tagEl: 'tag-001',
      typeEl: 'type-001'
    },
    {
      id: '002_VANILLA_CAKE',
      imgEl: 'img-002',
      nameEl: 'name-002',
      descEl: 'desc-002',
      priceEl: 'price-002',
      tagEl: 'tag-002',
      typeEl: 'type-002'
    },
    {
      id: '003_CHOCO_FUDGE',
      imgEl: 'img-003',
      nameEl: 'name-003',
      descEl: 'desc-003',
      priceEl: 'price-003',
      tagEl: 'tag-003',
      typeEl: 'type-003'
    }
  ];

  menuMap.forEach((m) => {
    const item = menu[m.id];
    if (!item) return;
    setImg(m.imgEl, item.image_url, item.name);
    setText(m.nameEl, item.name || '-');
    setText(m.descEl, item.description || '-');
    setText(m.priceEl, formatRupiah(item.price));
    setText(m.tagEl, item.tag || '-');
    setText(m.typeEl, item.type || '-');
  });
}

// ─────────────────────────────────────────────
// 7. SETUP FORM WHATSAPP
// ─────────────────────────────────────────────
function setupWhatsappForm(waNumber: string): void {
  const form = document.getElementById('iq20pk') as HTMLFormElement;
  const nama = document.getElementById('nama-pemesan') as HTMLInputElement;
  const paket = document.getElementById('pilihan-paket') as HTMLSelectElement;
  const pesan = document.getElementById('catatan-pesanan') as HTMLTextAreaElement;

  if (!form || !nama || !paket || !pesan) {
    console.warn('[firebase-loader] Form elements tidak ditemukan');
    return;
  }

  function updatePesan(): void {
    const n = nama.value.trim() || '[nama]';
    const p = paket.value.trim() || '[paket]';
    pesan.value =
      'Halo Sweet Crumb, saya ingin pesan.\n' +
      'Nama: ' + n + '\n' +
      'Paket: ' + p + '\n' +
      'Detail pesanan: ';
  }

  nama.addEventListener('input', updatePesan);
  paket.addEventListener('change', updatePesan);
  updatePesan();

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    if (!waNumber) {
      alert('Nomor WhatsApp belum tersedia, coba beberapa saat lagi.');
      return;
    }
    const text = encodeURIComponent(pesan.value);
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  });
}

// ─────────────────────────────────────────────
// 8. FETCH FIREBASE & INITIALIZE
// ─────────────────────────────────────────────
export function initFirebaseLoader(): void {
  const dbRef = ref(database, '/');
  
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val() as FirebaseData;

    if (!data) {
      console.warn('[firebase-loader] Tidak ada data di Firebase');
      return;
    }

    console.log('[firebase-loader] Data fetched:', data);

    const waNumber = applyConfig(data.config);
    applyMenu(data.menu);
    setupWhatsappForm(waNumber);
  }, (error) => {
    console.error('[firebase-loader] Fetch error:', error);
  });
}
