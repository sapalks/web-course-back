const Router = require('express')
const router = new Router();
const controller = require('../controller/threadCTRL');
const passport = require('passport');

router.get('/threads', controller.getAllThreads) //получает список всех обсуждений
router.get('/threads/:description', controller.getThreadInDescription) //получает всех обсуждений по описанию
router.get('/thread/:id', controller.getThread) //получает обсуждение по id
router.post('/thread', passport.authenticate('jwt',{session: false}), controller.createThread) //создает запись с новым обсуждением
router.put('/thread', passport.authenticate('jwt',{session: false}), controller.updateThread) //редактирует запись в таблице обсуждений
router.delete('/thread/:id', passport.authenticate('jwt',{session:false}), controller.deleteThread) //удаляет обсуждение

module.exports = router;