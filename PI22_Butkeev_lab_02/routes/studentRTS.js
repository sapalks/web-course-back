const Router = require('express')
const router = new Router();
const controller = require('../controller/studentCTRL')

router.get('/students', controller.getAllStudents) //список всех студентов
router.get('/students/:klassID', controller.getStudentInClass) //список студентов по указанному классу
router.get('/student/:id', controller.getStudent) //студент по id
router.post('/student', controller.createStudent) //создает запись с новым студентом
router.put('/student', controller.updateStudent) //редактирует запись в таблице студентов
router.delete('/student/:id', controller.deleteStudent) //помечает запись с студентом удаленной

module.exports = router;