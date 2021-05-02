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

router.get('/yandex/callback', passport.authenticate('yandex'),
    async (req, res) => {
        res.render('home', {
            username: await req.user.login
        })
    })

router.get('/tokens', async (req, res) => {
    console.log(await req.user)
    res.render('tokens', {
        accessToken: await req.user.accessToken,
        refreshToken: await req.user.refreshToken
    })
})

router.post('/refresh', authenticationController.refreshTokens)

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;