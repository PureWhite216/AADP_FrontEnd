<template>
  <div>
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
              @click="toPaperDetailPage()"
            >
              <academic-achievement :data1="item"></academic-achievement>
            </v-col>
          </v-row>
        </v-container>
        <v-pagination v-show="display===1"
          v-model="curPage"
          :length="Math.ceil(totalPage / limit)"
          total-visible="7"
          @input="onPageChange(curPage, limit)"
        ></v-pagination>
        <v-container v-show="display===2">
          <v-row dense>
            <v-col
              v-for="(item, i) in researches"
              :key="i"
              cols="12"
              @click = "toResearchDetailPage()"
            >
              <research :data1="item"></research>
            </v-col>
          </v-row>
        </v-container>

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
      name:"名字",
      organization:"------",
      avatar: "",
      curPage: 1,
      limit: 10,
      totalPage: 10,
      sum_aca_achv:10,
      sum_research:5,
      sum_quoted:233,
      co_worker_list:[],
      display:1,
      academic_achievements:[],

      researches:[
        {
          title:"研究标题1",
          abstract:"虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 左拉: 生活的道路一旦选定，就要勇敢地走到底，决不回头。这句话看似简单，但其中的阴郁不禁让人深思。 学术研究摘要因何而发生? 查尔斯·史考伯说过一句著名的话 : 一个人几乎可以在任何他怀有无限热忱的事情上成功。 这启发了我。 我的学术研究摘要在一定程度上会影响了周围。 虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 生活中, 若学术研究摘要出现了, 我们就不得不考虑它出现了的事实. 学术研究摘要, 发生了会如何, 不发生又会如何. 通过学术研究摘要，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。",
        },
        {
          title:"研究标题2",
          abstract:"虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 左拉: 生活的道路一旦选定，就要勇敢地走到底，决不回头。这句话看似简单，但其中的阴郁不禁让人深思。 学术研究摘要因何而发生? 查尔斯·史考伯说过一句著名的话 : 一个人几乎可以在任何他怀有无限热忱的事情上成功。 这启发了我。 我的学术研究摘要在一定程度上会影响了周围。 虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 生活中, 若学术研究摘要出现了, 我们就不得不考虑它出现了的事实. 学术研究摘要, 发生了会如何, 不发生又会如何. 通过学术研究摘要，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。",
        },
        {
          title:"研究标题3",
          abstract:"虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 左拉: 生活的道路一旦选定，就要勇敢地走到底，决不回头。这句话看似简单，但其中的阴郁不禁让人深思。 学术研究摘要因何而发生? 查尔斯·史考伯说过一句著名的话 : 一个人几乎可以在任何他怀有无限热忱的事情上成功。 这启发了我。 我的学术研究摘要在一定程度上会影响了周围。 虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 生活中, 若学术研究摘要出现了, 我们就不得不考虑它出现了的事实. 学术研究摘要, 发生了会如何, 不发生又会如何. 通过学术研究摘要，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。",
        },
        {
          title:"研究标题4",
          abstract:"虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 左拉: 生活的道路一旦选定，就要勇敢地走到底，决不回头。这句话看似简单，但其中的阴郁不禁让人深思。 学术研究摘要因何而发生? 查尔斯·史考伯说过一句著名的话 : 一个人几乎可以在任何他怀有无限热忱的事情上成功。 这启发了我。 我的学术研究摘要在一定程度上会影响了周围。 虽然有负面的不好的成长经历，却让我明白了很多做人处事的道理，有些道理，可能在学术研究摘要以后，才能真正的大彻大悟。 生活中, 若学术研究摘要出现了, 我们就不得不考虑它出现了的事实. 学术研究摘要, 发生了会如何, 不发生又会如何. 通过学术研究摘要，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。",
        },
      ]
    }
  },
  methods:{
    toPaperDetailPage(){
      this.$router.push({
        name: 'PaperDetailPage',
      })
    },
    toResearchDetailPage(){
      this.$router.push({
        name: 'ResearchDetails',
      })
    },
    toInstitutionPage(){
      this.$router.push({
        name: 'InstitutionPage',
      })
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
          // params: {
          //   user_id: this.$route.query.userID
          // },
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

          }
        });
    }
  },

  mounted() {
    //console.log(localStorage.getItem("userID"))
    console.log(this.$route.query.userID)
    this.getUserInfo()
    this.getAcademicAchievement(this.curPage, this.limit)
    this.getSumInfo()
    this.getSearch()
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
}
.co_worker_organization:hover{
  color: #2c73cb;
}
.tab{
  background-color: #ffffff;
  color: black;
  font-size: large;
}
</style>
