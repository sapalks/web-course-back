const Router = require('express')
const router = new Router();
const controller = require('../controller/threadCTRL')

router.get('/threads', controller.getAllThreads) //получает список всех обсуждений
router.get('/threads/:description', controller.getThreadInDescription) //получает всех обсуждений по описанию
router.get('/thread/:id', controller.getThread) //получает обсуждение по id
router.post('/thread', controller.createThread) //создает запись с новым обсуждением
router.put('/thread', controller.updateThread) //редактирует запись в таблице обсуждений
router.delete('/thread/:id', controller.deleteThread) //удаляет обсуждение

module.exports = router;