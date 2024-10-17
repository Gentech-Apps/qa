# Cypress Automation Of ML Application 
This project structure outlines a Cypress testing framework, featuring dedicated directories for fixtures, end-to-end tests, plugins, and support files. It includes essential configuration files like package.json and tsconfig.json, as well as a Python script for test data management. Instructions for initial setup and running tests in both headed and headless modes are provided to facilitate seamless automation testing.

# Structure
```
    Test
    ├── cypress
    │   ├── fixtures        # Used as a datastore for fake data
    │   ├── e2e     # Integration tests are added here (module wise)
    │   │   └── module
    │   │       └── **.spec.ts
    │   ├── plugins
    │   ├── pageObjects
    │   │        └── module.page.ts
    │   ├── report          # It contains the sample report
    │   ├── scripts         # It contains the python script to run cleanup and create data
    │   ├── downloads       # It contains downloaded file while test execution 
    │   └── support         # Project specific cypress customizations
    │      └── commands     # Custom commands can be added here
    │          └── **.ts
    │
    ├── docker
    ├── .gitignore
    ├── package.json
    ├── requirements.txt    # contains the requirements needs to be installed (this can be updated as per the projects requirement)
    ├── README.md
    ├── automation.config.ts        # Cypress config
    └── tsconfig.json               # TS config
```

## Initial setup

- install node and npm in your machine
- run `npm i` to install node_modules
## Python version
- install python version 3.11

### To work on SDK scripts only

- install python version 3.10 or greater
- run command `pip install test_demo`
- run command `test_demo init` and complete the configuration steps

## Running the tests - Headed

Open the Cypress Test Runner using the following command.

`npx cypress open`

## Running the tests - Headless

You can run cypress tests in headless mode using the following command.

`npx cypress run`

## Run your Cypress specs on the automation env with the below command:

`npx cypress run --config-file automation.config.ts`

## To Run single test in Cypress on the automation env

`npx cypress run --config-file automation.config.ts --spec cypress\e2e\example_sorting\TE_01.ts`