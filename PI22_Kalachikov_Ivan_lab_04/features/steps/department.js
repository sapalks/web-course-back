const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require("assert").strict;
const {deepFilterProperties, matchObjects, isObject} = require('./utils');
const db = require("../../configurations/db");
const {expect} = require('chai')

When("a client wants to get a list of departments", function () {
    this.api().addDepartment("middle");
    this.api().getDepartments();
});

When("a client wants to add department with name {string}", function (name) {
    this.api().addDepartment(name);
});

When("a client wants to update a department on index {int} with name {string}", function (id, name) {
    this.api().updateDepartment(id, name);
});

When("a client wants to remove a department on index {int}", function (id) {
    this.api().deleteDepartment(id);
});

When('a client wants to get a department on index {int}', function (index) {
    this.api().getDepartment(index);
});

Then('server must reply with {int} status code', function (statusCode) {
    if (statusCode !== this.response.statusCode) {
        console.log(this.response.json);
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
    this.api().getDepartments();
    const pattern = JSON.parse(jsonStr);
    const obj = this.response.json;
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern[0]);
    }
});
