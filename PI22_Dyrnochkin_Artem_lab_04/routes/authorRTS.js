const Router = require('express')
const router = new Router();
const controller = require('../controller/authorCTRL')
const passport = require('passport')

router.get('/authors', controller.geAllAuthors) //получает список всех авторов
router.get('/author/:id', controller.getAuthor) //получает авторов по id
router.post('/author', passport.authenticate('jwt', { session: false }), controller.createAuthor) //создает запись с новым автором 
router.put('/author', passport.authenticate('jwt', { session: false }), controller.updateAuthor) //редактирует запись в таблице авторов
router.delete('/author/:id', passport.authenticate('jwt', { session: false }), controller.deleteAuthor) //помечает запись с автором удаленной

module.exports = router;