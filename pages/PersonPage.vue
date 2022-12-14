<template>
  <div class="backgroundImg">
    <div>&nbsp</div>
    <div class="text-center" id="personPageHead">
      <div class="inline_div" id="div_head_portrait">
        <v-img :src="avatar" id="head_portrait" />
      </div>
      <div class="inline_div" id="div_name">
        <p style="font-size: 40px; margin-bottom: 15px;">{{this.name}}</p>
        <p style="font-size: 25px">{{this.organization}}</p>
      </div>
      <div class="inline_div" id="div_info">
        <table>
          <tr>
            <th>发表的学术成果数：</th>
            <td>{{this.sum_aca_achv}}</td>
          </tr>
          <tr>
            <th>发表的研究数：</th>
            <td>{{this.sum_research}}</td>
          </tr>
          <tr>
            <th>总被引数：</th>
            <td>{{this.sum_quoted}}</td>
          </tr>
        </table>
      </div>

    </div>
    <div class="text-center">
      <div id="display">
        <v-tabs
          fixed-tabs
          background-color="indigo"
          white
        >
          <v-tab @click="display = 1" class ="tab">
            发表的学术成果
          </v-tab>
          <v-tab @click="display = 2" class = "tab">
            发表的研究
          </v-tab>
        </v-tabs>
        <v-container v-show="display===1">
          <v-row dense>
            <v-col
              v-for="(item, i) in academic_achievements"
              :key="i"
              cols="12"
              @click="toPaperDetailPage(item)"
            >
              <academic-achievement :data1="item"></academic-achievement>
            </v-col>
          </v-row>
        </v-container>
        <v-pagination v-show="display===1"
          v-model="curPage"
          :length="Math.ceil(this.sum_aca_achv / limit)"
          total-visible="7"
          @input="onPageChange(curPage, limit)"
        ></v-pagination>
        <v-container v-show="display===2">
          <v-row dense>
            <v-col
              v-for="(item, i) in researches"
              :key="i"
              cols="12"
            >
              <research :data1="item"></research>
            </v-col>
          </v-row>
        </v-container>
        <v-pagination v-show="display===2"
          v-model="curPage2"
          :length="Math.ceil(this.sum_research / limit)"
          total-visible="7"
          @input="onPageChange2(curPage2, limit)"
        ></v-pagination>
      </div>
      <div id="co_workers">
        <div style="background-color: #ffffff;height: 48px;margin-bottom: 20px;border-radius: 5px;">
          <p id="co_workers_title">合作者</p>
        </div>

        <ul>
          <li v-for="item in co_worker_list" style="list-style-type:none">
            <p class="co_worker_name" @click="toPersonPage(item)">{{item.cooperator.username}}</p>
            <p class="co_worker_organization" @click="toInstitutionPage()">{{item.cooperator.institutionName}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "PersonPage",
  components:{
    AcademicAchievement: () => import("@/components/personPageComponents/academicAchievement"),
    Research: () => import("@/components/personPageComponents/research"),
  },
  data(){
    return{
      name:"",
      organization:"",
      avatar: "",
      curPage: 1,
      curPage2: 1,
      limit: 10,
      totalPage: 10,
      sum_aca_achv:0,
      sum_research:0,
      sum_quoted:0,
      co_worker_list:[],
      display:1,
      academic_achievements:[],

      researches:[]
    }
  },
  methods:{
    toPaperDetailPage(data){
      this.$router.push({path:'/PaperDetailPage',query:{data:data}});
    },
    toResearchDetailPage(){
      // this.$router.push({
      //   name: 'ResearchDetails',
      // })
    },
    toInstitutionPage(){
      // this.$router.push({
      //   name: 'InstitutionPage',
      // })
    },
    toPersonPage(item){
      if(item.cooperator.userId === "-1") this.$message.error("该用户尚未创建个人门户")
      else{
        this.$router.push({
          path:'/PersonPage',
          query:{
            userID : item.cooperator.userId
        }})
      }

    },
    onPageChange2(curPage, limit) {
      this.refreshPage2(curPage, limit);
    },
    refreshPage2(curPage = 1, limit = 10) {
      this.pageItems = [];
      this.getResearch(curPage, limit);
    },
    getResearch(curPage = 1, limit = 10)
    {
      this.researches=[];
      this.$axios.get("/user/queryResearches",{
        params: {
          userId: this.$route.query.userID,
          page: curPage,
          limit: limit,
        },
        headers: {
          'token':localStorage.getItem("Token")
        }
      }).then(res=> {
        console.log(res.data);
        if(res.data.code == 200){
          this.researches = res.data.data.researches;
        }else {
          this.$message.error("No Researches!");
        }
      })
    },
    getSearch() {
      this.$axios
        .get("/research/selectResearchByUserId", {
          // params: {
          //   user_id: this.$route.query.userID
          // },
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          console.log(res.data)
          // if (res.data.code == 200 && res.data.data.length !== 0) {
          //   this.pageItems = res.data.data;
          // } else {
          //   this.$message.error("No SearchResult!");
          // }
        });
    },
    onPageChange(curPage, limit) {
      this.refreshPage(curPage, limit);
    },
    refreshPage(curPage = 1, limit = 10) {
      this.pageItems = [];
      this.getAcademicAchievement(curPage, limit);
    },
    getAcademicAchievement(curPage, limit) {
      this.$axios
        .get("/user/queryPapers", {
          params: {
            page: curPage,
            limit: limit,
            userId: this.$route.query.userID
          },
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          console.log(res.data)
          this.academic_achievements = res.data.data.papers
          this.sum_aca_achv = res.data.data.total

          // if (res.data.code == 200 && res.data.data.length !== 0) {
          //   this.pageItems = res.data.data;
          // } else {
          //   this.$message.error("No SearchResult!");
          // }
        });
    },
    getSumInfo(){
      this.$axios
        .get("/user/getAcademicInformation", {
          params: {
            userId: this.$route.query.userID
          },
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          console.log(res)
          this.sum_aca_achv = res.data.data.academicCount
          this.sum_research = res.data.data.researchCount
          this.sum_quoted = res.data.data.totalCitations
        });
    },
    getCoWorkers(){
      this.$axios
        .get("/user/queryCooperators", {
          params: {
            userId: this.$route.query.userID
          },
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          console.log("aaaaa")
          if (res.data.code == 200) {
            console.log(res.data)
            this.co_worker_list = res.data.data

          }
        });
    },
    getUserInfo(){
      this.$axios
        .get("/user/selectUserByUserId", {
          params: {
            user_id: this.$route.query.userID
          },
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          console.log("aaaaa")
          if (res.data.code == 200) {
            this.avatar = res.data.data[0].avatar
            this.name = res.data.data[0].realName
            if(res.data.data[0].institutionId !== "-1") this.organization = res.data.data[0].institutionName
            else this.organization = "未认证"
          }
        });
    }
  },
  watch: {
    $route(val, from) {
      //监听到路由（参数）改变
      // 拿到目标参数 val.query.typeCode 去再次请求数据接口
      //this.getSearchResult(1, 10, val.query.t);
      this.curPage=1,
      this.curPage2=1,
      this.getUserInfo()
      this.getAcademicAchievement(this.curPage, this.limit)
      this.getSumInfo()
      // this.getSearch()
      this.getResearch(this.curPage2, this.limit)
      this.getCoWorkers()
    },
  },

  mounted() {
    //console.log(localStorage.getItem("userID"))
    console.log(this.$route.query.userID)
    this.getUserInfo()
    this.getAcademicAchievement(this.curPage, this.limit)
    this.getSumInfo()
    // this.getSearch()
    this.getResearch(this.curPage2, this.limit)
    this.getCoWorkers()
  }
}
</script>

<style scoped>
#personPageHead{
  width: 1000px;
  height: 200px;
  margin: 20px auto 20px;
  background-color: #ffffff;
  vertical-align: middle;
}
#head_portrait{
  height:120px;
  width:120px;
}
#div_head_portrait{
  float: left;
  margin-left: 40px;
  margin-right: 0;
}
#div_name{
  margin-left: 40px;
  float: left;
  font-family: "微软雅黑",serif;

}
#div_info{
  float: right;
  margin-right: 45px;
}
.inline_div{
  display: inline-block;
  vertical-align: top;
  margin-top: 40px;
}
p{
  text-align: left;
  color:black;
}
tr{
  font-size: 20px;
  line-height: 42px;
}
th{
  text-align: left;
  font-weight: normal;
  color:black;
}
td{
  text-align: right;
  font-weight: normal;
  color:black;
}
#display{
  display: inline-block;
  vertical-align: top;
  background-color: #f8f8f8;
  width: 680px;
  border-radius: 5px;
}
#co_workers{
  background-color: #ffffff;
  display: inline-block;
  width: 300px;
  margin-left: 20px;
  margin-top: 0;
  border-radius: 5px;
}
#co_workers_title{
  font-weight: normal;
  font-size: large;
  padding: 10px;
}
.co_worker_name{
  font-size: large;
}
.co_worker_name:hover{
  color: #2c73cb;
}
.co_worker_organization{
  margin-bottom: 20px;
  width: 280px;
}
.co_worker_organization:hover{
  color: #2c73cb;
}
.tab{
  background-color: #ffffff;
  color: black;
  font-size: large;
}
.backgroundImg {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-attachment:fixed;
}
</style>
