const { BaseWorld } = require('./base')
const db = require ("../../../db")

class WriterWorld extends BaseWorld {

    #id;

    getLastId() {
        return this.#id;
    }

    createWriter(name,surname,patronymic) {
        this.post("/api/writer", {name,surname,patronymic});
        this.#id = this.response.json.writerid;
    }

    getWriters() {
        this.get('/api/writer');
    }

    getWriter(id) {
        this.get("/api/writer/" + id);
    }

    updateWriter(id,name,surname,patronymic) {
        this.put("/api/writer", {id,name,surname,patronymic});
    }

    deleteWriter(id) {
        this.delete("/api/writer/" + id);
    }

    async clear() {
        await db.query("DELETE FROM writer");
        db.query("ALTER SEQUENCE writer_writerid_seq RESTART");
    }
}

module.exports = { WriterWorld };