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
                <v-list-item-title>用户认证</v-list-item-title>
              </v-list-item>
              <v-list-item @click="flag = 1">
                <v-list-item-content>
                  <v-list-item-title>论文认领</v-list-item-title>
                </v-list-item-content>
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
              item-key="name"
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
              item-key="name"
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
  methods : {
    changeFlag(flag) {
      this.flag = flag;
      this.restore(flag)
    },
  },
  data () {
    return {
      flag: 0,
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
          value: 'name',
        },
        { text: '机构', value: 'institution' },
      ],
      headers2: [
        {
          text: '姓名',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '机构', value: 'institution' },
        { text: '论文名称', value: 'paperName' },
      ],
      request1: [
        {
          name: 'Mike',
          institution: 'BUAA'
        },
        {
          name: 'Jack',
          institution: 'BUAA'
        },
      ],
      request2: [
        {
          name: 'Mike',
          institution: 'BUAA',
          paperName: 'AAAAAAAAAA'
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
