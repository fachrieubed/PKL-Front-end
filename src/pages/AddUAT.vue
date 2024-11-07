<template>
  <!-- Form Inputan Informasi UAT -->
  <div class="container mt-4">
    <h3 class="mb-3">Tambah Data UAT</h3>
    <form @submit.prevent="submitData">
      <div class="row">
        <!-- Card 1 -->
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"></h5>
              <div class="mb-3">
                <label for="project_name" class="form-label">Project Name</label>
                <input type="text" id="project_name" class="form-control" v-model="form.project_name" required />
              </div>
              <div class="mb-3">
                <label for="client" class="form-label">Client</label>
                <select id="client" class="form-select" v-model="form.client_id" required>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="perusahaan" class="form-label">Perusahaan</label>
                <select id="perusahaan" class="form-select" v-model="form.perusahaan_id" @change="updateConfigDocument" required>
                  <option v-for="perusahaan in perusahaans" :key="perusahaan.id" :value="perusahaan.id">
                    {{ perusahaan.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"></h5>
              <div class="mb-3">
                <label for="config_document" class="form-label">Nomor Dokumen</label>
                <input type="text" id="config_document" class="form-control" v-model="form.config_document" :placeholder="configDocumentPlaceholder" required />
              </div>
              <div class="mb-3">
                <label for="revision_number" class="form-label">No Rev</label>
                <input type="text" id="revision_number" class="form-control" v-model="form.revision_number" required />
              </div>
              <div class="mb-3">
                <label for="start_date">Tgl mulai</label>
                <input type="date" id="start_date" class="form-control" v-model="form.start_date" required />
              </div>
              <div class="mb-3">
                <label for="end_date">Tgl selesai</label>
                <input type="date" id="end_date" class="form-control" v-model="form.end_date" />
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"></h5>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" class="form-control" v-model="form.user_info.username" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="text" id="password" class="form-control" v-model="form.user_info.password" required />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABEL UAT -->
      <button type="button" class="btn btn-primary mb-3" @click="addPageRow">Tambah Tabel UAT</button>

      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Pages</th>
            <th>Section On Pages</th>
            <th>Sub Section</th>
            <th>URL</th>
            <th>CMS Admin Panel</th>
            <th>Test Result</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(page, pageIndex) in form.pages" :key="'page-' + pageIndex">
            <tr>
              <td>{{ pageIndex + 1 }}</td>
              <td>
                <input type="text" class="form-control" v-model="page.pages" placeholder="Pages" :class="{ 'is-invalid': !page.pages }" />
              </td>
              <td></td>
              <td></td>
              <td>
                <input type="text" class="form-control" v-model="page.url" placeholder="URL" />
              </td>
              <td>
                <input type="text" class="form-control" v-model="page.cms_admin_panel" placeholder="CMS Admin Panel" />
              </td>
              <td>
                <template v-if="page.test_result === true">
                  <!-- Jika test_result ceklis, hanya tampilkan silang -->
                  <button type="button" class="btn btn-danger" @click="setTestResult(pageIndex, null, null, 'unchecked')">✖</button>
                </template>

                <template v-if="page.test_result === false">
                  <!-- Jika test_result disilang, tampilkan ceklis -->
                  <button type="button" class="btn btn-success" @click="setTestResult(pageIndex, null, null, 'checked')">✔</button>
                </template>

                <template v-if="page.test_result === null || page.test_result === undefined">
                  <!-- Jika test_result belum diisi, tampilkan kedua tombol -->
                  <button type="button" class="btn btn-success" @click="setTestResult(pageIndex, null, null, 'checked')">✔</button>
                  <button type="button" class="btn btn-danger" @click="setTestResult(pageIndex, null, null, 'unchecked')">✖</button>
                </template>
              </td>

              <td>
                <input type="text" class="form-control" v-model="page.note" placeholder="Note" />
              </td>
              <td>
                <button type="button" class="btn btn-info" @click="addSection(pageIndex)">Tambah</button>
                <button type="button" class="btn btn-danger" @click="removePage(pageIndex)">✖</button>
              </td>
            </tr>

            <template v-for="(section, sectionIndex) in page.sections" :key="'section-' + pageIndex + '-' + sectionIndex">
              <tr>
                <td></td>
                <td></td>
                <td>
                  <input type="text" class="form-control" v-model="section.section_on_pages" :placeholder="`Section ${page.pages}`" :class="{ 'is-invalid': !section.section_on_pages }" />
                </td>
                <td></td>
                <td>
                  <input type="text" class="form-control" v-model="section.url" placeholder="URL" />
                </td>
                <td>
                  <input type="text" class="form-control" v-model="section.cms_admin_panel" placeholder="CMS Admin Panel" />
                </td>
                <td>
                  <template v-if="section.test_result === true">
                    <!-- Jika test_result ceklis, hanya tampilkan silang -->
                    <button type="button" class="btn btn-danger" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'unchecked')">✖</button>
                  </template>
                  <template v-if="section.test_result === false">
                    <!-- Jika test_result disilang, tampilkan ceklis -->
                    <button type="button" class="btn btn-success" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'checked')">✔</button>
                  </template>
                  <template v-if="section.test_result === null">
                    <!-- Jika test_result belum diisi, tampilkan kedua tombol -->
                    <button type="button" class="btn btn-success" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'checked')">✔</button>
                    <button type="button" class="btn btn-danger" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'unchecked')">✖</button>
                  </template>
                </td>
                <td>
                  <input type="text" class="form-control" v-model="section.note" placeholder="Note" />
                </td>
                <td>
                  <button type="button" class="btn btn-info" @click="addSubSection(pageIndex, sectionIndex)">Tambah</button>
                  <button type="button" class="btn btn-danger" @click="removeSection(pageIndex, sectionIndex)">🗑️</button>
                </td>
              </tr>

              <template v-for="(subSection, subSectionIndex) in section.sub_sections" :key="'sub-section-' + pageIndex + '-' + sectionIndex + '-' + subSectionIndex">
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.sub_section" :placeholder="`Sub Section ${section.section_on_pages}`" :class="{ 'is-invalid': !subSection.sub_section }" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.url" placeholder="URL" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.cms_admin_panel" placeholder="CMS Admin Panel" />
                  </td>
                  <td>
                    <template v-if="subSection.test_result === true">
                      <!-- Jika test_result ceklis, hanya tampilkan silang -->
                      <button type="button" class="btn btn-danger" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'unchecked')">✖</button>
                    </template>
                    <template v-if="subSection.test_result === false">
                      <!-- Jika test_result disilang, tampilkan ceklis -->
                      <button type="button" class="btn btn-success" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'checked')">✔</button>
                    </template>
                    <template v-if="subSection.test_result === null">
                      <!-- Jika test_result belum diisi, tampilkan kedua tombol -->
                      <button type="button" class="btn btn-success" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'checked')">✔</button>
                      <button type="button" class="btn btn-danger" @click="setTestResult(pageIndex, sectionIndex, subSectionIndex, 'unchecked')">✖</button>
                    </template>
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.note" placeholder="Note" />
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger" @click="removeSubSection(pageIndex, sectionIndex, subSectionIndex)">🗑️</button>
                  </td>
                </tr>
              </template>
            </template>
          </template>
        </tbody>
      </table>

      <!-- Progress Bar -->
      <div class="progress mt-3">
        <div class="progress-bar" role="progressbar" :style="{ width: progressPercentage + '%' }" :aria-valuenow="progressPercentage" aria-valuemin="0" aria-valuemax="100">
          <p>Progress: {{ progressPercentage }}%</p>
        </div>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-success">Simpan</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        project_name: "",
        user_info: {
          username: "",
          password: "",
        },
        client_id: null,
        perusahaan_id: null,
        config_document: "",
        revision_number: "",
        start_date: "",
        end_date: "",
        pages: [],
      },
      clients: [], // Daftar client
      perusahaans: [], // Daftar perusahaan
      configDocumentPlaceholder: "", // Placeholder untuk nomor dokumen
    };
  },
  computed: {
    progressPercentage() {
      const totalRows = this.countTotalRows();
      const checkedRows = this.countCheckedRows();
      return totalRows > 0 ? Math.round((checkedRows / totalRows) * 100) : 0;
    },
  },
  mounted() {
    this.fetchClients();
    this.fetchPerusahaans();
  },
  methods: {
    countTotalRows() {
      let total = 0;
      this.form.pages.forEach((page) => {
        total += 1; // Hitung baris untuk halaman
        page.sections.forEach((section) => {
          total += 1; // Hitung baris untuk section
          section.sub_sections.forEach(() => {
            total += 1; // Hitung baris untuk sub-section
          });
        });
      });
      return total;
    },
    countCheckedRows() {
      let checked = 0;
      this.form.pages.forEach((page) => {
        if (page.test_result === true) {
          checked += 1;
        }
        page.sections.forEach((section) => {
          if (section.test_result === true) {
            checked += 1;
          }
          section.sub_sections.forEach((subSection) => {
            if (subSection.test_result === true) {
              checked += 1;
            }
          });
        });
      });
      return checked;
    },
    submitData() {
      const invalidFields = this.form.pages.filter((page) => !page.pages);
      if (invalidFields.length) {
        alert('Pastikan semua field "Pages" telah diisi.');
        return;
      }

      const formDataWithProgress = {
        ...this.form,
        progress_percentage: this.progressPercentage,
      };

      axios
        .post("http://127.0.0.1:8000/uats", formDataWithProgress)
        .then((response) => {
          console.log("Data berhasil dikirim:", response.data);
          alert("UAT added successfully");
          this.$router.push({ name: "UAT" });
          // Reset form atau navigasi setelah berhasil
        })
        .catch((error) => {
          console.error("Gagal mengirim data:", error);
          alert("Terjadi kesalahan saat menyimpan data.");
        });
    },
    setTestResult(pageIndex, sectionIndex = null, subSectionIndex = null, value) {
      const page = this.form.pages[pageIndex];

      if (sectionIndex === null && subSectionIndex === null) {
        // Update test_result for page
        if (page) {
          page.test_result = value === "checked"; // true jika ceklis, false jika silang
        }
      } else if (sectionIndex !== null && subSectionIndex === null) {
        // Update test_result for section
        const section = page?.sections[sectionIndex];
        if (section) {
          section.test_result = value === "checked";
        }
      } else if (sectionIndex !== null && subSectionIndex !== null) {
        // Update test_result for sub-section
        const section = page?.sections[sectionIndex];
        const subSection = section?.sub_sections[subSectionIndex];
        if (subSection) {
          subSection.test_result = value === "checked";
        }
      }
    },

    async fetchClients() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/clients");
        this.clients = response.data;
      } catch (error) {
        console.error("Gagal mengambil data client:", error);
      }
    },
    async fetchPerusahaans() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/perusahaan");
        this.perusahaans = response.data;
      } catch (error) {
        console.error("Gagal mengambil data perusahaan:", error);
      }
    },
    async updateConfigDocument() {
      const selectedPerusahaan = this.perusahaans.find((perusahaan) => perusahaan.id === this.form.perusahaan_id);
      if (selectedPerusahaan) {
        this.configDocumentPlaceholder = selectedPerusahaan.config_document;
        this.form.config_document = this.configDocumentPlaceholder;
      }
    },
    addPageRow() {
      const pageNumber = this.form.pages.length + 1;
      this.form.pages.push({
        pages: "",
        sections: [],
        url: "",
        cms_admin_panel: "",
        test_result: null,
        note: "",
        sections: [],
        pageNumber: pageNumber,
      });
    },
    addSection(pageIndex) {
      const pageNumber = this.form.pages[pageIndex].pageNumber;
      const sections = this.form.pages[pageIndex].sections;
      const nextSectionNumber = sections.length + 1;
      this.form.pages[pageIndex].sections.push({
        section_on_pages: `${pageNumber}.${nextSectionNumber}`,
        url: "",
        cms_admin_panel: "",
        test_result: null,
        note: "",
        sub_sections: [],
      });
    },
    addSubSection(pageIndex, sectionIndex) {
      const section = this.form.pages[pageIndex].sections[sectionIndex];
      const subSections = section.sub_sections;
      const nextSubSectionNumber = subSections.length + 1;
      this.form.pages[pageIndex].sections[sectionIndex].sub_sections.push({
        sub_section: `${section.section_on_pages}.${nextSubSectionNumber}`,
        url: "",
        cms_admin_panel: "",
        test_result: null,
        note: "",
      });
    },
    removePage(index) {
      this.form.pages.splice(index, 1);
    },
    removeSection(pageIndex, sectionIndex) {
      this.form.pages[pageIndex].sections.splice(sectionIndex, 1);
    },
    removeSubSection(pageIndex, sectionIndex, subSectionIndex) {
      this.form.pages[pageIndex].sections[sectionIndex].sub_sections.splice(subSectionIndex, 1);
    },
  },
};
</script>

<style scoped>
/* Styling umum untuk container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Styling untuk card */
.card {
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

/* Styling form input */
.form-control {
  border-radius: 0.25rem;
  box-shadow: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Styling untuk tombol */
.btn {
  border-radius: 0.25rem;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004080;
}

/* Tabel styling */
.table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
}

.table th,
.table td {
  padding: 12px 15px;
  text-align: left;
}

.table thead th {
  background-color: #f8f9fa;
  color: #343a40;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

/* Progress bar styling */
.progress {
  background-color: #e9ecef;
  border-radius: 0.25rem;
  height: 1.5rem;
}

.progress-bar {
  background-color: #28a745;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.5rem;
}

/* Responsive styling */
@media (max-width: 768px) {
  .card-body {
    padding: 1rem;
  }

  .btn {
    width: 100%;
    margin-top: 10px;
  }

  .form-control {
    margin-bottom: 15px;
  }
}
</style>
