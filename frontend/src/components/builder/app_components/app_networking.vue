<template>
  <v-expansion-panel>
    <!--  ### Networking Section ###  -->
    <v-expansion-panel-header>
      <v-row no-gutters>
        <v-col cols="2">
          Networking
        </v-col>
        <v-col cols="1" class="text--secondary">
          {{ app.network_mode }}
        </v-col>
        <v-col
          v-for="(port_label, port_label_index) in app.ports"
          :key="port_label_index"
          cols="1"
          class="text--secondary"
        >
          {{ port_label.label || port_label.hport }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-select
        :items="network_modes"
        label="Network Mode"
        clearable
        v-model="app.network_mode"
        :disabled="app.network !== undefined"
      />
      <h3 class="text-center">
        Ports <br />
        <v-btn fab elevation="0" color="primary" x-small @click="addPort()"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </h3>

      <v-row
        v-for="(port, port_index) in app.ports"
        :key="'port-' + port_index"
      >
        <v-col cols="1">
          <v-btn
            class="removeButton ml-5"
            icon
            @click="removePort(port_index)"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
        </v-col>
        <v-col>
          <v-text-field
            type="string"
            label="Label"
            placeholder="WebUI"
            v-model="port['label']"
          />
        </v-col>
        <v-col>
          <v-text-field
            type="number"
            label="Host"
            min="0"
            max="65535"
            v-model="port['hport']"
          />
        </v-col>
        <v-col>
          <v-text-field
            type="number"
            label="Container"
            placeholder="80"
            min="0"
            max="65535"
            v-model="port['cport']"
            required
          />
        </v-col>
        <v-col>
          <v-select
            :items="['tcp', 'udp']"
            label="Protocol"
            v-model="port['proto']"
            required
          />
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
      network_modes: ["bridge", "none", "host"],
    };
  },
  props: ["app"],
  methods: {
    addPort() {
      this.app.ports.push({
        label: "",
        hport: "",
        cport: "",
        proto: "tcp",
      });
    },
    removePort(port_index) {
      this.app.ports.splice(port_index, 1);
    },
  },
};
</script>
