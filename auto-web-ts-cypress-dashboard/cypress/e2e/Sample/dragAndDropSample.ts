import sampleData from "../../fixture/sampleData"
import samplePage from "../../pageObject/sample.page"

let resource1 = sampleData.resourceName1
let project1 = sampleData.projectName1
let resource2 = sampleData.resourceName2
let deadlineName = sampleData.projectNote
let mondayDate = samplePage.getDayOfCurrentWeek(1)
let tuesdayDate = samplePage.getDayOfCurrentWeek(2)
let wednesdayDate = samplePage.getDayOfCurrentWeek(3)
let thursdayDate = samplePage.getDayOfCurrentWeek(4)


describe("Critical path: Deadline", () => {

    beforeEach(() => {
        // Create resource 1
        cy.createResourceUsingAPI(Cypress.env('userApiKey'), resource1, "")
        // Create project 1
        cy.createProjectUsingAPI(Cypress.env('userApiKey'), project1)
        // Create resource 2
        cy.createResourceUsingAPI(Cypress.env('userApiKey'), resource2, "")
        // Click on classic radio button and change the scheduler menu type
        samplePage.selectSchedulerMenuType(sampleData.elements.classicRadioButton)
        // Select option to view single rows (Project & Resource)
        samplePage.selectViewMode(sampleData.elements.selectSingleRows)

    });

    afterEach(() => {
        // Data Cleanup
        samplePage.dataCleanUp(Cypress.env('userApiKey'))
    });

    // Ticket -1001
    it("TC_01(1) - Verify drag-and-drop booking retains deadlines when set to 'Allow' in settings", () => {

        /**
         * Set deadlines and deadlines move condition to `Allow` on the settings> customization
         */
        // Click on the customization link on the settings page to access and configure the deadlines and deadlines move conditions for the test scenario
        samplePage.clickSidebarMenuSettingPage(sampleData.elements.customizationLink)
        // Select deadlines and deadlines move to "Allow" via settings customization
        samplePage.selectDeadlinesConditions(sampleData.elements.deadlinesAllowMoveBeforeEndDate, sampleData.elements.deadlinesMoveAllow)
        // Click  on scheduler link via topbar
        samplePage.clickOnTopbarLink(sampleData.elements.schedulerLink)
        cy.wait(1000)

        /**
         * Create booking on Resource 1 
         */
        samplePage.applyFilter(resource1)
        // Expand Active Resources on scheduler
        samplePage.clickOnSidebarMenuItem(sampleData.elements.resourcesMenu, sampleData.elements.activeResources)
        // Schedule project on the resource
        samplePage.clickOnHubDateCell(resource1, "doubleclick", "resourceProject", mondayDate)
        samplePage.scheduleBookingViaSchedulerForProject(project1)
        // Verify the added project booking on the resource
        samplePage.verifyBookingAddedWithStartEndDates(project1, mondayDate, mondayDate, "exist")

        /**
         * Add deadline on Wednesday on the booking via classic menu
         */
        // Click on added booking
        samplePage.clickBookingAdded("singleclick", project1, mondayDate)
        // Click on booking ellipsis icon
        samplePage.clickOnBookingEllipsisIcon()
        // Add deadline via classic menu
        samplePage.addUpdateDeadlineViaClassicMenu(deadlineName, wednesdayDate)
        // Verify the added deadline
        samplePage.verifyAddedDeadline(resource1, deadlineName, wednesdayDate, "exist")
        // Verify deadline watch icon on the booking
        samplePage.verifyDeadlineWatchIcon(project1, mondayDate, "project", "exist")

        /**
         * Drag and Drop booking from resource 1 to resource 2 on Tuesday and verify booking has been moved to resource 2 with deadline
         */
        samplePage.removeFilter()
        samplePage.dragAndDropBookingOnAnotherResource(resource1, resource2, project1, mondayDate, tuesdayDate)

        // verify booking is moved to resource 2 and deadline also moved to resource 2
        samplePage.VerifyBookingWithIdAndTitlendDate(resource2, "visible", project1, tuesdayDate)
        samplePage.verifyAddedDeadline(resource2, deadlineName, thursdayDate, "exist")

    });

    it("TC_01(2) - Verify drag-and-drop booking with 'Allow' deadlines and 'Display warning' move setting", () => {

        /**
         * Set deadlines and deadlines move condition to `Allow` on the settings> customization
         */
        // Click on the customization link on the settings page
        samplePage.clickSidebarMenuSettingPage(sampleData.elements.customizationLink)
        // Select deadlines and deadlines move to "Display Warning" via settings customization
        samplePage.selectDeadlinesConditions(sampleData.elements.deadlinesAllowMoveBeforeEndDate, sampleData.elements.deadlinesMoveDisplayWarning)
        // Click  on scheduler link via topbar
        samplePage.clickOnTopbarLink(sampleData.elements.schedulerLink)
        cy.wait(1000)

        /**
         * Create booking on Resource 1 
         */
        samplePage.applyFilter(resource1)
        // Expand Active Resources on scheduler
        samplePage.clickOnSidebarMenuItem(sampleData.elements.resourcesMenu, sampleData.elements.activeResources)
        // Schedule project on the resource
        samplePage.clickOnHubDateCell(resource1, "doubleclick", "resourceProject", mondayDate)
        samplePage.scheduleBookingViaSchedulerForProject(project1)
        // Verify added project booking on the resource
        samplePage.verifyBookingAddedWithStartEndDates(project1, mondayDate, mondayDate, "exist")

        /**
         * Add deadline on Wednesday date on the booking
         */
        // Click on added booking
        samplePage.clickBookingAdded("singleclick", project1, mondayDate)
        // Click on booking ellipsis icon
        samplePage.clickOnBookingEllipsisIcon()
        // Add deadline via classic menu
        samplePage.addUpdateDeadlineViaClassicMenu(deadlineName, wednesdayDate)
        // Verify the added deadline
        samplePage.verifyAddedDeadline(resource1, deadlineName, wednesdayDate, "exist")
        // Verify deadline watch icon on the booking
        samplePage.verifyDeadlineWatchIcon(project1, mondayDate, "project", "exist")


        /**
         * Drag and Drop booking from resource 1 to resource 2 on Tuesday
         */
        samplePage.removeFilter()
        samplePage.dragAndDropBookingOnAnotherResource(resource1, resource2, project1, mondayDate, tuesdayDate)

        /**
         * Verify booking update warning popup and click on the `No` button
         * then verify booking date has been updated but deadline date is not updated
         */
        samplePage.deadlineBookingUpdateWarningPopup("No")
        samplePage.VerifyBookingWithIdAndTitlendDate(resource2, "visible", project1, tuesdayDate)
        samplePage.verifyAddedDeadline(resource2, deadlineName, wednesdayDate, "exist")

    });

    it("TC_01(3) - Verify drag-and-drop booking with 'Allow' deadlines and 'Disabled' move settings", () => {

        /**
         * Set deadlines and deadlines move condition to `Allow` on the settings> customization
         */
        // Click on the customization link on the settings page
        samplePage.clickSidebarMenuSettingPage(sampleData.elements.customizationLink)
        // Select deadlines and deadlines move to "Disabled" via settings customization
        samplePage.selectDeadlinesConditions(sampleData.elements.deadlinesAllowMoveBeforeEndDate, sampleData.elements.deadlinesMoveDisabled)
        // Click  on scheduler link via topbar
        samplePage.clickOnTopbarLink(sampleData.elements.schedulerLink)
        cy.wait(1000)

        /**
         * Create booking on Resource 1 
         */
        samplePage.applyFilter(resource1)
        // Expand Active Resources on scheudler
        samplePage.clickOnSidebarMenuItem(sampleData.elements.resourcesMenu, sampleData.elements.activeResources)
        // Schedule project on the resource
        samplePage.clickOnHubDateCell(resource1, "doubleclick", "resourceProject", mondayDate)
        samplePage.scheduleBookingViaSchedulerForProject(project1)
        // Verify added project booking on the resource
        samplePage.verifyBookingAddedWithStartEndDates(project1, mondayDate, mondayDate, "exist")

        /**
         * Add deadline on Wednesday date on the booking
         */
        // Click on added booking
        samplePage.clickBookingAdded("singleclick", project1, mondayDate)
        // Click on booking ellipsis icon
        samplePage.clickOnBookingEllipsisIcon()
        // Add deadline via classic menu
        samplePage.addUpdateDeadlineViaClassicMenu(deadlineName, wednesdayDate)
        // Verify the added deadline
        samplePage.verifyAddedDeadline(resource1, deadlineName, wednesdayDate, "exist")
        // Verify deadline watch icon on the booking
        samplePage.verifyDeadlineWatchIcon(project1, mondayDate, "project", "exist")


        /**
         * Drag and Drop booking from resource 1 to resource 2 on Tuesday
         */
        samplePage.removeFilter()
        samplePage.dragAndDropBookingOnAnotherResource(resource1, resource2, project1, mondayDate, tuesdayDate)

        /**
         * Verify booking date has been updated but deadline date is not updated
         */
        samplePage.VerifyBookingWithIdAndTitlendDate(resource2, "visible", project1, tuesdayDate)
        samplePage.verifyAddedDeadline(resource2, deadlineName, wednesdayDate, "exist")

    });

})