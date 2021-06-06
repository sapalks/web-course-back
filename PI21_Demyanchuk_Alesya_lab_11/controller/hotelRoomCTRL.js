const db = require('../databaseconnect')
const cache = require('../cache.js')

class hotelRoomController {
    async createhotelRoom(req, res) {
        const {id, countrooms, typeroom, price, reservation, hotelid, clientid} = req.body;
        const result = await db.query('INSERT INTO hotelRoom(id, countrooms, typeroom, price, reservation, hotelid, clientid) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *', [id, countrooms, typeroom, price, reservation, hotelid, clientid]);
        cache.delete(`hotelRooms`)
        res.json(result.rows[0]);
    }

    async geAllhotelRooms(req, res) {
        const cached = await cache.get(`hotelRooms`)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM hotelRoom WHERE delete = false');
        cache.save(`hotelRooms`, result.rows)
        res.json(result.rows);
    }

    async gethotelRoom(req, res) {
        const id = req.params.id;
        const cached = await cache.get(`hotelRoom ${id}`)
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM hotelRoom  WHERE delete = false AND id = $1', [id]);
        cache.save(`hotelRoom ${id}`, result.rows[0])
        res.json(result.rows[0]);
    }

    async updatehotelRoom(req, res) {
        const {id, countrooms, typeroom, price, reservation, hotelid, clientid} = req.body;
        const result = await db.query('UPDATE hotelRoom SET countrooms = $2, typeroom = $3, price = $4, reservation = $5, hotelid = $6, clientid = $7 WHERE id = $1 AND delete = false RETURNING *', [id, countrooms, typeroom, price, reservation, hotelid, clientid]);
        cache.delete(`hotelRoom ${id}`)
        cache.delete(`hotelRooms`)
        res.json(result.rows[0]);
    }

    async deletehotelRoom(req, res) {
        const id = req.params.id;
        await db.query('UPDATE hotelRoom SET delete = true WHERE id = $1 AND delete = false RETURNING *', [id]);
        cache.delete(`hotelRoom ${id}`)
        cache.delete(`hotelRooms`)
        res.json('hotelRoom with id: ' + id + ' was deleted');
    }
    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`cache key saved ${key}`)
        }
        res.json("No cache")
     }
}

module.exports = new hotelRoomController();