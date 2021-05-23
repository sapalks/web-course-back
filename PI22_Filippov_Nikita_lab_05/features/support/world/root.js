const { BaseWorld } = require('./base');
const { CountryWorld } = require('./country');
const { HotelWorld } = require('./hotel');
const { setWorldConstructor } = require('@cucumber/cucumber');
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #country
    #hotel

    constructor() {
        super({});
        this.#hotel = new HotelWorld(this._state);
        this.#country = new CountryWorld(this._state);
    }

    country() {
        return this.#country;
    }

    hotel() {
        return this.#hotel;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);