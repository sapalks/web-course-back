const db = require('../db')

class BookController{
    async createBook(req,res){
        const {name,writerID} = req.body
        const newBook = await db.query('INSERT INTO book(name,writerID) values ($1, $2) RETURNING *',[name,writerID])
        res.json(newBook.rows[0])
    }
    async updateBook(req,res){
        const {id,name,writerID} = req.body
        const updateBook = await db.query('UPDATE book SET (name,writerID) = ($1,$2) WHERE bookId = $3 RETURNING *',[name,writerID,id])
        res.json(updateBook.rows[0])
    }
    async getBook(req,res){
        const id = req.params.id
        const book = await db.query('SELECT * FROM book WHERE bookId = $1',[id])
        res.json(book.rows[0])
    }
    async getBooks(req,res){
        const books = await db.query('SELECT * FROM book')
        res.json(books.rows)
    }
    async getAutorBooks(req,res){
        const id = req.params.id
        const books = await db.query('SELECT * FROM book WHERE writerID = $1',[id])
        res.json(books.rows)
    }
    async deleteBook(req,res){
        const id = req.params.id
        const book = await db.query('UPDATE book SET isDeleted = TRUE WHERE bookId = $1 RETURNING *',[id])
        res.json(book.rows[0])
    }
}

module.exports = new BookController()