<template>
  <v-app>
    <TopBar />
    <v-main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
