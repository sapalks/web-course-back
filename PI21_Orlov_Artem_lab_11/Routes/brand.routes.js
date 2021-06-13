const Router = require('express')
const router = new Router();
const controller = require('../Controllers/BrandController.js')

router.get('/brand/:id', controller.getBrand)
router.get('/brands/', controller.getBrands)
router.post('/brand', controller.createBrand)
router.put('/brand', controller.updateBrand)
router.delete('/brand/:id', controller.deleteBrand)
router.get('/brandCacheInfo', controller.isCache)

module.exports = router;