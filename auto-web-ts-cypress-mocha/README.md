

## Project and Framework Description and Setup

This directory contains an automation framework built with Cypress for testing a 'Recruitment Portal' web application featuring dedicated directories for fixtures, end-to-end tests, plugins, and support files. It includes essential configuration files like package.json and tsconfig.json etc. The framework is designed to ensure the application’s functionality, API, security, usability and end-to-end testing. 

Recruitment portal - 
It is web application designed to streamline recruitment  and employee assessment processes in HR AND ED-TECH DOMAIN
Here are the  Key features of application:
1. User management 
2. Drive and Test  creation 
3. Automatic Grading 
4. Enhanced Interview process

Instructions for initial setup and running tests in both headed and headless modes are provided to facilitate seamless automation testing.

## Initial setup

- install node and npm in your machine
- run `npm i` to install node_modules
- run `npm install cypress --save-dev` to install cypress

## Code/Folder structure
```
    $ web-auto-ts-cypress
        .
        ├── E2E               ## contains the testing specs
        │   └── modules 
        │      └─ **.spec.ts
        │
        ├── Fixtures          ## Storage section for data and files
        │   └─ dataFile.js
        │   
        │   
        │
        ├── PageObjects       ## contains the methods and functions to be used in test cases
        │
        ├── Plugins
        │   ├── credentials.json
        │   ├── index.js
        │   └── token.json   
        │
        ├── reports
        │   ├── html
        │   │    └── assets
        │   └── index.html   
        │
        ├──Support
        │  ├── command.ts     ## to store the custom commands 
        │  ├── e2e.ts 
        │  └── index.d.ts     
        │
        │
        ├── cypress.config.ts   ## to configure cypress
        │
        ├── package.json        ## list all the dependencies
        │
        ├── tsconfig.json
        │
        ├── .gitignore
        │
        └── README.md
```

## For Execution of Tests

## Headed

Open the Cypress Test Runner using the following command.

`npx cypress open`

## Headless

You can run cypress tests in headless mode using the following command.

`npx cypress run`

## Framework used - Cypress 
## Other Dependencies -

- moment.js
- faker.js
- gmail-tester
- cypress-mochawesome-reporter
- cypress-xpath