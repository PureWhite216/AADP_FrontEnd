<template>
  <div id="comp">
    <h1 style="text-align: left">{{data1.title}}</h1>
    <div style="width: 640px">
      <p id="abstract">{{data1.abstract}}</p>
    </div>
  </div>
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
  margin: 10px;
  background-color: white;
  padding: 10px;
}
#comp:hover{
  background-color: #CCEEFF;
}
#abstract{
  width: 640px;
  height: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap:break-word;
  color: black;
  text-align: left;
}
</style>
