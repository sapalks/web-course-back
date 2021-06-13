const {BaseWorld} = require('./base');
const {BrandWorld} = require('./brand');
const {CarWorld} = require('./car');
const {setWorldConstructor} = require('@cucumber/cucumber');
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #brand;
    #car;

    constructor() {
        super({});
        this.#brand = new BrandWorld(this._state);
        this.#car = new CarWorld(this._state);
    }

    brand() {
        return this.#brand;
    }

    car() {
        return this.#car;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);