<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NList, NListItem, NSpace, NTag, NThing } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import { useAuthStore } from '@/store'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}

const authStore = useAuthStore()

const loading = ref(false)

const config = ref<ConfigState>()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NList hoverable clickable>
    <NListItem>
      <NThing title="关于我们" content-style="margin-top: 10px;">
        <template #description>
          <NSpace size="small" style="margin-top: 4px">
            <NTag :bordered="false" type="info" size="small">
              介绍
            </NTag>
            <NTag :bordered="false" type="info" size="small">
              联系方式
            </NTag>
          </NSpace>
        </template>
        一家始终致力于让 AI 成为业务增长驱动力的机构。 精准的洞察、创新的灵感，我们可以真正做到用 AI 推动业绩增长。<br>
        电话：13333333333<br>
        Email: admin@autochat.vip<br>
      </NThing>
    </NListItem>
    <NListItem>
      <NThing title="隐私声明" content-style="margin-top: 10px;">
        <template #description>
          <NSpace size="small" style="margin-top: 4px">
            <NTag :bordered="false" type="info" size="small">
              隐私
            </NTag>
            <NTag :bordered="false" type="info" size="small">
              Privacy
            </NTag>
          </NSpace>
        </template>
        浏览我们的网站，即表示您接受本隐私声明中所述的我们的做法。<br>
        如适用的数据隐私法律有相关要求，浏览我们的网站即构成您同意我们按照本隐私声明规定处理您的个人信息。<br>
      </NThing>
    </NListItem>
  </NList>
</template>
