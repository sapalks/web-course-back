const { BaseWorld } = require('./base')
const db = require ("../../../db")

class personWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addperson(firstname, lastname, currentGroup, roomID) {
        this.post("/api/person", {firstname, lastname, currentGroup, roomID});
        this.#id = this.response.json.personid;
    }

    getpersons() {
        this.get("/api/persons");
    }

    getpersonInrooms(roomID) {
        this.get("/api/persons/" + roomID);
    }

    getperson(id) {
        this.get("/api/person/" + id);
    }

    updateperson(personID, firstname, lastname, currentGroup, roomID) {
        this.put("/api/person", {personID, firstname, lastname, currentGroup, roomID});
    }

    deleteperson(id) {
        this.delete("/api/person/" + id);
    }

    async clear() {
        await db.query("DELETE FROM person");
    }
}

module.exports = { personWorld };