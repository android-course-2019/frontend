import { __axiosInstance } from '@/apis/base'

let getBrandShops = brandId => {
  return __axiosInstance.get(`/shop/ofBrand/${brandId}`)
}

export default {
  getBrandShops
}
