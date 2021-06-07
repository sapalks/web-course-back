const db = require('../db')

class specialityController {

    async geAllSpecs(req, res) {
        const result = await db.query('SELECT * FROM speciality WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getSpec(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM speciality WHERE isDeleted = FALSE AND specialityID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createSpec(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO speciality(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updateSpec(req, res) {
        const {specialityID, name} = req.body;
        const result = await db.query('UPDATE speciality SET name = $1 WHERE specialityID = $2 AND isDeleted = FALSE RETURNING *', [name, specialityID]);
        res.json(result.rows[0]);
    }

    async deleteSpec(req, res) {
        const id = req.params.id;
        await db.query('UPDATE speciality SET isDeleted = TRUE WHERE specialityID = $1 RETURNING *', [id]);
        res.json('speciality with id: ' + id + ' was deleted');
    }
}

module.exports = new specialityController();