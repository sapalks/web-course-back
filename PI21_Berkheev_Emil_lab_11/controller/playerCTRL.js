const db = require('../db')
const cache = require('../cache.js')

class playerController {

    async getAllPlayers(req, res) {
        const cached = await cache.get('players')
        if (cached) {
            return res.json(cached)
        }
        const result = await db.query('SELECT * FROM player WHERE isDeleted = FALSE');
        cache.save('players', result.rows)
        res.json(result.rows);
    }

    async getPlayerInTeams(req, res) {
        const cached = await cache.get(`playerInTeam`)
        if (cached) {
            return res.json(cached)
        }
        const id = req.params.teamID;
        const result = await db.query('SELECT * FROM player WHERE isDeleted = FALSE AND teamID = $1', [id]);
        cache.save(`playerInTeam`, result.rows)
        res.json(result.rows);
    }

    async getPlayer(req, res) { 
        const cached = await cache.get(`player ${id}`)
        if (cached) {
            return res.json(cached)
        }
        const id = req.params.id;
        const result = await db.query('SELECT * FROM player WHERE isDeleted = FALSE AND playerID = $1', [id]);
        cache.save(`player ${id}`, result.rows[0])
        res.json(result.rows[0]);
    }

    async createPlayer(req, res) {
        const { login, mail, division, teamID } = req.body;
        const result = await db.query('INSERT INTO player(login, mail, division, teamID) VALUES ($1, $2, $3, $4) RETURNING *', [login, mail, division, teamID]);
        cache.delete(`playerInTeam`)
        cache.delete(`players`)
        res.json(result.rows[0]);  
    }

    async updatePlayer(req, res) {
        const {playerID, login, mail, division, teamID} = req.body;
        const result = await db.query('UPDATE player SET login = $1, mail = $2, division = $3, teamID = $4 WHERE playerID = $5 AND isDeleted = FALSE RETURNING *',
        [login, mail, division, teamID, playerID]);
        cache.delete(`player ${id}`)
        cache.delete(`playerInTeam`)
        cache.delete(`players`)
        res.json(result.rows[0]);
    }

    async deletePlayer(req, res) {
        const id = req.params.id;
        await db.query('UPDATE player SET isDeleted = TRUE WHERE playerID = $1 RETURNING *', [id]);
        cache.delete(`player ${id}`)
        cache.delete(`playerInTeam`)
        cache.delete(`players`)
        res.json('player with id: ' + id + ' was deleted');
    }

    async isCached(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`Cache key saved ${key}`)
        }
        res.json("No cache")
    }
}

module.exports = new playerController();
