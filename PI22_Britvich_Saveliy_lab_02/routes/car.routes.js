const Router = require("express");
const router = new Router();
const carController = require("../controllers/car.controller");

router.post("/car", carController.createcar)
router.get("/cars", carController.getcars)
router.get("/car", carController.getcar)
router.put("/car", carController.updatecar)
router.delete("/car", carController.deletecar)

module.exports = router;