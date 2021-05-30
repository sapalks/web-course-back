const {Given, When, Then, Before} = require('@cucumber/cucumber')
const {deepFilterProperties, matchObjects, isObject} = require('./utils')
const {expect} = require('chai')

let lastBookId, bookCounter, lastWriterId, writerCounter;

Before(async function () {
    await this.book().clear();
    await this.writer().clear();
    bookCounter = 0;
    writerCounter = 0;
});

Given('a client added test writer with name {string} , surname {string} and patronymic {string}', function (firstname,lastname,patronymic) {
    this.writer().createWriter(firstname,lastname,patronymic);
    lastWriterId = this.writer().getLastId();
    bookCounter++;
})

When('a client wants to add book with name {string} and writer with index {int}', function (name,index) {
    this.book().createBook(name,index);
    lastWriterId = this.writer().getLastId();
    writerCounter++;
});

When("a client wants to get a list of books", function () {
    this.book().getBooks();
});

When('a client wants to get a list of books in writer with index {int}', function (writerid) {
    this.book().getAutorBooks(writerid);
});

Given('a client added book with name {string} and writer with index {int}', function (name,writerid) {
    this.book().createBook(name,writerid);
    lastBookId = this.writer().getLastId();
    writerCounter++;
});

When('a client wants to get book on index {int}', function (index) {
    let id = lastBookId - (bookCounter - index);
    this.book().getBook(id);
})

When('a client wants to update a book on index {int} with name {string} and writer with index {int}', function (index, name, writerid) {
    let id = lastBookId - (bookCounter - index);
    this.book().updateBook(id, name, writerid)
});

Then('if client wants to get a list of books server must reply with a json in body like', function (docString) {
    this.book().getBooks();
    const expected = JSON.parse(docString);
    const filtered = deepFilterProperties(this.response.json, ['bookid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
})

Then('server must reply with the following json in body for book model:', function (jsonStr) {
    const expected = JSON.parse(jsonStr);
    const filtered = deepFilterProperties(this.response.json, ['bookid', 'isdeleted']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
});

When('a client wants to delete book on index {int}', function (index) {
    let id = lastBookId - (bookCounter - index);
    this.book().deleteBook(id);
})