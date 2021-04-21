<template>
  <div class="mt-3">
    <v-row justify="center">
      <v-card>
        <v-card-title class="ml-5">
          Builder
        </v-card-title>
        <v-card-text class="ml-5">
          Welcome to the Shipwright Builder! You can use this tool to generate
          templates for <del>Portainer</del> and Yacht. This is still a work in
          progress so there may be some bugs here or there.
        </v-card-text>
        <v-text-field
          style="width: 50%;"
          class="ml-10"
          v-model="form.title"
          label="Template Title"
        />
        <v-expansion-panels :value="0">
          <v-expansion-panel
            v-for="(app, index) in form.containers"
            :key="'app-' + index"
          >
            <v-expansion-panel-header color="secondary">
              <v-row no-gutters style="max-height: 20px;">
                <v-col cols="1"
                  ><v-btn icon color="red" x-small @click="removeApp(index)"
                    ><v-icon>mdi-minus</v-icon></v-btn
                  >
                </v-col>
                <v-col cols="1" v-if="app.logo">
                  <img style="max-height: 20px;" :src="app.logo" />
                </v-col>
                <v-col cols="1">{{ app.name || "App " + index }}</v-col>
                <v-col cols="2" class="text--secondary">
                  {{ app.image || "No Image" }}
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="secondary">
              <v-expansion-panels>
                <AppGeneral :app="app" />
                <AppNetwork :app="app" />
                <AppStorage :app="app" />
                <AppEnvironment :app="app" />
                <AppAdvanced :app="app" />
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-row>
    <v-row>
      <v-btn class="mt-10 ml-5" color="error" fab @click="clearTemplate()"
        ><v-icon>mdi-trash-can-outline</v-icon></v-btn
      >
      <v-dialog
        v-model="importDialog"
        max-width="400"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-10 ml-5" color="error" fab v-bind="attrs" v-on="on"
            ><v-icon>mdi-archive-arrow-up-outline</v-icon></v-btn
          >
        </template>
        <v-card style="overflow: hidden;">
          <v-row>
            <v-col cols="1">
          <v-btn @click="importDialog=false;" icon class="mt-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
            </v-col>
            <v-col>
          <v-tabs v-model="importTab">
            <v-tab>
              Shipwright
            </v-tab>
            <v-tab>
              Portainer
            </v-tab>
            <v-tab>
              Other
            </v-tab>
          </v-tabs>
          </v-col>
          </v-row>
          <v-tabs-items v-model="importTab">
            <v-tab-item>
              <ShipwrightImport v-bind:form="form" v-on:import="importTemplate($event); importDialog=false" />
            </v-tab-item>
            <v-tab-item>
              <PortainerImport v-bind:form="form" v-on:import="importTemplate($event); importDialog=false" />
            </v-tab-item>
            <v-tab-item>
              <v-card-title>
                Comming Soon!
              </v-card-title>
              <v-card-text>
                Other types of imports are coming soon!
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-dialog>
      <v-spacer />
      <v-btn class="mt-10 mr-5" color="primary" fab @click="addApp()"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <v-btn class="mt-10 mr-5" color="primary" fab @click="saveTemplate()"
        ><v-icon>mdi-content-save-outline</v-icon></v-btn
      >
      <v-btn class="mt-10 mr-5" color="primary" fab @click="printForm()"
        ><v-icon>mdi-check</v-icon></v-btn
      >
    </v-row>
  </div>
</template>

<script>
// Import Functions
import { generateTemplate } from "@/assets/js/templateGenerator.js";
// Import Components
import ShipwrightImport from "./import_components/import_export";
import PortainerImport from "./import_components/import_portainer";

// Form Components
import AppGeneral from "./app_components/app_general";
import AppNetwork from "./app_components/app_networking";
import AppStorage from "./app_components/app_storage";
import AppEnvironment from "./app_components/app_environment";
import AppAdvanced from "./app_components/app_advanced";
export default {
  components: {
    AppGeneral: AppGeneral,
    AppNetwork: AppNetwork,
    AppStorage: AppStorage,
    AppEnvironment: AppEnvironment,
    AppAdvanced: AppAdvanced,
    ShipwrightImport: ShipwrightImport,
    PortainerImport: PortainerImport,
  },
  data() {
    return {
      e6: 1,
      importDialog: false,
      importTab: 0,
      form: {
        title: "",
        containers: [
          {
            title: "",
            name: "",
            image: "",
            description: "",
            categories: [],
            platform: "linux",
            note: "",
            restart_policy: "",
            ports: [],
            volumes: [],
            env: [],
            command: [],
            devices: [],
            labels: [],
            sysctls: [],
            cap_add: [],
          },
        ],
      },
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
      this.form.containers.push({
        title: "",
        name: "",
        image: "",
        description: "",
        categories: [],
        platform: "linux",
        note: "",
        restart_policy: "",
        ports: [],
        volumes: [],
        env: [],
        command: [],
        devices: [],
        labels: [],
        sysctls: [],
        cap_add: [],
      });
    },
    importTemplate: function (template){
      this.form = template
      localStorage.setItem("Current Template", JSON.stringify(this.form))
    },
    removeApp(index) {
      this.form.containers.splice(index, 1);
    },
    printForm() {
      generateTemplate(this.form);
    },
    clearTemplate() {
      localStorage.removeItem("Current Template");
      this.form = {
        title: "",
        containers: [
          {
            title: "",
            name: "",
            image: "",
            description: "",
            categories: [],
            platform: "linux",
            note: "",
            restart_policy: "",
            ports: [],
            volumes: [],
            env: [],
            command: [],
            devices: [],
            labels: [],
            sysctls: [],
            cap_add: [],
          },
        ],
      };
    },
    saveTemplate() {
      localStorage.setItem("Current Template", JSON.stringify(this.form));
    },
  },
  beforeMount() {
    window.addEventListener("beforeUnload", this.saveTemplate);
  },
  beforeDestroy() {
    localStorage.setItem("Current Template", JSON.stringify(this.form));
  },
  async created() {
    let check_template = await localStorage.getItem("Current Template");
    if (check_template) {
      this.form = await JSON.parse(check_template);
    }
  },
};
</script>

<style>
html {
  background-color: black;
}
</style>
