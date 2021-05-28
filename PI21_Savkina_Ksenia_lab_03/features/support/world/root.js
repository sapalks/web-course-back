const { BaseWorld } = require('./base');
const { PostWorld } = require('./post');
const { CommentWorld } = require('./comment');
const { setWorldConstructor } = require('@cucumber/cucumber');
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #post
    #comment

    constructor() {
        super({});
        this.#post = new PostWorld(this._state);
        this.#comment = new CommentWorld(this._state);
    }

    post() {
        return this.#post;
    }

    comment() {
        return this.#comment;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);