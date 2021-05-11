const Router = require('express');
const router = new Router();
const events = require('../controllers/event.contoller.js');

router.post('/events', events.create);
router.put('/events', events.update);
router.delete('/events', events.delete);
router.get('/events', events.read);
router.get('/event', events.readByUser);

module.exports = router;