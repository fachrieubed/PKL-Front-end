import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Dashboard from '../pages/master/dashboard.vue';
import UAT from '../pages/UAT.vue';
import UATDetails from '../pages/UATDetails.vue';
import Home from '../pages/Home.vue';
import DataPerusahaan from '../pages/DataPerusahaan.vue';
import DataClient from '../pages/DataClient.vue';
import AddClient from '../pages/AddClient.vue';
import EditClient from '../pages/EditClient.vue';
import ClientDetail from '../pages/ClientDetail.vue';
import Profile from '../pages/Profile.vue';
import EditPerusahaan from '../pages/EditPerusahaan.vue';
import PerusahaanDetail from '../pages/PerusahaanDetail.vue';
import AddPerusahaan from '../pages/AddPerusahaan.vue';
import EditProfile from '../pages/EditProfile.vue';
import AddUAT from '../pages/AddUAT.vue';
import DataUser from '../pages/DataUser.vue';
import AddDataUser from '../pages/AddDataUser.vue';
import EditUser from '../pages/EditUser.vue';
import ProjectList from '../pages/ProjectList.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/dist/js/adminlte.min.js'

const routes = [
  {
    path: '/',
    name: 'AdminLayout',
    component: AdminLayout,
    children: [
      { path: 'home', name: 'Home', component: Home },
      { path: 'uat', name: 'UAT', component: UAT },
      { path: 'dataperusahaan', name: 'DataPerusahaan', component: DataPerusahaan },
      { path: 'dataclient', name: 'DataClient', component: DataClient },
      { path: 'add-client', name: 'AddClient', component: AddClient },
      { path: 'edit-client/:id', name: 'EditClient', component: EditClient, props: true },
      { path: 'clients/:id', name: 'ClientDetail', component: ClientDetail, props: true },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: 'edit-perusahaan/:id', name: 'EditPerusahaan', component: EditPerusahaan },
      { path: 'perusahaan/:id', name: 'PerusahaanDetail', component: PerusahaanDetail },
      { path: 'add-perusahaan', name: 'AddPerusahaan', component: AddPerusahaan },
      { path: '/edit-profile', name: 'EditProfile', component: EditProfile },
      { path: 'add-uat', name: 'AddUAT', component: AddUAT },
      { path: '/uat-details/:id', component: UATDetails, name: 'UATDetails' },
      { path: 'datauser', name: 'DataUser', component: DataUser },
      { path: '/add-user', name: 'AddDataUser', component: AddDataUser },
      { path: '/edit-user/:id', name: 'EditUser', component: EditUser, props: true },
      { path:'/projects', name: 'ProjectList', component: ProjectList},
    ]
  },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
