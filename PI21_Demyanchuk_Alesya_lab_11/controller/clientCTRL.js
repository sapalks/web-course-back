const database = require('../databaseconnect')
const cache = require('../cache.js')

class ClientController {
    async createClient(req, res) {
        const {id,fioname, passport, hotelid} = req.body
        const newclient = await database.query(`INSERT INTO client (id, fioname, passport, hotelid) values ($1, $2, $3, $4) RETURNING * `, [id, fioname, passport, hotelid])
        cache.delete(`clients`)
        newclient.rows.length > 0 ? res.json(newclient.rows[0]) : res.status(400).json("Error");
    }
    async getClient(req, res) {
        const id = req.params.id;
        const cached = await cache.get(`client ${id}`)
        if (cached) {
            return res.json(cached)
        }
        const client = await database.query(`SELECT * FROM client where id = $1 AND delete = false`, [id])
        cache.save(`client ${id}`, client.rows[0])
        client.rows.length > 0 ? res.json(client.rows[0]) : res.status(400).json("client doesn't exist");
    }

    async getClients(req, res) {  
        const cached = await cache.get(`clients`)
        if (cached) {
            return res.json(cached)
        }
        const clients = await database.query(`SELECT * FROM client where delete = false`)
        cache.save('clients', clients.rows)
        clients.rows.length > 0 ? res.json(clients.rows) : res.status(400).json("clients doesn't exist");
    }

    async updateClient(req, res) {
        const {id, fioname, passport, hotelid} = req.body;
        const client = await database.query(`UPDATE client set fioname = $2, passport = $3, hotelid = $4 
        where id = $1 AND delete = false RETURNING *`, [id, fioname, passport, hotelid])
        cache.delete(`client ${id}`)
        cache.delete(`clients`)
        client.rows.length > 0 ? res.json(client.rows[0]) : res.status(400).json("client doesn't exist");
    }

    async deleteClient(req, res) {
        const id = req.params.id;
        const client = await database.query(`UPDATE client set delete = true where id = $1 AND delete = false RETURNING *`, [id])
        cache.delete(`client ${id}`)
        cache.delete(`clients`)
        client.rows.length > 0 ? res.json(client.rows[0]) : res.status(400).json("client doesn't exist or already deleted");
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`cache key saved ${key}`)
        }
        res.json(`No cache`)
    }
}

module.exports = new ClientController()