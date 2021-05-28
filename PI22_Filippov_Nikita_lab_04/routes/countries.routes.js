const Router = require('express');
const router = new Router();
const countries = require('../controllers/countries.controller.js');
const passport = require("passport");

router.post('/countries', passport.authenticate('jwt', { session: false }), countries.create);
router.get('/countries', countries.read);
router.put('/countries', passport.authenticate('jwt', { session: false }), countries.update);
router.delete('/countries', passport.authenticate('jwt', { session: false }), countries.delete);

module.exports = router;