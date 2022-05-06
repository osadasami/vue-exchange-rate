<script setup lang="ts">
import UserInput from '@/components/UserInput.vue'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
</script>

<template>
  <main>
    <UserInput />
    <div v-if="store.$state.showRates">
      {{ store.$state.amount }}
      {{ store.$state.baseCode }}
      ->
      {{ store.$state.rate }}
      {{ store.$state.targetCode }}
    </div>
  </main>
</template>
