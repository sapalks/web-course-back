const Router = require('express')
const router = new Router();
const controller = require('../controller/roomsCTRL')

router.get('/rooms', controller.geAllrooms) //получает список всех специальностей
router.get('/rooms/:id', controller.getrooms) //получает специальность по id
router.post('/rooms', controller.createrooms) //создает запись с новой специальностью
router.put('/rooms', controller.updaterooms) //редактирует запись в таблице специальностей
router.delete('/rooms/:id', controller.deleterooms) //помечает запись со специальностью удаленной

module.exports = router;