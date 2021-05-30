const Router = require('express');
const router = new Router();
const passport = require("passport");
const oauthController = require('../controllers/oauth.controller');
require('../passport/passport')(passport);

router.get('/main', oauthController.main);
router.get('/enter', passport.authenticate('yandex'));
router.get('/logout', oauthController.logout);
router.get('/auth', oauthController.auth)
router.get('/token', oauthController.token);
router.get('/updateToken', oauthController.updateToken);

module.exports = router;