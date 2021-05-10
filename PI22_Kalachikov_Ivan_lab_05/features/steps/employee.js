const {Given, When, Then, Before} = require('@cucumber/cucumber');
const {deepFilterProperties, matchObjects, isObject} = require('./utils');
const {expect} = require('chai')

let start
let startForDepartment;
let currentDepartmentId;
let currentId;

Before(async function () {
    await this.employee().clear()
    start = true;
    startForDepartment = true;
});

Given('a client added test department with name {string}', function (name) {
    this.department().add(name);
    if (startForDepartment) {
        currentDepartmentId = this.department().getLastId();
        startForDepartment = false;
    }
    this.assertOk();
})

When('a client wants to add employee with first name {string} and last name {string} and payment {float} in department with index {int}',
    function (firstName, lastName, payment, departmentIndex) {
    this.employee().add(firstName, lastName, currentDepartmentId + departmentIndex - 1, payment);
    if (start) {
        currentId = this.employee().getLastId();
        start = false;
    }
});

When("a client wants to get a list of employees", function () {
    this.employee().getList();
});

When('a client wants to get a list of employees in department with index {int}', function (departmentIndex) {
   this.employee().getListOnDepartment(currentDepartmentId + departmentIndex - 1);
});

Given('a client added employee with first name {string} and last name {string} and payment {int} in department with index {int}',
    function (firstName, lastName, payment, departmentIndex) {
    this.employee().add(firstName, lastName, currentDepartmentId + departmentIndex - 1, payment);
    if (start) {
        currentId = this.employee().getLastId();
        start = false;
    }
});

When('a client wants to get employee on index {int}', function (index) {
    let id = currentId + index - 1;
    this.employee().getOne(id);
})

When('a client wants to update a employee on index {int} with first name {string} and last name {string} and payment {float} in department with index {int}',
    function (index, firstName, lastName, payment, departmentIndex) {
        let id = currentId + index - 1;
        this.employee().update(id, firstName, lastName, currentDepartmentId + departmentIndex - 1, payment)
});


Then('if client wants to get a list of employees server must reply with a json in body like', function (docString) {
    this.employee().getList();
    const expected = JSON.parse(docString);
    const filtered = deepFilterProperties(this.response.json, ['id', 'department_id']);
    if (isObject(filtered.body) && Object.keys(filtered.body).length === 0) {
        delete filtered.body;
    }
    expect(filtered).to.eql(expected);
})

When('a client wants to remove employee on index {int}', function (index) {
    let id = currentId + index - 1;
    this.employee().remove(id);
})