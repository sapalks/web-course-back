const database = require('../database')
const cache = require('../cache')
const Key = 'products'
const IdKey = 'product '

class productController {

    async getProducts(req, res) {
        const cached = await cache.get(Key)
        if (cached) { return res.json(cached) }

        const result = await database.query('SELECT * FROM product WHERE isDell = FALSE');

        cache.save(Key, result.rows)
        res.json(result.rows);
    }

    async getProduct(req, res) {
        const id = req.params.id;
        const cacheKey = IdKey + id;

        const cached = await cache.get(cacheKey)
        if (cached) { return res.json(cached) }

        const result = await database.query('SELECT * FROM product WHERE isDell = FALSE AND id = $1', [id]);

        cache.save(cacheKey, result.rows[0])
        res.json(result.rows[0]);
    }

    async createProduct(req, res) {
        const { name, price, groupp_id } = req.body;

        const result = await database.query('INSERT INTO product(Name, Price, GroupP_ID) VALUES ($1, $2, $3) RETURNING *', [name, price, groupp_id]);

        cache.delete(Key);
        res.json(result.rows[0]);
    }

    async updateProduct(req, res) {
        const { id, name, price, groupp_id } = req.body;
        const cacheKey = IdKey + id;

        const result = await database.query('UPDATE product SET Name = $1, Price = $2, GroupP_ID = $3 WHERE id = $4 AND isDell = FALSE RETURNING *', [name, price, groupp_id, id]);

        cache.delete(Key)
        cache.delete(cacheKey);
        res.json(result.rows[0]);
    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        const cacheKey = IdKey + id;

        await database.query('UPDATE product SET isDell = TRUE WHERE id = $1 RETURNING *', [id]);

        cache.delete(Key);
        cache.delete(cacheKey)
        res.json('product with id = ' + id + ' was deleted');
    }
}

module.exports = new productController();