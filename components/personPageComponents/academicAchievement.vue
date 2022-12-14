<template>
  <v-card id="comp" @click="goToDetail">
    <h1 style="text-align: left">{{data1.paperTitle}}</h1>
    <div id="div_authors">
      <p class="authors">{{data1.paperAuthor}}</p>
      <!-- <p v-for="item in data1.paperAuthor" class="authors">{{item}};</p> -->
    </div>
    <br/>
    <p id="info">{{data1.paperDate}} | {{data1.paperClassification}} | 被引数：{{data1.paperCited}} | 期刊：{{data1.paperPeriodical}}</p>
    <div style="width: 640px">
      <p id="abstract">{{data1.paperAbstract}}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "academicAchievement",
  props:['data1'],
  // data(){
  // }
  methods: {
    goToDetail(){
      this.$router.push({path:'/PaperDetailPage',query:{data: this.data1}});
    },
  }
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
  text-align: left;
  width: 630px;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap:break-word;
  color: black;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
