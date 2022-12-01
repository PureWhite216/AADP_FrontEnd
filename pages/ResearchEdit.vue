<template>
  <v-container>
    <v-app-bar
      color="white"
      class="AppBar"
    >
      <v-row class="AppBar">
        <v-btn id="saveBtn" depressed small>保存草稿</v-btn>
        <v-text-area
          id="title"
        >标题</v-text-area>
<!--      <v-overflow-btn-->
<!--        id="areaBtn"-->
<!--        :items="dropdown_font"-->
<!--        depressed small-->
<!--      ></v-overflow-btn>-->
        <v-btn id="subBtn" depressed small>发表草稿</v-btn>
      </v-row>
    </v-app-bar>
    <br>
    <v-card>
      <RichTextEditor
        ref="richTextEditor"
        :height="1000"
      />
    </v-card>
  </v-container>
</template>

<script>
import RichTextEditor from '@/components/RichTextEditor'
export default {
  name: "ResearchEdit",
  components: { RichTextEditor },
  data() {
    return {
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
    }
  }
}
</script>

<style scoped>
#saveBtn{
  margin-left: 10px;
  color: black;
  font-size: 15px;
  background-color: chocolate;
  text-align: left;
}
#areaBtn{
  color: black;
  font-size: 15px;
  background-color: chocolate;
  text-align: left;
}
#subBtn{
  color: white;
  font-size: 15px;
  background-color: blue;
  text-align: left;
  margin-right: 10px;
}
.AppBar{
  width: 1200px;
  height: 40px;
}
#title{
  color: black;
  font-size: large;
  margin: 0 auto;
  text-align: center;
  vertical-align: center;
}
</style>
