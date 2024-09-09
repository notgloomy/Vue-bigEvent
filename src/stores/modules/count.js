import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountStore = defineStore(
  'big-count',
  () => {
    const count = ref(1)
    const addCount = (value) => (count.value += value)
    const subCount = () => {
      count.value -= 1
    }
    return { count, addCount, subCount }
  },
  {
    persist: true //实现持久化
  }
)
