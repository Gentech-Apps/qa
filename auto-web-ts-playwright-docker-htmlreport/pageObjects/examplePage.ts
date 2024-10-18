import { expect, Page } from '@playwright/test';
import { automationData } from '../data/automationData';

export class ExamplePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * This function returns a locator that can find an element using XPath with the specified data-id value.
   */
  async elementByDataId(value: string) {
    return this.page.locator(`//*[@data-id='${value}']`)
  }

  /**
 * This function returns a locator that can find an element using XPath with the specified text value.
 */
  async elementByText(value: string) {
    return this.page.locator(`//*[text()="${value}"]`)
  }

  /**
* This function returns a locator that can find an element using XPath with which contains the specified text value.
*/
  async elementByContainsText(value: string) {
    return this.page.locator(`//*[contains(text(),"${value}")]`)
  }

  /**
* Locator for the element matching the provided criteria.
*/
  async elementByDataIdandContainsText(value1: string, value2: string) {
    return this.page.locator(`//*[@data-id='${value1}' and contains(text(),'${value2}')]`)
  }

  /**
  * This returns a locator for an element that contains the specified dataId and text.
  */
  async elementByDataIdAndFollowingText(value1: string, value2: string) {
    return this.page.locator(`//*[@data-id='${value1}']//following::td[text()='${value2}']`)
  }

  /**
* Locator for the element matching the provided criteria.
*/
  async elementByTextAndDataId(value1: string, value2: string) {
    return this.page.locator(`//*[@data-id='${value1}' and text()='${value2}']`)
  }

  /**
  * This function returns a locator that can find elements with the exact specified text content.
  */
  async elementByTextHeading(value: string) {
    return this.page.locator(`//p[text()='${value}']`)
  }

  /**
* Locator for the calendar date element matching the provided criteria.
*/
  async getCalendarDate(value1: string, value2: number,) {
    return this.page.locator(`(//*[@data-id='${value1}']//following::span[text()='${value2}'])`)
  }

  /**
 * Click on the add timesheet button on the daily report page after ensuring it is visible.
 */
  async clickOnAddTimesheetButton() {
    // click on the add timesheet button
    await expect(await this.elementByDataId(automationData.elements.addTimesheetButtonByDataId)).toBeVisible()
    await (await this.elementByDataId(automationData.elements.addTimesheetButtonByDataId)).click()
  }

  /**
*  Click on the select date field to open calendar after ensuring it is visible.
*/
  async clickOnSelectDate() {
    await expect(await this.elementByDataId(automationData.elements.selectDateByDataId)).toBeVisible()
    await (await this.elementByDataId(automationData.elements.selectDateByDataId)).click()
  }

  /**
* This method enters a project name into the project name field.
*/
  async enterProjectName(value: string) {
    // get the project name field
    await expect(await this.elementByDataId(automationData.elements.projectDropdownByDataId)).toBeVisible()
    // enter the project name
    await (await this.elementByDataId(automationData.elements.projectDropdownByDataId)).fill(value)
  }

  /**
   * This function is to verify the page heading
  */
  async verifyPageHeading(value: string) {
    // verify the page heading
    // await this.page.waitForSelector((await this.elementByTextHeading(`${value}`)).toSt, { state: 'visible', timeout: 5000 })
    await expect(await this.elementByTextHeading(`${value}`)).toBeVisible()
  }

  /**
* These functions are for locating the description fields associated with a project
*/

  // This locate the first description field associated with a project name
  async firstDescriptionField(projectname: string) {
    return this.page.locator(`(//*[contains(text(),'${projectname}')]//following::textarea[@data-id="addtimesheet-description"])[1]`);
  }

  // This locate the second description field associated with a project name
  async secondDescriptionField(projectname: string) {
    return this.page.locator(`(//*[contains(text(),'${projectname}')]//following::textarea[@data-id="addtimesheet-description"])[2]`);
  }


  /**
   * This function locates the first time input field associated with a description field for a particular project.
   */
  async firstTimeField(projectname: string) {
    return this.page.locator(`(//*[contains(text(),'${projectname}')]//following::input[@data-id="addtimesheet-time"])[1]`);
  }

  /**
   * This function locates the second time input field associated with a description field for a particular project.
   */
  async secondTimeField(projectname: string) {
    return this.page.locator(`(//*[contains(text(),'${projectname}')]//following::input[@data-id="addtimesheet-time"])[2]`);
  }

  /**
 * A function to submit a timesheet entry.
 * This function verifies the visibility and text of the timesheet submit button, then clicks on it to submit the timesheet entry.
 */
  async submitTimesheet() {
    // Verify that the timesheet submit button is visible
    await expect(await this.elementByDataId(automationData.elements.timesheetSubmitButtonByDataId)).toBeVisible();

    // Verify that the timesheet submit button has the expected text
    await expect(await this.elementByDataId(automationData.elements.timesheetSubmitButtonByDataId)).toHaveText(automationData.elements.submitButtonByText);

    // Click on the timesheet submit button to submit the timesheet entry
    await (await this.elementByDataId(automationData.elements.timesheetSubmitButtonByDataId)).click();
  }

  /** 
* This method performs a search by entering a given name into a search field identified by its data ID.
*/
  async searchByName(fieldDataId: string, name: string) {
    // Find the element using the provided data ID and fill it with the given name
    await (await this.elementByDataId(fieldDataId)).fill(name)
    // Simulate pressing the "Enter" key to initiate the search
    await (await this.elementByDataId(fieldDataId)).press("Enter")
  }

  /**
  * This method is to logout from application 
  */
  async logout() {
    // Click on profile dropdown
    await (await this.elementByDataId(automationData.elements.profileNameByDataId)).click();
    // Click on logout button
    await (await this.elementByDataId(automationData.elements.logoutButtonByDataId)).click();
  }

  /**
    * This method is to login into the application
    */
  async login(username: string, password: string) {
    // verify login page title
    await expect(this.page).toHaveTitle(/Example/);
    // Add email and password
    await (await this.elementByDataId(automationData.elements.emailInputByDataId)).fill(username);
    // Enter paswword
    await (await this.elementByDataId(automationData.elements.passwordInputByDataId)).fill(password);
    // Click on login button
    await (await this.elementByDataId(automationData.elements.loginButtonByDataId)).click();
  }

  /**
   * A function to click on a module and its submodule.
   * This function first clicks on the specified module name element and then clicks on the specified submodule name element.
   */
  async clickOnModuleAndSubmodule(muduleName: string, subModuleName: string) {
    //click on module name
    await expect(await this.elementByDataId(muduleName)).toBeVisible()
    await (await this.elementByDataId(muduleName)).click()

    //click on sub module name
    await expect(await this.elementByDataId(subModuleName)).toBeVisible()
    await (await this.elementByDataId(subModuleName)).click()
  }

  /**
   * A function to click on the button after ensuring it is visible
   */

  async clickOnOkButton(dataId: string) {
    // Verify ok button is visible
    await expect(await this.elementByDataId(dataId)).toBeVisible()
    // Click on ok button
    await (await this.elementByDataId(dataId)).click()
  }

  /**
* A function to add a timesheet entry for a specific project.
* This function automates the process of adding timesheet entries by interacting with elements on a web page.
* It verifies the visibility of the add timesheet popup title, enters the project name, selects the project from a dropdown, and fills in either a
* single or multiple description fields along with corresponding time fields based on the 'descriptionfield' parameter.
*/
  async addTimesheetMultiProject(projectname1: string, projectName2: string) {
    //verify the add timesheet pop up title
    await expect(await this.elementByText(automationData.elements.addTimesheetPopupTitle)).toBeVisible()
    //enter a project name in the project field
    await this.enterProjectName(projectname1)
    //select a project from the dropdown
    await (await this.elementByContainsText(projectname1)).click()
    //enter a project name in the project field
    await this.enterProjectName(projectName2)
    //select a project from the dropdown
    await (await this.elementByContainsText(projectName2)).click()

    // fill details on the description field for first project
    await expect(await this.firstDescriptionField(projectname1)).toBeVisible()
    await (await this.firstDescriptionField(projectname1)).fill(automationData.projectDescription)
    // fill details on the time field for first project
    await expect(await this.firstTimeField(projectname1)).toBeVisible()
    await (await this.firstTimeField(projectname1)).fill(automationData.projectTime1)
    // fill details on the description field for second project
    await (await this.secondDescriptionField(projectName2)).scrollIntoViewIfNeeded()
    await expect(await this.secondDescriptionField(projectName2)).toBeVisible()
    await (await this.secondDescriptionField(projectName2)).fill(automationData.projectDescription2)
    // fill details on the time field for second project
    await expect(await this.secondTimeField(projectName2)).toBeVisible()
    await (await this.secondTimeField(projectName2)).fill(automationData.projectTime2)

    //click on the submit button
    await this.submitTimesheet()
  }

  /**
 * A function to verify timesheet card details.
 * This function verifies various elements on the timesheet card to ensure that the correct date, user name, project name, time, and total hours are displayed.
 */
  async verifyMultiProjectTimesheetCard(date: string) {
    // to verify date on the card
    await expect(await this.elementByDataId(automationData.elements.timesheetDateByDataId)).toContainText(date)
    // to verify user name on the card
    await expect(await this.elementByDataId(automationData.elements.candidateNameByDataId)).toContainText(automationData.name)
    // to verify first project name on card
    expect(await this.elementByDataIdandContainsText(automationData.elements.projectNameByDataId, automationData.projectName)).toBeVisible()
    // to verify first project time on card
    expect(await this.elementByDataIdAndFollowingText(automationData.elements.projectNameByDataId, automationData.projectTime1)).toBeVisible()

    // to verify second project name on card
    expect(await this.elementByDataIdandContainsText(automationData.elements.projectNameByDataId, automationData.projectName2)).toBeVisible()
    // to verify second project time on card
    expect(await this.elementByDataIdAndFollowingText(automationData.elements.projectNameByDataId, automationData.projectTime2)).toBeVisible()

    // to verify total hours on card
    await expect(await this.elementByDataId(automationData.elements.totalHourByDataId)).toContainText(automationData.projectTime)
  }

  /**
* A function to verify timesheet details, when user adds multiple projects, on the dashboard for a specific date.
* This function verifies various elements on the timesheet details section to ensure that the correct date, project name, descriptions, and times are displayed.
*/
  async verifyMultiProjectTimesheetOnDashboard(date: string) {
    const time = automationData.projectTime + " hours"
    // to verify date on the timesheet details section  
    await expect(await this.elementByDataId(automationData.elements.dateByDataId)).toContainText(date)
    // to verify total time on the timesheet details section
    await expect(await this.elementByDataId(automationData.elements.totaltimeByDataId)).toContainText(time)

    // to verify first project name on the timesheet details section
    await expect(await this.elementByDataIdandContainsText(automationData.elements.projectNameByDataId, automationData.projectName)).toBeVisible()
    // to verify first project time on the timesheet details section
    await expect(await this.elementByDataIdandContainsText(automationData.elements.projectTimeByDataId, automationData.projectTime1)).toBeVisible()
    // to verify first project description on the timesheet details section
    await expect(await this.elementByTextAndDataId(automationData.elements.taskNameByDataId, automationData.projectDescription)).toBeVisible()
    // to verify first project task time on the timesheet details section
    await expect(await this.elementByDataIdandContainsText(automationData.elements.taskTimeByDataId, automationData.projectTime1)).toBeVisible()

    // to verify second project name on the timesheet details section
    await expect(await this.elementByDataIdandContainsText(automationData.elements.projectNameByDataId, automationData.projectName2)).toBeVisible()
    // to verify second project time on the timesheet details section
    await expect(await this.elementByDataIdandContainsText(automationData.elements.projectTimeByDataId, automationData.projectTime2)).toBeVisible()
    // to verify second project description on the timesheet details section
    await expect(await this.elementByTextAndDataId(automationData.elements.taskNameByDataId, automationData.projectDescription2)).toBeVisible()
    // to verify second project task time on the timesheet details section
    await expect(await this.elementByDataIdandContainsText(automationData.elements.taskTimeByDataId, automationData.projectTime2)).toBeVisible()

  }

  /**
   * selects a tab based on its name from the dashboard navigation bar.
   */
  async selectTab(tabName: string, pageHeadingDataId: string) {

    switch (tabName) {

      case "DB":
        // Select dashboard from left nav bar
        await (await this.elementByDataId(automationData.elements.dbNavigationBarByDataId)).click()
        break;

      // Select Events from left nav bar
      case "ES":
        await (await this.elementByDataId(automationData.elements.esNavigationBarByDataId)).click()
        break

      // Select Daily Report from left nav bar
      case "DR":
        await (await this.elementByDataId(automationData.elements.drNavigationBarByDataId)).click()
        break

      // Select Leaves from left nav bar
      case "LV":
        await (await this.elementByDataId(automationData.elements.lvNavigationBarByDataId)).click()
        break

      default: console.error(`Please select correct tab`)

    }
    // verify the page title
    await this.verifyPageHeading(pageHeadingDataId)

  }

  /**
 *  This method clicks on the calendar arrows a specified number of times, to navigate between months.
 */
  async clickOnCalendarArrows(monthdiff: number, type: string) {
    for (let i = 0; i < monthdiff; i++) {
      switch (type) {
        case 'previous':
          // click on the previous arrow
          await expect(await this.elementByText(automationData.elements.previousMonthByText)).toBeVisible()
          await (await this.elementByText(automationData.elements.previousMonthByText)).click({ force: true })
          break;

        case 'next':
          // click on the next arrow
          await expect(await this.elementByText(automationData.elements.nextMonthByText)).toBeVisible()
          await (await this.elementByText(automationData.elements.nextMonthByText)).click({ force: true })
          break;

        default:
          break;
      }
    }
  }

  /**
   * A method to select a date on a calendar based on different cases.
   * This method handles date selection based on the day of the week and case type ('previous' or 'next').
   */

  async selectDateForTimesheet(date: Date, caseType: string, calendarDataId: string) {
    const dayOfWeekNumber = date.getDay()
    const currentDate = new Date()

    switch (caseType) {
      case 'previous':
        if (dayOfWeekNumber === 6) {
          // If the given day is Saturday then subtract 1 day from the given day
          date.setDate(date.getDate() - 1);
          const newDate = date.getDate()

          // get month difference between the current date and the given date
          var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

          // If the month difference is 0 then directly click a date on the current month, but if the month difference not 0 then, click the previous month arrow, the number of times same as month difference
          if (monthsdiff1 == 0) {
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
          else {
            await this.page.waitForTimeout(2000)
            // click on calendar arrows as the number of times same as the month difference(converted to positive value)
            await this.clickOnCalendarArrows(Math.abs(monthsdiff1), caseType)
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }

        }
        else if (dayOfWeekNumber === 0) {
          // If the given day is Sunday then subtract 2 day from the given day
          date.setDate(date.getDate() - 2);
          const newDate = date.getDate()

          // get month difference between the current date and the given date
          var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

          // If the month difference is 0 then directly click a date on the current month, but if the month difference not 0 then, click the previous month arrow, the number of times same as month difference
          if (monthsdiff1 == 0) {
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
          else {
            await this.page.waitForTimeout(2000)
            // click on calendar arrows as the number of times same as the month difference(converted to positive value)
            await this.clickOnCalendarArrows(Math.abs(monthsdiff1), caseType)
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
        }
        else {
          date.setDate(date.getDate())
          const newDate = date.getDate()

          // get month difference between the current date and the given date
          var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

          // If the month difference is 0 then directly click a date on the current month, but if the month difference not 0 then, click the previous month arrow, the number of times same as month difference
          if (monthsdiff1 == 0) {
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
          else {
            await this.page.waitForTimeout(2000)
            // click on calendar arrows as the number of times same as the month difference(converted to positive value)
            await this.clickOnCalendarArrows(Math.abs(monthsdiff1), caseType)
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
        }

      case 'next':
        if (dayOfWeekNumber === 6) {
          // If the given day is Saturday then add 2 day on the given day
          date.setDate(date.getDate() + 2);
          const newDate = date.getDate()

          // get month difference between the current date and the given date
          var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

          // If the month difference is 0 then directly click a date on the current month, but if the month difference not 0 then, click the previous month arrow, the number of times same as month difference
          if (monthsdiff1 == 0) {
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
          else {
            await this.page.waitForTimeout(2000)
            // click on calendar arrows as the number of times same as the month difference(converted to positive value)
            await this.clickOnCalendarArrows(Math.abs(monthsdiff1), caseType)
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
        }
        else if (dayOfWeekNumber === 0) {
          // If the given day is Sunday then add 1 day on the given day
          date.setDate(date.getDate() + 1);
          const newDate = date.getDate()

          // get month difference between the current date and the given date
          var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

          // If the month difference is 0 then directly click a date on the current month, but if the month difference not 0 then, click the previous month arrow, the number of times same as month difference
          if (monthsdiff1 == 0) {
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
          else {
            await this.page.waitForTimeout(2000)
            // click on calendar arrows as the number of times same as the month difference(converted to positive value)
            await this.clickOnCalendarArrows(Math.abs(monthsdiff1), caseType)
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
        }
        else {
          date.setDate(date.getDate())
          const newDate = date.getDate()

          // get month difference between the current date and the given date
          var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

          // If the month difference is 0 then directly click a date on the current month, but if the month difference not 0 then, click the previous month arrow, the number of times same as month difference
          if (monthsdiff1 == 0) {
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
          else {
            await this.page.waitForTimeout(2000)
            // click on calendar arrows as the number of times same as the month difference(converted to positive value)
            await this.clickOnCalendarArrows(Math.abs(monthsdiff1), caseType)
            await this.page.waitForTimeout(2000)
            // verify the date is visible on the calendar
            await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
            // click on calendar date
            await (await this.getCalendarDate(calendarDataId, newDate)).click()
            return date
          }
        }

      default:
        const newDate = date.getDate()
        await this.page.waitForTimeout(2000)
        // verify the date is visible on the calendar
        await expect(await this.getCalendarDate(calendarDataId, newDate)).toBeVisible()
        // click on calendar date
        await (await this.getCalendarDate(calendarDataId, newDate)).click()
        return date
    }
  }

  /**
* These methods are for deleting all the leaves and timesheet for a particular user, by using the respected APIs
*/

  //Store the responce in a variable from login API
  async getToken() {
    const response = await this.page.request.post(automationData.baseUrl + `api/loginUser`, {
      headers: {
        "Timestamp": new Date().toISOString()
      },
      data: {
        "email": automationData.email,
        "password": automationData.password
      }
    });
    // await expect(response).toBeOK();
    return response
  }

  /**
    * This method deletes all the leaves of a particular user
    */
  async deleteLeave() {
    const response = await this.getToken()
    await response.json().then(async (body) => {
      // User ID from responce body
      const userId = await body.user._id
      // Get token from responce body
      const bearerToken = await body.token
      await this.page.request.post(automationData.baseUrl + `api/deleteRecords`, {
        headers: {
          Authorization: `Bearer ` + bearerToken
        },
        data: {
          "entity": "leave",
          "user": userId
        }
      });
    })
  }

  /**
  * This method deletes all the leaves of a particular user
  */
  async deleteUsersLeave(userId: string) {
    const response = await this.getToken()
    await response.json().then(async (body) => {
      // Get token from responce body
      const bearerToken = await body.token
      await this.page.request.post(automationData.baseUrl + `api/deleteRecords`, {
        headers: {
          Authorization: `Bearer ` + bearerToken
        },
        data: {
          "entity": "leave",
          "user": userId
        }
      })
    })
  }

  /**
   * This method deletes all the timesheet of a particular user
  */

  async deleteTimeSheet() {
    const response = await this.getToken()
    await response.json().then(async (body) => {
      // User ID from responce body
      const userId = await body.user._id
      // Get token from responce body
      const bearerToken = await body.token
      await this.page.request.post(automationData.baseUrl + `api/deleteRecords`, {
        headers: {
          Authorization: `Bearer ` + bearerToken
        },
        data: {
          "entity": "timesheet",
          "user": userId
        }
      });
    })
  }
}
