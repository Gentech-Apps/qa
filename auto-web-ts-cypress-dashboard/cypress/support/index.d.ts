declare namespace Cypress{
    interface Chainable {
        createResourceUsingAPI(apiKey: string, firstname: string, email: string): Cypress.Chainable<Element>;
        createProjectUsingAPI(apiKey: string, projectName: string): Cypress.Chainable<Element>;
        deleteProjects(apiKey: string): Cypress.Chainable<Array<string>>;
        getAllProjects(apiKey: string): Cypress.Chainable<Array<string>>;
        deleteResources(apiKey: string): Cypress.Chainable<Array<string>>;
        getAllResources(apiKey: string): Cypress.Chainable<Array<string>>;
        deleteAllUnassigned(apiKey: string, date: string): Cypress.Chainable<Element>;
        deleteAllClients(apiKey: string, date: string): Cypress.Chainable<Element>;
        deleteAllProjectTags(apiKey: string, date: string): Cypress.Chainable<Element>;
        deleteAllResourceTags(apiKey: string, date: string): Cypress.Chainable<Element>;
        deleteAllProjectCustomFields(apiKey: string, date: string): Cypress.Chainable<Element>;
        deleteAllResourceCustomFields(apiKey: string, date: string): Cypress.Chainable<Element>;
        deleteAllFixedCostCategories(apiKey: string, date: string): Cypress.Chainable<Element>;
        deleteAllEvent(apiKey: string, date: string): Cypress.Chainable<Element>;
    }
}