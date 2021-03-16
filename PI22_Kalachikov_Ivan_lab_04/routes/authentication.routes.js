const Router = require("express");
const router = new Router();
const authenticationController = require("../controllers/authentication.controller");

router.post("/register", authenticationController.register)
router.post("/login", authenticationController.login)

module.exports = router;