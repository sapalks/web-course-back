const Router = require('express')
const router = new Router();
const controller = require('../controller/authorCTRL')

router.get('/authors', controller.getAllAuthors) //получает список всех авторов
router.get('/author/:id', controller.getAuthor) //получает автора по id
router.post('/author', controller.createAuthor) //создает запись с новым автором
router.put('/author', controller.updateAuthor) //редактирует запись в таблице авторов
router.delete('/author/:id', controller.deleteAuthor) //помечает запись с автором удаленной

module.exports = router;