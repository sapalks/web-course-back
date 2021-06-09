const db = require('../db')
const cashe = require("../cashe.js")

class authorController {
    async getAllAuthors(req, res) {
        const cashe_ = await cashe.get('authors');
        if (cashe_) {
            return res.json(cashe_);
        }
        const result = await db.query('SELECT * FROM author WHERE isDeleted = FALSE');
        cashe.save('authors', result.rows);
        res.json(result.rows);
    }

    async getAuthor(req, res) {
        const cashe_ = await cashe.get('author ${id}');
        if (cashe_) {
            return res.json(cashe_);
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM author WHERE isDeleted = FALSE AND authorID = $1', [id]);
        cashe.save('author ${id}', result.rows[0]);
        res.json(result.rows[0]);
    }

    async createAuthor(req, res) {
        const {firstname, lastname} = req.body;
        const result = await db.query('INSERT INTO author(firstname, lastname) VALUES ($1, $2) RETURNING *', [firstname, lastname]);
        cashe.delete('authors');
        res.json(result.rows[0]);
    }

    async updateAuthor(req, res) {
        const {firstname, lastname, authorID} = req.body;
        const result = await db.query('UPDATE author SET firstname = $1, lastname = $2 WHERE authorID = $3 AND isDeleted = FALSE RETURNING *', [firstname, lastname, authorID]);
        cashe.delete('author ${id}');
        cashe.delete('authors');
        res.json(result.rows[0]);
    }

    async deleteAuthor(req, res) {
        const id = req.params.id;
        await db.query('UPDATE author SET isDeleted = TRUE WHERE authorID = $1 RETURNING *', [id]);
        cashe.delete('author ${id}');
        cashe.delete('authors');
        res.json('author with id: ' + id + ' was deleted');
    }
    
    async isCashe(req, res) {
        const key = await cashe.getLastKey();
        if (key) {
            return res.json('Key cashe saved author');
        }
        res.json("No cashe");
    }
}

module.exports = new authorController();