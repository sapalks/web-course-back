const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {expect} = require('chai')
const { deepFilterProperties, matchObjects, isObject, getDatabaseName, isNotEmptyStepTable, containsThisStep } = require('./utils');
let startFeature = false;

Before({tags: '@start'}, async function () {
    if(!startFeature) {
        await this.step().clear();
        startFeature = true;
    }
});

//Scenario Outline: Create steps
When('a client create step with theme {string}, task id {string}', function (theme, taskId) {
    this.step().createStep(theme, taskId);
});

//Scenario: Get steps
Given('a client have some steps in database "tasktracker"', async function () {
    const notEmpty = await isNotEmptyStepTable();
    const expect = true;

    if (!matchObjects(expect, notEmpty)) {
        expect(notEmpty).to.eql(expect);
    }
});

When('a client receives a list of steps', function () {
    this.step().getSteps();    
});

//Scenario: Get steps in task
When('a client receives a list of steps by task index {int}', function (index) {
    this.step().getTaskSteps(index);
});

//Scenario: Get task by index
When('a client receives step by index {int}', function (index) {
    this.step().getStep(index);
});

//Scenario: Update step by index
Given('a client have step with theme {string}', async function (expectStepTheme) {
    const responseStepTheme = await containsThisStep(expectStepTheme);
    const expect = true;

    if (!matchObjects(expect, responseStepTheme)) {
        expect(responseStepTheme).to.eql(expect);
    }
});

When('a client update step with id {int} theme {string}, task index {int}', function (id, theme, index) {
    this.step().updateStep(id, theme, index);
});

//Scenario: Delete step by index
When('a client delete step by index {int}', function (index) {
    this.step().deleteStep(index);
});

After({tags: '@end'}, async function () {
    await this.step().clear();
});