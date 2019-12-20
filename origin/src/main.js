import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/style/theme/index.css'
import api from './apis'

Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    store.dispatch('tryLogin')
  }
}).$mount('#app')
