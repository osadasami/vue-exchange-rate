<script setup lang="ts">
import { useStore } from '@/stores/main'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const store = useStore()

onMounted(() => {
  store.setCurrency(navigator.language)
  const localStorageState = localStorage.getItem('state')
  if (localStorageState) {
    store.$state = JSON.parse(localStorageState)
  } else {
    store.fetchRateAndCache(store.userInput.baseCode)
  }
})

store.$subscribe((mut, state) => {
  localStorage.setItem('state', JSON.stringify(state))
})
</script>

<template>
  <header class="mb-4">
    <div class="wrapper">
      <nav class="p-4 bg-white rounded space-x-4">
        <RouterLink active-class="bg-indigo-200" to="/" class="p-2 rounded"
          >Converter</RouterLink
        >
        <RouterLink
          to="/allrates"
          class="p-2 rounded"
          active-class="bg-indigo-200"
          >All rates</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>
