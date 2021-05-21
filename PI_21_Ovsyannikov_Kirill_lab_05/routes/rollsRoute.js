const Router = require('express')
const router = new Router();
const controller = require('../controllers/rollsController');

//create
router.post('/rolls', controller.create);
//read
router.get('/rollses', controller.readAll);
router.get('/rolls/:rollsId', controller.readOne);
router.get('/rollses/:sushi_barId', controller.readFiltred);
//update
router.put('/rolls', controller.update);
//delete
router.delete('/rolls/:rollsId', controller.delete);

module.exports = router;