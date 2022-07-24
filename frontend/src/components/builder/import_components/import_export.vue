<template>
  <div>
    <v-card-title>
      Import From Shipwright Export
    </v-card-title>
    <v-card-text>
      Upload your export.json from a previous Shipwright template export.
      <br />
      <b>Warning:</b> The form will be cleared when you do this.
    </v-card-text>
    <v-file-input
      style="max-width: 80%; margin-left: auto; margin-right: auto;"
      v-model="importFile"
      truncate-length="15"
      accept=".json"
    >
    </v-file-input>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="
          _importTemplate(importFile);
          importDialog = false;
        "
      >
        Import
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { importTemplate } from "@/assets/js/importTemplate.js";

export default {
  data() {
    return {
      importFile: null
    };
  },
  model: {
    prop: "form",
    event: "import"
  },
  props: ["form"],
  methods: {
    async _importTemplate(templateFile) {
      this.parentForm = await importTemplate(templateFile);
      localStorage.setItem("Current Template", JSON.stringify(this.parentForm));
    }
  },
  computed: {
    parentForm: {
      get: function() {
        return this.form;
      },
      set: function(value) {
        this.$emit("import", value);
      }
    }
  }
};
</script>
