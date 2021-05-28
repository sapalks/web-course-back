const Router = require('express')
const router = new Router();
const controller = require('../controller/bookCTRL')

router.get('/books', controller.geAllBooks) //получает список всех книг
router.get('/books/:authorID', controller.getBookInAuthors) //получает все книги по указанному автору
router.get('/book/:id', controller.getBook) //получает книгу по id
router.post('/book', controller.createBook) //создает запись с новой книгой
router.put('/book', controller.updateBook) //редактирует запись в таблице книг
router.delete('/book/:id', controller.deleteBook) //помечает запись с удаленной книгой

module.exports = router;

