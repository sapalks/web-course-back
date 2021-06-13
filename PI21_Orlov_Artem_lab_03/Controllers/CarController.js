const db = require('../connection.js')

class CarController {
    async getCars(req, res) {
        const cars = await db.query(`SELECT *
                                     FROM car
                                     WHERE isdeleted = false`)
        res.json(cars.rows);
    }

    async getCar(req, res) {
        const id = req.params.id;
        const car = await db.query(`SELECT *
                                    FROM car
                                    WHERE id = $1
                                      AND isdeleted = false`, [id])
        res.json(car.rows);
    }

    async getCarsByBrand(req, res) {
        const brandId = req.params.id;
        const car = await db.query(`SELECT *
                                    FROM car
                                    WHERE brandid = $1
                                      AND isdeleted = false`, [brandId])
        res.json(car.rows);
    }

    async createCar(req, res) {
        const {name, enginename, hp, creationyear, enginevolume, brandid} = req.body;
        const result=await db.query('INSERT INTO car (name,enginename, hp, creationyear, enginevolume, brandid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [name, enginename, hp, creationyear, enginevolume, brandid])
        res.json(result.rows[0]);
    }

    async updateCar(req, res) {
        const {name, enginename, hp, creationyear, enginevolume, brandid, id} = req.body
        await db.query('UPDATE car SET (name,enginename, hp, creationyear, enginevolume, brandid) = ($1,$2,$3,$4,$5,$6) WHERE Id = $7', [name, enginename, hp, creationyear, enginevolume, brandid, id])
        res.json("Done")
    }

    async deleteCar(req, res) {
        const id = req.params.id
        await db.query('UPDATE car SET isdeleted = true WHERE id=$1', [id])
        res.json("Done")
    }
}

module.exports = new CarController()