<template>
  <v-container>
    <v-app-bar
      color="white"
      id="bar"
    >
      <v-row id="row">
        <div id="save">
<!--          <v-btn color="#fec500" depressed small @click="pubResearch">保存草稿</v-btn>-->
        </div>
        <div id="title">
          <v-text-field
            class="mx-4"
            flat
            solo-inverted
            dense
            v-model="title"
            placeholder="请输入标题"
          >标题</v-text-field>
        </div>
        <div id="area">
<!--          <v-overflow-btn-->
<!--            dense-->
<!--            :items="dropdown_font"-->
<!--            depressed small-->
<!--            label="领域选择"-->
<!--            v-model="field"-->
<!--          ></v-overflow-btn>-->
        </div>
        <div id="sub">
          <v-btn color='primary' @click="pubResearch">发表</v-btn>
        </div>
      </v-row>

    </v-app-bar>
    <br>
    <v-card>
      <v-textarea
        name="input-7-1"
        filled
        label="输入摘要"
        auto-grow
        v-model="abstract"
      >
      </v-textarea>
    </v-card>
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
      dropdown_font: ['文学', '理学', '工学', '农学', '商学', '医学', '艺术'],
      abstract: '',
      title:'',
      field:'理学',
      researchContent:'',
    }
  },
  destroyed() {
  },
  methods: {
    pubResearch(){
        this.researchContent =this.$refs.richTextEditor.getJsonContent().slice(7, -1);
        console.log(this.researchContent);
        this.$axios.post("/research/createResearch",{
          researchAbstract:this.abstract,
          researchContent:this.researchContent,
          researchField:this.field,
          researchTitle:this.title,
          researchUserId:localStorage.getItem("userID"),
        })
        .then(res=> {
          if(res.data.code == 200){
            this.$message.success("研究发表成功！")
          }else{
            console.log(res)
            this.$message.error("Research Create Error!")
          }
        })
    }
  }
}
</script>

<style scoped>
#bar{
  width: 1200px;
  height: 20px;
}
#row{
  width: 1200px;
  height: 20px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
}
#save{
  margin-left: 20px;
}
#title{
  width: 400px;
  margin-left: 300px;
}
#area{
  width: 200px;
  margin-left: 10px;
}
#sub{
  float: right;
  margin-left: 0px;
  margin-bottom: 0px;
}

</style>
