const Router = require('express');
const router = new Router();
const passport = require("passport");
const authorizationController = require('./authorizationController.js');
require('./passport.js')(passport);

router.get('/main', authorizationController.main);
router.get('/enter', passport.authenticate('yandex'));
router.get('/logout', authorizationController.logout);
router.get('/authorization', authorizationController.authorization)
router.get('/token', authorizationController.token);
router.get('/updateToken', authorizationController.updateToken);

module.exports = router;