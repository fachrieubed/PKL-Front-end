<template>
  <div class="register-container">
    <div class="card">
      <div class="card-header">Create Account</div>
      <div class="card-body">
        <form @submit.prevent="saveData">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" v-model="user.name" id="name" class="form-control" placeholder="Enter your full name" />
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="user.username" id="username" class="form-control" placeholder="Enter your username" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="user.email" id="email" class="form-control" placeholder="Enter your email" />
          </div>

          <div class="form-group password-field">
            <label for="password">Password</label>
            <input :type="passwordVisible ? 'text' : 'password'" v-model="user.password" id="password" class="form-control" placeholder="Enter your new password" />
            <span class="toggle-password" @click="togglePasswordVisibility">
              <i :class="passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </span>
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      user: {
        name: '',
        username: '',
        email: '',
        password: ''
      },
      passwordVisible: false
    }
  },
  methods: {
    saveData() {
      console.log('Sending data:', this.user); // Debug: Lihat data yang dikirim
      axios.post("http://127.0.0.1:8000/register", this.user)
        .then(({ data }) => {
          console.log('Response data:', data); // Debug: Lihat data respons
          alert("Registration successful");
          this.$router.push({ name: 'Login' });
        })
        .catch(error => {
          console.error('Error:', error.response ? error.response.data : error.message);
          alert("Registration failed");
        });
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.card {
  width: 100%;
  max-width: 450px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

.card-header {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-weight: 600;
}

.card-body {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 15px;
  color: #555;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 71%; /* Ubah ini agar bisa menurunkan ikon untuk lebih ke bawah*/
  transform: translateY(-50%);
  cursor: pointer;
  color: #007bff;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
