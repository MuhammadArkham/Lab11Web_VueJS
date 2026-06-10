const Login = {
    template: `
        <div id="login-wrapper" style="box-shadow: 0 10px 25px rgba(0,0,0,0.05); padding: 40px; border-radius: 16px; background: #fff; margin-top: 20px;">
            <h1 style="color: #2b6cb0; text-align: center; margin-bottom: 30px;">Form Login Admin</h1>
            <form @submit.prevent="handleLogin">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; color: #4a5568; margin-bottom: 8px;">Username / Email</label>
                    <input type="text" v-model="username" required placeholder="admin@email.com" style="width: 100%; padding: 12px 16px; background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; outline: none; transition: border-color 0.2s;">
                </div>
                <div style="margin-bottom: 25px;">
                    <label style="display: block; font-weight: 600; color: #4a5568; margin-bottom: 8px;">Password</label>
                    <input type="password" v-model="password" required placeholder="admin123" style="width: 100%; padding: 12px 16px; background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; outline: none; transition: border-color 0.2s;">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 16px; background: #4299e1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.3s;" :disabled="isLoading">
                    {{ isLoading ? 'Memproses...' : 'Login' }}
                </button>
                <div v-if="errorMsg" class="error-msg" style="margin-top: 15px; padding: 10px; background: #fed7d7; color: #822727; border-radius: 6px; text-align: center; font-size: 14px;">{{ errorMsg }}</div>
            </form>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            errorMsg: '',
            isLoading: false
        }
    },
    methods: {
        async handleLogin() {
            this.isLoading = true;
            this.errorMsg = '';
            
            try {
                // Konfigurasi ini diasumsikan ada apiUrl di root instance atau dari file app.js
                // Karena apiUrl didefinisikan global di app.js, kita bisa langsung pakai
                const response = await axios.post(`${apiUrl}/api/login`, {
                    username: this.username,
                    password: this.password
                });

                if (response.data.status === 200) {
                    // Simpan status dan token ke Local Storage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userToken', response.data.data.token);
                    
                    // Update state Vue utama
                    this.$root.isLoggedIn = true;
                    
                    alert('Login Berhasil!');
                    this.$router.push('/artikel'); // Redirect ke dashboard/artikel
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.errorMsg = 'Username atau Password salah!';
                } else {
                    this.errorMsg = 'Terjadi kesalahan koneksi server.';
                }
            } finally {
                this.isLoading = false;
            }
        }
    }
};
