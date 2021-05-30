const db = require('../db')
const cache = require('../cache')

class TaskController {
    async createTask(req, res){
        const {taskname, taskstartdate, taskfinishdate, employer_id} = req.body
        const newTask = await db.query(`INSERT INTO task (taskname, taskstartdate, taskfinishdate, employer_id)
                                VALUES ($1, $2, $3, $4) RETURNING *`, [taskname, taskstartdate, taskfinishdate, employer_id])
        res.json(newTask.rows[0])
        cache.clear('tasks');
        console.log('Создали задачу')
    }

    async getTasks(req, res){
        const isCached = await cache.get(`tasks`)
        if (isCached) {
            return res.json(isCached)
        }
        const tasks = await db.query(`SELECT * FROM task`)
        res.json(tasks.rows)
        cache.add('tasks', tasks.rows)
        console.log('Получили список задач')
    }

    async getEmployerTasks(req, res){
        const employer_id = req.params.employer_id  
        const tasks = await db.query(`SELECT * FROM task WHERE employer_id = $1`, [employer_id])
        res.json(tasks.rows)
        console.log('Получили список задач заказчика')
    }

    async getOneTask(req, res){     
        const id = req.params.id;
        const isCached = await cache.get(`task ${id}`)
        if (isCached) {
            return res.json(isCached)
        } 
        const task = await db.query(`SELECT * FROM task WHERE id =$1`, [id])
        res.json(task.rows[0])
        cache.add(`task ${id}`, task.rows[0])
        console.log('Получили задачу')
    }

    async updateTask(req, res){
        const {taskname, taskstartdate, taskfinishdate, employer_id, id} = req.body
        const newTask = await db.query(`UPDATE task SET taskname = $1, taskstartdate = $2, taskfinishdate = $3, employer_id = $4 
                                WHERE id = $5 RETURNING *`, [taskname, taskstartdate, taskfinishdate, employer_id, id])
        res.json(newTask.rows[0])
        cache.clear(`task ${id}`);
        cache.clear('tasks');
        console.log('Обновили задачу')
    }

    async deleteTask(req, res){
        const id = req.params.id
        const task = await db.query(`UPDATE task SET isDeleted = true WHERE id =$1 AND isDeleted = false RETURNING *`, [id])    
        res.json(task.rows[0])
        cache.clear(`task ${id}`);
        cache.clear('tasks');
        console.log('Удалили задачу')
    }

    async isUsedCache(req, res) {
        const key = await cache.getLastKey()
        if (key) {
            return res.json(`В последнем get запросе использовался кеш с ключом ${key}`)
        }
        res.json("В последнем get запросе не использовался кеш")
    }
}

module.exports = new TaskController()