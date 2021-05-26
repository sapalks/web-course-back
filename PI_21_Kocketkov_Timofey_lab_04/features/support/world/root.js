const { BaseWorld } = require('./base');
const { TimofeyWorld } = require('./timofey');
const { DesireWorld } = require('./desire');
const { setWorldConstructor } = require('@cucumber/cucumber');
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #timofey
    #desire

    constructor() {
        super({});
        this.#timofey = new TimofeyWorld(this._state);
        this.#desire = new DesireWorld(this._state);
    }

    timofey() {
        return this.#timofey;
    }

    desire() {
        return this.#desire;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);