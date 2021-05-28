const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let counter, lastTeamId;

Before(async function () {
    await this.team().clear();
    counter = 0;
});

When("a client wants to add team with name {string}", function (name) {
    this.team().addTeam(name);
    lastTeamId = this.team().getLastId();
    counter++;
});

When("a client wants to get a list of teams", function () {
    this.team().getTeams();
});

When('a client wants to get a team on index {int}', function (index) {
    let id = lastTeamId - (counter - index);
    this.team().getTeam(id);
});

When("a client wants to update a team on index {int} with name {string}", function (index, name) {
    let id = lastTeamId - (counter - index);
    this.team().updateTeam(id, name);
});

When("a client wants to delete a team on index {int}", function (index) {
    let id = lastTeamId - (counter - index);
    this.team().deleteTeam(id);
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

Then('if client wants to get a list of teams server must reply with a json in body like', function (jsonStr) {
    this.team().getTeams();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['teamid', 'studentid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then('server must reply with the following json in body for team model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['teamid', 'studentid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Given("a client added team with name {string}", function (name) {
    this.team().addTeam(name);
    lastTeamId = this.team().getLastId();
    counter++;
    this.assertOk();
});