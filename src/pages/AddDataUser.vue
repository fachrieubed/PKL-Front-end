<template>
  <div class="card-body">
    <h3 class="text-2xl font-bold mb-4">Tambah Data Pengguna</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1" for="name">Nama Pengguna</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="input-field"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1" for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="input-field"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1" for="role">Role</label>
        <select id="role" v-model="form.role" class="input-field" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Simpan
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data() {
    return {
      form: {
        name: "",
        email: "",
        role: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.form); // Log untuk memeriksa data yang dikirim
      axios
        .post("http://127.0.0.1:8000/users", this.form)
        .then(() => {
          this.$router.push({ name: "DataUsers" });
        })
        .catch((error) => {
          if (error.response) {
            console.error("Response data:", error.response.data);
            alert(`Gagal menambahkan pengguna: ${error.response.data.message || 'Silakan coba lagi.'}`);
          } else if (error.request) {
            console.error("Request data:", error.request);
            alert("Gagal menambahkan pengguna: Tidak ada respons dari server.");
          } else {
            console.error("Error:", error.message);
            alert("Gagal menambahkan pengguna: " + error.message);
          }
        });
    },
  },
};
</script>

<style scoped>
/* Custom Styles for the AddUser Component */
.card-body {
  padding: 25px;
  background-color: #526d82;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgb(255, 255, 255);
  margin-top: 20px;
  max-width: 600px;
  margin: auto;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  background-color: #ffffff;
}

.input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  outline: none;
}

button {
  transition: background-color 0.3s ease;
  padding: 10px 20px;
  font-size: 16px;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
}

button:active {
  background-color: #3b82f6;
}

/* Hover and focus state for the form labels */
label {
  color: #ffffff;
  transition: color 0.2s ease;
}

label:hover,
label:focus-within {
  color: #ffffff;
}

/* Tambahan untuk mengubah warna teks h3 menjadi putih */
h3 {
  color: #f3f8ff; /* Warna teks putih */
}
</style>