const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {expect} = require('chai')
const { deepFilterProperties, matchObjects, isObject, getDatabaseName, isNotEmptyTaskTable} = require('./utils');

Before({tags: '@start and not @example'}, async function () {
    await this.task().clear();
});

//Scenario Outline: Create tasks
Given('a client have database with name {string}', async function (expectDatabaseName) {
    const databaseName = await getDatabaseName();

    if (!matchObjects(expectDatabaseName, databaseName)) {
        expect(databaseName).to.eql(expectDatabaseName);
    }
});

When('a client create task with theme {string}, Time of remind {string}, Deadline {string}', function (theme, timeofremind, deadline) {
    this.task().createTask(theme, timeofremind, deadline);
});

Then('server must reply with {int} status code', function (statusCode) {
    if (statusCode !== this.response.statusCode) {
        expect(this.response.statusCode).to.eql(statusCode);
    }
});

Then('server must reply with a json in body like:', function (jsonStr) {
    const pattern = JSON.parse(jsonStr);
    const obj = deepFilterProperties(this.response.json, ['id'])
    
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern);
    }
});

//Scenario: Get tasks
Given('a client have some tasks in database "tasktracker"', async function () {
    const notEmpty = await isNotEmptyTaskTable();
    const expect = true;

    if (!matchObjects(expect, notEmpty)) {
        expect(notEmpty).to.eql(expect);
    }
});

When('a client receives a list of tasks', function () {
    this.task().getTasks();
});

Then('server must reply with the following json:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['id']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

//Get task by index
When('a client receives task by index {int}', function (index) {
    this.task().getTask(index);
});

//

After({tags: '@end'}, async function () {
    await this.task().clear();
});