const faker = require('faker')
const moment = require('moment')
const tomorrow = moment().add(1, 'days').format('DD MMM YYYY');

module.exports = {


    elements: {
        /*
        Elements of Page Header
        */
        "subjectivePageTitle": "SUBJECTIVE QUESTIONS",
        "xPathForTimer": `//*[@class="timer-div"]//label`,

        //---------------------------------------------------------------------------------------------------------------------------------------
        // text
        "section1": "Section 1",
        "section2": "Section 2",

        
        "sectionOneSelector": `.subjective-category-list mat-accordion:nth-child(1)`,
        "sectionTwoSelector": `.subjective-category-list mat-accordion:nth-child(2)`,
      
        "openSection1": `.subjective-category-list mat-accordion:nth-child(1) [role="button"]`,
        "openSection2": `.subjective-category-list mat-accordion:nth-child(2) [role="button"]`,

        
        "xpathForCompilerDropdownSection1": `(//*[@data-id="select-language-dropdown"])[1]`,
        "xpathForCompilerDropdownSection2": `(//*[@data-id="select-language-dropdown"])[2]`,

        //------------------------------------------------------------------------------------------------------------------------------------------
        
        "question": "1",
        "question_1": "Question 1",

        // english question text
        "engQue1": "Write about your work culture.",
        "engQue2": "Where do you live?",
        "engQue4": "What is your company name?",
        "engQue3": "What is your hobby?",

        // coding question text
        "codingQue1": "Write a Java Program to multiply 5 & 58.",
        "codingQue2": "Write a Java program to add 10 and 20.",
        "codingQue3": "Java Program to print Multiplication of two floating",
        "codingQue4": "Swap two number.",

        // xpath for run button of the opened question toggle of section 1
        "xPathforRunButtonSection1": `(//*[@aria-expanded="true"]//following-sibling::div//button[@data-id="run-button"])[1]`,
        "xPathforRunButtonSection2": `(//*[@aria-expanded="true"]//following-sibling::div//button[@data-id="run-button"])[2]`,

        // data-id of 'Run' button
        "runButton": `run-button`,
        // General XPath for Run button
        "xPathforRunButton": `//*[@aria-expanded="true"]//following-sibling::div//button[@data-id="run-button"]`,

        
        "xPathforRunButton1": `(//button[@data-id="run-button"])[1]`,
        "xPathforRunButton2": `(//button[@data-id="run-button"])[2]`,
        "xPathforRunButton3": `(//button[@data-id="run-button"])[3]`,
        "xPathforRunButton4": `(//button[@data-id="run-button"])[4]`,

        
        "xpathForcompilerNameOnInputBox1": `(//*[contains(@class,'language-label-div')])[1]`,
        "xpathForcompilerNameOnInputBox2": `(//*[contains(@class,'language-label-div')])[2]`,
        "xpathForcompilerNameOnInputBox3": `(//*[contains(@class,'language-label-div')])[3]`,
        "xpathForcompilerNameOnInputBox4": `(//*[contains(@class,'language-label-div')])[4]`,

        
        "xpathForAnswerArea1": `(//textarea[@data-id="text-area"])[1]`,
        "xpathForAnswerArea2": `(//textarea[@data-id="text-area"])[2]`,
        "xpathForAnswerArea3": `(//textarea[@data-id="text-area"])[3]`,
        "xpathForAnswerArea4": `(//textarea[@data-id="text-area"])[4]`,

        // xpaths for the code output area
        "xpathForOutputArea1": `(//textarea[@data-id="output-text-area"])[1]`,
        "xpathForOutputArea2": `(//textarea[@data-id="output-text-area"])[2]`,
        "xpathForOutputArea3": `(//textarea[@data-id="output-text-area"])[3]`,
        "xpathForOutputArea4": `(//textarea[@data-id="output-text-area"])[4]`,

        // Xpaths for the code output area for SQL languaga
        "xpathForOutputAreaSQL1": `(//*[contains(@class,"sql-output")])[1]`,
        "xpathForOutputAreaSQL2": `(//*[contains(@class,"sql-output")])[2]`,
        "xpathForOutputAreaSQL3": `(//*[contains(@class,"sql-output")])[3]`,
        "xpathForOutputAreaSQL4": `(//*[contains(@class,"sql-output")])[4]`,

        // Miscellaneous elements
        "questiontext1": "Write about your work culture.",
        "answerArea": "mat-input-0",
        "saveAnswerButton": "save-answer-button",
        "savAnswerText": "Save",
        "subjectiveToggle": "subjective-toggle",
        "question1": "Question 1",
        "question2": "Question 2",
        "textarea": "text-area",
        "languageJava": "JAVA",
        "questionCategoryClass": "category-questions",
        "dropdown1": "1",
        "dropdown2": "2",
        "overlayBackdrop": ".cdk-overlay-backdrop",
        "firstNameField": "registration-firstname",
        "lastNameField": "registration-lastname",
        "phoneNumberField": "registration-phone",
        "fieldOfInterest": "registration-interest",
        "selectFieldOfInterestAsDev": "Automation Software Development",
        "tncCheckbox": "registration-tnc-checkbox",
        "registerButtonText": "Register",
        "registrationPageTitle": "REGISTRATION",
        "emailAddressField": "registration-email",
        "timeOption": "03:00 PM",
        "generatePasswordButton": "registration-generate-password-button",
        "generatePasswordButtonText": "Generate Password",
        "senderEmail": "sender@email.in",
        "emailSubject": "Password Generated Successfully",
        "otpPasswordField": "registration-password",
        "finishButton": "registration-finish-registration-button",
        "finishRegistrationButtonText": "Finish Registration ",
        "registrationSuccessToasterMessage": "Registration Successful",
        "registrationSuccessfulEmailSubject": "Registration Successful",
        "loginPageHeading": "LOGIN",
        "emailField": "login-email",
        "passwordField": "login-password",
        "loginButton": "login-submit-button",
        "loginButtonText": 'Login',
        "loginSuccessfulText": "Login Successful",
        "popuopOkButton": "OK",
        "hamburgerMenu": "menu",
        "candidatesPage": " Candidates",
        "pageTitleCandidates": "Candidates",
        "candidateSearchBar": "candidate-search",
        "candidateEditIcon": "candidate-edit-user",
        "candidateEditIconText": "edit",
        "popupSelector": "app-add-user-dialog",
        "calendarIcon": `.add-user-field [aria-label="Open calendar"]`,
        "hourField": "hours",
        "minuteField": "minutes",
        "ampmButtonSelector": "timepicker button",
        "byAdminRadioButton": "candidate-by-admin-radio",
        "candidateRegistrationSubmitButton": "candidate-registration-submit-button",
        "devAptPaperTile": "Aptitude Test",
        "devEnglishPaperTile": "English Test",
        "devCodingPaperTile": "Coding Test",
        "questionClass": "question",
        "Question_1": "121 Divided by 11 is",
        "submit_Paper_button": "paper-submit-button",
        "submit": "Submit",
        "confirmationPopupTextObj":"Are you sure you want to submit the paper?",
        "testCompletedTitleText": "Test was completed",
        "testCompletedText": "You can not access the test after completion. Contact HR if any help needed",


        


        //--------------------------------------------------------------------------------------------------------------------------------------
        /**
         * Elements and texts of the Submittion popup
         */
        "finishButtonText": "Finish Paper",
        "previewAnswer": "Preview Answer Sheet",
        "previewPopup": "question-answer-div",
        "cancelSubmissionButton": "cancel-submission-button",
        "cancelSubmissionButtonText": "Cancel Submission",
        "continueSubmitButton": "continue-submit-button",
        "continueSubmitButtonText": "Continue Submit",
        "codingSelectLanguageDropdown": "select-language-dropdown",
        "codingSelectDrodownText": "Select Language",
        "confirmLanguageTitleSec1": "You have selected JAVA for Section 1",
        "confirmLanguageTitleSec2": "You have selected JAVA for Section 2",
        "confirmLanguageMessage": "Once you choose a language for this section, you can't change it. ",
        "Yes": "OK",
        "Cancel": "Cancel",
        // Texts on Submittion popup
        "previewAnswerPopupTitle": "Preview Answer Sheet",
        "previewAnswerPopupText": "Please check your answers before submitting them, if everything is correct, please submit your answer.",
        "previewAnswerPopupWarning": "*Click on Continue Submit will end the test for this paper.",
        // selectors of questions 1 and 2 on the submittion popup
        "question1SelectorOnSubmittionPopup": `div.preview-subjective-answers-body > div:first-of-type .question-answer-div:first-of-type .question-answer-text`,
        "question2SelectorOnSubmittionPopup": `div.preview-subjective-answers-body > div:last-of-type .question-answer-div:first-of-type .question-answer-text`,
        // selectors of answers 1 and 2 on the submittion popup
        "answer1SelectorOnSubmittionPopup": `div.preview-subjective-answers-body > div:first-of-type .question-answer-div:last-of-type .question-answer-text`,
        "answer2SelectorOnSubmittionPopup": `div.preview-subjective-answers-body > div:last-of-type .question-answer-div:last-of-type .question-answer-text`,
        // xPath of the container element that has the questions and answer
        "xPathOfSubmittionPopupContainer": `//*[@class="preview-subjective-answers-body"]`,

    },
    data: {
        // Answers to be typed in the answer input box
        "engAnswer1": "test answer",
        "engAnswer2": "test answer",
        "engAnswer3": "test answer",
        "engAnswer4": "test answer",
        "codingAnswer1": "test",
        "codingAnswer2": "test",
        "codingAnswer3": "test",
        "codingAnswer4": "test",
        "gbgbUserDefinedDriveId": 122,
        "gbgbUserDefinedDrive": "Automation Test Drive Global Global UD",
        "first_Name": faker.name.firstName(),
        "last_Name": faker.name.lastName(),
        "email5": "qa+5" + Date + "@example.co.in",
        "phoneNumber": faker.phone.phoneNumber('9#########'),
        "tomorrowDate": tomorrow,
        "timeText02": "03:00 PM",
        "dateText": ` ${moment().format('D')} `,
    }
}

