<template>
  <div id="login-page">
    <div class="content-area col-flex-container main-axis-center">
      <i class="el-icon-milk-tea login-logo"/>
      <div v-if="loginStatus==='init'" class="col-flex-container main-axis-center second-axis-space btn-container">
        <el-button type="primary" class="login-btn" @click="toLogin">登陆</el-button>
        <el-button class="login-btn" @click="toSignUp">注册</el-button>
      </div>
      <div v-if="loginStatus==='login'" class="col-flex-container main-axis-center second-axis-space input-container">
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
      </div>
      <div v-if="loginStatus==='signUp'" class="col-flex-container main-axis-center second-axis-space input-container">
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
        <el-button class="login-input login-button" type="primary" plain>注册</el-button>
        <el-button class="login-input login-button" plain @click="toInit">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
    toInit () {
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
      if (!/^1[0-9]{10}$/.test(phone)) {
        this.$message.warning('请输入正确的手机！')
        return
      }
      this.$api.sendCode(phone, false)
        .then(res => {
          let code = res.data.code
          if (code !== 200) {
            if (code === -205) {
              this.$message.error('输入有误，请重试！')
            } else {
              this.$message.error('网络错误，请稍后再试！')
            }
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
      this.$api.login(this.phone, this.password)
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message.success('登陆成功！')
          }
        })
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
