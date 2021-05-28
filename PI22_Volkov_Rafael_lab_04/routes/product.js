const Router = require('express')
const router = new Router();
const controller = require('../controllers/productcontroller')
const passport = require('passport')

router.get('/products', controller.getProducts)
router.get('/product/:id', controller.getProduct)
router.post('/product', passport.authenticate('jwt', { session: false }), controller.createProduct)
router.put('/product', passport.authenticate('jwt', { session: false }), controller.updateProduct)
router.delete('/product/:id', passport.authenticate('jwt', { session: false }), controller.deleteProduct)

module.exports = router;