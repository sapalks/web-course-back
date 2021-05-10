const db = require('../db')

class roomsController {

    async geAllrooms(req, res) {
        const result = await db.query('SELECT * FROM rooms WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getrooms(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM rooms WHERE isDeleted = FALSE AND roomsID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createrooms(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO rooms(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updaterooms(req, res) {
        const {roomsID, name} = req.body;
        const result = await db.query('UPDATE rooms SET name = $1 WHERE roomsID = $2 AND isDeleted = FALSE RETURNING *', [name, roomsID]);
        res.json(result.rows[0]);
    }

    async deleterooms(req, res) {
        const id = req.params.id;
        await db.query('UPDATE rooms SET isDeleted = TRUE WHERE roomsID = $1 RETURNING *', [id]);
        res.json('rooms with id: ' + id + ' was deleted');
    }
}

module.exports = new roomsController();