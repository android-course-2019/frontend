import Vue from 'vue'
import VueRouter from 'vue-router'
import TabBarView from '@/components/TabBarView'
import tabBarConfig from '@/components/TabBarConfig'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tabBarViews',
    redirect: tabBarConfig[0].path,
    component: TabBarView,
    children: tabBarConfig.map(item => {
      return {
        path: item.path, name: item.name, component: item.component
      }
    })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
