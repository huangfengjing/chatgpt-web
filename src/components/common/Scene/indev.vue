<script setup lang='ts'>
import { NGi, NGrid, NInput, NModal, NSpace, NTabPane, NTabs } from 'naive-ui'
import { computed, ref } from 'vue'
import { SvgIcon } from '@/components/common'

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const show = computed({
  get: () => props.visible,
  set: (visible: boolean) => emit('update:visible', visible),
})

const filterTitle = ref('')

interface SceneItem {
  id: number
  icon: string
  title: string
  prompt: string
}
interface Scene {
  name: string
  label: string
  data: (SceneItem)[]
}

const sceneData: Scene[] = [{
  name: 'profession',
  label: '职业',
  data: [
    {
      id: 1,
      icon: 'mdi:atom',
      title: '万能',
      prompt: '随意',
    },
    {
      id: 2,
      icon: 'mdi:penguin',
      title: '万能2',
      prompt: '随意2',
    },
  ],
}, {
  name: 'paper',
  label: '论文',
  data: [
    {
      id: 3,
      icon: 'mdi:cards-heart',
      title: '演讲家',
      prompt: '演讲家',
    },
    {
      id: 4,
      icon: 'mdi:image-edit-outline',
      title: '演讲家2',
      prompt: '演讲家2',
    },
  ],
}]

const allSceneData = computed(() => {
  const data: (SceneItem)[] = []
  sceneData.forEach(it => data.push(...it.data))
  return {
    name: 'all',
    label: '全部',
    data: data.filter(item => item.title.includes(filterTitle.value)),
  }
})
sceneData.splice(0, 0, allSceneData.value)
const handleScene = function (sceneType: string) {
  console.log(sceneType)
}
</script>

<template>
  <NModal v-model:show="show" title="场景选择" style="width: 90%; max-width: 900px;" preset="card">
    <NSpace vertical>
      <NInput v-model:value="filterTitle" placeholder="搜索场景名" />
      <NTabs justify-content="space-evenly" type="line">
        <NTabPane
          v-for="data in sceneData"
          :name="data.name" :tab="data.label"
        >
          <NGrid x-gap="12" y-gap="12" :cols="2">
            <NGi
              v-for="item in data.data" :key="item.id"
              hoverable clickable class="cursor-pointer border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 align-center text-center rounded-xl"
              @click="handleScene(item.type)"
            >
              <NSpace vertical class="p-5 text-2xl align-center">
                <div style="font-size: 48px; text-align: center;">
                  <SvgIcon :icon="item.icon" />
                </div>
                <div>{{ item.title }}</div>
              </NSpace>
            </NGi>
          </NGrid>
        </NTabPane>
      </NTabs>
    </NSpace>
  </NModal>
</template>
