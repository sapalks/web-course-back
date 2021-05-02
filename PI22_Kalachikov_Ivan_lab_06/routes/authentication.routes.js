const Router = require("express");
const router = new Router();
const authenticationController = require("../controllers/authentication.controller");
const {body} = require("express-validator");
const passport = require("passport")

router.post("/register",
    body("username").isLength({min: 4}),
    body("password").isLength({min: 6}),
    authenticationController.register)

router.post("/login",
    body("username").isLength({min: 4}),
    body("password").isLength({min: 6}),
    authenticationController.login)

router.get("/yandex", passport.authenticate('yandex'))

router.get('/yandex/callback', authenticationController.getTokens)

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/refresh', authenticationController.refreshTokens)

module.exports = router;