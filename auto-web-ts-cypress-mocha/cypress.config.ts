import { defineConfig } from "cypress";

export default defineConfig({
  waitForAnimations: false,
  animationDistanceThreshold: 50,
  video: true,
  viewportHeight: 900,
  viewportWidth: 1440,
  numTestsKeptInMemory: 100,
  requestTimeout: 45000,
  responseTimeout: 45000,
  pageLoadTimeout: 160000,

  env: {
    username : 'username',
    password: 'password'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://localhost:1880',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 20000,
  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions :{
    reportDir : "cypress/report/html",
    embeddedScreenshots: true,
    video: true
  },

  "retries": {
    // Configure retry attempts for `cypress run`
    // Default is 0
    "runMode": 0,
    // Configure retry attempts for `cypress open`
    // Default is 0
    "openMode": 0
  }
});
