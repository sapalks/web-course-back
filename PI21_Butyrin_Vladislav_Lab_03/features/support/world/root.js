const { BaseWorld } = require('./base');
const { CookWorld } = require('./cook');
const { SushiWorld } = require('./sushi');
const { setWorldConstructor } = require('@cucumber/cucumber');
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #cook
    #sushi

    constructor() {
        super({});
        this.#cook = new CookWorld(this._state);
        this.#sushi = new SushiWorld(this._state);
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