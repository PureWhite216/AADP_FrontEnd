<template>
  <div>
<!--    <v-card-->
<!--      max-width="700"-->
<!--      class="mx-auto"-->
<!--    >-->
<!--      <v-toolbar-->
<!--        blue-->
<!--        color="blue"-->
<!--      >-->
<!--        <v-toolbar-title>论文搜索</v-toolbar-title>-->
<!--        <v-text-field-->
<!--          v-model="select"-->
<!--          :loading="loading"-->
<!--          :items="items"-->
<!--          :search-input.sync="search"-->
<!--          cache-items-->
<!--          class="mx-4"-->
<!--          flat-->
<!--          hide-no-data-->
<!--          hide-details-->
<!--          label="search something"-->
<!--          solo-inverted-->
<!--        ></v-text-field>-->
<!--        <v-btn icon>-->
<!--          <v-icon>mdi-magnify</v-icon>-->
<!--        </v-btn>-->
<!--      </v-toolbar>-->
<!--    </v-card>-->
    <br>
    <div class="text-center">
      <v-card
        id="SearchResult">
<!--        class = "Search_result"-->
        <v-app-bar
          color="white"
        >
          <v-col align="left">
            <v-toolbar-title >搜索结果</v-toolbar-title>
          </v-col>
          <v-col align="right">
            <v-select
              :items="sortMethod"
              label="排序方式"
              style="width: 160px; margin-top: 21px"
            ></v-select>
          </v-col>

        </v-app-bar>
        <v-container>
          <v-row dense>
            <v-col
              v-for="(item, i) in pageItems"
              :key="i"
              cols="12"
            >
              <v-card
                color="white"
              >
                <h1 id="head">{{item.paperTitle}}</h1>
                <div id="div_authors">
                  <p class="authors">{{item.paperAuthor}}</p>
                </div>
                <br/>
                <p id="info">{{item.paperDate}} | {{item.paperClassification}} | 被引数：{{item.paperCited}} | 期刊：{{item.paperPeriodical}}</p>
                <div style="width: 640px">
                  <p id="abstract">{{item.paperAbstract}}</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-pagination
          v-if="Math.ceil(totalPage / limit) > 1"
          v-model="curPage"
          :length="Math.ceil(totalPage / limit)"
          total-visible="7"
          @input="onPageChange(curPage, limit)"
        ></v-pagination>
        <br>
      </v-card>
      <v-card
        id="select"
      >
        <v-app-bar
          color="white"
        >
          <v-toolbar-title >筛选</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <br>
        <v-container>
        <v-card>
          <br>
          <h3 class="selectNode">时间</h3>
          <br>
          <div>
            <v-menu class="menu1">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{choose_year1}}
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
            <hr class="line">
            <v-menu class="menu1">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{choose_year2}}
                </v-btn>
              </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in years"
                    :key="index"
                    @click="choose_year2 = item.title"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
          </div>
          <br>
          <div >
            <v-btn id="btn">确认</v-btn>
          </div>
          <br>
        </v-card>
        <br>
        <v-card>
          <br>
          <h3 class="selectNode">领域</h3>
          <div>
            <v-checkbox label="计算机" class="selectNode"></v-checkbox>
          </div>
          <div>
            <v-checkbox label="计算机" class="selectNode"></v-checkbox>
          </div>
          <div>
            <v-checkbox label="计算机" class="selectNode"></v-checkbox>
          </div>
          <div>
            <v-checkbox label="计算机" class="selectNode"></v-checkbox>
          </div>
          <br>
        </v-card>
        <br>
        <v-card>
          <br>
          <h3 class="selectNode">类型</h3>
          <div>
            <v-checkbox label="论文" class="selectNode"></v-checkbox>
          </div>
          <div>
            <v-checkbox label="专利" class="selectNode"></v-checkbox>
          </div>
          <div>
            <v-checkbox label="计算机" class="selectNode"></v-checkbox>
          </div>
          <div>
            <v-checkbox label="计算机" class="selectNode"></v-checkbox>
          </div>
          <br>
        </v-card>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultPage",
  data () {
    return {
      sortMethod: ['时间降序', '引用降序'],
      curPage: 1,
      totalPage: 0,
      limit: 10,
      loading: false,
      search: null,
      select: null,
      states: [],
      offset: true,
      choose_year1:"起始时间",
      choose_year2:"截止时间",
      items: [],
      pageItems: [],
      years: [
        { title: '2006' },
        { title: '2007' },
        { title: '2008' },
        { title: '2008' },
        { title: '2009' },
        { title: '2010' },
        { title: '2011' },
        { title: '2012' },
        { title: '2013' },
        { title: '2014' },
        { title: '2015' },
        { title: '2016' },
        { title: '2017' },
        { title: '2018' },
        { title: '2019' },
        { title: '2020' },
        { title: '2021' },
        { title: '2022' },
      ],
    }
  },
  created() {
    this.getSearchResult()
  },
  watch: {
  },
  methods: {
      onPageChange(curPage,limit){
        this.refreshPage(curPage,limit);
      },
      refreshPage(curPage = 1,limit = 10){
        this.pageItems=[];
          for(let i=(curPage-1)*10;i<(curPage-1)*10+limit;i++){
            this.pageItems.push(this.items[i]);
          }
      },
      getSearchResult(){
        this.$axios.get("/paper/searchPaperByKeyword",{
          params: {
              token: localStorage.getItem("Token"),
              keyword: localStorage.getItem("selectKey")
          }
        })
        .then(res =>{
            if(res.data.success){
              this.totalPage = res.data.data.length;
              this.items = res.data.data;
              this.refreshPage(1,10);
            }else {
              this.$message.error("Search error!")
            }
        })
      }
  },
}
</script>

<style scoped>
#btn{
  background-color: #2c73cb;
  height: 40px;
}
#SearchResult{
  display: inline-block;
  width: 700px;
  vertical-align: top;
  background-color: #ffffff;
}
#select{
  width: 400px;
  margin-left: 20px;
  margin-top: 0;
  background-color: #ffffff;
  display: inline-block;
}
.authors{
  display: inline-block;
  margin-right: 5px;
  text-align: left;
  horiz-align: left;
  float: left;
  color: black;
  font-size: 20px;
}
#head{
  margin-left: 20px;
  text-align: left;
  color: black;
  font-size: 30px;
}
#info{
  margin-left: 20px;
  text-align: left;
  color: black;
  font-size: 15px;
}
#div_authors{
  margin-left: 20px;
  height: 20px;
  width: 660px;
}
.selectNode{
  text-align: left;
  margin-left: 20px;
  height: 20px;
  width: 660px;
}
.menu1{
  display: inline-block;
  margin-left: 20px;
}
.line{
  display: inline-block;
}
#abstract{
  text-align: left;
  margin-left: 20px;
  width: 640px;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap:break-word;
  color: black;
}
</style>
