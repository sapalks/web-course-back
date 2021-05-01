const Router = require('express')
const router = new Router();
const controller = require('../controllers/vacancyC');

//create
router.post('/vacancy', controller.create);
//read
router.get('/vacancyes', controller.readAll);
router.get('/vacancy/:vacancyId', controller.readOne);
router.get('/vacancyes/:firmId', controller.readFiltred);
//update
router.put('/vacancy', controller.update);
//delete
router.delete('/vacancy/:vacancyId', controller.delete);

module.exports = router;