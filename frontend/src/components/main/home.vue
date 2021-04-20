<template>
  <v-container class="mt-10">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Shipwright
        </h1>

        <p class="subheading font-weight-regular">
          This is a tool to help you build templates for various docker UIs.
        </p>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" class="mr-5" :to="{ name: 'builder' }">
              Get Started
            </v-btn>
            <v-btn href="https://github.com/SelfhostedPro/Shipwright" target="_blank" class="ml-5">
              View Source Code
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
