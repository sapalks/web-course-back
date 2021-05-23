const Router = require('express')
const router = new Router();
const controller = require('../Controllers/AuthorizationController.js')

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router;