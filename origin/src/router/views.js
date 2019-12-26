import Posters from '@/views/Posters'
import Messages from '@/views/Messages'
import Drinks from '@/views/Drinks'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Search from '@/views/Search'
import CreatePoster from '@/views/CreatePoster'
import Chat from '@/views/Chat'
import PosterDetail from '@/views/PosterDetail'

export default {
  viewsPath: {
    posters: {
      component: Posters,
      tabBar: {
        label: '点 评',
        icon: 'el-icon-house'
      }
    },
    drink: {
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
      header: true
    },
    createPoster: {
      component: CreatePoster,
      header: true
    },
    chat: {
      component: Chat,
      header: true
    },
    posterDetail: {
      component: PosterDetail,
      header: true
    }
  }
}
