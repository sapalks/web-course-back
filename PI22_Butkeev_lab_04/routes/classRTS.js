const Router = require('express')
const router = new Router();
const controller = require('../controller/classCTRL')
const passport = require('passport')

router.get('/classes', controller.getAllClasses) //список всех классов
router.get('/class/:id', controller.getClass) //класс по id
router.post('/class', passport.authenticate('jwt', { session: false }), controller.createClass) //создает запись с новым классов
router.put('/class', passport.authenticate('jwt', { session: false }), controller.updateClass) //редактирует запись в таблице классов
router.delete('/class/:id', passport.authenticate('jwt', { session: false }), controller.deleteClass) //помечает запись с классом удаления 

module.exports = router;