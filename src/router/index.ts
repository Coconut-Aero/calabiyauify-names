import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'calabiyau',
    component: () => import('@/views/calabiyau-calculator.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
