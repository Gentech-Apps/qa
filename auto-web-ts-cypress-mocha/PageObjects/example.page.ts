import * as exampledata from "../Fixtures/exampledata.ts";


class examplePage {

    /*
    Get element by data-id
    */
    elementByDataid(value: string) {
        return cy.get(`[data-id='${value}']`, { timeout: 10000 })
    }

    /*
    Get element by title
    */
    elementByTitle(value: string) {
        return cy.get(`[title='${value}']`, { timeout: 10000 })
    }

    /*
    Get element by text
    */
    elementByText(value: string) {
        return cy.xpath(`//*[text()='${value}']`, { timeout: 10000 })
    }

    /*
    Get element by class
    */
    elementByClass(value: string) {
        return cy.xpath(`//*[@class='${value}']`, { timeout: 10000 })
    }

    /*
    Get element by class and data id 
    */
    elementByClassandDataId(value: string, value1: string) {
        return cy.xpath(`//*[contains(@class,'${value}')]//*[@data-id='${value1}']`, { timeout: 10000 })
    }

    /*
    Get element by data-id and text
    */
    elementByDataidAndText(value: string, value1: string) {
        return cy.xpath(`(//*[text()='${value}']//following::textarea[@data-id='${value1}'][1])`, { timeout: 10000 })
    }

    /**
     * Function to click on the time fields (Hour and Minutes) and enter data in them.
     */
    elementforTimeFields(value: string, input: string) {
        cy.xpath(`//input[@aria-label="${value}"]`).click().clear().type(input)
    }

    /*
     Get element by class and data id 
     */
    elementByClassandText(value: string, value1: string) {
        return cy.xpath(`//*[contains(@class,'${value}')]//*[text()='${value1}']`, { timeout: 10000 })
    }

    /*
    function to click on expansion arrow in section
    */
    clickToExpandSec(section: string) {
        this.elementForSecExpansion(section).should("be.visible", { timeout: 5000 }).click({ force: true })
    }

    /* 
    element for expanding section
    */
    elementForSecExpansion(section: string) {
        return cy.xpath(`(//*[@data-id='${section}']//ancestor::mat-expansion-panel-header//child::span[2])`)
    }

    /*
    *Get element by selector 
    */
    elementBySelector(value: string) {
        return cy.get(value)
    }

    /**
     * Get element that contains a text
     */
    elementContainingText(value: string) {
        return cy.contains(value)
    }


    /**
     * Function to Click on the arrow icon in the Calendar
     * @param numberOftimes Number of Times the arrow needs to be clicked
     * @param value It should contain the values 'Previous' and 'Next' to determine which arrow needs to be clicked
     */
    clickOnArrowCalendar(numberOftimes: number, value: string) {
        for (let i = 0; i < numberOftimes; i++) {
            cy.xpath(`//button[@aria-label="${value} month"]`).click()
        }
    }

    /**
     * Function to click on specified date
     * @param value The Date on which the function will click, input will be in Date data type
     */
    clickOnDateCalendar(value: Date) {
        // Change the date format to string
        let updatedDate = this.changeDateFormat(value);

        // Click on the date on calendar and close the calendar
        cy.xpath(`//button[@aria-label="${updatedDate}"]`).click();
        cy.wait(1000);

        // Check if the overlayBackdrop element is present in the DOM
        cy.get('body').then(($body) => {
            if ($body.find(exampledata.elements.overlayBackdrop).length > 0) {
                // If the overlayBackdrop is present, click on it
                this.elementBySelector(exampledata.elements.overlayBackdrop).click({ force: true });
            } else {
                // If the overlayBackdrop is not present, do nothing
                cy.log('Overlay backdrop is not present, no action needed.');
            }
        });
    }


    /**
     * Function to click on specified date
     * @param value The Date on which the function will click, input will be in 'string' data type
     */
    clickOnCalendarDateByText(value: string) {
        // click on the date
        this.elementByText(value).click()
        cy.wait(500)
        // close the calendar popup
        this.elementBySelector('.mat-overlay-transparent-backdrop').click({ force: true })
    }

    /*
    add text to fields
    */
    insertTextByDataId(element: string, textValue: string) {
        this.elementByDataid(element).should("be.visible", { timeout: 5000 }).clear().type(textValue, { delay: 30, timeout: 5000 })
    }

    /*
    click on button by dataid and button text verification by contains
    */
    clickOnButtonByDataid(buttonName: string, buttonText: string) {
        // verify button text
        this.elementByDataid(buttonName).contains(buttonText)
        // click on button
        this.elementByDataid(buttonName).should("be.visible", { timeout: 5000 }).click({ force: true })
    }

    /*
    click on button by text
    */
    clickOnButtonByText(button: string, buttontext: string) {
        // verify button text
        this.elementByText(button).contains(buttontext)
        // click on button
        this.elementByText(button).should("be.visible", { timeout: 5000 }).click({ force: true })
    }

    /*
    verify page title by text
     */
    verifyPageByText(pagetitle: string) {
        //verify examinee page title
        this.elementByText(pagetitle).should("be.visible", { timeout: 5000 })
    }

    /*
    Verify page by title
    */
    verifyPageByTitle(title: string, pagetitle: string) {
        this.elementByTitle(title)
        this.elementByText(pagetitle).should('have.text', pagetitle, { timeout: 5000 })
    }

    /*
    verify validation message on fields
     */
    verifyFieldValidationMessage(fieldName: string, fieldMessage: string) {
        this.elementByDataid(fieldName).should("be.visible", { timeout: 5000 }).contains(fieldMessage)
    }

    /*
    Function to validation by text
    */
    verifyValidationByText(fieldMessage: string) {
        this.elementByText(fieldMessage).should("be.visible", { timeout: 5000 })
    }

    /*
    verify Warning popup validation
    */
    verifyPopupMessage(titleText: string, message: string, option: string) {
        this.elementByText(titleText).should("be.visible", { timeout: 5000 })
        //this.elementByText(message).should("be.visible", { timeout: 5000 })
        this.clickOnButtonByText(option, option)
    }

    /*
    Verify popup message
     */
    verifyConfirmationPopup(sucessMessage: string, option: string) {
        this.elementByText(sucessMessage).should("be.visible", { timeout: 5000 })
        this.clickOnButtonByText(option, option)
    }

    /*
    function to clear the field data
    */
    clearFieldData(fieldName: string) {
        this.elementByDataid(fieldName).clear({ force: true })
    }

    /* 
    function to verify toaster messages
    */
    verifyToasterMessage(message: string) {
        this.elementBySelector(exampledata.elements.toasterElement).should("be.visible", { timeout: 5000 }).should('contain', message)
    }

    /**
     * Clicks on a specific date in a Calendar popup.
     * 
     * This function handles the following scenarios:
     * 1. If the selected date is in a different month than the current month displayed on the calendar, 
     *    the function navigates to the correct month and then clicks on the specified date.
     * 2. If the selected date falls on a weekend (Saturday or Sunday), the function will:
     *    - Select the previous Friday if 'Previous' is specified as the value.
     *    - Select the next Monday if 'Next' is specified as the value.
     * 
     * @param date The date that needs to be clicked, provided in Date format.
     * @param value A string indicating whether to select the 'Next' Monday or 'Previous' Friday if the date is a weekend.
     *              Valid values are 'Next' and 'Previous'.
     * @returns void
     */
    async clickOnCalendarDate(date: Date, value: string) {
        const dayOfWeekNumber = date.getDay()
        switch (value) {
            case 'Previous':
                if (dayOfWeekNumber === 6) {
                    // Saturday -- subtract 1 day :: 
                    date.setDate(date.getDate() - 1);
                    const d1 = date
                    var currentDate = new Date();
                    // get month difference
                    var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

                    if (monthsdiff1 == 0) {
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }
                    else {
                        // click on calendar arrows
                        this.clickOnArrowCalendar(Math.abs(monthsdiff1), value)
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }
                }
                else if (dayOfWeekNumber === 0) {
                    // Sunday -- subtract 2 days :: 
                    date.setDate(date.getDate() - 2);
                    const d1 = date.getDate()
                    var currentDate = new Date();

                    // get month difference
                    var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

                    if (monthsdiff1 == 0) {
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }
                    else {
                        // click on calendar arrows
                        this.clickOnArrowCalendar(Math.abs(monthsdiff1), value)
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }
                }
                else {
                    // click on calendar date
                    this.clickOnDateCalendar(date)
                    console.log(date)
                    return date
                }
                break

            case 'Next':
                if (dayOfWeekNumber === 6) {
                    // Saturday -- Add 2 days :: 
                    date.setDate(date.getDate() + 2);
                    const d1 = date.getDate()
                    var currentDate = new Date();

                    // get month difference
                    var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

                    if (monthsdiff1 == 0) {
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }
                    else {
                        // click on calendar arrows
                        this.clickOnArrowCalendar(Math.abs(monthsdiff1), value)
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }

                }
                else if (dayOfWeekNumber === 0) {
                    // Sunday -- Add 1 days :: 
                    date.setDate(date.getDate() + 1);
                    const d1 = date.getDate()
                    var currentDate = new Date();

                    // get month difference
                    var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (date.getFullYear() * 12 + date.getMonth()))

                    if (monthsdiff1 == 0) {
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }
                    else {
                        // click on calendar arrows
                        this.clickOnArrowCalendar(Math.abs(monthsdiff1), value)
                        // click on calendar date
                        this.clickOnDateCalendar(date)
                        return date
                    }
                }
                else {
                    // click on calendar date
                    this.clickOnDateCalendar(date)
                    return date
                }
                break

            default:
                // click on calendar date
                this.clickOnDateCalendar(date)
                return date
        }
    }

    /**
     * Function to select a specific date in a calendar popup.
     * 
     * This method performs the following steps:
     * 1. Opens the calendar popup by clicking on the date field element.
     * 2. Calculates the difference in months between the current date and the specified date.
     * 3. If the specified date is in the same month as the current date:
     *    - Directly clicks on the specified date in the calendar.
     * 4. If the specified date is in a different month:
     *    - Navigates to the correct month by clicking the calendar arrows the necessary number of times.
     *    - Clicks on the specified date in the calendar.
     * 
     * @param date The Date object representing the date that needs to be selected.
     * @param value A string indicating the action to take if the date falls on a weekend.
     *              'Next' selects the next Monday, 'Previous' selects the previous Friday.
     * @returns void
     */
    async selectDate(date: Date, value: string) {
        // click on calendar icon
        this.elementByDataid(exampledata.elements.dateField).click()
        // get current date
        var currentDate = new Date();
        const moment = require('moment');
        date = moment().add(1, 'days').format('DD MMM YYYY');
        cy.log(`${date}`)
        var d1 = new Date(date);
        // get month difference
        var monthsdiff1 = ((currentDate.getFullYear() * 12 + currentDate.getMonth()) - (d1.getFullYear() * 12 + d1.getMonth()))
        cy.log(`"Months Difference Calculated" = ${monthsdiff1.toString()}`)
        if (monthsdiff1 === 0) {
            // click on calendar date
            this.clickOnCalendarDate(d1, value)
        }
        else {
            // click on calendar arrows
            this.clickOnArrowCalendar(Math.abs(monthsdiff1), value)
            // click on calendar date
            this.clickOnCalendarDate(d1, value)
        }
    }

    /**
     * Function to change the input from date format to string
     * @param d1 : input in datatype Date
     * @returns : the same date in string in the format '20 June 2024'
     */
    changeDateFormat(d1: Date) {
        //var date1 = format(d1,"mm dd yy")
        let dateObject = new Date(d1);
        // extract date from dateObject
        let day = dateObject.getDate();
        // extract full name of month from dateObject E.g. "June"
        let month = dateObject.toLocaleString('default', { month: 'long' });
        // extract full year from dateObject
        let year = dateObject.getFullYear();
        // create the formatted date E.g. 10 June 2024
        let formattedDate = `${day} ${month} ${year}`;
        return formattedDate
    }

    /**
     * function select time and date on registartion of candidate
     * @param dateOption : Date on which you want to click on
     * @param option : 'Next'/'Previous' are the valid inputs, if there is a month difference you want to click on 'next' month or 'previous' month
     * @param timeOption : Time option that you want to select - this would be a text
     */
    selectDateAndTime(dateOption: any, option: string, timeOption: string) {
        //select Date in the form by clicking on calendar
        this.selectDate(dateOption, option)
        //select time 
        this.selectTime(timeOption)
    }

    /*
    function to select time 
    */
    selectTime(time: string) {
        // Click on the time dropdown
        this.elementByDataid(exampledata.elements.timeField).should("be.visible", { timeout: 5000 }).click({ force: true })
        this.elementByDataid(time).scrollIntoView().click({ force: true })
    }

    /*
    search Candidate on examinee marks page
    */
    searchCandidate(values: string, textValue: string, name: string) {

        //click on search field
        this.elementByDataid(exampledata.elements.examineeSearch).should("be.visible", { timeout: 10000 })
        //enter the keyword in the field
        this.elementByDataid(exampledata.elements.examineeSearch).clear().type(textValue, { delay: 30, timeout: 5000 })
        //click on search icon
        this.elementByDataid(exampledata.elements.examineeSearch).type("{enter}", { delay: 30, timeout: 5000 });

        //verify the user 
        this.elementByDataid(name).should("be.visible", { timeout: 10000 });
    }

    /*
    function to visit registration page and add Candidate with basic details  
    */
    candidateRegistration(firstNameField: string, firstname: string, lastNameField: string, lastName: string,
        emailAddressField: string, email: string, phoneNumberField: string, phoneNumber: string,
        fieldOfInterest: string, selectFieldOfInterestAsDev: string) {
        //go to registration page 
        this.visitRegistrationPage()
        //verify and insert data in the first name field
        this.addDataInTextField(firstNameField, firstname)
        //verify and insert data in the last name field
        this.addDataInTextField(lastNameField, lastName)
        //verify and insert data in the email field
        this.addDataInTextField(emailAddressField, email)
        //verify and insert data in the phone number field
        this.addDataInTextField(phoneNumberField, phoneNumber)
        //verify and select area of interest
        this.selectInterest(fieldOfInterest, selectFieldOfInterestAsDev)
        // click on terms and condition checkbox
        this.clickOnCheckbox(exampledata.elements.tncCheckbox)
    }

    /**
    verify and go to regostartaion page 
     */
    visitRegistrationPage() {
        cy.visit('/')
        this.clickOnButtonByText(exampledata.elements.registerButtonText, exampledata.elements.registerButtonText)
        // verify the page title
        this.elementContainingText(exampledata.elements.registrationPageTitle).should('be.visible')
    }

    /**Function to wait for the current time to be equal to the entered time.
     * When these times are equal then login
     */
    waitForCurrentTime(email: string, password: string) {
        const moment = require('moment');
        // define the time that was set for exam
        let futureMinute = moment().add(2, 'minutes').format('mm');
        const checkTimeAndLogin = () => {
            // if current time = set time then login
            if (moment().format('mm') === futureMinute) {
                this.login(email, password);
            } else {
                // else wait for 10 seconds and check again
                cy.wait(10000).then(() => {
                    checkTimeAndLogin()
                });
            }
        };
        checkTimeAndLogin();
    }

    /* 
    futncion to verify paper page
    */
    VerifyPapersPage(firstName: string, lastName: string, AOI: string, aptitude: string, english: string, coding?: string) {
        //verify page title
        cy.wait(1000)
        this.verifyPageByText(exampledata.elements.examineePageTitle)
        //verify examinee name on papers page
        this.verifyExamineeName(firstName + " " + lastName, "Welcome" + " " + firstName + " " + lastName)
    }

    /**
    verify examinee name
    */
    verifyExamineeName(examineename: string, text: string) {
        //verify examinee name 
        this.elementByDataid(examineename).contains(text)
    }

    /*
    verify active paper
    */
    verifyActivePaper(paper: string) {
        //verify active paper
        this.elementByClassandDataId(exampledata.elements.examineefootercard, paper).should("have.class", exampledata.elements.activePaperClass)
        //click on start Paper
        this.clickOnButtonByDataid(exampledata.elements.paperStartButton, exampledata.elements.paperstartButtontext)
        cy.wait(2000)
    }

    /*
    function to select answers
    */
    selectAnswers(question: string, answer: string) {
        switch (question) {
            case ("121 Divided by 11 is"):
                this.elementByClassandText(exampledata.elements.questionClass, question).scrollIntoView().should("be.visible", { timeout: 5000 })
                this.elementByClassandText(exampledata.elements.questionClass, question).should("be.visible", { timeout: 5000 }).click({ force: true })

                this.elementByDataid(answer).scrollIntoView().should("be.visible", { timeout: 5000 }).click({ force: true })
                this.elementByDataid(answer).should("be.visible", { timeout: 5000 }).click({ force: true })
                this.elementByClassandText(exampledata.elements.questionClass, question).should("be.visible", { timeout: 5000 }).click({ force: true })
                break
            case ("60 Times of 8 Equals to"):
                this.elementByClassandText(exampledata.elements.questionClass, question).scrollIntoView().should("be.visible", { timeout: 5000 })
                this.elementByClassandText(exampledata.elements.questionClass, question).should("be.visible", { timeout: 5000 }).click({ force: true })

                this.elementByDataid(answer).scrollIntoView().should("be.visible", { timeout: 5000 }).click({ force: true })
                this.elementByDataid(answer).should("be.visible", { timeout: 5000 }).click({ force: true })
                this.elementByClassandText(exampledata.elements.questionClass, question).should("be.visible", { timeout: 5000 }).click({ force: true })
                break
            default:
                console.log(`The question is not found!`)
        }
    }

    /*
    function to start paper
    */
    startPaper(paper: string, title: string) {
        //verify the given paper is active and click to start
        this.verifyActivePaper(paper)
        this.elementByDataid(title).click()
    }

    /*
    submit subjective coding paper
    */
    addSubjectCodingAnswer(section: string, language: string, quesno: string, number: string, dropdown: string, title: string) {

        switch (number) {
            case ("1"):
                //get question
                cy.xpath(`(//*[@class='category-questions']//parent::p)[${number}]`).invoke('text').then((ele => {
                    console.log(ele)
                    let devQue1 = ele;
                    //add answer to the text area
                    this.fillAnswer(devQue1, exampledata.data.codingAnswer1)
                }))
                break
            case ("2"):
                //get question
                cy.xpath(`(//*[@class='category-questions']//parent::p)[${number}]`).invoke('text').then((ele => {
                    console.log(ele)
                    let devQue2 = ele;
                    //add answer to the text area
                    this.fillAnswer(devQue2, exampledata.data.codingAnswer2)
                }))
                break
            case ("3"):
                //get question
                cy.xpath(`(//*[@class='category-questions']//parent::p)[${number}]`).invoke('text').then((ele => {
                    console.log(ele)
                    let devQue3 = ele;
                    //add answer to the text area
                    this.fillAnswer(devQue3, exampledata.data.codingAnswer3)
                }))
                break
            case ("4"):
                //get question
                cy.xpath(`(//*[@class='category-questions']//parent::p)[${number}]`).invoke('text').then((ele => {
                    console.log(ele)
                    let devQue4 = ele;
                    //add answer to the text area
                    this.fillAnswer(devQue4, exampledata.data.codingAnswer4)
                }))
                break
            default:
                console.log("no match")
        }
    }

    /*
    Selct Text box and add text
    */
    fillAnswer(questionText: string, answer: string) {
        this.elementByDataidAndText(questionText, exampledata.elements.textarea).should("be.exist", { timeout: 5000 }).click({ force: true })
        this.elementByDataidAndText(questionText, exampledata.elements.textarea).type(answer, { delay: 30, timeout: 5000 })
    }

    /*
    submit objective paper
    */
    submitPaper(confirmationPopup: string, popupButton: string) {
        //click on submit button on objective paper
        this.clickOnButtonByDataid(exampledata.elements.submit_Paper_button, exampledata.elements.submit)
        cy.wait(2000)
        switch (popupButton) {
            case ("Yes, Submit"):
                //verify confirmation popup and submit
                this.verifyConfirmationPopup(confirmationPopup, popupButton)
                //verify the sucessfull popup
                this.verifyPopupMessage(exampledata.elements.sucessTitle, exampledata.elements.sucessMessage, exampledata.elements.okButton)
                //function to verify page
                //commonPage.verifyPageByText(candidatePaperData.elements.examineePageTitle)
                break
            case ("cancel"):
                //verify confirmation popup and submit
                this.verifyConfirmationPopup(confirmationPopup, popupButton)
                break
            default:
                console.log("no option match")

        }
    }

    /*
    function to add firstName  
    */
    addDataInTextField(firstNameField: string, firstName: string) {
        //verify the first name field
        this.elementByDataid(firstNameField).should("be.visible", { timeout: 5000 })
        //insert the first name 
        this.insertTextByDataId(firstNameField, firstName)
    }

    /*
    function to select area of interest
    */
    selectInterest(fieldOfInterest: string, selectFieldOfInterest: string) {
        // veirfy and Select area of interest field 
        this.elementByDataid(fieldOfInterest).should("be.visible", { timeout: 5000 }).click({ force: true })
        //verify and select interest option
        this.elementByDataid(selectFieldOfInterest).scrollIntoView().should("be.visible", { timeout: 5000 }).click({ force: true })
    }

    /*
    function to click on checkbox
    */
    clickOnCheckbox(option: string) {
        //Check the terms and conditions checkbox
        this.elementByDataid(option).check({ force: true })
    }

    /**
     * verify registartion succes toaster message, screen message and verify exam date and time from candidate email
     */
    verifyRegistration(candidateEmail: string) {
        // verify toaster message
        this.verifyToasterMessage(exampledata.elements.registrationSuccessToasterMessage)
        //verify sucessfull registration screen
        this.elementContainingText(exampledata.elements.registrationSuccessPageMessage).should('be.visible')
        //get time and date from mail and verify it
        cy.getRegistrationSuccessfulEmail(exampledata.elements.senderEmail, exampledata.elements.registrationSuccessfulEmailSubject, candidateEmail).then((emailInfo) => {
            let startTime = emailInfo[0]
            let startDate = emailInfo[1]
            cy.log(`Here is the start time and start date scraped from email = ${startTime} and ${startDate}`)
            expect(startTime[0]).to.be.equal(exampledata.data.timeText02)
            //cy.wrap(commonPage.changeDateFormat(new Date(startDate))).should('contain', '10')
        })
    }

    /*
    change a user's exam date and time to current date and time from admin
    */
    updateTestTimeToCurrent(email: string) {

        // Login as admin and navigate to Candidates page
        this.goToCandidatesPage()
        // search for the candidate using their email
        this.insertTextByDataId(exampledata.elements.candidateSearchBar, email)


        // click on edit icon in Actions column of the searched candidate
        this.clickOnButtonByDataid(exampledata.elements.candidateEditIcon, exampledata.elements.candidateEditIconText)

        // verify the edit candidate popup is visible
        this.elementBySelector(exampledata.elements.popupSelector).should('be.visible')

        // enter the current date and time in respective fields
        this.enterCurrentTime()

        // click on the radio button of "By Admin"
        this.elementByDataid(exampledata.elements.byAdminRadioButton).click()

        // click on submit button and logout from admin
        this.clickOnButtonByDataid(exampledata.elements.candidateRegistrationSubmitButton, exampledata.elements.candidateRegistrationSubmitButtonText)
        cy.wait(500)

        // Logout from Admin
        this.logout(exampledata.elements.logoutIcon, exampledata.elements.logoutPopupTitle, exampledata.elements.logoutButton)
    }

    /*
    logout from admin
    */
    logout(button: string, popuptitle: string, option: string) {
        //click on logout button
        this.clickOnButtonByText(button, button)
        //verify the popup and click Logout
        this.verifyConfirmationPopup(popuptitle, option)
    }

    /**(On Add/Edit Candidate details popup)
     * Enter the current date and time in hours and minutes in the respective fields
     */
    enterCurrentTime() {
        const moment = require('moment')
        var ct = moment().format('hh:mm:A')
        var currentTime = moment().add(2, 'minutes').format('hh:mm')
        var currentHour = /^\d{2}/.exec(currentTime)
        var currentMinutes = /\d{2}$/.exec(currentTime)
        // click on calendar icon and select today's date
        this.elementBySelector(exampledata.elements.calendarIcon).click()
        this.clickOnCalendarDateByText(exampledata.data.dateText)

        // enter the current time hour and minutes in the respective fields
        this.elementforTimeFields(exampledata.elements.hourField, currentHour[0])
        this.elementforTimeFields(exampledata.elements.minuteField, currentMinutes[0])

        cy.log(`The current time is ${ct}`)
        // change the AM/PM as per current time
        this.clickOnAMPM(exampledata.elements.ampmButtonSelector)
    }

    /*(On Add/Edit Candidate details popup)
     * Check the 'AM'/'PM' text on the popup and change it to current time AM/PM
     */
    clickOnAMPM(selector: string) {
        const moment = require('moment')
        var currentAMPM = moment().format('A')
        // Invoke the text present on the AM/PM field
        this.elementBySelector(selector).invoke('text').then((text) => {
            // The parameter @value should contain the current time AM/PM returned by moment
            let updatedValue = currentAMPM + " "
            if (text == updatedValue) {
                // Do nothing when AM/PM text is already as per current time
            }
            else {
                // if not, then click on the element to change it's value
                this.elementBySelector(selector).click()
            }
        })
    }

    /**
     * Function to login as admin and go to Candidates page
     */
    goToCandidatesPage() {
        this.loginAsExaminer()
        // click on the hamburger menu
        this.clickOnButtonByText(exampledata.elements.hamburgerMenu, exampledata.elements.hamburgerMenu)

        // click on candidates page
        this.clickOnButtonByText(exampledata.elements.candidatesPage, exampledata.elements.candidatesPage)
        // verify the page title 
        this.verifyPageByText(exampledata.data.pageTitleCandidates)
    }

    /*
    funtion to login and verify page 
    */
    loginAsExaminer() {
        cy.visit('/')
        // verify login page title
        this.verifyPageByTitle(exampledata.elements.loginPageHeading, exampledata.elements.loginPageHeading)
        //login with admin credentials
        this.login(Cypress.env('username'), Cypress.env('password'))
        //verify success popup
        this.verifyConfirmationPopup(exampledata.elements.loginSuccessfulText, exampledata.elements.popuopOkButton)
    }

    /*
   login 
   */
    login(username: string, password: string) {
        const moment = require('moment');
        cy.visit('/')
        // Add email in email field
        this.insertTextByDataId(exampledata.elements.emailField, username)
        //Add password in password field
        this.insertTextByDataId(exampledata.elements.passwordField, password)
        //function to click on login Button
        let currentTime = moment().format('hh:mm:A');

        this.clickOnButtonByDataid(exampledata.elements.loginButton, exampledata.elements.loginButtonText)

    }
}



export default new examplePage