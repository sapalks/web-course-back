const db = require('../db')

class employeeController {

    async geAllEmployees(req, res) {
        const result = await db.query('SELECT * FROM employee WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getEmployee(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM employee WHERE isDeleted = FALSE AND id = $1', [id]);
        res.json(result.rows[0]);
    }

    async createEmployee(req, res) {
        const {fio, date_of_birthday, post} = req.body;
        const result = await db.query('INSERT INTO employee(FIO, Date_Of_Birthday, Post) VALUES ($1, $2, $3) RETURNING *', [fio, date_of_birthday, post]);
        res.json(result.rows[0]);
    }

    async updateEmployee(req, res) {
        const {id, fio, date_of_birthday, post} = req.body;
        const result = await db.query('UPDATE employee SET FIO = $1, Date_Of_Birthday = $2, Post = $3 WHERE id = $4 AND isDeleted = FALSE RETURNING *', [fio, date_of_birthday, post, id]);
        res.json(result.rows[0]);
    }

    async deleteEmployee(req, res) {
        const id = req.params.id;
        await db.query('UPDATE employee SET isDeleted = TRUE WHERE id = $1 RETURNING *', [id]);
        res.json('employee with id: ' + id + ' was deleted');
    }
}

module.exports = new employeeController();