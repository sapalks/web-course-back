const db = require('../connection.js')

class BrandController {
    async getBrands(req, res) {
        const brands = await db.query(`SELECT *
                                       FROM brand
                                       WHERE isdeleted = false`)
        res.json(brands.rows);
    }

    async getBrand(req, res) {
        const id = req.params.id;
        const brand = await db.query(`SELECT *
                                      FROM brand
                                      WHERE id = $1
                                        AND isdeleted = false`, [id])
        res.json(brand.rows);
    }

    async createBrand(req, res) {
        const {name, foundername, creationyear} = req.body
        const result=await db.query('INSERT INTO brand(name,foundername,creationyear) VALUES ($1, $2, $3) RETURNING *', [name, foundername, creationyear])
        res.json(result.rows[0]);
    }

    async updateBrand(req, res) {
        const {id, name, foundername, creationyear} = req.body
        await db.query('UPDATE brand SET (name,foundername,creationyear) = ($1,$2,$3) WHERE Id = $4', [name, foundername, creationyear, id])
        res.json("Done")
    }

    async deleteBrand(req, res) {
        const id = req.params.id
        await db.query('UPDATE brand SET isdeleted = true WHERE id=$1', [id])
        res.json("Done")
    }
}

module.exports = new BrandController()