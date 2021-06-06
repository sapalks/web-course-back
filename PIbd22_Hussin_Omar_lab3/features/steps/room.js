const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let counter, lastroomId;

Before(async function () {
    await this.room().clear();
    counter = 0;
});

When("a client wants to add room with name {string}", function (name) {
    this.room().addroom(name);
    lastroomId = this.room().getLastId();
    counter++;
});

When("a client wants to get a list of rooms", function () {
    this.room().getrooms();
});

When('a client wants to get a room on index {int}', function (index) {
    let id = lastroomId - (counter - index);
    this.room().getroom(id);
});

When("a client wants to update a room on index {int} with name {string}", function (index, name) {
    let id = lastroomId - (counter - index);
    this.room().updateroom(id, name);
});

When("a client wants to delete a room on index {int}", function (index) {
    let id = lastroomId - (counter - index);
    this.room().deleteroom(id);
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

Then('if client wants to get a list of rooms server must reply with a json in body like', function (jsonStr) {
    this.room().getrooms();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['roomid', 'personid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then('server must reply with the following json in body for room model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['roomid', 'personid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Given("a client added room with name {string}", function (name) {
    this.room().addroom(name);
    lastroomId = this.room().getLastId();
    counter++;
    this.assertOk();
});