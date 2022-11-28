<template>
  <div>
    <v-app-bar
      color="white"
    >
      <v-col cols="12" sm="1">
        AADP
      </v-col>
      <v-col cols="12" sm="3">
        <v-tabs align-with-title >
          <v-tab>主页</v-tab>
          <v-tab>研究</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" sm="4">
        <v-row>
          <v-text-field
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="search something"
            solo-inverted
            width="500px"
          ></v-text-field>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" sm="3">
      </v-col>
      <v-col cols="12" sm="1">
        <v-avatar color="primary">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  data () {
    return {
      loading: false,
      search: null,
      select: null,
      items: [
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
        {
          time:"2022-11-25",
          type:"类型",
          quoted:"12",
          title: "Supermodel",
          authors: ["Foster the People","author1"],
          abstract:"abstract"
        },
      ],
    }
  },

}
</script>

<style scoped>

</style>
