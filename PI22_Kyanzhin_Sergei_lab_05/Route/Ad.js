const Router = require('express')
const router = new Router()
const passport = require('passport')
const userController = require('../Controller/Ad')

router.post('/ad', passport.authenticate('jwt', { session: false }), userController.createAd)
router.get('/ad', userController.getAds)
router.put('/ad', passport.authenticate('jwt', { session: false }), userController.updateAd)
router.delete('/ad', passport.authenticate('jwt', { session: false }), userController.deleteAd)


module.exports = router