const Router = require('express');
const router = new Router();
const passport = require("passport");
const authorizationController = require('../controllers/authorizationController');
require('../passport')(passport);

router.get('/main', authorizationController.main);
router.get('/signIn', passport.authenticate('yandex'));
router.get('/signOut', authorizationController.signOut);
router.get('/auth', authorizationController.auth)
router.get('/tokens', authorizationController.tokens);
router.get('/updatetokens', authorizationController.updateTokens);

module.exports = router; 