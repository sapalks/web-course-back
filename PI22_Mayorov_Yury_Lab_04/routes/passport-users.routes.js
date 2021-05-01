const Router = require('express');
const router = new Router();
const passportUsers = require('../controllers/passport-users.controller.js');

router.post('/register', passportUsers.register);
router.post('/login', passportUsers.login);

module.exports = router;