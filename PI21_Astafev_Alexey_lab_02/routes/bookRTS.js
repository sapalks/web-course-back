const Router = require('express')
const router = new Router();
const controller = require('../controller/bookCTRL')

router.get('/books', controller.getAllBooks) //получает список всех книг
router.get('/books/:authorID', controller.getBookToAuthor) //получает всех книг по указанному автору
router.get('/book/:id', controller.getBook) //получает книгу по id
router.post('/book', controller.createBook) //создает запись с новой книгой
router.put('/book', controller.updateBook) //редактирует запись в таблице книг
router.delete('/book/:id', controller.deleteBook) //помечает запись с книгой удаленной

module.exports = router;