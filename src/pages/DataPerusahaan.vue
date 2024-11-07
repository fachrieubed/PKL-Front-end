<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <h3 class="text-2xl font-bold">Data Perusahaan</h3>
      <router-link to="/add-perusahaan">
        <button class="btn-primary">Tambah Data</button>
      </router-link>
    </div>
    <!-- Tabel Data Perusahaan -->
    <div class="card-body overflow-x-auto">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-4 text-left border-b">Nama Perusahaan</th>
            <th class="p-4 text-left border-b">Alamat</th>
            <th class="p-4 text-left border-b">Website</th>
            <th class="p-4 text-center border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perusahaan in result" :key="perusahaan.id" class="hover:bg-gray-50">
            <td class="p-4 border-b">{{ perusahaan.name }}</td>
            <td class="p-4 border-b">{{ perusahaan.address }}</td>
            <td class="p-4 border-b">{{ perusahaan.website }}</td>
            <td class="p-4 text-center border-b">
              <router-link :to="{ name: 'EditPerusahaan', params: { id: perusahaan.id } }">
                <button class="btn-secondary mr-2">
                  <font-awesome-icon :icon="['fas', 'edit']" class=""/> Edit
                </button>
              </router-link>
              <router-link :to="{ name: 'PerusahaanDetail', params: { id: perusahaan.id } }">
                <button class="btn-info mr-6">
                  <font-awesome-icon :icon="['fas', 'eye']" class=""/> Details
                </button>
              </router-link>
                <button class="btn-danger mr-3" @click.prevent="deletePerusahaan(perusahaan.id)">
                <font-awesome-icon :icon="['fas', 'trash']" class=""/> 🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataPerusahaan',
  data() {
    return {
      result: []
    };
  },
  created() {
    this.loadPerusahaan();
  },
  methods: {
    loadPerusahaan() {
      axios.get('http://127.0.0.1:8000/perusahaan')
        .then(({ data }) => {
          this.result = data;
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
    deletePerusahaan(perusahaanId) {
      if (confirm('Apakah Anda yakin ingin menghapus perusahaan ini?')) {
        axios.delete(`http://127.0.0.1:8000/perusahaan/${perusahaanId}`)
          .then(() => {
            this.result = this.result.filter(perusahaan => perusahaan.id !== perusahaanId);
          })
          .catch(error => {
            console.error('There was an error!', error);
            alert('Gagal menghapus perusahaan. Silakan coba lagi.');
          });
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 20px;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #edf2f7; /* Light gray background for headers */
  font-weight: bold;
  text-align: left;
  color: #2d3748; /* Darker text color */
}

tbody tr:hover {
  background-color: #f7fafc; /* Light blue-gray on hover */
}

.btn-primary {
  background-color: #3182ce; /* Blue color */
  color: white;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Added transform for hover */
  border: none; /* No border */
}

.btn-primary:hover {
  background-color: #2b6cb0; /* Darker blue on hover */
  transform: translateY(-1px); /* Slight lift effect */
}

.btn-secondary {
  background-color: #48bb78; /* Green color */
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s, transform 0.2s; /* Added transform for hover */
  border: none; /* No border */
}

.btn-secondary:hover {
  background-color: #38a169; /* Darker green on hover */
  transform: translateY(-1px); /* Slight lift effect */
}

.btn-info {
  background-color: #63b3ed; /* Light blue */
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s, transform 0.2s; /* Added transform for hover */
  border: none; /* No border */
}

.btn-info:hover {
  background-color: #4299e1; /* Darker blue on hover */
  transform: translateY(-1px); /* Slight lift effect */
}

.btn-danger {
  background-color: #e53e3e; /* Red color */
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s, transform 0.2s; /* Added transform for hover */
  border: none; /* No border */
}

.btn-danger:hover {
  background-color: #c53030; /* Darker red on hover */
  transform: translateY(-1px); /* Slight lift effect */
}

.card-body {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Deeper shadow for depth */
}

@media (max-width: 768px) {
  .table-auto {
    font-size: 14px;
  }

  th, td {
    padding: 10px; /* Reduced padding on smaller screens */
  }

  .btn-primary, .btn-secondary, .btn-info, .btn-danger {
    padding: 8px 14px; /* Smaller button size for mobile */
  }
}

td .btn-secondary,
td .btn-info,
td .btn-danger {
  margin-right: 8px; /* Memberikan jarak antar tombol */
}

td .btn-danger {
  margin-right: 0; /* Hapus margin di tombol terakhir agar tidak ada spasi di kanan */
}
</style>