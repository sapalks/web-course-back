const Router = require('express')
const router = new Router()
const controller = require('../controllers/clientcontroller')

router.post('/register', controller.register)
router.post('/login', controller.login)


module.exports = router