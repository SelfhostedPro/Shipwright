<template>
  <v-app>
    <TopBar />
    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from "./components/layout/TopBar";
export default {
  components: {
    TopBar: TopBar
  },
  name: "App",

  data: () => ({
    //
  })
};
</script>
