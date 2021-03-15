const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require("assert").strict;
const {deepFilterProperties, matchObjects, isObject} = require('./utils');
const db = require("../../db");
const {expect} = require('chai')

When("a client wants to add employee with first name {string} and last name {string} in department with id {int} and payment {float}",
    function (firstName, lastName, departmentId, payment) {
    this.api().addEmployee(firstName, lastName, departmentId, payment);
});

When("a client wants to get a list of employees", function () {
    this.api().addEmployee("Petr", "Petrov", 2, 30500);
    this.api().getEmployees();
});

When("a client wants to get a list of employees on department with id {int}", function (id) {
    this.api().addEmployee("Stipan", "Stipanov", 1, 25000);
    this.api().getEmployeesOnDepartment(id);
});

When("a client wants to get employee with id {int}", function (id) {
    this.api().getEmployee(id);
});

When("a client wants to update employee with id {int} and change name to {string}, last name to {string}, department id to {int}, payment to {float}",
    function (id, firstName, lastName, departmentId, payment) {
        this.api().updateEmployee(id, firstName, lastName, departmentId, payment)
})

When('a client wants to remove employee with id {int}', function (id) {
    this.api().deleteEmployee(id);
});


Then('if client wants to get a list of employees server must reply with a json in body like', function (jsonStr) {
    this.api().getEmployees();
    const pattern = JSON.parse(jsonStr);
    const obj = this.response.json;
    if (!matchObjects(pattern, obj)) {
        expect(obj).to.eql(pattern[0]);
    }
});

