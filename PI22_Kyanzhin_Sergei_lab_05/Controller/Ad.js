const db = require('../db/db')

class AdController {
    async createAd(req, res) {
        const { name, price, date, address, description, userId } = req.body
        const newAd = await db.query(
            'INSERT INTO ad(name, price, date, address, description, userId) values ($1,$2,$3,$4,$5,$6) Returning *', 
            [name, price, date, address, description, userId]
        )
        res.json(newAd.rows[0])
    }

    async getAds(req, res) {
        const id = req.query.id
        if (id) {
            const ad = await db.query('SELECT * FROM ad where id = $1 and isDeleted = false', [id])
            res.json(ad.rows[0])
        } else {
            const Ads = await db.query('SELECT * FROM ad where isDeleted = false')
            res.json(Ads.rows)
        }
    }

    async updateAd(req, res) {
        const { name, price, date, address, description, userId, id } = req.body
        const user = await db.query('UPDATE ad set name = $1, price = $2, date = $3, address = $4, description = $5, userId = $6  where id = $7 RETURNING *',
            [name, price, date, address, description, userId, id])
        res.json(user.rows[0])
    }

    async deleteAd(req, res) {
        const id = req.query.id
        await db.query('Update ad set isDeleted = true where id = $1', [id])
        res.json(`Ad with id: ${id} was successfully deleted`)
    }
}

module.exports = new AdController()