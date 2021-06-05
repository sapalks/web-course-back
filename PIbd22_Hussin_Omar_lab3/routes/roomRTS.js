const Router = require('express')
const router = new Router();
const controller = require('../controller/roomCTRL')

router.get('/rooms', controller.getAllrooms) //получает список всех специальностей
router.get('/room/:id', controller.getroom) //получает специальность по id
router.post('/room', controller.createroom) //создает запись с новой специальностью
router.put('/room', controller.updateroom) //редактирует запись в таблице специальностей
router.delete('/room/:id', controller.deleteroom) //помечает запись со специальностью удаленной

module.exports = router;