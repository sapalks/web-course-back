const Router = require("express");
const router = new Router();
const vehicleController = require("../controllers/vehicle.controller");
const passport = require('passport')

router.post("/vehicle", passport.authenticate('jwt', {session: false}), vehicleController.createvehicle)
router.get("/vehicles", vehicleController.getvehicles)
router.get("/vehicle", vehicleController.getvehicle)
router.put("/vehicle", passport.authenticate('jwt', {session: false}), vehicleController.updatevehicle)
router.delete("/vehicle", passport.authenticate('jwt', {session: false}), vehicleController.deletevehicle)

module.exports = router;