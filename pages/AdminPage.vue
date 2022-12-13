<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          height="400"
          width="256"
          class="mx-auto"
        >
          <v-navigation-drawer>
            <v-list
              nav
            >
              <v-list-item @click="flag = 0">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>用户认证</v-list-item-title>
              </v-list-item>
              <v-list-item @click="flag = 1">
                <v-list-item-icon>
                  <v-icon>mdi-book</v-icon>
                </v-list-item-icon>
                <v-list-item-title>学术成果认领</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col>
        <v-sheet
          min-width="800px"
        >
          <template v-if="flag === 0">
            <v-data-table
              v-model="selected"
              :headers="headers1"
              :items="request1"
              item-key="operatorName"
              show-select
              class="elevation-1"
            >
              <template v-slot:top>
                <div style="margin: 10px">
                  <v-btn tile small color="success">通过</v-btn>
                  <v-btn tile small color="error">拒绝</v-btn>
                </div>
              </template>
            </v-data-table>
          </template>
          <template v-if="flag === 1">
            <v-data-table
              v-model="selected"
              :headers="headers2"
              :items="request2"
              item-key="operatorName"
              show-select
              class="elevation-1"
            >
              <template v-slot:top>
                <div style="margin: 10px">
                  <v-btn tile small color="success">通过</v-btn>
                  <v-btn tile small color="error">拒绝</v-btn>
                </div>
              </template>
            </v-data-table>
          </template>
        </v-sheet>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
export default {
  name: "AdminPage",
  created() {
    this.getTasks(1, 10, "INSTITUTION");
  },
  methods : {
    changeFlag(flag) {
      this.flag = flag;
      this.restore(flag)
    },
    getTasks(curPage = 1,limit = 10, type = "INSTITUTION"){
      this.tasks=[];
      this.$axios.get("/user/listAllTask",{
        params: {
          type: type,
          page: curPage,
          limit: limit,
        },
        headers: {
          'token':localStorage.getItem("Token")
        }
      })
        .then(res=> {
          if(res.data.code == "200"){
            this.tasks = res.data.tasks
          }else {
            this.$message.error("No Apply!");
          }
        })
    }
  },
  data () {
    return {
      flag: 0,
      tasks: [],
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      right: null,
      selected: [],
      headers1: [
        {
          text: '姓名',
          align: 'start',
          sortable: false,
          value: 'operatorName',
        },
        { text: '机构', value: 'institutionName' },
      ],
      headers2: [
        {
          text: '姓名',
          align: 'start',
          sortable: false,
          value: 'operatorName',
        },
        { text: '机构', value: 'institutionName' },
        { text: '学术成果名称', value: 'paperTitle' },
      ],
      request1: [
        {
          operatorName: 'Mike',
          institutionName: 'BUAA'
        },
        {
          operatorName: 'Jack',
          institutionName: 'BUAA'
        },
      ],
      request2: [
        {
          operatorName: 'Mike',
          institutionName: 'BUAA',
          paperTitle: 'AAAAAAAAAA'
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
