<template>
  <div>
    <div class="text-center" id="institutionPageHead">
      <div class="inline_div" id="div_head_portrait">
        <v-img :src="imgStc" id="head_portrait" />
      </div>
      <div class="inline_div" id="div_name">
        <p style="font-size: 40px;">{{this.name}}</p>
      </div>
      <div class="inline_div" id="div_info">
        <table>
          <tr>
            <th>成员数量：</th>
            <td>{{this.worker_list.length}}</td>
          </tr>
          <tr>
            <th>发表的学术成果数：</th>
            <td>{{this.academic_achievements.length}}</td>
          </tr>

          <tr>
            <th>总被引数：</th>
            <td>{{this.sum_quoted}}</td>
          </tr>
        </table>
      </div>

    </div>
    <div class="text-center">
        <v-card id="display">
          <div style="background-color: #ffffff;height: 48px">
            <p class="col_title">发表的学术成果</p>
          </div>
          <v-container>
            <v-row dense>
              <v-col
                v-for="(item, i) in academic_achievements"
                :key="i"
                cols="12"
                @click="toPaperDetailPage()"
              >
                <academic-achievement :data1="item"></academic-achievement>
              </v-col>
            </v-row>
          </v-container>
        </v-card>


      <div id="workers">
        <div style="background-color: #ffffff;height: 48px;margin-bottom: 20px;border-radius: 5px;">
          <p class="col_title">机构成员</p>
        </div>

        <ul>
          <li v-for="item in worker_list" style="list-style-type:none">
            <p class="worker_name" @click="toPersonPage()">{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstitutionPage",
  components:{
    AcademicAchievement: () => import("@/components/personPageComponents/academicAchievement"),
    Research: () => import("@/components/personPageComponents/research"),
  },
  data(){
    return{
      name:"北京航空航天大学软件学院",
      sum_aca_achv:10,
      sum_research:5,
      sum_quoted:233,
      worker_list:[{name:"姓名1",},
        {name:"姓名2",},
        {name:"姓名3",},
        {name:"姓名4",},
        {name:"姓名5",},
        {name:"姓名6",},
        {name:"姓名7",},
        {name:"姓名8",},
        {name:"姓名9",},
        {name:"姓名10",},
        {name:"姓名11",},
        {name:"姓名12",},],
      academic_achievements:[
        {
          title:"学术成果标题1",
          authors:["author1" , "author2" , "author3"],
          time:"2022-11-24",
          type:"类型",
          quoted:230,
          journal:"期刊",
          abstract:"每个人都是独立的个体，有属于自我发展的空间和方向. 既然如此, 要反思学术成果摘要行为。此时此刻，我对自己的内心进行了很多的思考。 马尔顿曾经提到过 : 坚强的信心，能使平凡的人做出惊人的事业。这句话语虽然很短, 但令我浮想联翩。 学术成果摘要似乎是一种巧合，但如果我们从一个更大的角度看待问题，这似乎是一种不可避免的事实。 我也要通过这次学术成果摘要事件，提高我的思想认识，强化我的观念。 所谓学术成果摘要, 关键是学术成果摘要需要如何写. 经过上述讨论 这条路很长，有时候走着走着，不经意发现自己迷了路。 问题的关键究竟为何? 关于这次学术成果摘要的原因，显然是有主观态度上的行为。反映出我观念不够先进。 生活中, 若学术成果摘要出现了, 我们就不得不考虑它出现了的事实.",
        },
        {
          title:"学术成果标题2",
          authors:["author1" , "author2"],
          time:"2022-11-25",
          type:"类型",
          quoted:122,
          journal:"期刊",
          abstract:"每个人都是独立的个体，有属于自我发展的空间和方向. 既然如此, 要反思学术成果摘要行为。此时此刻，我对自己的内心进行了很多的思考。 马尔顿曾经提到过 : 坚强的信心，能使平凡的人做出惊人的事业。这句话语虽然很短, 但令我浮想联翩。 学术成果摘要似乎是一种巧合，但如果我们从一个更大的角度看待问题，这似乎是一种不可避免的事实。 我也要通过这次学术成果摘要事件，提高我的思想认识，强化我的观念。 所谓学术成果摘要, 关键是学术成果摘要需要如何写. 经过上述讨论 这条路很长，有时候走着走着，不经意发现自己迷了路。 问题的关键究竟为何? 关于这次学术成果摘要的原因，显然是有主观态度上的行为。反映出我观念不够先进。 生活中, 若学术成果摘要出现了, 我们就不得不考虑它出现了的事实.",
        },
        {
          title:"学术成果标题3",
          authors:["author1" , "author2" , "author3"],
          time:"2022-11-24",
          type:"类型",
          quoted:230,
          journal:"期刊",
          abstract:"每个人都是独立的个体，有属于自我发展的空间和方向. 既然如此, 要反思学术成果摘要行为。此时此刻，我对自己的内心进行了很多的思考。 马尔顿曾经提到过 : 坚强的信心，能使平凡的人做出惊人的事业。这句话语虽然很短, 但令我浮想联翩。 学术成果摘要似乎是一种巧合，但如果我们从一个更大的角度看待问题，这似乎是一种不可避免的事实。 我也要通过这次学术成果摘要事件，提高我的思想认识，强化我的观念。 所谓学术成果摘要, 关键是学术成果摘要需要如何写. 经过上述讨论 这条路很长，有时候走着走着，不经意发现自己迷了路。 问题的关键究竟为何? 关于这次学术成果摘要的原因，显然是有主观态度上的行为。反映出我观念不够先进。 生活中, 若学术成果摘要出现了, 我们就不得不考虑它出现了的事实.",
        },
        {
          title:"学术成果标题4",
          authors:["author1" , "author2" , "author3"],
          time:"2022-11-24",
          type:"类型",
          quoted:230,
          journal:"期刊",
          abstract:"每个人都是独立的个体，有属于自我发展的空间和方向. 既然如此, 要反思学术成果摘要行为。此时此刻，我对自己的内心进行了很多的思考。 马尔顿曾经提到过 : 坚强的信心，能使平凡的人做出惊人的事业。这句话语虽然很短, 但令我浮想联翩。 学术成果摘要似乎是一种巧合，但如果我们从一个更大的角度看待问题，这似乎是一种不可避免的事实。 我也要通过这次学术成果摘要事件，提高我的思想认识，强化我的观念。 所谓学术成果摘要, 关键是学术成果摘要需要如何写. 经过上述讨论 这条路很长，有时候走着走着，不经意发现自己迷了路。 问题的关键究竟为何? 关于这次学术成果摘要的原因，显然是有主观态度上的行为。反映出我观念不够先进。 生活中, 若学术成果摘要出现了, 我们就不得不考虑它出现了的事实.",
        },
      ],
    }
  },
  computed:{
    imgStc(){
      //
      return require('../assets/images/temp_img/Institution_pic.png')
    },
  },
  methods:{
    toPaperDetailPage(){
      this.$router.push({
        name: 'PaperDetailPage',
      })
    },
    toPersonPage(){
      this.$router.push({
        name: 'PersonPage',
      })
    }
  }
}
</script>

<style scoped>
#institutionPageHead{
  width: 1000px;
  height: 200px;
  margin: 20px auto 20px;
  background-color: #ffffff;
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
  margin-left: 20px;
  float: left;
  margin-top: 70px;

}
#div_info{
  float: right;
  margin-right: 40px;
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
  vertical-align: top;
  background-color: #fafafa;
  width: 680px;
}
#workers{
  background-color: #fafafa;
  display: inline-block;
  width: 300px;
  margin-left: 20px;
  margin-top: 0;
  border-radius: 5px;
}

.worker_name{
  font-size: large;
}
.worker_name:hover{
  color: #2c73cb;
}
.col_title{
  font-weight: normal;
  font-size: large;
  padding: 10px;
}
</style>
