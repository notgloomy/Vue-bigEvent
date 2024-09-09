<script setup>
import { ref } from 'vue'
import { reqAddArticle, reqUpdateArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)

// open方法
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

// 编辑校验规则
const formModel = ref({
  mainName: '',
  lessName: ''
})

// 通知父组件进行回显
const emit = defineEmits(['success'])
// 编辑校验规则
const rules = {
  mainName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '请输入正确格式', trigger: 'blur' }
  ],
  lessName: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '请输入正确格式',
      trigger: 'blur'
    }
  ]
}

// 点击确认之后
const formRef = ref()
const articleOperate = async () => {
  await formRef.value.validate()
  if (formModel.value.id) {
    await reqUpdateArticle({
      cate_name: formModel.value.mainName,
      cate_alias: formModel.value.lessName
    })
    ElMessage.success('编辑成功')
  } else {
    await reqAddArticle({
      cate_name: formModel.value.mainName,
      cate_alias: formModel.value.lessName
    })
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="margin-top: 30px"
      ref="formRef"
    >
      <el-form-item label="分类名称" prop="mainName">
        <el-input
          placeholder="请输入分类名称"
          v-model="formModel.mainName"
          style="padding-right: 30px"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="lessName">
        <el-input
          placeholder="请输入分类别名"
          v-model="formModel.lessName"
          style="padding-right: 30px"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="articleOperate"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped></style>
