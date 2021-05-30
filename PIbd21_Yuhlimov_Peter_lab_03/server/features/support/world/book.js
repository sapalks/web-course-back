const { BaseWorld } = require('./base')
const db = require ("../../../db")

class BookWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    createBook(name,writerID) {
        this.post("/api/book", {name,writerID});
        this.#id = this.response.json.bookID;
    }

    getBooks() {
        this.get("/api/books");
    }

    getAutorBooks(id) {
        this.get("/api/books/" + id);
    }

    getBook(id) {
        this.get("/api/book/" + id);
    }

    updateBook(id,name,writerID) {
        this.put("/api/book", {id,name,writerID});
    }

    deleteBook(id) {
        this.delete("/api/book/" + id);
    }

    async clear() {
        await db.query("DELETE FROM book");
        db.query("ALTER SEQUENCE book_bookid_seq RESTART");
    }
}

module.exports = { BookWorld };