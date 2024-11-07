<template>
  <div class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/home" class="nav-link"><b>Home</b></router-link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/login" class="nav-link"><b>Login</b></router-link>
        </li>
      </ul>

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Search Icon and Dropdown -->
        <li class="nav-item dropdown" @mouseover="showSearchDropdown = true" @mouseleave="showSearchDropdown = false">
          <a class="nav-link" href="#" role="button">
            <i class="fas fa-search"></i>
          </a>
          <div v-if="showSearchDropdown" class="dropdown-menu dropdown-menu-right" style="display: block">
            <a class="dropdown-item" @click="search('uat')"><b>Data UAT</b></a>
            <a class="dropdown-item" @click="search('perusahaan')"><b>Data Perusahaan</b></a>
            <a class="dropdown-item" @click="search('client')"><b>Data Client</b></a>
            <a class="dropdown-item" @click="search('user')"><b>Data User</b></a>
          </div>
        </li>

        <!-- Fullscreen Icon -->
        <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
            <i class="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="index3.html" class="brand-link">
        <img src="/public/asset/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: 0.8" />
        <span class="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src="/public/asset/dist/img/monalisa1.jpeg" class="img-circle elevation-2" alt="User Image" />
          </div>
          <div class="info">
            <router-link to="/profile" class="d-block"><b>Profile</b></router-link>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <router-link to="/home" class="nav-link">
                <i class="nav-icon fas fa-home"></i>
                <p><b>Home</b></p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/uat" class="nav-link">
                <i class="nav-icon fas fa-file"></i>
                <p><b>UAT</b></p>
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-folder"></i>
                <p>
                  <b>
                    Data Master
                  </b>
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/dataperusahaan" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p><b>Data Perusahaan</b></p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/dataclient" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p><b>Data Client</b></p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/datauser" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p><b>Data User</b></p>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <!-- Content header area -->
        </div>
      </div>

      <!-- Main content -->
      <router-view></router-view>
    </div>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <div class="p-3">
        <h5>Title</h5>
        <p>Sidebar content</p>
      </div>
    </aside>

    <!-- Main Footer -->
    <footer class="main-footer">
      <div class="float-right d-none d-sm-inline">Anything you want</div>
      <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "StarterPage",
  setup() {
    const showSearchDropdown = ref(false);
    const router = useRouter();

    function search(dataType) {
      showSearchDropdown.value = false;
      switch (dataType) {
        case "uat":
          router.push("/uat");
          break;
        case "perusahaan":
          router.push("/dataperusahaan");
          break;
        case "client":
          router.push("/dataclient");
          break;
        case "user":
          router.push("/datauser");
          break;
        default:
          alert("Page not found");
      }
    }

    return {
      showSearchDropdown,
      search,
    };
  },
};
</script>

<style scoped>
/* Custom styles for the sidebar */
.main-sidebar {
  background-color: #343a40; /* Darker shade for sidebar */
  color: #ffffff; /* White text color for visibility */
}

.brand-link {
  background-color: #212529; /* Brand section background */
  color: #ffffff;
  font-weight: bold;
}

.brand-link .brand-image {
  border-radius: 50%;
  border: 2px solid #ffffff; /* White border for logo */
}

.sidebar .nav-link {
  color: #adb5bd; /* Gray text color for sidebar links */
  font-size: 16px;
}

.sidebar .nav-link:hover {
  color: #ffffff; /* White color on hover */
  background-color: #495057; /* Slightly lighter background on hover */
}

.nav-sidebar > .nav-item > .nav-link.active {
  background-color: #6c757d; /* Active link background */
  color: #ffffff;
}

.nav-sidebar > .nav-item > .nav-link i {
  margin-right: 8px;
}

.user-panel img {
  border: 2px solid #adb5bd; /* Border around user image */
}

.nav-treeview .nav-link {
  font-size: 14px;
  padding-left: 2rem; /* Indentation for treeview items */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  transform: translateY(0);
  z-index: 1000;
  background-color: #343a40; /* Darker background for search dropdown */
  border: none;
}

.dropdown-item {
  color: #adb5bd; /* Text color for dropdown items */
}

.dropdown-item:hover {
  color: #ffffff; /* White text on hover */
  background-color: #495057; /* Slightly lighter background on hover */
}

/* Footer customization */
.main-footer {
  background-color: #343a40; /* Dark background for footer */
  color: #adb5bd; /* Footer text color */
}

.main-footer a {
  color: #ffffff; /* Footer link color */
}

.main-footer a:hover {
  color: #adb5bd; /* Footer link color on hover */
}
</style>
