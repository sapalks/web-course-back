const Router = require("express");
const router = new Router();
const bookController = require("../controllers/book.controller");
const passport = require('passport')

router.post("/book", passport.authenticate('jwt', {session: false}), bookController.createBook)
router.get("/books", bookController.getBooks)
router.get("/book", bookController.getBook)
router.put("/book", passport.authenticate('jwt', {session: false}), bookController.updateBook)
router.delete("/book", passport.authenticate('jwt', {session: false}), bookController.deleteBook)

module.exports = router;