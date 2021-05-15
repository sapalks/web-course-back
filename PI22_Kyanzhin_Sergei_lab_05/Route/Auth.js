  
const Router = require('express')
const router = new Router()
const authController = require('../Controller/Auth')

router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router