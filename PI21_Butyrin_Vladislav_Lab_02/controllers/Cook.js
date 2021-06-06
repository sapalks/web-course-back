const db = require('../db')
class CookController{

    async createCook(req, res) {
        const{Surname, Age} = req.body 
        const newCook = await db.query('INSERT INTO Cook(Surname, Age) values ($1,$2) RETURNING *', [Surname, Age])

        res.json(newCook.rows[0])
    }

    async getAllCooks(req,res) {
        const Cooks = await db.query('SELECT * From Cook')
        res.json(Cooks.rows)
    }
    async getCook(req, res) {
        const id = req.params.id;
        const Cook = await db.query('SELECT * From Cook WHERE id = $1', [id])
        res.json(Cook.rows[0])
    }

    async updateCook(req, res) {
        const{id, Surname, Age} = req.body 
        const Cook = await db.query('UPDATE Cook set Surname = $1 , Age = $2 where id = $3 RETURNING *', [Surname, Age, id])
        res.json(Cook.rows[0])
    }

    async deleteCook(req, res) {
        const id = req.params.id;
        const Cook = await db.query('DELETE From Cook WHERE id = $1', [id])
        res.json('Delete Cook with id ' + id);
    }
    
}

module.exports = new CookController()