<template>
  <div class="background">
    <div class="main">
      <v-navigation-drawer
        absolute
        fixed
        class="navigate"
      >
        <v-list
          dense
          nav
        >
          <v-list-item two-line>
            <v-list-item-avatar>
              <img id="avatar"
                   :src="user.avatar">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title style="font-size: 16px">{{ user.username }}</v-list-item-title>
              <v-list-item-subtitle>{{user.account}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <div v-if="flag===1">
            <v-list-item link class="curNav">
              <v-list-item-icon>
                <v-icon>{{ navs[0].icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ navs[0].title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link class="navItem" @click="changeFlag(2)">
              <v-list-item-icon>
                <v-icon>{{ navs[1].icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ navs[1].title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item link class="navItem" @click="changeFlag(1)">
              <v-list-item-icon>
                <v-icon>{{ navs[0].icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ navs[0].title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link class="curNav">
              <v-list-item-icon>
                <v-icon>{{ navs[1].icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ navs[1].title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>

        <template v-slot:append>
          <div>
            <v-btn
              depressed
              color="primary"
              class="logoutBtn"
              @click="logout"
            >
              退出登录
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <div class="pageMain">
        <div v-if="flag==1">
          <div class="head1"></div>
          <div class="content" style="padding-top: 5px">
            <v-list>
              <v-list-item-title style="font-size: 20px; color:black; font-weight: bold">
                头像
              </v-list-item-title>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    small
                    v-bind="attrs"
                    v-on="on"
                    style="float: right; right: 2%; top: 80px"
                  >上传头像</v-btn>
                </template>
<!--                <span>点击左侧图标选择头像</span>-->
              </v-tooltip>
<!--              <v-file-input-->
<!--                dense-->
<!--                outlined-->
<!--                hide-input-->
<!--                accept="image/png, image/jpeg, image/bmp, image/jpg"-->
<!--                placeholder="上传头像"-->
<!--                prepend-icon="mdi-camera"-->
<!--                v-model="file"-->
<!--                style="float: right; top: 80px; right: 5px; width: 50px;"-->
<!--              >-->
<!--              </v-file-input>-->
              <v-list-item-avatar size="100">
                <img :src="user.avatar">
              </v-list-item-avatar>
            </v-list>
          </div>
          <div style="border-bottom: 1px black solid;"></div>
          <div class="content">
            <div v-if="!editInfoFlag">
              <div style="font-size: 20px; color:black; font-weight: bold">姓名</div>
              <div style="margin: 10px 0 10px 0">{{user.name}}</div>
              <div style="font-size: 20px; color:black; font-weight: bold">机构</div>
              <div style="margin: 10px 0 10px 0">{{user.institution}}</div>
              <div style="font-size: 20px; color:black; font-weight: bold">学历</div>
              <div style="margin: 10px 0 10px 0">{{user.education}}</div>
              <v-btn small color="primary" style="float: right; right: 2%"
                     @click="editInfo">编辑</v-btn>
            </div>
            <div v-else>
              <div style="font-size: 20px; color:black; font-weight: bold; ">姓名</div>
              <v-text-field
                :placeholder="user.name"
                :rules="inputRules"
                height="24"
                style="width: 40%; margin: -5px 0 -10px 0"
                v-model="input.name"
              ></v-text-field>
              <div style="font-size: 20px; color:black; font-weight: bold">机构</div>
              <v-text-field
                :placeholder="user.institution"
                :rules="inputRules"
                style="width: 40%; margin: -5px 0 -10px 0"
                v-model="input.institution"
              ></v-text-field>
              <div style="font-size: 20px; color:black; font-weight: bold">学历</div>
              <v-text-field
                :placeholder="user.education"
                :rules="inputRules"
                style="width: 40%; margin: -5px 0 -10px 0"
                v-model="input.education"
              ></v-text-field>
              <v-btn small color="primary" style="float: right; right: 2%"
                     @click="cancel(1)">取消</v-btn>
              <v-btn small color="primary" style="float: right; right: 5%"
                     @click="confirm(1)">确认</v-btn>
            </div>
            <div style="height: 45px"></div>
          </div>
          <div style="border-bottom: 1px black solid;"></div>
          <div class="content">
            <div style="font-size: 20px; color:black; font-weight: bold">认证情况</div>
            <v-btn small color="primary" style="float: right; right: 2%; top: 10px"
                   v-if="!user.flag" @click="authen">身份认证</v-btn>
            <div style="margin: 10px 0 10px 0"
                 v-if="!user.flag">未认证</div>
            <div style="margin: 10px 0 10px 0"
                 v-else>已认证</div>
          </div>
        </div>
        <div v-else>
          <div class="head2"></div>
          <div class="content">
            <div style="font-size: 20px; color:black; font-weight: bold">个人邮箱</div>
            <div v-if="!editEmailFlag">
              <div style="margin: 10px 0 10px 0">{{user.email}}</div>
              <v-btn small color="primary" style="margin: 10px 0 20px 0"
                     @click="changeEmail">修改邮箱</v-btn>
            </div>
            <div v-else>
              <v-text-field
                :placeholder="user.email"
                :rules="emailRules"
                style="width: 40%; margin: -5px 0 -10px 0"
                v-model="input.email"
              ></v-text-field>
              <v-btn small color="primary" style="margin: 10px 0 20px 0"
                     @click="confirm(2)">确认</v-btn>
              <v-btn small color="primary" style="margin: 10px 0 20px 20px"
                     @click="cancel(2)">取消</v-btn>
            </div>
          </div>
          <div style="border-bottom: 1px black solid; margin-bottom: 10px"></div>
          <div class="content">
            <div style="font-size: 20px; color:black; font-weight: bold">密码</div>
            <div v-if="!editPasswordFlag">
              <div v-if="passwordFlag" style="font-size: 18px; margin: 10px 0 10px 0">
                <div>
                  <span style="display: inline-block; width: 160px">{{user.password}}</span>
                  <v-btn x-small color="primary" class="showBtn"
                         @click="unshowPassword">隐藏</v-btn>
                </div>
              </div>
              <div v-else style="font-size: 18px; margin: 10px 0 10px 0">
                <div>
                  <span style="display: inline-block; width: 160px">********</span>
                  <v-btn x-small color="primary"
                         @click="showPassword">显示</v-btn>
                </div>
              </div>
            </div>
            <div v-else>
              <v-text-field
                v-model="input.oldPassword"
                :append-icon="pFlag1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="inputRules"
                :type="pFlag1 ? 'text' : 'password'"
                label="旧密码"
                counter
                style="width: 40%; margin: 5px 0 -10px 0"
                @click:append="pFlag1 = !pFlag1"
              ></v-text-field>
              <v-text-field
                v-model="input.newPassword"
                :append-icon="pFlag2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="inputRules"
                :type="pFlag2 ? 'text' : 'password'"
                label="新密码"
                counter
                style="width: 40%; margin: 5px 0 -10px 0"
                @click:append="pFlag2 = !pFlag2"
                @change="changeNewPsw"
              ></v-text-field>
              <v-text-field
                v-model="input.repeatPassword"
                :append-icon="pFlag3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="repeatRules"
                :type="pFlag3 ? 'text' : 'password'"
                label="重复新密码"
                counter
                style="width: 40%; margin: 5px 0 -10px 0"
                @click:append="pFlag3 = !pFlag3"
              ></v-text-field>
            </div>
            <div v-if="!editPasswordFlag">
              <v-btn small color="primary"
                     @click="changePassword">修改密码</v-btn>
            </div>
            <div v-else>
              <v-btn small color="primary" style="margin: 10px 0 20px 0"
                     @click="confirm(3)">确认</v-btn>
              <v-btn small color="primary" style="margin: 10px 0 20px 20px"
                     @click="cancel(3)">取消</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonCenter",

  data () {
    return {
      navs: [
        { title: '个人信息', icon: 'mdi-view-dashboard' },
        { title: '账户', icon: 'mdi-image' },
      ],

      flag: 1,
      user: {
        username: "wzy",
        avatar: "",
        account: "3123139531",

        flag: false,
        name: "王振阳",
        institution: "buaa",
        education: "带专",

        email: "3123139531@qq.com",
        password: "3123139531",
      },
      passwordFlag: false,

      file: {},

      input: {
        name: "王振阳",
        institution: "buaa",
        education: "带专",

        email: "3123139531@qq.com",
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      },
      editInfoFlag: false,
      editEmailFlag: false,
      editPasswordFlag: false,

      //充值密码时使用
      pFlag1: false,
      pFlag2: false,
      pFlag3: false,

      emailRules: [
        v => !!v,
        v => /.+@.+\..+/.test(v),
      ],
      inputRules: [
        v => !!v
      ],
      repeatRules: [
        v => !!v,
        v => v==this.input.newPassword || '两次密码不一致'
      ],
      imgRules: [
        v => /.+jpg|png/.test(v) || '图片必须是jpg或png格式'
      ]
    }
  },

  init(){

  },

  model(){
  },

  methods :{
    changeFlag(flag){
        this.flag = flag;
        this.restore(flag)
    },

    logout(){

    },

    uploadAvatar(){

    },

    editInfo(){
      this.copyInfo()
      this.editInfoFlag = true
    },

    authen() {
      //认证
    },

    showPassword(){
      this.passwordFlag = true
    },

    unshowPassword(){
      this.passwordFlag = false
    },

    changeEmail() {
      this.copyInfo()
      this.editEmailFlag = true
    },

    changePassword() {
      this.copyInfo()
      this.editPasswordFlag = true
    },

    changeNewPsw(){
      this.input.repeatPassword = ""
    },

    cancel(type){
      switch (type){
        case 1:
          this.editInfoFlag = false
          break
        case 2:
          this.editEmailFlag = false
          break
        case 3:
          this.editPasswordFlag = false
          break
      }
      //console.log(this.input)
    },

    confirm(type){
      //调用改动接口
      this.cancel(type)
    },

    restore(flag){
      this.copyInfo()
      switch (flag){
        case 1:
          this.editInfoFlag = false
          break
        case 2:
          this.passwordFlag = false
          this.editEmailFlag = false
          this.editPasswordFlag = false
          this.pFlag1 = false
          this.pFlag2 = false
          this.pFlag3 = false
          break
      }
    },

    copyInfo(){
      this.input.name = this.user.name
      this.input.institution = this.user.institution
      this.input.education = this.user.education
      this.input.email = this.user.email
      this.input.oldPassword = ""
      this.input.newPassword = ""
      this.input.repeatPassword = ""
    },
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

.main {
  width: 80%;
  margin: 0 auto;
}

.navigate {
  width: 256px;
  margin-top: 1px;
  margin-left: 10%;
}

.navItem {
  margin-top: 20px;
  font-size: 20px;
}

.curNav {
  margin-top: 20px;
  background: rgba(144, 144, 144, 0.3);
  font-size: 20px;
}

.logoutBtn {
  display: block;
  width: 80%;
  margin: 0 auto 10%;
}

.pageMain {
  display: block;
  float: right;
  right: 10%;
  width: 78%;
  height: 90vh;
  background-color: white;
}

.head1{
  display: block;
  height: 20px;
  border-bottom: 1px grey solid;
}

.head2{
  display: block;
  height: 85px;
  border-bottom: 1px grey solid;
}

.content {
  padding: 15px 0 0 15px;
}
</style>
