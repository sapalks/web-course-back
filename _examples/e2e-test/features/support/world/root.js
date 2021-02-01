const { BaseWorld } = require('./base');
const { ExampleWorld } = require('./example');
const { setWorldConstructor } = require('@cucumber/cucumber');

class RootWorld extends BaseWorld {
    #example

    constructor() {
        super({});
        this.#example = new ExampleWorld(this._state);
    }

    example() {
        return this.#example;
    }
}

setWorldConstructor(RootWorld);


// setWorldConstructor(function () {
//     this.world = new RootWorld();
// });
