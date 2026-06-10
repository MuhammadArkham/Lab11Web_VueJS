const Login = {
    template: `
        <div class="login-container">
            <div class="login-box">
                <h2>Form Login Admin</h2>
                <form @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label>Username / Email</label>
                        <input type="text" v-model="username" required placeholder="admin@email.com">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" v-model="password" required placeholder="admin123">
                    </div>
                    <button type="submit" class="btn-login" :disabled="isLoading">
                        {{ isLoading ? 'Memproses...' : 'Login' }}
                    </button>
                    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
                </form>
            </div>
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
