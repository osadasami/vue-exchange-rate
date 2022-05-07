<script setup lang="ts">
import { ref, watch } from 'vue'

export type userInput = {
  value: string
  baseCode: string
  targetCode: string
  amount: number
}

const props = defineProps<{
  value: string
  baseCode: string
  targetCode: string
  amount: number
  validCodes: string[]
}>()

const emit = defineEmits<{
  (e: 'onParsed', data: userInput): void
  (e: 'onInput', value: string): void
}>()

const input = ref(props.value)

watch(input, (value) => {
  emit('onInput', value)

  try {
    const data = parseUserInput(value)
    emit('onParsed', data)
  } catch (err: any) {
    console.log(err.message)
  }
})

function parseUserInput(value: string): userInput {
  const parsedUserInputFormat = new RegExp(/(\d+)\s(\w+)\sin\s(\w+)/)
  const isUserInputValid = parsedUserInputFormat.test(value)

  if (!isUserInputValid) throw new Error('Input not valid')

  const result = value.match(parsedUserInputFormat)
  let amount = Number(result![1])
  const baseCode = result![2].toUpperCase()
  const targetCode = result![3].toUpperCase()

  if (amount <= 0) throw new Error('Amount must be positive')

  if (
    !props.validCodes.includes(baseCode) ||
    !props.validCodes.includes(targetCode)
  )
    throw new Error('Invalid code')

  return { baseCode, targetCode, amount, value }
}
</script>

<template>
  <input type="text" v-model="input" placeholder="15 usd in rub" />
</template>
