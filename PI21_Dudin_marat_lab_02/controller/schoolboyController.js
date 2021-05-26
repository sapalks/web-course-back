const db = require('../db')

class schoolboyController {

    async getSchoolboys(req, res) {
        const result = await db.query('SELECT * FROM schoolboy WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getSchoolboyInDirection(req, res) {
        const id = req.params.directionID;
        const result = await db.query('SELECT * FROM schoolboy WHERE isDeleted = FALSE AND directionID = $1', [id]);
        res.json(result.rows);
    }

    async getSchoolboy(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM schoolboy WHERE isDeleted = FALSE AND schoolboyID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createSchoolboy(req, res) {
        const { fullname, classNumber, directionID } = req.body;
        const result = await db.query('INSERT INTO schoolboy(fullname, classNumber, directionID) VALUES ($1, $2, $3) RETURNING *', [fullname, classNumber, directionID]);
        res.json(result.rows[0]);  
    }

    async updateSchoolboy(req, res) {
        const {schoolboyID, fullname, classNumber, directionID} = req.body;
        const result = await db.query('UPDATE schoolboy SET fullname = $1, classNumber = $2, directionID = $3 WHERE schoolboyID = $4 AND isDeleted = FALSE RETURNING *',
        [fullname, classNumber, directionID, schoolboyID]);
        res.json(result.rows[0]);
    }

    async deleteSchoolboy(req, res) {
        const id = req.params.id;
        await db.query('UPDATE schoolboy SET isDeleted = TRUE WHERE schoolboyID = $1 RETURNING *', [id]);
        res.json(`schoolboy with id: ${id} was deleted`);
    }
}

module.exports = new schoolboyController();