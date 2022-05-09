<script setup lang="ts">
import { useStore } from '@/stores/main'
import { computed } from '@vue/reactivity'
import { onMounted, watch } from 'vue'

const store = useStore()

const targetCode = computed(() => {
  return store.userInput.targetCode
})

onMounted(() => {
  store.fetchRateAndCache(store.userInput.targetCode)
})

watch(targetCode, (value) => {
  store.fetchRateAndCache(value)
})
</script>

<template>
  <h1>
    Your code:
    <select v-model="store.userInput.targetCode">
      <option v-for="(rate, code) in store.response.rates" :value="code">
        {{ code }}
      </option>
    </select>
  </h1>
  <ul>
    <li v-for="(rate, code) in store.response.rates">
      1 {{ code }} = {{ store.convertBack(rate) }}
      {{ store.userInput.targetCode }}
    </li>
  </ul>
</template>
