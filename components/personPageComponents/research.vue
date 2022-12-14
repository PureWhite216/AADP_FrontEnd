<template>
  <v-card id="comp" @click="goToDetail">
    <h1 style="text-align: left; margin-left: 10px;">{{data1.researchTitle}}</h1>

    <div id="div_authors">
      <v-list-item three-line>
        <v-list-item-avatar
          tile
          size="60"
          color="grey"
        >
          <v-img
            :src="authorData.avatar"
          >
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content dense >
          <v-list-item-title class="text-h4" style="font-weight: bold">{{authorData.realName}}</v-list-item-title>
          <v-list-item-subtitle class="text-h5">{{authorData.institutionName}}</v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>
    </div>
    <div  id="tempdiv">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click.stop="likeResearch" style="padding: 0;margin: 0">mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
    <br/>
    <p id="info">{{time}} |  点赞量：{{referNum}}</p>
    <div style="width: 640px">
      <p id="abstract">{{data1.researchAbstract}}</p>
    </div>

  </v-card>
</template>

<script>
export default {
  name: "research",
  props: ['data1'],
  data() {
    return{
      author: null,
      authorData: [],
      refernum: Number(this.data1.refernum),
    }
  },
  created() {
    this.getAuthor()
  },
  computed:{
    time: function () {
          // `this` 指向 vm 实例
          return this.data1.publishTime.replace("T"," ")
          },
    field: function () {
      // `this` 指向 vm 实例
      return this.data1.researchField === "" ? "-" : this.data1.researchField
    },
    referNum() {
      return this.refernum
    },
  },
  methods: {
    likeResearch() {
      let token = localStorage.getItem('Token')
      this.$axios
        .post("/research/adjustRefernum", {
          num: 1,
          researchId: this.data1.id,
          id: localStorage.getItem("userID"),
        },
        {
          headers: {
            'token': token
          }
        }).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.refernum = this.refernum + 1
            this.$message.success("点赞成功");
          } else {
            this.$message.error("此研究已点赞");
          }
        });
    },
    goToDetail(){
      this.$router.push({path:'/ResearchDetails',query:{data: this.data1, authorData: this.authorData}});
    },
    getAuthor() {
      this.$axios
        .get("/user/selectUserByUserId", {
          params: {
            user_id: this.data1.userId,
          },
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data.length !== 0) {
            this.author = res.data.data[0].realName;
            this.authorData = res.data.data[0]
          } else {
            // this.$message.error("No Author!");
          }
        });
    },
  },
}
</script>

<style scoped>
.authors{
  display: inline-block;
  margin-right: 5px;
  text-align: left;
  horiz-align: left;
  float: left;
  color: black;
  font-size: 20px;
}
#info{
  text-align: left;
  color: black;
  font-size: 15px;
  margin-left: 10px;
}
#div_authors{
  height: 60px;
  width: 200px;
  display: inline-block;

  vertical-align:top;
}
#tempdiv{
  display: inline-block;
  width: 400px;

  padding-top: 0px;
  vertical-align: top;
}
#comp{
  width: 660px;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
}
#comp:hover{
  background-color: #CCEEFF;
}
#abstract{
  width: 620px;
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap:break-word;
  color: black;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-left: 10px;
}
</style>
