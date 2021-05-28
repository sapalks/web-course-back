const countries = require('../models/countries.model.js');
const cache = require('../models/cache.model');

const countryKey = 'country_';
const allcountriesKey = 'countries';

exports.create = (req, res) => {
    let newCountrie = {
        Name: req.body.Name,
        Language: req.body.Language
    };

    countries.create(newCountrie, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        else {
            res.send(data);
            cache.delete(allcountriesKey);
        }
    });
};

exports.read = async (req, res) => {
    let Id = req.query.Id
    let key = Id === undefined ? allcountriesKey : `${countryKey}${Id}`
    let result = await cache.read(key)
    if (result) {
        return res.send(result)
    }
    countries.read(Id, (err, data) => {
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
        else {
            res.send(data);
            cache.save(key, data);
        }
    });
};

exports.update = (req, res) => {
    let Id = req.body.Id;
    let countrie = {
        Name: req.body.Name,
        Language: req.body.Language
    };
    countries.update(Id, countrie, (err, data) => {
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
        else {
            res.send(data);
            cache.delete(`${allcountriesKey}`)
            cache.delete(`${countryKey}${Id}`)
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
        countries.delete(Id, (err, data) => {
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
            else {
                res.send(data);
                cache.delete(`${allcountriesKey}`)
                cache.delete(`${countryKey}${Id}`)
            }
        });
    }
};

exports.checkCache = (req,res) =>{
    cacheUsing = cache.isCaching();
    res.send(cacheUsing);
}