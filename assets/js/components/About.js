// About Component - Profil Mahasiswa
const About = {
    template: `
        <div class="about-container" style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #edf2f7; text-align: center; max-width: 600px; margin: 0 auto;">
            <img src="assets/img/profile.jpg" alt="Foto Profil" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; box-shadow: 0 10px 15px rgba(66,153,225,0.3); border: 4px solid white; display: block;" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Muhammad+Arkhamullah&background=3182ce&color=fff&size=120';">
            <h2 style="color: #2d3748; margin-bottom: 30px;">Profil Mahasiswa</h2>
            <div class="info" style="text-align: left; background: #f7fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <p style="margin-bottom: 12px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;"><strong style="color: #4a5568; display: inline-block; width: 120px;">Nama:</strong> <span style="color: #2b6cb0; font-weight: 600;">Muhammad Arkhamullah Rifai Asshidiq</span></p>
                <p style="margin-bottom: 12px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;"><strong style="color: #4a5568; display: inline-block; width: 120px;">NIM:</strong> <span style="color: #718096;">312410545</span></p>
                <p style="margin-bottom: 12px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;"><strong style="color: #4a5568; display: inline-block; width: 120px;">Kelas:</strong> <span style="color: #718096;">TI.24.A.5</span></p>
                <p style="margin-bottom: 12px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;"><strong style="color: #4a5568; display: inline-block; width: 120px;">Mata Kuliah:</strong> <span style="color: #718096;">Pemrograman Web 2</span></p>
                <p style="margin-bottom: 0;"><strong style="color: #4a5568; display: inline-block; width: 120px;">Universitas:</strong> <span style="color: #718096;">Universitas Pelita Bangsa</span></p>
            </div>
            <div class="info" style="text-align: left; padding: 0 10px;">
                <h3 style="color: #3182ce; margin-bottom: 10px; font-size: 18px;">Tentang Aplikasi</h3>
                <p style="color: #718096; line-height: 1.6; font-size: 14px;">Aplikasi ini dibuat sebagai tugas akhir praktikum Pemrograman Web 2. Frontend dibangun menggunakan arsitektur modern VueJS 3 SPA (Single Page Application), tersinkronisasi penuh dengan backend REST API CodeIgniter 4.</p>
            </div>
        </div>
    `
};
