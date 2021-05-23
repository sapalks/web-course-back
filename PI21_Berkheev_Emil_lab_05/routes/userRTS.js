const Router = require('express')
const router = new Router();
const controller = require('../controller/userCTRL')

router.post('/register', controller.register) //создаем запись с новым пользователем
router.post('/login', controller.login) //авторизуем существующего пользователем

module.exports = router;