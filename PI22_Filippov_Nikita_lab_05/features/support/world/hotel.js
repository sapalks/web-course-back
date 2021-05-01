const { BaseWorld } = require('./base')
const sql = require("../../../models/db.model.js")
class HotelWorld extends BaseWorld {
    #Id

    getLastId() {
        return this.#Id;
    }

    addHotel(Name, Rating, CountrieID, Address, ContactNumber) {
        this.post("/hotels", { Name, Rating, CountrieID, Address, ContactNumber });
        this.#Id = this.response.json.Id
    }

    getHotels() {
        this.get("/hotel");
    }

    getHotel(Id) {
        this.get(`/hotel?Id=${Id}`);
    }

    getHotelsByCountrieId(CountrieId) {
        this.get(`/hotels?CountrieId=${CountrieId}`)
    }

    updateHotel(Id, Name, Rating, CountrieID, Address, ContactNumber) {
        this.put("/hotels", { Id, Name, Rating, CountrieID, Address, ContactNumber });
    }

    deleteHotel(Id) {
        this.delete(`/hotels?Id=${Id}`);
    }

    async clear() {
        await sql.query("TRUNCATE HOTELS CASCADE");
        await sql.query("TRUNCATE COUNTRIES CASCADE")
    }
}

module.exports = {
    HotelWorld
}