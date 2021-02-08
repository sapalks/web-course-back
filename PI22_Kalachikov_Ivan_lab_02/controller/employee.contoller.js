var db = require("../db")

class EmployeeController {
    async createEmployee(req, res) {
        var {first_name, last_name, payment, department_id} = req.body;
        db.query("INSERT INTO employee(first_name, last_name, payment, department_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [first_name, last_name, payment, department_id], (err, result) => {
            if (err || result.rows.length === 0) {
                res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async getEmployees(req, res) {
        db.query("SELECT * FROM employee", (err, result) => {
            if (err || result.rows.length === 0) {
                res.sendStatus(204)
            }
            res.json(result.rows);
        })
    }

    async getEmployeesOnDepartment(req, res) {
        var department_id = req.params.dep_id;
        db.query("SELECT * FROM employee WHERE department_id = $1", [department_id], (err, result) => {
            if (err || result.rows.length === 0) {
                res.sendStatus(204)
            }
            res.json(result.rows);
        })
    }

    async getEmployee(req, res) {
        var id = req.params.id;
        db.query("SELECT * FROM employee WHERE id = $1", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async updateEmployee(req, res) {
        var {id, first_name, last_name, payment, department_id} = req.body;
        db.query("UPDATE employee SET first_name = $1, last_name = $2, payment = $3, department_id = $4 WHERE id = $5 RETURNING *",
        [first_name, last_name, payment, department_id, id], (err, result) => {
            if (err || result.rows.length === 0) {
                res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async deleteEmployee(req, res) {
        var id = req.params.id;
        db.query("DELETE FROM employee WHERE id = $1", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }
}

module.exports = new EmployeeController();