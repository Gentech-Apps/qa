import sampleData from "../fixture/sampleData";
/// <reference types="cypress" />

// Create Resource 
Cypress.Commands.add('createResourceUsingAPI', (apiKey, firstname, email) => {
    if (email !== "") {
        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl') + sampleData.createAResource,
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: {
                "firstName": firstname,
                "email": email,
                "sendInviteEmail": true,
            }
        }).then((response) => {
            assert(response.status, "200");
        })
        // })
    }
    else {
        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl') + sampleData.createAResource,
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: {
                "firstName": firstname,
            }
        }).then((response) => {
            assert(response.status, "200");
        })

    }
})

// Create Project 
Cypress.Commands.add('createProjectUsingAPI', (apiKey, projectName) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl') + sampleData.createAProject,
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        body: {
            "name": projectName,
        }
    }).then((response) => {
        assert(response.status, "200");
    })
})


// Delete projects
    cy.getAllProjects(apiKey).then((id: string[]) => {
    cy.getAllProjects(apiKey).then((id: string[]) => {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('apiUrl') + sampleData.deleteMultipleProjects,
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: id,
        }).then((response) => {
            assert(response.status, "200");
        })
    })
})

// Get all projects
Cypress.Commands.add('getAllProjects', (apiKey) => {
    let ids: string[] = []
    cy.request({
        method: 'GET',
        url: Cypress.env('apiUrl') + sampleData.getAllProjects,
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        assert(response.status, "200");
        assert(response.status, "OK");
        Cypress._.each(response.body, (body) => {
            ids.push(body._id)
        })
    })
    return cy.wrap(ids)
})

// Delete resources except account owner
    cy.getAllResources(apiKey).then((id: string[]) => {
    cy.getAllResources(apiKey).then(id => {
        cy.request({
            method: 'DELETE',
            url: Cypress.env('apiUrl') + sampleData.deleteMultipleResources,
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: id,
        }).then((response) => {
            assert(response.status, "200");
        })
    })

})

// Get all resources except account owner
Cypress.Commands.add('getAllResources', (apiKey) => {
    var ids: string[] = []
    cy.request({
        method: 'GET',
        url: Cypress.env('apiUrl') + sampleData.getAllResources,
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        assert(response.status, "200");
        assert(response.status, "OK");
        Cypress._.each(response.body, (body) => {
            console.log(body.role)
            if (body.role !== "ROLE_OWNER") {
                ids.push(body._id)
            }
        })
    })
    return cy.wrap(ids)
})