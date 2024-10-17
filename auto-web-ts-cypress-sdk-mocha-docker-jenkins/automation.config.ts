import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: "cypress/report",
  },

  env: {
    "grepFilterSpecs": true,
    primaryUsername: 'primary',
    primaryPassword: 'Password',
    userid: '12345678', //user1 Admin
    userid_1 : '123456789', //user2 Admin
    userid_2 : '1234567890', // user3 Admin
    userid_3 : '1234567891', // non admin user
    secondaryUsername : 'secondary',
    secondaryPassword : 'Password',
    tertiaryUsername : 'tertiary',
    tertiaryPassword : 'Password',
    server: 'AUTOMATION',
    bitBucketemail: "test@gmail.com",
    bitBucketPassword: "samplepass",
    gmailEmailID: "test@gmail.com",
    gmailPassword: "samplepass",
    gitEmailID: "test@gmail.com",
    gitPassword: "samplepass",
    COOKIE_NAME: "demo_token",
    SITE_NAME: "https://app.demotest.ai/",
    ScriptPath: "Scripts",
    ApiPath: "https://app.demotest.ai/api/*/",
    APiVersion: "77.0",
    gitUser : "gituser",
    gitAccessToken : "gitaccess",

  },
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
          require('cypress-mochawesome-reporter/plugin')(on);
          return require('./cypress/plugins/index.js')(on, config)
        },
        baseUrl: 'https://app.demotest.ai/',
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
        defaultCommandTimeout: 40000,
        experimentalRunAllSpecs:true,
      },
})