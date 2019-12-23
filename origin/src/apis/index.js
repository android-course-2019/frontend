import authApis from '@/apis/authApis'
import userApis from '@/apis/userApis'
import posterApis from '@/apis/posterApis'
import messageApis from '@/apis/messageApis'
import brandApis from '@/apis/brandApis'
import drinkApis from '@/apis/drinkApis'
import shopApis from '@/apis/shopApis'

export default {
  ...authApis,
  ...userApis,
  ...posterApis,
  ...messageApis,
  ...brandApis,
  ...drinkApis,
  ...shopApis
}
