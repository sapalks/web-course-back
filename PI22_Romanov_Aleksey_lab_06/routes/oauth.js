const Router = require('express')
const router = new Router()
const passport = require("passport")
const oauth = require('../controller/oauth.js')

router.get('/index', oauth.index)
router.get('/enter', passport.authenticate('yandex'))
router.get('/logout', oauth.logout)
router.get('/auth', oauth.auth)
router.get('/tokens', oauth.tokens)
router.get('/updateToken', oauth.updateToken)

module.exports = router