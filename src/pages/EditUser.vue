<template>
  <div class="max-w-lg mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-5 text-center text-gray-800">Edit Pengguna</h2>
    <form @submit.prevent="updateUser">
      <!-- Nama Pengguna -->
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium">Nama Pengguna</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Masukkan nama pengguna"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium">Email</label>
        <input
          v-model="user.email"
          id="email"
          type="email"
          class="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Masukkan email pengguna"
          required
        />
      </div>

      <!-- Role -->
      <div class="mb-4">
        <label for="role" class="block text-gray-700 font-medium">Role</label>
        <select
          v-model="user.role"
          id="role"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-5"
      >
        Update
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditUser',
  data() {
    return {
      user: {
        name: '',
        email: '',
        role: '',
        profile_image: null,
      },
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      const id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/users/${id}`)
        .then(({ data }) => {
          this.user = data;
        })
        .catch((error) => {
          console.error('Error loading user data!', error);
        });
    },
    updateUser() {
      // Validate form before submission
      if (!this.user.name || !this.user.email || !this.user.role) {
        alert('Semua field wajib diisi.');
        return;
      }

      // If image is present, encode it as base64 and include it in the JSON
      if (this.user.profile_image && this.user.profile_image instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.profile_image = e.target.result; // Update profile_image with base64 string
          this.sendUpdateRequest(); // Send request after image is converted
        };
        reader.readAsDataURL(this.user.profile_image);
      } else {
        this.sendUpdateRequest(); // If no image, send request directly
      }
    },
    sendUpdateRequest() {
      axios
        .put(`http://127.0.0.1:8000/users/${this.$route.params.id}`, this.user)
        .then((response) => {
          console.log(response.data); // Check server response
          this.$router.push('/datauser');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Gagal mengupdate pengguna. ' + JSON.stringify(error.response.data.errors));
        });
    },
  },
};
</script>

<style scoped>
/* Gaya untuk elemen input dan select */
input,
select {
  border-radius: 0.375rem; /* Rounded corners */
  transition: border-color 0.3s, box-shadow 0.3s; /* Transition for focus effects */
}

/* Efek saat elemen difokuskan */
input:focus,
select:focus {
  border-color: #3b82f6; /* Biru */
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4); /* Bayangan saat fokus */
}

/* Gaya untuk tombol */
button {
  transition: background-color 0.3s, transform 0.2s; /* Transisi untuk efek hover */
}

/* Efek hover untuk tombol */
button:hover {
  transform: translateY(-1px); /* Sedikit mengangkat tombol saat hover */
}

/* Gaya untuk bayangan form */
.shadow-lg {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Bayangan lebih lembut */
}
</style>
