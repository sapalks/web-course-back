const Router = require('express');
const router = new Router();
const passport = require("passport");
const oauth = require('../controllers/OAuth.js');
require('../middleware/passport')(passport);

router.get('/main', oauth.main);
router.get('/enter', passport.authenticate('yandex'));
router.get('/logout', oauth.logout);
router.get('/OAuth', oauth.auth)
router.get('/token', oauth.token);
router.get('/updateToken', oauth.updateToken);

module.exports = router;