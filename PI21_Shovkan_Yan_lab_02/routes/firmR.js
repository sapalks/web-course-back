const Router = require('express');
const router = new Router();
const controller = require('../controllers/firmC');
//create
router.post('/firm', controller.create);
//read
router.get('/firms', controller.readAll);
router.get('/firm/:firmId', controller.readOne);
//update
router.put('/firm', controller.update);
//delete
router.delete('/firm/:firmId', controller.delete);

module.exports = router;