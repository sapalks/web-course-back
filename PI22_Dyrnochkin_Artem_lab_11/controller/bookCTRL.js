const db = require('../db')
const cache = require('../cache.js')

class bookController {

    async geAllBooks(req, res) {
        const cachee = await cache.get('books')
        if (cachee) {
            return res.json(cachee)
        }
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE');
        cache.save('books', result.rows)
        res.json(result.rows);
    }

    async getBookInAuthors(req, res) {
        const cachee = await cache.get('BookInAuthors')
        if (cachee) {
            return res.json(cachee)
        }
        const id = req.params.AuthorID;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND authorID = $1', [id]);
        cache.save('bookInAuthor', result.rows)
        res.json(result.rows);
    }

    async getBook(req, res) {
        const cachee = await cache.get('book ${id}')
        if (cachee) {
            return res.json(cachee)
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM book WHERE isDeleted = FALSE AND bookID = $1', [id]);
        cache.save('book ${id}', result.rows[0])
        res.json(result.rows[0]);
    }

    async createBook(req, res) {
        const { name_book, genre, page_count, authorID } = req.body;
        const result = await db.query('INSERT INTO book(name_book, genre, page_count, authorID) VALUES ($1, $2, $3, $4) RETURNING *', [name_book, genre, page_count, authorID]);
        cache.delete('bookInAuthor')
        cache.delete('books')
        res.json(result.rows[0]);  
    }

    async updateBook(req, res) {
        const {bookID, name_book, genre, page_count, authorID} = req.body;
        const result = await db.query('UPDATE book SET name_book = $1, genre = $2, page_count = $3 , authorID = $4, WHERE bookID = $5 AND isDeleted = FALSE RETURNING *',
        [name_book, genre, page_count, authorID, bookID]);
        cache.delete('book ${id}')
        cache.delete('bookInAuthor')
        cache.delete('books')
        res.json(result.rows[0]);
    }

    async deleteBook(req, res) {
        const id = req.params.id;
        await db.query('UPDATE book SET isDeleted = TRUE WHERE bookID = $1 RETURNING *', [id]);
        cache.delete('book ${id}')
        cache.delete('bookInAuthor')
        cache.delete('books')
        res.json('book with id: ' + id + ' was deleted');
    }

    async isCachee(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json('Key cache saved book')
        }
        res.json("No cache")
    }
}

module.exports = new bookController();