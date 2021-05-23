const Router = require('express')
const router = new Router();
const controller = require('../controller/userCTRL')

router.post('/register', controller.register) //создает запись с новым пользователем
router.post('/login', controller.login) //авторизует существующего пользователем

module.exports = router;