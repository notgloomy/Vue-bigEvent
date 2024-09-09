<script setup>
import page from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { updateUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'

const useStore = useUserStore()
console.log(useStore.user)
const { user: username, nickname, email, id } = useStore
const userinfo = ref({
  username,
  nickname,
  email,
  id
})
const rules = {
  nickname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名输入不规范', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: '邮箱格式输入不规范',
      trigger: 'blur'
    }
  ]
}
const userRef = ref()

// 提交修改按钮
const onSubmit = async () => {
  await userRef.value.validate()
  console.log(userinfo.value)
  await updateUserInfo({
    id: useStore.user.id,
    nickname: userinfo.value.nickname,
    email: userinfo.value.email
  })
  ElMessage.success('修改个人信息成功')
}
</script>
<template>
  <page title="基本资料">
    <el-form class="form" :model="userinfo" :rules="rules" ref="userRef">
      <el-form-item label="登录名称">
        <el-input
          style="width: 40%; height: 40px"
          :value="useStore.user.username"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          style="width: 40%; height: 40px"
          v-model="userinfo.nickname"
          :value="useStore.user.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input
          style="width: 40%; height: 40px"
          v-model="userinfo.email"
          :value="useStore.user.email"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page>
</template>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
