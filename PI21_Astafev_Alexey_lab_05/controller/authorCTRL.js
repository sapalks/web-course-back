const db = require('../db')

class authorController {

    async getAllAuthors(req, res) {
        const result = await db.query('SELECT * FROM author WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getAuthor(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM author WHERE isDeleted = FALSE AND authorID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createAuthor(req, res) {
        const {firstname, lastname} = req.body;
        const result = await db.query('INSERT INTO author(firstname, lastname) VALUES ($1, $2) RETURNING *', [firstname, lastname]);
        res.json(result.rows[0]);
    }

    async updateAuthor(req, res) {
        const {firstname, lastname, authorID} = req.body;
        const result = await db.query('UPDATE author SET firstname = $1, lastname = $2 WHERE authorID = $3 AND isDeleted = FALSE RETURNING *', [firstname, lastname, authorID]);
        res.json(result.rows[0]);
    }

    async deleteAuthor(req, res) {
        const id = req.params.id;
        await db.query('UPDATE author SET isDeleted = TRUE WHERE authorID = $1 RETURNING *', [id]);
        res.json('author with id: ' + id + ' was deleted');
    }
}

module.exports = new authorController();