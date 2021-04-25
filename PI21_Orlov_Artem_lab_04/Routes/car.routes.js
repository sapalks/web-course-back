const Router = require('express')
const router = new Router();
const controller = require('../Controllers/CarController.js')
const passport = require('passport')

router.get('/car/:id',passport.authenticate('jwt', { session: false }), controller.getCar)
router.get('/cars/',passport.authenticate('jwt', { session: false }), controller.getCars)
router.get('/cars/:id',passport.authenticate('jwt', { session: false }), controller.getCarsByBrand)
router.post('/car',passport.authenticate('jwt', { session: false }), controller.createCar)
router.put('/car',passport.authenticate('jwt', { session: false }), controller.updateCar)
router.delete('/car/:id',passport.authenticate('jwt', { session: false }), controller.deleteCar)

module.exports = router;