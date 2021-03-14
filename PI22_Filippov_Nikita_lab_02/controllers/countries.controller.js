const Countries = require('../models/countries.model.js');

exports.create = (req, res) => {
    const countrie = new Countries({
        Name: req.body.Name,
        Language: req.body.Language
    });

    Countries.create(countrie, (err, data) => {
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
    Countries.read(Id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Не найдена страна с ID ${Id}.`
                });
            } else {
                res.status(500).send({
                    message: `Ошибка чтения стран`
                });
            }
        }
        else res.send(data);
    });
};

exports.update = (req, res) => {
    let Id = req.body.Id;
    const countrie = new Countries({
        Name: req.body.Name,
        Language: req.body.Language
    })
    Countries.update(Id, countrie, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Не найдена страна с ID ${Id}.`
                });
            } else {
                res.status(500).send({
                    message: `Ошибка изменения страны с ID ${Id}`
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
        Countries.delete(Id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Не найдена страна с ID ${Id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Ошибка удаления страны с ID ${Id}`
                    });
                }
            }
            else res.send(data);
        });
    }
};