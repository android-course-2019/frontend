<template>
  <div id="login-page">
    <div class="content-area col-flex-container main-axis-center">
      <i class="el-icon-milk-tea login-logo"/>
      <div v-if="loginStatus==='init'" class="col-flex-container main-axis-center second-axis-space btn-container">
        <el-button type="primary" class="login-btn" @click="toLogin">登陆</el-button>
        <el-button class="login-btn" @click="toSignUp">注册</el-button>
        <el-button class="login-btn" @click="$router.back()">返回</el-button>
      </div>
      <form v-if="loginStatus==='login'" class="col-flex-container main-axis-center second-axis-space input-container">
        <el-input v-model="phone" class="login-input">
          <template slot="prepend">手机</template>
        </el-input>
        <el-input v-model="password" show-password class="login-input">
          <template slot="prepend">密码</template>
        </el-input>
        <div class="footnote row-flex-container second-axis-between login-input">
          <div></div>
          <div>忘记密码</div>
        </div>
        <el-button class="login-input login-button" type="primary" plain @click="login">登陆</el-button>
        <el-button class="login-input login-button" plain @click="toInit">返回</el-button>
      </form>
      <form v-if="loginStatus==='signUp'" class="col-flex-container main-axis-center second-axis-space input-container">
        <el-input v-model="phone" class="login-input">
          <template slot="prepend">手机号</template>
          <el-button slot="append" @click="sendCode" :disabled="!canGet">{{canGet?'获取验证码':`${second}秒`}}</el-button>
        </el-input>
        <el-input v-model="password" show-password class="login-input">
          <template slot="prepend">密 码</template>
        </el-input>
        <el-input v-model="code" class="login-input">
          <template slot="prepend">验证码</template>
        </el-input>
        <el-button class="login-input login-button" type="primary" plain @click="signUp">注册</el-button>
        <el-button class="login-input login-button" plain @click="toInit">返回</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  name: 'Login',
  data () {
    return {
      loginStatus: 'init',
      phone: '',
      password: '',
      code: '',
      canGet: true,
      gotPhone: '',
      second: ''
    }
  },
  methods: {
    clear () {
      this.phone = ''
      this.password = ''
      this.code = ''
    },
    toInit () {
      this.clear()
      this.loginStatus = 'init'
    },
    toLogin () {
      this.loginStatus = 'login'
    },
    toSignUp () {
      this.loginStatus = 'signUp'
    },
    sendCode () {
      let phone = this.phone
      if (!utils.checkPhone(phone)) {
        this.$message.warning('请输入正确的手机！')
        return
      }
      this.$api.sendCode(phone, false)
        .then(res => {
          let code = res.data.code
          if (code !== 200) {
            utils.showLoginErrorMessage(code)
            return
          }
          this.$message.success('发送成功！')
          this.gotPhone = phone
          this.canGet = false
          this.second = 60
          let interval = setInterval(_ => {
            this.second--
            if (this.second === 0) {
              this.canGet = true
              clearInterval(interval)
            }
          }, 1000)
        })
    },
    login () {
      console.log(this.$api)
      this.$api.login(this.phone, this.password)
        .then(res => {
          console.log(res)
          if (res.data.code !== 200) {
            utils.showLoginErrorMessage(res.data.code)
            return
          }
          this.$message.success('登陆成功！')
          this.$router.replace('/')
        })
        .catch(err => console.log(err))
    },
    signUp () {
      if (!utils.checkPhone(this.phone)) {
        this.$message.warning('请输入正确的手机！')
        return
      }
      if (!utils.checkPassword(this.password)) {
        this.$message.warning('密码至少包含一个字母，一个数字并至少8位！')
        return
      }
      if (this.gotPhone !== this.phone) {
        this.$message.warning('请先获取验证码！')
        return
      }
      this.$api.signUp(this.phone, this.password, this.validateCode)
        .then(res => {
          if (res.data.code !== 200) {
            utils.showLoginErrorMessage(res.data.code)
            return
          }
          this.$message.success('注册成功！正在返回')
          setTimeout(this.$router.replace('/'), 3000)
        })
    }
  },
  mounted () {
    if (this.$store.getters.logged) {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="less">
  @import url('../assets/style/globalVals');

  #login-page {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: lighten(@primary-color, 20%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .content-area {
      width: fit-content;
      height: fit-content;
      .login-logo {
        font-size: 150px;
        color: #bbb;
      }
      .btn-container {
        margin-top: 50px;
        .login-btn {
          width: 240px;
          margin: 20px 0 0 0;
          font-size: 20px;
        }
      }
      .input-container {
        background-color: white;
        margin: 50px 10px 0 10px;
        padding: 20px;
        border-radius: 10px;
        .login-input:nth-child(0n+1) {
          margin-block-start: 0;
        }
        .login-input:nth-child(1n+2) {
          margin-block-start: 15px;
        }
        .login-input {
          .el-input-group__prepend {
            width: 42px;
          }
          .el-input-group__append {
            width: 60px;
            button {
              width: 100px;
              text-align: center;
              padding: 12px 5px;
            }
          }
        }
        .footnote {
          font-size: 15px;
          color: #888;
          width: 100%;
        }
        .login-button {
          width: 100%;
          margin: 0;
        }
      }
    }
  }
</style>
