
const { faker } = require('@faker-js/faker');
const number = faker.number.int()
const projectName = faker.string.alpha({ length: 10, casing: 'mixed', exclude: []})
const filename = faker.string.alpha({ length: 10, casing: 'mixed', exclude: [projectName]})

// const DateAndTime = faker.DateAndTime.DateAndTime();
module.exports =
{
    elements: {
        // pop-up title
        "projectTitle": "Test- PROJECTS",
        "usernameIdForOpen": "name",
        "passwordIdForOpen": "password",

        // Toggle Button
        "detailViewToggle": "info",
        "tableViewToggle": "table",
        "projectTab" : "projectTabIcon",

    },
    data: {

    "projectNameForScript" : projectName,
    "fileName" : filename,


    }
}