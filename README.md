# Donat-Almond-Small-Shop
## Sweet Crumb — Donut Shop Website

Website statis modern dengan integrasi Firebase Realtime Database. Cocok untuk toko/bisnis yang ingin punya website dengan konten yang bisa diupdate tanpa perlu deploy ulang.

## 💡 Konsep

**Masalah:** Punya website statis tapi ribet kalau mau ganti harga, menu, atau info kontak. Harus edit code, build ulang, deploy lagi.

**Solusi:** Website ini mengambil data dari Firebase Realtime Database. Ubah data di database → website langsung update otomatis, tanpa perlu build atau deploy ulang!

## ✅ Kelebihan (Pros)

- ✨ **Update konten tanpa coding** - Ubah harga, menu, kontak via Firebase Console
- 🚀 **Tidak perlu deploy ulang** - Perubahan langsung terlihat di website
- 💰 **Gratis** - Firebase free tier cukup untuk website toko kecil
- 📱 **Responsive** - Tampilan bagus di HP dan desktop
- ⚡ **Cepat** - Static site + Firebase CDN = loading super cepat
- 🔗 **WhatsApp integration** - Form order langsung ke WhatsApp

## ⚠️ Kekurangan (Cons)

1. **Nomor WhatsApp harus bisnis, bukan personal**
   - Data diambil secara berkala dari database
   - WhatsApp personal bisa kena limit/banned kalau terlalu banyak request
   - Solusi: Pakai WhatsApp Business API atau nomor bisnis

2. **Data bisa dibaca orang lain**
   - API Firebase yang dipakai untuk read data bisa dilihat di browser (inspect element)
   - Orang lain bisa pakai API yang sama untuk ambil data menu/harga Anda
   - Bahkan kalau JavaScript di-compile jadi 1 line, API endpoint tetap kelihatan
   - **Solusi ke depan:** 
     - Pakai Firebase Security Rules yang lebih ketat (batas rate limit, domain whitelist)
     - Atau pakai backend API dengan authentication
     - Atau enkripsi data sensitif

3. **Perlu setup awal**
   - Harus setup Firebase project dulu
   - Perlu sedikit technical knowledge untuk setup pertama kali

## 🎯 Cocok Untuk

- Toko kue, donut, bakery
- Cafe, warung makan
- Toko online kecil
- Bisnis yang sering update harga/menu
- Yang mau website simple tapi fleksibel

---

## 🏗️ Project Structure

```
sweetcrumb/
├── src/                          # Source files (edit these)
│   ├── index.html               # Main HTML template
│   ├── main.ts                  # TypeScript entry point
│   ├── firebase-loader.ts       # Firebase logic
│   ├── vite-env.d.ts            # TypeScript env definitions
│   └── styles/
│       └── main.scss            # SCSS styles
├── public/                       # Build output (auto-generated, gitignored)
│   ├── index.html               # Compiled HTML
│   ├── index.css                # Compiled CSS (from SCSS)
│   ├── main.js                  # Compiled JavaScript (from TypeScript)
│   └── static/                  # Images (if any)
├── .env                          # ⚠️ PRIVATE - Your Firebase credentials (gitignored)
├── .env.example                  # Template for environment variables
├── .firebaserc                   # ⚠️ PRIVATE - Your Firebase project ID (gitignored)
├── .firebaserc.example           # Template for Firebase project config
├── firebase.json                 # Firebase Hosting configuration
├── database.rules.json           # Firebase Database security rules
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite build configuration
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

Installs: TypeScript, Vite, SASS, Firebase SDK

### 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env and fill in your Firebase credentials

cp .firebaserc.example .firebaserc
# Edit .firebaserc and fill in your Firebase project ID
```

### 3. Development
```bash
npm run dev
# Opens at http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
# Output in public/ folder
```

### 5. Deploy to Firebase Hosting
```bash
npm run deploy
# Or: firebase deploy
```

---

## 🔐 Environment Variables

Firebase API keys are **safe to expose** in frontend code. Firebase security is handled by Security Rules, not by hiding API keys.

Your `.env` file contains:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note:** `.env` is gitignored. Team members should copy `.env.example` and fill in their own credentials.

---

## 📦 What Gets Uploaded to GitHub?

✅ **Committed to Git:**
- `src/` - Source code
- `.env.example` - Template for environment variables
- `.firebaserc.example` - Template for Firebase project config
- `firebase.json` - Firebase Hosting configuration
- `database.rules.json` - Firebase Database security rules
- `package.json` - Dependencies
- `vite.config.ts` - Build config
- `tsconfig.json` - TypeScript config
- `README.md` - This file

❌ **Gitignored (NOT committed):**
- `.env` - Your Firebase credentials
- `.firebaserc` - Your Firebase project ID
- `node_modules/` - Dependencies (run `npm install`)
- `public/` - Build output (run `npm run build`)
- `.firebase/` - Firebase cache

---

## 🌐 Deployment

When you run `npm run build`:
1. TypeScript compiles to JavaScript → `public/main.js`
2. SCSS compiles to CSS → `public/index.css`
3. HTML is processed → `public/index.html`
4. Environment variables are injected into the code
5. Files are minified and optimized
6. Images (if any) go to `public/static/`

**Build Output Structure:**
```
public/
├── index.html      # Main HTML file
├── index.css       # Compiled & minified CSS
├── main.js         # Compiled & minified JavaScript
└── static/         # Images and other assets
```

Firebase Hosting serves the `public/` folder (configured in `firebase.json`).

---

## 👥 Team Collaboration

**For new team members:**
1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Copy `.firebaserc.example` to `.firebaserc`
5. Fill in Firebase credentials in `.env` (get from Firebase Console)
6. Fill in Firebase project ID in `.firebaserc`
7. Run `npm run dev`

**Firebase credentials location:**
- Go to Firebase Console
- Select your project
- Project Settings → General → Your apps → Config
- Copy the values to your `.env` file

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to Firebase Hosting |

---

## 📝 Firebase Database Structure

```json
{
  "config": {
    "WA_NUMBER": "628xxxxxxxxxx",
    "STORE_STREET": "Jl. Example No. 123",
    "STORE_DISTRICT": "District Name",
    "STORE_CITY": "City, Province 12345",
    "STORE_HOURS": "Mon-Sat 08:00-20:00"
  },
  "menu": {
    "000_CLASSIC_DONUT": {
      "name": "Classic Donut",
      "description": "...",
      "price": 28000,
      "tag": "Best Seller",
      "type": "Donut",
      "image_url": "https://..."
    }
  }
}
```

---

## ✨ Benefits of This Structure

1. **TypeScript** - Type safety, better IDE support, fewer bugs
2. **SCSS** - Nested styles, variables, better organization
3. **Vite** - Fast build, hot module replacement, modern tooling
4. **Environment Variables** - Credentials separated from code
5. **Modern Workflow** - Professional setup, easy to maintain
6. **Clean Build Output** - Simple filenames (index.html, index.css, main.js) tanpa hash, mudah di-debug

## 🎨 Build Output Configuration

Project ini dikonfigurasi untuk menghasilkan output yang clean dan mudah dibaca:

- **JavaScript:** `main.js` (bukan `main-[hash].js`)
- **CSS:** `index.css` (bukan `style-[hash].css`)
- **HTML:** `index.html`
- **Images:** `static/[filename]` (jika ada)

Konfigurasi ini ada di `vite.config.ts` → `rollupOptions` → `output`.

---

## 🔒 Security Notes

- Firebase API keys in frontend are **safe and expected**
- Security is enforced via Firebase Security Rules (see `database.rules.json`)
- Never commit `.env` or `.firebaserc` files to Git (both are gitignored)
- Use Firebase Security Rules to restrict database access
- Private keys (service account keys) should NEVER be in frontend code

**Important:** Data in Firebase Realtime Database bisa dibaca orang lain jika mereka tahu API endpoint. Untuk production, gunakan Firebase Security Rules yang lebih ketat.

---

## ❓ Troubleshooting

### `npm run dev` fails
- Make sure Node.js is installed: `node --version`
- Delete `node_modules/` and run `npm install` again

### Firebase doesn't load
- Check browser console for errors
- Verify `.env` file has correct Firebase credentials
- Make sure Firebase Realtime Database rules allow read access

### Build fails
- Check TypeScript errors: `npm run build`
- Fix any type errors in `src/firebase-loader.ts`

### TypeScript error: "Property 'env' does not exist"
- Make sure `src/vite-env.d.ts` exists
- Restart your IDE/editor

### Firebase deploy fails with "No project active"
- Make sure `.firebaserc` file exists (copy from `.firebaserc.example`)
- Fill in your Firebase project ID in `.firebaserc`
- Or run: `firebase use --add` and select your project

### "Module not found" errors
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Restart your development server

---

## 📄 License

Private project for Sweet Crumb.
