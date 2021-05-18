const Router = require('express')
const router = new Router();
const controller = require('../controller/usersCTRL')

router.post('/register', controller.Register) //registration of user
router.post('/login', controller.Login) //registration of user

module.exports = router;