var Router = require("express");
var router = new Router();
var commentContoller = require("../controllers/comment.controller");

router.post("/comment", commentContoller.createComment)
router.get("/comment/:id", commentContoller.getComment)
router.get("/comments", commentContoller.getComments)
router.put("/comment", commentContoller.updateComment)
router.delete("/comment/:id", commentContoller.deleteComment)

module.exports = router;