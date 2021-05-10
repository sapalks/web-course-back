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
    await this.post().clear()
    isClear = true;
});

Given("a client added post with name {string} and with text {string}", function (name, text) {
    this.post().addPost(name, text);
    if (isClear) {
        lastId = this.post().getLastId();
        isClear = false;
    }
    this.assertOk()
});

When("a client wants to add post with name {string} and with text {string}", function (name, text) {
    this.post().addPost(name, text);
    if (isClear) {
        lastId = this.post().getLastId();
        isClear = false;
    }
});

When("a client wants to get a post with id {int}", function (id) {
    this.post().getPost(lastId + id - 1);
});

When("a client wants to get posts", function () {
    this.post().getPosts();
});

When("a client wants to update a post with id {int} and change name {string} and text {string}", function (id, name, text) {
    this.post().updatePost(lastId + id - 1, name, text);
});

When("a client wants to delete a post with id {int}", function (id) {
    this.post().deletePost(lastId + id - 1);
});

Then("a client wants to get posts and server must reply with a json in body like", function (jsonStr) {
    this.post().getPosts();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["postid", "createdat"]);
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
    const filtered = deepFilterProperties(this.response.json, ["postid", "createdat", "commentid"]);
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