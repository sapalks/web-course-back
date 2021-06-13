const Router = require('express')
const router = new Router();
const controller = require('../controller/user.controller.js')

router.post('/register', controller.register)
router.post('/login', controller.login)

module.exports = router;