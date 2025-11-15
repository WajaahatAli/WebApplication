<template>
  <div style="padding: 20px;">
    <h1>Device Catalogue</h1>

    <div v-if="loading">Loading devices...</div>
    <div v-if="error" style="color: red;">{{ error }}</div>

    <div v-for="device in devices" :key="device.id" style="margin-bottom: 20px;">
      <h3>{{ device.name }}</h3>
      <p><strong>Category:</strong> {{ device.category }}</p>
      <p><strong>Condition:</strong> {{ device.condition }}</p>
      <p><strong>Available:</strong> {{ device.available ? 'Yes' : 'No' }}</p>
      <p><small>Added: {{ formatDate(device.createdAt) }}</small></p>
      <hr />
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

    // API format: { success, count, data: [...] }
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
