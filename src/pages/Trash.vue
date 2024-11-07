<template>
    <div>
      <div class="flex justify-between items-center py-2">
        <h3 class="text-2xl font-bold text-left">Trash Data UAT</h3>
      </div>
      <div class="card-body">
        <table class="uat-table">
          <thead>
            <tr>
              <th>Nama Project</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Akhir</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="uat in trashedUats" :key="uat.id">
              <td>{{ uat.project_name }}</td>
              <td>{{ uat.start_date }}</td>
              <td>{{ uat.end_date }}</td>
              <td>
                <button @click="restoreUat(uat.id)" class="restore-button">
                  Restore
                </button>
                <button @click="deletePermanent(uat.id)" class="delete-permanent-button">
                  Delete Permanently
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "TrashUat",
    data() {
      return {
        trashedUats: [], // Data UAT yang ada di trash
      };
    },
    created() {
      this.loadTrashedUats();
    },
    methods: {
      loadTrashedUats() {
        axios
          .get("http://127.0.0.1:8000/uats/trash")
          .then(({ data }) => {
            this.trashedUats = data;
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      },
      restoreUat(id) {
        if (confirm("Apakah Anda yakin ingin memulihkan data UAT ini?")) {
          axios
            .patch(`http://127.0.0.1:8000/uats/restore/${id}`)
            .then(() => {
              // Setelah restore, update data di frontend
              this.trashedUats = this.trashedUats.filter((uat) => uat.id !== id);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }
      },
      deletePermanent(id) {
        if (confirm("Apakah Anda yakin ingin menghapus permanen data UAT ini?")) {
          axios
            .delete(`http://127.0.0.1:8000/uats/delete-permanent/${id}`)
            .then(() => {
              // Setelah delete permanent, update data di frontend
              this.trashedUats = this.trashedUats.filter((uat) => uat.id !== id);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Button styles */
  .restore-button {
    background-color: #4caf50; /* Green color */
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    transition: background-color 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .restore-button:hover {
    background-color: #388e3c; /* Darker green */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .delete-permanent-button {
    background-color: #f44336; /* Red color */
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    transition: background-color 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .delete-permanent-button:hover {
    background-color: #d32f2f; /* Darker red */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  </style>
  