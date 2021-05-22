const db = require('../db')
const cache = require('../cache.js')

class teamController {

    async geAllTeams(req, res) {
        const cached = await cache.get('team')
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM team WHERE isDeleted = FALSE');
        cache.save('team', result.rows)
        res.json(result.rows);
    }

    async getTeam(req, res) {
        const cached = await cache.get('team')
        if (cached) {
            return res.json(cached)
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM team WHERE isDeleted = FALSE AND teamID = $1', [id]);
        cache.save('team', result.rows[0])
        res.json(result.rows[0]);
    }

    async createTeam(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO team(name) VALUES ($1) RETURNING *', [name]);
        cache.delete('team')
        res.json(result.rows[0]);
    }

    async updateTeam(req, res) {
        const {teamID, name} = req.body;
        const result = await db.query('UPDATE team SET name = $1 WHERE teamID = $2 AND isDeleted = FALSE RETURNING *', [name, teamID]);
        cache.delete('team')
        res.json(result.rows[0]);
    }

    async deleteTeam(req, res) {
        const id = req.params.id;
        await db.query('UPDATE team SET isDeleted = TRUE WHERE teamID = $1 RETURNING *', [id]);
        cache.delete('team')
        res.json('team with id: ' + id + ' was deleted');
    }
    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`Cache key saved ${key}`)
        }
        res.json("No cache")
     }
}

module.exports = new teamController();