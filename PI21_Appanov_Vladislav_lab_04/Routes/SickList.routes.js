const Router = require('express')
const router = new Router();
const controller = require('../Controllers/SickListController.js')
const passport = require('passport')

router.get('/SickList/:id', passport.authenticate('jwt', { session: false }), controller.getSickList)
router.get('/SickLists/', passport.authenticate('jwt', { session: false }), controller.getSickLists)
router.get('/SickLists/:id', passport.authenticate('jwt', { session: false }), controller.getSickListsByCustomerCard)
router.post('/SickList', passport.authenticate('jwt', { session: false }), controller.createSickList)
router.put('/SickList', passport.authenticate('jwt', { session: false }), controller.updateSickList)
router.delete('/SickList/:id', passport.authenticate('jwt', { session: false }), controller.deleteSickList)

module.exports = router;