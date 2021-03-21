const Router = require('express')
const router = new Router();
const bookController = require('../controller/book.controller')

router.post('/book', bookController.createBook)
router.get('/books', bookController.getBooks)
router.get('/books/:id', bookController.getAutorBooks)
router.get('/book/:id', bookController.getBook)
router.put('/book', bookController.updateBook)
router.delete('/book/:id', bookController.deleteBook)

module.exports = router;