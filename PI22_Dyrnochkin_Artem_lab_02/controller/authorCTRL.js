const db = require('../db')

class authorController {

    async geAllAuthors(req, res) {
        const result = await db.query('SELECT authorID,name FROM author WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getAuthor(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT authorID,name FROM author WHERE isDeleted = FALSE AND authorID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createAuthor(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO author(name) VALUES ($1) RETURNING authorID,name', [name]);
        res.json(result.rows[0]);
    }

    async updateAuthor(req, res) {
        const {authorID, name} = req.body;
        const result = await db.query('UPDATE author SET name = $1 WHERE authorID = $2 AND isDeleted = FALSE RETURNING authorID,name', [name,authorID]);
        res.json(result.rows[0]);
    }

    async deleteAuthor(req, res) {
        const id = req.params.id;
        await db.query('UPDATE author SET isDeleted = TRUE WHERE authorID = $1 RETURNING authorID,name', [id]);
        res.json('author with id: ' + id + ' was deleted');
    }
}

module.exports = new authorController();
