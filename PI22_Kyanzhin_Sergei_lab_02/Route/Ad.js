const Router = require('express')
const router = new Router()
const userController = require('../Controller/Ad')

router.post('/ad', userController.createAd)
router.get('/ad', userController.getAds)
router.put('/ad', userController.updateAd)
router.delete('/ad', userController.deleteAd)


module.exports = router