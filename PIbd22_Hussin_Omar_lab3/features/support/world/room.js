const { BaseWorld } = require('./base')
const db = require ("../../../db")

class roomWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    addroom(name) {
        this.post("/api/room", {name});
        this.#id = this.response.json.roomid;
    }

    getrooms() {
        this.get('/api/rooms');
    }

    getroom(id) {
        this.get("/api/room/" + id);
    }

    updateroom(roomID, name) {
        this.put("/api/room", {roomID, name});
    }

    deleteroom(id) {
        this.delete("/api/room/" + id);
    }

    async clear() {
        await db.query("DELETE FROM room");
        await db.query("ALTER SEQUENCE room_seq RESTART");
    }
}

module.exports = { roomWorld };