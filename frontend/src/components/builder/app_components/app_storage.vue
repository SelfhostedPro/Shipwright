<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row no-gutters>
        <v-col cols="2">
          Storage
        </v-col>
        <v-col cols="2" class="text--secondary" v-if="app.volumes.length > 0">
          {{ "Volumes: " + app.volumes.length }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <h3 class="text-center">
        Volumes <br />
        <v-btn
          fab
          elevation="0"
          color="primary"
          x-small
          @click="addVolume()"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </h3>
      <v-row
        v-for="(volume, volume_index) in app.volumes"
        :key="'volume-' + volume_index"
      >
        <v-col cols="1">
          <v-btn
            class="removeButton ml-5"
            icon
            @click="removeVolume(volume_index)"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
        <v-col>
          <v-text-field
            label="Variable"
            placeholder="!config"
            v-model="volume['variable']"
            required
          />
        </v-col>
        <v-col>
          <v-text-field
            label="Host"
            placeholder="/yacht/image/share"
            v-model="volume['bind']"
            required
          />
        </v-col>
        <v-col>
          <v-text-field
            label="Container"
            placeholder="/share"
            v-model="volume['container']"
            required
          />
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["app"],
  methods: {
    addVolume() {
      this.app.volumes.push({
        container: "",
        bind: "",
      });
    },
    removeVolume(volume_index) {
      this.app.volumes.splice(volume_index, 1);
    },
  },
};
</script>
