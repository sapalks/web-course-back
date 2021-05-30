const db = require('../db')

class subjectController {

    async getAllsubjects(req, res) {
        const result = await db.query('SELECT * FROM subject WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getsubject(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM subject WHERE isDeleted = FALSE AND subjectID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createsubject(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO subject(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updatesubject(req, res) {
        const {subjectID, name} = req.body;
        const result = await db.query('UPDATE subject SET name = $1 WHERE subjectID = $2 AND isDeleted = FALSE RETURNING *', [name, subjectID]);
        res.json(result.rows[0]);
    }

    async deletesubject(req, res) {
        const id = req.params.id;
        await db.query('UPDATE subject SET isDeleted = TRUE WHERE subjectID = $1 RETURNING *', [id]);
        res.json('subject with id: ' + id + ' was deleted');
    }
}

module.exports = new subjectController();