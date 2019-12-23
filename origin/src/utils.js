import { Message } from 'element-ui'

export default {
  checkPhone: phone => {
    if (!(phone instanceof String) && typeof phone !== 'string') {
      return false
    }
    return /^1[0-9]{10}$/.test(phone)
  },

  checkPassword: password => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d()[\]\-.?_`~;:!@#$%^&*+=]{8,}$/
      .test(password)
  },

  dateStringify: (timestamp) => {
    let delta = Math.floor((new Date()).getTime() / 1000) - timestamp
    let now = new Date()
    let then = new Date(timestamp * 1000)
    if (now.getFullYear() !== then.getFullYear()) return `${then.getFullYear()}/${then.getMonth() + 1}/${then.getDate()}}`
    if (now.getMonth() !== then.getMonth()) return `${then.getMonth() + 1}月${then.getDate()}日`
    if (delta < 60) return '刚刚'
    if (delta < 300) return `${Math.floor(delta / 60)}分钟前`
    let deltaDay = now.getDate() - then.getDate()
    if (deltaDay === 0) return `${then.getHours()}:${then.getMinutes()}`
    if (deltaDay === 1) return '昨天'
    let weekDays = ['一', '二', '三', '四', '五', '六', '日']
    if (deltaDay < 7) return `星期${weekDays[then.getDay()]}`
    return `${then.getMonth() + 1}月${then.getDate()}日`
  },

  showLoginErrorMessage: (code) => {
    switch (code) {
      case -201:
        Message.error('账号不存在或密码错误，请检查后重试！')
        break
      case -202:
        Message.error('手机号已存在！')
        break
      case -203:
        Message.error('账号不存在！')
        break
      case -204:
        Message.error('验证码发送失败，请稍后重试！')
        break
      case -205:
        Message.error('验证码错误！')
        break
      case -206:
        Message.error('请先登录！')
        break
      default:
        Message.error('服务器错误，请稍后再试！')
    }
  }
}
