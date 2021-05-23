const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.js')

router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router