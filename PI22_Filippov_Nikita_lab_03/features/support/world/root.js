const { BaseWorld } = require('./base');
const { ApiWorld } = require('./api');
const { setWorldConstructor } = require('@cucumber/cucumber');

class RootWorld extends BaseWorld {
    #api

    constructor() {
        super({});
        this.#api = new ApiWorld(this._state);
    }

    api() {
        return this.#api;
    }
}

setWorldConstructor(RootWorld);