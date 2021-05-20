const Router = require('express');
const router = new Router();
const passport = require('../controllers/passport.controller.js');

router.post('/register', passport.register);
router.post('/login', passport.login);

module.exports = router;