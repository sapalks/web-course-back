const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let counter, lastEducationId;

Before(async function () {
    await this.education().clear();
    counter = 0;
});

When("a client wants to add education with name {string}", function (name) {
    this.education().addEducation(name);
    lastEducationId = this.education().getLastId();
    counter++;
});

When("a client wants to get a list of educations", function () {
    this.education().getEducations();
});

When('a client wants to get a education on index {int}', function (index) {
    let id = lastEducationId - (counter - index);
    this.education().getEducation(id);
});

When("a client wants to update a education on index {int} with name {string}", function (index, name) {
    let id = lastEducationId - (counter - index);
    this.education().updateEducation(id, name);
});

When("a client wants to delete a education on index {int}", function (index) {
    let id = lastEducationId - (counter - index);
    this.education().deleteEducation(id);
});

Then('server must reply with {int} status code', function (statusCode) {
    if (statusCode !== this.response.statusCode) {
        expect(this.response.statusCode).to.eql(statusCode);
    }
});

Then('server must reply with a json in body like:', function (jsonStr) {
    const pattern = JSON.parse(jsonStr);
    const obj = this.response.json;
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern[0]);
    }
});

Then('if client wants to get a list of educations server must reply with a json in body like', function (jsonStr) {
    this.education().getEducations();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['educationid', 'studentid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then('server must reply with the following json in body for education model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['educationid', 'studentid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Given("a client added education with name {string}", function (name) {
    this.education().addEducation(name);
    lastEducationId = this.education().getLastId();
    counter++;
    this.assertOk();
});