import Posters from '@/views/Posters'
import Drinks from '@/views/Drinks'
import Messages from '@/views/Messages'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Search from '@/views/Search'

export default {
  viewsPath: {
    posters: {
      component: Posters,
      tabBar: {
        label: '点 评',
        icon: 'el-icon-house'
      }
    },
    drinks: {
      component: Drinks,
      tabBar: {
        label: '饮 品',
        icon: 'el-icon-milk-tea'
      }
    },
    messages: {
      component: Messages,
      tabBar: {
        label: '消 息',
        icon: 'el-icon-chat-round'
      }
    },
    home: {
      component: Home,
      tabBar: {
        label: '我 的',
        icon: 'el-icon-user'
      }
    },
    login: {
      component: Login
    },
    search: {
      component: Search,
      header: {
        returnable: true,
        text: '搜索'
      }
    }
  }
}
