# Lab11Web_VueJS - Pemrograman Web 2 (SPA & Security)

Repository ini memuat hasil praktikum **Modul 11, 12, 13, dan 14** mengenai implementasi VueJS sebagai *Single Page Application* (SPA), Vue Router, Axios Interceptors, dan perlindungan rute (*Navigation Guards*).

## Praktikum 11 & 12: Dasar VueJS & Vue Router (SPA)
### Jawaban Pertanyaan dan Tugas
**1. Selesaikan semua langkah praktikum di atas.**
**Jawaban:** Langkah-langkah inisiasi Vue, *binding* data, *event handling*, hingga perakitan *Vue Router* telah dikerjakan dan berjalan normal.

**2. Tambahkan satu rute baru (/about) beserta komponen About.js baru yang berisi profil singkat Anda. Masukkan tautan rutenya ke dalam menu navigasi atas pada index.html.**
**Jawaban:** Rute `/about` sukses di daftarkan di `app.js` dan komponen `About.js` telah dibuat. Tautan pada `index.html` menggunakan `<router-link to="/about">` sudah beroperasi dan otomatis ter-_highlight_ ketika diakses.

**3. Lakukan pengujian perpindahan halaman menu (Beranda, Kelola Artikel, dan About) dan pastikan browser tidak melakukan hard-reload (SPA bekerja).**
**Jawaban:** Hasil uji coba membuktikan perpindahan antara halaman Home, Artikel, dan About terjadi secara instan dengan mengambil komponen secara dinamis ke dalam `<router-view>` tanpa menimbulkan _hard-reload_ pada web _browser_.

---

## Praktikum 13 & 14: SPA Security, API Token Authentication & Interceptors

### Jawaban Pertanyaan dan Tugas - Modul 13

**Analisis Alur Kerja `router.beforeEach` dan Axios HTTP Post:**
- **`router.beforeEach`**: Berfungsi sebagai pos satpam di sisi antarmuka (Client-Side). Sebelum halaman (seperti `/artikel` atau `/about`) dimuat secara penuh oleh browser, fungsi ini mencegat navigasi tersebut untuk memeriksa apakah terdapat jejak sesi login (kunci `isLoggedIn`) di dalam _Local Storage_. Jika kunci ini tidak ada, pengguna otomatis ditolak dan diarahkan paksa ke halaman `/login`.
- **Axios HTTP Post**: Berfungsi sebagai kurir pengantar pesan. Saat di halaman login, fungsi ini akan mengemas data _username_ dan _password_, lalu mengirimkannya ke backend CI4. Axios kemudian akan menunggu respons dari server; jika berhasil (status 200), Axios akan mengambil _Token Rahasia_ yang dikembalikan server untuk disimpan ke dalam memori browser.

---

### Jawaban Pertanyaan dan Tugas - Modul 14

**Kesimpulan Perbedaan Navigation Guards (Vue) vs Filters (CI4):**
Perbedaan mendasarnya terletak pada letak pertahanannya:
- **Vue Router Navigation Guards (Sisi Klien):** Pengamanan ini hanya berfokus pada **UI/Tampilan (Visual)**. Ini mencegah orang asing melihat halaman Dasbor Admin di browser. Namun, ini tidak bisa mencegah seorang _Hacker_ yang mahir dari mengakses atau memanipulasi _database_ secara langsung menggunakan aplikasi pengujian API seperti _Postman_ atau _cURL_ (tanpa melewati browser).
- **CodeIgniter Filters (Sisi Server):** Ini adalah **Benteng Pertahanan Utama (Data)**. Sekalipun seseorang berhasil memanipulasi _browser_ untuk bisa membuka halaman Vue, ketika ia mencoba memanipulasi data melalui API Endpoint, permintaan tersebut akan langsung menembus ke server CI4. Di titik inilah `ApiAuthFilter` akan membanting pintu dan memblokir request tersebut dengan pesan *Error 401 Unauthorized* jika tidak disertai dengan _Token_ otentikasi yang sah.

Kombinasi antara _Navigation Guards_ (menyembunyikan tampilan) dan _CI4 Filters_ (melindungi data) menghasilkan sistem aplikasi SPA yang kokoh secara menyeluruh (_End-to-End Security_).
