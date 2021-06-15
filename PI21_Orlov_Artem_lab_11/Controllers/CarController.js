const db = require('../connection.js')
const cache = require("../cache.js");

class CarController {
    async getCars(req, res) {
        const cacheCars = await cache.get('cars');
        if (cacheCars) {
            res.json(cacheCars);
            return;
        }
        const cars = await db.query(`SELECT *
                                     FROM car
                                     WHERE isdeleted = false`);
        await cache.save('cars', cars.rows);
        res.json(cars.rows);
    }

    async getCar(req, res) {
        const id = req.params.id;
        const cachedBrand = await cache.get(`car${id}`);
        if (cachedBrand) {
            res.json(cachedBrand);
            return;
        }
        const car = await db.query(`SELECT *
                                    FROM car
                                    WHERE id = $1
                                      AND isdeleted = false`, [id]);
        await cache.save(`car${id}`, car.rows[0]);
        res.json(car.rows[0]);
    }

    async getCarsByBrand(req, res) {
        const brandId = req.params.id;
        const cacheCars = await cache.get(`carsByBrand${brandId}`);
        if (cacheCars) {
            res.json(cacheCars);
            return;
        }
        const car = await db.query(`SELECT *
                                    FROM car
                                    WHERE brandid = $1
                                      AND isdeleted = false`, [brandId]);
        await cache.save(`carsByBrand${brandId}`, car.rows);
        res.json(car.rows);
    }

    async createCar(req, res) {
        const {name, enginename, hp, creationyear, enginevolume, brandid} = req.body
        await db.query('INSERT INTO car (name,enginename, hp, creationyear, enginevolume, brandid) VALUES ($1,$2,$3,$4,$5,$6)', [name, enginename, hp, creationyear, enginevolume, brandid])
        await cache.clear();
        res.json("Done")
    }

    async updateCar(req, res) {
        const {name, enginename, hp, creationyear, enginevolume, brandid, id} = req.body
        await db.query('UPDATE car SET (name,enginename, hp, creationyear, enginevolume, brandid) = ($1,$2,$3,$4,$5,$6) WHERE Id = $7', [name, enginename, hp, creationyear, enginevolume, brandid, id])
        await cache.clear();
        res.json("Done")
    }

    async deleteCar(req, res) {
        const id = req.params.id
        await db.query('UPDATE car SET isdeleted = true WHERE id=$1', [id])
        await cache.clear();
        res.json("Done")
    }

    async isCache(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`Last used key is ${key}`);
        }
        res.json("cache empty")
    }
}

module.exports = new CarController()