const database = require('../database.js')

class vacancyC {

    async create(req, res) {
        const { vacancyPosition, vacancySalary, vacancySchedule,firmID } = req.body;
        await database.query('insert into vacancy  (vacancyPosition , vacancySalary, vacancySchedule, firmID) values ($1, $2, $3, $4)', [vacancyPosition, vacancySalary, vacancySchedule,firmID]);
        res.json('Запись вакансии создана');
    }

    async readAll(req, res) {
        res.json((await database.query('select * from vacancy where isDeleted = false')).rows);
    }

    async readOne(req, res) {
        const vacancyId = req.params.vacancyId;
        res.json((await database.query('select * from vacancy where isDeleted = false and vacancyId = $1', [vacancyId])).rows);
    }

    async readFiltred(req, res) {
        const firmId = req.params.firmId;
        res.json((await database.query('select * from vacancy where isDeleted = false and firmId = $1', [firmId])).rows);
    }
    
    async update(req, res) {
        const { vacancyId, vacancyPosition, vacancySalary, vacancySchedule,firmID } = req.body;
        await database.query('update vacancy set vacancyPosition = $2, vacancySalary = $3, vacancySchedule = $4, firmID = $5 where vacancyId = $1', [vacancyId, vacancyPosition, vacancySalary, vacancySchedule,firmID]);
        res.json('Запись вакансии обновлена');
    }

    async delete(req, res) {
        const vacancyId = req.params.vacancyId;
        await database.query('update vacancy set isDeleted = true where vacancyID = $1', [vacancyId]);
        res.json('Запись вакансии помечена удаленной');
    }
}

module.exports = new vacancyC()