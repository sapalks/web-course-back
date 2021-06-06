const db = require('../db')
const cache = require("../cache.js")

class authorController {

    async getAllAuthors(req, res) {
        const cachee = await cache.get('authors')
        if (cachee) {
            return res.json(cachee)
        }
        const result = await db.query('SELECT * FROM author WHERE isDeleted = FALSE');
        cache.save('authors', result.rows)
        res.json(result.rows);
    }

    async getAuthor(req, res) {
        const cachee = await cache.get('author ${id}')
        if (cachee) {
            return res.json(cachee)
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM author WHERE isDeleted = FALSE AND authorID = $1', [id]);
        cache.save('author ${id}', result.rows[0])
        res.json(result.rows[0]);
    }

    async createAuthor(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO author(name) VALUES ($1) RETURNING *', [name]);
        cache.delete('authors')
        res.json(result.rows[0]);
    }

    async updateAuthor(req, res) {
        const {authorID, name} = req.body;
        const result = await db.query('UPDATE author SET name = $1 WHERE authorID = $2 AND isDeleted = FALSE RETURNING *', [name,authorID]);
        cache.delete('author ${id}')
        cache.delete('authors')
        res.json(result.rows[0]);
    }

    async deleteAuthor(req, res) {
        const id = req.params.id;
        await db.query('UPDATE author SET isDeleted = TRUE WHERE authorID = $1 RETURNING *', [id]);
        cache.delete('author ${id}')
        cache.delete('authors')
        res.json('author with id: ' + id + ' was deleted');
    }

    async isCachee(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json('Key cache saved author')
        }
        res.json("No cache")
    }
}

module.exports = new authorController();