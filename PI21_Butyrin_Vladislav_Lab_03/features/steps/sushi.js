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
    await this.sushi().clear()
});



Given("the user added Sushi with Name_Sushi {string} and Ingredients {string} and Cook_id {int}", function (Name_Sushi, Ingredients, Cook_id) {
    this.sushi().addSushi(Name_Sushi, Ingredients, Cook_id);
    this.assertOk()
});

When("the user wants to add Sushi with Name_Sushi {string} and Ingredients {string} and Cook_id {string}", function (Name_Sushi, Ingredients, Cook_id) {
    this.sushi().addSushi(Name_Sushi, Ingredients, Cook_id);

});

When("the user wants to get a Sushi with id {int}", function (id) {
    this.sushi().getSushi(id);
});

When("the user wants to get Sushies", function () {
    this.sushi().getSushies();
});

When("the user wants to update a Sushi with id {int} and change Name_Sushi {string} and change Ingredients {string} and change Cook_id {int}", function (id, Name_Sushi, Ingredients, Cook_id) {
    this.sushi().updateSushi(id, Name_Sushi, Ingredients, Cook_id);
});

When("the user wants to delete a Sushi with id {int}", function (id) {
    this.sushi().deleteSushi(id);
});

Then("the user wants to get Sushies and server must reply with a json in body like", function (jsonStr) {
    this.sushi().getSushies();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["id"]);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

