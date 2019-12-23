import { __axiosInstance } from '@/apis/base'

let getAllBrands = _ => {
  return __axiosInstance.get('/brand/all')
}

export default {
  getAllBrands
}
