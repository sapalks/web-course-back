const Router = require("express");
const router = new Router();
const carController = require("../controllers/car.controller");
const passport = require('passport')

router.post("/car", passport.authenticate('jwt', {session: false}), carController.createcar)
router.get("/cars", carController.getcars)
router.get("/car", carController.getcar)
router.put("/car", passport.authenticate('jwt', {session: false}), carController.updatecar)
router.delete("/car", passport.authenticate('jwt', {session: false}), carController.deletecar)

module.exports = router;