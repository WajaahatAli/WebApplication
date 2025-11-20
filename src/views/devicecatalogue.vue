<template>
  <div class="catalogue-container">
    <h1 class="title">📱 Device Catalogue</h1>

    <div v-if="loading" class="loading">Loading devices...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="grid">
      <div v-for="device in devices" :key="device.id" class="card">
        <h3 class="card-title">{{ device.name }}</h3>

        <div class="info">
          <p><strong>Category:</strong> {{ device.category }}</p>
          <p><strong>Condition:</strong> {{ device.condition }}</p>
          <p>
            <strong>Available:</strong>
            <span :class="device.available ? 'yes' : 'no'">
              {{ device.available ? 'Yes' : 'No' }}
            </span>
          </p>
        </div>

        <div class="footer">
          <small>Added: {{ formatDate(device.createdAt) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const devices = ref([])
const loading = ref(true)
const error = ref(null)

const API_URL = "https://campus-devices-cr07-func.azurewebsites.net/api/products"

onMounted(async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error("Failed to fetch devices")

    const json = await res.json()
    devices.value = json.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.catalogue-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
}

.loading {
  font-size: 18px;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.08);
  transition: 0.2s ease;
  border-left: 6px solid #4f46e5;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 4px 16px rgba(0,0,0,0.12);
}

.card-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
}

.info p {
  margin: 4px 0;
}

.yes {
  color: #16a34a;
  font-weight: bold;
}

.no {
  color: #dc2626;
  font-weight: bold;
}

.footer {
  margin-top: 10px;
  font-size: 12px;
  color: #555;
  text-align: right;
}
</style>
