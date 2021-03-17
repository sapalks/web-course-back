const Router = require('express');
const router = new Router();
const countries = require('../controllers/countries.controller.js');

router.post('/countries', countries.create);
router.get('/countries', countries.read);
router.put('/countries', countries.update);
router.delete('/countries', countries.delete);

module.exports = router;