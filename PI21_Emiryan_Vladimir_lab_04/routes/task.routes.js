const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')
const passport = require('passport')

router.post('/task',  passport.authenticate('jwt', { session: false }), taskController.createTask)
router.get('/task', taskController.getTasks)
router.get('/task/:id', taskController.getTask)
router.put('/task', passport.authenticate('jwt', { session: false }), taskController.updateTask)
router.delete('/task/:id', passport.authenticate('jwt', { session: false }), taskController.deleteTask)

module.exports = router