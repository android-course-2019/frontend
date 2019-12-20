import { __axiosInstance } from '@/apis/base'

export default {
  getAllMyCreatedPosters: _ => {
    return __axiosInstance.get('/poster/my/created')
  },
  getMyCreatedPostersInPage: (offset, size) => {
    return __axiosInstance.get(`/poster/my/created?offset=${offset}&size=${size}`)
  },
  getAllMyLikedPosters: _ => {
    return __axiosInstance.get('/poster/my/liked')
  },
  getMyLikedPostersInPage: (offset, size) => {
    return __axiosInstance.get(`/poster/my/liked?offset=${offset}&size=${size}`)
  }
}
