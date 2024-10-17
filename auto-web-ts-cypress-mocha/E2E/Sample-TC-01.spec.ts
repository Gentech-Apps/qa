import examplePage from "../PageObjects/example.page"
import * as exampledata from "..exampledata.ts"
let candidateEmail: any
let emailOTP: any

describe("To verify the login functionality after completing the test candidate tries to login", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false
    })

    before("Activating the drive", () => {
        // Activating the registration and test of Drive 
        cy.activateRegistrationOfDrive(exampledata.data.gbgbUserDefinedDriveId)
        cy.activateTestOfDrive(exampledata.data.gbgbUserDefinedDriveId)
    })

    after("Deactivating the drives", () => {
        // Deactivating the registration and test of Drive
        cy.deactivateRegistrationOfDrive(exampledata.data.gbgbUserDefinedDriveId)
        cy.deactivateTestOfDrive(exampledata.data.gbgbUserDefinedDriveId)
    })

    it("Candidate Registration, login and completing the test", () => {
        // goto registartion and Add details on registration form
        candidateEmail = exampledata.data.email5
        examplePage.candidateRegistration(exampledata.elements.firstNameField, exampledata.first_Name,
            exampledata.elements.lastNameField, exampledata.last_Name,
            exampledata.elements.emailAddressField, candidateEmail,
            exampledata.elements.phoneNumberField, exampledata.phoneNumber,
            exampledata.elements.fieldOfInterest, exampledata.elements.selectFieldOfInterestAsDev)

        // verify the drive name on registration page
        examplePage.elementContainingText(exampledata.data.gbgbUserDefinedDrive)

        //select Date and time in the form by clicking on calendar and time dropdown
        examplePage.selectDateAndTime(exampledata.tomorrowDate, 'Next', exampledata.elements.timeOption)

        // verify and click on Generate Password Button
        examplePage.clickOnButtonByDataid(exampledata.elements.generatePasswordButton, exampledata.elements.generatePasswordButtonText)

        //get otp from email
        cy.getActivationLink(exampledata.elements.senderEmail, exampledata.elements.emailSubject, candidateEmail).then((otp) => {
            //cy.wait(2000)
            emailOTP = otp;
            //verify the field and fill the otp 
            examplePage.insertTextByDataId(exampledata.elements.otpPasswordField, emailOTP)
        })

        // verify and click on Finish button
        examplePage.clickOnButtonByDataid(exampledata.elements.finishButton, exampledata.elements.finishRegistrationButtonText)

        //verify sucessfull registration screen and verify date and time from email
        examplePage.verifyRegistration(candidateEmail)

        // Update the exam time of the candidate (searched using email) to current date and time
        examplePage.updateTestTimeToCurrent(candidateEmail)

        // get otp from mail (to be typed in the password field when logging in)
        cy.getActivationLink(exampledata.elements.senderEmail, exampledata.elements.emailSubject, candidateEmail).then((otp) => {
            emailOTP = otp;
            //login with candidate 
            examplePage.waitForCurrentTime(candidateEmail, emailOTP)
            // verify the login successful text
            examplePage.elementContainingText(exampledata.elements.loginSuccessfulText)
            // verify and click on 'OK' button
            examplePage.clickOnButtonByText(exampledata.elements.popuopOkButton, exampledata.elements.popuopOkButton);
        })

        // Verify candidate details in Papers page
        examplePage.VerifyPapersPage(exampledata.first_Name, exampledata.last_Name, exampledata.elements.selectFieldOfInterestAsDev, exampledata.elements.devAptPaperTile,
            exampledata.elements.devEnglishPaperTile, exampledata.elements.devCodingPaperTile)

        /**Verify the active paper
         * Check all instructions checkbox
         * Verify the paper title
         */
        examplePage.verifyActivePaper(exampledata.elements.devAptPaperTile)

        //Select the correct answers for the objective  question 1
        examplePage.selectAnswers(exampledata.elements.question_1, exampledata.elements.correct_answer_1)
        
        //submit Objective paper
        examplePage.submitPaper(exampledata.elements.confirmationPopupTextObj,
            exampledata.elements.popupSubmitButtonObj)

        //verify the coding paper is active and click to start the paper
        examplePage.startPaper(exampledata.elements.devCodingPaperTile, exampledata.elements.subjectivePageTitle)
        //add answer to coding paper in section-1 
        examplePage.addSubjectCodingAnswer(exampledata.elements.section1, exampledata.elements.languageJava,
            exampledata.elements.question1, "1", exampledata.elements.dropdown1, exampledata.elements.confirmLanguageTitleSec1)
        //expand section 2
        examplePage.clickToExpandSec(exampledata.elements.section2)
        //add answer to coding paper in section 2
        examplePage.addSubjectCodingAnswer(exampledata.elements.section2, exampledata.elements.languageJava,
            exampledata.elements.question1, "3", exampledata.elements.dropdown2, exampledata.elements.confirmLanguageTitleSec2)

        //submit Objective paper
        examplePage.submitPaper(exampledata.elements.confirmationPopupTextObj,
            exampledata.elements.popupSubmitButtonObj)
    })

    it("Candidate tries to login again", () => {
        // visit the login page and try to login
        cy.getActivationLink(exampledata.elements.senderEmail, exampledata.elements.emailSubject, candidateEmail).then((otp) => {
            emailOTP = otp;
            examplePage.login(candidateEmail, emailOTP)
        })
        // verify the title and text of the popup
        examplePage.elementContainingText(exampledata.elements.testCompletedTitleText).should('be.visible')
        examplePage.elementContainingText(exampledata.elements.testCompletedText).should('be.visible')
        // click on 'OK' button on the popup
        examplePage.elementContainingText(exampledata.elements.popuopOkButton).should('be.visible').click()
    })
})