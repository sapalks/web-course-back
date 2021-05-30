const Router = require("express");
const router = new Router();
const fillingController = require("../controllers/filling.controller");

router.post("/filling", fillingController.createFilling)
router.get("/fillings", fillingController.getFillings)
router.get("/filling", fillingController.getFilling)
router.put("/filling", fillingController.updateFilling)
router.delete("/filling", fillingController.deleteFilling)

module.exports = router;