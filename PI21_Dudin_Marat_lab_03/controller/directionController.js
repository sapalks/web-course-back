const db = require('../db')

class directionController {

    async getDirections(req, res) {
        const result = await db.query('SELECT * FROM direction WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getDirection(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM direction WHERE isDeleted = FALSE AND directionID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createDirection(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO direction(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updateDirection(req, res) {
        const {directionID, name} = req.body;
        const result = await db.query('UPDATE direction SET name = $1 WHERE directionID = $2 AND isDeleted = FALSE RETURNING *', [name, directionID]);
        res.json(result.rows[0]);
    }

    async deleteDirection(req, res) {
        const id = req.params.id;
        await db.query('UPDATE direction SET isDeleted = TRUE WHERE directionID = $1 RETURNING *', [id]);
        res.json(`direction with id: ${id} was deleted`);
    }
}

module.exports = new directionController();