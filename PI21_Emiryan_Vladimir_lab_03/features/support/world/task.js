const { BaseWorld } = require('./base')
const db = require ("../../../db")
class TaskWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }
    
    createTask(theme, timeOfRemind, deadline) {
        this.post("/api/task", {theme, timeOfRemind, deadline});
    }

    getTasks() {
         this.get('/api/task');
    }
    
    getTask(id) {
        this.get("/api/task/" + id);
    }

    async clear() {
        await db.query("DELETE FROM task");
        await db.query("ALTER SEQUENCE task_id_seq RESTART WITH 1;");
    }
}

module.exports = {
    TaskWorld
}
