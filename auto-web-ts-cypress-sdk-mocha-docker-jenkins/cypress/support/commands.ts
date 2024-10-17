
import * as cypress from "../../node_modules/cypress/index"
import commonPage from "../pageObjects/common.page"

/**
     * wait and click on the given element
     */
Cypress.Commands.add('waitAndClick', (locator) => {
    cy.waitUntil(() =>
        locator.then($text => {
            expect($text).to.be.exist
            locator.click({ force: true })
        })
    )
})

/**
     * wait and type on the given input field element
     */
Cypress.Commands.add('waitAndType', (locator, value) => {
    cy.waitUntil(() =>
        locator.then($text => {
            expect($text).to.be.exist
            locator.type(value, { force: true, delay: 100 })
        })
    )
})

/**
 * Get json response from sdk run and parse the data in json readable
 * fileName - generated json file from SDK run
 */
Cypress.Commands.add('getDataFromSDKRun', (fileName) => {
    cy.task("getFileData", { filename: fileName }).then((file) => {
        const data = JSON.parse(JSON.stringify(file))
        return data
    })
})

/**
     * wait and click on the given element
     */
Cypress.Commands.add('waitForElement', (locator) => {
    cy.waitUntil(() =>
        locator.should($text => expect($text).to.be.exist))
})

/**
     * Verify page title
     */
Cypress.Commands.add('verifyPageTitle', (title) => {
    cy.title().should('eq', title, { timeout: 20000 })
})


/**
     * login in to application
     */
Cypress.Commands.add('loginWithEmail', (url, username, password, server) => {
    cy.session([username], () => {

        // Launch application 
        cy.visit(url)

        // Verify home Page title
        cy.verifyPageTitle(loginData.elements.titleText)

        // Login in to the application 
        loginPage.loginUsingEmail(username, password, server)

        cy.verifyPageTitle("Title- Login")
        cy.url().should('contain', '/dashboard')
    }, {
        cacheAcrossSpecs: true,
        validate() {
            cy.visit('/dashboard')
            cy.verifyPageTitle(dashboardData.elements.dashboardTitle)
        }
    })

    cy.visit('/')
})

/**
     * Show hide column
     */
Cypress.Commands.add('showhideCol', (colName, colStatus) => {
    var columns = colName.split(',')
    cy.waitAndClick(commonPage.customizeColumnButton())
    cy.waitForElement(commonPage.elementByTextContains('CUSTOMIZE COLUMNS'))
    cy.wait(1000)
    Cypress._.each(columns, (column) => {
        switch (colStatus) {
            case true:
                commonPage.selectColumnByName(column).invoke('attr', 'class').then(($check) => {
                    if ($check.includes('checked')) return
                    else {
                        cy.waitAndClick(commonPage.selectColumnByName(column))
                    }
                })
                break
            case false:
                commonPage.selectColumnByName(column).invoke('attr', 'class').then(($check) => {
                    if ($check.includes('checked')) {
                        cy.waitAndClick(commonPage.selectColumnByName(column))
                        cy.wait(500)
                    }
                })
                break
            default: console.error("Please select correct column name and status")
        }

    })

})

/**
     * get column index by column name
     */
Cypress.Commands.add('getColIndex', (headerName) => {
    cy.getDataColIdFromColumnName(headerName).then(($dataColId) => {
        cy.xpath(`//table[contains(@id,'table')]/thead//th[@data-col-id='${$dataColId}']`).invoke('index').then((i) => {
            // console.log(i)
            return i + 1
        })
    })
})

/**
     * sort table data
     */
Cypress.Commands.add('sortTableData', (colName, sortType) => {
    cy.getColIndex(colName).then(($index) => {

        var sortCol = commonPage.sortTableColumn(colName, $index)
        cy.waitAndClick(sortCol)
        cy.wait(5000)
        switch (sortType) {
            case 'ascending':
                cy.waitAndClick(sortCol)
                cy.wait(5000)
                cy.xpath(`//th[${$index}]//i`).invoke('attr', 'class').then((classlist) => {
                    if (classlist.toString().includes('sort-on-up')) return
                    else {
                        cy.waitAndClick(sortCol)
                        cy.wait(10000)
                        cy.xpath(`//th[${$index}]//i`).invoke('attr', 'class').then((classlist) => {
                            if (classlist.toString().includes('sort-on-up')) return
                            else {
                                console.error('Sort operation failed')
                            }
                        })
                    }
                })
                break

            case 'descending':
                cy.xpath(`//th[${$index}]//i`).invoke('attr', 'class').then((classlist) => {
                    if (classlist.toString().includes('sort-on-down')) return
                    else {
                        cy.waitAndClick(sortCol)
                        cy.wait(10000)
                        cy.xpath(`//th[${$index}]//i`).invoke('attr', 'class').then((classlist) => {
                            if (classlist.toString().includes('sort-on-down')) return
                            else {
                                console.error('Sort operation failed')
                            }
                        })
                    }
                })
                break
            default: console.error('Please select the correct option')
        }

    })

})

/**
     * Get column id from column name
     */
Cypress.Commands.add('getDataColIdFromColumnName', (colName) => {
    let dataColId: string
    switch (colName) {
        case "SELECTED":
        case "TYPE":
            dataColId = colName.toLowerCase()
            break;
        case "PROJECT":
            dataColId = "project.name"
            break;
        default:
            console.error("Please select the correct header name")
    }
    // const dataColId = colName
    return cy.wrap(dataColId)

})

/**
     * Verify sorted data
     */
Cypress.Commands.add('verifySortedData', (colName, sortType) => {
    var data = ['']
    cy.getColIndex(colName).then((columnIndex) => {
        cy.xpath(`//tr/td[${columnIndex}]`).each(($el) => {
            cy.wrap($el).invoke('text').then(($text) => {
                data.push($text.toString())
            })
        })
            .then(() => {
                // console.log(data)
                data = data.filter((str) => {
                    return /\S/.test(str);
                })
                console.log(data)
                cy.wait(2000)
                cy.verifySortRecords(sortType, data)
            })
    })
})

/**
     * Run the SDK with arguments
     */
Cypress.Commands.add('sdkRunWithArguments', (scriptPath, data) => {
    // console.log(`Received Project name ==> ${data}`)
    const projectPath = Cypress.env('ScriptPath')
    return cy.exec(`python ${projectPath}${scriptPath} ${data}`).its('stdout').should('not.contain', null)
})