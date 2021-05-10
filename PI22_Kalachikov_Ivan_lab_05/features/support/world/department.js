const { BaseWorld } = require('./base')
const db = require ("../../../db")
class DepartmentWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }

    #id;

    getLastId() {
        return this.#id;
    }

    add(name) {
        this.post("/department", {name});
        this.#id = this.response.json.id;
    }

    getList() {
        this.get('/department');
    }

    getOne(id) {
        this.get("/department/" + id);
    }

    update(id, name) {
        this.put("/department/", {id, name});
    }

    remove(id) {
        this.delete("/department/" + id);
    }

    async clear() {
        await db.query("DELETE FROM department");
    }
}

module.exports = {
    DepartmentWorld
}
