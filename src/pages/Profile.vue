<template>
  <div class="profile-container">
    <div class="header">
      <h3 class="profile-title">Profile</h3>
      <div class="action-buttons">
        <button 
          @click="goToEditProfile" 
          class="edit-button" 
          title="Edit your profile"> <!-- Tooltip dengan atribut title -->
          Edit Profile
        </button>
        <button 
          @click="handleLogout" 
          class="logout-button" 
          title="Logout from your account"> <!-- Tooltip dengan atribut title -->
          Logout
        </button>
      </div>
    </div>

    <transition name="fade">
      <div class="profile-card" v-if="profile.name">
        <div class="profile-header">
          <img :src="profile.photoUrl" alt="Profile Photo" class="profile-photo" title="Profile Picture" />
          <div class="profile-info">
            <h2 class="profile-name" title="User's Full Name">{{ profile.name }}</h2>
            <p class="profile-email" title="Email Address">{{ profile.email }}</p>
          </div>
        </div>

        <div class="profile-body">
          <h3 class="bio-title">Bio</h3>
          <p class="profile-bio" title="User's Bio">{{ profile.bio }}</p>
          <p class="profile-role" title="User's Role">{{ profile.role }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        photoUrl: '',
        name: '',
        email: '',
        role: '',
        bio: ''
      }
    };
  },
  async created() {
    await this.fetchProfileData();
  },
  methods: {
    async fetchProfileData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('http://127.0.0.1:8000/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.profile = response.data;

        // Construct the full URL for the profile image
        if (this.profile.profile_image) {
          this.profile.photoUrl = `http://127.0.0.1:8000/${this.profile.profile_image}`;
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
        alert('Failed to load profile data.');
        this.$router.push({ name: 'Login' });
      }
    },
    async handleLogout() {
      try {
        await axios.post('http://127.0.0.1:8000/logout', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed.');
      }
    },
    goToEditProfile() {
      this.$router.push({ name: 'EditProfile' });
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 700px;
  margin: 60px auto;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.profile-title {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.edit-button,
.logout-button {
  background-color: #2980b9;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.edit-button:hover {
  background-color: #1B1A55;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Menambahkan efek bayangan */
}

.logout-button {
  background-color: #FF204E;
}

.logout-button:hover {
  background-color: #3D0000;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Menambahkan efek bayangan */
}

.profile-card {
  background-color: #ecf0f1;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease; /* Tambahkan transisi untuk efek scale */
}

.profile-card:hover {
  transform: scale(1.02); /* Skala sedikit saat hover */
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-photo {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 25px;
  border: 4px solid #226a99;
  transition: transform 0.3s ease; /* Transisi pada foto profil */
}

.profile-photo:hover {
  transform: scale(1.05); /* Skala sedikit saat hover */
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  color: #2c3e50;
}

.profile-email {
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 15px;
}

.profile-body {
  margin-top: 30px;
}

.bio-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #2c3e50;
}

.profile-bio {
  font-size: 18px;
  color: #34495e;
  line-height: 1.8;
}

.profile-role {
  font-size: 18px;
  color: #226a99;
  font-weight: bold;
  text-transform: uppercase;
  border: 2px solid #2980b9;
  padding: 8px 15px;
  border-radius: 50px;
  background-color: transparent;
  margin-top: 25px;
  display: inline-block;
}

/* Animasi Fade In */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.edit-button,
.logout-button,
.profile-photo,
.profile-name,
.profile-email,
.profile-bio,
.profile-role {
  position: relative;
}

.edit-button:hover::after,
.logout-button:hover::after,
.profile-photo:hover::after,
.profile-name:hover::after,
.profile-email:hover::after,
.profile-bio:hover::after,
.profile-role:hover::after {
  content: attr(title);
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.edit-button:hover::after,
.logout-button:hover::after,
.profile-photo:hover::after,
.profile-name:hover::after,
.profile-email:hover::after,
.profile-bio:hover::after,
.profile-role:hover::after {
  opacity: 1;
}

</style>