import { __axiosInstance } from '@/apis/base'

let getMyMessageList = _ => {
  return __axiosInstance.get('/message/my')
}

let getChatHistoryInPage = (counterpartId, offset, size) => {
  return __axiosInstance.get(`/message/with/${counterpartId}?offset=${offset}&size=${size}`)
}

let getAllChatHistory = (counterpartId) => {
  return __axiosInstance.get(`/message/with/${counterpartId}?offset=0`)
}

export default {
  getMyMessageList, getChatHistoryInPage, getAllChatHistory
}
