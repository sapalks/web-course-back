const Router = require('express')
const router = new Router();
const controller = require('../Controllers/BrandController.js')
const passport = require('passport')

router.get('/brand/:id',passport.authenticate('jwt', { session: false }), controller.getBrand)
router.get('/brands/', passport.authenticate('jwt', { session: false }), controller.getBrands)
router.post('/brand',passport.authenticate('jwt', { session: false }), controller.createBrand)
router.put('/brand',passport.authenticate('jwt', { session: false }), controller.updateBrand)
router.delete('/brand/:id',passport.authenticate('jwt', { session: false }), controller.deleteBrand)

module.exports = router;