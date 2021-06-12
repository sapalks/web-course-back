const db = require('../databaseconnect')
const cache = require('../cache.js')
class vacancyController {
    async createvacancy(req, res) {
        const {vacancyid, namepost, salary } = req.body;
        const result = await db.query('INSERT INTO vacancy(vacancyid, namepost, salary) VALUES ($1, $2, $3) RETURNING *', [vacancyid, namepost, salary]);
        cache.delete(`vacancys`)
        res.json(result.rows[0]);
    }

    async geAllvacancys(req, res) {
        const cached = await cache.get(`vacancys`)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM vacancy WHERE delete = false');
        res.json(result.rows);
        cache.save(`vacancys`, result.rows)
    }

    async getvacancy(req, res) {
        const vacancyid = req.params.id;
        const cached = await cache.get(`vacancy ${vacancyid}`)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM vacancy  WHERE delete = false AND vacancyid = $1', [vacancyid]);
        res.json(result.rows[0]);
        cache.save(`vacancy ${vacancyid}`, result.rows[0])
        res.json(result.rows[0]);
    }

    async updatevacancy(req, res) {
        const {vacancyid, namepost, salary } = req.body;
        const result = await db.query('UPDATE vacancy SET namepost = $2, salary = $3  WHERE vacancyid = $1 AND delete = false RETURNING *', [vacancyid, namepost, salary]);
        res.json(result.rows[0]);
        cache.delete(`vacancy ${vacancyid}`)
        cache.delete(`vacancys`)
    }

    async deletevacancy(req, res) {
        const vacancyid = req.params.id;
        await db.query('UPDATE vacancy SET delete = true WHERE vacancyid = $1 AND delete = false RETURNING *', [vacancyid]);
        cache.delete(`vacancy ${vacancyid}`)
        cache.delete(`vacancys`)
        res.json('vacancy with vacancyid: ' + vacancyid + ' was deleted');
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`cache key saved ${key}`)
        }
        res.json("No cache")
     }
}

module.exports = new vacancyController();