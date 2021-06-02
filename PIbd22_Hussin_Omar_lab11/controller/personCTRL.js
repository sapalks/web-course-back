const db = require('../db')
const cache = require('../cache.js')

class personController {

    async getAllpersons(req, res) {
        const cached = await cache.get(`persons`)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM person WHERE isDeleted = FALSE');
        cache.save('persons', result.rows)
        res.json(result.rows);
    }

    async getpersonInrooms(req, res) {
        const cached = await cache.get(`personInroom`)
        if (cached) {
            return res.json(cached)
        }
        const id = req.params.roomID;
        const result = await db.query('SELECT * FROM person WHERE isDeleted = FALSE AND roomID = $1', [id]);
        cache.save(`personInroom`, result.rows)
        res.json(result.rows);
    }

    async getperson(req, res) { 
        const cached = await cache.get(`person ${id}`)
        if (cached) {
            return res.json(cached)
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM person WHERE isDeleted = FALSE AND personID = $1', [id]);
        cache.save(`person ${id}`, result.rows[0])
        res.json(result.rows[0]);
    }

    async createperson(req, res) {
        const { login, mail, numbers, roomID } = req.body;
        const result = await db.query('INSERT INTO person(login, mail, numbers, roomID) VALUES ($1, $2, $3, $4) RETURNING *', [login, mail, numbers, roomID]);
        cache.delete(`personInroom`)
        cache.delete(`persons`)
        res.json(result.rows[0]);  
    }

    async updateperson(req, res) {
        const {personID, login, mail, numbers, roomID} = req.body;
        const result = await db.query('UPDATE person SET login = $1, mail = $2, numbers = $3, roomID = $4 WHERE personID = $5 AND isDeleted = FALSE RETURNING *',
        [login, mail, numbers, roomID, personID]);
        cache.delete(`person ${id}`)
        cache.delete(`personInroom`)
        cache.delete(`persons`)
        res.json(result.rows[0]);
    }

    async deleteperson(req, res) {
        const id = req.params.id;
        await db.query('UPDATE person SET isDeleted = TRUE WHERE personID = $1 RETURNING *', [id]);
        cache.delete(`person ${id}`)
        cache.delete(`personInroom`)
        cache.delete(`persons`)
        res.json('person with id: ' + id + ' was deleted');
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`Ключ кеша сохранен ${key}`)
        }
        res.json("Нет кеша")
    }
}

module.exports = new personController();
