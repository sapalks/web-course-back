const Router = require("express");
const router = new Router();
const topicController = require("../controllers/topic.controller");

router.post("/topic", topicController.createTopic)
router.get("/topic", topicController.getTopic)
router.get("/topics", topicController.getTopics)
router.put("/topic", topicController.updateTopic)
router.delete("/topic", topicController.deleteTopic)

module.exports = router;