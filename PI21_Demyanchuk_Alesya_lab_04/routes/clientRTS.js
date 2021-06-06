const Router = require('express')
const router = new Router()
const clientController = require('../controller/clientCTRL')
const passport = require('passport')

router.post('/client', passport.authenticate('jwt', { session: false }),clientController.createClient)
router.get('/client/:id', clientController.getClient)
router.get('/client', clientController.getClients)
router.put('/clientupdate', passport.authenticate('jwt', { session: false }), clientController.updateClient)
router.delete('/clientdel/:id', passport.authenticate('jwt', { session: false }), clientController.deleteClient)

module.exports = router