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
              <v-list-item @click="userVerify">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>用户认证</v-list-item-title>
              </v-list-item>
              <v-list-item @click="paperVerify">
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
              :items="tasks"
              item-key="operatorName"
              show-select
              class="elevation-1"
            >
              <template v-slot:top>
                <div style="margin: 10px">
                  <v-btn tile small color="success" @click="batchOperate(true)">通过</v-btn>
                  <v-btn tile small color="error" @click="batchOperate(false)">拒绝</v-btn>
                </div>
              </template>
            </v-data-table>
          </template>
          <template v-if="flag === 1">
            <v-data-table
              v-model="selected"
              :headers="headers2"
              :items="tasks"
              item-key="operatorName"
              show-select
              class="elevation-1"
            >
              <template v-slot:top>
                <div style="margin: 10px">
                  <v-btn tile small color="success" @click="batchOperate(true)">通过</v-btn>
                  <v-btn tile small color="error" @click="batchOperate(false)">拒绝</v-btn>
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
  mounted() {
    let t = localStorage.getItem("isAdmin")
    console.log(t)
    if(!t)
    {
      console.log("Not Admin")
      this.$router.push("/MainPage")
    }
    this.userVerify();
  },
  methods : {
    changeFlag(flag) {
      this.flag = flag;
    },
    userVerify()
    {
      this.getTasks(1, 10, "INSTITUTION");
      this.changeFlag(0);
    },
    paperVerify()
    {
      this.getTasks(1, 10, "PAPER");
      this.changeFlag(1);
    },
    getTasks(curPage = 1,limit = 10, type){
      this.tasks=[];
      console.log(type);
      this.$axios.get("/user/listAllTask",{
        params: {
          type: type,
          page: curPage,
          limit: limit,
        },
        headers: {
          'token':localStorage.getItem("Token")
        }
      }).then(res=> {
          console.log(res.data);
          if(res.data.code == 200){
            this.tasks = res.data.data.tasks;
          }else {
            this.$message.error("No Apply!");
          }
        })
    },

    batchOperate(operation = true){
      console.log(this.selected);
      const taskIds = [];
      for(var item of this.selected)
      {
        // console.log(item);
        taskIds.push(item.taskId);
      }
      // console.log(taskIds);
      let token = localStorage.getItem('Token')
      this.$axios.post('/user/batchOperation', {
          operationType: operation,
          taskIds: taskIds
        },{
          operationType: operation,
          taskIds: taskIds,
          headers: {
            'token': token
          }
        }
      ).then(res => {
        //console.log(res)
        if(res.data.code == 200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          if(this.flag == 0)
          {
            this.getTasks(1, 10, "INSTITUTION");
          }
          else
          {
            this.getTasks(1, 10, "PAPER");
          }
        }
        else {
          this.$message({
            message: '操作失败',
            type: 'error'
          })
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
