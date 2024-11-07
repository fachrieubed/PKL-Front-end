<template>
  <div class="content-wrapper">
    <section class="content">
      <div class="container-fluid">
        <!-- Total Perusahaan dan Total Client -->
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="info-box box-style">
              <span class="info-box-icon bg-navy"><i class="fa fa-building"></i></span>
              <div class="info-box-content">
                <span class="info-box-number">{{ totalPerusahaan }}</span>
                <span class="info-box-text">Total Perusahaan</span>
              </div>
              <router-link to="/dataperusahaan" class="info-box-footer">
                Lainnya <i class="fa fa-arrow-circle-right"></i>
              </router-link>
            </div>
          </div>
          <div class="col-md-6">
            <div class="info-box box-style">
              <span class="info-box-icon bg-pink"><i class="fa fa-users"></i></span>
              <div class="info-box-content">
                <span class="info-box-number">{{ totalClient }}</span>
                <span class="info-box-text">Total Client</span>
              </div>
              <router-link to="/dataclient" class="info-box-footer">
                Lainnya<i class="fa fa-arrow-circle-right"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Shortcuts -->
        <div class="row mt-4">
          <div class="col-md-3">
            <div class="shortcut-card">
              <router-link to="/add-perusahaan" class="shortcut-link">
                <i class="fa fa-building shortcut-icon"></i>
                <span><b>Tambah Perusahaan</b></span>
              </router-link>
            </div>
          </div>
          <div class="col-md-3">
            <div class="shortcut-card">
              <router-link to="/add-client" class="shortcut-link">
                <i class="fa fa-users shortcut-icon"></i>
                <span><b>Tambah Client</b></span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Donut Chart -->
        <div class="row mt-4">
          <div class="col-lg-6">
            <div class="card card-style">
              <div class="card-header">
                <h3 class="card-title"><b>Distribution of Companies and Clients</b></h3>
              </div>
              <div class="card-body chart-wrapper">
                <canvas id="myDonutChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabel Hari, Tanggal, Waktu -->
        <div class="row mt-4">
          <div class="col-lg-6 col-md-8">
            <div class="card card-style">
              <div class="card-header">
                <h3 class="card-title"><b>Tanggal dan Waktu Saat Ini</b></h3>
              </div>
              <div class="card-body">
                <table class="table custom-table table-striped">
                  <tr>
                    <th>Hari</th>
                    <td>{{ currentDay }}</td>
                  </tr>
                  <tr>
                    <th>Tanggal</th>
                    <td>{{ currentDate }}</td>
                  </tr>
                  <tr>
                    <th>Bulan</th>
                    <td>{{ currentMonth }}</td>
                  </tr>
                  <tr>
                    <th>Tahun</th>
                    <td>{{ currentYear }}</td>
                  </tr>
                  <tr>
                    <th>Jam</th>
                    <td>{{ currentTime }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      totalPerusahaan: 0,
      totalClient: 0,
      currentDay: "",
      currentDate: "",
      currentMonth: "",
      currentYear: "",
      currentTime: "",
      donutChart: null,
    };
  },
  mounted() {
    this.fetchDashboardData();
    this.updateDateTime();
    this.renderDonutChart();
    setInterval(this.updateDateTime, 1000);
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get("/api/dashboard-data");
        this.totalPerusahaan = response.data.total_perusahaan;
        this.totalClient = response.data.total_client;
        this.renderDonutChart();
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
    updateDateTime() {
      const now = new Date();
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      this.currentDay = days[now.getDay()];
      this.currentDate = now.getDate();
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      this.currentMonth = months[now.getMonth()];
      this.currentYear = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    },
    renderDonutChart() {
      const ctx = document.getElementById("myDonutChart").getContext("2d");
      const data = {
        labels: ["Perusahaan", "Client"],
        datasets: [{
          label: "Total",
          data: [this.totalPerusahaan, this.totalClient],
          backgroundColor: ["#00ADB5", "#112D4E"],
          hoverOffset: 4
        }],
      };

      if (this.donutChart) {
        this.donutChart.destroy();
      }

      this.donutChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
/* Info box style */
.info-box {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.info-box:hover {
  transform: translateY(-5px);
}

.info-box-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
  border-radius: 50%;
}

.bg-blue {
  background-color: #2196f3;
}

.bg-green {
  background-color: #4caf50;
}

.info-box-content {
  padding: 10px;
}

.info-box-footer {
  color: #007bff;
  font-weight: bold;
}

/* Card style */
.card-style {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card-style:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Custom table */
.custom-table th {
  background-color: #1B1A55;
  color: #FBFBFB;
}

.custom-table td {
  color: #333;
}

.chart-wrapper {
  padding: 20px;
  height: 300px;
}

.mt-4 {
  margin-top: 1.5rem;
}
  

/* Shortcut card style */

.shortcut-card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.shortcut-card:hover {
  transform: translateY(-5px);
}

.shortcut-link {
  color: #333;
  text-decoration: none;
}

.shortcut-icon {
  font-size: 30px;
  color: #00ADB5;
  margin-bottom: 10px;
}

.shortcut-link span {
  font-weight: bold;
}
</style>