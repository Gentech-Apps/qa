import * as sortingData from "../fixtures/sortingData.js";
import commonPage from "./common.page.js";

class sortingPage {

    /**
     * Active tab- worker or Queue
     */
    activeTabWorkerAndQueue(tabname: string) {
        return cy.xpath(`//*[contains(@class,'active')]//following::div[text()='${tabname}']`)
    }

    /**
     * Click on Detail Vie Toggle or Table View Toggle
     */
    clickOnDetailTableView(id: string) {
        cy.waitForElement(commonPage.elementByDataId(id))
        cy.waitAndClick(commonPage.elementByDataId(id))
    }

    /**
     * Project name on Project Card
     */
    projectName(name: string) {
        return cy.xpath(`//*[@class='project-card']//following::span[text()='${name}']`, { timeout: 10000 })
    }
    
    /**
     * logged in to application
     */
    loginUsingEmail(email: string, password: string, type: string) {

        // enter email
        commonPage.elementById(sortingData.elements.usernameIdForOpen).should("be.visible").type(email)

        // enter password
        commonPage.elementById(sortingData.elements.passwordIdForOpen).should("be.visible").type(password)
        // enter on login button
        commonPage.elementById(sortingData.elements.passwordIdForOpen).should("be.visible").type('{enter}')
    }
}

export default new sortingPage()