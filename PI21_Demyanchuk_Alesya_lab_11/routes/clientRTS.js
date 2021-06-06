const Router = require('express')
const router = new Router()
const clientController = require('../controller/clientCTRL')

router.post('/client', clientController.createClient)
router.get('/client/:id', clientController.getClient)
router.get('/client', clientController.getClients)
router.get('/clientCached', clientController.isCached) 
router.put('/clientupdate', clientController.updateClient)
router.delete('/clientdel/:id', clientController.deleteClient)

module.exports = router