const { BaseWorld } = require('./base');
const { TaskWorld } = require('./task');
const { setWorldConstructor } = require('@cucumber/cucumber');

class RootWorld extends BaseWorld {
    #task

    constructor() {
        super({});
        this.#task = new TaskWorld(this._state);
    }

    task() {
        return this.#task;
    }
}

setWorldConstructor(RootWorld);

module.exports = {
    BaseWorld
}
