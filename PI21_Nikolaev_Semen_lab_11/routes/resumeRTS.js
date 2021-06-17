const Router = require('express')
const router = new Router()
const resumeController = require('../controller/resumeCTRL')

router.post('/resume', resumeController.createresume)
router.get('/resume/:id', resumeController.getresume)
router.get('/resume', resumeController.getresumes)
router.get('/resumeCached', resumeController.isCached) 
router.put('/resumeupdate', resumeController.updateresume)
router.delete('/resumedel/:id', resumeController.deleteresume)

module.exports = router 