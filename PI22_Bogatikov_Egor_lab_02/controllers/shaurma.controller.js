const db = require("../db")

class ShaurmaController {
    async createShaurma(req, res) {
        var size = req.body.size;
        db.query("INSERT INTO shaurma(size) VALUES ($1) RETURNING id, size", [size], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.status(400).send("Timeout. Please try again");
            }
            res.json(result.rows[0]);
        })
    }

    async deleteShaurma(req, res) {
        var id = req.query.id;
        db.query("UPDATE shaurma SET is_deleted = true WHERE id = $1 RETURNING id, size", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.status(200).send("Shaurma was sucessfully deleted");
        })
    }

    async getShaurma(req, res) {
        var id = req.query.id;
        db.query("SELECT id, size FROM shaurma WHERE id = $1 AND is_deleted = false", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async getShaurmas(req, res) {
        db.query("SELECT id, size FROM shaurma WHERE is_deleted = false", (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows);
        })
    }

    async updateShaurma(req, res) {
        var {id, size} = req.body;
        db.query("UPDATE shaurma SET size = $1 WHERE id = $2 AND is_deleted = false RETURNING id, size", [size, id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    
}

module.exports = new ShaurmaController()