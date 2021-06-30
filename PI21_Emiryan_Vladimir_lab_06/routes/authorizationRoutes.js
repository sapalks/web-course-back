const Router = require('express');
const router = new Router();
const passport = require("passport");
const authorizationController = require('../controller/authorizationController');
require('../passport.js')(passport);

router.get('/index', authorizationController.index);
router.get('/enter', passport.authenticate('yandex'));
router.get('/logout', authorizationController.logout);
router.get('/authorization', authorizationController.authorization)
router.get('/account', authorizationController.account);
router.get('/updateToken', authorizationController.updateToken);

module.exports = router;