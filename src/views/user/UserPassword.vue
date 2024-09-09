<script setup>
import page from '@/components/PageContainer.vue'
import { updateUserPas } from '@/api/user.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const rules = {
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码输入不规范', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码输入不规范', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码输入不规范', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.new_pwd) {
          callback(new Error('密码输入不一致'))
        } else callback()
      },
      trigger: 'blur'
    }
  ]
}
const formRef = ref()
const router = useRouter()
// 修改密码
const changePwd = async () => {
  await formRef.value.validate()
  await updateUserPas(formModel.value)
  ElMessage.success('修改密码成功')
  router.push('/login')
}
// 重置密码
const resetPwd = async () => {
  await formRef.value.validate()
  formModel.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}
</script>
<template>
  <page title="重置密码">
    <el-form :model="formModel" ref="formRef" :rules="rules">
      <el-form-item label="原密码" style="margin-left: 27px" prop="old_pwd">
        <el-input
          style="width: 40%; height: 40px"
          v-model="formModel.old_pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" style="margin-left: 27px" prop="new_pwd">
        <el-input
          style="width: 40%; height: 40px"
          v-model="formModel.new_pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input
          style="width: 40%; height: 40px"
          v-model="formModel.re_pwd"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePwd">修改密码</el-button>
        <el-button @click="resetPwd">重置</el-button>
      </el-form-item>
    </el-form>
  </page>
</template>
<style scoped></style>
