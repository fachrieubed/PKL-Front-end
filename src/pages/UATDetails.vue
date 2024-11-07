<template>
  <div class="container mt-4">
    <h3 class="mb-3">Detail UAT</h3>

    <!-- Informasi Proyek -->
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <h5>Nama Proyek:</h5>
              <p>{{ uat.project_name }}</p>
              <h5>Perusahaan:</h5>
              <p>{{ uat.perusahaan_name }}</p>
              <h5>Klien:</h5>
              <p>{{ uat.client_name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <h5>No Doc</h5>
              <p>{{ uat.config_document }}</p>
              <h5>No rev</h5>
              <p>{{ uat.revision_number }}</p>
              <h5>TGL mulai</h5>
              <p>{{ uat.start_date }}</p>
              <h5>TGL akhir</h5>
              <p>{{ uat.end_date }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <h5>Username:</h5>
              <p>{{ uat.user_info.username }}</p>
              <h5>Password:</h5>
              <p>{{ uat.user_info.password }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4 class="mb-3">Halaman</h4>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Pages</th>
          <th>Section On Pages</th>
          <th>Sub Section</th>
          <th>URL</th>
          <th>CMS Admin Panel</th>
          <th>Test result</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(page, pageIndex) in uat.pages"
          :key="'page-' + pageIndex"
        >
          <tr>
            <td>{{ pageIndex + 1 }}</td>
            <td>{{ page.pages }}</td>
            <td></td>
            <td></td>
            <td>{{ page.url || "-" }}</td>
            <td>{{ page.cms_admin_panel || "-" }}</td>
            <td>
              <span v-if="page.test_result === '1'">✔️</span>
              <span v-else-if="page.test_result === '0'">❌</span>
              <span v-else>-</span>
            </td>
            <td>{{ page.note || "-" }}</td>
          </tr>

          <template
            v-for="(section, sectionIndex) in page.sections"
            :key="'section-' + pageIndex + '-' + sectionIndex"
          >
            <tr>
              <td></td>
              <td></td>
              <td>{{ section.section_on_pages }}</td>
              <td></td>
              <td>{{ section.url || "-" }}</td>
              <td>{{ section.cms_admin_panel || "-" }}</td>
              <td>
                <span v-if="section.test_result === '1'">✔️</span>
                <span v-else-if="section.test_result === '0'">❌</span>
                <span v-else>-</span>
              </td>
              <td>{{ section.note || "-" }}</td>
            </tr>

            <template
              v-for="(subSection, subSectionIndex) in section.sub_sections"
              :key=" 'sub-section-' + pageIndex + '-' + sectionIndex + '-' + subSectionIndex "
            >
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>{{ subSection.sub_section }}</td>
                <td>{{ subSection.url || "-" }}</td>
                <td>{{ subSection.cms_admin_panel || "-" }}</td>
                <td>
                  <span v-if="subSection.test_result === '1'">✔️</span>
                  <span v-else-if="subSection.test_result === '0'">❌</span>
                  <span v-else>-</span>
                </td>
                <td>{{ subSection.note || "-" }}</td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </table>

    <!-- Progress Bar -->
    <div class="progress mt-4">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: calculateProgress() + '%' }"
        aria-valuenow="calculateProgress()"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <p style="margin: 0;">Progress: {{ calculateProgress() }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      uat: {
        project_name: "",
        user_info: {
          username: "",
          password: "",
        },
        pages: [],
        perusahaan_name: "",
        client_name: "",
      },
    };
  },
  created() {
    this.loadUatDetails();
  },
  methods: {
    async loadUatDetails() {
      try {
        const uatId = this.$route.params.id;
        const { data } = await axios.get(`http://127.0.0.1:8000/uats/${uatId}`);
        data.user_info = JSON.parse(data.user_info);
        this.uat = data;
        await this.loadCompanyName(data.perusahaan_id);
        await this.loadClientName(data.client_id);
      } catch (error) {
        console.error("Error fetching UAT details:", error);
      }
    },
    async loadCompanyName(perusahaanId) {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/perusahaan/${perusahaanId}`);
        this.uat.perusahaan_name = data.name;
      } catch (error) {
        console.error("Error fetching company name:", error);
      }
    },
    async loadClientName(clientId) {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/clients/${clientId}`);
        this.uat.client_name = data.name;
      } catch (error) {
        console.error("Error fetching client name:", error);
      }
    },
    calculateProgress() {
      const totalItems = this.countTotalRows();
      const checkedItems = this.countCheckedRows();
      return totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);
    },
    countTotalRows() {
      let total = 0;
      this.uat.pages.forEach((page) => {
        total += 1; // Hitung halaman
        page.sections.forEach((section) => {
          total += 1; // Hitung section
          section.sub_sections.forEach(() => {
            total += 1; // Hitung sub-section
          });
        });
      });
      return total;
    },
    countCheckedRows() {
      let checked = 0;
      this.uat.pages.forEach((page) => {
        if (page.test_result === "1") checked += 1;
        page.sections.forEach((section) => {
          if (section.test_result === "1") checked += 1;
          section.sub_sections.forEach((subSection) => {
            if (subSection.test_result === "1") checked += 1;
          });
        });
      });
      return checked;
    },
  },
};
</script>