const hotels = require('../models/hotels.model.js');
const cache = require('../models/cache.model');

const hotelKey = 'hotel_';
const allhotelsKey = 'hotels';
const hotelByCountryKey = 'hotels_in_country_';

exports.create = (req, res) => {
    const newHotel = {
        Name: req.body.Name,
        Rating: req.body.Rating,
        CountrieID: req.body.CountrieID,
        Address: req.body.Address,
        ContactNumber: req.body.ContactNumber
    };

    hotels.create(newHotel, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        else{
        res.send(data);
        cache.delete(allhotelsKey);
        cache.delete(`${hotelByCountryKey}${newHotel.CountrieID}`)
        }
    });
};

exports.read = async (req, res) => {
    let Id = req.query.Id
    let key = Id === undefined ? allhotelsKey : `${hotelKey}${Id}`
    let result = await cache.read(key)
    if (result) {
        return res.send(result)
    }
    hotels.read(Id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Не найден отель с ID ${Id}.`
                });
            } else {
                res.status(500).send({
                    message: `Ошибка чтения отелей`
                });
            }
        }
        else {
            res.send(data);
            cache.save(key, data);
        }
    });
};

exports.readByCountrie = async (req, res) => {
    let Id = req.query.CountrieId
    let key = `${hotelByCountryKey}${Id}`
    let result = await cache.read(key)
    if (result) {
        return res.send(result)
    }
    hotels.readByCountrie(Id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Не найдены отели со странной с ID ${Id}.`
                });
            } else {
                res.status(500).send({
                    message: `Ошибка чтения отелей`
                });
            }
        }
        else {
            res.send(data);
            cache.save(key, data);
        }
    });
};

exports.update = (req, res) => {
    let Id = req.body.Id;
    const hotel = {
        Name: req.body.Name,
        Rating: req.body.Rating,
        CountrieID: req.body.CountrieID,
        Address: req.body.Address,
        ContactNumber: req.body.ContactNumber
    }
    hotels.update(Id, hotel, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Не найден отель с ID ${Id}.`
                });
            } else {
                res.status(500).send({
                    message: `Ошибка изменения отеля с ID ${Id}`
                });
            }
        }
        else{
            res.send(data);
            cache.delete(`${allhotelsKey}`)
            cache.delete(`${hotelKey}${Id}`)
            cache.delete(`${hotelByCountryKey}${hotel.CountrieID}`)
        }
    });
};

exports.delete = (req, res) => {
    let Id = req.query.Id
    if (!Id) {
        res.status(400).send({
            message: "Пустое тело запроса"
        });
    }
    else {
        hotels.delete(Id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Не найден отель с ID ${Id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Ошибка удаления отеля с ID ${Id}`
                    });
                }
            }
            else{
                res.send(data.message);
                cache.delete(`${allhotelsKey}`)
                cache.delete(`${hotelKey}${Id}`)
                cache.delete(`${hotelByCountryKey}${data.CountrieID}`)
            }
        });
    }
};

exports.checkCache = (req,res) =>{
    cacheUsing = cache.isCaching();
    res.send(cacheUsing);
}