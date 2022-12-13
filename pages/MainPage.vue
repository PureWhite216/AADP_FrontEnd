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
                    <v-card-actions>
                      <!-- <v-btn
                        v-if="item.authors === 'Ellie Goulding'"
                        class="ml-2 mt-3"
                        fab
                        icon
                        height="40px"
                        right
                        width="40px"
                      >
                        <v-icon>mdi-play</v-icon>
                      </v-btn>

                      <v-btn v-else class="ml-2 mt-5" outlined rounded small>
                        START RADIO
                      </v-btn> -->
                    </v-card-actions>
                  </div>

                  <!-- <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar> -->
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card id="hot_research">
        <v-card-title class="font-weight-black main_title">
          热门研究
        </v-card-title>
        <v-container>
          <v-row dense>
            <!-- <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="text-h5">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle
                  >Listen to your favorite authorss and albums whenever and
                  wherever, online and offline.</v-card-subtitle
                >

                <v-card-actions>
                  <v-btn text> Listen Now </v-btn>
                </v-card-actions>
              </v-card>
            </v-col> -->

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
                      <!-- <v-btn
                        v-if="item.authors === 'Ellie Goulding'"
                        class="ml-2 mt-3"
                        fab
                        icon
                        height="40px"
                        right
                        width="40px"
                      >
                        <v-icon>mdi-play</v-icon>
                      </v-btn>

                      <v-btn v-else class="ml-2 mt-5" outlined rounded small>
                        START RADIO
                      </v-btn> -->
                    </v-card-actions>
                  </div>

                  <!-- <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.src"></v-img>
                  </v-avatar> -->
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      hotAcademicList: [
        {
          color: "#ffffff",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          authors: ["Foster the dasdasdsPeople", "666"],
          abstract: "666666dsad",
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          authors: ["adsadsadsadsadsds"],
          abstract: "666666dsad",
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
      hotResearchList: [
        {
          color: "#ffffff",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          authors: ["Foster the dasdasdsPeople", "666"],
          abstract: "666666dsaddasjdasol\ndjsaiodjioasdjiosajdoasd\ndisahdioashdoiashdaiosdh",
        },
        {
          color: "#952175",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          authors: ["adsadsadsadsadsds"],
          abstract: "666666dsad",
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
    };
  },
};
</script>

<style scoped>
#MainPageHead {
  width: 1200px;
  height: 150px;
  margin: 20px auto 20px;
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
  background:url("assets\images\ocean.webp");
  width:100%;
  height:100%;
  background-size:100% 100%;
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
</style>
