const db = require('../db')
class CookController{

    async createCook(req, res) {
        const{surname, age} = req.body 
        const newCook = await db.query('INSERT INTO Cook(Surname, age) values ($1,$2) RETURNING Surname, age', [surname, age])

        res.json(newCook.rows[0])
    }

    async getAllCooks(req,res) {
        const Cooks = await db.query('SELECT Surname, age From Cook')
        res.json(Cooks.rows)
    }
    async getCook(req, res) {
        const id = req.params.id;
        const Cook = await db.query('SELECT Surname, age From Cook WHERE id = $1', [id])
        res.json(Cook.rows[0])
    }

    async updateCook(req, res) {
        const{id, surname, age} = req.body 
        const Cook = await db.query('UPDATE Cook set Surname = $1 , age = $2 where id = $3 RETURNING Surname, age', [surname, age, id])
        res.json(Cook.rows[0])
    }

    async deleteCook(req, res) {
        const id = req.params.id;
        const Cook = await db.query('DELETE From Cook WHERE id = $1', [id])
        res.json('Delete Cook with id ' + id);
    }
    
}

module.exports = new CookController()