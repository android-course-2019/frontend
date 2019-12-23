import { __axiosInstance } from './base'

let login = (phone, password) => {
  let data = {
    phone, password
  }
  return __axiosInstance.post('/auth/login', data)
}

let signUp = (phone, password, validateCode, nickName) => {
  let data = {
    phone, password, validateCode, nickName
  }
  return __axiosInstance.post('/auth/signUp', data)
}

let sendCode = (phone, guardExist) => {
  return __axiosInstance.post('/auth/sendSms', {
    phone, checkExist: guardExist
  })
}

let logout = _ => {
  return __axiosInstance.post('/auth/logout')
}

export default {
  login, signUp, sendCode, logout
}
