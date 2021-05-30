const database = require('../ConnectToBd.js')

class sushi_barController {

    async create(req, res) {
        const { sushi_barName, sushi_barAddress } = req.body;
        await database.query('insert into sushi_bar (sushi_barName, sushi_barAddress) values ($1, $2)', [sushi_barName, sushi_barAddress]);
        res.json('Запись бара создана');
    }

    async readAll(req, res) {
        res.json((await database.query('select * from sushi_bar where isDeleted = false')).rows);
    }

    async readOne(req, res) {
        const sushi_barId = req.params.sushi_barId;
        res.json((await database.query('select * from sushi_bar where isDeleted = false and sushi_barId = $1', [sushi_barId])).rows);
    }

    async update(req, res) {
        const { sushi_barId, sushi_barName, sushi_barAddress } = req.body;
        await database.query('update sushi_bar set sushi_barName = $2, sushi_barAddress = $3 where sushi_barId = $1', [sushi_barId, sushi_barName, sushi_barAddress]);
        res.json('Запись бара обновлена');
    }

    async delete(req, res) {
        const sushi_barId = req.params.sushi_barId;
        await database.query('update sushi_bar set isDeleted = true where sushi_barId = $1', [sushi_barId]);
        await database.query('update rolls set isDeleted = true where sushi_barId = $1', [sushi_barId]);
        res.json('Запись суши бара и все её роллы была помеченна как удаленная');
    }
}

module.exports = new sushi_barController()