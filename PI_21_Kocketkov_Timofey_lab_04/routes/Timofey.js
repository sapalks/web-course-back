const Router = require('express')
const router = new Router()
const TimofeyController = require('../controllers/Timofey')
const passport = require('passport')

router.post('/Timofey', passport.authenticate('jwt', { session: false }), TimofeyController.createTimofey)
router.get('/Timofeys', TimofeyController.getAllTimofeys)
router.get('/Timofey/:id', TimofeyController.getTimofey)
router.put('/Timofey', passport.authenticate('jwt', { session: false }), TimofeyController.updateTimofey)
router.delete('/Timofey/:id',  passport.authenticate('jwt', { session: false }), TimofeyController.deleteTimofey)

module.exports = router