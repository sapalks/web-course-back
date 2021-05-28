const db = require('../db')

class personController {

    async geAllpersons(req, res) {
        const result = await db.query('SELECT * FROM person WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getpersonInroomes(req, res) {
        const id = req.params.roomsID;
        const result = await db.query('SELECT * FROM person WHERE isDeleted = FALSE AND roomsID = $1', [id]);
        res.json(result.rows);
    }

    async getperson(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM person WHERE isDeleted = FALSE AND personID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createperson(req, res) {
        const { firstname, lastname, currentGroup, roomsID } = req.body;
        const result = await db.query('INSERT INTO person(firstname, lastname, currentGroup, roomsID) VALUES ($1, $2, $3, $4) RETURNING *', [firstname, lastname, currentGroup, roomsID]);
        res.json(result.rows[0]);  
    }

    async updateperson(req, res) {
        const {personID, firstname, lastname, currentGroup, roomsID} = req.body;
        const result = await db.query('UPDATE person SET firstname = $1, lastname = $2, currentGroup = $3, roomsID = $4 WHERE personID = $5 AND isDeleted = FALSE RETURNING *',
        [firstname, lastname, currentGroup, roomsID, personID]);
        res.json(result.rows[0]);
    }

    async deleteperson(req, res) {
        const id = req.params.id;
        await db.query('UPDATE person SET isDeleted = TRUE WHERE personID = $1 RETURNING *', [id]);
        res.json('student with id: ' + id + ' was deleted');
    }
}

module.exports = new personController();