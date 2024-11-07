<template>
  <div>
      <h1>Daftar Proyek</h1>
      <button @click="createProject">Buat Proyek Baru</button>

      <div v-if="projects.length">
          <ul>
              <li v-for="project in projects" :key="project.id">
                  <span>{{ project.name }} - {{ project.description }}</span>
                  <button @click="editProject(project.id)">Edit</button>
                  <button @click="deleteProject(project.id)">Hapus</button>
              </li>
          </ul>
      </div>
      <div v-else>
          <p>Tidak ada proyek yang tersedia.</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          projects: []
      };
  },
  mounted() {
      this.fetchProjects();
  },
  methods: {
      fetchProjects() {
          axios.get('/api/projects')
              .then(response => {
                  this.projects = response.data;
              })
              .catch(error => {
                  console.error('Error fetching projects:', error);
              });
      },
      createProject() {
          // Logic untuk membuat proyek baru
          this.$router.push({ name: 'CreateProject' });
      },
      editProject(id) {
          // Logic untuk mengedit proyek
          this.$router.push({ name: 'EditProject', params: { id } });
      },
      deleteProject(id) {
          if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
              axios.delete(`/api/projects/${id}`)
                  .then(() => {
                      this.fetchProjects();
                  })
                  .catch(error => {
                      console.error('Error deleting project:', error);
                  });
          }
      }
  }
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 5px;
}
button {
  margin-left: 10px;
}
</style>