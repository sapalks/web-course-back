const Router = require("express");
const router = new Router();
const bookController = require("../controllers/book.controller");

router.post("/book", bookController.createBook)
router.get("/books", bookController.getBooks)
router.get("/book", bookController.getBook)
router.put("/book", bookController.updateBook)
router.delete("/book", bookController.deleteBook)

module.exports = router;