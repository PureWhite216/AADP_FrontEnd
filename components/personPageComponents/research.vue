<template>
  <v-card id="comp">
    <h1 style="text-align: left">{{data1.title}}</h1>
    <div style="width: 640px">
      <p id="abstract">{{data1.abstract}}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "research",
  props:['data1'],

}
</script>

<style scoped>
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
