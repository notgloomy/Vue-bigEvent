<script setup>
import { reqGetChannelList } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const channelList = ref({})

const getChannelList = async () => {
  const res = await reqGetChannelList()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <el-select
    :style="{ width }"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
    <el-option label="新闻" value="222"></el-option>
  </el-select>
</template>
