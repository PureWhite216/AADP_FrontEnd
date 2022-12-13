<template>
  <v-app dark>
    <!--v-if="$route.name!=='login'"-->
    <HeaderBar />
    <v-main style="background-color: rgb(217,227,234)">
      <nuxt />
    </v-main>
<!--    <FooterBar />-->
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: "ResearchOcean",
      meta: [
        {
          hid: "description",
          name: "ResearchOcean",
          content: "ResearchOcean"
        }
      ]
    };
  },
  components: {
    HeaderBar: () => import("@/layouts/sections/HeaderBar"),
    FooterBar: () => import("@/layouts/sections/FooterBar")
  },
  methods: {}
};
</script>

<style></style>
