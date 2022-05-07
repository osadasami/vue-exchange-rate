<script setup lang="ts">
import UserInput from '@/components/UserInput.vue'
import { useStore } from '@/stores/main'

const store = useStore()
</script>

<template>
  <main>
    <UserInput
      v-if="store.response.rates"
      :value="store.userInput.value"
      :base-code="store.userInput.baseCode"
      :target-code="store.userInput.targetCode"
      :amount="store.userInput.amount"
      :valid-codes="store.validCodes"
      @onParsed="store.updateUserInput"
    />

    <div v-if="store.rate">
      {{ store.userInput.amount }}
      {{ store.userInput.baseCode }}
      =
      {{ store.rate }}
      {{ store.userInput.targetCode }}
    </div>
  </main>
</template>
