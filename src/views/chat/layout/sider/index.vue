<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { NButton, NLayoutSider, NPopconfirm, NSpace } from 'naive-ui'
import List from './List.vue'
import { PromptStore, Scene, SvgIcon } from '@/components/common'
import { useAppStore, useAuthStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))
const PricingTable = defineAsyncComponent(() => import('@/views/chat/layout/sider/PricingTable.vue'))

const appStore = useAppStore()
const chatStore = useChatStore()
const authStore = useAuthStore()

const { isMobile } = useBasicLayout()
const promptStoreShow = ref(false)
const sceneShow = ref(false)
const pricingTableShow = ref(false)
const settingShow = ref(false)

const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

const handleLogout = function () {
  authStore.removeToken()
  window.location.reload()
}

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
  <NLayoutSider
    :collapsed="collapsed"
    :collapsed-width="0"
    :width="260"
    :show-trigger="isMobile ? false : 'arrow-circle'"
    collapse-mode="transform"
    position="absolute"
    bordered
    :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed"
  >
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <NButton dashed block @click="handleAdd">
            {{ $t('chat.newChatButton') }}
          </NButton>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>
        <div class="p-4">
          <NSpace vertical>
            <NButton block @click="promptStoreShow = true">
              {{ $t('store.siderButton') }}
            </NButton>
            <NButton block round secondary type="warning" @click="pricingTableShow = true">
              订阅
              <template #icon>
                <SvgIcon icon="tabler:diamond" />
              </template>
            </NButton>
            <NSpace justify="space-between">
              <NButton block @click="settingShow = true">
                设置
                <template #icon>
                  <SvgIcon icon="ri:settings-4-line" />
                </template>
              </NButton>
              <NPopconfirm @positive-click="handleLogout">
                <template #trigger>
                  <NButton block>
                    退出
                    <template #icon>
                      <SvgIcon icon="ant-design:logout-outlined" />
                    </template>
                  </NButton>
                </template>
                确定要退出吗？
              </NPopconfirm>
            </NSpace>
          </NSpace>
        </div>
      </main>
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 bg-black/40" @click="handleUpdateCollapsed" />
  </template>
  <PromptStore v-if="promptStoreShow" v-model:visible="promptStoreShow" />
  <Scene v-if="sceneShow" v-model:visible="sceneShow" />
  <PricingTable v-if="pricingTableShow" v-model:visible="pricingTableShow" />
  <Setting v-if="settingShow" v-model:visible="settingShow" />
</template>
