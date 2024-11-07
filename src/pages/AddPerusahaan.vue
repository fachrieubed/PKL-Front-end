<template>
  <div class="form-container">
    <h2 class="title">Add Perusahaan</h2>
    <form @submit.prevent="submitForm">
      <!-- Nama Perusahaan -->
      <div class="form-group">
        <label for="name" class="form-label">Nama Perusahaan</label>
        <input v-model="perusahaan.name" id="name" type="text" class="form-input" required />
      </div>

      <!-- Nama Singkatan -->
      <div class="form-group">
        <label for="short_name" class="form-label">Nama Singkatan</label>
        <input v-model="perusahaan.short_name" id="short_name" type="text" class="form-input" required />
      </div>

      <!-- Website -->
      <div class="form-group">
        <label for="website" class="form-label">Website</label>
        <input v-model="perusahaan.website" id="website" type="url" class="form-input" />
      </div>

      <!-- Alamat -->
      <div class="form-group">
        <label for="address" class="form-label">Alamat</label>
        <input v-model="perusahaan.address" id="address" type="text" class="form-input" />
      </div>

      <!-- Config Document -->
      <div class="form-group">
        <label class="form-label">Config Document</label>
        <div class="config-group">
          <input v-model="configPrefix1" id="config_prefix1" type="text" class="config-input" placeholder="Prefix 1" />
          <input v-model="configPrefix2" id="config_prefix2" type="text" class="config-input" placeholder="Prefix 2" />
        </div>
        <div class="config-group mt-2">
          <input type="text" :value="currentDay" disabled class="config-input" />
          <input type="text" :value="currentMonth" disabled class="config-input" />
          <input type="text" :value="currentYear" disabled class="config-input" />
        </div>
        <input type="text" :value="formattedConfigDocument" disabled class="config-output mt-2" />
      </div>

      <!-- Logo -->
      <div class="form-group">
        <label for="logo" class="form-label">Logo</label>
        <div class="logo-preview mb-2">
          <img v-if="logoPreview" :src="logoPreview" alt="Preview Logo" class="logo-image" />
          <div v-else class="logo-placeholder">Preview Logo</div>
        </div>
        <input ref="fileInput" @change="handleFileChange" id="logo" type="file" accept="image/*" class="hidden" />
        <button type="button" @click="triggerFileInput" class="file-button">Pilih Gambar</button>
      </div>

    <button type="submit" class="submit-button">tambah</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddPerusahaan',
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
      logoPreview: null,
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
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.logoPreview = URL.createObjectURL(file);
        this.perusahaan.logo = file; // Ensure this is a file
      }
    },
    triggerFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click();
      } else {
        console.error('File input reference is not available.');
      }
    },
    submitForm() {
      const formData = new FormData();
      formData.append('name', this.perusahaan.name);
      formData.append('short_name', this.perusahaan.short_name);
      formData.append('website', this.perusahaan.website);
      formData.append('address', this.perusahaan.address);
      formData.append('config_document', this.formattedConfigDocument);

      if (this.perusahaan.logo) {
        formData.append('logo', this.perusahaan.logo);
      }

      console.log('Submitting form data:', {
        name: this.perusahaan.name,
        short_name: this.perusahaan.short_name,
        website: this.perusahaan.website,
        address: this.perusahaan.address,
        config_document: this.formattedConfigDocument,
        logo: this.perusahaan.logo
      });

      axios.post('http://127.0.0.1:8000/perusahaan', formData)
        .then(response => {
          console.log('Company added successfully:', response.data);
          this.$router.push({ name: 'DataPerusahaan' });
        })
        .catch(error => {
          console.error('Error adding company:', error.response.data);
          alert('Ada kesalahan! ' + error.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
/* Container */
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #2d3748; /* Darker background */
  border-radius: 8px;
  color: #f7fafc; /* Lighter text color */
}

/* Title */
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f7fafc; /* Lighter text color */
}

/* Form Elements */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #e2e8f0; /* Light gray text color */
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #4a5568; /* Darker border */
  border-radius: 4px;
  background-color: #1a202c; /* Darker input background */
  color: #f7fafc; /* Lighter input text */
}

.config-group {
  display: flex;
  gap: 5px;
}

.config-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #4a5568; /* Darker border */
  border-radius: 4px;
  background-color: #1a202c; /* Darker input background */
  color: #f7fafc; /* Lighter input text */
  font-size: 14px;
}

.config-output {
  padding: 8px;
  border: 1px solid #4a5568; /* Darker border */
  border-radius: 4px;
  background-color: #1a202c; /* Darker input background */
  color: #f7fafc; /* Lighter input text */
  font-size: 14px;
  margin-top: 8px;
}

.logo-preview {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-image {
  width: 128px;
  height: 128px;
  object-fit: cover;
  border: 1px solid #4a5568; /* Darker border */
  border-radius: 4px;
}

.logo-placeholder {
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #4a5568; /* Darker border */
  border-radius: 4px;
  background-color: #1a202c; /* Darker placeholder background */
  color: #a0aec0; /* Light gray text color */
}

.file-button {
  background-color: #4a5568; /* Darker button background */
  border: 1px solid #2d3748; /* Darker border */
  color: #f7fafc; /* Lighter button text */
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.file-button:hover {
  background-color: #2d3748; /* Darker hover state */
}

.submit-button {
  background-color: #4a5568; /* Darker submit button */
  color: #ffffff; /* White text */
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #2b6cb0; /* Slightly darker hover state */
}
</style>