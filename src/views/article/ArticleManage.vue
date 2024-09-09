<script setup>
import page from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import channelSelect from './components/channelSelect.vue'
import { formatTime } from '@/utils/format.js'
import { reqGetArticleList, reqDeleletArt } from '@/api/article'
import Article from './components/ArticleEdit.vue'
const articleList = ref([])
const params = ref({
  pagenum: 1, // 当前页码
  pagesize: 5, // 当前页需要条数
  cate_id: '',
  state: ''
})
const loading = ref(false)
const articleTotal = ref(0)
const getArticleList = async () => {
  loading.value = true
  const res = await reqGetArticleList(params.value)
  articleList.value = res.data.data
  articleTotal.value = res.data.total
  loading.value = false
}
getArticleList()

const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pageSize = size
  getArticleList()
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 控制抽屉
const drawerRef = ref()

// 添加文章
const addArticle = () => {
  drawerRef.value.open({})
}
// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加跳转到最后一页
    const lastPage = Math.ceil((articleTotal.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
// 搜索事件
const articleSelect = () => {
  params.value.pagenum = 1
  getArticleList()
  console.log(params)
}
// 重置事件
const articleReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  params.value.pageSize = 5
  getArticleList()
}

// 编辑事件
const onEditArticle = (row) => {
  drawerRef.value.open(row)
}
// 删除事件
const onDelArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await reqDeleletArt(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
</script>
<template>
  <page title="文章管理">
    <template #extra
      ><el-button type="primary" @click="addArticle">发布文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类:">
        <!-- Vue2 => v-model :value和@input的结合体 -->
        <!-- Vue3 => v-model :modelValue 和 @update:modelValue的简写 -->
        <!-- label展示给用户看  value提交给后台 -->
        <channelSelect v-model="params.cate_id" width="200px"></channelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select
          style="width: 200px; margin-left: 20px"
          v-model="params.state"
        >
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 20px">
        <el-button type="primary" @click="articleSelect">搜索</el-button>
        <el-button @click="articleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%" v-model="loading">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" style="height: 50px">{{
            row.title
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="warning"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="articleTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <Article ref="drawerRef" @success="onSuccess"></Article>
  </page>
</template>

<style lang="scss" scoped></style>
