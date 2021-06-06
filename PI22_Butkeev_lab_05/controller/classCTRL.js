const db = require('../db')

class classController {

    async geAllClasses(req, res) {
        const result = await db.query('SELECT * FROM class WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getClass(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM class WHERE isDeleted = FALSE AND classID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createClass(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO class(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updateClass(req, res) {
        const {classID, name} = req.body;
        const result = await db.query('UPDATE class SET name = $1 WHERE classID = $2 AND isDeleted = FALSE RETURNING *', [name, classID]);
        res.json(result.rows[0]);
    }

    async deleteClass(req, res) {
        const id = req.params.id;
        await db.query('UPDATE class SET isDeleted = TRUE WHERE classID = $1 RETURNING *', [id]);
        res.json('class with id: ' + id + ' was deleted');
    }
}

module.exports = new classController();