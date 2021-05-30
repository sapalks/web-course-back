const { BaseWorld } = require('./base')
const { BookWorld } = require('./book')
const { WriterWorld } = require('./writer')
const { setWorldConstructor } = require('@cucumber/cucumber')
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #book
    #writer

    constructor() {
        super({});
        this.#book = new BookWorld(this._state);
        this.#writer = new WriterWorld(this._state);
    }

    book() {
        return this.#book;
    }

    writer() {
        return this.#writer;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);