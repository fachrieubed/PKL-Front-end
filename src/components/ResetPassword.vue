<template>
  <div class="reset-container">
    <div class="reset-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="../../index2.html" class="h1"><b>Admin</b>LTE</a>
        </div>
        <div class="card-body">
          <p class="reset-box-msg">Enter your email to reset your password</p>
          <form @submit.prevent="resetPassword">
            <div class="form-group">
              <input type="email" id="email" v-model="email" class="form-control" placeholder="Email" required />
              <div class="input-icon">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Reset Password</button>
            </div>
          </form>
          <p class="back-to-login">
            <router-link to="/login" class="text-center">Back to Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async resetPassword() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
          email: this.email,
        });

        if (response.data.status) {
          alert("Password reset email sent. Please check your Email.");
          this.$router.push({ name: "Login" });
        } else {
          console.error("Reset failed:", response.data.message);
          alert("Reset failed: " + response.data.message);
        }
      } catch (error) {
        console.error("Reset request failed:", error.response?.data || error.message);
        alert("Reset request failed: " + (error.response?.data.message || error.message));
      }
    },
  },
};
</script>

<style scoped>
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #ece9e6, #ffffff);
  padding: 20px;
}

.reset-box {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.card-header {
  background-color: #4e73df;
  border-bottom: none;
  padding: 20px;
  color: #fff;
}

.reset-box-msg {
  font-size: 16px;
  color: #000000;
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
  border-radius: 20px;
  transition: border-color 0.3s ease;
}

.f orm-control:focus {
  border-color: #4e73df;
  outline: none;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #4e73df;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s;
}

.btn-primary:hover {
  background-color: #2e59d9;
  transform: scale(1.02);
}

.back-to-login {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  margin-top: 20px;
  display: block;
  transition: color 0.3s ease;
}

.back-to-login:hover {
  color: #0056b3;
}
</style>
