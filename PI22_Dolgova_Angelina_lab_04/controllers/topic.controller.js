const db = require("../configurations/db")

class TopicController {
    async createTopic(req, res) {
        var name = req.body.name;
        db.query("INSERT INTO topic(name) VALUES ($1) RETURNING id, name", [name], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.status(400).send("Timeout. Please try again");
            }
            res.json(result.rows[0]);
        })
    }

    async getTopic(req, res) {
        var id = req.query.id;
        db.query("SELECT id, name FROM topic WHERE id = $1 AND is_deleted = false", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async getTopics(req, res) {
        db.query("SELECT id, name FROM topic WHERE is_deleted = false", (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows);
        })
    }

    async updateTopic(req, res) {
        var {id, name} = req.body;
        db.query("UPDATE topic SET name = $1 WHERE id = $2 AND is_deleted = false RETURNING id, name", [name, id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async deleteTopic(req, res) {
        var id = req.query.id;
        db.query("UPDATE topic SET is_deleted = true WHERE id = $1 RETURNING id, name", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.status(200).send("Topic was sucessfully deleted");
        })
    }
}

module.exports = new TopicController()