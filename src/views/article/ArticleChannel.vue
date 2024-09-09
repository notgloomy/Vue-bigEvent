<script setup>
import page from '@/components/PageContainer.vue'
import { ref, onMounted } from 'vue'
import { reqGetChannelList, reqDelArticle } from '@/api/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelEdit from './components/channelEdit.vue'
import { ElMessage } from 'element-plus'

const channelList = ref([])
const isLoading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  isLoading.value = true
  const res = await reqGetChannelList()
  channelList.value = res.data.data
  isLoading.value = false
}

const dialogBehavior = () => {
  dialog.value.open({})
}

const onEditChannel = (row) => {
  dialog.value.open(row)
  console.log(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await reqDelArticle(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onSuccess = () => {
  getChannelList()
}

const hander = () => {
  console.log(channelList.value)
}

onMounted(() => {
  getChannelList()
})
</script>
<template>
  <button @click="hander">测试</button>
  <page title="文章分类">
    <template #extra
      ><el-button type="primary" @click="dialogBehavior"
        >添加分类</el-button
      ></template
    >
    <el-table :data="channelList" style="width: 100%" v-load="isLoading">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channelEdit ref="dialog" @success="onSuccess"></channelEdit>
  </page>
</template>

<style lang="scss" scoped></style>
