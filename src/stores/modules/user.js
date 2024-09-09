import { defineStore } from 'pinia'
import { requserInfo } from '@/api/user'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => (token.value = newToken)
    const resetToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const res = await requserInfo()
      console.log(res)
      user.value = res.data.data
      console.log(user)
    }
    return { token, setToken, resetToken, getUser, user }
  },
  {
    persist: true //实现持久化
  }
)
