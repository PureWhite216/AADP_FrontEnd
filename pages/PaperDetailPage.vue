<template>
  <div>
    <v-container fluid>
      <v-card
        class="mx-auto"
        max-width="70%"
        style="margin-top: 35px"
      >
        <div class="text-left" id="whole">
          <v-row>
            <div style="margin-top: 5%">
              <p style="font-size: 40px; color: black">{{this.Papername}}</p>
            </div>
          </v-row>

          <v-row>
            <div class="paperinfo">
              <table style="font-size: 20px; color: gray; border-collapse:separate; border-spacing:0px 20px; text-align: left;">
                <tr>
                  <th>作者:&emsp;{{this.sum_aca_achv}}</th>
                </tr>
                <tr>
                  <th>关键词:&emsp;{{this.sum_research}}</th>
                </tr>
                <tr >
                  <th>被引数:&emsp;{{this.sum_quoted}}</th>
                  <th>发表时间:&emsp;{{this.sum_quoted}}</th>
                  <th>DOI:&emsp;{{this.sum_quoted}}</th>
                </tr>
              </table>
            </div>
          </v-row>

          <v-row>
            <v-btn large color="primary" height="40px" weight="40px">链接</v-btn>
            <v-btn large color="warning" height="40px" weight="40px" style="margin-left: 20px">认领</v-btn>
          </v-row>

          <v-row align-content="start" style="margin-top: 20px">
            <v-col cols="4">
              <v-tabs
                fixed-tabs
                white
              >
                <v-tab @click="display = 0" class ="tab">
                  详情
                </v-tab>
                <v-tab @click="display = 1" class = "tab">
                  评论
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="8">

            </v-col>

          </v-row>
        </div>
      </v-card>
      <v-card
        class="mx-auto"
        max-width="70%"
        style="margin-top: 35px"
        min-height="800px"
        v-show="display===0"
      >
        <div class="text-left" id="whole">
          <v-row>
            <div>
              <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%;">{{this.abstract}}</p>
              <p class="abstrct">{{this.abstractdetail}}</p>
            </div>
          </v-row>

          <v-row>
            <v-divider light class="divier" style="margin-top: 20px"></v-divider>
          </v-row>

          <v-row>
            <div>
              <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%; margin-bottom: 2%;">参考文献</p>
              <div v-for="(item,index) in reference" :key="index" class="div_reference">
                <div>{{item.title}}</div>
                <div v-for="(value,index) in item.authors" :key="index" class="inline_author">{{value}}</div>
                <div>{{item.time}}</div>
              </div>
            </div>
          </v-row>

        </div>
      </v-card>
      <v-card
        class="mx-auto"
        max-width="70%"
        style="margin-top: 35px"
        min-height="800px"
        v-show="display===1"
      >
        <div class="text-left" id="whole">


        </div>
      </v-card>
    </v-container>

  </div>
</template>

<script>
export default {
  name: 'PaperDetailPage',
  components: {  },
  data(){
    return{
      display:0,
      Papername:"文章标题",
      Paperlink:"所属单位",
      authorname:"张三",
      keyword:"人工智能",
      abstract:"摘要",
      abstractdetail:"hahahahahahahahahahhahahahahhahahahahahhahahahahahahahahahahhahahahahhahahahahahhahahahahahahahahahahhahahahahhahahahahahhahahahahahahahahahahhahahahahhahahahahahha",
      //reference:"参考文献",
      referencedetail:"参考文献",
      sum_aca_achv:10,
      sum_research:5,
      sum_quoted:233,
      reference:[
        {
          title:"学术成果标题1",
          authors:["author1" , "author2" , "author3"],
          time:"2022-11-24",
          type:"类型",
          quoted:230,
          journal:"期刊",
        },
        {
          title:"学术成果标题2",
          authors:["author1" , "author2"],
          time:"2022-11-25",
          type:"类型",
          quoted:122,
          journal:"期刊",
        },
        {
          title:"学术成果标题3",
          authors:["author1" , "author2" , "author3"],
          time:"2022-11-24",
          type:"类型",
          quoted:230,
          journal:"期刊",
        },
        {
          title:"学术成果标题4",
          authors:["author1" , "author2" , "author3"],
          time:"2022-11-24",
          type:"类型",
          quoted:230,
          journal:"期刊",
        },
      ],
    }
  },

  methods: {

  },
}
</script>

<style scoped>
.tab{
  background-color: #ffffff;
  color: black;
  font-size: large;
}
.inline_div{
  display: inline-block;
  vertical-align: top;
  margin-top: 30px;
  margin-left: 0px;
}
.paperinfo{
  margin-left: -100px;
  margin-top: 0px;
}
.divier{
  text-decoration-thickness: 10px;
  color: black;
}
.abstrct{
  font-size: 20px;
  color: black;
  text-align: left;
  margin-left: 10%;
  width: 700px;
  word-break:break-all;
  word-wrap:break-word;
}
.div_reference{
  margin-right: 500px;
  margin-bottom: 10px;
  text-align: left;
  margin-left: 150px;
}
.inline_author{
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
}
#div_name{
  margin-left: 10px;
}
#div_abstrct{
  margin-left: 10px;
  margin-bottom: 40px;
}

#whole{
  width: 1000px;
  min-height: 400px;
  background-color: rgb(255, 255, 255);
  vertical-align: middle;
  margin: 20px auto 20px;
}
#div_link{
  margin-left:400px;
  margin-right: 150px;
}
table th{
  padding-left: 100px;
}
</style>
