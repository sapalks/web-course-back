const Router = require('express')
const router = new Router();
const controller = require('../controller/personCTRL')

router.get('/persons', controller.getAllpersons) //получает список всех студентов
router.get('/persons/:roomID', controller.getpersonInrooms) //получает всех студентов по указанной специальности
router.get('/person/:id', controller.getperson) //получает студента по id
router.post('/person', controller.createperson) //создает запись с новым студентом
router.put('/person', controller.updateperson) //редактирует запись в таблице студентов
router.delete('/person/:id', controller.deleteperson) //помечает запись со студентом удаленной

module.exports = router;