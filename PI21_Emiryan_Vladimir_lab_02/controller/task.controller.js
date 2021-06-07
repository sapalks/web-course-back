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
        
    }    
    async deleteTask(req, res) {

    }
}

module.exports = new TaskController()