<template>
  <div class="login-container">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="https://www.instagram.com/ubedariyanglain/" class="h1"><b>Login</b>UAT</a>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign in to start your session</p>
          <form @submit.prevent="loginData">
            <div class="form-group">
              <input
                type="email"
                id="email"
                v-model="user.email"
                class="form-control"
                placeholder="Email"
              />
              <div class="input-icon">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
            <div class="form-group">
              <input
                type="password"
                id="password"
                v-model="user.password"
                class="form-control"
                placeholder="Password"
              />
              <div class="input-icon">
                <span class="fas fa-lock"></span>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">
                Sign In
              </button>
            </div>
          </form>
          <p class="create-account">
            <router-link to="/register" class="text-center">Create Account</router-link>
          </p>
          <p class="forgot-password">
            <router-link to="/forgot-password" class="text-center">forgot password?</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginData() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/login", {
          email: this.user.email,
          password: this.user.password,
        });

        if (response.data.status) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userRole", response.data.user.role);
          this.$router.push({ name: "Home" });
        } else {
          console.error("Login failed:", response.data.message);
          alert("Login gagal: " + response.data.message);
        }
      } catch (error) {
        console.error("Login request failed:", error.response?.data || error.message);
        alert("Login gagal: " + (error.response?.data.message || error.message));
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #ece9e6, #ffffff); /* Subtle gradient background */
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); /* Softer shadow */
  overflow: hidden; /* Prevent child elements from overflowing */
}

.card-header {
  background-color: #4e73df; /* Primary color */
  border-bottom: none;
  padding: 20px;
  color: #fff;
}

.card-header .h1 {
  font-size: 28px;
  font-weight: bold;
}

.login-box-msg {
  font-size: 16px;
  color: #000000; /* Darker text for better contrast */
  margin-bottom: 20px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
}

.form-control {
  width: 100%;
  padding: 12px 40px 12px 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 20px; /* More rounded edges */
  transition: border-color 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Inner shadow for depth */
}

.form-control:focus {
  border-color: #4e73df; /* Change focus color to match header */
  outline: none;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #4e73df; /* Primary color */
  border: none;
  border-radius: 20px; /* Rounded button */
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s; /* Add transform for button */
}

.btn-primary:hover {
  background-color: #2e59d9; /* Darker shade on hover */
  transform: scale(1.02); /* Slight zoom effect */
}

.create-account {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  margin-top: 20px;
  display: block;
  transition: color 0.3s ease;
}

.create-account:hover {
  color: #0056b3; /* Darker shade on hover */
}
</style>
