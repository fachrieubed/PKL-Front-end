<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3 class="card-title">Tambah Data Clien</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->
    <form @submit.prevent="submitClient">
      <div class="card-body">
        <div class="form-group">
          <label for="name">Nama Client</label>
          <input v-model="client.name" class="form-control" id="name" type="text" placeholder="Nama Client" />
        </div>
        <div class="form-group">
          <label for="short_name">Nama Singkatan</label>
          <input v-model="client.short_name" class="form-control" id="short_name" type="text" placeholder="Nama Singkatan" />
        </div>
        <div class="form-group">
          <label for="address">Alamat</label>
          <input v-model="client.address" class="form-control" id="address" type="text" placeholder="Alamat" />
        </div>
        <div class="form-group">
          <label for="logo">Logo</label>
          <div class="input-group">
            <div class="custom-file">
              <input ref="fileInput" @change="onFileChange" class="custom-file-input" id="logo" type="file" accept="image/*" />
              <button type="button" @click="triggerFileInput" class="custom-file-label" for="exampleInputFile">Pilih Gambar</button>
            </div>
          </div>
          <div class="mb-2">
            <!-- Menampilkan preview gambar -->
            <img v-if="client.logoPreview" :src="client.logoPreview" alt="Preview Logo" class="h-32 w-32 object-cover" />
            <div v-else>Preview Logo</div>
          </div>
        </div>
      </div>
      <!-- /.card-body -->

      <div class="card-footer">
        <button type="submit" class="btn btn-primary">tambah</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddClient",
  data() {
    return {
      client: {
        name: "",
        short_name: "",
        address: "",
        logo: null,
        logoPreview: null, // Preview untuk gambar
      },
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.client.logo = reader.result; // Base64 string
          this.client.logoPreview = reader.result; // Untuk preview gambar
        };
      }
    },
    triggerFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click();
      } else {
        console.error("File input reference is not available.");
      }
    },
    submitClient() {
      axios
        .post("http://127.0.0.1:8000/clients", {
          name: this.client.name,
          short_name: this.client.short_name,
          address: this.client.address,
          logo: this.client.logo, // Kirim base64 string
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "DataClient" });
        })
        .catch((error) => {
          console.error("There was an error creating the client:", error.response.data);
        });
    },
  },
};
</script>

<style scoped>
/* Card Styles */
.card {
  background-color: #2d3748; /* Darker background for the card */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Darker shadow */
  margin: 20px auto; /* Center card with auto margins */
  max-width: 600px; /* Set a max-width to control size */
  overflow: hidden; /* Prevent overflow from rounded corners */
  color: #f7fafc; /* Lighter text color */
}

/* Card Header */
.card-header {
  background-color: #4a5568; /* Darker header color */
  color: #f7fafc; /* White text color */
  padding: 15px; /* Padding inside the header */
  font-size: 18px; /* Larger font size for title */
  font-weight: bold; /* Bold font for title */
}

/* Card Body */
.card-body {
  padding: 20px; /* Padding inside the body */
}

/* Form Group */
.form-group {
  margin-bottom: 15px; /* Space between form groups */
}

/* Form Labels */
.form-group label {
  font-size: 14px; /* Standard font size for labels */
  color: #e2e8f0; /* Light gray text color for readability */
  margin-bottom: 5px; /* Small margin below label */
  display: block; /* Make label display as block */
}

/* Form Inputs */
.form-control {
  width: 100%; /* Full width inputs */
  padding: 10px; /* Padding inside inputs */
  border: 1px solid #4a5568; /* Darker border color */
  border-radius: 4px; /* Slightly rounded corners */
  font-size: 14px; /* Standard input font size */
  color: #f7fafc; /* Lighter text color */
  background-color: #1a202c; /* Dark background for inputs */
}

/* Custom File Input */
.custom-file {
  display: flex; /* Align items horizontally */
  align-items: center; /* Center items vertically */
}

.custom-file-input {
  display: none; /* Hide the actual file input */
}

.custom-file-label {
  display: inline-block;
  padding: 10px;
  border: 1px solid #4a5568; /* Darker border color */
  border-radius: 4px;
  cursor: pointer;
  background-color: #2d3748; /* Darker button background */
  color: #f7fafc; /* White text color */
  margin-right: 10px; /* Space between button and image preview */
  font-size: 14px;
}

.custom-file-label:hover {
  background-color: #1a202c; /* Even darker hover state */
}

/* Image Preview */
.h-32 {
  height: 128px; /* Fixed height for image preview */
}

.w-32 {
  width: 128px; /* Fixed width for image preview */
}

.object-cover {
  object-fit: cover; /* Cover the entire preview area */
  border-radius: 4px; /* Rounded corners for preview image */
  border: 1px solid #4a5568; /* Darker border for image */
}

/* Card Footer */
.card-footer {
  padding: 15px; /* Padding inside footer */
  text-align: right; /* Right-align the submit button */
  background-color: #2d3748; /* Darker background for footer */
}

/* Submit Button */
.btn {
  padding: 10px 20px; /* Padding for the button */
  border-radius: 4px; /* Rounded button corners */
  font-size: 14px; /* Button text size */
}

.btn-primary {
  background-color: #4a5568; /* Darker primary button */
  color: #ffffff; /* White text color */
  border: none; /* Remove border */
}
</style>
