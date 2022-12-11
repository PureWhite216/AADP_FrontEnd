<template>
  <v-app dark>
    <!--v-if="$route.name!=='login'"-->
    <HeaderBar />
    <v-main style="background-color: #f2f2f2">
      <nuxt />
    </v-main>
    <Footer />
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
    Footer: () => import("@/layouts/sections/FooterBar")
  },
  methods: {}
};
</script>

<style></style>
