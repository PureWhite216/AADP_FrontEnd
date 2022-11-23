<template>
  <div>
    <div v-if="loginFlag" class="LRBox">
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
          :counter="10"
          :rules="accountRules"
          label="账号"
          required
        ></v-text-field>

        <v-text-field
          v-model="code"
          :counter="16"
          :rules="codeRules"
          label="密码"
          required
        ></v-text-field>

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
    <div v-else>
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
          :counter="10"
          :rules="accountRules"
          label="账号"
          required
        ></v-text-field>

        <v-text-field
          v-model="code"
          :counter="16"
          :rules="codeRules"
          label="密码"
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

        <div></div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  //layout: "login",

  data: () => ({
    loginFlag: true,
    valid: true,
    account: '',
    accountRules: [
      v => !!v || '账号必填',
      v => (v && v.length <= 10) || 'Account must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || '邮箱必填',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    code: '',
    codeRules: [
      v => !!v || '密码必填',

    ],
    reCode: '',
    reCodeRules: [
      v => !!v || '重复输入密码必填',
    ],
    verifyCode: '',
    verifyRules: [
      v => !!v || '验证码必填',
    ]
  }),

  methods: {
    login(){
      if(this.loginFlag){

      }
      else this.loginFlag = true;
      this.resetValidation();
    },
    register(){
      if(!this.loginFlag){

      }
      else this.loginFlag = false;
      this.resetValidation();
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped>
.LRBox {
  border: 1px black solid;
}

.loginTitle {
  margin: 10% auto 0;
  width: 40%;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: black;
}

.loginForm{
  margin: 0 auto;
  width: 40%;
}

.registerTitle {
  margin: 5% auto 0;
  width: 40%;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: black;
}

.registerForm{
  margin: 0 auto;
  width: 40%;
}

.verifyBtn {
  float: right;
  right: 10%;
  height: 20px;
  color: white;
}

.loginBtn {
  float: left;
  left: 0;
  width: 40%;
  margin-top: 10px;
}

.registerBtn {
  float: right;
  right: 0;
  width: 40%;
  margin-top: 10px;
}
</style>
