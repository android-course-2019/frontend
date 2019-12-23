import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/style/theme/index.css'
import api from './apis'
import apiError from './apis/errorCodes'
import utils from './utils'
import VueCordova from '@/cordova'

Vue.use(VueCordova)
Vue.use(ElementUI)
Vue.prototype.$cordova = Vue.cordova
Vue.prototype.$api = api
Vue.prototype.$timeStringify = utils.dateStringify
Vue.prototype.$apiError = apiError
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    store.dispatch('tryLogin')
  }
}).$mount('#app')
