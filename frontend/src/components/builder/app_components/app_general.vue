<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row no-gutters>
        <v-col cols="2">
          General
        </v-col>
        <v-col cols="1" class="text--secondary">
          {{ app.title || app.name }}
        </v-col>
        <v-col cols="3" class="text--secondary">
          {{ app.image }}
        </v-col>
        <v-col cols="3" v-if="app.restart_policy">
          restart: {{ app.restart_policy }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-text-field
        label="Title"
        placeholder="Yacht"
        v-model="app.title"
        required
      />

      <v-text-field
        label="Name"
        placeholder="yacht"
        v-model="app.name"
        required
      />

      <v-text-field
        label="Image"
        placeholder="selfhostedpro/yacht"
        v-model="app.image"
        required
      />
      <v-combobox label="Categories" placeholder="Downloads" small-chips v-model="app.categories" multiple/>
      <v-text-field
        label="Platform"
        placeholder="linux"
        v-model="app.platform"
        disabled
      />
      <v-text-field
        label="Logo"
        placeholder="https://ycht.tech/assets/images/logo.svg"
        v-model="app.logo"
        required
      />
      <v-textarea label="Note" v-model="app.note" clearable no-resize rows="2"/>
      <v-select
        :items="['always', 'on-failure', 'unless-stopped']"
        label="Restart Policy"
        v-model="app['restart_policy']"
        required
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
    props: ["app"]
}
</script>