const { Given, When, Then, Before} = require("@cucumber/cucumber");
const { expect } = require("chai");
const { deepFilterProperties, matchObjects, isObject } = require("./utils");

let lastId;
let testRecordCount;

Before(async function () {
    await this.country().clear()
    testRecordCount = 0;
});

When("a client wants to add country with name {string} and language {string}", function (name, language) {
    this.country().addCountry(name, language);
    lastId = this.country().getLastId();
    testRecordCount++;
});

Given("a client added country with name {string} and language {string}", function (name,language) {
    this.country().addCountry(name,language);
    lastId = this.country().getLastId();
    testRecordCount++;
    this.assertOk();
});

When("a client wants to get a list of countries", function () {
    this.country().getCountries();
});

When("a client wants to get country with Id {string}", function (Id) {
    let id = lastId - (testRecordCount-Id);
    this.country().getCountry(id);
});

When("a client wants to update country by Id {int}. Change name to {string} and language to {string}", function (Id, name, language) {
    let id = lastId - (testRecordCount-Id);
    this.country().updateCountry(id, name, language);
});

When("a client wants to delete country with Id {int}", function (Id) {
    let id = lastId - (testRecordCount-Id);
    this.country().deleteCountry(id);
});

Then('server must reply with {int} status code', function (statusCode) {
    if (statusCode !== this.response.statusCode) {
        expect(this.response.statusCode).to.eql(statusCode);
    }
});

Then("server must reply with a json in body like:", function (result) {
    const pattern = JSON.parse(result);
    const obj = this.response.json;
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern[0]);
    }
});

Then('server must reply with the following json in body:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['id','Id','CountrieID','countrieid']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then("to request a list of all countries, the server must reply with a json in body like:", function (result) {
    this.country().getCountries();
    const pattern = JSON.parse(result);
    const filtered = deepFilterProperties(this.response.json, ['id']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(pattern);
});

