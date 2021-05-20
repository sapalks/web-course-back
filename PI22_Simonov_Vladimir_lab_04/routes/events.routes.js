const Router = require('express');
const router = new Router();
const events = require('../controllers/event.controller.js');
const passport = require("passport");

router.post('/events', passport.authenticate('jwt', { session: false }), events.create);
router.put('/events', passport.authenticate('jwt', { session: false }), events.update);
router.delete('/events', passport.authenticate('jwt', { session: false }), events.delete);
router.get('/events', events.read);
router.get('/event', events.readByUser);

module.exports = router;