const Router = require('express')
const router = new Router();
const controller = require('../controller/directionController')

router.get('/directions', controller.getDirections)
router.get('/direction/:id', controller.getDirection)
router.post('/direction', controller.createDirection) 
router.put('/direction', controller.updateDirection)
router.delete('/direction/:id', controller.deleteDirection) 

module.exports = router;