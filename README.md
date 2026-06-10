# 📚 Laporan Praktikum Pemrograman Web (Lab11Web_VueJS)

Repositori Frontend (*Client-side*) yang sepenuhnya bergantung pada ekosistem **VueJS 3**, melingkupi **Modul 11, 12, 13, dan 14**.

---

# 📖 Praktikum 11: Framework VueJS Dasar

### 🎯 Tujuan Praktikum
Memahami fundamental reaktivitas *Framework Frontend Vue.js* dan merakit aplikasi melalui `Vite` Node.js.

### 🛠️ Penjelasan dan Langkah-langkah Praktikum
1. **Inisialisasi Project**: Melakukan _scaffolding_ instalasi melalui `npm init vue@latest`.
2. **Reaktivitas Dasar**: Mengenal deklarasi variabel reaktif di Vue (seperti `ref()` dan `reactive()`) dan mengikat data (*Two-Way Data Binding*) dengan atribut `v-model`.
3. **Render UI**: Membuka arsitektur kerangka dasar `App.vue` dan melakukan kompilasi peladen dev lokal (Vite Dev Server).


### 💡 Pertanyaan dan Tugas
> **Pertanyaan:**  
> Selesaikan program VueJS Dasar sesuai Langkah-langkah yang ada.
> 
> **Jawaban & Implementasi:**  
> Vue Framework telah ter-_install_ dengan aman tanpa ada galat _dependencies_, dan halaman pembuka Vue merespon dengan sangat mulus di sisi _Localhost_.

### 📸 Screenshot Hasil Kerja
> **Silakan ganti tag `#` di bawah ini dengan URL gambar Anda**
> ![Hasil Praktikum](#)

---

# 📖 Praktikum 12: SPA & Vue Router

### 🎯 Tujuan Praktikum
Mengonfigurasi Vue.JS menjadi *Single Page Application* murni menggunakan Modul Sistem `Vue Router`.

### 🛠️ Penjelasan dan Langkah-langkah Praktikum
1. **Registrasi Rute**: Mendeklarasikan daftar direktori (_Router Array_) pada file `app.js` yang memetakan *String Path* (misal `/artikel`) dengan Komponen (misal `Artikel.vue`).
2. **Pengambilan Data (Fetch)**: Menghubungkan *Lifecycle Hooks* Vue (`onMounted`) dengan HTTP Request **Axios** untuk merenggut *Array of Objects* (Data Artikel) dari API (CodeIgniter 4 repositori sebelah).
3. **Komponen Dinamis**: Memanfaatkan _tag_ elemen khusus Vue `<router-view>` untuk membongkar pasang modul antarmuka tanpa perlu proses *Hard Reload*.


### 💡 Pertanyaan dan Tugas
> **Pertanyaan:**  
> 1. Selesaikan semua langkah praktikum di atas.
> 2. Tambahkan satu rute baru (/about) beserta komponen About.js baru yang berisi profil singkat Anda (Nama, NIM, Kelas, dan Foto/Avatar). Masukkan tautan rutenya ke dalam menu navigasi atas pada index.html.
> 3. Lakukan pengujian perpindahan halaman menu (Beranda, Kelola Artikel, dan About) dan pastikan browser tidak melakukan hard-reload (SPA bekerja).
> 
> **Jawaban & Implementasi:**  
> 1. Komponen dasar diselesaikan.
> 2. Komponen _profile_ buatan kustom `About.js` dan _Router Link_ telah didaftarkan di Menu Atas. 
> 3. Perpindahan halaman dipastikan tidak mengalami _refresh_ utuh (*Zero Reload*).

### 📸 Screenshot Hasil Kerja
> **Silakan ganti tag `#` di bawah ini dengan URL gambar Anda**
> ![Hasil Praktikum](#)

---

# 📖 Praktikum 13: Keamanan SPA (Vue Navigation Guards)

### 🎯 Tujuan Praktikum
Mencegah Penyusup tanpa identitas masuk secara ilegal ke Rute rahasia (*Admin Panel*) dari antarmuka Web SPA.

### 🛠️ Penjelasan dan Langkah-langkah Praktikum
1. **Membuat Form Login UI**: Merancang `Login.vue` untuk merekam _input string_ `email` dan `password`.
2. **Konektivitas Token**: Saat melakukan _login submit_, sistem menggunakan Axios `POST` ke CodeIgniter Backend. Jika cocok, CI4 mengembalikan *String Hash Token Rahasia*. Vue menyimpannya rapat-rapat di memori pelacak `localStorage`.
3. **Global Navigation Guard**: Menyisipkan kode `router.beforeEach` sebagai "satpam". Ia akan memeriksa izin jalan (`requiresAuth`), dan memblokir akses jika *Token* gagal ditemukan.


### 💡 Pertanyaan dan Tugas
> **Pertanyaan:**  
> Analisis Alur Kerja `router.beforeEach` dan Axios HTTP Post. (Modul 13)
> 
> **Jawaban & Implementasi:**  
> - **`router.beforeEach`**: Berfungsi layaknya gerbang tol otomatis di antarmuka (Client-Side). Jika pengguna tak memiliki karcis sesi di _Local Storage_, ia dipaksa putar balik ke rute `/login`.
> - **Axios HTTP Post**: Fungsi ini mengemas ID dan Password, menyepakete data, lalu berbisik (_Request_) kepada Backend API CI4 guna ditukarkan dengan Kunci Keamanan Baru (*Token*).

### 📸 Screenshot Hasil Kerja
> **Silakan ganti tag `#` di bawah ini dengan URL gambar Anda**
> ![Hasil Praktikum](#)

---

# 📖 Praktikum 14: Axios Interceptors & API Token Authentication

### 🎯 Tujuan Praktikum
Menyempurnakan protokol komunikasi dengan cara membubuhi pengamanan (*Authorization Bearer Header*) di setiap aktivitas HTTP.

### 🛠️ Penjelasan dan Langkah-langkah Praktikum
Mengapa harus dilakukan? Karena meskipun Vue memblokir UI dengan _Guards_ di Modul 13, peretas masih bisa langsung melakukan `POST/DELETE` API dengan cURL jika sisi Server (CI4) tidak dijaga ketat.
1. **CI4 Filters (Server Side)**: Mengunci Backend! Setiap aktivitas ke `routes->group('post')` harus melalui pemeriksaan Validitas Token (*JWT*).
2. **Vue Axios Interceptor (Client Side)**: Daripada menempelkan Token secara manual satu-per-satu di file _Component_, Axios dikonfigurasi secara global. Setiap kali ada _Request_ berjalan, ia diam-diam disuntikkan parameter `Authorization: Bearer <T0K3N>` sebelum menyeberang menuju CI4 Server.


### 💡 Pertanyaan dan Tugas
> **Pertanyaan:**  
> Kesimpulan Perbedaan Navigation Guards (Vue) vs Filters (CI4). (Modul 14)
> 
> **Jawaban & Implementasi:**  
> - **Vue Router Navigation Guards (Sisi Klien):** Hanya berfokus pada estetika **UI/Tampilan**. Ini tidak dapat mencegah peretas memanipulasi _database_ langsung secara luar.
> - **CodeIgniter Filters (Sisi Server):** Merupakan **Benteng Pertahanan Utama (Data/Logika Core)**. Segala *query* masuk ditahan mutlak oleh Backend jika *Token Autentikasi* tidak sah.
> *Kesimpulan*: Penggabungan kedua teknologi ini menjadikan sistem SPA sangat kebal (*End-to-End Security*).

### 📸 Screenshot Hasil Kerja
> **Silakan ganti tag `#` di bawah ini dengan URL gambar Anda**
> ![Hasil Praktikum](#)

---

