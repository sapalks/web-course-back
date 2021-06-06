const Router = require('express');
const router = new Router();
const passport = require("passport");
const oauthorizationController = require('../controllers/auth.controller');
require('../passport')(passport);

router.get('/main', oauthorizationController.main);
router.get('/signIn', passport.authenticate('yandex'));
router.get('/signOut', oauthorizationController.signOut);
router.get('/auth', oauthorizationController.auth)
router.get('/tokens', oauthorizationController.tokens);
router.get('/update', oauthorizationController.update);

module.exports = router; 