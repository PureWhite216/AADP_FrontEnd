<template>
  <div>
    <v-app-bar
      color="white"
    >
      <v-col cols="12" sm="1" style="font-size: large; font-family: Georgia;">
        ResearchOcean
      </v-col>
      <v-col cols="12" sm="3">
        <v-tabs align-with-title >
          <v-tab @click="$router.push('MainPage')" style="font-size: large">主页</v-tab>
          <v-tab @click="$router.push('ResearchPage')" style="font-size: large">研究</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" sm="4">
        <v-row>
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
            width="500px"
            @keydown.enter.native="goSearch()"
          ></v-text-field>
          <v-btn icon @click="goSearch()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" sm="3">
      </v-col>
      <v-col cols="12" sm="1">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click=""
              >
                <v-img
                  :src="avatar"
                >
                </v-img>
              </v-avatar>
            </template>
            <v-list>
                <v-list-item @click="goPersonPage">
                  <v-list-item-content>
                    个人门户
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="goPersonCenter">
                  <v-list-item-content>
                    个人中心
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="Logout">
                  <v-list-item-content style="color: #ff2a2a">
                    注销
                  </v-list-item-content>
                </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  data () {
    return {
      loading: false,
      search: null,
      select: null,
      avatar: "http://123.249.35.3:8090/file/7/2022-12-14_01:21:27.956_avater.jpg",
      items: [],
    }
  },
  computed:{
    imgSrc(){
      return require('assets/images/avatar1.png')
    },
  },
  methods: {
    updateAvatar()
    {
      this.avatar = localStorage.getItem("avatar")
    },
    goSearch()
    {
      localStorage.setItem("selectKey",this.select);
      this.$router.push({
        path:'/SearchResultPage',
        query:{
          t: Date.now()
        }
      });
    },
    goPersonPage()
    {
      //console.log(localStorage.getItem('userID'))
      //console.log("bbbbbb")
      this.$router.push({
        path:'/PersonPage',
        query:{
          userID : localStorage.getItem('userID'),
        }})
    },
    goPersonCenter()
    {
      this.$router.push({path:'/PersonCenter'});
    },
    Logout(){
      localStorage.removeItem("Token");
      this.$router.push("/LoginPage");
    },
  },

  mounted() {
    this.avatar = localStorage.getItem("avatar")
  },

  updated() {
    this.avatar = localStorage.getItem("avatar")
  }

}
</script>

<style scoped>
.router-link-active{
  color: #1dc8cc;
}
.a{
  color: #1dc8cc;
}
</style>
