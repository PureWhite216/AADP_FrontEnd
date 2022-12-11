<template>
  <div class="background">
    <div v-if="loginFlag" class="loginBox">
      <div class="loginTitle">
        Sign In
      </div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="loginForm"
      >
        <v-text-field
          v-model="account"
          :counter="15"
          :rules="accountRules"
          label="账号"
          required
        ></v-text-field>

        <v-text-field
          v-model="code"
          :counter="20"
          :rules="codeRules"
          label="密码"
          required
        ></v-text-field>

        <div class="forget" @click="gotoForget">
          忘记密码
        </div>

        <v-btn
          color="success"
          class="loginBtn"
          @click="login"
        >
          登录
        </v-btn>

        <v-btn
          color="success"
          class="registerBtn"
          @click="register"
        >
          注册
        </v-btn>
      </v-form>
    </div>

    <div v-else class="registerBox">
      <div class="registerTitle">
        Sign Up
      </div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="registerForm"
      >
        <v-text-field
          v-model="account"
          :counter="15"
          :rules="accountRules"
          label="账号"
          required
        ></v-text-field>

        <v-text-field
          v-model="code"
          :counter="20"
          :rules="codeRules"
          label="密码"
          required
        ></v-text-field>

        <v-text-field
          v-model="reCode"
          :counter="20"
          :rules="reCodeRules"
          label="确认密码"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="邮箱"
          required
        ></v-text-field>

        <v-text-field
          v-model="verifyCode"
          :rules="verifyRules"
          label="验证码"
          style="display: inline-block; width: 60%"
          required
        ></v-text-field>

        <v-btn
          color=#2196F3
          class="verifyBtn"
          @click="getVer"
        >
          获取验证码
        </v-btn>

        <div></div>

        <div @click="login" class="gotoLogin">
          已注册，前往登录
        </div>

        <v-btn
          color="success"
          class="registerBtn"
          style="width: 100%"
          @click="register"
        >
          注册
        </v-btn>

        <div></div>
      </v-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs';

export default {
  name: "LoginPage",
  layout: "login",

  data: () => ({
    loginFlag: true,
    valid: true,
    account: '',
    email: '',
    code: '',
    reCode: '',
    verifyCode: '',

    accountRules: [
      v => !!v || '账号必填',
    ],
    emailRules: [
      v => !!v || '邮箱必填',
      v => /.+@.+\..+/.test(v) || '邮箱无效',
    ],
    codeRules: [
      v => !!v || '密码必填',
    ],
    reCodeRules: [
      v => !!v || '重复输入密码必填',
    ],
    verifyRules: [
      v => !!v || '验证码必填',
    ],
  }),

  methods: {
    login(){
      if(this.loginFlag){
        let form = {
          username: this.account,
          password: this.code,
          keep_login: true
        }
        this.$axios.post('/user/login',
          qs.stringify(form)
        ).then(res => {
          console.log(res)
          if(res.data.success){
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            this.gotoMain(res.data.data[0].token)
          }
          else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: err.message,
            type: 'error'
          })
        })
      }
      else this.loginFlag = true;
    },

    register(){
      if(!this.loginFlag){
        let form = {
          email: this.email,
          verification_code: this.verifyCode,
          username: this.account,
          password1: this.code,
          password2: this.reCode
        }
        this.$axios.post('/user/register',
          qs.stringify(form)
        ).then(res => {
          //console.log(res)
          if(res.data.success){
            this.$message({
              message: '注册成功，即将调转到登录界面',
              type: 'success'
            })
            setTimeout(this.login, 2000)
          }
          else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: err.message,
            type: 'error'
          })
        })
      }
      else this.loginFlag = false;
    },

    getVer() {
      let form = {
        email: this.email,
        modify: false
      }
      console.log(JSON.stringify(form))
      this.$axios.post('/user/sendRegistrationVerificationCode',
        qs.stringify(form)
      ).then(res => {
        //console.log(res)
        if(res.data.success){
          this.$message({
            message: '验证码已发送',
            type: 'success'
          })
        }
        else {
          this.$message({
            message: '验证码发送失败',
            type: 'error'
          })
        }
      }).catch(err => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      })
    },

    gotoForget(){
      this.$router.push({
        name: 'ForgetPage'
      })
    },

    gotoMain(token){
      console.log(token)
      this.$router.push({
        name: 'MainPage',
        params: {
          p: token
        }
      })
    }
  },
}
</script>

<style scoped>
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(144, 144, 144, 0.1);
}

.loginBox {
  border: 1px black solid;
  border-radius: 10px;
  margin: 10% auto 0;
  width: 40%;
  background: white;
  box-shadow: 10px 10px 5px grey;
}

.registerBox {
  border: 1px black solid;
  border-radius: 10px;
  margin: 5% auto 0;
  width: 40%;
  background: white;
  box-shadow: 10px 10px 5px grey;
}

.loginTitle {
  margin: 20px auto 0;
  width: 40%;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: black;
}

.loginForm{
  margin: 0 auto;
  width: 80%;
}

.registerTitle {
  margin: 20px auto 0;
  width: 60%;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: black;
}

.registerForm{
  margin: 0 auto;
  width: 80%;
}

.verifyBtn {
  float: right;
  right: 5%;
  height: 20px;
  color: white;
}

.loginBtn {
  width: 40%;
  margin: 20px 10% 20px 5%;
}

.registerBtn {
  width: 40%;
  margin: 20px 0 20px 0;
}

.forget,.gotoLogin {
  display: block;
  text-align: right;
  text-decoration: none;
  color: black;
  margin: 5px 0 0 0;
}

.forget:hover,.gotoLogin:hover {
  color: blue;
  cursor: pointer;
}

/*
.registerBtn::after{
  content:'';
  display:block;
  clear: both;
}
 */
</style>
