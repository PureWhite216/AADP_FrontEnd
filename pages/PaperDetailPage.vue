<template>
  <div>
    <v-container fluid>
      <v-card
        class="mx-auto"
        max-width="70%"
        style="margin-top: 35px "
      >
        <div class="text-left" id="whole">
          <v-row>
            <div style="margin-top: 5% ; margin-left: 10%; margin-right: 10%;">
              <p style="font-size: 40px; color: black">{{this.paperData.paperTitle}}</p>
            </div>
          </v-row>

          <v-row>
            <div class="paperinfo">
              <table style="font-size: 20px; color: gray; border-collapse:separate; border-spacing:0px 20px; text-align: left; width: 100%; table-layout:fixed;">
                <tr>
                  <th>作者:&emsp;{{this.paperData.paperAuthor}}</th>
                </tr>
                <tr style="width:100%">
                  <th>关键词:&emsp;{{this.paperData.paperKeyword}}</th>
                </tr>
                <tr>
                  <th>被引数:{{this.paperData.paperCited}}</th>
                </tr>
                <tr>
                  <th>发表时间:{{this.paperData.paperDate}}</th>
                </tr>
                <tr>
                  <th>DOI:{{this.paperOther.DOI}}</th>
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
                  {{this.paperData.paperLink}}
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
        style="margin-top: 35px;margin-bottom: 30px;"
        min-height="800px"
        v-show="display===0"
      >
        <div class="text-left" id="whole">
          <v-row>
            <div>
              <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%; margin-left: 7%;">{{"摘要"}}</p>
              <p class="abstrct">{{this.paperData.paperAbstract}}</p>
            </div>
          </v-row>

          <v-row>
            <v-divider light class="divier" style="margin-top: 20px"></v-divider>
          </v-row>

          <v-row>
            <div>
              <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%; margin-bottom: 2%; margin-left: 50px; min-width: 500%;">参考文献</p>
              <div v-for="item in this.paperRefs.refs" class="div_reference">
                <div>{{item.ref}}</div>
<!--                <div v-for="(value,index) in item.authors" :key="index" class="inline_author">{{value}}</div>-->
<!--                <div>{{'2022/xx/xx'}}</div>-->
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
        <v-row style="margin-top:3%; margin-left:7%;">
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
                <v-textarea v-model="your_comment" label="your_comment" auto-grow outlined row-height="15" rows="10"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false; addcomment()">
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
<!--          <v-row>-->
<!--            <p style="font-size: 30px; color: black; text-align: left; margin-top: 3%; margin-bottom: 5%; margin-left: 50px;">评论:</p>-->
<!--          </v-row>-->
          <v-row>
            <div v-for="(item,index) in comments" :key="index" class="div_reference" style="font-size: 20px; color: black; margin-top: 0%; word-break:break-all;word-wrap:break-word;">
              <v-card class="mx-auto" min-height="200" min-width="700" style="margin: 5px">
                <v-row style="margin: auto">
                  <v-list-item three-line>
                    <v-list-item-avatar
                      tile
                      size="80"
                      color="grey"
                    >
                      <v-img
                        :src="item.author.avatar"
                      >
                      </v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <div class="overline mb-4">{{ item.comment.createTime }}</div>
                      <v-list-item-title class="headline mb-1">{{item.author.realName}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.author.institutionName}}</v-list-item-subtitle>
                    </v-list-item-content>

                  </v-list-item>
                </v-row>
                <v-row style="margin: auto">
                  <div style="margin-left: 20px">
                    <p>{{item.comment.content}}</p>
                  </div>
                </v-row>
              </v-card>
<!--              <div style=""><p style="color:blue;display: inline-block;font-size: 28px;">{{index+1}}</p>&nbsp&nbsp{{item.comment.content}}</div>-->
<!--              <v-divider light class="divier" style="margin-bottom: 20px; margin-top: 5px;"></v-divider>-->
            </div>
          </v-row>
          <v-pagination
            v-model="curPage"
            :length="Math.ceil(this.totalpage/this.limit)"
            total-visible="7"
            @input="onPageChange(curPage)"
          ></v-pagination>
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
      paperData: [],
      paperOther: [],
      paperRefs: [],
      display:0,
      paperid:1,
      dialog: false,
      dialog2: false,
      dialog3: false,
      your_comment:"",
      curPage:1,
      limit:7,
      totalpage:7,
      comments:[

      ],
    }
  },
  mounted() {
    this.getPaPerInfo();
    this.getComments(this.curPage);
    console.log(this.paperData)
    // console.log(this.paperData.paperOtherInfo.DOI)
  },
  methods: {
    getPaPerInfo()
    {
      this.paperData = this.$route.query.data;
      this.paperRefs = JSON.parse(this.paperData.paperReference);
      this.paperOther = JSON.parse(this.paperData.paperOtherInfo);
    },
    addTask(){
      console.log(this.paperData.id)
      let token = localStorage.getItem('Token')
      this.$axios.post('/user/addTask', {
          objectId: this.paperData.id,
          objectType: "PAPER"
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
    addcomment(){
      console.log(this.your_comment)
      let token = localStorage.getItem('Token')
      this.$axios.post('/comment/save', {
        authorId: localStorage.getItem('userID'),
        content: this.your_comment,
        createTime: Date,
        modifyTime: Date,
        objectType: "PAPER",
        likeCount: 0,
        isDeleted: false,
        objectId: this.paperData.id,
        },{
          headers: {
            'token': token
          }
        }
      ).then(res => {
        if(res.data.code == 200){
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getComments(this.curPage);
          // this.refreshPage(this.curPage);
          this.your_comment="";
        }
        else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
          this.your_comment="";
        }
      })
    },
    getComments(curPage){
      let token = localStorage.getItem('Token')
      this.$axios.get('/comment/queryByObjectId', {
        params: {
          objectId: this.paperData.id,
          page:curPage,
          limit:this.limit,
          objectType: "PAPER",
          // token: localStorage.getItem("Token"),
        },
        headers: {
          token: localStorage.getItem("Token"),
        },
        }
      ).then(res => {
        if(res.data.code == 200){
          this.comments=res.data.data.comments;
          this.totalpage=parseInt(res.data.data.total);
        }
        else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    onPageChange(curPage) {
      this.refreshPage(curPage);
    },
    refreshPage(curPage) {
      this.getComments(curPage);
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
  margin-left: 0%;
  margin-top: 0px;
  margin-right: 0%;
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
