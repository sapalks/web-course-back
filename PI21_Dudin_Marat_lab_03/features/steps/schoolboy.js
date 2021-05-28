const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let lastDirectionId, directionCounter, lastschoolboyId, schoolboyCounter;

Before(async function () {
    await this.schoolboy().clear();
    await this.direction().clear();
    directionCounter = 0;
    schoolboyCounter = 0;
});

Given('a client added test direction with name {string}', function (name) {
    this.direction().addDirection(name);
    lastDirectionId = this.direction().getLastId();
    directionCounter++;
})

When('a client wants to add schoolboy with fullname {string} and classNumber {int} in direction with index {int}', function (fullname, classNumber, directionID) {
    let directionId = lastDirectionId - (directionCounter - directionID);
    this.schoolboy().addSchoolboy(fullname, classNumber, directionId);
    lastschoolboyId = this.schoolboy().getLastId();
    schoolboyCounter++;
});

When("a client wants to get a list of schoolboys", function () {
    this.schoolboy().getSchoolboys();
});

When('a client wants to get a list of schoolboys in direction with index {int}', function (index) {
    let directionID = lastDirectionId - (directionCounter - index);
    this.schoolboy().getSchoolboyInDirections(directionID);
});

Given('a client added schoolboy with fullname {string} and classNumber {int} in direction with index {int}', function (fullname, classNumber, index) {
    let directionID = lastDirectionId - (directionCounter - index);
    this.schoolboy().addSchoolboy(fullname, classNumber, directionID);
    lastschoolboyId = this.schoolboy().getLastId();
    schoolboyCounter++;
});

When('a client wants to get schoolboy on index {int}', function (index) {
    let id = lastschoolboyId - (schoolboyCounter - index);
    this.schoolboy().getSchoolboy(id);
})

When('a client wants to update a schoolboy on index {int} with fullname {string} and classNumber {int} in direction with index {int}', function (index, fullname, classNumber, directionID) {
    let schoolboyId = lastschoolboyId - (schoolboyCounter - index);
    let directioniD = lastDirectionId - (directionCounter - directionID);
    this.schoolboy().updateSchoolboy(schoolboyId, fullname, classNumber, directioniD)
});

Then('if client wants to get a list of schoolboys server must reply with a json in body like', function (docString) {
    this.schoolboy().getSchoolboys();
    const expected = JSON.parse(docString);
    const filtered = deepFilterProperties(this.response.json, ['schoolboyid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
})

Then('server must reply with the following json in body for schoolboy model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['schoolboyid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

When('a client wants to delete schoolboy on index {int}', function (index) {
    let id = lastschoolboyId - (schoolboyCounter - index);
    this.schoolboy().deleteSchoolboy(id);
})