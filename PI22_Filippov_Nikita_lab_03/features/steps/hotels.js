const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const { expect } = require("chai");
const { deepFilterProperties, matchObjects, isObject } = require("./utils");

When("a client wants to add hotel with name {string}, with rating {string} in country with id {string}, with address {string} and with contact number {string}",
function (Name,Rating,CountrieID,Address,ContactNumber){
    this.api().addHotel(Name,Rating,CountrieID,Address,ContactNumber);
});

When("a client wants to get a list of hotels", function () {
    this.api().getHotels();
});

When("a client wants to get hotel by Id {string}", function (Id) {
    this.api().getHotel(Id);
});

When("a client wants to get hotels in country with Id {int}", function (Id) {
    this.api().getHotelsByCountrieId(Id);
});

When("a client wants to update hotel by Id {int}. Change Name to {string}, Rating {int}, CountrieId {int}, Address {string}, ContactNumber {string}", function (Id, Name, Rating, CountrieID, Address, ContactNumber) {
    this.api().updateHotel(Id, Name, Rating, CountrieID, Address, ContactNumber);
});

When("a client wants to delete hotel with Id {int}", function (Id) {
    this.api().deleteHotel(Id);
});

Then("to request a list of all hotels, the server must reply with a json in body like:", function (result) {
    this.api().getHotels();
    const pattern = JSON.parse(result);
    const obj = this.response.json;
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern[0]);
    }
});