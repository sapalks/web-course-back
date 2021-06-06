const Router = require('express')
const router = new Router();
const controller = require('../controller/roomCTRL')

router.get('/rooms', controller.geAllrooms) 
router.get('/room/:id', controller.getroom) 
router.get('/roomCached', controller.isCached)
router.post('/room', controller.createroom) 
router.put('/room', controller.updateroom) 
router.delete('/room/:id', controller.deleteroom) 

module.exports = router;