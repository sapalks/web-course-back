const database = require('../database')

class grouppController {

    async getGroupps(req, res) {
        const result = await database.query('SELECT * FROM groupp WHERE isDell = FALSE');
        res.json(result.rows);
    }

    async getGroupp(req, res) {
        const id = req.params.id;
        const result = await database.query('SELECT * FROM groupp WHERE isDell = FALSE AND id = $1', [id]);
        res.json(result.rows[0]);
    }

    async createGroupp(req, res) {
        const { name, count } = req.body;
        const result = await database.query('INSERT INTO groupp(Name, COUNT) VALUES ($1, $2) RETURNING *', [name, count]);
        res.json(result.rows[0]);
    }

    async updateGroupp(req, res) {
        const { id, name, count } = req.body;
        const result = await database.query('UPDATE groupp SET Name = $1, COUNT = $2 WHERE id = $3 AND isDell = FALSE RETURNING *', [name, count, id]);
        res.json(result.rows[0]);
    }

    async deleteGroupp(req, res) {
        const id = req.params.id;
        await database.query('UPDATE groupp SET isDell = TRUE WHERE id = $1 RETURNING *', [id]);
        res.json('groupp with id = ' + id + ' was deleted');
    }
}

module.exports = new grouppController();