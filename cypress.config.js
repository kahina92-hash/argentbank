const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // ici tu peux ajouter des plugins si besoin
    },

    video: true, // ✅ ICI (bon endroit)
  },
});