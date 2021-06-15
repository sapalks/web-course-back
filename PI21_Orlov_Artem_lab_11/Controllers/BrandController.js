const db = require('../connection.js');
const cache = require("../cache.js");

class BrandController {
    async getBrands(req, res) {
        const cacheBrands = await cache.get('brands');
        if (cacheBrands) {
            res.json(cacheBrands);
            return;
        }
        const brands = await db.query(`SELECT *
                                       FROM brand
                                       WHERE isdeleted = false`);
        await cache.save('brands', brands.rows);
        res.json(brands.rows);
    }

    async getBrand(req, res) {
        const id = req.params.id;
        const cachedBrand = await cache.get(`brand${id}`);
        if (cachedBrand) {
            res.json(cachedBrand);
            return;
        }
        const brand = await db.query(`SELECT *
                                      FROM brand
                                      WHERE id = $1
                                        AND isdeleted = false`, [id]);
        await cache.save(`brand${id}`, brand.rows[0]);
        res.json(brand.rows[0]);
    }

    async createBrand(req, res) {
        const {name, foundername, creationyear} = req.body
        await db.query('INSERT INTO brand(name,foundername,creationyear) VALUES ($1, $2, $3)', [name, foundername, creationyear]);
        await cache.clear();
        res.json("Done")
    }

    async updateBrand(req, res) {
        const {id, name, foundername, creationyear} = req.body;
        await db.query('UPDATE brand SET (name,foundername,creationyear) = ($1,$2,$3) WHERE Id = $4', [name, foundername, creationyear, id]);
        await cache.clear();
        res.json("Done")
    }

    async deleteBrand(req, res) {
        const id = req.params.id;
        await db.query('UPDATE brand SET isdeleted = true WHERE id=$1', [id]);
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

module.exports = new BrandController()