<template>
  <div class="container mt-4">
    <h3 class="mb-3">Tabel UAT</h3>

    <!-- Cards for inputs -->
    <div class="row">
      <div class="col-md-4">
        <!-- Card 1: Project Information -->
        <div class="card p-3 mb-4">
          <div>
            <label for="perusahaan">Perusahaan:</label>
            <select v-model="selectedPerusahaan" id="perusahaan" class="form-control" @change="updateDocNumber">
              <option value="" disabled selected>Pilih Perusahaan</option>
              <option v-for="perusahaan in perusahaanList" :key="perusahaan.id" :value="perusahaan">
                {{ perusahaan.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="client_name">Nama client</label>
            <select id="client_name" class="form-control" v-model="form.client_name">
              <option value="" disabled selected>Pilih client</option>
              <option v-for="client in clientList" :key="client.id" :value="client.name">
                {{ client.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="project_name">Nama Project</label>
            <input type="text" id="project_name" class="form-control" v-model="form.project_name" placeholder="Isi" required />
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <!-- Card 2: Document Information -->
        <div class="card p-3 mb-4">
          <div class="form-group">
            <label>No. Dok</label>
            <input type="text" class="form-control" v-model="form.doc_number" readonly />
          </div>

          <div class="form-group">
            <label for="rev_number">No. Rev</label>
            <input type="text" id="rev_number" class="form-control" v-model="form.rev_number" placeholder="Isi" />
          </div>

          <div class="form-group">
            <label for="start_date">Tgl mulai</label>
            <input type="date" id="start_date" class="form-control" v-model="form.start_date" required />
          </div>

          <div class="form-group">
            <label for="end_date">Tgl selesai</label>
            <input type="date" id="end_date" class="form-control" v-model="form.end_date" />
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <!-- Card 3: Default Username Information -->
        <div class="card p-3 mb-4">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control" v-model="form.user_info.username" placeholder="" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="text" id="password" class="form-control" v-model="form.user_info.password" placeholder="" required />
          </div>
        </div>
      </div>
    </div>

    <!-- Form Inputan Informasi UAT -->
    <form @submit.prevent="submitData">
      <button type="button" class="btn btn-primary mb-3" @click="addPageRow">Tambah Halaman</button>

      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Pages</th>
            <th>Section On Pages</th>
            <th>Sub Section</th>
            <th>URL</th>
            <th>Note</th>
            <th>CMS Admin Panel (Backend)</th>
            <th>Test Result</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(page, pageIndex) in form.pages" :key="'page-' + pageIndex">
            <tr>
              <td>{{ pageIndex + 1 }}</td>
              <td>
                <input type="text" class="form-control" v-model="page.pages" placeholder="Pages" />
              </td>
              <td></td>
              <td></td>
              <td>
                <input type="text" class="form-control" v-model="page.url" placeholder="URL" />
              </td>
              <td>
                <input type="text" class="form-control" v-model="page.note" placeholder="Note" />
              </td>
              <td>
                <input type="text" class="form-control" v-model="page.cms_admin_panel" placeholder="CMS Admin Panel" />
              </td>
              <td>
                <input type="checkbox" v-model="page.test_result" />
              </td>
              <td>
                <button type="button" class="btn btn-info" @click="addSection(pageIndex)">➕ Section</button>
                <button type="button" class="btn btn-danger" @click="removePage(pageIndex)">❌</button>
              </td>
            </tr>

            <template v-for="(section, sectionIndex) in page.sections" :key="'section-' + pageIndex + '-' + sectionIndex">
              <tr>
                <td></td>
                <td></td>
                <td>
                  <input type="text" class="form-control" v-model="section.section_on_pages" :placeholder="`Section ${page.pages}`" />
                </td>
                <td></td>
                <td>
                  <input type="text" class="form-control" v-model="section.url" placeholder="URL" />
                </td>
                <td>
                  <input type="text" class="form-control" v-model="section.note" placeholder="Note" />
                </td>
                <td>
                  <input type="text" class="form-control" v-model="section.cms_admin_panel" placeholder="CMS Admin Panel" />
                </td>
                <td>
                  <input type="checkbox" v-model="section.test_result" />
                </td>
                <td>
                  <button type="button" class="btn btn-info" @click="addSubSection(pageIndex, sectionIndex)">➕ Sub Section</button>
                  <button type="button" class="btn btn-danger" @click="removeSection(pageIndex, sectionIndex)">❌</button>
                </td>
              </tr>

              <template v-for="(subSection, subSectionIndex) in section.sub_sections" :key="`sub-section-${pageIndex}-${sectionIndex}-${subSectionIndex}`">
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.sub_section" :placeholder="`Sub Section ${section.section_on_pages}`" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.url" placeholder="URL" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.note" placeholder="Note" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.cms_admin_panel" placeholder="CMS Admin Panel" />
                  </td>
                  <td>
                    <input type="checkbox" v-model="subSection.test_result" />
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger" @click="removeSubSection(pageIndex, sectionIndex, subSectionIndex)">❌</button>
                  </td>
                </tr>
              </template>
            </template>
          </template>
        </tbody>
      </table>

      <button type="submit" class="btn btn-success">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      perusahaanList: [],
      clientList: [], // Menambahkan daftar client
      selectedPerusahaan: null,
      form: {
        client_id: "", // Menambahkan field untuk client_id
        client_name: "",
        project_name: "",
        doc_number: "",
        rev_number: "",
        start_date: "",
        end_date: "",
        pages: [
          {
            pages: "",
            url: "",
            note: "",
            cms_admin_panel: "",
            test_result: false,
            sections: [
              {
                section_on_pages: "",
                url: "",
                note: "",
                cms_admin_panel: "",
                test_result: false,
                sub_sections: [],
              },
            ],
          },
        ],
        user_info: {
          username: "",
          password: "",
        },
      },
    };
  },
  created() {
    this.loadPerusahaan();
    this.loadClients(); // Memuat data client saat komponen dibuat
  },
  methods: {
    async loadPerusahaan() {
      try {
        const response = await axios.get("http://localhost:8000/perusahaan");
        this.perusahaanList = response.data;
      } catch (error) {
        console.error("Error loading perusahaan:", error);
      }
    },
    async loadClients() {
      try {
        const response = await axios.get("http://localhost:8000/clients"); // Ganti URL sesuai API Anda
        this.clientList = response.data;
      } catch (error) {
        console.error("Error loading clients:", error);
      }
    },
    async updateDocNumber() {
      if (this.selectedPerusahaan) {
        const configDoc = this.selectedPerusahaan.config_document;
        // Ambil bagian prefix dari config_document
        // Misalnya format `prefix1/prefix2/day/month/year`
        const parts = configDoc.split("/");

        if (parts.length >= 2) {
          const prefix = parts.slice(0, 2).join("/"); // Mengambil bagian prefix
          const today = new Date();
          const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;

          this.form.doc_number = `${prefix}/${formattedDate}`;
        } else {
          // Jika configDoc tidak sesuai format yang diharapkan
          console.error("Format config_document tidak sesuai");
          this.form.doc_number = "";
        }
      }
    },
    addPageRow() {
      this.form.pages.push({
        pages: "",
        url: "",
        note: "",
        cms_admin_panel: "",
        test_result: false,
        sections: [],
      });
    },
    removePage(index) {
      this.form.pages.splice(index, 1);
    },
    addSection(pageIndex) {
      this.form.pages[pageIndex].sections.push({
        section_on_pages: "",
        url: "",
        note: "",
        cms_admin_panel: "",
        test_result: false,
        sub_sections: [],
      });
    },
    removeSection(pageIndex, sectionIndex) {
      this.form.pages[pageIndex].sections.splice(sectionIndex, 1);
    },
    addSubSection(pageIndex, sectionIndex) {
      this.form.pages[pageIndex].sections[sectionIndex].sub_sections.push({
        sub_section: "",
        url: "",
        note: "",
        cms_admin_panel: "",
        test_result: false,
      });
    },
    removeSubSection(pageIndex, sectionIndex, subSectionIndex) {
      this.form.pages[pageIndex].sections[sectionIndex].sub_sections.splice(subSectionIndex, 1);
    },
    submitData() {
      // Implement submission logic here, including client_id
      axios
        .post("http://localhost:8000/submit-uats", this.form)
        .then((response) => {
          console.log("Data submitted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
