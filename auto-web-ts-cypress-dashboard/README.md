# E2E Automation Test Suite

### Cypress Automation of Resource Management Application
This project structure outlines a Cypress testing framework, featuring dedicated directories for fixtures, end-to-end tests, plugins, and support files. It is designed to test the functionality and reliability of a resource management application. The framework includes essential configuration files like package.json and tsconfig.json, along with instructions for initial setup and running tests in both headed and headless modes to facilitate seamless automation testing.

### Folder Structure

```bash
├── cypress
│   ├── fixtures        # Contains mock data used for testing purposes
│   ├── integration     # Integration tests are added here, organized by application modules or features
│   │   └── module
│   │       └── **.spec.ts
│   ├── plugins
│   └── support         # Contains reusable utilities, custom commands, and configuration overrides for Cypress
│      └── commands     # Custom commands can be added here
│          └── **.ts
│
├── package.json
├── README.md
├── cypress.json        # Cypress config
└── tsconfig.json       # TS config

```

## Initial setup

- Install Node.js and npm on your machine. You can follow the official installation guide [here](https://nodejs.org/).
- run `npm i` to install node_modules

## Running the tests - Headed

Open the Cypress Test Runner using the following command.

```
npx cypress open
```

## Running the tests - Headless

You can run cypress tests in headless mode using the following command.

```
npx cypress run
```
## Running Cypress specs in a specific environment

The `cypress.config.ts` file is a TypeScript configuration file for Cypress that allows you to define custom settings, such as base URLs, environment variables, and test-specific configurations. Ensure this file is properly set up before running the command below.

```
npx cypress run --config-file cypress.config.ts

## Running the tests - Open with Cypress environment

```
npx cypress open --config-file cypress.config.ts
```