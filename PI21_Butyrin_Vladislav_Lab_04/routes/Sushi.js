const Router = require('express')
const router = new Router()
const SushiController = require('../controllers/Sushi')
const passport = require('passport')

router.post('/Sushi', passport.authenticate('jwt', { session: false }), SushiController.createSushi)
router.get('/Sushies', SushiController.getAllSushies)
router.get('/Sushi/:id', SushiController.getSushi)
router.get('/Sushi', SushiController.getCooksSushi)
router.put('/Sushi', passport.authenticate('jwt', { session: false }), SushiController.updateSushi)
router.delete('/Sushi/:id', passport.authenticate('jwt', { session: false }), SushiController.deleteSushi)

module.exports = router