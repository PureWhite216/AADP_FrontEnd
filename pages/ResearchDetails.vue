<template>
    <div>
      <div class="text-center" id="whole">
        <div class="inline_div" id="div_photo">
            <img  :src=this.photo width="100" height="100" />
            
        </div>
  
        <div class="inline_div" id="div_name">
            <p style="font-size: 30px; color: black;">{{this.name}}</p>
            <p style="font-size: 20px; color: black;">{{this.belong}}</p>
        </div>

        
        <v-divider :inset="inset" light class="divier" ></v-divider>
        <v-divider :inset="inset" light class="divier" ></v-divider>
        <v-divider :inset="inset" light class="divier" ></v-divider>
        <div id="div_abstrct">
          <p style="font-size: 30px; color: black; text-align: left; margin-left: 45%; margin-top: 3%;">{{this.title}}</p>
          <p class="abstrct">{{this.abstractdetail}}</p>
        </div>
        <v-divider :inset="inset" light class="divier" ></v-divider>
        <v-divider :inset="inset" light class="divier" ></v-divider>
        <v-divider :inset="inset" light class="divier" ></v-divider>
        <div id="div_abstrct">
          <p class="abstrct">{{this.ResearchDetail}}</p>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ResearchDetails',
    components: {  },
    data(){
      return{
        name:"张三",
        belong:"所属单位",
        authorname:"张三",
        keyword:"人工智能",
        title:"标题",
        referencedetail:"参考文献",
        ResearchDetail:"super 2021 super 2021super 2021super 2021super 2021super 2021super 2021super 2021 super 2021super 2021super 2021super 2021super 2021super 2021super 2021 super 2021super 2021super 2021super 2021super 2021super 2021",
        sum_aca_achv:10,
        sum_research:5,
        sum_quoted:233,
        photo:"https://i.postimg.cc/gkkS27qW/src-http-ci-xiaohongshu-com-8e9d9fd3-d21e-51ae-8455-99219ee7d081-image-View2-2-w-1080-format-jpg-re.webp",
      }
    },
  
    methods: {
  
    },
  }
  </script>
  
  <style scoped>
  .inline_div{
    display: inline-block;
    vertical-align: top;
    margin-top: 30px;
    margin-left: 10px;
  }
  .paperinfo{
    margin-left: 120px;
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
    margin-left: 14%;
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
  #div_photo{
    margin-left: 20px;
  }
  #div_abstrct{
    margin-left: 10px;
    margin-bottom: 40px;
  }
  
  #whole{
    width: 1000px;
    min-height: 1200px;
    vertical-align: middle;
    margin: 20px auto 20px;
    background-color: rgb(240, 240, 238);
  }
  #div_name{
    margin-left:50px;
    margin-right: 600px;
    margin-top: 40px;
  }
  table th{
    padding-left: 100px;
  }
  </style>
  