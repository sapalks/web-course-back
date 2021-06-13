const { BaseWorld } = require('./base')
const db = require("../../../db.js")

class SushiWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }

    addSushi(Name_Sushi, Ingredients, Cook_id) {
        this.post(`/Sushi`, { Name_Sushi, Ingredients, Cook_id });
    }

    getSushi(id) {
        this.get(`/Sushi/${id}`);
    }

    getSushies() {
        this.get(`/Sushies`);
    }

    updateSushi(id, Name_Sushi, Ingredients, Cook_id) {
        this.put(`/Sushi`, { id, Name_Sushi, Ingredients, Cook_id });
    }

    deleteSushi(id) {
        this.delete(`/Sushi/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM Sushi");
        await db.query("ALTER SEQUENCE Sushi_seq RESTART 1");
    }
}

module.exports = {
    SushiWorld
}