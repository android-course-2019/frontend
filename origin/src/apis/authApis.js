import { __axiosInstance } from './base'

export default {
  login: (phone, password) => {
    let data = {
      phone, password
    }
    return __axiosInstance.post('/auth/login', data)
  },

  signUp: (phone, password, validateCode) => {
    let data = {
      phone, password, validateCode
    }
    return __axiosInstance.post('/auth/signUp', data)
  },

  sendCode: (phone, guardExist) => {
    return __axiosInstance.post('/auth/sendSms', {
      phone, checkExist: guardExist
    })
  }
}
