const db = require('../db/db')

class AdController {
    async createAd(req, res) {
        const { Name, Price, Date, Address, Description, UserId } = req.body
        const newAd = await db.query(
            'INSERT INTO ad(Name, Price, Date, Address, Description, UserId) values ($1,$2,$3,$4,$5,$6) Returning *', 
            [Name, Price, Date, Address, Description, UserId]
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
        const { Name, Price, Date, Address, Description, UserId, id } = req.body
        const user = await db.query('UPDATE ad set Name = $1, Price = $2, Date = $3, Address = $4, Description = $5, UserId = $6  where id = $7 RETURNING *',
            [Name, Price, Date, Address, Description, UserId, id])
        res.json(user.rows[0])
    }

    async deleteAd(req, res) {
        const id = req.query.id
        await db.query('Update ad set isDeleted = true where id = $1', [id])
        res.json(`Ad with id: ${id} was successfully deleted`)
    }
}

module.exports = new AdController()