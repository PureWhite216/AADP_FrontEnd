<template>
  <div class="backgroundImg">
    <div class="text-center">
      <v-card id="research" class="mt-12">
        <v-tabs v-model="tab" align-with-title>
          <v-tab v-for="item in tab_option" :key="item">
            {{ item.label }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="option in tab_option" :key="option">
            <v-container>
              <v-row dense>
                <v-col
                  v-for="(item, i) in option.researchList"
                  :key="i"
                  cols="12"
                >
                <research :data1="item"></research>
                  <!-- <v-card class="mb-5">
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
                        <v-card-actions> </v-card-actions>
                      </div>
                    </div>
                  </v-card> -->
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-card id="hot_research" class="mt-12">
        <v-container>
          <v-btn block elevation="6" color="primary" @click="$router.push('ResearchEdit')"> 发表新研究 </v-btn>
<!--          <v-card class="mt-10">-->
<!--            <v-card-title class="text-h2 card_title">领域</v-card-title>-->
<!--            <v-col cols="6">-->
<!--            <v-select-->
<!--              :items="filed_option"-->
<!--              label="所有领域"-->
<!--              dense-->
<!--              outlined-->
<!--            ></v-select>-->
<!--          </v-col>-->
<!--          </v-card>-->
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResearchPage",
  components:{
    Research: () => import("@/components/personPageComponents/research"),
  },
  data() {
    return {
      filed_option:['计算机','dsad','dsa'],
      tab_option: [
        {
          label: "最热",
          researchList: [],
        },
        {
          label: "最新",
          researchList: [],
        },
      ],
      tab: null,
    };
  },
  mounted() {
    this.getHotResearch()
    this.getNewResearch()
  },
  methods: {
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
            this.tab_option[0].researchList = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
    getNewResearch() {
      let token = localStorage.getItem('Token')
      this.$axios
        .post("/research/selectLatestResearch", {},
        {
          headers: {
            'token': token
          }
        }).then((res) => {
          console.log(res.data)
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.tab_option[1].researchList = res.data.data;
          } else {
            this.$message.error("No SearchResult!");
          }
        });
    },
  },
};
</script>

<style scoped>
#MainPageHead {
  width: 1200px;
  height: 150px;
  margin: 20px auto 20px;
  background-color: #f0f0f0;
  vertical-align: middle;
}
#research {
  display: inline-block;
  /* margin-top: 20px; */
  width: 700px;
  margin-right: 40px;
  margin-block-end: 100px;
  vertical-align: top;
  background-color: #f0f0f0;
}
#hot_research {
  display: inline-block;
  width: 460px;
  vertical-align: top;
  margin-block-end: 100px;
  background-color: #ffffff;
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
.backgroundImg {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-attachment:fixed;
}
</style>
