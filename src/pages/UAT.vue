<template>
  <div>
    <div class="flex justify-between items-center py-2">
      <h3 class="text-2xl font-bold text-left">Data UAT</h3>
      <router-link to="/add-uat">
        <button class="add-button">Tambah Data UAT</button>
      </router-link>
    </div>
    <div class="card-body">
      
      <!-- Nomor Dokumen otomatis diisi -->
      <p v-if="doc_number" class="mt-2">Nomor Dokumen: {{ doc_number }}</p>

      <!-- Tabel Data UAT -->
      <table class="uat-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Pages</th>
            <th>Section on Pages</th>
            <th>Sub Section</th>
            <th>URL</th>
            <th>CMS</th>
            <th class="action-column">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(uat, index) in result" :key="uat.id">
            <td>{{ index + 1 }}</td>
            <td>{{ uat.pages }}</td>
            <td>{{ uat.section_on_pages }}</td>
            <td>{{ uat.sub_section }}</td>
            <td>{{ uat.url }}</td>
            <td>{{ uat.cms }}</td>
            <td>
              <!-- Tombol untuk menghapus data UAT -->
              <button @click="deleteUat(uat.id)" class="delete-button">Hapus</button>
              <!-- Tombol untuk melihat detail UAT -->
              <router-link :to="`/uat-details/${uat.id}`">
                <button class="details-button">Detail</button>
              </router-link>
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
  name: "DataUat",
  data() {
    return {
      result: [], // Properti untuk menyimpan data UAT
      perusahaanList: [], // Properti untuk menyimpan data perusahaan
      selectedPerusahaan: null, // Perusahaan yang dipilih
      doc_number: "", // Nomor dokumen
      errorMessage: null, // Properti untuk menyimpan pesan error
    };
  },
  created() {
    this.loadUat(); // Memuat data UAT saat komponen dibuat
    this.loadPerusahaan(); // Memuat data perusahaan saat komponen dibuat
  },
  methods: {
    // Fungsi untuk memuat data UAT
    async loadUat() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/uats");
        this.result = response.data;
      } catch (error) {
        this.errorMessage = "Gagal memuat data UAT. Coba lagi nanti!";
        console.error("Error loading UAT data:", error);
      }
    },

    // Fungsi untuk memuat data perusahaan
    async loadPerusahaan() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/perusahaan");
        this.perusahaanList = response.data;
      } catch (error) {
        this.errorMessage = "Gagal memuat data perusahaan. Coba lagi nanti!";
        console.error("Error loading Perusahaan data:", error);
      }
    },

    // Fungsi untuk memperbarui nomor dokumen berdasarkan perusahaan yang dipilih
    updateDocNumber() {
      if (this.selectedPerusahaan) {
        this.doc_number = this.selectedPerusahaan.doc_number || "";
      } else {
        this.doc_number = "";
      }
    },

    // Fungsi untuk menghapus data UAT
    async deleteUat(id) {
      const confirmed = confirm("Apakah Anda yakin ingin menghapus data UAT ini?");
      if (confirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/uats/${id}`, {
            headers: {
              "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
            },
          });
          this.result = this.result.filter((uat) => uat.id !== id);
        } catch (error) {
          this.errorMessage = "Gagal menghapus data UAT. Silakan coba lagi!";
        }
      }
    },
  },
};
</script>

<!--  -->

<style scoped>
/* Button styles */
.add-button {
  color: rgb(255, 255, 255);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-button:hover {
  background-color: #0037ff; /* Darker blue */
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
}

/* Table styles */
.uat-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #ffffff; /* White background */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.uat-table:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.uat-table th,
.uat-table td {
  padding: 0.75rem;
  border: 1px solid #e2e6ea; /* Light gray border */
  text-align: left;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.uat-table thead {
  background-color: #f8f9fa; /* Lighter gray */
  font-weight: bold;
}

/* Action column styles */
.action-column {
  width: 150px;
}

/* Delete button styles */
.delete-button {
  background-color: #dc3545; /* Bootstrap danger color */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border: none;
  font-size: 0.875rem;
  cursor: poinper;
}

.delete-button:hover {
  background-color: #c82333; /* Darker red */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.details-button {
  background-color: #28a745; /* Bootstrap success color */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
}

.details-button:hover {
  background-color: #218838; /* Darker green */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Error message styles */
.error-message {
  color: #dc3545; /* Bootstrap danger color */
  font-weight: bold;
  margin-top: 1rem;
  font-size: 0.875rem;
}

/* No data message styles */
.no-data-message {
  color: #6c757d; /* Bootstrap secondary color */
  font-style: italic;
  margin-top: 1rem;
  font-size: 0.875rem;
}
</style>