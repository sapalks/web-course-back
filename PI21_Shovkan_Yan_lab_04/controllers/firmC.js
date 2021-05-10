const database = require('../database.js')

class firmC {

    async create(req, res) {
        const { firmName, firmAddress } = req.body;
        await database.query('insert into firm (firmName, firmAddress) values ($1, $2)', [firmName, firmAddress]);
        res.json('Запись фирмы создана');
    }

    async readAll(req, res) {
        res.json((await database.query('select * from firm where isDeleted = false')).rows);
    }

    async readOne(req, res) {
        const firmId = req.params.firmId;
        res.json((await database.query('select * from firm where isDeleted = false and firmId = $1', [firmId])).rows);
    }

    async update(req, res) {
        const { firmId, firmName, firmAddress } = req.body;
        await database.query('update firm set firmName = $2, firmAddress = $3 where firmId = $1', [firmId, firmName, firmAddress]);
        res.json('Запись фирмы обновлена');
    }

    async delete(req, res) {
        const firmId = req.params.firmId;
        await database.query('update firm set isDeleted = true where firmId = $1', [firmId]);
        await database.query('update vacancy set isDeleted = true where firmId = $1', [firmId]);
        res.json('Запись фирмы и все её вакансии помечена удаленной');
    }
}

module.exports = new firmC()