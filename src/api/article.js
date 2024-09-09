import request from '@/utils/request'

// 获取文章分类
export const reqGetChannelList = () => {
  return request.get('/my/cate/list')
}

// 增加文章分类
export const reqAddArticle = (data) => {
  return request.post('/my/cate/add', data)
}

// 更新文章分类
export const reqUpdateArticle = (data) => {
  return request.put('/my/cate/info', data)
}

// 删除文章分类
export const reqDelArticle = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

// 文章:获取文章列表
export const reqGetArticleList = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

// 添加文章功能
export const reqPublishArticle = (data) => {
  return request.post('/my/article/add', data)
}

// 获取文章详情
export const reqGetArticleInfo = (id) => {
  return request.get('/my/article/info', { params: { id } })
}

// 编辑文章
export const reqEditArticle = (data) => {
  return request.put('/my/article/info', data)
}

// 删除文章
export const reqDeleletArt = (id) => {
  return request.delete('/my/article/info', {
    params: { id }
  })
}
