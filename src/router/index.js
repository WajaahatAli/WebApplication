import { createRouter, createWebHistory } from 'vue-router'
import DeviceCatalogue from '../views/devicecatalogue.vue'


const routes = [
  { path: '/', redirect: '/devices' },
  { path: '/devices', name: 'devices', component: DeviceCatalogue }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
