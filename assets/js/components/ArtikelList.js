// ArtikelList Component - Menampilkan daftar artikel dan form CRUD
const ArtikelList = {
    template: `
        <div>
            <h2>Kelola Artikel</h2>

            <div v-if="message" :class="'alert ' + messageType">{{ message }}</div>

            <button class="btn-tambah" @click="tambah">+ Tambah Data</button>

            <!-- Modal Form -->
            <div class="modal" v-if="showForm">
                <div class="modal-content">
                    <span class="close" @click="showForm = false">&times;</span>
                    <form id="form-data" @submit.prevent="saveData">
                        <h3 id="form-title">{{ formTitle }}</h3>
                        <div>
                            <label>Judul</label>
                            <input type="text" name="judul" id="judul" v-model="formData.judul" placeholder="Judul Artikel" required>
                        </div>
                        <div>
                            <label>Isi</label>
                            <textarea name="isi" id="isi" rows="10" v-model="formData.isi"></textarea>
                        </div>
                        <div>
                            <label>Status</label>
                            <select name="status" id="status" v-model="formData.status">
                                <option v-for="option in statusOptions" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <input type="hidden" id="id" v-model="formData.id">
                        <button type="submit" id="btnSimpan">Simpan</button>
                        <button type="button" @click="showForm = false">Batal</button>
                    </form>
                </div>
            </div>

            <!-- Tabel Data -->
            <table>
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
                        <td colspan="4" class="center-text">Tidak ada data artikel.</td>
                    </tr>
                    <tr v-for="(item, index) in artikel" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>
                            <b>{{ item.judul }}</b>
                            <p><small>{{ item.isi ? item.isi.substring(0, 80) + '...' : '' }}</small></p>
                        </td>
                        <td>{{ statusText(item.status) }}</td>
                        <td>
                            <a href="#" class="btn-edit" @click.prevent="edit(item)">Edit</a>
                            <a href="#" class="btn-delete" @click.prevent="hapus(index, item.id)">Hapus</a>
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
