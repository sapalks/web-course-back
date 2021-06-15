const {
    Before,
    Given,
    When,
    Then
} = require("@cucumber/cucumber");

const {expect} = require("chai")

const {
    deepFilterProperties,
    isObject
} = require("./utils");

let lastId;
let brandLastId;
let isClear;
let isClearBrand;

Before(async function () {
    await this.car().clear()
    await this.brand().clear()
    isClear = true;
    isClearBrand = true;
});

Given("a client added brand for car with name {string} and with foundername {string} and with creationyear {int}", function (name, foundername, creationyear) {
    this.brand().addBrand(name, foundername, creationyear);
    if (isClearBrand) {
        brandLastId = this.brand().getLastId();
        isClearBrand = false;
    }
    this.assertOk()
});

Given("a client added car with name {string} and with enginename {string} and with hp {string} and with enginevolume {string} and with creationyear {int} and with brandid {int}", function (name, enginename, hp, enginevolume, creationyear, brandid) {
    this.car().addCar(name, enginename, hp, enginevolume, creationyear, brandLastId + brandid - 1);
    if (isClear) {
        lastId = this.car().getLastId();
        isClear = false;
    }
});

When("a client wants to add brand for car with name {string} and with foundername {string} and with creationyear {int}", function (name, foundername, creationyear) {
    this.brand().addBrand(name, foundername, creationyear);
    if (isClearBrand) {
        brandLastId = this.brand().getLastId();
        isClearBrand = false;
    }
});

When("a client wants to add car with name {string} and with enginename {string} and with hp {string} and with enginevolume {string} and with creationyear {int} and with brandid {int}", function (name, enginename, hp, enginevolume, creationyear, brandid) {
    this.car().addCar(name, enginename, hp, enginevolume, creationyear, brandLastId + brandid - 1);
    if (isClear) {
        lastId = this.car().getLastId();
        isClear = false;
    }
});

When("a client wants to get a car with id {int}", function (id) {
    this.car().getCar(lastId + id - 1);
});

When("a client wants to get cars", function () {
    this.car().getCars();
});

When("a client wants to update a car with id {int} and change name {string} and enginename {string} and hp {string} and creationyear {int} and enginevolume {string} and brandid {int}", function (id, name, enginename, hp, creationyear, enginevolume, brandid) {
    this.car().updateCar(lastId + id - 1, name, enginename, hp, enginevolume, creationyear, brandLastId + brandid - 1);
});

When("a client wants to delete a car with id {int}", function (id) {
    this.car().deleteCar(lastId + id - 1);
});

Then("a client wants to get cars and server must reply with a json in body like", function (jsonStr) {
    this.car().getCars();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["id","brandid"]);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});