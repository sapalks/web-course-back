const db = require('../db')
const cache = require('../cache');

class DesireController{

    async createDesire(req, res) {
        const{Name_desire, Degree_of_desire, Timofey_id} = req.body 
        const newDesire = await db.query('INSERT INTO Desire(Name_desire, Degree_of_desire, Timofey_id) values ($1,$2,$3) RETURNING *', [Name_desire, Degree_of_desire, Timofey_id])
        cache.clear('desires');
        res.json(newDesire.rows[0])
    }

    async getAllDesires(req,res) {
        const desCache = await cache.get('desires')
        if (desCache) {
            return res.json(desCache)
        }
        const Desires = await db.query('SELECT * From Desire')
        cache.add('desires', Desires.rows)
        res.json(Desires.rows)

    }
    
    async getDesire(req, res) {
        const id = req.params.id;
        const desCache = await cache.get(`desire ${id}`)
        if (desCache) {
            return res.json(desCache)
        }
        const Desire = await db.query('SELECT * From Desire WHERE id = $1', [id])
        cache.add(`desire ${id}`, Desire.rows[0])
        res.json(Desire.rows[0])

    }

    async updateDesire(req, res) {
        const{id, Name_desire, Degree_of_desire, Timofey_id} = req.body 
        const Desire = await db.query('UPDATE Desire set Name_desire = $1, Degree_of_desire = $2, Timofey_id = $3 where id = $4 RETURNING *', [Name_desire, Degree_of_desire, Timofey_id, id])
        cache.clear(`desire ${id}`);
        cache.clear('desires');
        res.json(Desire.rows[0])

    }

    async deleteDesire(req, res) {
        const id = req.params.id;
        const Desire = await db.query('DELETE From Desire WHERE id = $1', [id])
        cache.clear(`desire ${id}`);
        cache.clear('desires');
        res.json('Delete Desire with id ' + id);

    }
    
}

module.exports = new DesireController()