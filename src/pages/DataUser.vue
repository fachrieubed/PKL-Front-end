<template>
  <div>
    <div class="flex justify-between items-center py-2">
      <h3 class="text-2xl font-bold text-left">Data User</h3>
      <div>
        <button @click="exportData" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 mr-2">
          Export Pengguna
        </button>
        <router-link to="/add-user">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105">
            Tambah Pengguna
          </button>
        </router-link>
      </div>
    </div>

    <div v-if="message" class="bg-green-200 text-green-800 p-2 rounded-md mb-4">
      {{ message }}
    </div>
    <div v-if="error" class="bg-red-200 text-red-800 p-2 rounded-md mb-4">
      {{ error }}
    </div>

    <div class="card-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nama User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" class="row-fade" :style="{ '--index': index }">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <router-link :to="{ name: 'EditUser', params: { id: user.id } }">
                <button class="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105 mr-2">
                  Edit
                </button>
              </router-link>
              <button
                class="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105 mr-2"
                @click.prevent="resetPassword(user.id)"
              >
                Reset
              </button>
              <button
                class="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-red-400 transition-transform transform hover:scale-105 mr-2"
                @click.prevent="showDeletePopup(user.id)"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="text-center mt-4">Loading...</div>
    </div>

    <!-- Popup Konfirmasi Hapus -->
    <div v-if="isPopupVisible" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <h3>Konfirmasi Hapus</h3>
        <p>Apakah Anda yakin ingin menghapus user ini?</p>
        <div class="popup-buttons">
          <button @click="confirmDelete" class="btn-delete">Hapus</button>
          <button @click="closePopup" class="btn-cancel">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DataUsers",
  data() {
    return {
      users: [],
      loading: true,
      message: '',
      error: '',
      selectedUserId: null,
      isPopupVisible: false,
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users");
        this.users = response.data;
      } catch (error) {
        console.error("Terjadi kesalahan saat memuat data pengguna:", error);
        this.error = "Gagal memuat data pengguna.";
      } finally {
        this.loading = false;
      }
    },
    async resetPassword(userId) {
      if (confirm("Apakah Anda yakin ingin mereset kata sandi pengguna ini?")) {
        try {
          await axios.post(`http://127.0.0.1:8000/users/${userId}/reset-password`);
          this.message = "Kata sandi berhasil direset.";
          this.error = ''; 
        } catch (error) {
          console.error("Terjadi kesalahan saat mereset kata sandi:", error);
          this.error = "Gagal mereset kata sandi. Silakan coba lagi.";
          this.message = ''; 
        }
      }
    },
    showDeletePopup(userId) {
      this.selectedUserId = userId;
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
      this.selectedUserId = null;
    },
    async confirmDelete() {
      try {
        await axios.delete(`http://127.0.0.1:8000/users/${this.selectedUserId}`);
        this.users = this.users.filter(user => user.id !== this.selectedUserId);
        this.message = "Pengguna berhasil dihapus.";
        this.error = ''; 
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus pengguna:", error);
        this.error = "Gagal menghapus pengguna. Silakan coba lagi.";
        this.message = ''; 
      } finally {
        this.closePopup();
      }
    },
    exportData() {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Nama Pengguna,Email,Role\n"
        + this.users.map(user => `${user.name},${user.email},${user.role}`).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "data_pengguna.csv");
      document.body.appendChild(link);
      link.click();
    }
  },
};
</script>

<style scoped>
/* Styles for DataUsers Component */
.card-body {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-top: 1px solid #dee2e6;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  animation: slideDown 0.3s ease;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.btn-delete {
  background-color: #00000000;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.btn-cancel {
  background-color: #00000000;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-cancel:hover {
  background-color: #7f8c8d;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-40px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>