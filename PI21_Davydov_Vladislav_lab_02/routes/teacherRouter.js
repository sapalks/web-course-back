const Router = require('express')
const router = new Router();
const controller = require('../controller/teacherController')

router.get('/teachers', controller.getAllTeachers) 
router.get('/teachers/:subjectID', controller.getTeacherInSubjects) 
router.get('/teacher/:id', controller.getTeacher) 
router.post('/teacher', controller.createTeacher) 
router.put('/teacher', controller.updateTeacher) 
router.delete('/teacher/:id', controller.deleteTeacher)

module.exports = router;