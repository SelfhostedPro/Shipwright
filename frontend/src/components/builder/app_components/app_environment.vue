<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row no-gutters>
        <v-col cols="2">
          Environment
        </v-col>
        <v-col cols="3" class="text--secondary" v-if="app.env.length > 0">
          {{ "Environment Variables: " + app.env.length }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <h3 class="text-center">
        Environment Variables <br />
        <v-btn fab elevation="0" color="primary" x-small @click="addEnv()"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </h3>
      <v-row v-for="(env, env_index) in app.env" :key="'env-' + env_index">
        <v-col cols="1">
          <v-btn class="removeButton ml-5" icon @click="removeEnv(env_index)"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
        <v-col>
          <v-text-field label="Description" v-model="env['description']" />
        </v-col>
        <v-col>
          <v-text-field label="Label" v-model="env['label']" />
        </v-col>
        <v-col>
          <v-text-field label="Name" v-model="env['name']" required />
        </v-col>
        <v-col>
          <v-text-field label="Value" v-model="env['default']" required />
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["app"],
  methods: {
    addEnv() {
      this.app.env.push({
        name: "",
        default: ""
      });
    },
    removeEnv(env_index) {
      this.app.env.splice(env_index, 1);
    }
  }
};
</script>
