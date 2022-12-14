<template>
  <div class="background">
    <div class="mainText">
      <h1 class="textFont">
        Welcome to
      </h1>
      <h1 class="textFont2">
        ResearchOcean
      </h1>
    </div>
    <div class="box">
      <!--登录 -->
      <div v-if="loginFlag===1" class="loginBox">
        <div class="loginTitle">
          登录
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
            :append-icon="pFlag1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pFlag1 ? 'text' : 'password'"
            @click:append="pFlag1 = !pFlag1"
            required
          ></v-text-field>

          <div class="forget" @click="gotoForget">
            忘记密码
          </div>

          <v-btn
            color="primary"
            class="loginBtn"
            @click="login"
          >
            登录
          </v-btn>

          <v-btn
            color="warning"
            class="registerBtn"
            @click="register"
          >
            注册
          </v-btn>
        </v-form>
      </div >
      <!--注册-->
      <div v-else-if="loginFlag===2" class="registerBox">
        <div class="registerTitle">
          注册
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
            :append-icon="pFlag1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pFlag1 ? 'text' : 'password'"
            @click:append="pFlag1 = !pFlag1"
            required
          ></v-text-field>

          <v-text-field
            v-model="reCode"
            :counter="20"
            :rules="reCodeRules"
            label="确认密码"
            :append-icon="pFlag2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pFlag2 ? 'text' : 'password'"
            @click:append="pFlag2 = !pFlag2"
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
      <!--忘记密码-->
      <div v-else class="forgetBox">
        <div class="forgetTitle">
          忘记密码
        </div>
        <v-form
          ref="form"
          lazy-validation
          class="forgetForm"
        >

          <v-text-field
            v-model="code"
            :counter="16"
            :rules="codeRules"
            label="新密码"
            :append-icon="pFlag1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pFlag1 ? 'text' : 'password'"
            @click:append="pFlag1 = !pFlag1"
            required
          ></v-text-field>

          <v-text-field
            v-model="reCode"
            :counter="16"
            :rules="reCodeRules"
            label="确认密码"
            :append-icon="pFlag2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pFlag2 ? 'text' : 'password'"
            @click:append="pFlag2 = !pFlag2"
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
            @click="getForgetVer"
          >
            获取验证码
          </v-btn>

          <div></div>

          <div @click="login" class="gotoLogin">
            前往登录
          </div>

          <v-btn
            color="success"
            class="forgetBtn"
            style="width: 100%"
            @click="changeCode"
          >
            确认修改
          </v-btn>

          <div></div>
        </v-form>
      </div>
    </div>

  </div>
</template>

<script>
import qs from 'qs';

export default {
  name: "LoginPage",
  components: {},

  layout: "login",

  data: () => ({
    loginFlag: 1,
    valid: true,
    account: '',
    email: '',
    code: '',
    reCode: '',
    verifyCode: '',

    pFlag1: false,
    pFlag2: false,

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

  mounted () {
    window.addEventListener('keydown', this.keyDown)
  },

  destroyed () {
    window.removeEventListener('keydown', this.keyDown, false)
  },

  methods: {
    initInfo(){
      let token = localStorage.getItem('Token')
      //console.log(this.token)
      this.$axios.get('/user/showInfo/' , {
        headers: {
          'token': token
        }
      }).then(res => {
        // console.log(res.data.data[0].avatar)
        if(res.data.code == 200){
          localStorage.setItem("avatar",res.data.data[0].avatar)
          localStorage.setItem("isAdmin",res.data.data[0].isAdmin)
          // console.log(localStorage.getItem("avatar"))
        }
        else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },

    login(){
      if(this.loginFlag===1){
        this.$axios.post('/user/login', {
          username: this.account,
          password: this.code,
          keep_login: true
        }).then(res => {
          //console.log(res)
          if(res.data.code == 200){
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            localStorage.setItem("userID",res.data.data[0].user_id)
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
      else {
        this.loginFlag = 1
        this.clearInfo()
        this.resetValidation()
      }
    },

    register(){
      if(this.loginFlag===2){
        this.$axios.post('/user/register', {
          email: this.email,
          verificationCode: this.verifyCode,
          username: this.account,
          password1: this.code,
          password2: this.reCode
        }).then(res => {
          //console.log(res)
          if(res.data.code == 200){
            this.$message({
              message: '注册成功，即将调转到登录界面',
              type: 'success'
            })
            setTimeout(this.login, 1000)
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
      else {
        this.loginFlag = 2
        this.clearInfo()
        this.resetValidation()
      }
    },

    getVer() {
      this.$axios.post('/user/sendRegistrationVerificationCode',{
        email: this.email,
        modify: false
      }).then(res => {
        console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '验证码已发送',
            type: 'success'
          })
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
    },

    changeCode(){
      this.$axios.post('/user/changePassword',{
        mode: 0,
        password1: this.code,
        password2: this.reCode,
        email: this.email,
        verifyCode: this.verifyCode
      }).then(res => {
        //console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '修改成功，即将跳转到登陆界面',
            type: 'success'
          })
          setTimeout(this.login, 1000)
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
    },

    getForgetVer() {
      this.$axios.post('/user/sendForgotPasswordEmail',{
        email: this.email
      }).then(res => {
        //console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '验证码已发送',
            type: 'success'
          })
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
    },

    gotoForget(){
      this.loginFlag = 3
      this.clearInfo()
      this.resetValidation()
    },

    gotoMain(token){
      //console.log(token)
      localStorage.setItem("Token",token);
      this.initInfo()
      this.$router.push({
        name: 'MainPage',
      })
    },

    clearInfo(){
      this.account = ""
      this.code = ""
      this.reCode = ""
      this.email = ""
      this.verifyCode = ""
      this.pFlag1 = false
      this.pFlag2 = false
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    },

    keyDown (e){
      if (e.keyCode===13 && this.loginFlag===1) {
        this.login()
      }
    }
  },
}
</script>

<style scoped>
.textFont{
  font-size: 40px;
  color: #232323;
  font-weight: 100;
  font-family: Georgia;
}
.textFont2{
  font-size: 90px;
  color: #000000;
  font-weight: 100;
  font-family: Georgia;
}
.mainText{
  position: absolute;
  left: 10%;
  top: 35%;
}
.box{
  position: absolute;
  width: 100%;
  /*height: 100%;*/
  /*height: 1000px;*/
  left: 23%;
  top: 10%;
}
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(144, 144, 144, 0.06);
}

.loginBox {
  border: 1px white solid;
  border-radius: 10px;
  margin: 10% auto 0;
  width: 30%;
  background: rgba(255, 255, 255, 0.80);
  /*box-shadow: 10px 10px 5px grey;*/
}

.registerBox {
  border: 1px white solid;
  border-radius: 10px;
  margin: 5% auto 0;
  width: 30%;
  background: rgba(255, 255, 255, 0.80);
  /*box-shadow: 10px 10px 5px grey;*/
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

.forgetBox {
  border: 1px white solid;
  border-radius: 10px;
  margin: 6% auto 0;
  width: 30%;
  background: rgba(255, 255, 255, 0.80);
  /*box-shadow: 10px 10px 5px grey;*/
}

.forgetTitle {
  margin: 20px auto 0;
  width: 60%;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: black;
}

.forgetForm{
  margin: 0 auto;
  width: 80%;
}

.verifyBtn {
  float: right;
  right: 5%;
  height: 20px;
  color: white;
}


.forgetBtn {
  width: 40%;
  margin: 20px 0 20px 0;
}

.gotoLogin {
  display: block;
  text-align: right;
  text-decoration: none;
  color: black;
}

.gotoLogin:hover {
  color: blue;
  cursor: pointer;
}
</style>
