const Router = require('express')
const router = new Router();
const controller = require('../controller/classCTRL')

router.get('/classes', controller.getAllClasses) //список всех классов
router.get('/class/:id', controller.getClass) //класс по id
router.post('/class', controller.createClass) //создает запись с новым классом
router.put('/class', controller.updateClass) //редактирует запись в таблице классов
router.delete('/class/:id', controller.deleteClass) //помечает запись с классом удаленной

module.exports = router;