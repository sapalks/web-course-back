const db = require('../db')

class educationController {

    async geAllEducations(req, res) {
        const result = await db.query('SELECT * FROM education WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getEducation(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM education WHERE isDeleted = FALSE AND educationID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createEducation(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO education(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updateEducation(req, res) {
        const {educationID, name} = req.body;
        const result = await db.query('UPDATE education SET name = $1 WHERE educationID = $2 AND isDeleted = FALSE RETURNING *', [name, educationID]);
        res.json(result.rows[0]);
    }

    async deleteEducation(req, res) {
        const id = req.params.id;
        await db.query('UPDATE education SET isDeleted = TRUE WHERE educationID = $1 RETURNING *', [id]);
        res.json('education with id: ' + id + ' was deleted');
    }
}

module.exports = new educationController();