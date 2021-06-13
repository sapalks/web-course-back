const Router = require("express");
const router = new Router();
const classController = require("../controllers/class.controller");
const passport = require('passport')

router.post("/class", passport.authenticate('jwt', {session: false}), classController.createclass)
router.get("/class", classController.getclass)
router.get("/classes", classController.getclasses)
router.put("/class", passport.authenticate('jwt', {session: false}), classController.updateclass)
router.delete("/class", passport.authenticate('jwt', {session: false}), classController.deleteclass)

module.exports = router;