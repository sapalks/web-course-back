const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let lastroomId, roomCounter, lastpersonId, personCounter;

Before(async function () {
    await this.person().clear();
    await this.room().clear();
    roomCounter = 0;
    personCounter = 0;
});

Given('a client added test room with name {string}', function (name) {
    this.room().addroom(name);
    lastroomId = this.room().getLastId();
    roomCounter++;
})

When('a client wants to add person with firstname {string} and lastname {string} and currentGroup {string} in room with index {int}', function (firstname, lastname, currentgroup, index) {
    let roomID = lastroomId - (roomCounter - index);
    this.person().addperson(firstname, lastname, currentgroup, roomID);
    lastpersonId = this.person().getLastId();
    personCounter++;
});

When("a client wants to get a list of persons", function () {
    this.person().getpersons();
});

When('a client wants to get a list of persons in room with index {int}', function (index) {
    let roomID = lastroomId - (roomCounter - index);
    this.person().getpersonInrooms(roomID);
});

Given('a client added person with firstname {string} and lastname {string} and currentGroup {string} in room with index {int}', function (firstname, lastname, currentGroup, index) {
    let roomID = lastroomId - (roomCounter - index);
    this.person().addperson(firstname, lastname, currentGroup, roomID);
    lastpersonId = this.person().getLastId();
    personCounter++;
});

When('a client wants to get person on index {int}', function (index) {
    let id = lastpersonId - (personCounter - index);
    this.person().getperson(id);
})

When('a client wants to update a person on index {int} with firstname {string} and lastname {string} and currentGroup {string} in room with index {int}', function (index, firstname, lastname, currentGroup, roomid) {
    let personId = lastpersonId - (personCounter - index);
    let roomID = lastroomId - (roomCounter - roomid);
    this.person().updateperson(personId, firstname, lastname, currentGroup, roomID)
});

Then('if client wants to get a list of persons server must reply with a json in body like', function (docString) {
    this.person().getpersons();
    const expected = JSON.parse(docString);
    const filtered = deepFilterProperties(this.response.json, ['personid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
})

Then('server must reply with the following json in body for person model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['personid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

When('a client wants to delete person on index {int}', function (index) {
    let id = lastpersonId - (personCounter - index);
    this.person().deleteperson(id);
})