<script setup lang="ts">
import UserInput from '@/components/UserInput.vue'
import { useStore } from '@/stores/main'

const store = useStore()
</script>

<template>
  <main>
    <span
      class="relative bg-indigo-400 text-indigo-50 p-2 rounded-full border border-indigo-500 shadow -bottom-3 left-5"
      v-if="store.rate"
    >
      {{ store.rate }}
      {{ store.userInput.targetCode }}
    </span>
    <UserInput
      v-if="store.response.rates"
      :value="store.userInput.value"
      :base-code="store.userInput.baseCode"
      :target-code="store.userInput.targetCode"
      :amount="store.userInput.amount"
      :valid-codes="store.validCodes"
      @onParsed="store.updateUserInput"
    />
  </main>
</template>
