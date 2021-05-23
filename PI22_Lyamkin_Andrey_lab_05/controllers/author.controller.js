const Authors = require('../models/author.model.js')

function create (req, res) {
    Authors.create({nickname: req.body.nickname}, (err, data) => {
        if (err) {
            console.error(err.message)
            res.status(500).send({
                message: 'Возникла ошибка при попытке добавить запись в базу данных',
                error: err.message
            })
        }
        else res.send(data)
    })
}

function read (req, res)  {
    const id = req.query.id
    if(id){  
        Authors.readById(id, (err, data) => {
            if(err){
                console.error(err.message)
                if(err.status === '404'){
                    res.status(404).send({
                        message: 'В базе данных не существует зписи с требуемым id',
                        id: id
                    })
                }else{
                    res.status(500).send({
                        message: 'Возникла ошибка при попытке получить данные из базы данных',
                        error: err.message
                    })
                }
            }
            else res.send(data)
        })
    }
    else{
        Authors.readAll((err, data) => {
            if (err) {
                console.error(err.message)
                res.status(500).send({
                    message: 'Возникла ошибка при попытке получить данные из базы данных',
                    error: err.message
                })
            }
            else res.send(data)
        })
    }
}

function update (req, res) {
    Authors.update({id: req.body.id, nickname: req.body.nickname}, (err, data) => {
        if (err) {
            console.error(err.message)
            if (err.status === '404') {
                res.status(404).send({
                    message: 'В базе данных не существует зписи с требуемым id',
                    id: req.body.id
                })
            } else {
                res.status(500).send({
                    message: 'Возникла ошибка при попытке редактирования записи с указанным id',
                    id: req.body.id,
                    error: err.message
                })
            }
        }
        else res.send(data);
    })
}

function deleteById (req, res) {
    Authors.markAsDeleted(req.query.id, (err, data) => {
        if (err) {
            console.error(err.message)
            if (err.status === '404') {
                res.status(404).send({
                    message: 'В базе данных не существует зписи с требуемым id',
                    id: req.query.id
                })
            } else {
                res.status(500).send({
                    message: 'Возникла ошибка при попытке редактирования записи с указанным id',
                    id: req.query.id,
                    error: err.message
                })
            }
        }
        else res.send(data)
    })
}

module.exports = {
    create: create,
    read: read,
    update: update,
    delete: deleteById
}