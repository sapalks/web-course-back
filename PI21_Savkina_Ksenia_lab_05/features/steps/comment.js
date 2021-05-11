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
let postLastId;
let isClear;
let isClearPost;

Before(async function () {
    await this.comment().clear()
    await this.post().clear()
    isClear = true;
    isClearPost = true;
});

Given("a client added post for comment with name {string} and with text {string}", function (name, text) {
    this.post().addPost(name, text);
    if (isClearPost) {
        postLastId = this.post().getLastId();
        isClearPost = false;
    }
    this.assertOk()
});

Given("a client added comment with content {string} and with postid {int}", function (content, postid) {
    this.comment().addComment(content, postLastId + postid - 1);
    if (isClear) {
        lastId = this.comment().getLastId();
        isClear = false;
    }
});

When("a client wants to add post for comment with name {string} and with text {string}", function (name, text) {
    this.post().addPost(name, text);
    if (isClearPost) {
        postLastId = this.post().getLastId();
        isClearPost = false;
    }
});

When("a client wants to add comment with content {string} and with postid {int}", function (content, postid) {
    this.comment().addComment(content, postLastId + postid - 1);
    if (isClear) {
        lastId = this.comment().getLastId();
        isClear = false;
    }
});

When("a client wants to get a comment with id {int}", function (id) {
    this.comment().getComment(lastId + id - 1);
});

When("a client wants to get comments", function () {
    this.comment().getComments();
});

When("a client wants to update a comment with id {int} and change content {string}", function (id, content) {
    this.comment().updateComment(lastId + id - 1, content);
});

When("a client wants to delete a comment with id {int}", function (id) {
    this.comment().deleteComment(lastId + id - 1);
});

Then("a client wants to get comments and server must reply with a json in body like", function (jsonStr) {
    this.comment().getComments();
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ["commentid", "createdat", "postid"]);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});
