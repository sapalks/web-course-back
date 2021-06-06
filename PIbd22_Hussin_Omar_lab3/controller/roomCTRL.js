const db = require('../db')

class roomController {

    async getAllrooms(req, res) {
        const result = await db.query('SELECT * FROM room WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getroom(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM room WHERE isDeleted = FALSE AND roomID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createroom(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO room(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updateroom(req, res) {
        const {roomID, name} = req.body;
        const result = await db.query('UPDATE room SET name = $1 WHERE roomID = $2 AND isDeleted = FALSE RETURNING *', [name, roomID]);
        res.json(result.rows[0]);
    }

    async deleteroom(req, res) {
        const id = req.params.id;
        await db.query('UPDATE room SET isDeleted = TRUE WHERE roomID = $1 RETURNING *', [id]);
        res.json('room with id: ' + id + ' was deleted');
    }
}

module.exports = new roomController();