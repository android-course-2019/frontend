import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

export const __axiosInstance = axios.create({
  // baseURL: 'https://aliyun.yh0x13f.cn/api/android-course/',
  baseURL: '/api',
  timeout: 10000
})

__axiosInstance.interceptors.request.use(
  requestConf => {
    console.log(requestConf)
    return requestConf
  },
  err => Promise.reject(err)
)

__axiosInstance.interceptors.response.use(
  res => {
    if (res.data.withCredential) {
      store.dispatch('fetchInfo').then()
    }
    return res
  },
  err => {
    Message({
      message: '网络错误，请稍后重试！',
      type: 'error',
      customClass: 'narrow-message'
    })
    return Promise.reject(err)
  }
)
