const { BaseWorld } = require('./base')
const db = require ("../../../db")
class StepWorld extends BaseWorld {

    constructor(_state) {
        super(_state);
    }
    
    createStep(theme, taskId) {
        this.post("/api/step", {theme, taskId});
    }

    getSteps() {
         this.get('/api/step');
    }
    
    getTaskSteps(id) {
        this.get('/api/step?id=' + id);
    }

    getStep(id) {
        this.get("/api/step/" + id);
    }

    updateStep(id, theme, taskId) {
        this.put("/api/step", {id, theme, taskId});
    }

    deleteStep(id) {
        this.delete("/api/step/" + id);
    }

    async clear() {
        await db.query("DELETE FROM step");
        await db.query("ALTER SEQUENCE step_id_seq RESTART WITH 1;");
        await db.query("DELETE FROM task");
        await db.query("ALTER SEQUENCE task_id_seq RESTART WITH 1;");
    }
}

module.exports = {
    StepWorld
}