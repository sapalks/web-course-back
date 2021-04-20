const db = require('../db')

class playerController {

    async geAllPlayers(req, res) {
        const result = await db.query('SELECT * FROM player WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getPlayerInTeams(req, res) {
        const id = req.params.teamID;
        const result = await db.query('SELECT * FROM player WHERE isDeleted = FALSE AND teamID = $1', [id]);
        res.json(result.rows);
    }

    async getPlayer(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM player WHERE isDeleted = FALSE AND playerID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createPlayer(req, res) {
        const { login, mail, division, teamID } = req.body;
        const result = await db.query('INSERT INTO player(login, mail, division, teamID) VALUES ($1, $2, $3, $4) RETURNING *', [login, mail, division, teamID]);
        res.json(result.rows[0]);  
    }

    async updatePlayer(req, res) {
        const {playerID, login, mail, division, teamID} = req.body;
        const result = await db.query('UPDATE player SET login = $1, mail = $2, division = $3, teamID = $4 WHERE playerID = $5 AND isDeleted = FALSE RETURNING *',
        [login, mail, division, teamID, playerID]);
        res.json(result.rows[0]);
    }

    async deletePlayer(req, res) {
        const id = req.params.id;
        await db.query('UPDATE player SET isDeleted = TRUE WHERE playerID = $1 RETURNING *', [id]);
        res.json('player with id: ' + id + ' was deleted');
    }
}

module.exports = new playerController();