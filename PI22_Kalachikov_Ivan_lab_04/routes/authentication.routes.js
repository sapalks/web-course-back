const Router = require("express");
const router = new Router();
const authenticationController = require("../controllers/authentication.controller");
const {body} = require("express-validator");

router.post("/register",
    body("username").isLength({min: 4}),
    body("password").isLength({min: 6}),
    authenticationController.register)

router.post("/login",
    body("username").isLength({min: 4}),
    body("password").isLength({min: 6}),
    authenticationController.login)

module.exports = router;