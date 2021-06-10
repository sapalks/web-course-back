const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const assert = require("assert").strict;

const { deepFilterProperties, matchObjects, isObject, stringDataFormat } = require('./utils');

Before(async function () {
    await this.task().clear();
});

When('a client create task with theme {string}, Time of remind {string}, Deadline {string}', function (theme, timeOfRemind, deadline) {
    this.task().createTask(theme, timeOfRemind, deadline);
});

Then('server must reply with {int} status code', function (statusCode) {
    if (statusCode !== this.response.statusCode) {
        expect(this.response.statusCode).to.eql(statusCode);
    }
});

Then('server must reply with the following json in body:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);

    //
    // in some responses we have auto generated ids,
    // that should be ignored in the scenarios, as well as
    // the empty body that carries only the id property
    // like:
    //      { status: 'ok', body: { id: 'xxx' } } => { status: 'ok', body: {} }
    //
    const filtered = deepFilterProperties(this.response.json, ['id']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }

    expect(filtered).to.eql(expected);
});

Then('server must reply with a json in body like:', function (jsonStr) {
    const pattern = JSON.parse(jsonStr);
    const obj = deepFilterProperties(this.response.json, ['id'])
    
    if (!matchObjects(pattern, obj)) {
        //
        // just to prettify the error output
        //
        expect(obj).to.eql(pattern);
    }
});

// After(async function () {
//     await this.task().clear();
// });