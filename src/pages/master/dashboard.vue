<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div :class="['fixed top-0 left-0 z-40 h-screen bg-gray-800 text-white overflow-y-auto flex flex-col', { 'w-0': !showSide, 'w-64': showSide }]">
      <div class="flex-1">
        <div class="h-[50px] bg-gray-900 flex justify-start items-center">
          <div class="px-[20px]">
            <h3 class="font-bold text-xl">UAT</h3>
          </div>
        </div>
        <div class="py-[20px]">
          <div class="flex flex-col space-y-[10px]">
            <router-link to="/home" class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-700 hover:text-gray-300 transition duration-400 ease-in-out">
              <!-- Home icon -->
              <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
              </svg>
              Home
            </router-link>
            <router-link to="/uat" class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-700 hover:text-gray-300 transition duration-400 ease-in-out">
              <!-- UAT icon -->
              <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
              </svg>
              UAT
            </router-link>
            <!-- Show this menu only if user is an admin -->
            <template v-if="isAdmin">
              <router-link to="/datauser" class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-700 hover:text-gray-300 transition duration-400 ease-in-out">
                <!-- UAT icon -->
                <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                </svg>
                Data User
              </router-link>
            </template>
            <button ref="dropdownButton" @click="toggleDropdown" class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-700 hover:text-gray-300 transition duration-400 ease-in-out">
              Data Master
              <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div ref="dropdownMenu" v-show="showDropdown" class="z-10 bg-gray-800 divide-y divide-gray-700 rounded-lg shadow w-44">
              <ul class="py-2 text-sm text-gray-300">
                <li>
                  <router-link to="/dataperusahaan" class="block px-4 py-2 hover:bg-gray-700 hover:text-gray-300">Data Perusahaan</router-link>
                </li>
                <li>
                  <router-link to="/dataclient" class="block px-4 py-2 hover:bg-gray-700 hover:text-gray-300">Data Client</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Setting always at the bottom -->
      <div class="mt-auto">
        <router-link to="/profile" class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-700 hover:text-gray-300 transition duration-400 ease-in-out">
          <!-- Setting icon -->
          <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
          </svg>
          Profile
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div :class="['flex-1', { 'ml-0': !showSide, 'ml-64': showSide }, 'bg-white-400']">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b">
        <!-- Hamburger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div class="ml-4 text-lg font-medium">
          <!-- Page title -->
          <span>{{ pageTitle }}</span>
        </div>
      </div>
      <div class="p-4">
        <!-- Content goes here -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSide: true,
      showDropdown: false,
      isAdmin: false,
      pageTitle: 'Dashboard' // Update this based on the current page
    };
  },
  mounted() {
  const userRole = localStorage.getItem('userRole');
  console.log('User role from localStorage:', userRole); // Debug log
  this.isAdmin = userRole === 'admin';
},
  methods: {
    toggleSideBar() {
      this.showSide = !this.showSide;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  }
};
</script>


  
  <style>
  /* Add your styles here */
  /* Sidebar */
/* Sidebar */
/* Sidebar */
.fixed {
  position: fixed;
}

.flex {
  display: flex;
}

.h-screen {
  height: 100vh;
}

.w-64 {
  width: 16rem; /* Adjust width as needed */
}

.overflow-y-auto {
  overflow-y: auto;
}

.ml-64 {
  margin-left: 16rem; /* Adjust margin to match the sidebar width */
}

/* Sidebar Color */
.bg-gray-300 {
  background-color: #d0d0d0; /* Light gray for sidebar background */
}

.text-white {
  color: #ffffff; /* White text color for sidebar */
}

/* Main Content */
.flex-1 {
  flex: 1;
}

.bg-gray-400 {
  background-color: #e5e7eb; /* Light gray for main content background */
}

.p-4 {
  padding: 1rem;
}

.z-10 {
  z-index: 10;
}

/* Header Color */
.bg-gray-100 {
  background-color: #f9fafb; /* Light gray for header background */
}

.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.border-b {
  border-bottom: 1px solid #e5e7eb;
}

/* Styles tambahan untuk sidebar ketika tersembunyi */
.w-0 {
  width: 0;
}

.w-64 {
  width: 16rem; /* Sama dengan ukuran sidebar yang ditampilkan */
}

.ml-64 {
  margin-left: 16rem; /* Sama dengan lebar sidebar */
}

.ml-0 {
  margin-left: 0;
}

</style>

