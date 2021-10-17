const db = require('../db')

class TaskController {
    async createTask(req, res) {
        const {theme, timeOfRemind, deadline} = req.body
        console.log(`${theme} ${timeOfRemind} ${deadline}`)
        const newTask = await db.query(`INSERT INTO task (theme, timeOfRemind, deadline) values ($1, $2, $3) RETURNING *`, [theme, timeOfRemind, deadline])
        res.json(newTask.rows[0])
    }
    async getTasks(req, res) {
        const tasks = await db.query(`SELECT * FROM task`)
        res.json(tasks.rows)
    }
    async getTask(req, res) {
        const id = req.params.id
        const task = await db.query(`SELECT * FROM task where id = $1`, [id])
        res.json(task.rows[0])
    }
    async updateTask(req, res) {
        const {id, theme, timeOfRemind, deadline} = req.body
        const task = await db.query(`UPDATE task set theme = $1, timeOfRemind = $2, deadline = $3 where id = $4 RETURNING *`, [theme, timeOfRemind, deadline, id])
        res.json(task.rows[0])
    }    
    async deleteTask(req, res) {
        const id = req.params.id
        const task = await db.query(`DELETE FROM task where id = $1`, [id])
        res.json(task.rows[0])
    }
}

module.exports = new TaskController()