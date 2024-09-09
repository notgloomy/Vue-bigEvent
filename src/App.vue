<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>
<template>
  <div>
    <el-config-provider :locale="zh">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
