<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row no-gutters>
        <v-col cols="2">
          Advanced
        </v-col>
        <v-col cols="2" class="text--secondary" v-if="app.command.length > 0">
          {{ "Commands: " + app.command.length }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-expansion-panels flat accordion multiple focusable>
        <v-expansion-panel>
          <v-expansion-panel-header color="foreground">
            <v-row no-gutters>
              <v-col cols="2">Command</v-col>
              <v-col cols="4" class="text--secondary">
                (Container Commands)
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="foreground" class="mt-5">
            <transition-group
              name="slide"
              enter-active-class="animated fadeInLeft fast-anim"
              leave-active-class="animated fadeOutLeft fast-anim"
            >
              <v-row v-for="(item, index) in app.command" :key="index">
                <v-col>
                  <v-text-field
                    :label="'Command ' + index + ':'"
                    v-model="app.command[index]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn
                    icon
                    class="align-self-center"
                    @click="removeCommand(index)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </transition-group>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn icon class="align-self-center" @click="addCommand">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="foreground">
            <v-row no-gutters>
              <v-col cols="2">Devices</v-col>
              <v-col cols="4" class="text--secondary">
                (Passthrough Devices)
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="foreground">
            <transition-group
              name="slide"
              enter-active-class="animated fadeInLeft fast-anim"
              leave-active-class="animated fadeOutLeft fast-anim"
            >
              <v-row v-for="(item, index) in app.devices" :key="index">
                <v-col>
                  <v-text-field
                    label="Container"
                    v-model="item['container']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Host"
                    v-model="item['host']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn
                    icon
                    class="align-self-center"
                    @click="removeDevices(index)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </transition-group>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn icon class="align-self-center" @click="addDevices">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="foreground">
            <v-row no-gutters>
              <v-col cols="2">Labels</v-col>
              <v-col cols="4" class="text--secondary">
                (Container Labels)
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="foreground">
            <transition-group
              name="slide"
              enter-active-class="animated fadeInLeft fast-anim"
              leave-active-class="animated fadeOutLeft fast-anim"
            >
              <v-row v-for="(item, index) in app.labels" :key="index">
                <v-col>
                  <v-text-field
                    label="Label"
                    v-model="item['label']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Value"
                    v-model="item['value']"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Variable"
                    v-model="item['variable']"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn
                    icon
                    class="align-self-center"
                    @click="removeLabels(index)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </transition-group>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn icon class="align-self-center" @click="addLabels">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="foreground">
            <v-row no-gutters>
              <v-col cols="2">Sysctls</v-col>
              <v-col cols="4" class="text--secondary"> (Kernel Options) </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="foreground">
            <transition-group
              name="slide"
              enter-active-class="animated fadeInLeft fast-anim"
              leave-active-class="animated fadeOutLeft fast-anim"
            >
              <v-row v-for="(item, index) in app.sysctls" :key="index">
                <v-col>
                  <v-text-field
                    label="Name"
                    v-model="item['name']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Value"
                    v-model="item['value']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn
                    icon
                    class="align-self-center"
                    @click="removeSysctls(index)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </transition-group>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn icon class="align-self-center" @click="addSysctls">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="foreground">
            <v-row no-gutters>
              <v-col cols="2">Capabilities</v-col>
              <v-col cols="4" class="text--secondary">
                (Special Permissions/Capabilities)
              </v-col>
            </v-row></v-expansion-panel-header
          >
          <v-expansion-panel-content color="foreground">
            <v-select
              v-model="app['cap_add']"
              :items="cap_options"
              label="Add Capabilities"
              multiple
              hide-selected
              clearable
              chips
              deletable-chips
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="foreground">
            <v-row no-gutters>
              <v-col cols="2">Runtime</v-col>
              <v-col cols="4" class="text--secondary">
                (CPU/MEM Limits)
              </v-col>
            </v-row></v-expansion-panel-header
          >
          <v-expansion-panel-content color="foreground">
            <v-text-field v-model="app['cpus']" label="CPU Cores:" clearable />
            <v-text-field
              v-model="app['mem_limit']"
              label="Memory Limit:"
              placeholder="(1000b,100k,10m,1g)"
              clearable
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
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
        "BLOCK_SUSPEND"
      ]
    };
  },
  props: ["app"],
  methods: {
    addCommand() {
      this.app.command.push("");
    },
    removeCommand(index) {
      this.app.command.splice(index, 1);
    },
    addDevices() {
      this.app.devices.push({ container: "", host: "" });
    },
    removeDevices(index) {
      this.app.devices.splice(index, 1);
    },
    addLabels() {
      this.app.labels.push({ label: "", value: "", variable: "" });
    },
    removeLabels(index) {
      this.app.labels.splice(index, 1);
    },
    addSysctls() {
      this.app.sysctls.push({ name: "", value: "" });
    },
    removeSysctls(index) {
      this.app.sysctls.splice(index, 1);
    }
  }
};
</script>
