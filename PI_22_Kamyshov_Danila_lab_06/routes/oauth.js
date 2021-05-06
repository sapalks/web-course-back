const Router = require('express');
const router = new Router();
const passport = require("passport");
const oauth = require('../controllers/oauth');
require('../middleware/passport')(passport);

router.get('/main', oauth.main);
router.get('/enter', passport.authenticate('yandex'));
router.get('/logout', oauth.logout);
router.get('/auth', oauth.auth)
router.get('/token', oauth.token);
router.get('/updateToken', oauth.updateToken);

module.exports = router; 