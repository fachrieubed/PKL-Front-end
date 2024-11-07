<template>
  <div class="edit-profile max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-semibold mb-4 text-gray-800"><b>Edit Profile</b>
    </h1>
    <form @submit.prevent="updateProfile">
      <!-- Profile Photo Upload -->
      <div class="mb-4">
        <label for="photo" class="block text-sm font-medium text-gray-700"><b>Profile Photo</b></label>
        <input type="file" id="photo" ref="photo" @change="handleFileChange" class="mt-1 block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 hover:file:bg-gray-100" />
        
        <!-- Profile Photo Preview -->
        <img v-if="previewPhoto" :src="previewPhoto" alt="Profile Preview" class="mt-4 w-24 h-24 object-cover rounded-full border-2 border-gray-300 cursor-pointer" @click="openModal" />
      </div>

      <!-- Modal for Enlarged Photo -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div class="relative">
          <img :src="previewPhoto" alt="Enlarged Profile Preview" class="w-80 h-80 object-cover rounded-lg border-4 border-white" />
          <button @click="closeModal" class="absolute top-2 right-2 text-white text-2xl">&times;</button>
        </div>
      </div>

      <!-- Name Input -->
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700"><b>Name</b></label>
        <input v-model="profile.name" type="text" id="name" placeholder="Enter your name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
      </div>

      <!-- Email Input -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"><b>Email</b></label>
        <input v-model="profile.email" type="email" id="email" placeholder="Enter your email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
      </div>

      <!-- Role Selection -->
      <div class="mb-4">
        <label for="role" class="block text-sm font-medium text-gray-700"><b>Role</b></label>
        <select v-model="profile.role" id="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <option value="user"><b>User</b></option>
          <option value="admin"><b>Admin</b></option>
        </select>
      </div>

      <!-- Bio Input -->
      <div class="mb-6">
        <label for="bio" class="block text-sm font-medium text-gray-700"><b>Bio</b></label>
        <textarea v-model="profile.bio" id="bio" placeholder="Tell us about yourself" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4">
        <button type="button" @click="$router.push({ name: 'Profile' })" class="px-4 py-2 bg-w-500 text-black rounded-md hover:bg-white-700">Kembali</button>
        <button type="submit" class="px-4 py-2 bg-grey-500 text-black rounded-md hover:bg-white-600">Simpan</button>
      </div>
    </form>

    <!-- Success Modal -->
    <div v-if="isSuccess" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
        <h2 class="text-xl font-semibold text-green-600">Success!</h2>
        <p class="mt-2 text-gray-700">Profil Anda telah berhasil diperbarui :)</p>
        <button @click="closeSuccessModal" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditProfile",
  data() {
    return {
      profile: {
        name: "",
        email: "",
        role: "user",
        bio: "",
      },
      previewPhoto: null,
      photoFile: null,
      isModalOpen: false,
      isSuccess: false, // Track the success state
    };
  },
  async created() {
    await this.fetchProfileData();
  },
  methods: {
    async fetchProfileData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const response = await axios.get("http://127.0.0.1:8000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.profile = response.data;
        if (this.profile.profile_image) {
          this.previewPhoto = `http://127.0.0.1:8000/${this.profile.profile_image}`;
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data.");
        this.$router.push({ name: "Login" });
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
        this.photoFile = file;
      }
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const payload = {
          name: this.profile.name,
          email: this.profile.email,
          role: this.profile.role,
          bio: this.profile.bio,
        };

        if (this.photoFile) {
          const reader = new FileReader();
          const photoBase64 = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(this.photoFile);
          });
          payload.profile_image = photoBase64;
        }

        await axios.put("http://127.0.0.1:8000/users/profile", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        this.isSuccess = true; // Show success message
        setTimeout(() => {
          this.isSuccess = false; // Hide success message after a short delay
          this.$router.push({ name: "Profile" });
        }, 3000); // Auto-close after 3 seconds
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    },
    closeSuccessModal() {
      this.isSuccess = false; // Close the success modal manually
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.edit-profile {
  max-width: 600px;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #f9fafb;
}

.edit-profile h1 {
  font-size: 1.75rem;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 16px;
}

.edit-profile label {
  color: #4b5563;
  font-size: 0.875rem;
}

.edit-profile input,
.edit-profile select,
.edit-profile textarea {
  width: 100%;
  padding: 8px 12px;
  margin-top: 4px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 0.875rem;
  color: #374151;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s;
}

.edit-profile input:focus,
.edit-profile select:focus,
.edit-profile textarea:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.edit-profile .file-input {
  color: #6b7280;
  cursor: pointer;
}

.edit-profile img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  margin-top: 16px;
  cursor: pointer;
}

.modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
}

.modal img {
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
  border: 4px solid #ffffff;
}

.modal button {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5rem;
  color: #ffffff;
  background: transparent;
  border: none;
  cursor: pointer;
}

.edit-profile .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
}

.edit-profile .form-actions button {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #ffffff;
  transition: background-color 0.3s ease;
}

.edit-profile .form-actions .back-button {
  background-color: #9ca3af;
}

.edit-profile .form-actions .back-button:hover {
  background-color: #6b7280;
}

.edit-profile .form-actions .save-button {
  background-color: #3b82f6;
}

.edit-profile .form-actions .save-button:hover {
  background-color: #2563eb;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.edit-profile {
  max-width: 600px;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #f9fafb;
}

.edit-profile h1 {
  font-size: 1.75rem;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 16px;
}

.edit-profile label {
  color: #4b5563;
  font-size: 0.875rem;
}

.edit-profile input,
.edit-profile select,
.edit-profile textarea {
  width: 100%;
  padding: 8px 12px;
  margin-top: 4px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 0.875rem;
  color: #374151;
}

.edit-profile button {
  padding: 8px 0px;
  font-size: 0.875rem;
  background-color: #0A2647;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.edit-profile button:hover {
  background-color: #DCF2F1;
}
</style>