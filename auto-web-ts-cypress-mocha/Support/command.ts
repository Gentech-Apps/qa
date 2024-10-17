import 'cypress-file-upload';

// wait for page load 
Cypress.Commands.add('waitForPageLoad', (method, url) => {
    cy.intercept({
        method: method,
        url: url,
    }).as("waitForPageLoad");

    let val
    cy.wait("@waitForPageLoad", { timeout: 30000 }).its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('loginUsingAPI', () => {
    cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
            "email": Cypress.env('username'),
            "password": Cypress.env('password')
        }
    }).then((response) => {
        let accessToken = response.body.data.token
        return accessToken;
    })
})

// Get email activation
Cypress.Commands.add('getActivationLink', (from, subject, to) => {
    cy.task("gmail:check", {
        from: from,
        subject: subject,
        to: to,
    }).then((email) => {
        const values = Object.values(email);
        var text = (values[0].body.html)
        var link = /(?<=\<strong\>)\d{8}/.exec(text)
        console.log("+++++++")
        console.log(link)
        return cy.wrap(link[0])
    });
})

// Get registration successful email
Cypress.Commands.add('getRegistrationSuccessfulEmail', (from: any, subject: any, to: any) => {
    cy.task("gmail:check", {
        from: from,
        subject: subject,
        to: to,
    }).then((email) => {
        const values = Object.values(email);
        //return cy.wrap(values[0])
        var text = (values[0].body.html)
        var startTime = /\d{2}\:\d{2} [A|P]M/.exec(text)
        var startDate = /\d{2}\/\d{2}\/\d{4}/.exec(text)
        var arr = []
        arr[0] = startTime;
        arr[1] = startDate;
        return arr
    })
})
// Get email activation
Cypress.Commands.add('getExamineeResultEmail', (from, subject, to) => {
    cy.task("gmail:check", {
        from: from,
        subject: subject,
        to: to,
    }).then((email) => {
        const values = Object.values(email);
        var text = (values[0].body.html)
        var message = /successfully qualified/.exec(text)
        console.log(message)
        return cy.wrap(message[0])

    });
})

/**
 * Function to activate the Registration toggle of a drive
 */
Cypress.Commands.add('activateRegistrationOfDrive', (id) => {
    cy.loginUsingAPI().then((token) => {
        cy.request({
            // request to activate the registration of the drive
            method: 'POST',
            url: `/api/userRegistrationActivate/${id}`,
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            // verify the status code and success message
            console.log(response)
            expect(response.status).to.be.equal(200)
            expect(response.body.message).to.be.equal('Activated successfully')
            cy.log(response.body.message)
        })
    })
})

/**
 * Function to activate the Test toggle of a drive
 */
Cypress.Commands.add('activateTestOfDrive', (id) => {
    cy.loginUsingAPI().then((token) => {
        cy.request({
            // request to activate the login of the drive
            method: 'POST',
            url: `/api/activate/${id}`,
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            // verify the status code and success message
            expect(response.status).to.be.equal(200)
            expect(response.body.message).to.be.equal('Activated successfully')
            cy.log(response.body.message)
        })
    })
})


/*
Call to api for de-activating Registration of a drive
*/
Cypress.Commands.add('deactivateRegistrationOfDrive', (id) => {
    cy.loginUsingAPI().then((token) => {
        cy.request({
            // request to deactivate the registration of a drive
            method: 'POST',
            url: `/api/inactivateUserRegistratiOnDrive/${id}`,
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            // verify the status code and success message
            expect(response.status).to.be.equal(200)
            expect(response.body.message).to.be.equal('Inactivated successfully')
            cy.log(response.body.message)
        })
    })
})


/*
call to api for de-activating Test of a drive
*/
Cypress.Commands.add('deactivateTestOfDrive', (id) => {
    cy.loginUsingAPI().then((token) => {
        cy.request({
            // request to deactivate the registration of a drive
            method: 'POST',
            url: `/api/adminInactivate/${id}`,
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            // verify the status code and success message
            expect(response.status).to.be.equal(200)
            expect(response.body.message).to.be.equal('Inactivated successfully')
            cy.log(response.body.message)
        })
    })
})