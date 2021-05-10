const Router = require('express')
const router = new Router();
const controller = require('../Controllers/CarController.js')

router.get('/car/:id', controller.getCar)
router.get('/cars/', controller.getCars)
router.get('/cars/:id', controller.getCarsByBrand)
router.post('/car', controller.createCar)
router.put('/car', controller.updateCar)
router.delete('/car/:id', controller.deleteCar)

module.exports = router;