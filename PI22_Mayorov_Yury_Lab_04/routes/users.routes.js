const Router = require('express');
const router = new Router();
const users = require('../controllers/user.controller.js');
const passport = require("passport");

router.post('/users', passport.authenticate('jwt', { session: false }), users.create);
router.get('/user', users.readByRole);
router.get('/users', users.read);
router.put('/users', passport.authenticate('jwt', { session: false }), users.update);
router.delete('/users', passport.authenticate('jwt', { session: false }), users.delete);

module.exports = router;