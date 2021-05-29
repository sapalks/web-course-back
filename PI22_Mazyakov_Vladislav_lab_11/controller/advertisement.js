const db = require('../db')
const cache = require('../cache.js')

class AdvertisementController {
    async createAdvert(req, res) {
        const { advertname, price, bulletinboardsid } = req.body
        var date = new Date();
        const newAdvert = await db.query(
            'INSERT INTO advertisement(advertname, price, date, bulletinboardsid) values ($1,$2,$3,$4) RETURNING id', [advertname, price,date,bulletinboardsid]
        )
        res.json(newAdvert.rows[0])
        cache.delete('advert')
    }

    async getAdvert(req, res) {
      const id = req.query.id
      const bulletinboardsid = req.query.bulletinboardsid
      let cached = null
      if (id != null) {
        cached = await cache.get('advert'+id)
      }
      else if (bulletinboardsid ) {
        cached = await cache.get('advert'+bulletinboardsid)
      }
      else {
        cached= await cache.get('advert')
      }
        if (cached) {
            return res.json(cached)
        }
        if (id) {
            const advert = await db.query('SELECT * FROM advertisement where id = $1 and isDeleted = false', [id])
            cache.save('advert'+id, advert.rows[0])
            res.json(advert.rows[0]);
            return
        }
        if (bulletinboardsid) {
            const advert = await db.query(
                'SELECT * FROM advertisement where bulletinboardsid = $1 and isDeleted = false', [bulletinboardsid])
                cache.save('advert'+bulletinboardsid, adverts.rows)
                res.json(adverts.rows);
        } else {
            const adverts = await db.query('SELECT * FROM advertisement where isDeleted = false')
            cache.save('advert', adverts.rows)
            res.json(adverts.rows);
        }

    }

    async updateAdvert(req, res) {
        const { id, advertname, price } = req.body
        const advert = await db.query('UPDATE advertisement set advertname = $1, price = $2 where id = $3 RETURNING *',
            [advertname, price, id])
            cache.delete('advert')
            cache.delete('advert'+id)
            res.json(advert.rows[0]);
    }

    async deleteAdvert(req, res) {
        const id = req.query.id
        await db.query('Update advertisement set isDeleted = true where id = $1', [id])
        res.json(`advertisement with id: ${id}  was  deleted`)
        cache.delete('advert')
        cache.delete('advert'+id)
    }
    async isCached(req, res) {
       const key = await cache.getLastKey()
       if (key) {
           return res.json(`В кеше сохранён ключ ${key}`)
       }
       res.json("Кеширования не было")
   }
}

module.exports = new AdvertisementController()
