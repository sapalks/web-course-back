var db = require("../db")

class DepartmentController {
    async createDepartment(req, res) {
        var name = req.body.name;
        db.query("INSERT INTO department(name) VALUES ($1) RETURNING *", [name], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async getDepartments(req, res) {
        db.query("SELECT * FROM department WHERE is_deleted = false", (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows);
        })
    }

    async getDepartment(req, res) {
        var id = req.params.id;
        db.query("SELECT * FROM department WHERE id = $1 AND is_deleted = false", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async updateDepartment(req, res) {
        var {id, name} = req.body;
        db.query("UPDATE department SET name = $1 WHERE id = $2 AND is_deleted = false RETURNING *", [name, id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.json(result.rows[0]);
        })
    }

    async deleteDepartment(req, res) {
        var id = req.params.id;
        db.query("UPDATE department SET is_deleted = true WHERE id = $1 RETURNING *", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }
            res.sendStatus(200);
        })
    }
}

module.exports = new DepartmentController();