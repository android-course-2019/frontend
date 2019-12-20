import { __axiosInstance } from './base'

export default {
  getMyInfo: _ => {
    return __axiosInstance.get('/user/info/my')
  },
  getMyFollow: _ => {
    return __axiosInstance.get('/user/follow/my')
  }
}
