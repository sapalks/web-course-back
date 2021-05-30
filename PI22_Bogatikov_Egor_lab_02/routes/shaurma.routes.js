const Router = require("express");
const router = new Router();
const shaurmaController = require("../controllers/shaurma.controller");

router.post("/shaurma", shaurmaController.createShaurma)
router.get("/shaurma", shaurmaController.getShaurma)
router.get("/shaurmas", shaurmaController.getShaurmas)
router.put("/shaurma", shaurmaController.updateShaurma)
router.delete("/shaurma", shaurmaController.deleteShaurma)

module.exports = router;