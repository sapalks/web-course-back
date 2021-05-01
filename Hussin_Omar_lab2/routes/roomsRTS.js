const Router = require('express')
const router = new Router();
const controller = require('../controller/roomsCTRL')

router.get('/rooms', controller.geAllrooms) 
router.get('/rooms/:id', controller.getrooms) 
router.post('/rooms', controller.createrooms) 
router.put('/rooms', controller.updaterooms) 
router.delete('/rooms/:id', controller.deleterooms) 

module.exports = router;