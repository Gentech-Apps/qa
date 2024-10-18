import { test } from '@playwright/test';
import { ExamplePage } from '../pageObjects/examplePage';
import { automationData } from '../data/automationData';
import { format } from 'date-fns'

test.describe(" add timesheet", () => {

  test.beforeEach(async ({ page }) => {
    const examplePage = new ExamplePage(page);

    // Delete timesheet
    await examplePage.deleteTimeSheet()
    // Delete leave
    await examplePage.deleteLeave()
    // Go to the starting url before each test.
    await page.goto("/");
  })

  test.afterEach(async ({ page }) => {
    const examplePage = new ExamplePage(page)
    // Delete timesheet
    await examplePage.deleteTimeSheet()
    // Logout from application
    await examplePage.logout()
  })

  /**
  * Test case to add timesheet on current day
  */
  test('STC_1, add timesheet from dr page by selecting multiple projects', async ({ page }) => {
    const examplePage = new ExamplePage(page)
    // get current date
    var date = new Date();
    date.setDate(date.getDate());

    // login into the application
    await examplePage.login(automationData.email, automationData.password)
    // go to dailyreport page
    await examplePage.selectTab(automationData.elements.drModule, automationData.elements.drPageHeading)
    // click on the add timesheet button
    await examplePage.clickOnAddTimesheetButton()

    // click on the select date field to open calendar
    await examplePage.clickOnSelectDate()
    // select a date from the calendar
    var finalDate = await examplePage.selectDateForTimesheet(date, "", automationData.elements.addTimesheetCalendarByDataId)
    // click on the ok button on the calendar
    await (await examplePage.elementByDataId(automationData.elements.calendarOkbuttonByDataId)).click()

    // format the final date for timesheet
    var timesheetCardDate = format(finalDate, automationData.dateFormat)

    // select project, add description and time 
    await examplePage.addTimesheetMultiProject(automationData.projectName, automationData.projectName2)
    // verify the card details
    await examplePage.verifyMultiProjectTimesheetCard(timesheetCardDate)

    // go to the dashboard page
    await examplePage.selectTab(automationData.dbModule, automationData.dbTitleByText)
    await page.waitForTimeout(1000)
    // verify timesheet on dashboard
    await examplePage.verifyMultiProjectTimesheetOnDashboard(timesheetCardDate)

  })
})