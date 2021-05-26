const db = require('../db')

class employeeController {

    async geAllemployees(req, res) {
        const result = await db.query('SELECT * FROM employee WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getemployeeIncompanys(req, res) {
        const id = req.params.compID;
        const result = await db.query('SELECT * FROM employee WHERE isDeleted = FALSE AND compID = $1', [id]);
        res.json(result.rows);
    }

    async getemployee(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM employee WHERE isDeleted = FALSE AND empID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createemployee(req, res) {
        const { firstname, lastname, email, compID } = req.body;
        const result = await db.query('INSERT INTO employee(firstname, lastname, email, compID) VALUES ($1, $2, $3, $4) RETURNING *', [firstname, lastname, email, compID]);
        res.json(result.rows[0]);  
    }

    async updateemployee(req, res) {
        const {empID, firstname, lastname, email, compID} = req.body;
        const result = await db.query('UPDATE employee SET firstname = $1, lastname = $2, email = $3, compID = $4 WHERE empID = $5 AND isDeleted = FALSE RETURNING *',
        [firstname, lastname, email, compID, empID]);
        res.json(result.rows[0]);
    }

    async deleteemployee(req, res) {
        const id = req.params.id;
        await db.query('UPDATE employee SET isDeleted = TRUE WHERE empID = $1 RETURNING *', [id]);
        res.json('employee with id: ' + id + ' was deleted');
    }
}

module.exports = new employeeController();