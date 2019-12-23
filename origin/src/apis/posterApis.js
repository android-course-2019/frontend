import { __axiosInstance } from '@/apis/base'

let getAllMyCreatedPosters = _ => {
  return __axiosInstance.get('/poster/my/created')
}

let getMyCreatedPostersInPage = (offset, size) => {
  return __axiosInstance.get(`/poster/my/created?offset=${offset}&size=${size}`)
}

let getAllMyLikedPosters = _ => {
  return __axiosInstance.get('/poster/my/liked')
}

let getMyLikedPostersInPage = (offset, size) => {
  return __axiosInstance.get(`/poster/my/liked?offset=${offset}&size=${size}`)
}

let getMyFollowedPosterInPage = (offset, size) => {
  return __axiosInstance.get(`/poster/my/followed?offset=${offset}&size=${size}`)
}

let getHotPostersInPage = (offset, size) => {
  return __axiosInstance.get(`/poster/hot?offset=${offset}&size=${size}`)
}

let createPoster = (content, drinks, images, brandName = null) => {
  console.log(images)
  return null
}

let getPosterDetail = posterId => {
  return __axiosInstance.get(`/poster/info/${posterId}`)
}

let likePoster = posterId => {
  return __axiosInstance.post(`/poster/like/${posterId}`)
}

let unlikePoster = posterId => {
  return __axiosInstance.post(`/poster/unlike/${posterId}`)
}

export default {
  getAllMyCreatedPosters,
  getAllMyLikedPosters,
  getMyCreatedPostersInPage,
  getMyLikedPostersInPage,
  getMyFollowedPosterInPage,
  createPoster,
  getPosterDetail,
  likePoster,
  unlikePoster,
  getHotPostersInPage
}
