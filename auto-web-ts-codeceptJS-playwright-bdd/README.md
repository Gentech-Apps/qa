# Automation Test Suite

Testing Framework- Codeceptjs with playwright
About framework: CodeceptJS with Playwright is an end-to-end testing framework that simplifies writing and running browser-based tests. CodeceptJS provides a high-level API for easy test writing, while Playwright automates multiple browsers (Chromium, Firefox, WebKit). Features include automatic waiting, parallel execution, and headless mode, making tests faster and more reliable.

Test Formats - Behavior Driven Development

``` bash
auto-web-ts-codeceptJS-playwright-bdd
|──────── .github
|          └──.yaml
|────────  Feature
|          └──.feature               ## This contains fetaure file 
|──────── src
|          └── Data
|                └──.ts              ## This is a data file 
|          └── Pages
|                └──.ts              ## This is a page file 
|          └── step_definitions
|                └──.ts              ## This is a step file
|    
|────────  .env                         ## env file                     
|────────  cloud.conf.ts
|────────  codecept.conf.ts
|────────  package.json
|────────  pnpm-lock.yaml
|────────  README.md
|────────  steps.d.ts
|────────  tsconfig.json
|
└──....

## Prerequisite

Need to install following before setup:
`Node`
`npm`
`pnpm`

## Initial setup

`npm install -g pnpm`
`pnpm install`

## Update .env file with valid credentials before running test

## Running the tests locally -

`pnpm run local`

## Running the tests on lambdatest -

`pnpm run cloud`

## Browser settings

Need to execute test in different browser then change browser name in codecept.conf.ts file

For Example:

Chrome -
browser: 'chromium'

Safari -
browser: 'webkit'

Firefox -
browser: 'firefox'

### To build docker image

```

    docker build --no-cache --tag abc:v1.0 --file docker/Dockerfile .

```

### To run the container

```

    docker run -it --rm --name abc-local --env-file ./.env -v ./report:/app/output abc:v1.0 local

    or

    docker run -it --rm --name abc-cloud --env-file ./.env -v ./report:/app/output abc:v1.0 cloud

```
