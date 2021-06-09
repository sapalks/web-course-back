const db = require('../db')
const cashe = require('../cashe.js')

class bookController {

    async getAllBooks(req, res) {
        const cashe_ = await cashe.get('books')
        if (cashe_) {
            return res.json(cashe_)
        }
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE');
        cashe.save('books', result.rows)
        res.json(result.rows);
    }

    async getBookToAuthor(req, res) {
        const cashe_ = await cashe.get('BookToAuthors')
        if (cashe_) {
            return res.json(cashe_)
        }
        const id = req.params.authorID;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND authorID = $1', [id]);
        cashe.save('bookToAuthor', result.rows)
        res.json(result.rows);
    }

    async getBook(req, res) {
        const cashe_ = await cashe.get('book ${id}');
        if (cashe_) {
            return res.json(cashe_);
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND bookID = $1', [id]);
        cashe.save('book ${id}', result.rows[0]);
        res.json(result.rows[0]);
    }

    async createBook(req, res) {
        const { bookname, price, authorID } = req.body;
        const result = await db.query('INSERT INTO book(bookname, price, authorID) VALUES ($1, $2, $3) RETURNING *', [bookname, price, authorID]);
        cashe.delete('bookToAuthor')
        cashe.delete('books')
        res.json(result.rows[0]);  
    }

    async updateBook(req, res) {
        const { bookname, price, authorID, bookID } = req.body;
        const result = await db.query('UPDATE book SET bookname = $1, price = $2, authorID = $3 WHERE bookID = $4 AND isDeleted = FALSE RETURNING *',
        [bookname, price, authorID, bookID]);
        cashe.delete('book ${id}')
        cashe.delete('bookToAuthor')
        cashe.delete('books')
        res.json(result.rows[0]);
    }

    async deleteBook(req, res) {
        const id = req.params.id;
        await db.query('UPDATE book SET isDeleted = TRUE WHERE bookID = $1 RETURNING *', [id]);
        cashe.delete('book ${id}')
        cashe.delete('bookToAuthor')
        cashe.delete('books')
        res.json('book with id: ' + id + ' was deleted');
    }

    async isCashe(req, res) {
        const key = await cashe.getLastKey()
        if (key) {
            return res.json('Key cashe saved book')
        }
        res.json("No cashe")
    }
}

module.exports = new bookController();