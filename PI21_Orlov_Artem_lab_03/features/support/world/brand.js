const {BaseWorld} = require('./base')
const db = require("../../../connection")

class BrandWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }

    #id;

    getLastId() {
        return this.#id;
    }

    addBrand(name, foundername, creationyear) {
        this.post(`/brand`, {name, foundername, creationyear});
        this.#id = this.response.json.id;
    }

    getBrand(id) {
        this.get(`/brand/${id}`);
    }

    getBrands() {
        this.get(`/brands`);
    }

    updateBrand(id, name, foundername, creationyear) {
        this.put(`/brand`, {id, name, foundername, creationyear});
    }

    deleteBrand(id) {
        this.delete(`/brand/${id}`);
    }

    async clear() {
        await db.query("DELETE FROM brand");
    }
}

module.exports = {
    BrandWorld
}