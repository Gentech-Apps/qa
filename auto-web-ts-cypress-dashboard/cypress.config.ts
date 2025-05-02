import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    username: 'test.account@gmail.com',
    password: 'testpassword1',
    userApiKey: '********'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
