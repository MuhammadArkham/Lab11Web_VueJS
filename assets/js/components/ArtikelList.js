// ArtikelList Component - Menampilkan daftar artikel dan form CRUD
const ArtikelList = {
    template: `
        <div>
            <h2 style="color: #2b6cb0; margin-bottom: 20px;">Kelola Artikel</h2>

            <div v-if="message" :class="'alert ' + messageType" style="padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 600;" :style="messageType === 'alert-success' ? 'background: #c6f6d5; color: #22543d; border: 1px solid #9ae6b4;' : 'background: #fed7d7; color: #822727; border: 1px solid #feb2b2;'">{{ message }}</div>

            <button class="btn btn-primary" @click="tambah" style="margin-bottom: 20px;">+ Tambah Data</button>

            <!-- Modal Form -->
            <div class="modal" v-if="showForm" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(4px);">
                <div class="modal-content" style="background: white; padding: 30px; border-radius: 12px; width: 500px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 id="form-title" style="color: #2b6cb0; margin: 0;">{{ formTitle }}</h3>
                        <span class="close" @click="showForm = false" style="font-size: 24px; cursor: pointer; color: #a0aec0;">&times;</span>
                    </div>
                    <form id="form-data" @submit.prevent="saveData">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #4a5568;">Judul</label>
                            <input type="text" name="judul" id="judul" v-model="formData.judul" placeholder="Judul Artikel" required style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #4a5568;">Isi</label>
                            <textarea name="isi" id="isi" rows="6" v-model="formData.isi" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;"></textarea>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #4a5568;">Status</label>
                            <select name="status" id="status" v-model="formData.status" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;">
                                <option v-for="option in statusOptions" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <input type="hidden" id="id" v-model="formData.id">
                        <div style="display: flex; gap: 10px;">
                            <button type="submit" class="btn btn-primary" style="flex: 1;">Simpan</button>
                            <button type="button" class="btn btn-secondary" @click="showForm = false" style="flex: 1; background: #e2e8f0; color: #4a5568;">Batal</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Tabel Data -->
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!artikel || artikel.length === 0">
                        <td colspan="4" style="text-align: center; padding: 20px; color: #718096;">Tidak ada data artikel.</td>
                    </tr>
                    <tr v-for="(item, index) in artikel" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>
                            <b style="color: #2b6cb0;">{{ item.judul }}</b>
                            <p style="margin-top: 5px;"><small style="color: #718096;">{{ item.isi ? item.isi.substring(0, 80) + '...' : '' }}</small></p>
                        </td>
                        <td><span style="background: #ebf8ff; color: #3182ce; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">{{ statusText(item.status) }}</span></td>
                        <td>
                            <a href="#" class="btn btn-primary" style="padding: 5px 10px; font-size: 12px; margin-right: 5px;" @click.prevent="edit(item)">Edit</a>
                            <a href="#" class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;" @click.prevent="hapus(index, item.id)">Hapus</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data() {
        return {
            artikel: [],
            formData: {
                id: null,
                judul: '',
                isi: '',
                status: 0
            },
            showForm: false,
            formTitle: 'Tambah Data',
            statusOptions: [
                { text: 'Draft', value: 0 },
                { text: 'Publish', value: 1 },
            ],
            message: '',
            messageType: 'alert-success',
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            axios.get(apiUrl + '/post')
                .then(response => {
                    this.artikel = response.data.artikel;
                })
                .catch(error => console.log(error));
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Data';
            this.formData = {
                id: null,
                judul: '',
                isi: '',
                status: 0
            };
        },
        hapus(index, id) {
            if (confirm('Yakin menghapus data?')) {
                axios.delete(apiUrl + '/post/' + id)
                    .then(response => {
                        this.artikel.splice(index, 1);
                        this.showMessage('Data berhasil dihapus.', 'alert-success');
                    })
                    .catch(error => console.log(error));
            }
        },
        edit(data) {
            this.showForm = true;
            this.formTitle = 'Ubah Data';
            this.formData = {
                id: data.id,
                judul: data.judul,
                isi: data.isi,
                status: data.status
            };
        },
        saveData() {
            if (this.formData.id) {
                axios.put(apiUrl + '/post/' + this.formData.id, this.formData)
                    .then(response => {
                        this.loadData();
                        this.showMessage('Data berhasil diubah.', 'alert-success');
                    })
                    .catch(error => console.log(error));
            } else {
                axios.post(apiUrl + '/post', this.formData)
                    .then(response => {
                        this.loadData();
                        this.showMessage('Data berhasil ditambahkan.', 'alert-success');
                    })
                    .catch(error => console.log(error));
            }

            this.formData = {
                id: null,
                judul: '',
                isi: '',
                status: 0
            };
            this.showForm = false;
        },
        statusText(status) {
            if (!status && status !== 0) return '';
            return status == 1 ? 'Publish' : 'Draft';
        },
        showMessage(msg, type) {
            this.message = msg;
            this.messageType = type;
            setTimeout(() => {
                this.message = '';
            }, 3000);
        }
    },
};
