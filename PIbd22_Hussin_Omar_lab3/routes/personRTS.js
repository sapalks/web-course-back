const Router = require('express')
const router = new Router();
const controller = require('../controller/personCTRL')

router.get('/persons', controller.getAllpersons) 
router.get('/persons/:roomID', controller.getpersonInrooms) 
router.get('/person/:id', controller.getperson) 
router.post('/person', controller.createperson)
router.put('/person', controller.updateperson) 
router.delete('/person/:id', controller.deleteperson) 

module.exports = router;