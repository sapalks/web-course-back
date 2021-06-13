const { BaseWorld } = require('./base');
const { TaskWorld } = require('./task');
const { StepWorld } = require('./step');
const { setWorldConstructor } = require('@cucumber/cucumber');

class RootWorld extends BaseWorld {
    #task
    #step

    constructor() {
        super({});
        this.#task = new TaskWorld(this._state);
        this.#step = new StepWorld(this._state);
    }

    task() {
        return this.#task;
    }

    step() {
        return this.#step;
    }
}

setWorldConstructor(RootWorld);

module.exports = {
    BaseWorld
}
