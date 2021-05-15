const Router = require('express')
const router = new Router()
const userController = require('../Controller/Users')
const passport = require('passport')

router.post('/users', passport.authenticate('jwt', { session: false }), userController.createUser)
router.get('/users', userController.getUsers)
router.put('/users', passport.authenticate('jwt', { session: false }), userController.updateUser)
router.delete('/users', passport.authenticate('jwt', { session: false }), userController.deleteUser)


module.exports = router