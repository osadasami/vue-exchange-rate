import type { userInput } from '@/components/UserInput.vue'
import { localeToCurr } from 'jnltc'
import type { currency } from 'jnltc/lib/currencies'
import { defineStore } from 'pinia'

const defaultState = {
  userInput: {
    value: '',
    baseCode: 'USD',
    targetCode: 'RUB',
    amount: 1,
  },
  rate: null as null | number,
  response: null || ({} as any),
  cache: { data: {}, until: '' } as any,
}

export const useStore = defineStore({
  id: 'store',
  state: () => defaultState,
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
    async fetchRate(code: string): Promise<any> {
      const res = await fetch(`https://open.er-api.com/v6/latest/${code}`)
      const data = await res.json()
      return data
    },
    async fetchRateAndCache(code: string) {
      const currentDate = new Date().getTime()
      const cacheDate = Date.parse(this.cache.until)
      if (this.cache.data[code] && cacheDate > currentDate) {
        this.response = this.cache.data[code]
      } else {
        const data = await this.fetchRate(code)
        this.response = data
        this.cacheResponse(code, data)
      }
    },
    cacheResponse(code: string, response: any) {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      this.cache.data[code] = response
      this.cache.until = date
    },
    async updateUserInput(data: userInput) {
      await this.fetchRateAndCache(data.baseCode)
      this.userInput = data
      this.updateRate()
    },
    updateRate() {
      this.rate = Number(
        (
          this.userInput.amount * this.response.rates[this.userInput.targetCode]
        ).toFixed(2)
      )
    },
    convertBack(rate: number): number {
      return Number((1 / rate).toFixed(2))
    },
  },
})
