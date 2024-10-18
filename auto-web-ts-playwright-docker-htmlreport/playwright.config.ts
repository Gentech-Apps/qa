import { defineConfig, devices } from '@playwright/test';
import { automationData } from './data/automationData';

var baseUrl = automationData.baseUrl

export default defineConfig({
  testDir: './playwright/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 3 * 60 * 1000,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
    screenshot: 'only-on-failure',
    // Emulates the user locale.
    locale: 'en-US',

    // Emulates the user timezone.
    timezoneId: 'Asia/Kolkata',
    ignoreHTTPSErrors: true,
    video: 'on',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': '*/*',
    },
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chromium'],
        headless: false,
        // viewport: { width: 1280, height: 720 },
        viewport: null,
        launchOptions: {
          args: ["--start-maximized", "--incognito"]
        }
      }
    }
  ]
})
