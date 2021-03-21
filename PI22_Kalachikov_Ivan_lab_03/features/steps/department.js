const {Given, When, Then, Before} = require('@cucumber/cucumber');
const {deepFilterProperties, matchObjects, isObject} = require('./utils');
const {expect} = require('chai')

let start;
let currentId;

Before(async function () {
    await this.department().clear()
    start = true;
});

When("a client wants to get a list of departments", function () {
    this.department().getList();
});

When("a client wants to add department with name {string}", function (name) {
    this.department().add(name);
    if (start) {
        currentId = this.department().getLastId();
        start = false;
    }
});

When("a client wants to update a department on index {int} with name {string}", function (index, name) {
    let id = currentId + index - 1;
    this.department().update(id, name);
});

When("a client wants to remove a department on index {int}", function (index) {
    let id = currentId + index - 1;
    this.department().remove(id);
});

When('a client wants to get a department on index {int}', function (index) {
    let id = currentId + index - 1;
    this.department().getOne(id);
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

Then('if client wants to get a list of departments server must reply with a json in body like', function (jsonStr) {
    this.department().getList();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['id']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then('server must reply with the following json in body:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['id', 'department_id']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Given("a client added department with name {string}", function (name) {
    this.department().add(name);
    if (start) {
        currentId = this.department().getLastId();
        start = false;
    }
    this.assertOk();
});
