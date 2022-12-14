<template>
  <div class="backgroundImg">
    <div>&nbsp</div>
    <div class="main" style="margin-top: -12px">
      <!--      导航栏-->
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
              <v-list-item-title style="font-size: 16px">{{ user.name }}</v-list-item-title>
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
        <!--        个人信息-->
        <div v-if="flag===1">
          <div class="head1"></div>
          <!--          头像-->
          <div class="content" style="padding-top: 5px">
            <v-list>
              <v-list-item-title style="font-size: 20px; color:black; font-weight: bold">
                头像
              </v-list-item-title>
              <v-list-item-avatar size="110">
                <img :src="user.avatar">
              </v-list-item-avatar>
              <div style="float: right; margin: 80px 2% 0 0">
                <el-upload
                  v-model:file-list="file"
                  ref="upload"
                  action="#"
                  accept="image/png,image/jpg,image/jpeg"
                  :http-request="submitUpload"
                  :show-file-list="false"
                >
                  <v-btn small color="primary">上传头像</v-btn>
                </el-upload>
              </div>
            </v-list>
          </div>

          <div style="border-bottom: 1px black solid;"></div>
          <!--          个人信息-->
          <div class="content">
            <!--            查看个人信息-->
            <div v-if="!editInfoFlag">
              <div style="font-size: 20px; color:black; font-weight: bold">姓名</div>
              <div style="margin: 10px 0 10px 0">
                {{(user.name==="")?"未认证":user.name}}
              </div>
              <div style="font-size: 20px; color:black; font-weight: bold">机构</div>
              <div style="margin: 10px 0 10px 0">
                {{(user.institution==="")?"未认证":user.institution}}
              </div>
              <div style="font-size: 20px; color:black; font-weight: bold">学历</div>
              <div style="margin: 10px 0 10px 0">
                {{(user.education==="")?"未认证":user.education}}
              </div>

              <v-dialog
                v-model="dialog1"
                width="500"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    small
                    v-bind="attrs"
                    v-on="on"
                    style="float: right; right: 2%; bottom: 10px"
                    @click="editInfo"
                  >
                    编辑
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title
                    style=" color: black;
                          font-size: 24px;
                          font-weight: bold;
                          margin: 10px 0 20px 0"
                    primary-title
                  >
                    编辑个人信息
                  </v-card-title>
                  <v-card-text>
                    编辑个人信息后需要重新认证，请将能证明您身份的材料发送至邮箱：
                  </v-card-text>
                  <v-card-text style="font-weight: bold; color: black">
                    1780645196@qq.com
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="dialog1 = false"
                      small
                    >
                      确认
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <!--            修改个人信息-->
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
          <!--          认证情况-->
          <div class="content">
            <div style="font-size: 20px; color:black; font-weight: bold">认证情况</div>
            <v-dialog
              v-model="dialog2"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  small
                  v-bind="attrs"
                  v-on="on"
                  style="float: right; right: 2%; top: 10px"
                  @click="addTask(1)"
                >
                  身份认证
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  style=" color: black;
                          font-size: 24px;
                          font-weight: bold;
                          margin: 10px 0 20px 0"
                  primary-title
                >
                  身份认证
                </v-card-title>
                <v-card-text>
                  请将能证明您身份的材料发送至邮箱：
                </v-card-text>
                <v-card-text style="font-weight: bold; color: black">
                  1780645196@qq.com
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="dialog2 = false"
                    small
                  >
                    确认
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div style="margin: 10px 0 10px 0"
                 v-if="!user.flag">未认证</div>
            <div style="margin: 10px 0 10px 0"
                 v-else>已认证</div>
          </div>
        </div>
        <!--        账户信息-->
        <div v-else>
          <div class="head2"></div>
          <div class="content">
            <div style="font-size: 20px; color:black; font-weight: bold">个人邮箱</div>
            <!--            查看邮箱-->
            <div v-if="!editEmailFlag">
              <div style="margin: 10px 0 10px 0">{{user.email}}</div>
              <v-btn small color="primary" style="margin: 10px 0 20px 0"
                     @click="changeEmail">修改邮箱</v-btn>
            </div>
            <!--            修改邮箱-->
            <div v-else>
              <div>
                <v-text-field
                  dense
                  label="新邮箱"
                  :placeholder="user.email"
                  :rules="emailRules"
                  style="width: 40%; margin: 15px 0 -10px 0"
                  v-model="input.email"
                ></v-text-field>
                <v-text-field
                  v-model="input.verifyCode"
                  :rules="inputRules"
                  label="验证码"
                  style="display: inline-block; width: 30%"
                  required
                ></v-text-field>
                <v-btn
                  color=#2196F3
                  class="verifyBtn"
                  @click="getVer"
                  small
                >
                  获取验证码
                </v-btn>
              </div>
              <v-btn small color="primary" style="margin: 10px 0 20px 0"
                     @click="confirm(2)">确认</v-btn>
              <v-btn small color="primary" style="margin: 10px 0 20px 20px"
                     @click="cancel(2)">取消</v-btn>
            </div>
          </div>

          <div style="border-bottom: 1px black solid;"></div>

          <div class="content">
            <div style="font-size: 20px; color:black; font-weight: bold">密码</div>
            <!--            查看密码-->
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
            <!--            修改密码-->
            <div v-else>
              <v-text-field
                v-model="input.oldPassword"
                :append-icon="pFlag1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="inputRules"
                :type="pFlag1 ? 'text' : 'password'"
                :counter="20"
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
                :counter="20"
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
                :counter="20"
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
import qs from 'qs';
import logo from "@/layouts/sections/Logo";
import HeaderBar from "@/layouts/sections/HeaderBar";
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
        avatar: "",
        account: "",

        flag: false,
        name: "",
        institution: "",
        education: "",

        email: "",
        password: "",
      },
      passwordFlag: false,

      file: [],

      input: {
        name: "",
        institution: "",
        education: "",

        email: "",
        verifyCode: "",
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      },
      editInfoFlag: false,
      editEmailFlag: false,
      editPasswordFlag: false,

      //重置密码时使用
      pFlag1: false,
      pFlag2: false,
      pFlag3: false,
      dialog1: false,
      dialog2: false,

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

  created() {
    this.init();
  },

  methods :{
    init(){
      let token = localStorage.getItem('Token')
      //console.log(this.token)
      this.$axios.get('/user/showInfo/' , {
        headers: {
          'token': token
        }
      }).then(res => {
        console.log(res)
        if(res.data.code == 200){
          this.user.avatar = res.data.data[0].avatar
          this.user.email = res.data.data[0].email
          this.user.name = res.data.data[0].realName
          this.user.password = res.data.data[0].password
          this.user.account = res.data.data[0].username
          this.user.education = res.data.data[0].educationalBackground
          this.user.institution = res.data.data[0].institutionName
          this.user.flag = res.data.data[0].isCertified
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

    changeFlag(flag){
      this.flag = flag
      this.restore(flag)
    },

    addTask(objectId = 1, objectType = "INSTITUTION"){
      let token = localStorage.getItem('Token')
      this.$axios.post('/user/addTask', {
          objectId: objectId,
          objectType: objectType
        },{
          headers: {
            'token': token
          }
        }
      ).then(res => {
        //console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
        else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },

    logout(){
      let token = localStorage.getItem('Token')
      this.$axios.get('/user/logout/' , {
        headers: {
          'token': token
        }
      }).then(res => {
        //console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '注销成功',
            type: 'success'
          })
          localStorage.removeItem('Token')
          this.$router.push({
            name: 'LoginPage'
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

    submitUpload(file) {
      let token = localStorage.getItem('Token')
      const fd = new FormData()
      fd.append('file', file.file)
      this.$axios.post('/user/uploadFile', fd, {
        headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.user.avatar = res.data.data[0].url
          localStorage.setItem('avatar', res.data.data[0].url)
          HeaderBar.methods.updateAvatar()
          this.confirm(4)
          this.$message({
            message: '头像上传成功',
            type: 'success'
          })
        }
        else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(err=>{
        this.$message({
          message: err.message,
          type: 'error'
        })
      })
    },

    confirm(type){
      //调用改动接口
      let token = localStorage.getItem('Token')
      switch (type){
        //修改个人信息
        case 1: {
          if(this.input.name==="" || this.input.education==="" || this.input.institution===""){
            this.$message({
              message: '请输入所有必要信息',
              type: 'warning'
            })
            return
          }
          this.$axios.post('/user/modifyUserInfo', {
            realName: this.input.name,
            educationalBackground: this.input.education,
            isCertified: false
          }, {
            headers: {
              'token': token
            }
          }).then(res => {
            //console.log('res', res)
            if(res.data.code == 200){
              if(type === 1){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.user.name = this.input.name
                this.user.institution = this.input.institution
                this.user.education = this.input.education
                this.user.flag = false
                this.dialog1 = true
              }
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
          break
        }
        //修改邮箱
        case 2: {
          if(this.input.verifyCode==="" || this.input.email===""){
            this.$message({
              message: '请输入所有必要信息',
              type: 'warning'
            })
            return
          }
          this.$axios.post('/user/modifyEmail', {
            email: this.input.email,
            verifyCode: this.input.verifyCode,
            password: this.user.password
          }, {
            headers: {
              'token': token
            }
          }).then(res => {
            //console.log(res)
            if(res.data.code == 200){
              this.user.email = this.input.email
              this.$message({
                message: '修改成功',
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
          break
        }
        //修改密码
        case 3: {
          if(this.input.oldPassword==="" || this.input.newPassword==="" || this.input.repeatPassword===""){
            this.$message({
              message: '请输入所有必要信息',
              type: 'warning'
            })
            return
          }
          this.$axios.post('/user/changePassword', {
            mode: 1,
            oldPassword: this.input.oldPassword,
            password1: this.input.newPassword,
            password2: this.input.repeatPassword,
            email: this.user.email
          }, {
            headers: {
              'token': token
            }
          }).then(res => {
            //console.log(res)
            if(res.data.code == 200){
              this.user.password = this.input.newPassword
              this.$message({
                message: '修改成功,请重新登录',
                type: 'success'
              })
              setTimeout(this.reLogin, 1000)
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
          break
        }
        //修改头像
        default: {
          this.$axios.post('/user/modifyUserInfo', {
            avatar: this.user.avatar
          }, {
            headers: {
              'token': token
            }
          }).then(res => {
            //console.log(res)
            if(res.data.code != 200) {
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
          break
        }
      }
      this.cancel(type)
    },

    getVer() {
      if(this.input.email === this.user.email){
        this.$message({
          message: '新邮箱不能与原邮箱相同',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/user/sendRegistrationVerificationCode', {
        email: this.input.email,
        modify: true
      }).then(res => {
        if(res.data.code == 200){
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

    reLogin(){
      this.$router.push({
        name: 'LoginPage'
      })
    },

    editInfo(){
      this.copyInfo()
      this.editInfoFlag = true
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
      this.input.verifyCode = ""
      this.input.oldPassword = ""
      this.input.newPassword = ""
      this.input.repeatPassword = ""
    },
  },
}
</script>

<style scoped>
.backgroundImg {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-attachment:fixed;

}

.main {
  width: 80%;
  margin: 0 auto;
}

.navigate {
  width: 256px;
  margin-top: 12px;
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
  margin-block-end: 50px;
  /* margin-top: -10px; */
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
  padding: 15px 0 0 30px;
}

.verifyBtn {
  display: inline-block;
  height: 20px;
  color: white;
}
</style>
