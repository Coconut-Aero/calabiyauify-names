<template>


    <!-- 页面容器 -->
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <main class="flex-grow">
        <router-view />
      </main>
    </div>

</template>

<script setup>
import { ref, watch, onMounted, computed, watchEffect } from 'vue'



const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  isDark.value = saved !== null ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.classList.toggle('dark', isDark.value)
})

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
  localStorage.setItem('darkMode', val)
})

</script>


<style scoped>

[data-theme='light'] {
  --primary-color: #f0f0f0;
  --primary-text-color: #4b5563;
}

[data-theme='dark']{
  --primary-color: #111827;
  --primary-text-color: #f0f0f0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
