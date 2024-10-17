class commonPage {

    /**
     * Get element by element id
     */
    elementById(value: string) {
        return cy.get(`#${value}`, { timeout: 10000 })
    }

    /**
    * Get element by data-id
    */
    elementByDataId(value: string) {
        return cy.get(`[data-id='${value}']`, { timeout: 10000 })
    }

    /**
     * Get element by element id xpath
     */
    elementDataIdByXpath(value: string) {
        return cy.xpath(`//*[@data-id='${value}']`)
    }

    /**
     * sort table column xpath
     */
    sortTableColumn(colName: string, colIndex: string) {
        return cy.xpath(`(//th[${colIndex}]//*[contains(@class, 'menu-button') and contains(text(), '${colName}')])[1]`)
    }

    /**
     * select column be name
     */
    selectColumnByName(name: string) {
        return cy.xpath(`//div[@class='list-container']//div[text()='${name}']/ancestor::div[@role='menuitem']//span[@role='button']`)
    }
    
    /**
     * click on the sidebar option
     */
    clickOnSideBarOption(tabName : string, title : string) {
        cy.waitAndClick(this.elementDataIdByXpath(tabName))
        cy.verifyPageTitle(title)
    }
    
    /**
     * Active tab- worker or Queue
     */
    activeTabWorkerAndQueue(tabname : string){
     return cy.xpath(`//*[contains(@class,'active')]//following::div[text()='${tabname}']`)
    }

 }
 
 export default new commonPage()