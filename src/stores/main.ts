import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    result: null || ({} as any),
    baseCode: 'USD',
    targetCode: 'RUB',
    amount: 0,
    showRates: false,
    rate: 0,
  }),
  actions: {
    async fetchRate(baseCode = 'USD') {
      const res = await fetch(`https://open.er-api.com/v6/latest/${baseCode}`)
      const data = await res.json()
      this.result = data
    },
    async applyUserInput(amount: number, baseCode: string, targetCode: string) {
      if (baseCode !== this.result.base_code) {
        await this.fetchRate(baseCode)
      }
      this.amount = amount
      this.baseCode = baseCode
      this.targetCode = targetCode
      this.rate = amount * this.result.rates[targetCode]
      this.showRates = true
    },
  },
})
