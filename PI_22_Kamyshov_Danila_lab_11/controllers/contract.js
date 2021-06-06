const db = require('../db')
const cache = require('../cache/caching')
const contractsKey = 'contracts'
const contractIdKey = 'contract '

class contractController {

    async geAllContracts(req, res) {
        const cached = await cache.get(contractsKey)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM contract WHERE isDeleted = FALSE');
        cache.save(contractsKey, result.rows)
        res.json(result.rows);
    }

    async getContract(req, res) {
        const id = req.params.id;
        const cacheKey = contractIdKey + id
        const cached = await cache.get(cacheKey)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM contract WHERE isDeleted = FALSE AND id = $1', [id]);
        cache.save(cacheKey, result.rows[0])
        res.json(result.rows[0]);
    }

    async createContract(req, res) {
        const {date_of_conclusion, employeeID} = req.body;
        const result = await db.query('INSERT INTO contract(Date_Of_Conclusion, EmployeeID) VALUES ($1, $2) RETURNING *', [date_of_conclusion, employeeID]);
        cache.delete(contractsKey)
        res.json(result.rows[0]);
    }

    async updateContract(req, res) {
        const {id, date_of_conclusion, employeeID} = req.body;
        const result = await db.query('UPDATE contract SET Date_Of_Conclusion = $1, EmployeeID = $2 WHERE id = $3 AND isDeleted = FALSE RETURNING *', [date_of_conclusion, employeeID, id]);
        cache.delete(contractIdKey + id)
        cache.delete(contractsKey)
        res.json(result.rows[0]);
    }

    async deleteContract(req, res) {
        const id = req.params.id;
        await db.query('UPDATE contract SET isDeleted = TRUE WHERE id = $1 RETURNING *', [id]);
        cache.delete(contractIdKey + id)
        cache.delete(contractsKey)
        res.json('contract with id: ' + id + ' was deleted');
    }
}

module.exports = new contractController();