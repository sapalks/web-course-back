const { BaseWorld } = require('./base')
const db = require("../../../db.js")

class TimofeyWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }
    
    addTimofey(surname, age) {
        this.post('/Timofey', { surname, age });
    }

    getTimofey(id) {
        this.get(`/Timofey/${id}`);
    }

    getTimofeys() {
        this.get(`/Timofeys`);
    }

    updateTimofey(id, surname, age) {
        this.put(`/Timofey`, { id, surname, age });
    }

    deleteTimofey(id) {
        this.delete(`/Timofey/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM Timofey");
        await db.query("ALTER SEQUENCE timofey_seq RESTART 1");
    }
}

module.exports = {
    TimofeyWorld
}