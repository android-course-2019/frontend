import { __axiosInstance } from '@/apis/base'

let getBrandDrinks = brandId => {
  return __axiosInstance.get(`/drink/ofBrand/${brandId}`)
}

let getAllDrinks = _ => {
  return __axiosInstance.get('/drinks/all')
}

let searchDrinks = key => {
  return __axiosInstance.post('/drinks/search', {
    key
  })
}

export default {
  getBrandDrinks, getAllDrinks, searchDrinks
}
