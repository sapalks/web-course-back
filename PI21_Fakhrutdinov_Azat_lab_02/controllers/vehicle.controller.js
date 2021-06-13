const db = require("../db")

class vehicleController {
    async createvehicle(req, res) {
        const {brand, model, year_issue, price, class_id} = req.body;
        db.query("INSERT INTO vehicle(brand, model, year_issue, price, class_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, brand, model, year_issue, price, class_id",
        [brand, model, year_issue, price, class_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.status(400).send("Timeout. Please try again");
            }
            res.json(result.rows[0]);
        })
    }
    async getvehicles(req, res) {
        const vehicles = await db.query(`SELECT id, brand, model, year_issue, price, class_id FROM vehicle WHERE is_deleted = false`)
        vehicles.rows.length > 0 ? res.json(vehicles.rows) : res.status(400).json("vehicles doesn't exist");
    }
    
    async getvehicle(req, res) {
        const id = req.query.id;
        const vehicle = await db.query(`SELECT id, brand, model, year_issue, price, class_id FROM vehicle where id = $1 AND is_deleted = false`, [id])
        vehicle.rows.length > 0 ? res.json(vehicle.rows[0]) : res.status(400).json("vehicle doesn't exist");
    }

    async updatevehicle(req, res) {
        var {id, brand, model, year_issue, price, class_id} = req.body;
        db.query("UPDATE vehicle SET brand = $2, model = $3, year_issue = $4, price = $5, class_id = $6 WHERE id = $1 AND is_deleted = false RETURNING id, brand, model, year_issue, price, class_id",
        [id, brand, model, year_issue, price, class_id], (err, result) => {
            if (err || result.rows.length === 0) {
                return res.sendStatus(204);
            }
            res.json(result.rows[0]);
        })
    }

    async deletevehicle(req, res) {
        const id = req.query.id;
        const vehicle = await db.query(`UPDATE vehicle SET is_deleted = true WHERE id = $1 RETURNING brand, model, year_issue, price, class_id`, [id])
        res.status(200).send("vehicle was sucessfully deleted");
        vehicle.rows.length > 0 ? res.json(vehicle.rows[0]) : res.status(400).sen("vehicle doesn't exist or already deleted");
    }
}

module.exports = new vehicleController()