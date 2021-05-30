const db = require('../db')

class bookController {

    async getAllBooks(req, res) {
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getBookToAuthor(req, res) {
        const id = req.params.authorID;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND authorID = $1', [id]);
        res.json(result.rows);
    }

    async getBook(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND bookID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createBook(req, res) {
        const { bookname, price, authorID } = req.body;
        const result = await db.query('INSERT INTO book(bookname, price, authorID) VALUES ($1, $2, $3) RETURNING *', [bookname, price, authorID]);
        res.json(result.rows[0]);  
    }

    async updateBook(req, res) {
        const { bookname, price, authorID, bookID } = req.body;
        const result = await db.query('UPDATE book SET bookname = $1, price = $2, authorID = $3 WHERE bookID = $4 AND isDeleted = FALSE RETURNING *',
        [bookname, price, authorID, bookID]);
        res.json(result.rows[0]);
    }

    async deleteBook(req, res) {
        const id = req.params.id;
        await db.query('UPDATE book SET isDeleted = TRUE WHERE bookID = $1 RETURNING *', [id]);
        res.json('book with id: ' + id + ' was deleted');
    }
}

module.exports = new bookController();