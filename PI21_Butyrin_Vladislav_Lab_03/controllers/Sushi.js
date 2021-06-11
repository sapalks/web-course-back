const db = require('../db')

class SushiController{

    async createSushi(req, res) {
        const{Name_Sushi, Ingredients, Cook_id} = req.body 
        const newSushi = await db.query('INSERT INTO Sushi(Name_Sushi, Ingredients, Cook_id) values ($1,$2,$3) RETURNING Name_Sushi, Ingredients, Cook_id', [Name_Sushi, Ingredients, Cook_id])

        res.json(newSushi.rows[0])
    }

    async getAllSushis(req,res) {

        const Sushis = await db.query('SELECT Name_Sushi, Ingredients, Cook_id From Sushi')
        res.json(Sushis.rows)
    }
    async getSushi(req, res) {
        const id = req.params.id;
        const Sushi = await db.query('SELECT Name_Sushi, Ingredients, Cook_id From Sushi WHERE id = $1', [id])
        res.json(Sushi.rows[0])
    }

    async getCooksSushi(req, res) {
        const id = req.query.Cook_id;
        const result = await db.query('SELECT Name_Sushi, Ingredients, Cook_id FROM Sushi WHERE Cook_id = $1', [id]);
        res.json(result.rows);
    }
    async updateSushi(req, res) {
        const{id, Name_Sushi, Ingredients, Cook_id} = req.body 
        const Sushi = await db.query('UPDATE Sushi set Name_Sushi = $1, Ingredients = $2, Cook_id = $3 where id = $4 RETURNING Name_Sushi, Ingredients, Cook_id', [Name_Sushi, Ingredients, Cook_id, id])
        res.json(Sushi.rows[0])
    }

    async deleteSushi(req, res) {
        const id = req.params.id;
        const Sushi = await db.query('DELETE From Sushi WHERE id = $1', [id])
        res.json('Delete Sushi with id ' + id);
    }
    
}

module.exports = new SushiController()