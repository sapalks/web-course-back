const Router = require('express')
const router = new Router();
const bookController = require('../controller/book.controller')
const passport = require('passport')

router.post('/book',passport.authenticate('jwt', { session: false }), bookController.createBook)
router.get('/books', bookController.getBooks)
router.get('/books/:id', bookController.getAutorBooks)
router.get('/book/:id', bookController.getBook)
router.put('/book', passport.authenticate('jwt', { session: false }), bookController.updateBook)
router.delete('/book/:id', passport.authenticate('jwt', { session: false }), bookController.deleteBook)

module.exports = router;