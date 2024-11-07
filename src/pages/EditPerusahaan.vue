<template>
  <div class="max-w-lg mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-5">Edit Perusahaan</h2>
    <form @submit.prevent="updatePerusahaan">
      <!-- Nama Perusahaan -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Nama Perusahaan</label>
        <input v-model="perusahaan.name" id="name" type="text" class="w-full p-2 border border-gray-300 rounded mt-1" required />
      </div>

      <!-- Nama Singkatan -->
      <div class="mb-4">
        <label for="short_name" class="block text-gray-700">Nama Singkatan</label>
        <input v-model="perusahaan.short_name" id="short_name" type="text" class="w-full p-2 border border-gray-300 rounded mt-1" required />
      </div>

      
      <!-- Website -->
      <div class="mb-4">
      <label for="website" class="block text-gray-700">Website</label>
      <input v-model="perusahaan.website" id="website" type="url" class="w-full p-2 border border-gray-300 rounded mt-1" />
      </div>


      <!-- Alamat -->
      <div class="mb-4">
        <label for="address" class="block text-gray-700">Alamat</label>
        <input v-model="perusahaan.address" id="address" type="text" class="w-full p-2 border border-gray-300 rounded mt-1" />
      </div>

      <!-- Config Document -->
      <div class="mb-4">
        <label class="block text-gray-700">Config Document</label>
        <div class="flex space-x-4">
          <!-- Prefix Input -->
          <input v-model="configPrefix1" id="config_prefix1" type="text" class="flex-1 p-2 border border-gray-300 rounded mt-1" placeholder="Prefix 1" required />
          <input v-model="configPrefix2" id="config_prefix2" type="text" class="flex-1 p-2 border border-gray-300 rounded mt-1" placeholder="Prefix 2" required />
        </div>
        <div class="flex space-x-4 mt-2">
          <!-- Date Display -->
          <input type="text" :value="currentDay" disabled class="flex-1 p-2 border border-gray-300 rounded mt-1" />
          <input type="text" :value="currentMonth" disabled class="flex-1 p-2 border border-gray-300 rounded mt-1" />
          <input type="text" :value="currentYear" disabled class="flex-1 p-2 border border-gray-300 rounded mt-1" />
        </div>
        <input type="text" :value="formattedConfigDocument" disabled class="mt-2 w-full p-2 border border-gray-300 rounded" />
      </div>

      <!-- Image -->
      <div class="mb-4">
        <label for="logo" class="block text-gray-700">Image</label>
        <div class="mb-2">
          <img v-if="imagePreview" :src="imagePreview" alt="Preview Image" class="w-32 h-32 object-cover border border-gray-300 rounded" />
          <div v-else>Preview Image</div>
        </div>
        <input ref="fileInput" @change="handleFileChange" id="logo" type="file" accept="image/*" class="hidden" />
        <button type="button" @click="triggerFileInput" class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">Pilih Gambar</button>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-5">Update</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditPerusahaan',
  data() {
    return {
      perusahaan: {
        name: '',
        short_name: '',
        website: '',
        address: '',
        config_document: '',
        logo: null
      },
      configPrefix1: '',
      configPrefix2: '',
      imagePreview: null,
      currentDay: '',
      currentMonth: '',
      currentYear: ''
    };
  },
  computed: {
    formattedConfigDocument() {
      return `${this.configPrefix1}/${this.configPrefix2}/${this.currentDay}/${this.currentMonth}/${this.currentYear}`;
    }
  },
  created() {
    const now = new Date();
    this.currentDay = now.getDate().toString().padStart(2, '0');
    this.currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    this.currentYear = now.getFullYear().toString();
    this.loadPerusahaan();
  },
  methods: {
    loadPerusahaan() {
      const id = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/perusahaan/${id}`)
        .then(({ data }) => {
          this.perusahaan = data;
          const [prefix1, prefix2, day, month, year] = data.config_document.split('/');
          this.configPrefix1 = prefix1 || '';
          this.configPrefix2 = prefix2 || '';
          this.currentDay = day || this.currentDay;
          this.currentMonth = month || this.currentMonth;
          this.currentYear = year || this.currentYear;

          this.imagePreview = data.logo ? `http://127.0.0.1:8000/storage/${data.logo}` : null;
        })
        .catch(error => {
          console.error('Error loading data!', error);
        });
    },

    handleFileChange(event) {
const file = event.target.files[0];
if (file) {
  // Validasi tipe file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    alert('File harus berupa gambar dengan tipe: jpeg, png, jpg, gif, svg.');
    return;
  }
  
  this.perusahaan.logo = file;
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;
  };
  reader.readAsDataURL(file);
}
},

    triggerFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click();
      } else {
        console.error('File input reference is not available.');
      }
    },

    updatePerusahaan() {
  // Validasi form terlebih dahulu
  if (!this.perusahaan.name || !this.perusahaan.short_name || !this.configPrefix1 || !this.configPrefix2) {
      alert('Semua field wajib diisi.');
      return;
  }

  const formData = {
      name: this.perusahaan.name,
      short_name: this.perusahaan.short_name,
      website: this.perusahaan.website || '',
      address: this.perusahaan.address || '',
      config_document: this.formattedConfigDocument,
  };

  // Menambahkan data gambar jika ada
  if (this.perusahaan.logo && this.perusahaan.logo instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
          formData.logo = reader.result; // Base64 encoded image
          axios.put(`http://127.0.0.1:8000/perusahaan/${this.$route.params.id}`, formData, {
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(response => {
              console.log(response.data); // Cek response dari server
              this.$router.push('/dataperusahaan');
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Gagal mengupdate perusahaan. ' + JSON.stringify(error.response.data.errors));
          });
      };
      reader.readAsDataURL(this.perusahaan.logo);
  } else {
      axios.put(`http://127.0.0.1:8000/perusahaan/${this.$route.params.id}`, formData, {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          console.log(response.data); // Cek response dari server
          this.$router.push('/dataperusahaan');
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Gagal mengupdate perusahaan. ' + JSON.stringify(error.response.data.errors));
      });
  }
}


  }
};
</script>

<style scoped>
/* Sea Theme Colors */
:root {
  --sea-blue: #0077b6;
  --sea-light-blue: #00b4d8;
  --sea-green: #90e0ef;
  --sea-deep-blue: #03045e;
  --sea-gray: #f0f4f8;
  --sea-white: #ffffff;
}

/* Container */
.max-w-lg {
  background-color: var(--sea-gray);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

/* Title */
h2 {
  color: var(--sea-deep-blue);
  text-align: center;
}

/* Labels */
label {
  color: var(--sea-deep-blue);
}

/* Input fields */
input {
  background-color: var(--sea-white);
  border: 1px solid var(--sea-light-blue);
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--sea-blue);
  box-shadow: 0 0 5px var(--sea-light-blue);
}

/* Button styles */
button {
  background-color: var(--sea-blue);
  color: var(--sea-white);
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--sea-deep-blue);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Preview image styling */
img {
  border: 2px solid var(--sea-light-blue);
  border-radius: 5px;
}

/* Config Document section */
.config-document {
  background-color: var(--sea-green);
  padding: 0.5rem;
  border-radius: 4px;
  color: var(--sea-deep-blue);
  text-align: center;
}

/* Error and success messages */
.error-message {
  color: red;
}

.success-message {
  color: green;
}

/* Additional padding and margin for spacing */
.mb-4 {
  margin-bottom: 1rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-5 {
  margin-top: 1.25rem;
}
</style>
