const Router = require('express')
const router = new Router()
const CookController = require('../controllers/Cook')

router.post('/Cook', CookController.createCook)
router.get('/Cooks', CookController.getAllCooks)
router.get('/Cook/:id', CookController.getCook)
router.put('/Cook', CookController.updateCook)
router.delete('/Cook/:id', CookController.deleteCook)

module.exports = router