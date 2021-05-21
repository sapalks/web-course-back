const Router = require('express');
const router = new Router();
const controller = require('../controllers/sushi_barController');
//create
router.post('/sushi_bar', controller.create);
//read
router.get('/sushi_bars', controller.readAll);
router.get('/sushi_bar/:sushi_barId', controller.readOne);
//update
router.put('/sushi_bar', controller.update);
//delete
router.delete('/sushi_bar/:sushi_barId', controller.delete);

module.exports = router;