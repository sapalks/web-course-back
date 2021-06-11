const Router = require('express')
const router = new Router()
const CookController = require('../controllers/Cook')
const passport = require('passport')

router.post('/Cook', passport.authenticate('jwt', { session: false }), CookController.createCook)
router.get('/Cook', CookController.getAllCooks)
router.get('/Cook/:id', CookController.getCook)
router.put('/Cook', passport.authenticate('jwt', { session: false }), CookController.updateCook)
router.delete('/Cook/:id', passport.authenticate('jwt', { session: false }), CookController.deleteCook)

module.exports = router