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
  <div class="p-6 bg-white rounded">
    <h1 class="text-4xl mb-4">
      Your code:
      <select v-model="store.userInput.targetCode">
        <option v-for="(rate, code) in store.response.rates" :value="code">
          {{ code }}
        </option>
      </select>
    </h1>
    <ul class="sm:columns-3 md:columns-4 lg:columns-6 xl:columns-7">
      <li
        class="font-mono md:text-xs"
        v-for="(rate, code) in store.response.rates"
      >
        1 {{ code }} = {{ store.convertBack(rate) }}
        {{ store.userInput.targetCode }}
      </li>
    </ul>
  </div>
</template>
