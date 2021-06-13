const db = require('../db')

class StepController {
    async createStep(req, res) {
        const {theme, taskId} = req.body
        const newStep = await db.query(`INSERT INTO step (theme, task_id) values ($1, $2) RETURNING *`, [theme, taskId])
        res.json(newStep.rows[0])
    }
    async getSteps(req, res) {
        const id = req.body.id
        const steps = await db.query(`SELECT * FROM step where task_id = $1`, [id])
        res.json(steps.rows)
    }
    async getStep(req, res) {
        const id = req.params.id
        const step = await db.query(`SELECT * FROM step where id = $1`, [id])
        res.json(step.rows[0])
    }
    async updateStep(req, res) {
        const {id, theme, taskId} = req.body
        const step = await db.query(`UPDATE step set theme = $1, task_id = $2 where id = $3 RETURNING *`, [theme, taskId, id])
        res.json(step.rows[0])
    }
    async deleteStep(req, res) {
        const id = req.params.id
        const step = await db.query(`DELETE FROM step where id = $1`, [id])
        res.json(step.rows[0])
    }    
}

module.exports = new StepController()