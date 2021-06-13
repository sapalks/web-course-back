const { BaseWorld } = require('./base');
const { SushiWorld } = require('./sushi');
const { CookWorld } = require('./cook');
const { setWorldConstructor } = require('@cucumber/cucumber');
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #sushi
    #cook

    constructor() {
        super({});
        this.#sushi = new SushiWorld(this._state);
        this.#cook = new CookWorld(this._state);
    }

    cook() {
        return this.#cook;
    }

    sushi() {
        return this.#sushi;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);