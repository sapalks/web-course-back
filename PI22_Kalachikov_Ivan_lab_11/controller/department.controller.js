const db = require("../db")
const cache = require('../util/caching')
const departmentsKey = 'departments'
const departmentWithIdKey = 'department '

class DepartmentController {
    async createDepartment(req, res) {
        const name = req.body.name;

        await db.query("INSERT INTO department(name) VALUES ($1) RETURNING *", [name], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }

            cache.delete(departmentsKey)
            res.json(result.rows[0]);
        })
    }

    async getDepartments(req, res) {
        const cached = await cache.get(departmentsKey)
        if (cached) {
            return res.json(cached)
        }

        await db.query("SELECT * FROM department WHERE is_deleted = false", (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }

            cache.save(departmentsKey, result.rows)
            res.json(result.rows);
        })
    }


    async getDepartment(req, res) {
        const id = req.params.id;
        const cacheKey = departmentWithIdKey + id

        const cached = await cache.get(cacheKey)
        if (cached) {
            return res.json(cached)
        }

        await db.query("SELECT * FROM department WHERE id = $1 AND is_deleted = false", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }

            cache.save(cacheKey, result.rows[0])
            res.json(result.rows[0]);
        })
    }

    async updateDepartment(req, res) {
        const {id, name} = req.body;

        db.query("UPDATE department SET name = $1 WHERE id = $2 AND is_deleted = false RETURNING *", [name, id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }

            cache.delete(departmentWithIdKey + id)
            cache.delete(departmentsKey)
            res.json(result.rows[0]);
        })
    }

    async deleteDepartment(req, res) {
        const id = req.params.id;
        db.query("UPDATE department SET is_deleted = true WHERE id = $1 RETURNING *", [id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204)
            }

            cache.delete(departmentWithIdKey + id)
            cache.delete(departmentsKey)
            res.sendStatus(200);
        })
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(key)
        }
        res.sendStatus(204)
    }
}

module.exports = new DepartmentController();