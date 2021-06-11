const db = require('../db')
const cache = require('../cache');

class TimofeyController{

    async createTimofey(req, res) {
        const{Surname, age} = req.body 
        const newTimofey = await db.query('INSERT INTO Timofey (Surname, age) values ($1,$2) RETURNING *', [Surname, age])
        cache.clear('timofeys');
        res.json(newTimofey.rows[0])
    }

    async getAllTimofeys(req,res) {
        const timCache = await cache.get('timofeys');
       // console.log(timCache);
        if (timCache) {
            return res.json(timCache)
        }
        const Timofeys = await db.query('SELECT * From Timofey')
        cache.add('timofeys', Timofeys.rows)
        res.json(Timofeys.rows)

    }
    async getTimofey(req, res) {
        const id = req.params.id;
        const timCache = await cache.get(`timofey ${id}`)
        if (timCache) {
            return res.json(timCache)
        }
        const Timofey = await db.query('SELECT * From Timofey WHERE id = $1', [id])
        cache.add(`timofey ${id}`, Timofey.rows[0])
        res.json(Timofey.rows[0])

    }

    async updateTimofey(req, res) {
        const{id, Surname, age} = req.body 
        const Timofey = await db.query('UPDATE Timofey set Surname = $1 , age = $2 where id = $3 RETURNING *', [Surname, age, id])
        cache.clear(`timofey ${id}`);
        cache.clear('timofeys');
        res.json(Timofey.rows[0])

    }

    async deleteTimofey(req, res) {
        const id = req.params.id;
        const Timofey = await db.query('DELETE From Timofey WHERE id = $1', [id])
        cache.clear(`timofey ${id}`);
        cache.clear('timofeys');
        res.json('Delete Timofey with id ' + id);

    }
    
    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`Использовался кеш с ключом ${key}`)
        }
        else {
            res.json("Не использовался кеш")
        }
    }
}

module.exports = new TimofeyController()