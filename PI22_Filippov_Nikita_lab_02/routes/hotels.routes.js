const Router = require('express');
const router = new Router();
const hotels = require('../controllers/hotels.controller.js');

router.post('/hotels', hotels.create);
router.get('/hotels', hotels.readByCountrie);
router.get('/hotel', hotels.read);
router.put('/hotels', hotels.update);
router.delete('/hotels', hotels.delete);

module.exports = router;