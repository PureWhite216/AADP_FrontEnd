<template>
  <div>
    <v-card
      max-width="700"
      class="mx-auto"
    >
      <v-toolbar
        blue
        color="blue"
      >
        <v-toolbar-title>论文搜索</v-toolbar-title>
        <v-text-field
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="search something"
          solo-inverted
        ></v-text-field>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <br>
    <div class="text-center">
      <v-card
        id="SearchResult">
<!--        class = "Search_result"-->
        <v-app-bar
          color="white"
        >
          <v-toolbar-title >搜索结果</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-container>
          <v-row dense>
            <v-col
              v-for="(item, i) in items"
              :key="i"
              cols="12"
            >
              <v-card
                color="white"
              >
                <h1 id="head">{{item.title}}</h1>
                <div id="div_authors">
                  <p v-for="item1 in item.authors" class="authors">{{item1}};</p>
                </div>
                <br/>
                <p id="info">{{item.time}} | {{item.type}} | 被引数：{{item.quoted}} | 期刊：{{item.journal}}</p>
                <div style="width: 640px">
                  <p id="abstract">{{item.abstract}}</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
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
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultPage",
  layout: "login",
  data () {
    return {
      loading: false,
      search: null,
      select: null,
      states: [],
      offset: true,
      choose_year1:"起始时间",
      choose_year2:"截止时间",
      items: [
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
      ],
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
  watch: {
  },
  methods: {

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
  height: 200px;
  vertical-align: top;
  background-color: #F0F0F0;
}
#select{
  width: 400px;
  margin-left: 20px;
  background-color: #F0F0F0;
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
