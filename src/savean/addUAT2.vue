<template>
  <div class="container mt-4">
    <h3 class="mb-3">Tabel UAT</h3>

    <!-- Form Inputan Informasi UAT -->
    <form @submit.prevent="submitData">
      <div class="mb-3">
        <label for="project_name" class="form-label">Nama Proyek</label>
        <input type="text" id="project_name" class="form-control" v-model="form.project_name" required />
      </div>

      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" class="form-control" v-model="form.user_info.username" required />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" v-model="form.user_info.password" required />
      </div>

      <!-- Dropdown Client -->
      <div class="mb-3">
        <label for="client" class="form-label">Client</label>
        <select id="client" class="form-select" v-model="form.client_id" required>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.name }}
          </option>
        </select>
      </div>

      <!-- Dropdown Perusahaan -->
      <div class="mb-3">
        <label for="perusahaan" class="form-label">Perusahaan</label>
        <select id="perusahaan" class="form-select" v-model="form.perusahaan_id" @change="updateConfigDocument" required>
          <option v-for="perusahaan in perusahaans" :key="perusahaan.id" :value="perusahaan.id">
            {{ perusahaan.name }}
          </option>
        </select>
      </div>

      <!-- Input Config Document -->
      <div class="mb-3">
        <label for="config_document" class="form-label">Nomor Dokumen</label>
        <input type="text" id="config_document" class="form-control" v-model="form.config_document" :placeholder="configDocumentPlaceholder" required />
      </div>

      <button type="button" class="btn btn-primary mb-3" @click="addPageRow">Tambah Halaman</button>

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
                <input type="text" class="form-control" v-model="page.test_result" placeholder="Test Result" />
              </td>
              <td>
                <input type="text" class="form-control" v-model="page.note" placeholder="Note" />
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
                  <input type="text" class="form-control" v-model="section.test_result" placeholder="Test Result" />
                </td>
                <td>
                  <input type="text" class="form-control" v-model="section.note" placeholder="Note" />
                </td>
                <td>
                  <button type="button" class="btn btn-info" @click="addSubSection(pageIndex, sectionIndex)">➕ Sub Section</button>
                  <button type="button" class="btn btn-danger" @click="removeSection(pageIndex, sectionIndex)">❌</button>
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
                    <input type="text" class="form-control" v-model="subSection.test_result" placeholder="Test Result" />
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="subSection.note" placeholder="Note" />
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
        pages: [], // Array of pages
      },
      clients: [], // Daftar client
      perusahaans: [], // Daftar perusahaan
      configDocumentPlaceholder: "", // Placeholder untuk nomor dokumen
    };
  },
  mounted() {
    this.fetchClients();
    this.fetchPerusahaans();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/clients");
        this.clients = response.data;
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    },
    async fetchPerusahaans() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/perusahaans");
        this.perusahaans = response.data;
      } catch (error) {
        console.error("Error fetching perusahaans:", error);
      }
    },
    updateConfigDocument() {
      const selectedPerusahaan = this.perusahaans.find((p) => p.id === this.form.perusahaan_id);
      if (selectedPerusahaan) {
        const prefix = selectedPerusahaan.short_name;
        const date = new Date();
        this.form.config_document = `${prefix}/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
    },
    addPageRow() {
      this.form.pages.push({
        pages: "",
        url: "",
        cms_admin_panel: "",
        test_result: "",
        note: "",
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
        cms_admin_panel: "",
        test_result: "",
        note: "",
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
        cms_admin_panel: "",
        test_result: "",
        note: "",
      });
    },
    removeSubSection(pageIndex, sectionIndex, subSectionIndex) {
      this.form.pages[pageIndex].sections[sectionIndex].sub_sections.splice(subSectionIndex, 1);
    },
    submitData() {
      axios
        .post("http://127.0.0.1:8000/submit-uat", this.form)
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
