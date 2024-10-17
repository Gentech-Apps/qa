declare namespace Cypress {
    interface Chainable {
      waitForPageLoad(method:string,url:string) : Cypress.Chainable<Element>;
      getActivationLink(from:string,subject:string,to:string) : Cypress.Chainable<String>;
      getExamineeResultEmail(from:string,subject:string,to:string) : Cypress.Chainable<String>;
      getRegistrationSuccessfulEmail(from:string,subject:string,to:string) : Cypress.Chainable<string>;
      loginUsingAPI() : Cypress.Chainable<string>;
      activateRegistrationOfDrive(id: number) : Cypress.Chainable<string>;
      activateTestOfDrive(id: number) : Cypress.Chainable<string>;
      deactivateRegistrationOfDrive(id: number) : Cypress.Chainable<string>;
      deactivateTestOfDrive(id: number) : Cypress.Chainable<string>;
    }
  }