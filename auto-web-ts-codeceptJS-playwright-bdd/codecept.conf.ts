
import "dotenv/config";

setCommonPlugins();
// let browserName = process.env.BROWSER_NAME
export const config: CodeceptJS.MainConfig = {
  tests: "./*_test.js",
  output: "./output",

  helpers: {
    Playwright: {
      url: process.env.ENV_URL,
      show: true,
      browser: "chromium",
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
  },

  gherkin: {
    features: "./features/*/*.feature",
    steps: "./src/step_definitions/*.ts",
  },

  include: {
    I: "./steps_file",

    loginPage: "./src/pages/loginPage.ts",
    buyerPortalPage: "./src/pages/buyerPortalPage.ts",
    buyerPortaldata: "./src/pages/buyerPortalData.ts",
  },

  mocha: {
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        stdout: "-",

        options: {},
      },

      mochawesome: {
        stdout: "./output/console.log",
        options: {
          reportDir: "./output",
          reportFilename: "report",
        },
      },

      "mocha-junit-reporter": {
        stdout: "./output/console.log",

        options: {
          mochaFile: "./output/result.xml",
          attachments: true, //add screenshot for a failed test
        },
      },
    },
  },

  plugins: {
    fakerTransform: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true,
      uniqueScreenshotNames: true,
    },
    // auto delay before and after any action
    autoDelay: {
      enabled: true,
    },
  },
  
  name: "B2B sales and marketing",
};
