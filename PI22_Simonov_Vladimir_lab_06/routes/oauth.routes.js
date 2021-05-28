const Router = require('express');
const router = new Router();
const passport = require("passport");
const oauth = require('../controllers/oauth.controller.js');
require('../configs/passport')(passport);

router.get('/index', oauth.index);
router.get('/login', passport.authenticate('yandex'));
router.get('/auth', oauth.auth)
router.get('/token', oauth.token);
router.get('/updateToken', oauth.updateToken);
router.get('/logout', oauth.logout);

module.exports = router;