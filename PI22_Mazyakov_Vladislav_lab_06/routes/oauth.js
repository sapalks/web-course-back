const Router = require('express');
const router = new Router();
const passport = require("passport");
const oauthController = require('../controller/oauth');

router.get('/main', oauthController.main);
router.get('/auth', oauthController.auth)
router.get('/enter', passport.authenticate('yandex'));
router.get('/token', oauthController.token);
router.get('/updateToken', oauthController.updateToken);

module.exports = router;
