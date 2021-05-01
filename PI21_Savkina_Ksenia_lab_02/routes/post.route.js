var Router = require("express");
var router = new Router();
var postContoller = require("../controllers/post.controller");

router.post("/post", postContoller.createPost)
router.get("/post/:id", postContoller.getPost)
router.get("/posts", postContoller.getPosts)
router.put("/post", postContoller.updatePost)
router.delete("/post/:id", postContoller.deletePost)

module.exports = router;