const Router = require('express')
const router = new Router();
const controller = require('../controllers/contract')

router.get('/contracts', controller.geAllContracts) 
router.get('/contract/:id', controller.getContract) 
router.post('/contract', controller.createContract) 
router.put('/contract', controller.updateContract) 
router.delete('/contract/:id', controller.deleteContract)

module.exports = router;