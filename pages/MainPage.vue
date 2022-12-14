<template>
  <div class="backgroundImg">
    <div>&nbsp</div>
<!--    <div id="MainPageHead">-->
<!--      &lt;!&ndash; <v-img :src="require('/assets/images/temp_img/head_portrait.jpg')"></v-img> &ndash;&gt;-->
<!--    </div>-->
    <div class="text-center" style="margin-top: 25px">
      <v-card id="hot_academic">
        <v-card-title class="font-weight-black main_title">
          热门学术成果
        </v-card-title>
        <v-container>
          <v-row dense>
            <v-col v-for="(item, i) in hotAcademicList" :key="i" cols="12">
              <academic-achievement :data1="item"></academic-achievement>
            </v-col>
          </v-row>
        </v-container>
<!--        <v-pagination-->
<!--          v-model="curPage"-->
<!--          :length="Math.ceil(totalPage / limit)"-->
<!--          total-visible="7"-->
<!--          @input="onPageChange(curPage, limit)"-->
<!--        ></v-pagination>-->
        <br />
      </v-card>
      <v-card id="hot_research">
        <v-card-title class="font-weight-black main_title">
          热门研究
        </v-card-title>
        <v-container>
          <v-row dense>
            <v-col v-for="(item, i) in hotResearchList" :key="i" cols="12">
              <research :data1="item"></research>
            </v-col>
          </v-row>
        </v-container>
<!--        <v-pagination-->
<!--          v-model="curPage"-->
<!--          :length="Math.ceil(totalPage / limit)"-->
<!--          total-visible="7"-->
<!--          @input="onPageChange(curPage, limit)"-->
<!--        ></v-pagination>-->
        <br />
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  components: {
    AcademicAchievement: () =>
      import("@/components/personPageComponents/academicAchievement"),
    Research: () => import("@/components/personPageComponents/research"),
  },
  data() {
    return {
      hotAcademicList: [],
      hotResearchList: [],
    };
  },
  mounted() {
    this.getHotAcademic();
    this.getHotResearch();
  },
  methods: {
    GotoDetailPage() {
      this.$router.push("/PaperDetailPage");
    },
    toResearchDetailPage(research_id) {
      localStorage.setItem("research_id", research_id);
      this.$router.push({
        name: "ResearchDetails",
      });
    },
    getHotAcademic() {
      let token = localStorage.getItem("Token");
      this.$axios
        .get("/paper/getTop10PaperByClick", {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.hotAcademicList = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
    getHotResearch() {
      let token = localStorage.getItem("Token");
      this.$axios
        .post(
          "/research/selectPopResearch",
          {},
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
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
#div_authors {
  margin-left: 20px;
  height: 20px;
  width: 660px;
}
#MainPageHead {
  width: 1440px;
  height: 150px;
  margin: 20px auto 20px;
  margin-top: 30px;
  background-color: #ffffff;
  vertical-align: middle;
}
#hot_academic {
  display: inline-block;
  width: 700px;
  margin-right: 40px;
  margin-block-end: 100px;
  vertical-align: top;
  background-color: #ffffff;
}
#hot_research {
  display: inline-block;
  width: 700px;
  vertical-align: top;
  margin-block-end: 100px;

  background-color: #ffffff;
}
.backgroundImg {
  /*background: url("../assets/images/ocean5.jpg");*/
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-attachment:fixed;
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
.authors {
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
.div_authors {
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
</style>
