const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let lastEducationId, educationCounter, lastStudentId, studentCounter;

Before(async function () {
    await this.student().clear();
    await this.education().clear();
    educationCounter = 0;
    studentCounter = 0;
});

Given('a client added test education with name {string}', function (name) {
    this.education().addEducation(name);
    lastEducationId = this.education().getLastId();
    educationCounter++;
})

When('a client wants to add student with firstname {string} and lastname {string} and currentGroup {string} in education with index {int}', function (firstname, lastname, currentgroup, index) {
    let educationID = lastEducationId - (educationCounter - index);
    this.student().addStudent(firstname, lastname, currentgroup, educationID);
    lastStudentId = this.student().getLastId();
    studentCounter++;
});

When("a client wants to get a list of students", function () {
    this.student().getStudents();
});

When('a client wants to get a list of students in education with index {int}', function (index) {
    let educationID = lastEducationId - (educationCounter - index);
    this.student().getStudentInEducations(educationID);
});

Given('a client added student with firstname {string} and lastname {string} and currentGroup {string} in education with index {int}', function (firstname, lastname, currentGroup, index) {
    let educationID = lastEducationId - (educationCounter - index);
    this.student().addStudent(firstname, lastname, currentGroup, educationID);
    lastStudentId = this.student().getLastId();
    studentCounter++;
});

When('a client wants to get student on index {int}', function (index) {
    let id = lastStudentId - (studentCounter - index);
    this.student().getStudent(id);
})

When('a client wants to update a student on index {int} with firstname {string} and lastname {string} and currentGroup {string} in education with index {int}', function (index, firstname, lastname, currentGroup, educationid) {
    let studentId = lastStudentId - (studentCounter - index);
    let educationID = lastEducationId - (educationCounter - educationid);
    this.student().updateStudent(studentId, firstname, lastname, currentGroup, educationID)
});

Then('if client wants to get a list of students server must reply with a json in body like', function (docString) {
    this.student().getStudents();
    const expected = JSON.parse(docString);
    const filtered = deepFilterProperties(this.response.json, ['studentid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
})

Then('server must reply with the following json in body for student model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['studentid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

When('a client wants to delete student on index {int}', function (index) {
    let id = lastStudentId - (studentCounter - index);
    this.student().deleteStudent(id);
})