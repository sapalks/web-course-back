const { Router } = require('express')
const router = new Router()
const TaskController = require('../controllers/task.controller')

router.post('/task', TaskController.createTask)
router.get('/task', TaskController.getTasks)
router.get('/task/employer/:employer_id', TaskController.getEmployerTasks)
router.get('/task/:id', TaskController.getOneTask)
router.put('/task', TaskController.updateTask)
router.delete('/task/:id', TaskController.deleteTask)

module.exports = router