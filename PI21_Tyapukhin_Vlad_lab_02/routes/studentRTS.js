const Router = require('express')
const router = new Router();
const controller = require('../controller/studentCTRL')

router.get('/students', controller.geAllStudents) //получает список всех студентов
router.get('/students/:educationID', controller.getStudentInEducations) //получает всех студентов по указанной специальности
router.get('/student/:id', controller.getStudent) //получает студента по id
router.post('/student', controller.createStudent) //создает запись с новым студентом
router.put('/student', controller.updateStudent) //редактирует запись в таблице студентов
router.delete('/student/:id', controller.deleteStudent) //помечает запись со студентом удаленной

module.exports = router;