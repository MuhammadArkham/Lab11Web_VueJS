// ArtikelForm Component (standalone form page - optional)
const ArtikelForm = {
    template: `
        <div class="form-container">
            <h2>{{ isEdit ? 'Edit Artikel' : 'Tambah Artikel' }}</h2>
            <form @submit.prevent="saveData">
                <div>
                    <label>Judul</label>
                    <input type="text" v-model="formData.judul" placeholder="Judul Artikel" required>
                </div>
                <div>
                    <label>Isi</label>
                    <textarea v-model="formData.isi" rows="10"></textarea>
                </div>
                <div>
                    <label>Status</label>
                    <select v-model="formData.status">
                        <option value="0">Draft</option>
                        <option value="1">Publish</option>
                    </select>
                </div>
                <button type="submit">Simpan</button>
                <button type="button" @click="$router.push('/artikel')">Batal</button>
            </form>
        </div>
    `,
    data() {
        return {
            formData: {
                id: null,
                judul: '',
                isi: '',
                status: 0
            },
            isEdit: false
        }
    },
    mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.isEdit = true;
            axios.get(apiUrl + '/post/' + id)
                .then(response => {
                    this.formData = response.data;
                })
                .catch(error => console.log(error));
        }
    },
    methods: {
        saveData() {
            if (this.isEdit) {
                axios.put(apiUrl + '/post/' + this.formData.id, this.formData)
                    .then(() => {
                        this.$router.push('/artikel');
                    })
                    .catch(error => console.log(error));
            } else {
                axios.post(apiUrl + '/post', this.formData)
                    .then(() => {
                        this.$router.push('/artikel');
                    })
                    .catch(error => console.log(error));
            }
        }
    }
};
