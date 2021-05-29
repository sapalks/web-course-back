const database = require('../database')
const cache = require('../cache')
const Key = 'groupps'
const IdKey = 'groupp '

class grouppController {

    async getGroupps(req, res) {
        const cached = await cache.get(Key)
        if (cached) { return res.json(cached) }

        const result = await database.query('SELECT * FROM groupp WHERE isDell = FALSE');

        cache.save(Key, result.rows)
        res.json(result.rows);
    }

    async getGroupp(req, res) {
        const id = req.params.id;
        const cacheKey = IdKey + id

        const cached = await cache.get(cacheKey)
        if (cached) { return res.json(cached) }

        const result = await database.query('SELECT * FROM groupp WHERE isDell = FALSE AND id = $1', [id]);

        cache.save(cacheKey, result.rows[0])
        res.json(result.rows[0]);
    }

    async createGroupp(req, res) {
        const { name, count } = req.body;

        const result = await database.query('INSERT INTO groupp(Name, COUNT) VALUES ($1, $2) RETURNING *', [name, count]);

        cache.delete(Key)
        res.json(result.rows[0]);
    }

    async updateGroupp(req, res) {
        const { id, name, count } = req.body;
        const cacheKey = IdKey + id;

        const result = await database.query('UPDATE groupp SET Name = $1, COUNT = $2 WHERE id = $3 AND isDell = FALSE RETURNING *', [name, count, id]);

        cache.delete(cacheKey)
        cache.delete(Key)
        res.json(result.rows[0]);
    }

    async deleteGroupp(req, res) {
        const id = req.params.id;
        const cacheKey = IdKey + id;

        await database.query('UPDATE groupp SET isDell = TRUE WHERE id = $1 RETURNING *', [id]);

        cache.delete(cacheKey)
        cache.delete(Key)
        res.json('groupp with id = ' + id + ' was deleted');
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) { return res.json(key) }
    }
}

module.exports = new grouppController();