var Router = require("express");
var router = new Router();
var commentContoller = require("../controllers/comment.controller");
const passport = require("passport");

router.post("/comment", passport.authenticate('jwt', { session: false }), commentContoller.createComment)
router.get("/comment/:id", commentContoller.getComment)
router.get("/comments", commentContoller.getComments)
router.put("/comment", passport.authenticate('jwt', { session: false }), commentContoller.updateComment)
router.delete("/comment/:id", passport.authenticate('jwt', { session: false }), commentContoller.deleteComment)

module.exports = router;