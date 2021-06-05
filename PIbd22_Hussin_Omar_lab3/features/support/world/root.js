const { BaseWorld } = require('./base')
const { personWorld } = require('./person')
const { roomWorld } = require('./room')
const { setWorldConstructor } = require('@cucumber/cucumber')
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #person
    #room

    constructor() {
        super({});
        this.#person = new personWorld(this._state);
        this.#room = new roomWorld(this._state);
    }

    person() {
        return this.#person;
    }

    room() {
        return this.#room;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);