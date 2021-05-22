const db = require('../db')

class DesireController{

    async createDesire(req, res) {
        const{Name_desire, Degree_of_desire, Timofey_id} = req.body 
        const newDesire = await db.query('INSERT INTO Desire(Name_desire, Degree_of_desire, Timofey_id) values ($1,$2,$3) RETURNING Name_desire, Degree_of_desire, Timofey_id', [Name_desire, Degree_of_desire, Timofey_id])

        res.json(newDesire.rows[0])
    }

    async getAllDesires(req,res) {

        const Desires = await db.query('SELECT * From Desire')
        res.json(Desires.rows)
    }
    async getDesire(req, res) {
        const id = req.params.id;
        const Desire = await db.query('SELECT * From Desire WHERE id = $1', [id])
        res.json(Desire.rows[0])
    }

    async getTimofeysDesire(req, res) {
        const id = req.query.Timofey_id;
        const result = await db.query('SELECT * FROM Desire WHERE Timofey_id = $1', [id]);
        res.json(result.rows);
    }
    async updateDesire(req, res) {
        const{id, Name_desire, Degree_of_desire, Timofey_id} = req.body 
        const Desire = await db.query('UPDATE Desire set Name_desire = $1, Degree_of_desire = $2, Timofey_id = $3 where id = $4 RETURNING Name_desire, Degree_of_desire, Timofey_id', [Name_desire, Degree_of_desire, Timofey_id, id])
        res.json(Desire.rows[0])
    }

    async deleteDesire(req, res) {
        const id = req.params.id;
        const Desire = await db.query('DELETE From Desire WHERE id = $1', [id])
        res.json('Delete Desire with id ' + id);
    }
    
}

module.exports = new DesireController()