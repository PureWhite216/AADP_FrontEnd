<template>
  <div>
    <div class="text-center" id="personPageHead">
      <div class="inline_div" id="div_head_portrait">
        <v-img :src="imgStc" id="head_portrait" />
      </div>
      <div class="inline_div" id="div_name">
        <p style="font-size: 40px; margin-bottom: 20px;">{{this.name}}</p>
        <p style="font-size: 25px">{{this.organization}}</p>
      </div>
      <div class="inline_div" id="div_info">
        <table>
          <tr>
            <th>发表的学术成果数：</th>
            <td>{{this.sum_aca_achv}}</td>
          </tr>
          <tr>
            <th>发表的研究数：</th>
            <td>{{this.sum_research}}</td>
          </tr>
          <tr>
            <th>总被引数：</th>
            <td>{{this.sum_quoted}}</td>
          </tr>
        </table>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "PersonPage",
  data(){
    return{
      name:"名字",
      organization:"所属单位",
      sum_aca_achv:10,
      sum_research:5,
      sum_quoted:233,
    }
  },
  computed:{
    imgStc(){
      //
      return require('../assets/images/temp_img/head_portrait.jpg')
    },
  }
}
</script>

<style scoped>
#personPageHead{
  width: 1000px;
  height: 200px;
  margin: 70px auto;
  background-color: #F0F0F0;
  vertical-align: middle;
}
#head_portrait{
  height:120px;
  width:120px;
}
#div_head_portrait{
  float: left;
  margin-left: 40px;
  margin-right: 0;
}
#div_name{
  margin-left: 80px;
  float: left;
}
#div_info{
  float: right;
  margin-right: 45px;
}
.inline_div{
  display: inline-block;
  vertical-align: top;
  margin-top: 40px;
}
p{
  text-align: left;
  color:black;
}
tr{
  font-size: 20px;
  line-height: 42px;
}
th{
  text-align: left;
  font-weight: normal;
  color:black;
}
td{
  text-align: right;
  font-weight: normal;
  color:black;
}
</style>
