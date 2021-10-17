const Router = require('express')
const router = new Router()
const stepController = require('../controller/step.controller')

router.post('/step', stepController.createStep)
router.get('/step', stepController.getSteps)
router.get('/step/:id', stepController.getStep)
router.put('/step', stepController.updateStep)
router.delete('/step/:id', stepController.deleteStep)

module.exports = router