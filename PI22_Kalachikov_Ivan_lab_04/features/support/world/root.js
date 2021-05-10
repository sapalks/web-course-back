const { BaseWorld } = require('./base');
const { ExampleWorld } = require('./api');
const { setWorldConstructor } = require('@cucumber/cucumber');

class RootWorld extends BaseWorld {
    #api

    constructor() {
        super({});
        this.#api = new ExampleWorld(this._state);
    }

    api() {
        return this.#api;
    }
}

setWorldConstructor(RootWorld);
