const db = require('../db')

class companyController {

    async geAllcompanys(req, res) {
        const result = await db.query('SELECT * FROM company WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getcompanys(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM company WHERE isDeleted = FALSE AND compID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createcompanys(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO company(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updatecompanys(req, res) {
        const {compID, name} = req.body;
        const result = await db.query('UPDATE company SET name = $1 WHERE compID = $2 AND isDeleted = FALSE RETURNING *', [name, compID]);
        res.json(result.rows[0]);
    }

    async deletecompanys(req, res) {
        const id = req.params.id;
        await db.query('UPDATE company SET isDeleted = TRUE WHERE compID = $1 RETURNING *', [id]);
        res.json('company with id: ' + id + ' was deleted');
    }
}

module.exports = new companyController();