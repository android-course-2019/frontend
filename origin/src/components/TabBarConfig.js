import Posters from '@/views/Posters'
import Drinks from '@/views/Drinks'
import Messages from '@/views/Messages'
import Home from '@/views/Home'

let tabBarConfig = [
  {
    path: '/posters',
    name: 'posters',
    label: '评 价',
    icon: 'el-icon-house',
    component: Posters
  },
  {
    path: '/drinks',
    name: 'drinks',
    label: '饮 品',
    icon: 'el-icon-milk-tea',
    component: Drinks
  },
  {
    path: '/messages',
    name: 'messages',
    label: '消 息',
    icon: 'el-icon-chat-round',
    component: Messages
  },
  {
    path: '/home',
    name: 'home',
    label: '我 的',
    icon: 'el-icon-user',
    component: Home
  }
]

export default tabBarConfig
