const { BaseWorld } = require('./base')
const db = require ("../../../db")
class EmployeeWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }

    #id;
    getLastId() {
        return this.#id;
    }

    add(first_name, last_name, department_id, payment) {
        this.post("/employee", {first_name, last_name, department_id, payment})
        this.#id = this.response.json.id
    }

    getList() {
        this.get("/employees");
    }

    getListOnDepartment(id) {
        this.get("/employees/" + id);
    }

    getOne(id) {
        this.get("/employee/" + id);
    }

    update(id, first_name, last_name, department_id, payment) {
        this.put("/employee/", {id, first_name, last_name, department_id, payment});
    }

    remove(id) {
        this.delete("/employee/" + id);
    }

    async clear() {
        await db.query("DELETE FROM employee");
    }

}

module.exports = {
    EmployeeWorld
}
