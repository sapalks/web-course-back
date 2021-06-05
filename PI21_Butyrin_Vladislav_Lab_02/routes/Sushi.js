const Router = require('express')
const router = new Router()
const SushiController = require('../controllers/Sushi')

router.post('/Sushi', SushiController.createSushi)
router.get('/Sushies', SushiController.getAllSushies)
router.get('/Sushi/:id', SushiController.getSushi)
router.get('/Sushi', SushiController.getCooksSushi)
router.put('/Sushi', SushiController.updateSushi)
router.delete('/Sushi/:id', SushiController.deleteSushi)

module.exports = router