const db = require("../db")

class EmployeeController {
    async createEmployee(req, res) {
        const {first_name, last_name, payment, department_id} = req.body;
        await db.query("INSERT INTO employee(first_name, last_name, payment, department_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [first_name, last_name, payment, department_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async getEmployees(req, res) {
        await db.query("SELECT * FROM employee WHERE is_deleted = FALSE", (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows);
        })
    }

    async getEmployeesOnDepartment(req, res) {
        const department_id = req.params.dep_id;
        await db.query("SELECT * FROM employee WHERE department_id = $1 AND is_deleted = FALSE", [department_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows);
        })
    }

    async getEmployee(req, res) {
        const id = req.params.id;
        await db.query("SELECT * FROM employee WHERE id = $1 AND is_deleted = FALSE", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async updateEmployee(req, res) {
        const {id, first_name, last_name, payment, department_id} = req.body;
        await db.query("UPDATE employee SET first_name = $1, last_name = $2, payment = $3, department_id = $4 WHERE id = $5 AND is_deleted = FALSE RETURNING *",
        [first_name, last_name, payment, department_id, id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async deleteEmployee(req, res) {
        const id = req.params.id;
        await db.query("UPDATE employee SET is_deleted = TRUE WHERE id = $1 RETURNING *", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.sendStatus(200);
        })
    }
}

module.exports = new EmployeeController();