<template>
  <div id="building">
    <div id="MainPageHead">
      <!-- <v-img :src="require('/assets/images/temp_img/head_portrait.jpg')"></v-img> -->
    </div>
    <div class="text-center">
      <v-card id="hot_academic">
        <v-card-title class="font-weight-black main_title">
          热门学术成果
        </v-card-title>
        <v-container>
          <v-row dense>
            <v-col
              v-for="(item, i) in hotAcademicList"
              :key="i"
              cols="12"
              @click="GotoDetailPage()"
            >
            <academic-achievement :data1="item"></academic-achievement>
            </v-col>
          </v-row>
        </v-container>
        <v-pagination
          v-model="curPage"
          :length="Math.ceil( totalPage/ limit)"
          total-visible="7"
          @input="onPageChange(curPage, limit)"
        ></v-pagination>
        <br>
        <!-- <v-container>
          <v-row dense>
            <v-col v-for="(item, i) in hotAcademicList" :key="i" cols="12">
              <v-card class="mb-5">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h2 card_title"
                      v-text="item.title"
                    ></v-card-title>
                    <v-card-subtitle class="div_authors">
                      <div
                        v-for="item1 in item.authors"
                        :key="item1"
                        class="text-subtitle-1 authors"
                      >
                        {{ item1 }};
                      </div>
                    </v-card-subtitle>
                    <v-card-text
                      v-text="item.abstract"
                      class="text-body-1 card_text"
                    ></v-card-text>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container> -->
      </v-card>
      <v-card id="hot_research">
        <v-card-title class="font-weight-black main_title">
          热门研究
        </v-card-title>
        <v-container>
          <v-row dense>
            <v-col
              v-for="(item, i) in hotResearchList"
              :key="i"
              cols="12"
              @click="toResearchDetailPage(item.id)"
            >
            <research :data1="item"></research>
              <!-- <v-card
                color="white"
                @click="GotoDetailPage()"
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
          v-model="curPage"
          :length="Math.ceil( totalPage/ limit)"
          total-visible="7"
          @input="onPageChange(curPage, limit)"
        ></v-pagination>
        <br>
        <!-- <v-container>
          <v-row dense>
            <v-col v-for="(item, i) in hotResearchList" :key="i" cols="12">
              <v-card class="mb-5">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h2 card_title"
                      v-text="item.title"
                    ></v-card-title>
                    <v-card-subtitle class="div_authors">
                      <div
                        v-for="item1 in item.authors"
                        :key="item1"
                        class="text-subtitle-1 authors"
                      >
                        {{ item1 }};
                      </div>
                    </v-card-subtitle>
                    <v-card-text
                      v-text="item.abstract"
                      class="text-body-1 card_text"
                    ></v-card-text>
                    <v-card-actions>
                    </v-card-actions>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container> -->
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  components:{
    AcademicAchievement: () => import("@/components/personPageComponents/academicAchievement"),
    Research: () => import("@/components/personPageComponents/research"),
  },
  data() {
    return {
      hotAcademicList: [
        {
          color: "#ffffff",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          paperTitle: "联邦学习模型安全与隐私研究进展",
          paperAuthor: "顾育豪",
          paperDate: "666",
          paperCited: "666",
          paperPeriodical:"666",
          paperAbstract: "dadsadsa",
          paperClassification: "666",

         },
         {
          color: "#ffffff",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          paperTitle: "联邦学习模型安全与隐私研究进展",
          paperAuthor: "顾育豪",
          paperDate: "666",
          paperCited: "666",
          paperPeriodical:"666",
          paperAbstract: "dadsadsa",
          paperClassification: "666",

         },
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          authors: ["Foster the People", "666"],
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          authors: ["Ellie Goulding"],
        },
      ],
      hotResearchList: [],
    };
  },
  mounted() {
    this.getHotResearch()
  },
  methods: {
    GotoDetailPage(){
        this.$router.push("/PaperDetailPage");
    },
    toResearchDetailPage(research_id) {
      localStorage.setItem("research_id",research_id)
      this.$router.push({
        name: 'ResearchDetails',
      })
    },
    getHotResearch() {
      let token = localStorage.getItem('Token')
      this.$axios
        .post("/research/selectPopResearch", {},
        {
          headers: {
            'token': token
          }
        }).then((res) => {
          console.log(res.data)
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.hotResearchList = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
  },
};
</script>

<style scoped>
#div_authors{
  margin-left: 20px;
  height: 20px;
  width: 660px;
}
#MainPageHead {
  width: 1200px;
  height: 150px;
  margin: 20px auto 20px;
  margin-top: 10px;
  background-color: #ffffff;
  vertical-align: middle;
}
#hot_academic {
  display: inline-block;
  width: 580px;
  margin-right: 40px;
  margin-block-end: 100px;
  vertical-align: top;
  background-color: #ffffff;
}
#hot_research {
  display: inline-block;
  width: 580px;
  vertical-align: top;
  margin-block-end: 100px;

  background-color: #ffffff;
}
#building{
  background:url("../assets/images/ocean.webp");
  width:100%;
  height:100%;
  background-size:100% 100%;
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
.main_title {
  margin-left: 10px;
  text-align: left;
  color: rgb(42, 36, 36);
  font-size: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.card_title {
  text-align: left;
  color: black;
}
.div_authors{
  text-align: left;
}
.authors {
  text-align: left;
  font-size: 20px;
  color: grey;
  display: inline-block;
}

.card_text {
  text-align: left;
  color: black;
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
</style>
