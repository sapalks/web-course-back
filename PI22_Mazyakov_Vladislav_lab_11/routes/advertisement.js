const Router = require('express')
const router = new Router()
const advertisementController = require('../controller/advertisement')

router.post('/advertisement', advertisementController.createAdvert)
router.get('/advertisement', advertisementController.getAdvert)
router.put('/advertisement', advertisementController.updateAdvert)
router.delete('/advertisement', advertisementController.deleteAdvert)
router.get('/cached', advertisementController.isCached)

module.exports = router
