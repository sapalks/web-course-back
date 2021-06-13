const { BaseWorld } = require('./base')
const db = require("../../../connection.js")

class CarWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }

    #id;

    getLastId() {
        return this.#id;
    }

    addCar(name, enginename, hp, enginevolume, creationyear, brandid) {
        this.post(`/car`, {name, enginename, hp, enginevolume, creationyear, brandid});
        this.#id = this.response.json.id;
    }

    getCar(id) {
        this.get(`/car/${id}`);
    }

    getCars() {
        this.get(`/cars`);
    }

    updateCar(id,name, enginename, hp, enginevolume, creationyear, brandid) {
        this.put(`/car`, {name, enginename, hp, creationyear, enginevolume, brandid, id});
    }

    deleteCar(id) {
        this.delete(`/car/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM car");
    }
}

module.exports = {
    CarWorld
}