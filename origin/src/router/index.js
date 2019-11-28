import Vue from 'vue'
import VueRouter from 'vue-router'
import GeneralPage from '@/components/GeneralPage'
import views from './views'

Vue.use(VueRouter)

const tabBarPages = Object.entries(views.viewsPath).filter(item => item[1].tabBar)

const tabBarPageRoutes = tabBarPages.map(item => {
  return { path: item[0], name: item[0], component: item[1].component }
})

const tabBarItems = tabBarPages.map(item => {
  return { label: item[1].tabBar.label, icon: item[1].tabBar.icon, to: item[0] }
})

const navigationBarPages = Object.entries(views.viewsPath).filter(item => item[1].header)

const navigationBarPageRoutes = navigationBarPages.map(item => {
  return { path: item[0], name: item[0], component: item[1].component }
})

const otherPages = Object.entries(views.viewsPath).filter(item => !item[1].tabBar && !item[1].header)

const otherPageRoutes = otherPages.map(item => {
  return { path: item[0], name: item[0], component: item[1].component }
})

const tabBarRoute = {
  path: '/',
  component: GeneralPage,
  redirect: tabBarPageRoutes[0].path,
  children: tabBarPageRoutes,
  props: {
    items: tabBarItems,
    tabBar: true
  }
}

const navigationBarRoute = {
  path: '/',
  component: GeneralPage,
  children: navigationBarPageRoutes,
  props: {
    header: true
  }
}

const otherRoute = {
  path: '/',
  component: GeneralPage,
  children: otherPageRoutes
}

const routes = [tabBarRoute, navigationBarRoute, otherRoute]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
