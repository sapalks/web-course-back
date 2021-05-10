const Router = require('express')
const router = new Router();
const controller = require('../controller/messageCTRL')

router.get('/messages', controller.getAllMessages) //получает список всех сообщений
router.get('/messages/:threadid', controller.getMessageInThread) //получает всех сообщений по обсуждению
router.get('/message/:id', controller.getMessage) //получает сообщение по id
router.post('/message', controller.createMessage) //создает запись с новым сообщением
router.put('/message', controller.updateMessage) //редактирует запись в таблице сообщений
router.delete('/message/:id', controller.deleteMessage) //удаляет сообщение

module.exports = router;