import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/web/chat/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/web/chat/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore()
  const authStore = useAuthStore()

  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
  }

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }

  return post<T>({
    url: '/web/chat/chat-process',
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/web/chat/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/web/chat/verify',
    data: { token },
  })
}

export function fetchAzureToken<T>() {
  return post<T>({
    url: '/web/chat/get-azure-token',
  })
}

export function txtToImg<T>(options: { data: Record<string, any>; signal?: GenericAbortSignal }) {
  const { data, signal } = options
  return post<T>({
    url: '/web/chat/txt-2-image',
    signal,
    data,
  })
}

export function smsLogin<T>(formVal: object) {
  return post<T>({
    url: '/web/chat/sms-login',
    data: formVal,
  })
}

export function sendSms<T>(event: string, mobile: string) {
  return post<T>({
    url: '/app/send-sms',
    data: {
      event,
      mobile,
    },
  })
}

export function buyMemberCard<T>(cardType: string) {
  return post<T>({
    url: '/member/card/buy',
    data: {
      cardType,
    },
  })
}
