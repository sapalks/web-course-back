const db = require('../db')

class bookController {

    async geAllBooks(req, res) {
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getBookInAuthors(req, res) {
        const id = req.params.AuthorID;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND authorID = $1', [id]);
        res.json(result.rows);
    }

    async getBook(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND bookID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createBook(req, res) {
        const { name_book, genre, authorID } = req.body;
        const result = await db.query('INSERT INTO book(name_book, genre, authorID) VALUES ($1, $2, $3) RETURNING *', [name_book, genre, authorID]);
        res.json(result.rows[0]);  
    }

    async updateBook(req, res) {
        const {bookID, name_book, genre, authorID} = req.body;
        const result = await db.query('UPDATE book SET name_book = $1, genre = $2, authorID = $3, WHERE bookID = $4 AND isDeleted = FALSE RETURNING *',
        [name_book, genre, authorID, bookID]);
        res.json(result.rows[0]);
    }

    async deleteBook(req, res) {
        const id = req.params.id;
        await db.query('UPDATE book SET isDeleted = TRUE WHERE bookID = $1 RETURNING *', [id]);
        res.json('book with id: ' + id + ' was deleted');
    }
}

module.exports = new bookController();