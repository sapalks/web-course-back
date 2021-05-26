const database = require('../db.js')

class rollsController {

    async create(req, res) {
        const { rollsName, rollsPrice, rollsWeight,sushi_barID } = req.body;
        await database.query('insert into rolls  (rollsName , rollsPrice, rollsWeight, sushi_barID) values ($1, $2, $3, $4)', [rollsName, rollsPrice, rollsWeight,sushi_barID]);
        res.json('Запись роллов создана');
    }

    async readAll(req, res) {
        res.json((await database.query('select * from rolls where isDeleted = false')).rows);
    }

    async readOne(req, res) {
        const rollsId = req.params.rollsId;
        res.json((await database.query('select * from rolls where isDeleted = false and rollsId = $1', [rollsId])).rows);
    }

    async readFiltred(req, res) {
        const sushi_barId = req.params.sushi_barId;
        res.json((await database.query('select * from rolls where isDeleted = false and sushi_barId = $1', [sushi_barId])).rows);
    }
    
    async update(req, res) {
        const { rollsId, rollsName, rollsPrice, rollsWeight,sushi_barID } = req.body;
        await database.query('update rolls set rollsName = $2, rollsPrice = $3, rollsWeight = $4, sushi_barID = $5 where rollsId = $1', [rollsId, rollsName, rollsPrice, rollsWeight,sushi_barID]);
        res.json('Запись роллов обновлена');
    }

    async delete(req, res) {
        const rollsId = req.params.rollsId;
        await database.query('update rolls set isDeleted = true where rollsID = $1', [rollsId]);
        res.json('Запись роллов была помеченна как удаленная');
    }
}

module.exports = new rollsController()