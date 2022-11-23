<template>
  <div>
    <div class="text-center" id="personPageHead">
      <div class="inline_div" id="div_head_portrait">
        <v-img :src="imgStc" id="head_portrait" />
      </div>
      <div class="inline_div" id="div_name">
        <p style="font-size: 40px; margin-bottom: 15px;">{{this.name}}</p>
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
    <div class="text-center">
      <div id="display">
        <p>rerrererererererere</p>
      </div>
      <div id="co_workers">
        <p id="co_workers_title">合作者</p>
        <ul>
          <li v-for="(item) in co_worker_list" style="list-style-type:none">
            <p class="co_worker_name">{{item.name}}</p>
            <p class="co_worker_organization">{{item.organization}}</p>
          </li>
        </ul>
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
      co_worker_list:[{name:"姓名1",organization:"所属单位1"},
        {name:"姓名2",organization:"所属单位2"},
        {name:"姓名3",organization:"所属单位3"},
        {name:"姓名4",organization:"所属单位4"},
        {name:"姓名5",organization:"所属单位5"},]
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
  margin: 70px auto 20px;
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
  margin-left: 40px;
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
#display{
  display: inline-block;
  width: 680px;
  border: #232a37;
  border-width: medium;
  border:solid;
}
#co_workers{
  background-color: #F0F0F0;
  display: inline-block;
  width: 300px;
  margin-left: 20px;
  margin-top: 0;
  border: #232a37;
  border-width: medium;
  border:solid;
}
#co_workers_title{
  font-weight: normal;
  font-size: xx-large;
  margin-left: 10px;
}
.co_worker_name{
  font-size: large;
}
.co_worker_organization{

}
</style>
