import { createRouter, createWebHistory } from 'vue-router'

import calabiyauCalculator from '../views/calabiyau-calculator.vue'


const routes = [
  { path: '/', component: calabiyauCalculator },
];

export default createRouter({
  history: createWebHistory(),
  routes
})