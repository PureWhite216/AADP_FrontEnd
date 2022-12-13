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
            <div style="margin-top: 5% ; margin-left: 10%;">
              <p style="font-size: 40px; color: black">{{this.Papername}}</p>
            </div>
          </v-row>

          <v-row>
            <div class="paperinfo">
              <table style="font-size: 20px; color: gray; border-collapse:separate; border-spacing:0px 20px; text-align: left;">
                <tr>
                  <th>作者:&emsp;{{this.authorname}}</th>
                </tr>
                <tr>
                  <th>关键词:&emsp;{{this.keyword}}</th>
                </tr>
                <tr >
                  <th>被引数:&emsp;{{this.sum_quoted}}</th>
                  <th>发表时间:&emsp;{{this.publish_time}}</th>
                  <th>DOI:&emsp;{{this.DOI}}</th>
                </tr>
              </table>
            </div>
          </v-row>

          <v-row>
            <v-btn large color="primary" height="40px" weight="40px" style="margin-left: 100px" @click.stop="dialog3 = true">链接</v-btn>
            <v-dialog
              v-model="dialog3"
              max-width="600"
            >
              <v-card>
                <v-card-title class="headline">文章链接</v-card-title>
                <v-card-text>
                  {{this.Paperlink}}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog3 = false">
                    结束
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn large color="warning" height="40px" weight="40px" style="margin-left: 30px"  @click="addTask()" @click.stop="dialog2 = true">
              认领
            </v-btn>
            <v-dialog
              v-model="dialog2"
              max-width="600"
            >
              <v-card>
                <v-card-title class="headline">认领文章</v-card-title>
                <v-card-text>
                  请将能证明您身份的材料发送至邮箱:1780645196@qq.com
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog2 = false">
                    已知晓
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
              <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%; margin-left: 7%;">{{this.abstract}}</p>
              <p class="abstrct">{{this.abstractdetail}}</p>
            </div>
          </v-row>

          <v-row>
            <v-divider light class="divier" style="margin-top: 20px"></v-divider>
          </v-row>

          <v-row>
            <div>
              <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%; margin-bottom: 2%; margin-left: 7%;">参考文献</p>
              <div v-for="(item,index) in reference" :key="index" class="div_reference">
                <div>{{item.title}}</div>
                <div v-for="(value,index) in item.authors" :key="index" class="inline_author">{{value}}</div>
                <div>{{item.time}}</div>
                <v-divider light class="divier" style="margin-top: 20px"></v-divider>
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
        <v-row style="margin-top:3%; margin-left:7%">
          <v-btn color="primary" dark @click.stop="dialog = true" style="margin-top:3%;">
            发表新评论
          </v-btn>
          <v-dialog
            v-model="dialog"
            max-width="600"
          >
            <v-card>
              <v-card-title class="headline">发表新评论</v-card-title>
              <v-card-text>
                <v-text-field label="你的评论" required></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  提交
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog = false">
                  放弃
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <div class="text-left" id="whole">
          <v-row>
            <div>
              <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%; margin-bottom: 5%; margin-left: 7%;">评论</p>
              <div v-for="(item,index) in comments" :key="index" class="div_reference" style="font-size: 20px; color: black; margin-top: 5%;">
                <div>{{index+1}}&nbsp&nbsp{{item.content}}</div>
                <v-divider light class="divier" style="margin-bottom: 20px; margin-top: 5px"></v-divider>
              </div>
            </div>
          </v-row>
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
      paperid:1,
      Papername:"文章标题",
      Paperlink:"www.baidu.com",
      authorname:"张三",
      keyword:"人工智能",
      abstract:"摘要",
      abstractdetail:"hahahahahahahahahahhahahahahhahahahahahhahahahahahahahahahahhahahahahhahahahahahhahahahahahahahahahahhahahahahhahahahahahhahahahahahahahahahahhahahahahhahahahahahha",
      //reference:"参考文献",
      referencedetail:"参考文献",
      sum_quoted:233,
      publish_time:"2022.12.13",
      DOI:"132",
      dialog: false,
      dialog2: false,
      dialog3: false,
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
      comments:[
        {
          content:"good",
        },
        {
          content:"bad",
        },
        {
          content:"good",
        },
        {
          content:"bad",
        },
      ],
    }
  },

  methods: {
    addTask(objectType = "PAPER"){
      let token = localStorage.getItem('Token')
      this.$axios.post('/user/addTask', {
          objectId: this.paperid,
          objectType: objectType
        },{
          headers: {
            'token': token
          }
        }
      ).then(res => {
        //console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
        else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
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
  margin-left: 0;
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
  margin-left: 15%;
  width: 700px;
  word-break:break-all;
  word-wrap:break-word;
}
.div_reference{
  margin-right: 500px;
  margin-bottom: 10px;
  text-align: left;
  margin-left: 150px;
  min-width: 50%;
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
