const Router = require('express');
const router = new Router();
const hotels = require('../controllers/hotels.controller.js');
const passport = require("passport");

router.post('/hotels', passport.authenticate('jwt', { session: false }), hotels.create);
router.get('/hotels', hotels.readByCountrie);
router.get('/hotel', hotels.read);
router.put('/hotels', passport.authenticate('jwt', { session: false }), hotels.update);
router.delete('/hotels', passport.authenticate('jwt', { session: false }), hotels.delete);

module.exports = router;