const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let counter, lastWriterId;

Before(async function () {
    await this.writer().clear();
    counter = 0;
});

When("a client wants to add writer with name {string}, surname {string} and patronymic {string}", function (firstname,lastname,patronymic) {
    this.writer().createWriter(firstname,lastname,patronymic);
    lastWriterId = this.writer().getLastId();
    counter++;
});

When("a client wants to get a list of writers", function () {
    this.writer().getWriters();
});

When('a client wants to get a writer on index {int}', function (index) {
    let id = lastWriterId - (counter - index);
    this.writer().getWriter(id);
});

When("a client wants to update a writer on index {int} with name {string}, surname {string} and patronymic {string}", function (index, firstname, lastname,patronymic) {
    let id = lastWriterId - (counter - index);
    this.writer().updateWriter(id, firstname, lastname,patronymic);
});

When("a client wants to delete a writer on index {int}", function (index) {
    let id = lastWriterId - (counter - index);
    this.writer().deleteWriter(id);
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

Then('if client wants to get a list of writers server must reply with a json in body like', function (jsonStr) {
    this.writer().getWriters();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['writerid', 'bookid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then('server must reply with the following json in body for writer model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['writerid','isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Given("a client added writer with name {string}, surname {string} and patronymic {string}", function (firstname,lastname,patronymic) {
    this.writer().createWriter(firstname,lastname,patronymic);
    lastWriterId = this.writer().getLastId();
    counter++;
    this.assertOk();
});