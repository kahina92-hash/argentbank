const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // ✅ OBLIGATOIRE

  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
});