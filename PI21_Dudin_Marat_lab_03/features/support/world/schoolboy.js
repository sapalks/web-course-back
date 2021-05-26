const { BaseWorld } = require('./base')
const db = require ("../../../db")

class SchoolboyWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addSchoolboy(fullname, classNumber, directionID) {
        this.post("/schoolboy", {fullname, classNumber, directionID});
        this.#id = this.response.json.schoolboyid;
    }

    getSchoolboys() {
        this.get("/schoolboys");
    }

    getSchoolboyInDirections(directionID) {
        this.get("/schoolboys/" + directionID);
    }

    getSchoolboy(id) {
        this.get("/schoolboy/" + id);
    }

    updateSchoolboy(schoolboyID, fullname, classNumber, directionID) {
        this.put("/schoolboy", {schoolboyID, fullname, classNumber, directionID});
    }

    deleteSchoolboy(id) {
        this.delete("/schoolboy/" + id);
    }

    async clear() {
        await db.query("DELETE FROM schoolboy");
    }
}

module.exports = { SchoolboyWorld };