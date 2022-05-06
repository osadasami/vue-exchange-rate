<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { ref, watch } from 'vue'
const userInput = ref('')

const store = useMainStore()

watch(userInput, (value) => {
  parseUserInput(value)
})

function parseUserInput(userInput: string) {
  store.$state.showRates = false
  const parsedUserInputFormat = new RegExp(/(\d+)\s(\w+)\sin\s(\w+)/)
  const isUserInputValid = parsedUserInputFormat.test(userInput)

  if (isUserInputValid) {
    const result = userInput.match(parsedUserInputFormat)
    if (result === null) return
    const amount = Number(result[1])
    const baseCode = result[2].toUpperCase()
    const targetCode = result[3].toUpperCase()

    if (amount <= 0) return
    if (
      !Object.keys(store.$state.result.rates).includes(baseCode) ||
      !Object.keys(store.$state.result.rates).includes(targetCode)
    )
      return

    store.applyUserInput(amount, baseCode, targetCode)
  }
}
</script>

<template>
  <input type="text" v-model="userInput" />
</template>
