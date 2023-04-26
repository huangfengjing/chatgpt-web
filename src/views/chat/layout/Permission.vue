<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import { NButton, NInput, NModal, useMessage } from 'naive-ui'
import Icon403 from '@/icons/403.vue'

import { useAuthStore, useUserStore } from '@/store'
import { fetchVerify, sendSms } from '@/api'

defineProps<Props>()
const userStore = useUserStore()
const authStore = useAuthStore()
const ms = useMessage()

const formVal = reactive({
  mobile: '',
  code: '',
})

const active = ref(false)
const countDown = ref(60)
const cdDisabled = ref(false)
const loading = ref(false)
const verifyBtnDisabled = computed(() => !formVal.mobile.trim() || !formVal.code.trim() || loading.value)

function sendVerifyCode() {
  active.value = true
  cdDisabled.value = true
  const cd = setInterval(() => {
    if (countDown.value > 0) {
      countDown.value--
    }
    else {
      countDown.value = 60
      cdDisabled.value = false
      clearInterval(cd)
    }
  }, 1000)
  sendSms('MOBILE_LOGIN', formVal.mobile)
}

interface Props {
  visible: boolean
}

async function handleVerify() {
  try {
    active.value = false
    const { userInfo } = await fetchVerify(formVal)
    userStore.updateUserInfo(userInfo)

    ms.success('success')
    window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
  }
  finally {
    loading.value = false
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            403
          </h2>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('common.unauthorizedTips') }}
          </p>
          <Icon403 class="w-[200px] m-auto" />
        </header>
        <div class="flex items-center space-x-4">
          <span class="flex-shrink-0 w-[100px]">手机号</span>
          <div class="flex-1">
            <NInput v-model:value="formVal.mobile" placeholder="" />
          </div>
          <NButton secondary :disabled="cdDisabled" type="primary" @click="sendVerifyCode">
            发送验证码 {{ countDown }}
          </NButton>
        </div>
        <div class="flex items-center space-x-4">
          <span class="flex-shrink-0 w-[100px]">验证码</span>
          <div class="flex-1">
            <NInput v-model:value="formVal.code" placeholder="" />
          </div>
        </div>
        <NButton
          block
          type="primary"
          :disabled="verifyBtnDisabled"
          :loading="loading"
          @click="handlePress"
        >
          {{ $t('common.verify') }}
        </NButton>
      </div>
    </div>
  </NModal>
</template>
