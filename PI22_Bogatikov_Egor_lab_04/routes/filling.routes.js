const Router = require("express");
const router = new Router();
const fillingController = require("../controllers/filling.controller");
const passport = require('passport')

router.post("/filling",passport.authenticate('jwt', {session: false}), fillingController.createFilling)
router.get("/fillings", fillingController.getFillings)
router.get("/filling", fillingController.getFilling)
router.put("/filling", passport.authenticate('jwt', {session: false}), fillingController.updateFilling)
router.delete("/filling", passport.authenticate('jwt', {session: false}), fillingController.deleteFilling)

module.exports = router;