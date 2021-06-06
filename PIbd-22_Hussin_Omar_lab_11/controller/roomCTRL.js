const db = require('../db')
const cache = require('../cache.js')

class roomController {

    async geAllrooms(req, res) {
        const cached = await cache.get(`rooms`)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM room WHERE isDeleted = FALSE');
        cache.save(`rooms`, result.rows)
        res.json(result.rows);
    }

    async getroom(req, res) {
        const cached = await cache.get(`room ${id}`)
        if (cached) {
            return res.json(cached)
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM room WHERE isDeleted = FALSE AND roomID = $1', [id]);
        cache.save(`room ${id}`, result.rows[0])
        res.json(result.rows[0]);
    }

    async createroom(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO room(name) VALUES ($1) RETURNING *', [name]);
        cache.delete(`rooms`)
        res.json(result.rows[0]);
    }

    async updateroom(req, res) {
        const {roomID, name} = req.body;
        const result = await db.query('UPDATE room SET name = $1 WHERE roomID = $2 AND isDeleted = FALSE RETURNING *', [name, roomID]);
        cache.delete(`room ${id}`)
        cache.delete(`rooms`)
        res.json(result.rows[0]);
    }

    async deleteroom(req, res) {
        const id = req.params.id;
        await db.query('UPDATE room SET isDeleted = TRUE WHERE roomID = $1 RETURNING *', [id]);
        cache.delete(`room ${id}`)
        cache.delete(`rooms`)
        res.json('room with id: ' + id + ' was deleted');
    }
    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`Ключ кеша сохранен ${key}`)
        }
        res.json("Нет кеша")
     }
}

module.exports = new roomController();
