const db = require("../db")

class FillingController {
    async createFilling(req, res) {
        var {meat, lavash, sauce, spice, shaurma_id} = req.body;
        db.query("INSERT INTO filling(meat, lavash, sauce, spice, shaurma_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, meat, lavash, sauce, spice, shaurma_id",
        [meat, lavash, sauce, spice, shaurma_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.status(400).send("Timeout. Please try again");
            }
            res.json(result.rows[0]);
        })
    }

    async deleteFilling(req, res) {
        var id = req.query.id;
        db.query("UPDATE filling SET is_deleted = TRUE WHERE id = $1 RETURNING meat, lavash, sauce, spice, shaurma_id", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                res.sendStatus(204);
            }
            res.status(200).send("Filling was sucessfully deleted");
        })
    }
    
    async getFilling(req, res) {
        var id = req.query.id;
        db.query("SELECT id, meat, lavash, sauce, spice, shaurma_id FROM filling WHERE id = $1 AND is_deleted = FALSE", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async getFillings(req, res) {
        if (Object.keys(req.query).length === 0) {
            db.query("SELECT id, meat, lavash, sauce, spice, shaurma_id FROM filling WHERE is_deleted = FALSE", (err, result) => {
                if (err || result.rows.length === 0) {
                    return res.sendStatus(204);
                }
                res.json(result.rows);
            })
        }
        else {
            var shaurma_id = req.query.shaurma_id;
            db.query("SELECT id, meat, lavash, sauce, spice, shaurma_id FROM filling WHERE shaurma_id = $1 AND is_deleted = FALSE", [shaurma_id], (err, result) => {
                if (err || result.rows.length === 0) {
                    return res.sendStatus(204);
                }
                res.json(result.rows);
            })
        }
    }

    async updateFilling(req, res) {
        var {id, meat, lavash, sauce, spice, shaurma_id} = req.body;
        db.query("UPDATE filling SET meat = $2, lavash = $3, sauce = $4, spice = $5, shaurma_id = $6 WHERE id = $1 AND is_deleted = FALSE RETURNING id, meat, lavash, sauce, spice, shaurma_id",
        [id, meat, lavash, sauce, spice, shaurma_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    
}

module.exports = new FillingController()