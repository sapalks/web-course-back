const { BaseWorld } = require('./base')
const db = require ("../../../db")

class PlayerWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addPlayer(login, mail, division, teamID) {
        this.post("/api/player", {login, mail, division, teamID});
        this.#id = this.response.json.playerid;
    }

    getPlayers() {
        this.get("/api/players");
    }

    getPlayerInTeams(teamID) {
        this.get("/api/players/" + teamID);
    }

    getPlayer(id) {
        this.get("/api/player/" + id);
    }

    updatePlayer(playerID, login, mail, division, teamID) {
        this.put("/api/player", {playerID, login, mail, division, teamID});
    }

    deletePlayer(id) {
        this.delete("/api/player/" + id);
    }

    async clear() {
        await db.query("DELETE FROM player");
    }
}

module.exports = { PlayerWorld };