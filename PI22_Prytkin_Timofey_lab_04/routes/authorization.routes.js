const { Router } = require('express')
const router = new Router()
const authorizationController = require('../controllers/authorization.controller')

router.post('/register', authorizationController.register)
router.post('/login', authorizationController.login)

module.exports = router