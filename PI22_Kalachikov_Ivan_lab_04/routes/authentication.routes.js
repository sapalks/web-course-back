const Router = require("express");
const router = new Router();
const authenticationController = require("../controllers/authentication.controller");

router.get("/register", authenticationController.register)
router.get("/login", authenticationController.login)

module.exports = router;