import type { userInput } from '@/components/UserInput.vue'
import { localeToCurr } from 'jnltc'
import type { currency } from 'jnltc/lib/currencies'
import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    userInput: {
      value: '',
      baseCode: 'USD',
      targetCode: 'RUB',
      amount: 1,
    },
    rate: null as null | number,
    response: null || ({} as any),
  }),
  getters: {
    validCodes: (state) => {
      return Object.keys(state.response.rates)
    },
  },
  actions: {
    setCurrency(locale: string) {
      const currency: currency = localeToCurr(locale)
      this.userInput.targetCode = currency.code
    },
    async fetchRate(code: string) {
      const res = await fetch(`https://open.er-api.com/v6/latest/${code}`)
      const data = await res.json()
      this.response = data
    },
    async updateUserInput(data: userInput) {
      await this.fetchRate(data.baseCode)
      this.userInput = data
      this.updateRate()
    },
    updateRate() {
      console.log(this.userInput)
      this.rate =
        this.userInput.amount * this.response.rates[this.userInput.targetCode]
    },
    convertBack(rate: number): number {
      return Number((1 / rate).toFixed(2))
    },
  },
})
