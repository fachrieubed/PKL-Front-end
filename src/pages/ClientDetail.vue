<template>
  <div class="client-detail-container max-w-xl mx-auto py-4">
    <h3 class="header-title text-2xl font-bold text-left mb-4">Detail Client</h3>
    <div class="detail-card bg-white p-6 rounded-lg shadow-md">
      <div class="detail-item mb-4">
        <label class="label text-gray-700 text-sm font-bold mb-1">Nama Client:</label>
        <p class="value text-gray-900">{{ client.name }}</p>
      </div>
      <div class="detail-item mb-4">
        <label class="label text-gray-700 text-sm font-bold mb-1">Nama Singkatan:</label>
        <p class="value text-gray-900">{{ client.short_name }}</p>
      </div>
      <div class="detail-item mb-4">
        <label class="label text-gray-700 text-sm font-bold mb-1">Alamat:</label>
        <p class="value text-gray-900">{{ client.address }}</p>
      </div>
      <div class="detail-item mb-4">
        <label class="label text-gray-700 text-sm font-bold mb-1">Logo:</label>
        <img v-if="client.logo" :src="client.logoUrl" alt="Logo" class="logo-image h-32 w-32 object-cover rounded-full border border-gray-300 shadow-sm">
      </div>
      <router-link :to="{ name: 'DataClient' }" class="back-button">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Kembali</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ClientDetail',
  data() {
    return {
      client: {
        name: '',
        short_name: '',
        address: '',
        logo: null,
        logoUrl: null
      }
    };
  },
  created() {
    this.loadClient();
  },
  methods: {
    loadClient() {
      const id = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/clients/${id}`)
        .then(({ data }) => {
          this.client = data;
          console.log("Logo URL:", this.client.logo);
          this.client.logoUrl = this.client.logo.startsWith('http') ? this.client.logo : `http://127.0.0.1:8000/storage/${this.client.logo}`;
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }
};
</script>

<style scoped>
.client-detail-container {
  background-color: #f7fafc; /* Warna latar belakang untuk memberikan kontras */
}

.header-title {
  color: #2d3748; /* Warna teks utama */
}

.detail-card {
  border: 1px solid #e2e8f0;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.label {
  color: #4a5568;
}

.value {
  color: #2d3748;
}

.logo-image {
  transition: transform 0.2s ease-in-out;
}

.logo-image:hover {
  transform: scale(1.05);
}

.back-button {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.back-button button {
  background-color: #4299e1;
  transition: background-color 0.2s ease-in-out;
}

.back-button button:hover {
  background-color: #3182ce;
}
</style>
