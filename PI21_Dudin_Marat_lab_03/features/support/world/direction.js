const { BaseWorld } = require('./base')
const db = require ("../../../db")

class DirectionWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addDirection(name) {
        this.post("/direction", {name});
        this.#id = this.response.json.directionid;
    }

    getDirections() {
        this.get('/directions');
    }

    getDirection(id) {
        this.get("/direction/" + id);
    }

    updateDirection(directionID, name) {
        this.put("/direction", {directionID, name});
    }

    deleteDirection(id) {
        this.delete("/direction/" + id);
    }

    async clear() {
        await db.query("DELETE FROM direction");
        await db.query("ALTER SEQUENCE direction_seq RESTART");
    }
}

module.exports = { DirectionWorld };