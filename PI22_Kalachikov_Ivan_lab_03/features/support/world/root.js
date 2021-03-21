const { BaseWorld } = require('./base');
const { EmployeeWorld } = require('./employee');
const { DepartmentWorld } = require('./department');
const { setWorldConstructor } = require('@cucumber/cucumber');
const {expect} = require('chai')

class RootWorld extends BaseWorld {
    #employee
    #department

    constructor() {
        super({});
        this.#employee = new EmployeeWorld(this._state);
        this.#department = new DepartmentWorld(this._state);
    }

    employee() {
        return this.#employee;
    }

    department() {
        return this.#department;
    }

    assertOk() {
        expect(this.response.statusCode).to.eql(200);
        this.forget();
    }
}

setWorldConstructor(RootWorld);
