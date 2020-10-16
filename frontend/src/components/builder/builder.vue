<template>
  <div>
    <v-row justify="center">
      <v-expansion-panels accordion :value="0">
        <v-expansion-panel
          v-for="(app, index) in containers"
          :key="'app-' + index"
        >
          <v-expansion-panel-header color="secondary">
            <v-row no-gutters>
              <v-col cols="1"
                ><v-btn icon color="red" x-small @click="removeApp(index)"
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
              </v-col>
              <v-col cols="1">{{ app.name || "App " + index }}</v-col>
              <v-col cols="4" class="text--secondary">
                ({{ app.image || "No Image" }})
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="secondary">
            <!--  ### General Section ###  -->
            <h2>General</h2>
            <v-text-field
              label="Name"
              placeholder="Yacht"
              v-model="app.name"
              required
            />

            <v-text-field
              label="Image"
              placeholder="selfhostedpro/yacht"
              v-model="app.image"
              required
            />

            <v-select
              :items="['always', 'on-failure', 'unless-stopped']"
              label="Restart Policy"
              v-model="app['restart_policy']"
              required
            />
            <!--  ### Networking Section ###  -->
            <h2>Networking</h2>
            <v-select
              :items="network_modes"
              label="Network Mode"
              clearable
              v-model="app.network_mode"
              :disabled="app.network !== undefined"
            />
            <h3 class="text-center">
              Ports <br />
              <v-btn
                fab
                elevation="0"
                color="primary"
                x-small
                @click="addPort(index)"
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
                  @click="removePort(index, port_index)"
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
                  placeholder="80"
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
            <!--  ### Storoage Section ###  -->
            <h2>Storage</h2>
            <h3 class="text-center">
              Volumes <br />
              <v-btn
                fab
                elevation="0"
                color="primary"
                x-small
                @click="addVolume(index)"
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
                  @click="removeVolume(index, volume_index)"
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
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
            <!--  ### Environment Section ###  -->
            <h2>Environment</h2>
            <h3 class="text-center">
              Environment Variables <br />
              <v-btn
                fab
                elevation="0"
                color="primary"
                x-small
                @click="addEnv(index)"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </h3>
            <v-row
              v-for="(env, env_index) in app.env"
              :key="'env-' + env_index"
            >
              <v-col cols="1">
                <v-btn
                  class="removeButton ml-5"
                  icon
                  @click="removeEnv(index, env_index)"
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
              </v-col>
              <v-col>
                <v-text-field label="label" v-model="env['label']" required />
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
      </v-expansion-panels>
    </v-row>
    <v-btn class="actionButton mt-10" color="primary" fab @click="addApp()"
      ><v-icon>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      e6: 1,
      containers: [
        {
          name: "",
          image: "",
          restart_policy: "",
          ports: [],
          volumes: [],
          env: [],
          devices: [],
          labels: [],
          sysctls: [],
          cap_add: [],
        },
      ],
      network_modes: ["bridge", "none", "host"],
      cap_options: [
        "SYS_MODULE",
        "SYS_RAWIO",
        "SYS_PACCT",
        "SYS_ADMIN",
        "SYS_NICE",
        "SYS_RESOURCE",
        "SYS_TIME",
        "SYS_TTY_CONFIG",
        "AUDIT_CONTROL",
        "MAC_ADMIN",
        "MAC_OVERRIDE",
        "NET_ADMIN",
        "SYSLOG",
        "DAC_READ_SEARCH",
        "LINUX_IMMUTABLE",
        "NET_BROADCAST",
        "IPC_LOCK",
        "IPC_OWNER",
        "SYS_PTRACE",
        "SYS_BOOT",
        "LEASE",
        "WAKE_ALARM",
        "BLOCK_SUSPEND",
      ],
    };
  },
  methods: {
    addApp() {
      this.containers.push({
        name: "",
        image: "",
        restart_policy: "",
        ports: [],
        volumes: [],
        env: [],
        devices: [],
        labels: [],
        sysctls: [],
        cap_add: [],
      });
    },
    removeApp(index) {
      this.containers.splice(index, 1);
    },
    addPort(index) {
      this.containers[index].ports.push({
        label: "",
        hport: "",
        cport: "",
        proto: "tcp",
      });
    },
    removePort(index, port_index) {
      this.containers[index].ports.splice(port_index, 1);
    },
    addVolume(index) {
      this.containers[index].volumes.push({
        container: "",
        bind: "",
      });
    },
    removeVolume(index, volume_index) {
      this.containers[index].volumes.splice(volume_index, 1);
    },
    addEnv(index) {
      this.containers[index].env.push({
        name: "",
        value: "",
      });
    },
    removeEnv(index, env_index) {
      this.containers[index].env.splice(env_index, 1);
    },
  },
};
</script>

<style scoped>
.actionButton {
  position: absolute;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.removeButton {
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
html {background-color: black}
</style>
