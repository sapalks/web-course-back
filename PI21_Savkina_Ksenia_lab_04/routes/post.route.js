var Router = require("express");
var router = new Router();
var postContoller = require("../controllers/post.controller");
const passport = require("passport");

router.post("/post", passport.authenticate('jwt', { session: false }), postContoller.createPost)
router.get("/post/:id", postContoller.getPost)
router.get("/posts", postContoller.getPosts)
router.put("/post", passport.authenticate('jwt', { session: false }), postContoller.updatePost)
router.delete("/post/:id", passport.authenticate('jwt', { session: false }), postContoller.deletePost)

module.exports = router;