<template>
  <v-app dark>
    <!--v-if="$route.name!=='login'"-->
    <HeaderBar />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: "NuxtJs UI kit | Free UI kit built with Vuetify",
      meta: [
        {
          hid: "description",
          name: "NuxtJs UI kit",
          content: "NuxtJs UI kit is the best way"
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
