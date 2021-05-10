const Router = require('express')
const router = new Router();
const controller = require('../controllers/contract')
const passport = require('passport')

router.get('/contracts', controller.geAllContracts) 
router.get('/contract/:id', controller.getContract) 
router.post('/contract',  passport.authenticate('jwt', { session: false }), controller.createContract) 
router.put('/contract',  passport.authenticate('jwt', { session: false }), controller.updateContract) 
router.delete('/contract/:id',  passport.authenticate('jwt', { session: false }), controller.deleteContract) 

module.exports = router;