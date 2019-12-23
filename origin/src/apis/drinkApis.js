import { __axiosInstance } from '@/apis/base'

let getBrandDrinks = brandId => {
  return __axiosInstance.get(`/drink/ofBrand/${brandId}`)
}

export default {
  getBrandDrinks
}
