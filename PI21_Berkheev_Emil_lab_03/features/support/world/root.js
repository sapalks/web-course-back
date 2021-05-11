const { BaseWorld } = require('./base')
const { PlayerWorld } = require('./player')
const { TeamWorld } = require('./team')
const { setWorldConstructor } = require('@cucumber/cucumber')
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #player
    #team

    constructor() {
        super({});
        this.#player = new PlayerWorld(this._state);
        this.#team = new TeamWorld(this._state);
    }

    player() {
        return this.#player;
    }

    team() {
        return this.#team;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);