const Router = require('express')
const router = new Router()
const userController = require('../Controller/Users')

router.post('/users', userController.createUser)
router.get('/users', userController.getUsers)
router.put('/users', userController.updateUser)
router.delete('/users', userController.deleteUser)


module.exports = router