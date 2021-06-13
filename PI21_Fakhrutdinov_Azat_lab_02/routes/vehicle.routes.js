const Router = require("express");
const router = new Router();
const vehicleController = require("../controllers/vehicle.controller");

router.post("/vehicle", vehicleController.createvehicle)
router.get("/vehicles", vehicleController.getvehicles)
router.get("/vehicle", vehicleController.getvehicle)
router.put("/vehicle", vehicleController.updatevehicle)
router.delete("/vehicle", vehicleController.deletevehicle)

module.exports = router;