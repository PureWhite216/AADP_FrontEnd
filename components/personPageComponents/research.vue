<template>
  <v-card id="comp">
    <h1 style="text-align: left">{{data1.researchTitle}}</h1>
    <div id="div_authors">
      <p class="authors">{{author}}</p>
    </div>
    <br/>
    <p id="info">{{data1.publishTime}} | {{data1.researchField}} | 被引数：{{data1.refernum}} | 期刊：{{data1.paperPeriodical}}</p>
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
    }
  },
  created() {
    this.getAuthor()
  },
  methods: {
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
            this.author = res.data.data[0].username;
          } else {
            this.$message.error("No SearchResult!");
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
}
#div_authors{
  height: 20px;
  width: 660px;
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
  width: 630px;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap:break-word;
  color: black;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
