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
          @click=""
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
          @click="register"
        >
          确认修改
        </v-btn>

        <div></div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetPage",
  layout: "login",

  data: ()=>({
    email: '',
    authen: '',
    code: '',
    reCode: '',
    verifyCode: '',

    emailRules: [
      v => !!v || '邮箱必填',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
    }
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
  margin: 10px 0 0 0;
}

.gotoLogin:hover {
  color: blue;
  cursor: pointer;
}

</style>
