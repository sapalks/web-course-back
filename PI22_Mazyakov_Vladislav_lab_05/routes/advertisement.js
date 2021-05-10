const Router = require('express')
const router = new Router()
const advertisementController = require('../controller/advertisement')
const passport = require('passport')

router.post('/advertisement',passport.authenticate('jwt', { session: false }), advertisementController.createAdvert)
router.get('/advertisement', advertisementController.getAdvert)
router.put('/advertisement', passport.authenticate('jwt', { session: false }), advertisementController.updateAdvert)
router.delete('/advertisement', passport.authenticate('jwt', { session: false }),advertisementController.deleteAdvert)

module.exports = router
