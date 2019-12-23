import { __axiosInstance } from './base'

let getMyInfo = _ => {
  return __axiosInstance.get('/user/my/info')
}

let getMyFollow = _ => {
  return __axiosInstance.get('/user/follow/my')
}

let getUserInfo = userId => {
  return __axiosInstance.get(`/user/info/${userId}`)
}

let follow = userId => {
  return __axiosInstance.post(`/user/follow/${userId}`)
}

let unfollow = userId => {
  return __axiosInstance.post(`/user/unfollow/${userId}`)
}

export default {
  getMyInfo, getMyFollow, getUserInfo, follow, unfollow
}
