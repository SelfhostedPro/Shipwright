<template>
  <v-app-bar app elevate-on-scroll color="primary">
    <v-img
      @click="$router.push('/')"
      :src="require('@/assets/logo.svg')"
      class="main-logo ml-5"
    />
    <v-toolbar-title
      @click="$router.push('/')"
      class="app-title ml-2 font-weight-bold"
    >
      Shipwright</v-toolbar-title
    >
  </v-app-bar>
</template>

<style scoped>
.main-logo {
  max-width: 47px;
  max-height: 32px;
  cursor: pointer;
}
.app-title {
  cursor: pointer;
}
</style>
