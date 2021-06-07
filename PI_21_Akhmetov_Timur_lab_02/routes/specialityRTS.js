const Router = require('express')
const router = new Router();
const controller = require('../controller/specialityCTRL')

router.get('/specialities', controller.geAllSpecs) //получает список всех специальностей
router.get('/speciality/:id', controller.getSpec) //получает специальность по id
router.post('/speciality', controller.createSpec) //создает запись с новой специальностью
router.put('/speciality', controller.updateSpec) //редактирует запись в таблице специальностей
router.delete('/speciality/:id', controller.deleteSpec) //помечает запись со специальностью удаленной

module.exports = router;