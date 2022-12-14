<template>
  <div class="backgroundImg">
    <br />
    <div class="text-center">
      <v-card id="SearchResult">
        <!--        class = "Search_result"-->
        <v-app-bar color="white">
          <v-col align="left">
            <v-toolbar-title>搜索结果</v-toolbar-title>
          </v-col>
          <v-col align="right">
            <v-select
              :items="sortMethod"
              label="排序方式"
              dense
              v-model="sort"
              style="width: 160px; margin-top: 21px"
              @input="CitedSort(curPage,limit )"
            ></v-select>
          </v-col>
        </v-app-bar>
        <v-container>
          <v-row dense>
            <v-col
              v-for="(item, i) in pageItems"
              :key="i"
              cols="12"
              @click="GotoDetailPage(item)"
            >
            <academic-achievement :data1="item"></academic-achievement>
              <!-- <v-card
                color="white"

              >
                <h1 id="head">{{item.paperTitle}}</h1>
                <div id="div_authors">
                  <p class="authors">{{item.paperAuthor}}</p>
                </div>
                <br/>
                <p id="info">{{item.paperDate}} | {{item.paperClassification}} | 被引数：{{item.paperCited}} | 期刊：{{item.paperPeriodical}}</p>
                <div style="width: 640px">
                  <div
                    id="abstract"
                  >{{item.paperAbstract}}</div>
                </div>
              </v-card> -->
            </v-col>
          </v-row>
        </v-container>
        <v-pagination
          v-if="totalPage/limit > 1"
          v-model="curPage"
          :length="Math.ceil(totalPage / limit)"
          total-visible="7"
          @input="onPageChange(curPage, limit)"
        ></v-pagination>
        <br />
      </v-card>
      <v-card id="select">
        <v-app-bar color="white">
          <v-toolbar-title>筛选</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <br />
        <v-container>
          <v-card>
            <br />
            <h3 class="selectNode">时间</h3>
            <br />
            <div>
              <v-menu class="menu1">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-bind="attrs" v-on="on">
                    {{ choose_year1 }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in years"
                    :key="index"
                    @click="choose_year1 = item.title"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <br />
            <div>
              <v-btn id="btn" @click="refreshPage3(curPage,limit)">确认</v-btn>
            </div>
            <br />
          </v-card>
          <br />
          <v-card
            >
            <br />
            <h3 class="selectNode">领域</h3>
            <div>
              <v-checkbox
                v-for="(item, index) in subject"
                :key="index" class="selectNode"
                :label="item"
                v-model="check"
                @change="refreshPage2(curPage,limit,item,check)">
              </v-checkbox>
            </div>
            <br />
          </v-card>
          <br />
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultPage",
  components:{
    AcademicAchievement: () => import("@/components/personPageComponents/academicAchievement"),
    Research: () => import("@/components/personPageComponents/research"),
  },
  data() {
    return {
      sortMethod: ["引用降序","时间降序"],
      curPage: 1,
      limit: 10,
      loading: false,
      search: null,
      totalPage: 0,
      select: null,
      check:false,
      states: [],
      sort:"",
      offset: true,
      subject:[],
      choose_year1: "筛选时间",
      items: [],
      pageItems: [],
      years: [
        { title:"筛选时间"},
        { title: "2022" },
        { title: "2021" },
        { title: "2020" },
        { title: "2019" },
        { title: "2018" },
        { title: "2017" },
        { title: "2016" },
        { title: "2015" },
        { title: "2014" },
        { title: "2013" },
        { title: "2011" },
        { title: "2010" },
        { title: "2009" },
        { title: "2008" },
        { title: "2007" },
        { title: "2006" },
        { title: "2005" },
        { title: "2004" },
      ],
    };
  },
  created() {
    this.getSearchResult(1, 10);
  },
  watch: {
    $route(val, from) {
      //监听到路由（参数）改变
      // 拿到目标参数 val.query.typeCode 去再次请求数据接口
      this.getSearchResult(1, 10, val.query.t);
      this.getTotal(val.query.t);
    },
  },
  methods: {
    CitedSort(curPage,limit){
      if(this.sort == "引用降序"){
        this.getSearchResult4(curPage,limit)
      }else{
        this.getSearchResult(curPage,limit)
      }
    },
    GotoDetailPage(data) {
      this.$router.push({path:'/PaperDetailPage',query:{data:data}});
    },
    onPageChange(curPage, limit) {
      this.refreshPage(curPage, limit);
    },
    refreshPage(curPage = 1, limit = 10) {
      this.pageItems = [];
      this.getSearchResult(curPage, limit);
    },
    refreshPage2(curPage = 1, limit = 10,item,check){
      this.pageItems = [];
      if(check)
      this.getSearchResult2(curPage,limit,item);
      else{
        this.getSearchResult(curPage,limit);
      }
    },
    refreshPage3(curPage = 1, limit = 10){
      this.pageItems = [];
      if(this.choose_year1!="筛选时间")
        this.getSearchResult3(curPage,limit,this.choose_year1);
      else{
        this.getSearchResult(curPage,limit);
      }
    },
    getTotal4(){
      this.$axios.get("/paper/searchPaperResultInfoByKeyword",{
        params: {
          keyword: localStorage.getItem("selectKey"),
          citedSort: true
        },
        headers: {
          'token':localStorage.getItem("Token"),
        }
      })
        .then(res=>{
          if(res.data.code == 200){
            this.totalPage = res.data.data.total
            this.subject = paperSubject
          }else {
            this.$message.error("getInfo Error!");
          }
        })
    },
    getTotal3(){
      this.$axios.get("/paper/searchPaperResultInfoByKeyword",{
        params: {
          keyword: localStorage.getItem("selectKey"),
          year: this.choose_year1
        },
        headers: {
          'token':localStorage.getItem("Token"),
        }
      })
        .then(res=>{
          if(res.data.code == 200){
            this.totalPage = res.data.data.total
            this.subject = paperSubject
          }else {
            this.$message.error("getInfo Error!");
          }
        })
    },
    getTotal2(item){
      this.$axios.get("/paper/searchPaperResultInfoByKeyword",{
        params: {
          keyword: localStorage.getItem("selectKey"),
          subject: item,
        },
        headers: {
          'token':localStorage.getItem("Token"),
        }
      })
      .then(res=>{
        if(res.data.code == 200){
          this.totalPage = res.data.data.total
          this.subject = [item]
        }else {
          this.$message.error("getInfo Error!");
        }
      })
    },
    getTotal(){
      this.$axios.get("/paper/searchPaperResultInfoByKeyword",{
        params: {
          keyword: localStorage.getItem("selectKey"),
        },
        headers: {
          'token':localStorage.getItem("Token"),
        }
      })
        .then(res=>{
          if(res.data.code == 200){
            this.totalPage = res.data.data.total
            this.subject = res.data.data.paperSubject
          }else {
            this.$message.error("getInfo Error!");
          }
        })
    },
    getSearchResult(curPage, limit) {
      this.getTotal();
      this.$axios
        .get("/paper/searchPaperByKeyword", {
          params: {
            keyword: localStorage.getItem("selectKey"),
            page: curPage,
            limit: limit,
          },
          headers: {
            'token': localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.pageItems = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
    getSearchResult2(curPage, limit, item){
      this.getTotal2(item);
      this.$axios
        .get("/paper/searchPaperByKeyword", {
          params: {
            keyword: localStorage.getItem("selectKey"),
            page: curPage,
            limit: limit,
            subject: item,
          },
          headers: {
            'token': localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.pageItems = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
    getSearchResult3(curPage, limit){
      this.getTotal3();
      this.$axios
        .get("/paper/searchPaperByKeyword", {
          params: {
            keyword: localStorage.getItem("selectKey"),
            page: curPage,
            limit: limit,
            year: this.choose_year1,
          },
          headers: {
            'token': localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.pageItems = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
    getSearchResult4(curPage, limit) {
      this.getTotal4();
      this.$axios
        .get("/paper/searchPaperByKeyword", {
          params: {
            keyword: localStorage.getItem("selectKey"),
            page: curPage,
            limit: limit,
            citedSort: true,
          },
          headers: {
            'token': localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.pageItems = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
  },
};
</script>

<style scoped>
#btn {
  background-color: #2c73cb;
  height: 40px;
}
#SearchResult {
  display: inline-block;
  width: 700px;
  vertical-align: top;
  background-color: #ffffff;
}
#select {
  width: 400px;
  margin-left: 20px;
  margin-top: 0;
  background-color: #ffffff;
  display: inline-block;
}
.authors {
  display: inline-block;
  margin-right: 5px;
  text-align: left;
  horiz-align: left;
  float: left;
  color: black;
  font-size: 20px;
}
#head {
  margin-left: 20px;
  text-align: left;
  color: black;
  font-size: 30px;
}
#info {
  margin-left: 20px;
  text-align: left;
  color: black;
  font-size: 15px;
}
#div_authors {
  margin-left: 20px;
  height: 20px;
  width: 660px;
}
.selectNode {
  text-align: left;
  margin-left: 20px;
  height: 20px;
  width: 660px;
}
.menu1 {
  display: inline-block;
  margin-left: 20px;
}
.line {
  display: inline-block;
}
#abstract {
  text-align: left;
  margin-left: 20px;
  width: 640px;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  color: black;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.backgroundImg {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-attachment:fixed;
}
</style>
