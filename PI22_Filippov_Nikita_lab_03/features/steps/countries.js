const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const { expect } = require("chai");
const { deepFilterProperties, matchObjects, isObject } = require("./utils");


When("a client wants to add country with name {string} and language {string}", function (name, language) {
    this.api().addCountry(name, language);
});

When("a client wants to get a list of countries", function () {
    this.api().getCountries();
});

When("a client wants to get country with Id {string}", function (Id) {
    this.api().getCountry(Id);
});

When("a client wants to update country by Id {int}. Change name to {string} and language to {string}", function (Id, name, language) {
    this.api().updateCountry(Id, name, language);
});

When("a client wants to delete country with Id {int}", function (Id) {
    this.api().deleteCountry(Id);
});

Then('server must reply with {int} status code', function (statusCode) {
    if (statusCode !== this.response.statusCode) {
        console.log(this.response.json);
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

Then("to request a list of all countries, the server must reply with a json in body like:", function (result) {
    this.api().getCountries();
    const pattern = JSON.parse(result);
    const obj = this.response.json;
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern[0]);
    }
});

