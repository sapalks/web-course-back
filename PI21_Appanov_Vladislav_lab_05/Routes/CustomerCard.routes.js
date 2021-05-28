const Router = require('express')
const router = new Router();
const controller = require('../Controllers/CustomerCardController.js')
const passport = require('passport')

router.get('/CustomerCard/:id', passport.authenticate('jwt', { session: false }), controller.getCustomerCard)
router.get('/CustomerCards/', passport.authenticate('jwt', { session: false }), controller.getCustomerCards)
router.post('/CustomerCard', passport.authenticate('jwt', { session: false }), controller.createCustomerCard)
router.put('/CustomerCard', passport.authenticate('jwt', { session: false }), controller.updateCustomerCard)
router.delete('/CustomerCard/:id', passport.authenticate('jwt', { session: false }), controller.deleteCustomerCard)

module.exports = router;