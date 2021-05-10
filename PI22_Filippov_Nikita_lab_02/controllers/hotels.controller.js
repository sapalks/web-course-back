const Hotels = require('../models/hotels.model.js');

exports.create = (req, res) => {
    const hotel = new Hotels({
        Name: req.body.Name,
        Rating: req.body.Rating,
        CountrieID: req.body.CountrieID,
        Address: req.body.Address,
        ContactNumber: req.body.ContactNumber
    });

    Hotels.create(hotel, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        else res.send(data);
    });
};

exports.read = (req, res) => {
    let Id = req.query.Id
    Hotels.read(Id, (err, data) => {
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
        else res.send(data);
    });
};

exports.readByCountrie = (req, res) => {
    let Id = req.query.CountrieId
    Hotels.readByCountrie(Id, (err, data) => {
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
        else res.send(data);
    });
};

exports.update = (req, res) => {
    let Id = req.body.Id;
    const hotel = new Hotels({
        Name: req.body.Name,
        Rating: req.body.Rating,
        CountrieID: req.body.CountrieID,
        Address: req.body.Address,
        ContactNumber: req.body.ContactNumber
    })
    Hotels.update(Id, hotel, (err, data) => {
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
        else res.send(data);
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
        Hotels.delete(Id, (err, data) => {
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
            else res.send(data);
        });
    }
};