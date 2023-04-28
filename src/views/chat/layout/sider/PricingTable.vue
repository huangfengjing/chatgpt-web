<script lang="ts" setup>
import { computed } from 'vue'
import { NButton, NGi, NGrid, NList, NListItem, NModal, NSpace, NThing } from 'naive-ui'
import { SvgIcon } from '@/components/common'
import { buyMemberCard } from '@/api'

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})

const handleSubscribe = async function (type: string) {
  const result = await buyMemberCard(type)
  window.open(result)
}

const memberTypes = [
  {
    type: 'WEEKLY',
    title: '包年不限次',
    price: '399',
    avgPrice: '1.09',
    days: 365,
  },
  {
    type: 'WEEKLY',
    title: '包季不限次',
    price: '129',
    avgPrice: '1.43',
    days: 90,
  },
  {
    type: 'WEEKLY',
    title: '包月不限次',
    price: '49',
    avgPrice: '1.63',
    days: 30,
  },
  {
    type: 'WEEKLY',
    title: '3天不限次',
    price: '9.9',
    avgPrice: '3.3',
    days: 3,
  },
]
</script>

<template>
  <NModal v-model:show="show" title="订阅" :auto-focus="false" preset="card" style="width: 95%; max-width: 960px">
    <NGrid x-gap="12" y-gap="12" :cols="2">
      <NGi
        v-for="item in memberTypes" :key="item.type"
        hoverable clickable class="cursor-pointer border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 align-center text-center rounded-xl"
        @click="handleSubscribe(item.type)"
      >
        <NSpace vertical class="p-5">
          <div><b>{{ item.title }}</b></div>
          <div>{{ item.days }} 天</div>
          <div>低至{{ item.avgPrice }} 元/天</div>
          <div><b>{{ item.price }} 元</b></div>
        </NSpace>
      </NGi>
    </NGrid>
    <NList hoverable class="mt-10">
      <NListItem>
        <NThing title="如何联系客服？" content-style="margin-top: 10px;">
          <NButton block round class="w-50" color="#1aad19">
            微信客服
            <template #icon>
              <SvgIcon icon="simple-icons:wechat" />
            </template>
          </NButton>
        </NThing>
      </NListItem>
      <NListItem>
        <NThing title="可以开发票吗？" content-style="margin-top: 10px;">
          可以，请联系客服
        </NThing>
      </NListItem>
      <NListItem>
        <NThing title="支持哪些平台使用？" content-style="margin-top: 10px;">
          全平台通用，包括PC端，手机网页，微信端，微信小程序
        </NThing>
      </NListItem>
    </NList>
  </NModal>
</template>

<style lang="scss" scoped>
</style>
