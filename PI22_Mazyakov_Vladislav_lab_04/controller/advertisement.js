const db = require('../db')

class AdvertisementController {
    async createAdvert(req, res) {
        const { advertname, price, bulletinboardsid } = req.body
        var date = new Date();
        const newAdvert = await db.query(
            'INSERT INTO advertisement(advertname, price, date, bulletinboardsid) values ($1,$2,$3,$4) RETURNING id', [advertname, price,date,bulletinboardsid]
        )
        res.json(newAdvert.rows[0])
    }

    async getAdvert(req, res) {
        const { id, bulletinboardsid } = req.query
        if (id) {
            const advert = await db.query('SELECT * FROM advertisement where id = $1 and isDeleted = false', [id])
            res.json(advert.rows[0])
            return
        }
        if (bulletinboardsid) {
            const advert = await db.query(
                'SELECT * FROM advertisement where bulletinboardsid = $1 and isDeleted = false', [bulletinboardsid])
            res.json(advert.rows)
        } else {
            const adverts = await db.query('SELECT * FROM advertisement where isDeleted = false')
            res.json(adverts.rows)
        }
    }

    async updateAdvert(req, res) {
        const { id, advertname, price } = req.body
        const advert = await db.query('UPDATE advertisement set advertname = $1, price = $2 where id = $3 RETURNING *',
            [advertname, price, id])
        res.json(advert.rows[0])
    }

    async deleteAdvert(req, res) {
        const id = req.query.id
        await db.query('Update advertisement set isDeleted = true where id = $1', [id])
        res.json(`advertisement with id: ${id}  was  deleted`)
    }
}

module.exports = new AdvertisementController()
