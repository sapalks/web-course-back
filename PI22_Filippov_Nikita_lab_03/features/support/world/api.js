const { BaseWorld } = require('./base')
class ApiWorld extends BaseWorld {

    addCountry(name, language) {
        this.post("/countries", JSON.parse(`{ "Name":"${name}", "Language":"${language}" }`));
    }

    getCountries() {
        this.get("/countries");
    }

    getCountry(Id) {
        this.get(`/countries?Id=${Id}`);
    }

    updateCountry(Id, name, language) {
        this.put("/countries", JSON.parse(`{ "Id":${Id}, "Name":"${name}", "Language":"${language}" }`));
    }

    deleteCountry(Id) {
        this.delete(`/countries?Id=${Id}`);
    }

    addHotel(Name, Rating, CountrieID, Address, ContactNumber) {
        this.post("/hotels", JSON.parse(`{ "Name": "${Name}", "Rating": ${Rating}, "CountrieID": ${CountrieID}, "Address": "${Address}", "ContactNumber": "${ContactNumber}"  }`));
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
        this.put("/hotels", JSON.parse(`{ "Id": ${Id}, "Name": "${Name}", "Rating": ${Rating}, "CountrieID": ${CountrieID}, "Address": "${Address}", "ContactNumber": "${ContactNumber}"  }`));
    }

    deleteHotel(Id) {
        this.delete(`/hotels?Id=${Id}`);
    }
}

module.exports = {
    ApiWorld
}