const { BaseWorld } = require('./base')
const { StudentWorld } = require('./student')
const { EducationWorld } = require('./education')
const { setWorldConstructor } = require('@cucumber/cucumber')
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #student
    #education

    constructor() {
        super({});
        this.#student = new StudentWorld(this._state);
        this.#education = new EducationWorld(this._state);
    }

    student() {
        return this.#student;
    }

    education() {
        return this.#education;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);