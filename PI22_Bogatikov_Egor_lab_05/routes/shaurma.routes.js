const Router = require("express");
const router = new Router();
const shaurmaController = require("../controllers/shaurma.controller");
const passport = require('passport')

router.post("/shaurma", passport.authenticate('jwt', {session: false}), shaurmaController.createShaurma)
router.get("/shaurma", shaurmaController.getShaurma)
router.get("/shaurmas", shaurmaController.getShaurmas)
router.put("/shaurma", passport.authenticate('jwt', {session: false}), shaurmaController.updateShaurma)
router.delete("/shaurma", passport.authenticate('jwt', {session: false}), shaurmaController.deleteShaurma)

module.exports = router;