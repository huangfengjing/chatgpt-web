<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput, NModal, useMessage } from 'naive-ui'
import Icon403 from '@/icons/403.vue'

import { useAuthStore, useUserStore } from '@/store'
import { postLogin, sendSms } from '@/api'

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

// 表单验证
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
  mobile: [
    {
      key: 'mobile',
      trigger: ['input', 'blur'],
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(value))
          return new Error('手机号码不正确')
        return true
      },
    },
  ],
  code: {
    key: 'code',
    trigger: ['input', 'blur'],
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!/^\d{4}$/.test(value))
        return new Error('请输入4位数字验证码')

      return true
    },
  },
}

function sendVerifyCode() {
  formRef.value?.validate(
    (errors) => {
      if (!errors || errors.length === 0) {
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
    },
    (rule) => {
      return rule?.key === 'mobile'
    },
  )
}

interface Props {
  visible: boolean
}

async function doLogin() {
  try {
    active.value = false
    const { userInfo } = await postLogin(formVal)
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

function handleLoginBtnPressed(event: MouseEvent) {
  event.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors)
      doLogin()
    else
      ms.error('请检查表单输入')
  })
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            未登录
          </h2>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('common.unauthorizedTips') }}
          </p>
          <Icon403 class="w-[200px] m-auto" />
        </header>
        <NForm
          ref="formRef"
          :rules="rules" :model="formVal"
          label-placement="left"
          label-width="120"
        >
          <NFormItem path="mobile" label="手机号码">
            <NInput v-model:value="formVal.mobile" placeholder="" />
            <NButton secondary :disabled="cdDisabled" type="primary" style="margin-left: 12px;" @click="sendVerifyCode">
              发送验证码 {{ countDown }}
            </NButton>
          </NFormItem>
          <NFormItem path="code" label="验证码">
            <NInput v-model:value="formVal.code" :maxlength="4" :minlength="4" placeholder="" />
          </NFormItem>
          <NButton
            block
            type="primary"
            :disabled="verifyBtnDisabled"
            :loading="loading"
            @click="handleLoginBtnPressed"
          >
            {{ $t('common.verify') }}
          </NButton>
        </NForm>
      </div>
    </div>
  </NModal>
</template>
