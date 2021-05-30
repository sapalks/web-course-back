const db = require("../configurations/db")

class classController {
    async createclass(req, res) {
        var name = req.body.name;
        db.query("INSERT INTO class(name) VALUES ($1) RETURNING id, name", [name], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.status(400).send("Timeout. Please try again");
            }
            res.json(result.rows[0]);
        })
    }

    async getclass(req, res) {
        const id = req.query.id;
        const classl = await db.query(`SELECT id, name FROM class where id = $1`, [id])
        classl.rows.length > 0 ? res.json(classl.rows[0]) : res.status(400).json("class doesn't exist");
    }

    async getclasses(req, res) {
        db.query("SELECT id, name FROM class WHERE is_deleted = false", (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows);
        })
    }

    async updateclass(req, res) {
        var {id, name} = req.body;
        db.query("UPDATE class SET name = $1 WHERE id = $2 AND is_deleted = false RETURNING id, name", [name, id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async deleteclass(req, res) {
        const id = req.query.id;
        const classl = await db.query(`UPDATE class set is_deleted = true where id = $1 RETURNING id, name`, [id])
        res.status(200).send("class was sucessfully deleted");
        classl.rows.length > 0 ? res.json(classl.rows[0]) : res.status(400);
    }
}

module.exports = new classController()