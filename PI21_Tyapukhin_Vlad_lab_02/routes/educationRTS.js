const Router = require('express')
const router = new Router();
const controller = require('../controller/educationCTRL')

router.get('/educations', controller.geAllEducations) //получает список всех специальностей
router.get('/education/:id', controller.getEducation) //получает специальность по id
router.post('/education', controller.createEducation) //создает запись с новой специальностью
router.put('/education', controller.updateEducation) //редактирует запись в таблице специальностей
router.delete('/education/:id', controller.deleteEducation) //помечает запись со специальностью удаленной

module.exports = router;