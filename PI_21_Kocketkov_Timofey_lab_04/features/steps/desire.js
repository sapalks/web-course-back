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
    await this.desire().clear()
});



Given("the user added Desire with Name_desire {string} and Degree_of_desire {int} and Timofey_id {int}", function (Name_desire, Degree_of_desire, Timofey_id) {
    this.desire().addDesire(Name_desire, Degree_of_desire, Timofey_id);
    this.assertOk()
});

When("the user wants to add Desire with Name_desire {string} and Degree_of_desire {string} and Timofey_id {string}", function (Name_desire, Degree_of_desire, Timofey_id) {
    this.desire().addDesire(Name_desire, Degree_of_desire, Timofey_id);

});

When("the user wants to get a Desire with id {int}", function (id) {
    this.desire().getDesire(id);
});

When("the user wants to get Desires", function () {
    this.desire().getDesires();
});

When("the user wants to update a Desire with id {int} and change Name_desire {string} and change Degree_of_desire {int} and change Timofey_id {int}", function (id, Name_desire, Degree_of_desire, Timofey_id) {
    this.desire().updateDesire(id, Name_desire, Degree_of_desire, Timofey_id);
});

When("the user wants to delete a Desire with id {int}", function (id) {
    this.desire().deleteDesire(id);
});

Then("the user wants to get Desires and server must reply with a json in body like", function (jsonStr) {
    this.desire().getDesires();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["id"]);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

