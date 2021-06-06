const database = require('../database.js');
const dataCache = require('../dataCache.js');

class vacancyC {

    async create(req, res) {
        const { vacancyPosition, vacancySalary, vacancySchedule,firmID } = req.body;
        await database.query('insert into vacancy  (vacancyPosition , vacancySalary, vacancySchedule, firmID) values ($1, $2, $3, $4)', [vacancyPosition, vacancySalary, vacancySchedule,firmID]);
        res.json('Запись вакансии создана');
        dataCache.deleteKey(`vacancies`);
    }

    async readAll(req, res) {
        const cached = await dataCache.isCached(`vacancies`);
        if (cached) {
            return res.json(cached);
        }
        res.json((await database.query('select * from vacancy where isDeleted = false')).rows);
        dataCache.addEntry('vacancies', (await database.query('select * from vacancy where isDeleted = false')).rows);
    }

    async readOne(req, res) {
        const vacancyId = req.params.vacancyId;
        const cached = await dataCache.isCached(`vacancy ${vacancyId}`);
        if (cached) {
            return res.json(cached);
        }
        res.json((await database.query('select * from vacancy where isDeleted = false and vacancyId = $1', [vacancyId])).rows);
        dataCache.addEntry(`vacancy ${vacancyId}`, (await database.query('select * from vacancy where isDeleted = false and vacancyId = $1', [vacancyId])).rows);
    }
    
    async update(req, res) {
        const { vacancyId, vacancyPosition, vacancySalary, vacancySchedule,firmID } = req.body;
        await database.query('update vacancy set vacancyPosition = $2, vacancySalary = $3, vacancySchedule = $4, firmID = $5 where vacancyId = $1', [vacancyId, vacancyPosition, vacancySalary, vacancySchedule,firmID]);
        res.json('Запись вакансии обновлена');
        dataCache.deleteKey(`vacancy ${vacancyId}`);
        dataCache.deleteKey(`vacancies`);
    }

    async delete(req, res) {
        const vacancyId = req.params.vacancyId;
        await database.query('update vacancy set isDeleted = true where vacancyID = $1', [vacancyId]);
        res.json('Запись вакансии помечена удаленной');
        dataCache.deleteKey(`vacancy ${vacancyId}`);
        dataCache.deleteKey(`vacancies`);
    }
    
    async isCached(req, res) {
        const key = await dataCache.getNeededKey();
        if (key != 'vacancies') {
            return res.json(`Закеширована(-ы) запись(-и) с ключом(-ами) ${key}`);
        }
        else {
            res.json(`Ничего не закешировано`);
        }
    }
}

module.exports = new vacancyC()