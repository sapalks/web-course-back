var Router = require("express");
var router = new Router();
var userContoller = require("../controllers/User");

router.post("/register", userContoller.registerUser)
router.post("/login", userContoller.loginUser)


module.exports = router;