import Vue from 'vue'
import Vuex from 'vuex'
import userApis from '@/apis/userApis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    detail: null
  },
  mutations: {
    setInfo (state, payload) {
      state.detail = payload
    }
  },
  actions: {
    fetchInfo (context) {
      userApis.getUserInfo()
        .then(res => {
          if (res.data.code === 200) {
            context.commit('setInfo', res.data.data)
          }
        })
        .catch(err => console.log(err))
    }
  },
  getters: {
    logged: state => (state.detail != null)
  }
})
