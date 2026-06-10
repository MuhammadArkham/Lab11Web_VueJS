# Praktikum 11 & 12: VueJS (Komponen dan Routing SPA)

## Penjelasan Praktikum
Repositori ini adalah bagian antarmuka pengguna (_Frontend_) dari aplikasi yang dibangun secara terpisah menggunakan _Framework_ Vue.JS 3. Di tahap ini, Vue dikonfigurasi sebagai *Single Page Application* (SPA), sehingga navigasi diurus seutuhnya oleh peramban klien via `Vue Router`.

## Langkah-langkah Utama
- Inisialisasi proyek dan perakitan struktur direktori Vue.
- Integrasi *Vue Router* dan pendefinisian rute di `app.js`.
- Pembuatan Komponen Vue (seperti `Home.js`, `Artikel.js`, `About.js`).
- Menarik (fetch) data menggunakan `Axios` HTTP Client menuju API CI4.

## Pertanyaan dan Tugas
> **Pertanyaan:** 1. Selesaikan semua langkah praktikum di atas. 2. Tambahkan satu rute baru (/about) beserta komponen About.js baru yang berisi profil singkat Anda (Nama, NIM, Kelas, dan Foto/Avatar). Masukkan tautan rutenya ke dalam menu navigasi atas pada index.html. 3. Lakukan pengujian perpindahan halaman menu (Beranda, Kelola Artikel, dan About) dan pastikan browser tidak melakukan hard-reload (SPA bekerja).
> **Jawaban:**
> 1. Langkah instalasi Vue 3 sukses tanpa _error_.
> 2. Rute `/about` sukses di daftarkan di `app.js` dan file komponen terpisah `About.js` telah ada di folder _components_. Tautan pada menu atas menggunakan elemen `<router-link to="/about">` beroperasi normal.
> 3. Hasil pengujian menunjukkan perpindahan navigasi (*Routing*) antara Home, Artikel, dan About sangat mulus mengambil komponen dinamis `<router-view>` dan dipastikan _browser_ tidak merespon perpindahan layaknya web tradisional (_zero hard-reload_).

### Screenshot Hasil Kerja
> **Ambil gambar screenshot jalannya program di web browser dan taruh di sini**
> ![Screenshot](#)


---

# Praktikum 13 & 14: SPA Security, API Token Authentication & Interceptors

## Penjelasan Praktikum
Bagian akhir praktikum membahas pertahanan dan keamanan aplikasi (_Security_). Melindungi rute tertentu dari pengguna anonim (*Vue Navigation Guards*), serta membubuhkan pelindung berupa *JSON Web Token* / Autentikasi Kredensial untuk mencegah penyusup menembus sistem dari jalur belakang (API).

## Langkah-langkah Utama
- Implementasi `router.beforeEach` pada sistem Vue Router.
- Membangun antarmuka _Login_ `Login.js`.
- Menyimpan *Token* dan Status Autentikasi ke dalam `localStorage` _browser_.
- Penggunaan **Axios Interceptors** untuk secara otomatis menyuntikkan _Header Authorization Bearer_ di setiap _request_ ke server.

## Pertanyaan dan Tugas (Modul 13)
> **Pertanyaan:** Analisis Alur Kerja `router.beforeEach` dan Axios HTTP Post.
> **Jawaban:**
> - **`router.beforeEach`**: Berfungsi sebagai pos satpam di sisi antarmuka (Client-Side). Sebelum halaman (misal `/artikel`) dimuat oleh browser, fungsi mencegat navigasi untuk memeriksa jejak sesi di _Local Storage_. Jika kunci ini tidak ada, pengguna otomatis ditolak dan diarahkan ke halaman `/login`.
> - **Axios HTTP Post**: Saat di halaman login, fungsi mengemas kredensial lalu mengirimkannya ke backend API CI4. Jika berhasil divalidasi, server memberikan _Token_ untuk disimpan ke dalam memori browser.

## Pertanyaan dan Tugas (Modul 14)
> **Pertanyaan:** Kesimpulan Perbedaan Navigation Guards (Vue) vs Filters (CI4).
> **Jawaban:**
> - **Vue Router Navigation Guards (Sisi Klien):** Hanya berfokus pada **UI/Tampilan (Visual)** (menyembunyikan tampilan admin). Ini tidak dapat mencegah seorang _Hacker_ mengakses _database_ langsung menggunakan _Postman/cURL_.
> - **CodeIgniter Filters (Sisi Server):** Merupakan **Benteng Pertahanan Utama (Data)**. Segala permintaan masuk akan ditahan oleh Filter jika tidak ada *Token* otentikasi yang valid.
> Kombinasi keduanya menghasilkan perlindungan SPA yang utuh (_End-to-End Security_).

### Screenshot Hasil Kerja
> **Ambil gambar screenshot jalannya program di web browser dan taruh di sini**
> ![Screenshot](#)

