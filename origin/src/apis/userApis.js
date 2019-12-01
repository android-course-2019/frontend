import { __axiosInstance } from './base'

export default {
  login: (phone, password) => {
    let data = {
      phone, password
    }
    return __axiosInstance.post('/login', data)
  },

  signUp: (phone, password, validateCode) => {
    let data = {
      phone, password, validateCode
    }
    return __axiosInstance.post('/signUp', data)
  },

  sendCode: (phone, guardExist) => {
    return __axiosInstance.post('/sendSms', {
      phone, checkExist: guardExist
    })
  },

  getUserInfo: _ => {
    return __axiosInstance.post('/getUserInfo')
  }
}
