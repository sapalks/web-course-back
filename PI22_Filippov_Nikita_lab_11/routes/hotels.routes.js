const Router = require('express');
const router = new Router();
const hotels = require('../controllers/hotels.controller.js');

router.post('/hotels', hotels.create);
router.get('/hotel', hotels.readByCountrie);
router.get('/hotels/checkCache',hotels.checkCache);
router.get('/hotels', hotels.read);
router.put('/hotels', hotels.update);
router.delete('/hotels', hotels.delete);

module.exports = router;