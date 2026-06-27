# FrontendDevReactjs-RahmatHedo

Tugas Technical Test - Front End Developer

---

### Informasi Project & Environment

- **Reactjs version**: `19.2.7`
- **Node version**: `24.11.0` (compatible dengan Node `18+` / `20+` / `22+`)
- **API Source**: **Dicoding Restaurant API** (`https://restaurant-api.dicoding.dev`)

---

### How to Start Project

Project ini dibuat menggunakan **npm** dan **Vite** + **Tailwind CSS**. Ikuti langkah-langkah di bawah untuk memulai project secara lokal:

#### Menggunakan NPM:
1. **Clone repository**:
   ```bash
   git clone https://github.com/RahmatHedo/TechTest_RahmatHedo.git
   cd TechTest_RahmatHedo
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```
4. **Build untuk Production**:
   ```bash
   npm run build
   ```

#### Menggunakan YARN (Alternatif):
1. **Install dependencies**:
   ```bash
   yarn install
   ```
2. **Start Development Server**:
   ```bash
   yarn dev
   ```
3. **Build untuk Production**:
   ```bash
   yarn build
   ```

---

### Username & Password untuk Login

- **Username**: *Tidak diperlukan (Aplikasi ini merupakan direktori publik dan tidak membutuhkan login/autentikasi)*
- **Password**: *Tidak diperlukan*

---

### Web Hosting & Deployment

- **Web Hosting**: [netlify.com](https://netlify.com)
- **GitHub Repository**: [https://github.com/RahmatHedo/TechTest_RahmatHedo](https://github.com/RahmatHedo/TechTest_RahmatHedo)
- **Deployment URL**: *(Silakan deploy folder `dist` hasil `npm run build` ke netlify.com Anda)*

---

### Fitur yang Diimplementasikan

1. **Main Page**:
   - Menampilkan grid list restoran dengan paginasi (12 item per halaman).
   - **Open Now**: Filter client-side untuk memisahkan restoran yang buka dan tutup.
   - **Price**: Filter client-side untuk memilih tingkat harga (`$`, `$$`, `$$$`, `$$$$`).
   - **Categories**: Filter server-side dengan memicu query pencarian API `/search?q=<category>` dilengkapi dengan loading spinner.
   - **Search Input**: Input bar pencarian restoran berdasarkan nama, menu, atau kategori via API `/search?q=<query>`.
   - **Clear All**: Menghapus semua filter dan text pencarian kembali ke kondisi awal.

2. **Detail Page**:
   - Menampilkan Nama Restoran, Rating (dalam bentuk bintang), Foto banner besar, Address & City (diambil secara dinamis dari API), dan deskripsi lengkap.
   - **Location Map**: Mockup peta interaktif dengan SVG, lengkap dengan marker restoran, tombol zoom pan, dan koordinat.
   - **Reviews Section**: Menampilkan daftar review pelanggan dari API.
   - **Add Review Form**: Form interaktif untuk mengirim review baru ke endpoint POST `/review` Dicoding API. Review baru akan muncul di daftar review seketika setelah sukses diposting.
