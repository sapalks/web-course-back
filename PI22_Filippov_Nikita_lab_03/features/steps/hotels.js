const { Given, When, Then, Before} = require("@cucumber/cucumber");
const assert = require("assert").strict;
const { expect } = require("chai");
const { deepFilterProperties, matchObjects, isObject } = require("./utils");

let lastCountryId;
let testRecordCountryCount;
let lastId;
let testRecordHotelCount;

Before(async function () {
    await this.hotel().clear()
    testRecordCountryCount = 0;
    testRecordHotelCount = 0;
});

Given("a client added country for add hotels with name {string} and language {string}",function(name,language){
    this.country().addCountry(name, language);
    lastCountryId = this.country().getLastId();
    testRecordCountryCount++;
    this.assertOk();
});

Given("a client added hotel with name {string}, with rating {string} in country with id {string}, with address {string} and with contact number {string}",function(Name,Rating,CountrieID,Address,ContactNumber){
    let countrieID = lastCountryId - (testRecordCountryCount-CountrieID);
    this.hotel().addHotel(Name,Rating,countrieID,Address,ContactNumber);
    lastId = this.hotel().getLastId();
    testRecordHotelCount++;
    this.assertOk();
});

When("a client wants to add hotel with name {string}, with rating {string} in country with id {string}, with address {string} and with contact number {string}",
function (Name,Rating,CountrieID,Address,ContactNumber){
    let countrieID = lastCountryId - (testRecordCountryCount-CountrieID);
    this.hotel().addHotel(Name,Rating,countrieID,Address,ContactNumber);
    lastId = this.hotel().getLastId();
    testRecordHotelCount++;
});

When("a client wants to get a list of hotels", function () {
    this.hotel().getHotels();
});

When("a client wants to get hotel by Id {string}", function (Id) {
    let id = lastId - (testRecordHotelCount-Id);
    this.hotel().getHotel(id);
});

When("a client wants to get hotels in country with Id {string}", function (CountrieID) {
    let countrieID = lastCountryId - (testRecordCountryCount-CountrieID);
    this.hotel().getHotelsByCountrieId(countrieID);
});

When("a client wants to update hotel by Id {string}. Change Name to {string}, Rating {int}, CountrieId {string}, Address {string}, ContactNumber {string}", 
function (Id, Name, Rating, CountrieID, Address, ContactNumber) {
    let hotelId = lastId - (testRecordHotelCount-Id);
    let countrieID = lastCountryId - (testRecordCountryCount-CountrieID);
    this.hotel().updateHotel(hotelId, Name, Rating, countrieID, Address, ContactNumber);
});

When("a client wants to delete hotel with Id {int}", function (Id) {
    let hotelId = lastId - (testRecordHotelCount-Id);
    this.hotel().deleteHotel(hotelId);
});

Then("to request a list of all hotels, the server must reply with a json in body like:", function (result) {
    this.hotel().getHotels();
    const pattern = JSON.parse(result);
    const filtered = deepFilterProperties(this.response.json, ['id','Id','CountrieID','countrieid']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(pattern);
});