const db = require("../configurations/db")

class carController {
    async createcar(req, res) {
        const {brand, model, year_of_issue, price, class_id} = req.body;
        db.query("INSERT INTO car(brand, model, year_of_issue, price, class_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, brand, model, year_of_issue, price, class_id",
        [brand, model, year_of_issue, price, class_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.status(400).send("Timeout. Please try again");
            }
            res.json(result.rows[0]);
        })
    }
    async getcars(req, res) {
        const cars = await db.query(`SELECT id, brand, model, year_of_issue, price, class_id FROM car WHERE is_deleted = false`)
        cars.rows.length > 0 ? res.json(cars.rows) : res.status(400).json("cars doesn't exist");
    }
    
    async getcar(req, res) {
        const id = req.query.id;
        const car = await db.query(`SELECT id, brand, model, year_of_issue, price, class_id FROM car where id = $1 AND is_deleted = false`, [id])
        car.rows.length > 0 ? res.json(car.rows[0]) : res.status(400).json("car doesn't exist");
    }

    async updatecar(req, res) {
        var {id, brand, model, year_of_issue, price, class_id} = req.body;
        db.query("UPDATE car SET brand = $2, model = $3, year_of_issue = $4, price = $5, class_id = $6 WHERE id = $1 AND is_deleted = false RETURNING id, brand, model, year_of_issue, price, class_id",
        [id, brand, model, year_of_issue, price, class_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async deletecar(req, res) {
        const id = req.query.id;
        const car = await db.query(`UPDATE car SET is_deleted = true WHERE id = $1 RETURNING brand, model, year_of_issue, price, class_id`, [id])
        res.status(200).send("car was sucessfully deleted");
        car.rows.length > 0 ? res.json(car.rows[0]) : res.status(400).sen("car doesn't exist or already deleted");
    }
}

module.exports = new carController()