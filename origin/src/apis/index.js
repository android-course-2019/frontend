import authApis from '@/apis/authApis'
import userApis from '@/apis/userApis'
import posterApis from '@/apis/posterApis'

export default {
  ...authApis, ...userApis, ...posterApis
}
