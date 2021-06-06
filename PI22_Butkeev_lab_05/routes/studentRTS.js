const Router = require('express')
const router = new Router();
const controller = require('../controller/studentCTRL')
const passport = require('passport')

router.get('/students', controller.geAllStudents) //список всех студентов
router.get('/students/:teamID', controller.getStudentInClasses) //список студентов по указанному классу
router.get('/student/:id', controller.getStudent) //студент по id
router.post('/student', passport.authenticate('jwt', { session: false }), controller.createStudent) //создает запись с новым студентом
router.put('/student', passport.authenticate('jwt', { session: false }), controller.updateStudent) //редактирует запись в таблице студентов
router.delete('/student/:id', passport.authenticate('jwt', { session: false }), controller.deleteStudent) //помечает запись с студентом удаленным

module.exports = router;