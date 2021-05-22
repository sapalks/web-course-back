const { BaseWorld } = require('./base')
const db = require("../../../db.js")

class DesireWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }

    addDesire(Name_desire, Degree_of_desire, Timofey_id) {
        this.post(`/Desire`, { Name_desire, Degree_of_desire, Timofey_id });
    }

    getDesire(id) {
        this.get(`/Desire/${id}`);
    }

    getDesires() {
        this.get(`/Desires`);
    }

    updateDesire(id, Name_desire, Degree_of_desire, Timofey_id) {
        this.put(`/Desire`, { id, Name_desire, Degree_of_desire, Timofey_id });
    }

    deleteDesire(id) {
        this.delete(`/Desire/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM Desire");
        await db.query("ALTER SEQUENCE desire_seq RESTART 1");
    }
}

module.exports = {
    DesireWorld
}