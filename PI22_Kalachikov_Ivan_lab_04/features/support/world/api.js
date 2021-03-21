const { BaseWorld } = require('./base')
class ExampleWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }

    getDepartments() {
        this.get('/department');
    }

    addDepartment(name) {
        this.post("/department", JSON.parse("{ \"name\":\"" + name + "\" }"));
    }

    getDepartment(id) {
        this.get("/department/" + id);
    }

    updateDepartment(id, name) {
        this.put("/department/", JSON.parse("{ \"id\":\"" + id + "\", \"name\":\"" + name + "\" }"));
    }

    deleteDepartment(id) {
        this.delete("/department/" + id);
    }

    addEmployee(firstName, lastName, departmentId, payment) {
        this.post("/employee", JSON.parse("{ \"first_name\": \"" + firstName +
            "\", \"last_name\": \"" + lastName + "\", \"department_id\": " + departmentId + ", \"payment\": " +  payment +" }"));
    }

    getEmployees() {
        this.get("/employees");
    }

    getEmployeesOnDepartment(id) {
        this.get("/employees/" + id);
    }

    getEmployee(id) {
        this.get("/employee/" + id);
    }

    updateEmployee(id, firstName, lastName, departmentId, payment) {
        this.put("/employee/", JSON.parse("{ \"id\": " + id + ", \"first_name\": \"" + firstName +
            "\", \"last_name\": \"" + lastName + "\", \"department_id\": " + departmentId + ", \"payment\": " +  payment +" }"));
    }

    deleteEmployee(id) {
        this.delete("/employee/" + id);
    }

}

module.exports = {
    ExampleWorld
}
