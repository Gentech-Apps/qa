const { faker } = require('@faker-js/faker')
faker.seed()

const name1 = faker.string.alpha({ length: 7, casing: 'lower', exclude: ['al', 'ge', 'ed'] })
const name2 = faker.string.alpha({ length: 7, casing: 'lower', exclude: ['al', 'ge', 'ed', name1] })
const name3 = faker.string.alpha({ length: 7, casing: 'lower', exclude: ['al', 'ge', 'ed', name1, name2] })
const note = faker.location.street();

module.exports = {

    "resourceName1": name1,
    "resourceName2": name2,
    "projectName1": name3,
    "projectNote": note,
    "createAResource": "/resource",
    "createAProject": "/project",
    "deleteMultipleProjects": "/project",
    "getAllProjects": "/project",
    "getAllResources": "/resource",
    "deleteMultipleResources": "/resource",
    
    // Endpoint to delete all Unassigned Work
    deleteAllUnassigned(date) {
        return `/unassigned-work/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all project group
    deleteAllProjectGroup(date) {
        return `/projectgroup/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all resource group
    deleteAllResourceGroup(date) {
        return `/resourcegroup/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all requests
    deleteAllResourceAndVacationRequests(date) {
        return `/booking/request/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all Client
    deleteAllClient(date) {
        return `/client/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all Project tags
    deleteAllProjectTags(date) {
        return `/project/tag/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all Resource tags
    deleteAllResourceTags(date) {
        return `/resource/tag/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all Project Custom Fields
    deleteAllProjectCustomFields(date) {
        return `/project/customField/template/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all Resource Custom Fields
    deleteAllResourceCustomFields(date) {
        return `/resource/customField/template/delete/all/data?deleteAllDataToken=${date}`
    },

    // Endpoint to delete all Events
    deleteAllEvents(date) {
        return `/event/delete/all/data?deleteAllDataToken=${date}&deleteSickLeave=0&deleteVacation=0`
    },

    // Endpoint to delete all Fixed Cost Categories
    deleteAllFixedCostCategories(date){
        return `/costCategories/delete/all/data?deleteAllDataToken=${date}`
    },

    
    elements: {
        "settingsLink" : "Settings",
        "schedulerLink" : "Scheduler",
        "requestsLink" : "Requests",
        "reportsLink": "Reports",
        "timesheetsLink": "Timesheets",
        "vacationLink": "Vacation",
        "noButton": "confirm-modal-cancel",
        "yesButton": "confirm-modal-confirm",
        "bookingUpdateWarningPopupTitle": "Booking update warning",
        "bookingUpdateWarningPopupInfo": "Do you want to move deadline with Booking",
        "classicRadioButton": "my-pref-radio-classic-menu",
        "selectSingleRows": "button-view-mode-change--SINGLE",
        "customizationLink": "/settings#custom",
        "deadlinesAllowMoveBeforeEndDate": "deadlines-enabled",
        "deadlinesMoveAllow": "deadlines-move-enabled",
        "resourcesMenu": "menu--resources",
        "activeResources": "menu--group-item--link--active-resources",
        "deadlinesMoveDisplayWarning": "deadlines-move-partial",
        "deadlinesMoveDisabled": "deadlines-move-disabled",
    }
}