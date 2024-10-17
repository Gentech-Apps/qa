import sortingPage from '../../pageObjects/sorting.page'
import commonPage from '../../pageObjects/common.page'
import * as sortingData from '../../fixtures/sortingData'
import * as scripts from '../../fixtures/scriptData'

var project = sortingData.data.projectNameForScript
var tasks = ['grapefruit', 'Plum', 'peach', 'jujube', 'apricot', 'grape', 'Star-fruit', 'pear', 'cantaloupe', 'kiwi', '564', '437', '$##%$', '%$#56']
var iteration = [10, 20, 30, 40, 50, 60, 70, 80, 20, 30, 64, 87, 43, 78]
const fileName = sortingData.data.fileName + '.json'
var projectDetails: any
var statusArr = `NAME,TYPE,STARTED,UPDATED,ITERATION,DESCRIPTION,RUN TIME`

describe('TE-01 - Validate Sorting functionality  in table view table', () => {

    before(() => {
            // Old data cleanup 
            cy.sdkRunWithArguments(scripts.deleteAllProjectTask, `-id ${Cypress.env('userid')}`)
            cy.sdkRunWithArguments(scripts.deleteAllProjectTask, `-id ${Cypress.env('userid_1')}`)
            cy.sdkRunWithArguments(scripts.deleteAllProjectTask, `-id ${Cypress.env('userid_3')}`)
            // Create data directory
            cy.task("CreateDataDirectory")
            // Create data and task
            cy.sdkRunWithArguments(scripts.createDataWithIterations, `-n ${project} -t ${tasks.join(' ')} -it ${iteration.join(' ')} -f ${fileName}`).then((logs) => {
                cy.getDataFromSDKRun(fileName).then((data) => {
                    projectDetails = data[1]
                })
            })
    })

    beforeEach(() => {
        // Login into application 
        cy.loginWithEmail(Cypress.config().baseUrl, Cypress.env('primaryUsername'), Cypress.env('primaryPassword'), Cypress.env('server'))
        // click on project tab 
        commonPage.clickOnSideBarOption(sortingData.elements.projectTab, sortingData.elements.projectTitle)
        // Open project cart
        cy.waitAndClick(sortingPage.projectName(project))
        // Click on Table view 
        sortingPage.clickOnDetailTableView(sortingData.elements.tableViewToggle)
        // Enable columns in table
        cy.showhideCol(statusArr, true)
    })

    it('TE-01.1 - Verify sorting by name', () => {
        // Verify sorting for Task Name
        cy.log('NAME sorting verification')
        // Verify Ascending sorting
        cy.sortTableData('NAME', 'ascending').then(($data) => {
            cy.verifySortedData('NAME', 'ascending')
        })
        // Verify Descending sorting
        cy.sortTableData('NAME', 'descending').then(($data) => {
            cy.verifySortedData('NAME', 'descending')
        })
    })
    it('TE-01.2 - Verify sorting by type', () => {
        // Verify sorting for Task Type
        cy.log('TYPE sorting verification')
        // Verify Ascending sorting
        cy.sortTableData('TYPE', 'ascending').then(($data) => {
            cy.verifySortedData('TYPE', 'ascending')
        })

        // Verify Descending sorting
        cy.sortTableData('TYPE', 'descending').then(($data) => {
            cy.verifySortedData('TYPE', 'descending')
        })
    })

    afterEach(() => {
        // logout from the application
        cy.logout()
    })

    after(() => {
        // Clean the Data file
        cy.task("CleanDataDirectory")
    })
})

