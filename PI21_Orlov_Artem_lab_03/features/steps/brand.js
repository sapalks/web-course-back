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

let lastId;
let isClear;

Before(async function () {
    await this.brand().clear()
    isClear = true;
});

Given("a client added brand with name {string} and with foundername {string} and with creationyear {int}", function (name, foundername, creationyear) {
    this.brand().addBrand(name, foundername, creationyear);
    if (isClear) {
        lastId = this.brand().getLastId();
        isClear = false;
    }
    this.assertOk()
});

When("a client wants to add brand with name {string} and with foundername {string} and with creationyear {int}", function (name, foundername, creationyear) {
    this.brand().addBrand(name, foundername, creationyear);
    if (isClear) {
        lastId = this.brand().getLastId();
        isClear = false;
    }
});

When("a client wants to get a brand with id {int}", function (id) {
    this.brand().getBrand(lastId + id - 1);
});

When("a client wants to get brands", function () {
    this.brand().getBrands();
});

When("a client wants to update a brand with id {int} and change name {string} and foundername {string} and creationyear {int}", function (id, name, foundername, creationyear) {
    this.brand().updateBrand(lastId + id - 1, name, foundername, creationyear);
});

When("a client wants to delete a brand with id {int}", function (id) {
    this.brand().deleteBrand(lastId + id - 1);
});

Then("a client wants to get brands and server must reply with a json in body like", function (jsonStr) {
    this.brand().getBrands();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["id"]);
    //console.log(filtered);
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
    //console.log(jsonStr[108]+jsonStr[109]+jsonStr[110]);
    const expected = JSON.parse(jsonStr);
    //console.log(expected);
    const filtered = deepFilterProperties(this.response.json, ["id","brandid"]);
    //console.log(filtered);
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