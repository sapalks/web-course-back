const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let lastTeamId, teamCounter, lastPlayerId, playerCounter;

Before(async function () {
    await this.player().clear();
    await this.team().clear();
    teamCounter = 0;
    playerCounter = 0;
});

Given('a client added test team with name {string}', function (name) {
    this.team().addTeam(name);
    lastTeamId = this.team().getLastId();
    teamCounter++;
})

When('a client wants to add player with login {string} and mail {string} and Division {string} in team with index {int}', function (login, mail, division, index) {
    let teamID = lastTeamId - (teamCounter - index);
    this.player().addPlayer(login, mail, division, teamID);
    lastPlayerId = this.player().getLastId();
    playerCounter++;
});

When("a client wants to get a list of players", function () {
    this.player().getPlayers();
});

When('a client wants to get a list of players in team with index {int}', function (index) {
    let teamID = lastTeamId - (teamCounter - index);
    this.player().getPlayerInTeams(teamID);
});

Given('a client added player with login {string} and mail {string} and Division {string} in team with index {int}', function (login, mail, Division, index) {
    let teamID = lastTeamId - (teamCounter - index);
    this.player().addPlayer(login, mail, Division, teamID);
    lastPlayerId = this.player().getLastId();
    playerCounter++;
});

When('a client wants to get player on index {int}', function (index) {
    let id = lastPlayerId - (playerCounter - index);
    this.player().getPlayer(id);
})

When('a client wants to update a player on index {int} with login {string} and mail {string} and Division {string} in team with index {int}', function (index, login, mail, Division, teamid) {
    let playerId = lastPlayerId - (playerCounter - index);
    let teamID = lastTeamId - (teamCounter - teamid);
    this.player().updatePlayer(playerId, login, mail, Division, teamID)
});

Then('if client wants to get a list of players server must reply with a json in body like', function (docString) {
    this.player().getPlayers();
    const expected = JSON.parse(docString);
    const filtered = deepFilterProperties(this.response.json, ['playerid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
})

Then('server must reply with the following json in body for player model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['playerid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

When('a client wants to delete player on index {int}', function (index) {
    let id = lastPlayerId - (playerCounter - index);
    this.player().deletePlayer(id);
})