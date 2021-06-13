const { BaseWorld } = require('./base')
const db = require("../../../db.js")

class CookWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }
    
    addCook(surname, age) {
        this.post('/Cook', { surname, age });
    }

    getCook(id) {
        this.get(`/Cook/${id}`);
    }

    getCooks() {
        this.get(`/Cooks`);
    }

    updateCook(id, surname, age) {
        this.put(`/Cook`, { id, surname, age });
    }

    deleteCook(id) {
        this.delete(`/Cook/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM Cook");
        await db.query("ALTER SEQUENCE Cook_seq RESTART 1");
    }
}

module.exports = {
    CookWorld
}