<template>
  <div class="card">
    <div class="card-header">
      <h3>Status Server dan Aplikasi</h3>
    </div>
    <div class="card-body">
      <ul>
        <li><strong>Server Name:</strong> {{ status.serverName }}</li>
        <li><strong>Uptime:</strong> {{ status.uptime }}</li>
        <li><strong>Memory Usage:</strong> {{ formatMemory(status.memoryUsage) }}</li>
        <li>
          <strong>Disk Usage:</strong>
          <pre>{{ status.diskUsage }}</pre>
        </li>
        <li><strong>App Version:</strong> {{ status.appVersion }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: {
        serverName: "",
        uptime: "",
        memoryUsage: 0,
        diskUsage: "",
        appVersion: "",
      },
    };
  },
  methods: {
    fetchServerStatus() {
      fetch("/api/status")
        .then((response) => response.json())
        .then((data) => {
          this.status = data;
        })
        .catch((error) => {
          console.error("Error fetching server status:", error);
        });
    },
    formatMemory(memoryUsage) {
      const mb = memoryUsage / 1024 / 1024;
      return `${mb.toFixed(2)} MB`;
    },
  },
  mounted() {
    this.fetchServerStatus();
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}
.card-header {
  background-color: #f5f5f5;
  padding: 10px;
  font-size: 1.2em;
}
.card-body ul {
  list-style-type: none;
  padding: 0;
}
.card-body ul li {
  margin: 5px 0;
}
</style>
