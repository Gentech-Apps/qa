import sampleData from "../fixture/sampleData"

const filterSearchField = '.rw-input-reset'

import moment from 'moment';


class sample {
    /**
     * To get any header links in the Topbar such as Scheduler, Timesheets, Settings etc.
     */
    headerLink(value: string) {
        return cy.xpath(`//*[contains(@class,'navbar')]//*[contains(text(),'${value}')]`)
    }

    /**
     * Get element by text
     */
    elementByText(value: string) {
        return cy.xpath(`//*[text()='${value}']`, { timeout: 20000 })
    }

    /**
     * Get element by href attribute
     */
    elementByHref(value: string) {
        return cy.xpath(`//*[@href="${value}"]`)
    }

    /**
     * Get element by title attribute
     */
    elementByTitle(value: string) {
        return cy.get(`[title="${value}"]`, { timeout: 10000 })
    }

    /**
     * Get element by data-cy attribute
     */
    elementByDataCy(value: string) {
        return cy.get(`[data-cy="${value}"]`, { timeout: 10000 })
    }

    /**
     * Get element by name attribute
     */
    elementByName(value: string) {
        return cy.get(`[name='${value}']`)
    }

    /**
   * Scheduler view mode button
   */
    schedulerViewModeButton() {
        return cy.xpath(`(//*[@data-cy="scheduler-nav-tv"]//button)[1]`)
    }

    /**
     * Scheduler search field
     */
    schedulerSearchField() {
        return cy.xpath(`//*[@data-cy="schedule-filter"]//input`)
    }

    /**
       * Get today's date in YYYY-MM-DD format
       */
    getTodayDate() {
        const todayDate = new Date()
        return moment(todayDate).format("YYYY-MM-DD")
    }

    /**
         * Click on "Group Schedule" for any submenu via sidebar
         */
    groupSchedule(value: string) {
        return cy.xpath(`(//*[@data-cy='${value}']//following::span[text()='Group schedule'])[1]`)
    }

    /**
   * Records (projects, resources, events and unassigned) visible on scheduler
   */
    schedulerProjectResourceName(value: string) {
        return cy.xpath(`//*[@class="hub_rowheader_inner"]//*[contains(text(),"${value}")]`)
    }

    /**
     *  Find cell on scheduler with id and start date
     *  Limitation : This will not work when booking exist on that cell.
     */
    startDateCell(id: string, date: string) {
        return cy.xpath(`(//*[contains(@data-cy,"${id}") and contains(@data-cy,'start=${date}')])[1]`)
    }

    // classic menu > search project/event
    searchProjectEventByPlaceholder(value: string) {
        return cy.xpath(`(//*[@placeholder="${value}"])[1]`, { timeout: 10000 })
    }

    // select resource/unassigned from schedule resource via classic menu
    selectResourceProjectList(resourceName: string) {
        return cy.xpath(`//*[@data-role="button"]//*[contains(text(),"${resourceName}")]`)
    }

    /**
    * Booking by booking title/ name, start date and end date
    */
    bookingByTitleAndStartEndDates(bookingtitle: string, startdate: string, enddate: string) {
        return cy.xpath(`//*[contains(text(),"${bookingtitle}")]//ancestor::div[contains(@data-cy,'start=${startdate}') and contains(@data-cy,'end=${enddate}')]`)
    }

    /**
     * Element by booking name and date
     */
    bookingByTitleAndDate(bookingtitle: string, date: string) {
        return cy.xpath(`//*[contains(text(),"${bookingtitle}")]//ancestor::div[contains(@data-cy,'start=${date}')]`, { timeout: 10000 })
    }

    /**
     * Ellipsis icon on the booking
     */
    bookingEllipsisIcon() {
        return cy.xpath(`//*[contains(@class,"hub_selected")]//*[@title="Options"]`)
    }

    /**
     * Booking by 
     */
    bookingByIdTitleAndStartDate(id: string, title: string, date: string) {
        return cy.xpath(`//*[contains(@data-cy,"${id}") and contains(@data-cy,"title=${title}") and contains(@data-cy,'start=${date}')]`)
    }

    /**
    * ***** DEADLINE FEATURE METHODS
    */

    deadlineWatchIcon(deadlineTitle: string, deadlineDate: string, type: string) {
        return cy.xpath(`//*[contains(@data-cy,"title=${deadlineTitle}") and contains(@data-cy,'start=${deadlineDate}')]//*[@data-cy="scheduler-[${type}]-deadline"]`)
    }

    /**
     * To apply filter for specific record (project, resources, events and unassigned) on the scheduler.
     */
    applyFilter(name: string) {
        this.schedulerSearchField().type(name, { force: true, delay: 30 })
        cy.get(filterSearchField).should('be.visible').and('have.value', name)
        cy.get(filterSearchField).type('{enter}')
        cy.get(filterSearchField).should('not.have.value', name)
    }

    /**
       * Add, update deadline classic menu 
       */
    addUpdateDeadlineViaClassicMenu(deadlineName: string, deadlineDate: string) {
        cy.wait(1000)
        // Mouseover the Add deadline option
        this.elementByDataCy(sampleData.elements.addUpdateDeadlineClassicMenu).trigger("mouseover", { force: true })
        // click on the deadline title field and add title
        this.elementByName(sampleData.elements.deadlineTitleField).clear().type(deadlineName, { force: true, delay: 30 })
        // Add deadline date
        this.elementByName(sampleData.elements.deadlineDateField).click({ force: true })
        // click on the expected date
        var currentDate = new Date();
        var date = new Date(deadlineDate);
        var monthsdiff1 = (currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth())
        if (monthsdiff1 == 0) {
            console.log("IF CONDITION")
            cy.wait(500)
            // Select deadline date
            this.clickOnElementByDataCy(sampleData.elements.deadlineDate(deadlineDate))
        }
        else {
            console.log("ELSE CONDITION")
            // Click on the Forward Arrow 
            this.clickOnElementByDataCy(sampleData.elements.deadlineDatePickerForwardArrow)
            // Select deadline date
            this.clickOnElementByDataCy(sampleData.elements.deadlineDate(deadlineDate))
        }
        cy.wait(1000)
        // Click on the Update button
        this.elementByDataCy(sampleData.elements.addUpdateDeadlineButton).should('be.enabled').click({ force: true })
        cy.wait(1000)
    }

    /**
         * Verify added deadline on the scheudler
         */
    verifyAddedDeadline(resourceName: string, deadlineTitle: string, deadlineDate: string, condition: string) {
        // Get Id of resource 1
        this.schedulerProjectResourceName(resourceName).invoke('attr', 'data-cy').then($datacy => {
            const attribute = $datacy.toString()
            var id = /\=(.*)\]$/.exec(attribute)
            switch (condition) {
                case "exist":
                    this.bookingByIdTitleAndStartDate(id[1], deadlineTitle, deadlineDate).should('be.exist')
                    break;
                case "notexist":
                    this.bookingByIdTitleAndStartDate(id[1], deadlineTitle, deadlineDate).should('not.exist')
                    break;
                case "duplicate":
                    this.bookingByIdTitleAndStartDate(id[1], deadlineTitle, deadlineDate).should('have.length', 2)
                    break;
                default:
            }
        })
    }

    verifyDeadlineWatchIcon(deadlineTitle: string, deadlineDate: string, type: string, condition: string) {
        switch (condition) {
            case "exist":
                this.deadlineWatchIcon(deadlineTitle, deadlineDate, type).should('be.exist')
                break;
            case "notexist":
                this.deadlineWatchIcon(deadlineTitle, deadlineDate, type).should('not.exist')
                break;
            case "duplicate":
                this.deadlineWatchIcon(deadlineTitle, deadlineDate, type).should('have.length', 2)
                break;
            default:
        }
    }

    /**
     * Click on any element by data-cy
     */
    clickOnElementByDataCy(name: string) {
        this.elementByDataCy(name).scrollIntoView()
        cy.wait(500)
        this.elementByDataCy(name).should('exist', { Timeout: 20000 }).click("center", { force: true })
        cy.wait(3000)
    }

    /**
    * Precondition : Click on the hub date cell
    * To scheduler project(create booking) for a project from scheduler.
    */
    scheduleBookingViaSchedulerForProject(projectName: string) {
        cy.wait(1000)
        // Select Schedule project option
        this.elementByDataCy(sampleData.elements.scheduleProjectEventOption).should('be.visible').trigger("mouseover", { force: true })
        cy.wait(500)
        // Click on Select a project option
        this.clickOnElementByDataCy(sampleData.elements.selectProjectEvent)
        cy.wait(500)
        //Select a project
        this.searchProjectEventByPlaceholder(sampleData.elements.searchFilterField).scrollIntoView().type(projectName, { delay: 50 })
        cy.wait(500)
        this.selectResourceProjectList(projectName).should('be.visible').click()
        // Click on Schedule button
        this.clickOnElementByDataCy(sampleData.elements.scheduleButtonData)
        cy.wait(500)
    }

    /**
       * Select Deadlines condition
       */
    selectDeadlinesConditions(deadlinesCondition: string, deadlinesMoveCondition: string) {
        cy.wait(1000)
        // Select Deadlines condition
        this.elementByDataCy(deadlinesCondition).scrollIntoView().should('be.visible').check({ force: true })
        // Select Deadlines move conditions
        this.elementByDataCy(deadlinesMoveCondition).scrollIntoView().should('be.visible').check({ force: true })
        // Click on the `Save Changes` button
        this.clickOnElementByDataCy(sampleData.elements.customizationSaveChangesButton)
        cy.wait(3000)
    }

    /**
   * To select the view mode (Grouped Rows, Single Rows (Project & Resource), Single Rows (Resource)) for the schduler.
   */
    selectViewMode(mode: string) {
        this.schedulerViewModeButton().click({ force: true })
        this.elementByDataCy(mode).click({ force: true })
        cy.wait(1000)
    }

    /**
   * To select scheduler Menu type(modern, classic). 
   * This method will click on the setting icon present on the scheduler top bar and then click on the menu type radio button.
   */
    selectSchedulerMenuType(buttonType: string) {
        this.elementByTitle(sampleData.elements.settingsIcon).should('be.visible').click({ force: true })
        cy.wait(500)
        this.elementByDataCy(buttonType).scrollIntoView().click({ force: true })
        cy.wait(1000)
    }

    /**
   * Click on sidebar menu on settings page
   */
    clickSidebarMenuSettingPage(menu: string) {
        this.clickOnTopbarLink(sampleData.elements.settingsLink)
        cy.location().its('href').should('include', '/profile')
        cy.wait(500)
        cy.get('body').then(($body) => {
            if ($body.text().includes("Edit your Profile settings below.")) {
                this.elementByText("Edit your Profile settings below.").should('be.visible')
                this.clickOnSideBarlink(menu)
                cy.wait(1000)
            }
            else {
                cy.reload()
                cy.wait(2000)
                this.elementByText("Edit your Profile settings below.").should('be.visible')
                this.clickOnSideBarlink(menu)
                cy.wait(1000)
            }
        })
    }

    /**
     * Click on the main menu (Projects/ Resources) and any sub menu link on side bar
     */
    clickOnSidebarMenuItem(mainmenu: string, submenu: string) {
        cy.wait(1000)
        this.elementByDataCy(mainmenu).scrollIntoView().should('be.exist')
        this.elementByDataCy(mainmenu).click({ force: true })
        cy.wait(2000)
        this.elementByDataCy(submenu).scrollIntoView().should('be.exist')
        this.elementByDataCy(submenu).click({ force: true })
        cy.wait(1000)
        this.groupSchedule(submenu).click({ force: true })
    }

    /**
     * Click on top bar header link such as Scheduler, Timesheets, Settings etc in Topbar.
     */
    clickOnTopbarLink(linkName: string) {
        this.headerLink(linkName).click({ force: true })
        cy.wait(2000)
    }

    /**
     * Click on any sidebar link on settings page 
     */
    clickOnSideBarlink(value: string) {
        this.elementByHref(value).scrollIntoView().should('be.exist')
        this.elementByHref(value).click({ force: true })
    }

    /**
   * To perform action on the selected hub date cell via method "clickOnHubDateCell" 
   * Limitation : This will not work when booking exist on that cell.
   */
    clickOnHubCell(value: string, date: string, attribute: string) {
        switch (value) {
            case "singleclick":
                this.startDateCell(attribute, date).click({ force: true, timeout: 3000 })
                break;
            case "doubleclick":
                this.startDateCell(attribute, date).click({ force: true, timeout: 3000 })
                cy.wait(2000)
                this.startDateCell(attribute, date).dblclick("center", { force: true, timeout: 3000 })
                break;
            case "paste":
                cy.wait(1000)
                this.startDateCell(attribute, date).type('{ctrl+v}', { release: true, force: true, timeout: 2000 })
                break;
            case "mouseover":
                this.startDateCell(attribute, date).trigger('mouseover', { timeout: 2000 })
                break;
            default:
        }
    }

    /**
     * To click on hub date cell. 
     * 1. This method will invoke and store the attribute date-cy 
     * 2. Through the regex it will take out the record(given as name) ID
     * 3. Then according to the selected case and record Id it will perform action on the hubcell
     * Note : The "recourceproject" case will work for all records in all views except "Grouped rows".
              For selecting hubcell in "Grouped rows" we need other cases.
      Limitation : This will not work when booking exist on that cell.
     */
    clickOnHubDateCell(name: string, clickType: string, value: string, date: any) {
        this.schedulerProjectResourceName(name).invoke('attr', 'data-cy').then($datacy => {
            const attribute = $datacy.toString()
            cy.log(attribute)
            var arr = /\=(.*)\]$/.exec(attribute)
            cy.log(arr[1])
            cy.log(date)
            switch (value) {
                case "resourceProject":
                    const resource = 'res=' + arr[1]
                    this.clickOnHubCell(clickType, date, resource)
                    break;
                case "selectRow":
                    const selectRow = 'res=selectRow_' + arr[1]
                    this.clickOnHubCell(clickType, date, selectRow)
                    break;
                case "unassigned":
                    this.clickOnHubCell(clickType, date, 'res=unassignedRow')
                    break;
                case "eventsRow":
                    const eventsRow = 'res=eventsRow_' + arr[1]
                    this.clickOnHubCell(clickType, date, eventsRow)
                    break;
                case "resourceProjectId":
                    const resourceId = 'res=' + arr[1] + '_'
                    this.clickOnHubCell(clickType, date, resourceId)
                    break;
                case "projectIdAddedOnResource":
                    const projectId = arr[1]
                    this.clickOnHubCell(clickType, date, projectId)
                    break;
                case "removedProjectsRow":
                    const removedProjectsRow = 'res=removedProjectsRow_' + arr[1]
                    this.clickOnHubCell(clickType, date, removedProjectsRow)
                    break;
                default:
            }
        })
    }

    /**
  * click on added booking with title and date of booking
  */
    clickBookingAdded(type: string, bookingtitle: string, date: string) {
        switch (type) {
            case "singleclick":
                cy.wait(500)
                this.bookingByTitleAndDate(bookingtitle, date).should('be.visible').click({ force: true })
                break;
            case "doubleclick":
                this.bookingByTitleAndDate(bookingtitle, date).should('be.exist').dblclick()
                break;
            case "rightclick":
                this.bookingByTitleAndDate(bookingtitle, date).should('be.exist').rightclick({ force: true })
                cy.wait(1000)
                break;
            case "mouseOver":
                this.bookingByTitleAndDate(bookingtitle, date).should('be.exist').trigger('mouseover', { wait: 5000 })
                break;
            case "copy":
                this.bookingByTitleAndDate(bookingtitle, date).click({ force: true })
                this.bookingByTitleAndDate(bookingtitle, date).type('{ctrl+c}', { release: true, force: true, delay: 30 })
                break;
            case "cut":
                this.bookingByTitleAndDate(bookingtitle, date).type('{ctrl+x}', { release: true, force: true, delay: 30 })
                break;
            default:
        }

    }

    /**
     * Verify added booking with title, startdate and enddate of booking is visible or not visible
     */
    verifyBookingAddedWithStartEndDates(bookingtitle: string, startdate: string, enddate: string, presence: string) {
        switch (presence) {
            case "exist":
                this.bookingByTitleAndStartEndDates(bookingtitle, startdate, enddate).should('exist')
                cy.wait(500)
                break;
            case "notexist":
                this.bookingByTitleAndStartEndDates(bookingtitle, startdate, enddate).should('not.exist')
                cy.wait(500)
                break;
            case "mouseover":
                this.bookingByTitleAndStartEndDates(bookingtitle, startdate, enddate).trigger('mouseover')
                cy.wait(500)
                break;
            case "visible":
                this.bookingByTitleAndStartEndDates(bookingtitle, startdate, enddate).should('be.visible')
                cy.wait(500)
                break;
            case "notvisible":
                this.bookingByTitleAndStartEndDates(bookingtitle, startdate, enddate).should('not.be.visible')
                cy.wait(500)
                break;
            case "duplicate":
                this.bookingByTitleAndStartEndDates(bookingtitle, startdate, enddate).should('have.length', 2)
                cy.wait(500)
                break;
            default:
        }
    }
        /**
        * To click on the ellipsis icon presnt on the added booking
        */
        clickOnBookingEllipsisIcon() {
            // Click on booking ellipsis icon
            this.bookingEllipsisIcon().click({ force: true })
            cy.wait(2000)
        }

        /**
        *  Xpath to check booking exist for the selected resources with the help of resource Id and booking title.
        */
        verifyBookingWithIDTitleAndDate(id: string, name: string, date: string) {
        return cy.xpath(`//*[contains(@data-cy,"${id}") and contains(@data-cy,"title=${name}") and contains(@data-cy,"start=${date}")]`, { timeout: 10000 })
        }

        VerifyBookingWithIdAndTitlendDate(name: string, presence: string, title: string, date: string) {
        this.schedulerProjectResourceName(name).invoke('attr', 'data-cy').then($datacy => {
        const attribute = $datacy.toString()
        cy.log(attribute)
        var arr = /\=(.*)\]$/.exec(attribute)
        cy.log(arr[1])
        switch (presence) {
         case "visible":
          const resource = 'res=' + arr[1]
          this.verifyBookingWithIDTitleAndDate(resource, title, date).should('be.visible')
          cy.wait(1000)
          break;
        case "notExist":
          const resource1 = 'res=' + arr[1]
          this.verifyBookingWithIDTitleAndDate(resource1, title, date).should('not.exist')
          cy.wait(1000)
          break;
        case "visibleInEventsRow":
          const eventsRow = 'res=eventsRow_' + arr[1]
          this.verifyBookingWithIDTitleAndDate(eventsRow, title, date).should('be.visible')
          cy.wait(1000)
          break;
        case "click":
          const resourceId = 'res=' + arr[1]
          this.verifyBookingWithIDTitleAndDate(resourceId, title, date).should('be.visible').click({ force: true })
          cy.wait(1000)
          break;
        default:
      }
    })
  }

        /**
   * To remmove filter from the scheduler.
   */
  removeFilter() {
    cy.wait(1000)
    cy.get(filterSearchField).should('be.visible').type('{backspace}')
    cy.wait(1000)
  }

        /**
  * Drag and drop schedule booking 
  * 1. title - is the booking name, 
  * 2. date1 is - the booking date which is dragging to other date
  * 3. date2 is - the booking date where the dragged booking will be dropped
  */
  dragAndDropBookingOnAnotherResource(resource1: string, resource2: string, title: string, date1: string, date2: string) {

    // Get Id of resource 1
    this.schedulerProjectResourceName(resource1).invoke('attr', 'data-cy').then($datacy => {
      const attribute = $datacy.toString()
      cy.log(attribute)
      var id1 = /\=(.*)\]$/.exec(attribute)
      // Get Id of resource 2
      this.schedulerProjectResourceName(resource2).invoke('attr', 'data-cy').then($datacy => {
        const attribute = $datacy.toString()
        cy.log(attribute)
        var id2 = /\=(.*)\]$/.exec(attribute)

        // Drag and drop booking from resource 1 to resource 2 
        this.bookingByIdTitleAndStartDate(id1[1], title, date1)
          .trigger('pointerdown', { which: 1, button: 0 }).wait(2000)
        this.bookingByIdTitleAndStartDate(id1[1], title, date1)
          .trigger('mousedown', { which: 1, button: 0 }).wait(2000)
        this.bookingByIdTitleAndStartDate(id1[1], title, date1)
          .trigger('dragstart', { which: 1, button: 0 }).wait(2000)

        this.startDateCell(id2[1], date2)
          .trigger('dragover', { which: 1, button: 0, force: true }).wait(2000)
        this.startDateCell(id2[1], date2)
          .trigger('mousemove', { which: 1, button: 0, force: true }).wait(2000)

        this.bookingByIdTitleAndStartDate(id1[1], title, date1)
          .trigger('mouseup', { which: 1, button: 0, force: true }).wait(2000)

      })

    })

  }

        /**
         * 
         *To cleanup all data 
         * 
         */
        dataCleanUp(apikey: string) {
            // Delete all projects
            cy.deleteProjects(apikey)
            // Delete all resources
            cy.deleteResources(apikey)

        }

        /**
     * Get monday date of the current week in YYYY-MM-DD format
     */
    getDayOfCurrentWeek(index: number) {
        let today = new Date()
        let mondayCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay() + index))
        let monday = moment(mondayCurrentWeek).format('YYYY-MM-DD')
        return monday;
    }

        /**
     * Booking Update Warning Popup
     */
    deadlineBookingUpdateWarningPopup(condition: string) {
        cy.wait(500)
        // Verify title and info text present on the `Booking Update Warning` popup
        this.elementByText(sampleData.elements.bookingUpdateWarningPopupTitle).should('be.visible')
        this.elementByText(sampleData.elements.bookingUpdateWarningPopupInfo).should('be.visible')
        // Click on the No or Yes button
        switch (condition) {
            case "No":
                this.elementByDataCy(sampleData.elements.noButton).should('be.visible').should('be.enabled').click({ force: true })
                break;
            case "Yes":
                this.elementByDataCy(sampleData.elements.yesButton).should('be.visible').should('be.enabled').click({ force: true })
                break;
            default:
        }

    }
    }

export default new sample

