const Router = require('express')
const router = new Router();
const controller = require('../Controllers/CustomerCardController.js')

router.get('/CustomerCard/:id', controller.getCustomerCard)
router.get('/CustomerCards/', controller.getCustomerCards)
router.post('/CustomerCard', controller.createCustomerCard)
router.put('/CustomerCard', controller.updateCustomerCard)
router.delete('/CustomerCard/:id', controller.deleteCustomerCard)

module.exports = router;