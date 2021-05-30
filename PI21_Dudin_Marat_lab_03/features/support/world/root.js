const { BaseWorld } = require('./base')
const { SchoolboyWorld } = require('./schoolboy')
const { DirectionWorld } = require('./direction')
const { setWorldConstructor } = require('@cucumber/cucumber')
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #schoolboy
    #direction

    constructor() {
        super({});
        this.#schoolboy = new SchoolboyWorld(this._state);
        this.#direction = new DirectionWorld(this._state);
    }

    schoolboy() {
        return this.#schoolboy;
    }

    direction() {
        return this.#direction;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);