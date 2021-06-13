const database = require('../database.js');
const dataCache = require('../dataCache.js');

class firmC {

    async create(req, res) {
        const { firmName, firmAddress } = req.body;
        await database.query('insert into firm (firmName, firmAddress) values ($1, $2)', [firmName, firmAddress]);
        res.json('Запись фирмы создана');
        dataCache.deleteKey(`firms`);
    }

    async readAll(req, res) {
        const cached = await dataCache.isCached(`firms`);
        if (cached) {
            return res.json(cached);
        }
        var firms = (await database.query('select * from firm where isDeleted = false')).rows;
        res.json(firms);
        dataCache.addEntry('firms', firms);
    }

    async readOne(req, res) {
        const firmId = req.params.firmId;
        const cached = await dataCache.isCached(`firm ${firmId}`);
        if (cached) {
            return res.json(cached);
        }
        var firm = (await database.query('select * from firm where isDeleted = false and firmId = $1', [firmId])).rows;
        res.json(firm);
        dataCache.addEntry(`firm ${firmId}`, firm);
    }

    async update(req, res) {
        const { firmId, firmName, firmAddress } = req.body;
        await database.query('update firm set firmName = $2, firmAddress = $3 where firmId = $1', [firmId, firmName, firmAddress]);
        res.json('Запись фирмы обновлена');
        dataCache.deleteKey(`firm ${firmId}`);
        dataCache.deleteKey(`firms`);
    }

    async delete(req, res) {
        const firmId = req.params.firmId;
        await database.query('update firm set isDeleted = true where firmId = $1', [firmId]);
        await database.query('update vacancy set isDeleted = true where firmId = $1', [firmId]);
        res.json('Запись фирмы и все её вакансии помечена удаленной');
        dataCache.deleteKey(`firm ${firmId}`);
        dataCache.deleteKey(`firms`);
    }

    async isCached(req, res) {
        const key = await dataCache.getNeededKey();
        if (key) {
            return res.json(`Закеширована(-ы) запись(-и) с ключом(-ами) ${key}`);
        }
        else {
            res.json(`Ничего не закешировано`);
        }
    }
}

module.exports = new firmC()