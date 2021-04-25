const Router = require('express')
const router = new Router();
const controller = require('../Controllers/AuthController.js')

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router;