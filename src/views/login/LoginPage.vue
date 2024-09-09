<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { requserReg, requserLogin } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(true)
// 1.model属性绑定form数据对象
// 2.v-model绑定form数据对象的子属性 el-input上绑定
// 3.rules配置校验规则
// 4.prop绑定校验规则  在el-form-item上绑定
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 配置校验规则
const rules = {
  // 整个表单的校验规则
  // 1.非空校验 required:true  message消息提示,trigger触发校验的时机 blur change
  // 2.长度校验 min:xx max:xx
  // 3.正则校验 pattern:校验规则
  // 4.自定义校验规则 => 自己写逻辑校验(校验函数)
  /*
    validator:(rule,value,callback)
    rule  当前校验规则相关的信息
    value  所校验的表单元素目前的表单值
    callback 无论成功还是失败都需要callback
        callback() 校验成功
        callback(new Error(错误信息)) 校验失败
  */
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名输入不规范', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码输入不规范', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码输入不规范', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('密码输入不一致'))
        } else callback()
      },
      trigger: 'blur'
    }
  ]
}
// 注册前的预校验
const form = ref()
// 注册事件
const register = async () => {
  // 注册成功之前,先进行校验,校验成功->请求,校验失败->错误提示
  await form.value.validate()
  await requserReg(formModel.value)
  ElMessage({
    message: '注册成功',
    type: 'success'
  })
  isRegister.value = false
}
// 切换页面时数据重置
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
// 登录事件
const router = useRouter()
const toLogin = async () => {
  await form.value.validate()
  const res = await requserLogin(formModel.value)
  const userStore = useUserStore()
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="formModel"
        :rules="rules"
      >
        <el-form-item><h1>注册</h1></el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefixIcon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefixIcon="Lock"
            type="password"
            placeholder="请再次输入密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link @click="isRegister = false" type="info" :underline="false">
            ← 返回</el-link
          >
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        :model="formModel"
        :rules="rules"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link :underline="false" type="primary">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="toLogin"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
