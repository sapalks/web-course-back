const Router = require('express')
const router = new Router();
const controller = require('../controllers/vacancyC');

//create
router.post('/vacancy', controller.create);
//read
router.get('/vacancyes', controller.readAll);
router.get('/vacancy/:vacancyId', controller.readOne);
//update
router.put('/vacancy', controller.update);
//delete
router.delete('/vacancy/:vacancyId', controller.delete);
//cached
router.get('/cached', controller.isCached);

module.exports = router;