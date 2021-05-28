const { BaseWorld } = require('./base')
const sql = require("../../../models/db.model.js")
class CountryWorld extends BaseWorld {
    #Id;

    getLastId() {
        return this.#Id;
    }

    addCountry(Name, Language) {
        this.post("/countries", { Name, Language });
        this.#Id = this.response.json.Id;
    }

    getCountries() {
        this.get("/countries");
    }

    getCountry(Id) {
        this.get(`/countries?Id=${Id}`);
    }

    updateCountry(Id, Name, Language) {
        this.put("/countries", { Id, Name, Language });
    }

    deleteCountry(Id) {
        this.delete(`/countries?Id=${Id}`);
    }

    async clear() {
        await sql.query('TRUNCATE COUNTRIES CASCADE');
    }
}

module.exports = {
    CountryWorld
}