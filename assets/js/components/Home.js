// Home Component
const Home = {
    template: `
        <div class="home-container" style="padding: 20px;">
            <h2 style="color: #2b6cb0; margin-bottom: 15px;">Selamat Datang</h2>
            <p style="font-size: 16px; color: #4a5568; line-height: 1.6; margin-bottom: 25px;">Aplikasi manajemen artikel berbasis VueJS 3 dengan REST API CodeIgniter 4. 
               Aplikasi ini merupakan hasil praktikum Pemrograman Web 2.</p>

            <div class="feature-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div class="feature-item" style="background: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <h3 style="color: #2d3748; margin-bottom: 10px; font-size: 18px;">Fitur CRUD Terintegrasi</h3>
                    <p style="color: #718096; font-size: 14px;">Mendukung operasi Tambah, Ubah, Hapus, dan Lihat artikel secara dinamis.</p>
                </div>
                <div class="feature-item" style="background: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <h3 style="color: #2d3748; margin-bottom: 10px; font-size: 18px;">Koneksi REST API</h3>
                    <p style="color: #718096; font-size: 14px;">Mengambil data aktual menggunakan endpoints REST API dari CodeIgniter 4.</p>
                </div>
                <div class="feature-item" style="background: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <h3 style="color: #2d3748; margin-bottom: 10px; font-size: 18px;">Arsitektur SPA</h3>
                    <p style="color: #718096; font-size: 14px;">Menerapkan Single Page Application menggunakan komponen Vue Router.</p>
                </div>
            </div>
        </div>
    `
};
