const Router = require('express')
const router = new Router()
const stepController = require('../controller/step.controller')
const passport = require('passport')

router.post('/step', passport.authenticate('jwt', { session: false }), stepController.createStep)
router.get('/step', stepController.getSteps)
router.get('/step/:id', stepController.getStep)
router.put('/step', passport.authenticate('jwt', { session: false }), stepController.updateStep)
router.delete('/step/:id', passport.authenticate('jwt', { session: false }), stepController.deleteStep)

module.exports = router