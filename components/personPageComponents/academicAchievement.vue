<template>
  <v-card id="comp">
    <h1 style="text-align: left">{{data1.title}}</h1>
    <div id="div_authors">
      <p v-for="item in data1.authors" class="authors">{{item}};</p>
    </div>
    <br/>
    <p id="info">{{data1.time}} | {{data1.type}} | 被引数：{{data1.quoted}} | 期刊：{{data1.journal}}</p>
    <div style="width: 640px">
      <p id="abstract">{{data1.abstract}}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "academicAchievement",
  props:['data1'],
  // data(){
  // }
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
