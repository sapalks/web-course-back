const { BaseWorld } = require('./base')
const db = require ("../../../db")

class TeamWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addTeam(name) {
        this.post("/api/team", {name});
        this.#id = this.response.json.teamid;
    }

    getTeams() {
        this.get('/api/teams');
    }

    getTeam(id) {
        this.get("/api/team/" + id);
    }

    updateTeam(teamID, name) {
        this.put("/api/team", {teamID, name});
    }

    deleteTeam(id) {
        this.delete("/api/team/" + id);
    }

    async clear() {
        await db.query("DELETE FROM team");
        await db.query("ALTER SEQUENCE team_seq RESTART");
    }
}

module.exports = { TeamWorld };