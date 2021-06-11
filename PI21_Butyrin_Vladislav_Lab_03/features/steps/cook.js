const {
    Before,
    Given,
    When,
    Then
} = require("@cucumber/cucumber");

const {
    expect
} = require("chai")

const {
    deepFilterProperties,
    matchObjects,
    isObject
} = require("./utils");

Before(async function () {
    await this.cook().clear()
    isClear = true;
});

Given("the user added Cook with surname {string} and age {int}", function (surname, age) {
    this.cook().addCook(surname, age);

    this.assertOk()
});

When("the user wants to add Cook with surname {string} and age {string}", function (surname, age) {
    this.cook().addCook(surname, age);

});

When("the user wants to get a Cook with id {int}", function (id) {
    this.cook().getCook(id);
});

When("the user wants to get Cooks", function () {
    this.cook().getCooks();
});

When("the user wants to update a Cook with id {int} and change surname {string} and change age {int}", function (id, surname, age) {
    this.cook().updateCook(id, surname, age);
});

When("the user wants to delete a post with id {int}", function (id) {
    this.cook().deleteCook(id);
});

Then("the user wants to get Cooks and server must reply with a json in body like", function (jsonStr) {
    this.cook().getCooks();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["id", "createdat"]);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then("server must reply with {int} status code", function (statusCode) {
    if (statusCode !== this.response.statusCode) {
        console.log(this.response.json);
        expect(this.response.statusCode).to.eql(statusCode);
    }
});

Then("server must reply with the following json in body:", function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["id"]);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

Then("server must reply with a json in body like:", function (jsonStr) {
    const pattern = JSON.parse(jsonStr);
    const obj = this.response.json;
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern[0]);
    }
});