<template>
  <v-container>
    <v-app-bar
      color="white"
      id="bar"
    >
      <v-row id="row">
        <div id="save">
          <v-btn color="#fec500" depressed small>保存草稿</v-btn>
        </div>
        <div id="title">
          <v-text-field
            class="mx-4"
            flat
            solo-inverted
            dense
          >标题</v-text-field>
        </div>
        <div id="area">
          <v-overflow-btn
            dense
            :items="dropdown_font"
            depressed small
            label="area"
          ></v-overflow-btn>
        </div>
        <div id="sub">
          <v-btn color="#316ce8" depressed small>发表草稿</v-btn>
        </div>
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
  margin-left: 200px;
}
#area{
  width: 200px;
  margin-left: 10px;
}
#sub{
  float: right;
  margin-left: 20px;
}

</style>
