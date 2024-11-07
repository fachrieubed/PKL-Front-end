<template>
  <div class="container mx-auto px-4">
    <!-- Main content -->
    <div class="flex justify-between items-center py-4">
      <h3 class="text-2xl font-bold">Data Client</h3>
      <div>
        <button @click="exportToCSV" class="btn-secondary mr-2">Export Data</button>
        <router-link to="/add-client">
          <button class="btn-primary">Tambah Client</button>
        </router-link>
      </div>
    </div>

    <!-- Data Client Table -->
    <div class="card-body overflow-x-auto">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-4 text-left border-b">Nama Client</th>
            <th class="p-4 text-left border-b">Alamat</th>
            <th class="p-4 text-center border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in result" :key="client.id" class="hover:bg-gray-50">
            <td class="p-4 border-b">{{ client.name }}</td>
            <td class="p-4 border-b">{{ client.address }}</td>
            <td class="p-4 text-center border-b">
              <router-link :to="{ name: 'EditClient', params: { id: client.id } }">
                <button class="btn-secondary mr-2">Edit</button>
              </router-link>
              <router-link :to="{ name: 'ClientDetail', params: { id: client.id } }">
                <button class="btn-info mr-2">Details</button>
              </router-link>
              <button v-if="!client.deleted_at" class="btn-danger" @click.prevent="showDeleteDialog(client.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDialog" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center fade-in">
      <div class="bg-white p-6 roundeld shadow-md text-center scale-in">
        <h3 class="text-lg font-bold mb-4">Penghapusan</h3>
        <p>Apakah Anda yakin ingin menghapus client yang satu ini?</p>
        <div class="mt-4">
          <button @click="confirmDelete" class="btn-danger mr-2">🗑️</button>
          <button @click="closeDialog" class="btn-secondary">✖</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DataClient",
  data() {
    return {
      result: [],
      showDialog: false,
      showPermanentDeleteDialog: false,
      clientToDelete: null,
    };
  },
  created() {
    this.Clientload();
  },
  methods: {
    Clientload() {
      axios
        .get("http://127.0.0.1:8000/clients")
        .then(({ data }) => {
          this.result = data;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    showDeleteDialog(clientId) {
      this.clientToDelete = clientId;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.clientToDelete = null;
    },
    confirmDelete() {
      if (this.clientToDelete !== null) {
        axios
          .delete(`http://127.0.0.1:8000/clients/${this.clientToDelete}`)
          .then(() => {
            this.Clientload();
            this.closeDialog();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
    restoreClient(clientId) {
      axios
        .post(`http://127.0.0.1:8000/clients/${clientId}/restore`)
        .then(() => {
          this.Clientload();
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    showPermanentDeleteDialog(clientId) {
      this.clientToDelete = clientId;
      this.showPermanentDeleteDialog = true;
    },
    closePermanentDeleteDialog() {
      this.showPermanentDeleteDialog = false;
      this.clientToDelete = null;
    },
    confirmPermanentDelete() {
      if (this.clientToDelete !== null) {
        axios
          .delete(`http://127.0.0.1:8000/clients/${this.clientToDelete}/force`)
          .then(() => {
            this.Clientload();
            this.closePermanentDeleteDialog();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
    exportToCSV() {
      const headers = ["Nama Client", "Alamat"];
      const rows = this.result.map((client) => [
        `" ${client.name} "`, // tambahkan spasi di sekitar data jika menggunakan tanda kutip "" akan membuat kolom menjadi lebih lebar
        `" ${client.address} "`,
      ]);
      const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data_client.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

.scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f0f4f8;
  font-weight: 600;
  color: #333;
  text-align: left;
}

tbody tr:hover {
  background-color: #f9fafb;
}

.btn-primary,
.btn-secondary,
.btn-info,
.btn-danger {
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-primary {
  background-color: #6366f1;
  color: #fff;
}
.btn-primary:hover {
  background-color: #4f46e5;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #34d399;
  color: white;
}
.btn-secondary:hover {
  background-color: #10b981;
  transform: translateY(-2px);
}

.btn-info {
  background-color: #3b82f6;
  color: white;
}
.btn-info:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}
.btn-danger:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
}

.card-body {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

@media (max-width: 768px) {
  .table-auto {
    font-size: 0.8rem;
  }
  th,
  td {
    padding: 10px;
  }
  .btn-primary,
  .btn-secondary,
  .btn-info,
  .btn-danger {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
}
</style>
