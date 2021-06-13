const Router = require("express");
const router = new Router();
const classController = require("../controllers/class.controller");

router.post("/class", classController.createclass)
router.get("/class", classController.getclass)
router.get("/classes", classController.getclasses)
router.put("/class", classController.updateclass)
router.delete("/class", classController.deleteclass)

module.exports = router;