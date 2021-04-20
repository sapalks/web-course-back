const Router = require('express');
const router = new Router();
const roles = require('../controllers/role.contoller.js');
const passport = require("passport");

router.post('/roles', passport.authenticate('jwt', {session: false}), roles.create);
router.put('/roles', passport.authenticate('jwt', { session: false }), roles.update);
router.delete('/roles', passport.authenticate('jwt', { session: false }), roles.delete);
router.get('/roles', roles.read);

module.exports = router;