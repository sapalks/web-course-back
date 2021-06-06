const db = require('../db')
const cache = require('../cache/caching')
const employeesKey = 'employee'
const employeeIdKey = 'employee '

class employeeController {

    async geAllEmployees(req, res) {
        const cached = await cache.get(employeesKey)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM employee WHERE isDeleted = FALSE');
        cache.save(employeesKey, result.rows)
        res.json(result.rows);
    }

    async getEmployee(req, res) {
        const id = req.params.id;
        const cacheKey = employeeIdKey + id
        const cached = await cache.get(cacheKey)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM employee WHERE isDeleted = FALSE AND id = $1', [id]);
        cache.save(cacheKey, result.rows[0])
        res.json(result.rows[0]);
    }

    async createEmployee(req, res) {
        const {fio, date_of_birthday, post} = req.body;
        const result = await db.query('INSERT INTO employee(FIO, Date_Of_Birthday, Post) VALUES ($1, $2, $3) RETURNING *', [fio, date_of_birthday, post]);
        cache.delete(employeesKey)
        res.json(result.rows[0]);
    }

    async updateEmployee(req, res) {
        const {id, fio, date_of_birthday, post} = req.body;
        const result = await db.query('UPDATE employee SET FIO = $1, Date_Of_Birthday = $2, Post = $3 WHERE id = $4 AND isDeleted = FALSE RETURNING *', [fio, date_of_birthday, post, id]);
        cache.delete(employeeIdKey + id)
        cache.delete(employeesKey)
        res.json(result.rows[0]);
    }

    async deleteEmployee(req, res) {
        const id = req.params.id;
        await db.query('UPDATE employee SET isDeleted = TRUE WHERE id = $1 RETURNING *', [id]);
        cache.delete(employeeIdKey + id)
        cache.delete(employeesKey)
        res.json('employee with id: ' + id + ' was deleted');
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(key)
        }
        res.sendStatus(204)
    }
}

module.exports = new employeeController();