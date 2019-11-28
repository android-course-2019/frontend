import axios from 'axios'

const __axiosInstance = axios.create({
  // baseURL: 'https://aliyun.yh0x13f.cn/api/android-course/',
  baseURL: '/api',
  timeout: 10000
})

let login = (phone, password) => {
  let data = {
    phone, password
  }
  return __axiosInstance.post('/login', data)
}

let signUp = (phone, password, validateCode) => {
  let data = {
    phone, password, validateCode
  }
  return __axiosInstance.post('/signUp', data)
}

let hello = _ => {
  return __axiosInstance.get('/test')
}

let sendCode = (phone, check) => {
  return __axiosInstance.post('/send-code', {
    phone, check_exist: check
  })
}

export default {
  login, hello, sendCode, signUp
}
