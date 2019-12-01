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
