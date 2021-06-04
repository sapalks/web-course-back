const db = require('../databaseconnect')

class vacancyController {
    async createvacancy(req, res) {
        const {vacancyid, namepost, salary } = req.body;
        const result = await db.query('INSERT INTO vacancy(vacancyid, namepost, salary) VALUES ($1, $2, $3) RETURNING *', [vacancyid, namepost, salary]);
        res.json(result.rows[0]);
    }

    async geAllvacancys(req, res) {
        const result = await db.query('SELECT * FROM vacancy WHERE delete = false');
        res.json(result.rows);
    }

    async getvacancy(req, res) {
        const vacancyid = req.params.id;
        const result = await db.query('SELECT * FROM vacancy  WHERE delete = false AND vacancyid = $1', [vacancyid]);
        res.json(result.rows[0]);
    }

    async updatevacancy(req, res) {
        const {vacancyid, namepost, salary } = req.body;
        const result = await db.query('UPDATE vacancy SET namepost = $2, salary = $3  WHERE vacancyid = $1 AND delete = false RETURNING *', [vacancyid, namepost, salary]);
        res.json(result.rows[0]);
    }

    async deletevacancy(req, res) {
        const vacancyid = req.params.id;
        await db.query('UPDATE vacancy SET delete = true WHERE vacancyid = $1 AND delete = false RETURNING *', [vacancyid]);
        res.json('vacancy with vacancyid: ' + vacancyid + ' was deleted');
    }
}

module.exports = new vacancyController();