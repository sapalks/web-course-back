const db = require("../configurations/db")

class BookController {
    async createBook(req, res) {
        var {title, author, publication_date, copies_number, topic_id} = req.body;
        db.query("INSERT INTO book(title, author, publication_date, copies_number, topic_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, author, publication_date, copies_number, topic_id",
        [title, author, publication_date, copies_number, topic_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.status(400).send("Timeout. Please try again");
            }
            res.json(result.rows[0]);
        })
    }

    async getBooks(req, res) {
        if (Object.keys(req.query).length === 0) {
            db.query("SELECT id, title, author, publication_date, copies_number, topic_id FROM book WHERE is_deleted = FALSE", (err, result) => {
                if (err || result.rows.length === 0) {
                    return res.sendStatus(204);
                }
                res.json(result.rows);
            })
        }
        else {
            var topic_id = req.query.top_id;
            db.query("SELECT id, title, author, publication_date, copies_number, topic_id FROM book WHERE topic_id = $1 AND is_deleted = FALSE", [topic_id], (err, result) => {
                if (err || result.rows.length === 0) {
                    return res.sendStatus(204);
                }
                res.json(result.rows);
            })
        }
    }

    async getBook(req, res) {
        var id = req.query.id;
        db.query("SELECT id, title, author, publication_date, copies_number, topic_id FROM book WHERE id = $1 AND is_deleted = FALSE", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async updateBook(req, res) {
        var {id, title, author, publication_date, copies_number, topic_id} = req.body;
        db.query("UPDATE book SET title = $2, author = $3, publication_date = $4, copies_number = $5, topic_id = $6 WHERE id = $1 AND is_deleted = FALSE RETURNING id, title, author, publication_date, copies_number, topic_id",
        [id, title, author, publication_date, copies_number, topic_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async deleteBook(req, res) {
        var id = req.query.id;
        db.query("UPDATE book SET is_deleted = TRUE WHERE id = $1 RETURNING title, author, publication_date, copies_number, topic_id", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.status(200).send("Book was sucessfully deleted");
        })
    }
}

module.exports = new BookController()