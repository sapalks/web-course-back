const Router = require("express");
const router = new Router();
const topicController = require("../controllers/topic.controller");
const passport = require('passport')

router.post("/topic", passport.authenticate('jwt', {session: false}), topicController.createTopic)
router.get("/topic", topicController.getTopic)
router.get("/topics", topicController.getTopics)
router.put("/topic", passport.authenticate('jwt', {session: false}), topicController.updateTopic)
router.delete("/topic", passport.authenticate('jwt', {session: false}), topicController.deleteTopic)

module.exports = router;