const Router = require('express')
const router = new Router()
const userController = require('../controller/user')
const passport = require('passport')

router.post('/user', passport.authenticate('jwt', { session: false }), userController.createUser)
router.get('/user', userController.getUsers)
router.put('/user', passport.authenticate('jwt', { session: false }), userController.updateUser)
router.delete('/user', passport.authenticate('jwt', { session: false }), userController.deleteUser)


module.exports = router