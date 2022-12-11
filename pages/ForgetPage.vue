<template>
  <div class="background">
    <div class="forgetBox">
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
          required
        ></v-text-field>

        <v-text-field
          v-model="reCode"
          :counter="16"
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
</template>

<script>
import qs from 'qs';
export default {
  name: "ForgetPage",
  layout: "login",

  data: ()=>({
    email: '',
    code: '',
    reCode: '',
    verifyCode: '',

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
    ]
  }),

  methods: {
    login(){
      this.$router.push({
        name: 'LoginPage'
      })
    },

    changeCode(){
      let form = {
        mode: 0,
        password1: this.code,
        password2: this.reCode,
        email: this.email,
        verify_code: this.verifyCode
      }
      this.$axios.post('/user/changePassword',
        qs.stringify(form)
      ).then(res => {
        if(res.data.success){
          this.$message({
            message: '修改成功，即将跳转到登陆界面',
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
    },

    getVer() {
      let form = {
        email: this.email,
      }
      this.$axios.post('/user/sendForgotPasswordEmail',
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
  }
}
</script>

<style scoped>
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(144, 144, 144, 0.1);
}

.forgetBox {
  border: 1px black solid;
  border-radius: 10px;
  margin: 6% auto 0;
  width: 40%;
  background: white;
  box-shadow: 10px 10px 5px grey;
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
