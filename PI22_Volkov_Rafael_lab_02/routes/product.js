const Router = require('express')
const router = new Router();
const controller = require('../controllers/productcontroller')

router.get('/products', controller.getProducts)
router.get('/product/:id', controller.getProduct)
router.post('/product', controller.createProduct)
router.put('/product', controller.updateProduct)
router.delete('/product/:id', controller.deleteProduct)

module.exports = router;