const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let counter, lastDirectionId;

Before(async function () {
    await this.direction().clear();
    counter = 0;
});

When("a client wants to add direction with name {string}", function (name) {
    this.direction().addDirection(name);
    lastDirectionId = this.direction().getLastId();
    counter++;
});

When("a client wants to get a list of directions", function () {
    this.direction().getDirections();
});

When('a client wants to get a direction on index {int}', function (index) {
    let id = lastDirectionId - (counter - index);
    this.direction().getDirection(id);
});

When("a client wants to update a direction on index {int} with name {string}", function (index, name) {
    let id = lastDirectionId - (counter - index);
    this.direction().updateDirection(id, name);
});

When("a client wants to delete a direction on index {int}", function (index) {
    let id = lastDirectionId - (counter - index);
    this.direction().deleteDirection(id);
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

Then('if client wants to get a list of directions server must reply with a json in body like', function (jsonStr) {
    this.direction().getDirections();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['directionid', 'schoolboyid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then('server must reply with the following json in body for direction model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['directionid', 'schoolboyid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Given("a client added direction with name {string}", function (name) {
    this.direction().addDirection(name);
    lastDirectionId = this.direction().getLastId();
    counter++;
    this.assertOk();
});