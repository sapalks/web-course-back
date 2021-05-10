const db = require('../db')

class teamController {

    async geAllTeams(req, res) {
        const result = await db.query('SELECT * FROM team WHERE isDeleted = FALSE');
        res.json(result.rows);
    }

    async getTeam(req, res) {
        const id = req.params.id;
        const result = await db.query('SELECT * FROM team WHERE isDeleted = FALSE AND teamID = $1', [id]);
        res.json(result.rows[0]);
    }

    async createTeam(req, res) {
        const {name} = req.body;
        const result = await db.query('INSERT INTO team(name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    }

    async updateTeam(req, res) {
        const {teamID, name} = req.body;
        const result = await db.query('UPDATE team SET name = $1 WHERE teamID = $2 AND isDeleted = FALSE RETURNING *', [name, teamID]);
        res.json(result.rows[0]);
    }

    async deleteTeam(req, res) {
        const id = req.params.id;
        await db.query('UPDATE team SET isDeleted = TRUE WHERE teamID = $1 RETURNING *', [id]);
        res.json('team with id: ' + id + ' was deleted');
    }
}

module.exports = new teamController();