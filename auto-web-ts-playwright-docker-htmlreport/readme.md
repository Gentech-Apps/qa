# Project Overview
This HRMS website serves as a comprehensive solution for managing employee data, payroll, benefits, recruitment, attendance, performance evaluation, and other HR-related processes. It aims to reduce manual effort, improve efficiency, and provide a centralized system for HR management.

# Framework Overview
This framework is an open-source automation framework for testing web applications. It supports multiple browsers (Chromium, Firefox, WebKit) and programming languages (JavaScript, Python, .NET, Java). It offers cross-platform support allowing tests to be executed on Windows, Linux, and macOS, both locally and on CI servers. It includes features like auto-wait to eliminate flaky tests and mobile emulation for testing on mobile browsers. It is designed to provide reliable and fast end-to-end testing for modern web applications.

# Project Initial Setup
Install node and npm in your machine
Run following command to install node_modules: npm i 

# Code/Folder Structure
    $ web-auto-ts-playwright
    .
    ├── e2e                           ## contains the testing specs
    │   └── modules 
    │      └ **.spec.ts
    │
    ├── data                          ## storage section for data and files
    │   └── automationData.ts
    │
    ├── pageObjects                   ## contains the methods and functions to be used in test cases
    │
    ├── sampleReport                   
    │    └── testReport.html          ## constains the report of the test run
    │
    ├── .gitignore
    │
    ├── Dockerfile
    │
    ├── package.json                  ## list all the dependencies
    │
    ├── playwright.config.ts          ## to configure playwright
    │
    ├── readme.md
    │
    └── tsconfig.json

# Running the tests - Headed with multiple workers
# Open the Playwright Test Runner using the following command.
npx playwright test

# Running the tests - Headed with single worker
# Open the Playwright Test Runner using the following command.
npx playwright test

# Running the tests - Headless
# You can run Playwright tests in headless mode using the following command.
npx playwright test --headed=false

# Running the tests - Headless with single worker
# You can run Playwright tests in headless mode using the following command.
npx playwright test --headed=false

# Run single spec file on the Playwright Test Runner using the below command:
# You can run test for a single spec file using the following command.
npx playwright test /e2e/dashboard/applyTimesheet/applyTimesheet.spec.ts

# Generate report for the current run
# You can generate report using the following command.
npx playwright show-report

