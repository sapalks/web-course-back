const db = require('../db')
class TimofeyController{

    async createTimofey(req, res) {
        const{surname, age} = req.body 
        const newTimofey = await db.query('INSERT INTO Timofey(Surname, age) values ($1,$2) RETURNING Surname, age', [surname, age])

        res.json(newTimofey.rows[0])
    }

    async getAllTimofeys(req,res) {
        const Timofeys = await db.query('SELECT Surname, age From Timofey')
        res.json(Timofeys.rows)
    }
    async getTimofey(req, res) {
        const id = req.params.id;
        const Timofey = await db.query('SELECT Surname, age From Timofey WHERE id = $1', [id])
        res.json(Timofey.rows[0])
    }

    async updateTimofey(req, res) {
        const{id, surname, age} = req.body 
        const Timofey = await db.query('UPDATE Timofey set Surname = $1 , age = $2 where id = $3 RETURNING Surname, age', [surname, age, id])
        res.json(Timofey.rows[0])
    }

    async deleteTimofey(req, res) {
        const id = req.params.id;
        const Timofey = await db.query('DELETE From Timofey WHERE id = $1', [id])
        res.json('Delete Timofey with id ' + id);
    }
    
}

module.exports = new TimofeyController()